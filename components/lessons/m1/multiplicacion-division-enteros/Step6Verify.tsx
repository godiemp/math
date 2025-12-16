'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el resultado de (−5) × (−4)?',
    options: ['20', '−20', '−9', '9'],
    correctAnswer: 0,
    explanation: 'Signos iguales (negativo × negativo) dan positivo. 5 × 4 = 20, entonces (−5) × (−4) = 20',
  },
  {
    id: 'q2',
    question: '¿Cuál es el resultado de (−18) ÷ (3)?',
    options: ['6', '−6', '15', '−15'],
    correctAnswer: 1,
    explanation: 'Signos diferentes (negativo ÷ positivo) dan negativo. 18 ÷ 3 = 6, entonces (−18) ÷ (3) = −6',
  },
  {
    id: 'q3',
    question: 'Si (−3) × □ = 15, ¿qué número va en el cuadro?',
    options: ['5', '−5', '12', '−12'],
    correctAnswer: 1,
    explanation: 'Para que negativo × algo = positivo, el algo debe ser negativo (signos iguales). (−3) × (−5) = 15',
  },
  {
    id: 'q4',
    question: '¿Cuál afirmación es VERDADERA?',
    options: [
      'Negativo × negativo = negativo',
      'Positivo ÷ negativo = positivo',
      'Negativo ÷ negativo = positivo',
      'Positivo × negativo = positivo',
    ],
    correctAnswer: 2,
    explanation: 'Negativo ÷ negativo = positivo (signos iguales dan positivo). Las otras opciones son falsas.',
  },
  {
    id: 'q5',
    question: 'Calcula: (−2) × (3) × (−1)',
    options: ['6', '−6', '5', '−5'],
    correctAnswer: 0,
    explanation: 'Paso a paso: (−2) × (3) = −6, luego (−6) × (−1) = 6. O contar signos: 2 negativos = positivo.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="Has dominado las reglas de signos en multiplicación y división de enteros."
    />
  );
}
