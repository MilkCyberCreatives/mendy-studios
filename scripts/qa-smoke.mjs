const baseUrl = (process.env.QA_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');

const publicRoutes = [
  '/',
  '/about',
  '/services',
  '/areas',
  '/gallery',
  '/motion',
  '/stories',
  '/faqs',
  '/contact',
];

const failures = [];

function check(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

async function get(path, init) {
  return fetch(`${baseUrl}${path}`, {
    redirect: 'manual',
    ...init,
  });
}

for (const route of publicRoutes) {
  const response = await get(route);
  check(response.status === 200, `${route} expected 200, received ${response.status}`);

  if (response.status === 200 && response.headers.get('content-type')?.includes('text/html')) {
    const html = await response.text();
    check(/<title>[^<]+<\/title>/i.test(html), `${route} is missing a server-rendered title`);
    check(/<meta[^>]+name=["']description["']/i.test(html), `${route} is missing a meta description`);
    check(/<link[^>]+rel=["']canonical["']/i.test(html), `${route} is missing a canonical link`);
    check(!/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html), `${route} is unexpectedly noindex`);
  }
}

const robots = await get('/robots.txt');
check(robots.status === 200, `/robots.txt expected 200, received ${robots.status}`);
if (robots.status === 200) {
  const text = await robots.text();
  check(/sitemap:\s*https:\/\/www\.mendystudios\.co\.za\/sitemap\.xml/i.test(text), '/robots.txt is missing the production sitemap');
  check(/disallow:\s*\/api\//i.test(text), '/robots.txt should disallow API routes');
}

const sitemap = await get('/sitemap.xml');
check(sitemap.status === 200, `/sitemap.xml expected 200, received ${sitemap.status}`);
if (sitemap.status === 200) {
  const xml = await sitemap.text();
  check(xml.includes('<urlset'), '/sitemap.xml is not a URL set');
  check(xml.includes('https://www.mendystudios.co.za/'), '/sitemap.xml is missing the canonical production host');
  check(!xml.includes('/api/'), '/sitemap.xml must not expose API routes');
}

const missing = await get('/qa-definitely-not-a-real-page');
check(missing.status === 404, `unknown route expected 404, received ${missing.status}`);
if (missing.headers.get('content-type')?.includes('text/html')) {
  const html = await missing.text();
  check(/noindex/i.test(html), '404 response should contain noindex');
}

const invalidLead = await get('/api/lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Origin: baseUrl,
  },
  body: JSON.stringify({
    formId: 'qa_invalid',
    name: 'A',
    email: 'not-an-email',
    message: 'short',
  }),
});
check(invalidLead.status === 400, `invalid lead expected 400, received ${invalidLead.status}`);

const honeypotLead = await get('/api/lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Origin: baseUrl,
  },
  body: JSON.stringify({
    formId: 'qa_honeypot',
    name: 'Quality Assurance',
    email: 'qa@example.com',
    message: 'This request must never be delivered.',
    website: 'https://spam.example',
  }),
});
check(honeypotLead.status === 200, `honeypot lead expected safe 200, received ${honeypotLead.status}`);

if (failures.length > 0) {
  console.error(`QA smoke suite failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`QA smoke suite passed for ${baseUrl}`);
