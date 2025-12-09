/**
 * Curriculum Progress Routes
 * Routes for managing user curriculum topic progress (skill tree)
 */

import express from 'express';
import {
  getCurriculumStructure,
  getMyProgress,
  updateMyTopicProgress
} from '../controllers/curriculumProgressController';
import { authenticate } from '../auth/middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get curriculum structure (M1)
router.get('/structure', getCurriculumStructure);

// Get current user's progress
router.get('/', getMyProgress);

// Update current user's topic progress
router.post('/topics', updateMyTopicProgress);

export default router;
