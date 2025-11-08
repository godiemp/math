import { Question } from '../types';
import { m1NumerosQuestions } from './m1-numeros';
import { m1AlgebraQuestions } from './m1-algebra';
import { m1GeometriaQuestions } from './m1-geometria';
import { m1ProbabilidadQuestions } from './m1-probabilidad';
import { m2NumerosQuestions } from './m2-numeros';
import { m2AlgebraQuestions } from './m2-algebra';
import { m2GeometriaQuestions } from './m2-geometria';
import { m2ProbabilidadQuestions } from './m2-probabilidad';

// Export individual question arrays
export {
  m1NumerosQuestions,
  m1AlgebraQuestions,
  m1GeometriaQuestions,
  m1ProbabilidadQuestions,
  m2NumerosQuestions,
  m2AlgebraQuestions,
  m2GeometriaQuestions,
  m2ProbabilidadQuestions
};

// Combine all questions into a single array
export const questions: Question[] = [
  ...m1NumerosQuestions,
  ...m1AlgebraQuestions,
  ...m1GeometriaQuestions,
  ...m1ProbabilidadQuestions,
  ...m2NumerosQuestions,
  ...m2AlgebraQuestions,
  ...m2GeometriaQuestions,
  ...m2ProbabilidadQuestions
];

// Utility functions
export function getQuestionsByLevel(level: 'M1' | 'M2'): Question[] {
  return questions.filter(q => q.level === level);
}

export function getQuestionsByTopic(topic: string): Question[] {
  return questions.filter(q => q.topic === topic);
}

export function getQuestionsBySubject(subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad', level?: 'M1' | 'M2'): Question[] {
  return questions.filter(q => {
    if (level) {
      return q.subject === subject && q.level === level;
    }
    return q.subject === subject;
  });
}

export function getRandomQuestions(level: 'M1' | 'M2', count: number = 10, subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad'): Question[] {
  let levelQuestions = getQuestionsByLevel(level);

  // Filter by subject if specified
  if (subject) {
    levelQuestions = levelQuestions.filter(q => q.subject === subject);
  }

  // If there are fewer questions than requested, return all of them
  if (levelQuestions.length <= count) {
    return [...levelQuestions].sort(() => Math.random() - 0.5);
  }

  // Fisher-Yates shuffle algorithm to get random questions
  const shuffled = [...levelQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

// Official PAES M1 distribution (based on 60 questions format)
export const PAES_M1_DISTRIBUTION = {
  números: 17,        // 28% - Números y proporcionalidad
  álgebra: 17,        // 28% - Álgebra y funciones
  geometría: 14,      // 23% - Geometría
  probabilidad: 12    // 21% - Probabilidad y estadística
};

// Official PAES M2 distribution (based on 50 questions format)
export const PAES_M2_DISTRIBUTION = {
  números: 12,        // 24% - Números complejos y avanzados
  álgebra: 16,        // 32% - Funciones, límites y derivadas
  geometría: 12,      // 24% - Geometría analítica avanzada
  probabilidad: 10    // 20% - Estadística inferencial
};

/**
 * Get questions following the official PAES format distribution
 * This function ensures that questions are selected proportionally by subject
 * according to the official PAES exam specifications.
 * Questions are ordered by subject (números, álgebra, geometría, probabilidad)
 * to match the real PAES format.
 */
export function getOfficialPAESQuestions(level: 'M1' | 'M2'): Question[] {
  const distribution = level === 'M1' ? PAES_M1_DISTRIBUTION : PAES_M2_DISTRIBUTION;
  const selectedQuestions: Question[] = [];

  // For each subject, randomly select the specified number of questions
  // Questions are kept in subject order (números, álgebra, geometría, probabilidad)
  Object.entries(distribution).forEach(([subject, count]) => {
    const subjectQuestions = getQuestionsBySubject(
      subject as 'números' | 'álgebra' | 'geometría' | 'probabilidad',
      level
    );

    // Shuffle and select the required number of questions within this subject
    const shuffled = [...subjectQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    selectedQuestions.push(...shuffled.slice(0, count));
  });

  return selectedQuestions;
}
