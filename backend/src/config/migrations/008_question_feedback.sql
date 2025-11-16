-- Migration: Add question_feedback table for reporting incorrect questions
--
-- Creates a table to store user feedback/reports about questions that may be incorrect.
-- This allows users to flag questions with wrong answers, unclear wording, or other issues.
--
-- Feedback types:
--   - 'wrong_answer': The marked correct answer is actually incorrect
--   - 'wrong_explanation': The explanation is incorrect or misleading
--   - 'unclear_question': The question wording is confusing or ambiguous
--   - 'typo': There are typos or formatting errors
--   - 'other': Other issues not covered above
--
-- Status values:
--   - 'pending': Feedback submitted but not reviewed
--   - 'reviewed': Admin has seen the feedback
--   - 'fixed': The issue has been corrected
--   - 'dismissed': Feedback was reviewed but issue was not valid

CREATE TABLE IF NOT EXISTS question_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- User who submitted the feedback
  user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Question reference (supports both legacy and new question systems)
  question_id VARCHAR(255) NOT NULL,
  question_topic VARCHAR(100),
  question_level VARCHAR(20),
  question_difficulty VARCHAR(20),
  question_subject VARCHAR(50),

  -- Feedback details
  feedback_type VARCHAR(30) NOT NULL CHECK (
    feedback_type IN ('wrong_answer', 'wrong_explanation', 'unclear_question', 'typo', 'other')
  ),
  description TEXT NOT NULL,

  -- Additional context from user's attempt
  user_answer INTEGER,
  correct_answer INTEGER,
  question_latex TEXT,

  -- Status tracking
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'reviewed', 'fixed', 'dismissed')
  ),
  admin_notes TEXT,
  reviewed_by VARCHAR(50),
  reviewed_at BIGINT,

  -- Timestamps
  created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000),
  updated_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_question_feedback_user ON question_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_question_feedback_question ON question_feedback(question_id);
CREATE INDEX IF NOT EXISTS idx_question_feedback_status ON question_feedback(status);
CREATE INDEX IF NOT EXISTS idx_question_feedback_type ON question_feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_question_feedback_created ON question_feedback(created_at);

-- Comments for documentation
COMMENT ON TABLE question_feedback IS 'Stores user reports about incorrect or problematic questions';
COMMENT ON COLUMN question_feedback.feedback_type IS 'Category of the issue: wrong_answer, wrong_explanation, unclear_question, typo, other';
COMMENT ON COLUMN question_feedback.status IS 'Review status: pending, reviewed, fixed, dismissed';
COMMENT ON COLUMN question_feedback.question_latex IS 'Snapshot of the question text at time of report for historical reference';
