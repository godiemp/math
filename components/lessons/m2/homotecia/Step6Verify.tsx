'use client';

import CheckpointQuiz, { CheckpointQuestion } from '@/components/lessons/shared/CheckpointQuiz';
import { LessonStepProps } from '@/lib/lessons/types';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Si el punto P(3, 4) se transforma con centro O(0, 0) y k = 2, ¿cuáles son las coordenadas de P\'?',
    options: ['(1.5, 2)', '(6, 8)', '(5, 6)', '(3, 4)'],
    correctAnswer: 1,
    explanation: 'Con centro en el origen: P\' = k × P = 2 × (3, 4) = (6, 8). Cada coordenada se multiplica por k.',
  },
  {
    id: 'q2',
    question: 'Una figura tiene un área de 16 cm². Si se aplica una homotecia con k = 3, ¿cuál es el área de la imagen?',
    options: ['48 cm²', '144 cm²', '64 cm²', '9 cm²'],
    correctAnswer: 1,
    explanation: 'Las áreas se multiplican por k²: Área\' = 16 × 3² = 16 × 9 = 144 cm².',
  },
  {
    id: 'q3',
    question: 'Si la imagen está al lado opuesto del centro y es más pequeña que la figura original, ¿qué podemos afirmar sobre k?',
    options: ['k > 1', '0 < k < 1', '-1 < k < 0', 'k < -1'],
    correctAnswer: 2,
    explanation: 'k negativo indica inversión (lado opuesto). |k| < 1 indica reducción. Por lo tanto: -1 < k < 0.',
  },
  {
    id: 'q4',
    question: 'Si A(5, 3) se transforma con centro O(1, 1) y k = 2, ¿cuáles son las coordenadas de A\'?',
    options: ['(10, 6)', '(9, 5)', '(7, 4)', '(8, 5)'],
    correctAnswer: 1,
    explanation: 'A\' = O + k(A - O) = (1,1) + 2((5,3) - (1,1)) = (1,1) + 2(4,2) = (1,1) + (8,4) = (9, 5).',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      questions={QUESTIONS}
      requiredCorrect={3}
      isActive={isActive}
      onComplete={onComplete}
      title="Checkpoint: Homotecia"
      subtitle="Demuestra tu dominio de las homotecias. Necesitas 3 de 4 correctas."
      successMessage="¡Excelente! Has dominado los conceptos de homotecia."
      failureMessage="Revisa los conceptos de centro, razón k, y cómo afectan longitudes y áreas."
    />
  );
}
