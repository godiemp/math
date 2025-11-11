import express from 'express';
import { authenticate } from '../auth/middleware/authenticate';
import * as paymentController from '../controllers/paymentController';

const router = express.Router();

/**
 * GET /api/payments/plans
 * Get all active subscription plans
 * Public endpoint (no authentication required)
 */
router.get('/plans', paymentController.getActivePlans);

/**
 * POST /api/payments/create-preference
 * Create a payment preference for a plan
 * Requires authentication
 */
router.post('/create-preference', authenticate, paymentController.createPaymentPreference);

/**
 * POST /api/payments/webhook
 * Handle MercadoPago webhook notifications
 * Public endpoint (no authentication required)
 */
router.post('/webhook', paymentController.handleWebhook);

/**
 * GET /api/payments/my-payments
 * Get all payments for the authenticated user
 * Requires authentication
 */
router.get('/my-payments', authenticate, paymentController.getMyPayments);

/**
 * GET /api/payments/:id
 * Get payment details by ID
 * Requires authentication
 */
router.get('/:id', authenticate, paymentController.getPayment);

/**
 * GET /api/payments/gateway/:gatewayPaymentId
 * Get payment by MercadoPago payment ID
 * Requires authentication
 */
router.get('/gateway/:gatewayPaymentId', authenticate, paymentController.getPaymentByGatewayId);

export default router;
