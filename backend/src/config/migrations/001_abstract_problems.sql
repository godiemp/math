-- Migration: Add Abstract Problems and Context Problems tables
-- Date: 2025-11-10
-- Description: Redesign problems system with abstract problems and context-based generation

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- Abstract Problems Table
-- ========================================
CREATE TABLE IF NOT EXISTS abstract_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Core content
  essence TEXT NOT NULL,
  cognitive_level VARCHAR(20) NOT NULL,

  -- Classification
  level VARCHAR(10) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  unit VARCHAR(100) NOT NULL,

  -- Difficulty
  difficulty VARCHAR(20) NOT NULL,
  difficulty_score INTEGER NOT NULL,

  -- Skills
  primary_skills TEXT[] NOT NULL,
  secondary_skills TEXT[],

  -- Generation metadata
  generation_method VARCHAR(20) NOT NULL,
  generated_by VARCHAR(100),
  generation_prompt TEXT,

  -- Answer structure
  answer_type VARCHAR(20) NOT NULL,
  expected_steps JSONB,
  common_errors JSONB,

  -- Status
  status VARCHAR(20) DEFAULT 'draft',
  review_notes TEXT,

  -- Timestamps
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,

  -- Constraints
  CHECK (level IN ('M1', 'M2')),
  CHECK (subject IN ('números', 'álgebra', 'geometría', 'probabilidad')),
  CHECK (difficulty IN ('easy', 'medium', 'hard', 'extreme')),
  CHECK (cognitive_level IN ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create')),
  CHECK (difficulty_score >= 1 AND difficulty_score <= 100),
  CHECK (status IN ('draft', 'reviewed', 'active', 'deprecated')),
  CHECK (generation_method IN ('openai', 'manual', 'template')),
  CHECK (answer_type IN ('multiple_choice', 'numeric', 'algebraic', 'true_false'))
);

-- Indexes for abstract_problems
CREATE INDEX idx_abstract_problems_level ON abstract_problems(level);
CREATE INDEX idx_abstract_problems_subject ON abstract_problems(subject);
CREATE INDEX idx_abstract_problems_difficulty ON abstract_problems(difficulty);
CREATE INDEX idx_abstract_problems_difficulty_score ON abstract_problems(difficulty_score);
CREATE INDEX idx_abstract_problems_unit ON abstract_problems(unit);
CREATE INDEX idx_abstract_problems_status ON abstract_problems(status);
CREATE INDEX idx_abstract_problems_skills ON abstract_problems USING GIN(primary_skills);
CREATE INDEX idx_abstract_problems_cognitive_level ON abstract_problems(cognitive_level);

-- Comments
COMMENT ON TABLE abstract_problems IS 'Abstract problems representing the mathematical essence independent of context';
COMMENT ON COLUMN abstract_problems.essence IS 'The core mathematical concept or problem essence';
COMMENT ON COLUMN abstract_problems.difficulty_score IS 'Fine-grained difficulty score from 1-100';
COMMENT ON COLUMN abstract_problems.primary_skills IS 'Main atomic skills being tested';
COMMENT ON COLUMN abstract_problems.secondary_skills IS 'Additional skills involved';


-- ========================================
-- Context Problems Table
-- ========================================
CREATE TABLE IF NOT EXISTS context_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  abstract_problem_id UUID NOT NULL REFERENCES abstract_problems(id) ON DELETE CASCADE,

  -- Context
  context_type VARCHAR(50) NOT NULL,
  context_description TEXT NOT NULL,

  -- Question
  question TEXT NOT NULL,
  question_latex TEXT,

  -- Options (for multiple choice)
  options JSONB,
  options_latex JSONB,
  correct_answer INTEGER,

  -- Explanation
  explanation TEXT NOT NULL,
  explanation_latex TEXT,
  step_by_step JSONB,

  -- Variable values
  variable_values JSONB,

  -- Visual data
  images JSONB,
  visual_data JSONB,

  -- Generation metadata
  generation_method VARCHAR(20) NOT NULL,
  template_id VARCHAR(100),
  generation_params JSONB,

  -- Quality
  quality_score INTEGER,
  verified BOOLEAN DEFAULT FALSE,
  verification_notes TEXT,

  -- Usage statistics
  times_used INTEGER DEFAULT 0,
  avg_correctness DECIMAL(5,2),
  avg_time_seconds INTEGER,

  -- Status
  status VARCHAR(20) DEFAULT 'active',

  -- Timestamps
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,

  -- Constraints
  CHECK (context_type IN ('shopping', 'cooking', 'geometry', 'sports', 'finance',
                          'travel', 'construction', 'science', 'abstract', 'other')),
  CHECK (quality_score IS NULL OR (quality_score >= 1 AND quality_score <= 10)),
  CHECK (status IN ('active', 'deprecated')),
  CHECK (generation_method IN ('openai', 'template', 'manual'))
);

