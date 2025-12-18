'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Si 2 kg de arroz cuestan $1.600, ¿cuánto cuestan 5 kg?',
    options: [
      '$3.200',
      '$4.000',
      '$8.000',
    ],
    correctAnswer: 1,
    explanation: 'Proporción directa: k = 1600 ÷ 2 = 800 $/kg. Precio = 800 × 5 = $4.000',
  },
  {
    id: 'q2',
    question: '3 pintores pintan una casa en 8 días. ¿Cuánto tardan 6 pintores?',
    options: [
      '16 días',
      '4 días',
      '24 días',
    ],
    correctAnswer: 1,
    explanation: 'Proporción inversa: k = 3 × 8 = 24. Días = 24 ÷ 6 = 4 días',
  },
  {
    id: 'q3',
    question: 'El precio de gasolina y litros comprados tienen proporción:',
    options: [
      'Inversa (más litros = menos precio)',
      'Directa (más litros = más precio)',
      'No tienen proporción',
    ],
    correctAnswer: 1,
    explanation: 'Es proporción directa: cuantos más litros compras, más pagas.',
  },
  {
    id: 'q4',
    question: 'Si x · y = 12 es constante, cuando x = 3, ¿cuánto vale y?',
    options: [
      'y = 4',
      'y = 9',
      'y = 36',
    ],
    correctAnswer: 0,
    explanation: 'Si x · y = 12, entonces y = 12 ÷ x = 12 ÷ 3 = 4',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      title="Checkpoint"
      successMessage="Has demostrado que puedes identificar y calcular proporciones directas e inversas. ¡Ahora puedes aplicar estas habilidades en problemas de la vida real!"
    />
  );
}
