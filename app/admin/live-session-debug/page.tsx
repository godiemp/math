'use client';

import { useState, useCallback } from 'react';
import { useMachine } from '@xstate/react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/AdminLayout';
import { liveSessionMachine } from '@/lib/live-session-machine';
import type { LiveSession, Question } from '@/lib/types';
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
    participants: [
      {
        userId: user?.id || 'admin',
        username: user?.username || 'admin',
        displayName: user?.displayName || 'Admin User',
        answers: new Array(questionCount).fill(null),
        score: 3,
        joinedAt: now - 60000,
      },
      {
        userId: 'user-2',
        username: 'student1',
        displayName: 'Estudiante 1',
        answers: new Array(questionCount).fill(null),
        score: 4,
        joinedAt: now - 50000,
      },
      {
        userId: 'user-3',
        username: 'student2',
        displayName: 'Estudiante 2',
        answers: new Array(questionCount).fill(null),
        score: 2,
        joinedAt: now - 40000,
      },
    ],
    status: status as LiveSession['status'],
    currentQuestionIndex: 0,
    createdAt: now - 3600000,
    scheduledStartTime: now + 600000, // 10 minutes from now
    scheduledEndTime: now + 4200000,
    durationMinutes: 60,
    lobbyOpenTime: now - 600000,
    startedAt: status === 'active' || status === 'completed' ? now - 1800000 : undefined,
    completedAt: status === 'completed' ? now - 60000 : undefined,
    maxParticipants: 50,
  };
};

type StateValue = string | { [key: string]: StateValue };

function getStateString(value: StateValue): string {
  if (typeof value === 'string') {
    return value;
  }
  const entries = Object.entries(value);
  if (entries.length === 0) return 'unknown';
  const [key, nested] = entries[0];
  const nestedStr = getStateString(nested);
  return `${key}.${nestedStr}`;
}

