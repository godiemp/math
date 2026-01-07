'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Simplifica: √(25 × 16)',
    options: ['20', '41', '400', '9'],
    correctAnswer: 0,
    explanation: '√(25×16) = √25 × √16 = 5 × 4 = 20. Aplicamos la propiedad del producto.',
  },
  {
    id: 'q2',
    question: 'Simplifica: √(144/36)',
    options: ['4', '2', '108', '180'],
    correctAnswer: 1,
    explanation: '√(144/36) = √144 / √36 = 12 / 6 = 2. Aplicamos la propiedad del cociente.',
  },
  {
    id: 'q3',
    question: '¿Cuál es el valor de √(∛64)?',
    options: ['2', '4', '8', '16'],
    correctAnswer: 0,
    explanation: '√(∛64) = ⁶√64 porque los índices se multiplican (2×3=6). Como 2⁶ = 64, entonces ⁶√64 = 2.',
  },
  {
    id: 'q4',
    question: '¿Cuál expresión es INCORRECTA?',
    options: ['√(4×9) = √4×√9', '√(16/4) = √16/√4', '√(9+16) = √9+√16', '√(√81) = ⁴√81'],
    correctAnswer: 2,
    explanation: '√(9+16) = √25 = 5, pero √9+√16 = 3+4 = 7. Las raíces NO se distribuyen sobre la suma ni la resta.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas las propiedades de raíces."
    />
  );
}
