/**
 * Types for the new Abstract Problems system
 */

// ========================================
// Core Types (inline for backend)
// ========================================

export type Level = 'M1' | 'M2';
export type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'extreme';

// ========================================
// Enums and Constants
// ========================================

export type CognitiveLevel =
  | 'remember'    // Recall facts and basic concepts
  | 'understand'  // Explain ideas or concepts
  | 'apply'       // Use information in new situations
  | 'analyze'     // Draw connections among ideas
  | 'evaluate'    // Justify a decision or course of action
  | 'create';     // Produce new or original work

export type AnswerType =
  | 'multiple_choice'
  | 'numeric'
  | 'algebraic'
  | 'true_false';

export type GenerationMethod =
  | 'openai'
  | 'manual'
  | 'template';

export type ProblemStatus =
  | 'draft'      // Newly generated, needs review
  | 'reviewed'   // Reviewed but not yet active
  | 'active'     // Live and available to students
  | 'deprecated'; // No longer in use

export type ContextType =
  | 'shopping'
  | 'cooking'
  | 'geometry'
  | 'sports'
  | 'finance'
  | 'travel'
  | 'construction'
  | 'science'
  | 'abstract'
  | 'other';

// ========================================
// Abstract Problem Types
// ========================================

export interface AbstractProblem {
  id: string;

  // Core content
  essence: string;
  cognitive_level: CognitiveLevel;

  // Classification
  level: Level;
  subject: Subject;
  unit: string;

  // Difficulty
  difficulty: DifficultyLevel;
  difficulty_score: number; // 1-100

  // Skills
  primary_skills: string[];
  secondary_skills?: string[];

  // Generation metadata
  generation_method: GenerationMethod;
  generated_by?: string;
  generation_prompt?: string;

  // Answer structure
  answer_type: AnswerType;
  expected_steps?: string[];
  common_errors?: string[];

  // Status
  status: ProblemStatus;
  review_notes?: string;

  // Timestamps
  created_at: number;
  updated_at: number;
}

export interface CreateAbstractProblemInput {
  essence: string;
  cognitive_level: CognitiveLevel;
  level: Level;
  subject: Subject;
  unit: string;
  difficulty: DifficultyLevel;
  difficulty_score?: number; // Auto-calculated if not provided
  primary_skills: string[];
  secondary_skills?: string[];
  generation_method: GenerationMethod;
  generated_by?: string;
  generation_prompt?: string;
  answer_type: AnswerType;
  expected_steps?: string[];
  common_errors?: string[];
  status?: ProblemStatus;
  review_notes?: string;
}

export interface UpdateAbstractProblemInput {
  essence?: string;
  cognitive_level?: CognitiveLevel;
  unit?: string;
  difficulty?: DifficultyLevel;
  difficulty_score?: number;
  primary_skills?: string[];
  secondary_skills?: string[];
  answer_type?: AnswerType;
  expected_steps?: string[];
  common_errors?: string[];
  status?: ProblemStatus;
  review_notes?: string;
}

// ========================================
// Context Problem Types
// ========================================

export interface ContextProblem {
  id: string;
  abstract_problem_id: string;

  // Context
  context_type: ContextType;
  context_description: string;

  // Question
  question: string;
  question_latex?: string;

  // Options (for multiple choice)
  options?: string[];
  options_latex?: string[];
  correct_answer?: number;

  // Explanation
  explanation: string;
  explanation_latex?: string;
  step_by_step?: StepByStepSolution[];

  // Variable values
  variable_values?: Record<string, any>;

  // Visual data
  images?: QuestionImage[];
  visual_data?: any;

  // Generation metadata
  generation_method: GenerationMethod;
  template_id?: string;
  generation_params?: Record<string, any>;

  // Quality
  quality_score?: number; // 1-10
  verified: boolean;
  verification_notes?: string;

  // Usage statistics
  times_used: number;
  avg_correctness?: number;
  avg_time_seconds?: number;

  // Status
  status: 'active' | 'deprecated';

  // Timestamps
  created_at: number;
  updated_at: number;
}

export interface CreateContextProblemInput {
  abstract_problem_id: string;
  context_type: ContextType;
  context_description: string;
  question: string;
  question_latex?: string;
  options?: string[];
  options_latex?: string[];
  correct_answer?: number;
  explanation: string;
  explanation_latex?: string;
  step_by_step?: StepByStepSolution[];
  variable_values?: Record<string, any>;
  images?: QuestionImage[];
  visual_data?: any;
  generation_method: GenerationMethod;
  template_id?: string;
  generation_params?: Record<string, any>;
  quality_score?: number;
  verified?: boolean;
  verification_notes?: string;
}

