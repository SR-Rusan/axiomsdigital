// Vercel serverless function: receives the discovery form and forwards it to
// Google Sheets (if Google credentials are set) and to an email notification.

const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[a-zA-Z]{2,}$/;

// Only the real site may call this from a browser.
const ALLOWED_ORIGINS = new Set(['https://axiomsdigital.com', 'https://www.axiomsdigital.com']);

/** Stop visitor text that starts with = + - @ (or tab/CR tricks) from running as a spreadsheet formula. */
const safeCell = (value) => (/^[=+\-@\t\r]/.test(value) ? `'${value}` : value);

/** Trim, cut to length, and drop invisible control characters (keeps normal line breaks). */
const clean = (value, max) =>
  String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028\u2029\uFEFF]/g, '')
    .trim()
    .slice(0, max);

/** One-line version for names, subjects and headers (no line breaks, no angle brackets). */
const oneLine = (value) => value.replace(/[\r\n]+/g, ' ').replace(/[<>]/g, '');

// Best-effort rate limit: per visitor IP and overall, kept in the function's memory
// (Vercel reuses warm instances, so this stops bursts of spam; it is not a hard global limit).
const PER_IP = { max: 5, windowMs: 10 * 60 * 1000 };
const GLOBAL = { max: 60, windowMs: 60 * 60 * 1000 };
const hits = new Map();
let globalHits = [];
function rateLimited(ip) {
  const now = Date.now();
  globalHits = globalHits.filter((t) => now - t < GLOBAL.windowMs);
  const mine = (hits.get(ip) || []).filter((t) => now - t < PER_IP.windowMs);
  if (mine.length >= PER_IP.max || globalHits.length >= GLOBAL.max) return true;
  mine.push(now);
  globalHits.push(now);
  hits.set(ip, mine);
  if (hits.size > 5000) hits.clear();
  return false;
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Browsers on other websites may not post here.
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return res.status(403).json({ error: 'Not allowed' });
  }

  if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    return res.status(415).json({ error: 'Send JSON' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages. Please try again in a few minutes.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Honeypot: the hidden "website" field is only ever filled in by bots.
  // Answer as if it worked so they don't retry.
  if (body.website) {
    return res.status(200).json({ success: true });
  }

  const name = oneLine(clean(body.name, 120));
  const email = oneLine(clean(body.email, 200));
  const company = oneLine(clean(body.company, 200));
  const tasks = clean(body.tasks, 3000);

  if (!name || !EMAIL_RE.test(email) || tasks.length < 3) {
    return res.status(400).json({ error: 'Please fill in your name, a valid email and the tasks to automate.' });
  }

  const receivedAt = new Date().toISOString();
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || '1G0gY4k-T7uo_b76kUZwltCfewK6652zjrBCEA1R93HY';
  const notifyEmail = process.env.LEADS_NOTIFY_EMAIL || 'shahriar.rusan12@gmail.com';
  const siteOrigin = 'https://axiomsdigital.com';

  let sheetUpdated = false;
  let emailSent = false;

  // 1. Append to the Google Sheet
  if (clientId && clientSecret && refreshToken) {
    try {
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });
      const tokenData = await tokenRes.json();

      if (tokenData.access_token) {
        const appendRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Inquiries!A:G:append?valueInputOption=RAW`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              values: [
                [
                  receivedAt,
                  safeCell(name),
                  safeCell(email),
                  safeCell(company || 'Not provided'),
                  safeCell(tasks),
                  'New inquiry',
                  'Axioms Digital website',
                ],
              ],
            }),
          }
        );
        sheetUpdated = appendRes.ok;
        if (!appendRes.ok) console.error('Google Sheet append failed:', appendRes.status, await appendRes.text());
      } else {
        console.error('Google token refresh failed:', tokenData.error || tokenData);
      }
    } catch (sheetErr) {
      console.error('Google Sheet error:', sheetErr);
    }
  }

  // 2a. Email alert through Resend (preferred: reliable, and we can see whether it was accepted).
  // Needs RESEND_API_KEY on Vercel. Without a verified domain, Resend's test sender can only email
  // the address that owns the Resend account, which is exactly who these alerts go to.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const text = [
        `New inquiry from the Axioms Digital website`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || 'Not specified'}`,
        ``,
        `What they want automated:`,
        tasks,
        ``,
        `Received: ${receivedAt}`,
        `Google Sheet: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
        ``,
        `Reply to this email to answer them directly.`,
      ].join('\n');
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.LEADS_FROM_EMAIL || 'Axioms Digital <onboarding@resend.dev>',
          to: [notifyEmail],
          reply_to: email,
          subject: `[Axioms Digital lead] ${name}${company ? ` (${company})` : ''}`,
          text,
        }),
      });
      emailSent = r.ok;
      if (!r.ok) console.error('Resend failed:', r.status, await r.text());
    } catch (resendErr) {
      console.error('Resend error:', resendErr);
    }
  }

  // 2b. Fallback email notification (FormSubmit), only if Resend is not set up or failed.
  if (!emailSent) try {
    const emailRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(siteOrigin ? { Origin: siteOrigin, Referer: `${siteOrigin}/` } : {}),
      },
      body: JSON.stringify({
        _subject: `[Axioms Digital lead] ${name}${company ? ` (${company})` : ''}`,
        _replyto: email,
        _template: 'table',
        Name: name,
        Email: email,
        Company: company || 'Not specified',
        Tasks_To_Automate: tasks.replace(/[<>]/g, ''),
        Google_Sheet: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
        Received_At: receivedAt,
      }),
    });
    const emailData = await emailRes.json().catch(() => ({}));
    emailSent = emailRes.ok && String(emailData.success) !== 'false';
    if (!emailSent) console.error('FormSubmit failed:', emailRes.status);
  } catch (emailErr) {
    console.error('Email error:', emailErr);
  }

  if (!sheetUpdated && !emailSent) {
    // Nothing reached Axioms Digital, so tell the visitor to try again instead of showing a false success.
    return res.status(502).json({ error: 'Could not deliver the inquiry. Please try again.' });
  }

  // Note: the private sheet URL is never sent back to the browser.
  return res.status(200).json({ success: true });
}
