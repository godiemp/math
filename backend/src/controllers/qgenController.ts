/**
 * QGen Controller
 * Handles question generation using the QGen algorithm
 */

import { Request, Response } from 'express';
import { generateQuestions } from '../lib/qgen/qgenAlgorithm';
import { contextLibrary } from '../lib/qgen/contextLibrary';
import { templateLibrary } from '../lib/qgen/templateLibrary';
import { goalSkillMappings } from '../lib/qgen/goalSkillMappings';
import { QGenInput, Level, Subject } from '../lib/types/core';
import { generateQuestionAnswer, generateCompleteQuestion } from '../services/aiService';
import { ValueGenerator } from '../lib/qgen/valueGenerator';
import { getCompatibleGoals } from '../lib/qgen/goalSkillMappings';

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

/**
 * Generate a single complete question with AI (no templates required)
 * POST /api/qgen/generate-single
 */
export const generateSingleQuestion = async (req: Request, res: Response) => {
  console.log('\n====================================');
  console.log('📝 GENERATE SINGLE QUESTION HANDLER CALLED');
  console.log(`   Method: ${req.method}`);
  console.log(`   URL: ${req.url}`);
  console.log(`   Body:`, JSON.stringify(req.body, null, 2));
  console.log('====================================\n');

  try {
    const { targetSkills, level, subject } = req.body;
    console.log('✅ Handler: Parsing request body...');
    console.log(`   targetSkills: ${targetSkills}`);
    console.log(`   level: ${level}`);
    console.log(`   subject: ${subject}`);

    // Validate input
    if (!targetSkills || !Array.isArray(targetSkills) || targetSkills.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'targetSkills is required and must be a non-empty array',
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

    // Optionally find a compatible context for additional guidance
    const compatibleContexts = contextLibrary.filter((ctx) =>
      targetSkills.every((skill) => ctx.compatibleSkills.includes(skill))
    );

    const contextHint = compatibleContexts.length > 0
      ? compatibleContexts[0].description
      : undefined;

    // Determine difficulty based on number of skills
    const difficulty =
      targetSkills.length === 1 ? 'easy' : targetSkills.length === 2 ? 'medium' : 'hard';

    console.log('🤖 Calling AI to generate complete question...');

    // Generate complete question using AI (no templates!)
    const aiResponse = await generateCompleteQuestion({
      skills: targetSkills,
      level,
      subject,
      context: contextHint,
      difficulty,
    });

    console.log('✅ AI response received:', aiResponse);

    // Build the complete question response
    const completeQuestion = {
      id: `qgen-single-${Date.now()}`,
      level,
      subject,
      topic: subject,
      question: aiResponse.question,
      questionLatex: aiResponse.questionLatex,
      options: aiResponse.options,
      optionsLatex: aiResponse.optionsLatex,
      correctAnswer: aiResponse.correctAnswer,
      explanation: aiResponse.explanation,
      explanationLatex: aiResponse.explanationLatex,
      difficulty,
      skills: targetSkills,
      context: {
        id: 'ai-generated',
        description: aiResponse.context,
      },
      template: {
        id: 'ai-generated',
        name: 'AI Generated Question',
      },
      variables: aiResponse.variables || {},
      createdAt: Date.now(),
    };

    return res.status(200).json({
      success: true,
      data: completeQuestion,
    });
  } catch (error: any) {
    console.error('❌ Error generating single question:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate question',
    });
  }
};
