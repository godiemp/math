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

    // Add grade_level and teacher assignment columns for school-based students
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='users' AND column_name='grade_level') THEN
          ALTER TABLE users ADD COLUMN grade_level VARCHAR(20);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='users' AND column_name='assigned_by_teacher_id') THEN
          ALTER TABLE users ADD COLUMN assigned_by_teacher_id VARCHAR(50) REFERENCES users(id);
        END IF;
        IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_role_check') THEN
          ALTER TABLE users DROP CONSTRAINT users_role_check;
        END IF;
        ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('student', 'admin', 'teacher'));
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
 * Retry helper for database connection with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 5, initialDelayMs = 2000) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) {
        throw error;
      }
      const delayMs = initialDelayMs * Math.pow(2, attempt - 1);
      console.log(`⏳ Connection attempt ${attempt} failed, retrying in ${delayMs / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  throw lastError;
}

/**
 * Seed script to create a default admin user
 * Run with: node scripts/seed-admin.js
 */
async function seedAdmin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 5, // Smaller pool for seed script
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: process.env.NODE_ENV === 'production' ? 60000 : 10000, // 60s for production, 10s for dev
  });

  try {
    // First, ensure database tables exist
    console.log('🔧 Initializing database tables...');
    await retryWithBackoff(() => initializeDatabase(pool));

    const username = 'admin';
    const email = 'admin@paes.cl';
    const password = 'admin123'; // Default password - CHANGE IN PRODUCTION
    const displayName = 'Administrador';

    const now = Date.now();

    // Check if admin already exists
    const existingAdmin = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingAdmin.rows.length > 0) {
      console.log('ℹ️  Admin user already exists, skipping user creation...');
    } else {
      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Generate user ID
      const userId = 'admin-default';

      // Insert admin user
      await pool.query(
        `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [userId, username, email, passwordHash, displayName, 'admin', now, now]
      );

      console.log('✅ Admin user created successfully!');
    }

    // Create test student accounts for preview environments
    console.log('\n👤 Creating test student accounts...');

    // Test PAES student (no grade level - full PAES access)
    const paesStudentId = 'test-paes-student';
    const paesStudentUsername = 'paes_student';
    const paesStudentEmail = 'paes@test.cl';
    const paesStudentPassword = 'test123';
    const paesStudentDisplayName = 'Estudiante PAES';

    const existingPaesStudent = await pool.query(
      'SELECT id FROM users WHERE id = $1 OR username = $2',
      [paesStudentId, paesStudentUsername]
    );

    if (existingPaesStudent.rows.length > 0) {
      console.log('ℹ️  PAES student already exists, skipping...');
    } else {
      const paesPasswordHash = await bcrypt.hash(paesStudentPassword, 10);
      await pool.query(
        `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [paesStudentId, paesStudentUsername, paesStudentEmail, paesPasswordHash, paesStudentDisplayName, 'student', now, now]
      );
      console.log(`✅ PAES student created: ${paesStudentUsername} (password: ${paesStudentPassword})`);
    }

    // Test 1-Medio student (grade level assigned - school content only)
    const medioStudentId = 'test-1medio-student';
    const medioStudentUsername = '1medio_student';
    const medioStudentEmail = '1medio@test.cl';
    const medioStudentPassword = 'test123';
    const medioStudentDisplayName = 'Estudiante 1° Medio';

    const existingMedioStudent = await pool.query(
      'SELECT id FROM users WHERE id = $1 OR username = $2',
      [medioStudentId, medioStudentUsername]
    );

    if (existingMedioStudent.rows.length > 0) {
      console.log('ℹ️  1-Medio student already exists, skipping...');
    } else {
      const medioPasswordHash = await bcrypt.hash(medioStudentPassword, 10);
      await pool.query(
        `INSERT INTO users (id, username, email, password_hash, display_name, role, grade_level, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [medioStudentId, medioStudentUsername, medioStudentEmail, medioPasswordHash, medioStudentDisplayName, 'student', '1-medio', now, now]
      );
      console.log(`✅ 1-Medio student created: ${medioStudentUsername} (password: ${medioStudentPassword})`);
    }

    console.log('\n✅ Seed script completed successfully!');
    console.log(`
📋 Summary:
- Admin user: ${username} (password: ${password})
- Test accounts:
  * PAES student: ${paesStudentUsername} (password: ${paesStudentPassword}) - Full PAES access
  * 1-Medio student: ${medioStudentUsername} (password: ${medioStudentPassword}) - School content only
    `);

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    await pool.end();
    process.exit(1);
  }
}

seedAdmin();
