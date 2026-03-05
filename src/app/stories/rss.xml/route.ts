import { stories } from '../../../content/stories';
import { SITE, absoluteUrl } from '../../../lib/seo';

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const items = stories
    .map(
      (story) => `
        <item>
          <title>${xmlEscape(story.title)}</title>
          <link>${absoluteUrl(`/stories/${story.slug}`)}</link>
          <guid>${absoluteUrl(`/stories/${story.slug}`)}</guid>
          <pubDate>${new Date(story.publishedAt).toUTCString()}</pubDate>
          <description>${xmlEscape(story.description)}</description>
        </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${xmlEscape(SITE.name)} Stories</title>
        <link>${SITE.url}</link>
        <description>Latest stories from ${xmlEscape(SITE.name)}</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
