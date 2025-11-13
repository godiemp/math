/**
 * ============================================================================
 * MOCK CERTIFICATE SERVICE
 * ============================================================================
 *
 * Generates mock certificate data for admin testing purposes.
 * This allows admins to test the certificate system without requiring
 * real completed sessions in the database.
 */

import { Certificate, Badge, SectionScore, ChartData } from '../lib/types/core';
import crypto from 'crypto';
import Anthropic from '@anthropic-ai/sdk';

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
 * Generate random mock section scores
 */
function generateMockSectionScores(): SectionScore[] {
  const sections = [
    { name: 'Números', weight: 0.25 },
    { name: 'Álgebra', weight: 0.3 },
    { name: 'Geometría', weight: 0.25 },
    { name: 'Probabilidad y Estadística', weight: 0.2 },
  ];

  return sections.map(section => {
    const maxScore = Math.round(50 * section.weight); // Total 50 questions
    const percentage = 55 + Math.random() * 40; // Between 55% and 95%
    const score = Math.round((percentage / 100) * maxScore);

    return {
      sectionName: section.name,
      score,
      maxScore,
      percentage: Math.round(percentage * 100) / 100,
      questionCount: maxScore,
    };
  });
}

/**
 * Generate mock badges based on performance
 */
function generateMockBadges(percentage: number, percentile: number): Badge[] {
  const badges: Badge[] = [];
  const now = Date.now();

  if (percentage >= 90) {
    badges.push({
      id: 'excellence',
      name: '⭐ Excelencia',
      description: 'Más del 90% de respuestas correctas',
      icon: '⭐',
      earnedAt: now,
    });
  } else if (percentage >= 80) {
    badges.push({
      id: 'high-achievement',
      name: '🎯 Alto Rendimiento',
      description: 'Más del 80% de respuestas correctas',
      icon: '🎯',
      earnedAt: now,
    });
  } else if (percentage >= 70) {
    badges.push({
      id: 'good-performance',
      name: '✨ Buen Desempeño',
      description: 'Más del 70% de respuestas correctas',
      icon: '✨',
      earnedAt: now,
    });
  }

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

  badges.push({
    id: 'completist',
    name: '✅ Completista',
    description: 'Completaste todas las preguntas del ensayo',
    icon: '✅',
    earnedAt: now,
  });

  badges.push({
    id: 'dedication',
    name: '💪 Dedicación',
    description: 'Demostración de compromiso con la práctica',
    icon: '💪',
    earnedAt: now,
  });

  return badges;
}

/**
 * Generate mock chart data
 */
function generateMockChartData(
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

  // Section scores bar chart
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

  return charts;
}

/**
 * Generate AI-powered personalized message
 */
