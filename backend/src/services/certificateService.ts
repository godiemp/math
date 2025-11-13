/**
 * ============================================================================
 * CERTIFICATE SERVICE
 * ============================================================================
 *
 * Service for generating premium certificates for quiz sessions and live
 * practice sessions (ensayos). Includes:
 * - Data aggregation from quiz attempts and live sessions
 * - AI-powered personalized messages
 * - Badge/medal generation based on performance
 * - Percentile calculation
 * - Chart data generation
 * - Certificate storage and retrieval
 */

import { pool } from '../config/database';
import {
  Certificate,
  CertificateType,
  Badge,
  SectionScore,
  ChartData,
  CertificateGenerationRequest
} from '../lib/types/core';
import Anthropic from '@anthropic-ai/sdk';
import crypto from 'crypto';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

/**
 * Generate a unique certificate code
 */
function generateCertificateCode(): string {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `CERT-${timestamp}-${random}`;
}

/**
 * Calculate percentile based on user score compared to all users
 */
async function calculatePercentile(
  userId: string,
  score: number,
  certificateType: CertificateType,
  sessionId?: string
): Promise<number | undefined> {
  try {
    let query: string;
    let params: any[];

    if (certificateType === 'live_session' && sessionId) {
      // For live sessions, compare with all participants in the same session
      query = `
        SELECT COUNT(*) as total_below
        FROM session_participants
        WHERE session_id = $1 AND score < $2
      `;
      params = [sessionId, score];

      const totalQuery = `
        SELECT COUNT(*) as total_participants
        FROM session_participants
        WHERE session_id = $1
      `;

      const belowResult = await pool.query(query, params);
      const totalResult = await pool.query(totalQuery, [sessionId]);

      const totalBelow = parseInt(belowResult.rows[0]?.total_below || '0');
      const totalParticipants = parseInt(totalResult.rows[0]?.total_participants || '0');

      if (totalParticipants === 0) return undefined;

      return Math.round((totalBelow / totalParticipants) * 100);
    } else {
      // For quiz sessions, compare with all quiz sessions
      // Group by quiz session and get the best score per session
      query = `
        WITH session_scores AS (
          SELECT
            quiz_session_id,
            COUNT(*) FILTER (WHERE is_correct = true) as session_score
          FROM quiz_attempts
          WHERE user_id != $1
          GROUP BY quiz_session_id
        )
        SELECT COUNT(*) as total_below
        FROM session_scores
        WHERE session_score < $2
      `;
      params = [userId, score];

      const totalQuery = `
        SELECT COUNT(DISTINCT quiz_session_id) as total_sessions
        FROM quiz_attempts
        WHERE user_id != $1
      `;

      const belowResult = await pool.query(query, params);
      const totalResult = await pool.query(totalQuery, [userId]);

      const totalBelow = parseInt(belowResult.rows[0]?.total_below || '0');
      const totalSessions = parseInt(totalResult.rows[0]?.total_sessions || '0');

      if (totalSessions === 0) return undefined;

      return Math.round((totalBelow / totalSessions) * 100);
    }
  } catch (error) {
    console.error('Error calculating percentile:', error);
    return undefined;
  }
}

/**
 * Generate badges based on performance
 */
