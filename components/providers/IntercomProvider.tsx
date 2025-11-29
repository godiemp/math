'use client';

import { useEffect, useRef } from 'react';
import Intercom from '@intercom/messenger-js-sdk';
import { useAuth } from '@/contexts/AuthContext';

export function IntercomProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const lastUserId = useRef<string | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const currentUserId = user?.id ?? null;

    // Only reinitialize if user changed (login/logout)
    if (lastUserId.current === currentUserId) return;
    lastUserId.current = currentUserId;

    // Note: Intercom is customer support, not analytics, so it doesn't require cookie consent
    if (isAuthenticated && user) {
      Intercom({
        app_id: 'uzabsd5b',
        user_id: user.id,
        name: user.displayName,
        email: user.email,
        created_at: user.createdAt,
        user_role: user.role,
        subscription_status: user.subscription?.status || 'none',
        target_level: user.targetLevel || 'not_set',
      });
    } else {
      Intercom({
        app_id: 'uzabsd5b',
      });
    }
  }, [user, isAuthenticated, isLoading]);

  return <>{children}</>;
}
