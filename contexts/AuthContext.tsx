'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User } from '@/lib/types';
import { fetchCurrentUser, setCachedUser, clearCachedUser } from '@/lib/auth';
import { setOnAuthFailure } from '@/lib/api-client';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPaidUser: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status, update: updateSession } = useSession();
  const [fullUser, setFullUser] = useState<User | null>(null);
  const [isLoadingFullUser, setIsLoadingFullUser] = useState(false);

  // Derive basic user from NextAuth session
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sessionUserData = session?.user as any;
  const sessionUser: User | null = sessionUserData?.id && sessionUserData?.email ? {
    id: sessionUserData.id,
    username: sessionUserData.username || '',
    email: sessionUserData.email,
    displayName: sessionUserData.displayName || '',
    role: sessionUserData.role || 'student',
    createdAt: 0, // Will be populated by full user fetch
    subscription: sessionUserData.subscription ? {
      id: 0,
      userId: sessionUserData.id,
      planId: '',
      status: sessionUserData.subscription.status,
      startedAt: 0,
      expiresAt: sessionUserData.subscription.expiresAt,
      trialEndsAt: sessionUserData.subscription.trialEndsAt,
      autoRenew: false,
      createdAt: 0,
      updatedAt: 0,
    } : undefined,
    emailVerified: sessionUserData.emailVerified,
    gradeLevel: sessionUserData.gradeLevel,
  } : null;

  // Use full user if available, otherwise session user
  const user = fullUser || sessionUser;

  // Fetch full user data from backend when session becomes available
  const refreshUser = useCallback(async () => {
    if (!session?.user) {
      setFullUser(null);
      clearCachedUser();
      return;
    }

    setIsLoadingFullUser(true);
    try {
      const fetchedUser = await fetchCurrentUser();
      if (fetchedUser) {
        setFullUser(fetchedUser);
        setCachedUser(fetchedUser);
      }
    } catch (error) {
      console.error('Error fetching full user:', error);
    } finally {
      setIsLoadingFullUser(false);
    }
  }, [session?.user]);

  // Fetch full user when session changes
  useEffect(() => {
    if (status === 'authenticated' && session?.user && !fullUser) {
      refreshUser();
    } else if (status === 'unauthenticated') {
      setFullUser(null);
      clearCachedUser();
    }
  }, [status, session?.user, fullUser, refreshUser]);

  // Register global auth failure handler
  // This is called when API requests fail due to expired tokens and refresh fails
  useEffect(() => {
    setOnAuthFailure(() => {
      console.warn('Session expired - signing out');
      // Clear local state immediately for responsive UI
      setFullUser(null);
      clearCachedUser();
      // Trigger NextAuth signOut which will redirect to signin
      signOut({ callbackUrl: '/signin' });
    });

    // Cleanup on unmount
    return () => {
      setOnAuthFailure(null);
    };
  }, []);

  // setUser is now a no-op for compatibility - NextAuth manages the session
  // Components should use signIn/signOut from next-auth/react instead
  const setUser = useCallback((newUser: User | null) => {
    if (newUser) {
      setFullUser(newUser);
      setCachedUser(newUser);
    } else {
      setFullUser(null);
      clearCachedUser();
    }
  }, []);

  // Check if user has paid access (admins always have access, or users with active/trial subscription)
  const isPaidUser = !!user && (
    user.role === 'admin' ||
    (user.subscription?.status === 'active' || user.subscription?.status === 'trial')
  );

  // Loading state: NextAuth is loading OR we're fetching full user data
  const isLoading = status === 'loading' || isLoadingFullUser;

  // Force NextAuth to refetch the session from the server
  // This is needed after signIn() to ensure the session is up-to-date
  const refreshSession = useCallback(async () => {
    await updateSession();
  }, [updateSession]);

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isPaidUser,
    isLoading,
    refreshUser,
    refreshSession,
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
