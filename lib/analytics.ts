/**
 * PostHog Analytics Integration
 *
 * Provides a centralized interface for product analytics, feature flags,
 * and session replay functionality.
 *
 * Usage:
 *   import { analytics } from '@/lib/analytics'
 *   analytics.track('event_name', { property: 'value' })
 *   analytics.identify(userId, { email, name })
 *   const isEnabled = analytics.getFeatureFlag('feature-name')
 */

import posthog from 'posthog-js'

// Track initialization state to prevent double-initialization
let isInitialized = false

/**
 * Initialize PostHog analytics
 * Should be called once in the app layout on client side
 */
export function initAnalytics(): void {
  // Only run on client side
  if (typeof window === 'undefined') {
    return
  }

  // Prevent double initialization
  if (isInitialized) {
    return
  }

  // Check cookie consent before initializing
  const cookieConsent = localStorage.getItem('cookie-consent')
  if (cookieConsent !== 'accepted') {
    console.log('PostHog analytics disabled: User has not accepted cookies')
    return
  }

  // Check for required environment variables
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com'

  if (!apiKey) {
    console.warn('PostHog API key not found. Analytics will be disabled.')
    return
  }

  try {
    posthog.init(apiKey, {
      // Use reverse proxy to bypass ad-blockers
      // This sends events to /api/ingest/* on our domain, which forwards to PostHog
      api_host: typeof window !== 'undefined' ? window.location.origin : apiHost,
      ui_host: apiHost, // PostHog dashboard URL for links

      // Automatically capture pageviews
      capture_pageview: true,

      // Automatically capture clicks, form submissions, etc.
      // Set to false if you want manual control
      autocapture: true,

      // Session recording configuration
      session_recording: {
        // Mask all input fields by default for privacy
        // Users won't see typed passwords, emails, etc. in recordings
        maskAllInputs: true,

        // Mask text content with specific selector to protect PII
        maskTextSelector: '[data-mask]',
      },

      // Load PostHog asynchronously to not block page load
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog initialized successfully')
          console.log('PostHog proxy enabled: events will be sent to /api/ingest/*')
        }
      },

      // Respect user privacy preferences
      opt_out_capturing_by_default: false,

      // Enable feature flags
      bootstrap: {
        featureFlags: {},
      },
    })

    isInitialized = true
  } catch (error) {
    console.error('Failed to initialize PostHog:', error)
  }
}

/**
 * Analytics interface
 * Provides type-safe methods for tracking events, identifying users, and checking feature flags
 */
export const analytics = {
  /**
   * Track a custom event
   *
   * @param event - Event name (e.g., 'quiz_started', 'payment_completed')
   * @param properties - Event properties (optional)
   *
   * @example
   * analytics.track('quiz_started', {
   *   level: 'M1',
   *   mode: 'zen',
   *   subject: 'algebra'
   * })
   */
  track: (event: string, properties?: Record<string, any>): void => {
    if (typeof window === 'undefined' || !isInitialized) {
      return
    }

    try {
      posthog.capture(event, properties)
    } catch (error) {
      console.error('Failed to track event:', error)
    }
  },

  /**
   * Identify a user
   * Associates all future events with this user ID and enriches user profile
   *
   * @param userId - Unique user identifier
   * @param traits - User properties (optional)
   *
   * @example
   * analytics.identify(user.id, {
   *   email: user.email,
   *   level: 'M1',
   *   subscriptionStatus: 'premium'
   * })
   */
  identify: (userId: string, traits?: Record<string, any>): void => {
    if (typeof window === 'undefined' || !isInitialized) {
      return
    }

    try {
      posthog.identify(userId, traits)
    } catch (error) {
      console.error('Failed to identify user:', error)
    }
  },

  /**
   * Update user properties without changing the identified user
   *
   * @param properties - Properties to set on the user
   *
   * @example
   * analytics.setUserProperties({
   *   currentStreak: 5,
   *   subscriptionStatus: 'premium'
   * })
   */
  setUserProperties: (properties: Record<string, any>): void => {
    if (typeof window === 'undefined' || !isInitialized) {
      return
    }

    try {
      posthog.people.set(properties)
    } catch (error) {
      console.error('Failed to set user properties:', error)
    }
  },

  /**
   * Check if a feature flag is enabled
   *
   * @param flag - Feature flag key
   * @returns boolean - Whether the flag is enabled for this user
   *
   * @example
   * if (analytics.getFeatureFlag('new-ai-tutor-ui')) {
   *   return <NewAITutor />
   * }
   */
  getFeatureFlag: (flag: string): boolean => {
    if (typeof window === 'undefined' || !isInitialized) {
      return false
    }

    try {
      return posthog.isFeatureEnabled(flag) ?? false
    } catch (error) {
      console.error('Failed to get feature flag:', error)
      return false
    }
  },

  /**
   * Get feature flag variant (for A/B tests with multiple variants)
   *
   * @param flag - Feature flag key
   * @returns string | boolean - Flag variant or boolean
   *
   * @example
   * const variant = analytics.getFeatureFlagVariant('pricing-cta-test')
   * if (variant === 'urgent') {
   *   return <UrgentCTA />
   * }
   */
  getFeatureFlagVariant: (flag: string): string | boolean | undefined => {
    if (typeof window === 'undefined' || !isInitialized) {
      return undefined
    }

    try {
      return posthog.getFeatureFlag(flag)
    } catch (error) {
      console.error('Failed to get feature flag variant:', error)
      return undefined
    }
  },

  /**
   * Reset user identification (e.g., on logout)
   * Clears user ID and starts a new anonymous session
   */
  reset: (): void => {
    if (typeof window === 'undefined' || !isInitialized) {
      return
    }

    try {
      posthog.reset()
    } catch (error) {
      console.error('Failed to reset PostHog:', error)
    }
  },

  /**
   * Manually start session recording
   * Useful if you want to record specific sessions
   */
  startRecording: (): void => {
    if (typeof window === 'undefined' || !isInitialized) {
      return
    }

    try {
      posthog.startSessionRecording()
    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  },

  /**
   * Manually stop session recording
   */
  stopRecording: (): void => {
    if (typeof window === 'undefined' || !isInitialized) {
      return
    }

    try {
      posthog.stopSessionRecording()
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  },
}

/**
 * React hook for feature flags
 *
 * @example
 * function MyComponent() {
 *   const isEnabled = useFeatureFlag('new-feature')
 *   if (!isEnabled) return null
 *   return <NewFeature />
 * }
 */
export function useFeatureFlag(flag: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return analytics.getFeatureFlag(flag)
}

// Export PostHog instance for advanced usage
export { posthog }
