import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useAuth } from '@/contexts/AuthContext';
import { logoutUser } from '@/lib/auth';
import { getAllAvailableSessions, updateSessionStatuses } from '@/lib/sessionApi';
import { sendVerificationEmail } from '@/lib/auth/authApi';
import { LiveSession } from '@/lib/types';
import { useTranslations } from 'next-intl';

/**
 * Manages fetching and state for live practice sessions
 */
export const useDashboardSessions = (userId: string | undefined) => {
  const t = useTranslations('dashboard');
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [registeredSessions, setRegisteredSessions] = useState<LiveSession[]>([]);
  const [nextSession, setNextSession] = useState<LiveSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const loadDashboardData = async () => {
      if (!userId) {
        setIsLoadingData(false);
        return;
      }

      try {
        const statusUpdateResult = await updateSessionStatuses();
        if (!statusUpdateResult.success) {
          console.warn('Failed to update session statuses:', statusUpdateResult.error);
        }

        const allAvailableSessions = await getAllAvailableSessions();

        if (!isMounted) return;

        const userRegisteredSessions = allAvailableSessions.filter(s =>
          s.registeredUsers?.some(r => r.userId === userId)
        );

        const upcomingSessions = userRegisteredSessions.filter(s =>
          s.status === 'scheduled' || s.status === 'lobby' || s.status === 'active'
        );

        upcomingSessions.sort((a, b) => a.scheduledStartTime - b.scheduledStartTime);
        setRegisteredSessions(upcomingSessions);

        const allUpcoming = allAvailableSessions
          .filter(s => s.status === 'scheduled' || s.status === 'lobby')
          .sort((a, b) => a.scheduledStartTime - b.scheduledStartTime);

        setNextSession(allUpcoming[0] || null);
        setIsLoadingData(false);
        setError(null);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        if (isMounted) {
          setError(t('errors.loadError'));
          setIsLoadingData(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [userId, t]);

  return {
    isLoadingData,
    registeredSessions,
    nextSession,
    error,
  };
};

/**
 * Manages email verification resend functionality
 */
export const useEmailVerification = () => {
  const t = useTranslations('dashboard');
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [emailSentMessage, setEmailSentMessage] = useState<string | null>(null);

  const handleResendEmail = useCallback(async () => {
    setIsResendingEmail(true);
    setEmailSentMessage(null);

    const result = await sendVerificationEmail();

    if (result.success) {
      setEmailSentMessage(t('emailVerification.sentSuccess'));
    } else {
      setEmailSentMessage(result.error || t('emailVerification.sentError'));
    }

    setIsResendingEmail(false);

    setTimeout(() => {
      setEmailSentMessage(null);
    }, 5000);
  }, [t]);

  return {
    isResendingEmail,
    emailSentMessage,
    handleResendEmail,
  };
};

/**
 * Manages welcome modal state based on URL query param
 */
export const useWelcomeModal = (hasUser: boolean) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

  useEffect(() => {
    const welcomeParam = searchParams.get('welcome');
    if (welcomeParam === 'true' && hasUser) {
      setIsWelcomeOpen(true);
    }
  }, [searchParams, hasUser]);

  const handleWelcomeClose = useCallback(() => {
    setIsWelcomeOpen(false);
    router.replace('/dashboard');
  }, [router]);

  return {
    isWelcomeOpen,
    handleWelcomeClose,
  };
};

/**
 * Manages share modal state
 */
export const useShareModal = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const openShareModal = useCallback(() => setIsShareModalOpen(true), []);
  const closeShareModal = useCallback(() => setIsShareModalOpen(false), []);

  return {
    isShareModalOpen,
    openShareModal,
    closeShareModal,
  };
};

/**
 * Handles dashboard navigation and logout
 */
export const useDashboardNavigation = () => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await logoutUser();
    await signOut({ callbackUrl: '/signin' });
  }, []);

  const navigateTo = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return {
    handleLogout,
    navigateTo,
  };
};

interface UseDashboardResult {
  // Auth state
  user: ReturnType<typeof useAuth>['user'];
  isAdmin: boolean;
  isPaidUser: boolean;
  isOnTrial: boolean;
  isColegioStudent: boolean;
  gradeLevel: string | undefined;
  isLoading: boolean;
  // Sessions
  nextSession: LiveSession | null;
  registeredSessions: LiveSession[];
  sessionsError: string | null;
  // Email verification
  isResendingEmail: boolean;
  emailSentMessage: string | null;
  handleResendEmail: () => Promise<void>;
  // Welcome modal
  isWelcomeOpen: boolean;
  handleWelcomeClose: () => void;
  // Share modal
  isShareModalOpen: boolean;
  openShareModal: () => void;
  closeShareModal: () => void;
  // Navigation
  handleLogout: () => Promise<void>;
  navigateTo: (path: string) => void;
}

/**
 * Main dashboard hook that combines all dashboard logic
 */
export const useDashboard = (): UseDashboardResult => {
  const { user, isAdmin, isPaidUser, isLoading: authLoading } = useAuth();
  const isOnTrial = user?.subscription?.status === 'trial';

  // Determine if user is a colegio (school) student based on gradeLevel
  const isColegioStudent = !!user?.gradeLevel;
  const gradeLevel = user?.gradeLevel;

  const {
    isLoadingData,
    registeredSessions,
    nextSession,
    error: sessionsError,
  } = useDashboardSessions(user?.id);

  const {
    isResendingEmail,
    emailSentMessage,
    handleResendEmail,
  } = useEmailVerification();

  const {
    isWelcomeOpen,
    handleWelcomeClose,
  } = useWelcomeModal(!!user);

  const {
    isShareModalOpen,
    openShareModal,
    closeShareModal,
  } = useShareModal();

  const {
    handleLogout,
    navigateTo,
  } = useDashboardNavigation();

  const isLoading = authLoading || isLoadingData;

  return {
    user,
    isAdmin,
    isPaidUser,
    isOnTrial,
    isColegioStudent,
    gradeLevel,
    isLoading,
    nextSession,
    registeredSessions,
    sessionsError,
    isResendingEmail,
    emailSentMessage,
    handleResendEmail,
    isWelcomeOpen,
    handleWelcomeClose,
    isShareModalOpen,
    openShareModal,
    closeShareModal,
    handleLogout,
    navigateTo,
  };
};
