-- Migration: Add cookie_consent field to users table
--
-- Adds a new column to track user's cookie consent preference.
-- Values:
--   - 'accepted': User accepted all cookies (analytics, tracking, etc.)
--   - 'declined': User declined optional cookies (essential only)
--   - NULL: User has not made a choice yet
--
-- This allows the preference to persist across devices and browser clears
-- when the user is authenticated.

ALTER TABLE users ADD COLUMN IF NOT EXISTS cookie_consent VARCHAR(20) CHECK (cookie_consent IN ('accepted', 'declined'));

-- Add comment for documentation
COMMENT ON COLUMN users.cookie_consent IS 'User cookie consent preference: accepted, declined, or NULL if not set';
