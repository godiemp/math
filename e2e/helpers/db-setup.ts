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
        class_enrollments,
        classes,
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

    // Create PAES test student (no grade level - full PAES access)
    const paesStudentPassword = await bcrypt.hash('test123', 10);
    const paesStudentId = 'test-paes-student';

    await client.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [paesStudentId, 'paes_student', 'paes@test.cl', paesStudentPassword, 'Estudiante PAES', 'student', now, now]
    );

    // Create 1-Medio test student (grade level assigned - school content only)
    const medioStudentPassword = await bcrypt.hash('test123', 10);
    const medioStudentId = 'test-1medio-student';

    await client.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, grade_level, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [medioStudentId, '1medio_student', '1medio@test.cl', medioStudentPassword, 'Estudiante 1° Medio', 'student', '1-medio', now, now]
    );

    // Create test teacher user for live lesson sync testing
    const teacherPassword = await bcrypt.hash('TeacherTest123!', 10);
    const teacherId = 'test-teacher';

    await client.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, email_verified, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [teacherId, 'testteacher', 'teacher@test.com', teacherPassword, 'Test Teacher', 'teacher', true, now, now]
    );

    // Create test student for live lesson sync testing
    const syncStudentPassword = await bcrypt.hash('SyncStudent123!', 10);
    const syncStudentId = 'test-sync-student';

    await client.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, email_verified, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [syncStudentId, 'syncstudent', 'sync.student@test.com', syncStudentPassword, 'Sync Student', 'student', true, now, now]
    );

    // Create test student managed by teacher (for teacher students page testing)
    const managedStudentPassword = await bcrypt.hash('ManagedStudent123!', 10);
    const managedStudentId = 'test-managed-student';

    await client.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, email_verified, grade_level, assigned_by_teacher_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [managedStudentId, 'maria.gonzalez', 'maria.gonzalez@student.simplepaes.cl', managedStudentPassword, 'María González', 'student', true, '1-medio', teacherId, now, now]
    );

    // Create a test class for the teacher
    const testClassId = 'test-class-1';
    await client.query(
      `INSERT INTO classes (id, name, description, teacher_id, level, school_name, max_students, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        testClassId,
        'Test Math Class',
        'Test class for E2E testing',
        teacherId,
        'M1',
        'Test School',
        45,
        true,
        now,
        now,
      ]
    );

    // Enroll the sync student in the test class
    await client.query(
      `INSERT INTO class_enrollments (class_id, student_id, enrolled_at, enrolled_by, status)
       VALUES ($1, $2, $3, $4, $5)`,
      [testClassId, syncStudentId, now, teacherId, 'active']
    );

    // Create test plan (if it doesn't exist)
    const testPlanId = 'test-plan';
    await client.query(
      `INSERT INTO plans (id, name, description, price, duration_days, trial_duration_days, features, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO NOTHING`,
      [
        testPlanId,
        'Test Plan',
        'Plan for e2e testing',
        0, // Free for testing
        365, // 1 year
        7, // 7-day trial
        JSON.stringify(['all-features']),
        true,
        now,
        now
      ]
    );

    // Create paid plan with trial for subscription testing
    const paidPlanId = 'test-paid-plan';
    await client.query(
      `INSERT INTO plans (id, name, description, price, currency, duration_days, trial_duration_days, features, is_active, display_order, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (id) DO NOTHING`,
      [
        paidPlanId,
        'Plan Premium',
        'Plan premium para pruebas con período de prueba',
        9990, // CLP price
        'CLP',
        30, // 30 days
        7, // 7-day trial
        JSON.stringify([
          'Acceso completo a práctica M1 y M2',
          'Acceso al currículum completo',
          'Seguimiento de progreso',
          'Estadísticas detalladas'
        ]),
        true,
        1, // display order
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

    // Create active subscription for teacher
    await client.query(
      `INSERT INTO subscriptions (user_id, plan_id, status, started_at, expires_at, auto_renew, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        teacherId,
        testPlanId,
        'active',
        now,
        now + (365 * 24 * 60 * 60 * 1000), // 1 year from now
        true,
        now,
        now
      ]
    );

    // Create active subscription for sync student
    await client.query(
      `INSERT INTO subscriptions (user_id, plan_id, status, started_at, expires_at, auto_renew, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        syncStudentId,
        testPlanId,
        'active',
        now,
        now + (365 * 24 * 60 * 60 * 1000), // 1 year from now
        true,
        now,
        now
      ]
    );

    // Create active subscription for managed student
    await client.query(
      `INSERT INTO subscriptions (user_id, plan_id, status, started_at, expires_at, auto_renew, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        managedStudentId,
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
    return { adminId, studentId, teacherId, syncStudentId, managedStudentId, sessionId, testClassId };
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
