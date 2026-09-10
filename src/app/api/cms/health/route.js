import { NextResponse } from 'next/server';
import { cmsPublicSnapshot } from '../../../../lib/cms.server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await cmsPublicSnapshot('/');
    return NextResponse.json(
      { ok: true, database: 'connected', service: 'mendy-cms' },
      { status: 200, headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  } catch (error) {
    console.error('[cms] health check failed', error instanceof Error ? error.message : 'unknown_error');
    return NextResponse.json(
      { ok: false, database: 'unavailable', service: 'mendy-cms' },
      { status: 503, headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  }
}
