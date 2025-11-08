/**
 * ============================================================================
 * CORE DOMAIN TYPES
 * ============================================================================
 *
 * Core domain entities and enums used throughout the application.
 * These are the fundamental building blocks of the PAES math practice system.
 *
 * Route association: Used across all routes
 */

/**
 * ============================================================================
 * TYPE ENUMS
 * ============================================================================
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
 * CORE ENTITIES
 * ============================================================================
 */

/**
 * Question Image
 * Represents an image embedded in a question
 */
export interface QuestionImage {
  id: string;
  url: string;
  description: string;
  type: 'diagram' | 'table' | 'graph' | 'formula' | 'other';
  position?: 'question' | 'option' | 'explanation';
}

/**
 * Question entity
 * Represents a single math question with all its metadata
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
  // Embedded images (diagrams, tables, etc.)
  images?: QuestionImage[];
  // Additional rendering metadata
  visualData?: {
    type: VisualDataType;
    data: any;
  };
}

/**
 * User entity
 * Represents a registered user in the system
 */
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

/**
 * Question attempt record
 * Tracks a user's answer to a specific question
 */
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

/**
 * User progress summary
 * High-level overview of user's overall performance
 */
export interface UserProgress {
  questionsAnswered: number;
  correctAnswers: number;
  topicProgress: Record<string, { total: number; correct: number }>;
}

/**
 * Streak data
 * Tracks user's daily practice streak
 */
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
}
