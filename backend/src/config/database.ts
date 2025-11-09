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

    // Create ai_interactions table for tracking all user-AI conversations
    await client.query(`
      CREATE TABLE IF NOT EXISTS ai_interactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quiz_session_id VARCHAR(100) REFERENCES quiz_sessions(id) ON DELETE SET NULL,
        question_id VARCHAR(50),
        interaction_type VARCHAR(20) NOT NULL CHECK (interaction_type IN ('chat', 'help', 'summarize', 'practice')),
        user_message TEXT,
        ai_response TEXT,
        ai_model VARCHAR(100) DEFAULT 'claude-sonnet-4-5-20250929',
        request_context JSONB,
        turn_number INTEGER DEFAULT 1,
        response_time_ms INTEGER,
        tokens_used INTEGER,
        created_at BIGINT NOT NULL
      )
    `);

    // ========================================
    // SUBSCRIPTION SYSTEM TABLES
    // ========================================

    // Create plans table - defines available subscription plans
    await client.query(`
      CREATE TABLE IF NOT EXISTS plans (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        currency VARCHAR(3) NOT NULL DEFAULT 'CLP',
        duration_days INTEGER NOT NULL,
        trial_duration_days INTEGER DEFAULT 0,
        features JSONB NOT NULL DEFAULT '[]',
        is_active BOOLEAN DEFAULT TRUE,
        display_order INTEGER DEFAULT 0,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL
      )
    `);

    // Create subscriptions table - tracks user subscriptions
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        plan_id VARCHAR(50) NOT NULL REFERENCES plans(id),
        status VARCHAR(20) NOT NULL CHECK (status IN ('trial', 'active', 'expired', 'cancelled')),
        started_at BIGINT NOT NULL,
        expires_at BIGINT,
        trial_ends_at BIGINT,
        cancelled_at BIGINT,
        auto_renew BOOLEAN DEFAULT TRUE,
        payment_method VARCHAR(50),
        last_payment_at BIGINT,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL,
        UNIQUE(user_id, plan_id)
      )
    `);

    // ========================================
    // QGEN SYSTEM TABLES
    // ========================================

    // Create contexts table - real-life situations for problems
    await client.query(`
      CREATE TABLE IF NOT EXISTS contexts (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100),
        compatible_skills JSONB NOT NULL,
        variables JSONB,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL,
        created_by VARCHAR(50) REFERENCES users(id)
      )
    `);

    // Create goals table - types of reasoning/question goals
    await client.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        cognitive_level VARCHAR(50),
        created_at BIGINT NOT NULL
      )
    `);

    // Create templates table - question templates
    await client.query(`
      CREATE TABLE IF NOT EXISTS templates (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        template_text TEXT NOT NULL,
        template_latex TEXT,
        goal_id VARCHAR(50) NOT NULL REFERENCES goals(id),
        required_skills JSONB NOT NULL,
        compatible_contexts JSONB NOT NULL,
        variables JSONB NOT NULL,
        constraints JSONB,
        difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL,
        created_by VARCHAR(50) REFERENCES users(id)
      )
    `);

    // Create goal_skill_mappings table - defines which goals fit skill combinations
    await client.query(`
      CREATE TABLE IF NOT EXISTS goal_skill_mappings (
        id SERIAL PRIMARY KEY,
        goal_id VARCHAR(50) NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
        skill_combination JSONB NOT NULL,
        min_skills INTEGER DEFAULT 1,
        max_skills INTEGER,
        created_at BIGINT NOT NULL
      )
    `);

    // Create problems table - combines multiple atomic skills
    await client.query(`
      CREATE TABLE IF NOT EXISTS problems (
        id VARCHAR(50) PRIMARY KEY,
        level VARCHAR(5) NOT NULL CHECK (level IN ('M1', 'M2')),
        subject VARCHAR(50) NOT NULL CHECK (subject IN ('números', 'álgebra', 'geometría', 'probabilidad')),
        topic VARCHAR(255) NOT NULL,
        skill_ids JSONB NOT NULL,
        title VARCHAR(255),
        context_id VARCHAR(50) REFERENCES contexts(id),
        generated_by VARCHAR(10) DEFAULT 'qgen',
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL,
        created_by VARCHAR(50) REFERENCES users(id)
      )
    `);

    // Create situations table - specific instances within a problem
    await client.query(`
      CREATE TABLE IF NOT EXISTS situations (
        id VARCHAR(50) PRIMARY KEY,
        problem_id VARCHAR(50) NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
        context_id VARCHAR(50) REFERENCES contexts(id),
        context_text TEXT NOT NULL,
        context_latex TEXT,
        variable_values JSONB,
        visual_data JSONB,
        images JSONB,
        situation_order INTEGER DEFAULT 1,
        created_at BIGINT NOT NULL
      )
    `);

    // Create progressive_questions table - ordered questions (n₁, n₂, n₃, ...)
    await client.query(`
      CREATE TABLE IF NOT EXISTS progressive_questions (
        id VARCHAR(50) PRIMARY KEY,
        situation_id VARCHAR(50) NOT NULL REFERENCES situations(id) ON DELETE CASCADE,
        template_id VARCHAR(50) REFERENCES templates(id),
        goal_id VARCHAR(50) REFERENCES goals(id),
        question_index INTEGER NOT NULL,
        question TEXT NOT NULL,
        question_latex TEXT,
        options JSONB NOT NULL,
        options_latex JSONB,
        correct_answer INTEGER NOT NULL CHECK (correct_answer >= 0 AND correct_answer <= 3),
        explanation TEXT,
        explanation_latex TEXT,
        difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
        skills_tested JSONB NOT NULL,
        builds_on VARCHAR(50) REFERENCES progressive_questions(id),
        created_at BIGINT NOT NULL,
        UNIQUE(situation_id, question_index)
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

    // AI interactions indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_ai_interactions_user_id ON ai_interactions(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_ai_interactions_question_id ON ai_interactions(question_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_ai_interactions_type ON ai_interactions(interaction_type)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_ai_interactions_created_at ON ai_interactions(created_at)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_ai_interactions_quiz_session_id ON ai_interactions(quiz_session_id)');

    // Subscription system indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_plans_is_active ON plans(is_active)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_expires_at ON subscriptions(expires_at)');

    // QGen system indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_contexts_category ON contexts(category)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_templates_goal_id ON templates(goal_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_templates_difficulty ON templates(difficulty_level)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_goal_skill_mappings_goal_id ON goal_skill_mappings(goal_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_problems_level ON problems(level)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_problems_subject ON problems(subject)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_problems_context_id ON problems(context_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_situations_problem_id ON situations(problem_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_situations_context_id ON situations(context_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_progressive_questions_situation_id ON progressive_questions(situation_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_progressive_questions_template_id ON progressive_questions(template_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_progressive_questions_builds_on ON progressive_questions(builds_on)');

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
