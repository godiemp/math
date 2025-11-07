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
        return <span className="inline-flex items-center h-7 px-2.5 rounded-full text-[13px] font-medium bg-[#0A84FF]/10 text-[#0A84FF] dark:bg-[#0A84FF]/20 dark:text-[#66B2FF] transition-all duration-[120ms]">Programado</span>;
      case 'lobby':
        return <span className="inline-flex items-center h-7 px-2.5 rounded-full text-[13px] font-medium bg-[#FF9F0A]/10 text-[#FF9F0A] dark:bg-[#FF9F0A]/20 dark:text-[#FFB84D] transition-all duration-[120ms]">Lobby Abierto</span>;
      case 'active':
        return <span className="inline-flex items-center h-7 px-2.5 rounded-full text-[13px] font-medium bg-[#34C759]/10 text-[#34C759] dark:bg-[#30D158]/20 dark:text-[#5DE38D] transition-all duration-[120ms]">En Curso</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]">
      {/* Navbar with variableBlur material - height: 56px, backdrop-blur, hairline border */}
      <nav className="sticky top-0 z-30 h-14 backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-b border-black/[0.12] dark:border-white/[0.16] saturate-[1.2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex justify-between items-center">
          <h1 className="text-[19px] font-semibold tracking-tight text-[#0A84FF]" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            PAES Chile - Matemática
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-[15px] text-black/60 dark:text-white/70">
              Hola, {user?.displayName}
            </span>
            {isAdmin && (
              <button
                onClick={() => router.push('/admin')}
                className="h-11 px-4 rounded-xl text-[15px] font-semibold bg-[#5E5CE6] dark:bg-[#9A99FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              >
                Admin
              </button>
            )}
            <button
              onClick={handleLogout}
              className="h-11 px-4 rounded-xl text-[15px] font-semibold bg-[#FF453A] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        {/* Hero Section with SF Pro Display */}
        <div className="text-center mb-12">
          <h2 className="text-[44px] leading-[1.1] font-semibold tracking-tight text-black dark:text-white mb-4" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Prepárate para la PAES
          </h2>
          <p className="text-[17px] leading-[1.4] text-black/60 dark:text-white/70 mb-8 max-w-3xl mx-auto">
            Practica para la Prueba de Acceso a la Educación Superior con ejercicios organizados por tema
          </p>
        </div>

        {/* Practice Cards with liquidGlass material */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {/* M1 Card */}
          <div className="group relative backdrop-blur-[12px] bg-white/60 dark:bg-[#1C1C1C]/60 rounded-2xl p-4 border border-black/[0.12] dark:border-white/[0.16] shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] saturate-[1.0]">
            <div className="text-3xl mb-4">📐</div>
            <h3 className="text-[19px] font-semibold mb-2 text-black dark:text-white" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Competencia Matemática M1
            </h3>
            <p className="text-[15px] leading-[1.4] text-black/60 dark:text-white/70 mb-4">
              Contenidos básicos: números, álgebra, geometría y probabilidades
            </p>
            <div className="flex gap-2">
              <Link
                href="/practice/m1"
                className="inline-flex items-center justify-center h-11 px-4 rounded-xl text-[15px] font-semibold bg-[#0A84FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              >
                Practicar M1
              </Link>
              <Link
                href="/curriculum/m1"
                className="inline-flex items-center justify-center h-11 px-4 rounded-xl text-[15px] font-semibold bg-black/[0.04] dark:bg-white/[0.06] text-black dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              >
                Ver Curriculum
              </Link>
            </div>
          </div>

          {/* M2 Card */}
          <div className="group relative backdrop-blur-[12px] bg-white/60 dark:bg-[#1C1C1C]/60 rounded-2xl p-4 border border-black/[0.12] dark:border-white/[0.16] shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] saturate-[1.0]">
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="text-[19px] font-semibold mb-2 text-black dark:text-white" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Competencia Matemática M2
            </h3>
            <p className="text-[15px] leading-[1.4] text-black/60 dark:text-white/70 mb-4">
              Contenidos avanzados para carreras científicas y de ingeniería
            </p>
            <div className="flex gap-2">
              <Link
                href="/practice/m2"
                className="inline-flex items-center justify-center h-11 px-4 rounded-xl text-[15px] font-semibold bg-[#0A84FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              >
                Practicar M2
              </Link>
              <Link
                href="/curriculum/m2"
                className="inline-flex items-center justify-center h-11 px-4 rounded-xl text-[15px] font-semibold bg-black/[0.04] dark:bg-white/[0.06] text-black dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              >
                Ver Curriculum
              </Link>
            </div>
          </div>
        </div>

        {/* Live Practice Featured Card with gradient */}
        <div className="relative overflow-hidden backdrop-blur-[20px] bg-gradient-to-r from-[#5E5CE6] to-[#0A84FF] dark:from-[#9A99FF] dark:to-[#0A84FF] rounded-3xl p-8 mb-12 shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
          <div className="text-center relative z-10">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-[28px] font-semibold mb-3 text-white tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Ensayo PAES en Vivo
            </h3>
            <p className="text-[17px] leading-[1.4] text-white/90 mb-6 max-w-2xl mx-auto">
              ¡Nuevo! Practica con ensayos PAES en tiempo real. Regístrate, únete al lobby antes de comenzar y compite con otros estudiantes.
            </p>
            <Link
              href="/live-practice"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl text-[15px] font-semibold bg-white text-[#5E5CE6] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            >
              Ver Ensayos Disponibles →
            </Link>
          </div>
        </div>

        {/* Registered Sessions Section */}
        {registeredSessions.length > 0 && (
          <div className="mb-12">
            <h3 className="text-[28px] font-semibold text-black dark:text-white mb-6 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Mis Próximos Ensayos
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {registeredSessions.map(session => (
                <div key={session.id} className="backdrop-blur-[12px] bg-white/60 dark:bg-[#1C1C1C]/60 rounded-2xl p-5 border border-black/[0.12] dark:border-white/[0.16] shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h4 className="text-[17px] font-semibold text-black dark:text-white flex-1">
                      {session.name}
                    </h4>
                    {getStatusBadge(session.status)}
                  </div>
                  <div className="space-y-2 text-[13px] text-black/60 dark:text-white/70 mb-4">
                    <p>📅 {formatDate(session.scheduledStartTime)}</p>
                    <p>📊 {session.level} - {session.questions.length} preguntas</p>
                  </div>
                  <Link
                    href="/live-practice"
                    className={`block text-center px-4 h-11 rounded-xl text-[15px] font-semibold leading-[44px] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                      session.status === 'lobby' || session.status === 'active'
                        ? 'bg-[#34C759] dark:bg-[#30D158] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
                        : 'bg-[#0A84FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
                    }`}
                  >
                    {session.status === 'lobby' ? 'Entrar al Lobby' : session.status === 'active' ? 'Unirse Ahora' : 'Ver Detalles'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tracking Card */}
        <div className="mt-12 text-center">
          <div className="backdrop-blur-[12px] bg-white/60 dark:bg-[#1C1C1C]/60 rounded-3xl p-8 max-w-md mx-auto border border-black/[0.12] dark:border-white/[0.16] shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-[28px] font-semibold mb-3 text-black dark:text-white tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Seguimiento de Progreso
            </h3>
            <p className="text-[15px] leading-[1.4] text-black/60 dark:text-white/70 mb-6">
              Revisa tu desempeño, estadísticas y mejora continua
            </p>
            <Link
              href="/progress"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl text-[15px] font-semibold bg-[#0A84FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            >
              Ver Mi Progreso →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer with hairline border */}
      <footer className="backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-t border-black/[0.12] dark:border-white/[0.16] mt-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6 text-center text-[13px] text-black/60 dark:text-white/70">
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