-- Indexes for context_problems
CREATE INDEX idx_context_problems_abstract_id ON context_problems(abstract_problem_id);
CREATE INDEX idx_context_problems_context_type ON context_problems(context_type);
CREATE INDEX idx_context_problems_status ON context_problems(status);
CREATE INDEX idx_context_problems_quality ON context_problems(quality_score);
CREATE INDEX idx_context_problems_verified ON context_problems(verified);

-- Comments
COMMENT ON TABLE context_problems IS 'Concrete problem instances generated from abstract problems with real-world context';
COMMENT ON COLUMN context_problems.abstract_problem_id IS 'Reference to the abstract problem this is based on';
COMMENT ON COLUMN context_problems.context_type IS 'Type of real-world context applied';
COMMENT ON COLUMN context_problems.variable_values IS 'Concrete values used in problem generation';
COMMENT ON COLUMN context_problems.quality_score IS 'Manual quality rating from 1-10';


-- ========================================
-- Question Attempts Table (Enhanced)
-- ========================================
-- Note: question_attempts table is already created by initializeDatabase()
-- This migration only adds new columns to support abstract problems system

-- Add new columns to existing question_attempts table
DO $$
BEGIN
  -- Add context_problem_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'question_attempts' AND column_name = 'context_problem_id'
  ) THEN
    ALTER TABLE question_attempts
    ADD COLUMN context_problem_id UUID REFERENCES context_problems(id) ON DELETE SET NULL;
  END IF;

  -- Add abstract_problem_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'question_attempts' AND column_name = 'abstract_problem_id'
  ) THEN
    ALTER TABLE question_attempts
    ADD COLUMN abstract_problem_id UUID REFERENCES abstract_problems(id) ON DELETE SET NULL;
  END IF;

  -- Add legacy_question_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'question_attempts' AND column_name = 'legacy_question_id'
  ) THEN
    ALTER TABLE question_attempts
    ADD COLUMN legacy_question_id VARCHAR(100);
  END IF;

  -- Add skills_tested column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'question_attempts' AND column_name = 'skills_tested'
  ) THEN
    ALTER TABLE question_attempts
    ADD COLUMN skills_tested TEXT[];
  END IF;
END $$;

-- Indexes for question_attempts (create only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_question_attempts_context_problem ON question_attempts(context_problem_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_abstract_problem ON question_attempts(abstract_problem_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_legacy_question ON question_attempts(legacy_question_id);

-- Comments
COMMENT ON COLUMN question_attempts.context_problem_id IS 'Reference to new context problem if applicable';
COMMENT ON COLUMN question_attempts.abstract_problem_id IS 'Reference to abstract problem if applicable';
COMMENT ON COLUMN question_attempts.legacy_question_id IS 'Reference to old TypeScript-based question ID for migration support';


-- ========================================
-- Views for convenient querying
-- ========================================

-- View: Active problems with full details
CREATE OR REPLACE VIEW active_problems_view AS
SELECT
  ap.id as abstract_id,
  ap.essence,
  ap.level,
  ap.subject,
  ap.unit,
  ap.difficulty,
  ap.difficulty_score,
  ap.primary_skills,
  ap.cognitive_level,
  cp.id as context_id,
  cp.context_type,
  cp.question,
  cp.options,
  cp.correct_answer,
  cp.quality_score,
  cp.avg_correctness,
  cp.times_used
FROM abstract_problems ap
LEFT JOIN context_problems cp ON ap.id = cp.abstract_problem_id
WHERE ap.status = 'active' AND (cp.status = 'active' OR cp.status IS NULL);

-- View: Problem statistics by unit
CREATE OR REPLACE VIEW problem_stats_by_unit AS
SELECT
  level,
  subject,
  unit,
  difficulty,
  COUNT(DISTINCT ap.id) as abstract_count,
  COUNT(cp.id) as context_count,
  AVG(cp.avg_correctness) as avg_correctness,
  AVG(cp.quality_score) as avg_quality
FROM abstract_problems ap
LEFT JOIN context_problems cp ON ap.id = cp.abstract_problem_id
WHERE ap.status = 'active'
GROUP BY level, subject, unit, difficulty
ORDER BY level, subject, unit, difficulty;

COMMENT ON VIEW active_problems_view IS 'Combined view of active abstract and context problems';
COMMENT ON VIEW problem_stats_by_unit IS 'Statistics about problem coverage and quality by unit';
