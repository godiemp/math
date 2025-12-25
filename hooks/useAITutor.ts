import { useState, useCallback } from 'react';
import { api } from '@/lib/api-client';
import type { Question } from '@/lib/types/core';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Manages AI tutor chat state and hint requests
 */
export function useAITutor() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message: string, problem: Question) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      const response = await api.post<{ hint: string }>('/api/adaptive/hint', {
        problem: {
          id: problem.id,
          question: problem.questionLatex,
          options: problem.options,
          correctAnswer: problem.correctAnswer,
          subject: problem.subject,
          difficulty: problem.difficulty,
        },
        studentMessage: message,
        conversationHistory: messages,
      });

      setIsLoading(false);

      const hint = response.data?.hint;
      if (hint && hint !== 'undefined' && hint.trim() !== '') {
        setMessages(prev => [...prev, { role: 'assistant', content: hint }]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Lo siento, hubo un error. Intenta de nuevo.' },
        ]);
      }
    } catch (error) {
      console.error('AI Tutor error:', error);
      setIsLoading(false);

      // Provide more specific error messages based on error type
      let errorMessage = 'Lo siento, hubo un error de conexión. Intenta de nuevo.';

      if (error instanceof Error) {
        if (error.message.includes('503') || error.message.includes('no está disponible')) {
          errorMessage = 'El servicio de tutor AI no está disponible en este momento. Intenta más tarde.';
        } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
          errorMessage = 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.';
        } else if (error.message.includes('timeout') || error.message.includes('network')) {
          errorMessage = 'Problema de conexión. Verifica tu internet e intenta de nuevo.';
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    hasMessages: messages.length > 0,
  };
}