export interface UpdateContextProblemInput {
  context_type?: ContextType;
  context_description?: string;
  question?: string;
  question_latex?: string;
  options?: string[];
  options_latex?: string[];
  correct_answer?: number;
  explanation?: string;
  explanation_latex?: string;
  step_by_step?: StepByStepSolution[];
  quality_score?: number;
  verified?: boolean;
  verification_notes?: string;
  status?: 'active' | 'deprecated';
}

// ========================================
// Supporting Types
// ========================================

export interface StepByStepSolution {
  step_number: number;
  description: string;
  formula?: string;
  result?: string;
}

export interface QuestionImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface QuestionAttempt {
  id: string;
  user_id: string;

  // Question reference
  context_problem_id?: string;
  abstract_problem_id?: string;
  legacy_question_id?: string;

  // Attempt data
  user_answer: number;
  correct_answer: number;
  is_correct: boolean;
  time_spent_seconds?: number;

  // Context
  quiz_session_id?: string;
  difficulty: DifficultyLevel;
  subject: Subject;
  skills_tested: string[];

  // Timestamp
  attempted_at: number;
}

// ========================================
// Filter and Query Types
// ========================================

export interface AbstractProblemFilters {
  level?: Level;
  subject?: Subject;
  unit?: string;
  difficulty?: DifficultyLevel;
  status?: ProblemStatus;
  cognitive_level?: CognitiveLevel;
  skills?: string[]; // Contains any of these skills
  min_difficulty_score?: number;
  max_difficulty_score?: number;
}

export interface ContextProblemFilters {
  abstract_problem_id?: string;
  context_type?: ContextType;
  status?: 'active' | 'deprecated';
  verified?: boolean;
  min_quality_score?: number;
  max_quality_score?: number;
}

export interface ProblemQueryOptions {
  limit?: number;
  offset?: number;
  sort_by?: 'difficulty_score' | 'created_at' | 'updated_at' | 'quality_score';
  sort_order?: 'asc' | 'desc';
}

// ========================================
// OpenAI Generation Types
// ========================================

export interface GenerateAbstractProblemRequest {
  level: Level;
  subject: Subject;
  unit: string;
  difficulty: DifficultyLevel;
  cognitive_level: CognitiveLevel;
  primary_skills: string[];
  secondary_skills?: string[];
  count?: number; // Number of problems to generate
}

export interface GenerateAbstractProblemResponse {
  essence: string;
  answer_type: AnswerType;
  expected_steps: string[];
  common_errors: string[];
  suggested_difficulty_score: number;
}

export interface GenerateContextProblemRequest {
  abstract_problem_id: string;
  context_type: ContextType;
  count?: number; // Number of variations to generate
}

export interface GenerateContextProblemResponse {
  context_description: string;
  question: string;
  question_latex?: string;
  options: string[];
  options_latex?: string[];
  correct_answer: number;
  explanation: string;
  explanation_latex?: string;
  step_by_step: StepByStepSolution[];
  variable_values: Record<string, any>;
}

// ========================================
// Combined View Types
// ========================================

export interface ProblemWithContext extends AbstractProblem {
  contexts: ContextProblem[];
}

export interface ActiveProblemView {
  // Abstract problem fields
  abstract_id: string;
  essence: string;
  level: Level;
  subject: Subject;
  unit: string;
  difficulty: DifficultyLevel;
  difficulty_score: number;
  primary_skills: string[];
  cognitive_level: CognitiveLevel;

  // Context problem fields
  context_id?: string;
  context_type?: ContextType;
  question?: string;
  options?: string[];
  correct_answer?: number;
  quality_score?: number;
  avg_correctness?: number;
  times_used?: number;
}

export interface ProblemStatsByUnit {
  level: Level;
  subject: Subject;
  unit: string;
  difficulty: DifficultyLevel;
  abstract_count: number;
  context_count: number;
  avg_correctness?: number;
  avg_quality?: number;
}

// ========================================
// Utility Functions Types
// ========================================

export interface DifficultyCalculationFactors {
  skill_count: number;
  cognitive_level: CognitiveLevel;
  mathematical_complexity: number; // 1-3
  historical_correctness?: number; // 0-100
}
