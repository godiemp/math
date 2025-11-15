'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Card, Button, Heading, Text } from '@/components/ui';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { SmartLatexRenderer } from '@/components/MathDisplay';
import type { Question } from '@/lib/types/core';
import { getQuestionsBySubject } from '@/lib/questions';
import { fetchWithRetry, formatErrorMessage } from '@/lib/utils/retry';

// ============================================================================
// Types
// ============================================================================

interface SocraticMessage {
  role: 'assistant' | 'user';
  content: string;
  failed?: boolean;
}

type GameMode = 'setup' | 'selecting' | 'learning';

// ============================================================================
// Main Component
// ============================================================================

export default function LearnPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Setup state
  const [mode, setMode] = useState<GameMode>('setup');
  const [selectedLevel, setSelectedLevel] = useState<'M1' | 'M2'>('M1');
  const [selectedSubject, setSelectedSubject] = useState<'números' | 'álgebra' | 'geometría' | 'probabilidad'>('números');

  // Question selection state
  const [questionOptions, setQuestionOptions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Learning state
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SocraticMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Retry state
  const [retryCount, setRetryCount] = useState(0);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  // Session stats
  const [questionsCompleted, setQuestionsCompleted] = useState(0);

  const [error, setError] = useState<string | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (mode === 'learning' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, mode]);

  // Auto-focus input
  useEffect(() => {
    if (mode === 'learning' && inputRef.current && !isComplete) {
      inputRef.current.focus();
    }
  }, [mode, isComplete, messages]);

  // ============================================================================
  // Phase 1: Load Question Options
  // ============================================================================

  const startLearning = async () => {
    setLoadingQuestions(true);
    setError(null);

    try {
      // Get questions from the library
      const availableQuestions = getQuestionsBySubject(selectedSubject, selectedLevel);

      if (availableQuestions.length === 0) {
        setError('No hay preguntas disponibles para esta materia y nivel.');
        return;
      }

      // Select 5 diverse questions (or all if less than 5)
      const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(5, shuffled.length));

      setQuestionOptions(selected);
      setMode('selecting');
    } catch (err) {
      setError('Error al cargar las preguntas. Por favor intenta de nuevo.');
      console.error(err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // ============================================================================
  // Phase 2: User Selects Question
  // ============================================================================

  const handleSelectQuestion = async (question: Question) => {
    setSelectedQuestion(question);
    setError(null);
    setIsThinking(true);
    setRetryCount(0);

    try {
      // Start Socratic session with backend (with retry)
      const response = await fetchWithRetry(
        () => api.post<{
          sessionId: string;
          initialMessage: string;
        }>('/api/learn/start-socratic', {
          question,
          level: selectedLevel,
          subject: selectedSubject,
        }),
        {
          maxRetries: 3,
          onRetry: (attempt) => setRetryCount(attempt)
        }
      );

      if (response.error) {
        setError(formatErrorMessage(response.error));
        setIsThinking(false);
        return;
      }

      setSessionId(response.data!.sessionId);
      setMessages([{ role: 'assistant', content: response.data!.initialMessage }]);
      setMode('learning');
    } catch (err) {
      setError('Error de conexión. Por favor verifica tu internet e intenta de nuevo.');
      console.error(err);
    } finally {
      setIsThinking(false);
      setRetryCount(0);
    }
  };

  // ============================================================================
  // Phase 3: Socratic Interaction
  // ============================================================================

  const sendMessageInternal = async (messageToSend: string) => {
    if (!messageToSend.trim() || !sessionId || isThinking) return;

    setError(null);
    setIsThinking(true);
    setRetryCount(0);
    setLastFailedMessage(null);

    // Add user message to chat (or mark existing failed message as not failed)
    const existingFailedIndex = messages.findIndex(
      m => m.role === 'user' && m.content === messageToSend && m.failed
    );

    if (existingFailedIndex >= 0) {
      // Update existing failed message
      setMessages(prev => prev.map((m, i) =>
        i === existingFailedIndex ? { ...m, failed: false } : m
      ));
    } else {
      // Add new message
      setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    }

    try {
      const response = await fetchWithRetry(
        () => api.post<{
          message: string;
          isComplete: boolean;
          summary?: string;
        }>('/api/learn/continue-socratic', {
          sessionId,
          userMessage: messageToSend,
        }),
        {
          maxRetries: 3,
          onRetry: (attempt) => setRetryCount(attempt)
        }
      );

      if (response.error) {
        // Mark message as failed
        setMessages(prev => prev.map((m, i) =>
          i === prev.length - 1 && m.role === 'user' ? { ...m, failed: true } : m
        ));
        setLastFailedMessage(messageToSend);
        setError(formatErrorMessage(response.error));
        return;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response.data!.message }]);
      setLastFailedMessage(null);

      if (response.data!.isComplete) {
        setIsComplete(true);
        setQuestionsCompleted(prev => prev + 1);
      }
    } catch (err) {
      // Mark message as failed
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1 && m.role === 'user' ? { ...m, failed: true } : m
      ));
      setLastFailedMessage(messageToSend);
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.');
      console.error(err);
    } finally {
      setIsThinking(false);
      setRetryCount(0);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim() || isThinking) return;
    const messageToSend = userInput.trim();
    setUserInput('');
    await sendMessageInternal(messageToSend);
  };

  const retryLastMessage = async () => {
    if (!lastFailedMessage) return;
    await sendMessageInternal(lastFailedMessage);
  };

  const handleNextQuestion = () => {
    // Reset state for new question selection
    setSelectedQuestion(null);
    setSessionId(null);
    setMessages([]);
    setIsComplete(false);
    setError(null);
    setLastFailedMessage(null);
    setRetryCount(0);
    setMode('selecting');
  };

  const handleBackToSetup = () => {
    setMode('setup');
    setQuestionOptions([]);
    setSelectedQuestion(null);
    setSessionId(null);
    setMessages([]);
    setIsComplete(false);
    setError(null);
    setLastFailedMessage(null);
    setRetryCount(0);
  };

  // ============================================================================
  // UI Rendering
  // ============================================================================

  // Setup Screen
  if (mode === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-8">
        <Card className="max-w-2xl w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎓</div>
            <Heading level={1} className="text-4xl mb-2">
              Aprendizaje Socrático
            </Heading>
            <Text variant="secondary" className="text-lg">
              Elige un tema y te mostraré varios problemas. Selecciona el que te genere menos confianza para trabajarlo juntos.
            </Text>
          </div>

          {/* Level Selection */}
          <div className="mb-6">
            <Text className="font-semibold mb-3">¿Qué nivel quieres practicar?</Text>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedLevel('M1')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedLevel === 'M1'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                    : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                }`}
              >
                <Text className="font-bold">PAES M1</Text>
                <Text size="sm" variant="secondary">Competencia Matemática 1</Text>
              </button>
              <button
                onClick={() => setSelectedLevel('M2')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedLevel === 'M2'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                    : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                }`}
              >
                <Text className="font-bold">PAES M2</Text>
                <Text size="sm" variant="secondary">Competencia Matemática 2</Text>
              </button>
            </div>
          </div>

          {/* Subject Selection */}
          <div className="mb-8">
            <Text className="font-semibold mb-3">¿Qué tema quieres practicar?</Text>
            <div className="grid grid-cols-2 gap-3">
              {(['números', 'álgebra', 'geometría', 'probabilidad'] as const).map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedSubject === subject
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                      : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  <Text className="capitalize">{subject}</Text>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <Text className="text-red-700 dark:text-red-300">{error}</Text>
            </div>
          )}

          <Button
            onClick={startLearning}
            fullWidth
            size="lg"
            disabled={loadingQuestions}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          >
            {loadingQuestions ? 'Cargando problemas...' : 'Ver Problemas Disponibles'}
          </Button>

          {/* Session Stats Display */}
          {questionsCompleted > 0 && (
            <div className="mt-6 text-center">
              <Text size="sm" variant="secondary">Problemas completados esta sesión</Text>
              <Text className="text-3xl font-bold text-teal-600">{questionsCompleted}</Text>
            </div>
          )}

          <button
            onClick={() => router.back()}
            className="w-full mt-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <Text size="sm">← Volver</Text>
          </button>
        </Card>
      </div>
    );
  }

  // Question Selection Screen
  if (mode === 'selecting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl mb-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🤔</div>
              <Heading level={2} className="mb-2">
                ¿Cuál te genera menos confianza?
              </Heading>
              <Text variant="secondary">
                Selecciona el problema con el que te sientas menos seguro. Trabajaremos juntos para resolverlo.
              </Text>
            </div>

            <div className="mb-4">
              <Text size="sm" variant="secondary" className="mb-2">
                Tema: <span className="font-semibold capitalize">{selectedSubject}</span> |
                Nivel: <span className="font-semibold">{selectedLevel}</span>
              </Text>
            </div>
          </Card>

          {/* Question Options */}
          <div className="space-y-4">
            {questionOptions.map((question, index) => (
              <Card
                key={question.id}
                className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-teal-400"
                onClick={() => handleSelectQuestion(question)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <Text className="font-bold text-slate-600 dark:text-slate-400">{index + 1}</Text>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300' :
                        question.difficulty === 'hard' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                        'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {question.difficulty === 'easy' ? 'Fácil' :
                         question.difficulty === 'medium' ? 'Medio' :
                         question.difficulty === 'hard' ? 'Difícil' : 'Extremo'}
                      </span>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300">
                      <SmartLatexRenderer latex={question.questionLatex} displayMode={false} />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {question.options.map((option, optIdx) => (
                        <div key={optIdx} className="text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded">
                          <span className="font-semibold mr-1">{['A', 'B', 'C', 'D'][optIdx]})</span>
                          <SmartLatexRenderer latex={question.optionsLatex?.[optIdx] || option} displayMode={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {isThinking && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="text-center p-8">
                <div className="animate-pulse">
                  <div className="text-4xl mb-4">🧠</div>
                  <Text className="font-semibold">
                    {retryCount > 0
                      ? `Reintentando... (intento ${retryCount + 1}/3)`
                      : 'Preparando tu sesión de aprendizaje...'}
                  </Text>
                </div>
              </Card>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <Text className="text-red-700 dark:text-red-300">{error}</Text>
            </div>
          )}

          <button
            onClick={handleBackToSetup}
            className="w-full mt-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <Text size="sm">← Cambiar tema o nivel</Text>
          </button>
        </div>
      </div>
    );
  }

  // Socratic Learning Screen
  if (mode === 'learning' && selectedQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-cyan-600 px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Question Context (Collapsible) */}
          <Card className="shadow-xl">
            <details className="group">
              <summary className="cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  <Text className="font-semibold">Problema seleccionado</Text>
                </div>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="text-slate-700 dark:text-slate-300 mb-4">
                  <SmartLatexRenderer latex={selectedQuestion.questionLatex} displayMode={false} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedQuestion.options.map((option, idx) => (
                    <div key={idx} className="text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      <span className="font-semibold mr-1">{['A', 'B', 'C', 'D'][idx]})</span>
                      <SmartLatexRenderer latex={selectedQuestion.optionsLatex?.[idx] || option} displayMode={false} />
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </Card>

          {/* Socratic Chat */}
          <Card className="shadow-2xl">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white -mx-6 -mt-6 px-6 py-4 rounded-t-xl mb-6">
              <Heading level={2} className="text-white flex items-center gap-2">
                <span>🎓</span> Aprendizaje Socrático
              </Heading>
              <Text size="sm" className="text-white/80">
                Te guiaré con preguntas para que descubras la solución por ti mismo
              </Text>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[85%]">
                    <div
                      className={`p-4 rounded-xl ${
                        msg.role === 'user'
                          ? msg.failed
                            ? 'bg-red-500 text-white'
                            : 'bg-teal-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      <MarkdownViewer content={msg.content} />
                    </div>
                    {msg.failed && (
                      <div className="mt-1 flex items-center justify-end gap-2">
                        <Text size="xs" className="text-red-600 dark:text-red-400">
                          Error al enviar
                        </Text>
                        <button
                          onClick={retryLastMessage}
                          disabled={isThinking}
                          className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 underline disabled:opacity-50"
                        >
                          Reintentar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      {retryCount > 0 && (
                        <Text size="xs" className="text-slate-500 ml-2">
                          Reintento {retryCount}/3
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input or Completion */}
            {!isComplete ? (
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isThinking && sendMessage()}
                  placeholder="Escribe tu respuesta o pregunta aquí..."
                  disabled={isThinking}
                  className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-teal-500 dark:bg-slate-800"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!userInput.trim() || isThinking}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Enviar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="text-3xl mb-2">🎉</div>
                  <Text className="font-bold text-green-800 dark:text-green-200 text-lg">
                    ¡Excelente trabajo!
                  </Text>
                  <Text size="sm" variant="secondary">
                    Has completado este problema usando el método socrático
                  </Text>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleNextQuestion}
                    fullWidth
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  >
                    Siguiente Problema →
                  </Button>
                  <Button
                    onClick={handleBackToSetup}
                    fullWidth
                    variant="secondary"
                  >
                    Cambiar Tema
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                <Text className="text-red-700 dark:text-red-300">{error}</Text>
                {lastFailedMessage && (
                  <Button
                    onClick={retryLastMessage}
                    disabled={isThinking}
                    size="sm"
                    variant="danger"
                    className="mt-3"
                  >
                    {isThinking ? 'Reintentando...' : 'Reintentar mensaje'}
                  </Button>
                )}
              </div>
            )}
          </Card>

          {/* Session Stats */}
          <Card className="text-center">
            <Text size="sm" variant="secondary">Problemas completados esta sesión</Text>
            <Text className="text-2xl font-bold text-white">{questionsCompleted}</Text>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
