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
    // Return M1 structure with detailed subsections
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
              {
                slug: 'numeros-enteros-racionales',
                name: 'Números Enteros y Racionales',
                questionCount: 25,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'operaciones-enteros', name: 'Operaciones con Enteros' },
                  { slug: 'numeros-racionales', name: 'Números Racionales' },
                  { slug: 'operaciones-racionales', name: 'Operaciones con Racionales' },
                  { slug: 'comparacion', name: 'Comparación de Números' }
                ]
              },
              {
                slug: 'numeros-porcentaje',
                name: 'Porcentaje',
                questionCount: 15,
                difficulty: 1,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'conversiones-basicas', name: 'Conversiones Básicas' },
                  { slug: 'calcular-porcentaje', name: 'Operaciones con Porcentajes' },
                  { slug: 'aumentos-descuentos', name: 'Aumentos y Descuentos Sucesivos' },
                  { slug: 'porcentajes-importantes', name: 'Porcentajes Importantes' }
                ]
              },
              {
                slug: 'numeros-potencias-raices',
                name: 'Potencias y Raíces',
                questionCount: 20,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'propiedades-potencias', name: 'Propiedades de Potencias' },
                  { slug: 'notacion-cientifica', name: 'Notación Científica' },
                  { slug: 'raices', name: 'Raíces' },
                  { slug: 'racionalizacion', name: 'Racionalización' }
                ]
              },
              {
                slug: 'numeros-proporcionalidad',
                name: 'Proporcionalidad',
                questionCount: 12,
                difficulty: 1,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'proporcion-directa', name: 'Proporción Directa' },
                  { slug: 'proporcion-inversa', name: 'Proporción Inversa' },
                  { slug: 'regla-tres', name: 'Regla de Tres' }
                ]
              }
            ]
          },
          {
            id: 'algebra',
            name: 'Álgebra y Funciones',
            topics: [
              {
                slug: 'algebra-expresiones-algebraicas',
                name: 'Expresiones Algebraicas',
                questionCount: 25,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'terminos-semejantes', name: 'Términos Semejantes' },
                  { slug: 'productos-notables', name: 'Productos Notables' },
                  { slug: 'factorizacion', name: 'Factorización' }
                ]
              },
              {
                slug: 'algebra-ecuaciones-inecuaciones',
                name: 'Ecuaciones e Inecuaciones',
                questionCount: 18,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'ecuaciones-lineales', name: 'Ecuaciones Lineales' },
                  { slug: 'ecuaciones-cuadraticas', name: 'Ecuaciones Cuadráticas' },
                  { slug: 'inecuaciones', name: 'Inecuaciones' },
                  { slug: 'sistemas', name: 'Sistemas de Ecuaciones' }
                ]
              },
              {
                slug: 'algebra-sistemas-ecuaciones',
                name: 'Sistemas de Ecuaciones',
                questionCount: 10,
                difficulty: 3,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'metodo-sustitucion', name: 'Método de Sustitución' },
                  { slug: 'metodo-igualacion', name: 'Método de Igualación' },
                  { slug: 'metodo-reduccion', name: 'Método de Reducción' },
                  { slug: 'metodo-grafico', name: 'Método Gráfico' }
                ]
              },
              {
                slug: 'algebra-funciones-lineales',
                name: 'Funciones Lineales',
                questionCount: 15,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'pendiente', name: 'Pendiente' },
                  { slug: 'intercepto-y', name: 'Intercepto con el Eje Y' },
                  { slug: 'formas-ecuacion', name: 'Formas de la Ecuación' },
                  { slug: 'rectas-paralelas', name: 'Rectas Paralelas y Perpendiculares' },
                  { slug: 'grafica', name: 'Gráfica de la Función Lineal' }
                ]
              },
              {
                slug: 'algebra-funciones-cuadraticas',
                name: 'Funciones Cuadráticas',
                questionCount: 12,
                difficulty: 3,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'forma-general', name: 'Forma General' },
                  { slug: 'vertice', name: 'Vértice de la Parábola' },
                  { slug: 'raices', name: 'Raíces y Discriminante' },
                  { slug: 'grafica', name: 'Gráfica de la Parábola' }
                ]
              }
            ]
          },
          {
            id: 'geometria',
            name: 'Geometría',
            topics: [
              {
                slug: 'geometria-perimetro-area',
                name: 'Perímetro y Área',
                questionCount: 30,
                difficulty: 1,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'triangulos', name: 'Triángulos' },
                  { slug: 'cuadrilateros', name: 'Cuadriláteros' },
                  { slug: 'circulos', name: 'Círculos' },
                  { slug: 'figuras-compuestas', name: 'Figuras Compuestas' }
                ]
              },
              {
                slug: 'geometria-teorema-pitagoras',
                name: 'Teorema de Pitágoras',
                questionCount: 15,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'aplicaciones', name: 'Aplicaciones' },
                  { slug: 'triangulos-notables', name: 'Triángulos Notables' },
                  { slug: 'problemas-espaciales', name: 'Problemas en 3D' }
                ]
              },
              {
                slug: 'geometria-volumen',
                name: 'Volumen',
                questionCount: 8,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'prismas', name: 'Prismas y Cilindros' },
                  { slug: 'piramides', name: 'Pirámides y Conos' },
                  { slug: 'esferas', name: 'Esferas' }
                ]
              },
              {
                slug: 'geometria-transformaciones',
                name: 'Transformaciones Isométricas',
                questionCount: 5,
                difficulty: 3,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'traslacion', name: 'Traslación' },
                  { slug: 'reflexion', name: 'Reflexión' },
                  { slug: 'rotacion', name: 'Rotación' }
                ]
              }
            ]
          },
          {
            id: 'probabilidad',
            name: 'Probabilidad y Estadística',
            topics: [
              {
                slug: 'probabilidad-tablas-graficos',
                name: 'Tablas y Gráficos',
                questionCount: 12,
                difficulty: 1,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'tablas-frecuencia', name: 'Tablas de Frecuencia' },
                  { slug: 'graficos-barras', name: 'Gráficos de Barras' },
                  { slug: 'graficos-linea', name: 'Gráficos de Línea' },
                  { slug: 'graficos-circular', name: 'Gráficos Circulares' }
                ]
              },
              {
                slug: 'probabilidad-tendencia-central',
                name: 'Medidas de Tendencia Central',
                questionCount: 18,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'media', name: 'Media Aritmética' },
                  { slug: 'mediana', name: 'Mediana' },
                  { slug: 'moda', name: 'Moda' },
                  { slug: 'comparacion', name: 'Comparación de Medidas' }
                ]
              },
              {
                slug: 'probabilidad-medidas-posicion',
                name: 'Medidas de Posición',
                questionCount: 15,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'cuartiles', name: 'Cuartiles' },
                  { slug: 'percentiles', name: 'Percentiles' },
                  { slug: 'rango', name: 'Rango y Rango Intercuartílico' }
                ]
              },
              {
                slug: 'probabilidad-reglas-probabilidad',
                name: 'Reglas de Probabilidad',
                questionCount: 20,
                difficulty: 2,
                subsections: [
                  { slug: 'conceptos-clave', name: 'Conceptos Clave' },
                  { slug: 'eventos-simples', name: 'Eventos Simples' },
                  { slug: 'regla-suma', name: 'Regla de la Suma' },
                  { slug: 'regla-producto', name: 'Regla del Producto' },
                  { slug: 'probabilidad-condicional', name: 'Probabilidad Condicional' }
                ]
              }
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
