'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuánto es el 30% de 200?',
    options: ['30', '60', '100', '130'],
    correctAnswer: 1,
    explanation:
      '30% de 200 = 30 × 200 ÷ 100 = 6000 ÷ 100 = 60. También puedes pensar: 10% de 200 = 20, entonces 30% = 20 × 3 = 60.',
  },
  {
    id: 'q2',
    question: 'Una polera de $25.000 tiene 20% de descuento. ¿Cuánto pagas?',
    options: ['$5.000', '$15.000', '$20.000', '$30.000'],
    correctAnswer: 2,
    explanation:
      'Descuento = 20% de $25.000 = $5.000. Precio final = $25.000 - $5.000 = $20.000.',
  },
  {
    id: 'q3',
    question: '¿Qué fracción representa el 75%?',
    options: ['1/2', '2/3', '3/4', '4/5'],
    correctAnswer: 2,
    explanation:
      '75% = 75/100 = 3/4. También: 75% es 3 de cada 4 partes, que es tres cuartos.',
  },
  {
    id: 'q4',
    question: 'Si 24 es el 40% de un número, ¿cuál es ese número?',
    options: ['40', '48', '60', '96'],
    correctAnswer: 2,
    explanation:
      'Si 40% = 24, entonces 100% = 24 ÷ 40 × 100 = 24 × 2,5 = 60. También: 10% = 6, entonces 100% = 60.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado el concepto y cálculo de porcentajes!"
    />
  );
}
