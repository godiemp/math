/**
 * Thematic Units Controller
 * Handles API requests for thematic units taxonomy
 */

import { Request, Response } from 'express';
import {
  THEMATIC_UNITS,
  getUnitsByLevel,
  getUnitsByLevelAndSubject,
  getUnitByCode,
  getSubsectionsByUnit,
  getUnitStats,
  ThematicUnit,
} from '../config/thematic-units';
import { Level, Subject } from '../types/abstractProblems';

/**
 * Get all thematic units with optional filters
 * GET /api/thematic-units
 * Query params: level, subject
 */
export const getThematicUnitsController = async (req: Request, res: Response) => {
  try {
    const { level, subject } = req.query;

    let units: ThematicUnit[] = THEMATIC_UNITS;

    // Apply filters
    if (level && subject) {
      units = getUnitsByLevelAndSubject(level as Level, subject as Subject);
    } else if (level) {
      units = getUnitsByLevel(level as Level);
    } else if (subject) {
      units = THEMATIC_UNITS.filter(u => u.subject === subject);
    }

    res.json({
      success: true,
      count: units.length,
      units,
    });
  } catch (error: any) {
    console.error('Error getting thematic units:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get thematic units',
    });
  }
};

/**
 * Get thematic units grouped by subject for a specific level
 * GET /api/thematic-units/grouped
 * Query params: level (required)
 */
export const getGroupedUnitsController = async (req: Request, res: Response) => {
  try {
    const { level } = req.query;

    if (!level || !['M1', 'M2'].includes(level as string)) {
      return res.status(400).json({
        success: false,
        error: 'level is required and must be M1 or M2',
      });
    }

    const units = getUnitsByLevel(level as Level);

    // Group by subject
    const grouped = {
      números: units.filter(u => u.subject === 'números'),
      álgebra: units.filter(u => u.subject === 'álgebra'),
      geometría: units.filter(u => u.subject === 'geometría'),
      probabilidad: units.filter(u => u.subject === 'probabilidad'),
    };

    res.json({
      success: true,
      level,
      grouped,
      totalUnits: units.length,
    });
  } catch (error: any) {
    console.error('Error getting grouped units:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get grouped units',
    });
  }
};

/**
 * Get single thematic unit by code
 * GET /api/thematic-units/:code
 */
export const getUnitByCodeController = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const unit = getUnitByCode(code);

    if (!unit) {
      return res.status(404).json({
        success: false,
        error: 'Thematic unit not found',
      });
    }

    // Include subsections
    const subsections = getSubsectionsByUnit(code);

    res.json({
      success: true,
      unit: {
        ...unit,
        subsections,
      },
    });
  } catch (error: any) {
    console.error('Error getting unit:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get unit',
    });
  }
};

/**
 * Get statistics about thematic units
 * GET /api/thematic-units/stats
 */
export const getUnitsStatsController = async (req: Request, res: Response) => {
  try {
    const stats = getUnitStats();

    res.json({
      success: true,
      stats,
    });
  } catch (error: any) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get statistics',
    });
  }
};
