import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/practice',
  '/curriculum',
  '/progress',
  '/profile',
  '/admin',
];

// Routes that are public (don't require auth)
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/pricing',
  '/live-practice',
];

/**
 * Check if a path matches any protected route
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Check if a path is public
 */
function isPublicRoute(pathname: string): boolean {
  // Exact match for root and other specific routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return true;
  }
  // Check if it's a subpath of a public route (e.g., /live-practice/xyz matches /live-practice)
  // But NOT just any path that starts with /
  return PUBLIC_ROUTES.some(route =>
    route !== '/' && (pathname.startsWith(route + '/') || pathname === route)
  );
}

/**
 * Verify JWT token using jose (Edge Runtime compatible)
 */
async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  if (isProtectedRoute(pathname)) {
    const accessToken = request.cookies.get('accessToken')?.value;

    // No token found - redirect to home
    if (!accessToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // Verify token
    const isValid = await verifyToken(accessToken);

    if (!isValid) {
      // Invalid token - redirect to home
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /monitoring (Sentry tunnel)
  // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
  matcher: ['/((?!api|_next|monitoring|favicon.ico|sitemap.xml|robots.txt).*)']
};
