/**
 * ============================================================================
 * PAYMENT TYPES
 * ============================================================================
 *
 * Types for payments and MercadoPago integration.
 * These mirror the backend types for consistency.
 */

import { Plan } from './subscription';

/**
 * Payment status types
 */
export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'refunded' | 'in_process';

/**
 * Payment record
 */
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

/**
 * Payment with plan details
 */
export interface PaymentWithPlan extends Payment {
  plan?: Plan;
}

/**
 * ============================================================================
 * API REQUEST TYPES
 * ============================================================================
 */

/**
 * Create payment preference request
 */
export interface CreatePaymentPreferenceRequest {
  planId: string;
}

/**
 * ============================================================================
 * API RESPONSE TYPES
 * ============================================================================
 */

/**
 * Payment preference response from MercadoPago
 */
export interface PaymentPreferenceResponse {
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint: string;
  payment: Payment;
}

/**
 * Create payment preference response
 */
export interface CreatePaymentPreferenceResponse {
  success: boolean;
  data?: PaymentPreferenceResponse;
  message?: string;
}

/**
 * Get payment response
 */
export interface GetPaymentResponse {
  success: boolean;
  payment?: Payment;
  message?: string;
}

/**
 * Get payments response
 */
export interface GetPaymentsResponse {
  success: boolean;
  payments: Payment[];
  message?: string;
}
