import { Router } from 'express';
import {
  submitQuestionFeedback,
  getAllFeedback,
  updateFeedbackStatus,
  getFeedbackStats,
} from '../controllers/questionFeedbackController';
import { authenticate } from '../auth/middleware/authenticate';

const router = Router();

/**
 * @route   POST /api/question-feedback
 * @desc    Submit feedback about a question
 * @body    questionId, feedbackType, description (required)
 *          questionTopic, questionLevel, questionDifficulty, questionSubject,
 *          userAnswer, correctAnswer, questionLatex (optional)
 * @access  Private
 */
router.post('/', authenticate, submitQuestionFeedback);

/**
 * @route   GET /api/question-feedback
 * @desc    Get all feedback (admin only)
 * @query   status (optional): pending, reviewed, fixed, dismissed
 * @query   feedbackType (optional): wrong_answer, wrong_explanation, unclear_question, typo, other
 * @query   limit (optional): number of results (default 50)
 * @query   offset (optional): pagination offset (default 0)
 * @access  Private (Admin only)
 */
router.get('/', authenticate, getAllFeedback);

/**
 * @route   PATCH /api/question-feedback/:id/status
 * @desc    Update feedback status (admin only)
 * @body    status: pending, reviewed, fixed, dismissed
 *          adminNotes (optional): notes about the resolution
 * @access  Private (Admin only)
 */
router.patch('/:id/status', authenticate, updateFeedbackStatus);

/**
 * @route   GET /api/question-feedback/stats
 * @desc    Get feedback statistics (admin only)
 * @access  Private (Admin only)
 */
router.get('/stats', authenticate, getFeedbackStats);

export default router;