async function generateBadges(
  userId: string,
  score: number,
  totalQuestions: number,
  percentage: number,
  percentile: number | undefined,
  certificateType: CertificateType
): Promise<Badge[]> {
  const badges: Badge[] = [];
  const now = Date.now();

  // Perfect score badge
  if (score === totalQuestions) {
    badges.push({
      id: 'perfect-score',
      name: '🏆 Puntaje Perfecto',
      description: 'Respondiste todas las preguntas correctamente',
      icon: '🏆',
      earnedAt: now,
    });
  }

  // High achievement badges (by percentage)
  if (percentage >= 90 && percentage < 100) {
    badges.push({
      id: 'excellence',
      name: '⭐ Excelencia',
      description: 'Más del 90% de respuestas correctas',
      icon: '⭐',
      earnedAt: now,
    });
  } else if (percentage >= 80 && percentage < 90) {
    badges.push({
      id: 'high-achievement',
      name: '🎯 Alto Rendimiento',
      description: 'Más del 80% de respuestas correctas',
      icon: '🎯',
      earnedAt: now,
    });
  } else if (percentage >= 70 && percentage < 80) {
    badges.push({
      id: 'good-performance',
      name: '✨ Buen Desempeño',
      description: 'Más del 70% de respuestas correctas',
      icon: '✨',
      earnedAt: now,
    });
  }

  // Percentile-based badges
  if (percentile !== undefined) {
    if (percentile >= 90) {
      badges.push({
        id: 'top-10',
        name: '🥇 Top 10%',
        description: 'Entre el 10% superior de participantes',
        icon: '🥇',
        earnedAt: now,
      });
    } else if (percentile >= 75) {
      badges.push({
        id: 'top-25',
        name: '🥈 Top 25%',
        description: 'Entre el 25% superior de participantes',
        icon: '🥈',
        earnedAt: now,
      });
    } else if (percentile >= 50) {
      badges.push({
        id: 'above-average',
        name: '📈 Sobre el Promedio',
        description: 'Desempeño superior al promedio',
        icon: '📈',
        earnedAt: now,
      });
    }
  }

  // Persistence badge - check if user has completed multiple sessions
  const persistenceQuery = certificateType === 'live_session'
    ? 'SELECT COUNT(DISTINCT session_id) as session_count FROM session_participants WHERE user_id = $1'
    : 'SELECT COUNT(DISTINCT quiz_session_id) as session_count FROM quiz_attempts WHERE user_id = $1';

  const persistenceResult = await pool.query(persistenceQuery, [userId]);
  const sessionCount = parseInt(persistenceResult.rows[0]?.session_count || '0');

  if (sessionCount >= 10) {
    badges.push({
      id: 'persistence',
      name: '🔥 Persistencia',
      description: 'Has completado 10 o más ensayos',
      icon: '🔥',
      earnedAt: now,
    });
  } else if (sessionCount >= 5) {
    badges.push({
      id: 'dedication',
      name: '💪 Dedicación',
      description: 'Has completado 5 o más ensayos',
      icon: '💪',
      earnedAt: now,
    });
  }

  // Completist badge - answered all questions
  badges.push({
    id: 'completist',
    name: '✅ Completista',
    description: 'Completaste todas las preguntas del ensayo',
    icon: '✅',
    earnedAt: now,
  });

  // Check for improvement compared to previous session
  try {
    const previousQuery = certificateType === 'live_session'
      ? `
        SELECT sp.score, s.questions
        FROM session_participants sp
        JOIN sessions s ON sp.session_id = s.id
        WHERE sp.user_id = $1 AND s.status = 'completed'
        ORDER BY s.completed_at DESC
        LIMIT 2
      `
      : `
        SELECT
          quiz_session_id,
          COUNT(*) FILTER (WHERE is_correct = true) as score,
          COUNT(*) as total
        FROM quiz_attempts
        WHERE user_id = $1 AND quiz_session_id IS NOT NULL
        GROUP BY quiz_session_id
        ORDER BY MAX(attempted_at) DESC
        LIMIT 2
      `;

    const previousResult = await pool.query(previousQuery, [userId]);

    if (previousResult.rows.length >= 2) {
      const currentScore = certificateType === 'live_session'
        ? score
        : score;
      const previousScore = certificateType === 'live_session'
        ? previousResult.rows[1].score
        : previousResult.rows[1].score;

      if (currentScore > previousScore) {
        badges.push({
          id: 'improvement',
          name: '📊 Mejora Continua',
          description: 'Mejoraste tu puntaje respecto del ensayo anterior',
          icon: '📊',
          earnedAt: now,
        });
      }
    }
  } catch (error) {
    console.error('Error checking for improvement:', error);
  }

  return badges;
}

