/**
 * ============================================================================
 * CENTRALIZED TYPE EXPORTS
 * ============================================================================
 *
 * Single entry point for all types in the application.
 * Import from '@/lib/types' to access any type.
 *
 * For better organization and tree-shaking, you can also import directly:
 * - Core types: '@/lib/types/core'
 * - Practice types: '@/lib/types/practice'
 * - Skills types: '@/lib/types/skills'
 * - Sessions types: '@/lib/types/sessions'
 * - Admin types: '@/lib/types/admin'
 * - API types: '@/lib/types/api'
 * - Auth types: '@/lib/types/auth'
 * - Geometry types: '@/lib/types/geometry'
 */

// ============================================================================
// CORE DOMAIN TYPES
// ============================================================================
export type {
  // Type enums
  Level,
  DifficultyLevel,
  Subject,
  QuizMode,
  UserRole,
  SessionStatus,
  MasteryLevel,
  VisualDataType,
  QuestionRenderMode,
  // Core entities
  Question,
  User,
  QuestionAttempt,
  UserProgress,
  StreakData,
} from './core';

// ============================================================================
// PRACTICE & QUIZ TYPES
// ============================================================================
export type {
  QuizProps,
  QuizHistoryResponse,
  RapidFireState,
  RapidFireScore,
} from './practice';

// ============================================================================
// SKILLS & PROGRESS TYPES
// ============================================================================
export type {
  Competency,
  Skill,
  EnhancedSkill,
  SkillProgress,
  SkillProgressSummary,
  SkillsDisplayProps,
} from './skills';

// ============================================================================
// LIVE SESSIONS TYPES
// ============================================================================
export type {
  SessionRegistration,
  SessionParticipant,
  LiveSession,
  LiveSessionAnswer,
  CreateSessionData,
  UpdateSessionData,
  SessionsResponse,
  SessionResponse,
  MessageResponse,
} from './sessions';

// ============================================================================
// ADMIN FEATURE TYPES
// ============================================================================
export type {
  PDFUploadStatus,
  PDFUpload,
  QuestionWithMetadata,
  UserWithMetadata,
} from './admin';

// ============================================================================
// API CLIENT TYPES
// ============================================================================
export type {
  ApiError,
  ApiResponse,
} from './api';

// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================
export type {
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  RefreshToken,
  AuthResponse,
  AuthResult,
} from './auth';

// ============================================================================
// GEOMETRY RENDERING TYPES
// ============================================================================
export type {
  GeometryFigureType,
  GeometryFigure,
  Triangle,
  Rectangle,
  Circle,
  Point,
  Line,
  Polygon,
  GeometryFigureUnion,
  QuestionRendererProps,
} from './geometry';

// ============================================================================
// SUBSCRIPTION & PLAN TYPES
// ============================================================================
export type {
  Plan,
  SubscriptionStatus,
  Subscription,
  UserWithSubscription,
  CreatePlanRequest,
  UpdatePlanRequest,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  GetUsersResponse,
  GetPlansResponse,
  GetUserSubscriptionsResponse,
  PlanResponse,
  SubscriptionResponse,
} from './subscription';
