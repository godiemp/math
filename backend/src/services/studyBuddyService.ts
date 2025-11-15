/**
 * Study Buddy Service
 * Provides personalized, conversational AI companion for students
 * Analyzes progress, identifies focus areas, and maintains encouraging dialogue
 */

import Anthropic from '@anthropic-ai/sdk';
import { pool } from '../config/database';

interface UserData {
  userId?: string; // Optional for backwards compatibility, required for database tools
  displayName: string;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
}

interface ProgressData {
  recentSessions?: Array<{
    date: string;
    score: number;
    topic: string;
    questionsAnswered: number;
  }>;
  skillProgress?: Record<string, {
    attempts: number;
    correct: number;
    accuracy: number;
  }>;
  topicAccuracy?: Record<string, {
    total: number;
    correct: number;
    accuracy: number;
  }>;
  totalQuestionsAnswered?: number;
  overallAccuracy?: number;
}

interface GreetingOptions {
  userData: UserData;
  progressData: ProgressData;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

interface GreetingResponse {
  greeting: string;
  insights: string[];
  focusAreas: string[];
  encouragement: string;
  conversationStarter: string;
  success: boolean;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ContinueChatOptions {
  userData: UserData;
  progressData: ProgressData;
  messages: ChatMessage[];
  userMessage: string;
}

interface ChatResponse {
  response: string;
  success: boolean;
}

/**
 * Analyze user progress and generate insights
 */
function analyzeProgress(progressData: ProgressData): {
  strengths: string[];
  weaknesses: string[];
  trends: string[];
} {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const trends: string[] = [];

  // Analyze topic accuracy
  if (progressData.topicAccuracy) {
    const topics = Object.entries(progressData.topicAccuracy);
    topics.forEach(([topic, stats]) => {
      if (stats.total >= 5) { // Only consider topics with enough data
        if (stats.accuracy >= 80) {
          strengths.push(`${topic} (${stats.accuracy.toFixed(0)}% de precisión)`);
        } else if (stats.accuracy < 60) {
          weaknesses.push(`${topic} (${stats.accuracy.toFixed(0)}% de precisión)`);
        }
      }
    });
  }

  // Analyze recent session trends
  if (progressData.recentSessions && progressData.recentSessions.length >= 2) {
    const sessions = progressData.recentSessions;
    const recentAvg = sessions.slice(-3).reduce((sum, s) => sum + s.score, 0) / Math.min(3, sessions.length);
    const olderAvg = sessions.slice(0, -3).reduce((sum, s) => sum + s.score, 0) / Math.max(1, sessions.length - 3);

    if (recentAvg > olderAvg + 10) {
      trends.push(`Mejorando (+${(recentAvg - olderAvg).toFixed(0)}% últimas sesiones)`);
    } else if (recentAvg < olderAvg - 10) {
      trends.push(`Necesita repaso (${(olderAvg - recentAvg).toFixed(0)}% menos últimas sesiones)`);
    }
  }

  // Analyze skill progress
  if (progressData.skillProgress) {
    const skills = Object.entries(progressData.skillProgress);
    const strugglingSkills = skills.filter(([_, stats]) =>
      stats.attempts >= 3 && stats.accuracy < 60
    );

    if (strugglingSkills.length > 0) {
      weaknesses.push(...strugglingSkills.slice(0, 2).map(([skill, stats]) =>
        `${skill} (${stats.accuracy.toFixed(0)}%)`
      ));
    }
  }

  return { strengths, weaknesses, trends };
}

/**
 * Tool Definitions for Study Buddy
 */
const STUDY_BUDDY_TOOLS: Anthropic.Tool[] = [
  {
    name: "get_skill_details",
    description: "Get detailed performance data for specific math skills. Use this when the student asks about their performance in specific topics or skills.",
    input_schema: {
      type: "object",
      properties: {
        skill_name: {
          type: "string",
          description: "The name of the skill to get details for (e.g., 'Ecuaciones lineales', 'Fracciones')"
        }
      },
      required: ["skill_name"]
    }
  },
  {
    name: "generate_study_plan",
    description: "Generate a personalized study plan based on the student's weaknesses and goals. Use this when the student asks for a study plan, schedule, or wants to know what to focus on.",
    input_schema: {
      type: "object",
      properties: {
        days: {
          type: "number",
          description: "Number of days for the study plan (e.g., 7, 14, 30)"
        },
        focus_areas: {
          type: "array",
          items: { type: "string" },
          description: "Specific topics to focus on (e.g., ['Álgebra', 'Geometría'])"
        },
        minutes_per_day: {
          type: "number",
          description: "Target minutes per day for practice (e.g., 30, 60)"
        }
      },
      required: ["days", "minutes_per_day"]
    }
  },
  {
    name: "get_practice_recommendations",
    description: "Get specific practice recommendations based on current performance. Use this when the student asks what mode to practice in or what they should work on next.",
    input_schema: {
      type: "object",
      properties: {
        goal: {
          type: "string",
          enum: ["improve_weak_areas", "maintain_streak", "challenge_mode", "exam_simulation"],
          description: "The student's goal for this practice session"
        }
      },
      required: ["goal"]
    }
  },
  {
    name: "analyze_topic_performance",
    description: "Analyze performance in a specific topic area (Números, Álgebra, Geometría, Probabilidad). Use this when the student asks about their performance in a specific subject area.",
    input_schema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          enum: ["Números", "Álgebra", "Geometría", "Probabilidad"],
          description: "The topic to analyze"
        }
      },
      required: ["topic"]
    }
  },
  {
    name: "calculate_improvement_metrics",
    description: "Calculate detailed improvement metrics over time. Use this when the student asks about their progress, improvement, or how they're doing compared to before.",
    input_schema: {
      type: "object",
      properties: {
        timeframe: {
          type: "string",
          enum: ["week", "month", "all_time"],
          description: "Timeframe to calculate metrics for"
        }
      },
      required: ["timeframe"]
    }
  },
  {
    name: "get_streak_insights",
    description: "Get detailed insights about study streak and consistency. Use this when the student asks about their streak, consistency, or daily practice habits.",
    input_schema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "get_recent_questions",
    description: "Get details about recently answered questions including the actual questions, user's answers, and whether they got them right or wrong. Use this when the student asks about recent questions, wants to review mistakes, or asks what they got wrong.",
    input_schema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of recent questions to retrieve (default: 10, max: 50)"
        },
        filter: {
          type: "string",
          enum: ["all", "correct", "incorrect"],
          description: "Filter by correctness: 'all' for all questions, 'correct' for only correct answers, 'incorrect' for only mistakes"
        },
        subject: {
          type: "string",
          enum: ["números", "álgebra", "geometría", "probabilidad"],
          description: "Filter by specific subject/topic (optional)"
        }
      },
      required: []
    }
  }
];

