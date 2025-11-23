/**
 * Curriculum Progress Controller
 * Handles HTTP requests for curriculum topic progress (skill tree)
 */

import { Request, Response } from 'express';
import { pool } from '../config/database';

/**
 * Get curriculum structure for M1
 * GET /api/curriculum-progress/structure
 */
export async function getCurriculumStructure(req: Request, res: Response) {
  try {
    // Return M1 structure - in production this could be dynamic
    res.json({
      success: true,
      structure: {
        level: 'M1',
        name: 'Matemática Nivel 1 - PAES',
        subjects: [
          {
            id: 'numeros',
            name: 'Números y Operaciones',
            topics: [
              { slug: 'numeros-enteros-racionales', name: 'Números Enteros y Racionales', questionCount: 25, difficulty: 2 },
              { slug: 'numeros-porcentaje', name: 'Porcentaje', questionCount: 15, difficulty: 1 },
              { slug: 'numeros-potencias-raices', name: 'Potencias y Raíces', questionCount: 20, difficulty: 2 },
              { slug: 'numeros-proporcionalidad', name: 'Proporcionalidad', questionCount: 12, difficulty: 1 }
            ]
          },
          {
            id: 'algebra',
            name: 'Álgebra y Funciones',
            topics: [
              { slug: 'algebra-expresiones-algebraicas', name: 'Expresiones Algebraicas', questionCount: 25, difficulty: 2 },
              { slug: 'algebra-ecuaciones-inecuaciones', name: 'Ecuaciones e Inecuaciones', questionCount: 18, difficulty: 2 },
              { slug: 'algebra-sistemas-ecuaciones', name: 'Sistemas de Ecuaciones', questionCount: 10, difficulty: 3 },
              { slug: 'algebra-funciones-lineales', name: 'Funciones Lineales', questionCount: 15, difficulty: 2 },
              { slug: 'algebra-funciones-cuadraticas', name: 'Funciones Cuadráticas', questionCount: 12, difficulty: 3 }
            ]
          },
          {
            id: 'geometria',
            name: 'Geometría',
            topics: [
              { slug: 'geometria-perimetro-area', name: 'Perímetro y Área', questionCount: 30, difficulty: 1 },
              { slug: 'geometria-teorema-pitagoras', name: 'Teorema de Pitágoras', questionCount: 15, difficulty: 2 },
              { slug: 'geometria-volumen', name: 'Volumen', questionCount: 8, difficulty: 2 },
              { slug: 'geometria-transformaciones', name: 'Transformaciones Isométricas', questionCount: 5, difficulty: 3 }
            ]
          },
          {
            id: 'probabilidad',
            name: 'Probabilidad y Estadística',
            topics: [
              { slug: 'probabilidad-tablas-graficos', name: 'Tablas y Gráficos', questionCount: 12, difficulty: 1 },
              { slug: 'probabilidad-tendencia-central', name: 'Medidas de Tendencia Central', questionCount: 18, difficulty: 2 },
              { slug: 'probabilidad-medidas-posicion', name: 'Medidas de Posición', questionCount: 15, difficulty: 2 },
              { slug: 'probabilidad-reglas-probabilidad', name: 'Reglas de Probabilidad', questionCount: 20, difficulty: 2 }
            ]
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error getting curriculum structure:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la estructura del currículum'
    });
  }
}

/**
 * Get current user's curriculum progress
 * GET /api/curriculum-progress
 */
export async function getMyProgress(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    const result = await pool.query(
      `SELECT topic_slug, subject, level, is_completed, completed_at, notes, created_at, updated_at
       FROM curriculum_topic_progress
       WHERE user_id = $1 AND level = $2
       ORDER BY subject, topic_slug`,
      [userId, 'M1']
    );

    res.json({
      success: true,
      progress: result.rows.map(row => ({
        topicSlug: row.topic_slug,
        subject: row.subject,
        level: row.level,
        isCompleted: row.is_completed,
        completedAt: row.completed_at,
        notes: row.notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }))
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
 * Update current user's topic progress
 * POST /api/curriculum-progress/topics
 * Body: { topicSlug: string, subject: string, isCompleted: boolean, notes?: string }
 */
export async function updateMyTopicProgress(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    const { topicSlug, subject, isCompleted, notes } = req.body;

    if (!topicSlug || !subject || typeof isCompleted !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Datos inválidos. Se requiere topicSlug, subject y isCompleted'
      });
    }

    const now = Date.now();
    const completedAt = isCompleted ? now : null;

    // Upsert: insert or update if exists
    const result = await pool.query(
      `INSERT INTO curriculum_topic_progress
        (user_id, topic_slug, subject, level, is_completed, completed_at, notes, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (user_id, topic_slug, level)
       DO UPDATE SET
         is_completed = $5,
         completed_at = $6,
         notes = $7,
         updated_at = $9
       RETURNING *`,
      [userId, topicSlug, subject, 'M1', isCompleted, completedAt, notes || null, now, now]
    );

    const row = result.rows[0];

    res.json({
      success: true,
      progress: {
        topicSlug: row.topic_slug,
        subject: row.subject,
        level: row.level,
        isCompleted: row.is_completed,
        completedAt: row.completed_at,
        notes: row.notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }
    });
  } catch (error) {
    console.error('Error updating topic progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el progreso del tema'
    });
  }
}
