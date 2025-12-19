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
 * PAES Competency Level for mathematics
 * M1 = Competencia Matemática 1 (basic competency)
 * M2 = Competencia Matemática 2 (advanced competency)
 *
 * Note: For school grade levels (1° Medio - 4° Medio), see GradeLevel in mineduc.ts
 * Lessons are assigned to grades via minEducOA field mappings.
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
  questionLatex: string;
  // Options in LaTeX format (pure LaTeX without $ delimiters)
  options: string[];
  correctAnswer: number;
  // Explanation in LaTeX format (full explanation with LaTeX)
  explanation: string;
  difficulty: DifficultyLevel;
  // Numeric difficulty score from 0.0 (easiest) to 1.0 (hardest)
  // Used by adaptive algorithm for fine-grained difficulty matching
  difficultyScore: number;
  // Subject area for better categorization
  subject: Subject;
  // Base mathematical operation (in LaTeX format)
  operacionBase?: string;
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
  targetLevel?: 'M1_ONLY' | 'M1_AND_M2';
  hasSeenWelcome?: boolean;
  emailVerified?: boolean;
  cookieConsent?: 'accepted' | 'declined' | null;
  subscription?: {
    id: number;
    userId: string;
    planId: string;
    status: 'trial' | 'active' | 'expired' | 'cancelled';
    startedAt: number;
    expiresAt?: number;
    trialEndsAt?: number;
    cancelledAt?: number;
    autoRenew: boolean;
    paymentMethod?: string;
    lastPaymentAt?: number;
    createdAt: number;
    updatedAt: number;
  };
}

/**
 * Question attempt record
 * Tracks a user's answer to a specific question
 */
export interface QuestionAttempt {
  questionId: string;
  quizSessionId?: string | null; // ID of the quiz session this attempt belongs to
  questionLatex: string;
  topic: string;
  level: Level;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timestamp: number;
  // Options in LaTeX format
  options: string[];
  // Explanation in LaTeX format
  explanation: string;
  difficulty: DifficultyLevel;
  subject: Subject;
  skills: string[];
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

/**
 * ============================================================================
 * QGEN SYSTEM TYPES
 * ============================================================================
 * Types for the Question Generation (QGen) algorithm that creates progressive
 * learning sequences based on atomic skills, contexts, and templates.
 */

/**
 * Question goal type - the type of reasoning required
 * - compute: Perform a calculation
 * - compare: Compare two or more values
 * - justify: Explain or prove something
 * - model: Create a mathematical model
 * - interpret: Interpret a result or representation
 * - analyze: Break down a complex problem
 */
export type QuestionGoalType = 'compute' | 'compare' | 'justify' | 'model' | 'interpret' | 'analyze';

/**
 * Cognitive level for Bloom's taxonomy
 */
export type CognitiveLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

/**
 * Context category
 */
export type ContextCategory =
  | 'cooking'
  | 'geometry'
  | 'motion'
  | 'finance'
  | 'sports'
  | 'construction'
  | 'shopping'
  | 'travel'
  | 'science'
  | 'abstract';

/**
 * Variable type for template placeholders
 */
export type VariableType = 'number' | 'integer' | 'decimal' | 'fraction' | 'name' | 'object' | 'unit';

/**
 * Variable definition for contexts and templates
 */
export interface VariableDefinition {
  name: string;
  type: VariableType;
  min?: number;
  max?: number;
  step?: number;
  options?: string[]; // For categorical variables (names, objects)
  unit?: string;
  description?: string;
}

/**
 * Context - a real-life situation for problems
 */
export interface Context {
  id: string;
  name: string;
  description: string;
  category: ContextCategory;
  compatibleSkills: string[]; // Skill IDs that work with this context
  variables: VariableDefinition[]; // Available variables in this context
  createdAt: number;
  updatedAt: number;
  createdBy?: string;
}

/**
 * Goal - type of reasoning/question goal
 */
export interface Goal {
  id: string;
  name: string;
  description: string;
  type: QuestionGoalType;
  cognitiveLevel: CognitiveLevel;
  createdAt: number;
}

/**
 * Template constraint for value generation
 */
export interface TemplateConstraint {
  variable: string;
  condition: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'divisible-by' | 'prime';
  value: number | string;
}

/**
 * Question template
 */
export interface Template {
  id: string;
  name: string;
  templateText: string; // Text with {{variable}} placeholders
  templateLatex?: string; // LaTeX version with placeholders
  goalId: string;
  requiredSkills: string[]; // Skills needed to answer this question
  compatibleContexts: string[]; // Context IDs this template works with
  variables: VariableDefinition[]; // Variables used in this template
  constraints?: TemplateConstraint[]; // Constraints on variable values
  difficultyLevel: DifficultyLevel;
  createdAt: number;
  updatedAt: number;
  createdBy?: string;
}

/**
 * Goal-Skill mapping
 * Defines which goals fit which skill combinations
 */
export interface GoalSkillMapping {
  id: number;
  goalId: string;
  skillCombination: string[]; // Array of skill IDs
  minSkills: number; // Minimum skills needed
  maxSkills?: number; // Maximum skills allowed
  createdAt: number;
}

/**
 * Problem - combines multiple atomic skills
 */
export interface Problem {
  id: string;
  level: Level;
  subject: Subject;
  topic: string;
  skillIds: string[]; // Atomic skills combined in this problem
  title?: string;
  contextId?: string;
  generatedBy: 'qgen' | 'manual';
  createdAt: number;
  updatedAt: number;
  createdBy?: string;
  // Populated fields
  situations?: Situation[];
}

/**
 * Situation - specific instance within a problem with concrete values
 */
export interface Situation {
  id: string;
  problemId: string;
  contextId?: string;
  contextText: string; // The actual situation description
  contextLatex?: string;
  variableValues?: Record<string, any>; // Concrete values for variables
  visualData?: {
    type: VisualDataType;
    data: any;
  };
  images?: QuestionImage[];
  situationOrder: number; // Order within the problem
  createdAt: number;
  // Populated fields
  questions?: ProgressiveQuestion[];
}

/**
 * Progressive Question - individual question within a situation (n₁, n₂, n₃, etc.)
 */
export interface ProgressiveQuestion {
  id: string;
  situationId: string;
  templateId?: string;
  goalId?: string;
  questionIndex: number; // 1, 2, 3, ... for n₁, n₂, n₃
  question: string;
  questionLatex?: string;
  // Options in LaTeX format
  options: string[];
  correctAnswer: number;
  // Explanation in LaTeX format
  explanation?: string;
  difficulty?: DifficultyLevel;
  skillsTested: string[]; // Skills this specific question tests
  buildsOn?: string; // ID of previous question this builds upon
  createdAt: number;
}

/**
 * QGen Input - inputs for the question generation algorithm
 */
export interface QGenInput {
  targetSkills: string[]; // Atomic skills to practice
  contextLibrary: Context[]; // Available contexts
  templateLibrary: Template[]; // Available templates
  goalMap: GoalSkillMapping[]; // Goal-skill mappings
  numberOfQuestions: number; // How many questions to generate
  level: Level; // M1 or M2
  subject: Subject; // números, álgebra, geometría, probabilidad
}

/**
 * QGen Output - result of question generation
 */
export interface QGenOutput {
  problem: Problem;
  situation: Situation;
  questions: ProgressiveQuestion[]; // Ordered from n₁ to nₙ
}

/**
 * Value generator configuration
 */
export interface ValueGeneratorConfig {
  seed?: number; // For reproducible random generation
  avoidDuplicates?: boolean;
  preferSimpleValues?: boolean; // Prefer nice numbers (multiples of 5, 10, etc.)
}
