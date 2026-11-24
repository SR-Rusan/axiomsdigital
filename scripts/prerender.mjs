// Build-time pre-render: puts the full page HTML and JSON-LD into dist/index.html.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const ssr = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const { faqs } = await import(pathToFileURL(path.resolve('dist-ssr/faqs.js')).href);

const appHtml = ssr.render();
const site = 'https://axiomsdigital.com';
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${site}/#business`,
      name: 'Axioms Digital',
      url: `${site}/`,
      logo: `${site}/axioms-digital-horizontal.webp`,
      image: `${site}/og-image.jpg`,
      description:
        'Practical AI automations for small and growing businesses: lead qualification, client onboarding, content pipelines and internal knowledge assistants. Live in 7–14 days, in your own accounts.',
      founder: { '@id': `${site}/#founder` },
      areaServed: 'Worldwide',
      address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
      email: 'rusan@axiomsdigital.com',
    },
    {
      '@type': 'Person',
      '@id': `${site}/#founder`,
      name: 'Rusan',
      jobTitle: 'Founder and automation engineer',
      worksFor: { '@id': `${site}/#business` },
      homeLocation: { '@type': 'Place', name: 'Dhaka, Bangladesh' },
    },
    { '@type': 'WebSite', '@id': `${site}/#website`, name: 'Axioms Digital', url: `${site}/`, publisher: { '@id': `${site}/#business` } },
    {
      '@type': 'WebPage',
      '@id': `${site}/#webpage`,
      url: `${site}/`,
      name: 'Axioms Digital | Practical AI Automation for Growing Businesses',
      isPartOf: { '@id': `${site}/#website` },
      about: { '@id': `${site}/#business` },
      breadcrumb: { '@id': `${site}/#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${site}/#breadcrumb`,
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` }],
    },
    {
      '@type': 'FAQPage',
      '@id': `${site}/#faq`,
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

const file = path.join(dist, 'index.html');
let html = fs.readFileSync(file, 'utf8');
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
html = html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>\n  </head>`);
fs.writeFileSync(file, html);
console.log(`pre-rendered ${appHtml.length} chars of HTML + JSON-LD`);
