-- Migration: Create curriculum_topic_progress table
-- This table tracks user knowledge of curriculum topics (skill tree)
-- Users can check off topics they know to track their knowledge

CREATE TABLE IF NOT EXISTS curriculum_topic_progress (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_slug VARCHAR(100) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  level VARCHAR(10) NOT NULL DEFAULT 'M1',
  is_completed BOOLEAN DEFAULT false,
  completed_at BIGINT,
  notes TEXT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  CONSTRAINT unique_user_topic_level UNIQUE(user_id, topic_slug, level)
);

-- Create index for faster queries by user
CREATE INDEX idx_curriculum_progress_user ON curriculum_topic_progress(user_id);

-- Create index for filtering by level and subject
CREATE INDEX idx_curriculum_progress_level_subject ON curriculum_topic_progress(level, subject);
