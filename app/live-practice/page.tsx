'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logoutUser } from '@/lib/auth';
import { getActiveSessions, createSession, joinSession } from '@/lib/liveSessions';
import { LiveSession } from '@/lib/types';
import Auth from '@/components/Auth';
import LiveSessionComponent from '@/components/LiveSession';

export default function LivePracticePage() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [sessionLevel, setSessionLevel] = useState<'M1' | 'M2'>('M1');
  const [questionCount, setQuestionCount] = useState(10);
  const [maxParticipants, setMaxParticipants] = useState(20);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const refreshSessions = () => {
    setSessions(getActiveSessions());
  };

  useEffect(() => {
    refreshSessions();
    const interval = setInterval(refreshSessions, 3000); // Refresh every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const handleCreateSession = () => {
    if (!currentUser) return;
    if (!sessionName.trim()) {
      setError('Por favor ingresa un nombre para la sesión');
      return;
    }

    const newSession = createSession(
      sessionName.trim(),
      sessionLevel,
      currentUser,
      questionCount,
      maxParticipants
    );

    setShowCreateModal(false);
    setSessionName('');
    setError('');
    setActiveSessionId(newSession.id);
    refreshSessions();
  };

  const handleJoinSession = (sessionId: string) => {
    if (!currentUser) return;

    const result = joinSession(sessionId, currentUser);
    if (result.success) {
      setActiveSessionId(sessionId);
    } else {
      setError(result.error || 'Error al unirse a la sesión');
    }
  };

  const handleExitSession = () => {
    setActiveSessionId(null);
    refreshSessions();
  };

  // Show auth screen if not logged in
  if (!currentUser) {
    return <Auth onSuccess={() => setCurrentUser(getCurrentUser())} />;
  }

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
                Práctica en Vivo
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Practica con otros estudiantes en tiempo real
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Bienvenido,</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser.displayName}</p>
              </div>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>

        {/* Create Session Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            + Crear Nueva Sesión
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Active Sessions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Sesiones Disponibles ({sessions.length})
          </h2>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No hay sesiones activas en este momento
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                ¡Crea una nueva sesión para empezar a practicar!
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        por {session.hostName}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.status === 'waiting'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {session.status === 'waiting' ? 'Esperando' : 'En Curso'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
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
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium mr-2">Participantes:</span>
                      <span>{session.participants.length}/{session.maxParticipants}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinSession(session.id)}
                    disabled={session.participants.length >= session.maxParticipants}
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {session.participants.some(p => p.userId === currentUser.id)
                      ? 'Volver a Entrar'
                      : 'Unirse'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Crear Nueva Sesión
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre de la Sesión
                </label>
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  placeholder="Ej: Práctica de Álgebra"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nivel
                </label>
                <select
                  value={sessionLevel}
                  onChange={(e) => setSessionLevel(e.target.value as 'M1' | 'M2')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="M1">M1</option>
                  <option value="M2">M2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cantidad de Preguntas
                </label>
                <input
                  type="number"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  min="5"
                  max="20"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Máximo de Participantes
                </label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number(e.target.value))}
                  min="2"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setError('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateSession}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
