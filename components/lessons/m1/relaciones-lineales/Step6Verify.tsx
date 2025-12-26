'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'v1',
    question: 'En la ecuacion ax + by = c, el intercepto Y se encuentra cuando:',
    options: [
      'y = 0',
      'x = 0',
      'x = y',
      'a = b',
    ],
    correctAnswer: 1,
    explanation:
      'El intercepto Y es donde la recta cruza el eje Y, lo cual ocurre cuando x = 0.',
  },
  {
    id: 'v2',
    question: 'Para la ecuacion 4x + 2y = 8, ¿cual es el intercepto X?',
    options: ['(0, 4)', '(2, 0)', '(4, 0)', '(8, 0)'],
    correctAnswer: 1,
    explanation: 'Con y = 0: 4x = 8, entonces x = 2. El intercepto X es (2, 0).',
  },
  {
    id: 'v3',
    question: '¿Cual de estos puntos esta en la recta x + y = 10?',
    options: ['(3, 6)', '(4, 6)', '(5, 6)', '(6, 6)'],
    correctAnswer: 1,
    explanation:
      'Verificando: 4 + 6 = 10 ✓. El punto (4, 6) satisface la ecuacion.',
  },
  {
    id: 'v4',
    question: 'Para graficar una relacion lineal ax + by = c, necesitas al menos:',
    options: [
      'Un punto cualquiera',
      'Dos puntos (como los interceptos)',
      'Tres puntos',
      'Conocer la pendiente unicamente',
    ],
    correctAnswer: 1,
    explanation:
      'Con dos puntos (generalmente los interceptos X e Y) se puede trazar la recta completa.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Has dominado las relaciones lineales. Ahora puedes encontrar interceptos, verificar puntos y graficar ecuaciones de la forma ax + by = c."
    />
  );
}
