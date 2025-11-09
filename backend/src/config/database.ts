import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create PostgreSQL connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
export const testConnection = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database connected successfully at:', result.rows[0].now);
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Initialize database (create tables if they don't exist)
export const initializeDatabase = async (): Promise<void> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Create users table
    await client.query(`
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
        last_practice_date VARCHAR(10)
      )
    `);

    // Add streak columns if they don't exist (migration for existing tables)
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='users' AND column_name='current_streak') THEN
          ALTER TABLE users ADD COLUMN current_streak INTEGER DEFAULT 0 NOT NULL;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='users' AND column_name='longest_streak') THEN
          ALTER TABLE users ADD COLUMN longest_streak INTEGER DEFAULT 0 NOT NULL;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='users' AND column_name='last_practice_date') THEN
          ALTER TABLE users ADD COLUMN last_practice_date VARCHAR(10);
        END IF;
      END $$;
    `);

    // Create refresh_tokens table
    await client.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(500) NOT NULL UNIQUE,
        expires_at BIGINT NOT NULL,
        created_at BIGINT NOT NULL,
        revoked BOOLEAN DEFAULT FALSE
      )
    `);

    // Create questions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id VARCHAR(50) PRIMARY KEY,
        level VARCHAR(5) NOT NULL CHECK (level IN ('M1', 'M2')),
        topic VARCHAR(255) NOT NULL,
        subject VARCHAR(50) NOT NULL CHECK (subject IN ('números', 'álgebra', 'geometría', 'probabilidad')),
        question TEXT NOT NULL,
        question_latex TEXT,
        options JSONB NOT NULL,
        options_latex JSONB,
        correct_answer INTEGER NOT NULL CHECK (correct_answer >= 0 AND correct_answer <= 3),
        explanation TEXT NOT NULL,
        explanation_latex TEXT,
        difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
        skills JSONB NOT NULL,
        images JSONB,
        visual_data JSONB,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL,
        created_by VARCHAR(50) REFERENCES users(id)
      )
    `);

    // Add images column if it doesn't exist (migration for existing tables)
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='questions' AND column_name='images') THEN
          ALTER TABLE questions ADD COLUMN images JSONB;
        END IF;
      END $$;
    `);

    // Create pdf_uploads table
    await client.query(`
      CREATE TABLE IF NOT EXISTS pdf_uploads (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        file_size INTEGER NOT NULL,
        uploaded_by VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL CHECK (status IN ('processing', 'completed', 'failed')),
        questions_extracted INTEGER DEFAULT 0,
        error_message TEXT,
        uploaded_at BIGINT NOT NULL
      )
    `);

    // Create sessions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        level VARCHAR(5) NOT NULL CHECK (level IN ('M1', 'M2')),
        host_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        host_name VARCHAR(255) NOT NULL,
        questions JSONB NOT NULL,
        status VARCHAR(20) NOT NULL CHECK (status IN ('scheduled', 'lobby', 'active', 'completed', 'cancelled')),
        current_question_index INTEGER DEFAULT 0,
        created_at BIGINT NOT NULL,
        scheduled_start_time BIGINT NOT NULL,
        scheduled_end_time BIGINT NOT NULL,
        duration_minutes INTEGER NOT NULL,
        lobby_open_time BIGINT NOT NULL,
        max_participants INTEGER DEFAULT 1000000,
        started_at BIGINT,
        completed_at BIGINT
      )
    `);

    // Create session_registrations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS session_registrations (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100) NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        username VARCHAR(100) NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        registered_at BIGINT NOT NULL,
        UNIQUE(session_id, user_id)
      )
    `);

    // Create session_participants table
    await client.query(`
      CREATE TABLE IF NOT EXISTS session_participants (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100) NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        username VARCHAR(100) NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        answers JSONB NOT NULL,
        score INTEGER DEFAULT 0,
        joined_at BIGINT NOT NULL,
        UNIQUE(session_id, user_id)
      )
    `);

    // Create question_attempts table for tracking individual practice
    await client.query(`
      CREATE TABLE IF NOT EXISTS question_attempts (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        question_id VARCHAR(50) NOT NULL,
        level VARCHAR(5) NOT NULL CHECK (level IN ('M1', 'M2')),
        subject VARCHAR(50) NOT NULL CHECK (subject IN ('números', 'álgebra', 'geometría', 'probabilidad')),
        difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'extreme')),
        user_answer INTEGER NOT NULL CHECK (user_answer >= 0 AND user_answer <= 3),
        correct_answer INTEGER NOT NULL CHECK (correct_answer >= 0 AND correct_answer <= 3),
        is_correct BOOLEAN NOT NULL,
        quiz_mode VARCHAR(20) CHECK (quiz_mode IN ('zen', 'rapidfire')),
        time_spent_seconds INTEGER,
        session_id VARCHAR(100),
        attempted_at BIGINT NOT NULL,
        created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000
      )
    `);

    // Create quiz_sessions table for grouping quiz attempts and storing AI conversations
    await client.query(`
      CREATE TABLE IF NOT EXISTS quiz_sessions (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        level VARCHAR(5) NOT NULL CHECK (level IN ('M1', 'M2')),
        started_at BIGINT NOT NULL,
        completed_at BIGINT,
        ai_conversation JSONB DEFAULT '[]',
        created_at BIGINT NOT NULL
      )
    `);

    // Create quiz_attempts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS quiz_attempts (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quiz_session_id VARCHAR(100) REFERENCES quiz_sessions(id) ON DELETE SET NULL,
        question_id VARCHAR(100) NOT NULL,
        level VARCHAR(5) NOT NULL CHECK (level IN ('M1', 'M2')),
        topic VARCHAR(255) NOT NULL,
        subject VARCHAR(50) NOT NULL,
        question TEXT NOT NULL,
        options JSONB NOT NULL,
        user_answer INTEGER NOT NULL,
        correct_answer INTEGER NOT NULL,
        is_correct BOOLEAN NOT NULL,
        difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
        explanation TEXT NOT NULL,
        skills JSONB NOT NULL,
        attempted_at BIGINT NOT NULL
      )
    `);

    // Migration: Add quiz_session_id column if it doesn't exist (for existing databases)
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'quiz_attempts' AND column_name = 'quiz_session_id'
        ) THEN
          ALTER TABLE quiz_attempts
          ADD COLUMN quiz_session_id VARCHAR(100) REFERENCES quiz_sessions(id) ON DELETE SET NULL;
        END IF;
      END $$;
    `);

    // Create last_quiz_config table for storing user's last quiz configuration
    await client.query(`
      CREATE TABLE IF NOT EXISTS last_quiz_config (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        level VARCHAR(5) NOT NULL CHECK (level IN ('M1', 'M2')),
        subject VARCHAR(50) CHECK (subject IN ('números', 'álgebra', 'geometría', 'probabilidad')),
        mode VARCHAR(20) NOT NULL CHECK (mode IN ('zen', 'rapidfire')),
        difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard', 'extreme')),
        updated_at BIGINT NOT NULL,
        UNIQUE(user_id, level)
      )
    `);

    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_questions_level ON questions(level)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_pdf_uploads_uploaded_by ON pdf_uploads(uploaded_by)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_sessions_host_id ON sessions(host_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_session_registrations_session_id ON session_registrations(session_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_session_registrations_user_id ON session_registrations(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_session_participants_session_id ON session_participants(session_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_session_participants_user_id ON session_participants(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_question_attempts_user_id ON question_attempts(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_question_attempts_question_id ON question_attempts(question_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_question_attempts_attempted_at ON question_attempts(attempted_at)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_question_attempts_level ON question_attempts(level)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_question_attempts_subject ON question_attempts(subject)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_id ON quiz_sessions(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_quiz_sessions_started_at ON quiz_sessions(started_at)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_session_id ON quiz_attempts(quiz_session_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_quiz_attempts_attempted_at ON quiz_attempts(attempted_at)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_last_quiz_config_user_id ON last_quiz_config(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_last_quiz_config_level ON last_quiz_config(level)');

    await client.query('COMMIT');
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Graceful shutdown
export const closeDatabase = async (): Promise<void> => {
  await pool.end();
  console.log('Database connection pool closed');
};
