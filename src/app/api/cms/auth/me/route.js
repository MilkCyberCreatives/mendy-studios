import { NextResponse } from 'next/server';
import { getCmsSession } from '../../../../../lib/cms.server';

export async function GET() {
  const session = await getCmsSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, user: session });
}
