import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // Expose Vercel's PR ID to the client (available at build time)
    NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID: process.env.VERCEL_GIT_PULL_REQUEST_ID || '',
  },
};

export default nextConfig;
