'use client';

import { useRouter, useParams } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Badge, Spinner, Button } from '@/components/ui';
import { useClass, useClassStudents, type ClassStudent } from '@/lib/hooks/useClasses';
import { ArrowLeft, TrendingUp, BookOpen, Target, Award } from 'lucide-react';

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

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

export default function StudentProgressPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId as string;
  const studentId = params.studentId as string;

  const { classData, isLoading: classLoading } = useClass(classId);
  const { students, isLoading: studentsLoading } = useClassStudents(classId);

  const isLoading = classLoading || studentsLoading;
  const student = students.find((s: ClassStudent) => s.id === studentId);

  // Loading state
  if (isLoading) {
    return (
      <TeacherLayout>
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </TeacherLayout>
    );
  }

  // Student not found
  if (!student || !classData) {
    return (
      <TeacherLayout>
        <Card padding="lg" className="text-center py-12">
          <Text className="text-red-600 dark:text-red-400">
            Estudiante no encontrado
          </Text>
          <Button
            onClick={() => router.push(`/teacher/classes/${classId}`)}
            className="mt-4"
          >
            Volver a la clase
          </Button>
        </Card>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Back Button & Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/teacher/classes/${classId}`)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg font-medium">
                {student.displayName.charAt(0)}
              </div>
              <div>
                <Heading level={1} size="lg">
                  {student.displayName}
                </Heading>
                <Text variant="secondary">
                  {classData.name} &bull; {student.email}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card padding="md" className="text-center">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg w-fit mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(student.accuracy * 100)}%
            </Text>
            <Text size="xs" variant="secondary">Precisión</Text>
          </Card>

          <Card padding="md" className="text-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mx-auto mb-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {student.questionsAnswered}
            </Text>
            <Text size="xs" variant="secondary">Preguntas</Text>
          </Card>

          <Card padding="md" className="text-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mx-auto mb-2">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {student.lessonsCompleted}
            </Text>
            <Text size="xs" variant="secondary">Lecciones</Text>
          </Card>

          <Card padding="md" className="text-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg w-fit mx-auto mb-2">
              <span className="text-orange-600 dark:text-orange-400">🔥</span>
            </div>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {student.currentStreak}
            </Text>
            <Text size="xs" variant="secondary">Racha Actual</Text>
          </Card>

          <Card padding="md" className="text-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg w-fit mx-auto mb-2">
              <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {student.longestStreak}
            </Text>
            <Text size="xs" variant="secondary">Mejor Racha</Text>
          </Card>
        </div>

        {/* Accuracy Progress Bar */}
        <Card padding="lg">
          <Heading level={3} size="sm" className="mb-4">
            Precisión General
          </Heading>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    student.accuracy >= 0.8
                      ? 'bg-green-500'
                      : student.accuracy >= 0.6
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${student.accuracy * 100}%` }}
                />
              </div>
            </div>
            <Text className={`text-xl font-bold ${
              student.accuracy >= 0.8
                ? 'text-green-600 dark:text-green-400'
                : student.accuracy >= 0.6
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {Math.round(student.accuracy * 100)}%
            </Text>
          </div>
          <Text size="sm" variant="secondary" className="mt-2">
            Basado en {student.questionsAnswered} preguntas respondidas
          </Text>
        </Card>

        {/* Account Information */}
        <Card padding="lg">
          <Heading level={3} size="sm" className="mb-4">
            Información de Cuenta
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <Text variant="secondary" size="xs">Se unió a la clase</Text>
              <Text className="font-medium">{formatDate(student.enrolledAt)}</Text>
            </div>
            <div>
              <Text variant="secondary" size="xs">Última actividad</Text>
              <Text className="font-medium">
                {student.lastActive ? formatTimeAgo(student.lastActive) : 'Nunca'}
              </Text>
            </div>
            <div>
              <Text variant="secondary" size="xs">Estado</Text>
              <Badge variant={student.status === 'active' ? 'success' : 'secondary'}>
                {student.status === 'active' ? 'Activo' : 'Removido'}
              </Badge>
            </div>
            <div>
              <Text variant="secondary" size="xs">Email</Text>
              <Text className="font-medium">{student.email}</Text>
            </div>
          </div>
        </Card>

        {/* Coming Soon - More detailed analytics */}
        <Card padding="lg" className="border-dashed">
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <Heading level={3} size="sm" className="mb-2">
              Analíticas Detalladas
            </Heading>
            <Text variant="secondary" size="sm">
              Próximamente: Progreso por lección, rendimiento por tema, historial de actividad y más.
            </Text>
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}
