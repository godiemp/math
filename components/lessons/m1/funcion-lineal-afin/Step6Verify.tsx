'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'v1',
    question: 'Una función lineal tiene la forma y = mx. Esto significa que:',
    options: [
      'Siempre tiene pendiente positiva',
      'Pasa por el origen (0, 0)',
      'Tiene coeficiente de posición b = 1',
      'Es una línea horizontal',
    ],
    correctAnswer: 1,
    explanation:
      'Una función lineal y = mx pasa por el origen porque cuando x = 0, y = m(0) = 0.',
  },
  {
    id: 'v2',
    question: 'Calcula la pendiente de la recta que pasa por (1, 4) y (3, 10)',
    options: ['m = 2', 'm = 3', 'm = 6', 'm = 7'],
    correctAnswer: 1,
    explanation: 'm = (10 - 4) / (3 - 1) = 6 / 2 = 3',
  },
  {
    id: 'v3',
    question: 'En la función y = -2x + 5, ¿cuál es el coeficiente de posición?',
    options: ['-2', '2', '5', '-5'],
    correctAnswer: 2,
    explanation:
      'En y = mx + b, el coeficiente de posición es b. Aquí b = 5 (el término independiente).',
  },
  {
    id: 'v4',
    question: 'Si una recta tiene pendiente negativa, su gráfico:',
    options: [
      'Sube de izquierda a derecha',
      'Baja de izquierda a derecha',
      'Es horizontal',
      'Pasa por el origen',
    ],
    correctAnswer: 1,
    explanation:
      'Pendiente negativa significa que al aumentar x, y disminuye, por lo que la recta baja de izquierda a derecha.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado las funciones lineales y afines! Ahora puedes identificar pendientes, coeficientes de posición y graficar rectas."
    />
  );
}
