'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DynamicLesson } from '@/lib/builder/types';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  lessonUpdate?: DynamicLesson;
  error?: boolean;
}

interface BuilderChatProps {
  /** Current lesson (null when creating from scratch) */
  lesson: DynamicLesson | null;
  /** Callback when lesson is created or updated */
  onLessonUpdate: (lesson: DynamicLesson) => void;
  /** Currently active step index */
  activeStep: number;
}

/**
 * BuilderChat - Chat interface for lesson building
 *
 * Allows teachers to create or modify lessons through natural language conversation.
 * When no lesson exists, it can generate a complete lesson from a topic description.
 */
export default function BuilderChat({
  lesson,
  onLessonUpdate,
  activeStep,
}: BuilderChatProps) {
  const isCreatingNew = !lesson;

  const getWelcomeMessage = (): string => {
    if (isCreatingNew) {
      return `¡Hola! Soy tu asistente para crear lecciones de matemáticas.

Describe qué tema quieres enseñar y crearé una lección interactiva completa. Por ejemplo:
• "Quiero una lección sobre el vértice de una ecuación cuadrática"
• "Crea una lección para enseñar fracciones equivalentes"
• "Necesito enseñar el teorema de Pitágoras"

¿Qué tema te gustaría enseñar?`;
    }
    return `¡Hola! Estás editando "${lesson.title}".

Puedo ayudarte a:
• Cambiar el título o descripción
• Modificar el gancho (escenario, pregunta, opciones)
• Ajustar la teoría y ejemplos
• Agregar o editar preguntas de práctica
• Personalizar el checkpoint final

¿Qué te gustaría cambiar?`;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'system',
      content: getWelcomeMessage(),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Update welcome message when lesson changes
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'system',
        content: getWelcomeMessage(),
        timestamp: new Date(),
      },
    ]);
  }, [lesson?.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/builder/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages
            .filter(m => m.role !== 'system')
            .map(m => ({ role: m.role, content: m.content }))
            .concat([{ role: 'user', content: trimmedInput }]),
          currentLesson: lesson,
          activeStep,
          mode: isCreatingNew ? 'create' : 'edit',
        }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      const data = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message || (isCreatingNew ? 'He creado tu lección.' : 'He actualizado la lección.'),
        timestamp: new Date(),
        lessonUpdate: data.lessonUpdate,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Apply lesson update if present
      if (data.lessonUpdate) {
        onLessonUpdate(data.lessonUpdate);
      }
    } catch (error) {
      console.error('Chat error:', error);

      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.',
        timestamp: new Date(),
        error: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = isCreatingNew ? QUICK_ACTIONS_CREATE : QUICK_ACTIONS_EDIT;
  const placeholder = isCreatingNew
    ? 'Describe el tema de tu lección...'
    : 'Describe los cambios que quieres hacer...';

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 p-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-spin" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {isCreatingNew ? 'Creando tu lección...' : 'Pensando...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={cn(
              'px-4 py-2 rounded-xl font-medium transition-all flex items-center justify-center',
              input.trim() && !isLoading
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => setInput(action.prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Chat message component
 */
function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-blue-100 dark:bg-blue-900'
            : isSystem
            ? 'bg-gray-100 dark:bg-gray-700'
            : message.error
            ? 'bg-red-100 dark:bg-red-900'
            : 'bg-purple-100 dark:bg-purple-900'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        ) : message.error ? (
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
        ) : (
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        )}
      </div>

      {/* Message content */}
      <div
        className={cn(
          'flex-1 max-w-[80%] p-3 rounded-2xl',
          isUser
            ? 'bg-blue-500 text-white rounded-br-sm'
            : isSystem
            ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-gray-800 dark:text-gray-200 border border-purple-200 dark:border-purple-800 rounded-bl-sm'
            : message.error
            ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800 rounded-bl-sm'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

        {message.lessonUpdate && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
            <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {message.lessonUpdate.title ? `Lección creada: "${message.lessonUpdate.title}"` : 'Lección actualizada'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Quick actions for creating new lessons
 */
const QUICK_ACTIONS_CREATE = [
  { id: 'vertex', label: 'Vértice cuadrática', prompt: 'Crea una lección sobre cómo encontrar el vértice de una ecuación cuadrática' },
  { id: 'fractions', label: 'Fracciones', prompt: 'Quiero enseñar fracciones equivalentes' },
  { id: 'pythagoras', label: 'Pitágoras', prompt: 'Necesito una lección sobre el teorema de Pitágoras' },
  { id: 'probability', label: 'Probabilidad', prompt: 'Crea una lección de probabilidad básica' },
];

/**
 * Quick actions for editing existing lessons
 */
const QUICK_ACTIONS_EDIT = [
  { id: 'change-title', label: 'Cambiar título', prompt: 'Cambia el título de la lección a ' },
  { id: 'edit-hook', label: 'Editar gancho', prompt: 'Quiero cambiar el escenario del gancho. ' },
  { id: 'add-question', label: 'Agregar pregunta', prompt: 'Agrega una pregunta de práctica sobre ' },
  { id: 'simplify', label: 'Simplificar', prompt: 'Simplifica las explicaciones para que sean más fáciles de entender' },
];
