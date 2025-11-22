// instrumentation-client.ts
// Official PostHog integration for Next.js 15.3+
// This provides better performance than the old PostHogProvider approach

import posthog from 'posthog-js'
import * as Sentry from '@sentry/nextjs'

if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',

      // Automatically capture events
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,

      // Session recording with privacy defaults
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '[data-mask]',
      },

      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog initialized successfully')
        }
      }
    })
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn('PostHog API key not found. Analytics will be disabled.')
    }
  }
}

// Sentry Client Configuration
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  environment: process.env.NODE_ENV,

  // Ignore common errors that aren't actionable
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    // Random plugins/extensions
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'http://tt.epicplay.com',
    "Can't find variable: ZiteReader",
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'http://loading.retry.widdit.com/',
    'atomicFindClose',
    // Facebook borked
    'fb_xd_fragment',
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    // See http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    'Non-Error promise rejection captured',
    // Chrome extensions
    'chrome-extension://',
    'moz-extension://',
  ],

  beforeSend(event, hint) {
    // Filter out errors from browser extensions
    if (event.exception?.values?.[0]?.stacktrace?.frames?.some(
      frame => frame.filename?.includes('chrome-extension://') || frame.filename?.includes('moz-extension://')
    )) {
      return null;
    }
    return event;
  },
})

// Export navigation instrumentation for Next.js 15.3+
// This enables Sentry to automatically capture router transitions
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
