import { NextResponse } from 'next/server';
import { cmsAdminWrite, getCmsSession, isSameOrigin } from '../../../../lib/cms.server';

const MAX_MEDIA_BYTES = 6 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg','image/png','image/webp','image/gif','image/avif']);

export const runtime = 'nodejs';

export async function POST(request) {
  const session = await getCmsSession();
  if (!session) return NextResponse.json({ ok: false, error: 'Unauthorised.' }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ ok: false, error: 'Request origin is not allowed.' }, { status: 403 });
  try {
    const form = await request.formData();
    const file = form.get('file');
    const altText = String(form.get('altText') || '').slice(0, 300);
    if (!file || typeof file.arrayBuffer !== 'function') return NextResponse.json({ ok: false, error: 'Choose an image to upload.' }, { status: 400 });
    if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ ok: false, error: 'Use JPG, PNG, WebP, GIF or AVIF images.' }, { status: 400 });
    if (!file.size || file.size > MAX_MEDIA_BYTES) return NextResponse.json({ ok: false, error: 'Image must be 6 MB or smaller.' }, { status: 413 });
    const bytes = Buffer.from(await file.arrayBuffer());
    const data = await cmsAdminWrite('upload', 'media', {
      filename: String(file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 180),
      mime_type: file.type,
      alt_text: altText,
      size_bytes: bytes.length,
      data_base64: bytes.toString('base64'),
      is_public: true,
    }, session.email);
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('[cms] media upload failed', error instanceof Error ? error.message : 'unknown_error');
    return NextResponse.json({ ok: false, error: 'Unable to upload this image.' }, { status: 500 });
  }
}
