import { NextResponse } from 'next/server';
import { clearCmsSession, isSameOrigin } from '../../../../../lib/cms.server';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ ok: false }, { status: 403 });
  await clearCmsSession();
  return NextResponse.json({ ok: true });
}
