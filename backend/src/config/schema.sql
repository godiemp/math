-- PAES Math Platform - Database Schema
-- Users and Authentication Tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  current_streak INTEGER DEFAULT 0 NOT NULL,
  longest_streak INTEGER DEFAULT 0 NOT NULL,
  last_practice_date VARCHAR(10) -- Format: YYYY-MM-DD
);

-- Refresh tokens table (for JWT refresh token rotation)
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) NOT NULL UNIQUE,
  expires_at BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  revoked BOOLEAN DEFAULT FALSE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

-- Comments for documentation
COMMENT ON TABLE users IS 'Stores user account information and authentication data';
COMMENT ON TABLE refresh_tokens IS 'Stores JWT refresh tokens for secure token rotation';
COMMENT ON COLUMN users.password_hash IS 'bcrypt hashed password (never store plaintext)';
COMMENT ON COLUMN users.current_streak IS 'Current consecutive days of practice';
COMMENT ON COLUMN users.longest_streak IS 'Longest streak the user has achieved';
COMMENT ON COLUMN users.last_practice_date IS 'Last date user completed practice (YYYY-MM-DD format)';
COMMENT ON COLUMN refresh_tokens.revoked IS 'Flag to invalidate token (logout, security breach, etc.)';
