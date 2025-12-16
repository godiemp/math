'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál fracción es mayor?',
    options: ['1/4', '1/6'],
    correctAnswer: 0,
    explanation:
      'Cuando el numerador es igual, el denominador menor significa partes más grandes. 1/4 > 1/6 porque dividir en 4 partes da porciones más grandes que dividir en 6.',
  },
  {
    id: 'q2',
    question: '¿Son equivalentes 2/4 y 1/2?',
    options: ['Sí, son iguales', 'No, son diferentes'],
    correctAnswer: 0,
    explanation:
      '2/4 y 1/2 son fracciones equivalentes. Ambas representan exactamente la mitad del entero.',
  },
  {
    id: 'q3',
    question: '¿Cuál fracción está más cerca de 1?',
    options: ['3/4', '5/8', '2/3'],
    correctAnswer: 0,
    explanation:
      '3/4 = 0.75, 5/8 = 0.625, 2/3 ≈ 0.67. Por lo tanto, 3/4 está más cerca de 1.',
  },
  {
    id: 'q4',
    question: 'Una fracción es:',
    options: [
      'Dos números separados',
      'Un solo número',
      'Una operación de división',
    ],
    correctAnswer: 1,
    explanation:
      'Una fracción representa UN solo número que tiene una posición exacta en la recta numérica, aunque se escriba con dos números.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominaste las fracciones!"
    />
  );
}
