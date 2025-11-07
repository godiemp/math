'use client';

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";
import { getUserRegisteredSessions, updateSessionStatuses } from "@/lib/liveSessions";
import { useEffect, useState } from "react";
import { LiveSession } from "@/lib/types";

function DashboardContent() {
  const { user, setUser, isAdmin } = useAuth();
  const router = useRouter();
  const [registeredSessions, setRegisteredSessions] = useState<LiveSession[]>([]);

  useEffect(() => {
    if (user) {
      // Update session statuses
      updateSessionStatuses();

      // Get user's registered sessions
      const sessions = getUserRegisteredSessions(user.id);

      // Filter for upcoming sessions only (scheduled, lobby, active)
      const upcomingSessions = sessions.filter(s =>
        s.status === 'scheduled' || s.status === 'lobby' || s.status === 'active'
      );

      // Sort by scheduled start time
      upcomingSessions.sort((a, b) => a.scheduledStartTime - b.scheduledStartTime);

      setRegisteredSessions(upcomingSessions);
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser();
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
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm">Programado</span>;
      case 'lobby':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded text-sm">Lobby Abierto</span>;
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-sm">En Curso</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            PAES Chile - Matemática
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300">
              Hola, {user?.displayName}
            </span>
            {isAdmin && (
              <button
                onClick={() => router.push('/admin')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Admin
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Prepárate para la PAES
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Practica para la Prueba de Acceso a la Educación Superior con ejercicios organizados por tema
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">📐</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Competencia Matemática M1
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Contenidos básicos: números, álgebra, geometría y probabilidades
            </p>
            <div className="flex gap-2">
              <Link
                href="/practice/m1"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Practicar M1
              </Link>
              <Link
                href="/curriculum/m1"
                className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Ver Curriculum
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Competencia Matemática M2
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Contenidos avanzados para carreras científicas y de ingeniería
            </p>
            <div className="flex gap-2">
              <Link
                href="/practice/m2"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Practicar M2
              </Link>
              <Link
                href="/curriculum/m2"
                className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Ver Curriculum
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md p-8 mb-12">
          <div className="text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-3 text-white">
              Ensayo PAES en Vivo
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              ¡Nuevo! Practica con ensayos PAES en tiempo real. Regístrate, únete al lobby antes de comenzar y compite con otros estudiantes.
            </p>
            <Link
              href="/live-practice"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold shadow-lg"
            >
              Ver Ensayos Disponibles →
            </Link>
          </div>
        </div>

        {registeredSessions.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Mis Próximos Ensayos
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {registeredSessions.map(session => (
                <div key={session.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {session.name}
                    </h4>
                    {getStatusBadge(session.status)}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <p>📅 {formatDate(session.scheduledStartTime)}</p>
                    <p>📊 {session.level} - {session.questions.length} preguntas</p>
                    <p>👥 {session.registeredUsers.length} registrado{session.registeredUsers.length !== 1 ? 's' : ''}</p>
                  </div>
                  <Link
                    href="/live-practice"
                    className={`block text-center px-4 py-2 rounded-lg transition-colors font-medium ${
                      session.status === 'lobby' || session.status === 'active'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {session.status === 'lobby' ? 'Entrar al Lobby' : session.status === 'active' ? 'Unirse Ahora' : 'Ver Detalles'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md mx-auto">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              Seguimiento de Progreso
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Revisa tu desempeño, estadísticas y mejora continua
            </p>
            <Link
              href="/progress"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-lg"
            >
              Ver Mi Progreso →
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 PAES Chile - Plataforma de Preparación Matemática</p>
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
