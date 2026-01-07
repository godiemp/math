'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué indica el discriminante Δ = b² - 4ac sobre las soluciones de una ecuación cuadrática?',
    options: [
      'Si Δ > 0 no hay soluciones reales',
      'Si Δ = 0 hay dos soluciones diferentes',
      'Si Δ < 0 no hay soluciones reales',
      'El discriminante no afecta las soluciones',
    ],
    correctAnswer: 2,
    explanation: 'Cuando Δ < 0, la raíz cuadrada de un número negativo no es real, por lo que no hay soluciones reales. Si Δ > 0, hay dos soluciones; si Δ = 0, hay una solución repetida.',
  },
  {
    id: 'q2',
    question: 'Resuelve: x² + 6x + 5 = 0',
    options: ['x = -1 y x = -5', 'x = 1 y x = 5', 'x = -1 y x = 5', 'x = 1 y x = -5'],
    correctAnswer: 0,
    explanation: 'a = 1, b = 6, c = 5. Δ = 36 - 20 = 16. x = (-6 ± 4) / 2. Entonces x = -2/2 = -1 y x = -10/2 = -5.',
  },
  {
    id: 'q3',
    question: '¿Cuántas soluciones reales tiene x² + 1 = 0?',
    options: ['Ninguna', 'Una', 'Dos', 'Infinitas'],
    correctAnswer: 0,
    explanation: 'a = 1, b = 0, c = 1. Δ = 0 - 4(1)(1) = -4. Como Δ < 0, no hay soluciones reales.',
  },
  {
    id: 'q4',
    question: 'Si el discriminante es 49, ¿cuáles son los posibles valores de ±√Δ?',
    options: ['±49', '±24.5', '±7', '±14'],
    correctAnswer: 2,
    explanation: 'El discriminante Δ = 49, entonces √Δ = √49 = 7. Los valores ±√Δ son +7 y -7.',
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
