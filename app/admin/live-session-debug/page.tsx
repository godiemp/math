'use client';

import { useState, useCallback } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/AdminLayout';
import type { LiveSession, Question, SessionParticipant } from '@/lib/types';
import { getCurrentUser } from '@/lib/auth';
import { QuestionRenderer } from '@/components/QuestionRenderer';

// Mock data for testing with real LaTeX
const createMockQuestion = (index: number): Question => {
  const questions = [
    {
      topic: 'Raíces y Potencias',
      questionLatex: '\\text{Un arquitecto está diseñando un jardín cuadrado para un parque municipal. El área total del jardín es de } 49 \\text{ metros cuadrados. Sabiendo que en un cuadrado el área es el lado multiplicado por sí mismo, ¿cuántos metros mide cada lado?}',
      options: ['5', '6', '7', '8'],
      correctAnswer: 2,
      explanation: '\\text{El lado del cuadrado es } \\sqrt{49} = 7 \\text{ metros.}',
    },
    {
      topic: 'Operaciones con Fracciones',
      questionLatex: '\\text{María tiene } \\frac{3}{4} \\text{ de pizza y Juan tiene } \\frac{1}{2} \\text{ de la misma pizza. Si juntan sus porciones, ¿cuánta pizza tienen en total?}',
      options: ['\\frac{5}{6}', '\\frac{5}{4}', '\\frac{4}{6}', '\\frac{2}{3}'],
      correctAnswer: 1,
      explanation: '\\frac{3}{4} + \\frac{1}{2} = \\frac{3}{4} + \\frac{2}{4} = \\frac{5}{4}',
    },
    {
      topic: 'Ecuaciones Lineales',
      questionLatex: '\\text{Si } 2x + 5 = 13\\text{, ¿cuál es el valor de } x\\text{?}',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: '2x + 5 = 13 \\Rightarrow 2x = 8 \\Rightarrow x = 4',
    },
    {
      topic: 'Teorema de Pitágoras',
      questionLatex: '\\text{En un triángulo rectángulo, un cateto mide } 3 \\text{ cm y el otro cateto mide } 4 \\text{ cm. ¿Cuánto mide la hipotenusa?}',
      options: ['5 \\text{ cm}', '6 \\text{ cm}', '7 \\text{ cm}', '\\sqrt{25} \\text{ cm}'],
      correctAnswer: 0,
      explanation: 'c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5 \\text{ cm}',
    },
    {
      topic: 'Porcentajes',
      questionLatex: '\\text{Una tienda ofrece un descuento del } 20\\% \\text{ en un artículo que cuesta } \\$50.000\\text{. ¿Cuál es el precio final?}',
      options: ['\\$40.000', '\\$45.000', '\\$35.000', '\\$42.000'],
      correctAnswer: 0,
      explanation: '\\text{Descuento: } 50.000 \\times 0.20 = 10.000 \\text{. Precio final: } 50.000 - 10.000 = \\$40.000',
    },
  ];

  const q = questions[index % questions.length];
  return {
    id: `mock-q-${index}`,
    topic: q.topic,
    level: 'M1',
    questionLatex: q.questionLatex,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    difficulty: 'easy',
    subject: 'álgebra',
    skills: ['arithmetic'],
  };
};

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

type SessionStatus = 'scheduled' | 'lobby' | 'active' | 'completed';