/**
 * Tool execution functions
 */
function executeGetSkillDetails(skillName: string, progressData: ProgressData): string {
  if (!progressData.skillProgress) {
    return "No hay datos de habilidades disponibles aún.";
  }

  const skill = progressData.skillProgress[skillName];
  if (!skill) {
    return `No se encontraron datos para la habilidad "${skillName}". Intenta con otro nombre de habilidad.`;
  }

  return JSON.stringify({
    skill: skillName,
    attempts: skill.attempts,
    correct: skill.correct,
    accuracy: `${skill.accuracy.toFixed(1)}%`,
    status: skill.accuracy >= 80 ? "Excelente" : skill.accuracy >= 60 ? "En progreso" : "Necesita práctica"
  });
}

function executeGenerateStudyPlan(
  days: number,
  minutesPerDay: number,
  focusAreas: string[] | undefined,
  progressData: ProgressData
): string {
  const analysis = analyzeProgress(progressData);
  const areasToFocus = focusAreas || analysis.weaknesses.map(w => w.split('(')[0].trim());

  const plan = {
    duration: `${days} días`,
    daily_time: `${minutesPerDay} minutos`,
    focus_areas: areasToFocus.length > 0 ? areasToFocus : ["Números", "Álgebra"],
    weekly_structure: {
      "Días 1-3": "Zen Mode en áreas débiles (sin presión, con AI Tutor)",
      "Días 4-5": "Rapid Fire Easy/Medium para ganar velocidad",
      "Día 6": "Rapid Fire Hard para simular presión",
      "Día 7": "Repaso general en Zen Mode"
    },
    daily_goal: minutesPerDay >= 60
      ? "2 sesiones: una Zen Mode (30 min) + una Rapid Fire (10 min)"
      : "1 sesión de práctica enfocada",
    streak_tip: "Mantén tu racha con al menos 5 preguntas diarias 🔥"
  };

  return JSON.stringify(plan);
}