/**
 * Generate section scores for multi-section tests
 */
async function generateSectionScores(
  quizSessionId: string,
  certificateType: CertificateType
): Promise<SectionScore[]> {
  if (certificateType !== 'quiz_session') {
    return [];
  }

  try {
    // Group by subject (área temática)
    const query = `
      SELECT
        subject as section_name,
        COUNT(*) as question_count,
        COUNT(*) FILTER (WHERE is_correct = true) as correct_count
      FROM quiz_attempts
      WHERE quiz_session_id = $1
      GROUP BY subject
      ORDER BY subject
    `;

    const result = await pool.query(query, [quizSessionId]);

    return result.rows.map(row => {
      const score = parseInt(row.correct_count);
      const maxScore = parseInt(row.question_count);
      const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

      return {
        sectionName: row.section_name,
        score,
        maxScore,
        percentage: Math.round(percentage * 100) / 100,
        questionCount: maxScore,
      };
    });
  } catch (error) {
    console.error('Error generating section scores:', error);
    return [];
  }
}

/**
 * Generate chart data for visualization
 */
function generateChartData(
  correctCount: number,
  incorrectCount: number,
  omittedCount: number,
  sectionScores: SectionScore[]
): ChartData[] {
  const charts: ChartData[] = [];

  // Question breakdown pie chart
  charts.push({
    type: 'pie',
    labels: ['Correctas', 'Incorrectas', 'Omitidas'],
    values: [correctCount, incorrectCount, omittedCount],
    colors: ['#10b981', '#ef4444', '#6b7280'],
  });

  // Section scores bar chart (if available)
  if (sectionScores.length > 0) {
    charts.push({
      type: 'bar',
      labels: sectionScores.map(s => s.sectionName),
      values: sectionScores.map(s => s.percentage),
      colors: sectionScores.map(s =>
        s.percentage >= 80 ? '#10b981' :
        s.percentage >= 60 ? '#f59e0b' :
        '#ef4444'
      ),
    });
  }

  return charts;
}

/**
 * Generate AI-powered personalized message based on performance
 */
async function generatePersonalizedMessage(
  percentage: number,
  percentile: number | undefined,
  sectionScores: SectionScore[],
  badges: Badge[]
): Promise<string> {
  try {
    // Prepare section analysis
    const sectionAnalysis = sectionScores.length > 0
      ? sectionScores
          .map(s => `${s.sectionName}: ${s.percentage.toFixed(1)}% (${s.score}/${s.maxScore})`)
          .join('\n')
      : 'No hay datos de secciones disponibles';

    // Find strengths and weaknesses
    const sortedSections = [...sectionScores].sort((a, b) => b.percentage - a.percentage);
    const strongestSection = sortedSections[0]?.sectionName || 'N/A';
    const weakestSection = sortedSections[sortedSections.length - 1]?.sectionName || 'N/A';

    const prompt = `Genera un mensaje motivacional personalizado para un estudiante chileno que está preparando la PAES (Prueba de Acceso a la Educación Superior) de Matemáticas.

Datos del desempeño:
- Porcentaje de logro: ${percentage.toFixed(1)}%
- Percentil nacional simulado: ${percentile !== undefined ? `${percentile}°` : 'No disponible'}
- Análisis por sección:
${sectionAnalysis}
- Área más fuerte: ${strongestSection}
- Área a reforzar: ${weakestSection}
- Medallas obtenidas: ${badges.length > 0 ? badges.map(b => b.name).join(', ') : 'Ninguna'}

Instrucciones:
1. Escribe un mensaje motivacional de 2-3 oraciones
2. Menciona específicamente su fortaleza (${strongestSection})
3. Sugiere amablemente qué área reforzar (${weakestSection})
4. Interpreta el percentil si está disponible
5. Usa un tono cercano, motivador y profesional
6. Usa "tú" (informal chileno)
7. NO uses emojis
8. Máximo 150 palabras

Ejemplo de tono:
"Tu fortaleza estuvo en Álgebra, donde demostraste un excelente dominio. Para alcanzar tu mejor puntaje en la PAES, te recomendamos reforzar Geometría con práctica adicional. Estás en el 62° percentil nacional simulado, lo que significa que vas por muy buen camino."

Genera el mensaje:`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: prompt,
      }],
    });

    const message = response.content[0].type === 'text'
      ? response.content[0].text.trim()
      : 'Continúa practicando con dedicación. Cada ensayo te acerca más a tu meta en la PAES.';

    return message;
  } catch (error) {
    console.error('Error generating personalized message:', error);
    // Fallback message
    return `Tu desempeño fue de ${percentage.toFixed(1)}%. ${
      percentile !== undefined
        ? `Estás en el ${percentile}° percentil nacional simulado. `
        : ''
    }Continúa practicando para alcanzar tu mejor puntaje en la PAES.`;
  }
}

