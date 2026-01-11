'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el valor de log₂(16) + log₂(8)?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: 'log₂(16) + log₂(8) = log₂(16×8) = log₂(128) = log₂(2⁷) = 7',
  },
  {
    id: 'q2',
    question: 'Simplifica: log₁₀(10000) - log₁₀(100)',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'log₁₀(10000) - log₁₀(100) = log₁₀(10000÷100) = log₁₀(100) = 2',
  },
  {
    id: 'q3',
    question: '¿Cuál propiedad permite simplificar 3·log₅(x) como log₅(x³)?',
    options: ['Producto', 'Cociente', 'Potencia', 'Ninguna'],
    correctAnswer: 2,
    explanation: 'La propiedad de la potencia: n·logb(x) = logb(xⁿ). Aquí 3·log₅(x) = log₅(x³)',
  },
  {
    id: 'q4',
    question: '¿Cuál expresión es INCORRECTA?',
    options: [
      'log(a·b) = log(a) + log(b)',
      'log(a/b) = log(a) - log(b)',
      'log(a+b) = log(a) + log(b)',
      'log(aⁿ) = n·log(a)',
    ],
    correctAnswer: 2,
    explanation: '¡No existe propiedad para log(a+b)! La suma dentro del log NO se puede separar.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas las propiedades de los logaritmos."
    />
  );
}
