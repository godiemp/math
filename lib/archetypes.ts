/**
 * Student Archetypes for AI Study Buddy Testing
 * Generates realistic mock progress data for different learning personalities
 */

export type Archetype =
  | 'perseverant'
  | 'competitor'
  | 'curious-strategist'
  | 'autonomous-efficient'
  | 'resilient-rebuilder'
  | 'practical-doer'
  | 'social-collaborator'
  | 'digital-explorer';

export interface ArchetypeProfile {
  id: Archetype;
  name: string;
  description: string;
  coreTraits: string[];
  behaviors: string[];
  aiAdaptations: string[];
}

export const ARCHETYPES: Record<Archetype, ArchetypeProfile> = {
  'perseverant': {
    id: 'perseverant',
    name: 'El Perseverante',
    description: 'Constancia y esfuerzo sostenido en el tiempo',
    coreTraits: ['Consistente', 'Disciplinado', 'Valora el progreso visible'],
    behaviors: ['Estudia regularmente', 'Mantiene rachas largas', 'Mejora gradualmente'],
    aiAdaptations: ['Reforzar rachas', 'Mostrar gráficos de progreso', 'Premiar micro-logros']
  },
  'competitor': {
    id: 'competitor',
    name: 'El Competidor',
    description: 'Prospera con comparación y desafíos',
    coreTraits: ['Ambicioso', 'Orientado a resultados', 'Le gustan los rankings'],
    behaviors: ['Busca puntajes altos', 'Compite con otros', 'Se motiva con récords'],
    aiAdaptations: ['Usar rankings', 'Quizzes cronometrados', 'Mostrar récords personales']
  },
  'curious-strategist': {
    id: 'curious-strategist',
    name: 'El Estratega Curioso',
    description: 'Busca entendimiento profundo, no solo resultados',
    coreTraits: ['Analítico', 'Pregunta "por qué"', 'Explora contenido opcional'],
    behaviors: ['Revisa explicaciones detalladas', 'Hace muchas preguntas al AI', 'Estudia teoría'],
    aiAdaptations: ['Explicaciones profundas', 'Mapas conceptuales', 'Rutas exploratorias']
  },
  'autonomous-efficient': {
    id: 'autonomous-efficient',
    name: 'El Autónomo Eficiente',
    description: 'Autodidacta consciente del tiempo',
    coreTraits: ['Independiente', 'Eficiente', 'Autodisciplinado'],
    behaviors: ['Aprende solo', 'Salta redundancias', 'Establece sus propias metas'],
    aiAdaptations: ['Instrucción comprimida', 'Control de ritmo', 'Personalización de objetivos']
  },
  'resilient-rebuilder': {
    id: 'resilient-rebuilder',
    name: 'El Resiliente en Reconstrucción',
    description: 'Se recupera de baja confianza o retrocesos',
    coreTraits: ['Vulnerable', 'Necesita refuerzo', 'En proceso de mejora'],
    behaviors: ['Vacilante al principio', 'Responde a estímulo positivo', 'Mejora con confianza'],
    aiAdaptations: ['Feedback empático', 'Victorias tempranas', 'Refuerzos de confianza']
  },
  'practical-doer': {
    id: 'practical-doer',
    name: 'El Hacedor Práctico',
    description: 'Aprende mejor aplicando conocimiento',
    coreTraits: ['Práctico', 'Orientado a ejemplos', 'Aprende haciendo'],
    behaviors: ['Prefiere ejercicios', 'Busca problemas del mundo real', 'Práctica sobre teoría'],
    aiAdaptations: ['Ejercicios contextuales', 'Práctica basada en escenarios', 'Ejemplos aplicados']
  },
  'social-collaborator': {
    id: 'social-collaborator',
    name: 'El Colaborador Social',
    description: 'Aprende mediante interacción y discusión',
    coreTraits: ['Sociable', 'Aprende en grupo', 'Valora comunidad'],
    behaviors: ['Busca pares', 'Participa en sesiones live', 'Comparte progreso'],
    aiAdaptations: ['Desafíos grupales', 'Colaboración por chat', 'Explicaciones entre pares']
  },
  'digital-explorer': {
    id: 'digital-explorer',
    name: 'El Explorador Digital',
    description: 'Disfruta novedad, tecnología y experimentación',
    coreTraits: ['Curioso tecnológicamente', 'Busca novedad', 'Gamificación'],
    behaviors: ['Prueba nuevas herramientas', 'Experimenta con funciones', 'Le gustan los retos'],
    aiAdaptations: ['Medios variados', 'Desafíos adaptativos', 'Modos exploratorios']
  }
};

