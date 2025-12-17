'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es la notación científica correcta de 5,400,000?',
    options: ['54 × 10⁵', '5.4 × 10⁶', '0.54 × 10⁷', '5.4 × 10⁵'],
    correctAnswer: 1,
    explanation: 'Movemos la coma 6 lugares a la izquierda: 5,400,000 → 5.4. El coeficiente 5.4 está entre 1 y 10, así que es 5.4 × 10⁶.',
  },
  {
    id: 'q2',
    question: '¿Cuál es el valor estándar de 2.8 × 10⁻⁵?',
    options: ['0.28', '0.028', '0.00028', '0.000028'],
    correctAnswer: 3,
    explanation: 'El exponente -5 indica mover la coma 5 lugares a la izquierda: 2.8 → 0.000028.',
  },
  {
    id: 'q3',
    question: '¿Cuál de estas expresiones NO está en notación científica correcta?',
    options: ['3.7 × 10⁴', '12 × 10³', '1 × 10⁰', '9.9 × 10⁻²'],
    correctAnswer: 1,
    explanation: '12 × 10³ no es válida porque el coeficiente 12 no está entre 1 y 10. Debería ser 1.2 × 10⁴.',
  },
  {
    id: 'q4',
    question: 'Si un virus mide 0.0000003 metros, ¿cuál es su tamaño en notación científica?',
    options: ['3 × 10⁻⁶ m', '3 × 10⁻⁷ m', '3 × 10⁷ m', '30 × 10⁻⁸ m'],
    correctAnswer: 1,
    explanation: 'Contamos 7 posiciones hasta llegar al 3: 0.0000003 = 3 × 10⁻⁷ metros.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas la notación científica! Ahora puedes escribir números muy grandes y muy pequeños como un verdadero científico."
    />
  );
}
