/**
 * Shared types and utilities for scaffolding services
 */

import OpenAI from 'openai';
import { pool } from '../config/database';

// ============================================================================
// Types
// ============================================================================

export interface FailedQuestion {
  id: string;
  questionLatex: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
  difficultyScore?: number;
  subject: string;
  topic?: string;
  skills: string[];
}

export interface DecomposedSkill {
  id: string;
  name: string;
  description: string;
  difficulty: 'básico' | 'intermedio' | 'avanzado';
  order: number;
}

export interface SkillDecompositionResponse {
  skills: DecomposedSkill[];
  originalQuestion: string;
  recommendedPath: string[];
}

export interface GeneratedScaffoldingQuestion {
  id: string;
  questionLatex: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  targetSkills: string[];
  difficulty: 'easy' | 'medium';
  difficultyScore: number;
  subject: string;
  topic: string;
  isGenerated: true;
}

export interface GenerateScaffoldingRequest {
  failedQuestion: FailedQuestion;
  scaffoldingLevel: number; // 1, 2, or 3 (each level easier)
}

export interface GenerateScaffoldingResponse {
  question: GeneratedScaffoldingQuestion;
  generationTimeMs: number;
}

export interface ExampleQuestion {
  question: string;
  options: string[];
  difficulty: string;
}

// ============================================================================
// OpenAI Client
// ============================================================================

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get example questions from the database for few-shot prompting
 */
export async function getExampleQuestions(
  subject: string,
  skills: string[],
  maxDifficultyScore: number,
  limit: number = 3
): Promise<ExampleQuestion[]> {
  try {
    // Find questions with similar skills and lower difficulty
    const query = `
      SELECT
        cp.question_latex as question,
        cp.options,
        ap.difficulty
      FROM context_problems cp
      JOIN abstract_problems ap ON cp.abstract_problem_id = ap.id
      WHERE cp.status = 'active'
        AND ap.status = 'active'
        AND ap.subject = $1
        AND ap.difficulty_score <= $2
        AND ap.primary_skills && $3
      ORDER BY ap.difficulty_score ASC
      LIMIT $4
    `;

    const result = await pool.query(query, [subject, maxDifficultyScore, skills, limit]);

    return result.rows.map((row) => ({
      question: row.question,
      options: typeof row.options === 'string' ? JSON.parse(row.options) : row.options,
      difficulty: row.difficulty,
    }));
  } catch (error) {
    console.error('Error fetching example questions:', error);
    return [];
  }
}

/**
 * Calculate target difficulty score based on scaffolding level
 * Level 1: 0.2 less than original
 * Level 2: 0.4 less than original
 * Level 3: 0.6 less than original (very easy)
 */
export function calculateTargetDifficulty(
  originalScore: number,
  level: number
): { score: number; label: 'easy' | 'medium' } {
  const reduction = level * 0.2;
  const targetScore = Math.max(0.1, originalScore - reduction);

  return {
    score: targetScore,
    label: targetScore <= 0.35 ? 'easy' : 'medium',
  };
}

/**
 * Map difficulty label to approximate score
 */
export function difficultyLabelToScore(difficulty: string): number {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 0.3;
    case 'medium':
      return 0.5;
    case 'hard':
      return 0.7;
    case 'extreme':
      return 0.9;
    default:
      return 0.5;
  }
}
