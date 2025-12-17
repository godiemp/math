'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el primer paso para factorizar por agrupación?',
    options: [
      'Sacar el MCD de todos los términos',
      'Agrupar los términos de a pares',
      'Multiplicar todos los términos',
      'Ordenar los términos alfabéticamente',
    ],
    correctAnswer: 1,
    explanation:
      'El primer paso es agrupar los términos de a pares, formando dos grupos con paréntesis.',
  },
  {
    id: 'q2',
    question: 'Factoriza: x² + 3x + 2x + 6',
    options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x + 3)(x + 2)', 'x(x + 5) + 6'],
    correctAnswer: 0,
    explanation:
      '(x² + 3x) + (2x + 6) = x(x + 3) + 2(x + 3) = (x + 3)(x + 2) = (x + 2)(x + 3)',
  },
  {
    id: 'q3',
    question: 'Factoriza: ab + ac + 2b + 2c',
    options: ['(a + 2)(b + c)', 'a(b + c) + 2(b + c)', '(ab + 2)(c + 1)', '(a + b)(c + 2)'],
    correctAnswer: 0,
    explanation:
      '(ab + ac) + (2b + 2c) = a(b + c) + 2(b + c) = (b + c)(a + 2) = (a + 2)(b + c)',
  },
  {
    id: 'q4',
    question: '¿Qué debe ocurrir para que la factorización por agrupación funcione?',
    options: [
      'Todos los términos deben ser positivos',
      'Los binomios de cada grupo deben ser iguales',
      'La expresión debe tener exactamente 4 términos',
      'El primer término debe ser un cuadrado perfecto',
    ],
    correctAnswer: 1,
    explanation:
      'Después de sacar factor común de cada grupo, los binomios resultantes deben ser idénticos para poder extraer el factor común final.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Has dominado la factorización por agrupación."
    />
  );
}
