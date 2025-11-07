'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth';
import { getAllAvailableSessions, joinSession, updateSessionStatuses, registerForSession, unregisterFromSession } from '@/lib/liveSessions';
import { LiveSession } from '@/lib/types';
import LiveSessionComponent from '@/components/LiveSession';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

function LivePracticePageContent() {
  const { user: currentUser, setUser, isAdmin } = useAuth();
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const refreshSessions = () => {
    updateSessionStatuses(); // Auto-update session statuses based on time
    setSessions(getAllAvailableSessions());
  };

  useEffect(() => {
    refreshSessions();
    const interval = setInterval(refreshSessions, 3000); // Refresh every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push('/');
  };

  const handleRegisterSession = (sessionId: string) => {
    if (!currentUser) return;

    const result = registerForSession(sessionId, currentUser);
    if (result.success) {
      setError('');
      refreshSessions();
    } else {
      setError(result.error || 'Error al registrarse');
    }
  };

  const handleUnregisterSession = (sessionId: string) => {
    if (!currentUser) return;

    const result = unregisterFromSession(sessionId, currentUser.id);
    if (result.success) {
      setError('');
      refreshSessions();
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
    refreshSessions();
  };

  const isUserRegistered = (session: LiveSession) => {
    return session.registeredUsers.some(r => r.userId === currentUser?.id);
  };

  const isUserInSession = (session: LiveSession) => {
    return session.participants.some(p => p.userId === currentUser?.id);
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Ensayo PAES en Vivo
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Regístrate y practica ensayos PAES con otros estudiantes en tiempo real
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Bienvenido,</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser?.displayName}</p>
                {isAdmin && (
                  <p className="text-xs text-indigo-600 dark:text-indigo-400">Administrador</p>
                )}
              </div>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Inicio
              </button>
              {isAdmin && (
                <button
                  onClick={() => router.push('/admin')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Admin
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Available Ensayos */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Ensayos Disponibles ({sessions.length})
          </h2>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No hay ensayos disponibles en este momento
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Espera a que un administrador cree un nuevo ensayo
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        {session.name}
                      </h3>
                      {session.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                          {session.description}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        por {session.hostName}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : session.status === 'lobby'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : session.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {session.status === 'scheduled' ? 'Programado' : session.status === 'lobby' ? 'Lobby Abierto' : session.status === 'active' ? 'En Curso' : session.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {session.scheduledStartTime && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium mr-2">📅 Fecha:</span>
                        <span>
                          {new Date(session.scheduledStartTime).toLocaleString('es-CL', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium mr-2">Nivel:</span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded">
                        {session.level}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium mr-2">Preguntas:</span>
                      <span>{session.questions.length}</span>
                    </div>
                    {session.status === 'scheduled' && (
                      <>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium mr-2">Registrados:</span>
                          <span>{session.registeredUsers.length}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium mr-2">En lobby:</span>
                          <span>{session.participants.length}</span>
                        </div>
                      </>
                    )}
                    {session.status === 'active' && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium mr-2">Participantes:</span>
                        <span>{session.participants.length}</span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons based on session status */}
                  {session.status === 'scheduled' ? (
                    isUserRegistered(session) ? (
                      <button
                        onClick={() => handleUnregisterSession(session.id)}
                        className="w-full py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        Cancelar Registro
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegisterSession(session.id)}
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Registrarse
                      </button>
                    )
                  ) : session.status === 'lobby' ? (
                    <button
                      onClick={() => handleJoinSession(session.id)}
                      className="w-full py-2 px-4 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                    >
                      {isUserInSession(session) ? 'Volver al Lobby' : 'Entrar al Lobby'}
                    </button>
                  ) : session.status === 'active' ? (
                    <button
                      onClick={() => handleJoinSession(session.id)}
                      className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      {isUserInSession(session) ? 'Volver a Entrar' : 'Unirse Ahora'}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
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
