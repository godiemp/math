/**
 * Session API Client
 * Provides functions to interact with the session backend API
 */

import { api } from './api-client';
import type {
  LiveSession,
  User,
  Question,
  CreateSessionData,
  UpdateSessionData,
  SessionsResponse,
  SessionResponse,
  MessageResponse,
  StudentStatistics
} from './types';

// Re-export types for convenience
export type {
  CreateSessionData,
  UpdateSessionData,
  SessionsResponse,
  SessionResponse,
  MessageResponse
};

/**
 * Get all sessions with optional filters
 */
export async function getAllSessions(filters?: {
  status?: string;
  level?: 'M1' | 'M2';
}): Promise<LiveSession[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.level) params.append('level', filters.level);

  const queryString = params.toString();
  const endpoint = `/api/sessions${queryString ? `?${queryString}` : ''}`;

  const response = await api.get<SessionsResponse>(endpoint);

  if (response.error) {
    console.error('Failed to fetch sessions:', response.error);
    return [];
  }

  return response.data?.sessions || [];
}

/**
 * Get sessions that are available (scheduled, lobby, or active)
 */
export async function getAllAvailableSessions(): Promise<LiveSession[]> {
  const allSessions = await getAllSessions();
  return allSessions.filter(
    (s) => s.status === 'scheduled' || s.status === 'lobby' || s.status === 'active'
  );
}

/**
 * Get a single session by ID
 */
export async function getSession(sessionId: string): Promise<LiveSession | null> {
  const response = await api.get<SessionResponse>(`/api/sessions/${sessionId}`);

  if (response.error) {
    console.error('Failed to fetch session:', response.error);
    return null;
  }

  return response.data?.session || null;
}

/**
 * Create a new session (admin only)
 */
export async function createScheduledSession(
  name: string,
  description: string,
  level: 'M1' | 'M2',
  host: User,
  scheduledStartTime: number,
  durationMinutes: number,
  questionCount: number,
  questions: Question[]
): Promise<{ success: boolean; session?: LiveSession; error?: string }> {
  const sessionData: CreateSessionData = {
    name,
    description,
    level,
    scheduledStartTime,
    durationMinutes,
    questions,
  };

  const response = await api.post<SessionResponse>('/api/sessions', sessionData);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to create session',
    };
  }

  return {
    success: true,
    session: response.data?.session,
  };
}

/**
 * Update a scheduled session (admin only)
 */
export async function updateScheduledSession(
  sessionId: string,
  updates: UpdateSessionData
): Promise<{ success: boolean; session?: LiveSession; error?: string }> {
  const response = await api.patch<SessionResponse>(`/api/sessions/${sessionId}`, updates);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to update session',
    };
  }

  return {
    success: true,
    session: response.data?.session,
  };
}

/**
 * Delete a session (admin only)
 */
export async function deleteSession(
  sessionId: string
): Promise<{ success: boolean; error?: string }> {
  const response = await api.delete<MessageResponse>(`/api/sessions/${sessionId}`);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to delete session',
    };
  }

  return { success: true };
}

/**
 * Cancel a session (admin only)
 */
export async function cancelSession(
  sessionId: string
): Promise<{ success: boolean; session?: LiveSession; error?: string }> {
  const response = await api.post<SessionResponse>(`/api/sessions/${sessionId}/cancel`);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to cancel session',
    };
  }

  return {
    success: true,
    session: response.data?.session,
  };
}

/**
 * Register for a session
 */
export async function registerForSession(
  sessionId: string,
  user: User
): Promise<{ success: boolean; error?: string }> {
  const response = await api.post<MessageResponse>(`/api/sessions/${sessionId}/register`);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to register for session',
    };
  }

  return { success: true };
}

/**
 * Unregister from a session
 */
export async function unregisterFromSession(
  sessionId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const response = await api.post<MessageResponse>(`/api/sessions/${sessionId}/unregister`);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to unregister from session',
    };
  }

  return { success: true };
}

/**
 * Update session statuses based on time
 */
export async function updateSessionStatuses(): Promise<{ success: boolean; error?: string }> {
  const response = await api.post<MessageResponse>('/api/sessions/update-statuses');

  if (response.error) {
    console.error('Failed to update session statuses:', response.error);
    return {
      success: false,
      error: response.error.error || 'Failed to update session statuses',
    };
  }

  return { success: true };
}

/**
 * Join a session as a participant
 */
export async function joinSessionAPI(
  sessionId: string
): Promise<{ success: boolean; error?: string }> {
  const response = await api.post<MessageResponse>(`/api/sessions/${sessionId}/join`);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to join session',
    };
  }

  return { success: true };
}

/**
 * Submit an answer for a question
 */
export async function submitAnswerAPI(
  sessionId: string,
  questionIndex: number,
  answer: number
): Promise<{ success: boolean; score?: number; error?: string }> {
  const response = await api.post<{ success: boolean; message: string; score: number }>(
    `/api/sessions/${sessionId}/answers`,
    { questionIndex, answer }
  );

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to submit answer',
    };
  }

  return {
    success: true,
    score: response.data?.score
  };
}

/**
 * Get my participation data for a session
 */
export async function getMyParticipationAPI(
  sessionId: string
): Promise<{
  success: boolean;
  data?: {
    userId: string;
    username: string;
    displayName: string;
    answers: (number | null)[];
    score: number;
    joinedAt: number;
  };
  error?: string;
}> {
  const response = await api.get<{
    userId: string;
    username: string;
    displayName: string;
    answers: (number | null)[];
    score: number;
    joinedAt: number;
  }>(`/api/sessions/${sessionId}/participants/me`);

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to get participation data',
    };
  }

  return {
    success: true,
    data: response.data,
  };
}

/**
 * Get my statistics for live practice sessions
 */
export async function getMyStatistics(): Promise<{
  success: boolean;
  data?: StudentStatistics;
  error?: string;
}> {
  const response = await api.get<StudentStatistics>('/api/sessions/stats/me');

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to get statistics',
    };
  }

  return {
    success: true,
    data: response.data,
  };
}

/**
 * Regenerate questions for a session (admin only)
 *
 * @param sessionId - The ID of the session
 * @param options - Options for regeneration
 * @param options.regenerateAll - If true, regenerate all questions
 * @param options.questionIndices - Array of question indices to regenerate
 * @param options.rangeStart - Start index of range to regenerate (inclusive)
 * @param options.rangeEnd - End index of range to regenerate (inclusive)
 * @param options.newQuestions - Array of new questions to replace with
 */
export async function regenerateSessionQuestions(
  sessionId: string,
  options: {
    regenerateAll?: boolean;
    questionIndices?: number[];
    rangeStart?: number;
    rangeEnd?: number;
    newQuestions: Question[];
  }
): Promise<{ success: boolean; session?: LiveSession; error?: string }> {
  const response = await api.post<SessionResponse>(
    `/api/sessions/${sessionId}/regenerate-questions`,
    options
  );

  if (response.error) {
    return {
      success: false,
      error: response.error.error || 'Failed to regenerate questions',
    };
  }

  return {
    success: true,
    session: response.data?.session,
  };
}
