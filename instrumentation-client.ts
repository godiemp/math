// instrumentation-client.ts
// Official PostHog integration for Next.js 15.3+
// This provides better performance than the old PostHogProvider approach

import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
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
}
