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
    } catch {
      setIsLoading(false);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Lo siento, hubo un error de conexión. Intenta de nuevo.' },
      ]);
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
