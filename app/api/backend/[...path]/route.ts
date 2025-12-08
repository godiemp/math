import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

/**
 * Backend API Proxy - Fixes Safari ITP cookie blocking
 */

function getBackendUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (process.env.NEXT_PUBLIC_RAILWAY_URL) return process.env.NEXT_PUBLIC_RAILWAY_URL;

  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === 'preview') {
    const pr = process.env.VERCEL_GIT_PULL_REQUEST_ID;
    if (pr) return `https://paes-math-backend-math-pr-${pr}.up.railway.app`;
    return 'https://paes-math-backend-production.up.railway.app';
  }

  if (process.env.NODE_ENV === 'development') return 'http://localhost:3001';
  return 'https://paes-math-backend-production.up.railway.app';
}

async function handleProxy(request: NextRequest, pathSegments: string[]) {
  const backendUrl = getBackendUrl();
  const targetPath = pathSegments.join('/');
  const targetUrl = `${backendUrl}/${targetPath}`;

  // Build URL with query params
  const url = new URL(targetUrl);
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  console.log(`[Proxy] ${request.method} -> ${url.toString()}`);

  // Forward headers (excluding hop-by-hop headers)
  const headers: Record<string, string> = {};
  const excludeHeaders = ['host', 'connection', 'content-length', 'transfer-encoding'];
  request.headers.forEach((value, key) => {
    if (!excludeHeaders.includes(key.toLowerCase())) {
      headers[key] = value;
    }
  });

  // Get body for write methods
  let body: string | undefined;
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    body = await request.text();
    console.log(`[Proxy] Body length: ${body.length}`);
  }

  try {
    const response = await fetch(url.toString(), {
      method: request.method,
      headers,
      body,
    });

    console.log(`[Proxy] Response: ${response.status}`);

    // Get response body
    const responseBody = await response.text();

    // Build response headers
    const responseHeaders = new Headers();
    const excludeResponseHeaders = ['connection', 'transfer-encoding', 'content-encoding'];
    response.headers.forEach((value, key) => {
      if (!excludeResponseHeaders.includes(key.toLowerCase())) {
        responseHeaders.append(key, value);
      }
    });

    return new NextResponse(responseBody, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('[Proxy] Error:', error);
    return NextResponse.json({ error: 'Proxy error', details: String(error) }, { status: 502 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  });
}
