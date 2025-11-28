import { auth } from "@/auth"
import { NextResponse } from 'next/server';

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/practice',
  '/curriculum',
  '/progress',
  '/dashboard',
  '/admin',
  '/payments/history'
];

// Admin-only routes
const ADMIN_ROUTES = [
  '/admin'
];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));

  // Log middleware execution for debugging
  if (process.env.NODE_ENV === 'test') {
    console.log('[Middleware] Path:', pathname, 'Protected:', isProtectedRoute, 'Auth:', !!req.auth);
  }

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check if user is authenticated via NextAuth session
  if (!req.auth) {
    if (process.env.NODE_ENV === 'test') {
      console.log('[Middleware] Redirecting to home - no session');
    }
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Check admin routes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (isAdminRoute && (req.auth.user as any)?.role !== 'admin') {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // User is authenticated - allow access
  return NextResponse.next();
})

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /monitoring (Sentry tunnel)
  // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
  matcher: ['/((?!api|_next|monitoring|favicon.ico|sitemap.xml|robots.txt).*)']
};
