/**
 * ============================================================================
 * LIVE SESSIONS TYPES
 * ============================================================================
 *
 * Types for live practice sessions (Ensayo PAES) where multiple users
 * can participate in scheduled quizzes together.
 *
 * Route association: /live-practice, /admin (for session creation)
 */

import type { Question, Level, SessionStatus } from './core';

/**
 * ============================================================================
 * SESSION ENTITIES
 * ============================================================================
 */

/**
 * User registration for a scheduled session
 * Tracks who has signed up before the session starts
 */
export interface SessionRegistration {
  userId: string;
  username: string;
  displayName: string;
  registeredAt: number;
}

/**
 * Active participant in a live session
 * Tracks users who have joined the lobby/active session
 */
export interface SessionParticipant {
  userId: string;
  username: string;
  displayName: string;
  answers: (number | null)[];
  score: number;
  joinedAt: number;
}

/**
 * Live practice session (Ensayo PAES)
 * Represents a scheduled or active quiz session with multiple participants
 */
export interface LiveSession {
  id: string;
  name: string;
  description?: string;
  level: Level;
  hostId: string;
  hostName: string;
  questions: Question[];
  registeredUsers: SessionRegistration[]; // Users who signed up for the ensayo
  participants: SessionParticipant[]; // Users who joined the lobby/session
  status: SessionStatus;
  currentQuestionIndex: number;
  createdAt: number;
  scheduledStartTime: number; // Unix timestamp for when session starts
  scheduledEndTime: number; // Unix timestamp for when session ends
  durationMinutes: number; // Duration in minutes
  lobbyOpenTime?: number; // When lobby opens (e.g., 10 min before start)
  startedAt?: number;
  completedAt?: number;
  maxParticipants: number;
}

/**
 * Answer submission in a live session
 */
export interface LiveSessionAnswer {
  sessionId: string;
  userId: string;
  questionIndex: number;
  answer: number;
  timestamp: number;
}

/**
 * ============================================================================
 * SESSION API TYPES
 * ============================================================================
 */

/**
 * Request to create a new session
 */
export interface CreateSessionData {
  name: string;
  description?: string;
  level: Level;
  scheduledStartTime: number;
  durationMinutes: number;
  questions: Question[];
  maxParticipants?: number;
}

/**
 * Request to update an existing session
 */
export interface UpdateSessionData {
  name?: string;
  description?: string;
  level?: Level;
  scheduledStartTime?: number;
  durationMinutes?: number;
  questionCount?: number;
  maxParticipants?: number;
  questions?: Question[];
}

/**
 * Response for listing multiple sessions
 */
export interface SessionsResponse {
  success: boolean;
  count: number;
  sessions: LiveSession[];
}

/**
 * Response for a single session
 */
export interface SessionResponse {
  success: boolean;
  session: LiveSession;
}

/**
 * Generic session API message response
 */
export interface MessageResponse {
  success: boolean;
  message?: string;
}
