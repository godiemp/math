/**
 * @deprecated This file is DEPRECATED and should NOT be used.
 *
 * ⚠️ WARNING: This localStorage-based session management is obsolete.
 *
 * Issues with this approach:
 * - Data only stored in browser localStorage (lost on clear/refresh)
 * - No synchronization with backend database
 * - Multi-device sync impossible
 * - Conflicts with PostgreSQL-based session system
 *
 * ✅ Use instead: lib/sessionApi.ts (which uses backend API endpoints)
 *
 * This file is kept for reference only. All live session functionality
 * now uses the backend API at /api/sessions.
 */

import { LiveSession, SessionParticipant, SessionRegistration, Question, User } from './types';
import { getRandomQuestions, getOfficialPAESQuestions } from './questions';

const SESSIONS_STORAGE_KEY = 'paes-live-sessions';
const LOBBY_OPEN_MINUTES = 15; // Lobby opens 15 minutes before start

export function getAllSessions(): LiveSession[] {
  if (typeof window === 'undefined') return [];
  const sessionsJson = localStorage.getItem(SESSIONS_STORAGE_KEY);
  if (!sessionsJson) return [];

  const sessions = JSON.parse(sessionsJson);

  // Validate and fix sessions with missing properties (for backward compatibility)
  return sessions.map((session: any) => ({
    ...session,
    registeredUsers: session.registeredUsers || [],
    participants: session.participants || [],
  }));
}

function saveSessions(sessions: LiveSession[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
}

// Admin function to create scheduled sessions
export function createScheduledSession(
  name: string,
  description: string,
  level: 'M1' | 'M2',
  host: User,
  scheduledStartTime: number,
  durationMinutes: number,
  questionCount: number = 10,
  maxParticipants: number = 1000000
): LiveSession {
  const sessions = getAllSessions();

  // Use official PAES distribution for standard formats:
  // M1: 60 questions (17 números, 17 álgebra, 14 geometría, 12 probabilidad)
  // M2: 50 questions (12 números, 16 álgebra, 12 geometría, 10 probabilidad)
  let questions: Question[];
  if ((level === 'M1' && questionCount === 60) || (level === 'M2' && questionCount === 50)) {
    questions = getOfficialPAESQuestions(level);
  } else {
    // For custom question counts, use random selection
    questions = getRandomQuestions(level, questionCount);
  }

  const scheduledEndTime = scheduledStartTime + (durationMinutes * 60 * 1000);
  const lobbyOpenTime = scheduledStartTime - (LOBBY_OPEN_MINUTES * 60 * 1000);

  const newSession: LiveSession = {
    id: generateSessionId(),
    name,
    description,
    level,
    hostId: host.id,
    hostName: host.displayName,
    questions,
    registeredUsers: [],
    participants: [],
    status: 'scheduled',
    currentQuestionIndex: 0,
    createdAt: Date.now(),
    scheduledStartTime,
    scheduledEndTime,
    durationMinutes,
    lobbyOpenTime,
    maxParticipants,
  };

  sessions.push(newSession);
  saveSessions(sessions);

  return newSession;
}

export function getSession(sessionId: string): LiveSession | null {
  const sessions = getAllSessions();
  return sessions.find(s => s.id === sessionId) || null;
}

export function joinSession(sessionId: string, user: User): { success: boolean; error?: string; session?: LiveSession } {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) {
    return { success: false, error: 'Ensayo no encontrado' };
  }

  const session = sessions[sessionIndex];

  // Check if session is completed or cancelled
  if (session.status === 'completed') {
    return { success: false, error: 'El ensayo ya ha terminado' };
  }

  if (session.status === 'cancelled') {
    return { success: false, error: 'El ensayo ha sido cancelado' };
  }

  // Check if lobby is open or session is active (allow joining)
  if (session.status === 'scheduled') {
    return { success: false, error: 'El lobby aún no está abierto. Regístrate primero o espera a que se abra.' };
  }

  // Check if session is already full
  if (session.participants.length >= session.maxParticipants) {
    return { success: false, error: 'El ensayo está lleno' };
  }

  // Check if user is already in the session
  if (session.participants.some(p => p.userId === user.id)) {
    return { success: true, session };
  }

  // Add participant (works for both lobby and active status - allowing late joins)
  const participant: SessionParticipant = {
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    answers: new Array(session.questions.length).fill(null),
    score: 0,
    joinedAt: Date.now(),
  };

  session.participants.push(participant);
  sessions[sessionIndex] = session;
  saveSessions(sessions);

  return { success: true, session };
}

