/**
 * ============================================================================
 * SUBSCRIPTION & PLAN TYPES
 * ============================================================================
 *
 * Types for subscription plans and user subscriptions.
 * These mirror the backend types for consistency.
 *
 * Route association: /admin/users
 */

import { User } from './core';

/**
 * Subscription Plan
 * Defines the available subscription tiers
 */
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

/**
 * Subscription status types
 */
export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

/**
 * User Subscription
 * Tracks a user's subscription to a plan
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
 * User with subscription information
 * Extended user type that includes subscription and plan details
 */
export interface UserWithSubscription extends User {
  subscription?: Subscription;
  plan?: Plan;
}

/**
 * ============================================================================
 * API REQUEST TYPES
 * ============================================================================
 */

/**
 * Create plan request
 */
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

/**
 * Update plan request
 */
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

/**
 * Create subscription request
 */
export interface CreateSubscriptionRequest {
  userId: string;
  planId: string;
  startTrial?: boolean;
  paymentMethod?: string;
}

/**
 * Update subscription request
 */
export interface UpdateSubscriptionRequest {
  status?: SubscriptionStatus;
  expiresAt?: number;
  autoRenew?: boolean;
  paymentMethod?: string;
}

/**
 * ============================================================================
 * API RESPONSE TYPES
 * ============================================================================
 */

/**
 * Get users response
 */
export interface GetUsersResponse {
  success: boolean;
  users: UserWithSubscription[];
}

/**
 * Get plans response
 */
export interface GetPlansResponse {
  success: boolean;
  plans: Plan[];
}

/**
 * Get user subscriptions response
 */
export interface GetUserSubscriptionsResponse {
  success: boolean;
  subscriptions: Subscription[];
}

/**
 * Create/update plan response
 */
export interface PlanResponse {
  success: boolean;
  plan?: Plan;
  message?: string;
}

/**
 * Create/update subscription response
 */
export interface SubscriptionResponse {
  success: boolean;
  subscription?: Subscription;
  message?: string;
}
