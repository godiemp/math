'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/components/ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    if (requireAdmin && !isAdmin) {
      router.push('/');
      return;
    }
  }, [isAuthenticated, isAdmin, requireAdmin, router]);

  // Show loading screen while redirecting if not authenticated
  if (!isAuthenticated) {
    return <LoadingScreen message="Redirigiendo..." />;
  }

  if (requireAdmin && !isAdmin) {
    return <LoadingScreen message="Redirigiendo..." />;
  }

  return <>{children}</>;
}
