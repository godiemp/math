import { Request } from 'express';

/**
 * Backend type definitions
 * Note: These are duplicated from frontend /lib/types for Docker build isolation.
 * Keep in sync with frontend types manually.
 */

export interface QuestionImage {
  id: string;
  url: string;
  description: string;
  type: 'diagram' | 'table' | 'graph' | 'formula' | 'other';
  position?: 'question' | 'option' | 'explanation';
}

export interface Question {
  id: string;
  topic: string;
  level: 'M1' | 'M2';
  questionLatex: string;
  // Options in LaTeX format (pure LaTeX without $ delimiters)
  options: string[];
  correctAnswer: number;
  // Explanation in LaTeX format (full explanation with LaTeX)
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  skills: string[];
  images?: QuestionImage[];
  visualData?: {
    type: 'graph' | 'geometry' | 'table' | 'diagram';
    data: any;
  };
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: 'student' | 'admin';
  createdAt: number;
  updatedAt: number;
  currentStreak?: number;
  longestStreak?: number;
  lastPracticeDate?: string | null;
  targetLevel?: 'M1_ONLY' | 'M1_AND_M2';
  hasSeenWelcome?: boolean;
  emailVerified?: boolean;
  cookieConsent?: 'accepted' | 'declined' | null;
}

export interface PDFUpload {
  id: number;
  filename: string;
  fileSize: number;
  uploadedBy: string;
  status: 'processing' | 'completed' | 'failed';
  questionsExtracted: number;
  errorMessage?: string;
  uploadedAt: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshToken {
  id: number;
  userId: string;
  token: string;
  expiresAt: number;
  createdAt: number;
  revoked: boolean;
}

// Streak types
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
}

// Subscription and plan types
export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  durationDays: number;
  trialDurationDays: number;
  features: string[];
  isActive: boolean;
  displayOrder: number;
  createdAt: number;
  updatedAt: number;
}

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

export interface Subscription {
  id: number;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  startedAt: number;
  expiresAt?: number;
  trialEndsAt?: number;
  cancelledAt?: number;
  autoRenew: boolean;
  paymentMethod?: string;
  lastPaymentAt?: number;
  createdAt: number;
  updatedAt: number;
}

export interface UserWithSubscription extends User {
  subscription?: Subscription;
  plan?: Plan;
}

export interface CreatePlanRequest {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  durationDays: number;
  trialDurationDays?: number;
  features: string[];
  displayOrder?: number;
}

export interface UpdatePlanRequest {
  name?: string;
  description?: string;
  price?: number;
  durationDays?: number;
  trialDurationDays?: number;
  features?: string[];
  isActive?: boolean;
  displayOrder?: number;
}

export interface CreateSubscriptionRequest {
  userId: string;
  planId: string;
  startTrial?: boolean;
  paymentMethod?: string;
}

export interface UpdateSubscriptionRequest {
  status?: SubscriptionStatus;
  expiresAt?: number;
  autoRenew?: boolean;
  paymentMethod?: string;
}

// Payment types
export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'refunded' | 'in_process';

export interface Payment {
  id: number;
  userId: string;
  subscriptionId?: number;
  planId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentGateway: string;
  gatewayPaymentId?: string;
  gatewayPreferenceId?: string;
  status: PaymentStatus;
  statusDetail?: string;
  transactionAmount?: number;
  netAmount?: number;
  feeAmount?: number;
  payerEmail?: string;
  payerId?: string;
  metadata?: any;
  paymentDate?: number;
  createdAt: number;
  updatedAt: number;
}

export interface CreatePaymentPreferenceRequest {
  userId: string;
  planId: string;
}

export interface PaymentWebhookData {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: string;
}

// Backend metadata types
// Question already has metadata fields, so this is just an alias
export type QuestionWithMetadata = Question;

export interface UserWithMetadata extends User {
  updatedAt: number;
}

// Type alias for authenticated requests
// Note: Request.user is already typed as TokenPayload via global declaration in middleware/auth.ts
export type AuthRequest = Request;

// ========================================
// USER KNOWLEDGE DECLARATIONS TYPES
// ========================================

export type DeclarationType = 'unit' | 'subsection' | 'skill';

export interface KnowledgeDeclaration {
  id?: number;
  userId: string;
  level: 'M1' | 'M2';
  declarationType: DeclarationType;
  itemCode: string;
  knows: boolean;
  declaredAt: number;
  updatedAt: number;
}

export interface KnowledgeDeclarationSummary {
  totalUnits: number;
  knownUnits: number;
  totalSubsections: number;
  knownSubsections: number;
  totalSkills: number;
  knownSkills: number;
}

export interface GetKnowledgeDeclarationsResponse {
  declarations: KnowledgeDeclaration[];
  summary: KnowledgeDeclarationSummary;
}

export interface UpdateKnowledgeDeclarationRequest {
  type: DeclarationType;
  itemCode: string;
  knows: boolean;
  cascade?: boolean;
}

export interface UpdateKnowledgeDeclarationsRequest {
  declarations: UpdateKnowledgeDeclarationRequest[];
}

export interface UpdateKnowledgeDeclarationsResponse {
  success: boolean;
  message: string;
  declarations: KnowledgeDeclaration[];
  summary: KnowledgeDeclarationSummary;
}
