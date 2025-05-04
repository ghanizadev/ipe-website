import { Redirect } from '@/payload-types';
import payloadConfig from '@payload-config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';

let redirects: Redirect[] | undefined;
let lastUpdate: number = Date.now();

const REDIRECT_REFRESH_INTERVAL =
  1000 * parseInt(process.env.REDIRECT_REFRESH_INTERVAL ?? '300');

export async function middleware(request: NextRequest) {
  if (!redirects || Date.now() - lastUpdate > REDIRECT_REFRESH_INTERVAL) {
    const payload = await getPayload({ config: payloadConfig });
    const { docs } = await payload.find({
      collection: 'redirects',
      limit: 0,
      overrideAccess: true,
    });

    redirects = docs;
    lastUpdate = Date.now();
  }

  const { pathname } = new URL(request.url);
  const redirect = redirects.find((redirect) => pathname === redirect.source);

  if (redirect) {
    return NextResponse.redirect(
      new URL(redirect.target, request.url),
      parseInt(redirect.code ?? '301')
    );
  }
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
