'use client'

/**
 * PostHog Provider Component
 *
 * Initializes PostHog analytics on the client side
 * Must be a client component since PostHog runs in the browser
 */

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initAnalytics, analytics } from '@/lib/analytics'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize PostHog on mount
  useEffect(() => {
    initAnalytics()
  }, [])

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      // Let PostHog's autocapture handle pageviews
      // Or manually track with more context:
      analytics.track('$pageview', {
        pathname,
        search: searchParams?.toString(),
      })
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
