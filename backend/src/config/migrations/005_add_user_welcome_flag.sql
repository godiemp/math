-- Migration: Add welcome message tracking to users
-- Date: 2025-11-14
-- Description: Add has_seen_welcome flag to track first-time user experience

-- Add new column to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS has_seen_welcome BOOLEAN DEFAULT FALSE NOT NULL,
ADD COLUMN IF NOT EXISTS target_level VARCHAR(20) DEFAULT 'M1_AND_M2' CHECK (target_level IN ('M1_ONLY', 'M1_AND_M2'));

-- Create index for querying new users who haven't seen welcome
CREATE INDEX IF NOT EXISTS idx_users_has_seen_welcome ON users(has_seen_welcome);

-- Comments
COMMENT ON COLUMN users.has_seen_welcome IS 'Flag to track if user has seen the welcome message (first login experience)';
COMMENT ON COLUMN users.target_level IS 'Target PAES level: M1_ONLY for basic competency only, M1_AND_M2 for both basic and advanced';