/**
 * Generate certificate for a quiz session
 */
async function generateQuizSessionCertificate(
  userId: string,
  quizSessionId: string
): Promise<Certificate> {
  // Fetch quiz session data
  const sessionQuery = `
    SELECT
      quiz_session_id,
      COUNT(*) as total_questions,
      COUNT(*) FILTER (WHERE is_correct = true) as correct_count,
      COUNT(*) FILTER (WHERE is_correct = false) as incorrect_count,
      MIN(attempted_at) as started_at,
      MAX(attempted_at) as completed_at,
      level
    FROM quiz_attempts
    WHERE quiz_session_id = $1 AND user_id = $2
    GROUP BY quiz_session_id, level
  `;

  const sessionResult = await pool.query(sessionQuery, [quizSessionId, userId]);

  if (sessionResult.rows.length === 0) {
    throw new Error('Quiz session not found or no attempts recorded');
  }

  const sessionData = sessionResult.rows[0];
  const totalQuestions = parseInt(sessionData.total_questions);
  const correctCount = parseInt(sessionData.correct_count);
  const incorrectCount = parseInt(sessionData.incorrect_count);
  const omittedCount = 0; // Quiz sessions don't track omitted questions
  const percentage = (correctCount / totalQuestions) * 100;

  const startedAt = parseInt(sessionData.started_at);
  const completedAt = parseInt(sessionData.completed_at);
  const durationMinutes = Math.round((completedAt - startedAt) / (1000 * 60));

  // Get user info
  const userQuery = 'SELECT display_name FROM users WHERE id = $1';
  const userResult = await pool.query(userQuery, [userId]);
  const displayName = userResult.rows[0]?.display_name || 'Estudiante';

  // Calculate percentile
  const percentile = await calculatePercentile(userId, correctCount, 'quiz_session');

  // Generate badges
  const badges = await generateBadges(
    userId,
    correctCount,
    totalQuestions,
    percentage,
    percentile,
    'quiz_session'
  );

  // Generate section scores
  const sectionScores = await generateSectionScores(quizSessionId, 'quiz_session');

  // Generate chart data
  const chartsData = generateChartData(correctCount, incorrectCount, omittedCount, sectionScores);

  // Generate personalized message
  const personalizedMessage = await generatePersonalizedMessage(
    percentage,
    percentile,
    sectionScores,
    badges
  );

  // Generate certificate code
  const certificateCode = generateCertificateCode();
  const certificateId = `cert_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;

  const now = Date.now();
  const testDate = completedAt;
  const testName = `Ensayo PAES Matemáticas ${sessionData.level} - ${new Date(testDate).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}`;

  // Store certificate in database
  const insertQuery = `
    INSERT INTO certificates (
      id, user_id, certificate_type, session_id, student_name, student_photo_url,
      certificate_code, test_name, test_date, test_duration_minutes, total_questions,
      total_score, max_score, percentage, percentile, section_scores,
      correct_count, incorrect_count, omitted_count, badges, personalized_message,
      charts_data, issued_at, verification_url, view_count, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
      $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27
    )
    RETURNING *
  `;

  const verificationUrl = `${process.env.FRONTEND_URL || 'https://app.example.com'}/verify/${certificateCode}`;

  const insertResult = await pool.query(insertQuery, [
    certificateId,
    userId,
    'quiz_session',
    quizSessionId,
    displayName,
    null, // studentPhotoUrl
    certificateCode,
    testName,
    testDate,
    durationMinutes,
    totalQuestions,
    correctCount,
    totalQuestions,
    percentage,
    percentile,
    JSON.stringify(sectionScores),
    correctCount,
    incorrectCount,
    omittedCount,
    JSON.stringify(badges),
    personalizedMessage,
    JSON.stringify(chartsData),
    now,
    verificationUrl,
    0, // viewCount
    now,
    now,
  ]);

  const certificate: Certificate = {
    id: certificateId,
    userId,
    certificateType: 'quiz_session',
    sessionId: quizSessionId,
    studentName: displayName,
    certificateCode,
    testName,
    testDate,
    testDurationMinutes: durationMinutes,
    totalQuestions,
    totalScore: correctCount,
    maxScore: totalQuestions,
    percentage,
    percentile,
    sectionScores,
    correctCount,
    incorrectCount,
    omittedCount,
    badges,
    personalizedMessage,
    chartsData,
    issuedAt: now,
    verificationUrl,
    viewCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  return certificate;
}

/**
 * Generate certificate for a live session (ensayo)
 */
async function generateLiveSessionCertificate(
  userId: string,
  sessionId: string
): Promise<Certificate> {
  // Fetch session data
  const sessionQuery = `
    SELECT
      s.id,
      s.name,
      s.level,
      s.duration_minutes,
      s.started_at,
      s.completed_at,
      s.questions,
      sp.score,
      sp.answers
    FROM sessions s
    JOIN session_participants sp ON s.id = sp.session_id
    WHERE s.id = $1 AND sp.user_id = $2
  `;

  const sessionResult = await pool.query(sessionQuery, [sessionId, userId]);

  if (sessionResult.rows.length === 0) {
    throw new Error('Live session not found or user did not participate');
  }

  const sessionData = sessionResult.rows[0];
  const questions = JSON.parse(sessionData.questions);
  const answers = JSON.parse(sessionData.answers);
  const totalQuestions = questions.length;
  const score = parseInt(sessionData.score);

  // Calculate question breakdown
  let correctCount = 0;
  let incorrectCount = 0;
  let omittedCount = 0;

  questions.forEach((question: any, index: number) => {
    const userAnswer = answers[index];
    if (userAnswer === null || userAnswer === undefined) {
      omittedCount++;
    } else if (userAnswer === question.correctAnswer) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const percentage = (score / totalQuestions) * 100;

  // Get user info
  const userQuery = 'SELECT display_name FROM users WHERE id = $1';
  const userResult = await pool.query(userQuery, [userId]);
  const displayName = userResult.rows[0]?.display_name || 'Estudiante';

  // Calculate percentile
  const percentile = await calculatePercentile(userId, score, 'live_session', sessionId);

  // Generate badges
  const badges = await generateBadges(
    userId,
    score,
    totalQuestions,
    percentage,
    percentile,
    'live_session'
  );

  // Generate section scores (by subject)
  const sectionScores: SectionScore[] = [];
  const subjectMap: Record<string, { correct: number; total: number }> = {};

  questions.forEach((question: any, index: number) => {
    const subject = question.subject || 'General';
    if (!subjectMap[subject]) {
      subjectMap[subject] = { correct: 0, total: 0 };
    }
    subjectMap[subject].total++;
    const userAnswer = answers[index];
    if (userAnswer === question.correctAnswer) {
      subjectMap[subject].correct++;
    }
  });

  Object.entries(subjectMap).forEach(([sectionName, data]) => {
    const sectionPercentage = (data.correct / data.total) * 100;
    sectionScores.push({
      sectionName,
      score: data.correct,
      maxScore: data.total,
      percentage: Math.round(sectionPercentage * 100) / 100,
      questionCount: data.total,
    });
  });

  // Generate chart data
  const chartsData = generateChartData(correctCount, incorrectCount, omittedCount, sectionScores);

  // Generate personalized message
  const personalizedMessage = await generatePersonalizedMessage(
    percentage,
    percentile,
    sectionScores,
    badges
  );

  // Generate certificate code
  const certificateCode = generateCertificateCode();
  const certificateId = `cert_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;

  const now = Date.now();
  const testDate = parseInt(sessionData.completed_at);
  const testName = sessionData.name;
  const durationMinutes = parseInt(sessionData.duration_minutes);

  // Store certificate in database
  const insertQuery = `
    INSERT INTO certificates (
      id, user_id, certificate_type, session_id, student_name, student_photo_url,
      certificate_code, test_name, test_date, test_duration_minutes, total_questions,
      total_score, max_score, percentage, percentile, section_scores,
      correct_count, incorrect_count, omitted_count, badges, personalized_message,
      charts_data, issued_at, verification_url, view_count, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
      $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27
    )
    RETURNING *
  `;

  const verificationUrl = `${process.env.FRONTEND_URL || 'https://app.example.com'}/verify/${certificateCode}`;

  await pool.query(insertQuery, [
    certificateId,
    userId,
    'live_session',
    sessionId,
    displayName,
    null, // studentPhotoUrl
    certificateCode,
    testName,
    testDate,
    durationMinutes,
    totalQuestions,
    score,
    totalQuestions,
    percentage,
    percentile,
    JSON.stringify(sectionScores),
    correctCount,
    incorrectCount,
    omittedCount,
    JSON.stringify(badges),
    personalizedMessage,
    JSON.stringify(chartsData),
    now,
    verificationUrl,
    0, // viewCount
    now,
    now,
  ]);

  const certificate: Certificate = {
    id: certificateId,
    userId,
    certificateType: 'live_session',
    sessionId,
    studentName: displayName,
    certificateCode,
    testName,
    testDate,
    testDurationMinutes: durationMinutes,
    totalQuestions,
    totalScore: score,
    maxScore: totalQuestions,
    percentage,
    percentile,
    sectionScores,
    correctCount,
    incorrectCount,
    omittedCount,
    badges,
    personalizedMessage,
    chartsData,
    issuedAt: now,
    verificationUrl,
    viewCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  return certificate;
}

/**
 * Generate a certificate based on request
 */
export async function generateCertificate(
  request: CertificateGenerationRequest
): Promise<Certificate> {
  const { userId, certificateType, sessionId, quizSessionId } = request;

  if (certificateType === 'quiz_session') {
    if (!quizSessionId) {
      throw new Error('quizSessionId is required for quiz_session certificates');
    }
    return await generateQuizSessionCertificate(userId, quizSessionId);
  } else if (certificateType === 'live_session') {
    if (!sessionId) {
      throw new Error('sessionId is required for live_session certificates');
    }
    return await generateLiveSessionCertificate(userId, sessionId);
  } else {
    throw new Error(`Unknown certificate type: ${certificateType}`);
  }
}

/**
 * Get certificate by ID
 */
export async function getCertificateById(certificateId: string): Promise<Certificate | null> {
  const query = 'SELECT * FROM certificates WHERE id = $1';
  const result = await pool.query(query, [certificateId]);

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return parseCertificateFromDb(row);
}

/**
 * Get certificate by code
 */
export async function getCertificateByCode(certificateCode: string): Promise<Certificate | null> {
  const query = 'SELECT * FROM certificates WHERE certificate_code = $1';
  const result = await pool.query(query, [certificateCode]);

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  // Increment view count
  await pool.query(
    'UPDATE certificates SET view_count = view_count + 1, last_viewed_at = $1 WHERE id = $2',
    [Date.now(), row.id]
  );

  return parseCertificateFromDb(row);
}

/**
 * Get all certificates for a user
 */
export async function getUserCertificates(userId: string): Promise<Certificate[]> {
  const query = `
    SELECT * FROM certificates
    WHERE user_id = $1
    ORDER BY issued_at DESC
  `;
  const result = await pool.query(query, [userId]);

  return result.rows.map(parseCertificateFromDb);
}

/**
 * Get certificate statistics for a user
 */
export async function getCertificateStats(userId: string): Promise<any> {
  const certificates = await getUserCertificates(userId);

  const stats = {
    totalCertificates: certificates.length,
    certificatesByType: {
      quiz_session: certificates.filter(c => c.certificateType === 'quiz_session').length,
      live_session: certificates.filter(c => c.certificateType === 'live_session').length,
    },
    averagePercentile: undefined as number | undefined,
    totalBadges: 0,
    recentCertificates: certificates.slice(0, 5),
  };

  const percentiles = certificates
    .map(c => c.percentile)
    .filter((p): p is number => p !== undefined);

  if (percentiles.length > 0) {
    stats.averagePercentile = Math.round(
      percentiles.reduce((sum, p) => sum + p, 0) / percentiles.length
    );
  }

  stats.totalBadges = certificates.reduce((sum, c) => sum + c.badges.length, 0);

  return stats;
}

/**
 * Helper function to safely parse JSON from database
 * PostgreSQL can return JSON/JSONB as either strings or objects
 */
function safeJsonParse(value: any, fallback: any = undefined): any {
  if (!value) return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return fallback;
    }
  }
  // If it's already an object, return it as-is
  return value;
}

