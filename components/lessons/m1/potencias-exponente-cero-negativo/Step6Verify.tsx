'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuánto vale $9^0$?',
    options: ['0', '1', '9', 'No está definido'],
    correctAnswer: 1,
    explanation: 'Cualquier número distinto de cero elevado a 0 es igual a 1. Por lo tanto, $9^0 = 1$.',
  },
  {
    id: 'q2',
    question: '¿Cuánto vale $5^{-2}$?',
    options: ['-25', '$\\frac{1}{25}$', '-10', '25'],
    correctAnswer: 1,
    explanation: '$5^{-2} = \\frac{1}{5^2} = \\frac{1}{25}$. El exponente negativo indica tomar el recíproco.',
  },
  {
    id: 'q3',
    question: '¿Cuál es el valor de $\\left(\\frac{3}{4}\\right)^{-1}$?',
    options: ['$\\frac{3}{4}$', '$-\\frac{3}{4}$', '$\\frac{4}{3}$', '$-\\frac{4}{3}$'],
    correctAnswer: 2,
    explanation: '$\\left(\\frac{3}{4}\\right)^{-1} = \\frac{4}{3}$. El exponente -1 invierte la fracción.',
  },
  {
    id: 'q4',
    question: '¿Cuánto vale $2^{-4}$?',
    options: ['$\\frac{1}{8}$', '$\\frac{1}{16}$', '-8', '8'],
    correctAnswer: 1,
    explanation: '$2^{-4} = \\frac{1}{2^4} = \\frac{1}{16}$. Calculamos $2^4 = 16$ y luego invertimos.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas los exponentes cero y negativos!"
    />
  );
}
