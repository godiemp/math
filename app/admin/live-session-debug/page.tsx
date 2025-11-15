'use client';

import { useState, useCallback } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/AdminLayout';
import type { LiveSession, Question, SessionParticipant } from '@/lib/types';
import { getCurrentUser } from '@/lib/auth';

// Mock data for testing
const createMockQuestion = (index: number): Question => ({
  id: `mock-q-${index}`,
  topic: `Pregunta ${index + 1} de Prueba`,
  level: 'M1',
  question: `Esta es la pregunta ${index + 1}. Resuelve: ${index + 2} + ${index + 3} = ?`,
  options: [
    `${index + 4}`,
    `${index + 5}`,
    `${(index + 2) + (index + 3)}`,
    `${index + 7}`,
  ],
  correctAnswer: 2,
  explanation: `La respuesta correcta es ${(index + 2) + (index + 3)} porque ${index + 2} + ${index + 3} = ${(index + 2) + (index + 3)}.`,
  difficulty: 'easy',
  subject: 'álgebra',
  skills: ['arithmetic'],
});

const createMockParticipants = (questionCount: number): SessionParticipant[] => {
  const user = getCurrentUser();
  const now = Date.now();

  return [
    {
      userId: user?.id || 'admin',
      username: user?.username || 'admin',
      displayName: user?.displayName || 'Admin User',
      answers: new Array(questionCount).fill(null),
      score: 0,
      joinedAt: now - 60000,
    },
    {
      userId: 'user-2',
      username: 'maria_g',
      displayName: 'María García',
      answers: new Array(questionCount).fill(null),
      score: 0,
      joinedAt: now - 50000,
    },
    {
      userId: 'user-3',
      username: 'pedro_s',
      displayName: 'Pedro Soto',
      answers: new Array(questionCount).fill(null),
      score: 0,
      joinedAt: now - 40000,
    },
    {
      userId: 'user-4',
      username: 'ana_m',
      displayName: 'Ana Martínez',
      answers: new Array(questionCount).fill(null),
      score: 0,
      joinedAt: now - 30000,
    },
  ];
};

const createMockSession = (status: string, questionCount: number = 5): LiveSession => {
  const now = Date.now();
  const user = getCurrentUser();

  return {
    id: 'mock-session-debug',
    name: 'Ensayo de Prueba (Debug)',
    description: 'Sesión de prueba para debugging del estado',
    level: 'M1',
    hostId: user?.id || 'admin',
    hostName: user?.displayName || 'Admin',
    questions: Array.from({ length: questionCount }, (_, i) => createMockQuestion(i)),
    registeredUsers: [],
    participants: createMockParticipants(questionCount),
    status: status as LiveSession['status'],
    currentQuestionIndex: 0,
    createdAt: now - 3600000,
    scheduledStartTime: now + 600000,
    scheduledEndTime: now + 4200000,
    durationMinutes: 60,
    lobbyOpenTime: now - 600000,
    startedAt: status === 'active' || status === 'completed' ? now - 1800000 : undefined,
    completedAt: status === 'completed' ? now - 60000 : undefined,
    maxParticipants: 50,
  };
};

type EssayState = 'idle' | 'loading' | 'scheduled' | 'lobby' | 'active' | 'completed';

const stateFlow: EssayState[] = ['idle', 'loading', 'scheduled', 'lobby', 'active', 'completed'];

const stateInfo: Record<EssayState, { label: string; icon: string; description: string }> = {
  idle: { label: 'Inicial', icon: '🎯', description: 'Presiona "Run Essay" para comenzar' },
  loading: { label: 'Cargando', icon: '⏳', description: 'Cargando datos de la sesión...' },
  scheduled: { label: 'Programado', icon: '📅', description: 'Sesión programada, esperando lobby' },
  lobby: { label: 'Lobby', icon: '🚪', description: 'Lobby abierto, usuarios entrando' },
  active: { label: 'Activo', icon: '🎮', description: 'Ensayo en progreso, usuarios respondiendo' },
  completed: { label: 'Completado', icon: '🏆', description: 'Ensayo finalizado, resultados disponibles' },
};

