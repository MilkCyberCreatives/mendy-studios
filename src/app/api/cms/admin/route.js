import { NextResponse } from 'next/server';
import { canManageUsers, cmsAdminRead, cmsAdminWrite, getCmsSession, hashPassword, isSameOrigin } from '../../../../lib/cms.server';

const allowedReads = new Set(['dashboard','overrides','page_meta','settings','media','leads','redirects','users','revisions','activity']);
const allowedEntities = new Set(['override','page_meta','setting','lead','redirect','user','media']);

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const session = await getCmsSession();
  if (!session) return NextResponse.json({ ok: false, error: 'Unauthorised.' }, { status: 401 });
  const url = new URL(request.url);
  const entity = url.searchParams.get('entity') || 'dashboard';
  const key = url.searchParams.get('key');
  if (!allowedReads.has(entity)) return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  if (entity === 'users' && !canManageUsers(session)) return NextResponse.json({ ok: false, error: 'Insufficient permission.' }, { status: 403 });
  try {
    const data = await cmsAdminRead(entity, key);
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('[cms] admin read failed', error instanceof Error ? error.message : 'unknown_error');
    return NextResponse.json({ ok: false, error: 'Unable to load this section.' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getCmsSession();
  if (!session) return NextResponse.json({ ok: false, error: 'Unauthorised.' }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ ok: false, error: 'Request origin is not allowed.' }, { status: 403 });
  try {
    const body = await request.json();
    const action = String(body.action || '');
    const entity = String(body.entity || '');
    let payload = body.payload && typeof body.payload === 'object' ? { ...body.payload } : {};
    if (!allowedEntities.has(entity)) return NextResponse.json({ ok: false, error: 'Invalid entity.' }, { status: 400 });

    if (entity === 'user') {
      if (!canManageUsers(session)) return NextResponse.json({ ok: false, error: 'Insufficient permission.' }, { status: 403 });
      if (action === 'create' || action === 'password') {
        const password = String(payload.password || '');
        if (password.length < 8 || password.length > 256) return NextResponse.json({ ok: false, error: 'Password must be at least 8 characters.' }, { status: 400 });
        payload.password_hash = hashPassword(password);
        delete payload.password;
      }
      if (session.role !== 'super_admin' && payload.role === 'super_admin') {
        return NextResponse.json({ ok: false, error: 'Only a Super Admin can assign that role.' }, { status: 403 });
      }
    }

    const data = await cmsAdminWrite(action, entity, payload, session.email);
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('[cms] admin write failed', error instanceof Error ? error.message : 'unknown_error');
    return NextResponse.json({ ok: false, error: 'Unable to save this change.' }, { status: 500 });
  }
}