function executeGetPracticeRecommendations(
  goal: string,
  progressData: ProgressData,
  analysis: { strengths: string[]; weaknesses: string[]; trends: string[] }
): string {
  const accuracy = progressData.overallAccuracy || 0;

  let recommendation: any = {
    goal: goal,
    current_accuracy: `${accuracy.toFixed(1)}%`
  };

  switch (goal) {
    case "improve_weak_areas":
      recommendation.mode = "Zen Mode";
      recommendation.focus = analysis.weaknesses.length > 0
        ? analysis.weaknesses[0].split('(')[0].trim()
        : "Álgebra";
      recommendation.questions = 10;
      recommendation.why = "Tiempo ilimitado + AI Tutor disponible para reforzar conceptos";
      break;

    case "maintain_streak":
      recommendation.mode = "Rapid Fire Easy";
      recommendation.questions = 5;
      recommendation.time = "10 minutos";
      recommendation.why = "Rápido, puede pausar, perfecto para mantener racha diaria";
      break;

    case "challenge_mode":
      recommendation.mode = accuracy > 85 ? "Rapid Fire Extreme" : accuracy > 75 ? "Rapid Fire Hard" : "Rapid Fire Medium";
      recommendation.questions = accuracy > 85 ? 12 : accuracy > 75 ? 10 : 8;
      recommendation.difficulty = accuracy > 85 ? "Máximo (1 error máx)" : accuracy > 75 ? "Alto (2 errores máx)" : "Medio";
      recommendation.why = "Desafío según tu nivel actual";
      break;

    case "exam_simulation":
      recommendation.mode = accuracy > 70 ? "Live Session" : "Rapid Fire Hard";
      recommendation.why = accuracy > 70
        ? "Ensayo completo de 2h 20min con otros estudiantes"
        : "Primero mejora con Rapid Fire Hard, luego Live Sessions";
      break;
  }

  return JSON.stringify(recommendation);
}

function executeAnalyzeTopicPerformance(topic: string, progressData: ProgressData): string {
  if (!progressData.topicAccuracy) {
    return "No hay datos de temas disponibles aún.";
  }

  const topicData = progressData.topicAccuracy[topic];
  if (!topicData) {
    return `No se encontraron datos para el tema "${topic}".`;
  }

  const analysis = {
    topic: topic,
    total_questions: topicData.total,
    correct_answers: topicData.correct,
    accuracy: `${topicData.accuracy.toFixed(1)}%`,
    status: topicData.accuracy >= 80 ? "🔥 Excelente" :
            topicData.accuracy >= 70 ? "📈 Bien" :
            topicData.accuracy >= 60 ? "⚠️ Necesita mejora" :
            "❗ Requiere práctica urgente",
    recommendation: topicData.accuracy < 70
      ? `Practica 10 preguntas de ${topic} en Zen Mode con AI Tutor`
      : `Mantén nivel con Rapid Fire Medium de ${topic}`
  };

  return JSON.stringify(analysis);
}

