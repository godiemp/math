'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'En el método de sustitución, el primer paso es:',
    options: ['Sumar las ecuaciones', 'Despejar una variable de una ecuación', 'Graficar las rectas', 'Multiplicar las ecuaciones'],
    correctAnswer: 1,
    explanation: 'El primer paso es despejar una variable de una de las ecuaciones para luego sustituirla en la otra.',
  },
  {
    id: 'q2',
    question: 'Si y = 2x y x + y = 9, ¿cuál es el valor de x?',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 6'],
    correctAnswer: 1,
    explanation: 'Sustituyendo: x + 2x = 9 → 3x = 9 → x = 3.',
  },
  {
    id: 'q3',
    question: '¿Cuándo es más conveniente usar el método de sustitución?',
    options: [
      'Cuando ambas ecuaciones tienen el mismo coeficiente',
      'Cuando una variable ya está despejada o tiene coeficiente 1',
      'Siempre es el mejor método',
      'Cuando las ecuaciones son paralelas',
    ],
    correctAnswer: 1,
    explanation: 'El método de sustitución es ideal cuando una variable ya está despejada (como y = 3x) o tiene coeficiente 1 o -1.',
  },
  {
    id: 'q4',
    question: 'Dado el sistema x = y + 4 y 2x + y = 11, ¿cuál es la solución?',
    options: ['(3, -1)', '(5, 1)', '(4, 0)', '(6, 2)'],
    correctAnswer: 1,
    explanation: 'Sustituyendo x: 2(y + 4) + y = 11 → 2y + 8 + y = 11 → 3y = 3 → y = 1. Luego x = 1 + 4 = 5.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas el método de sustitución!"
    />
  );
}
