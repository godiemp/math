export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export async function onRequestError(err: unknown, request: {
  path: string;
}, context: {
  routerKind: string;
  routeType: string;
}) {
  await import('@sentry/nextjs').then((Sentry) => {
    Sentry.captureRequestError(err, request, context);
  });
}
