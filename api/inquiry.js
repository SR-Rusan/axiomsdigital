// Vercel serverless function: receives the discovery form and forwards it to
// Google Sheets (if Google credentials are set) and to an email notification.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Stop visitor text that starts with = + - @ from running as a spreadsheet formula. */
const safeCell = (value) => (/^[=+\-@]/.test(value) ? `'${value}` : value);

const clean = (value, max) => String(value ?? '').trim().slice(0, max);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // Honeypot: the hidden "website" field is only ever filled in by bots.
  // Answer as if it worked so they don't retry.
  if (body.website) {
    return res.status(200).json({ success: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 200);
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
  const siteOrigin = req.headers.origin || (req.headers.host ? `https://${req.headers.host}` : undefined);

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
        Tasks_To_Automate: tasks,
        Google_Sheet: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
        Received_At: receivedAt,
      }),
    });
    const emailData = await emailRes.json().catch(() => ({}));
    emailSent = emailRes.ok && String(emailData.success) !== 'false';
    if (!emailSent) console.error('FormSubmit failed:', emailRes.status, emailData);
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
