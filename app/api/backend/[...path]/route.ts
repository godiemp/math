import { NextRequest, NextResponse } from 'next/server';

/**
 * Backend API Proxy
 *
 * This proxy route forwards requests to the Railway backend to bypass Safari's
 * Intelligent Tracking Prevention (ITP) which blocks third-party cookies.
 *
 * How it works:
 * - Client sends API requests to /api/backend/* (same domain as frontend)
 * - This route forwards the request to the Railway backend
 * - Cookies are forwarded in both directions
 * - Safari treats these as first-party cookies, allowing authentication to work
 *
 * This is a standard pattern for cross-origin authentication issues with Safari.
 */

/**
 * Get the backend URL based on environment
 * Reuses the same logic from /api/config
 */
function getBackendUrl(): string {
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV;
  const prNumber = process.env.VERCEL_GIT_PULL_REQUEST_ID;
  const branchName = process.env.VERCEL_GIT_COMMIT_REF;
  const nodeEnv = process.env.NODE_ENV;

  const explicitApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const explicitRailwayUrl = process.env.NEXT_PUBLIC_RAILWAY_URL;

  if (explicitApiUrl) return explicitApiUrl;
  if (explicitRailwayUrl) return explicitRailwayUrl;

  if (vercelEnv === 'preview') {
    let pr = prNumber;
    if (!pr && branchName) {
      const prMatch = branchName.match(/pr[/-]?(\d+)|#(\d+)/i);
      pr = prMatch?.[1] || prMatch?.[2];
    }
    if (pr) {
      return `https://paes-math-backend-math-pr-${pr}.up.railway.app`;
    }
    return 'https://paes-math-backend-production.up.railway.app';
  }

  if (nodeEnv === 'development') {
    return 'http://localhost:3001';
  }

  return 'https://paes-math-backend-production.up.railway.app';
}

/**
 * Headers that should not be forwarded to the backend
 */
const EXCLUDED_REQUEST_HEADERS = [
  'host',
  'connection',
  'content-length', // Will be recalculated
  'transfer-encoding',
];

/**
 * Headers that should not be forwarded from the backend response
 */
const EXCLUDED_RESPONSE_HEADERS = [
  'connection',
  'transfer-encoding',
  'content-encoding', // Let Next.js handle compression
];

/**
 * Forward a request to the backend
 */
async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await context.params;
  const backendUrl = getBackendUrl();

  // Construct the full backend URL with the path
  // Note: The path already includes 'api/' prefix from the client endpoints
  const targetPath = path.join('/');
  const url = new URL(`${backendUrl}/${targetPath}`);

  // Forward query parameters
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  // Build headers to forward
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!EXCLUDED_REQUEST_HEADERS.includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  // Get the request body for methods that support it
  let body: BodyInit | null = null;
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    // Check if it's FormData
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      body = await request.formData();
    } else {
      body = await request.text();
    }
  }

  try {
    // Forward the request to the backend
    const response = await fetch(url.toString(), {
      method: request.method,
      headers,
      body,
      // Don't follow redirects - let the client handle them
      redirect: 'manual',
    });

    // Build response headers
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (!EXCLUDED_RESPONSE_HEADERS.includes(key.toLowerCase())) {
        // Forward Set-Cookie headers - this is crucial for auth
        if (key.toLowerCase() === 'set-cookie') {
          // Set-Cookie needs special handling for multiple cookies
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    });

    // Get response body
    const responseBody = await response.arrayBuffer();

    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Backend proxy error:', error);
    console.error('Target URL:', url.toString());
    return NextResponse.json(
      { error: 'Failed to connect to backend' },
      { status: 502 }
    );
  }
}

// Export handlers for all HTTP methods
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
