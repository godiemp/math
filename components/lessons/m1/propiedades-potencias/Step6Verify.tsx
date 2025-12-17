'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el resultado de 3⁴ × 3²?',
    options: ['3⁶ = 729', '3⁸ = 6561', '9⁶ = muy grande', '3² = 9'],
    correctAnswer: 0,
    explanation:
      '3⁴ × 3² = 3⁴⁺² = 3⁶ = 729. Al multiplicar potencias con la misma base, sumamos los exponentes.',
  },
  {
    id: 'q2',
    question: '¿Cuál es el resultado de 5⁷ ÷ 5⁴?',
    options: ['5³ = 125', '5¹¹ = muy grande', '5²⁸ = muy grande', '1³ = 1'],
    correctAnswer: 0,
    explanation:
      '5⁷ ÷ 5⁴ = 5⁷⁻⁴ = 5³ = 125. Al dividir potencias con la misma base, restamos los exponentes.',
  },
  {
    id: 'q3',
    question: '¿Cuál es el resultado de (2³)⁴?',
    options: ['2⁷ = 128', '2¹² = 4096', '2³⁴ = muy grande', '2⁴ = 16'],
    correctAnswer: 1,
    explanation:
      '(2³)⁴ = 2³ˣ⁴ = 2¹² = 4096. Al elevar una potencia a otro exponente, multiplicamos los exponentes.',
  },
  {
    id: 'q4',
    question: '¿Cuál de estas expresiones NO se puede simplificar usando las propiedades de potencias?',
    options: [
      '4³ × 4⁵',
      '(7²)³',
      '2⁴ × 5³',
      '9⁸ ÷ 9³',
    ],
    correctAnswer: 2,
    explanation:
      '2⁴ × 5³ no se puede simplificar porque las bases son diferentes (2 y 5). Las propiedades de potencias solo funcionan cuando las bases son iguales.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado las propiedades de las potencias!"
    />
  );
}
