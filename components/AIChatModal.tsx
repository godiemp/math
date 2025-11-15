'use client';

import { useState, useRef, useEffect } from 'react';
import { Question } from '@/lib/types';
import { MathText, SmartLatexRenderer, UnifiedLatexRenderer } from './MathDisplay';
import { GeometryCanvas, GeometryFigure } from './GeometryCanvas';
import { MarkdownViewer } from './MarkdownViewer';
import { api } from '@/lib/api-client';
import { analytics } from '@/lib/analytics';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  userAnswer: number | null;
  quizMode?: 'zen' | 'rapidfire';
  quizSessionId?: string;
}

export function AIChatModal({ isOpen, onClose, question, userAnswer, quizMode = 'zen', quizSessionId }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isContextExpanded, setIsContextExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Track AI tutor opened
      analytics.track('ai_tutor_opened', {
        questionId: question.id,
        context: userAnswer === question.correctAnswer ? 'correct_answer' : 'wrong_answer',
        quizMode,
        subject: question.subject,
        difficulty: question.difficulty,
      });

      // Initialize with welcome message
      setMessages([
        {
          role: 'assistant',
          content: userAnswer === question.correctAnswer
            ? '¡Bien hecho! 🌸 Respondiste correctamente. ¿Hay algo que quieras profundizar sobre esta pregunta?'
            : '¡Hola! 🌿 Estoy aquí para ayudarte a entender esta pregunta. ¿Qué te gustaría saber?',
          timestamp: Date.now()
        }
      ]);
      // Focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, question, userAnswer, quizMode]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Track AI message sent
    analytics.track('ai_message_sent', {
      questionId: question.id,
      messageLength: inputValue.length,
      turnNumber: Math.floor(messages.length / 2) + 1, // Approximate conversation turn
      quizMode,
    });

    try {
      const response = await api.post<{ response: string; success: boolean }>('/api/ai/chat', {
        questionLatex: question.questionLatex,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        options: question.options,
        topic: question.topic,
        difficulty: question.difficulty,
        visualData: question.visualData,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        userMessage: inputValue,
        quizSessionId: quizSessionId,
        questionId: question.id,
      });

      if (response.error) {
        console.error('API error response:', response.error);
        throw new Error(response.error.error || 'Error en la respuesta');
      }

      if (response.data && response.data.success && response.data.response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.data.response,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Perdón, tuve un problema al procesar tu mensaje. ¿Puedes intentar de nuevo?',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
          /* Markdown chat message styles */
          .markdown-chat-message :global(.prose) {
            max-width: none;
            color: inherit;
          }
          .markdown-chat-message :global(p) {
            margin-bottom: 0.5rem;
          }
          .markdown-chat-message :global(p:last-child) {
            margin-bottom: 0;
          }
          .markdown-chat-message :global(strong) {
            font-weight: 600;
          }
          .markdown-chat-message :global(ul),
          .markdown-chat-message :global(ol) {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
          }
          .markdown-chat-message :global(li) {
            margin: 0.25rem 0;
          }
          .markdown-chat-message :global(code) {
            background-color: rgba(0, 0, 0, 0.1);
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
          }
          :global(.dark) .markdown-chat-message :global(code) {
            background-color: rgba(255, 255, 255, 0.1);
          }
          .markdown-chat-message :global(.katex) {
            font-size: 1em;
          }
          .markdown-chat-message :global(.katex-display) {
            margin: 0.5rem 0;
          }
        `}</style>
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🤖</span>
                <h2 className="text-2xl font-bold">Tu Tutor IA</h2>
              </div>
              <p className="text-teal-100 text-sm">
                Pregunta lo que quieras sobre esta pregunta de {question.topic}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-3xl leading-none transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Question Context Card */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 border-b-2 border-teal-200 dark:border-teal-700">
          {/* AI Context Indicator - Always Visible */}
          <button
            onClick={() => setIsContextExpanded(!isContextExpanded)}
            className="w-full p-4 flex items-center justify-between gap-2 hover:bg-teal-100/50 dark:hover:bg-teal-800/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500 text-white rounded-full text-xs font-semibold shadow-sm">
                <span>🧠</span>
                <span>Contexto de la pregunta</span>
              </div>
              <span className="text-xs text-teal-700 dark:text-teal-300">
                {isContextExpanded ? 'Haz clic para ocultar detalles' : 'Haz clic para ver detalles'}
              </span>
            </div>
            <div className="text-teal-700 dark:text-teal-300 text-xl transition-transform duration-200" style={{
              transform: isContextExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>
              ▼
            </div>
          </button>

          {/* Collapsible Context Details */}
          {isContextExpanded && (
            <div className="px-4 pb-4 space-y-3">

          {/* Question */}
          <div className="mb-3">
            <div className="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-1.5">
              📝 PREGUNTA:
            </div>
            <div className="text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-3 rounded-lg">
              <SmartLatexRenderer latex={question.questionLatex} displayMode={false} />
            </div>
          </div>

          {/* Visual Data */}
          {question.visualData && question.visualData.type === 'geometry' && (
            <div className="mb-3">
              <div className="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-1.5">
                📐 FIGURA GEOMÉTRICA:
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <GeometryCanvas
                  figures={question.visualData.data as GeometryFigure[]}
                  width={300}
                  height={225}
                />
              </div>
            </div>
          )}

          {/* Options with user answer and correct answer highlighted */}
          <div className="mb-3">
            <div className="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-1.5">
              🔤 OPCIONES:
            </div>
            <div className="space-y-1.5">
              {question.options.map((option, index) => {
                const isUserAnswer = userAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;

                return (
                  <div
                    key={index}
                    className={`text-xs p-2 rounded-lg flex items-start gap-2 ${
                      isCorrectAnswer
                        ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-900 dark:text-green-100'
                        : isUserAnswer
                        ? 'bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500 text-amber-900 dark:text-amber-100'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="font-bold shrink-0">{String.fromCharCode(65 + index)}.</span>
                    <span className="flex-1">
                      <UnifiedLatexRenderer content={question.optionsLatex?.[index] || option} displayMode={false} />
                    </span>
                    {isCorrectAnswer && <span className="shrink-0 font-bold">✓ Correcta</span>}
                    {isUserAnswer && !isCorrectAnswer && <span className="shrink-0 font-bold">Tu respuesta</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Summary */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
            isCorrect
              ? 'bg-green-500 text-white'
              : userAnswer === null
              ? 'bg-gray-500 text-white'
              : 'bg-amber-500 text-white'
          }`}>
            {isCorrect ? (
              <>
                <span>🎉</span>
                <span>Respondiste correctamente - ¡Podemos profundizar en el concepto!</span>
              </>
            ) : userAnswer === null ? (
              <>
                <span>🤔</span>
                <span>No respondiste - ¡Puedo ayudarte a resolverla!</span>
              </>
            ) : (
              <>
                <span>🌿</span>
                <span>Respuesta incorrecta - ¡Aprendamos juntos del error!</span>
              </>
            )}
          </div>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🤖</span>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Tutor IA</span>
                  </div>
                )}
                {message.role === 'assistant' ? (
                  <div className="text-sm leading-relaxed markdown-chat-message">
                    <MarkdownViewer content={message.content} />
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pensando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta aquí..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>Enviar</span>
              <span>→</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Presiona Enter para enviar
          </p>
        </div>
      </div>
    </div>
  );
}