async function generateMockPersonalizedMessage(
  percentage: number,
  percentile: number,
  sectionScores: SectionScore[]
): Promise<string> {
  try {
    const sortedSections = [...sectionScores].sort((a, b) => b.percentage - a.percentage);
    const strongestSection = sortedSections[0]?.sectionName || 'N/A';
    const weakestSection = sortedSections[sortedSections.length - 1]?.sectionName || 'N/A';

    const prompt = `Genera un mensaje motivacional personalizado para un estudiante chileno que está preparando la PAES (Prueba de Acceso a la Educación Superior) de Matemáticas.

Datos del desempeño:
- Porcentaje de logro: ${percentage.toFixed(1)}%
- Percentil nacional simulado: ${percentile}°
- Área más fuerte: ${strongestSection}
- Área a reforzar: ${weakestSection}

Instrucciones:
1. Escribe un mensaje motivacional de 2-3 oraciones
2. Menciona específicamente su fortaleza
3. Sugiere amablemente qué área reforzar
4. Interpreta el percentil
5. Usa un tono cercano, motivador y profesional
6. Usa "tú" (informal chileno)
7. NO uses emojis
8. Máximo 150 palabras

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
      : `Tu desempeño fue de ${percentage.toFixed(1)}%. Estás en el ${percentile}° percentil nacional simulado. Continúa practicando para alcanzar tu mejor puntaje en la PAES.`;

    return message;
  } catch (error) {
    console.error('Error generating AI message:', error);
    // Fallback message
    return `Tu fortaleza estuvo en ${sectionScores[0]?.sectionName || 'Matemáticas'}, donde demostraste un buen dominio de los conceptos. Para alcanzar tu mejor puntaje en la PAES, te recomendamos reforzar ${sectionScores[sectionScores.length - 1]?.sectionName || 'las áreas más débiles'} con práctica adicional. Estás en el ${percentile}° percentil nacional simulado, lo que significa que vas por buen camino. ¡Sigue adelante!`;
  }
}

/**
 * Generate a complete mock certificate for admin testing
 */
export async function generateMockCertificate(adminUserId: string): Promise<Certificate> {
  const now = Date.now();
  const certificateId = `cert_mock_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
  const certificateCode = generateCertificateCode();

  // Generate mock test data
  const totalQuestions = 50;
  const percentage = 65 + Math.random() * 30; // Between 65% and 95%
  const totalScore = Math.round((percentage / 100) * totalQuestions);
  const correctCount = totalScore;
  const incorrectCount = totalQuestions - totalScore - Math.floor(Math.random() * 3); // 0-2 omitted
  const omittedCount = totalQuestions - correctCount - incorrectCount;
  const percentile = Math.round(45 + Math.random() * 50); // Between 45 and 95

  // Generate mock section scores
  const sectionScores = generateMockSectionScores();

  // Generate mock badges
  const badges = generateMockBadges(percentage, percentile);

  // Generate mock chart data
  const chartsData = generateMockChartData(correctCount, incorrectCount, omittedCount, sectionScores);

  // Generate AI personalized message
  const personalizedMessage = await generateMockPersonalizedMessage(percentage, percentile, sectionScores);

  // Mock test date (recent)
  const testDate = now - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000); // Within last week
  const testDurationMinutes = 90 + Math.floor(Math.random() * 30); // 90-120 minutes

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const month = monthNames[new Date(testDate).getMonth()];
  const year = new Date(testDate).getFullYear();

  const certificate: Certificate = {
    id: certificateId,
    userId: adminUserId,
    certificateType: 'live_session',
    sessionId: 'mock_session_' + crypto.randomBytes(4).toString('hex'),
    studentName: 'Estudiante Demo',
    certificateCode,
    testName: `Ensayo PAES Matemáticas M2 - ${month} ${year}`,
    testDate,
    testDurationMinutes,
    totalQuestions,
    totalScore,
    maxScore: totalQuestions,
    percentage: Math.round(percentage * 100) / 100,
    percentile,
    sectionScores,
    correctCount,
    incorrectCount,
    omittedCount,
    badges,
    personalizedMessage,
    chartsData,
    issuedAt: now,
    verificationUrl: `${process.env.FRONTEND_URL || 'https://app.example.com'}/verify/${certificateCode}`,
    viewCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  return certificate;
}

/**
 * Save mock certificate to database
 */
export async function saveMockCertificate(certificate: Certificate): Promise<void> {
  const { pool } = require('../config/database');

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
  `;

  await pool.query(insertQuery, [
    certificate.id,
    certificate.userId,
    certificate.certificateType,
    certificate.sessionId,
    certificate.studentName,
    certificate.studentPhotoUrl || null,
    certificate.certificateCode,
    certificate.testName,
    certificate.testDate,
    certificate.testDurationMinutes,
    certificate.totalQuestions,
    certificate.totalScore,
    certificate.maxScore,
    certificate.percentage,
    certificate.percentile,
    JSON.stringify(certificate.sectionScores),
    certificate.correctCount,
    certificate.incorrectCount,
    certificate.omittedCount,
    JSON.stringify(certificate.badges),
    certificate.personalizedMessage,
    JSON.stringify(certificate.chartsData),
    certificate.issuedAt,
    certificate.verificationUrl,
    certificate.viewCount,
    certificate.createdAt,
    certificate.updatedAt,
  ]);
}