export function leaveSession(sessionId: string, userId: string): void {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) return;

  const session = sessions[sessionIndex];

  // Remove participant
  session.participants = session.participants.filter(p => p.userId !== userId);

  // If no participants left, delete the session
  if (session.participants.length === 0) {
    sessions.splice(sessionIndex, 1);
  } else {
    sessions[sessionIndex] = session;
  }

  saveSessions(sessions);
}

export function submitAnswer(sessionId: string, userId: string, questionIndex: number, answer: number): void {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) return;

  const session = sessions[sessionIndex];
  const participant = session.participants.find(p => p.userId === userId);

  if (participant) {
    participant.answers[questionIndex] = answer;
    sessions[sessionIndex] = session;
    saveSessions(sessions);
  }
}


export function getScheduledSessions(): LiveSession[] {
  return getAllSessions().filter(s => s.status === 'scheduled');
}

export function getActiveSessions(): LiveSession[] {
  return getAllSessions().filter(s => s.status === 'active');
}

export function getAllAvailableSessions(): LiveSession[] {
  return getAllSessions().filter(s =>
    s.status === 'scheduled' || s.status === 'lobby' || s.status === 'active'
  );
}

// Register user for a scheduled ensayo
export function registerForSession(sessionId: string, user: User): { success: boolean; error?: string } {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) {
    return { success: false, error: 'Ensayo no encontrado' };
  }

  const session = sessions[sessionIndex];

  // Can only register for scheduled sessions
  if (session.status !== 'scheduled') {
    return { success: false, error: 'Solo puedes registrarte para ensayos programados' };
  }

  // Check if already registered
  if (session.registeredUsers.some(r => r.userId === user.id)) {
    return { success: true }; // Already registered, return success
  }

  // Check if registration would exceed max participants
  if (session.registeredUsers.length >= session.maxParticipants) {
    return { success: false, error: 'El ensayo está lleno' };
  }

  // Add registration
  const registration: SessionRegistration = {
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    registeredAt: Date.now(),
  };

  session.registeredUsers.push(registration);
  sessions[sessionIndex] = session;
  saveSessions(sessions);

  return { success: true };
}

// Unregister user from a scheduled ensayo
export function unregisterFromSession(sessionId: string, userId: string): { success: boolean; error?: string } {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) {
    return { success: false, error: 'Ensayo no encontrado' };
  }

  const session = sessions[sessionIndex];

  // Remove registration
  session.registeredUsers = session.registeredUsers.filter(r => r.userId !== userId);
  sessions[sessionIndex] = session;
  saveSessions(sessions);

  return { success: true };
}

// Get all sessions a user is registered for
export function getUserRegisteredSessions(userId: string): LiveSession[] {
  return getAllSessions().filter(s =>
    s.registeredUsers.some(r => r.userId === userId)
  );
}

