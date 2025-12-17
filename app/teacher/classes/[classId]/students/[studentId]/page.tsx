'use client';

import { useRouter, useParams } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Badge } from '@/components/ui';
import { MOCK_STUDENTS, MOCK_CLASSES } from '@/lib/types/teacher';
import { ArrowLeft, TrendingUp, BookOpen, Target, Calendar, Award } from 'lucide-react';

// Mock lesson progress data
const MOCK_LESSON_PROGRESS = [
  {
    id: 'm1-num-001-a',
    title: 'Números Enteros: Introducción',
    completedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    score: 100,
  },
  {
    id: 'm1-num-001-b',
    title: 'Suma y Resta de Enteros',
    completedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    score: 75,
  },
  {
    id: 'm1-num-002-a',
    title: 'Fracciones: Conceptos Básicos',
    completedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    score: 100,
  },
  {
    id: 'm1-alg-001-a',
    title: 'Expresiones Algebraicas',
    completedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    score: 50,
  },
  {
    id: 'm1-alg-001-b',
    title: 'Reducción de Términos Semejantes',
    completedAt: null,
    currentStep: 3,
    totalSteps: 6,
  },
];

// Mock recent attempts
const MOCK_RECENT_ATTEMPTS = [
  { questionId: 'q1', topic: 'Fracciones', isCorrect: true, timestamp: Date.now() - 2 * 60 * 60 * 1000 },
  { questionId: 'q2', topic: 'Fracciones', isCorrect: true, timestamp: Date.now() - 2 * 60 * 60 * 1000 },
  { questionId: 'q3', topic: 'Álgebra', isCorrect: false, timestamp: Date.now() - 2 * 60 * 60 * 1000 },
  { questionId: 'q4', topic: 'Álgebra', isCorrect: true, timestamp: Date.now() - 2 * 60 * 60 * 1000 },
  { questionId: 'q5', topic: 'Geometría', isCorrect: true, timestamp: Date.now() - 3 * 60 * 60 * 1000 },
  { questionId: 'q6', topic: 'Números', isCorrect: true, timestamp: Date.now() - 3 * 60 * 60 * 1000 },
  { questionId: 'q7', topic: 'Números', isCorrect: false, timestamp: Date.now() - 3 * 60 * 60 * 1000 },
  { questionId: 'q8', topic: 'Probabilidad', isCorrect: true, timestamp: Date.now() - 4 * 60 * 60 * 1000 },
];

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

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600 dark:text-green-400';
  if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

function getScoreBadgeVariant(score: number): 'success' | 'warning' | 'danger' {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'danger';
}

export default function StudentProgressPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId as string;
  const studentId = params.studentId as string;

  // Find the student and class (in real app, this would be fetched)
  const student = MOCK_STUDENTS.find((s) => s.id === studentId) || MOCK_STUDENTS[0];
  const classData = MOCK_CLASSES.find((c) => c.id === classId) || MOCK_CLASSES[0];

  const completedLessons = MOCK_LESSON_PROGRESS.filter((l) => l.completedAt);
  const inProgressLessons = MOCK_LESSON_PROGRESS.filter((l) => !l.completedAt);

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
                  {classData.name} • {student.email}
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

        {/* Subject Breakdown */}
        <Card padding="lg">
          <Heading level={3} size="sm" className="mb-4">
            Precisión por Materia
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(student.subjectAccuracy).map(([subject, accuracy]) => (
              <div
                key={subject}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center"
              >
                <Text className="text-2xl font-bold mb-1" style={{
                  color: accuracy >= 0.8 ? '#22c55e' : accuracy >= 0.6 ? '#eab308' : '#ef4444'
                }}>
                  {Math.round(accuracy * 100)}%
                </Text>
                <Text size="sm" variant="secondary" className="capitalize">
                  {subject}
                </Text>
                {/* Mini progress bar */}
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${accuracy * 100}%`,
                      backgroundColor: accuracy >= 0.8 ? '#22c55e' : accuracy >= 0.6 ? '#eab308' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lesson Progress */}
          <Card padding="lg">
            <Heading level={3} size="sm" className="mb-4">
              Progreso en Mini-Lecciones
            </Heading>

            {/* In Progress */}
            {inProgressLessons.length > 0 && (
              <div className="mb-4">
                <Text size="sm" variant="secondary" className="mb-2">
                  En Progreso
                </Text>
                {inProgressLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Text className="font-medium">{lesson.title}</Text>
                      <Badge variant="info">
                        Paso {lesson.currentStep}/{lesson.totalSteps}
                      </Badge>
                    </div>
                    <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${((lesson.currentStep || 0) / (lesson.totalSteps || 6)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed */}
            <Text size="sm" variant="secondary" className="mb-2">
              Completadas ({completedLessons.length})
            </Text>
            <div className="space-y-2">
              {completedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <div>
                      <Text size="sm" className="font-medium">
                        {lesson.title}
                      </Text>
                      <Text size="xs" variant="secondary">
                        {lesson.completedAt ? formatDate(lesson.completedAt) : ''}
                      </Text>
                    </div>
                  </div>
                  <Badge variant={getScoreBadgeVariant(lesson.score || 0)}>
                    {lesson.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card padding="lg">
            <Heading level={3} size="sm" className="mb-4">
              Actividad Reciente
            </Heading>

            <div className="space-y-2">
              {MOCK_RECENT_ATTEMPTS.map((attempt, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      attempt.isCorrect
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {attempt.isCorrect ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <Text size="sm">{attempt.topic}</Text>
                  </div>
                  <Text size="xs" variant="secondary">
                    {formatTimeAgo(attempt.timestamp)}
                  </Text>
                </div>
              ))}
            </div>

            {/* Recent accuracy summary */}
            <div className="mt-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <Text size="sm" className="font-medium text-emerald-900 dark:text-emerald-100">
                Últimas 8 preguntas:{' '}
                {MOCK_RECENT_ATTEMPTS.filter((a) => a.isCorrect).length}/8 correctas
                ({Math.round((MOCK_RECENT_ATTEMPTS.filter((a) => a.isCorrect).length / 8) * 100)}%)
              </Text>
            </div>
          </Card>
        </div>

        {/* Activity Timeline (simplified) */}
        <Card padding="lg">
          <Heading level={3} size="sm" className="mb-4">
            Información de Cuenta
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <Text variant="secondary" size="xs">Se unió a la clase</Text>
              <Text className="font-medium">{formatDate(student.joinedAt)}</Text>
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
                {student.status === 'active' ? 'Activo' : student.status}
              </Badge>
            </div>
            <div>
              <Text variant="secondary" size="xs">Promedio preguntas/día</Text>
              <Text className="font-medium">
                {Math.round(student.questionsAnswered / 25)} {/* Approximate days */}
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}
