'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/components/ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  loadingMessage?: string; // Optional custom loading message
}

// Route-specific loading messages
const getLoadingMessage = (pathname: string): string => {
  // Match specific routes with personalized messages
  if (pathname === '/dashboard') return 'Cargando tu panel...';
  if (pathname === '/practice/m1') return 'Preparando ejercicios M1...';
  if (pathname === '/practice/m2') return 'Preparando ejercicios M2...';
  if (pathname === '/curriculum/m1') return 'Cargando temario M1...';
  if (pathname === '/curriculum/m2') return 'Cargando temario M2...';
  if (pathname.startsWith('/curriculum/m1/docs')) return 'Cargando documentación M1...';
  if (pathname.startsWith('/curriculum/m2/docs')) return 'Cargando documentación M2...';
  if (pathname === '/progress') return 'Cargando tu progreso...';
  if (pathname === '/live-practice') return 'Preparando ensayo en vivo...';
  if (pathname === '/admin') return 'Accediendo al panel de administración...';
  if (pathname === '/admin/upload') return 'Cargando gestor de contenido...';
  if (pathname === '/admin/problems') return 'Cargando gestión de problemas...';

  // Default message for unknown routes
  return 'Cargando...';
};

const LOADING_THRESHOLD_MS = 200; // Only show loading if it takes longer than this

export function ProtectedRoute({ children, requireAdmin = false, loadingMessage }: ProtectedRouteProps) {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldShowLoading, setShouldShowLoading] = useState(false);
  const [showInitialLoading, setShowInitialLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Show loading screen after threshold when auth is still loading
  useEffect(() => {
    if (!isLoading) {
      setShowInitialLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowInitialLoading(true);
    }, LOADING_THRESHOLD_MS);

    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    // Don't make auth decisions while auth is still loading
    if (isLoading) {
      return;
    }

    // Start a timer to show loading only if check takes longer than threshold
    const loadingTimer = setTimeout(() => {
      setShouldShowLoading(true);
    }, LOADING_THRESHOLD_MS);

    // Check authentication (only after verification is complete)
    if (!isAuthenticated) {
      clearTimeout(loadingTimer);
      setIsRedirecting(true);
      router.push('/');
      return;
    }

    if (requireAdmin && !isAdmin) {
      clearTimeout(loadingTimer);
      setIsRedirecting(true);
      router.push('/');
      return;
    }

    // If we're authenticated, cancel the loading timer
    return () => clearTimeout(loadingTimer);
  }, [isLoading, isAuthenticated, isAdmin, requireAdmin, router]);

  // Get the appropriate message based on route or use custom message
  const currentLoadingMessage = loadingMessage || getLoadingMessage(pathname);

  // Show loading while auth is being checked (after threshold to avoid flash)
  if (isLoading) {
    return showInitialLoading ? (
      <LoadingScreen message={currentLoadingMessage} />
    ) : null;
  }

  // Show redirect message if redirecting due to lack of authentication
  if (!isAuthenticated && isRedirecting) {
    return <LoadingScreen message="Redirigiendo al inicio..." />;
  }

  if (requireAdmin && !isAdmin && isRedirecting) {
    return <LoadingScreen message="Acceso denegado..." />;
  }

  // If not authenticated but not redirecting yet, don't show anything
  if (!isAuthenticated) {
    return null;
  }

  // Don't show loading - with cached user, authentication is instant
  // The threshold prevents unnecessary loading flashes
  return <>{children}</>;
}
