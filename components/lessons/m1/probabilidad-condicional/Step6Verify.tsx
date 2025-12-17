'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Si P(A) = 0.3, P(B) = 0.5, y P(A ∩ B) = 0.15, ¿cuál es P(A | B)?',
    options: ['0.15', '0.30', '0.50', '0.60'],
    correctAnswer: 1,
    explanation: 'P(A | B) = P(A ∩ B) / P(B) = 0.15 / 0.5 = 0.30',
  },
  {
    id: 'q2',
    question: '¿Cuál de las siguientes situaciones describe eventos INDEPENDIENTES?',
    options: [
      'Sacar 2 cartas sin devolverlas',
      'Lanzar 2 dados diferentes',
      'Lluvia hoy y lluvia mañana',
      'Estudiar y aprobar un examen',
    ],
    correctAnswer: 1,
    explanation: 'Lanzar 2 dados diferentes son eventos independientes porque el resultado de uno no afecta al otro. Las otras opciones describen eventos dependientes.',
  },
  {
    id: 'q3',
    question: 'Si A y B son independientes con P(A) = 0.4 y P(B) = 0.5, ¿cuál es P(A ∩ B)?',
    options: ['0.9', '0.45', '0.20', '0.10'],
    correctAnswer: 2,
    explanation: 'Para eventos independientes: P(A ∩ B) = P(A) × P(B) = 0.4 × 0.5 = 0.20',
  },
  {
    id: 'q4',
    question: 'Una urna tiene 5 bolas rojas y 3 azules. Se saca una bola roja y NO se devuelve. ¿Cuál es P(roja en la 2da extracción)?',
    options: ['5/8', '4/8', '4/7', '5/7'],
    correctAnswer: 2,
    explanation: 'Después de sacar una roja, quedan 4 rojas de 7 bolas totales. P(roja₂ | roja₁) = 4/7',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas la probabilidad condicional y los eventos independientes."
    />
  );
}
