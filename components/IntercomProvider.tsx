'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Intercom integration component
 * Loads Intercom messenger and identifies users for support chat
 */
export function IntercomProvider() {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

    // Don't load if no app ID is configured
    if (!appId) {
      console.warn('Intercom app ID not configured. Set NEXT_PUBLIC_INTERCOM_APP_ID to enable chat support.');
      return;
    }

    // Load Intercom script
    const loadIntercom = () => {
      // @ts-ignore
      window.intercomSettings = {
        app_id: appId,
        api_base: 'https://api-iam.intercom.io',
      };

      // Add Intercom script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://widget.intercom.io/widget/${appId}`;

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);

      // Initialize Intercom method
      // @ts-ignore
      window.Intercom = function() {
        // @ts-ignore
        window.Intercom.c(arguments);
      };
      // @ts-ignore
      window.Intercom.q = [];
      // @ts-ignore
      window.Intercom.c = function(args: any) {
        // @ts-ignore
        window.Intercom.q.push(args);
      };
    };

    loadIntercom();

    // Cleanup
    return () => {
      // @ts-ignore
      if (window.Intercom) {
        // @ts-ignore
        window.Intercom('shutdown');
      }
    };
  }, []);

  // Update Intercom with user identity when user logs in/out
  useEffect(() => {
    // @ts-ignore
    if (typeof window === 'undefined' || !window.Intercom) return;

    const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;
    if (!appId) return;

    if (isAuthenticated && user) {
      // Boot Intercom with user identity
      // @ts-ignore
      window.Intercom('boot', {
        app_id: appId,
        user_id: user.id,
        name: user.displayName,
        email: user.email,
        created_at: Math.floor(user.createdAt / 1000), // Intercom expects Unix timestamp in seconds
        user_hash: undefined, // Optional: Add identity verification hash for security
        // Custom attributes
        username: user.username,
        role: user.role,
        subscription_status: user.subscription?.status || 'free',
        subscription_plan: user.subscription?.planId || 'free',
        target_level: user.targetLevel || 'not_set',
        current_streak: user.currentStreak || 0,
        longest_streak: user.longestStreak || 0,
      });
    } else {
      // Boot Intercom for anonymous users
      // @ts-ignore
      window.Intercom('boot', {
        app_id: appId,
      });
    }
  }, [user, isAuthenticated]);

  return null; // This component doesn't render anything
}
