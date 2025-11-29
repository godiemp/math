'use client';

import { useEffect, useRef, useCallback } from 'react';
import Intercom, { boot, shutdown } from '@intercom/messenger-js-sdk';
import { useAuth } from '@/contexts/AuthContext';

const APP_ID = 'uzabsd5b';

// Check if Intercom widget is fully loaded (not just the queueHolder)
const isIntercomReady = () => {
  return (
    typeof window !== 'undefined' &&
    typeof window.Intercom === 'function' &&
    !(window.Intercom as any).q // queueHolder has .q property, real widget doesn't
  );
};

// Wait for Intercom widget to be ready
const waitForIntercom = (maxWait = 10000): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isIntercomReady()) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isIntercomReady()) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > maxWait) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 100);
  });
};

export function IntercomProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const isInitialized = useRef(false);
  const lastUserId = useRef<string | null | undefined>(undefined);

  const bootIntercom = useCallback(async () => {
    const currentUserId = user?.id ?? null;

    // Skip if user hasn't changed
    if (lastUserId.current === currentUserId) return;

    // Shutdown previous session if user changed (not on first load)
    if (lastUserId.current !== undefined) {
      shutdown();
    }

    lastUserId.current = currentUserId;

    // Wait for widget to be ready before booting
    const ready = await waitForIntercom();
    if (!ready) {
      console.warn('Intercom widget failed to load');
      return;
    }

    // Boot with user data or as anonymous visitor
    if (isAuthenticated && user) {
      boot({
        app_id: APP_ID,
        user_id: user.id,
        name: user.displayName,
        email: user.email,
        created_at: user.createdAt,
        user_role: user.role,
        subscription_status: user.subscription?.status || 'none',
        target_level: user.targetLevel || 'not_set',
      });
    } else {
      boot({
        app_id: APP_ID,
      });
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Intercom script once
    if (!isInitialized.current) {
      Intercom({ app_id: APP_ID });
      isInitialized.current = true;
    }

    bootIntercom();
  }, [isLoading, bootIntercom]);

  return <>{children}</>;
}
