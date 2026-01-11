'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Un terremoto de magnitud 7.0 comparado con uno de 4.0 tiene:',
    options: [
      '3 veces más amplitud',
      '30 veces más amplitud',
      '300 veces más amplitud',
      '1000 veces más amplitud',
    ],
    correctAnswer: 3,
    explanation: '3 puntos de diferencia en Richter = 10³ = 1000 veces más amplitud.',
  },
  {
    id: 'q2',
    question: 'Si un sonido aumenta de 50 dB a 90 dB, la intensidad aumentó:',
    options: [
      '40 veces',
      '400 veces',
      '4.000 veces',
      '10.000 veces',
    ],
    correctAnswer: 3,
    explanation: '40 dB de diferencia = 4 grupos de 10 dB = 10⁴ = 10.000 veces más intenso.',
  },
  {
    id: 'q3',
    question: 'Una sustancia con pH 2 es _____ que una con pH 5.',
    options: [
      '3 veces más ácida',
      '30 veces más ácida',
      '1000 veces más ácida',
      'Menos ácida',
    ],
    correctAnswer: 2,
    explanation: '3 puntos menos en pH = 10³ = 1000 veces más concentración de H⁺ (más ácido).',
  },
  {
    id: 'q4',
    question: '¿Por qué usamos escalas logarítmicas para terremotos, sonido y pH?',
    options: [
      'Porque son más precisas',
      'Porque comprimen rangos enormes en escalas manejables',
      'Porque son más difíciles de calcular',
      'Porque dan números más pequeños',
    ],
    correctAnswer: 1,
    explanation: 'Los logaritmos comprimen rangos de millones o billones en escalas de 0-14 (pH) o 0-10 (Richter).',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas las aplicaciones reales de los logaritmos."
    />
  );
}
