import { Router } from 'express';
import { summarizeContent, generatePracticeProblems } from '../services/aiService';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * POST /api/ai/summarize
 * Summarize educational content
 */
router.post('/summarize', authenticateToken, async (req, res) => {
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
router.post('/practice', authenticateToken, async (req, res) => {
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

export default router;
