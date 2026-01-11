'use client';

import { useRouter } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Spinner } from '@/components/ui';
import { useClasses, type TeacherClass } from '@/lib/hooks/useClasses';

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'hace un momento';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const { classes, isLoading, error } = useClasses();

  // Compute totals from real data
  const totalStudents = classes.reduce((sum: number, c: TeacherClass) => sum + c.studentCount, 0);
  const totalClasses = classes.length;
  const avgAccuracy =
    totalClasses > 0
      ? classes.reduce((sum: number, c: TeacherClass) => sum + (c.avgAccuracy || 0), 0) / totalClasses
      : 0;

  // Count classes with recent activity
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const activeClasses = classes.filter((c: TeacherClass) => c.lastActivity && c.lastActivity > oneWeekAgo).length;

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div
          data-testid="teacher-welcome-header"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white"
        >
          <Heading level={1} size="lg" className="text-white mb-2">
            Bienvenido, Profesor
          </Heading>
          <Text className="text-emerald-100">
            Aquí puedes ver el progreso de tus estudiantes y gestionar tus clases.
          </Text>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card padding="lg" className="text-center py-12 border-red-200 dark:border-red-800">
            <Text className="text-red-600 dark:text-red-400">
              Error al cargar los datos. Por favor, intenta de nuevo.
            </Text>
          </Card>
        )}

        {!isLoading && !error && (
          <>
            {/* Stats Overview */}
            <div data-testid="teacher-stats-grid" className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800"
                padding="lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Text size="xs" variant="secondary" className="mb-1">
                      Total Estudiantes
                    </Text>
                    <Heading level={2} size="xl" className="text-blue-600 dark:text-blue-400">
                      {totalStudents}
                    </Heading>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </Card>

              <Card
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800"
                padding="lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Text size="xs" variant="secondary" className="mb-1">
                      Clases Activas
                    </Text>
                    <Heading level={2} size="xl" className="text-purple-600 dark:text-purple-400">
                      {totalClasses}
                    </Heading>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                </div>
              </Card>

              <Card
                className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800"
                padding="lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Text size="xs" variant="secondary" className="mb-1">
                      Precisión Promedio
                    </Text>
                    <Heading level={2} size="xl" className="text-green-600 dark:text-green-400">
                      {totalClasses > 0 ? `${Math.round(avgAccuracy * 100)}%` : '-'}
                    </Heading>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </Card>

              <Card
                className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800"
                padding="lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Text size="xs" variant="secondary" className="mb-1">
                      Con Actividad Reciente
                    </Text>
                    <Heading level={2} size="xl" className="text-orange-600 dark:text-orange-400">
                      {activeClasses}
                    </Heading>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🔥</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Classes List */}
              <div className="lg:col-span-2" data-testid="teacher-classes-section">
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <Heading level={3} size="sm">
                      Mis Clases
                    </Heading>
                    <button
                      onClick={() => router.push('/teacher/classes')}
                      className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Ver todas →
                    </button>
                  </div>

                  {classes.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">📚</span>
                      </div>
                      <Text variant="secondary" size="sm" className="mb-4">
                        No tienes clases aún
                      </Text>
                      <button
                        onClick={() => router.push('/teacher/classes/new')}
                        className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        Crear mi primera clase →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {classes.slice(0, 5).map((cls: TeacherClass) => (
                        <button
                          key={cls.id}
                          onClick={() => router.push(`/teacher/classes/${cls.id}`)}
                          className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {cls.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {cls.studentCount} estudiantes • {cls.schoolName || 'Sin colegio'}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                {cls.avgAccuracy ? `${Math.round(cls.avgAccuracy * 100)}%` : '-'}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                precisión
                              </div>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                              style={{ width: `${(cls.avgAccuracy || 0) * 100}%` }}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </Card>
              </div>

              {/* Quick Actions */}
              <div data-testid="teacher-quick-actions">
                <Card padding="lg">
                  <Heading level={3} size="sm" className="mb-4">
                    Acciones Rápidas
                  </Heading>

                  <div className="space-y-2">
                    <button
                      onClick={() => router.push('/mini-lessons')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-left"
                    >
                      <span className="text-xl">🔴</span>
                      <div className="flex-1">
                        <span className="font-medium text-red-700 dark:text-red-300 block">
                          Iniciar clase en vivo
                        </span>
                        <span className="text-xs text-red-600 dark:text-red-400">
                          Sincroniza lecciones con estudiantes
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => router.push('/teacher/classes')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all text-left"
                    >
                      <span className="text-xl">👥</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Gestionar clases
                      </span>
                    </button>

                    <button
                      onClick={() => router.push('/teacher/classes/new')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all text-left"
                    >
                      <span className="text-xl">➕</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Crear nueva clase
                      </span>
                    </button>

                    <button
                      onClick={() => router.push('/mini-lessons')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all text-left"
                    >
                      <span className="text-xl">📖</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Ver mini-lecciones
                      </span>
                    </button>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </TeacherLayout>
  );
}
