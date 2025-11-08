'use client';

import { useEffect, useState } from 'react';
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
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsRedirecting(true);
      router.push('/');
      return;
    }

    if (requireAdmin && !isAdmin) {
      setIsRedirecting(true);
      router.push('/');
      return;
    }
  }, [isAuthenticated, isAdmin, requireAdmin, router]);

  // Only show loading if we're actually redirecting
  if (!isAuthenticated && isRedirecting) {
    return <LoadingScreen message="Redirigiendo al inicio..." />;
  }

  if (requireAdmin && !isAdmin && isRedirecting) {
    return <LoadingScreen message="Acceso denegado..." />;
  }

  // If not authenticated but not redirecting yet, don't show anything
  // This prevents flash of loading on initial render
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
