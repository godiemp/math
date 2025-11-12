'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';
import { useAuth } from '@/contexts/AuthContext';

export function IntercomProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) {
      console.log('Intercom: Waiting for auth to load...');
      return;
    }

    // Only initialize Intercom if user is authenticated
    if (isAuthenticated && user) {
      console.log('Initializing Intercom for user:', {
        id: user.id,
        name: user.displayName,
        email: user.email,
      });

      Intercom({
        app_id: 'uzabsd5b',
        user_id: user.id,
        name: user.displayName,
        email: user.email,
        created_at: user.createdAt, // Already in Unix timestamp format (seconds)
        // Add additional custom attributes
        user_role: user.role,
        subscription_status: user.subscription?.status || 'none',
        target_level: user.targetLevel || 'not_set',
      });

      console.log('Intercom initialized successfully');
    } else {
      console.log('Intercom not initialized - user not authenticated', { isAuthenticated, hasUser: !!user });
    }
  }, [user, isAuthenticated, isLoading]);

  return <>{children}</>;
}
