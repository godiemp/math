'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué indica el discriminante $\\Delta = b^2 - 4ac$ sobre las soluciones de una ecuación cuadrática?',
    options: [
      'Si $\\Delta > 0$ no hay soluciones reales',
      'Si $\\Delta = 0$ hay dos soluciones diferentes',
      'Si $\\Delta < 0$ no hay soluciones reales',
      'El discriminante no afecta las soluciones',
    ],
    correctAnswer: 2,
    explanation: 'Cuando $\\Delta < 0$, la raíz cuadrada de un número negativo no es real, por lo que no hay soluciones reales. Si $\\Delta > 0$, hay dos soluciones; si $\\Delta = 0$, hay una solución repetida.',
  },
  {
    id: 'q2',
    question: 'Resuelve: $x^2 + 6x + 5 = 0$',
    options: ['$x = -1$ y $x = -5$', '$x = 1$ y $x = 5$', '$x = -1$ y $x = 5$', '$x = 1$ y $x = -5$'],
    correctAnswer: 0,
    explanation: '$a = 1$, $b = 6$, $c = 5$. $\\Delta = 36 - 20 = 16$. $x = \\frac{-6 \\pm 4}{2}$. Entonces $x = \\frac{-2}{2} = -1$ y $x = \\frac{-10}{2} = -5$.',
  },
  {
    id: 'q3',
    question: '¿Cuántas soluciones reales tiene $x^2 + 1 = 0$?',
    options: ['Ninguna', 'Una', 'Dos', 'Infinitas'],
    correctAnswer: 0,
    explanation: '$a = 1$, $b = 0$, $c = 1$. $\\Delta = 0 - 4(1)(1) = -4$. Como $\\Delta < 0$, no hay soluciones reales.',
  },
  {
    id: 'q4',
    question: 'Si el discriminante es 49, ¿cuáles son los posibles valores de $\\pm\\sqrt{\\Delta}$?',
    options: ['$\\pm 49$', '$\\pm 24.5$', '$\\pm 7$', '$\\pm 14$'],
    correctAnswer: 2,
    explanation: 'El discriminante $\\Delta = 49$, entonces $\\sqrt{\\Delta} = \\sqrt{49} = 7$. Los valores $\\pm\\sqrt{\\Delta}$ son $+7$ y $-7$.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      title="Checkpoint: Fórmula Cuadrática"
      subtitle="Demuestra lo que aprendiste sobre la fórmula cuadrática"
      successMessage="¡Excelente! Dominas la fórmula cuadrática"
    />
  );
}
