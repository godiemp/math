import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  // Since we only have one locale (es-cl), we don't need locale routing
  // This middleware is here for future expansion if we add more locales
  return;
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /monitoring (Sentry tunnel)
  // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
  matcher: ['/((?!api|_next|monitoring|favicon.ico|sitemap.xml|robots.txt).*)']
};
