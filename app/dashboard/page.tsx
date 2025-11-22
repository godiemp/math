'use client';

import Link from "next/link";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { logoutUser } from "@/lib/auth";
import { getAllAvailableSessions, updateSessionStatuses } from "@/lib/sessionApi";
import { useEffect, useState, Suspense } from "react";
import { LiveSession } from "@/lib/types";
import { Button, Card, Badge, Heading, Text, LoadingScreen, Navbar, Callout } from "@/components/ui";
import { StudyBuddy } from "@/components/interactive/StudyBuddy";
import { ShareModal } from "@/components/shared/ShareModal";
import { WelcomeMessage } from "@/components/shared/WelcomeMessage";
import { Share2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { sendVerificationEmail } from "@/lib/auth/authApi";

function DashboardContent() {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const { user, setUser, isAdmin, isPaidUser, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [registeredSessions, setRegisteredSessions] = useState<LiveSession[]>([]);
  const [nextSession, setNextSession] = useState<LiveSession | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [emailSentMessage, setEmailSentMessage] = useState<string | null>(null);

  // Check if user should see welcome message (from query param)
  useEffect(() => {
    const welcomeParam = searchParams.get('welcome');
    if (welcomeParam === 'true' && user) {
      setIsWelcomeOpen(true);
    }
  }, [searchParams, user]);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const loadDashboardData = async () => {
      if (!user) {
        // No user yet, stop data loading
        setIsLoadingData(false);
        return;
      }

      try {
        // Update session statuses
        const statusUpdateResult = await updateSessionStatuses();
        if (!statusUpdateResult.success) {
          console.warn('Failed to update session statuses:', statusUpdateResult.error);
          // Continue anyway - this is not critical for dashboard loading
        }

        // Get all available sessions from API
        const allAvailableSessions = await getAllAvailableSessions();

        // Only update state if component is still mounted
        if (!isMounted) return;

        // Filter for user's registered sessions
        const userRegisteredSessions = allAvailableSessions.filter(s =>
          s.registeredUsers?.some(r => r.userId === user.id)
        );

        // Filter for upcoming sessions only (scheduled, lobby, active)
        const upcomingSessions = userRegisteredSessions.filter(s =>
          s.status === 'scheduled' || s.status === 'lobby' || s.status === 'active'
        );

        // Sort by scheduled start time
        upcomingSessions.sort((a, b) => a.scheduledStartTime - b.scheduledStartTime);

        setRegisteredSessions(upcomingSessions);

        // Get the next scheduled session (for all users, not just registered)
        const allUpcoming = allAvailableSessions
          .filter(s => s.status === 'scheduled' || s.status === 'lobby')
          .sort((a, b) => a.scheduledStartTime - b.scheduledStartTime);

        setNextSession(allUpcoming[0] || null);

        // Mark loading as complete
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

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [user]);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    router.push('/');
  };

  const handleWelcomeClose = () => {
    setIsWelcomeOpen(false);
    // Remove welcome query param from URL
    router.replace('/dashboard');
  };

  const handleResendEmail = async () => {
    setIsResendingEmail(true);
    setEmailSentMessage(null);

    const result = await sendVerificationEmail();

    if (result.success) {
      setEmailSentMessage(t('emailVerification.sentSuccess'));
    } else {
      setEmailSentMessage(result.error || t('emailVerification.sentError'));
    }

    setIsResendingEmail(false);

    // Clear message after 5 seconds
    setTimeout(() => {
      setEmailSentMessage(null);
    }, 5000);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-CL', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="info">{t('status.scheduled')}</Badge>;
      case 'lobby':
        return <Badge variant="warning">{t('status.lobbyOpen')}</Badge>;
      case 'active':
        return <Badge variant="success">{t('status.active')}</Badge>;
      default:
        return null;
    }
  };

  // Show loading screen while auth or data is being loaded
  if (authLoading || isLoadingData) {
    return <LoadingScreen message={t('loading')} />;
  }

  // Show error UI if data loading failed
  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <Heading level={2} size="sm" className="mb-3">{t('errors.title')}</Heading>
          <Text variant="secondary" className="mb-6">{error}</Text>
          <Button onClick={() => window.location.reload()} className="w-full">
            {t('errors.reload')}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]">
      {/* Navbar with variableBlur material */}
      <Navbar className="min-h-14">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 py-0 sm:h-10">
          <Heading level={1} size="xs" className="text-[#0A84FF] text-sm sm:text-base">
            {t('title')}
          </Heading>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Text size="sm" variant="secondary" className="text-xs sm:text-sm">
              {t('greeting', { username: user?.displayName || user?.username || 'Usuario' })}
            </Text>
            <div className="flex gap-2 ml-auto sm:ml-0">
              <Button variant="ghost" onClick={() => router.push('/profile')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                {t('menu.profile')}
              </Button>
              {!isPaidUser && (
                <Button variant="primary" onClick={() => router.push('/pricing')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                  ⭐ {t('menu.premium')}
                </Button>
              )}
              {isAdmin && (
                <Button variant="secondary" onClick={() => router.push('/admin')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                  {t('menu.admin')}
                </Button>
              )}
              <Button variant="danger" onClick={handleLogout} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                {t('menu.logout')}
              </Button>
            </div>
          </div>
        </div>
      </Navbar>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-12">
        {/* Email Verification Notification */}
        {user && user.emailVerified === false && (
          <Callout type="warning" title={t('emailVerification.title')}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm">
                {t('emailVerification.message')}
                {emailSentMessage && (
                  <span className="block mt-2 font-semibold">{emailSentMessage}</span>
                )}
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResendEmail}
                disabled={isResendingEmail}
                className="whitespace-nowrap"
              >
                {isResendingEmail ? t('emailVerification.sending') : t('emailVerification.resendButton')}
              </Button>
            </div>
          </Callout>
        )}

        {/* Study Buddy with Streak Information - Only visible to admins */}
        {isAdmin && (
          <div className="mb-8">
            <StudyBuddy initialStreak={user ? {
              currentStreak: user.currentStreak || 0,
              longestStreak: user.longestStreak || 0,
              lastPracticeDate: user.lastPracticeDate || null
            } : undefined} />
          </div>
        )}

        {/* Live Practice Featured Card with gradient */}
        <div className="relative overflow-hidden backdrop-blur-[20px] bg-gradient-to-r from-[#5E5CE6] to-[#0A84FF] dark:from-[#9A99FF] dark:to-[#0A84FF] rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 mb-8 sm:mb-10 md:mb-12 shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
          <div className="text-center relative z-10">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📝</div>
            <Heading level={3} size="sm" className="mb-2 sm:mb-3 text-white text-lg sm:text-xl">
              {t('liveSession.header')}
            </Heading>
            {nextSession ? (
              <>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 inline-block w-full sm:w-auto">
                  <Text size="xs" className="text-white/80 font-semibold uppercase tracking-wider mb-1 text-[10px] sm:text-xs">
                    {t('liveSession.nextSession')}
                  </Text>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {new Date(nextSession.scheduledStartTime).toLocaleDateString('es-CL', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </div>
                  <div className="text-lg sm:text-xl font-semibold text-white/95">
                    {new Date(nextSession.scheduledStartTime).toLocaleTimeString('es-CL', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })} hrs
                  </div>
                  <Text size="sm" className="text-white/90 mt-2 text-xs sm:text-sm">
                    {nextSession.name} - {nextSession.level}
                  </Text>
                </div>
                <Text size="md" className="mb-4 sm:mb-6 max-w-2xl mx-auto text-white/90 text-sm sm:text-base px-2">
                  {t('liveSession.registerDescription')}
                </Text>
              </>
            ) : (
              <Text size="md" className="mb-4 sm:mb-6 max-w-2xl mx-auto text-white/90 text-sm sm:text-base px-2">
                {t('liveSession.newDescription')}
              </Text>
            )}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-center px-2 sm:px-0">
              <Button asChild className="bg-white text-[#5E5CE6] hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] w-full sm:w-auto text-sm sm:text-base">
                <Link href="/live-practice">
                  {nextSession ? t('liveSession.registerNow') : t('liveSession.viewAvailable')}
                </Link>
              </Button>
              {nextSession && (
                <Button
                  onClick={() => setIsShareModalOpen(true)}
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/40 gap-2 w-full sm:w-auto text-sm sm:text-base"
                >
                  <Share2 className="w-4 h-4" />
                  {t('liveSession.invite')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Practice Section - Operations, M1, and M2 */}
        <Card hover className="p-5 mb-8 sm:mb-10 md:mb-12 relative">
          {!isPaidUser && (
            <div className="absolute top-2 right-2 bg-purple-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              {t('menu.premium')}
            </div>
          )}

          <div className="space-y-5">
            {/* Operations Practice Section */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">🎯</span>
                <div>
                  <Heading level={3} size="xs" className="text-sm mb-0.5">
                    {t('operations.header')}
                  </Heading>
                  <Text size="xs" variant="secondary" className="text-[11px]">
                    {t('operations.description')}
                  </Text>
                </div>
              </div>
              <Button asChild size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-xs shrink-0">
                <Link href="/practice/operations">
                  {t('operations.cta')}
                </Link>
              </Button>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* M1 and M2 in grid */}
            <div className={user?.targetLevel === 'M1_ONLY' ? '' : 'grid sm:grid-cols-2 gap-4'}>
              {/* M1 Section */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xl">📐</span>
                  <div>
                    <Heading level={4} size="xs" className="text-sm mb-0.5">
                      {t('curriculum.m1')}
                    </Heading>
                    <Text size="xs" variant="secondary" className="text-[11px]">
                      {t('curriculum.basicCompetence')}
                    </Text>
                  </div>
                </div>
                {isPaidUser ? (
                  <Button asChild size="sm" className="text-xs shrink-0">
                    <Link href="/practice/m1">
                      {t('curriculum.practice')}
                    </Link>
                  </Button>
                ) : (
                  <Button disabled size="sm" className="opacity-60 text-xs shrink-0">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    {t('curriculum.practice')}
                  </Button>
                )}
              </div>

              {/* M2 Section - Only show if not M1_ONLY */}
              {user?.targetLevel !== 'M1_ONLY' && (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xl">🎓</span>
                    <div>
                      <Heading level={4} size="xs" className="text-sm mb-0.5">
                        {t('curriculum.m2')}
                      </Heading>
                      <Text size="xs" variant="secondary" className="text-[11px]">
                        {t('curriculum.advancedCompetence')}
                      </Text>
                    </div>
                  </div>
                  {isPaidUser ? (
                    <Button asChild size="sm" className="text-xs shrink-0">
                      <Link href="/practice/m2">
                        {t('curriculum.practice')}
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled size="sm" className="opacity-60 text-xs shrink-0">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      {t('curriculum.practice')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Temario and Progress Row */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {/* Temario Card */}
          <Card hover className="p-6 relative">
            {!isPaidUser && (
              <div className="absolute top-3 right-3 bg-purple-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                {t('menu.premium')}
              </div>
            )}
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <Heading level={3} size="sm" className="mb-3">
                {t('curriculum.title')}
              </Heading>
              <Text size="sm" variant="secondary" className="mb-6">
                {t('curriculum.reviewOfficial')}
              </Text>

              {/* Curriculum Buttons */}
              <div className="mb-4">
                <Text size="xs" variant="secondary" className="mb-2 font-semibold">
                  {t('curriculum.curriculumOfficial')}
                </Text>
                <div className="flex gap-3 justify-center flex-wrap">
                  {isPaidUser ? (
                    <>
                      <Button asChild variant="primary" size="sm">
                        <Link href="/curriculum/m1">
                          {t('curriculum.m1')}
                        </Link>
                      </Button>
                      {user?.targetLevel !== 'M1_ONLY' && (
                        <Button asChild variant="secondary" size="sm">
                          <Link href="/curriculum/m2">
                            {t('curriculum.m2')}
                          </Link>
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Button disabled variant="primary" size="sm" className="opacity-60">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        {t('curriculum.m1')}
                      </Button>
                      {user?.targetLevel !== 'M1_ONLY' && (
                        <Button disabled variant="secondary" size="sm" className="opacity-60">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          {t('curriculum.m2')}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Documentation Buttons - Hidden for now */}
              {/* TODO: Re-enable documentation section later
              <div>
                <Text size="xs" variant="secondary" className="mb-2 font-semibold">
                  {t('curriculum.documentation')}
                </Text>
                <div className="flex gap-3 justify-center flex-wrap">
                  {isPaidUser ? (
                    <>
                      <Button asChild variant="primary" size="sm">
                        <Link href="/curriculum/m1/docs">
                          {t('curriculum.docs')} {t('curriculum.m1')}
                        </Link>
                      </Button>
                      {user?.targetLevel !== 'M1_ONLY' && (
                        <Button asChild variant="secondary" size="sm">
                          <Link href="/curriculum/m2/docs">
                            {t('curriculum.docs')} {t('curriculum.m2')}
                          </Link>
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Button disabled variant="primary" size="sm" className="opacity-60">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        {t('curriculum.docs')} {t('curriculum.m1')}
                      </Button>
                      {user?.targetLevel !== 'M1_ONLY' && (
                        <Button disabled variant="secondary" size="sm" className="opacity-60">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          {t('curriculum.docs')} {t('curriculum.m2')}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              */}
            </div>
          </Card>

          {/* Progress Tracking Card */}
          <Card hover className="p-6 relative">
            {!isPaidUser && (
              <div className="absolute top-3 right-3 bg-purple-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                {t('menu.premium')}
              </div>
            )}
            <div className="text-center h-full flex flex-col justify-center">
              <div className="text-4xl mb-4">📊</div>
              <Heading level={3} size="sm" className="mb-3">
                {t('progress.title')}
              </Heading>
              <Text size="sm" variant="secondary" className="mb-6">
                {t('progress.subtitle')}
              </Text>
              {isPaidUser ? (
                <Button asChild className="w-full">
                  <Link href="/progress">
                    {t('progress.cta')}
                  </Link>
                </Button>
              ) : (
                <Button disabled className="w-full opacity-60">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  {t('progress.cta')}
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Improvement Notice */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <Card className="p-3 sm:p-4 md:p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-2xl sm:text-3xl flex-shrink-0">🚀</div>
              <div className="flex-1">
                <Heading level={3} size="xs" className="mb-2 text-amber-900 dark:text-amber-100">
                  {t('improvement.header')}
                </Heading>
                <Text size="sm" className="text-amber-800 dark:text-amber-200">
                  {t('improvement.message')}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Welcome Modal */}
      <WelcomeMessage isOpen={isWelcomeOpen} onClose={handleWelcomeClose} />

      {/* Share Modal */}
      {nextSession && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          data={{
            title: '',
            message: `Ensayo PAES ${nextSession.level}\n${new Date(nextSession.scheduledStartTime).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })} • ${new Date(nextSession.scheduledStartTime).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}\n\nVamos juntos 📝`,
            url: '/live-practice',
            sessionName: nextSession.name,
            sessionLevel: nextSession.level,
            sessionDate: new Date(nextSession.scheduledStartTime).toLocaleDateString('es-CL', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            }),
            sessionTime: new Date(nextSession.scheduledStartTime).toLocaleTimeString('es-CL', {
              hour: '2-digit',
              minute: '2-digit'
            }),
            registeredCount: nextSession.registeredUsers?.length || 0
          }}
          platforms={['whatsapp', 'copy']}
        />
      )}

      {/* Footer with hairline border */}
      <footer className="backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-t border-black/[0.12] dark:border-white/[0.16] mt-8 sm:mt-10 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <Link
              href="/como-funciona"
              className="text-xs text-[#0A84FF] hover:underline"
            >
              {tCommon('howItWorks')}
            </Link>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-600">•</span>
            <Text size="xs" variant="secondary">
              {t('footer.copyright')}
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingScreen message="Cargando panel..." />}>
        <DashboardContent />
      </Suspense>
    </ProtectedRoute>
  );
}
