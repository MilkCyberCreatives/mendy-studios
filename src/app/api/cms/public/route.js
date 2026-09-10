import { NextResponse } from 'next/server';
import { cmsPublicSnapshot } from '../../../../lib/cms.server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const route = url.searchParams.get('route') || '/';
    const safeRoute = route.startsWith('/') && !route.startsWith('/admin') ? route.slice(0, 500) : '/';
    const snapshot = await cmsPublicSnapshot(safeRoute);
    return NextResponse.json(snapshot || { overrides: [], meta: {}, settings: {} }, {
      headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' },
    });
  } catch (error) {
    console.error('[cms] public snapshot failed', error instanceof Error ? error.message : 'unknown_error');
    return NextResponse.json({ overrides: [], meta: {}, settings: {} }, { status: 200 });
  }
}
