import { pool } from '../config/database';
import {
  Plan,
  Subscription,
  UserWithSubscription,
  CreatePlanRequest,
  UpdatePlanRequest,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  User,
} from '../types';
import { emailService } from './emailService';

/**
 * Plan Service - Manages subscription plans
 */
export class PlanService {
  /**
   * Get all plans
   */
  static async getAllPlans(activeOnly: boolean = false): Promise<Plan[]> {
    const query = activeOnly
      ? 'SELECT * FROM plans WHERE is_active = TRUE ORDER BY display_order ASC, price ASC'
      : 'SELECT * FROM plans ORDER BY display_order ASC, price ASC';

    const result = await pool.query(query);

    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      currency: row.currency,
      durationDays: row.duration_days,
      trialDurationDays: row.trial_duration_days,
      features: row.features,
      isActive: row.is_active,
      displayOrder: row.display_order,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  /**
   * Get plan by ID
   */
  static async getPlanById(planId: string): Promise<Plan | null> {
    const result = await pool.query('SELECT * FROM plans WHERE id = $1', [planId]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      currency: row.currency,
      durationDays: row.duration_days,
      trialDurationDays: row.trial_duration_days,
      features: row.features,
      isActive: row.is_active,
      displayOrder: row.display_order,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Create a new plan
   */
  static async createPlan(data: CreatePlanRequest): Promise<Plan> {
    const now = Date.now();

    const result = await pool.query(
      `INSERT INTO plans (
        id, name, description, price, currency, duration_days,
        trial_duration_days, features, display_order, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        data.id,
        data.name,
        data.description || null,
        data.price,
        data.currency || 'CLP',
        data.durationDays,
        data.trialDurationDays || 0,
        JSON.stringify(data.features),
        data.displayOrder || 0,
        now,
        now,
      ]
    );

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      currency: row.currency,
      durationDays: row.duration_days,
      trialDurationDays: row.trial_duration_days,
      features: row.features,
      isActive: row.is_active,
      displayOrder: row.display_order,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Update a plan
   */
  static async updatePlan(planId: string, data: UpdatePlanRequest): Promise<Plan | null> {
    const now = Date.now();
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.price !== undefined) {
      updates.push(`price = $${paramCount++}`);
      values.push(data.price);
    }
    if (data.durationDays !== undefined) {
      updates.push(`duration_days = $${paramCount++}`);
      values.push(data.durationDays);
    }
    if (data.trialDurationDays !== undefined) {
      updates.push(`trial_duration_days = $${paramCount++}`);
      values.push(data.trialDurationDays);
    }
    if (data.features !== undefined) {
      updates.push(`features = $${paramCount++}`);
      values.push(JSON.stringify(data.features));
    }
    if (data.isActive !== undefined) {
      updates.push(`is_active = $${paramCount++}`);
      values.push(data.isActive);
    }
    if (data.displayOrder !== undefined) {
      updates.push(`display_order = $${paramCount++}`);
      values.push(data.displayOrder);
    }

    if (updates.length === 0) {
      return this.getPlanById(planId);
    }

    updates.push(`updated_at = $${paramCount++}`);
    values.push(now);
    values.push(planId);

    const query = `UPDATE plans SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      currency: row.currency,
      durationDays: row.duration_days,
      trialDurationDays: row.trial_duration_days,
      features: row.features,
      isActive: row.is_active,
      displayOrder: row.display_order,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Delete a plan (soft delete by setting isActive to false)
   */
  static async deletePlan(planId: string): Promise<boolean> {
    const result = await pool.query(
      'UPDATE plans SET is_active = FALSE, updated_at = $1 WHERE id = $2',
      [Date.now(), planId]
    );

    return result.rowCount !== null && result.rowCount > 0;
  }
}

/**
 * Subscription Service - Manages user subscriptions
 */
export class SubscriptionService {
  /**
   * Get user's active subscription
   */
  static async getUserSubscription(userId: string): Promise<Subscription | null> {
    const result = await pool.query(
      `SELECT * FROM subscriptions
       WHERE user_id = $1 AND status IN ('trial', 'active')
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToSubscription(result.rows[0]);
  }

  /**
   * Get all subscriptions for a user
   */
  static async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    const result = await pool.query(
      'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return result.rows.map(this.mapRowToSubscription);
  }

  /**
   * Create a subscription for a user
   */
  static async createSubscription(data: CreateSubscriptionRequest): Promise<Subscription> {
    const now = Date.now();

    // Get plan details
    const plan = await PlanService.getPlanById(data.planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    // Calculate expiration dates
    let trialEndsAt: number | null = null;
    let expiresAt: number | null = null;
    let status: 'trial' | 'active' = 'active';

    if (data.startTrial && plan.trialDurationDays > 0) {
      status = 'trial';
      trialEndsAt = now + plan.trialDurationDays * 24 * 60 * 60 * 1000;
      expiresAt = trialEndsAt; // Initially set to trial end
    } else {
      expiresAt = now + plan.durationDays * 24 * 60 * 60 * 1000;
    }

    const result = await pool.query(
      `INSERT INTO subscriptions (
        user_id, plan_id, status, started_at, expires_at, trial_ends_at,
        auto_renew, payment_method, last_payment_at, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (user_id, plan_id)
      DO UPDATE SET
        status = EXCLUDED.status,
        started_at = EXCLUDED.started_at,
        expires_at = EXCLUDED.expires_at,
        trial_ends_at = EXCLUDED.trial_ends_at,
        last_payment_at = EXCLUDED.last_payment_at,
        updated_at = EXCLUDED.updated_at
      RETURNING *`,
      [
        data.userId,
        data.planId,
        status,
        now,
        expiresAt,
        trialEndsAt,
        true,
        data.paymentMethod || null,
        status === 'active' ? now : null, // Only set last_payment_at for paid subscriptions
        now,
        now,
      ]
    );

    const subscription = this.mapRowToSubscription(result.rows[0]);

    // Send payment confirmation email (only for paid subscriptions, not trials)
    if (status === 'active' && !data.startTrial) {
      // Get user details
      const userResult = await pool.query(
        'SELECT username, email FROM users WHERE id = $1',
        [data.userId]
      );

      if (userResult.rows.length > 0) {
        const user = userResult.rows[0];
        emailService
          .sendPaymentConfirmationEmail(
            user.email,
            user.username,
            plan.name,
            plan.price,
            plan.currency,
            expiresAt || now
          )
          .catch((error) => {
            console.error('Failed to send payment confirmation email:', error);
          });
      }
    }

    return subscription;
  }

  /**
   * Update a subscription
   */
  static async updateSubscription(
    subscriptionId: number,
    data: UpdateSubscriptionRequest
  ): Promise<Subscription | null> {
    const now = Date.now();
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(data.status);

      if (data.status === 'cancelled') {
        updates.push(`cancelled_at = $${paramCount++}`);
        values.push(now);
      }
    }

    if (data.expiresAt !== undefined) {
      updates.push(`expires_at = $${paramCount++}`);
      values.push(data.expiresAt);
    }

    if (data.autoRenew !== undefined) {
      updates.push(`auto_renew = $${paramCount++}`);
      values.push(data.autoRenew);
    }

    if (data.paymentMethod !== undefined) {
      updates.push(`payment_method = $${paramCount++}`);
      values.push(data.paymentMethod);
    }

    if (updates.length === 0) {
      const result = await pool.query('SELECT * FROM subscriptions WHERE id = $1', [
        subscriptionId,
      ]);
      return result.rows.length > 0 ? this.mapRowToSubscription(result.rows[0]) : null;
    }

    updates.push(`updated_at = $${paramCount++}`);
    values.push(now);
    values.push(subscriptionId);

    const query = `UPDATE subscriptions SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToSubscription(result.rows[0]);
  }

  /**
   * Cancel a subscription
   */
  static async cancelSubscription(subscriptionId: number): Promise<Subscription | null> {
    return this.updateSubscription(subscriptionId, { status: 'cancelled' });
  }

  /**
   * Get all users with their subscriptions (for admin panel)
   */
  static async getAllUsersWithSubscriptions(): Promise<UserWithSubscription[]> {
    const result = await pool.query(`
      SELECT
        u.id, u.username, u.email, u.display_name, u.role,
        u.created_at, u.updated_at, u.current_streak, u.longest_streak, u.last_practice_date, u.target_level,
        s.id as sub_id, s.plan_id, s.status, s.started_at as sub_started_at,
        s.expires_at, s.trial_ends_at, s.cancelled_at, s.auto_renew,
        s.payment_method, s.last_payment_at, s.created_at as sub_created_at, s.updated_at as sub_updated_at,
        p.name as plan_name, p.description as plan_description, p.price, p.currency,
        p.duration_days, p.trial_duration_days, p.features, p.is_active, p.display_order,
        p.created_at as plan_created_at, p.updated_at as plan_updated_at
      FROM users u
      LEFT JOIN subscriptions s ON u.id = s.user_id AND s.status IN ('trial', 'active')
      LEFT JOIN plans p ON s.plan_id = p.id
      ORDER BY u.created_at DESC
    `);

    return result.rows.map((row) => {
      const user: UserWithSubscription = {
        id: row.id,
        username: row.username,
        email: row.email,
        displayName: row.display_name,
        role: row.role,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        currentStreak: row.current_streak,
        longestStreak: row.longest_streak,
        lastPracticeDate: row.last_practice_date,
        targetLevel: row.target_level,
      };

      if (row.sub_id) {
        user.subscription = {
          id: row.sub_id,
          userId: row.id,
          planId: row.plan_id,
          status: row.status,
          startedAt: row.sub_started_at,
          expiresAt: row.expires_at,
          trialEndsAt: row.trial_ends_at,
          cancelledAt: row.cancelled_at,
          autoRenew: row.auto_renew,
          paymentMethod: row.payment_method,
          lastPaymentAt: row.last_payment_at,
          createdAt: row.sub_created_at,
          updatedAt: row.sub_updated_at,
        };

        user.plan = {
          id: row.plan_id,
          name: row.plan_name,
          description: row.plan_description,
          price: parseFloat(row.price),
          currency: row.currency,
          durationDays: row.duration_days,
          trialDurationDays: row.trial_duration_days,
          features: row.features,
          isActive: row.is_active,
          displayOrder: row.display_order,
          createdAt: row.plan_created_at,
          updatedAt: row.plan_updated_at,
        };
      }

      return user;
    });
  }

  /**
   * Check and update expired subscriptions
   */
  static async updateExpiredSubscriptions(): Promise<number> {
    const now = Date.now();

    const result = await pool.query(
      `UPDATE subscriptions
       SET status = 'expired', updated_at = $1
       WHERE status IN ('trial', 'active') AND expires_at < $1`,
      [now]
    );

    return result.rowCount || 0;
  }

  /**
   * Map database row to Subscription object
   */
  private static mapRowToSubscription(row: any): Subscription {
    return {
      id: row.id,
      userId: row.user_id,
      planId: row.plan_id,
      status: row.status,
      startedAt: row.started_at,
      expiresAt: row.expires_at,
      trialEndsAt: row.trial_ends_at,
      cancelledAt: row.cancelled_at,
      autoRenew: row.auto_renew,
      paymentMethod: row.payment_method,
      lastPaymentAt: row.last_payment_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
