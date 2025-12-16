'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question:
      'Al lanzar un dado, ¿cuál es la probabilidad de sacar un número mayor que 4?',
    options: ['1/6', '2/6', '3/6', '4/6'],
    correctAnswer: 1,
    explanation:
      'Los números mayores que 4 son: 5 y 6. Son 2 casos favorables de 6 posibles. P = 2/6 = 1/3',
  },
  {
    id: 'q2',
    question:
      'Si la probabilidad de lluvia es 0.4, ¿cuál es la probabilidad de que NO llueva?',
    options: ['0.4', '0.5', '0.6', '1.0'],
    correctAnswer: 2,
    explanation:
      'Usando el complemento: P(NO lluvia) = 1 - P(lluvia) = 1 - 0.4 = 0.6',
  },
  {
    id: 'q3',
    question:
      'Una bolsa tiene 3 bolas rojas, 2 azules y 5 verdes. ¿Cuál es la probabilidad de sacar una bola azul?',
    options: ['2/5', '2/10', '2/3', '5/10'],
    correctAnswer: 1,
    explanation:
      'Hay 2 bolas azules y 10 bolas en total (3+2+5=10). P(azul) = 2/10 = 1/5',
  },
  {
    id: 'q4',
    question:
      'En un mazo de 52 cartas, ¿cuál es la probabilidad de sacar un corazón?',
    options: ['1/52', '4/52', '13/52', '26/52'],
    correctAnswer: 2,
    explanation:
      'Hay 13 cartas de corazón en un mazo de 52 cartas. P(corazón) = 13/52 = 1/4',
  },
  {
    id: 'q5',
    question: '¿Cuál de estas probabilidades es imposible?',
    options: ['P = 0', 'P = 0.5', 'P = 1', 'P = 1.5'],
    correctAnswer: 3,
    explanation:
      'La probabilidad siempre está entre 0 y 1. P = 1.5 es imposible porque es mayor que 1.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="¡Has dominado los conceptos básicos de probabilidad!"
    />
  );
}