function LiveSessionDebugContent() {
  const [currentState, setCurrentState] = useState<EssayState>('idle');
  const [session, setSession] = useState<LiveSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stateHistory, setStateHistory] = useState<{ state: EssayState; timestamp: number }[]>([]);

  const logStateChange = useCallback((state: EssayState) => {
    setStateHistory(prev => [
      { state, timestamp: Date.now() },
      ...prev.slice(0, 9),
    ]);
  }, []);

  // Simulate user answers as the essay progresses
  const simulateAnswers = useCallback((participants: SessionParticipant[], questionIndex: number) => {
    return participants.map((p, pIdx) => {
      const newAnswers = [...p.answers];
      // Simulate that some users have answered up to the current question
      for (let i = 0; i <= questionIndex; i++) {
        if (newAnswers[i] === null && Math.random() > 0.3) {
          // Random answer for simulation
          newAnswers[i] = Math.floor(Math.random() * 4);
        }
      }
      // Calculate score based on correct answers (option 2 is always correct in mock)
      const score = newAnswers.filter((ans, idx) => ans === 2 && idx <= questionIndex).length;
      return { ...p, answers: newAnswers, score };
    });
  }, []);

  const handleNextState = () => {
    const currentIndex = stateFlow.indexOf(currentState);
    if (currentIndex < stateFlow.length - 1) {
      const nextState = stateFlow[currentIndex + 1];
      setCurrentState(nextState);
      logStateChange(nextState);

      // Create or update session based on state
      if (nextState === 'loading') {
        setSession(null);
        setCurrentQuestionIndex(0);
      } else if (nextState === 'scheduled') {
        setSession(createMockSession('scheduled'));
      } else if (nextState === 'lobby') {
        setSession(createMockSession('lobby'));
      } else if (nextState === 'active') {
        setSession(createMockSession('active'));
        setCurrentQuestionIndex(0);
      } else if (nextState === 'completed') {
        if (session) {
          const updatedParticipants = simulateAnswers(session.participants, session.questions.length - 1);
          setSession({ ...session, status: 'completed', participants: updatedParticipants });
        }
      }
    }
  };

  const handleNextQuestion = () => {
    if (session && currentQuestionIndex < session.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Simulate more answers as we progress
      const updatedParticipants = simulateAnswers(session.participants, nextIndex);
      setSession({ ...session, participants: updatedParticipants });
    }
  };

  const handleReset = () => {
    setCurrentState('idle');
    setSession(null);
    setCurrentQuestionIndex(0);
    setStateHistory([]);
  };

  const getAnswerStats = () => {
    if (!session) return null;

    const stats = session.participants.map(p => ({
      name: p.displayName,
      answered: p.answers.filter(a => a !== null).length,
      total: session.questions.length,
      currentAnswer: p.answers[currentQuestionIndex],
      score: p.score,
    }));

    return stats;
  };

  const getCurrentQuestionAnswers = () => {
    if (!session) return [];

    return session.participants.map(p => ({
      name: p.displayName,
      answer: p.answers[currentQuestionIndex],
      answerLabel: p.answers[currentQuestionIndex] !== null
        ? String.fromCharCode(65 + p.answers[currentQuestionIndex]!)
        : '-',
      isCorrect: p.answers[currentQuestionIndex] === 2,
    }));
  };

  const isLastState = currentState === 'completed';

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <Heading level={1} size="md" className="mb-2">
            Live Session Debug
          </Heading>
          <Text variant="secondary">
            Simula el flujo de un ensayo paso a paso
          </Text>
        </div>

        {/* State Progress */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Text size="sm" variant="secondary" className="mb-1">Estado Actual</Text>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{stateInfo[currentState].icon}</span>
                <div>
                  <Heading level={2} size="sm">{stateInfo[currentState].label}</Heading>
                  <Text size="sm" variant="secondary">{stateInfo[currentState].description}</Text>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleNextState}
                disabled={isLastState}
              >
                {currentState === 'idle' ? 'Run Essay' : 'Next State'}
              </Button>
              {currentState !== 'idle' && (
                <Button variant="secondary" size="lg" onClick={handleReset}>
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* State Flow Indicator */}
          <div className="flex items-center gap-2">
            {stateFlow.map((state, idx) => (
              <div key={state} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stateFlow.indexOf(currentState) >= idx
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {idx + 1}
                </div>
                {idx < stateFlow.length - 1 && (
                  <div
                    className={`w-12 h-1 ${
                      stateFlow.indexOf(currentState) > idx ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Active State: Question Navigation */}
        {currentState === 'active' && session && (
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <Heading level={3} size="xs">
                Pregunta {currentQuestionIndex + 1} de {session.questions.length}
              </Heading>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex >= session.questions.length - 1}
              >
                Next Question
              </Button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <Text size="sm" weight="medium">{session.questions[currentQuestionIndex].question}</Text>
            </div>

            {/* Answer Options */}
            <div className="space-y-2">
              {session.questions[currentQuestionIndex].options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    idx === 2 ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{String.fromCharCode(65 + idx)})</span>
                      <span>{option}</span>
                    </div>
                    {idx === 2 && (
                      <Badge variant="success" size="sm">Correcta</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* State-Specific Data */}
        {currentState !== 'idle' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User Answers */}
            {(currentState === 'active' || currentState === 'completed') && session && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Respuestas de Usuarios
                </Heading>
                <div className="space-y-3">
                  {getAnswerStats()?.map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div>
                        <Text size="sm" weight="medium">{stat.name}</Text>
                        <Text size="xs" variant="secondary">
                          {stat.answered}/{stat.total} respondidas
                        </Text>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: stat.total }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < stat.answered ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <Text size="xs" variant="secondary" className="mt-1">
                          Score: {stat.score}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Current Question Answers */}
            {currentState === 'active' && session && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Pregunta Actual: Respuestas
                </Heading>
                <div className="space-y-2">
                  {getCurrentQuestionAnswers().map((answer, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                    >
                      <Text size="sm">{answer.name}</Text>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={answer.answer !== null ? (answer.isCorrect ? 'success' : 'danger') : 'info'}
                          size="sm"
                        >
                          {answer.answerLabel}
                        </Badge>
                        {answer.answer !== null && (
                          <span className="text-sm">
                            {answer.isCorrect ? '✓' : '✗'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Lobby Participants */}
            {currentState === 'lobby' && session && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Usuarios en Lobby
                </Heading>
                <div className="space-y-2">
                  {session.participants.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <Text size="sm">{p.displayName}</Text>
                      <Text size="xs" variant="secondary">@{p.username}</Text>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Final Results */}
            {currentState === 'completed' && session && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Resultados Finales
                </Heading>
                <div className="space-y-2">
                  {[...session.participants]
                    .sort((a, b) => b.score - a.score)
                    .map((p, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded ${
                          idx === 0 ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200' : 'bg-gray-50 dark:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">
                            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                          </span>
                          <Text size="sm" weight="medium">{p.displayName}</Text>
                        </div>
                        <Badge variant={idx === 0 ? 'success' : 'info'} size="sm">
                          {p.score}/{session.questions.length}
                        </Badge>
                      </div>
                    ))}
                </div>
              </Card>
            )}

            {/* Session Info */}
            {session && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Info Sesión
                </Heading>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <Text variant="secondary">Nombre:</Text>
                    <Text weight="medium">{session.name}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="secondary">Estado:</Text>
                    <Badge variant="info" size="sm">{session.status}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="secondary">Preguntas:</Text>
                    <Text weight="medium">{session.questions.length}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="secondary">Participantes:</Text>
                    <Text weight="medium">{session.participants.length}</Text>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* State History */}
        {stateHistory.length > 0 && (
          <Card padding="lg">
            <Heading level={3} size="xs" className="mb-4">
              Historial de Estados
            </Heading>
            <div className="flex flex-wrap gap-2">
              {stateHistory.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  <span>{stateInfo[entry.state].icon}</span>
                  <Text size="xs">{stateInfo[entry.state].label}</Text>
                  <Text size="xs" variant="secondary">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

export default function LiveSessionDebugPage() {
  return (
    <ProtectedRoute requireAdmin>
      <LiveSessionDebugContent />
    </ProtectedRoute>
  );
}
