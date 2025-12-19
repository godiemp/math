'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el valor de √196?',
    options: ['12', '13', '14', '15'],
    correctAnswer: 2,
    explanation: '√196 = 14 porque 14² = 14 × 14 = 196.',
  },
  {
    id: 'q2',
    question: '¿Cuál es el valor de ∛(-64)?',
    options: ['No existe', '-4', '4', '-8'],
    correctAnswer: 1,
    explanation: '∛(-64) = -4 porque (-4)³ = (-4) × (-4) × (-4) = -64. Las raíces cúbicas de números negativos existen.',
  },
  {
    id: 'q3',
    question: '¿Cómo se escribe ⁵√a usando exponente fraccionario?',
    options: ['a⁵', 'a^(5)', 'a^(1/5)', '5a'],
    correctAnswer: 2,
    explanation: 'La raíz n-ésima se escribe como exponente 1/n. Por lo tanto, ⁵√a = a^(1/5).',
  },
  {
    id: 'q4',
    question: 'Si ⁿ√32 = 2, ¿cuál es el valor de n?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Si ⁿ√32 = 2, entonces 2ⁿ = 32. Como 2⁵ = 32, entonces n = 5.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas los conceptos de raíces enésimas."
    />
  );
}
