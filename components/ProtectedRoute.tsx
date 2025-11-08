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

export function ProtectedRoute({ children, requireAdmin = false, loadingMessage }: ProtectedRouteProps) {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Small delay to check authentication state
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isChecking) return;

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
  }, [isAuthenticated, isAdmin, requireAdmin, router, isChecking]);

  // Get the appropriate message based on route or use custom message
  const currentLoadingMessage = loadingMessage || getLoadingMessage(pathname);

  // Show route-specific loading while checking authentication
  if (isChecking) {
    return <LoadingScreen message={currentLoadingMessage} />;
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

  return <>{children}</>;
}
