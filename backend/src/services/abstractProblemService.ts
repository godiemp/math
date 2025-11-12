/**
 * Database service for Abstract Problems
 */

import { pool } from '../config/database';
import {
  AbstractProblem,
  CreateAbstractProblemInput,
  UpdateAbstractProblemInput,
  AbstractProblemFilters,
  ProblemQueryOptions,
} from '../types/abstractProblems';
import { calculateDifficultyScore, scoreToDifficulty } from './abstractProblemGenerator';

/**
 * Create a new abstract problem
 */
export async function createAbstractProblem(
  input: CreateAbstractProblemInput
): Promise<AbstractProblem> {
  const now = Date.now();

  // Auto-calculate difficulty score if not provided
  const difficulty_score =
    input.difficulty_score ||
    calculateDifficultyScore(input.cognitive_level, input.primary_skills, 2);

  const query = `
    INSERT INTO abstract_problems (
      essence, cognitive_level, level, subject, unit, subsection,
      sequence_order, pedagogy_notes, prerequisite_sequence, generation_rules,
      difficulty, difficulty_score, primary_skills, secondary_skills,
      generation_method, generated_by, generation_prompt,
      answer_type, expected_steps, common_errors,
      status, review_notes, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
    ) RETURNING *
  `;

  const values = [
    input.essence,
    input.cognitive_level,
    input.level,
    input.subject,
    input.unit,
    input.subsection || null,
    input.sequence_order || null,
    input.pedagogy_notes || null,
    input.prerequisite_sequence || null,
    input.generation_rules ? JSON.stringify(input.generation_rules) : null,
    input.difficulty,
    difficulty_score,
    input.primary_skills,
    input.secondary_skills || [],
    input.generation_method,
    input.generated_by || 'system',
    input.generation_prompt || null,
    input.answer_type,
    JSON.stringify(input.expected_steps || []),
    JSON.stringify(input.common_errors || []),
    input.status || 'draft',
    input.review_notes || null,
    now,
    now,
  ];

  const result = await pool.query(query, values);
  return mapRowToAbstractProblem(result.rows[0]);
}

/**
 * Get abstract problem by ID
 */
