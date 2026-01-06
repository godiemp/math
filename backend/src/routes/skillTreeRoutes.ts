import { Router } from 'express';
import { authenticate } from '../auth/middleware';
import {
  getSkillTreeWithStatus,
  startVerification,
  continueVerification,
} from '../services/skillTreeService';

const router = Router();

/**
 * GET /api/skill-tree
 * Get all skills with their status for the current user
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const skills = await getSkillTreeWithStatus(userId);
    res.json({ skills });
  } catch (error) {
    console.error('Get skill tree error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error al obtener árbol',
    });
  }
});

/**
 * POST /api/skill-tree/start
 * Start a verification session for a skill
 */
router.post('/start', authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { skillId } = req.body;
    if (!skillId) {
      return res.status(400).json({ error: 'skillId es requerido' });
    }

    const result = await startVerification(userId, skillId);
    res.json(result);
  } catch (error) {
    console.error('Start verification error:', error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'Error al iniciar verificación',
    });
  }
});

/**
 * POST /api/skill-tree/continue
 * Continue a verification session
 */
router.post('/continue', authenticate, async (req, res) => {
  try {
    const { sessionId, userMessage } = req.body;

    if (!sessionId || !userMessage) {
      return res
        .status(400)
        .json({ error: 'sessionId y userMessage son requeridos' });
    }

    const result = await continueVerification(sessionId, userMessage);
    res.json(result);
  } catch (error) {
    console.error('Continue verification error:', error);
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'Error al continuar verificación',
    });
  }
});

export default router;
