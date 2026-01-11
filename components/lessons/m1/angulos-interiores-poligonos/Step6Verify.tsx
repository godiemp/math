'use client';

import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';
import { LessonStepProps } from '@/lib/lessons/types';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es la suma de los ángulos interiores de un pentágono?',
    options: ['360°', '450°', '540°', '720°'],
    correctAnswer: 2,
    explanation: '(5 - 2) × 180° = 3 × 180° = 540°',
  },
  {
    id: 'q2',
    question: '¿Cuánto mide cada ángulo interior de un hexágono regular?',
    options: ['100°', '108°', '120°', '135°'],
    correctAnswer: 2,
    explanation: '(6 - 2) × 180° ÷ 6 = 720° ÷ 6 = 120°',
  },
  {
    id: 'q3',
    question: 'Si un polígono tiene una suma de ángulos interiores de 1440°, ¿cuántos lados tiene?',
    options: ['8', '9', '10', '12'],
    correctAnswer: 2,
    explanation: '(n - 2) × 180° = 1440° → n - 2 = 8 → n = 10 lados',
  },
  {
    id: 'q4',
    question: 'Un polígono regular tiene ángulos interiores de 150° cada uno. ¿Cuántos lados tiene?',
    options: ['10', '12', '15', '18'],
    correctAnswer: 1,
    explanation: 'Cada ángulo = (n - 2) × 180° ÷ n = 150°. Resolviendo: n = 12 (dodecágono)',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas los ángulos interiores de polígonos."
    />
  );
}
