/**
 * Abstract Problems Controller
 * Handles API requests for abstract problems generation and management
 */

import { Request, Response } from 'express';
import {
  createAbstractProblem,
  getAbstractProblemById,
  listAbstractProblems,
  updateAbstractProblem,
  deleteAbstractProblem,
  activateAbstractProblem,
  getStatsByUnit,
} from '../services/abstractProblemService';
import {
  createContextProblem,
  getContextProblemById,
  listContextProblems,
  updateContextProblem,
  deleteContextProblem,
  getContextsByAbstractId,
  getRandomContextProblem,
} from '../services/contextProblemService';
import {
  generateAbstractProblems,
  generateNumerosM1Problems,
} from '../services/abstractProblemGenerator';
import {
  generateContextProblems,
  generateMultipleContexts,
  suggestContextTypes,
} from '../services/contextProblemGenerator';
import {
  GenerateAbstractProblemRequest,
  GenerateContextProblemRequest,
  CreateAbstractProblemInput,
  CreateContextProblemInput,
  Level,
  Subject,
  CognitiveLevel,
  DifficultyLevel,
} from '../types/abstractProblems';
import { THEMATIC_UNITS } from '../config/thematic-units';
import { pool } from '../config/database';

// ========================================
// Abstract Problem Endpoints
// ========================================

/**
 * Generate abstract problems using OpenAI
 * POST /api/abstract-problems/generate
 */
export const generateAbstractProblemsController = async (req: Request, res: Response) => {
  try {
    const {
      level,
      subject,
      unit,
      difficulty,
      cognitive_level,
      primary_skills,
      secondary_skills,
      count = 1,
      save_to_db = true,
    } = req.body as GenerateAbstractProblemRequest & { save_to_db?: boolean };

    // Validate input
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

    if (!unit) {
      return res.status(400).json({
        success: false,
        error: 'unit is required',
      });
    }

    if (
      !difficulty ||
      !['easy', 'medium', 'hard', 'extreme'].includes(difficulty)
    ) {
      return res.status(400).json({
        success: false,
        error: 'difficulty must be easy, medium, hard, or extreme',
      });
    }

    if (
      !cognitive_level ||
      !['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'].includes(
        cognitive_level
      )
    ) {
      return res.status(400).json({
        success: false,
        error: 'cognitive_level is required',
      });
    }

    if (!primary_skills || !Array.isArray(primary_skills) || primary_skills.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'primary_skills must be a non-empty array',
      });
    }

    // Generate problems
    const generatedProblems = await generateAbstractProblems({
      level,
      subject,
      unit,
      difficulty,
      cognitive_level,
      primary_skills,
      secondary_skills,
      count,
    });

    // Save to database if requested
    let savedProblems = null;
    if (save_to_db) {
      savedProblems = await Promise.all(
        generatedProblems.map(async (genProb) => {
          const input: CreateAbstractProblemInput = {
            essence: genProb.essence,
            cognitive_level,
            level,
            subject,
            unit,
            difficulty,
            difficulty_score: genProb.suggested_difficulty_score,
            primary_skills,
            secondary_skills,
            generation_method: 'openai',
            generated_by: (req as any).user?.id || 'system',
            answer_type: genProb.answer_type,
            expected_steps: genProb.expected_steps,
            common_errors: genProb.common_errors,
            status: 'draft',
          };

          return createAbstractProblem(input);
        })
      );
    }

    res.json({
      success: true,
      count: generatedProblems.length,
      generated: generatedProblems,
      saved: savedProblems,
    });
  } catch (error: any) {
    console.error('Error generating abstract problems:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate abstract problems',
    });
  }
};

/**
 * Generate all números M1 problems
 * POST /api/abstract-problems/generate-numeros-m1
 */
