-- Migration: Add theme_preference field to users table
--
-- Adds a new column to track user's theme preference.
-- Values:
--   - 'light': User prefers light mode
--   - 'dark': User prefers dark mode
--   - 'system': User prefers to follow system/browser preference (default)
--
-- This allows the preference to persist across devices when authenticated.

ALTER TABLE users ADD COLUMN IF NOT EXISTS theme_preference VARCHAR(20) DEFAULT 'system' CHECK (theme_preference IN ('light', 'dark', 'system'));

-- Add comment for documentation
COMMENT ON COLUMN users.theme_preference IS 'User theme preference: light, dark, or system (default)';
