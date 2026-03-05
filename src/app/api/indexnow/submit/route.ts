import { NextResponse } from 'next/server';
import { SITE } from '../../../../lib/seo';

type IndexNowBody = {
  urls?: string[];
};

export async function POST(request: Request) {
  try {
    const key = process.env.INDEXNOW_KEY;

    if (!key) {
      return NextResponse.json(
        { ok: false, error: 'INDEXNOW_KEY is not configured.' },
        { status: 400 }
      );
    }

    const body = (await request.json()) as IndexNowBody;
    const urls = Array.isArray(body.urls)
      ? body.urls.filter((url) => typeof url === 'string' && url.startsWith(SITE.url))
      : [];

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
    console.error('[indexnow] submit failed', error);
    return NextResponse.json(
      { ok: false, error: 'Unable to submit IndexNow URLs.' },
      { status: 500 }
    );
  }
}
