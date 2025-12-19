'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question:
      'Una figura en L tiene dimensiones externas de 12 m × 10 m, con una esquina cortada de 5 m × 6 m. ¿Cuál es su área?',
    options: ['90 m²', '120 m²', '100 m²', '70 m²'],
    correctAnswer: 0,
    explanation:
      'Área completa: 12 × 10 = 120 m². Esquina cortada: 5 × 6 = 30 m². Área de la L: 120 − 30 = 90 m²',
  },
  {
    id: 'q2',
    question:
      'Una figura en T tiene una barra horizontal de 15 m × 4 m y una barra vertical de 6 m × 8 m. ¿Cuál es el área total?',
    options: ['92 m²', '108 m²', '120 m²', '132 m²'],
    correctAnswer: 1,
    explanation:
      'Barra horizontal: 15 × 4 = 60 m². Barra vertical: 6 × 8 = 48 m². Total: 60 + 48 = 108 m²',
  },
  {
    id: 'q3',
    question:
      'Un marco rectangular tiene exterior de 10 m × 8 m e interior (hueco) de 6 m × 4 m. ¿Cuál es el área del marco?',
    options: ['80 m²', '56 m²', '24 m²', '104 m²'],
    correctAnswer: 1,
    explanation:
      'Área externa: 10 × 8 = 80 m². Área del hueco: 6 × 4 = 24 m². Área del marco: 80 − 24 = 56 m²',
  },
  {
    id: 'q4',
    question:
      'Un jardín rectangular de 8 m × 5 m tiene adosado un semicírculo de radio 2.5 m. ¿Cuál es el área aproximada? (usa π ≈ 3.14)',
    options: ['40 m²', '49.81 m²', '59.63 m²', '44.91 m²'],
    correctAnswer: 1,
    explanation:
      'Rectángulo: 8 × 5 = 40 m². Semicírculo: (π × 2.5²) / 2 ≈ (3.14 × 6.25) / 2 ≈ 9.81 m². Total: 40 + 9.81 ≈ 49.81 m²',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Has dominado el cálculo de áreas de figuras compuestas."
    />
  );
}
