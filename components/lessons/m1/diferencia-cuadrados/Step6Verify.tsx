'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es la factorización de x² - 100?',
    options: ['(x + 10)(x - 10)', '(x + 50)(x - 50)', '(x - 10)²', '(x + 100)(x - 1)'],
    correctAnswer: 0,
    explanation:
      'x² - 100 = x² - 10² = (x + 10)(x - 10). Verificación: (x+10)(x-10) = x² - 100 ✓',
  },
  {
    id: 'q2',
    question: '¿Cuál es la factorización de 16x² - 9?',
    options: ['(4x + 3)(4x - 3)', '(8x + 3)(2x - 3)', '(4x - 3)²', '(16x + 9)(x - 1)'],
    correctAnswer: 0,
    explanation:
      '16x² - 9 = (4x)² - 3² = (4x + 3)(4x - 3)',
  },
  {
    id: 'q3',
    question: '¿Cuál expresión NO es una diferencia de cuadrados?',
    options: ['x² - 25', 'x² + 49', '4x² - 1', '9x² - 16y²'],
    correctAnswer: 1,
    explanation:
      'x² + 49 es una SUMA de cuadrados. La suma de cuadrados no se puede factorizar con números reales.',
  },
  {
    id: 'q4',
    question: '¿Cuál es la factorización de 49x² - 36y²?',
    options: ['(7x + 6y)(7x - 6y)', '(49x + 36y)(x - y)', '(7x - 6y)²', '(x + y)(49x - 36y)'],
    correctAnswer: 0,
    explanation:
      '49x² - 36y² = (7x)² - (6y)² = (7x + 6y)(7x - 6y)',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado la factorización por diferencia de cuadrados!"
    />
  );
}
