import { LiveSession, SessionParticipant, Question, User } from './types';
import { getRandomQuestions } from './questions';

const SESSIONS_STORAGE_KEY = 'paes-live-sessions';

export function getAllSessions(): LiveSession[] {
  if (typeof window === 'undefined') return [];
  const sessionsJson = localStorage.getItem(SESSIONS_STORAGE_KEY);
  return sessionsJson ? JSON.parse(sessionsJson) : [];
}

function saveSessions(sessions: LiveSession[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
}

export function createSession(
  name: string,
  level: 'M1' | 'M2',
  host: User,
  questionCount: number = 10,
  maxParticipants: number = 20
): LiveSession {
  const sessions = getAllSessions();

  const questions = getRandomQuestions(level, questionCount);

  const newSession: LiveSession = {
    id: generateSessionId(),
    name,
    level,
    hostId: host.id,
    hostName: host.displayName,
    questions,
    participants: [],
    status: 'waiting',
    currentQuestionIndex: 0,
    createdAt: Date.now(),
    maxParticipants,
  };

  // Host automatically joins the session
  const hostParticipant: SessionParticipant = {
    userId: host.id,
    username: host.username,
    displayName: host.displayName,
    answers: new Array(questions.length).fill(null),
    score: 0,
    joinedAt: Date.now(),
    isReady: false,
  };

  newSession.participants.push(hostParticipant);

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
    return { success: false, error: 'Sesión no encontrada' };
  }

  const session = sessions[sessionIndex];

  // Check if session is already full
  if (session.participants.length >= session.maxParticipants) {
    return { success: false, error: 'La sesión está llena' };
  }

  // Check if session has already started or completed
  if (session.status !== 'waiting') {
    return { success: false, error: 'La sesión ya ha comenzado o terminado' };
  }

  // Check if user is already in the session
  if (session.participants.some(p => p.userId === user.id)) {
    return { success: true, session };
  }

  // Add participant
  const participant: SessionParticipant = {
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    answers: new Array(session.questions.length).fill(null),
    score: 0,
    joinedAt: Date.now(),
    isReady: false,
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

export function updateParticipantReady(sessionId: string, userId: string, isReady: boolean): void {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) return;

  const session = sessions[sessionIndex];
  const participant = session.participants.find(p => p.userId === userId);

  if (participant) {
    participant.isReady = isReady;
    sessions[sessionIndex] = session;
    saveSessions(sessions);
  }
}

export function startSession(sessionId: string): { success: boolean; error?: string } {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) {
    return { success: false, error: 'Sesión no encontrada' };
  }

  const session = sessions[sessionIndex];

  if (session.status !== 'waiting') {
    return { success: false, error: 'La sesión ya ha comenzado' };
  }

  session.status = 'active';
  session.startedAt = Date.now();
  sessions[sessionIndex] = session;
  saveSessions(sessions);

  return { success: true };
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

export function completeSession(sessionId: string): void {
  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex === -1) return;

  const session = sessions[sessionIndex];

  // Calculate scores for all participants
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
  session.completedAt = Date.now();
  sessions[sessionIndex] = session;
  saveSessions(sessions);
}

export function getActiveSessions(): LiveSession[] {
  return getAllSessions().filter(s => s.status === 'waiting' || s.status === 'active');
}

export function getUserSessions(userId: string): LiveSession[] {
  return getAllSessions().filter(s =>
    s.participants.some(p => p.userId === userId)
  );
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
