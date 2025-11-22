-- Migration: Add User Level System to PAES Predictions
-- Date: 2025-11-14
-- Description: Replace single-point predictions with score intervals and user levels

-- ========================================
-- Step 1: Add new columns for level system
-- ========================================

-- Add current_level column
ALTER TABLE paes_predictions
ADD COLUMN IF NOT EXISTS current_level VARCHAR(50);

-- Add score interval columns
ALTER TABLE paes_predictions
ADD COLUMN IF NOT EXISTS score_min INTEGER;

ALTER TABLE paes_predictions
ADD COLUMN IF NOT EXISTS score_max INTEGER;

-- Drop the old CHECK constraint on user_prediction BEFORE renaming
ALTER TABLE paes_predictions
DROP CONSTRAINT IF EXISTS paes_predictions_user_prediction_check;

-- Rename user_prediction to user_initial_estimate if it exists
-- Or create user_initial_estimate if it doesn't exist (for fresh installs via database.ts)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'paes_predictions' AND column_name = 'user_prediction'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'paes_predictions' AND column_name = 'user_initial_estimate'
  ) THEN
    ALTER TABLE paes_predictions RENAME COLUMN user_prediction TO user_initial_estimate;
  ELSIF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'paes_predictions' AND column_name = 'user_initial_estimate'
  ) THEN
    ALTER TABLE paes_predictions ADD COLUMN user_initial_estimate INTEGER;
  END IF;
END $$;

-- ========================================
-- Step 2: Migrate existing data
-- ========================================

-- For existing records, convert system_prediction ± confidence_range to score intervals
-- and assign appropriate level based on score
UPDATE paes_predictions
SET
  score_min = GREATEST(150, system_prediction - confidence_range),
  score_max = LEAST(1000, system_prediction + confidence_range),
  current_level = CASE
    WHEN system_prediction >= 950 THEN 'Excelencia'
    WHEN system_prediction >= 850 THEN 'Sobresaliente'
    WHEN system_prediction >= 700 THEN 'Avanzado'
    WHEN system_prediction >= 600 THEN 'Medio Avanzado'
    WHEN system_prediction >= 450 THEN 'Medio Inicial'
    WHEN system_prediction >= 300 THEN 'Básico'
    ELSE 'Pre-Básico'
  END
WHERE score_min IS NULL OR score_max IS NULL OR current_level IS NULL;

-- ========================================
-- Step 3: Add constraints for new columns
-- ========================================

-- Make new columns NOT NULL after data migration
ALTER TABLE paes_predictions
ALTER COLUMN score_min SET NOT NULL;

ALTER TABLE paes_predictions
ALTER COLUMN score_max SET NOT NULL;

ALTER TABLE paes_predictions
ALTER COLUMN current_level SET NOT NULL;

-- Add check constraints for score intervals
ALTER TABLE paes_predictions
ADD CONSTRAINT check_score_min_range
CHECK (score_min >= 150 AND score_min <= 1000);

ALTER TABLE paes_predictions
ADD CONSTRAINT check_score_max_range
CHECK (score_max >= 150 AND score_max <= 1000);

ALTER TABLE paes_predictions
ADD CONSTRAINT check_score_interval_valid
CHECK (score_max >= score_min);

ALTER TABLE paes_predictions
ADD CONSTRAINT check_current_level_valid
CHECK (current_level IN ('Pre-Básico', 'Básico', 'Medio Inicial', 'Medio Avanzado', 'Avanzado', 'Sobresaliente', 'Excelencia'));

-- Add user_initial_estimate constraint (constraint was already dropped before column rename)
ALTER TABLE paes_predictions
ADD CONSTRAINT check_user_initial_estimate
CHECK (user_initial_estimate IS NULL OR (user_initial_estimate >= 150 AND user_initial_estimate <= 1000));

-- ========================================
-- Step 4: Update indexes
-- ========================================

-- Add index on current_level for level-based queries
CREATE INDEX IF NOT EXISTS idx_paes_predictions_current_level ON paes_predictions(current_level);

-- ========================================
-- Step 5: Update comments
-- ========================================

COMMENT ON COLUMN paes_predictions.current_level IS 'User''s current performance level (Pre-Básico through Excelencia)';
COMMENT ON COLUMN paes_predictions.score_min IS 'Lower bound of predicted PAES score interval';
COMMENT ON COLUMN paes_predictions.score_max IS 'Upper bound of predicted PAES score interval';
COMMENT ON COLUMN paes_predictions.user_initial_estimate IS 'User''s initial self-assessment score (used for onboarding)';

-- ========================================
-- Step 6: Note about deprecated columns
-- ========================================

-- Note: system_prediction and confidence_range columns are kept for backward compatibility
-- but are no longer used in the level-based system
-- They can be removed in a future migration after confirming everything works

COMMENT ON COLUMN paes_predictions.system_prediction IS 'DEPRECATED: Replaced by score_min/score_max interval system';
COMMENT ON COLUMN paes_predictions.confidence_range IS 'DEPRECATED: Replaced by score_min/score_max interval system';
