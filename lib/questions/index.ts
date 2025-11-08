import { Question } from '../types';
import { m1NumerosQuestions } from './m1/numeros';
import { m1AlgebraQuestions } from './m1/algebra';
import { m1GeometriaQuestions } from './m1/geometria';
import { m1ProbabilidadQuestions } from './m1/probabilidad';
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
