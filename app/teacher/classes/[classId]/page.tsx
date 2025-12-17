'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Button, Badge } from '@/components/ui';
import {
  MOCK_CLASSES,
  MOCK_STUDENTS,
  MOCK_CLASS_ANALYTICS,
  ClassStudent,
} from '@/lib/types/teacher';
import { Copy, Check, ArrowLeft, Users, TrendingUp, BookOpen, AlertTriangle } from 'lucide-react';

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'hace un momento';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `hace ${days}d`;
  return `hace ${Math.floor(days / 7)} sem`;
}

function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 0.8) return 'text-green-600 dark:text-green-400';
  if (accuracy >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

function getAccuracyBg(accuracy: number): string {
  if (accuracy >= 0.8) return 'bg-green-100 dark:bg-green-900/30';
  if (accuracy >= 0.6) return 'bg-yellow-100 dark:bg-yellow-900/30';
  return 'bg-red-100 dark:bg-red-900/30';
}

type SortField = 'name' | 'accuracy' | 'questions' | 'lastActive' | 'streak';
type SortOrder = 'asc' | 'desc';

export default function ClassDetailPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId as string;

  const [copied, setCopied] = useState(false);
  const [sortField, setSortField] = useState<SortField>('accuracy');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [activeTab, setActiveTab] = useState<'roster' | 'analytics'>('roster');

  // Find the class (in real app, this would be fetched)
  const classData = MOCK_CLASSES.find((c) => c.id === classId) || MOCK_CLASSES[0];
  const students = MOCK_STUDENTS;
  const analytics = MOCK_CLASS_ANALYTICS;

  const copyInviteCode = () => {
    navigator.clipboard.writeText(classData.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'name':
        comparison = a.displayName.localeCompare(b.displayName);
        break;
      case 'accuracy':
        comparison = a.accuracy - b.accuracy;
        break;
      case 'questions':
        comparison = a.questionsAnswered - b.questionsAnswered;
        break;
      case 'lastActive':
        comparison = (a.lastActive || 0) - (b.lastActive || 0);
        break;
      case 'streak':
        comparison = a.currentStreak - b.currentStreak;
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className={`flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${
        sortField === field ? 'text-emerald-600 dark:text-emerald-400 font-medium' : ''
      }`}
    >
      {label}
      {sortField === field && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
    </button>
  );

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Back Button & Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/teacher/classes')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <Heading level={1} size="lg">
              {classData.name}
            </Heading>
            <Text variant="secondary">
              {classData.schoolName} • {classData.studentCount} estudiantes
            </Text>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <Text size="xs" variant="secondary">Estudiantes</Text>
                <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {analytics.totalStudents}
                </Text>
              </div>
            </div>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <Text size="xs" variant="secondary">Precisión Promedio</Text>
                <Text className="text-xl font-bold text-green-600 dark:text-green-400">
                  {Math.round(analytics.avgAccuracy * 100)}%
                </Text>
              </div>
            </div>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <Text size="xs" variant="secondary">Lecciones Completadas</Text>
                <Text className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {analytics.lessonsCompletedTotal}
                </Text>
              </div>
            </div>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <span className="text-orange-600 dark:text-orange-400">🔥</span>
              </div>
              <div>
                <Text size="xs" variant="secondary">Activos esta semana</Text>
                <Text className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {analytics.activeThisWeek}
                </Text>
              </div>
            </div>
          </Card>
        </div>

        {/* Invite Code Card */}
        <Card padding="md" className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Text size="sm" variant="secondary" className="mb-1">
                Código de invitación para estudiantes
              </Text>
              <div className="flex items-center gap-3">
                <code className="text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {classData.inviteCode}
                </code>
                <button
                  onClick={copyInviteCode}
                  className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                  title="Copiar código"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              </div>
            </div>
            <Text size="sm" variant="secondary" className="max-w-md">
              Comparte este código con tus estudiantes para que se unan a la clase.
              Pueden ingresar el código en su panel de estudiante.
            </Text>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'roster'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Estudiantes
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'analytics'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Analíticas
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'roster' && (
          <Card padding="sm" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <SortButton field="name" label="Estudiante" />
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <SortButton field="accuracy" label="Precisión" />
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <SortButton field="questions" label="Preguntas" />
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Lecciones
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <SortButton field="streak" label="Racha" />
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <SortButton field="lastActive" label="Última Actividad" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedStudents.map((student) => (
                    <tr
                      key={student.id}
                      onClick={() => router.push(`/teacher/classes/${classId}/students/${student.id}`)}
                      className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium">
                            {student.displayName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {student.displayName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${getAccuracyBg(
                            student.accuracy
                          )} ${getAccuracyColor(student.accuracy)}`}
                        >
                          {Math.round(student.accuracy * 100)}%
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-gray-900 dark:text-white">
                        {student.questionsAnswered}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-gray-900 dark:text-white">
                        {student.lessonsCompleted}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {student.currentStreak > 0 ? (
                          <span className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
                            🔥 {student.currentStreak}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                        {student.lastActive ? formatTimeAgo(student.lastActive) : 'Nunca'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Breakdown */}
            <Card padding="lg">
              <Heading level={3} size="sm" className="mb-4">
                Precisión por Materia
              </Heading>
              <div className="space-y-4">
                {analytics.subjectBreakdown.map((subject) => (
                  <div key={subject.subject}>
                    <div className="flex items-center justify-between mb-1">
                      <Text size="sm" className="capitalize">
                        {subject.subject}
                      </Text>
                      <Text size="sm" className={getAccuracyColor(subject.avgAccuracy)}>
                        {Math.round(subject.avgAccuracy * 100)}%
                      </Text>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          subject.avgAccuracy >= 0.8
                            ? 'bg-green-500'
                            : subject.avgAccuracy >= 0.6
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${subject.avgAccuracy * 100}%` }}
                      />
                    </div>
                    <Text size="xs" variant="secondary" className="mt-1">
                      {subject.questionsAnswered} preguntas respondidas
                    </Text>
                  </div>
                ))}
              </div>
            </Card>

            {/* Struggling Topics */}
            <Card padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <Heading level={3} size="sm">
                  Temas con Dificultad
                </Heading>
              </div>
              <div className="space-y-3">
                {analytics.strugglingTopics.map((topic, index) => (
                  <div
                    key={topic.topic}
                    className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
                  >
                    <div className="flex items-center justify-between">
                      <Text className="font-medium text-orange-900 dark:text-orange-100">
                        {topic.topic}
                      </Text>
                      <Badge variant="warning">
                        {Math.round(topic.avgAccuracy * 100)}% precisión
                      </Badge>
                    </div>
                    <Text size="xs" variant="secondary" className="mt-1">
                      {topic.studentsCount} estudiantes con dificultades
                    </Text>
                  </div>
                ))}
              </div>
              <Text size="sm" variant="secondary" className="mt-4">
                Considera revisar estos temas en clase para reforzar el aprendizaje.
              </Text>
            </Card>

            {/* Weekly Activity */}
            <Card padding="lg" className="lg:col-span-2">
              <Heading level={3} size="sm" className="mb-4">
                Actividad Semanal
              </Heading>
              <div className="flex items-end justify-between gap-2 h-32">
                {analytics.weeklyActivity.map((day) => {
                  const maxQuestions = Math.max(...analytics.weeklyActivity.map(d => d.questions));
                  const height = maxQuestions > 0 ? (day.questions / maxQuestions) * 100 : 0;
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center">
                        <Text size="xs" variant="secondary" className="mb-1">
                          {day.questions}
                        </Text>
                        <div
                          className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-all"
                          style={{ height: `${Math.max(height, 8)}%`, minHeight: '8px' }}
                        />
                      </div>
                      <Text size="xs" variant="secondary">
                        {day.day}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
