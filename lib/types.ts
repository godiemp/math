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
  subject: Subject;
  skills: string[];
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

/**
 * ============================================================================
 * SKILL TAXONOMY & PROGRESS TYPES
 * ============================================================================
 */

/**
 * PAES mathematical competencies
 * These are the four core competencies evaluated in the PAES exam
 */
export type Competency = 'Resolver' | 'Modelar' | 'Representar' | 'Argumentar';

/**
 * Base skill from skill taxonomy
 */
export interface Skill {
  id: string;
  name: string;
  description: string;
  topic: Subject;
  parentSkill?: string;
}

/**
 * Enhanced skill with metadata and statistics
 * Extends the base Skill with question counts, difficulty analysis, and learning paths
 */
export interface EnhancedSkill extends Skill {
  // Statistics from question analysis
  questionCount: number;
  m1QuestionCount: number;
  m2QuestionCount: number;

  // Difficulty distribution
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  averageDifficulty: number; // 1 = easy, 2 = medium, 3 = hard

  // Competencies this skill supports
  competencies: Competency[];

  // Learning metadata
  prerequisites: string[]; // Skills that should be learned first
  relatedSkills: string[]; // Skills commonly used together

  // Curriculum integration
  isCore: boolean; // Is this a fundamental skill?
  level: 'M1' | 'M2' | 'Both'; // Which level primarily uses this skill
}

/**
 * User's progress on a specific skill
 */
export interface SkillProgress {
  skillId: string;
  skill: EnhancedSkill;
  attemptsCount: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number; // 0-100
  lastAttempted?: number; // timestamp
  masteryLevel: MasteryLevel;
}

/**
 * Summary of user's progress across all skills
 */
export interface SkillProgressSummary {
  mastered: SkillProgress[];
  learning: SkillProgress[];
  notStarted: SkillProgress[];
  totalSkills: number;
  totalAttempts: number;
  overallAccuracy: number;
}

/**
 * ============================================================================
 * API REQUEST & RESPONSE TYPES
 * ============================================================================
 */

/**
 * Generic API error structure
 */
