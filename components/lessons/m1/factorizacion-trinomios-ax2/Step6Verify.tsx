'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es la factorización de 2x² + 11x + 5?',
    options: ['(2x + 1)(x + 5)', '(2x + 5)(x + 1)', '(x + 1)(x + 5)', '(2x + 1)(2x + 5)'],
    correctAnswer: 0,
    explanation:
      'a×c = 2×5 = 10. Buscamos m+n=11 y m×n=10. Los números 1 y 10 cumplen: 1+10=11 ✓ y 1×10=10 ✓. Resultado: (2x+1)(x+5)',
  },
  {
    id: 'q2',
    question: '¿Cuál es la factorización de 3x² + 7x + 2?',
    options: ['(3x + 1)(x + 2)', '(3x + 2)(x + 1)', '(x + 1)(x + 2)', '(3x + 1)(3x + 2)'],
    correctAnswer: 0,
    explanation:
      'a×c = 3×2 = 6. Buscamos m+n=7 y m×n=6. Los números 1 y 6 cumplen: 1+6=7 ✓ y 1×6=6 ✓. Resultado: (3x+1)(x+2)',
  },
  {
    id: 'q3',
    question: '¿Cuál es la factorización de 2x² - 5x - 3?',
    options: ['(2x + 1)(x - 3)', '(2x - 3)(x + 1)', '(2x - 1)(x + 3)', '(x + 1)(2x - 3)'],
    correctAnswer: 0,
    explanation:
      'a×c = 2×(-3) = -6. Buscamos m+n=-5 y m×n=-6. Los números 1 y -6 cumplen: 1+(-6)=-5 ✓ y 1×(-6)=-6 ✓. Resultado: (2x+1)(x-3)',
  },
  {
    id: 'q4',
    question: '¿Cuál es la factorización de 4x² + 4x - 3?',
    options: ['(2x + 3)(2x - 1)', '(2x - 3)(2x + 1)', '(4x + 3)(x - 1)', '(4x - 1)(x + 3)'],
    correctAnswer: 0,
    explanation:
      'a×c = 4×(-3) = -12. Buscamos m+n=4 y m×n=-12. Los números 6 y -2 cumplen: 6+(-2)=4 ✓ y 6×(-2)=-12 ✓. Resultado: (2x+3)(2x-1)',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado la factorización de trinomios ax² + bx + c!"
    />
  );
}