function executeCalculateImprovementMetrics(
  timeframe: string,
  progressData: ProgressData
): string {
  const sessions = progressData.recentSessions || [];

  let relevantSessions: typeof sessions = [];
  const now = Date.now();

  switch (timeframe) {
    case "week":
      relevantSessions = sessions.filter(s =>
        (now - new Date(s.date).getTime()) <= 7 * 24 * 60 * 60 * 1000
      );
      break;
    case "month":
      relevantSessions = sessions.filter(s =>
        (now - new Date(s.date).getTime()) <= 30 * 24 * 60 * 60 * 1000
      );
      break;
    default:
      relevantSessions = sessions;
  }

  if (relevantSessions.length === 0) {
    return "No hay datos suficientes para este período.";
  }

  const avgScore = relevantSessions.reduce((sum, s) => sum + s.score, 0) / relevantSessions.length;
  const totalQuestions = relevantSessions.reduce((sum, s) => sum + s.questionsAnswered, 0);
  const firstScore = relevantSessions[0]?.score || 0;
  const lastScore = relevantSessions[relevantSessions.length - 1]?.score || 0;
  const improvement = lastScore - firstScore;

  const metrics = {
    timeframe: timeframe === "week" ? "Última semana" : timeframe === "month" ? "Último mes" : "Todo el tiempo",
    sessions_completed: relevantSessions.length,
    total_questions: totalQuestions,
    average_score: `${avgScore.toFixed(1)}%`,
    improvement: improvement > 0
      ? `+${improvement.toFixed(1)}% 📈`
      : improvement < 0
      ? `${improvement.toFixed(1)}% 📉`
      : "Sin cambios",
    trend: improvement > 5 ? "Mejorando consistentemente 🔥" :
           improvement < -5 ? "Necesita más práctica" :
           "Rendimiento estable"
  };

  return JSON.stringify(metrics);
}

function executeGetStreakInsights(userData: UserData): string {
  const insights = {
    current_streak: userData.currentStreak,
    longest_streak: userData.longestStreak,
    status: userData.currentStreak === 0
      ? "Sin racha activa - ¡Empieza hoy! 💪"
      : userData.currentStreak >= userData.longestStreak
      ? "🔥 ¡En tu mejor racha personal!"
      : `A ${userData.longestStreak - userData.currentStreak} días de tu mejor racha`,
    motivation: userData.currentStreak >= 7
      ? "¡Racha de una semana completa! Eres consistente 🌟"
      : userData.currentStreak >= 3
      ? "¡3 días seguidos! Sigue así 🚀"
      : userData.currentStreak >= 1
      ? "¡Buen comienzo! Practica mañana para día 2 ✨"
      : "Empieza con solo 5 preguntas en Zen Mode hoy 🎯",
    next_milestone: userData.currentStreak < 3 ? "3 días" :
                    userData.currentStreak < 7 ? "7 días" :
                    userData.currentStreak < 14 ? "14 días" :
                    userData.currentStreak < 30 ? "30 días" : "¡Sigue así!"
  };

  return JSON.stringify(insights);
}

async function executeGetRecentQuestions(
  limit: number = 10,
  filter: string = "all",
  subject: string | undefined,
  userData: UserData
): Promise<string> {
  if (!userData.userId) {
    return "Error: No se pudo identificar al usuario para obtener preguntas recientes.";
  }

  try {
    // Build query
    let query = `
      SELECT
        qa.question_id,
        qa.subject,
        qa.difficulty,
        qa.user_answer,
        qa.correct_answer,
        qa.is_correct,
        qa.quiz_mode,
        qa.time_spent_seconds,
        qa.attempted_at,
        q.question_latex as question_text,
        q.options,
        q.explanation
      FROM question_attempts qa
      LEFT JOIN questions q ON qa.question_id = q.id
      WHERE qa.user_id = $1
    `;

    const params: any[] = [userData.userId];
    let paramIndex = 2;

    // Add filter for correct/incorrect
    if (filter === "correct") {
      query += ` AND qa.is_correct = true`;
    } else if (filter === "incorrect") {
      query += ` AND qa.is_correct = false`;
    }

    // Add subject filter
    if (subject) {
      query += ` AND qa.subject = $${paramIndex}`;
      params.push(subject);
      paramIndex++;
    }

    // Order by most recent and limit
    const safeLimit = Math.min(Math.max(1, limit), 50); // Between 1 and 50
    query += ` ORDER BY qa.attempted_at DESC LIMIT $${paramIndex}`;
    params.push(safeLimit);

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return JSON.stringify({
        message: "No se encontraron preguntas con los filtros especificados.",
        count: 0,
        questions: []
      });
    }

    // Format questions for AI
    const questions = result.rows.map((row, index) => ({
      number: index + 1,
      subject: row.subject,
      difficulty: row.difficulty,
      question: row.question_text || "Pregunta no disponible",
      options: row.options || [],
      user_answer: row.user_answer,
      correct_answer: row.correct_answer,
      is_correct: row.is_correct,
      explanation: row.explanation || "No disponible",
      quiz_mode: row.quiz_mode,
      time_spent: row.time_spent_seconds ? `${row.time_spent_seconds}s` : "N/A",
      date: new Date(row.attempted_at).toLocaleDateString('es-CL')
    }));

    const summary = {
      total_questions: result.rows.length,
      correct: result.rows.filter(r => r.is_correct).length,
      incorrect: result.rows.filter(r => !r.is_correct).length,
      accuracy: ((result.rows.filter(r => r.is_correct).length / result.rows.length) * 100).toFixed(1) + "%",
      filter_applied: filter,
      subject_filter: subject || "todas las materias"
    };

    return JSON.stringify({
      summary,
      questions: questions.slice(0, 5) // Only return first 5 with full details to avoid token overflow
    });
  } catch (error) {
    console.error('Error fetching recent questions:', error);
    return `Error al obtener preguntas recientes: ${error instanceof Error ? error.message : 'Error desconocido'}`;
  }
}

