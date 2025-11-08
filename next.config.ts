import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // Expose Vercel's PR ID to the client (available at build time)
    NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID: process.env.VERCEL_GIT_PULL_REQUEST_ID || '',
  },

  // Webpack configuration for pdfjs-dist
  webpack: (config) => {
    // Externalize canvas and encoding to prevent server-side issues
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };
    return config;
  },
};

export default nextConfig;
