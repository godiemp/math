'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el número mixto equivalente a 9/4?',
    options: ['1 1/4', '2 1/4', '2 1/2', '3 1/4'],
    correctAnswer: 1,
    explanation:
      '9 ÷ 4 = 2 con resto 1. Entonces 9/4 = 2 enteros y 1/4, es decir, 2 1/4.',
  },
  {
    id: 'q2',
    question: '¿Cuál fracción impropia es igual a 3 2/5?',
    options: ['17/5', '15/5', '11/5', '8/5'],
    correctAnswer: 0,
    explanation: '(3 × 5) + 2 = 15 + 2 = 17. Por lo tanto, 3 2/5 = 17/5.',
  },
  {
    id: 'q3',
    question: 'Una fracción es impropia cuando:',
    options: [
      'El denominador es mayor que el numerador',
      'El numerador es mayor o igual al denominador',
      'Ambos números son iguales',
      'El denominador es 1',
    ],
    correctAnswer: 1,
    explanation:
      'Una fracción es impropia cuando el numerador es mayor o igual al denominador, lo que significa que representa 1 o más.',
  },
  {
    id: 'q4',
    question: '¿Dónde se ubicaría 7/3 en la recta numérica?',
    options: [
      'Entre 0 y 1',
      'Entre 1 y 2',
      'Entre 2 y 3',
      'Exactamente en 2',
    ],
    correctAnswer: 2,
    explanation:
      '7/3 = 2 1/3. Como 2 1/3 está entre 2 y 3, ahí se ubica en la recta numérica.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominaste las fracciones mayores que 1!"
    />
  );
}
