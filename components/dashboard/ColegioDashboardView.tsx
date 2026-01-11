'use client';

import Link from "next/link";
import { Button, Card, Badge, Heading, Text, Navbar, Callout } from "@/components/ui";
import { WelcomeMessage } from "@/components/shared/WelcomeMessage";
import { useTranslations } from 'next-intl';

// Map grade levels to display names
const GRADE_DISPLAY_NAMES: Record<string, string> = {
  '7-basico': '7° Básico',
  '8-basico': '8° Básico',
  '1-medio': '1° Medio',
  '2-medio': '2° Medio',
  '3-medio': '3° Medio',
  '4-medio': '4° Medio',
};

interface ColegioDashboardViewProps {
  // User info
  user: {
    displayName?: string;
    username?: string;
    emailVerified?: boolean;
  } | null;
  gradeLevel: string;
  isAdmin: boolean;
  // Email verification
  isResendingEmail: boolean;
  emailSentMessage: string | null;
  onResendEmail: () => void;
  // Welcome modal
  isWelcomeOpen: boolean;
  onWelcomeClose: () => void;
  // Navigation
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

/**
 * Dashboard view for colegio (school) students
 * Shows grade-specific mini-lessons and adaptive practice
 */
export function ColegioDashboardView({
  user,
  gradeLevel,
  isAdmin,
  isResendingEmail,
  emailSentMessage,
  onResendEmail,
  isWelcomeOpen,
  onWelcomeClose,
  onLogout,
  onNavigate,
}: ColegioDashboardViewProps) {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');

  const gradeDisplayName = GRADE_DISPLAY_NAMES[gradeLevel] || gradeLevel;

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]">
      {/* Navbar */}
      <Navbar className="min-h-14">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 py-0 sm:h-10">
          <div className="flex items-center gap-2">
            <Heading level={1} size="xs" className="text-[#0A84FF] text-sm sm:text-base" data-testid="dashboard-title">
              Mi Clase
            </Heading>
            <Badge variant="info">{gradeDisplayName}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Text size="sm" variant="secondary" className="text-xs sm:text-sm" data-testid="user-greeting">
              {t('greeting', { username: user?.displayName || user?.username || 'Estudiante' })}
            </Text>
            <div className="flex gap-2 ml-auto sm:ml-0">
              <Button variant="ghost" onClick={() => onNavigate('/profile')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2" data-testid="nav-profile-button">
                {t('menu.profile')}
              </Button>
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

        {/* Mini Lessons Banner - Grade Specific */}
        <Link href={`/mini-lessons/colegios/${gradeLevel}`} className="block mb-8 sm:mb-10 md:mb-12" data-testid="mini-lessons-banner">
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">{gradeDisplayName}</span>
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-1">Mini Lecciones</h3>
                <p className="text-white/90 text-sm sm:text-base">
                  Aprende los contenidos de {gradeDisplayName} paso a paso
                </p>
              </div>
              <div className="bg-white text-emerald-600 font-bold py-2 px-4 rounded-lg text-sm whitespace-nowrap">
                Ver Lecciones →
              </div>
            </div>
          </div>
        </Link>

        {/* Adaptive Practice Card */}
        <Card hover className="p-6 mb-8 sm:mb-10 md:mb-12" data-testid="adaptive-learning-card">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heading level={3} size="sm">
                Práctica Adaptativa
              </Heading>
              <Badge variant="info">Próximamente</Badge>
            </div>
            <Text size="sm" variant="secondary">
              Ejercicios personalizados según tu progreso en {gradeDisplayName}
            </Text>
          </div>
        </Card>

        {/* Progress Overview */}
        <Card hover className="p-6 relative" data-testid="progress-card">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <Heading level={3} size="sm" className="mb-3">
              Tu Progreso
            </Heading>
            <Text size="sm" variant="secondary" className="mb-4">
              Revisa tu avance en las lecciones de {gradeDisplayName}
            </Text>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="info">Próximamente</Badge>
            </div>
          </div>
        </Card>

        {/* Footer Notice */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <Card className="p-3 sm:p-4 md:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-2xl sm:text-3xl flex-shrink-0">🏫</div>
              <div className="flex-1">
                <Heading level={3} size="xs" className="mb-2 text-emerald-900 dark:text-emerald-100">
                  Cuenta de Colegio
                </Heading>
                <Text size="sm" className="text-emerald-800 dark:text-emerald-200">
                  Estás viendo el contenido asignado por tu profesor para {gradeDisplayName}.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Welcome Modal */}
      <WelcomeMessage isOpen={isWelcomeOpen} onClose={onWelcomeClose} />

      {/* Footer */}
      <footer className="backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-t border-black/[0.12] dark:border-white/[0.16] mt-8 sm:mt-10 md:mt-12" data-testid="dashboard-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <Link
              href="/como-funciona"
              className="text-xs text-[#0A84FF] hover:underline"
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
