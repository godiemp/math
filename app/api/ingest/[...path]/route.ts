import { NextRequest, NextResponse } from 'next/server'

/**
 * PostHog Reverse Proxy
 *
 * This proxy route forwards requests to PostHog's API to bypass ad-blockers.
 * Ad-blockers often block requests to analytics domains, but they typically
 * allow requests to the same domain (first-party requests).
 *
 * How it works:
 * - Client sends analytics events to /api/ingest/* (same domain)
 * - This route forwards the request to PostHog's actual API
 * - PostHog processes the event and returns a response
 * - The response is forwarded back to the client
 *
 * Usage:
 * Configure PostHog to use this proxy by setting:
 * ui_host: window.location.origin (or just omit to use current origin)
 *
 * Based on PostHog's official Next.js proxy guide:
 * https://posthog.com/docs/advanced/proxy/nextjs
 */

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params

  // Get PostHog host from environment
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

  // Construct the full PostHog URL
  const posthogUrl = `${posthogHost}/${path.join('/')}`

  try {
    // Get the request body
    const body = await request.text()

    // Forward the request to PostHog
    const response = await fetch(posthogUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
      },
      body,
    })

    // Get the response from PostHog
    const data = await response.text()

    // Return the response with CORS headers
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('PostHog proxy error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Also support GET requests for static assets like decide endpoint
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
  const posthogUrl = `${posthogHost}/${path.join('/')}`

  try {
    // Forward query parameters
    const url = new URL(posthogUrl)
    request.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': request.headers.get('user-agent') || '',
      },
    })

    const data = await response.text()

    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('PostHog proxy error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
