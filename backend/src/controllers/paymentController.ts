import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';
import { PlanService } from '../services/planService';
import { CreatePaymentPreferenceRequest } from '../types';

/**
 * Get all active subscription plans
 * GET /api/payments/plans
 */
export const getActivePlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const plans = await PlanService.getAllPlans(true); // true = active only

    res.status(200).json({
      success: true,
      plans,
    });
  } catch (error: any) {
    console.error('Error fetching active plans:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch plans',
    });
  }
};

/**
 * Create a payment preference for a plan
 * POST /api/payments/create-preference
 */
export const createPaymentPreference = async (req: Request, res: Response): Promise<void> => {
  try {
    const { planId } = req.body as CreatePaymentPreferenceRequest;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    if (!planId) {
      res.status(400).json({
        success: false,
        message: 'Plan ID is required',
      });
      return;
    }

    const result = await PaymentService.createPaymentPreference(userId, planId);

    res.status(200).json({
      success: true,
      data: result,
      message: 'Payment preference created successfully',
    });
  } catch (error: any) {
    console.error('Error creating payment preference:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create payment preference',
    });
  }
};

/**
 * Handle MercadoPago webhook notifications
 * POST /api/payments/webhook
 */
export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received webhook:', JSON.stringify(req.body, null, 2));
    console.log('Webhook query params:', req.query);

    // MercadoPago sends webhook data in the body
    const webhookData = req.body;

    // Respond immediately to acknowledge receipt
    res.status(200).json({ success: true });

    // Process webhook asynchronously
    PaymentService.processWebhook(webhookData).catch((error) => {
      console.error('Error processing webhook asynchronously:', error);
    });
  } catch (error: any) {
    console.error('Error handling webhook:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process webhook',
    });
  }
};

/**
 * Get payment details by ID
 * GET /api/payments/:id
 */
export const getPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const payment = await PaymentService.getPaymentById(parseInt(id));

    if (!payment) {
      res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
      return;
    }

    // Only allow users to view their own payments (unless admin)
    if (payment.userId !== userId && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error: any) {
    console.error('Error getting payment:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get payment',
    });
  }
};

/**
 * Get all payments for the authenticated user
 * GET /api/payments/my-payments
 */
export const getMyPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const payments = await PaymentService.getUserPayments(userId);

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error: any) {
    console.error('Error getting user payments:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get payments',
    });
  }
};

/**
 * Get payment by MercadoPago payment ID
 * GET /api/payments/gateway/:gatewayPaymentId
 */
export const getPaymentByGatewayId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gatewayPaymentId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const payment = await PaymentService.getPaymentByGatewayId(gatewayPaymentId);

    if (!payment) {
      res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
      return;
    }

    // Only allow users to view their own payments (unless admin)
    if (payment.userId !== userId && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error: any) {
    console.error('Error getting payment by gateway ID:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get payment',
    });
  }
};