export const generateNumerosM1Controller = async (req: Request, res: Response) => {
  try {
    const { save_to_db = true } = req.body;

    const generatedProblems = await generateNumerosM1Problems();

    // Save to database if requested
    let savedProblems = null;
    if (save_to_db) {
      savedProblems = await Promise.all(
        generatedProblems.map(async (genProb) => {
          const input: CreateAbstractProblemInput = {
            essence: genProb.essence,
            cognitive_level: 'apply', // Default, will be updated
            level: 'M1',
            subject: 'números',
            unit: 'enteros-racionales',
            difficulty: 'medium', // Default, will be updated
            difficulty_score: genProb.suggested_difficulty_score,
            primary_skills: [],
            generation_method: 'openai',
            generated_by: (req as any).user?.id || 'system',
            answer_type: genProb.answer_type,
            expected_steps: genProb.expected_steps,
            common_errors: genProb.common_errors,
            status: 'draft',
          };

          return createAbstractProblem(input);
        })
      );
    }

    res.json({
      success: true,
      count: generatedProblems.length,
      generated: generatedProblems,
      saved: savedProblems,
    });
  } catch (error: any) {
    console.error('Error generating números M1 problems:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate números M1 problems',
    });
  }
};

/**
 * List abstract problems with filters
 * GET /api/abstract-problems
 */
export const listAbstractProblemsController = async (req: Request, res: Response) => {
  try {
    const {
      level,
      subject,
      unit,
      difficulty,
      status,
      cognitive_level,
      skills,
      min_difficulty_score,
      max_difficulty_score,
      limit,
      offset,
      sort_by,
      sort_order,
    } = req.query;

    const filters: any = {};
    if (level) filters.level = level;
    if (subject) filters.subject = subject;
    if (unit) filters.unit = unit;
    if (difficulty) filters.difficulty = difficulty;
    if (status) filters.status = status;
    if (cognitive_level) filters.cognitive_level = cognitive_level;
    if (skills) filters.skills = Array.isArray(skills) ? skills : [skills];
    if (min_difficulty_score) filters.min_difficulty_score = parseInt(min_difficulty_score as string);
    if (max_difficulty_score) filters.max_difficulty_score = parseInt(max_difficulty_score as string);

    const options: any = {};
    if (limit) options.limit = parseInt(limit as string);
    if (offset) options.offset = parseInt(offset as string);
    if (sort_by) options.sort_by = sort_by;
    if (sort_order) options.sort_order = sort_order;

    const result = await listAbstractProblems(filters, options);

    res.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('Error listing abstract problems:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to list abstract problems',
    });
  }
};

/**
 * Get single abstract problem by ID
 * GET /api/abstract-problems/:id
 */
export const getAbstractProblemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const problem = await getAbstractProblemById(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: 'Abstract problem not found',
      });
    }

    res.json({
      success: true,
      problem,
    });
  } catch (error: any) {
    console.error('Error getting abstract problem:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get abstract problem',
    });
  }
};

/**
 * Update abstract problem
 * PUT /api/abstract-problems/:id
 */
export const updateAbstractProblemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const problem = await updateAbstractProblem(id, updates);

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: 'Abstract problem not found',
      });
    }

    res.json({
      success: true,
      problem,
    });
  } catch (error: any) {
    console.error('Error updating abstract problem:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update abstract problem',
    });
  }
};

/**
 * Delete abstract problem
 * DELETE /api/abstract-problems/:id
 */
export const deleteAbstractProblemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteAbstractProblem(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Abstract problem not found',
      });
    }

    res.json({
      success: true,
      message: 'Abstract problem deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting abstract problem:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete abstract problem',
    });
  }
};

/**
 * Activate abstract problem
 * POST /api/abstract-problems/:id/activate
 */
export const activateAbstractProblemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const problem = await activateAbstractProblem(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: 'Abstract problem not found',
      });
    }

    res.json({
      success: true,
      problem,
    });
  } catch (error: any) {
    console.error('Error activating abstract problem:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to activate abstract problem',
    });
  }
};

/**
 * Get statistics by unit
 * GET /api/abstract-problems/stats/by-unit
 */
export const getStatsByUnitController = async (req: Request, res: Response) => {
  try {
    const { level, subject } = req.query;

    const stats = await getStatsByUnit(
      level as 'M1' | 'M2' | undefined,
      subject as string | undefined
    );

    res.json({
      success: true,
      stats,
    });
  } catch (error: any) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get statistics',
    });
  }
};

/**
 * Bulk seed abstract problems
 * POST /api/abstract-problems/seed
 * Body: { level?: 'M1' | 'M2', subject?: string, limit?: number, dryRun?: boolean }
 */
