const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

/**
 * Initialize database tables (same as backend/src/config/database.ts)
 */
async function initializeDatabase(pool) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Create users table with streak columns
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

    // Create other tables
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
        visual_data JSONB,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL,
        created_by VARCHAR(50) REFERENCES users(id)
      )
    `);

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

    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_questions_level ON questions(level)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_pdf_uploads_uploaded_by ON pdf_uploads(uploaded_by)');

    await client.query('COMMIT');
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Seed script to create a default admin user
 * Run with: node scripts/seed-admin.js
 */
async function seedAdmin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    // First, ensure database tables exist
    console.log('🔧 Initializing database tables...');
    await initializeDatabase(pool);

    const username = 'admin';
    const email = 'admin@simplepaes.cl';
    const password = 'admin123'; // Default password - CHANGE IN PRODUCTION
    const displayName = 'Administrador';

    // Check if admin already exists
    const existingAdmin = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingAdmin.rows.length > 0) {
      console.log('❌ Admin user already exists');
      await pool.end();
      process.exit(0);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate user ID
    const userId = 'admin-default';
    const now = Date.now();

    // Insert admin user
    await pool.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, username, email, passwordHash, displayName, 'admin', now, now]
    );

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change this password in production!');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    await pool.end();
    process.exit(1);
  }
}

seedAdmin();
