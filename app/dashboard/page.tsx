'use client';

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";
import { getAllAvailableSessions, updateSessionStatuses } from "@/lib/sessionApi";
import { useEffect, useState } from "react";
import { LiveSession } from "@/lib/types";
import { Button, Card, Badge, Heading, Text, LoadingScreen } from "@/components/ui";
import { Streak } from "@/components/Streak";
import { ShareModal } from "@/components/ShareModal";
import { SkillsAnalytics } from "@/components/SkillsAnalytics";
import { Share2 } from "lucide-react";

function DashboardContent() {
  const { user, setUser, isAdmin } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [registeredSessions, setRegisteredSessions] = useState<LiveSession[]>([]);
  const [nextSession, setNextSession] = useState<LiveSession | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (user) {
        // Update session statuses
        await updateSessionStatuses();

        // Get all available sessions from API
        const allAvailableSessions = await getAllAvailableSessions();

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
        setIsLoading(false);
      }
    };

    loadDashboardData();
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

  // Show loading screen while data is being fetched
  if (isLoading) {
    return <LoadingScreen message="Preparando tu panel..." />;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]">
      {/* Navbar with variableBlur material */}
      <nav className="sticky top-0 z-30 h-14 backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-b border-black/[0.12] dark:border-white/[0.16] saturate-[1.2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex justify-between items-center">
          <Heading level={1} size="xs" className="text-[#0A84FF]">
            PAES Chile - Matemática
          </Heading>
          <div className="flex items-center gap-3">
            <Text size="sm" variant="secondary">
              Hola, {user?.displayName}
            </Text>
            {isAdmin && (
              <Button variant="secondary" onClick={() => router.push('/admin')}>
                Admin
              </Button>
            )}
            <Button variant="danger" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        {/* Streak Section */}
        <div className="mb-8">
          <Streak initialStreak={user ? {
            currentStreak: user.currentStreak || 0,
            longestStreak: user.longestStreak || 0,
            lastPracticeDate: user.lastPracticeDate || null
          } : undefined} />
        </div>

        {/* Practice and Temario Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Practice Card */}
          <Card hover className="p-6">
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
                <Button asChild className="w-full">
                  <Link href="/practice/m1">
                    Practicar M1
                  </Link>
                </Button>
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
                <Button asChild className="w-full">
                  <Link href="/practice/m2">
                    Practicar M2
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Temario Card */}
          <Card hover className="p-6">
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
                </div>
              </div>

              {/* Documentation Buttons */}
              <div>
                <Text size="xs" variant="secondary" className="mb-2 font-semibold">
                  📖 Documentación Completa
                </Text>
                <div className="flex gap-3 justify-center flex-wrap">
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
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Practice Featured Card with gradient */}
        <div className="relative overflow-hidden backdrop-blur-[20px] bg-gradient-to-r from-[#5E5CE6] to-[#0A84FF] dark:from-[#9A99FF] dark:to-[#0A84FF] rounded-3xl p-8 mb-12 shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
          <div className="text-center relative z-10">
            <div className="text-5xl mb-4">📝</div>
            <Heading level={3} size="sm" className="mb-3 text-white">
              Ensayo PAES en Vivo
            </Heading>
            {nextSession ? (
              <>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4 inline-block">
                  <Text size="xs" className="text-white/80 font-semibold uppercase tracking-wider mb-1">
                    Próximo Ensayo
                  </Text>
                  <div className="text-2xl font-bold text-white mb-1">
                    {new Date(nextSession.scheduledStartTime).toLocaleDateString('es-CL', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </div>
                  <div className="text-xl font-semibold text-white/95">
                    {new Date(nextSession.scheduledStartTime).toLocaleTimeString('es-CL', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })} hrs
                  </div>
                  <Text size="sm" className="text-white/90 mt-2">
                    {nextSession.name} - {nextSession.level}
                  </Text>
                </div>
                <Text size="md" className="mb-6 max-w-2xl mx-auto text-white/90">
                  ¡Regístrate ahora! Practica con ensayos PAES en tiempo real y compite con otros estudiantes.
                </Text>
              </>
            ) : (
              <Text size="md" className="mb-6 max-w-2xl mx-auto text-white/90">
                ¡Nuevo! Practica con ensayos PAES en tiempo real. Regístrate, únete al lobby antes de comenzar y compite con otros estudiantes.
              </Text>
            )}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Button asChild className="bg-white text-[#5E5CE6] hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                <Link href="/live-practice">
                  {nextSession ? '¡Regístrate Ahora! →' : 'Ver Ensayos Disponibles →'}
                </Link>
              </Button>
              {nextSession && (
                <Button
                  onClick={() => setIsShareModalOpen(true)}
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/40 gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Invitar amigos
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Registered Sessions Section */}
        {registeredSessions.length > 0 && (
          <div className="mb-12">
            <Heading level={3} size="sm" className="mb-6">
              Mis Próximos Ensayos
            </Heading>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {registeredSessions.map(session => (
                <Card key={session.id} hover className="p-5">
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

        {/* Skills Analytics Section */}
        <div className="mb-12">
          <SkillsAnalytics />
        </div>

        {/* Progress Tracking Card */}
        <div className="mt-12 text-center">
          <Card hover className="p-8 max-w-md mx-auto rounded-3xl">
            <div className="text-4xl mb-4">📊</div>
            <Heading level={3} size="sm" className="mb-3">
              Seguimiento de Progreso
            </Heading>
            <Text size="sm" variant="secondary" className="mb-6">
              Revisa tu desempeño, estadísticas y mejora continua
            </Text>
            <Button asChild>
              <Link href="/progress">
                Ver Mi Progreso →
              </Link>
            </Button>
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
            url: typeof window !== 'undefined' ? `${window.location.origin}/live-practice` : '/live-practice',
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
      <footer className="backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-t border-black/[0.12] dark:border-white/[0.16] mt-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6 text-center">
          <Text size="xs" variant="secondary">
            © 2024 PAES Chile - Plataforma de Preparación Matemática
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