export const seedAbstractProblemsController = async (req: Request, res: Response) => {
  try {
    const {
      level: levelFilter,
      subject: subjectFilter,
      limit,
      dryRun = false,
    } = req.body;

    // Validate filters
    if (levelFilter && !['M1', 'M2'].includes(levelFilter)) {
      return res.status(400).json({
        success: false,
        error: 'level must be M1 or M2',
      });
    }

    if (subjectFilter && !['números', 'álgebra', 'geometría', 'probabilidad'].includes(subjectFilter)) {
      return res.status(400).json({
        success: false,
        error: 'subject must be números, álgebra, geometría, or probabilidad',
      });
    }

    if (!process.env.OPENAI_API_KEY && !dryRun) {
      return res.status(500).json({
        success: false,
        error: 'OPENAI_API_KEY is not configured',
      });
    }

    // Generate unit configurations (same logic as seed script)
    interface UnitGenerationConfig {
      unit_code: string;
      unit_name: string;
      level: Level;
      subject: Subject;
      total_problems: number;
      distribution: {
        difficulty: DifficultyLevel;
        cognitive_level: CognitiveLevel;
        count: number;
      }[];
    }

    const standardDistribution = [
      { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'understand' as CognitiveLevel, count: 3 },
      { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'apply' as CognitiveLevel, count: 3 },
      { difficulty: 'medium' as DifficultyLevel, cognitive_level: 'apply' as CognitiveLevel, count: 3 },
      { difficulty: 'medium' as DifficultyLevel, cognitive_level: 'analyze' as CognitiveLevel, count: 3 },
      { difficulty: 'hard' as DifficultyLevel, cognitive_level: 'analyze' as CognitiveLevel, count: 2 },
      { difficulty: 'hard' as DifficultyLevel, cognitive_level: 'evaluate' as CognitiveLevel, count: 1 },
    ];

    const extendedDistribution = [
      { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'remember' as CognitiveLevel, count: 2 },
      { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'understand' as CognitiveLevel, count: 4 },
      { difficulty: 'easy' as DifficultyLevel, cognitive_level: 'apply' as CognitiveLevel, count: 4 },
      { difficulty: 'medium' as DifficultyLevel, cognitive_level: 'apply' as CognitiveLevel, count: 5 },
      { difficulty: 'medium' as DifficultyLevel, cognitive_level: 'analyze' as CognitiveLevel, count: 5 },
      { difficulty: 'hard' as DifficultyLevel, cognitive_level: 'analyze' as CognitiveLevel, count: 4 },
      { difficulty: 'hard' as DifficultyLevel, cognitive_level: 'evaluate' as CognitiveLevel, count: 3 },
      { difficulty: 'extreme' as DifficultyLevel, cognitive_level: 'evaluate' as CognitiveLevel, count: 2 },
      { difficulty: 'extreme' as DifficultyLevel, cognitive_level: 'create' as CognitiveLevel, count: 1 },
    ];

    const keyUnits = [
      'M1-NUM-001', 'M1-NUM-002', 'M1-NUM-005', 'M1-ALG-006',
      'M1-ALG-011', 'M1-GEO-002', 'M1-PROB-002', 'M1-PROB-004',
    ];

    let configs: UnitGenerationConfig[] = [];
    for (const unit of THEMATIC_UNITS) {
      const isKeyUnit = keyUnits.includes(unit.code);
      configs.push({
        unit_code: unit.code,
        unit_name: unit.name,
        level: unit.level,
        subject: unit.subject,
        total_problems: isKeyUnit ? 30 : 15,
        distribution: isKeyUnit ? extendedDistribution : standardDistribution,
      });
    }

    // Apply filters
    if (levelFilter) {
      configs = configs.filter(c => c.level === levelFilter);
    }
    if (subjectFilter) {
      configs = configs.filter(c => c.subject === subjectFilter);
    }
    if (limit) {
      configs = configs.slice(0, limit);
    }

    const totalProblems = configs.reduce((sum, c) => sum + c.total_problems, 0);

    // Return early if dry run
    if (dryRun) {
      return res.json({
        success: true,
        dryRun: true,
        plan: {
          units: configs.length,
          totalProblems,
          configs: configs.map(c => ({
            unit: c.unit_name,
            code: c.unit_code,
            level: c.level,
            subject: c.subject,
            problems: c.total_problems,
          })),
        },
      });
    }

    // Start the seeding process (run async, don't wait)
    // We'll return immediately and let it run in the background
    const startTime = Date.now();
    let totalSuccess = 0;
    let totalFailed = 0;

    // Process each unit
    for (const config of configs) {
      for (const dist of config.distribution) {
        try {
          const request: GenerateAbstractProblemRequest = {
            level: config.level,
            subject: config.subject,
            unit: config.unit_name,
            difficulty: dist.difficulty,
            cognitive_level: dist.cognitive_level,
            primary_skills: [config.unit_code.toLowerCase()],
            count: dist.count,
          };

          const generated = await generateAbstractProblems(request);

          // Save each generated problem
          for (const problem of generated) {
            try {
              await createAbstractProblem({
                essence: problem.essence,
                cognitive_level: dist.cognitive_level,
                level: config.level,
                subject: config.subject,
                unit: config.unit_name,
                difficulty: dist.difficulty,
                difficulty_score: problem.suggested_difficulty_score,
                primary_skills: [config.unit_code.toLowerCase()],
                secondary_skills: [],
                generation_method: 'openai',
                generated_by: (req as any).user?.id || 'seed-api',
                generation_prompt: `Unit: ${config.unit_name}`,
                answer_type: problem.answer_type,
                expected_steps: problem.expected_steps,
                common_errors: problem.common_errors,
                status: 'draft',
              });
              totalSuccess++;
            } catch (dbError: any) {
              console.error(`Failed to save problem: ${dbError.message}`);
              totalFailed++;
            }
          }

          // Rate limiting: wait 1 second between API calls
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: any) {
          console.error(`Failed to generate: ${error.message}`);
          totalFailed += dist.count;
        }
      }
    }

    const endTime = Date.now();
    const durationMinutes = ((endTime - startTime) / 1000 / 60).toFixed(1);

    res.json({
      success: true,
      message: 'Seeding completed',
      results: {
        unitsProcessed: configs.length,
        problemsCreated: totalSuccess,
        problemsFailed: totalFailed,
        successRate: ((totalSuccess / (totalSuccess + totalFailed)) * 100).toFixed(1) + '%',
        durationMinutes,
      },
    });
  } catch (error: any) {
    console.error('Error seeding abstract problems:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to seed abstract problems',
    });
  }
};

