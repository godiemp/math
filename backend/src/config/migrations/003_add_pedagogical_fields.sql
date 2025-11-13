-- Migration: Add pedagogical ordering and generation rules
-- Date: 2025-11-12
-- Description: Add fields for pedagogical sequencing and flexible generation rules

-- Add new columns to abstract_problems
ALTER TABLE abstract_problems
ADD COLUMN IF NOT EXISTS sequence_order INTEGER,
ADD COLUMN IF NOT EXISTS pedagogy_notes TEXT,
ADD COLUMN IF NOT EXISTS prerequisite_sequence INTEGER[],
ADD COLUMN IF NOT EXISTS generation_rules JSONB;

-- Create index for sequence ordering within subsections
CREATE INDEX IF NOT EXISTS idx_abstract_problems_sequence
ON abstract_problems(unit, subsection, sequence_order);

-- Comments
COMMENT ON COLUMN abstract_problems.sequence_order IS 'Pedagogical order within subsection (1, 2, 3, ...). Lower numbers are simpler/prerequisite for higher numbers.';
COMMENT ON COLUMN abstract_problems.pedagogy_notes IS 'Explanation of why this problem comes at this sequence point';
COMMENT ON COLUMN abstract_problems.prerequisite_sequence IS 'Array of sequence_order values that should be mastered before this problem';
COMMENT ON COLUMN abstract_problems.generation_rules IS 'JSON object with placeholder values and generation constraints for maximum abstraction';

-- Drop and recreate views to avoid column position conflicts
DROP VIEW IF EXISTS problem_stats_by_unit;
DROP VIEW IF EXISTS active_problems_view;

-- Recreate active_problems_view with new fields
CREATE VIEW active_problems_view AS
SELECT
  ap.id as abstract_id,
  ap.essence,
  ap.level,
  ap.subject,
  ap.unit,
  ap.subsection,
  ap.sequence_order,
  ap.difficulty,
  ap.difficulty_score,
  ap.primary_skills,
  ap.cognitive_level,
  ap.pedagogy_notes,
  ap.prerequisite_sequence,
  ap.generation_rules,
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

-- Recreate problem_stats_by_unit with sequence info
CREATE VIEW problem_stats_by_unit AS
SELECT
  level,
  subject,
  unit,
  subsection,
  difficulty,
  MIN(sequence_order) as min_sequence,
  MAX(sequence_order) as max_sequence,
  COUNT(DISTINCT ap.id) as abstract_count,
  COUNT(cp.id) as context_count,
  AVG(cp.avg_correctness) as avg_correctness,
  AVG(cp.quality_score) as avg_quality
FROM abstract_problems ap
LEFT JOIN context_problems cp ON ap.id = cp.abstract_problem_id
WHERE ap.status = 'active'
GROUP BY level, subject, unit, subsection, difficulty
ORDER BY level, subject, unit, subsection, min_sequence;
