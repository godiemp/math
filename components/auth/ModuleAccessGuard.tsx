'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { SoftPaywallMessage } from '@/components/auth/SoftPaywallMessage';

interface ModuleAccessGuardProps {
  children: React.ReactNode;
  moduleName: string;
}

/**
 * ModuleAccessGuard
 *
 * Guards premium modules (Practice, Curriculum, Progress) from free users.
 * Free users (non-admin, no subscription) will see a soft paywall message.
 * Admins and paid users have full access.
 */
export function ModuleAccessGuard({ children, moduleName }: ModuleAccessGuardProps) {
  const { user, isAuthenticated, isPaidUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Don't show anything if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  // Free users see the soft paywall
  if (!isPaidUser) {
    return <SoftPaywallMessage moduleName={moduleName} />;
  }

  // Paid users and admins see the content
  return <>{children}</>;
}
