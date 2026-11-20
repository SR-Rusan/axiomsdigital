/**
 * AXIOMS DIGITAL — LEAD INTAKE & AUTOMATION ENGINE
 * 
 * Automatically connects the Axioms Digital website discovery form to:
 * 1. Google Sheets (Auto-creates columns, formats header, appends each lead row)
 * 2. Instant Email Notification to shahriar.rusan12@gmail.com
 * 3. Automated Welcome / Confirmation Email to the Client
 * 
 * SETUP INSTRUCTIONS (Takes ~2 minutes):
 * 1. Go to https://sheets.new while logged into your Google account (shahriar.rusan12@gmail.com).
 * 2. Name the sheet "Axioms Digital - Client Inquiries".
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Delete any code in Code.gs, paste this entire file, and click Save (Floppy disk icon).
 * 5. Click the blue "Deploy" button (top right) > "New deployment".
 * 6. Under "Select type" (gear icon), choose "Web app".
 * 7. Set:
 *    - Description: "Axioms Digital Lead Form Webhook"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (allows website visitors to submit)
 * 8. Click "Deploy", approve Google permissions, and copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec).
 * 9. Paste this URL into your .env file as VITE_LEADS_WEBHOOK_URL or in Vercel Environment Variables.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var postData = "";
    
    // Parse incoming payload
    if (e.postData && e.postData.contents) {
      postData = e.postData.contents;
    }
    
    var data = {};
    try {
      data = JSON.parse(postData);
    } catch (parseErr) {
      data = e.parameter || {};
    }

    // Spam bots fill in the hidden "website" field; real visitors never see it.
    if (data.website) {
      return ContentService.createTextOutput(JSON.stringify({ result: "ignored" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Everything below is typed by website visitors, so escape it before it goes into HTML emails.
    var name = escapeHtml_(String(data.name || "Anonymous").slice(0, 120));
    var email = String(data.email || "").trim().slice(0, 200);
    var emailHtml = escapeHtml_(email || "No email provided");
    var company = escapeHtml_(String(data.company || "Not provided").slice(0, 200));
    var tasks = escapeHtml_(String(data.tasks || "No tasks specified").slice(0, 3000));
    var timestamp = new Date();

    // 1. Ensure Table Header exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Lead Name",
        "Work Email",
        "Company / Website",
        "Tasks to Automate",
        "Status",
        "Internal Notes"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1E293B"); // Slate dark
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // 2. Append the new lead
    // The sheet gets the plain text (not the HTML-escaped copies used in emails).
    sheet.appendRow([
      timestamp,
      safeCell_(String(data.name || "Anonymous").slice(0, 120)),
      safeCell_(email),
      safeCell_(String(data.company || "").slice(0, 200)),
      safeCell_(String(data.tasks || "").slice(0, 3000)),
      "New Discovery Request",
      ""
    ]);

    // 3. Send instant notification email
    var notifyEmail = "shahriar.rusan12@gmail.com";
    var subject = "[Axioms Digital lead] " + String(data.name || "New inquiry").slice(0, 80);
    
    var htmlBody = 
      "<div style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px; background: #FFFFFF; color: #1E293B;'>" +
        "<div style='padding-bottom: 16px; border-bottom: 1px solid #E2E8F0; margin-bottom: 20px;'>" +
          "<span style='font-size: 20px; font-weight: 700; color: #4F46E5;'>✦ Axioms Digital</span>" +
        "</div>" +
        "<h2 style='font-size: 18px; margin: 0 0 12px 0; color: #0F172A;'>New Discovery Call Requested</h2>" +
        "<p style='font-size: 14px; color: #475569; margin: 0 0 20px 0;'>A potential client submitted the discovery form on your website:</p>" +
        "<table style='width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;'>" +
          "<tr style='border-bottom: 1px solid #F1F5F9;'><td style='padding: 10px 0; font-weight: 600; width: 140px; color: #64748B;'>Name:</td><td style='padding: 10px 0; font-weight: 600; color: #0F172A;'>" + name + "</td></tr>" +
          "<tr style='border-bottom: 1px solid #F1F5F9;'><td style='padding: 10px 0; font-weight: 600; color: #64748B;'>Work Email:</td><td style='padding: 10px 0;'><a href='mailto:" + emailHtml + "' style='color: #4F46E5; text-decoration: none; font-weight: 500;'>" + emailHtml + "</a></td></tr>" +
          "<tr style='border-bottom: 1px solid #F1F5F9;'><td style='padding: 10px 0; font-weight: 600; color: #64748B;'>Company / URL:</td><td style='padding: 10px 0; color: #0F172A;'>" + company + "</td></tr>" +
          "<tr style='border-bottom: 1px solid #F1F5F9;'><td style='padding: 10px 0; font-weight: 600; color: #64748B; vertical-align: top;'>Tasks to Automate:</td><td style='padding: 10px 0; color: #0F172A; background: #F8FAFC; border-radius: 6px; padding: 10px; line-height: 1.5;'>" + tasks + "</td></tr>" +
          "<tr><td style='padding: 10px 0; font-weight: 600; color: #64748B;'>Received At:</td><td style='padding: 10px 0; color: #64748B;'>" + timestamp.toUTCString() + "</td></tr>" +
        "</table>" +
        "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 13px;'>" +
          "<strong>Next Action:</strong> Reply to <a href='mailto:" + emailHtml + "' style='color: #4F46E5;'>" + emailHtml + "</a> or check your <a href='" + SpreadsheetApp.getActiveSpreadsheet().getUrl() + "' style='color: #4F46E5;'>Google Sheet</a>." +
        "</div>" +
        "<div style='font-size: 11px; color: #94A3B8; text-align: center; padding-top: 12px; border-top: 1px solid #F1F5F9;'>" +
          "Axioms Digital Automation Dispatcher • Automated Lead Routing" +
        "</div>" +
      "</div>";

    MailApp.sendEmail({
      to: notifyEmail,
      subject: subject,
      htmlBody: htmlBody
    });

    // 4. Automated Courtesy Acknowledgment Email to the Lead
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.indexOf("example.com") === -1) {
      try {
        var clientFirstName = name.split(" ")[0];
        var clientSubject = "Your discovery call request, Axioms Digital";
        var clientBody = 
          "<div style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1E293B; line-height: 1.6;'>" +
            "<p style='font-size: 15px;'>Hi " + clientFirstName + ",</p>" +
            "<p style='font-size: 14px;'>Thanks for requesting a discovery call with <strong>Axioms Digital</strong>.</p>" +
            "<p style='font-size: 14px;'>I read every request personally and look at the tools you mentioned before we talk. You'll hear back from me within one business day to pick a time for a 20-minute call.</p>" +
            "<p style='font-size: 14px; margin-top: 24px;'>Talk soon,<br><strong>Axioms Digital</strong><br><span style='color: #64748B; font-size: 12px;'>AI automation studio</span></p>" +
          "</div>";

        MailApp.sendEmail({
          to: email,
          subject: clientSubject,
          htmlBody: clientBody
        });
      } catch (clientErr) {
        // Silently continue if client email send fails
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success", status: 200 }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Stop visitor text that starts with = + - @ from running as a spreadsheet formula. */
function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "Axioms Digital webhook is active" }))
    .setMimeType(ContentService.MimeType.JSON);
}
