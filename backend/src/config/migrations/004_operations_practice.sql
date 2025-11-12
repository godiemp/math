-- Operations Practice System
-- Tracks user progress through the progressive operations path

-- Operations practice progress table
CREATE TABLE IF NOT EXISTS operations_practice_progress (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  current_level INTEGER DEFAULT 1 NOT NULL,
  highest_level_reached INTEGER DEFAULT 1 NOT NULL,
  total_operations_solved INTEGER DEFAULT 0 NOT NULL,
  last_practice_at BIGINT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  UNIQUE(user_id)
);

-- Operations practice attempts table (detailed history)
CREATE TABLE IF NOT EXISTS operations_practice_attempts (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER NOT NULL,
  operation_type VARCHAR(20) NOT NULL CHECK (operation_type IN ('addition', 'subtraction', 'multiplication', 'division', 'mixed')),
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('basic', 'intermediate', 'advanced', 'expert')),
  problem_data JSONB NOT NULL, -- Stores the actual problem details
  user_answer TEXT,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,
  attempted_at BIGINT NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_operations_progress_user_id ON operations_practice_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_operations_attempts_user_id ON operations_practice_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_operations_attempts_level ON operations_practice_attempts(level);
CREATE INDEX IF NOT EXISTS idx_operations_attempts_operation_type ON operations_practice_attempts(operation_type);
CREATE INDEX IF NOT EXISTS idx_operations_attempts_attempted_at ON operations_practice_attempts(attempted_at);

-- Comments for documentation
COMMENT ON TABLE operations_practice_progress IS 'Tracks overall user progress in the operations practice path';
COMMENT ON TABLE operations_practice_attempts IS 'Detailed history of each operation attempt by users';
COMMENT ON COLUMN operations_practice_progress.current_level IS 'The current level the user is working on (1-based)';
COMMENT ON COLUMN operations_practice_progress.highest_level_reached IS 'The highest level the user has unlocked';
COMMENT ON COLUMN operations_practice_attempts.problem_data IS 'JSON containing the problem details (operands, operation, etc.)';
