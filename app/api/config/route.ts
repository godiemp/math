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
      // No PR number found, fallback to localhost
      backendUrl = 'http://localhost:3001';
    }
  }
  // Priority 4: Default localhost for development
  else {
    backendUrl = 'http://localhost:3001';
  }

  return NextResponse.json({
    backendUrl,
    debug: {
      vercelEnv,
      prNumber,
      branchName,
    },
  });
}
