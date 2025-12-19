'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'En el método de reducción, ¿cuándo sumamos las ecuaciones?',
    options: [
      'Cuando los coeficientes son iguales',
      'Cuando los coeficientes son opuestos',
      'Siempre sumamos primero',
      'Cuando una variable está despejada',
    ],
    correctAnswer: 1,
    explanation: 'Sumamos cuando los coeficientes son opuestos (ej: +2y y -2y), así se cancelan al sumar.',
  },
  {
    id: 'q2',
    question: 'Dado x + y = 8 y x - y = 2, ¿cuánto vale x si sumamos las ecuaciones?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 2,
    explanation: 'Sumando: (x + y) + (x - y) = 8 + 2 → 2x = 10 → x = 5.',
  },
  {
    id: 'q3',
    question: '¿Qué hacer si los coeficientes no son iguales ni opuestos?',
    options: [
      'No se puede usar reducción',
      'Usar otro método',
      'Multiplicar una o ambas ecuaciones primero',
      'Despejar una variable',
    ],
    correctAnswer: 2,
    explanation: 'Podemos multiplicar una o ambas ecuaciones por constantes para que los coeficientes se vuelvan iguales u opuestos.',
  },
  {
    id: 'q4',
    question: 'Si 3x + 2y = 13 y 3x - 2y = 7, ¿cuál es la solución?',
    options: ['(3, 2)', '(4, 1/2)', '(10/3, 3/2)', '(2, 3)'],
    correctAnswer: 2,
    explanation: 'Sumando: 6x = 20 → x = 10/3. Restando: 4y = 6 → y = 3/2. Verificación: 3(10/3) + 2(3/2) = 10 + 3 = 13 ✓ y 3(10/3) - 2(3/2) = 10 - 3 = 7 ✓',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas el método de reducción!"
    />
  );
}
