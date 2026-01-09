import { useState, useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { api } from '@/lib/api-client';

export type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';
export type DiagnosticSessionStatus = 'not_started' | 'in_progress' | 'completed';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export interface KnowledgeInference {
  unitCode: string;
  subsectionCode?: string;
  knows: boolean;
  confidence: number;
  reason: string;
  inferredAt: number;
  confirmed?: boolean;
}

export interface DiagnosticStatus {
  subject: Subject;
  status: DiagnosticSessionStatus;
  unitsDiagnosed: number;
  totalUnits: number;
  lastSessionId?: string;
}

interface DiagnosticResponse {
  sessionId: string;
  message: string;
  inferences: KnowledgeInference[];
  isComplete: boolean;
  suggestedNextTopic?: Subject;
  success: boolean;
}

interface DiagnosticStatusResponse {
  subjects: DiagnosticStatus[];
}

const fetcher = async (url: string): Promise<DiagnosticStatusResponse> => {
  const res = await api.get<DiagnosticStatusResponse>(url);
  return res.data || { subjects: [] };
};

/**
 * Hook for managing AI-powered knowledge diagnostic conversations
 */
export function useDiagnosticChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inferences, setInferences] = useState<KnowledgeInference[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [suggestedNextTopic, setSuggestedNextTopic] = useState<Subject | undefined>();
  const [error, setError] = useState<string | null>(null);

  // Fetch diagnostic status for all subjects
  const {
    data: statusData,
    error: statusError,
    mutate: refreshStatus,
  } = useSWR<DiagnosticStatusResponse>('/api/diagnostic/status', fetcher, {
    revalidateOnFocus: false,
  });

  /**
   * Start a new diagnostic session for a subject
   */
  const startDiagnostic = useCallback(async (subject: Subject) => {
    setIsLoading(true);
    setError(null);
    setMessages([]);
    setInferences([]);
    setIsComplete(false);
    setSuggestedNextTopic(undefined);
    setCurrentSubject(subject);

    try {
      const response = await api.post<DiagnosticResponse>('/api/diagnostic/start', { subject });
      const data = response.data;

      if (data && data.success) {
        setSessionId(data.sessionId);
        setMessages([{ role: 'assistant', content: data.message, timestamp: Date.now() }]);
        setInferences(data.inferences || []);
      } else {
        setError('Error al iniciar el diagnóstico');
      }
    } catch (err) {
      console.error('Start diagnostic error:', err);
      setError(err instanceof Error ? err.message : 'Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Send a message in the current diagnostic session
   */
  const sendMessage = useCallback(async (message: string) => {
    if (!sessionId) {
      setError('No hay sesión activa');
      return;
    }

    // Add user message optimistically
    const userMessage: ChatMessage = { role: 'user', content: message, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<DiagnosticResponse>('/api/diagnostic/chat', {
        sessionId,
        message,
      });
      const data = response.data;

      if (data && data.success) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.message, timestamp: Date.now() },
        ]);
        setInferences(data.inferences || []);
        setIsComplete(data.isComplete);
        setSuggestedNextTopic(data.suggestedNextTopic);

        if (data.isComplete) {
          // Refresh status after completing
          refreshStatus();
        }
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Lo siento, hubo un error. Intenta de nuevo.' },
        ]);
      }
    } catch (err) {
      console.error('Send message error:', err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Error de conexión. Intenta de nuevo.' },
      ]);
      setError(err instanceof Error ? err.message : 'Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, refreshStatus]);

  /**
   * Confirm inferences and write to knowledge declarations
   */
  const confirmInferences = useCallback(async (
    adjustments?: { unitCode: string; subsectionCode?: string; knows: boolean }[]
  ) => {
    if (!sessionId) {
      setError('No hay sesión activa');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<{ success: boolean; declarationsUpdated: number }>(
        '/api/diagnostic/confirm',
        { sessionId, adjustments }
      );

      if (response.data?.success) {
        // Refresh status after confirming
        refreshStatus();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Confirm inferences error:', err);
      setError(err instanceof Error ? err.message : 'Error al confirmar');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, refreshStatus]);

  /**
   * Reset the current diagnostic session
   */
  const resetSession = useCallback(() => {
    setSessionId(null);
    setCurrentSubject(null);
    setMessages([]);
    setInferences([]);
    setIsComplete(false);
    setSuggestedNextTopic(undefined);
    setError(null);
  }, []);

  /**
   * Get progress percentage for a subject
   */
  const getSubjectProgress = useCallback((subject: Subject): number => {
    const subjectStatus = statusData?.subjects.find(s => s.subject === subject);
    if (!subjectStatus || subjectStatus.totalUnits === 0) return 0;
    return Math.round((subjectStatus.unitsDiagnosed / subjectStatus.totalUnits) * 100);
  }, [statusData]);

  /**
   * Get status for a specific subject
   */
  const getSubjectStatus = useCallback((subject: Subject): DiagnosticSessionStatus => {
    const subjectStatus = statusData?.subjects.find(s => s.subject === subject);
    return subjectStatus?.status || 'not_started';
  }, [statusData]);

  return {
    // Session state
    sessionId,
    currentSubject,
    messages,
    inferences,
    isLoading,
    isComplete,
    suggestedNextTopic,
    error,

    // Status data
    subjectsStatus: statusData?.subjects || [],
    statusError,
    isLoadingStatus: !statusData && !statusError,

    // Actions
    startDiagnostic,
    sendMessage,
    confirmInferences,
    resetSession,
    refreshStatus,

    // Helpers
    getSubjectProgress,
    getSubjectStatus,
    hasActiveSession: !!sessionId,
    hasMessages: messages.length > 0,

    // Pending inferences that haven't been confirmed
    pendingInferences: inferences.filter(i => !i.confirmed),
  };
}
