-- Migration: Add subsection column to abstract_problems
-- Date: 2025-11-11
-- Description: Add subsection field to support grouping problems within thematic units

-- Add subsection column to abstract_problems
ALTER TABLE abstract_problems
ADD COLUMN IF NOT EXISTS subsection VARCHAR(100);

-- Create index for subsection
CREATE INDEX IF NOT EXISTS idx_abstract_problems_subsection ON abstract_problems(subsection);

-- Comment
COMMENT ON COLUMN abstract_problems.subsection IS 'Subsection within the thematic unit (e.g., "A. Orden y valor absoluto")';

-- Update the active_problems_view to include subsection
CREATE OR REPLACE VIEW active_problems_view AS
SELECT
  ap.id as abstract_id,
  ap.essence,
  ap.level,
  ap.subject,
  ap.unit,
  ap.subsection,
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

-- Update problem_stats_by_unit to include subsection
CREATE OR REPLACE VIEW problem_stats_by_unit AS
SELECT
  level,
  subject,
  unit,
  subsection,
  difficulty,
  COUNT(DISTINCT ap.id) as abstract_count,
  COUNT(cp.id) as context_count,
  AVG(cp.avg_correctness) as avg_correctness,
  AVG(cp.quality_score) as avg_quality
FROM abstract_problems ap
LEFT JOIN context_problems cp ON ap.id = cp.abstract_problem_id
WHERE ap.status = 'active'
GROUP BY level, subject, unit, subsection, difficulty
ORDER BY level, subject, unit, subsection, difficulty;
