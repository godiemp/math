'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el MCM de 3 y 4?',
    options: ['7', '12', '1', '34'],
    correctAnswer: 1,
    explanation:
      'MCM(3, 4) = 12. Es el primer número que aparece en ambas listas de múltiplos: 3, 6, 9, 12... y 4, 8, 12...',
  },
  {
    id: 'q2',
    question: '¿Cuál es el resultado de 1/2 + 1/3?',
    options: ['2/5', '5/6', '2/6', '3/5'],
    correctAnswer: 1,
    explanation:
      'MCM(2,3)=6. Convertimos: 1/2=3/6 y 1/3=2/6. Sumamos: 3/6 + 2/6 = 5/6.',
  },
  {
    id: 'q3',
    question: 'Para sumar 2/3 + 1/4, ¿a qué denominador común convertimos?',
    options: ['7', '12', '34', '1'],
    correctAnswer: 1,
    explanation:
      'El MCM de 3 y 4 es 12. Convertimos ambas fracciones a doceavos antes de sumar.',
  },
  {
    id: 'q4',
    question: '¿Cuál es el resultado de 3/4 − 1/3?',
    options: ['2/1', '5/12', '2/7', '4/12'],
    correctAnswer: 1,
    explanation:
      'MCM(4,3)=12. Convertimos: 3/4=9/12 y 1/3=4/12. Restamos: 9/12 − 4/12 = 5/12.',
  },
  {
    id: 'q5',
    question: '¿Cuál es el resultado simplificado de 1/4 + 1/2?',
    options: ['2/6', '2/4', '3/4', '3/6'],
    correctAnswer: 2,
    explanation:
      'MCM(4,2)=4. Ya tenemos 1/4, y 1/2=2/4. Sumamos: 1/4 + 2/4 = 3/4. Ya está simplificado.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="¡Dominaste las fracciones con distinto denominador!"
    />
  );
}
