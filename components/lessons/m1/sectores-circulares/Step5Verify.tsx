'use client';

import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';
import { LessonStepProps } from '@/lib/lessons/types';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cual es la longitud del arco de un sector de 90° con radio 10 m?',
    options: ['5π m ≈ 15.71 m', '10π m ≈ 31.42 m', '25π m ≈ 78.54 m', '100π m ≈ 314.16 m'],
    correctAnswer: 0,
    explanation: 'L = (90/360) × 2π × 10 = (1/4) × 20π = 5π ≈ 15.71 m. El arco es 1/4 de la circunferencia completa.',
  },
  {
    id: 'q2',
    question: '¿Cual es el area de un sector de 60° con radio 6 cm?',
    options: ['3π cm² ≈ 9.42 cm²', '6π cm² ≈ 18.85 cm²', '12π cm² ≈ 37.70 cm²', '36π cm² ≈ 113.10 cm²'],
    correctAnswer: 1,
    explanation: 'A = (60/360) × π × 6² = (1/6) × 36π = 6π ≈ 18.85 cm². El sector es 1/6 del circulo completo.',
  },
  {
    id: 'q3',
    question: 'Si un sector tiene angulo central de 180°, ¿que fraccion del area del circulo representa?',
    options: ['⅛', '¼', '⅓', '½'],
    correctAnswer: 3,
    explanation: '180°/360° = 1/2. Un semicirculo es exactamente la mitad del area del circulo completo.',
  },
  {
    id: 'q4',
    question: 'Un aspersor riega en un sector de 120° con alcance de 6 m. ¿Cual es el area regada?',
    options: ['6π m² ≈ 18.85 m²', '12π m² ≈ 37.70 m²', '24π m² ≈ 75.40 m²', '36π m² ≈ 113.10 m²'],
    correctAnswer: 1,
    explanation: 'A = (120/360) × π × 6² = (1/3) × 36π = 12π ≈ 37.70 m². El sector cubre 1/3 del circulo.',
  },
];

export default function Step5Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas el calculo de sectores circulares y longitud de arcos."
    />
  );
}