/**
 * Activate all draft problems
 * POST /api/abstract-problems/activate-all
 */
export const activateAllDraftsController = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      UPDATE abstract_problems
      SET status = 'active', updated_at = $1
      WHERE status = 'draft'
      RETURNING id
    `, [Date.now()]);

    res.json({
      success: true,
      message: `Activated ${result.rowCount} problems`,
      count: result.rowCount,
    });
  } catch (error: any) {
    console.error('Error activating drafts:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to activate draft problems',
    });
  }
};

/**
 * Get coverage statistics
 * GET /api/abstract-problems/coverage
 */
export const getCoverageStatsController = async (req: Request, res: Response) => {
  try {
    // Get units from database
    const dbResult = await pool.query(`
      SELECT DISTINCT unit, COUNT(*) as count
      FROM abstract_problems
      GROUP BY unit
      ORDER BY unit
    `);

    const taxonomyUnits = THEMATIC_UNITS.map(u => ({
      code: u.code,
      name: u.name,
      level: u.level,
      subject: u.subject,
    }));

    const dbUnitsMap = new Map(dbResult.rows.map(r => [r.unit, r.count]));

    const coverage = taxonomyUnits.map(unit => ({
      code: unit.code,
      name: unit.name,
      level: unit.level,
      subject: unit.subject,
      problemCount: dbUnitsMap.get(unit.name) || 0,
      hasPrblems: dbUnitsMap.has(unit.name),
    }));

    const totalUnits = taxonomyUnits.length;
    const unitsWithProblems = dbResult.rows.length;
    const unitsWithoutProblems = totalUnits - unitsWithProblems;

    res.json({
      success: true,
      summary: {
        totalUnits,
        unitsWithProblems,
        unitsWithoutProblems,
        coveragePercent: ((unitsWithProblems / totalUnits) * 100).toFixed(1) + '%',
      },
      coverage,
      unitsWithProblems: dbResult.rows,
    });
  } catch (error: any) {
    console.error('Error getting coverage stats:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get coverage statistics',
    });
  }
};

// ========================================
// Context Problem Endpoints
// ========================================

/**
 * Generate context problems from abstract problem
 * POST /api/context-problems/generate
 */
export const generateContextProblemsController = async (req: Request, res: Response) => {
  try {
    const {
      abstract_problem_id,
      context_type,
      count = 1,
      save_to_db = true,
    } = req.body;

    if (!abstract_problem_id) {
      return res.status(400).json({
        success: false,
        error: 'abstract_problem_id is required',
      });
    }

    if (!context_type) {
      return res.status(400).json({
        success: false,
        error: 'context_type is required',
      });
    }

    // Get abstract problem
    const abstractProblem = await getAbstractProblemById(abstract_problem_id);
    if (!abstractProblem) {
      return res.status(404).json({
        success: false,
        error: 'Abstract problem not found',
      });
    }

    // Generate context problems
    const generatedProblems = await generateContextProblems(abstractProblem, {
      abstract_problem_id,
      context_type,
      count,
    });

    // Save to database if requested
    let savedProblems = null;
    if (save_to_db) {
      savedProblems = await Promise.all(
        generatedProblems.map(async (genProb) => {
          const input: CreateContextProblemInput = {
            abstract_problem_id,
            context_type,
            context_description: genProb.context_description,
            question: genProb.question,
            question_latex: genProb.question_latex,
            options: genProb.options,
            options_latex: genProb.options_latex,
            correct_answer: genProb.correct_answer,
            explanation: genProb.explanation,
            explanation_latex: genProb.explanation_latex,
            step_by_step: genProb.step_by_step,
            variable_values: genProb.variable_values,
            generation_method: 'openai',
          };

          return createContextProblem(input);
        })
      );
    }

    res.json({
      success: true,
      count: generatedProblems.length,
      generated: generatedProblems,
      saved: savedProblems,
    });
  } catch (error: any) {
    console.error('Error generating context problems:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate context problems',
    });
  }
};

/**
 * List context problems
 * GET /api/context-problems
 */
export const listContextProblemsController = async (req: Request, res: Response) => {
  try {
    const {
      abstract_problem_id,
      context_type,
      status,
      verified,
      min_quality_score,
      max_quality_score,
      limit,
      offset,
      sort_by,
      sort_order,
    } = req.query;

    const filters: any = {};
    if (abstract_problem_id) filters.abstract_problem_id = abstract_problem_id;
    if (context_type) filters.context_type = context_type;
    if (status) filters.status = status;
    if (verified !== undefined) filters.verified = verified === 'true';
    if (min_quality_score) filters.min_quality_score = parseInt(min_quality_score as string);
    if (max_quality_score) filters.max_quality_score = parseInt(max_quality_score as string);

    const options: any = {};
    if (limit) options.limit = parseInt(limit as string);
    if (offset) options.offset = parseInt(offset as string);
    if (sort_by) options.sort_by = sort_by;
    if (sort_order) options.sort_order = sort_order;

    const result = await listContextProblems(filters, options);

    res.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('Error listing context problems:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to list context problems',
    });
  }
};

/**
 * Get context problems by abstract problem ID
 * GET /api/context-problems/by-abstract/:id
 */
export const getContextsByAbstractController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const problems = await getContextsByAbstractId(id);

    res.json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (error: any) {
    console.error('Error getting context problems:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get context problems',
    });
  }
};

/**
 * Suggest context types for abstract problem
 * GET /api/context-problems/suggest-contexts/:id
 */
export const suggestContextTypesController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const abstractProblem = await getAbstractProblemById(id);
    if (!abstractProblem) {
      return res.status(404).json({
        success: false,
        error: 'Abstract problem not found',
      });
    }

    const suggestions = suggestContextTypes(abstractProblem);

    res.json({
      success: true,
      suggestions,
    });
  } catch (error: any) {
    console.error('Error suggesting context types:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to suggest context types',
    });
  }
};
