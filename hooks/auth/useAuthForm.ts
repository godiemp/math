'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { registerUser, loginUser } from '@/lib/auth';
import { analytics } from '@/lib/analytics';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';

interface UseAuthFormProps {
  onSuccess: (isNewUser?: boolean) => void;
}

interface UseAuthFormReturn {
  // Form state
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  displayName: string;
  setDisplayName: (value: string) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;

  // UI state
  isLogin: boolean;
  isLoading: boolean;
  isRetrying: boolean;
  error: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isPreview: boolean;

  // Actions
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleQuickSignIn: (testUsername: string, testPassword: string) => Promise<void>;
  toggleMode: () => void;
}

/**
 * Helper to retry API calls on network errors (handles Railway cold starts)
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  isRetryableError: (result: T) => boolean,
  maxRetries = 2,
  delayMs = 1000
): Promise<T> {
  let lastResult: T;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    lastResult = await fn();
    if (!isRetryableError(lastResult)) {
      return lastResult;
    }
    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return lastResult!;
}

/**
 * Manages authentication form state, validation, and submission logic
 */
export function useAuthForm({ onSuccess }: UseAuthFormProps): UseAuthFormReturn {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { refreshSession } = useAuth();

  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // UI state
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Show quick sign-in buttons on vercel.app URLs (excludes simplepaes.cl)
  const isPreview = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');

  const toggleMode = useCallback(() => {
    setIsLogin(prev => !prev);
    setError('');
  }, []);

  /**
   * Quick sign-in for preview environments
   */
  const handleQuickSignIn = useCallback(async (testUsername: string, testPassword: string) => {
    setError('');
    setIsLoading(true);
    setIsLogin(true);

    try {
      const loginResult = await withRetry(
        async () => {
          const result = await loginUser(testUsername, testPassword);
          if (!result.success && result.error?.includes('Network error')) {
            setIsRetrying(true);
          }
          return result;
        },
        (result) => !result.success && Boolean(result.error?.includes('Network error') || result.error?.includes('Unable to connect'))
      );
      setIsRetrying(false);

      if (!loginResult.success) {
        const errorMsg = loginResult.error || t('login.errors.invalidCredentials');
        setError(errorMsg);
        return;
      }

      const result = await signIn('credentials', {
        user: JSON.stringify(loginResult.user),
        redirect: false,
      });

      if (result?.ok) {
        analytics.track('user_logged_in', {
          method: 'quick_signin',
          username: testUsername,
        });
        await refreshSession();
        onSuccess(false);
      }
    } catch {
      setError(tCommon('connectionError'));
    } finally {
      setIsLoading(false);
    }
  }, [t, tCommon, refreshSession, onSuccess]);

  /**
   * Handle form submission for login or registration
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login flow
        if (!username || !password) {
          const errorMsg = t('login.errors.completeFields');
          setError(errorMsg);
          toast.error(errorMsg);
          setIsLoading(false);
          return;
        }

        const loginResult = await withRetry(
          async () => {
            const result = await loginUser(username, password);
            if (!result.success && result.error?.includes('Network error')) {
              setIsRetrying(true);
            }
            return result;
          },
          (result) => !result.success && Boolean(result.error?.includes('Network error') || result.error?.includes('Unable to connect'))
        );
        setIsRetrying(false);

        if (!loginResult.success) {
          const errorMsg = loginResult.error || t('login.errors.invalidCredentials');
          setError(errorMsg);
          toast.error(errorMsg);
          setIsLoading(false);
          return;
        }

        const result = await signIn('credentials', {
          user: JSON.stringify(loginResult.user),
          redirect: false,
        });

        if (result?.error) {
          const errorMsg = t('login.errors.invalidCredentials');
          setError(errorMsg);
          toast.error(errorMsg);
          setIsLoading(false);
          return;
        }

        if (result?.ok) {
          analytics.track('user_logged_in', {
            method: 'password',
            username: username,
          });
          toast.success(t('login.success'));
          await refreshSession();
          onSuccess(false);
        }
      } else {
        // Registration flow
        if (!username || !email || !password || !displayName) {
          const errorMsg = t('register.errors.completeFields');
          setError(errorMsg);
          toast.error(errorMsg);
          setIsLoading(false);
          return;
        }

        // Validate password requirements
        if (password.length < 8) {
          const errorMsg = t('register.errors.passwordLength');
          setError(errorMsg);
          toast.error(errorMsg);
          setIsLoading(false);
          return;
        }

        // Validate username format (no spaces, special characters, or accents)
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
          const errorMsg = t('register.errors.usernameFormat');
          setError(errorMsg);
          toast.error(errorMsg);
          setIsLoading(false);
          return;
        }

        if (username.length > 20) {
          const errorMsg = t('register.errors.usernameTooLong');
          setError(errorMsg);
          toast.error(errorMsg);
          setIsLoading(false);
          return;
        }

        if (!acceptedTerms) {
          const errorMsg = t('register.errors.acceptTerms');
          setError(errorMsg);
          toast.error(errorMsg);
          setIsLoading(false);
          return;
        }

        const result = await withRetry(
          async () => {
            const res = await registerUser(username, email, password, displayName, acceptedTerms);
            if (!res.success && res.error?.includes('Network error')) {
              setIsRetrying(true);
            }
            return res;
          },
          (res) => !res.success && Boolean(res.error?.includes('Network error') || res.error?.includes('Unable to connect'))
        );
        setIsRetrying(false);

        if (result.success && result.user) {
          analytics.track('user_signed_up', {
            source: 'organic',
            method: 'password',
            username: result.user.username,
          });

          analytics.identify(result.user.id, {
            email: result.user.email,
            username: result.user.username,
            displayName: result.user.displayName,
            role: result.user.role,
            subscriptionStatus: result.user.subscription?.status || 'free',
            currentStreak: 0,
            longestStreak: 0,
          });

          const signInResult = await signIn('credentials', {
            user: JSON.stringify(result.user),
            redirect: false,
          });

          if (signInResult?.ok) {
            toast.success(t('register.success'));
            await refreshSession();
            onSuccess(true);
            router.push('/dashboard?welcome=true');
          } else {
            toast.success(t('register.success'));
            setIsLogin(true);
            setUsername(username);
            setPassword('');
            setDisplayName('');
            setEmail('');
          }
        } else {
          const errorMsg = result.error || t('login.errors.registration');
          setError(errorMsg);
          toast.error(errorMsg);
        }
      }
    } catch {
      const errorMsg = tCommon('connectionError');
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [isLogin, username, email, password, displayName, acceptedTerms, t, tCommon, refreshSession, onSuccess, router]);

  return {
    // Form state
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    acceptedTerms,
    setAcceptedTerms,

    // UI state
    isLogin,
    isLoading,
    isRetrying,
    error,
    showPassword,
    setShowPassword,
    isPreview,

    // Actions
    handleSubmit,
    handleQuickSignIn,
    toggleMode,
  };
}