// This is the actual UI component that users see - extracted for testing
function MockLiveSession({
  session,
  currentQuestionIndex,
  selectedAnswer,
  myAnswers,
  onSelectAnswer,
  onNextQuestion,
  onPreviousQuestion,
  onExit,
}: {
  session: LiveSession;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  myAnswers: (number | null)[];
  onSelectAnswer: (index: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onExit: () => void;
}) {
  const currentUser = getCurrentUser();
  const currentQuestion = session.questions[currentQuestionIndex];
  const canGoNext = currentQuestionIndex < session.questions.length - 1;
  const canGoPrevious = currentQuestionIndex > 0;

  // SCHEDULED STATE
  if (session.status === 'scheduled') {
    const startTime = new Date(session.scheduledStartTime);
    const lobbyTime = session.lobbyOpenTime ? new Date(session.lobbyOpenTime) : null;

    return (
      <div className="min-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {session.name}
              </h1>
              <button
                onClick={onExit}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Salir
              </button>
            </div>

            <div className="text-center py-12">
              <div className="text-6xl mb-6">⏰</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ensayo Programado
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                El lobby se abrirá el:
              </p>
              {lobbyTime && (
                <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-4">
                  {lobbyTime.toLocaleString('es-CL', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                El ensayo comenzará automáticamente el:
              </p>
              <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-8">
                {startTime.toLocaleString('es-CL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Nivel:</strong> {session.level}</p>
                <p><strong>Preguntas:</strong> {session.questions.length}</p>
                <p><strong>Duración:</strong> {session.durationMinutes} minutos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOBBY STATE
  if (session.status === 'lobby') {
    const startTime = new Date(session.scheduledStartTime);

    return (
      <div className="min-h-[600px] bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {session.name}
              </h1>
              <button
                onClick={onExit}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Salir del Lobby
              </button>
            </div>

            <div className="text-center py-12">
              <div className="text-6xl mb-6 animate-pulse">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Bienvenido al Lobby!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                El ensayo comenzará en aproximadamente:
              </p>
              <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-8">
                10 minutos
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-8">
                Hora de inicio:{' '}
                {startTime.toLocaleString('es-CL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Nivel:</strong> {session.level}</p>
                <p><strong>Preguntas:</strong> {session.questions.length}</p>
                <p><strong>Duración:</strong> {session.durationMinutes} minutos</p>
              </div>

              <p className="text-sm text-gray-500">
                Mantén esta página abierta. El ensayo comenzará automáticamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // COMPLETED STATE
  if (session.status === 'completed') {
    return (
      <div className="min-h-[600px] bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-6">✅</div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Ensayo Completado
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                ¡Gracias por participar en este ensayo!
              </p>

              <div className="space-y-2 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Sesión:</strong> {session.name}
                </p>
                <p>
                  <strong>Nivel:</strong> {session.level}
                </p>
                <p>
                  <strong>Total de preguntas:</strong> {session.questions.length}
                </p>
              </div>
            </div>

            <button
              onClick={onExit}
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Volver al Lobby
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE STATE
  return (
    <div className="min-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {session.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pregunta {currentQuestionIndex + 1} de {session.questions.length}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / session.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {currentQuestion.topic}
              </h3>
            </div>

            <QuestionRenderer
              question={currentQuestion}
              mode="with-options"
              selectedAnswer={selectedAnswer}
              onAnswerSelect={onSelectAnswer}
              disabled={false}
            />
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={onPreviousQuestion}
              disabled={!canGoPrevious}
              className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            <button
              onClick={onNextQuestion}
              disabled={!canGoNext}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {canGoNext ? 'Siguiente' : 'Última pregunta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveSessionDebugContent() {
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>('scheduled');
  const [session, setSession] = useState<LiveSession>(() => createMockSession('scheduled'));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [myAnswers, setMyAnswers] = useState<(number | null)[]>(() => new Array(5).fill(null));
  const [actionLog, setActionLog] = useState<string[]>([]);

  const log = useCallback((message: string) => {
    setActionLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 19)]);
  }, []);

  const handleStatusChange = (status: SessionStatus) => {
    setSessionStatus(status);
    const newSession = createMockSession(status);

    // Simulate completed scores
    if (status === 'completed') {
      newSession.participants = newSession.participants.map(p => {
        const answers = newSession.questions.map(() => Math.floor(Math.random() * 4));
        const score = answers.filter((ans, idx) => ans === newSession.questions[idx].correctAnswer).length;
        return { ...p, answers, score };
      });
    }

    setSession(newSession);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setMyAnswers(new Array(newSession.questions.length).fill(null));
    log(`Status changed to: ${status}`);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...myAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setMyAnswers(newAnswers);
    log(`Selected answer ${String.fromCharCode(65 + answerIndex)} for question ${currentQuestionIndex + 1}`);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < session.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(myAnswers[nextIndex]);
      log(`Navigated to question ${nextIndex + 1}`);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setSelectedAnswer(myAnswers[prevIndex]);
      log(`Navigated to question ${prevIndex + 1}`);
    }
  };

  const handleExit = () => {
    log('User clicked Exit');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1} size="md" className="mb-2">
            Live Session Debug - Interactive Test
          </Heading>
          <Text variant="secondary">
            Click through the UI as a real user would. Test all interactions.
          </Text>
        </div>

        {/* Controls */}
        <Card padding="lg">
          <Heading level={3} size="xs" className="mb-4">
            Set Session Status
          </Heading>
          <div className="flex flex-wrap gap-2">
            {(['scheduled', 'lobby', 'active', 'completed'] as SessionStatus[]).map((status) => (
              <Button
                key={status}
                variant={sessionStatus === status ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleStatusChange(status)}
              >
                {status === 'scheduled' && '📅 Scheduled'}
                {status === 'lobby' && '🎯 Lobby'}
                {status === 'active' && '🎮 Active'}
                {status === 'completed' && '🏆 Completed'}
              </Button>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Interactive Component */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-900 text-white px-4 py-2 text-sm font-mono">
                User View - Status: {sessionStatus}
              </div>
              <MockLiveSession
                session={session}
                currentQuestionIndex={currentQuestionIndex}
                selectedAnswer={selectedAnswer}
                myAnswers={myAnswers}
                onSelectAnswer={handleSelectAnswer}
                onNextQuestion={handleNextQuestion}
                onPreviousQuestion={handlePreviousQuestion}
                onExit={handleExit}
              />
            </div>
          </div>

          {/* Debug Panel */}
          <div className="space-y-4">
            {/* Current State */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                Debug Info
              </Heading>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <Text variant="secondary">Status:</Text>
                  <Badge variant="info" size="sm">{sessionStatus}</Badge>
                </div>
                <div className="flex justify-between">
                  <Text variant="secondary">Question:</Text>
                  <Text>{currentQuestionIndex + 1}/{session.questions.length}</Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="secondary">Selected:</Text>
                  <Text>{selectedAnswer !== null ? String.fromCharCode(65 + selectedAnswer) : '-'}</Text>
                </div>
              </div>
            </Card>

            {/* My Answers */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                My Answers
              </Heading>
              <div className="flex flex-wrap gap-2">
                {myAnswers.map((answer, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
                      idx === currentQuestionIndex
                        ? 'ring-2 ring-indigo-500 bg-indigo-100 dark:bg-indigo-900'
                        : answer !== null
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    {answer !== null ? String.fromCharCode(65 + answer) : idx + 1}
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Log */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                Action Log
              </Heading>
              <div className="max-h-48 overflow-auto space-y-1">
                {actionLog.length === 0 ? (
                  <Text size="xs" variant="secondary">No actions yet</Text>
                ) : (
                  actionLog.map((entry, idx) => (
                    <div key={idx} className="text-xs font-mono text-gray-600 dark:text-gray-400">
                      {entry}
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
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
