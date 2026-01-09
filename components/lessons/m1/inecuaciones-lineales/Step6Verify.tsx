'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'v1',
    question: '¿Cuándo se invierte el signo de una inecuación?',
    options: [
      'Siempre que despejamos $x$',
      'Cuando multiplicamos o dividimos por un número NEGATIVO',
      'Cuando restamos de ambos lados',
      'Cuando la solución es negativa',
    ],
    correctAnswer: 1,
    explanation: 'La regla crítica: solo al multiplicar o dividir por un número negativo se invierte el signo.',
  },
  {
    id: 'v2',
    question: 'Resuelve: $-4x \\geq 20$',
    options: ['$x \\geq -5$', '$x \\leq -5$', '$x \\geq 5$', '$x \\leq 5$'],
    correctAnswer: 1, // x <= -5
    explanation: '$-4x \\geq 20 \\rightarrow x \\leq \\frac{20}{-4} \\rightarrow x \\leq -5$ (signo invertido por dividir entre negativo)',
  },
  {
    id: 'v3',
    question: 'Si tienes 8.000 pesos y cada helado cuesta 1.500 pesos, ¿cuántos helados puedes comprar como máximo?',
    options: ['$x \\leq 5$', '$x < 5$', '$x \\leq 6$', '$x < 6$'],
    correctAnswer: 0, // x <= 5
    explanation: '$1500x \\leq 8000 \\rightarrow x \\leq 5{,}33 \\rightarrow$ máximo 5 helados',
  },
  {
    id: 'v4',
    question: '¿Cuál es el intervalo solución de $3 - 2x < 9$?',
    options: ['$x > -3$', '$x < -3$', '$x > 3$', '$x < 3$'],
    correctAnswer: 0, // x > -3
    explanation: '$-2x < 6 \\rightarrow x > -3$ (signo invertido)',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado las inecuaciones lineales! Ahora puedes resolver restricciones y límites en cualquier contexto."
    />
  );
}
