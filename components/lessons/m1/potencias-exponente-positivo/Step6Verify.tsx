'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuánto es 2⁶?',
    options: ['12', '32', '64', '128'],
    correctAnswer: 2,
    explanation:
      '2⁶ = 2 × 2 × 2 × 2 × 2 × 2 = 64. El 2 se multiplica 6 veces.',
  },
  {
    id: 'q2',
    question: '¿Cuál es el valor de 5²?',
    options: ['10', '25', '32', '125'],
    correctAnswer: 1,
    explanation:
      '5² = 5 × 5 = 25. "Cinco al cuadrado" significa multiplicar 5 por sí mismo.',
  },
  {
    id: 'q3',
    question: '¿Cuál afirmación sobre las potencias es VERDADERA?',
    options: [
      '3⁰ = 0',
      '4¹ = 4',
      '2³ = 6',
      '5² = 10',
    ],
    correctAnswer: 1,
    explanation:
      '4¹ = 4. Cualquier número elevado a la potencia 1 es igual a sí mismo. Las otras son falsas: 3⁰ = 1, 2³ = 8, 5² = 25.',
  },
  {
    id: 'q4',
    question: 'En la potencia 7³, ¿cuál es la base y cuál es el exponente?',
    options: [
      'Base = 3, Exponente = 7',
      'Base = 7, Exponente = 3',
      'Base = 21, Exponente = 1',
      'Base = 343, Exponente = 1',
    ],
    correctAnswer: 1,
    explanation:
      'En 7³, la base es 7 (el número que se multiplica) y el exponente es 3 (cuántas veces se multiplica). Resultado: 7 × 7 × 7 = 343.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado las potencias con exponente positivo!"
    />
  );
}
