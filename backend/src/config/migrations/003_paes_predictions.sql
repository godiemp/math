-- Migration: Add PAES Predictions table
-- Date: 2025-11-11
-- Description: Add table to store system-generated and user-provided PAES score predictions

-- ========================================
-- PAES Predictions Table
-- ========================================
CREATE TABLE IF NOT EXISTS paes_predictions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- System prediction
  system_prediction INTEGER NOT NULL,
  confidence_range INTEGER NOT NULL,

  -- User's own prediction (nullable until they provide it)
  user_prediction INTEGER,

  -- Prediction factors for transparency
  factors JSONB,

  -- Timestamps
  calculated_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,

  -- Constraints
  CHECK (system_prediction >= 500 AND system_prediction <= 850),
  CHECK (user_prediction IS NULL OR (user_prediction >= 500 AND user_prediction <= 850)),
  CHECK (confidence_range >= 0 AND confidence_range <= 100)
);

-- Index for quick user lookup
CREATE INDEX idx_paes_predictions_user ON paes_predictions(user_id);
CREATE INDEX idx_paes_predictions_calculated_at ON paes_predictions(calculated_at);

-- Ensure only one prediction per user (latest wins)
CREATE UNIQUE INDEX idx_paes_predictions_user_unique ON paes_predictions(user_id);

-- Comments
COMMENT ON TABLE paes_predictions IS 'Stores PAES score predictions - both system-generated and user-provided';
COMMENT ON COLUMN paes_predictions.system_prediction IS 'Predicted PAES score (500-850) calculated by the system';
COMMENT ON COLUMN paes_predictions.user_prediction IS 'User''s own prediction of their PAES score';
COMMENT ON COLUMN paes_predictions.confidence_range IS 'Confidence interval (±N points)';
COMMENT ON COLUMN paes_predictions.factors IS 'JSON object containing prediction factors for transparency';
