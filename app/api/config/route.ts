import { NextResponse } from 'next/server';

/**
 * API endpoint to get runtime configuration
 * This runs server-side and can access environment variables at REQUEST time,
 * not BUILD time, solving the issue where VERCEL_GIT_PULL_REQUEST_ID
 * is not available during the first PR build.
 */
export async function GET() {
  // These are read at REQUEST time on the server, not build time
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV;
  const prNumber = process.env.VERCEL_GIT_PULL_REQUEST_ID;
  const branchName = process.env.VERCEL_GIT_COMMIT_REF;
  const nodeEnv = process.env.NODE_ENV;

  // Explicit overrides
  const explicitApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const explicitRailwayUrl = process.env.NEXT_PUBLIC_RAILWAY_URL;

  let backendUrl: string;

  // Priority 1: Explicit API URL
  if (explicitApiUrl) {
    backendUrl = explicitApiUrl;
  }
  // Priority 2: Explicit Railway URL
  else if (explicitRailwayUrl) {
    backendUrl = explicitRailwayUrl;
  }
  // Priority 3: Construct from PR number (Vercel preview)
  else if (vercelEnv === 'preview') {
    let pr = prNumber;

    // Fallback: extract from branch name
    if (!pr && branchName) {
      const prMatch = branchName.match(/pr[/-]?(\d+)|#(\d+)/i);
      pr = prMatch?.[1] || prMatch?.[2];
    }

    if (pr) {
      backendUrl = `https://paes-math-backend-math-pr-${pr}.up.railway.app`;
    } else {
      // No PR number found, fallback to production
      console.warn('⚠️  Preview environment but no PR number found. Using production backend.');
      backendUrl = 'https://paes-math-backend-production.up.railway.app';
    }
  }
  // Priority 4: Development environment
  else if (nodeEnv === 'development') {
    backendUrl = 'http://localhost:3001';
  }
  // Priority 5: Default to production backend
  else {
    backendUrl = 'https://paes-math-backend-production.up.railway.app';
  }

  return NextResponse.json({
    backendUrl,
    debug: {
      vercelEnv,
      prNumber,
      branchName,
      nodeEnv,
    },
  });
}
