/**
 * QGen Controller
 * Handles question generation using the QGen algorithm
 */

import { Request, Response } from 'express';
import { generateQuestions } from '../lib/qgen/qgenAlgorithm.js';
import { contextLibrary } from '../lib/qgen/contextLibrary.js';
import { templateLibrary } from '../lib/qgen/templateLibrary.js';
import { goalSkillMappings } from '../lib/qgen/goalSkillMappings.js';
import { QGenInput, Level, Subject } from '../lib/types/core.js';

/**
 * Generate questions using QGen algorithm
 * POST /api/qgen/generate
 */
export const generateQGenQuestions = async (req: Request, res: Response) => {
  try {
    const { targetSkills, numberOfQuestions, level, subject } = req.body;

    // Validate input
    if (!targetSkills || !Array.isArray(targetSkills) || targetSkills.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'targetSkills is required and must be a non-empty array',
      });
    }

    if (!numberOfQuestions || numberOfQuestions < 1 || numberOfQuestions > 10) {
      return res.status(400).json({
        success: false,
        error: 'numberOfQuestions must be between 1 and 10',
      });
    }

    if (!level || !['M1', 'M2'].includes(level)) {
      return res.status(400).json({
        success: false,
        error: 'level must be M1 or M2',
      });
    }

    if (!subject || !['números', 'álgebra', 'geometría', 'probabilidad'].includes(subject)) {
      return res.status(400).json({
        success: false,
        error: 'subject must be números, álgebra, geometría, or probabilidad',
      });
    }

    // Prepare QGen input
    const input: QGenInput = {
      targetSkills,
      contextLibrary,
      templateLibrary,
      goalMap: goalSkillMappings,
      numberOfQuestions,
      level: level as Level,
      subject: subject as Subject,
    };

    // Generate questions
    const result = generateQuestions(input);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error generating QGen questions:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate questions',
    });
  }
};

/**
 * Get available contexts
 * GET /api/qgen/contexts
 */
export const getContexts = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      data: contextLibrary,
    });
  } catch (error: any) {
    console.error('Error fetching contexts:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch contexts',
    });
  }
};

/**
 * Get available templates
 * GET /api/qgen/templates
 */
export const getTemplates = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      data: templateLibrary,
    });
  } catch (error: any) {
    console.error('Error fetching templates:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch templates',
    });
  }
};
