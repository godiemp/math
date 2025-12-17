'use client';

import { useRouter } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text } from '@/components/ui';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/types/teacher';

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

  // Compute totals from mock data
  const totalStudents = MOCK_CLASSES.reduce((sum, c) => sum + c.studentCount, 0);
  const totalClasses = MOCK_CLASSES.length;
  const avgAccuracy =
    MOCK_CLASSES.reduce((sum, c) => sum + (c.avgAccuracy || 0), 0) / totalClasses;

  // Get recent activity (students who were active recently)
  const recentActivity = MOCK_STUDENTS
    .filter((s) => s.lastActive)
    .sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0))
    .slice(0, 5);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <Heading level={1} size="lg" className="text-white mb-2">
            Bienvenido, Profesor
          </Heading>
          <Text className="text-emerald-100">
            Aquí puedes ver el progreso de tus estudiantes y gestionar tus clases.
          </Text>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  {Math.round(avgAccuracy * 100)}%
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
                  Activos Hoy
                </Text>
                <Heading level={2} size="xl" className="text-orange-600 dark:text-orange-400">
                  {recentActivity.length}
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
          <div className="lg:col-span-2">
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

              <div className="space-y-3">
                {MOCK_CLASSES.map((cls) => (
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
                          {cls.studentCount} estudiantes • {cls.schoolName}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          {Math.round((cls.avgAccuracy || 0) * 100)}%
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
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card padding="lg">
              <Heading level={3} size="sm" className="mb-4">
                Actividad Reciente
              </Heading>

              <div className="space-y-3">
                {recentActivity.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium">
                      {student.displayName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {student.displayName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {student.questionsAnswered} preguntas •{' '}
                        {Math.round(student.accuracy * 100)}% precisión
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {formatTimeAgo(student.lastActive || Date.now())}
                    </div>
                  </div>
                ))}
              </div>

              {recentActivity.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">😴</span>
                  </div>
                  <Text variant="secondary" size="sm">
                    No hay actividad reciente
                  </Text>
                </div>
              )}
            </Card>

            {/* Quick Actions */}
            <Card padding="lg" className="mt-4">
              <Heading level={3} size="sm" className="mb-4">
                Acciones Rápidas
              </Heading>

              <div className="space-y-2">
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
      </div>
    </TeacherLayout>
  );
}
