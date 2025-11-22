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
 * Realistic M1 questions covering algebra, numbers, and probability
 */
const M1_QUESTIONS = [
  {
    id: 'q1',
    type: 'multiple_choice',
    topic: 'Álgebra - Ecuaciones lineales',
    statement: 'Si 3x + 7 = 22, ¿cuál es el valor de x?',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 9'],
    correctAnswer: 1,
    explanation: 'Restando 7 en ambos lados: 3x = 15. Dividiendo por 3: x = 5.',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    type: 'multiple_choice',
    topic: 'Números - Fracciones',
    statement: '¿Cuál es el resultado de 2/3 + 1/4?',
    options: ['3/7', '5/12', '11/12', '8/12'],
    correctAnswer: 2,
    explanation: 'Común denominador 12: (8/12) + (3/12) = 11/12.',
    difficulty: 'medium',
  },
  {
    id: 'q3',
    type: 'multiple_choice',
    topic: 'Álgebra - Factorización',
    statement: '¿Cuál es la factorización de x² - 9?',
    options: ['(x - 3)(x - 3)', '(x + 3)(x + 3)', '(x - 3)(x + 3)', '(x - 9)(x + 1)'],
    correctAnswer: 2,
    explanation: 'Es una diferencia de cuadrados: x² - 9 = (x - 3)(x + 3).',
    difficulty: 'medium',
  },
  {
    id: 'q4',
    type: 'multiple_choice',
    topic: 'Probabilidad - Eventos simples',
    statement: 'Al lanzar un dado, ¿cuál es la probabilidad de obtener un número par?',
    options: ['1/6', '1/3', '1/2', '2/3'],
    correctAnswer: 2,
    explanation: 'Números pares: {2, 4, 6}. Hay 3 casos favorables de 6 posibles: 3/6 = 1/2.',
    difficulty: 'easy',
  },
  {
    id: 'q5',
    type: 'multiple_choice',
    topic: 'Álgebra - Sistemas de ecuaciones',
    statement: 'Si x + y = 10 y x - y = 4, ¿cuál es el valor de x?',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctAnswer: 2,
    explanation: 'Sumando ambas ecuaciones: 2x = 14, entonces x = 7.',
    difficulty: 'medium',
  },
  {
    id: 'q6',
    type: 'multiple_choice',
    topic: 'Números - Porcentajes',
    statement: 'El 25% de 80 es:',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: '25% = 0.25. Entonces 0.25 × 80 = 20.',
    difficulty: 'easy',
  },
  {
    id: 'q7',
    type: 'multiple_choice',
    topic: 'Álgebra - Ecuaciones cuadráticas',
    statement: '¿Cuántas soluciones reales tiene la ecuación x² + 2x + 5 = 0?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 0,
    explanation: 'Discriminante: b² - 4ac = 4 - 20 = -16 < 0. No hay soluciones reales.',
    difficulty: 'hard',
  },
  {
    id: 'q8',
    type: 'multiple_choice',
    topic: 'Números - Proporcionalidad',
    statement: 'Si 5 lápices cuestan $2.500, ¿cuánto cuestan 8 lápices?',
    options: ['$3.500', '$4.000', '$4.500', '$5.000'],
    correctAnswer: 1,
    explanation: 'Precio por lápiz: $2.500/5 = $500. Entonces 8 × $500 = $4.000.',
    difficulty: 'medium',
  },
  {
    id: 'q9',
    type: 'multiple_choice',
    topic: 'Álgebra - Inecuaciones',
    statement: '¿Cuál es el conjunto solución de 2x - 5 > 3?',
    options: ['x > 1', 'x > 4', 'x < 4', 'x < 1'],
    correctAnswer: 1,
    explanation: '2x > 8, dividiendo por 2: x > 4.',
    difficulty: 'medium',
  },
  {
    id: 'q10',
    type: 'multiple_choice',
    topic: 'Probabilidad - Combinatoria',
    statement: '¿De cuántas formas se pueden ordenar 3 personas en una fila?',
    options: ['3', '6', '9', '12'],
    correctAnswer: 1,
    explanation: 'Permutaciones de 3 elementos: 3! = 3 × 2 × 1 = 6.',
    difficulty: 'medium',
  },
];

/**
 * Realistic M2 questions covering geometry and data analysis
 */
