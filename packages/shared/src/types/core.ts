/**
 * Core domain types shared between web and mobile apps
 */

/**
 * User role types
 */
export type UserRole = 'student' | 'admin';

/**
 * Subscription status
 */
export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

/**
 * User subscription
 */
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

/**
 * User entity
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
  subscription?: Subscription;
}
