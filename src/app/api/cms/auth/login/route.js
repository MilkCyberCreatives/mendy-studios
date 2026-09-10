import { NextResponse } from 'next/server';
import { cmsBootstrap, cmsLogin, isSameOrigin, setCmsSession } from '../../../../../lib/cms.server';

const MAX_BODY = 8 * 1024;

export async function POST(request) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ ok: false, error: 'Request origin is not allowed.' }, { status: 403 });
    }

    const raw = await request.text();
    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY) {
      return NextResponse.json({ ok: false, error: 'Request is too large.' }, { status: 413 });
    }

    const body = JSON.parse(raw || '{}');
    const email = String(body.email || '').trim().toLowerCase().slice(0, 320);
    const password = String(body.password || '');
    const setupToken = String(body.setupToken || '').slice(0, 256);

    if (!email || !password || password.length < 8 || password.length > 256) {
      return NextResponse.json({ ok: false, error: 'Enter a valid email and a password of at least 8 characters.' }, { status: 400 });
    }

    let result = await cmsLogin(email, password);
    if (!result && setupToken) result = await cmsBootstrap(setupToken, email, password);

    if (!result?.token || !result?.user?.active) {
      return NextResponse.json({ ok: false, error: setupToken ? 'Setup link is invalid or has already been used.' : 'Invalid email or password.' }, { status: 401 });
    }

    await setCmsSession(result.token);
    return NextResponse.json({ ok: true, user: result.user });
  } catch (error) {
    console.error('[cms] login failed', error instanceof Error ? error.message : 'unknown_error');
    return NextResponse.json({ ok: false, error: 'Unable to sign in right now.' }, { status: 500 });
  }
}
