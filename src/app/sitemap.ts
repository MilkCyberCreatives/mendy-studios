import type { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '../lib/seo';
import { stories } from '../content/stories';
import { services } from '../content/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = SITE.routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/contact' ? 0.9 : 0.8,
  }));

  const machineReadablePages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/stories/rss.xml'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/llms.txt'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/indexnow.txt'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: absoluteUrl(`/stories/${story.slug}`),
    lastModified: new Date(story.updatedAt || story.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...corePages,
    ...storyPages,
    ...servicePages,
    ...machineReadablePages,
  ];
}
