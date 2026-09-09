import { cmsPublicMedia } from '../../../../../lib/cms.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request, context) {
  try {
    const { id } = await context.params;
    if (!/^[0-9a-f-]{36}$/i.test(id || '')) return new Response('Not found', { status: 404 });
    const media = await cmsPublicMedia(id);
    if (!media?.data_base64 || !media?.mime_type) return new Response('Not found', { status: 404 });
    return new Response(Buffer.from(media.data_base64, 'base64'), {
      status: 200,
      headers: {
        'Content-Type': media.mime_type,
        'Content-Disposition': `inline; filename="${String(media.filename || 'image').replace(/["\\]/g, '')}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
