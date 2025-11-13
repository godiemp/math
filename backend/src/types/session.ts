/**
 * Session type definitions
 */

export type SessionStatus = 'scheduled' | 'lobby_open' | 'active' | 'completed' | 'cancelled';
export type SessionLevel = 'm1' | 'm2';

export interface SessionQuestion {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  skill?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface SessionUser {
  userId: string;
  username: string;
  displayName: string;
  registeredAt: number;
}

export interface SessionParticipant {
  userId: string;
  username: string;
  displayName: string;
  answers: number[];
  score: number;
  joinedAt: number;
}

export interface Session {
  id: string;
  name: string;
  description: string;
  level: SessionLevel;
  hostId: string;
  hostName: string;
  questions: SessionQuestion[];
  status: SessionStatus;
  currentQuestionIndex: number;
  createdAt: number;
  scheduledStartTime: number;
  scheduledEndTime: number;
  durationMinutes: number;
  lobbyOpenTime: number;
  maxParticipants: number;
  startedAt?: number;
  completedAt?: number;
  registeredUsers: SessionUser[];
  participants: SessionParticipant[];
}

/**
 * Database row type for sessions
 */
export interface SessionRow {
  id: string;
  name: string;
  description: string;
  level: string;
  host_id: string;
  host_name: string;
  questions: unknown; // JSONB field
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
  registered_users?: unknown;
  participants?: unknown;
}

/**
 * User row from database
 */
export interface UserRow {
  id: string;
  username: string;
  display_name: string;
  email: string;
  role: string;
}

/**
 * Transform database row to Session object
 */
export function rowToSession(row: SessionRow): Session {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    level: row.level as SessionLevel,
    hostId: row.host_id,
    hostName: row.host_name,
    questions: row.questions as SessionQuestion[],
    status: row.status as SessionStatus,
    currentQuestionIndex: row.current_question_index,
    createdAt: parseInt(row.created_at),
    scheduledStartTime: parseInt(row.scheduled_start_time),
    scheduledEndTime: parseInt(row.scheduled_end_time),
    durationMinutes: row.duration_minutes,
    lobbyOpenTime: parseInt(row.lobby_open_time),
    maxParticipants: row.max_participants,
    startedAt: row.started_at ? parseInt(row.started_at) : undefined,
    completedAt: row.completed_at ? parseInt(row.completed_at) : undefined,
    registeredUsers: row.registered_users
      ? (row.registered_users as Array<Record<string, unknown>>).map((u) => ({
          userId: String(u.userId),
          username: String(u.username),
          displayName: String(u.displayName),
          registeredAt: parseInt(String(u.registeredAt)),
        }))
      : [],
    participants: row.participants
      ? (row.participants as Array<Record<string, unknown>>).map((p) => ({
          userId: String(p.userId),
          username: String(p.username),
          displayName: String(p.displayName),
          answers: p.answers as number[],
          score: Number(p.score),
          joinedAt: parseInt(String(p.joinedAt)),
        }))
      : [],
  };
}
