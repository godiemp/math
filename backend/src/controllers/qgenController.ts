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
import { generateQuestionAnswer } from '../services/aiService.js';
import { ValueGenerator } from '../lib/qgen/valueGenerator.js';
import { getCompatibleGoals } from '../lib/qgen/goalSkillMappings.js';

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
 * Generate a single complete question with AI
 * POST /api/qgen/generate-single
 */
export const generateSingleQuestion = async (req: Request, res: Response) => {
  try {
    const { targetSkills, level, subject } = req.body;

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

    // Find a compatible context
    const compatibleContexts = contextLibrary.filter((ctx) =>
      targetSkills.every((skill) => ctx.compatibleSkills.includes(skill))
    );

    if (compatibleContexts.length === 0) {
      return res.status(400).json({
        success: false,
        error: `No context found that supports all skills: ${targetSkills.join(', ')}`,
      });
    }

    const context = compatibleContexts[0];

    // Find compatible goals
    const compatibleGoals = getCompatibleGoals(targetSkills);

    if (compatibleGoals.length === 0) {
      return res.status(400).json({
        success: false,
        error: `No compatible goals found for skills: ${targetSkills.join(', ')}`,
      });
    }

    // Find compatible templates
    const compatibleTemplates = templateLibrary.filter(
      (tmpl) =>
        tmpl.compatibleContexts.includes(context.id) &&
        tmpl.requiredSkills.some((skill) => targetSkills.includes(skill)) &&
        compatibleGoals.includes(tmpl.goalId)
    );

    if (compatibleTemplates.length === 0) {
      return res.status(400).json({
        success: false,
        error: `No compatible templates found`,
      });
    }

    // Pick a template (first one for now)
    const template = compatibleTemplates[0];

    // Generate values for the template
    const valueGenerator = new ValueGenerator();
    const values = valueGenerator.generateValuesWithConstraints(
      template.variables,
      template.constraints
    );

    // Fill the template
    const questionText = valueGenerator.fillTemplate(template.templateText, values);
    const questionLatex = template.templateLatex
      ? valueGenerator.fillTemplate(template.templateLatex, values)
      : undefined;

    // Determine difficulty
    const difficulty =
      targetSkills.length === 1 ? 'easy' : targetSkills.length === 2 ? 'medium' : 'hard';

    console.log('Calling AI to generate answer options...');

    // Generate answer options using AI
    const aiResponse = await generateQuestionAnswer({
      question: questionText,
      questionLatex,
      context: context.description,
      variables: values,
      skills: targetSkills,
      difficulty,
    });

    console.log('AI response received:', aiResponse);

    // Build the complete question
    const completeQuestion = {
      id: `qgen-single-${Date.now()}`,
      level,
      subject,
      topic: context.name,
      question: questionText,
      questionLatex,
      options: aiResponse.options,
      optionsLatex: aiResponse.optionsLatex,
      correctAnswer: aiResponse.correctAnswer,
      explanation: aiResponse.explanation,
      explanationLatex: aiResponse.explanationLatex,
      difficulty,
      skills: targetSkills,
      context: {
        id: context.id,
        description: context.description,
      },
      template: {
        id: template.id,
        name: template.name,
      },
      variables: values,
      createdAt: Date.now(),
    };

    return res.status(200).json({
      success: true,
      data: completeQuestion,
    });
  } catch (error: any) {
    console.error('Error generating single question:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate question',
    });
  }
};
