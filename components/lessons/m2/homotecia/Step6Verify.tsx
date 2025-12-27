'use client';

import CheckpointQuiz, { CheckpointQuestion } from '@/components/lessons/shared/CheckpointQuiz';
import { LessonStepProps } from '@/lib/lessons/types';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Un triángulo se transforma con k = 2. Si un lado mide 5 cm, ¿cuánto mide el lado correspondiente en la imagen?',
    options: ['2.5 cm', '7 cm', '10 cm', '25 cm'],
    correctAnswer: 2,
    explanation: 'Las longitudes se multiplican por |k|: lado imagen = 5 × 2 = 10 cm.',
  },
  {
    id: 'q2',
    question: 'Una figura tiene un área de 16 cm². Si se aplica una homotecia con k = 3, ¿cuál es el área de la imagen?',
    options: ['48 cm²', '144 cm²', '64 cm²', '9 cm²'],
    correctAnswer: 1,
    explanation:
      'Las áreas se multiplican por k² (porque ambas dimensiones se multiplican por k): Área imagen = 16 × 3² = 16 × 9 = 144 cm².',
  },
  {
    id: 'q3',
    question: 'Si la imagen está al lado opuesto del centro y es más pequeña que la figura original, ¿qué podemos afirmar sobre k?',
    options: ['k > 1', '0 < k < 1', '-1 < k < 0', 'k < -1'],
    correctAnswer: 2,
    explanation:
      'k negativo → inversión (lado opuesto del centro). |k| < 1 → reducción. Por lo tanto: -1 < k < 0.',
  },
  {
    id: 'q4',
    question: 'Una figura se transforma con k = -0.5. ¿Qué podemos afirmar sobre la imagen?',
    options: [
      'Es más grande y está al mismo lado',
      'Es más pequeña y está al mismo lado',
      'Es más grande y está al lado opuesto',
      'Es más pequeña y está al lado opuesto',
    ],
    correctAnswer: 3,
    explanation:
      'k = -0.5: Como -1 < k < 0, la imagen es REDUCIDA (|k| = 0.5 < 1) e INVERTIDA (k negativo = lado opuesto del centro).',
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
