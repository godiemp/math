'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'v1',
    question: 'Si P(A) = 0.7, ¿cuál es P(no A)?',
    options: ['0.7', '0.3', '1.7', '0.0'],
    correctAnswer: 1,
    explanation: "P(A') = 1 - P(A) = 1 - 0.7 = 0.3",
  },
  {
    id: 'v2',
    question:
      'Una bolsa tiene 5 rojas, 4 azules, 3 verdes. ¿Cuál es P(roja O verde)?',
    options: ['5/12', '8/12', '3/12', '15/12'],
    correctAnswer: 1,
    explanation: 'Son excluyentes: P = 5/12 + 3/12 = 8/12 = 2/3',
  },
  {
    id: 'v3',
    question:
      'En una clase: 15 estudian matemáticas, 10 estudian ciencias, 5 estudian ambas. Si hay 20 estudiantes, ¿cuántos estudian al menos una?',
    options: ['25', '20', '15', '30'],
    correctAnswer: 1,
    explanation: 'Usando la regla: 15 + 10 - 5 = 20 estudiantes',
  },
  {
    id: 'v4',
    question: 'Al lanzar un dado, ¿cuál es P(número ≤ 4 O número par)?',
    options: ['4/6', '5/6', '3/6', '6/6'],
    correctAnswer: 1,
    explanation:
      'P(≤4) = 4/6, P(par) = 3/6, P(ambos: 2,4) = 2/6. Total = 4/6 + 3/6 - 2/6 = 5/6. Unión: {1,2,3,4,6} = 5 elementos.',
  },
  {
    id: 'v5',
    question: 'De una baraja de 52 cartas, ¿cuál es P(Reina O Diamante)?',
    options: ['17/52', '16/52', '13/52', '4/52'],
    correctAnswer: 1,
    explanation:
      'P = 4/52 + 13/52 - 1/52 = 16/52 (la Reina de Diamantes está en ambos)',
  },
  {
    id: 'v6',
    question: '¿Cuál afirmación es VERDADERA?',
    options: [
      'P(A o B) siempre es P(A) + P(B)',
      'P(A o B) = P(A) + P(B) - P(A y B) siempre funciona',
      "P(A') = P(A)",
      'Eventos excluyentes siempre tienen P = 0',
    ],
    correctAnswer: 1,
    explanation:
      'La fórmula general siempre funciona. Para eventos excluyentes, P(A y B) = 0, así que se reduce a la suma simple.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={5}
      successMessage="¡Has dominado las reglas de probabilidad!"
    />
  );
}
