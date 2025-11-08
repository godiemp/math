'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { getCurrentUser, fetchCurrentUser } from '@/lib/auth';
import { LoadingScreen } from '@/components/ui';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    const fetchedUser = await fetchCurrentUser();
    setUser(fetchedUser);
  };

  useEffect(() => {
    // Try to load user from backend if we have a token
    const initAuth = async () => {
      const startTime = Date.now();
      const MIN_LOADING_TIME = 2000; // 2 seconds minimum

      // First check localStorage for cached user
      const cachedUser = getCurrentUser();

      if (cachedUser) {
        setUser(cachedUser);
        // Verify with backend in the background
        const fetchedUser = await fetchCurrentUser();
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          // Token was invalid, clear cached user
          setUser(null);
        }
      }

      // Ensure minimum loading time before hiding loader
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    initAuth();
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    refreshUser,
  };

  // Show loading screen while checking auth status
  if (isLoading) {
    return <LoadingScreen message="Verificando autenticación..." />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
