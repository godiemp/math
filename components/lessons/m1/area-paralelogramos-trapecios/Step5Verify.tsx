'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question:
      'Un paralelogramo tiene base 9 cm y altura 7 cm. ¿Cuál es su área?',
    options: ['32 cm²', '63 cm²', '31.5 cm²', '16 cm²'],
    correctAnswer: 1,
    explanation: 'Área del paralelogramo = b × h = 9 × 7 = 63 cm²',
  },
  {
    id: 'q2',
    question:
      'Un trapecio tiene bases de 8 m y 4 m, con altura 5 m. ¿Cuál es su área?',
    options: ['20 m²', '40 m²', '30 m²', '60 m²'],
    correctAnswer: 2,
    explanation:
      'Área del trapecio = ½ × (B + b) × h = ½ × (8 + 4) × 5 = ½ × 12 × 5 = 30 m²',
  },
  {
    id: 'q3',
    question:
      'Un paralelogramo tiene base 12 m y altura 5 m. ¿Cuál es su área?',
    options: ['17 m²', '30 m²', '60 m²', '120 m²'],
    correctAnswer: 2,
    explanation: 'Área del paralelogramo = b × h = 12 × 5 = 60 m²',
  },
  {
    id: 'q4',
    question:
      'Un trapecio tiene bases de 14 cm y 10 cm, con altura 6 cm. ¿Cuál es su área?',
    options: ['84 cm²', '72 cm²', '60 cm²', '48 cm²'],
    correctAnswer: 1,
    explanation:
      'Área del trapecio = ½ × (B + b) × h = ½ × (14 + 10) × 6 = ½ × 24 × 6 = 72 cm²',
  },
];

export default function Step5Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado el cálculo de áreas de paralelogramos y trapecios!"
    />
  );
}