/**
 * Execute a tool call
 */
async function executeTool(
  toolName: string,
  toolInput: any,
  userData: UserData,
  progressData: ProgressData
): Promise<string> {
  try {
    switch (toolName) {
      case "get_skill_details":
        return executeGetSkillDetails(toolInput.skill_name, progressData);

      case "generate_study_plan":
        return executeGenerateStudyPlan(
          toolInput.days,
          toolInput.minutes_per_day,
          toolInput.focus_areas,
          progressData
        );

      case "get_practice_recommendations":
        const analysis = analyzeProgress(progressData);
        return executeGetPracticeRecommendations(toolInput.goal, progressData, analysis);

      case "analyze_topic_performance":
        return executeAnalyzeTopicPerformance(toolInput.topic, progressData);

      case "calculate_improvement_metrics":
        return executeCalculateImprovementMetrics(toolInput.timeframe, progressData);

      case "get_streak_insights":
        return executeGetStreakInsights(userData);

      case "get_recent_questions":
        return await executeGetRecentQuestions(
          toolInput.limit,
          toolInput.filter,
          toolInput.subject,
          userData
        );

      default:
        return `Error: Unknown tool "${toolName}"`;
    }
  } catch (error) {
    console.error(`Error executing tool ${toolName}:`, error);
    return `Error ejecutando herramienta: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

/**
 * Generate personalized greeting with progress insights
 */
export async function generateGreeting(options: GreetingOptions): Promise<GreetingResponse> {
  const { userData, progressData, timeOfDay } = options;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  // Analyze progress
  const analysis = analyzeProgress(progressData);

  // Calculate days since last practice
  const daysSinceLastPractice = userData.lastPracticeDate
    ? Math.floor((Date.now() - new Date(userData.lastPracticeDate).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Build context for Claude
  const greetingMap = {
    morning: '¡Buenos días',
    afternoon: '¡Buenas tardes',
    evening: '¡Buenas tardes',
    night: '¡Buenas noches'
  };

  const contextData = {
    name: userData.displayName,
    streak: userData.currentStreak,
    longestStreak: userData.longestStreak,
    daysSinceLastPractice,
    totalQuestions: progressData.totalQuestionsAnswered || 0,
    overallAccuracy: progressData.overallAccuracy || 0,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    trends: analysis.trends,
    recentSessions: progressData.recentSessions?.slice(-3) || []
  };

  const systemPrompt = `Eres "Compañero de Estudio", un tutor de IA amigable y motivador para estudiantes chilenos que preparan la PAES Matemática.

CONTEXTO DE LA APLICACIÓN PAES CHILE:
Esta plataforma ofrece práctica de matemáticas con las siguientes funcionalidades:

📚 NIVELES DISPONIBLES:
- M1 (Matemática Básica): Números, Álgebra básica, Geometría, Probabilidad
- M2 (Matemática Avanzada): Contenidos avanzados para carreras científicas

🎯 MODOS DE PRÁCTICA DETALLADOS:

1. **ZEN MODE** (Práctica sin presión):
   - Tiempo ilimitado, sin cronómetro
   - Número de preguntas: el estudiante elige (típicamente 5-10)
   - AI Tutor disponible en CADA pregunta (metodología socrática)
   - Feedback inmediato al responder
   - Ideal para: aprender conceptos nuevos, reforzar debilidades

2. **RAPID FIRE** (Desafíos cronometrados - todos 10 minutos):

   • EASY: 5 preguntas, PUEDE PAUSAR, sin límite de errores, 60% para pasar
   → Para principiantes o ganar confianza

   • MEDIUM: 8 preguntas, NO puede pausar, sin límite de errores, 70% para pasar
   → Para práctica regular, mejorar velocidad

   • HARD: 10 preguntas, NO pausa, VIDAS (máx 2 errores), 75% para pasar
   → Para estudiantes avanzados, simular presión de examen

   • EXTREME: 12 preguntas, NO pausa, VIDAS (máx 1 error), 80% para pasar, +5 seg por acierto
   → Para perfeccionistas, universidad top, máximo desafío

3. **LIVE SESSIONS** (Ensayos competitivos):
   - Ensayos PAES oficiales en tiempo real (2h 20min)
   - 60-65 preguntas (M1) o 50 (M2)
   - Compites con otros estudiantes, leaderboard en vivo
   - Lobby abre 15 min antes

📊 4 ÁREAS PRINCIPALES:
- Números: fracciones, porcentajes, potencias, proporciones, divisibilidad
- Álgebra: ecuaciones, funciones, sistemas, factorización, cuadráticas
- Geometría: área, perímetro, volumen, teorema de Pitágoras, coordenadas
- Probabilidad: estadística, media, mediana, moda, combinaciones

✨ OTRAS FUNCIONALIDADES:
- Sistema de rachas: práctica diaria
- Currículo: documentación LaTeX con teoría
- Seguimiento: estadísticas por tema y 500+ skills
- AI Tutor: metodología socrática (guía sin dar respuestas directas)

Tu personalidad:
- Cálido, cercano y alentador (usa emojis con moderación: 🎯 🔥 📈 💪 ✨)
- Celebras logros genuinamente, pero sin exagerar
- Identificas áreas de mejora con tacto y optimismo
- Das sugerencias CONCRETAS basadas en las funcionalidades reales de la app
- Usas lenguaje chileno natural pero profesional

Tu tarea es generar un saludo personalizado que:
1. Saluda al estudiante por su nombre
2. Comenta brevemente sobre su progreso reciente o racha
3. Identifica 1-2 insights clave (fortalezas o áreas de mejora)
4. Sugiere un plan de acción ESPECÍFICO usando las funcionalidades de la app
5. Termina con una pregunta abierta que invita a conversar

Formato de respuesta (JSON):
{
  "greeting": "Saludo inicial con nombre (1 línea)",
  "insights": ["Insight sobre fortaleza", "Insight sobre área de mejora"],
  "focusAreas": ["Tema o habilidad específica", "Tema alternativo"],
  "encouragement": "Mensaje motivacional con sugerencia concreta de acción (2-3 líneas, menciona modo de práctica específico)",
  "conversationStarter": "Pregunta abierta que invita al diálogo"
}

IMPORTANTE - SUGERENCIAS SEGÚN SITUACIÓN:

Para PRINCIPIANTES (<60% precisión) o baja confianza:
→ "Zen Mode de [tema débil]" o "Rapid Fire Easy (puedes pausar si necesitas)"

Para PRÁCTICA REGULAR (60-75% precisión):
→ "Rapid Fire Medium" o "10 preguntas en Zen Mode"

Para AVANZADOS (>75% precisión):
→ "Rapid Fire Hard (cuidado, máx 2 errores)" o "Live Sessions"

Para PERFECCIONISTAS (>85% precisión):
→ "Rapid Fire Extreme (1 error máx, +5 seg por acierto)" o "Live Sessions completas"

Para MANTENER RACHA:
→ "5 preguntas en Zen Mode" o "Rapid Fire Easy rápido"

Para REFORZAR DEBILIDADES:
→ "10 preguntas de [tema] en Zen Mode con AI Tutor"

Para SIMULAR EXAMEN REAL:
→ "Live Session" o "Rapid Fire Hard/Extreme"

EJEMPLOS DE BUENOS "encouragement":
- "Te propongo 10 preguntas de Álgebra en Zen Mode. Refuerzas ecuaciones sin presión, y el AI Tutor te guía si te atoras."
- "¿Qué tal Rapid Fire Medium? 8 preguntas en 10 minutos. No puedes pausar, pero sin límite de errores. Perfecto para mejorar velocidad."
- "Tu racha de 5 días es sólida 🔥 Sigamos con Rapid Fire Easy: 5 preguntas, puedes pausar. Ideal para empezar."
- "Estás listo para más desafío. Prueba Rapid Fire Hard: 10 preguntas con sistema de vidas (máx 2 errores). Así simulas presión real."

Mantén cada campo conciso. Tono conversacional, no reporte.`;

  const userPrompt = `Genera un saludo personalizado para:

Hora del día: ${timeOfDay}
Datos del estudiante:
${JSON.stringify(contextData, null, 2)}

Contexto adicional:
- Si la racha es 0 o no hay práctica reciente: Motiva a empezar sin mencionar el fallo
- Si hay racha activa: Celébrala y motiva a continuar
- Si hay fortalezas: Reconócelas y sugiere avanzar
- Si hay debilidades: Menciónalas constructivamente y sugiere práctica específica
- Si hay tendencia de mejora: Celébrala con datos específicos

Responde SOLO con el JSON, sin markdown ni texto adicional.`;

  try {
    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Make API call with tool support
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
      temperature: 0.8,
      tools: STUDY_BUDDY_TOOLS,
    });

    // Handle tool use
    while (response.stop_reason === 'tool_use') {
      const toolUseBlock = response.content.find(block => block.type === 'tool_use') as Anthropic.ToolUseBlock;

      if (!toolUseBlock) break;

      // Execute the tool
      const toolResult = await executeTool(
        toolUseBlock.name,
        toolUseBlock.input,
        userData,
        progressData
      );

      // Continue conversation with tool result
      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
          {
            role: 'assistant',
            content: response.content,
          },
          {
            role: 'user',
            content: [
              {
                type: 'tool_result',
                tool_use_id: toolUseBlock.id,
                content: toolResult,
              },
            ],
          },
        ],
        system: systemPrompt,
        temperature: 0.8,
        tools: STUDY_BUDDY_TOOLS,
      });
    }

    // Extract text response
    const textBlock = response.content.find(block => block.type === 'text') as Anthropic.TextBlock;
    if (!textBlock) {
      throw new Error('No text response from AI');
    }

    const rawResponse = textBlock.text;

    // Parse JSON response
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    return {
      greeting: parsedResponse.greeting,
      insights: parsedResponse.insights || [],
      focusAreas: parsedResponse.focusAreas || [],
      encouragement: parsedResponse.encouragement,
      conversationStarter: parsedResponse.conversationStarter,
      success: true,
    };
  } catch (error) {
    console.error('Error generating greeting:', error);

    // Fallback response
    return {
      greeting: `${greetingMap[timeOfDay]} ${userData.displayName}! 👋`,
      insights: ['Estoy aquí para ayudarte en tu preparación PAES Matemática'],
      focusAreas: ['Números', 'Álgebra'],
      encouragement: 'Te propongo empezar con 10 preguntas en Zen Mode. Elige el tema que prefieras y practica sin presión. El AI Tutor está disponible si necesitas ayuda. 🎯',
      conversationStarter: '¿Prefieres empezar con un desafío rápido en Rapid Fire o practicar tranquilo en Zen Mode?',
      success: true,
    };
  }
}

/**
 * Continue conversation with study buddy
 */
export async function continueChat(options: ContinueChatOptions): Promise<ChatResponse> {
  const { userData, progressData, messages, userMessage } = options;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  // Analyze progress for context
  const analysis = analyzeProgress(progressData);

  const systemPrompt = `Eres "Compañero de Estudio", un tutor de IA amigable y motivador para estudiantes chilenos que preparan la PAES Matemática.

CONTEXTO DE LA APLICACIÓN PAES CHILE:

📚 NIVELES: M1 (básico) y M2 (avanzado)

🎯 MODOS DE PRÁCTICA:

1. ZEN MODE (sin presión):
   - Tiempo ilimitado, sin cronómetro
   - Número de preguntas: el estudiante elige
   - AI Tutor disponible en cada pregunta
   - Ideal para: aprender, reforzar debilidades

2. RAPID FIRE (cronometrados - todos 10 min):
   • EASY: 5 preguntas, PUEDE PAUSAR, sin límite errores, 60% para pasar
   • MEDIUM: 8 preguntas, NO pausa, sin límite errores, 70% para pasar
   • HARD: 10 preguntas, NO pausa, VIDAS (máx 2 errores), 75% para pasar
   • EXTREME: 12 preguntas, NO pausa, VIDAS (máx 1 error), 80% para pasar, +5 seg/acierto

3. LIVE SESSIONS: Ensayos completos 2h 20min, competitivo con otros

📊 4 ÁREAS: Números, Álgebra, Geometría, Probabilidad

Información del estudiante (${userData.displayName}):
- Racha: ${userData.currentStreak} días (máx: ${userData.longestStreak})
- Precisión: ${progressData.overallAccuracy?.toFixed(0) || 'N/A'}%
- Fortalezas: ${analysis.strengths.join(', ') || 'Aún recopilando'}
- Áreas de mejora: ${analysis.weaknesses.join(', ') || 'Ninguna aún'}
- Tendencias: ${analysis.trends.join(', ') || 'Aún no hay datos'}

Tu rol:
1. Responde conversacional y cercano (2-4 líneas máx)
2. Da sugerencias CONCRETAS con modo específico + tema + cantidad
3. Si preguntan qué practicar: considera su precisión y situación
4. Si piden motivación: usa logros reales + paso concreto
5. Tono optimista pero realista

SUGERENCIAS SEGÚN NIVEL:
- <60% precisión → Zen Mode o Rapid Fire Easy (puede pausar)
- 60-75% → Rapid Fire Medium (8 preg, no pausa)
- >75% → Rapid Fire Hard (10 preg, máx 2 errores)
- >85% → Rapid Fire Extreme (12 preg, máx 1 error) o Live Sessions

Estilo: emojis moderados, trato de "tú", lenguaje chileno natural, empático`;

  const conversationMessages: Array<Anthropic.MessageParam> = [
    ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user' as const, content: userMessage }
  ];

  try {
    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Make API call with tool support
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1500,
      messages: conversationMessages,
      system: systemPrompt,
      temperature: 0.7,
      tools: STUDY_BUDDY_TOOLS,
    });

    // Handle tool use - keep track of conversation history
    const fullMessages = [...conversationMessages];

    while (response.stop_reason === 'tool_use') {
      const toolUseBlock = response.content.find(block => block.type === 'tool_use') as Anthropic.ToolUseBlock;

      if (!toolUseBlock) break;

      // Execute the tool
      const toolResult = await executeTool(
        toolUseBlock.name,
        toolUseBlock.input,
        userData,
        progressData
      );

      // Add assistant response and tool result to conversation
      fullMessages.push({
        role: 'assistant',
        content: response.content,
      });

      fullMessages.push({
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: toolUseBlock.id,
            content: toolResult,
          },
        ],
      });

      // Continue conversation with tool result
      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1500,
        messages: fullMessages,
        system: systemPrompt,
        temperature: 0.7,
        tools: STUDY_BUDDY_TOOLS,
      });
    }

    // Extract text response
    const textBlock = response.content.find(block => block.type === 'text') as Anthropic.TextBlock;
    if (!textBlock) {
      throw new Error('No text response from AI');
    }

    return {
      response: textBlock.text,
      success: true,
    };
  } catch (error) {
    console.error('Error in study buddy chat:', error);
    throw error;
  }
}
