'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuánto vale 9⁰?',
    options: ['0', '1', '9', 'No está definido'],
    correctAnswer: 1,
    explanation: 'Cualquier número distinto de cero elevado a 0 es igual a 1. Por lo tanto, 9⁰ = 1.',
  },
  {
    id: 'q2',
    question: '¿Cuánto vale 5⁻²?',
    options: ['-25', '1/25', '-10', '25'],
    correctAnswer: 1,
    explanation: '5⁻² = 1/5² = 1/25. El exponente negativo indica tomar el recíproco.',
  },
  {
    id: 'q3',
    question: '¿Cuál es el valor de (3/4)⁻¹?',
    options: ['3/4', '-3/4', '4/3', '-4/3'],
    correctAnswer: 2,
    explanation: '(3/4)⁻¹ = 4/3. El exponente -1 invierte la fracción.',
  },
  {
    id: 'q4',
    question: '¿Cuánto vale 2⁻⁴?',
    options: ['1/8', '1/16', '-8', '8'],
    correctAnswer: 1,
    explanation: '2⁻⁴ = 1/2⁴ = 1/16. Calculamos 2⁴ = 16 y luego invertimos.',
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