const M2_QUESTIONS = [
  {
    id: 'q1',
    type: 'multiple_choice',
    topic: 'Geometría - Áreas',
    statement: '¿Cuál es el área de un triángulo con base 8 cm y altura 6 cm?',
    options: ['14 cm²', '24 cm²', '32 cm²', '48 cm²'],
    correctAnswer: 1,
    explanation: 'Área = (base × altura) / 2 = (8 × 6) / 2 = 24 cm².',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    type: 'multiple_choice',
    topic: 'Geometría - Teorema de Pitágoras',
    statement: 'En un triángulo rectángulo con catetos de 3 y 4, ¿cuál es la hipotenusa?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 0,
    explanation: 'Por Pitágoras: c² = 3² + 4² = 9 + 16 = 25, entonces c = 5.',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    type: 'multiple_choice',
    topic: 'Datos - Medidas de tendencia central',
    statement: '¿Cuál es la mediana del conjunto {3, 7, 5, 9, 2}?',
    options: ['3', '5', '7', '9'],
    correctAnswer: 1,
    explanation: 'Ordenando: {2, 3, 5, 7, 9}. El valor central es 5.',
    difficulty: 'medium',
  },
  {
    id: 'q4',
    type: 'multiple_choice',
    topic: 'Geometría - Perímetros',
    statement: 'Un cuadrado tiene un perímetro de 32 cm. ¿Cuál es el lado del cuadrado?',
    options: ['4 cm', '6 cm', '8 cm', '10 cm'],
    correctAnswer: 2,
    explanation: 'Perímetro = 4 × lado. Entonces 32 = 4 × lado, lado = 8 cm.',
    difficulty: 'easy',
  },
  {
    id: 'q5',
    type: 'multiple_choice',
    topic: 'Geometría - Volumen',
    statement: '¿Cuál es el volumen de un cubo con arista de 3 cm?',
    options: ['9 cm³', '18 cm³', '27 cm³', '81 cm³'],
    correctAnswer: 2,
    explanation: 'Volumen = arista³ = 3³ = 27 cm³.',
    difficulty: 'medium',
  },
  {
    id: 'q6',
    type: 'multiple_choice',
    topic: 'Datos - Promedio',
    statement: '¿Cuál es el promedio de 15, 20, 25 y 30?',
    options: ['20', '22.5', '25', '27.5'],
    correctAnswer: 1,
    explanation: 'Promedio = (15 + 20 + 25 + 30) / 4 = 90 / 4 = 22.5.',
    difficulty: 'easy',
  },
  {
    id: 'q7',
    type: 'multiple_choice',
    topic: 'Geometría - Ángulos',
    statement: 'Si dos ángulos son complementarios y uno mide 35°, ¿cuánto mide el otro?',
    options: ['45°', '55°', '65°', '145°'],
    correctAnswer: 1,
    explanation: 'Ángulos complementarios suman 90°. Entonces 90° - 35° = 55°.',
    difficulty: 'easy',
  },
  {
    id: 'q8',
    type: 'multiple_choice',
    topic: 'Geometría - Circunferencia',
    statement: '¿Cuál es la circunferencia de un círculo con radio 7 cm? (Use π ≈ 3.14)',
    options: ['21.98 cm', '43.96 cm', '153.86 cm', '307.72 cm'],
    correctAnswer: 1,
    explanation: 'Circunferencia = 2πr = 2 × 3.14 × 7 ≈ 43.96 cm.',
    difficulty: 'medium',
  },
  {
    id: 'q9',
    type: 'multiple_choice',
    topic: 'Datos - Desviación',
    statement: '¿Cuál conjunto tiene mayor variabilidad: {1, 2, 3} o {10, 20, 30}?',
    options: ['{1, 2, 3}', '{10, 20, 30}', 'Tienen la misma', 'No se puede determinar'],
    correctAnswer: 1,
    explanation: 'Los valores en {10, 20, 30} están más dispersos, tienen mayor variabilidad.',
    difficulty: 'medium',
  },
  {
    id: 'q10',
    type: 'multiple_choice',
    topic: 'Geometría - Transformaciones',
    statement: '¿Qué transformación mueve una figura sin cambiar su forma ni tamaño?',
    options: ['Rotación', 'Traslación', 'Reflexión', 'Todas las anteriores'],
    correctAnswer: 3,
    explanation: 'Las tres (rotación, traslación y reflexión) son isometrías que preservan forma y tamaño.',
    difficulty: 'hard',
  },
  {
    id: 'q11',
    type: 'multiple_choice',
    topic: 'Geometría - Semejanza',
    statement: 'Dos triángulos tienen lados proporcionales 3:5. Si el menor tiene perímetro 18, ¿cuál es el perímetro del mayor?',
    options: ['24', '27', '30', '36'],
    correctAnswer: 2,
    explanation: 'Razón 3:5 significa que el mayor es 5/3 del menor: 18 × (5/3) = 30.',
    difficulty: 'hard',
  },
  {
    id: 'q12',
    type: 'multiple_choice',
    topic: 'Datos - Probabilidad condicional',
    statement: 'En una caja hay 5 bolas rojas y 3 azules. Si se saca una roja y no se devuelve, ¿cuál es la probabilidad de sacar otra roja?',
    options: ['4/7', '5/8', '4/8', '5/7'],
    correctAnswer: 0,
    explanation: 'Quedan 4 rojas de 7 bolas totales: 4/7.',
    difficulty: 'hard',
  },
];

/**
 * Generate questions for a session based on level
 */
function generateSessionQuestions(level: 'M1' | 'M2', count: number) {
  const sourceQuestions = level === 'M1' ? M1_QUESTIONS : M2_QUESTIONS;
  return sourceQuestions.slice(0, count);
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
    const session1Questions = generateSessionQuestions('M1', 10);

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
    const session2Questions = generateSessionQuestions('M2', 12);

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
    const session3Questions = generateSessionQuestions('M1', 8);

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
