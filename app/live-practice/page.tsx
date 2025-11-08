'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth';
import { registerForSession, unregisterFromSession } from '@/lib/sessionApi';
import { useAvailableSessions } from '@/lib/hooks/useSessions';
import { joinSession } from '@/lib/liveSessions';
import { LiveSession } from '@/lib/types';
import LiveSessionComponent from '@/components/LiveSession';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';

function LivePracticePageContent() {
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

    const result = await registerForSession(sessionId, currentUser);
    if (result.success) {
      setError('');
      await refresh();
    } else {
      setError(result.error || 'Error al registrarse');
    }
  };

  const handleUnregisterSession = async (sessionId: string) => {
    if (!currentUser) return;

    const result = await unregisterFromSession(sessionId, currentUser.id);
    if (result.success) {
      setError('');
      await refresh();
    } else {
      setError(result.error || 'Error al cancelar registro');
    }
  };

  const handleJoinSession = (sessionId: string) => {
    if (!currentUser) return;

    const result = joinSession(sessionId, currentUser);
    if (result.success) {
      setActiveSessionId(sessionId);
    } else {
      setError(result.error || 'Error al unirse al ensayo');
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6" padding="lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <Heading level={1} size="md" className="mb-2">
                Ensayo PAES en Vivo
              </Heading>
              <Text variant="secondary">
                Regístrate y practica ensayos PAES con otros estudiantes en tiempo real
              </Text>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <Text size="xs" variant="secondary">Bienvenido,</Text>
                <Text className="font-medium">{currentUser?.displayName}</Text>
                {isAdmin && (
                  <Badge variant="info" size="sm">Administrador</Badge>
                )}
              </div>
              <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                Inicio
              </Button>
              {isAdmin && (
                <Button variant="secondary" onClick={() => router.push('/admin')}>
                  Admin
                </Button>
              )}
              <Button variant="danger" onClick={handleLogout}>
                Salir
              </Button>
            </div>
          </div>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 border-[#FF453A] dark:border-[#FF7A72]" padding="md">
            <Text className="text-[#FF453A] dark:text-[#FF7A72]">{error}</Text>
          </Card>
        )}

        {/* Available Ensayos */}
        <Card padding="lg">
          <Heading level={2} size="xs" className="mb-4">
            Ensayos Disponibles ({sessions.length})
          </Heading>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <Text variant="secondary" className="mb-4">
                No hay ensayos disponibles en este momento
              </Text>
              <Text size="xs" variant="secondary">
                Espera a que un administrador cree un nuevo ensayo
              </Text>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border border-black/[0.12] dark:border-white/[0.16] rounded-xl p-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-[180ms]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <Heading level={3} size="xs" className="mb-1">
                        {session.name}
                      </Heading>
                      {session.description && (
                        <Text size="xs" variant="secondary" className="mb-1">
                          {session.description}
                        </Text>
                      )}
                      <Text size="xs" variant="secondary">
                        por {session.hostName}
                      </Text>
                    </div>
                    <Badge
                      variant={
                        session.status === 'scheduled' ? 'info' :
                        session.status === 'lobby' ? 'warning' :
                        session.status === 'active' ? 'success' : 'neutral'
                      }
                      size="sm"
                    >
                      {session.status === 'scheduled' ? 'Programado' :
                       session.status === 'lobby' ? 'Lobby Abierto' :
                       session.status === 'active' ? 'En Curso' : session.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    {session.scheduledStartTime && (
                      <div className="flex items-center">
                        <Text size="xs" variant="secondary" className="font-medium mr-2">📅 Fecha:</Text>
                        <Text size="xs" variant="secondary">
                          {new Date(session.scheduledStartTime).toLocaleString('es-CL', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </Text>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Text size="xs" variant="secondary" className="font-medium mr-2">Nivel:</Text>
                      <Badge variant="info" size="sm">{session.level}</Badge>
                    </div>
                    <div className="flex items-center">
                      <Text size="xs" variant="secondary" className="font-medium mr-2">Preguntas:</Text>
                      <Text size="xs" variant="secondary">{session.questions.length}</Text>
                    </div>
                  </div>

                  {/* Action buttons based on session status */}
                  {session.status === 'scheduled' ? (
                    isUserRegistered(session) ? (
                      <Button
                        variant="danger"
                        onClick={() => handleUnregisterSession(session.id)}
                        fullWidth
                      >
                        Cancelar Registro
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleRegisterSession(session.id)}
                        fullWidth
                      >
                        Registrarse
                      </Button>
                    )
                  ) : session.status === 'lobby' ? (
                    <Button
                      variant="primary"
                      onClick={() => handleJoinSession(session.id)}
                      fullWidth
                      className="bg-[#FF9F0A] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                    >
                      {isUserInSession(session) ? 'Volver al Lobby' : 'Entrar al Lobby'}
                    </Button>
                  ) : session.status === 'active' ? (
                    <Button
                      variant="success"
                      onClick={() => handleJoinSession(session.id)}
                      fullWidth
                    >
                      {isUserInSession(session) ? 'Volver a Entrar' : 'Unirse Ahora'}
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </Card>
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
