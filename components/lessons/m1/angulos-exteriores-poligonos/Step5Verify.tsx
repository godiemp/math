'use client';

import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';
import { LessonStepProps } from '@/lib/lessons/types';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es la suma de los ángulos exteriores de un heptágono (7 lados)?',
    options: ['360°', '900°', '1260°', '514°'],
    correctAnswer: 0,
    explanation:
      'La suma de ángulos exteriores es SIEMPRE 360° para cualquier polígono convexo, sin importar el número de lados.',
  },
  {
    id: 'q2',
    question: 'Un polígono regular tiene ángulos exteriores de 30°. ¿Cuántos lados tiene?',
    options: ['6 lados', '10 lados', '12 lados', '15 lados'],
    correctAnswer: 2,
    explanation: 'n = 360° ÷ 30° = 12 lados (dodecágono)',
  },
  {
    id: 'q3',
    question:
      'Si el ángulo interior de un polígono regular es 150°, ¿cuál es su ángulo exterior?',
    options: ['150°', '30°', '60°', '210°'],
    correctAnswer: 1,
    explanation: 'Exterior = 180° − Interior = 180° − 150° = 30°',
  },
  {
    id: 'q4',
    question: '¿Cuál es la razón geométrica por la que los ángulos exteriores siempre suman 360°?',
    options: [
      'Porque hay más ángulos en polígonos grandes',
      'Porque al caminar alrededor, giras una vuelta completa',
      'Porque depende del número de lados',
      'Porque interior + exterior = 360°',
    ],
    correctAnswer: 1,
    explanation:
      'Al caminar por el perímetro de un polígono y girar en cada vértice, completas exactamente una vuelta de 360°.',
  },
];

export default function Step5Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas los ángulos exteriores de polígonos!"
    />
  );
}