/**
 * Generate mock progress data for each archetype
 */
export function generateMockProgressData(archetype: Archetype, userName: string = 'María') {
  const today = new Date();
  const baseData = {
    displayName: userName,
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null as string | null,
  };

  const progressData = {
    recentSessions: [] as any[],
    topicAccuracy: {} as Record<string, { total: number; correct: number; accuracy: number }>,
    totalQuestionsAnswered: 0,
    overallAccuracy: 0,
  };

  // Generate sessions based on archetype
  switch (archetype) {
    case 'perseverant':
      // Consistent, steady improvement
      baseData.currentStreak = 12;
      baseData.longestStreak = 18;
      baseData.lastPracticeDate = today.toISOString().split('T')[0];

      for (let i = 0; i < 10; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        progressData.recentSessions.push({
          date: date.toISOString().split('T')[0],
          score: 65 + i * 2, // Gradual improvement
          topic: ['Números', 'Álgebra', 'Geometría'][i % 3],
          questionsAnswered: 10
        });
      }

      progressData.topicAccuracy = {
        'Números': { total: 40, correct: 30, accuracy: 75 },
        'Álgebra': { total: 35, correct: 26, accuracy: 74 },
        'Geometría': { total: 30, correct: 22, accuracy: 73 },
        'Probabilidad': { total: 25, correct: 18, accuracy: 72 }
      };
      progressData.totalQuestionsAnswered = 130;
      progressData.overallAccuracy = 73.5;
      break;

    case 'competitor':
      // High scores, competitive
      baseData.currentStreak = 8;
      baseData.longestStreak = 15;
      baseData.lastPracticeDate = today.toISOString().split('T')[0];

      for (let i = 0; i < 8; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        progressData.recentSessions.push({
          date: date.toISOString().split('T')[0],
          score: 85 + Math.random() * 10, // High scores with variation
          topic: 'Rapid Fire',
          questionsAnswered: 12
        });
      }

      progressData.topicAccuracy = {
        'Números': { total: 50, correct: 44, accuracy: 88 },
        'Álgebra': { total: 45, correct: 39, accuracy: 87 },
        'Geometría': { total: 40, correct: 34, accuracy: 85 },
        'Probabilidad': { total: 35, correct: 30, accuracy: 86 }
      };
      progressData.totalQuestionsAnswered = 170;
      progressData.overallAccuracy = 86.5;
      break;

    case 'curious-strategist':
      // Varied topics, deep exploration
      baseData.currentStreak = 6;
      baseData.longestStreak = 10;
      baseData.lastPracticeDate = today.toISOString().split('T')[0];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i * 2); // Not daily, more spaced
        progressData.recentSessions.push({
          date: date.toISOString().split('T')[0],
          score: 70 + Math.random() * 15,
          topic: ['Números', 'Álgebra', 'Geometría', 'Probabilidad'][i % 4],
          questionsAnswered: 8
        });
      }

      progressData.topicAccuracy = {
        'Números': { total: 30, correct: 24, accuracy: 80 },
        'Álgebra': { total: 28, correct: 20, accuracy: 71 },
        'Geometría': { total: 32, correct: 26, accuracy: 81 },
        'Probabilidad': { total: 26, correct: 21, accuracy: 81 }
      };
      progressData.totalQuestionsAnswered = 116;
      progressData.overallAccuracy = 78.4;
      break;

    case 'autonomous-efficient':
      // Efficient, targeted practice
      baseData.currentStreak = 5;
      baseData.longestStreak = 9;
      baseData.lastPracticeDate = today.toISOString().split('T')[0];

      for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i * 2);
        progressData.recentSessions.push({
          date: date.toISOString().split('T')[0],
          score: 80 + Math.random() * 10,
          topic: 'Mixed',
          questionsAnswered: 15
        });
      }

      progressData.topicAccuracy = {
        'Números': { total: 25, correct: 22, accuracy: 88 },
        'Álgebra': { total: 25, correct: 20, accuracy: 80 },
        'Geometría': { total: 20, correct: 17, accuracy: 85 },
        'Probabilidad': { total: 20, correct: 18, accuracy: 90 }
      };
      progressData.totalQuestionsAnswered = 90;
      progressData.overallAccuracy = 85.6;
      break;

    case 'resilient-rebuilder':
      // Recovering, showing improvement
      baseData.currentStreak = 3;
      baseData.longestStreak = 5;
      baseData.lastPracticeDate = today.toISOString().split('T')[0];

      for (let i = 0; i < 6; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        progressData.recentSessions.push({
          date: date.toISOString().split('T')[0],
          score: 40 + i * 8, // Clear upward trend
          topic: ['Números', 'Álgebra'][i % 2],
          questionsAnswered: 8
        });
      }

      progressData.topicAccuracy = {
        'Números': { total: 30, correct: 16, accuracy: 53 },
        'Álgebra': { total: 25, correct: 12, accuracy: 48 },
        'Geometría': { total: 20, correct: 11, accuracy: 55 },
        'Probabilidad': { total: 15, correct: 8, accuracy: 53 }
      };
      progressData.totalQuestionsAnswered = 90;
      progressData.overallAccuracy = 52.2;
      break;

    case 'practical-doer':
      // Focused on application
      baseData.currentStreak = 7;
      baseData.longestStreak = 11;
      baseData.lastPracticeDate = today.toISOString().split('T')[0];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        progressData.recentSessions.push({
          date: date.toISOString().split('T')[0],
          score: 70 + Math.random() * 12,
          topic: 'Problemas Aplicados',
          questionsAnswered: 10
        });
      }

      progressData.topicAccuracy = {
        'Números': { total: 35, correct: 28, accuracy: 80 },
        'Álgebra': { total: 30, correct: 21, accuracy: 70 },
        'Geometría': { total: 32, correct: 26, accuracy: 81 },
        'Probabilidad': { total: 28, correct: 22, accuracy: 79 }
      };
      progressData.totalQuestionsAnswered = 125;
      progressData.overallAccuracy = 77.6;
      break;

    case 'social-collaborator':
      // Live sessions, group activities
      baseData.currentStreak = 4;
      baseData.longestStreak = 8;
      baseData.lastPracticeDate = today.toISOString().split('T')[0];

      for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i * 2);
        progressData.recentSessions.push({
          date: date.toISOString().split('T')[0],
          score: 65 + Math.random() * 15,
          topic: i % 2 === 0 ? 'Live Session' : 'Práctica',
          questionsAnswered: i % 2 === 0 ? 20 : 10
        });
      }

      progressData.topicAccuracy = {
        'Números': { total: 40, correct: 28, accuracy: 70 },
        'Álgebra': { total: 38, correct: 27, accuracy: 71 },
        'Geometría': { total: 35, correct: 25, accuracy: 71 },
        'Probabilidad': { total: 32, correct: 23, accuracy: 72 }
      };
      progressData.totalQuestionsAnswered = 145;
      progressData.overallAccuracy = 71;
      break;

    case 'digital-explorer':
      // Tries everything, experimental
      baseData.currentStreak = 6;
      baseData.longestStreak = 9;
      baseData.lastPracticeDate = today.toISOString().split('T')[0];

      for (let i = 0; i < 8; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const modes = ['Zen', 'Rapid Fire', 'Live Session', 'Curriculum'];
        progressData.recentSessions.push({
          date: date.toISOString().split('T')[0],
          score: 60 + Math.random() * 20,
          topic: modes[i % 4],
          questionsAnswered: 8 + Math.floor(Math.random() * 5)
        });
      }

      progressData.topicAccuracy = {
        'Números': { total: 35, correct: 26, accuracy: 74 },
        'Álgebra': { total: 32, correct: 22, accuracy: 69 },
        'Geometría': { total: 30, correct: 22, accuracy: 73 },
        'Probabilidad': { total: 28, correct: 21, accuracy: 75 }
      };
      progressData.totalQuestionsAnswered = 125;
      progressData.overallAccuracy = 72.8;
      break;
  }

  return { userData: baseData, progressData };
}

/**
 * Get archetype by ID
 */
export function getArchetype(id: Archetype): ArchetypeProfile {
  return ARCHETYPES[id];
}

/**
 * Get all archetypes as array
 */
export function getAllArchetypes(): ArchetypeProfile[] {
  return Object.values(ARCHETYPES);
}
