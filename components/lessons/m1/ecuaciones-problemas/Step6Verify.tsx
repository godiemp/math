'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cual es el primer paso para resolver un problema algebraico?',
    options: [
      'Resolver la ecuacion inmediatamente',
      'Identificar la incognita y definir una variable',
      'Sumar todos los numeros del problema',
    ],
    correctAnswer: 1,
    explanation: 'Primero debemos identificar que nos piden encontrar y asignarle una variable (como x).',
  },
  {
    id: 'q2',
    question: '"El doble de un numero aumentado en 3" se traduce como:',
    options: [
      '2(x + 3)',
      '2x + 3',
      '2 + x + 3',
    ],
    correctAnswer: 1,
    explanation: '"El doble de un numero" es 2x, y "aumentado en 3" significa sumar 3: 2x + 3.',
  },
  {
    id: 'q3',
    question: 'Si 2x + 5 = 13, ¿cual es el valor de x?',
    options: ['x = 4', 'x = 6', 'x = 9'],
    correctAnswer: 0,
    explanation: '2x + 5 = 13 → 2x = 8 → x = 4. Verificacion: 2(4) + 5 = 8 + 5 = 13 ✓',
  },
  {
    id: 'q4',
    question: 'Pedro tiene x pesos. Maria tiene el triple. Juntos tienen 60 pesos. ¿Cual ecuacion representa esto?',
    options: [
      '3x = 60',
      'x + 3x = 60',
      'x + 3 = 60',
    ],
    correctAnswer: 1,
    explanation: 'Pedro tiene x, Maria tiene 3x. Juntos: x + 3x = 60.',
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
