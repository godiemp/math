import { Pool } from 'pg';

const TEST_DB_URL = process.env.TEST_DATABASE_URL ||
  'postgresql://testuser:testpassword@localhost:5433/paes_test';

export const pool = new Pool({
  connectionString: TEST_DB_URL,
  max: 5,
});

/**
 * Clear all data from test database tables
 */
export async function clearDatabase() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Delete in reverse order of dependencies
    await client.query('DELETE FROM quiz_attempts');
    await client.query('DELETE FROM quiz_sessions');
    await client.query('DELETE FROM question_attempts');
    await client.query('DELETE FROM session_participants');
    await client.query('DELETE FROM session_registrations');
    await client.query('DELETE FROM sessions');
    await client.query('DELETE FROM pdf_uploads');
    await client.query('DELETE FROM questions');
    await client.query('DELETE FROM refresh_tokens');
    await client.query('DELETE FROM users');
    await client.query('DELETE FROM last_quiz_config');

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
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
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminId = 'test-admin';
    const now = Date.now();

    await client.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [adminId, 'testadmin', 'admin@test.com', adminPassword, 'Test Admin', 'admin', now, now]
    );

    // Create test student user
    const studentPassword = await bcrypt.hash('student123', 10);
    const studentId = 'test-student';

    await client.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [studentId, 'teststudent', 'student@test.com', studentPassword, 'Test Student', 'student', now, now]
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

    await client.query('COMMIT');
    return { adminId, studentId };
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
