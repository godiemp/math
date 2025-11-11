/**
 * Payment API Client Functions
 *
 * Functions for interacting with payment endpoints
 */

import { api } from '../api-client';
import type {
  CreatePaymentPreferenceRequest,
  CreatePaymentPreferenceResponse,
  GetPaymentResponse,
  GetPaymentsResponse,
} from '../types/payment';
import type { GetPlansResponse } from '../types/subscription';

/**
 * Get all active subscription plans
 * Public endpoint - no authentication required
 */
export async function getActivePlans() {
  return api.get<GetPlansResponse>('/api/payments/plans');
}

/**
 * Create a payment preference for a subscription plan
 * Returns MercadoPago checkout URL
 */
export async function createPaymentPreference(planId: string) {
  const body: CreatePaymentPreferenceRequest = { planId };
  return api.post<CreatePaymentPreferenceResponse>('/api/payments/create-preference', body);
}

/**
 * Get all payments for the authenticated user
 */
export async function getMyPayments() {
  return api.get<GetPaymentsResponse>('/api/payments/my-payments');
}

/**
 * Get a specific payment by ID
 */
export async function getPaymentById(paymentId: number) {
  return api.get<GetPaymentResponse>(`/api/payments/${paymentId}`);
}

/**
 * Get payment by MercadoPago payment ID
 */
export async function getPaymentByGatewayId(gatewayPaymentId: string) {
  return api.get<GetPaymentResponse>(`/api/payments/gateway/${gatewayPaymentId}`);
}
