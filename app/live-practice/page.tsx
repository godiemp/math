'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logoutUser } from '@/lib/auth';
import { registerForSession, unregisterFromSession, joinSessionAPI } from '@/lib/sessionApi';
import { useAvailableSessions } from '@/lib/hooks/useSessions';
import { LiveSession } from '@/lib/types';
import LiveSessionComponent from '@/components/LiveSession';
import StudentStatisticsComponent from '@/components/StudentStatistics';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { useTranslations } from 'next-intl';

function LivePracticePageContent() {
  const t = useTranslations('liveSession');
  const { user: currentUser, setUser, isAdmin } = useAuth();
  const { sessions, isLoading, refresh } = useAvailableSessions();
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    router.push('/');
  };

  const handleRegisterSession = async (sessionId: string) => {
    if (!currentUser) return;

    toast.promise(
      registerForSession(sessionId, currentUser).then(async (result) => {
        if (result.success) {
          setError('');
          await refresh();
          return result;
        } else {
          throw new Error(result.error || t('toast.registerError'));
        }
      }),
      {
        loading: t('toast.registering'),
        success: t('toast.registered'),
        error: (err) => {
          setError(err.message);
          return err.message || t('toast.registerError');
        },
      }
    );
  };

  const handleUnregisterSession = async (sessionId: string) => {
    if (!currentUser) return;

    toast.promise(
      unregisterFromSession(sessionId, currentUser.id).then(async (result) => {
        if (result.success) {
          setError('');
          await refresh();
          return result;
        } else {
          throw new Error(result.error || t('toast.cancelError'));
        }
      }),
      {
        loading: t('toast.canceling'),
        success: t('toast.canceled'),
        error: (err) => {
          setError(err.message);
          return err.message || t('toast.cancelError');
        },
      }
    );
  };

  const handleJoinSession = async (sessionId: string) => {
    if (!currentUser) return;

    toast.promise(
      joinSessionAPI(sessionId).then((result) => {
        if (result.success) {
          setActiveSessionId(sessionId);
          setError('');
          return result;
        } else {
          throw new Error(result.error || t('toast.joinError'));
        }
      }),
      {
        loading: t('toast.joining'),
        success: t('toast.joined'),
        error: (err) => {
          setError(err.message);
          return err.message || t('toast.joinError');
        },
      }
    );
  };

  const handleExitSession = () => {
    setActiveSessionId(null);
    refresh();
  };

  const isUserRegistered = (session: LiveSession) => {
    return session.registeredUsers?.some(r => r.userId === currentUser?.id) ?? false;
  };

  const isUserInSession = (session: LiveSession) => {
    return session.participants?.some(p => p.userId === currentUser?.id) ?? false;
  };

  // Show active session if user is in one
  if (activeSessionId) {
    return <LiveSessionComponent sessionId={activeSessionId} onExit={handleExitSession} />;
  }

  // Show lobby
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-4 sm:mb-5 md:mb-6" padding="md">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <div>
              <Heading level={1} size="md" className="mb-1 sm:mb-2 text-lg sm:text-xl md:text-2xl">
                {t('header.title')}
              </Heading>
              <Text variant="secondary" className="text-xs sm:text-sm">
                {t('header.subtitle')}
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <Text size="xs" variant="secondary" className="text-xs sm:text-sm">{t('welcome')}</Text>
                <Text className="font-medium text-sm sm:text-base">{currentUser?.displayName}</Text>
                {isAdmin && (
                  <Badge variant="info" size="sm" className="text-xs">{t('actions.admin')}</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button variant="ghost" onClick={() => router.back()} className="flex-1 sm:flex-none text-sm px-3 py-2">
                  ← Volver
                </Button>
                {isAdmin && (
                  <Button variant="secondary" onClick={() => router.push('/admin')} className="flex-1 sm:flex-none text-sm px-3 py-2">
                    {t('actions.admin')}
                  </Button>
                )}
                <Button variant="danger" onClick={handleLogout} className="flex-1 sm:flex-none text-sm px-3 py-2">
                  {t('actions.exit')}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-4 sm:mb-5 md:mb-6 border-[#FF453A] dark:border-[#FF7A72]" padding="md">
            <Text className="text-[#FF453A] dark:text-[#FF7A72] text-xs sm:text-sm">{error}</Text>
          </Card>
        )}

        {/* Available Ensayos */}
        <Card padding="md" className="mb-4 sm:mb-5 md:mb-6">
          <Heading level={2} size="xs" className="mb-3 sm:mb-4 text-base sm:text-lg">
            {t('available.title')} ({sessions.length})
          </Heading>

          {sessions.length === 0 ? (
            <div className="text-center py-8 sm:py-10 md:py-12">
              <Text variant="secondary" className="mb-3 sm:mb-4 text-sm sm:text-base">
                {t('available.none')}
              </Text>
              <Text size="xs" variant="secondary" className="text-xs sm:text-sm">
                {t('available.wait')}
              </Text>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border border-black/[0.12] dark:border-white/[0.16] rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-[180ms]"
                >
                  <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
                    <div className="flex-1 min-w-0">
                      <Heading level={3} size="xs" className="mb-1 text-sm sm:text-base truncate">
                        {session.name}
                      </Heading>
                      {session.description && (
                        <Text size="xs" variant="secondary" className="mb-1 text-xs line-clamp-2">
                          {session.description}
                        </Text>
                      )}
                      <Text size="xs" variant="secondary" className="text-xs">
                        {t('card.by')} {session.hostName}
                      </Text>
                    </div>
                    <Badge
                      variant={
                        session.status === 'scheduled' ? 'info' :
                        session.status === 'lobby' ? 'warning' :
                        session.status === 'active' ? 'success' : 'neutral'
                      }
                      size="sm"
                      className="text-xs whitespace-nowrap flex-shrink-0"
                    >
                      {session.status === 'scheduled' ? t('status.scheduled') :
                       session.status === 'lobby' ? t('status.lobby') :
                       session.status === 'active' ? t('status.active') : session.status}
                    </Badge>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {session.scheduledStartTime && (
                      <div className="flex items-start sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-0">
                        <Text size="xs" variant="secondary" className="font-medium mr-2 text-xs">{t('card.date')}</Text>
                        <Text size="xs" variant="secondary" className="text-xs">
                          {new Date(session.scheduledStartTime).toLocaleString('es-CL', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </Text>
                      </div>
                    )}
                    <div className="flex items-center flex-wrap gap-1">
                      <Text size="xs" variant="secondary" className="font-medium mr-1 text-xs">{t('card.level')}</Text>
                      <Badge variant="info" size="sm" className="text-xs">{session.level}</Badge>
                    </div>
                    <div className="flex items-center">
                      <Text size="xs" variant="secondary" className="font-medium mr-2 text-xs">{t('card.questions')}</Text>
                      <Text size="xs" variant="secondary" className="text-xs">{session.questions.length}</Text>
                    </div>
                  </div>

                  {/* Action buttons based on session status */}
                  {session.status === 'scheduled' ? (
                    isUserRegistered(session) ? (
                      <Button
                        variant="danger"
                        onClick={() => handleUnregisterSession(session.id)}
                        fullWidth
                        className="text-sm py-2"
                      >
                        {t('buttons.cancelRegistration')}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleRegisterSession(session.id)}
                        fullWidth
                        className="text-sm py-2"
                      >
                        {t('buttons.register')}
                      </Button>
                    )
                  ) : session.status === 'lobby' ? (
                    <Button
                      variant="primary"
                      onClick={() => handleJoinSession(session.id)}
                      fullWidth
                      className="bg-[#FF9F0A] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] text-sm py-2"
                    >
                      {isUserInSession(session) ? t('buttons.returnToLobby') : t('buttons.enterLobby')}
                    </Button>
                  ) : session.status === 'active' ? (
                    <Button
                      variant="success"
                      onClick={() => handleJoinSession(session.id)}
                      fullWidth
                      className="text-sm py-2"
                    >
                      {isUserInSession(session) ? t('buttons.returnToSession') : t('buttons.joinNow')}
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Student Statistics */}
        <StudentStatisticsComponent />
      </div>
    </div>
  );
}

export default function LivePracticePage() {
  return (
    <ProtectedRoute>
      <LivePracticePageContent />
    </ProtectedRoute>
  );
}
