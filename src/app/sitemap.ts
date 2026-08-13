import type { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '../lib/seo';
import { stories } from '../content/stories';
import { services } from '../content/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = SITE.routes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/contact' ? 0.9 : 0.8,
  }));

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: absoluteUrl(`/stories/${story.slug}`),
    lastModified: new Date(story.updatedAt || story.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...corePages, ...servicePages, ...storyPages];
}
