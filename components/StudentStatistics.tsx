'use client';

import React, { useEffect, useState } from 'react';
import { getMyStatistics } from '@/lib/sessionApi';
import type { StudentStatistics } from '@/lib/types';

export default function StudentStatisticsComponent() {
  const [stats, setStats] = useState<StudentStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setLoading(true);
    setError(null);
    const result = await getMyStatistics();

    if (result.success && result.data) {
      setStats(result.data);
    } else {
      setError(result.error || 'Error al cargar estadísticas');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  if (!stats || stats.totalSessions === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Mis Estadísticas</h2>
        <div className="text-center text-gray-600 py-8">
          <p className="text-lg">Aún no has completado ninguna sesión de práctica en vivo.</p>
          <p className="text-sm mt-2">¡Únete a una sesión para comenzar a ver tus estadísticas!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-purple-800 mb-4 sm:mb-6">Mis Estadísticas</h2>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatCard
          title="Sesiones Completadas"
          value={stats.totalSessions}
          icon="📊"
        />
        <StatCard
          title="Puntaje Promedio"
          value={`${stats.averageScore} / ${stats.totalQuestions / stats.totalSessions || 0}`}
          icon="🎯"
        />
        <StatCard
          title="Precisión Promedio"
          value={`${stats.averageAccuracy}%`}
          icon="✓"
          color={getAccuracyColor(stats.averageAccuracy)}
        />
        <StatCard
          title="Mejor Puntaje"
          value={stats.bestScore}
          icon="⭐"
          color="text-yellow-600"
        />
      </div>

      {/* Top Rankings */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
        <h3 className="text-base sm:text-lg font-bold text-purple-800 mb-2 sm:mb-3">Ranking</h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl mb-1">🥇</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">{stats.topRankings.first}</div>
            <div className="text-xs sm:text-sm text-gray-600">1er Lugar</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl mb-1">🥈</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400">{stats.topRankings.second}</div>
            <div className="text-xs sm:text-sm text-gray-600">2do Lugar</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl mb-1">🥉</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">{stats.topRankings.third}</div>
            <div className="text-xs sm:text-sm text-gray-600">3er Lugar</div>
          </div>
        </div>
      </div>

      {/* Level Statistics */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-purple-800 mb-2 sm:mb-3">Estadísticas por Nivel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <LevelStatsCard
            level="M1"
            sessions={stats.byLevel.M1.sessions}
            averageScore={stats.byLevel.M1.averageScore}
            averageAccuracy={stats.byLevel.M1.averageAccuracy}
          />
          <LevelStatsCard
            level="M2"
            sessions={stats.byLevel.M2.sessions}
            averageScore={stats.byLevel.M2.averageScore}
            averageAccuracy={stats.byLevel.M2.averageAccuracy}
          />
        </div>
      </div>

      {/* Recent Sessions */}
      {stats.recentSessions.length > 0 && (
        <div>
          <h3 className="text-base sm:text-lg font-bold text-purple-800 mb-2 sm:mb-3">Sesiones Recientes</h3>
          <div className="space-y-2 sm:space-y-3">
            {stats.recentSessions.map((session) => (
              <div
                key={session.sessionId}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Mobile layout: stacked */}
                <div className="sm:hidden space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-800 truncate">{session.sessionName}</div>
                      <div className="text-xs text-gray-600">
                        {new Date(session.completedAt).toLocaleDateString('es-CL', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded flex-shrink-0">
                      {session.level}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-base font-bold text-gray-800">
                        {session.score}/{session.totalQuestions}
                      </div>
                      <div className="text-xs text-gray-600">Puntaje</div>
                    </div>
                    <div>
                      <div className={`text-base font-bold ${getAccuracyColor(session.accuracy)}`}>
                        {session.accuracy}%
                      </div>
                      <div className="text-xs text-gray-600">Precisión</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-purple-600">#{session.rank}</div>
                      <div className="text-xs text-gray-600">Ranking</div>
                    </div>
                  </div>
                </div>

                {/* Desktop layout: horizontal */}
                <div className="hidden sm:flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-gray-800 truncate">{session.sessionName}</div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {new Date(session.completedAt).toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="text-center mx-2 sm:mx-4">
                    <div className="text-xs sm:text-sm font-medium text-purple-600">{session.level}</div>
                  </div>
                  <div className="text-center mx-2 sm:mx-4">
                    <div className="text-base sm:text-lg font-bold text-gray-800">
                      {session.score}/{session.totalQuestions}
                    </div>
                    <div className="text-xs text-gray-600">Puntaje</div>
                  </div>
                  <div className="text-center mx-2 sm:mx-4">
                    <div className={`text-base sm:text-lg font-bold ${getAccuracyColor(session.accuracy)}`}>
                      {session.accuracy}%
                    </div>
                    <div className="text-xs text-gray-600">Precisión</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base sm:text-lg font-bold text-purple-600">#{session.rank}</div>
                    <div className="text-xs text-gray-600">Ranking</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: string;
}

function StatCard({ title, value, icon, color = 'text-purple-600' }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 sm:p-4">
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <span className="text-xl sm:text-2xl">{icon}</span>
      </div>
      <div className={`text-2xl sm:text-3xl font-bold ${color} mb-0.5 sm:mb-1`}>{value}</div>
      <div className="text-xs sm:text-sm text-gray-600">{title}</div>
    </div>
  );
}

interface LevelStatsCardProps {
  level: string;
  sessions: number;
  averageScore: number;
  averageAccuracy: number;
}

function LevelStatsCard({ level, sessions, averageScore, averageAccuracy }: LevelStatsCardProps) {
  if (sessions === 0) {
    return (
      <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-base sm:text-lg font-bold text-purple-800">{level}</h4>
        </div>
        <div className="text-xs sm:text-sm text-gray-600">Sin sesiones completadas</div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h4 className="text-base sm:text-lg font-bold text-purple-800">{level}</h4>
        <span className="text-xs sm:text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
          {sessions} {sessions === 1 ? 'sesión' : 'sesiones'}
        </span>
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-gray-600">Puntaje Promedio:</span>
          <span className="font-bold text-sm sm:text-base text-purple-600">{averageScore.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-gray-600">Precisión Promedio:</span>
          <span className={`font-bold text-sm sm:text-base ${getAccuracyColor(averageAccuracy)}`}>
            {averageAccuracy.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 80) return 'text-green-600';
  if (accuracy >= 60) return 'text-yellow-600';
  return 'text-red-600';
}
