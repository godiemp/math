import { Pool } from 'pg';

const TEST_DB_URL = process.env.TEST_DATABASE_URL ||
  'postgresql://testuser:testpassword@localhost:5433/paes_test';

export const pool = new Pool({
  connectionString: TEST_DB_URL,
  max: 5,
});

/**
 * Clear all data from test database tables using TRUNCATE for better performance
 */
export async function clearDatabase() {
  const client = await pool.connect();
  try {
    // Use TRUNCATE CASCADE for much faster clearing (resets sequences and removes all foreign key constraints)
    // This is significantly faster than individual DELETE statements
    await client.query(`
      TRUNCATE TABLE
        quiz_attempts,
        quiz_sessions,
        question_attempts,
        session_participants,
        session_registrations,
        sessions,
        pdf_uploads,
        questions,
        refresh_tokens,
        subscriptions,
        users,
        plans,
        last_quiz_config
      CASCADE
    `);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Seed test database with essential data
 */
export async function seedTestData() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Create test admin user
    const bcrypt = require('bcryptjs');
    // SECURITY: Password meets new requirements (12+ chars, uppercase, lowercase, number, special char)
    const adminPassword = await bcrypt.hash('AdminTest123!', 10);
    const adminId = 'test-admin';
    const now = Date.now();

    await client.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [adminId, 'testadmin', 'admin@test.com', adminPassword, 'Test Admin', 'admin', now, now]
    );

    // Create test student user
    // SECURITY: Password meets new requirements (12+ chars, uppercase, lowercase, number, special char)
    const studentPassword = await bcrypt.hash('StudentTest123!', 10);
    const studentId = 'test-student';

    await client.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [studentId, 'teststudent', 'student@test.com', studentPassword, 'Test Student', 'student', now, now]
    );

    // Create test plan (if it doesn't exist)
    const testPlanId = 'test-plan';
    await client.query(
      `INSERT INTO plans (id, name, description, price, duration_days, features, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO NOTHING`,
      [
        testPlanId,
        'Test Plan',
        'Plan for e2e testing',
        0, // Free for testing
        365, // 1 year
        JSON.stringify(['all-features']),
        true,
        now,
        now
      ]
    );

    // Create active subscription for test student
    await client.query(
      `INSERT INTO subscriptions (user_id, plan_id, status, started_at, expires_at, auto_renew, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        studentId,
        testPlanId,
        'active',
        now,
        now + (365 * 24 * 60 * 60 * 1000), // 1 year from now
        true,
        now,
        now
      ]
    );

    // Create sample questions
    const questions = [
      {
        id: 'test-q1',
        level: 'M1',
        subject: 'números',
        topic: 'Operaciones básicas',
        question: '¿Cuál es el resultado de 15 + 27?',
        options: ['40', '42', '43', '45'],
        correct_answer: 1,
        difficulty: 'easy',
        skills: ['suma-basica'],
        explanation: 'La suma de 15 + 27 es 42.',
      },
      {
        id: 'test-q2',
        level: 'M1',
        subject: 'álgebra',
        topic: 'Ecuaciones lineales',
        question: 'Resolver para x: 2x + 5 = 15',
        options: ['3', '5', '7', '10'],
        correct_answer: 1,
        difficulty: 'medium',
        skills: ['ecuaciones-lineales'],
        explanation: '2x + 5 = 15, entonces 2x = 10, x = 5',
      },
      {
        id: 'test-q3',
        level: 'M2',
        subject: 'geometría',
        topic: 'Área de figuras',
        question: '¿Cuál es el área de un círculo con radio 5?',
        options: ['25π', '10π', '5π', '20π'],
        correct_answer: 0,
        difficulty: 'medium',
        skills: ['area-circulo'],
        explanation: 'El área de un círculo es πr², entonces π(5)² = 25π',
      },
    ];

    for (const q of questions) {
      await client.query(
        `INSERT INTO questions
         (id, level, subject, topic, question, options, correct_answer, difficulty, skills, explanation, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          q.id,
          q.level,
          q.subject,
          q.topic,
          q.question,
          JSON.stringify(q.options),
          q.correct_answer,
          q.difficulty,
          JSON.stringify(q.skills),
          q.explanation,
          now,
          now,
        ]
      );
    }

    // Create a test live session
    const sessionId = 'test-session-1';
    const scheduledStartTime = Date.now() + 24 * 60 * 60 * 1000; // Tomorrow
    const durationMinutes = 90; // 90 minute test
    const scheduledEndTime = scheduledStartTime + durationMinutes * 60 * 1000;
    const lobbyOpenTime = scheduledStartTime - 30 * 60 * 1000; // 30 minutes before start

    await client.query(
      `INSERT INTO sessions
       (id, name, description, host_id, host_name, status, level, scheduled_start_time, scheduled_end_time,
        duration_minutes, lobby_open_time, questions, created_at, max_participants, current_question_index)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        sessionId,
        'Test PAES Session',
        'Session for e2e testing',
        adminId,
        'Test Admin',
        'scheduled',
        'M1',
        scheduledStartTime,
        scheduledEndTime,
        durationMinutes,
        lobbyOpenTime,
        JSON.stringify(['test-q1', 'test-q2']),
        now,
        1000000, // max_participants
        0, // current_question_index
      ]
    );

    await client.query('COMMIT');
    return { adminId, studentId, sessionId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Close database connection pool
 */
export async function closeDatabase() {
  await pool.end();
}
