'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el valor de (b/2)² para la expresión x² + 12x + 5?',
    options: ['6', '12', '36', '144'],
    correctAnswer: 2,
    explanation:
      'b = 12, entonces b/2 = 6 y (b/2)² = 6² = 36',
  },
  {
    id: 'q2',
    question: '¿Cuál es la forma de cuadrado completo de x² + 8x + 10?',
    options: ['(x + 4)² - 6', '(x + 4)² + 6', '(x + 8)² - 6', '(x + 4)² - 10'],
    correctAnswer: 0,
    explanation:
      'b = 8, b/2 = 4, (b/2)² = 16. Resultado: (x + 4)² + (10 - 16) = (x + 4)² - 6',
  },
  {
    id: 'q3',
    question: '¿Cuáles son las soluciones de x² - 10x + 9 = 0 completando el cuadrado?',
    options: ['x = 1 o x = 9', 'x = -1 o x = -9', 'x = 5 ± 4', 'x = -5 ± 4'],
    correctAnswer: 0,
    explanation:
      '(x - 5)² - 25 + 9 = 0 → (x - 5)² = 16 → x - 5 = ±4 → x = 5 + 4 = 9 o x = 5 - 4 = 1',
  },
  {
    id: 'q4',
    question: '¿Cuál es el vértice de la parábola y = x² - 6x + 2?',
    options: ['(3, -7)', '(-3, -7)', '(3, 7)', '(-3, 7)'],
    correctAnswer: 0,
    explanation:
      'y = (x - 3)² - 9 + 2 = (x - 3)² - 7. El vértice es (h, k) = (3, -7)',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado la técnica de completar el cuadrado!"
    />
  );
}
