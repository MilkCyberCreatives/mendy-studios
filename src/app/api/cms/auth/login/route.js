import { NextResponse } from 'next/server';
import { cmsAdminRead, cmsAdminWrite, hashPassword, isSameOrigin, setCmsSession, verifyPassword } from '../../../../../lib/cms.server';

const MAX_BODY = 8 * 1024;

export async function POST(request) {
  try {
    if (!isSameOrigin(request)) return NextResponse.json({ ok: false, error: 'Request origin is not allowed.' }, { status: 403 });
    const raw = await request.text();
    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY) return NextResponse.json({ ok: false, error: 'Request is too large.' }, { status: 413 });
    const body = JSON.parse(raw || '{}');
    const email = String(body.email || '').trim().toLowerCase().slice(0, 320);
    const password = String(body.password || '');
    if (!email || !password || password.length > 256) return NextResponse.json({ ok: false, error: 'Email and password are required.' }, { status: 400 });

    let user = await cmsAdminRead('user_by_email', email);
    if (!user) {
      const dashboard = await cmsAdminRead('dashboard');
      const bootstrapEmail = String(process.env.CMS_BOOTSTRAP_EMAIL || '').trim().toLowerCase();
      const bootstrapPassword = process.env.CMS_BOOTSTRAP_PASSWORD || '';
      if (Number(dashboard?.users || 0) === 0 && email === bootstrapEmail && bootstrapPassword && password === bootstrapPassword) {
        user = await cmsAdminWrite('create', 'user', {
          email,
          name: 'Mendy Studios Administrator',
          password_hash: hashPassword(password),
          role: 'super_admin',
        }, email);
      }
    }

    if (!user?.active || !verifyPassword(password, user?.password_hash)) {
      return NextResponse.json({ ok: false, error: 'Invalid email or password.' }, { status: 401 });
    }

    await cmsAdminWrite('login', 'user', { id: user.id }, user.email);
    await setCmsSession(user);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error('[cms] login failed', error instanceof Error ? error.message : 'unknown_error');
    return NextResponse.json({ ok: false, error: 'Unable to sign in right now.' }, { status: 500 });
  }
}
