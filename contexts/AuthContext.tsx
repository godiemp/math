'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { getCachedUser, fetchCurrentUser } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize with cached user immediately (no loading state)
  const [user, setUser] = useState<User | null>(() => getCachedUser());

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
      }
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
