'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué líneas se intersecan para formar el circuncentro?',
    options: ['Alturas', 'Medianas', 'Mediatrices', 'Bisectrices'],
    correctAnswer: 2,
    explanation:
      'Las mediatrices son perpendiculares que pasan por el punto medio de cada lado. Su intersección es el circuncentro.',
  },
  {
    id: 'q2',
    question: '¿Qué punto notable es equidistante de los 3 vértices del triángulo?',
    options: ['Incentro', 'Baricentro', 'Ortocentro', 'Circuncentro'],
    correctAnswer: 3,
    explanation:
      'El circuncentro está a la misma distancia de los 3 vértices. Por eso es el centro del círculo circunscrito que pasa por ellos.',
  },
  {
    id: 'q3',
    question: '¿Qué punto notable se forma con la intersección de las medianas?',
    options: ['Circuncentro', 'Incentro', 'Baricentro', 'Ortocentro'],
    correctAnswer: 2,
    explanation:
      'Las medianas van desde cada vértice al punto medio del lado opuesto. Su intersección es el baricentro (centro de gravedad).',
  },
  {
    id: 'q4',
    question: 'En un triángulo obtusángulo, ¿dónde se ubica el ortocentro?',
    options: ['Siempre dentro', 'Siempre fuera', 'En un vértice', 'En el centro'],
    correctAnswer: 1,
    explanation:
      'En triángulos obtusángulos (con un ángulo mayor a 90°), el ortocentro se ubica fuera del triángulo.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Has dominado los puntos notables del triángulo."
    />
  );
}
