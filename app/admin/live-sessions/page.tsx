'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  createScheduledSession,
  updateScheduledSession,
  deleteSession,
  cancelSession,
  regenerateSessionQuestions,
} from '@/lib/sessionApi';
import { useAvailableSessions } from '@/lib/hooks/useSessions';
import { getRandomQuestions, getOfficialPAESQuestions, getRandomQuestionsByFilter } from '@/lib/questions';
import { LiveSession, Question } from '@/lib/types';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { QuestionDisplay } from '@/components/quiz/QuestionRenderer';
import AdminLayout from '@/components/layout/AdminLayout';
import PreviewSession from '@/components/interactive/PreviewSession';

function AdminLiveSessionsContent() {
  const { user: currentUser } = useAuth();
  const { sessions, isLoading, refresh } = useAvailableSessions();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSession, setEditingSession] = useState<LiveSession | null>(null);
  const [viewingQuestionsSession, setViewingQuestionsSession] = useState<LiveSession | null>(null);
  const [previewingSession, setPreviewingSession] = useState<LiveSession | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [showRangeModal, setShowRangeModal] = useState(false);
  const [rangeStart, setRangeStart] = useState<string>('');
  const [rangeEnd, setRangeEnd] = useState<string>('');
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: 'M1' as 'M1' | 'M2',
    scheduledDate: '',
    scheduledTime: '',
    durationMinutes: 60,
    questionCount: 10,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      level: 'M1',
      scheduledDate: '',
      scheduledTime: '',
      durationMinutes: 60,
      questionCount: 10,
    });
    setEditingSession(null);
  };

  const applyM1Template = () => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    setFormData({
      name: 'Ensayo PAES M1 - Matemática Básica',
      description: 'Ensayo oficial para nivel M1: números, álgebra básica, geometría y probabilidades. Duración oficial PAES: 2h 20min.',
      level: 'M1',
      scheduledDate: dateStr,
      scheduledTime: '15:00',
      durationMinutes: 140,
      questionCount: 60,
    });
  };

  const applyM2Template = () => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    setFormData({
      name: 'Ensayo PAES M2 - Matemática Avanzada',
      description: 'Ensayo oficial para nivel M2: cálculo, límites, derivadas e integrales. Duración oficial PAES: 2h 20min.',
      level: 'M2',
      scheduledDate: dateStr,
      scheduledTime: '16:30',
      durationMinutes: 140,
      questionCount: 50,
    });
  };

  const handleEdit = (session: LiveSession) => {
    setEditingSession(session);

    // Convert timestamp to date and time
    const scheduledDate = session.scheduledStartTime
      ? new Date(session.scheduledStartTime)
      : new Date();

    const dateStr = scheduledDate.toISOString().split('T')[0];
    const timeStr = scheduledDate.toTimeString().slice(0, 5);

    setFormData({
      name: session.name,
      description: session.description || '',
      level: session.level,
      scheduledDate: dateStr,
      scheduledTime: timeStr,
      durationMinutes: session.durationMinutes,
      questionCount: session.questions.length,
    });
    setShowCreateModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentUser) return;

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!formData.scheduledDate || !formData.scheduledTime) {
      setError('La fecha y hora son requeridas');
      return;
    }

    // Combine date and time into a timestamp
    const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
    const scheduledTimestamp = scheduledDateTime.getTime();

    // Check if the date is in the future
    if (scheduledTimestamp <= Date.now()) {
      setError('La fecha y hora deben ser en el futuro');
      return;
    }

    // Generate questions based on level and count
    let questions: Question[];
    if ((formData.level === 'M1' && formData.questionCount === 60) ||
        (formData.level === 'M2' && formData.questionCount === 50)) {
      questions = getOfficialPAESQuestions(formData.level);
    } else {
      questions = getRandomQuestions(formData.level, formData.questionCount);
    }

    if (editingSession) {
      // Update existing session
      toast.promise(
        updateScheduledSession(editingSession.id, {
          name: formData.name.trim(),
          description: formData.description.trim(),
          level: formData.level,
          scheduledStartTime: scheduledTimestamp,
          durationMinutes: formData.durationMinutes,
          questionCount: formData.questionCount,
          questions,
        }).then(async (result) => {
          if (result.success) {
            setShowCreateModal(false);
            resetForm();
            await refresh();
            return result;
          } else {
            throw new Error(result.error || 'Error al actualizar el ensayo');
          }
        }),
        {
          loading: 'Actualizando ensayo...',
          success: 'Ensayo actualizado exitosamente',
          error: (err) => err.message || 'Error al actualizar el ensayo',
        }
      );
    } else {
      // Create new session
      toast.promise(
        createScheduledSession(
          formData.name.trim(),
          formData.description.trim(),
          formData.level,
          currentUser,
          scheduledTimestamp,
          formData.durationMinutes,
          formData.questionCount,
          questions
        ).then(async (result) => {
          if (result.success) {
            setShowCreateModal(false);
            resetForm();
            await refresh();
            return result;
          } else {
            throw new Error(result.error || 'Error al crear el ensayo');
          }
        }),
        {
          loading: 'Creando ensayo...',
          success: 'Ensayo programado exitosamente',
          error: (err) => err.message || 'Error al crear el ensayo',
        }
      );
    }
  };

  const handleDelete = async (sessionId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este ensayo?')) {
      toast.promise(
        deleteSession(sessionId).then(async (result) => {
          if (result.success) {
            await refresh();
            return result;
          } else {
            throw new Error(result.error || 'Error al eliminar el ensayo');
          }
        }),
        {
          loading: 'Eliminando ensayo...',
          success: 'Ensayo eliminado exitosamente',
          error: (err) => err.message || 'Error al eliminar el ensayo',
        }
      );
    }
  };

  const handleCancel = async (sessionId: string) => {
    if (confirm('¿Estás seguro de que deseas cancelar este ensayo?')) {
      toast.promise(
        cancelSession(sessionId).then(async (result) => {
          if (result.success) {
            await refresh();
            return result;
          } else {
            throw new Error(result.error || 'Error al cancelar el ensayo');
          }
        }),
        {
          loading: 'Cancelando ensayo...',
          success: 'Ensayo cancelado exitosamente',
          error: (err) => err.message || 'Error al cancelar el ensayo',
        }
      );
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-CL', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const handleRegenerateQuestions = async () => {
    if (!viewingQuestionsSession) return;

    if (selectedIndices.length === 0) {
      toast.error('Selecciona al menos una pregunta');
      return;
    }

    try {
      const level = viewingQuestionsSession.level;

      // Generate new questions maintaining the structure of each original question
      const newQuestions: Question[] = [];
      for (const index of selectedIndices) {
        const originalQuestion = viewingQuestionsSession.questions[index];

        // Try to get a question with the same subject and difficulty
        let replacementQuestions = getRandomQuestionsByFilter(level, 1, {
          subject: originalQuestion.subject,
          difficulty: originalQuestion.difficulty,
        });

        // Fallback to same subject if no match with difficulty
        if (replacementQuestions.length === 0) {
          replacementQuestions = getRandomQuestionsByFilter(level, 1, {
            subject: originalQuestion.subject,
          });
        }

        // Fallback to any question of the same level
        if (replacementQuestions.length === 0) {
          replacementQuestions = getRandomQuestions(level, 1);
        }

        newQuestions.push(replacementQuestions[0]);
      }

      toast.promise(
        regenerateSessionQuestions(
          viewingQuestionsSession.id,
          selectedIndices,
          newQuestions
        ).then(async (result) => {
          if (result.success) {
            setViewingQuestionsSession(result.session!);
            setShowRegenerateModal(false);
            setSelectedIndices([]);
            await refresh();
            return result;
          } else {
            throw new Error(result.error || 'Error al regenerar preguntas');
          }
        }),
        {
          loading: 'Regenerando preguntas...',
          success: 'Preguntas regeneradas exitosamente',
          error: (err) => err.message || 'Error al regenerar preguntas',
        }
      );
    } catch (error: any) {
      toast.error(error.message || 'Error al regenerar preguntas');
    }
  };

  const toggleQuestionSelection = (index: number) => {
    setSelectedIndices(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index].sort((a, b) => a - b);
      }
    });
  };

  const selectAllQuestions = () => {
    if (!viewingQuestionsSession) return;
    const allIndices = Array.from({ length: viewingQuestionsSession.questions.length }, (_, i) => i);
    setSelectedIndices(allIndices);
  };

  const clearSelection = () => {
    setSelectedIndices([]);
  };

  const handleSelectRange = () => {
    if (!viewingQuestionsSession) return;

    const start = parseInt(rangeStart);
    const end = parseInt(rangeEnd);

    if (isNaN(start) || isNaN(end)) {
      toast.error('Ingresa índices válidos');
      return;
    }

    if (start < 0 || end >= viewingQuestionsSession.questions.length || start > end) {
      toast.error('Rango inválido');
      return;
    }

    const indices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    setSelectedIndices(indices);
    setShowRangeModal(false);
    setRangeStart('');
    setRangeEnd('');
  };

  const handleRegenerateSingleQuestion = async (questionIndex: number) => {
    if (!viewingQuestionsSession) return;

    const originalQuestion = viewingQuestionsSession.questions[questionIndex];
    const questionInfo = `#${questionIndex + 1} (${originalQuestion.subject}, ${originalQuestion.difficulty})`;

    if (confirm(`¿Regenerar pregunta ${questionInfo}?`)) {
      try {
        const level = viewingQuestionsSession.level;

        // Try to get a question with the same subject and difficulty
        let newQuestions = getRandomQuestionsByFilter(level, 1, {
          subject: originalQuestion.subject,
          difficulty: originalQuestion.difficulty,
        });

        // Fallback to same subject if no match with difficulty
        if (newQuestions.length === 0) {
          newQuestions = getRandomQuestionsByFilter(level, 1, {
            subject: originalQuestion.subject,
          });
        }

        // Fallback to any question of the same level
        if (newQuestions.length === 0) {
          newQuestions = getRandomQuestions(level, 1);
        }

        toast.promise(
          regenerateSessionQuestions(
            viewingQuestionsSession.id,
            [questionIndex],
            newQuestions
          ).then(async (result) => {
            if (result.success) {
              setViewingQuestionsSession(result.session!);
              await refresh();
              return result;
            } else {
              throw new Error(result.error || 'Error al regenerar pregunta');
            }
          }),
          {
            loading: 'Regenerando pregunta...',
            success: `Pregunta ${questionInfo} regenerada exitosamente`,
            error: (err) => err.message || 'Error al regenerar pregunta',
          }
        );
      } catch (error: any) {
        toast.error(error.message || 'Error al regenerar pregunta');
      }
    }
  };

  // If previewing session, show preview mode
  if (previewingSession) {
    return <PreviewSession session={previewingSession} onClose={() => setPreviewingSession(null)} />;
  }

  // If viewing questions, show full-screen questions view
  if (viewingQuestionsSession) {
    const distribution = viewingQuestionsSession.questions.reduce((acc, q) => {
      acc[q.subject] = (acc[q.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const difficultyDist = viewingQuestionsSession.questions.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Heading level={1} size="md" className="mb-2">
                Session Questions
              </Heading>
              <Text variant="secondary" className="mb-2">
                {viewingQuestionsSession.name}
              </Text>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="info" size="sm">
                  {viewingQuestionsSession.level}
                </Badge>
                <Badge variant="neutral" size="sm">
                  {viewingQuestionsSession.questions.length} questions
                </Badge>
                {viewingQuestionsSession.status === 'scheduled' && (
                  <Badge variant="success" size="sm">
                    Can regenerate
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {viewingQuestionsSession.status === 'scheduled' && (
                <Button variant="primary" onClick={() => setShowRegenerateModal(true)}>
                  🔄 Regenerar Preguntas
                </Button>
              )}
              <Button variant="ghost" onClick={() => setViewingQuestionsSession(null)}>
                ← Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Distribution Statistics */}
          <Card className="mb-6" padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              Distribución de Preguntas
            </Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <Card padding="md" className="bg-indigo-50 dark:bg-indigo-900/20">
                <Text size="xs" variant="secondary" className="mb-1">Números</Text>
                <Heading level={3} size="sm">{distribution['números'] || 0}</Heading>
              </Card>
              <Card padding="md" className="bg-pink-50 dark:bg-pink-900/20">
                <Text size="xs" variant="secondary" className="mb-1">Álgebra</Text>
                <Heading level={3} size="sm">{distribution['álgebra'] || 0}</Heading>
              </Card>
              <Card padding="md" className="bg-teal-50 dark:bg-teal-900/20">
                <Text size="xs" variant="secondary" className="mb-1">Geometría</Text>
                <Heading level={3} size="sm">{distribution['geometría'] || 0}</Heading>
              </Card>
              <Card padding="md" className="bg-orange-50 dark:bg-orange-900/20">
                <Text size="xs" variant="secondary" className="mb-1">Probabilidad</Text>
                <Heading level={3} size="sm">{distribution['probabilidad'] || 0}</Heading>
              </Card>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card padding="md" className="bg-green-50 dark:bg-green-900/20">
                <Text size="xs" variant="secondary" className="mb-1">Fácil</Text>
                <Heading level={3} size="sm">{difficultyDist['easy'] || 0}</Heading>
              </Card>
              <Card padding="md" className="bg-yellow-50 dark:bg-yellow-900/20">
                <Text size="xs" variant="secondary" className="mb-1">Media</Text>
                <Heading level={3} size="sm">{difficultyDist['medium'] || 0}</Heading>
              </Card>
              <Card padding="md" className="bg-red-50 dark:bg-red-900/20">
                <Text size="xs" variant="secondary" className="mb-1">Difícil</Text>
                <Heading level={3} size="sm">{difficultyDist['hard'] || 0}</Heading>
              </Card>
            </div>
          </Card>

          {/* Questions List */}
          <Card padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              Lista de Preguntas
            </Heading>
            <div className="space-y-3">
              {viewingQuestionsSession.questions.map((question, index) => (
                <Card key={question.id} padding="md" className="border-l-4 border-indigo-500">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2 items-center">
                      <Badge variant="neutral" size="sm">#{index + 1}</Badge>
                      <Badge variant="info" size="sm">{question.subject}</Badge>
                      <Badge
                        variant={
                          question.difficulty === 'easy' ? 'success' :
                          question.difficulty === 'medium' ? 'warning' : 'danger'
                        }
                        size="sm"
                      >
                        {question.difficulty}
                      </Badge>
                    </div>
                    <div className="flex gap-2 items-center">
                      {viewingQuestionsSession.status === 'scheduled' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRegenerateSingleQuestion(index)}
                          title="Regenerar esta pregunta"
                        >
                          🔄
                        </Button>
                      )}
                      <Text size="xs" variant="secondary" className="font-mono">
                        {question.id}
                      </Text>
                    </div>
                  </div>
                  <Text size="xs" variant="secondary" className="mb-3">
                    {question.topic}
                  </Text>

                  <QuestionDisplay
                    question={question}
                    showOptions={true}
                    showExplanation={true}
                    optionsLayout="list"
                    highlightCorrectAnswer={true}
                  />
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  // Calculate stats
  const totalSessions = sessions.length;
  const activeSessions = sessions.filter(s => s.status === 'active').length;
  const scheduledSessions = sessions.filter(s => s.status === 'scheduled').length;
  const totalRegistrations = sessions.reduce((sum, s) => sum + (s.registeredUsers?.length || 0), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <Text size="xs" variant="secondary" className="mb-1">Total Sessions</Text>
                <Heading level={2} size="lg" className="text-blue-600 dark:text-blue-400">{totalSessions}</Heading>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <Text size="xs" variant="secondary" className="mb-1">Active Now</Text>
                <Heading level={2} size="lg" className="text-green-600 dark:text-green-400">{activeSessions}</Heading>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🟢</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <Text size="xs" variant="secondary" className="mb-1">Scheduled</Text>
                <Heading level={2} size="lg" className="text-purple-600 dark:text-purple-400">{scheduledSessions}</Heading>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <Text size="xs" variant="secondary" className="mb-1">Total Registrations</Text>
                <Heading level={2} size="lg" className="text-orange-600 dark:text-orange-400">{totalRegistrations}</Heading>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={2} size="sm" className="mb-1">Live Sessions</Heading>
            <Text size="xs" variant="secondary">Manage scheduled and active practice sessions</Text>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              resetForm();
              setShowCreateModal(true);
              setError('');
              setSuccess('');
            }}
          >
            + New Session
          </Button>
        </div>

        {/* Sessions List */}
        <Card className="shadow-sm" padding="lg">

          {sessions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📅</span>
              </div>
              <Heading level={3} size="xs" className="mb-2">No sessions yet</Heading>
              <Text variant="secondary" className="mb-4">
                Get started by creating your first practice session
              </Text>
              <Button
                variant="primary"
                onClick={() => {
                  resetForm();
                  setShowCreateModal(true);
                  setError('');
                  setSuccess('');
                }}
              >
                + Create Session
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="group bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-start space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Heading level={3} size="xs">
                          {session.name}
                        </Heading>
                        <Badge
                          variant={
                            session.status === 'scheduled' ? 'info' :
                            session.status === 'lobby' ? 'warning' :
                            session.status === 'active' ? 'success' :
                            session.status === 'cancelled' ? 'danger' : 'neutral'
                          }
                          size="sm"
                        >
                          {session.status === 'scheduled' ? 'Programado' :
                           session.status === 'lobby' ? 'Lobby Abierto' :
                           session.status === 'active' ? 'En Curso' :
                           session.status === 'cancelled' ? 'Cancelado' : session.status}
                        </Badge>
                      </div>

                      {session.description && (
                        <Text size="xs" variant="secondary" className="mb-3">
                          {session.description}
                        </Text>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div>
                          <Text size="xs" variant="secondary" className="inline">Nivel: </Text>
                          <Text size="xs" className="font-medium inline">
                            {session.level}
                          </Text>
                        </div>
                        <div>
                          <Text size="xs" variant="secondary" className="inline">Preguntas: </Text>
                          <Text size="xs" className="font-medium inline">
                            {session.questions.length}
                          </Text>
                        </div>
                        <div>
                          <Text size="xs" variant="secondary" className="inline">Registrados: </Text>
                          <Text size="xs" className="font-medium inline text-[#0A84FF] dark:text-[#66B2FF]">
                            {session.registeredUsers?.length || 0}
                          </Text>
                        </div>
                        <div>
                          <Text size="xs" variant="secondary" className="inline">Fecha: </Text>
                          <Text size="xs" className="font-medium inline">
                            {session.scheduledStartTime
                              ? formatDate(session.scheduledStartTime)
                              : 'N/A'}
                          </Text>
                        </div>
                      </div>

                      {/* Registered Users List */}
                      {session.registeredUsers && session.registeredUsers.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
                          <Text size="xs" variant="secondary" className="mb-2 font-medium">
                            Usuarios Registrados ({session.registeredUsers.length}):
                          </Text>
                          <div className="flex flex-wrap gap-2">
                            {session.registeredUsers.map((user) => (
                              <Badge key={user.userId} variant="neutral" size="sm">
                                {user.displayName}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" size="sm" onClick={() => setPreviewingSession(session)}>
                        👁️ Preview
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setViewingQuestionsSession(session)}>
                        Ver Preguntas
                      </Button>
                      {session.status === 'scheduled' && (
                        <>
                          <Button variant="primary" size="sm" onClick={() => handleEdit(session)}>
                            Editar
                          </Button>
                          <Button variant="primary" size="sm" onClick={() => handleCancel(session.id)} className="bg-[#FF9F0A]">
                            Cancelar
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleDelete(session.id)}>
                            Eliminar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowCreateModal(false)} />
          <div onClick={(e) => e.stopPropagation()}>
            <Card className="max-w-2xl w-full my-8 shadow-2xl relative z-10" padding="lg">
              <Heading level={2} size="sm" className="mb-4">
                {editingSession ? 'Editar Ensayo' : 'Programar Nuevo Ensayo'}
              </Heading>

            {!editingSession && (
              <div className="mb-6">
                <Text size="xs" variant="secondary" className="mb-3">
                  Plantillas rápidas:
                </Text>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={applyM1Template}
                    className="flex-1 px-4 py-3 bg-[#0A84FF]/[0.06] dark:bg-[#0A84FF]/[0.12] border-2 border-[#0A84FF]/30 dark:border-[#0A84FF]/50 rounded-xl hover:bg-[#0A84FF]/[0.12] dark:hover:bg-[#0A84FF]/[0.18] transition-all duration-[180ms] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                  >
                    <div className="font-semibold text-[#0A84FF] dark:text-[#66B2FF] mb-1">
                      📐 M1 - Básico
                    </div>
                    <div className="text-xs text-[#0A84FF]/80 dark:text-[#66B2FF]/80">
                      140 min (2h 20min) • 60 preguntas
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={applyM2Template}
                    className="flex-1 px-4 py-3 bg-[#5E5CE6]/[0.06] dark:bg-[#5E5CE6]/[0.12] border-2 border-[#5E5CE6]/30 dark:border-[#5E5CE6]/50 rounded-xl hover:bg-[#5E5CE6]/[0.12] dark:hover:bg-[#5E5CE6]/[0.18] transition-all duration-[180ms] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                  >
                    <div className="font-semibold text-[#5E5CE6] dark:text-[#9F9DFF] mb-1">
                      🎓 M2 - Avanzado
                    </div>
                    <div className="text-xs text-[#5E5CE6]/80 dark:text-[#9F9DFF]/80">
                      140 min (2h 20min) • 50 preguntas
                    </div>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre del Ensayo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Ensayo PAES M1 - Matemática Básica"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descripción opcional del ensayo"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nivel *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value as 'M1' | 'M2' })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cantidad de Preguntas *
                  </label>
                  <input
                    type="number"
                    value={formData.questionCount}
                    onChange={(e) =>
                      setFormData({ ...formData, questionCount: Number(e.target.value) })
                    }
                    min="5"
                    max="65"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PAES oficial: M1=60, M2=50 preguntas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduledDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduledTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duración (minutos) *
                  </label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) =>
                      setFormData({ ...formData, durationMinutes: Number(e.target.value) })
                    }
                    min="15"
                    max="240"
                    step="1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Entre 15 y 240 minutos (4 horas)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                    setError('');
                  }}
                  fullWidth
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                >
                  {editingSession ? 'Actualizar' : 'Programar Ensayo'}
                </Button>
              </div>
            </form>
            </Card>
          </div>
        </div>
      )}

      {/* Regenerate Questions Modal */}
      {showRegenerateModal && viewingQuestionsSession && (() => {
        const session: LiveSession = viewingQuestionsSession;
        return (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => { setShowRegenerateModal(false); setSelectedIndices([]); }} />
            <div onClick={(e) => e.stopPropagation()}>
              <Card className="max-w-4xl w-full my-8 shadow-2xl relative z-10" padding="lg">
                <Heading level={2} size="sm" className="mb-4">
                  Regenerar Preguntas
                </Heading>

                <div className="space-y-4">
                  {/* Helper Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="secondary" size="sm" onClick={selectAllQuestions}>
                      Seleccionar Todo ({session.questions.length})
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setShowRangeModal(true)}>
                      Seleccionar Rango...
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clearSelection}>
                      Limpiar ({selectedIndices.length})
                    </Button>
                  </div>

                  {/* Question Grid */}
                  <div>
                    <Text size="sm" className="mb-2 font-medium">
                      Preguntas seleccionadas: {selectedIndices.length} / {session.questions.length}
                    </Text>
                    <div className="max-h-80 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                      <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
                        {session.questions.map((q: any, index: number) => (
                          <label
                            key={index}
                            className={`flex items-center justify-center p-2 border rounded cursor-pointer transition-colors ${
                              selectedIndices.includes(index)
                                ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-500'
                                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            title={`Pregunta ${index + 1}`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedIndices.includes(index)}
                              onChange={() => toggleQuestionSelection(index)}
                              className="sr-only"
                            />
                            <Text size="xs" className="font-mono">{index + 1}</Text>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowRegenerateModal(false);
                        setSelectedIndices([]);
                      }}
                      fullWidth
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleRegenerateQuestions}
                      fullWidth
                      disabled={selectedIndices.length === 0}
                    >
                      Regenerar {selectedIndices.length > 0 && `(${selectedIndices.length})`}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      })()}

      {/* Range Selection Modal */}
      {showRangeModal && viewingQuestionsSession && (() => {
        const session: LiveSession = viewingQuestionsSession;
        return (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[60] bg-black/50 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setShowRangeModal(false)} />
            <div onClick={(e) => e.stopPropagation()}>
              <Card className="max-w-md w-full shadow-2xl relative z-10" padding="lg">
                <Heading level={3} size="sm" className="mb-4">
                  Seleccionar Rango
                </Heading>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Desde (0-{session.questions.length - 1})
                    </label>
                    <input
                      type="number"
                      value={rangeStart}
                      onChange={(e) => setRangeStart(e.target.value)}
                      min="0"
                      max={session.questions.length - 1}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Hasta (0-{session.questions.length - 1})
                    </label>
                    <input
                      type="number"
                      value={rangeEnd}
                      onChange={(e) => setRangeEnd(e.target.value)}
                      min="0"
                      max={session.questions.length - 1}
                      placeholder={(session.questions.length - 1).toString()}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost" onClick={() => setShowRangeModal(false)} fullWidth>
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSelectRange} fullWidth>
                      Seleccionar
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      })()}
    </AdminLayout>
  );
}

export default function AdminLiveSessions() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLiveSessionsContent />
    </ProtectedRoute>
  );
}
