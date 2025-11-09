import { Router } from 'express';
import { summarizeContent, generatePracticeProblems, aiChat, aiHelp } from '../services/aiService';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * POST /api/ai/summarize
 * Summarize educational content
 */
router.post('/summarize', authenticate, async (req, res) => {
  try {
    const { content, mode = 'brief', context } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    if (mode !== 'brief' && mode !== 'detailed') {
      return res.status(400).json({ error: 'Mode must be "brief" or "detailed"' });
    }

    const result = await summarizeContent({
      content,
      mode,
      context,
    });

    res.json(result);
  } catch (error) {
    console.error('Summarize endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to summarize content',
    });
  }
});

/**
 * POST /api/ai/practice
 * Generate practice problems for a topic
 */
router.post('/practice', authenticate, async (req, res) => {
  try {
    const { topic, count = 3 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (count < 1 || count > 10) {
      return res.status(400).json({ error: 'Count must be between 1 and 10' });
    }

    const problems = await generatePracticeProblems(topic, count);

    res.json({ problems });
  } catch (error) {
    console.error('Practice generation endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate practice problems',
    });
  }
});

/**
 * POST /api/ai/chat
 * Socratic tutoring chat for students
 */
router.post('/chat', authenticate, async (req, res) => {
  try {
    const {
      question,
      questionLatex,
      userAnswer,
      correctAnswer,
      explanation,
      options,
      topic,
      difficulty,
      visualData,
      messages,
      userMessage
    } = req.body;

    if (!question || userAnswer === undefined || correctAnswer === undefined || !userMessage) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' });
    }

    const result = await aiChat({
      question,
      questionLatex,
      userAnswer,
      correctAnswer,
      explanation,
      options,
      topic,
      difficulty,
      visualData,
      messages,
      userMessage
    });

    res.json(result);
  } catch (error) {
    console.error('AI chat endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al obtener respuesta de IA',
    });
  }
});

/**
 * POST /api/ai/help
 * Get AI help for incorrect answers
 */
router.post('/help', authenticate, async (req, res) => {
  try {
    const { question, userAnswer, correctAnswer, explanation, options, topic } = req.body;

    if (!question || userAnswer === undefined || correctAnswer === undefined) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' });
    }

    const result = await aiHelp({
      question,
      userAnswer,
      correctAnswer,
      explanation,
      options,
      topic
    });

    res.json(result);
  } catch (error) {
    console.error('AI help endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al obtener ayuda de IA',
    });
  }
});

export default router;
