import { NextResponse } from 'next/server';
import { SITE } from '../../../../lib/seo';

type IndexNowBody = {
  urls?: string[];
};

const MAX_URLS_PER_REQUEST = 100;
const MAX_BODY_BYTES = 64 * 1024;
const siteOrigin = new URL(SITE.url).origin;

function isSameOriginRequest(request: Request) {
  const origin = request.headers.get('origin');

  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function getValidSiteUrls(values: unknown) {
  if (!Array.isArray(values)) {
    return [];
  }

  const urls = new Set<string>();

  for (const value of values.slice(0, MAX_URLS_PER_REQUEST)) {
    if (typeof value !== 'string') {
      continue;
    }

    try {
      const url = new URL(value);
      if (url.origin === siteOrigin && (url.protocol === 'https:' || url.protocol === 'http:')) {
        urls.add(url.toString());
      }
    } catch {
      // Ignore malformed URLs.
    }
  }

  return Array.from(urls);
}

export async function POST(request: Request) {
  try {
    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { ok: false, error: 'Request origin is not allowed.' },
        { status: 403 }
      );
    }

    const declaredLength = Number(request.headers.get('content-length') || 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Request is too large.' },
        { status: 413 }
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Request is too large.' },
        { status: 413 }
      );
    }

    const key = process.env.INDEXNOW_KEY;

    if (!key) {
      return NextResponse.json(
        { ok: false, error: 'INDEXNOW_KEY is not configured.' },
        { status: 400 }
      );
    }

    const body = JSON.parse(rawBody) as IndexNowBody;
    const urls = getValidSiteUrls(body.urls);

    if (urls.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Provide at least one absolute site URL in `urls`.' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: new URL(SITE.url).host,
        key,
        keyLocation:
          process.env.INDEXNOW_KEY_LOCATION || `${SITE.url}/indexnow.txt`,
        urlList: urls,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: `IndexNow request failed with status ${response.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, submitted: urls.length });
  } catch (error) {
    console.error(
      '[indexnow] submit failed',
      error instanceof Error ? error.name : 'unknown_error'
    );
    return NextResponse.json(
      { ok: false, error: 'Unable to submit IndexNow URLs.' },
      { status: 500 }
    );
  }
}