/**
 * Parse certificate from database row
 */
function parseCertificateFromDb(row: any): Certificate {
  return {
    id: row.id,
    userId: row.user_id,
    certificateType: row.certificate_type,
    sessionId: row.session_id || undefined,
    studentName: row.student_name,
    studentPhotoUrl: row.student_photo_url || undefined,
    certificateCode: row.certificate_code,
    testName: row.test_name,
    testDate: parseInt(row.test_date),
    testDurationMinutes: parseInt(row.test_duration_minutes),
    totalQuestions: parseInt(row.total_questions),
    totalScore: parseInt(row.total_score),
    maxScore: parseInt(row.max_score),
    percentage: parseFloat(row.percentage),
    percentile: row.percentile !== null ? parseInt(row.percentile) : undefined,
    sectionScores: safeJsonParse(row.section_scores, undefined),
    correctCount: parseInt(row.correct_count),
    incorrectCount: parseInt(row.incorrect_count),
    omittedCount: parseInt(row.omitted_count),
    badges: safeJsonParse(row.badges, []),
    personalizedMessage: row.personalized_message || undefined,
    chartsData: safeJsonParse(row.charts_data, undefined),
    issuedAt: parseInt(row.issued_at),
    expiresAt: row.expires_at ? parseInt(row.expires_at) : undefined,
    verificationUrl: row.verification_url || undefined,
    pdfUrl: row.pdf_url || undefined,
    viewCount: parseInt(row.view_count || '0'),
    lastViewedAt: row.last_viewed_at ? parseInt(row.last_viewed_at) : undefined,
    createdAt: parseInt(row.created_at),
    updatedAt: parseInt(row.updated_at),
  };
}

/**
 * Delete a certificate
 */
export async function deleteCertificate(certificateId: string): Promise<boolean> {
  const result = await pool.query('DELETE FROM certificates WHERE id = $1', [certificateId]);
  return result.rowCount !== null && result.rowCount > 0;
}

/**
 * Get all certificates (for admin)
 */
export async function getAllCertificates(limit: number = 50, offset: number = 0): Promise<Certificate[]> {
  const query = `
    SELECT * FROM certificates
    ORDER BY issued_at DESC
    LIMIT $1 OFFSET $2
  `;
  const result = await pool.query(query, [limit, offset]);

  return result.rows.map(parseCertificateFromDb);
}
