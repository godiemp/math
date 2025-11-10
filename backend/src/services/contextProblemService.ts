/**
 * Database service for Context Problems
 */

import { pool } from '../config/database';
import {
  ContextProblem,
  CreateContextProblemInput,
  UpdateContextProblemInput,
  ContextProblemFilters,
  ProblemQueryOptions,
} from '../types/abstractProblems';

/**
 * Create a new context problem
 */
export async function createContextProblem(
  input: CreateContextProblemInput
): Promise<ContextProblem> {
  const now = Date.now();

  const query = `
    INSERT INTO context_problems (
      abstract_problem_id, context_type, context_description,
      question, question_latex, options, options_latex, correct_answer,
      explanation, explanation_latex, step_by_step,
      variable_values, images, visual_data,
      generation_method, template_id, generation_params,
      quality_score, verified, verification_notes,
      created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
    ) RETURNING *
  `;

  const values = [
    input.abstract_problem_id,
    input.context_type,
    input.context_description,
    input.question,
    input.question_latex || null,
    JSON.stringify(input.options || []),
    JSON.stringify(input.options_latex || []),
    input.correct_answer ?? null,
    input.explanation,
    input.explanation_latex || null,
    JSON.stringify(input.step_by_step || []),
    JSON.stringify(input.variable_values || {}),
    JSON.stringify(input.images || []),
    JSON.stringify(input.visual_data || null),
    input.generation_method,
    input.template_id || null,
    JSON.stringify(input.generation_params || {}),
    input.quality_score || null,
    input.verified || false,
    input.verification_notes || null,
    now,
    now,
  ];

  const result = await pool.query(query, values);
  return mapRowToContextProblem(result.rows[0]);
}

/**
 * Get context problem by ID
 */
