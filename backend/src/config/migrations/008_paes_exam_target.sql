-- Migration: Add PAES exam target selection to users
-- Date: 2025-12-30
-- Description: Store which PAES exam(s) the user is preparing for

-- Add new column to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS paes_exam_target VARCHAR(30)
CHECK (paes_exam_target IN ('invierno_2026', 'verano_2026', 'verano_e_invierno_2026'));

-- Comments
COMMENT ON COLUMN users.paes_exam_target IS 'Target PAES exam(s): invierno_2026 (June), verano_2026 (December), or verano_e_invierno_2026 (both)';
