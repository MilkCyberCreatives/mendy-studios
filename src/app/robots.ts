import type { MetadataRoute } from 'next';
import { SITE } from '../lib/seo';

const privateRoutes = ['/api/', '/admin'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privateRoutes,
      },
      {
        userAgent: ['GPTBot', 'Google-Extended', 'CCBot', 'PerplexityBot'],
        allow: '/',
        disallow: privateRoutes,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
