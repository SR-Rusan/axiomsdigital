# Axioms Digital

Source for **[axiomsdigital.com](https://axiomsdigital.com)**, the website of Axioms Digital, an AI automation studio that builds lead qualification, client onboarding and content systems for coaches and consultants.

## Stack
- React + Vite + TypeScript, Tailwind CSS
- Vercel hosting, with a serverless function (`api/inquiry.js`) for the contact form
- Resend for inquiry email alerts, Google Sheets as the inquiry log
- Strict security headers (CSP, HSTS, frame and referrer policy) in `vercel.json`

## Run locally
```bash
npm install
npm run dev
```

Secrets live only in Vercel environment variables. See `.env.example` for the names.
