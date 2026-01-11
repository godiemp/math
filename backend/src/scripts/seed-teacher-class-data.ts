import { pool } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

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
 * Seed script to create teacher class data with quiz attempts for testing "Errores Comunes" feature
 *
 * This script creates:
 * - A class for the test-teacher
 * - Enrolls existing test students in the class
 * - Creates quiz_attempts with a mix of correct/incorrect answers
 *
 * Prerequisites:
 * - Run seed:admin first to create test users (test-teacher, test students)
 *
 * Run with: npm run seed:teacher-data
 */
async function seedTeacherClassData() {
  console.log('🔗 Connecting to database...');
  const client = await retryWithBackoff(() => pool.connect());

  try {
    console.log('🌱 Starting teacher class data seeding...\n');

    await client.query('BEGIN');

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    // ========================================
    // 1. Create a class for the test teacher
    // ========================================
    console.log('📚 Creating test class...');

    const classId = 'seed-class-001';
    const className = '1° Medio A - Matemáticas';
    const teacherId = 'test-teacher';

    // Check if class already exists
    const existingClass = await client.query(
      'SELECT id FROM classes WHERE id = $1',
      [classId]
    );

    if (existingClass.rows.length > 0) {
      console.log('ℹ️  Class already exists, updating...');
      await client.query(
        `UPDATE classes SET
          name = $1,
          description = $2,
          level = $3,
          school_name = $4,
          is_active = $5,
          updated_at = $6
        WHERE id = $7`,
        [
          className,
          'Clase de prueba para 1° Medio',
          '1-medio',
          'Colegio Demo',
          true,
          now,
          classId
        ]
      );
    } else {
      await client.query(
        `INSERT INTO classes (id, name, description, teacher_id, level, school_name, max_students, is_active, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          classId,
          className,
          'Clase de prueba para 1° Medio',
          teacherId,
          '1-medio',
          'Colegio Demo',
          45,
          true,
          now,
          now
        ]
      );
    }
    console.log(`✅ Class created/updated: ${className}`);

    // ========================================
    // 2. Enroll test students in the class
    // ========================================
    console.log('\n👥 Enrolling students...');

    const students = [
      { id: 'test-1medio-student', name: 'Estudiante 1° Medio' },
      { id: 'test-2medio-student', name: 'Estudiante 2° Medio' },
      { id: 'test-3medio-student', name: 'Estudiante 3° Medio' },
      { id: 'test-paes-student', name: 'Estudiante PAES' },
    ];

    for (const student of students) {
      // Check if student exists
      const existingStudent = await client.query(
        'SELECT id FROM users WHERE id = $1',
        [student.id]
      );

      if (existingStudent.rows.length === 0) {
        console.log(`⚠️  Student ${student.id} not found, skipping...`);
        continue;
      }

      // Upsert enrollment
      await client.query(
        `INSERT INTO class_enrollments (class_id, student_id, enrolled_at, enrolled_by, status)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (class_id, student_id) DO UPDATE SET
           status = 'active',
           enrolled_at = EXCLUDED.enrolled_at`,
        [classId, student.id, now, teacherId, 'active']
      );
      console.log(`   ✅ Enrolled: ${student.name}`);
    }

    // ========================================
    // 3. Create quiz sessions and attempts
    // ========================================
    console.log('\n📝 Creating quiz sessions and attempts...');

    // Define questions pool for quiz sessions
    const questionsPool = [
      {
        id: 'seed-q-fracciones-001',
        topic: 'Fracciones',
        subject: 'números',
        question: '¿Cuánto es 1/2 + 1/4?',
        options: JSON.stringify(['3/4', '2/4', '2/6', '1/6']),
        correctAnswer: 0,
        explanation: 'Para sumar fracciones con distinto denominador, primero encontramos un denominador común.',
      },
      {
        id: 'seed-q-ecuaciones-001',
        topic: 'Ecuaciones lineales',
        subject: 'álgebra',
        question: 'Si 2x + 5 = 15, ¿cuál es el valor de x?',
        options: JSON.stringify(['5', '10', '7.5', '20']),
        correctAnswer: 0,
        explanation: 'Despejamos x: 2x = 15 - 5 = 10, entonces x = 5.',
      },
      {
        id: 'seed-q-porcentajes-001',
        topic: 'Porcentajes',
        subject: 'números',
        question: '¿Cuál es el 25% de 80?',
        options: JSON.stringify(['20', '25', '15', '40']),
        correctAnswer: 0,
        explanation: '25% de 80 = 0.25 × 80 = 20.',
      },
      {
        id: 'seed-q-geometria-001',
        topic: 'Áreas',
        subject: 'geometría',
        question: '¿Cuál es el área de un rectángulo de 5 cm de largo y 3 cm de ancho?',
        options: JSON.stringify(['15 cm²', '16 cm²', '8 cm²', '30 cm²']),
        correctAnswer: 0,
        explanation: 'Área = largo × ancho = 5 × 3 = 15 cm².',
      },
      {
        id: 'seed-q-probabilidad-001',
        topic: 'Probabilidad básica',
        subject: 'probabilidad',
        question: '¿Cuál es la probabilidad de obtener cara al lanzar una moneda?',
        options: JSON.stringify(['1/2', '1/4', '1/3', '2/3']),
        correctAnswer: 0,
        explanation: 'Una moneda tiene 2 caras posibles, y solo 1 es "cara", por lo que P(cara) = 1/2.',
      },
      {
        id: 'seed-q-fracciones-002',
        topic: 'Fracciones',
        subject: 'números',
        question: '¿Cuánto es 3/4 - 1/2?',
        options: JSON.stringify(['1/4', '2/4', '1/2', '3/2']),
        correctAnswer: 0,
        explanation: '3/4 - 1/2 = 3/4 - 2/4 = 1/4',
      },
      {
        id: 'seed-q-ecuaciones-002',
        topic: 'Ecuaciones lineales',
        subject: 'álgebra',
        question: 'Si 3x - 6 = 9, ¿cuál es el valor de x?',
        options: JSON.stringify(['5', '3', '1', '15']),
        correctAnswer: 0,
        explanation: '3x = 9 + 6 = 15, entonces x = 5.',
      },
    ];

    const activeStudents = students.filter(s =>
      ['test-1medio-student', 'test-2medio-student', 'test-paes-student'].includes(s.id)
    );

    let attemptCount = 0;
    let sessionCount = 0;

    // Create completed quiz sessions for each active student (lessons)
    // Each session needs >= 5 questions to count as a completed lesson
    for (const student of activeStudents) {
      // Create 2 completed sessions per student
      for (let sessionNum = 0; sessionNum < 2; sessionNum++) {
        const sessionId = `seed-session-${student.id}-${sessionNum}`;
        const daysAgo = Math.floor(Math.random() * 10) + 1;
        const sessionStartedAt = now - (daysAgo * dayMs);
        const sessionCompletedAt = sessionStartedAt + (15 * 60 * 1000); // 15 minutes later

        // Create quiz_session
        await client.query(
          `INSERT INTO quiz_sessions (id, user_id, level, started_at, completed_at, ai_conversation, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO UPDATE SET completed_at = EXCLUDED.completed_at`,
          [sessionId, student.id, 'M1', sessionStartedAt, sessionCompletedAt, '[]', sessionStartedAt]
        );
        sessionCount++;

        // Create 6 quiz_attempts per session (>= 5 required for "completed lesson")
        const shuffledQuestions = [...questionsPool].sort(() => Math.random() - 0.5).slice(0, 6);

        for (let qIndex = 0; qIndex < shuffledQuestions.length; qIndex++) {
          const q = shuffledQuestions[qIndex];
          // Mix of correct/incorrect: ~60% correct rate
          const isCorrect = Math.random() < 0.6;
          const userAnswer = isCorrect ? q.correctAnswer : (q.correctAnswer + 1) % 4;
          const attemptedAt = sessionStartedAt + (qIndex * 2 * 60 * 1000); // 2 min per question

          await client.query(
            `INSERT INTO quiz_attempts (
              user_id, quiz_session_id, question_id, level, topic, subject,
              question, options, user_answer, correct_answer, is_correct,
              difficulty, explanation, skills, attempted_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
            [
              student.id,
              sessionId,
              `${q.id}-s${sessionNum}-q${qIndex}`,
              'M1',
              q.topic,
              q.subject,
              q.question,
              q.options,
              userAnswer,
              q.correctAnswer,
              isCorrect,
              'medium',
              q.explanation,
              JSON.stringify([q.topic.toLowerCase().replace(' ', '-')]),
              attemptedAt
            ]
          );
          attemptCount++;
        }
      }
    }

    console.log(`✅ Created ${sessionCount} quiz sessions`);

    // Also create standalone attempts with high error rates for "Errores Comunes"
    console.log('\n📝 Creating additional attempts for error tracking...');

    // These are the questions that will appear in "Errores Comunes"
    const errorPatterns = [
      // Question 1: distributed across students with high error rate (80%)
      { question: questionsPool[0], attempts: [
        { studentIndex: 0, correct: false },
        { studentIndex: 1, correct: false },
        { studentIndex: 2, correct: false },
        { studentIndex: 0, correct: false },
        { studentIndex: 1, correct: true },
      ]},
      // Question 2: 67% error rate
      { question: questionsPool[1], attempts: [
        { studentIndex: 0, correct: false },
        { studentIndex: 1, correct: false },
        { studentIndex: 2, correct: true },
        { studentIndex: 0, correct: false },
        { studentIndex: 1, correct: false },
        { studentIndex: 2, correct: true },
      ]},
      // Question 3: 50% error rate
      { question: questionsPool[2], attempts: [
        { studentIndex: 0, correct: false },
        { studentIndex: 1, correct: true },
        { studentIndex: 2, correct: false },
        { studentIndex: 0, correct: true },
      ]},
    ];

    for (const pattern of errorPatterns) {
      const q = pattern.question;
      for (let i = 0; i < pattern.attempts.length; i++) {
        const attempt = pattern.attempts[i];
        const student = activeStudents[attempt.studentIndex];
        const userAnswer = attempt.correct ? q.correctAnswer : (q.correctAnswer + 1) % 4;
        const daysAgo = Math.floor(Math.random() * 15) + 1;
        const attemptedAt = now - (daysAgo * dayMs) + Math.floor(Math.random() * dayMs);

        await client.query(
          `INSERT INTO quiz_attempts (
            user_id, question_id, level, topic, subject,
            question, options, user_answer, correct_answer, is_correct,
            difficulty, explanation, skills, attempted_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            student.id,
            `${q.id}-err-${i}`,
            'M1',
            q.topic,
            q.subject,
            q.question,
            q.options,
            userAnswer,
            q.correctAnswer,
            attempt.correct,
            'medium',
            q.explanation,
            JSON.stringify([q.topic.toLowerCase().replace(' ', '-')]),
            attemptedAt
          ]
        );
        attemptCount++;
      }
    }

    console.log(`✅ Created ${attemptCount} total quiz attempts`);

    // ========================================
    // 4. Summary
    // ========================================
    await client.query('COMMIT');

    console.log('\n' + '='.repeat(50));
    console.log('✅ Seed completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Class: ${className} (ID: ${classId})`);
    console.log(`   - Teacher: ${teacherId}`);
    console.log(`   - Students enrolled: ${students.length}`);
    console.log(`   - Quiz sessions created: ${sessionCount} (2 per student)`);
    console.log(`   - Quiz attempts created: ${attemptCount}`);
    console.log(`   - Lessons per student: 2 (6 questions each)`);
    console.log('\n🔍 To test features:');
    console.log(`   1. Login as teacher (teacher / test123)`);
    console.log(`   2. Go to /teacher/classes/${classId}`);
    console.log(`   3. "Estudiantes" tab: Should show questions, lessons, and accuracy`);
    console.log(`   4. "Errores Comunes" tab: Should show high-error questions`);
    console.log('='.repeat(50));

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding teacher class data:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the seeder
seedTeacherClassData()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
