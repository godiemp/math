/**
 * Operations Practice Controller
 * Handles HTTP requests for the operations practice system
 */

import { Request, Response } from 'express';
import { pool } from '../config/database';
import {
  OPERATIONS_PATH,
  getLevelConfig,
  getTotalLevels,
  isValidLevel
} from '../config/operationsPath';
import { generateProblem, validateAnswer } from '../services/operationsPracticeService';

/**
 * Get all available levels in the operations path
 * GET /api/operations-practice/path
 */
export async function getOperationsPath(req: Request, res: Response) {
  try {
    res.json({
      success: true,
      path: OPERATIONS_PATH,
      totalLevels: getTotalLevels()
    });
  } catch (error) {
    console.error('Error getting operations path:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el camino de operaciones'
    });
  }
}

/**
 * Get user's progress in the operations practice
 * GET /api/operations-practice/progress
 */
export async function getUserProgress(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    // Get or create user progress
    let result = await pool.query(
      'SELECT * FROM operations_practice_progress WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      // Create initial progress
      const now = Date.now();
      result = await pool.query(
        `INSERT INTO operations_practice_progress
         (user_id, current_level, highest_level_reached, total_operations_solved, created_at, updated_at)
         VALUES ($1, 1, 1, 0, $2, $2)
         RETURNING *`,
        [userId, now]
      );
    }

    const progress = result.rows[0];

    res.json({
      success: true,
      progress: {
        currentLevel: progress.current_level,
        highestLevelReached: progress.highest_level_reached,
        totalOperationsSolved: progress.total_operations_solved,
        lastPracticeAt: progress.last_practice_at
      }
    });
  } catch (error) {
    console.error('Error getting user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el progreso del usuario'
    });
  }
}

/**
 * Get a problem for a specific level
 * GET /api/operations-practice/problem/:level
 */
export async function getProblem(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const level = parseInt(req.params.level);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    if (!isValidLevel(level)) {
      return res.status(400).json({
        success: false,
        message: 'Nivel inválido'
      });
    }

    // Check if user has access to this level
    const progressResult = await pool.query(
      'SELECT highest_level_reached FROM operations_practice_progress WHERE user_id = $1',
      [userId]
    );

    if (progressResult.rows.length > 0) {
      const highestLevel = progressResult.rows[0].highest_level_reached;
      if (level > highestLevel) {
        return res.status(403).json({
          success: false,
          message: 'Nivel bloqueado. Completa los niveles anteriores primero.'
        });
      }
    }

    // Generate problem
    const levelConfig = getLevelConfig(level);
    if (!levelConfig) {
      return res.status(404).json({
        success: false,
        message: 'Configuración de nivel no encontrada'
      });
    }

    const problem = generateProblem(levelConfig);

    res.json({
      success: true,
      problem: {
        level: levelConfig.level,
        title: levelConfig.title,
        description: levelConfig.description,
        expression: problem.expression,
        expressionLatex: problem.expressionLatex,
        difficulty: problem.difficulty,
        problemsToComplete: levelConfig.problemsToComplete
      },
      // Don't send the answer to the client
      problemId: Buffer.from(JSON.stringify(problem)).toString('base64') // Encode problem for validation
    });
  } catch (error) {
    console.error('Error generating problem:', error);
    res.status(500).json({
      success: false,
      message: 'Error al generar el problema'
    });
  }
}

/**
 * Submit an answer for a problem
 * POST /api/operations-practice/submit
 */
export async function submitAnswer(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const { problemId, answer, timeSpent, level } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    if (!problemId || answer === undefined || !level) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos'
      });
    }

    // Decode and validate problem
    let problem;
    try {
      const decoded = Buffer.from(problemId, 'base64').toString('utf-8');
      problem = JSON.parse(decoded);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'ID de problema inválido'
      });
    }

    const isCorrect = validateAnswer(problem, answer);
    const now = Date.now();

    // Save attempt
    await pool.query(
      `INSERT INTO operations_practice_attempts
       (user_id, level, operation_type, difficulty, problem_data, user_answer, correct_answer, is_correct, time_spent_seconds, attempted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        userId,
        level,
        problem.operations[0], // Primary operation type
        problem.difficulty,
        JSON.stringify(problem),
        answer,
        problem.answer.toString(),
        isCorrect,
        timeSpent || 0,
        now
      ]
    );

    // Update progress
    if (isCorrect) {
      await pool.query(
        `UPDATE operations_practice_progress
         SET total_operations_solved = total_operations_solved + 1,
             last_practice_at = $1,
             updated_at = $1
         WHERE user_id = $2`,
        [now, userId]
      );

      // Check if level should be unlocked
      const levelConfig = getLevelConfig(level);
      if (levelConfig) {
        const recentAttemptsResult = await pool.query(
          `SELECT COUNT(*) as correct_count
           FROM operations_practice_attempts
           WHERE user_id = $1 AND level = $2 AND is_correct = true
           AND attempted_at > $3`,
          [userId, level, now - 300000] // Last 5 minutes
        );

        const correctCount = parseInt(recentAttemptsResult.rows[0].correct_count);

        if (correctCount >= levelConfig.problemsToComplete) {
          // Unlock next level
          await pool.query(
            `UPDATE operations_practice_progress
             SET highest_level_reached = GREATEST(highest_level_reached, $1),
                 current_level = $1,
                 updated_at = $2
             WHERE user_id = $3`,
            [Math.min(level + 1, getTotalLevels()), now, userId]
          );

          return res.json({
            success: true,
            isCorrect,
            correctAnswer: problem.answer,
            levelCompleted: true,
            nextLevel: level + 1 <= getTotalLevels() ? level + 1 : null
          });
        }
      }
    }

    res.json({
      success: true,
      isCorrect,
      correctAnswer: problem.answer,
      levelCompleted: false
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar la respuesta'
    });
  }
}

/**
 * Get statistics for a specific level
 * GET /api/operations-practice/stats/:level
 */
export async function getLevelStats(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const level = parseInt(req.params.level);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    const result = await pool.query(
      `SELECT
         COUNT(*) as total_attempts,
         SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_attempts,
         AVG(time_spent_seconds) as avg_time_seconds
       FROM operations_practice_attempts
       WHERE user_id = $1 AND level = $2`,
      [userId, level]
    );

    const stats = result.rows[0];

    res.json({
      success: true,
      stats: {
        totalAttempts: parseInt(stats.total_attempts),
        correctAttempts: parseInt(stats.correct_attempts),
        accuracy: stats.total_attempts > 0
          ? (parseInt(stats.correct_attempts) / parseInt(stats.total_attempts) * 100).toFixed(1)
          : 0,
        avgTimeSeconds: stats.avg_time_seconds ? parseFloat(stats.avg_time_seconds).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error('Error getting level stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las estadísticas'
    });
  }
}

/**
 * Reset user progress (for testing/admin)
 * POST /api/operations-practice/reset
 */
export async function resetProgress(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    const now = Date.now();

    await pool.query(
      `UPDATE operations_practice_progress
       SET current_level = 1,
           highest_level_reached = 1,
           total_operations_solved = 0,
           updated_at = $1
       WHERE user_id = $2`,
      [now, userId]
    );

    res.json({
      success: true,
      message: 'Progreso reiniciado correctamente'
    });
  } catch (error) {
    console.error('Error resetting progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error al reiniciar el progreso'
    });
  }
}
