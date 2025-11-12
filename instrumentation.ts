export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export async function onRequestError(
  err: unknown,
  request: {
    path: string;
    method: string;
    headers: Headers;
  },
  context: {
    routerKind: string;
    routeType: string;
    routePath?: string;
  }
) {
  await import('@sentry/nextjs').then((Sentry) => {
    // Convert Headers object to plain object for Sentry
    const headersObj: Record<string, string | string[] | undefined> = {};
    request.headers.forEach((value, key) => {
      headersObj[key] = value;
    });

    Sentry.captureRequestError(err, {
      ...request,
      headers: headersObj,
    }, {
      ...context,
      routePath: context.routePath || request.path,
    });
  });
}
