'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el resultado de 2/9 + 5/9?',
    options: ['7/18', '7/9', '3/9', '10/9'],
    correctAnswer: 1,
    explanation:
      '2/9 + 5/9 = (2+5)/9 = 7/9. Sumamos los numeradores y mantenemos el denominador.',
  },
  {
    id: 'q2',
    question: '¿Cuál es el resultado de 8/10 − 3/10?',
    options: ['5/10', '5/20', '11/10', '5/0'],
    correctAnswer: 0,
    explanation:
      '8/10 − 3/10 = (8−3)/10 = 5/10. También se puede simplificar a 1/2.',
  },
  {
    id: 'q3',
    question:
      'Al sumar fracciones con igual denominador, ¿qué hacemos con los denominadores?',
    options: [
      'Los sumamos',
      'Los multiplicamos',
      'Los mantenemos igual',
      'Los restamos',
    ],
    correctAnswer: 2,
    explanation:
      'Cuando las fracciones tienen el mismo denominador, este se mantiene igual. Solo operamos con los numeradores.',
  },
  {
    id: 'q4',
    question: '¿Cuál es el resultado simplificado de 4/12 + 2/12?',
    options: ['6/12', '1/2', '6/24', '2/12'],
    correctAnswer: 1,
    explanation:
      '4/12 + 2/12 = 6/12. Simplificando: 6/12 = 1/2 (dividiendo numerador y denominador entre 6).',
  },
  {
    id: 'q5',
    question: 'Si tengo 7/8 de pizza y como 3/8, ¿cuánto me queda?',
    options: ['4/8', '10/8', '4/16', '3/8'],
    correctAnswer: 0,
    explanation:
      '7/8 − 3/8 = (7−3)/8 = 4/8. Esto también equivale a 1/2 de pizza.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="¡Dominaste la suma y resta de fracciones con igual denominador!"
    />
  );
}
