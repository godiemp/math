import bcrypt from 'bcryptjs';
import { pool } from '../config/database';

/**
 * Retry helper for database connection with exponential backoff
 */
async function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 5, initialDelayMs = 2000): Promise<T> {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
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
 * Generate sample questions for a session
 */
function generateSampleQuestions(count: number, level: 'M1' | 'M2') {
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push({
      id: `q${i + 1}`,
      type: 'multiple_choice',
      question: `Pregunta de prueba ${i + 1} - Nivel ${level}`,
      options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
      correctAnswer: Math.floor(Math.random() * 4),
      difficulty: level,
    });
  }
  return questions;
}

/**
 * Seed script to create a default admin user with sample live sessions and statistics
 * Run with: npm run seed:admin
 */
async function seedAdmin() {
  try {
    const username = 'admin';
    const email = 'admin@paes.cl';
    const password = 'admin123'; // Default password - CHANGE IN PRODUCTION
    const displayName = 'Administrador';

    console.log('🔗 Connecting to database...');
    // Check if admin already exists with retry logic
    const existingAdmin = await retryWithBackoff(() =>
      pool.query(
        'SELECT id FROM users WHERE username = $1 OR email = $2',
        [username, email]
      )
    );

    if (existingAdmin.rows.length > 0) {
      console.log('ℹ️  Admin user already exists, skipping user creation...');
    } else {
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
    }

    // Create sessions table if it doesn't exist
    console.log('📊 Creating sessions table if needed...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        level VARCHAR(10) NOT NULL,
        host_id VARCHAR(50) NOT NULL,
        host_name VARCHAR(255) NOT NULL,
        questions JSONB NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
        current_question_index INTEGER DEFAULT 0,
        created_at BIGINT NOT NULL,
        scheduled_start_time BIGINT NOT NULL,
        scheduled_end_time BIGINT NOT NULL,
        duration_minutes INTEGER NOT NULL,
        lobby_open_time BIGINT NOT NULL,
        max_participants INTEGER DEFAULT 50,
        started_at BIGINT,
        completed_at BIGINT
      )
    `);

    console.log('📊 Creating session_participants table if needed...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS session_participants (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(50) NOT NULL,
        user_id VARCHAR(50) NOT NULL,
        username VARCHAR(100) NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        answers JSONB NOT NULL DEFAULT '[]',
        score INTEGER NOT NULL DEFAULT 0,
        joined_at BIGINT NOT NULL,
        current_question_index INTEGER DEFAULT 0,
        UNIQUE(session_id, user_id)
      )
    `);

    console.log('📊 Creating session_registrations table if needed...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS session_registrations (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(50) NOT NULL,
        user_id VARCHAR(50) NOT NULL,
        username VARCHAR(100) NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        registered_at BIGINT NOT NULL,
        UNIQUE(session_id, user_id)
      )
    `);

    // Create sample completed sessions for admin to see statistics
    console.log('📚 Creating sample completed sessions...');

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    // Session 1: Completed M1 session from 3 days ago
    const session1Id = 'seed-session-001';
    const session1CompletedAt = now - (3 * dayMs);
    const session1Questions = generateSampleQuestions(10, 'M1');

    await pool.query(`
      INSERT INTO sessions (
        id, name, description, level, host_id, host_name, questions,
        status, current_question_index, created_at, scheduled_start_time,
        scheduled_end_time, duration_minutes, lobby_open_time, max_participants,
        started_at, completed_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO NOTHING
    `, [
      session1Id,
      'Ensayo M1 - Álgebra y Funciones',
      'Práctica de álgebra básica y funciones lineales',
      'M1',
      'admin-default',
      'Administrador',
      JSON.stringify(session1Questions),
      'completed',
      10,
      session1CompletedAt - (2 * 60 * 60 * 1000), // created 2 hours before completion
      session1CompletedAt - (1 * 60 * 60 * 1000), // started 1 hour before completion
      session1CompletedAt,
      30,
      session1CompletedAt - (2 * 60 * 60 * 1000),
      50,
      session1CompletedAt - (1 * 60 * 60 * 1000),
      session1CompletedAt
    ]);

    // Add admin's participation in session 1 (good score)
    await pool.query(`
      INSERT INTO session_participants (
        session_id, user_id, username, display_name, answers, score, joined_at, current_question_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (session_id, user_id) DO NOTHING
    `, [
      session1Id,
      'admin-default',
      'admin',
      'Administrador',
      JSON.stringify([0, 0, 0, 0, 0, 0, 0, 1, 0, 0]), // 9/10 correct (90%)
      9,
      session1CompletedAt - (1 * 60 * 60 * 1000),
      10
    ]);

    // Session 2: Completed M2 session from 1 week ago
    const session2Id = 'seed-session-002';
    const session2CompletedAt = now - (7 * dayMs);
    const session2Questions = generateSampleQuestions(12, 'M2');

    await pool.query(`
      INSERT INTO sessions (
        id, name, description, level, host_id, host_name, questions,
        status, current_question_index, created_at, scheduled_start_time,
        scheduled_end_time, duration_minutes, lobby_open_time, max_participants,
        started_at, completed_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO NOTHING
    `, [
      session2Id,
      'Ensayo M2 - Geometría',
      'Práctica de geometría analítica y transformaciones',
      'M2',
      'admin-default',
      'Administrador',
      JSON.stringify(session2Questions),
      'completed',
      12,
      session2CompletedAt - (2 * 60 * 60 * 1000),
      session2CompletedAt - (1 * 60 * 60 * 1000),
      session2CompletedAt,
      40,
      session2CompletedAt - (2 * 60 * 60 * 1000),
      50,
      session2CompletedAt - (1 * 60 * 60 * 1000),
      session2CompletedAt
    ]);

    // Add admin's participation in session 2 (moderate score)
    await pool.query(`
      INSERT INTO session_participants (
        session_id, user_id, username, display_name, answers, score, joined_at, current_question_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (session_id, user_id) DO NOTHING
    `, [
      session2Id,
      'admin-default',
      'admin',
      'Administrador',
      JSON.stringify([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1]), // 8/12 correct (~67%)
      8,
      session2CompletedAt - (1 * 60 * 60 * 1000),
      12
    ]);

    // Session 3: Completed M1 session from 2 weeks ago (perfect score for ranking)
    const session3Id = 'seed-session-003';
    const session3CompletedAt = now - (14 * dayMs);
    const session3Questions = generateSampleQuestions(8, 'M1');

    await pool.query(`
      INSERT INTO sessions (
        id, name, description, level, host_id, host_name, questions,
        status, current_question_index, created_at, scheduled_start_time,
        scheduled_end_time, duration_minutes, lobby_open_time, max_participants,
        started_at, completed_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO NOTHING
    `, [
      session3Id,
      'Ensayo M1 - Números',
      'Práctica de operatoria con números',
      'M1',
      'admin-default',
      'Administrador',
      JSON.stringify(session3Questions),
      'completed',
      8,
      session3CompletedAt - (2 * 60 * 60 * 1000),
      session3CompletedAt - (1 * 60 * 60 * 1000),
      session3CompletedAt,
      25,
      session3CompletedAt - (2 * 60 * 60 * 1000),
      50,
      session3CompletedAt - (1 * 60 * 60 * 1000),
      session3CompletedAt
    ]);

    // Add admin's participation in session 3 (perfect score)
    await pool.query(`
      INSERT INTO session_participants (
        session_id, user_id, username, display_name, answers, score, joined_at, current_question_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (session_id, user_id) DO NOTHING
    `, [
      session3Id,
      'admin-default',
      'admin',
      'Administrador',
      JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0]), // 8/8 correct (100%)
      8,
      session3CompletedAt - (1 * 60 * 60 * 1000),
      8
    ]);

    console.log('✅ Sample sessions and statistics created!');
    console.log('');
    console.log('📊 Statistics Summary:');
    console.log('  - 3 completed sessions (2 M1, 1 M2)');
    console.log('  - Average accuracy: ~85%');
    console.log('  - Best score: 8/8 (100%)');
    console.log('  - Rankings: 1st place x1 (perfect score)');
    console.log('');
    console.log('Login credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change this password in production!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
}

seedAdmin();
