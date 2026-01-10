'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuánto es $2^6$?',
    options: ['12', '32', '64', '128'],
    correctAnswer: 2,
    explanation:
      '$2^6 = 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 = 64$. El 2 se multiplica 6 veces.',
  },
  {
    id: 'q2',
    question: '¿Cuál es el valor de $5^2$?',
    options: ['10', '25', '32', '125'],
    correctAnswer: 1,
    explanation:
      '$5^2 = 5 \\times 5 = 25$. "Cinco al cuadrado" significa multiplicar 5 por sí mismo.',
  },
  {
    id: 'q3',
    question: '¿Cuál afirmación sobre las potencias es VERDADERA?',
    options: [
      '$3^0 = 0$',
      '$4^1 = 4$',
      '$2^3 = 6$',
      '$5^2 = 10$',
    ],
    correctAnswer: 1,
    explanation:
      '$4^1 = 4$. Cualquier número elevado a la potencia 1 es igual a sí mismo. Las otras son falsas: $3^0 = 1$, $2^3 = 8$, $5^2 = 25$.',
  },
  {
    id: 'q4',
    question: 'En la potencia $7^3$, ¿cuál es la base y cuál es el exponente?',
    options: [
      'Base = 3, Exponente = 7',
      'Base = 7, Exponente = 3',
      'Base = 21, Exponente = 1',
      'Base = 343, Exponente = 1',
    ],
    correctAnswer: 1,
    explanation:
      'En $7^3$, la base es 7 (el número que se multiplica) y el exponente es 3 (cuántas veces se multiplica). Resultado: $7 \\times 7 \\times 7 = 343$.',
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