// Auto-update session status based on scheduled times
export function updateSessionStatuses(): void {
  const sessions = getAllSessions();
  const now = Date.now();
  let updated = false;

  sessions.forEach(session => {
    // Open lobby for scheduled sessions when lobby open time is reached
    if (session.status === 'scheduled' && session.lobbyOpenTime && now >= session.lobbyOpenTime) {
      session.status = 'lobby';
      updated = true;
    }

    // Auto-start lobby sessions when scheduled start time is reached
    if (session.status === 'lobby' && now >= session.scheduledStartTime) {
      session.status = 'active';
      session.startedAt = now;
      updated = true;
    }

    // Auto-complete active sessions that have reached end time
    if (session.status === 'active' && now >= session.scheduledEndTime) {
      // Calculate final scores
      session.participants.forEach(participant => {
        let score = 0;
        participant.answers.forEach((answer, index) => {
          if (answer !== null && answer === session.questions[index].correctAnswer) {
            score++;
          }
        });
        participant.score = score;
      });

      session.status = 'completed';
      session.completedAt = now;
      updated = true;
    }
  });

  if (updated) {
    saveSessions(sessions);
  }
}

export function getUserSessions(userId: string): LiveSession[] {
  return getAllSessions().filter(s =>
    s.participants.some(p => p.userId === userId)
  );
}

// Admin function to update a scheduled session
export function updateScheduledSession(
  sessionId: string,
  updates: {
    name?: string;
    description?: string;
    level?: 'M1' | 'M2';
    scheduledStartTime?: number;
    durationMinutes?: number;
    questionCount?: number;
    maxParticipants?: number;
  }
): { success: boolean; error?: string } {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) {
    return { success: false, error: 'Sesión no encontrada' };
  }

  const session = sessions[sessionIndex];

  if (session.status !== 'scheduled') {
    return { success: false, error: 'Solo se pueden editar sesiones que aún no han comenzado' };
  }

  // Apply updates
  if (updates.name) session.name = updates.name;
  if (updates.description !== undefined) session.description = updates.description;
  if (updates.level) session.level = updates.level;
  if (updates.scheduledStartTime) session.scheduledStartTime = updates.scheduledStartTime;
  if (updates.maxParticipants) session.maxParticipants = updates.maxParticipants;

  // Update duration and recalculate end time
  if (updates.durationMinutes) {
    session.durationMinutes = updates.durationMinutes;
    session.scheduledEndTime = session.scheduledStartTime + (updates.durationMinutes * 60 * 1000);
  } else if (updates.scheduledStartTime) {
    // If start time changed but not duration, recalculate end time with existing duration
    session.scheduledEndTime = updates.scheduledStartTime + (session.durationMinutes * 60 * 1000);
  }

  // Recalculate lobby open time if start time changed
  if (updates.scheduledStartTime) {
    session.lobbyOpenTime = updates.scheduledStartTime - (LOBBY_OPEN_MINUTES * 60 * 1000);
  }

  // If question count or level changed, regenerate questions
  if (updates.questionCount || updates.level) {
    const count = updates.questionCount || session.questions.length;
    const level = updates.level || session.level;

    // Use official PAES distribution for standard formats
    if ((level === 'M1' && count === 60) || (level === 'M2' && count === 50)) {
      session.questions = getOfficialPAESQuestions(level);
    } else {
      session.questions = getRandomQuestions(level, count);
    }

    // Reset all participant answers
    session.participants.forEach(p => {
      p.answers = new Array(count).fill(null);
    });
  }

  sessions[sessionIndex] = session;
  saveSessions(sessions);

  return { success: true };
}

// Admin function to delete a session
export function deleteSession(sessionId: string): { success: boolean; error?: string } {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) {
    return { success: false, error: 'Sesión no encontrada' };
  }

  sessions.splice(sessionIndex, 1);
  saveSessions(sessions);

  return { success: true };
}

// Admin function to cancel a scheduled session
export function cancelSession(sessionId: string): { success: boolean; error?: string } {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) {
    return { success: false, error: 'Sesión no encontrada' };
  }

  const session = sessions[sessionIndex];

  if (session.status === 'completed') {
    return { success: false, error: 'No se puede cancelar una sesión completada' };
  }

  session.status = 'cancelled';
  sessions[sessionIndex] = session;
  saveSessions(sessions);

  return { success: true };
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
