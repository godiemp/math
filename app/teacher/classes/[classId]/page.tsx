'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Button, Badge } from '@/components/ui';
import {
  MOCK_CLASSES,
  MOCK_STUDENTS,
  MOCK_CLASS_ANALYTICS,
  MOCK_AI_RECOMMENDATIONS,
} from '@/lib/types/teacher';
import { Copy, Check, ArrowLeft, Users, TrendingUp, BookOpen, AlertTriangle, Sparkles, Lightbulb, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

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
  const [activeTab, setActiveTab] = useState<'roster' | 'analytics' | 'ai'>('ai');
  const [assigningId, setAssigningId] = useState<string | null>(null);

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
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === 'ai'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            IA Recomendaciones
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'roster' && (
          <>
            {/* Mobile Sort Controls */}
            <div className="flex items-center gap-2 md:hidden mb-4 overflow-x-auto pb-2">
              <Text size="xs" variant="secondary" className="flex-shrink-0">Ordenar:</Text>
              {(['accuracy', 'questions', 'lastActive'] as const).map((field) => (
                <button
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    sortField === field
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {field === 'accuracy' && 'Precisión'}
                  {field === 'questions' && 'Preguntas'}
                  {field === 'lastActive' && 'Actividad'}
                  {sortField === field && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                </button>
              ))}
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {sortedStudents.map((student) => (
                <Card
                  key={student.id}
                  padding="md"
                  className="hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium text-lg">
                      {student.displayName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {student.displayName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {student.lastActive ? formatTimeAgo(student.lastActive) : 'Nunca activo'}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-bold ${getAccuracyBg(
                        student.accuracy
                      )} ${getAccuracyColor(student.accuracy)}`}
                    >
                      {Math.round(student.accuracy * 100)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="font-bold text-gray-900 dark:text-white">{student.questionsAnswered}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">preguntas</div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="font-bold text-gray-900 dark:text-white">{student.lessonsCompleted}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">lecciones</div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="font-bold text-orange-600 dark:text-orange-400">
                        {student.currentStreak > 0 ? `🔥 ${student.currentStreak}` : '-'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">racha</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop Table View */}
            <Card padding="sm" className="overflow-hidden hidden md:block">
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
                        className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors"
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
          </>
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

          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            {/* AI Header */}
            <Card padding="lg" className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                  <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <Heading level={2} size="md" className="mb-1">
                    Recomendaciones Personalizadas
                  </Heading>
                  <Text variant="secondary">
                    Análisis generado por IA basado en el desempeño reciente de cada estudiante.
                    Las recomendaciones se actualizan automáticamente según su progreso.
                  </Text>
                </div>
              </div>
            </Card>

            {/* Student Recommendation Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {MOCK_AI_RECOMMENDATIONS.map((rec) => {
                const student = students.find(s => s.id === rec.studentId);
                if (!student) return null;

                const priorityStyles = {
                  high: 'border-l-4 border-l-red-500',
                  medium: 'border-l-4 border-l-yellow-500',
                  low: 'border-l-4 border-l-green-500',
                };

                const priorityLabels = {
                  high: { text: 'Prioridad Alta', bg: 'bg-red-100 dark:bg-red-900/30', color: 'text-red-700 dark:text-red-400' },
                  medium: { text: 'Prioridad Media', bg: 'bg-yellow-100 dark:bg-yellow-900/30', color: 'text-yellow-700 dark:text-yellow-400' },
                  low: { text: 'En buen camino', bg: 'bg-green-100 dark:bg-green-900/30', color: 'text-green-700 dark:text-green-400' },
                };

                const handleAssign = async (studentId: string) => {
                  setAssigningId(studentId);
                  // Simulate API call
                  await new Promise(resolve => setTimeout(resolve, 800));
                  toast.success('Recomendación asignada', {
                    description: `Se ha asignado el contenido sugerido a ${student.displayName}`,
                  });
                  setAssigningId(null);
                };

                return (
                  <Card
                    key={rec.studentId}
                    padding="lg"
                    className={`${priorityStyles[rec.priority]} hover:shadow-lg transition-shadow`}
                  >
                    {/* Student Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium text-lg">
                          {student.displayName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {student.displayName}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${getAccuracyColor(student.accuracy)}`}>
                              {Math.round(student.accuracy * 100)}% precisión
                            </span>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {student.questionsAnswered} preguntas
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityLabels[rec.priority].bg} ${priorityLabels[rec.priority].color}`}>
                        {priorityLabels[rec.priority].text}
                      </span>
                    </div>

                    {/* AI Analysis */}
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <Text size="sm" className="font-medium text-purple-900 dark:text-purple-100">
                          Análisis
                        </Text>
                      </div>
                      <Text size="sm" variant="secondary">
                        {rec.analysis}
                      </Text>
                    </div>

                    {/* Recommendation */}
                    <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <Text size="sm" className="font-medium text-emerald-900 dark:text-emerald-100">
                          Recomendación
                        </Text>
                      </div>
                      <Text size="sm" variant="secondary">
                        {rec.recommendation}
                      </Text>
                    </div>

                    {/* Suggested Content & Action */}
                    {rec.suggestedContent && (
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <div>
                            <Text size="sm" className="font-medium">
                              {rec.suggestedContent.title}
                            </Text>
                            <Text size="xs" variant="secondary">
                              {rec.suggestedContent.type === 'mini-lesson' ? 'Mini-lección' : 'Práctica'}
                            </Text>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAssign(rec.studentId)}
                          disabled={assigningId === rec.studentId}
                          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                        >
                          {assigningId === rec.studentId ? 'Asignando...' : 'Asignar'}
                        </Button>
                      </div>
                    )}

                    {!rec.suggestedContent && (
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <Text size="sm" variant="secondary" className="italic">
                          Sin contenido específico sugerido - continuar monitoreando progreso.
                        </Text>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
