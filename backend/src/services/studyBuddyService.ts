/**
 * Study Buddy Service
 * Provides personalized, conversational AI companion for students
 * Analyzes progress, identifies focus areas, and maintains encouraging dialogue
 */

interface UserData {
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

🎯 MODOS DE PRÁCTICA:
1. "Zen Mode" - Práctica ilimitada sin presión de tiempo, con acceso al AI Tutor en cada pregunta
2. "Rapid Fire" - Desafíos cronometrados (10 min, 5-12 preguntas) con niveles: easy, medium, hard, extreme
3. "Live Sessions" - Ensayos PAES en tiempo real con otros estudiantes (competitivo)

📊 4 ÁREAS PRINCIPALES:
- Números: fracciones, porcentajes, potencias, proporciones
- Álgebra: ecuaciones, funciones, sistemas, factorización
- Geometría: área, perímetro, volumen, teorema de Pitágoras
- Probabilidad: estadística, media, mediana, combinaciones

✨ FUNCIONALIDADES CLAVE:
- Sistema de rachas: práctica diaria para mantener racha activa
- Currículo completo con documentación LaTeX profesional
- Seguimiento de progreso por tema y habilidad
- AI Tutor disponible en cada pregunta (metodología socrática)

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

IMPORTANTE - SUGERENCIAS CONCRETAS:
- Si necesitan practicar sin presión: sugiere "Zen Mode en [tema]"
- Si quieren desafío rápido: sugiere "Rapid Fire [nivel] de 10 minutos"
- Si tienen racha débil: motiva a hacer "una sesión corta hoy para mantener la racha"
- Si dominan un tema: sugiere "explorar el curriculum de [tema avanzado]"
- Si tienen Live Session próxima: menciona "registrarte para el próximo ensayo"
- Sé específico: "10 preguntas de Geometría en Zen Mode" en lugar de "practica geometría"

EJEMPLOS DE BUENOS "encouragement":
- "Te propongo 10 preguntas de Álgebra en Zen Mode. Así refuerzas ecuaciones sin presión de tiempo. Si te atoras, el AI Tutor está ahí para ayudarte paso a paso."
- "¿Qué tal un Rapid Fire medium hoy? 8 preguntas en 10 minutos, mezcla de todos los temas. Perfecto para mantener tu racha y ver tu mejora."
- "Tu racha de 5 días es sólida 🔥 Sigamos así con una sesión corta: 5 preguntas de Números en Zen Mode para empezar el día."

Mantén cada campo conciso. El tono debe sentirse conversacional, no como un reporte.`;

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
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        system: systemPrompt,
        temperature: 0.8, // More creative/varied responses
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = await response.json() as { content: Array<{ text: string } > };
    const rawResponse = data.content[0].text;

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
Esta plataforma ofrece práctica de matemáticas con:

📚 NIVELES: M1 (básico: números, álgebra, geometría, probabilidad) y M2 (avanzado)

🎯 MODOS DE PRÁCTICA:
- "Zen Mode": Práctica ilimitada sin presión de tiempo, con AI Tutor disponible en cada pregunta
- "Rapid Fire": Desafíos cronometrados (10 min) en 4 niveles: easy (5 preguntas), medium (8), hard (10), extreme (12)
- "Live Sessions": Ensayos PAES en vivo con otros estudiantes (competitivo)

📊 4 ÁREAS: Números, Álgebra, Geometría, Probabilidad

✨ FUNCIONALIDADES:
- Sistema de rachas (práctica diaria)
- Currículo completo con docs LaTeX
- Seguimiento de progreso por tema
- AI Tutor (metodología socrática) disponible en cada pregunta

Información del estudiante (${userData.displayName}):
- Racha actual: ${userData.currentStreak} días
- Racha más larga: ${userData.longestStreak} días
- Precisión general: ${progressData.overallAccuracy?.toFixed(0) || 'N/A'}%
- Fortalezas: ${analysis.strengths.join(', ') || 'Aún recopilando datos'}
- Áreas de mejora: ${analysis.weaknesses.join(', ') || 'Ninguna identificada aún'}
- Tendencias: ${analysis.trends.join(', ') || 'Aún no hay suficientes datos'}

Tu rol en esta conversación:
1. Responde de forma conversacional y cercana
2. Da sugerencias CONCRETAS usando las funcionalidades reales de la app
3. Mantén respuestas concisas (2-4 líneas máximo)
4. Si preguntan qué practicar: sugiere modo específico + tema + cantidad
   Ejemplo: "Te recomiendo 10 preguntas de Álgebra en Zen Mode para reforzar ecuaciones"
5. Si piden motivación: usa logros reales + siguiente paso concreto
6. Si preguntan por estrategias: consejos accionables con la app
7. Mantén el tono optimista pero realista

SUGERENCIAS ESPECÍFICAS:
- Para practicar sin presión → "Zen Mode en [tema]"
- Para desafío rápido → "Rapid Fire [nivel]" (easy/medium/hard/extreme)
- Para mantener racha → "una sesión corta hoy"
- Para profundizar → "explorar el curriculum de [tema]"
- Para competir → "registrarte para el próximo ensayo en vivo"

Estilo:
- Usa emojis ocasionalmente pero no en exceso
- Trata de "tú", como un amigo cercano
- Lenguaje chileno natural pero educado
- Sé empático y genuino`;

  const conversationMessages: Array<{role: string; content: string}> = [
    ...messages.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage }
  ];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 500,
        messages: conversationMessages,
        system: systemPrompt,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    const aiResponse = data.content[0].text;

    return {
      response: aiResponse,
      success: true,
    };
  } catch (error) {
    console.error('Error in study buddy chat:', error);
    throw error;
  }
}
