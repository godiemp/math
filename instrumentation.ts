export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }

  // Load PostHog client-side instrumentation
  // This only runs on the client due to the window check in instrumentation-client.ts
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./instrumentation-client');
  }
}
