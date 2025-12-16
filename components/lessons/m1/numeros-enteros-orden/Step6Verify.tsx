'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Ordena de menor a mayor: 2, -5, 0, -1, 4',
    options: ['-5, -1, 0, 2, 4', '-1, -5, 0, 2, 4', '0, -1, -5, 2, 4', '-5, 0, -1, 2, 4'],
    correctAnswer: 0,
    explanation: 'En orden: -5 (más pequeño), -1, 0, 2, 4 (más grande). Recuerda que los negativos más grandes en valor absoluto son los más pequeños.',
  },
  {
    id: 'q2',
    question: '¿Cuál es mayor: -7 o -3?',
    options: ['-7', '-3', 'Son iguales'],
    correctAnswer: 1,
    explanation: '-3 es mayor que -7. Aunque 7 > 3 en valor absoluto, -3 está más a la derecha en la recta numérica.',
  },
  {
    id: 'q3',
    question: 'Calcula: |-8|',
    options: ['-8', '8', '0'],
    correctAnswer: 1,
    explanation: '|-8| = 8. El valor absoluto es la distancia al cero, siempre positiva o cero.',
  },
  {
    id: 'q4',
    question: 'Si |x| = 5, ¿cuáles son los valores posibles de x?',
    options: ['Solo 5', 'Solo -5', '5 y -5', '0'],
    correctAnswer: 2,
    explanation: 'x puede ser 5 o -5, porque ambos están a 5 pasos del cero.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="Has demostrado que entiendes los números enteros, el orden y el valor absoluto. ¡Excelente trabajo!"
    />
  );
}
