import { Request, Response } from 'express';
import { PlanService, SubscriptionService } from '../services/subscriptionService';
import { CreatePlanRequest, UpdatePlanRequest, CreateSubscriptionRequest, UpdateSubscriptionRequest } from '../types';

/**
 * User Management Controller
 * Handles admin operations for managing users, plans, and subscriptions
 */

// ========================================
// PLAN MANAGEMENT
// ========================================

/**
 * Get all plans
 * GET /api/admin/plans
 */
export const getPlans = async (req: Request, res: Response) => {
  try {
    const activeOnly = req.query.active === 'true';
    const plans = await PlanService.getAllPlans(activeOnly);

    res.json({
      success: true,
      plans,
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los planes',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Get plan by ID
 * GET /api/admin/plans/:id
 */
export const getPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plan = await PlanService.getPlanById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan no encontrado',
      });
    }

    res.json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el plan',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Create a new plan
 * POST /api/admin/plans
 */
export const createPlan = async (req: Request, res: Response) => {
  try {
    const data: CreatePlanRequest = req.body;

    // Validate required fields
    if (!data.id || !data.name || data.price === undefined || !data.durationDays) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: id, name, price, durationDays',
      });
    }

    const plan = await PlanService.createPlan(data);

    res.status(201).json({
      success: true,
      plan,
      message: 'Plan creado exitosamente',
    });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el plan',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Update a plan
 * PUT /api/admin/plans/:id
 */
export const updatePlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: UpdatePlanRequest = req.body;

    const plan = await PlanService.updatePlan(id, data);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan no encontrado',
      });
    }

    res.json({
      success: true,
      plan,
      message: 'Plan actualizado exitosamente',
    });
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el plan',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Delete a plan (soft delete)
 * DELETE /api/admin/plans/:id
 */
export const deletePlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await PlanService.deletePlan(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Plan no encontrado',
      });
    }

    res.json({
      success: true,
      message: 'Plan desactivado exitosamente',
    });
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el plan',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// ========================================
// USER & SUBSCRIPTION MANAGEMENT
// ========================================

/**
 * Get all users with subscriptions
 * GET /api/admin/users
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await SubscriptionService.getAllUsersWithSubscriptions();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Get user subscriptions
 * GET /api/admin/users/:userId/subscriptions
 */
export const getUserSubscriptions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const subscriptions = await SubscriptionService.getUserSubscriptions(userId);

    res.json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las suscripciones del usuario',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Create subscription for user
 * POST /api/admin/subscriptions
 */
export const createSubscription = async (req: Request, res: Response) => {
  try {
    const data: CreateSubscriptionRequest = req.body;

    // Validate required fields
    if (!data.userId || !data.planId) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: userId, planId',
      });
    }

    const subscription = await SubscriptionService.createSubscription(data);

    res.status(201).json({
      success: true,
      subscription,
      message: 'Suscripción creada exitosamente',
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear la suscripción',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Update subscription
 * PUT /api/admin/subscriptions/:id
 */
export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: UpdateSubscriptionRequest = req.body;

    const subscription = await SubscriptionService.updateSubscription(parseInt(id), data);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Suscripción no encontrada',
      });
    }

    res.json({
      success: true,
      subscription,
      message: 'Suscripción actualizada exitosamente',
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la suscripción',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Cancel subscription
 * POST /api/admin/subscriptions/:id/cancel
 */
export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscription = await SubscriptionService.cancelSubscription(parseInt(id));

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Suscripción no encontrada',
      });
    }

    res.json({
      success: true,
      subscription,
      message: 'Suscripción cancelada exitosamente',
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cancelar la suscripción',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Update expired subscriptions (cron job)
 * POST /api/admin/subscriptions/update-expired
 */
export const updateExpiredSubscriptions = async (req: Request, res: Response) => {
  try {
    const count = await SubscriptionService.updateExpiredSubscriptions();

    res.json({
      success: true,
      message: `${count} suscripciones actualizadas`,
      count,
    });
  } catch (error) {
    console.error('Error updating expired subscriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar suscripciones expiradas',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Delete a user and all their data
 * DELETE /api/admin/users/:userId
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Prevent deleting own account
    if (req.user && req.user.id === userId) {
      return res.status(400).json({
        success: false,
        message: 'No puedes eliminar tu propia cuenta',
      });
    }

    const success = await SubscriptionService.deleteUser(userId);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el usuario',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
