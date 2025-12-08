import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

// Determine backend URL based on environment
function getBackendUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (process.env.NEXT_PUBLIC_RAILWAY_URL) return process.env.NEXT_PUBLIC_RAILWAY_URL;

  // For PR preview deployments
  const prNumber = process.env.VERCEL_GIT_PULL_REQUEST_ID;
  if (process.env.VERCEL_ENV === 'preview' && prNumber) {
    return `https://paes-math-backend-math-pr-${prNumber}.up.railway.app`;
  }

  // Production backend
  return 'https://paes-math-backend-production.up.railway.app';
}

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // Expose Vercel's PR ID to the client (available at build time)
    NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID: process.env.VERCEL_GIT_PULL_REQUEST_ID || '',
  },
  // Instrumentation is enabled by default in Next.js 15

  // Proxy API requests to backend - fixes Safari ITP cookie blocking
  async rewrites() {
    const backendUrl = getBackendUrl();
    console.log('[Next.js Config] Backend URL for rewrites:', backendUrl);

    return [
      {
        source: '/api/backend/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

const configWithIntl = withNextIntl(nextConfig);

export default withSentryConfig(configWithIntl, {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Suppresses source map uploading logs during build
  silent: !process.env.CI,

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors
  automaticVercelMonitors: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers
  tunnelRoute: "/monitoring",
});
