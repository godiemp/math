import { MercadoPagoConfig, Preference, Payment as MPPayment } from 'mercadopago';
import { pool } from '../config/database';
import { Payment, PaymentStatus } from '../types';
import { PlanService, SubscriptionService } from './subscriptionService';

/**
 * Payment Service - Handles MercadoPago integration and payment processing
 */
export class PaymentService {
  private static client: MercadoPagoConfig | null = null;

  /**
   * Initialize MercadoPago client
   */
  private static getClient(): MercadoPagoConfig {
    if (!this.client) {
      const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
      if (!accessToken) {
        throw new Error('MERCADOPAGO_ACCESS_TOKEN not configured');
      }
      this.client = new MercadoPagoConfig({ accessToken });
    }
    return this.client;
  }

  /**
   * Create a payment preference (checkout) for a plan
   */
  static async createPaymentPreference(userId: string, planId: string): Promise<any> {
    try {
      // Get plan details
      const plan = await PlanService.getPlanById(planId);
      if (!plan) {
        throw new Error('Plan not found');
      }

      // Get user details
      const userResult = await pool.query(
        'SELECT id, email, username, display_name FROM users WHERE id = $1',
        [userId]
      );

      if (userResult.rows.length === 0) {
        throw new Error('User not found');
      }

      const user = userResult.rows[0];

      // Create preference with MercadoPago
      const client = this.getClient();
      const preference = new Preference(client);

      const backUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

      const preferenceData = {
        items: [
          {
            id: plan.id,
            title: plan.name,
            description: plan.description || `Suscripción ${plan.name}`,
            quantity: 1,
            unit_price: Number(plan.price),
            currency_id: plan.currency || 'CLP',
          },
        ],
        payer: {
          email: user.email,
          name: user.display_name,
        },
        back_urls: {
          success: `${backUrl}/payment/success`,
          failure: `${backUrl}/payment/failure`,
          pending: `${backUrl}/payment/pending`,
        },
        auto_return: 'approved' as const,
        notification_url: `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/payments/webhook`,
        external_reference: JSON.stringify({
          userId: user.id,
          planId: plan.id,
          timestamp: Date.now(),
        }),
        metadata: {
          user_id: user.id,
          plan_id: plan.id,
          user_email: user.email,
        },
      };

      const result = await preference.create({ body: preferenceData });

      // Create pending payment record
      const now = Date.now();
      const paymentRecord = await pool.query(
        `INSERT INTO payments (
          user_id, plan_id, amount, currency, payment_method, payment_gateway,
          gateway_preference_id, status, metadata, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [
          userId,
          planId,
          plan.price,
          plan.currency || 'CLP',
          'mercadopago',
          'mercadopago',
          result.id,
          'pending',
          JSON.stringify({ preference_id: result.id }),
          now,
          now,
        ]
      );

      return {
        preferenceId: result.id,
        initPoint: result.init_point,
        sandboxInitPoint: result.sandbox_init_point,
        payment: this.mapRowToPayment(paymentRecord.rows[0]),
      };
    } catch (error) {
      console.error('Error creating payment preference:', error);
      throw error;
    }
  }

  /**
   * Process payment webhook from MercadoPago
   */
  static async processWebhook(webhookData: any): Promise<void> {
    try {
      console.log('Processing webhook:', webhookData);

      // MercadoPago sends payment.updated or payment.created events
      if (webhookData.type !== 'payment') {
        console.log('Ignoring non-payment webhook:', webhookData.type);
        return;
      }

      const paymentId = webhookData.data?.id;
      if (!paymentId) {
        console.error('No payment ID in webhook data');
        return;
      }

      // Get payment details from MercadoPago
      const client = this.getClient();
      const mpPayment = new MPPayment(client);
      const paymentData = await mpPayment.get({ id: paymentId });

      console.log('Payment data from MercadoPago:', JSON.stringify(paymentData, null, 2));

      // Extract metadata
      const metadata = paymentData.metadata || {};
      const userId = metadata.user_id;
      const planId = metadata.plan_id;

      if (!userId || !planId) {
        console.error('Missing user_id or plan_id in payment metadata');
        return;
      }

      // Update payment record
      await this.updatePaymentFromMercadoPago(paymentData, userId, planId);

      // If payment is approved, activate subscription
      if (paymentData.status === 'approved') {
        await this.activateSubscription(userId, planId, paymentData);
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  }

  /**
   * Update payment record from MercadoPago data
   */
  private static async updatePaymentFromMercadoPago(
    paymentData: any,
    userId: string,
    planId: string
  ): Promise<Payment> {
    const now = Date.now();

    // Find existing payment by preference ID or create new one
    let paymentRecord = await pool.query(
      'SELECT * FROM payments WHERE gateway_preference_id = $1 AND user_id = $2',
      [paymentData.external_reference, userId]
    );

    if (paymentRecord.rows.length === 0) {
      // Create new payment record
      paymentRecord = await pool.query(
        `INSERT INTO payments (
          user_id, plan_id, amount, currency, payment_method, payment_gateway,
          gateway_payment_id, status, status_detail, transaction_amount,
          net_amount, fee_amount, payer_email, payer_id, metadata, payment_date,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *`,
        [
          userId,
          planId,
          paymentData.transaction_amount,
          paymentData.currency_id,
          paymentData.payment_method_id || 'mercadopago',
          'mercadopago',
          paymentData.id.toString(),
          paymentData.status,
          paymentData.status_detail,
          paymentData.transaction_amount,
          paymentData.transaction_details?.net_received_amount,
          paymentData.fee_details?.[0]?.amount,
          paymentData.payer?.email,
          paymentData.payer?.id?.toString(),
          JSON.stringify(paymentData),
          paymentData.date_approved ? new Date(paymentData.date_approved).getTime() : null,
          now,
          now,
        ]
      );
    } else {
      // Update existing payment record
      paymentRecord = await pool.query(
        `UPDATE payments SET
          gateway_payment_id = $1,
          status = $2,
          status_detail = $3,
          transaction_amount = $4,
          net_amount = $5,
          fee_amount = $6,
          payer_email = $7,
          payer_id = $8,
          metadata = $9,
          payment_date = $10,
          payment_method = $11,
          updated_at = $12
        WHERE id = $13
        RETURNING *`,
        [
          paymentData.id.toString(),
          paymentData.status,
          paymentData.status_detail,
          paymentData.transaction_amount,
          paymentData.transaction_details?.net_received_amount,
          paymentData.fee_details?.[0]?.amount,
          paymentData.payer?.email,
          paymentData.payer?.id?.toString(),
          JSON.stringify(paymentData),
          paymentData.date_approved ? new Date(paymentData.date_approved).getTime() : null,
          paymentData.payment_method_id || 'mercadopago',
          now,
          paymentRecord.rows[0].id,
        ]
      );
    }

    return this.mapRowToPayment(paymentRecord.rows[0]);
  }

  /**
   * Activate subscription after successful payment
   */
  private static async activateSubscription(
    userId: string,
    planId: string,
    paymentData: any
  ): Promise<void> {
    try {
      // Check if user already has an active subscription for this plan
      const existingSubscription = await pool.query(
        `SELECT * FROM subscriptions
         WHERE user_id = $1 AND plan_id = $2 AND status IN ('trial', 'active')
         ORDER BY created_at DESC LIMIT 1`,
        [userId, planId]
      );

      if (existingSubscription.rows.length > 0) {
        // Update existing subscription
        const subscription = existingSubscription.rows[0];
        const plan = await PlanService.getPlanById(planId);

        if (plan) {
          const now = Date.now();
          const expiresAt = now + plan.durationDays * 24 * 60 * 60 * 1000;

          await pool.query(
            `UPDATE subscriptions SET
              status = 'active',
              expires_at = $1,
              last_payment_at = $2,
              payment_method = $3,
              updated_at = $4
            WHERE id = $5`,
            [expiresAt, now, paymentData.payment_method_id || 'mercadopago', now, subscription.id]
          );

          // Link payment to subscription
          await pool.query('UPDATE payments SET subscription_id = $1 WHERE gateway_payment_id = $2', [
            subscription.id,
            paymentData.id.toString(),
          ]);
        }
      } else {
        // Create new subscription
        const subscription = await SubscriptionService.createSubscription({
          userId,
          planId,
          startTrial: false,
          paymentMethod: paymentData.payment_method_id || 'mercadopago',
        });

        // Link payment to subscription
        await pool.query('UPDATE payments SET subscription_id = $1 WHERE gateway_payment_id = $2', [
          subscription.id,
          paymentData.id.toString(),
        ]);
      }

      console.log(`Subscription activated for user ${userId}, plan ${planId}`);
    } catch (error) {
      console.error('Error activating subscription:', error);
      throw error;
    }
  }

  /**
   * Get payment by ID
   */
  static async getPaymentById(paymentId: number): Promise<Payment | null> {
    const result = await pool.query('SELECT * FROM payments WHERE id = $1', [paymentId]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToPayment(result.rows[0]);
  }

  /**
   * Get all payments for a user
   */
  static async getUserPayments(userId: string): Promise<Payment[]> {
    const result = await pool.query(
      'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return result.rows.map(this.mapRowToPayment);
  }

  /**
   * Get payment by MercadoPago payment ID
   */
  static async getPaymentByGatewayId(gatewayPaymentId: string): Promise<Payment | null> {
    const result = await pool.query('SELECT * FROM payments WHERE gateway_payment_id = $1', [
      gatewayPaymentId,
    ]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToPayment(result.rows[0]);
  }

  /**
   * Map database row to Payment object
   */
  private static mapRowToPayment(row: any): Payment {
    return {
      id: row.id,
      userId: row.user_id,
      subscriptionId: row.subscription_id,
      planId: row.plan_id,
      amount: parseFloat(row.amount),
      currency: row.currency,
      paymentMethod: row.payment_method,
      paymentGateway: row.payment_gateway,
      gatewayPaymentId: row.gateway_payment_id,
      gatewayPreferenceId: row.gateway_preference_id,
      status: row.status,
      statusDetail: row.status_detail,
      transactionAmount: row.transaction_amount ? parseFloat(row.transaction_amount) : undefined,
      netAmount: row.net_amount ? parseFloat(row.net_amount) : undefined,
      feeAmount: row.fee_amount ? parseFloat(row.fee_amount) : undefined,
      payerEmail: row.payer_email,
      payerId: row.payer_id,
      metadata: row.metadata,
      paymentDate: row.payment_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
