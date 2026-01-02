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
      'La razón k es el factor que estira o comprime el vector (P - C). Si k > 1 lo estira, si 0 < k < 1 lo comprime, y si k < 0 además invierte su dirección.',
  },
  {
    id: 'q2',
    question: 'Si k = -2, ¿qué tipo de homotecia es?',
    options: ['Amplificación', 'Reducción', 'Inversión', 'Identidad'],
    correctAnswer: 2,
    explanation:
      'El signo negativo invierte la dirección del vector (P - C), moviendo el punto al lado opuesto del centro. Además, |k| = 2 lo estira al doble. Por eso es inversión.',
  },
  {
    id: 'q3',
    question: "Centro C = (0, 0), Punto P = (3, 4), k = 2. ¿Cuál es P'?",
    options: ['(1.5, 2)', '(6, 8)', '(5, 6)', '(-6, -8)'],
    correctAnswer: 1,
    explanation:
      "Vector de C a P: (3, 4). Escalar ×2: el vector se estira al doble → (6, 8). Partir del centro: (0, 0) + (6, 8) = (6, 8). El punto se aleja del centro.",
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
      "Cuando P = C, el vector (P - C) = (0, 0). No importa cuánto escales el vector cero, sigue siendo cero. Por eso C' = C + k·(0, 0) = C. El centro siempre queda fijo.",
  },
  {
    id: 'q5',
    question: 'Si 0 < k < 1, ¿qué ocurre con la figura?',
    options: ['Se agranda', 'Se reduce', 'Se invierte', 'No cambia'],
    correctAnswer: 1,
    explanation:
      'Multiplicar el vector (P - C) por una fracción lo comprime. Por ejemplo, con k = 0.5 el vector se reduce a la mitad. Cada punto se acerca al centro → reducción.',
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
