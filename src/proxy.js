import { NextResponse } from 'next/server';

const DEFAULT_DATA_API_URL = 'https://ep-young-waterfall-b2lfjemj.apirest.c-6.eu-central-1.aws.neon.tech/mendy_cms/rest/v1';

export async function proxy(request) {
  const baseUrl = (process.env.CMS_DATA_API_URL || DEFAULT_DATA_API_URL).replace(/\/$/, '');
  try {
    const response = await fetch(`${baseUrl}/rpc/cms_public_redirect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ p_from: request.nextUrl.pathname }),
      cache: 'no-store',
    });
    if (!response.ok) return NextResponse.next();
    const redirect = await response.json();
    if (!redirect?.to_path) return NextResponse.next();
    const destination = new URL(redirect.to_path, request.url);
    if (destination.href === request.url) return NextResponse.next();
    return NextResponse.redirect(destination, Number(redirect.status_code) || 308);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|admin|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|css|js|woff|woff2)$).*)'],
};
