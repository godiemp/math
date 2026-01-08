import bcrypt from 'bcryptjs';
import { pool } from '../config/database';
import { PAES_SESSION_TEMPLATES, PRACTICE_SESSION_TEMPLATE } from '../config/sessionTemplates';
import { getRandomQuestions, getOfficialPAESQuestions } from '../../../lib/questions';

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
 * Get questions from the actual question library
 * Uses the same question pool as live sessions for realistic seed data
 */
function getQuestionsForSeed(level: 'M1' | 'M2', count: number) {
  // For official PAES format (60 for M1, 50 for M2), use official distribution
  if ((level === 'M1' && count === 60) || (level === 'M2' && count === 50)) {
    return getOfficialPAESQuestions(level);
  }

  // For custom counts, use random selection
  return getRandomQuestions(level, count);
}

/**
 * Generate answers array with specified score percentage
 */
function generateAnswers(questionCount: number, scorePercentage: number): number[] {
  const correctCount = Math.floor(questionCount * scorePercentage);
  const answers = new Array(questionCount).fill(0);

  // Make first correctCount answers correct (0 = correct in this simplified model)
  // Mix it up a bit
  for (let i = 0; i < questionCount; i++) {
    if (i < correctCount) {
      answers[i] = i % 4; // Correct answer
    } else {
      answers[i] = (i + 1) % 4; // Wrong answer
    }
  }

  return answers;
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

    // Create/update sample completed sessions using official PAES templates (UPSERT)
    console.log('📚 Creating/updating realistic sample sessions using official PAES templates...');

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    // Session 1: Official M1 PAES format - completed 3 days ago
    const m1Template = PAES_SESSION_TEMPLATES.M1;
    const session1Id = 'seed-session-001';
    const session1CompletedAt = now - (3 * dayMs);
    const session1Questions = getQuestionsForSeed('M1', m1Template.questionCount);
    const session1Score = Math.floor(m1Template.questionCount * 0.90); // 90% score

    await pool.query(`
      INSERT INTO sessions (
        id, name, description, level, host_id, host_name, questions,
        status, current_question_index, created_at, scheduled_start_time,
        scheduled_end_time, duration_minutes, lobby_open_time, max_participants,
        started_at, completed_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        level = EXCLUDED.level,
        questions = EXCLUDED.questions,
        status = EXCLUDED.status,
        current_question_index = EXCLUDED.current_question_index,
        scheduled_start_time = EXCLUDED.scheduled_start_time,
        scheduled_end_time = EXCLUDED.scheduled_end_time,
        duration_minutes = EXCLUDED.duration_minutes,
        lobby_open_time = EXCLUDED.lobby_open_time,
        started_at = EXCLUDED.started_at,
        completed_at = EXCLUDED.completed_at
    `, [
      session1Id,
      m1Template.name,
      m1Template.description,
      m1Template.level,
      'admin-default',
      'Administrador',
      JSON.stringify(session1Questions),
      'completed',
      m1Template.questionCount,
      session1CompletedAt - (m1Template.durationMinutes * 60 * 1000) - (2 * 60 * 60 * 1000), // created 2h before start
      session1CompletedAt - (m1Template.durationMinutes * 60 * 1000), // started X minutes before completion
      session1CompletedAt,
      m1Template.durationMinutes,
      session1CompletedAt - (m1Template.durationMinutes * 60 * 1000) - (15 * 60 * 1000), // lobby 15min before
      1000,
      session1CompletedAt - (m1Template.durationMinutes * 60 * 1000),
      session1CompletedAt
    ]);

    // Add admin's participation in session 1 (90% score)
    const answers1 = generateAnswers(m1Template.questionCount, 0.90);
    await pool.query(`
      INSERT INTO session_participants (
        session_id, user_id, username, display_name, answers, score, joined_at, current_question_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (session_id, user_id) DO UPDATE SET
        answers = EXCLUDED.answers,
        score = EXCLUDED.score,
        current_question_index = EXCLUDED.current_question_index
    `, [
      session1Id,
      'admin-default',
      'admin',
      'Administrador',
      JSON.stringify(answers1),
      session1Score,
      session1CompletedAt - (m1Template.durationMinutes * 60 * 1000),
      m1Template.questionCount
    ]);

    console.log(`✅ Created session 1: ${m1Template.name} (${session1Score}/${m1Template.questionCount} correct, ${Math.round((session1Score/m1Template.questionCount)*100)}%)`);

    // Session 2: Official M2 PAES format - completed 1 week ago
    const m2Template = PAES_SESSION_TEMPLATES.M2;
    const session2Id = 'seed-session-002';
    const session2CompletedAt = now - (7 * dayMs);
    const session2Questions = getQuestionsForSeed('M2', m2Template.questionCount);
    const session2Score = Math.floor(m2Template.questionCount * 0.66); // 66% score

    await pool.query(`
      INSERT INTO sessions (
        id, name, description, level, host_id, host_name, questions,
        status, current_question_index, created_at, scheduled_start_time,
        scheduled_end_time, duration_minutes, lobby_open_time, max_participants,
        started_at, completed_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        level = EXCLUDED.level,
        questions = EXCLUDED.questions,
        status = EXCLUDED.status,
        current_question_index = EXCLUDED.current_question_index,
        scheduled_start_time = EXCLUDED.scheduled_start_time,
        scheduled_end_time = EXCLUDED.scheduled_end_time,
        duration_minutes = EXCLUDED.duration_minutes,
        lobby_open_time = EXCLUDED.lobby_open_time,
        started_at = EXCLUDED.started_at,
        completed_at = EXCLUDED.completed_at
    `, [
      session2Id,
      m2Template.name,
      m2Template.description,
      m2Template.level,
      'admin-default',
      'Administrador',
      JSON.stringify(session2Questions),
      'completed',
      m2Template.questionCount,
      session2CompletedAt - (m2Template.durationMinutes * 60 * 1000) - (2 * 60 * 60 * 1000),
      session2CompletedAt - (m2Template.durationMinutes * 60 * 1000),
      session2CompletedAt,
      m2Template.durationMinutes,
      session2CompletedAt - (m2Template.durationMinutes * 60 * 1000) - (15 * 60 * 1000),
      1000,
      session2CompletedAt - (m2Template.durationMinutes * 60 * 1000),
      session2CompletedAt
    ]);

    // Add admin's participation in session 2 (66% score)
    const answers2 = generateAnswers(m2Template.questionCount, 0.66);
    await pool.query(`
      INSERT INTO session_participants (
        session_id, user_id, username, display_name, answers, score, joined_at, current_question_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (session_id, user_id) DO UPDATE SET
        answers = EXCLUDED.answers,
        score = EXCLUDED.score,
        current_question_index = EXCLUDED.current_question_index
    `, [
      session2Id,
      'admin-default',
      'admin',
      'Administrador',
      JSON.stringify(answers2),
      session2Score,
      session2CompletedAt - (m2Template.durationMinutes * 60 * 1000),
      m2Template.questionCount
    ]);

    console.log(`✅ Created session 2: ${m2Template.name} (${session2Score}/${m2Template.questionCount} correct, ${Math.round((session2Score/m2Template.questionCount)*100)}%)`);

    // Session 3: Practice M1 format - completed 2 weeks ago
    const practiceTemplate = PRACTICE_SESSION_TEMPLATE.M1;
    const session3Id = 'seed-session-003';
    const session3CompletedAt = now - (14 * dayMs);
    const session3Questions = getQuestionsForSeed('M1', practiceTemplate.questionCount);
    const session3Score = Math.floor(practiceTemplate.questionCount * 0.92); // 92% score

    await pool.query(`
      INSERT INTO sessions (
        id, name, description, level, host_id, host_name, questions,
        status, current_question_index, created_at, scheduled_start_time,
        scheduled_end_time, duration_minutes, lobby_open_time, max_participants,
        started_at, completed_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        level = EXCLUDED.level,
        questions = EXCLUDED.questions,
        status = EXCLUDED.status,
        current_question_index = EXCLUDED.current_question_index,
        scheduled_start_time = EXCLUDED.scheduled_start_time,
        scheduled_end_time = EXCLUDED.scheduled_end_time,
        duration_minutes = EXCLUDED.duration_minutes,
        lobby_open_time = EXCLUDED.lobby_open_time,
        started_at = EXCLUDED.started_at,
        completed_at = EXCLUDED.completed_at
    `, [
      session3Id,
      practiceTemplate.name,
      practiceTemplate.description,
      practiceTemplate.level,
      'admin-default',
      'Administrador',
      JSON.stringify(session3Questions),
      'completed',
      practiceTemplate.questionCount,
      session3CompletedAt - (practiceTemplate.durationMinutes * 60 * 1000) - (1 * 60 * 60 * 1000),
      session3CompletedAt - (practiceTemplate.durationMinutes * 60 * 1000),
      session3CompletedAt,
      practiceTemplate.durationMinutes,
      session3CompletedAt - (practiceTemplate.durationMinutes * 60 * 1000) - (15 * 60 * 1000),
      1000,
      session3CompletedAt - (practiceTemplate.durationMinutes * 60 * 1000),
      session3CompletedAt
    ]);

    // Add admin's participation in session 3 (92% score)
    const answers3 = generateAnswers(practiceTemplate.questionCount, 0.92);
    await pool.query(`
      INSERT INTO session_participants (
        session_id, user_id, username, display_name, answers, score, joined_at, current_question_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (session_id, user_id) DO UPDATE SET
        answers = EXCLUDED.answers,
        score = EXCLUDED.score,
        current_question_index = EXCLUDED.current_question_index
    `, [
      session3Id,
      'admin-default',
      'admin',
      'Administrador',
      JSON.stringify(answers3),
      session3Score,
      session3CompletedAt - (practiceTemplate.durationMinutes * 60 * 1000),
      practiceTemplate.questionCount
    ]);

    console.log(`✅ Created session 3: ${practiceTemplate.name} (${session3Score}/${practiceTemplate.questionCount} correct, ${Math.round((session3Score/practiceTemplate.questionCount)*100)}%)`);

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

    // Additional grade-level test students for preview environments
    const gradeStudents = [
      { id: 'test-7basico-student', username: '7basico_student', email: '7basico@test.cl', displayName: 'Estudiante 7° Básico', gradeLevel: '7-basico' },
      { id: 'test-8basico-student', username: '8basico_student', email: '8basico@test.cl', displayName: 'Estudiante 8° Básico', gradeLevel: '8-basico' },
      { id: 'test-2medio-student', username: '2medio_student', email: '2medio@test.cl', displayName: 'Estudiante 2° Medio', gradeLevel: '2-medio' },
      { id: 'test-3medio-student', username: '3medio_student', email: '3medio@test.cl', displayName: 'Estudiante 3° Medio', gradeLevel: '3-medio' },
      { id: 'test-4medio-student', username: '4medio_student', email: '4medio@test.cl', displayName: 'Estudiante 4° Medio', gradeLevel: '4-medio' },
    ];

    for (const student of gradeStudents) {
      const existingStudent = await pool.query(
        'SELECT id FROM users WHERE id = $1 OR username = $2',
        [student.id, student.username]
      );

      if (existingStudent.rows.length > 0) {
        console.log(`ℹ️  ${student.gradeLevel} student already exists, skipping...`);
      } else {
        const passwordHash = await bcrypt.hash('test123', 10);
        await pool.query(
          `INSERT INTO users (id, username, email, password_hash, display_name, role, grade_level, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [student.id, student.username, student.email, passwordHash, student.displayName, 'student', student.gradeLevel, now, now]
        );
        console.log(`✅ ${student.gradeLevel} student created: ${student.username} (password: test123)`);
      }
    }

    // Test Teacher account
    const teacherId = 'test-teacher';
    const teacherUsername = 'teacher';
    const teacherEmail = 'teacher@test.cl';
    const teacherPassword = 'test123';
    const teacherDisplayName = 'Profesor Demo';

    const existingTeacher = await pool.query(
      'SELECT id FROM users WHERE id = $1 OR username = $2',
      [teacherId, teacherUsername]
    );

    if (existingTeacher.rows.length > 0) {
      console.log('ℹ️  Teacher already exists, skipping...');
    } else {
      const teacherPasswordHash = await bcrypt.hash(teacherPassword, 10);
      await pool.query(
        `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [teacherId, teacherUsername, teacherEmail, teacherPasswordHash, teacherDisplayName, 'teacher', now, now]
      );
      console.log(`✅ Teacher created: ${teacherUsername} (password: ${teacherPassword})`);
    }

    console.log('\n✅ Seed script completed successfully!');
    console.log(`
📋 Summary:
- Admin user: ${username} (password: ${password})
- Test accounts:
  * PAES student: ${paesStudentUsername} (password: ${paesStudentPassword}) - Full PAES access
  * 1-Medio student: ${medioStudentUsername} (password: ${medioStudentPassword}) - School content only
  * 7° Básico student: 7basico_student (password: test123)
  * 8° Básico student: 8basico_student (password: test123)
  * 2° Medio student: 2medio_student (password: test123)
  * 3° Medio student: 3medio_student (password: test123)
  * 4° Medio student: 4medio_student (password: test123)
  * Teacher: ${teacherUsername} (password: ${teacherPassword}) - Teacher role
- 3 completed sessions created with realistic PAES templates:
  1. ${m1Template.name} - ${m1Template.questionCount} preguntas, ${m1Template.durationMinutes} min
  2. ${m2Template.name} - ${m2Template.questionCount} preguntas, ${m2Template.durationMinutes} min
  3. ${practiceTemplate.name} - ${practiceTemplate.questionCount} preguntas, ${practiceTemplate.durationMinutes} min
    `);

  } catch (error) {
    console.error('❌ Error running seed script:', error);
    throw error;
  } finally {
    await pool.end();
    process.exit(0);
  }
}

// Run the seed script
seedAdmin();