export async function getAbstractProblemById(id: string): Promise<AbstractProblem | null> {
  const query = 'SELECT * FROM abstract_problems WHERE id = $1';
  const result = await pool.query(query, [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return mapRowToAbstractProblem(result.rows[0]);
}

/**
 * List abstract problems with filters and pagination
 */
export async function listAbstractProblems(
  filters: AbstractProblemFilters = {},
  options: ProblemQueryOptions = {}
): Promise<{ problems: AbstractProblem[]; total: number }> {
  const {
    level,
    subject,
    unit,
    subsection,
    difficulty,
    status,
    cognitive_level,
    skills,
    min_difficulty_score,
    max_difficulty_score,
  } = filters;

  const { limit = 50, offset = 0, sort_by = 'difficulty_score', sort_order = 'asc' } = options;

  // Build WHERE clause
  const conditions: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (level) {
    conditions.push(`level = $${paramCount++}`);
    values.push(level);
  }

  if (subject) {
    conditions.push(`subject = $${paramCount++}`);
    values.push(subject);
  }

  if (unit) {
    conditions.push(`unit = $${paramCount++}`);
    values.push(unit);
  }

  if (subsection) {
    conditions.push(`subsection = $${paramCount++}`);
    values.push(subsection);
  }

  if (difficulty) {
    conditions.push(`difficulty = $${paramCount++}`);
    values.push(difficulty);
  }

  if (status) {
    conditions.push(`status = $${paramCount++}`);
    values.push(status);
  }

  if (cognitive_level) {
    conditions.push(`cognitive_level = $${paramCount++}`);
    values.push(cognitive_level);
  }

  if (skills && skills.length > 0) {
    conditions.push(`primary_skills && $${paramCount++}::text[]`);
    values.push(skills);
  }

  if (min_difficulty_score !== undefined) {
    conditions.push(`difficulty_score >= $${paramCount++}`);
    values.push(min_difficulty_score);
  }

  if (max_difficulty_score !== undefined) {
    conditions.push(`difficulty_score <= $${paramCount++}`);
    values.push(max_difficulty_score);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Count query
  const countQuery = `SELECT COUNT(*) FROM abstract_problems ${whereClause}`;
  const countResult = await pool.query(countQuery, values);
  const total = parseInt(countResult.rows[0].count);

  // Data query
  const dataQuery = `
    SELECT * FROM abstract_problems
    ${whereClause}
    ORDER BY ${sort_by} ${sort_order.toUpperCase()}
    LIMIT $${paramCount++} OFFSET $${paramCount++}
  `;

  const dataValues = [...values, limit, offset];
  const dataResult = await pool.query(dataQuery, dataValues);

  const problems = dataResult.rows.map(mapRowToAbstractProblem);

  return { problems, total };
}

/**
 * Update an abstract problem
 */
export async function updateAbstractProblem(
  id: string,
  input: UpdateAbstractProblemInput
): Promise<AbstractProblem | null> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  // Build SET clause dynamically
  if (input.essence !== undefined) {
    updates.push(`essence = $${paramCount++}`);
    values.push(input.essence);
  }

  if (input.cognitive_level !== undefined) {
    updates.push(`cognitive_level = $${paramCount++}`);
    values.push(input.cognitive_level);
  }

  if (input.unit !== undefined) {
    updates.push(`unit = $${paramCount++}`);
    values.push(input.unit);
  }

  if (input.subsection !== undefined) {
    updates.push(`subsection = $${paramCount++}`);
    values.push(input.subsection);
  }

  if (input.difficulty !== undefined) {
    updates.push(`difficulty = $${paramCount++}`);
    values.push(input.difficulty);
  }

  if (input.difficulty_score !== undefined) {
    updates.push(`difficulty_score = $${paramCount++}`);
    values.push(input.difficulty_score);
  }

  if (input.primary_skills !== undefined) {
    updates.push(`primary_skills = $${paramCount++}`);
    values.push(input.primary_skills);
  }

  if (input.secondary_skills !== undefined) {
    updates.push(`secondary_skills = $${paramCount++}`);
    values.push(input.secondary_skills);
  }

  if (input.answer_type !== undefined) {
    updates.push(`answer_type = $${paramCount++}`);
    values.push(input.answer_type);
  }

  if (input.expected_steps !== undefined) {
    updates.push(`expected_steps = $${paramCount++}`);
    values.push(JSON.stringify(input.expected_steps));
  }

  if (input.common_errors !== undefined) {
    updates.push(`common_errors = $${paramCount++}`);
    values.push(JSON.stringify(input.common_errors));
  }

  if (input.status !== undefined) {
    updates.push(`status = $${paramCount++}`);
    values.push(input.status);
  }

  if (input.review_notes !== undefined) {
    updates.push(`review_notes = $${paramCount++}`);
    values.push(input.review_notes);
  }

  if (updates.length === 0) {
    return getAbstractProblemById(id);
  }

  // Add updated_at
  updates.push(`updated_at = $${paramCount++}`);
  values.push(Date.now());

  // Add ID for WHERE clause
  values.push(id);

  const query = `
    UPDATE abstract_problems
    SET ${updates.join(', ')}
    WHERE id = $${paramCount}
    RETURNING *
  `;

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  return mapRowToAbstractProblem(result.rows[0]);
}

/**
 * Delete an abstract problem
 */
export async function deleteAbstractProblem(id: string): Promise<boolean> {
  const query = 'DELETE FROM abstract_problems WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rowCount !== null && result.rowCount > 0;
}

/**
 * Activate an abstract problem (change status to active)
 */
export async function activateAbstractProblem(id: string): Promise<AbstractProblem | null> {
  return updateAbstractProblem(id, { status: 'active' });
}

/**
 * Get statistics by unit
 */
export async function getStatsByUnit(
  level?: 'M1' | 'M2',
  subject?: string
): Promise<any[]> {
  let whereClause = 'WHERE ap.status = \'active\'';
  const values: any[] = [];
  let paramCount = 1;

  if (level) {
    whereClause += ` AND ap.level = $${paramCount++}`;
    values.push(level);
  }

  if (subject) {
    whereClause += ` AND ap.subject = $${paramCount++}`;
    values.push(subject);
  }

  const query = `
    SELECT * FROM problem_stats_by_unit
    ${whereClause}
    ORDER BY level, subject, unit, difficulty
  `;

  const result = await pool.query(query, values);
  return result.rows;
}

/**
 * Helper function to map database row to AbstractProblem type
 */
function mapRowToAbstractProblem(row: any): AbstractProblem {
  // Helper to safely parse JSON or return the value if already parsed
  const safeParseJSON = (value: any, defaultValue: any = []): any => {
    if (!value) return defaultValue;
    if (Array.isArray(value)) return value;
    if (typeof value === 'object') return value;
    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn('Failed to parse JSON value:', value, error);
      return defaultValue;
    }
  };

  return {
    id: row.id,
    essence: row.essence,
    cognitive_level: row.cognitive_level,
    level: row.level,
    subject: row.subject,
    unit: row.unit,
    subsection: row.subsection || undefined,
    sequence_order: row.sequence_order || undefined,
    pedagogy_notes: row.pedagogy_notes || undefined,
    prerequisite_sequence: row.prerequisite_sequence || undefined,
    generation_rules: safeParseJSON(row.generation_rules, undefined),
    difficulty: row.difficulty,
    difficulty_score: row.difficulty_score,
    primary_skills: row.primary_skills,
    secondary_skills: row.secondary_skills || [],
    generation_method: row.generation_method,
    generated_by: row.generated_by,
    generation_prompt: row.generation_prompt,
    answer_type: row.answer_type,
    expected_steps: safeParseJSON(row.expected_steps, []),
    common_errors: safeParseJSON(row.common_errors, []),
    status: row.status,
    review_notes: row.review_notes,
    created_at: parseInt(row.created_at),
    updated_at: parseInt(row.updated_at),
  };
}

/**
 * Get problems grouped by thematic unit and subsection
 */
export async function getProblemsGroupedByUnit(
  level?: 'M1' | 'M2',
  subject?: string,
  status?: string
): Promise<any> {
  let whereClause = '1=1';
  const values: any[] = [];
  let paramCount = 1;

  if (level) {
    whereClause += ` AND ap.level = $${paramCount++}`;
    values.push(level);
  }

  if (subject) {
    whereClause += ` AND ap.subject = $${paramCount++}`;
    values.push(subject);
  }

  if (status) {
    whereClause += ` AND ap.status = $${paramCount++}`;
    values.push(status);
  }

  const query = `
    SELECT
      ap.*
    FROM abstract_problems ap
    WHERE ${whereClause}
    ORDER BY ap.level, ap.subject, ap.unit, ap.subsection, ap.created_at
  `;

  const result = await pool.query(query, values);
  const problems = result.rows.map(mapRowToAbstractProblem);

  // Group by unit
  const unitMap = new Map<string, any>();

  for (const problem of problems) {
    const unitKey = `${problem.level}-${problem.subject}-${problem.unit}`;

    if (!unitMap.has(unitKey)) {
      unitMap.set(unitKey, {
        unit: problem.unit,
        level: problem.level,
        subject: problem.subject,
        total_problems: 0,
        subsections: new Map<string, any>(),
        problems_without_subsection: [],
      });
    }

    const unitData = unitMap.get(unitKey)!;
    unitData.total_problems++;

    if (problem.subsection) {
      if (!unitData.subsections.has(problem.subsection)) {
        unitData.subsections.set(problem.subsection, {
          subsection: problem.subsection,
          problem_count: 0,
          problems: [],
        });
      }
      const subsectionData = unitData.subsections.get(problem.subsection)!;
      subsectionData.problem_count++;
      subsectionData.problems.push(problem);
    } else {
      unitData.problems_without_subsection.push(problem);
    }
  }

  // Convert maps to arrays
  const units = Array.from(unitMap.values()).map(unit => ({
    unit: unit.unit,
    level: unit.level,
    subject: unit.subject,
    total_problems: unit.total_problems,
    subsections: Array.from(unit.subsections.values()),
    problems_without_subsection: unit.problems_without_subsection,
  }));

  return {
    total_units: units.length,
    total_problems: problems.length,
    units,
  };
}
