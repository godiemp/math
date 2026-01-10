'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el resultado de $3^4 \\times 3^2$?',
    options: ['$3^6 = 729$', '$3^8 = 6561$', '$9^6$ = muy grande', '$3^2 = 9$'],
    correctAnswer: 0,
    explanation:
      '$3^4 \\times 3^2 = 3^{4+2} = 3^6 = 729$. Al multiplicar potencias con la misma base, sumamos los exponentes.',
  },
  {
    id: 'q2',
    question: '¿Cuál es el resultado de $5^7 \\div 5^4$?',
    options: ['$5^3 = 125$', '$5^{11}$ = muy grande', '$5^{28}$ = muy grande', '$1^3 = 1$'],
    correctAnswer: 0,
    explanation:
      '$5^7 \\div 5^4 = 5^{7-4} = 5^3 = 125$. Al dividir potencias con la misma base, restamos los exponentes.',
  },
  {
    id: 'q3',
    question: '¿Cuál es el resultado de $(2^3)^4$?',
    options: ['$2^7 = 128$', '$2^{12} = 4096$', '$2^{34}$ = muy grande', '$2^4 = 16$'],
    correctAnswer: 1,
    explanation:
      '$(2^3)^4 = 2^{3 \\times 4} = 2^{12} = 4096$. Al elevar una potencia a otro exponente, multiplicamos los exponentes.',
  },
  {
    id: 'q4',
    question: '¿Cuál de estas expresiones NO se puede simplificar usando las propiedades de potencias?',
    options: [
      '$4^3 \\times 4^5$',
      '$(7^2)^3$',
      '$2^4 \\times 5^3$',
      '$9^8 \\div 9^3$',
    ],
    correctAnswer: 2,
    explanation:
      '$2^4 \\times 5^3$ no se puede simplificar porque las bases son diferentes (2 y 5). Las propiedades de potencias solo funcionan cuando las bases son iguales.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado las propiedades de las potencias!"
    />
  );
}
