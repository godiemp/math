'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el M.C.M. de 8 y 12?',
    options: ['4', '24', '96', '48'],
    correctAnswer: 1,
    explanation: 'Múltiplos de 8: 8, 16, 24... Múltiplos de 12: 12, 24... El menor común es 24.',
  },
  {
    id: 'q2',
    question: '¿Cuál de las siguientes afirmaciones sobre el M.C.M. es VERDADERA?',
    options: [
      'El M.C.M. siempre es menor que ambos números',
      'El M.C.M. siempre es mayor o igual al número más grande',
      'El M.C.M. siempre es igual al producto de los números',
      'El M.C.M. siempre es igual al M.C.D.',
    ],
    correctAnswer: 1,
    explanation: 'El M.C.M. debe contener todos los factores de ambos números, por lo que siempre es mayor o igual al mayor de ellos.',
  },
  {
    id: 'q3',
    question: 'María va al gimnasio cada 3 días y Pedro cada 5 días. Si hoy fueron juntos, ¿en cuántos días se encontrarán de nuevo?',
    options: ['8 días', '15 días', '2 días', '30 días'],
    correctAnswer: 1,
    explanation: 'M.C.M.(3, 5) = 15. Como 3 y 5 son coprimos, M.C.M. = 3 × 5 = 15.',
  },
  {
    id: 'q4',
    question: 'Si M.C.M.(a, b) = 30 y M.C.D.(a, b) = 5, ¿cuál es el producto a × b?',
    options: ['35', '150', '6', '25'],
    correctAnswer: 1,
    explanation: 'Usando la fórmula: M.C.M. × M.C.D. = a × b, entonces 30 × 5 = 150.',
  },
  {
    id: 'q5',
    question: 'Para calcular 2/9 + 5/12, necesitas expresar ambas fracciones con denominador común. ¿Cuál es el mínimo común denominador?',
    options: ['21', '36', '108', '3'],
    correctAnswer: 1,
    explanation: '9 = 3², 12 = 2²×3. M.C.M.(9, 12) = 2²×3² = 36. Este es el mínimo común denominador.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      title="Checkpoint"
      successMessage="¡Dominaste el M.C.M.! Ahora puedes encontrar denominadores comunes y sincronizar eventos."
    />
  );
}
