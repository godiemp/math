'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el resultado simplificado de 1/3 × 1/2?',
    options: ['2/5', '1/6', '2/6', '1/5'],
    correctAnswer: 1,
    explanation:
      '1/3 × 1/2 = (1×1)/(3×2) = 1/6. Multiplica numeradores entre sí y denominadores entre sí.',
  },
  {
    id: 'q2',
    question: '¿Cuál es el resultado simplificado de 2/3 × 3/4?',
    options: ['5/7', '2/4', '1/2', '6/7'],
    correctAnswer: 2,
    explanation:
      '2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2. No olvides simplificar el resultado.',
  },
  {
    id: 'q3',
    question: '¿Cuál es el recíproco de 3/5?',
    options: ['3/5', '5/3', '-3/5', '1'],
    correctAnswer: 1,
    explanation:
      'El recíproco se obtiene intercambiando numerador y denominador. El recíproco de 3/5 es 5/3.',
  },
  {
    id: 'q4',
    question: '¿Cuál es el resultado de 1/2 ÷ 1/4?',
    options: ['1/8', '2', '1/2', '4'],
    correctAnswer: 1,
    explanation:
      '1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2. Dividir es multiplicar por el recíproco.',
  },
  {
    id: 'q5',
    question: '¿Cuál es el resultado de 3/4 ÷ 2/3?',
    options: ['1/2', '2/4', '9/8', '6/7'],
    correctAnswer: 2,
    explanation:
      '3/4 ÷ 2/3 = 3/4 × 3/2 = (3×3)/(4×2) = 9/8. Multiplica por el recíproco de 2/3.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="¡Dominaste la multiplicación y división de fracciones!"
    />
  );
}
