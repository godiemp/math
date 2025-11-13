/**
 * Study Buddy Service - Main Export
 * Combines types, tools, and main functions
 */

// Re-export types and interfaces
export * from './studyBuddyService-types';

// Re-export tools
export * from './studyBuddyService-tools';

// Re-export main functions (will be created separately)
// export * from './studyBuddyService-main';

// Temporary inline exports until main file is created
import Anthropic from '@anthropic-ai/sdk';
import {
  UserData,
  ProgressData,
  GreetingOptions,
  GreetingResponse,
  ContinueChatOptions,
  ChatResponse,
  analyzeProgress
} from './studyBuddyService-types';
import { STUDY_BUDDY_TOOLS, executeTool } from './studyBuddyService-tools';

// Keep the main functions here for now to avoid template literal issues
export { generateGreeting, continueChat };

async function generateGreeting(options: GreetingOptions): Promise<GreetingResponse> {
  const { userData, progressData, timeOfDay } = options;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const analysis = analyzeProgress(progressData);
  const daysSinceLastPractice = userData.lastPracticeDate
    ? Math.floor((Date.now() - new Date(userData.lastPracticeDate).getTime()) / (1000 * 60 * 60 * 24))
    : null;

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
    const anthropic = new Anthropic({ apiKey });

    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1000,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
      temperature: 0.8,
      tools: STUDY_BUDDY_TOOLS,
    });

    while (response.stop_reason === 'tool_use') {
      const toolUseBlock = response.content.find(block => block.type === 'tool_use') as Anthropic.ToolUseBlock;
      if (!toolUseBlock) break;

      const toolResult = await executeTool(toolUseBlock.name, toolUseBlock.input, userData, progressData);

      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        messages: [
          { role: 'user', content: userPrompt },
          { role: 'assistant', content: response.content },
          { role: 'user', content: [{ type: 'tool_result', tool_use_id: toolUseBlock.id, content: toolResult }] },
        ],
        system: systemPrompt,
        temperature: 0.8,
        tools: STUDY_BUDDY_TOOLS,
      });
    }

    const textBlock = response.content.find(block => block.type === 'text') as Anthropic.TextBlock;
    if (!textBlock) throw new Error('No text response from AI');

    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Failed to parse AI response');

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

async function continueChat(options: ContinueChatOptions): Promise<ChatResponse> {
  const { userData, progressData, messages, userMessage } = options;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');

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
    const anthropic = new Anthropic({ apiKey });

    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1500,
      messages: conversationMessages,
      system: systemPrompt,
      temperature: 0.7,
      tools: STUDY_BUDDY_TOOLS,
    });

    const fullMessages = [...conversationMessages];

    while (response.stop_reason === 'tool_use') {
      const toolUseBlock = response.content.find(block => block.type === 'tool_use') as Anthropic.ToolUseBlock;
      if (!toolUseBlock) break;

      const toolResult = await executeTool(toolUseBlock.name, toolUseBlock.input, userData, progressData);

      fullMessages.push({ role: 'assistant', content: response.content });
      fullMessages.push({
        role: 'user',
        content: [{ type: 'tool_result', tool_use_id: toolUseBlock.id, content: toolResult }],
      });

      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1500,
        messages: fullMessages,
        system: systemPrompt,
        temperature: 0.7,
        tools: STUDY_BUDDY_TOOLS,
      });
    }

    const textBlock = response.content.find(block => block.type === 'text') as Anthropic.TextBlock;
    if (!textBlock) throw new Error('No text response from AI');

    return { response: textBlock.text, success: true };
  } catch (error) {
    console.error('Error in study buddy chat:', error);
    throw error;
  }
}
