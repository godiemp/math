'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué significa "distribuir" en matemáticas?',
    options: [
      'Sumar los números de afuera y adentro',
      'Multiplicar el factor externo por CADA término interno',
      'Solo multiplicar el primer término',
    ],
    correctAnswer: 1,
    explanation:
      'Distribuir significa que el factor de afuera multiplica a cada uno de los términos dentro del paréntesis, como repartir algo a todos.',
  },
  {
    id: 'q2',
    question: '¿Cuál de estas simplificaciones tiene un ERROR?',
    options: [
      '3(x + 4) = 3x + 12',
      '-2(y - 3) = -2y + 6',
      '5(2x + 1) = 10x + 1',
    ],
    correctAnswer: 2,
    explanation:
      'El error está en C: 5 debe multiplicar AMBOS términos. 5 × 2x = 10x y 5 × 1 = 5, así que el resultado correcto es 10x + 5.',
  },
  {
    id: 'q3',
    question: 'Simplifica completamente: 2(x + 4) + 3(x - 1)',
    options: ['5x + 5', '5x + 11', '6x + 5'],
    correctAnswer: 0,
    explanation:
      '2(x + 4) + 3(x - 1) = 2x + 8 + 3x - 3 = 5x + 5. Primero distribuimos cada factor, luego combinamos términos semejantes.',
  },
  {
    id: 'q4',
    question:
      '¿Por qué es importante conocer términos semejantes ANTES de aprender la propiedad distributiva?',
    options: [
      'No tiene relación',
      'Porque después de distribuir, generalmente necesitas combinar términos semejantes',
      'Porque es más fácil',
    ],
    correctAnswer: 1,
    explanation:
      'La propiedad distributiva crea nuevos términos que a menudo deben combinarse. Por ejemplo, 2(x + 1) + 3x = 2x + 2 + 3x = 5x + 2. Usamos distribución Y combinación de términos semejantes.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado la propiedad distributiva!"
    />
  );
}
