import express from 'express';
import { authenticate } from '../auth/middleware/authenticate';
import { authorize } from '../auth/middleware/authorize';
import * as userManagementController from '../controllers/userManagementController';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize);

// ========================================
// PLAN ROUTES
// ========================================

/**
 * GET /api/admin/plans
 * Get all plans (query param: active=true for active only)
 */
router.get('/plans', userManagementController.getPlans);

/**
 * GET /api/admin/plans/:id
 * Get plan by ID
 */
router.get('/plans/:id', userManagementController.getPlan);

/**
 * POST /api/admin/plans
 * Create a new plan
 */
router.post('/plans', userManagementController.createPlan);

/**
 * PUT /api/admin/plans/:id
 * Update a plan
 */
router.put('/plans/:id', userManagementController.updatePlan);

/**
 * DELETE /api/admin/plans/:id
 * Delete (deactivate) a plan
 */
router.delete('/plans/:id', userManagementController.deletePlan);

// ========================================
// USER & SUBSCRIPTION ROUTES
// ========================================

/**
 * GET /api/admin/users
 * Get all users with their subscriptions
 */
router.get('/users', userManagementController.getUsers);

/**
 * GET /api/admin/users/:userId/subscriptions
 * Get all subscriptions for a specific user
 */
router.get('/users/:userId/subscriptions', userManagementController.getUserSubscriptions);

/**
 * POST /api/admin/subscriptions
 * Create a subscription for a user
 */
router.post('/subscriptions', userManagementController.createSubscription);

/**
 * PUT /api/admin/subscriptions/:id
 * Update a subscription
 */
router.put('/subscriptions/:id', userManagementController.updateSubscription);

/**
 * POST /api/admin/subscriptions/:id/cancel
 * Cancel a subscription
 */
router.post('/subscriptions/:id/cancel', userManagementController.cancelSubscription);

/**
 * POST /api/admin/subscriptions/update-expired
 * Update expired subscriptions (cron job endpoint)
 */
router.post('/subscriptions/update-expired', userManagementController.updateExpiredSubscriptions);

export default router;
