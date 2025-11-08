/**
 * ============================================================================
 * TYPE ENUMS & CONSTANTS
 * ============================================================================
 * These enums provide type safety and make it clear what values are valid.
 * They also improve AI readability by making the domain model explicit.
 */

/**
 * Educational level for PAES mathematics
 * M1 = First year of middle education
 * M2 = Second year of middle education
 */
export type Level = 'M1' | 'M2';

/**
 * Question difficulty levels
 */
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'extreme';

/**
 * Mathematics subject areas in PAES
 */
export type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';

/**
 * Quiz modes
 * - zen: Untimed, focused practice mode with breathing intro
 * - rapidfire: Timed practice mode with countdown
 */
export type QuizMode = 'zen' | 'rapidfire';

/**
 * User role types
 * - student: Regular user who can take quizzes and join sessions
 * - admin: Administrator who can create and manage sessions
 */
export type UserRole = 'student' | 'admin';

/**
 * Live session status lifecycle
 * - scheduled: Session is scheduled for future, lobby not open yet
 * - lobby: Lobby is open, users can join before session starts
 * - active: Session is in progress
 * - completed: Session has finished
 * - cancelled: Session was cancelled by admin
 */
export type SessionStatus = 'scheduled' | 'lobby' | 'active' | 'completed' | 'cancelled';

/**
 * Skill mastery level based on practice performance
 * - not-started: No attempts on questions using this skill
 * - learning: Some attempts but not mastered (accuracy < 80% or < 3 attempts)
 * - mastered: High accuracy (≥80%) with sufficient attempts (≥3)
 */
export type MasteryLevel = 'not-started' | 'learning' | 'mastered';

/**
 * Visual data types for question rendering
 */
export type VisualDataType = 'graph' | 'geometry' | 'table' | 'diagram';

/**
 * Question rendering modes
 * - question-only: Show only the question text
 * - with-options: Show question with answer options
 * - with-explanation: Show question with explanation
 * - full: Show question with options, feedback, and explanation
 */
export type QuestionRenderMode = 'question-only' | 'with-options' | 'with-explanation' | 'full';

/**
 * ============================================================================
 * CORE DOMAIN TYPES
 * ============================================================================
 */

export interface Question {
  id: string;
  topic: string;
  level: Level;
  question: string;
  // LaTeX version of question (optional, if present will render as math)
  questionLatex?: string;
  options: string[];
  // LaTeX versions of options (optional)
  optionsLatex?: string[];
  correctAnswer: number;
  explanation: string;
  // LaTeX version of explanation (optional)
  explanationLatex?: string;
  difficulty: DifficultyLevel;
  // Subject area for better categorization
  subject: Subject;
  // Skills required to solve this problem (from skillTaxonomy.ts)
  skills: string[];
  // Additional rendering metadata
  visualData?: {
    type: VisualDataType;
    data: any;
  };
}

export interface UserProgress {
  questionsAnswered: number;
  correctAnswers: number;
  topicProgress: Record<string, { total: number; correct: number }>;
}

export interface QuestionAttempt {
  questionId: string;
  question: string;
  topic: string;
  level: Level;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timestamp: number;
  options: string[];
  explanation: string;
  difficulty: DifficultyLevel;
}

// User authentication types
export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: number;
  currentStreak?: number;
  longestStreak?: number;
  lastPracticeDate?: string | null;
}

// Streak data type
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
}

// Registration for scheduled ensayos
export interface SessionRegistration {
  userId: string;
  username: string;
  displayName: string;
  registeredAt: number;
}

// Live practice session types (Ensayo PAES)
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

export interface SessionParticipant {
  userId: string;
  username: string;
  displayName: string;
  answers: (number | null)[];
  score: number;
  joinedAt: number;
}

export interface LiveSessionAnswer {
  sessionId: string;
  userId: string;
  questionIndex: number;
  answer: number;
  timestamp: number;
}