export interface ApiError {
  error: string;
  statusCode: number;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

/**
 * Session API - Create session request
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
 * Session API - Update session request
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
 * Session API - Get all sessions response
 */
export interface SessionsResponse {
  success: boolean;
  count: number;
  sessions: LiveSession[];
}

/**
 * Session API - Get single session response
 */
export interface SessionResponse {
  success: boolean;
  session: LiveSession;
}

/**
 * Session API - Generic message response
 */
export interface MessageResponse {
  success: boolean;
  message?: string;
}

/**
 * Quiz API - Get history response
 */
export interface QuizHistoryResponse {
  history: QuestionAttempt[];
  count: number;
}

/**
 * Quiz API - Save attempt(s) response
 */
export interface SaveQuizAttemptResponse {
  message: string;
  attemptId?: number;
  attemptIds?: number[];
  count?: number;
}

/**
 * Quiz API - Get statistics response
 */
export interface QuizStatsResponse {
  overall: Array<{
    level: Level;
    total: number;
    correct: number;
    percentage: number;
  }>;
  byDifficulty: Array<{
    difficulty: DifficultyLevel;
    total: number;
    correct: number;
    percentage: number;
  }>;
  bySubject: Array<{
    subject: string;
    total: number;
    correct: number;
    percentage: number;
  }>;
}

/**
 * ============================================================================
 * AUTHENTICATION TYPES
 * ============================================================================
 */

/**
 * User registration request
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

/**
 * User login request
 */
export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Stored refresh token in database
 */
export interface RefreshToken {
  id: number;
  userId: string;
  token: string;
  expiresAt: number;
  createdAt: number;
  revoked: boolean;
}

/**
 * Authentication response with tokens
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

/**
 * Auth operation result
 */
export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

/**
 * ============================================================================
 * PDF UPLOAD TYPES
 * ============================================================================
 */

/**
 * PDF upload processing status
 */
export type PDFUploadStatus = 'processing' | 'completed' | 'failed';

/**
 * PDF upload record
 */
export interface PDFUpload {
  id: number;
  filename: string;
  fileSize: number;
  uploadedBy: string;
  status: PDFUploadStatus;
  questionsExtracted: number;
  errorMessage?: string;
  uploadedAt: number;
}

/**
 * ============================================================================
 * COMPONENT PROP TYPES
 * ============================================================================
 */

/**
 * Props for Quiz component
 */
export interface QuizProps {
  questions: Question[];
  level: Level;
  subject?: Subject;
  quizMode?: QuizMode;
  difficulty?: DifficultyLevel;
}

/**
 * Rapid Fire quiz state tracking
 */
export interface RapidFireState {
  hintsUsed: number[];          // Array of question indices where hints were used
  pausesUsed: number;
  pausesRemaining: number;
  livesRemaining: number;       // For hard/extreme modes
  wrongAnswerCount: number;     // Track wrong answers for lives system
  currentStreak: number;        // Current consecutive correct answers
  longestStreak: number;        // Longest streak in this quiz
  timePerQuestion: number[];    // Time spent on each question
  isPaused: boolean;
  pauseTimeRemaining: number;   // Time remaining in current pause
}

/**
 * Rapid Fire scoring breakdown
 */
export interface RapidFireScore {
  basePoints: number;           // Points from correct answers
  speedBonus: number;           // Bonus from completing quickly
  streakBonus: number;          // Bonus from consecutive correct answers
  perfectBonus: number;         // Bonus for perfect score
  hintPenalty: number;          // Points lost from using hints
  totalPoints: number;          // Final score
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;             // Percentage
  timeUsed: number;             // Total time used in seconds
  timeSaved: number;            // Time saved vs allocated
  passed: boolean;              // Met passing percentage for difficulty
}

/**
 * Props for SkillsDisplay component
 */
export interface SkillsDisplayProps {
  attempts: QuestionAttempt[];
  level?: Level;
  showRecommendations?: boolean;
}

/**
 * Props for QuestionRenderer component
 */
export interface QuestionRendererProps {
  question: Question;
  mode?: QuestionRenderMode;
  selectedAnswer?: number | null;
  showFeedback?: boolean;
  onAnswerSelect?: (answerIndex: number) => void;
  disabled?: boolean;
  compact?: boolean;
  quizMode?: 'zen' | 'rapidfire';
  onRequestAIHelp?: () => void;
}

/**
 * ============================================================================
 * BACKEND-SPECIFIC TYPES
 * ============================================================================
 */

/**
 * Question with backend metadata (for database storage)
 */
export interface QuestionWithMetadata extends Question {
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
}

/**
 * User with backend metadata (for database storage)
 */
export interface UserWithMetadata extends User {
  updatedAt: number;
}

/**
 * ============================================================================
 * GEOMETRY CANVAS TYPES
 * ============================================================================
 */

/**
 * Geometry figure types for canvas rendering
 */
export type GeometryFigureType = 'triangle' | 'rectangle' | 'circle' | 'line' | 'point' | 'polygon';

/**
 * Base geometry figure
 */
export interface GeometryFigure {
  type: GeometryFigureType;
  label?: string;
  color?: string;
}

/**
 * Triangle figure
 */
export interface Triangle extends GeometryFigure {
  type: 'triangle';
  points: [number, number, number, number, number, number]; // x1,y1, x2,y2, x3,y3
  sideLabels?: [string?, string?, string?];
  angleLabels?: [string?, string?, string?];
}

/**
 * Rectangle figure
 */
export interface Rectangle extends GeometryFigure {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  labels?: {
    width?: string;
    height?: string;
  };
}

/**
 * Circle figure
 */
export interface Circle extends GeometryFigure {
  type: 'circle';
  cx: number;
  cy: number;
  radius: number;
  radiusLabel?: string;
}

/**
 * Point figure
 */
export interface Point extends GeometryFigure {
  type: 'point';
  x: number;
  y: number;
  label: string;
}

/**
 * Line figure
 */
export interface Line extends GeometryFigure {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
}

/**
 * Polygon figure
 */
export interface Polygon extends GeometryFigure {
  type: 'polygon';
  points: number[]; // Flat array [x1, y1, x2, y2, ...]
  vertexLabels?: string[];
}

/**
 * Union of all geometry figure types
 */
export type GeometryFigureUnion = Triangle | Rectangle | Circle | Point | Line | Polygon;
