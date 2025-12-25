'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'En el método de igualación, el primer paso es:',
    options: ['Sumar las ecuaciones', 'Despejar la misma variable en ambas ecuaciones', 'Graficar las rectas', 'Multiplicar las ecuaciones'],
    correctAnswer: 1,
    explanation: 'En igualación, despejamos la misma variable en ambas ecuaciones para luego igualar las expresiones resultantes.',
  },
  {
    id: 'q2',
    question: 'Si y = 3x + 1 y y = x + 5, ¿qué expresión se forma al igualar?',
    options: ['3x + 1 = x + 5', 'y = 3x + x', '3x = x + 5', '1 = 5'],
    correctAnswer: 0,
    explanation: 'Como ambas expresiones son iguales a y, las igualamos: 3x + 1 = x + 5.',
  },
  {
    id: 'q3',
    question: '¿Cuál es la diferencia principal entre igualación y sustitución?',
    options: [
      'Igualación solo funciona con y',
      'Sustitución requiere despejar en ambas ecuaciones',
      'Igualación despeja la misma variable dos veces',
      'No hay diferencia',
    ],
    correctAnswer: 2,
    explanation: 'En igualación se despeja la misma variable en ambas ecuaciones, mientras que en sustitución solo se despeja en una.',
  },
  {
    id: 'q4',
    question: 'Dado y = 2x y y = 10 - x, ¿cuál es el valor de x?',
    options: ['x = 2', 'x = 10/3', 'x = 5', 'x = 10'],
    correctAnswer: 1,
    explanation: 'Igualando: 2x = 10 - x → 3x = 10 → x = 10/3.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas el método de igualación!"
    />
  );
}
