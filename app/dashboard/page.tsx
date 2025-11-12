'use client';

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";
import { getAllAvailableSessions, updateSessionStatuses } from "@/lib/sessionApi";
import { useEffect, useState } from "react";
import { LiveSession } from "@/lib/types";
import { Button, Card, Badge, Heading, Text, LoadingScreen, Navbar } from "@/components/ui";
import { Streak } from "@/components/Streak";
import { StudyBuddy } from "@/components/StudyBuddy";
import { ShareModal } from "@/components/ShareModal";
import { Share2 } from "lucide-react";

function DashboardContent() {
  const { user, setUser, isAdmin, isPaidUser, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [registeredSessions, setRegisteredSessions] = useState<LiveSession[]>([]);
  const [nextSession, setNextSession] = useState<LiveSession | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          setError('Error al cargar el panel. Por favor, intenta recargar la página.');
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
        return <Badge variant="info">Programado</Badge>;
      case 'lobby':
        return <Badge variant="warning">Lobby Abierto</Badge>;
      case 'active':
        return <Badge variant="success">En Curso</Badge>;
      default:
        return null;
    }
  };

  // Show loading screen while auth or data is being loaded
  if (authLoading || isLoadingData) {
    return <LoadingScreen message="Preparando tu panel..." />;
  }

  // Show error UI if data loading failed
  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <Heading level={2} size="sm" className="mb-3">Error al Cargar</Heading>
          <Text variant="secondary" className="mb-6">{error}</Text>
          <Button onClick={() => window.location.reload()} className="w-full">
            Recargar Página
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
            SimplePAES - Matemática
          </Heading>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Text size="sm" variant="secondary" className="text-xs sm:text-sm">
              Hola, {user?.displayName || user?.username || 'Usuario'}
            </Text>
            <div className="flex gap-2 ml-auto sm:ml-0">
              <Button variant="ghost" onClick={() => router.push('/profile')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                Mi Perfil
              </Button>
              {!isPaidUser && (
                <Button variant="primary" onClick={() => router.push('/pricing')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                  ⭐ Premium
                </Button>
              )}
              {isAdmin && (
                <Button variant="secondary" onClick={() => router.push('/admin')} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                  Admin
                </Button>
              )}
              <Button variant="danger" onClick={handleLogout} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </Navbar>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-12">
        {/* Streak Section */}
        <div className="mb-8">
          <Streak initialStreak={user ? {
            currentStreak: user.currentStreak || 0,
            longestStreak: user.longestStreak || 0,
            lastPracticeDate: user.lastPracticeDate || null
          } : undefined} />
        </div>

        {/* Study Buddy Section */}
        <div className="mb-8">
          <StudyBuddy />
        </div>

        {/* Live Practice Featured Card with gradient */}
        <div className="relative overflow-hidden backdrop-blur-[20px] bg-gradient-to-r from-[#5E5CE6] to-[#0A84FF] dark:from-[#9A99FF] dark:to-[#0A84FF] rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 mb-8 sm:mb-10 md:mb-12 shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
          <div className="text-center relative z-10">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📝</div>
            <Heading level={3} size="sm" className="mb-2 sm:mb-3 text-white text-lg sm:text-xl">
              Ensayo PAES en Vivo
            </Heading>
            {nextSession ? (
              <>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 inline-block w-full sm:w-auto">
                  <Text size="xs" className="text-white/80 font-semibold uppercase tracking-wider mb-1 text-[10px] sm:text-xs">
                    Próximo Ensayo
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
                  ¡Regístrate ahora! Practica con ensayos PAES en tiempo real y compite con otros estudiantes.
                </Text>
              </>
            ) : (
              <Text size="md" className="mb-4 sm:mb-6 max-w-2xl mx-auto text-white/90 text-sm sm:text-base px-2">
                ¡Nuevo! Practica con ensayos PAES en tiempo real. Regístrate, únete al lobby antes de comenzar y compite con otros estudiantes.
              </Text>
            )}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-center px-2 sm:px-0">
              <Button asChild className="bg-white text-[#5E5CE6] hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] w-full sm:w-auto text-sm sm:text-base">
                <Link href="/live-practice">
                  {nextSession ? '¡Regístrate Ahora! →' : 'Ver Ensayos Disponibles →'}
                </Link>
              </Button>
              {nextSession && (
                <Button
                  onClick={() => setIsShareModalOpen(true)}
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/40 gap-2 w-full sm:w-auto text-sm sm:text-base"
                >
                  <Share2 className="w-4 h-4" />
                  Invitar amigos
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Practice and Temario Cards */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {/* Practice Card */}
          <Card hover className="p-3 sm:p-4 md:p-5 relative">
            {!isPaidUser && (
              <div className="absolute top-3 right-3 bg-purple-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Premium
              </div>
            )}
            <div className="space-y-6">
              {/* M1 Section */}
              <div className="text-center">
                <div className="text-3xl mb-3">📐</div>
                <Heading level={3} size="xs" className="mb-2">
                  Competencia Matemática M1
                </Heading>
                <Text size="sm" variant="secondary" className="mb-4">
                  Contenidos básicos: números, álgebra, geometría y probabilidades
                </Text>
                {isPaidUser ? (
                  <Button asChild className="w-full">
                    <Link href="/practice/m1">
                      Practicar M1
                    </Link>
                  </Button>
                ) : (
                  <Button disabled className="w-full opacity-60">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Practicar M1
                  </Button>
                )}
              </div>

              {/* M2 Section */}
              <div className="text-center">
                <div className="text-3xl mb-3">🎓</div>
                <Heading level={3} size="xs" className="mb-2">
                  Competencia Matemática M2
                </Heading>
                <Text size="sm" variant="secondary" className="mb-4">
                  Contenidos avanzados para carreras científicas y de ingeniería
                </Text>
                {isPaidUser ? (
                  <Button asChild className="w-full">
                    <Link href="/practice/m2">
                      Practicar M2
                    </Link>
                  </Button>
                ) : (
                  <Button disabled className="w-full opacity-60">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Practicar M2
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Temario Card */}
          <Card hover className="p-3 sm:p-4 md:p-5 relative">
            {!isPaidUser && (
              <div className="absolute top-3 right-3 bg-purple-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Premium
              </div>
            )}
            <div className="text-center h-full flex flex-col justify-center">
              <div className="text-5xl mb-4">📚</div>
              <Heading level={3} size="sm" className="mb-3">
                Temario PAES Matemática
              </Heading>
              <Text size="sm" variant="secondary" className="mb-6">
                Revisa los contenidos oficiales evaluados en la PAES de Matemática. Navega entre M1 y M2 para conocer todos los temas.
              </Text>

              {/* Curriculum Buttons */}
              <div className="mb-4">
                <Text size="xs" variant="secondary" className="mb-2 font-semibold">
                  📋 Currículo Oficial
                </Text>
                <div className="flex gap-3 justify-center flex-wrap">
                  {isPaidUser ? (
                    <>
                      <Button asChild variant="primary">
                        <Link href="/curriculum/m1">
                          Ver Currículo M1
                        </Link>
                      </Button>
                      <Button asChild variant="secondary">
                        <Link href="/curriculum/m2">
                          Ver Currículo M2
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button disabled variant="primary" className="opacity-60">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Currículo M1
                      </Button>
                      <Button disabled variant="secondary" className="opacity-60">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Currículo M2
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Documentation Buttons */}
              <div>
                <Text size="xs" variant="secondary" className="mb-2 font-semibold">
                  📖 Documentación Completa
                </Text>
                <div className="flex gap-3 justify-center flex-wrap">
                  {isPaidUser ? (
                    <>
                      <Button asChild variant="primary">
                        <Link href="/curriculum/m1/docs">
                          Docs M1
                        </Link>
                      </Button>
                      <Button asChild variant="secondary">
                        <Link href="/curriculum/m2/docs">
                          Docs M2
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button disabled variant="primary" className="opacity-60">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Docs M1
                      </Button>
                      <Button disabled variant="secondary" className="opacity-60">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Docs M2
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Registered Sessions Section */}
        {registeredSessions.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <Heading level={3} size="sm" className="mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg">
              Mis Próximos Ensayos
            </Heading>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
              {registeredSessions.map(session => (
                <Card key={session.id} hover className="p-3 sm:p-4">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <Heading level={4} size="xs" className="text-[17px] flex-1">
                      {session.name}
                    </Heading>
                    {getStatusBadge(session.status)}
                  </div>
                  <div className="space-y-2 mb-4">
                    <Text size="xs" variant="secondary">📅 {formatDate(session.scheduledStartTime)}</Text>
                    <Text size="xs" variant="secondary">📊 {session.level} - {session.questions.length} preguntas</Text>
                  </div>
                  <Button
                    asChild
                    variant={session.status === 'lobby' || session.status === 'active' ? 'success' : 'primary'}
                    className="w-full"
                  >
                    <Link href="/live-practice">
                      {session.status === 'lobby' ? 'Entrar al Lobby' : session.status === 'active' ? 'Unirse Ahora' : 'Ver Detalles'}
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tracking Card */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <Card hover className="p-3 sm:p-4 md:p-5 max-w-md mx-auto rounded-2xl sm:rounded-3xl relative">
            {!isPaidUser && (
              <div className="absolute top-3 right-3 bg-purple-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Premium
              </div>
            )}
            <div className="text-4xl mb-4">📊</div>
            <Heading level={3} size="sm" className="mb-3">
              Seguimiento de Progreso
            </Heading>
            <Text size="sm" variant="secondary" className="mb-6">
              Revisa tu desempeño, estadísticas y mejora continua
            </Text>
            {isPaidUser ? (
              <Button asChild>
                <Link href="/progress">
                  Ver Mi Progreso →
                </Link>
              </Button>
            ) : (
              <Button disabled className="opacity-60">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Ver Mi Progreso →
              </Button>
            )}
          </Card>
        </div>

        {/* Improvement Notice */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <Card className="p-3 sm:p-4 md:p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-2xl sm:text-3xl flex-shrink-0">🚀</div>
              <div className="flex-1">
                <Heading level={3} size="xs" className="mb-2 text-amber-900 dark:text-amber-100">
                  ¡Estamos Mejorando!
                </Heading>
                <Text size="sm" className="text-amber-800 dark:text-amber-200">
                  Estamos mejorando los problemas para tener problemas estilo PAES. Hasta ahora tenemos los temarios cubiertos pero no el formato. Pronto tendrás una experiencia más cercana al examen real.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </main>

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
          <Text size="xs" variant="secondary">
            © 2024 SimplePAES - Plataforma de Preparación Matemática
          </Text>
        </div>
      </footer>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
