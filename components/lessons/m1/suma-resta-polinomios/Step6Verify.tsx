'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el resultado de (3x² + 4x - 2) + (x² - 2x + 5)?',
    options: ['4x² + 2x + 3', '4x² + 6x + 3', '2x² + 2x + 3', '4x² + 2x - 7'],
    correctAnswer: 0,
    explanation: '(3x² + x²) + (4x - 2x) + (-2 + 5) = 4x² + 2x + 3',
  },
  {
    id: 'q2',
    question: '¿Cuál es el resultado de (5x² - 3x + 1) - (2x² + x - 4)?',
    options: ['3x² - 4x + 5', '3x² - 2x - 3', '7x² - 4x + 5', '3x² - 4x - 3'],
    correctAnswer: 0,
    explanation: 'Al restar, cambiamos signos: (5x² - 2x²) + (-3x - x) + (1 + 4) = 3x² - 4x + 5',
  },
  {
    id: 'q3',
    question: 'Al calcular (2x + 3) - (5x - 1), ¿cuál es el coeficiente del término en x?',
    options: ['-3', '7', '3', '-7'],
    correctAnswer: 0,
    explanation: '(2x + 3) - (5x - 1) = 2x + 3 - 5x + 1 = (2 - 5)x + 4 = -3x + 4. El coeficiente es -3.',
  },
  {
    id: 'q4',
    question: '¿Cuál es el resultado de (x³ + 2x² - x) + (3x² + 4x - 5)?',
    options: ['x³ + 5x² + 3x - 5', 'x³ + 6x² + 3x - 5', '4x³ + 5x² + 3x - 5', 'x³ + 5x² - 5x - 5'],
    correctAnswer: 0,
    explanation: '(x³) + (2x² + 3x²) + (-x + 4x) + (-5) = x³ + 5x² + 3x - 5',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Has dominado la suma y resta de polinomios."
    />
  );
}
