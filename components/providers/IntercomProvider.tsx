'use client';

import { useEffect, useRef } from 'react';
import Intercom, { boot, shutdown } from '@intercom/messenger-js-sdk';
import { useAuth } from '@/contexts/AuthContext';

const APP_ID = 'uzabsd5b';

export function IntercomProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const isInitialized = useRef(false);
  const lastUserId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Intercom script once
    if (!isInitialized.current) {
      Intercom({ app_id: APP_ID });
      isInitialized.current = true;
    }

    const currentUserId = user?.id ?? null;

    // Skip if user hasn't changed
    if (lastUserId.current === currentUserId) return;

    // Shutdown previous session if user changed (not on first load)
    if (lastUserId.current !== undefined) {
      shutdown();
    }

    lastUserId.current = currentUserId;

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
  }, [user, isAuthenticated, isLoading]);

  return <>{children}</>;
}
