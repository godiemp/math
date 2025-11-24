/**
 * Official PAES Session Templates
 *
 * These templates define the standard configuration for official PAES (Prueba de Acceso a la Educación Superior)
 * mathematics practice sessions. They ensure consistency between the admin interface and seeded data.
 */

export interface SessionTemplate {
  name: string;
  description: string;
  level: 'M1' | 'M2';
  defaultTime: string;
  durationMinutes: number;
  questionCount: number;
}

/**
 * Official PAES session templates for M1 and M2 levels
 *
 * M1 (Matemática Básica):
 * - 60 questions following official distribution
 * - 140 minutes (2h 20min)
 * - Topics: números, álgebra básica, geometría, probabilidades
 *
 * M2 (Matemática Avanzada):
 * - 50 questions following official distribution
 * - 140 minutes (2h 20min)
 * - Topics: cálculo, límites, derivadas, integrales
 */
export const PAES_SESSION_TEMPLATES = {
  M1: {
    name: 'Ensayo PAES M1 - Matemática Básica',
    description: 'Ensayo oficial para nivel M1: números, álgebra básica, geometría y probabilidades. Duración oficial PAES: 2h 20min.',
    level: 'M1' as const,
    defaultTime: '15:00',
    durationMinutes: 140,
    questionCount: 60,
  },
  M2: {
    name: 'Ensayo PAES M2 - Matemática Avanzada',
    description: 'Ensayo oficial para nivel M2: cálculo, límites, derivadas e integrales. Duración oficial PAES: 2h 20min.',
    level: 'M2' as const,
    defaultTime: '16:30',
    durationMinutes: 140,
    questionCount: 50,
  },
} as const;

/**
 * Helper function to check if a session configuration matches the official PAES format
 *
 * @param level - The session level (M1 or M2)
 * @param questionCount - The number of questions in the session
 * @returns true if the question count matches the official PAES format for the given level
 */
export function isOfficialPAESFormat(level: 'M1' | 'M2', questionCount: number): boolean {
  return PAES_SESSION_TEMPLATES[level].questionCount === questionCount;
}

/**
 * Practice session template for shorter review sessions
 */
export const PRACTICE_SESSION_TEMPLATE = {
  M1: {
    name: 'Práctica M1 - Repaso Rápido',
    description: 'Sesión de práctica para repasar conceptos clave de M1. Ideal para sesiones de estudio focalizadas.',
    level: 'M1' as const,
    defaultTime: '17:00',
    durationMinutes: 60,
    questionCount: 25,
  },
  M2: {
    name: 'Práctica M2 - Repaso Rápido',
    description: 'Sesión de práctica para repasar conceptos clave de M2. Ideal para sesiones de estudio focalizadas.',
    level: 'M2' as const,
    defaultTime: '17:00',
    durationMinutes: 60,
    questionCount: 25,
  },
} as const;
