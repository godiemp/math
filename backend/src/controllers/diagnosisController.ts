/**
 * ============================================================================
 * DIAGNOSIS CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for knowledge gap diagnosis endpoints
 * Allows users to verify their self-assessed knowledge through AI-powered diagnosis
 */

import { Request, Response } from 'express';
import {
  getQuestionsForSkills,
  getSession,
  recordAnswer,
  processFollowUp,
  completeDiagnosis,
  getDiagnosisHistory,
} from '../services/diagnosisService';
import {
  SubmitAnswerRequest,
  AnalyzeErrorRequest,
  CompleteDiagnosisRequest,
} from '../types/diagnosis';

/**
 * Get diagnosis questions for specific skills
 * GET /api/diagnosis/questions?skills=skill1,skill2&level=M1&limit=5
 */
export async function getDiagnosisQuestions(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const skillsParam = req.query.skills as string;
    const level = (req.query.level as 'M1' | 'M2') || 'M1';
    const limit = parseInt(req.query.limit as string) || 5;

    if (!skillsParam) {
      res.status(400).json({ error: 'skills parameter is required' });
      return;
    }

    const skills = skillsParam.split(',').map((s) => s.trim()).filter(Boolean);

    if (skills.length === 0) {
      res.status(400).json({ error: 'At least one skill is required' });
      return;
    }

    const result = await getQuestionsForSkills(skills, level, limit);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Get diagnosis questions error:', error);
    const message = error instanceof Error ? error.message : 'Failed to get diagnosis questions';
    const statusCode = message.includes('No questions available') ? 404 : 500;
    res.status(statusCode).json({ error: message });
  }
}

/**
 * Submit an answer for a diagnosis question
 * POST /api/diagnosis/answer
 */
export async function submitAnswer(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { sessionId, questionId, userAnswer } = req.body as SubmitAnswerRequest;

    if (!sessionId || !questionId || userAnswer === undefined) {
      res.status(400).json({ error: 'sessionId, questionId, and userAnswer are required' });
      return;
    }

    const result = recordAnswer(sessionId, questionId, userAnswer, req.user.userId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
}

/**
 * Analyze an error with AI after student provides explanation
 * POST /api/diagnosis/analyze-error
 */
export async function analyzeError(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const input = req.body as AnalyzeErrorRequest;

    if (
      !input.sessionId ||
      !input.questionId ||
      !input.question ||
      input.userAnswer === undefined ||
      input.correctAnswer === undefined ||
      !input.followUpExplanation
    ) {
      res.status(400).json({
        error: 'sessionId, questionId, question, userAnswer, correctAnswer, and followUpExplanation are required',
      });
      return;
    }

    const gap = await processFollowUp(input.sessionId, input.questionId, {
      question: input.question,
      questionLatex: input.questionLatex,
      options: input.options,
      userAnswer: input.userAnswer,
      correctAnswer: input.correctAnswer,
      followUpExplanation: input.followUpExplanation,
      skillId: input.skillId,
      skillName: input.skillName,
    });

    res.json({
      success: true,
      data: { gap },
    });
  } catch (error) {
    console.error('Analyze error:', error);
    res.status(500).json({ error: 'Failed to analyze error' });
  }
}

/**
 * Complete a diagnosis session and get results
 * POST /api/diagnosis/complete
 */
export async function completeDiagnosisSession(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { sessionId } = req.body as CompleteDiagnosisRequest;

    if (!sessionId) {
      res.status(400).json({ error: 'sessionId is required' });
      return;
    }

    const result = await completeDiagnosis(sessionId, req.user.userId);

    res.json({
      success: true,
      data: { result },
    });
  } catch (error) {
    console.error('Complete diagnosis error:', error);
    res.status(500).json({ error: 'Failed to complete diagnosis' });
  }
}

/**
 * Get the current session status
 * GET /api/diagnosis/session/:sessionId
 */
export async function getSessionStatus(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { sessionId } = req.params;

    if (!sessionId) {
      res.status(400).json({ error: 'sessionId is required' });
      return;
    }

    const session = getSession(sessionId);

    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    res.json({
      success: true,
      data: { session },
    });
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({ error: 'Failed to get session' });
  }
}

/**
 * Get diagnosis history for the current user
 * GET /api/diagnosis/history
 */
export async function getHistory(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const history = await getDiagnosisHistory(req.user.userId);

    res.json({
      success: true,
      data: { history },
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to get diagnosis history' });
  }
}
