-- Skill Tree Progress
-- Tracks which skills a user has verified through AI conversation

CREATE TABLE IF NOT EXISTS skill_tree_progress (
  user_id VARCHAR(50) NOT NULL,
  skill_id VARCHAR(50) NOT NULL,
  verified_at BIGINT,
  conversation_history JSONB DEFAULT '[]',
  created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
  updated_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
  PRIMARY KEY (user_id, skill_id)
);

-- Index for querying user progress
CREATE INDEX IF NOT EXISTS idx_skill_tree_progress_user_id
ON skill_tree_progress(user_id);

-- Index for querying verified skills
CREATE INDEX IF NOT EXISTS idx_skill_tree_progress_verified
ON skill_tree_progress(user_id, verified_at)
WHERE verified_at IS NOT NULL;
