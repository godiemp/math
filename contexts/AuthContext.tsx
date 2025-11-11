'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { getCachedUser, fetchCurrentUser } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPaidUser: boolean;
  isVerifying: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize with cached user immediately (no loading state)
  const [user, setUser] = useState<User | null>(() => getCachedUser());
  // Track if we're verifying the cached user with backend
  const [isVerifying, setIsVerifying] = useState<boolean>(() => {
    // Only set to true if there's a cached user to verify
    return getCachedUser() !== null;
  });

  const refreshUser = async () => {
    const fetchedUser = await fetchCurrentUser();
    setUser(fetchedUser);
  };

  useEffect(() => {
    // Verify user with backend in the background
    const initAuth = async () => {
      const cachedUser = getCachedUser();

      if (cachedUser) {
        // Verify with backend without blocking UI
        const fetchedUser = await fetchCurrentUser();
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          // Token was invalid, clear cached user
          setUser(null);
        }
        // Mark verification as complete
        setIsVerifying(false);
      } else {
        // No cached user, no need to verify
        setIsVerifying(false);
      }
    };

    initAuth();
  }, []);

  // Check if user has paid access (admins always have access, or users with active/trial subscription)
  const isPaidUser = !!user && (
    user.role === 'admin' ||
    (user.subscription?.status === 'active' || user.subscription?.status === 'trial')
  );

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isPaidUser,
    isVerifying,
    refreshUser,
  };

  // No global loading screen - let individual pages handle their own loading states
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
