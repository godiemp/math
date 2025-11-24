import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

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

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get the access token from cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  // No token - redirect to home
  if (!accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  try {
    // Verify the token using jose (Edge Runtime compatible)
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured');
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // Convert string secret to Uint8Array for jose
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(accessToken, secret);

    // Check admin routes
    if (isAdminRoute && payload.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // Token is valid - allow access
    return NextResponse.next();
  } catch (error) {
    // Invalid or expired token - redirect to home
    console.error('Token verification failed:', error instanceof Error ? error.message : 'Unknown error');
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /monitoring (Sentry tunnel)
  // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
  matcher: ['/((?!api|_next|monitoring|favicon.ico|sitemap.xml|robots.txt).*)']
};
