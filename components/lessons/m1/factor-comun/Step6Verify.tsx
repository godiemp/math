'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el factor común de 12x² + 18x?',
    options: ['2x', '6x', '6', '12x'],
    correctAnswer: 1,
    explanation:
      'MCD(12,18) = 6, y ambos términos tienen x. El factor común es 6x. Resultado: 6x(2x + 3).',
  },
  {
    id: 'q2',
    question: 'Factoriza: 8a + 12b',
    options: ['4(2a + 3b)', '2(4a + 6b)', '8(a + 1.5b)', '4(a + 3b)'],
    correctAnswer: 0,
    explanation:
      'MCD(8,12) = 4. Entonces 8a + 12b = 4(2a) + 4(3b) = 4(2a + 3b).',
  },
  {
    id: 'q3',
    question: '¿Cuál expresión está correctamente factorizada?',
    options: [
      '3x² + 6x = 3(x² + 2x)',
      '3x² + 6x = x(3x + 6)',
      '3x² + 6x = 3x(x + 2)',
      '3x² + 6x = 6x(0.5x + 1)',
    ],
    correctAnswer: 2,
    explanation:
      'El factor común completo es 3x (MCD=3, menor potencia de x es x¹). 3x(x + 2) es la factorización correcta.',
  },
  {
    id: 'q4',
    question: 'Factoriza: x³ + x² + x',
    options: [
      'x³(1 + x + x²)',
      'x(x² + x + 1)',
      'x²(x + 1 + 1/x)',
      'No se puede factorizar',
    ],
    correctAnswer: 1,
    explanation:
      'La menor potencia de x en todos los términos es x¹. Factor común: x. Resultado: x(x² + x + 1).',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado la factorización por factor común!"
    />
  );
}
