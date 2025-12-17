'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es la factorización de x² + 10x + 21?',
    options: ['(x + 3)(x + 7)', '(x + 1)(x + 21)', '(x + 2)(x + 9)', '(x + 5)(x + 5)'],
    correctAnswer: 0,
    explanation:
      'Buscamos p + q = 10 y p × q = 21. Los números 3 y 7 cumplen: 3+7=10 ✓ y 3×7=21 ✓',
  },
  {
    id: 'q2',
    question: '¿Cuál es la factorización de x² - 6x + 8?',
    options: ['(x + 2)(x + 4)', '(x - 2)(x - 4)', '(x - 1)(x - 8)', '(x + 2)(x - 4)'],
    correctAnswer: 1,
    explanation:
      'b=-6 (negativo), c=8 (positivo) → ambos negativos. -2 + (-4) = -6 ✓ y (-2)×(-4) = 8 ✓',
  },
  {
    id: 'q3',
    question: '¿Cuál es la factorización de x² + 4x - 12?',
    options: ['(x + 6)(x - 2)', '(x - 6)(x + 2)', '(x + 4)(x - 3)', '(x + 3)(x - 4)'],
    correctAnswer: 0,
    explanation:
      'c=-12 (negativo) → signos diferentes. b=4 (positivo) → el + es mayor. 6 + (-2) = 4 ✓ y 6×(-2) = -12 ✓',
  },
  {
    id: 'q4',
    question: '¿Cuál es la factorización de x² - x - 30?',
    options: ['(x + 5)(x - 6)', '(x - 5)(x + 6)', '(x + 3)(x - 10)', '(x - 3)(x + 10)'],
    correctAnswer: 0,
    explanation:
      'c=-30 (negativo) → signos diferentes. b=-1 (negativo) → el - es mayor. 5 + (-6) = -1 ✓ y 5×(-6) = -30 ✓',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado la factorización de trinomios!"
    />
  );
}
