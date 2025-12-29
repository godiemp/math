'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué significa log₂(32) = 5?',
    options: [
      '2 × 32 = 5',
      '2⁵ = 32',
      '32⁵ = 2',
      '5² = 32',
    ],
    correctAnswer: 1,
    explanation: 'log₂(32) = 5 significa que 2⁵ = 32. El logaritmo responde: "¿a qué exponente debo elevar 2 para obtener 32?"',
  },
  {
    id: 'q2',
    question: 'Convierte 10⁴ = 10000 a forma logarítmica',
    options: [
      'log₁₀(4) = 10000',
      'log₄(10000) = 10',
      'log₁₀(10000) = 4',
      'log₁₀₀₀₀(10) = 4',
    ],
    correctAnswer: 2,
    explanation: 'En b^y = x, la forma logarítmica es log_b(x) = y. Entonces 10⁴ = 10000 se convierte en log₁₀(10000) = 4',
  },
  {
    id: 'q3',
    question: 'Calcula: log₅(625)',
    options: ['3', '4', '5', '125'],
    correctAnswer: 1,
    explanation: '5⁴ = 625, entonces log₅(625) = 4. Multiplicamos: 5 × 5 × 5 × 5 = 625',
  },
  {
    id: 'q4',
    question: 'Un terremoto libera 10⁷ unidades de energía. En la escala de Richter (donde cada magnitud = 10× más energía), ¿qué magnitud tiene?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: 'Si la energía es 10⁷, la magnitud es log₁₀(10⁷) = 7. El logaritmo nos da el exponente.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas los logaritmos! Ahora puedes convertir entre formas exponenciales y logarítmicas."
    />
  );
}
