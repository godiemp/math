'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué representa "un número" en lenguaje algebraico?',
    options: ['Un valor fijo como 5', 'Una variable como $x$', 'Una operación', 'Un resultado'],
    correctAnswer: 1,
    explanation:
      '"Un número" o "una cantidad desconocida" se representa con una variable, generalmente x.',
  },
  {
    id: 'q2',
    question: '¿Cuál es la traducción de "La suma de un número y siete"?',
    options: ['$x - 7$', '$7x$', '$x + 7$', '$\\frac{x}{7}$'],
    correctAnswer: 2,
    explanation: '"Suma" indica la operación de sumar (+). Un número (x) más siete = x + 7.',
  },
  {
    id: 'q3',
    question: '¿Cuál es la traducción de "5 menos que un número"?',
    options: ['$5 - x$', '$x - 5$', '$x + 5$', '$5x$'],
    correctAnswer: 1,
    explanation:
      '¡Cuidado con el orden! "5 menos que x" significa que a x le quitamos 5, es decir: x - 5.',
  },
  {
    id: 'q4',
    question: '¿Cuál es la traducción de "El doble de un número, disminuido en cuatro"?',
    options: ['$2x + 4$', '$2(x - 4)$', '$2x - 4$', '$\\frac{2x}{4}$'],
    correctAnswer: 2,
    explanation:
      '"El doble" es 2x, y "disminuido en cuatro" significa restar 4. Resultado: 2x - 4.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas el lenguaje algebraico."
    />
  );
}
