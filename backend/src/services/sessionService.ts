/**
 * Session Service
 * Business logic for session management extracted from sessionController
 */

import { pool } from '../config/database';

// Type definitions
export interface SessionRow {
  id: string;
  name: string;
  description: string;
  level: string;
  host_id: string;
  host_name: string;
  questions: any;
  status: string;
  current_question_index: number;
  created_at: string;
  scheduled_start_time: string;
  scheduled_end_time: string;
  duration_minutes: number;
  lobby_open_time: string;
  max_participants: number;
  started_at?: string;
  completed_at?: string;
  registered_users?: any[];
  participants?: any[];
}

export interface Session {
  id: string;
  name: string;
  description: string;
  level: string;
  hostId: string;
  hostName: string;
  questions: any;
  status: string;
  currentQuestionIndex: number;
  createdAt: number;
  scheduledStartTime: number;
  scheduledEndTime: number;
  durationMinutes: number;
  lobbyOpenTime: number;
  maxParticipants: number;
  startedAt?: number;
  completedAt?: number;
  registeredUsers: any[];
  participants: any[];
}

export interface UserInfo {
  userId: string;
  username: string;
  displayName: string;
}

const LOBBY_OPEN_MINUTES = 15;

/**
 * Generate unique session ID
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculate session time fields
 */
export function calculateSessionTimes(scheduledStartTime: number, durationMinutes: number) {
  return {
    scheduledEndTime: scheduledStartTime + (durationMinutes * 60 * 1000),
    lobbyOpenTime: scheduledStartTime - (LOBBY_OPEN_MINUTES * 60 * 1000),
  };
}

/**
 * Format a database row to Session object
 * This eliminates 5x duplication in the controller
 */
export function formatSessionResponse(
  row: SessionRow,
  registeredUsers: any[] = [],
  participants: any[] = []
): Session {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    level: row.level,
    hostId: row.host_id,
    hostName: row.host_name,
    questions: row.questions,
    status: row.status,
    currentQuestionIndex: row.current_question_index,
    createdAt: parseInt(row.created_at),
    scheduledStartTime: parseInt(row.scheduled_start_time),
    scheduledEndTime: parseInt(row.scheduled_end_time),
    durationMinutes: row.duration_minutes,
    lobbyOpenTime: parseInt(row.lobby_open_time),
    maxParticipants: row.max_participants,
    startedAt: row.started_at ? parseInt(row.started_at) : undefined,
    completedAt: row.completed_at ? parseInt(row.completed_at) : undefined,
    registeredUsers,
    participants,
  };
}

/**
 * Format registered users from database
 */
export function formatRegisteredUsers(users: any[]): any[] {
  return (users || []).map((u: any) => ({
    ...u,
    registeredAt: parseInt(u.registeredAt),
  }));
}

/**
 * Format participants from database
 */
export function formatParticipants(participants: any[]): any[] {
  return (participants || []).map((p: any) => ({
    ...p,
    joinedAt: parseInt(p.joinedAt),
  }));
}

/**
 * Get user info by ID
 * This eliminates 3x duplication in the controller
 */
export async function getUserInfo(userId: string): Promise<UserInfo | null> {
  const result = await pool.query(
    'SELECT id, username, display_name FROM users WHERE id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return {
    userId: result.rows[0].id,
    username: result.rows[0].username,
    displayName: result.rows[0].display_name,
  };
}

/**
 * Calculate score for a participant's answers
 */
export function calculateScore(answers: any[], questions: any[]): number {
  let score = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== null && answers[i] === questions[i]?.correctAnswer) {
      score++;
    }
  }
  return score;
}

/**
 * Parse questions from database (handles string or object)
 */
export function parseQuestions(questions: any): any[] {
  return typeof questions === 'string' ? JSON.parse(questions) : questions;
}

/**
 * Parse answers from database (handles string or object)
 */
export function parseAnswers(answers: any): any[] {
  return typeof answers === 'string' ? JSON.parse(answers) : answers;
}
