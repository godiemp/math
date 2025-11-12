/**
 * Routes for Thematic Units
 */

import express from 'express';
import {
  getThematicUnitsController,
  getGroupedUnitsController,
  getUnitByCodeController,
  getUnitsStatsController,
} from '../controllers/thematicUnitsController';

const router = express.Router();

/**
 * GET /api/thematic-units/stats
 * Get statistics about thematic units
 */
router.get('/stats', getUnitsStatsController);

/**
 * GET /api/thematic-units/grouped
 * Get thematic units grouped by subject for a specific level
 * Query params: level (required)
 */
router.get('/grouped', getGroupedUnitsController);

/**
 * GET /api/thematic-units/:code
 * Get single thematic unit by code
 */
router.get('/:code', getUnitByCodeController);

/**
 * GET /api/thematic-units
 * Get all thematic units with optional filters
 * Query params: level, subject
 */
router.get('/', getThematicUnitsController);

export default router;
