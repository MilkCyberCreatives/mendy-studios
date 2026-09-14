import type { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '../lib/seo';
import { stories } from '../content/stories';
import { services } from '../content/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = SITE.routes.map((route) => ({
    url: absoluteUrl(route),
  }));

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: absoluteUrl(`/stories/${story.slug}`),
    lastModified: new Date(story.updatedAt || story.publishedAt),
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
  }));

  return [...corePages, ...servicePages, ...storyPages];
}
