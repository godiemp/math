'use client';

import Link from "next/link";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Suspense } from "react";
import { LiveSession } from "@/lib/types";
import { Button, Card, Badge, Heading, Text, LoadingScreen, Navbar, Callout } from "@/components/ui";
import { ShareModal } from "@/components/shared/ShareModal";
import { WelcomeMessage } from "@/components/shared/WelcomeMessage";
import { ColegioDashboardView } from "@/components/dashboard/ColegioDashboardView";
import { Share2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useDashboard } from "@/hooks/useDashboard";

interface DashboardViewProps {
  // User info
  user: {
    displayName?: string;
    username?: string;
    emailVerified?: boolean;
    targetLevel?: string;
  } | null;
  isAdmin: boolean;
  isPaidUser: boolean;
  isOnTrial: boolean;
  // Sessions
  nextSession: LiveSession | null;
  // Email verification
  isResendingEmail: boolean;
  emailSentMessage: string | null;
  onResendEmail: () => void;
  // Welcome modal
  isWelcomeOpen: boolean;
  onWelcomeClose: () => void;
  // Share modal
  isShareModalOpen: boolean;
  onOpenShareModal: () => void;
  onCloseShareModal: () => void;
  // Navigation
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

/**
 * Presentational component for the Dashboard
 * Contains no business logic - only receives data and callbacks via props
 */
function DashboardView({
  user,
  isAdmin,
  isPaidUser,
  isOnTrial,
  nextSession,
  isResendingEmail,
  emailSentMessage,
  onResendEmail,
  isWelcomeOpen,
  onWelcomeClose,
  isShareModalOpen,
  onOpenShareModal,
  onCloseShareModal,
  onLogout,
  onNavigate,
}: DashboardViewProps) {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');

  return (
    <div className="min-h-screen font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]" style={{ background: 'var(--color-bg)' }}>
      {/* Navbar with variableBlur material */}
      <Navbar className="min-h-14">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 py-0 sm:h-10">
          <Heading level={1} size="xs" className="text-sm sm:text-base" style={{ color: 'var(--color-tint)' }} data-testid="dashboard-title">
            {t('title')}
          </Heading>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Text size="sm" variant="secondary" className="text-xs sm:text-sm" data-testid="user-greeting">
              {t('greeting', { username: user?.displayName || user?.username || 'Usuario' })}
            </Text>
            <div className="flex gap-2 ml-auto sm:ml-0">
              <Button variant="ghost" onClick={() => onNavigate('/profile')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2" data-testid="nav-profile-button">
                {t('menu.profile')}
              </Button>
              {(!isPaidUser || isOnTrial) && (
                <Button variant="primary" onClick={() => onNavigate('/dashboard/subscribe')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2" data-testid="nav-premium-button">
                  {t('menu.premium')}
                </Button>
              )}
              {isAdmin && (
                <Button variant="secondary" onClick={() => onNavigate('/admin')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2" data-testid="nav-admin-button">
                  {t('menu.admin')}
                </Button>
              )}
              <Button variant="danger" onClick={onLogout} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2" data-testid="nav-logout-button">
                {t('menu.logout')}
              </Button>
            </div>
          </div>
        </div>
      </Navbar>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-12">
        {/* Email Verification Notification */}
        {user && user.emailVerified === false && (
          <Callout type="warning" title={t('emailVerification.title')} data-testid="email-verification-callout">
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
                onClick={onResendEmail}
                disabled={isResendingEmail}
                className="whitespace-nowrap"
              >
                {isResendingEmail ? t('emailVerification.sending') : t('emailVerification.resendButton')}
              </Button>
            </div>
          </Callout>
        )}

        {/* Mini Lessons Banner */}
        <Link href="/mini-lessons" className="block mb-8 sm:mb-10 md:mb-12" data-testid="mini-lessons-banner">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">NUEVO</span>
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-1">Mini Lecciones</h3>
                <p className="text-white/90 text-sm sm:text-base">
                  Aprende paso a paso con ejercicios interactivos
                </p>
              </div>
              <div className="bg-white text-purple-600 font-bold py-2 px-4 rounded-lg text-sm whitespace-nowrap">
                Ver Lecciones →
              </div>
            </div>
          </div>
        </Link>

        {/* Study Buddy - Coming Soon Placeholder */}
        <Card hover className="p-6 mb-8 sm:mb-10 md:mb-12" data-testid="adaptive-learning-card">
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heading level={3} size="sm">
                Aprendizaje adaptativo
              </Heading>
              <Badge variant="info">Próximamente</Badge>
            </div>
            <Text size="sm" variant="secondary">
              Contenido personalizado según tu progreso y objetivos
            </Text>
          </div>
        </Card>

        {/* Live Practice Featured Card with gradient */}
        <div className="relative overflow-hidden backdrop-blur-[20px] rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 mb-8 sm:mb-10 md:mb-12" style={{ background: 'linear-gradient(to right, var(--color-tint-alt), var(--color-tint))', boxShadow: 'var(--shadow-raised)' }} data-testid="live-practice-card">
          <div className="text-center relative z-10">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📝</div>
            <Heading level={3} size="sm" className="mb-2 sm:mb-3 text-white text-lg sm:text-xl">
              {t('liveSession.header')}
            </Heading>
            {nextSession ? (
              <>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 inline-block w-full sm:w-auto" data-testid="next-session-info">
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
              <Button asChild className="bg-white hover:bg-white w-full sm:w-auto text-sm sm:text-base" style={{ color: 'var(--color-tint-alt)' }} data-testid="live-practice-cta">
                <Link href="/live-practice">
                  {nextSession ? t('liveSession.registerNow') : t('liveSession.viewAvailable')}
                </Link>
              </Button>
              {nextSession && (
                <Button
                  onClick={onOpenShareModal}
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/40 gap-2 w-full sm:w-auto text-sm sm:text-base"
                  data-testid="live-practice-share-button"
                >
                  <Share2 className="w-4 h-4" />
                  {t('liveSession.invite')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Practice Section - Operations, M1, and M2 */}
        <Card hover className="p-5 mb-8 sm:mb-10 md:mb-12 relative" data-testid="practice-section-card">
          {!isPaidUser && (
            <div className="absolute top-2 right-2 bg-purple-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1" data-testid="practice-premium-badge">
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
              <Button asChild size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-xs shrink-0" data-testid="practice-operations-link">
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
                  <Button asChild size="sm" className="text-xs shrink-0" data-testid="practice-m1-link">
                    <Link href="/practice/m1">
                      {t('curriculum.practice')}
                    </Link>
                  </Button>
                ) : (
                  <Button disabled size="sm" className="opacity-60 text-xs shrink-0" data-testid="practice-m1-locked">
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
                    <Button asChild size="sm" className="text-xs shrink-0" data-testid="practice-m2-link">
                      <Link href="/practice/m2">
                        {t('curriculum.practice')}
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled size="sm" className="opacity-60 text-xs shrink-0" data-testid="practice-m2-locked">
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
          <Card hover className="p-6 relative" data-testid="temario-card">
            {!isPaidUser && (
              <div className="absolute top-3 right-3 bg-purple-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5" data-testid="temario-premium-badge">
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
                      <Button asChild variant="primary" size="sm" data-testid="curriculum-m1-link">
                        <Link href="/curriculum/m1">
                          {t('curriculum.m1')}
                        </Link>
                      </Button>
                      {user?.targetLevel !== 'M1_ONLY' && (
                        <Button asChild variant="secondary" size="sm" data-testid="curriculum-m2-link">
                          <Link href="/curriculum/m2">
                            {t('curriculum.m2')}
                          </Link>
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Button disabled variant="primary" size="sm" className="opacity-60" data-testid="curriculum-m1-locked">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        {t('curriculum.m1')}
                      </Button>
                      {user?.targetLevel !== 'M1_ONLY' && (
                        <Button disabled variant="secondary" size="sm" className="opacity-60" data-testid="curriculum-m2-locked">
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
            </div>
          </Card>

          {/* Progress Tracking Card */}
          <Card hover className="p-6 relative" data-testid="progress-card">
            {!isPaidUser && (
              <div className="absolute top-3 right-3 bg-purple-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5" data-testid="progress-premium-badge">
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
                <Button asChild className="w-full" data-testid="progress-link">
                  <Link href="/progress">
                    {t('progress.cta')}
                  </Link>
                </Button>
              ) : (
                <Button disabled className="w-full opacity-60" data-testid="progress-locked-button">
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
      <WelcomeMessage isOpen={isWelcomeOpen} onClose={onWelcomeClose} />

      {/* Share Modal */}
      {nextSession && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={onCloseShareModal}
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
      <footer className="backdrop-blur-[20px] border-t mt-8 sm:mt-10 md:mt-12" style={{ background: 'color-mix(in srgb, var(--color-surface) 80%, transparent)', borderColor: 'var(--color-separator)' }} data-testid="dashboard-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <Link
              href="/como-funciona"
              className="text-xs hover:underline"
              style={{ color: 'var(--color-link)' }}
              data-testid="how-it-works-link"
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

/**
 * Container component that uses the useDashboard hook and renders the presentational view
 */
function DashboardContent() {
  const t = useTranslations('dashboard');
  const {
    user,
    isAdmin,
    isPaidUser,
    isOnTrial,
    isColegioStudent,
    gradeLevel,
    isLoading,
    nextSession,
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
  } = useDashboard();

  // Show loading screen while auth or data is being loaded
  if (isLoading) {
    return <LoadingScreen message={t('loading')} />;
  }

  // Show error UI if data loading failed
  if (sessionsError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--color-bg)' }}>
        <Card className="max-w-md w-full p-6 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <Heading level={2} size="sm" className="mb-3">{t('errors.title')}</Heading>
          <Text variant="secondary" className="mb-6">{sessionsError}</Text>
          <Button onClick={() => window.location.reload()} className="w-full">
            {t('errors.reload')}
          </Button>
        </Card>
      </div>
    );
  }

  // Render different dashboard for colegio (school) students
  if (isColegioStudent && gradeLevel) {
    return (
      <ColegioDashboardView
        user={user}
        gradeLevel={gradeLevel}
        isAdmin={isAdmin}
        isResendingEmail={isResendingEmail}
        emailSentMessage={emailSentMessage}
        onResendEmail={handleResendEmail}
        isWelcomeOpen={isWelcomeOpen}
        onWelcomeClose={handleWelcomeClose}
        onLogout={handleLogout}
        onNavigate={navigateTo}
      />
    );
  }

  return (
    <DashboardView
      user={user}
      isAdmin={isAdmin}
      isPaidUser={isPaidUser}
      isOnTrial={isOnTrial}
      nextSession={nextSession}
      isResendingEmail={isResendingEmail}
      emailSentMessage={emailSentMessage}
      onResendEmail={handleResendEmail}
      isWelcomeOpen={isWelcomeOpen}
      onWelcomeClose={handleWelcomeClose}
      isShareModalOpen={isShareModalOpen}
      onOpenShareModal={openShareModal}
      onCloseShareModal={closeShareModal}
      onLogout={handleLogout}
      onNavigate={navigateTo}
    />
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
