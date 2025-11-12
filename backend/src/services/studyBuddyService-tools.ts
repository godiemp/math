/**
 * Study Buddy Service - Tools
 * Tool definitions and execution functions for AI assistant capabilities
 */

import Anthropic from '@anthropic-ai/sdk';
import { pool } from '../config/database';
import { UserData, ProgressData, analyzeProgress } from './studyBuddyService-types';

/**
 * Tool Definitions for Study Buddy
 */
export const STUDY_BUDDY_TOOLS: Anthropic.Tool[] = [
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
        q.question as question_text,
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
export async function executeTool(
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
