'use client'

/**
 * PostHog Provider Component
 *
 * Initializes PostHog analytics on the client side
 * Must be a client component since PostHog runs in the browser
 */

import { useEffect } from 'react'
import { initAnalytics } from '@/lib/analytics'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Initialize PostHog on mount
  useEffect(() => {
    initAnalytics()
  }, [])

  // Note: PageView tracking is handled automatically by PostHog's capture_pageview config
  // No need to manually track pageviews here

  return <>{children}</>
}