export async function getContextProblemById(id: string): Promise<ContextProblem | null> {
  const query = 'SELECT * FROM context_problems WHERE id = $1';
  const result = await pool.query(query, [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return mapRowToContextProblem(result.rows[0]);
}

/**
 * List context problems with filters and pagination
 */
export async function listContextProblems(
  filters: ContextProblemFilters = {},
  options: ProblemQueryOptions = {}
): Promise<{ problems: ContextProblem[]; total: number }> {
  const {
    abstract_problem_id,
    context_type,
    status,
    verified,
    min_quality_score,
    max_quality_score,
  } = filters;

  const { limit = 50, offset = 0, sort_by = 'created_at', sort_order = 'desc' } = options;

  // Build WHERE clause
  const conditions: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (abstract_problem_id) {
    conditions.push(`abstract_problem_id = $${paramCount++}`);
    values.push(abstract_problem_id);
  }

  if (context_type) {
    conditions.push(`context_type = $${paramCount++}`);
    values.push(context_type);
  }

  if (status) {
    conditions.push(`status = $${paramCount++}`);
    values.push(status);
  }

  if (verified !== undefined) {
    conditions.push(`verified = $${paramCount++}`);
    values.push(verified);
  }

  if (min_quality_score !== undefined) {
    conditions.push(`quality_score >= $${paramCount++}`);
    values.push(min_quality_score);
  }

  if (max_quality_score !== undefined) {
    conditions.push(`quality_score <= $${paramCount++}`);
    values.push(max_quality_score);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Count query
  const countQuery = `SELECT COUNT(*) FROM context_problems ${whereClause}`;
  const countResult = await pool.query(countQuery, values);
  const total = parseInt(countResult.rows[0].count);

  // Data query
  const dataQuery = `
    SELECT * FROM context_problems
    ${whereClause}
    ORDER BY ${sort_by} ${sort_order.toUpperCase()}
    LIMIT $${paramCount++} OFFSET $${paramCount++}
  `;

  const dataValues = [...values, limit, offset];
  const dataResult = await pool.query(dataQuery, dataValues);

  const problems = dataResult.rows.map(mapRowToContextProblem);

  return { problems, total };
}

/**
 * Get all context problems for a specific abstract problem
 */
export async function getContextsByAbstractId(
  abstractProblemId: string
): Promise<ContextProblem[]> {
  const query = `
    SELECT * FROM context_problems
    WHERE abstract_problem_id = $1 AND status = 'active'
    ORDER BY quality_score DESC NULLS LAST, created_at DESC
  `;

  const result = await pool.query(query, [abstractProblemId]);
  return result.rows.map(mapRowToContextProblem);
}

/**
 * Update a context problem
 */
export async function updateContextProblem(
  id: string,
  input: UpdateContextProblemInput
): Promise<ContextProblem | null> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  // Build SET clause dynamically
  if (input.context_type !== undefined) {
    updates.push(`context_type = $${paramCount++}`);
    values.push(input.context_type);
  }

  if (input.context_description !== undefined) {
    updates.push(`context_description = $${paramCount++}`);
    values.push(input.context_description);
  }

  if (input.question !== undefined) {
    updates.push(`question = $${paramCount++}`);
    values.push(input.question);
  }

  if (input.question_latex !== undefined) {
    updates.push(`question_latex = $${paramCount++}`);
    values.push(input.question_latex);
  }

  if (input.options !== undefined) {
    updates.push(`options = $${paramCount++}`);
    values.push(JSON.stringify(input.options));
  }

  if (input.options_latex !== undefined) {
    updates.push(`options_latex = $${paramCount++}`);
    values.push(JSON.stringify(input.options_latex));
  }

  if (input.correct_answer !== undefined) {
    updates.push(`correct_answer = $${paramCount++}`);
    values.push(input.correct_answer);
  }

  if (input.explanation !== undefined) {
    updates.push(`explanation = $${paramCount++}`);
    values.push(input.explanation);
  }

  if (input.explanation_latex !== undefined) {
    updates.push(`explanation_latex = $${paramCount++}`);
    values.push(input.explanation_latex);
  }

  if (input.step_by_step !== undefined) {
    updates.push(`step_by_step = $${paramCount++}`);
    values.push(JSON.stringify(input.step_by_step));
  }

  if (input.quality_score !== undefined) {
    updates.push(`quality_score = $${paramCount++}`);
    values.push(input.quality_score);
  }

  if (input.verified !== undefined) {
    updates.push(`verified = $${paramCount++}`);
    values.push(input.verified);
  }

  if (input.verification_notes !== undefined) {
    updates.push(`verification_notes = $${paramCount++}`);
    values.push(input.verification_notes);
  }

  if (input.status !== undefined) {
    updates.push(`status = $${paramCount++}`);
    values.push(input.status);
  }

  if (updates.length === 0) {
    return getContextProblemById(id);
  }

  // Add updated_at
  updates.push(`updated_at = $${paramCount++}`);
  values.push(Date.now());

  // Add ID for WHERE clause
  values.push(id);

  const query = `
    UPDATE context_problems
    SET ${updates.join(', ')}
    WHERE id = $${paramCount}
    RETURNING *
  `;

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  return mapRowToContextProblem(result.rows[0]);
}

/**
 * Delete a context problem
 */
export async function deleteContextProblem(id: string): Promise<boolean> {
  const query = 'DELETE FROM context_problems WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rowCount !== null && result.rowCount > 0;
}

/**
 * Update usage statistics after a question attempt
 */
export async function updateUsageStats(
  id: string,
  isCorrect: boolean,
  timeSpentSeconds: number
): Promise<void> {
  const query = `
    UPDATE context_problems
    SET
      times_used = times_used + 1,
      avg_correctness = CASE
        WHEN times_used = 0 THEN ${isCorrect ? 100 : 0}
        ELSE (avg_correctness * times_used + ${isCorrect ? 100 : 0}) / (times_used + 1)
      END,
      avg_time_seconds = CASE
        WHEN times_used = 0 THEN ${timeSpentSeconds}
        ELSE (COALESCE(avg_time_seconds, 0) * times_used + ${timeSpentSeconds}) / (times_used + 1)
      END
    WHERE id = $1
  `;

  await pool.query(query, [id]);
}

/**
 * Get random context problem by criteria
 */
export async function getRandomContextProblem(
  abstractProblemId?: string,
  contextType?: string
): Promise<ContextProblem | null> {
  const conditions: string[] = ['status = \'active\''];
  const values: any[] = [];
  let paramCount = 1;

  if (abstractProblemId) {
    conditions.push(`abstract_problem_id = $${paramCount++}`);
    values.push(abstractProblemId);
  }

  if (contextType) {
    conditions.push(`context_type = $${paramCount++}`);
    values.push(contextType);
  }

  const query = `
    SELECT * FROM context_problems
    WHERE ${conditions.join(' AND ')}
    ORDER BY RANDOM()
    LIMIT 1
  `;

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  return mapRowToContextProblem(result.rows[0]);
}

/**
 * Helper function to map database row to ContextProblem type
 */
function mapRowToContextProblem(row: any): ContextProblem {
  return {
    id: row.id,
    abstract_problem_id: row.abstract_problem_id,
    context_type: row.context_type,
    context_description: row.context_description,
    question: row.question,
    question_latex: row.question_latex,
    options: row.options ? JSON.parse(row.options) : [],
    options_latex: row.options_latex ? JSON.parse(row.options_latex) : null,
    correct_answer: row.correct_answer,
    explanation: row.explanation,
    explanation_latex: row.explanation_latex,
    step_by_step: row.step_by_step ? JSON.parse(row.step_by_step) : [],
    variable_values: row.variable_values ? JSON.parse(row.variable_values) : {},
    images: row.images ? JSON.parse(row.images) : [],
    visual_data: row.visual_data ? JSON.parse(row.visual_data) : null,
    generation_method: row.generation_method,
    template_id: row.template_id,
    generation_params: row.generation_params ? JSON.parse(row.generation_params) : {},
    quality_score: row.quality_score,
    verified: row.verified,
    verification_notes: row.verification_notes,
    times_used: row.times_used,
    avg_correctness: row.avg_correctness ? parseFloat(row.avg_correctness) : undefined,
    avg_time_seconds: row.avg_time_seconds,
    status: row.status,
    created_at: parseInt(row.created_at),
    updated_at: parseInt(row.updated_at),
  };
}