function LiveSessionDebugContent() {
  const [mockSession, setMockSession] = useState<LiveSession>(createMockSession('active'));
  const [selectedState, setSelectedState] = useState<string>('active');
  const [questionCount, setQuestionCount] = useState(5);
  const [showPreview, setShowPreview] = useState(false);

  // Use the actual state machine for debugging
  const [state, send] = useMachine(liveSessionMachine, {
    input: { sessionId: 'mock-session-debug' },
  });

  // Event history
  const [eventHistory, setEventHistory] = useState<{ type: string; timestamp: number; details?: string }[]>([]);

  const logEvent = useCallback((type: string, details?: string) => {
    setEventHistory((prev: { type: string; timestamp: number; details?: string }[]) => [
      { type, timestamp: Date.now(), details },
      ...prev.slice(0, 19), // Keep last 20 events
    ]);
  }, []);

  // State manipulation functions
  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    const newSession = createMockSession(newState, questionCount);
    setMockSession(newSession);
    logEvent('STATE_CHANGE', `Changed to ${newState}`);
  };

  const handleEventSend = (eventType: string, payload?: Record<string, unknown>) => {
    const event = payload ? { type: eventType, ...payload } : { type: eventType };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send(event as any);
    logEvent(eventType, payload ? JSON.stringify(payload) : undefined);
  };

  const handleQuestionCountChange = (count: number) => {
    setQuestionCount(count);
    const newSession = createMockSession(selectedState, count);
    setMockSession(newSession);
  };

  const stateOptions = [
    { value: 'loading', label: 'Loading', icon: '⏳', color: 'bg-gray-500' },
    { value: 'scheduled', label: 'Scheduled', icon: '📅', color: 'bg-blue-500' },
    { value: 'lobby', label: 'Lobby', icon: '🎯', color: 'bg-yellow-500' },
    { value: 'active', label: 'Active', icon: '🎮', color: 'bg-green-500' },
    { value: 'completed', label: 'Completed', icon: '🏆', color: 'bg-purple-500' },
    { value: 'error', label: 'Error', icon: '❌', color: 'bg-red-500' },
  ];

  const eventButtons = [
    { type: 'NEXT_QUESTION', label: 'Next Question', icon: '➡️' },
    { type: 'PREVIOUS_QUESTION', label: 'Previous Question', icon: '⬅️' },
    { type: 'SELECT_ANSWER', label: 'Select Answer (0)', icon: '✅', payload: { answerIndex: 0 } },
    { type: 'SELECT_ANSWER', label: 'Select Answer (1)', icon: '✅', payload: { answerIndex: 1 } },
    { type: 'SELECT_ANSWER', label: 'Select Answer (2)', icon: '✅', payload: { answerIndex: 2 } },
    { type: 'SELECT_ANSWER', label: 'Select Answer (3)', icon: '✅', payload: { answerIndex: 3 } },
    { type: 'RETRY', label: 'Retry', icon: '🔄' },
    { type: 'EXIT', label: 'Exit', icon: '🚪' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1} size="md" className="mb-2">
            🔧 Live Session State Debugger
          </Heading>
          <Text variant="secondary">
            Herramienta para debuggear y visualizar estados de la máquina de estados XState
          </Text>
        </div>

        {/* Info Card */}
        <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800" padding="lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <Heading level={3} size="xs" className="mb-1 text-indigo-900 dark:text-indigo-100">
                XState Live Session Machine
              </Heading>
              <Text size="sm" className="text-indigo-800 dark:text-indigo-200">
                Esta herramienta te permite controlar manualmente el estado de la máquina, enviar eventos,
                y ver exactamente lo que el estudiante vería en cada estado. Perfecto para debugging y QA.
              </Text>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Controls */}
          <div className="space-y-6">
            {/* Current State Display */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                📍 Estado Actual
              </Heading>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {getStateString(state.value)}
                </div>
                <Text size="xs" variant="secondary" className="mt-2">
                  Machine ID: {state.machine?.id || 'liveSession'}
                </Text>
              </div>
            </Card>

            {/* State Selector */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                🎛️ Cambiar Estado Mock
              </Heading>
              <div className="grid grid-cols-2 gap-2">
                {stateOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStateChange(option.value)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedState === option.value
                        ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{option.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{option.label}</div>
                        <div className={`w-2 h-2 rounded-full ${option.color} inline-block`} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Event Buttons */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                📤 Enviar Eventos
              </Heading>
              <div className="grid grid-cols-1 gap-2">
                {eventButtons.map((btn, idx) => (
                  <Button
                    key={idx}
                    variant="secondary"
                    size="sm"
                    className="justify-start"
                    onClick={() => handleEventSend(btn.type, btn.payload as Record<string, unknown>)}
                  >
                    <span className="mr-2">{btn.icon}</span>
                    {btn.label}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Mock Data Config */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                ⚙️ Configuración Mock
              </Heading>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Número de Preguntas: {questionCount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={questionCount}
                    onChange={(e) => handleQuestionCountChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Middle Column: Context & History */}
          <div className="space-y-6">
            {/* Context Inspector */}
            <Card padding="lg" className="h-fit">
              <Heading level={3} size="xs" className="mb-4">
                📊 Contexto Actual
              </Heading>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-96">
                <pre>{JSON.stringify(state.context, null, 2)}</pre>
              </div>
            </Card>

            {/* Event History */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                📜 Historial de Eventos
              </Heading>
              <div className="space-y-2 max-h-64 overflow-auto">
                {eventHistory.length === 0 ? (
                  <Text size="xs" variant="secondary">
                    Sin eventos. Envía eventos usando los botones.
                  </Text>
                ) : (
                  eventHistory.map((event, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <Badge variant="info" size="sm">
                          {event.type}
                        </Badge>
                        <span className="text-gray-500 text-[10px]">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      {event.details && (
                        <div className="mt-1 text-gray-600 dark:text-gray-400 font-mono">
                          {event.details}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                ⚡ Acciones Rápidas
              </Heading>
              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? '🙈 Ocultar Preview' : '👁️ Mostrar Preview Estudiante'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setEventHistory([]);
                    logEvent('HISTORY_CLEARED', 'Event history reset');
                  }}
                >
                  🗑️ Limpiar Historial
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(state.context, null, 2));
                    logEvent('CONTEXT_COPIED', 'Context copied to clipboard');
                  }}
                >
                  📋 Copiar Contexto
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Preview */}
          <div className="space-y-6">
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                👁️ Vista Previa del Estudiante
              </Heading>
              <Text size="xs" variant="secondary" className="mb-4">
                Lo que el estudiante vería en el estado &quot;{selectedState}&quot;
              </Text>

              {showPreview ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="transform scale-75 origin-top-left">
                    <div className="w-[133%]">
                      <MockPreview session={mockSession} state={selectedState} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
                  <Text variant="secondary">
                    Click &quot;Mostrar Preview&quot; para ver la vista del estudiante
                  </Text>
                </div>
              )}
            </Card>

            {/* State Machine Diagram */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                🗺️ Diagrama de Estados
              </Heading>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-xs font-mono">
                <div className="space-y-1">
                  <div className={selectedState === 'loading' ? 'text-indigo-600 font-bold' : ''}>
                    ● loading
                  </div>
                  <div className="pl-4">↓</div>
                  <div className={selectedState === 'scheduled' ? 'text-indigo-600 font-bold' : ''}>
                    ● scheduled (polling)
                  </div>
                  <div className="pl-4">↓</div>
                  <div className={selectedState === 'lobby' ? 'text-indigo-600 font-bold' : ''}>
                    ● lobby (polling)
                  </div>
                  <div className="pl-4">↓</div>
                  <div className={selectedState === 'active' ? 'text-indigo-600 font-bold' : ''}>
                    ● active
                  </div>
                  <div className="pl-6">├─ idle</div>
                  <div className="pl-6">├─ navigating</div>
                  <div className="pl-6">└─ submittingAnswer</div>
                  <div className="pl-4">↓</div>
                  <div className={selectedState === 'completed' ? 'text-indigo-600 font-bold' : ''}>
                    ● completed
                  </div>
                  <div className="pl-4">↓</div>
                  <div className={selectedState === 'error' ? 'text-red-600 font-bold' : ''}>
                    ● error → RETRY → loading
                  </div>
                  <div className="pl-4">↓</div>
                  <div>● exited (final)</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Mock preview component that shows what student sees based on state
function MockPreview({ session, state }: { session: LiveSession; state: string }) {
  const currentUser = getCurrentUser();

  if (state === 'loading') {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h2 className="text-xl font-bold">Cargando sesión...</h2>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">Error al cargar la sesión</p>
          <Button>Reintentar</Button>
        </div>
      </div>
    );
  }

  if (state === 'scheduled') {
    const startTime = new Date(session.scheduledStartTime);
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-lg">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h1 className="text-lg font-bold mb-4">{session.name}</h1>
          <div className="text-center py-6">
            <div className="text-4xl mb-4">⏰</div>
            <h2 className="text-lg font-bold mb-2">Ensayo Programado</h2>
            <p className="text-sm text-gray-600 mb-4">El ensayo comenzará el:</p>
            <div className="text-base font-semibold text-indigo-600">
              {startTime.toLocaleString('es-CL')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'lobby') {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-lg">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h1 className="text-lg font-bold mb-4">{session.name}</h1>
          <div className="text-center py-6">
            <div className="text-4xl mb-4 animate-pulse">🎯</div>
            <h2 className="text-lg font-bold mb-2">¡Bienvenido al Lobby!</h2>
            <p className="text-sm text-gray-600 mb-4">El ensayo comenzará en:</p>
            <div className="text-3xl font-bold text-yellow-600">10 minutos</div>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'active') {
    const currentQuestion = session.questions[0];
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-lg">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">{session.name}</h2>
          <p className="text-xs text-gray-600 mb-4">Pregunta 1 de {session.questions.length}</p>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${(1 / session.questions.length) * 100}%` }}
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded mb-3">
            <h3 className="text-sm font-medium">{currentQuestion.topic}</h3>
          </div>

          <p className="text-sm mb-3">{currentQuestion.question}</p>

          <div className="space-y-2">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                className="w-full p-2 text-left text-sm rounded bg-gray-100 hover:bg-indigo-50 border"
              >
                {String.fromCharCode(65 + idx)}) {option}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="secondary" size="sm" disabled>
              Anterior
            </Button>
            <Button size="sm" className="flex-1">
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'completed') {
    const sortedParticipants = [...session.participants].sort((a, b) => b.score - a.score);
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-lg">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h1 className="text-lg font-bold text-center mb-4">Resultados del Ensayo</h1>

          <h2 className="text-base font-bold mb-3">Tabla de Posiciones</h2>
          <div className="space-y-2">
            {sortedParticipants.map((participant, index) => (
              <div
                key={participant.userId}
                className={`flex items-center justify-between p-2 rounded ${
                  index === 0 ? 'bg-yellow-100 border border-yellow-400' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </span>
                  <span className="text-sm font-medium">
                    {participant.displayName}
                    {participant.userId === currentUser?.id && ' (Tú)'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-indigo-600">
                    {participant.score}/{session.questions.length}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4" size="sm">
            Volver al Lobby
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

export default function LiveSessionDebugPage() {
  return (
    <ProtectedRoute requireAdmin>
      <LiveSessionDebugContent />
    </ProtectedRoute>
  );
}
