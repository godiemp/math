'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'v1',
    question: '¿Cuál es el valor de x en la ecuación 5x - 3 = 17?',
    options: ['x = 2', 'x = 4', 'x = 14/5', 'x = 20'],
    correctAnswer: 1, // x = 4
    explanation: '5x = 17 + 3 = 20, entonces x = 20 / 5 = 4',
  },
  {
    id: 'v2',
    question: 'Resuelve: 2(x + 3) = 14',
    options: ['x = 4', 'x = 5.5', 'x = 7', 'x = 8'],
    correctAnswer: 0, // x = 4
    explanation: '2x + 6 = 14 → 2x = 8 → x = 4',
  },
  {
    id: 'v3',
    question: '¿Cuál es la solución de 3x + 5 = x + 13?',
    options: ['x = 3', 'x = 4', 'x = 6', 'x = 9'],
    correctAnswer: 1, // x = 4
    explanation: '3x - x = 13 - 5 → 2x = 8 → x = 4',
  },
  {
    id: 'v4',
    question: 'Resuelve: 4x - 7 = 2x + 5',
    options: ['x = 1', 'x = 6', 'x = -1', 'x = 12'],
    correctAnswer: 1, // x = 6
    explanation: '4x - 2x = 5 + 7 → 2x = 12 → x = 6',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado las ecuaciones lineales! Ahora puedes resolver cualquier ecuación de primer grado."
    />
  );
}
