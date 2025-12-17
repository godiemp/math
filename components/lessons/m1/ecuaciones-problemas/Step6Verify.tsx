'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el primer paso para resolver un problema algebraico?',
    options: [
      'Resolver la ecuación inmediatamente',
      'Identificar la incógnita y definir una variable',
      'Sumar todos los números del problema',
    ],
    correctAnswer: 1,
    explanation: 'Primero debemos identificar qué nos piden encontrar y asignarle una variable (como x).',
  },
  {
    id: 'q2',
    question: '"El doble de un número aumentado en 3" se traduce como:',
    options: [
      '2(x + 3)',
      '2x + 3',
      '2 + x + 3',
    ],
    correctAnswer: 1,
    explanation: '"El doble de un número" es 2x, y "aumentado en 3" significa sumar 3: 2x + 3.',
  },
  {
    id: 'q3',
    question: 'Si 2x + 5 = 13, ¿cuál es el valor de x?',
    options: ['x = 4', 'x = 6', 'x = 9'],
    correctAnswer: 0,
    explanation: '2x + 5 = 13 → 2x = 8 → x = 4. Verificación: 2(4) + 5 = 8 + 5 = 13 ✓',
  },
  {
    id: 'q4',
    question: 'Pedro tiene x pesos. María tiene el triple. Juntos tienen 60 pesos. ¿Cuál ecuación representa esto?',
    options: [
      '3x = 60',
      'x + 3x = 60',
      'x + 3 = 60',
    ],
    correctAnswer: 1,
    explanation: 'Pedro tiene x, María tiene 3x. Juntos: x + 3x = 60.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      title="Checkpoint"
      successMessage="Has demostrado que puedes traducir y resolver problemas algebraicos. ¡Ahora puedes aplicar estas habilidades en la vida real!"
    />
  );
}
