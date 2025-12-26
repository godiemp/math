'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué representa la razón k en una homotecia?',
    options: [
      'El ángulo de rotación',
      'El factor de escala de la transformación',
      'La distancia al origen',
      'La coordenada x del centro',
    ],
    correctAnswer: 1,
    explanation:
      'La razón k es el factor de escala que determina cuánto se agranda o reduce la figura respecto al centro.',
  },
  {
    id: 'q2',
    question: 'Si k = -2, ¿qué tipo de homotecia es?',
    options: ['Amplificación', 'Reducción', 'Inversión', 'Identidad'],
    correctAnswer: 2,
    explanation:
      'Cuando k < 0, es una inversión. El signo negativo invierte la figura al lado opuesto del centro.',
  },
  {
    id: 'q3',
    question: 'Centro C = (0, 0), Punto P = (3, 4), k = 2. ¿Cuál es P\'?',
    options: ['(1.5, 2)', '(6, 8)', '(5, 6)', '(-6, -8)'],
    correctAnswer: 1,
    explanation: "P' = C + k·(P - C) = (0,0) + 2·(3,4) = (6, 8). Es una amplificación al doble.",
  },
  {
    id: 'q4',
    question: '¿Qué ocurre con el centro de homotecia al aplicar la transformación?',
    options: [
      'Se mueve en la misma dirección que los demás puntos',
      'Se mueve en dirección opuesta',
      'Permanece fijo (no se mueve)',
      'Desaparece del plano',
    ],
    correctAnswer: 2,
    explanation:
      'El centro C siempre permanece fijo. Es el único punto que no se mueve: C\' = C + k·(C - C) = C.',
  },
  {
    id: 'q5',
    question: 'Si 0 < k < 1, ¿qué ocurre con la figura?',
    options: [
      'Se agranda',
      'Se reduce',
      'Se invierte',
      'No cambia',
    ],
    correctAnswer: 1,
    explanation:
      'Cuando 0 < k < 1, la figura se reduce porque se multiplica por un factor menor que 1.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="¡Excelente! Dominas la homotecia vectorial."
    />
  );
}
