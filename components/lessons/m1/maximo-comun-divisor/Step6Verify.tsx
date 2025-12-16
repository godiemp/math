'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el M.C.D. de 16 y 24?',
    options: ['4', '6', '8', '12'],
    correctAnswer: 2,
    explanation:
      'Divisores de 16: 1, 2, 4, 8, 16. Divisores de 24: 1, 2, 3, 4, 6, 8, 12, 24. El mayor común es 8.',
  },
  {
    id: 'q2',
    question:
      'Para simplificar 24/36, dividimos numerador y denominador por:',
    options: ['6', '8', '12', '4'],
    correctAnswer: 2,
    explanation:
      'M.C.D.(24, 36) = 12. Dividiendo: 24÷12 = 2, 36÷12 = 3. Resultado: 2/3.',
  },
  {
    id: 'q3',
    question: '¿Cuál fracción ya está en su forma más simple?',
    options: ['6/9', '8/12', '7/11', '10/15'],
    correctAnswer: 2,
    explanation:
      'M.C.D.(7, 11) = 1, así que 7/11 no se puede simplificar más. Las otras tienen divisores comunes mayores a 1.',
  },
  {
    id: 'q4',
    question:
      'María quiere dividir 36 galletas y 48 dulces en bolsas idénticas sin que sobre nada. ¿Cuál es el máximo número de bolsas?',
    options: ['6 bolsas', '8 bolsas', '12 bolsas', '18 bolsas'],
    correctAnswer: 2,
    explanation:
      'M.C.D.(36, 48) = 12. Puede hacer 12 bolsas con 3 galletas y 4 dulces cada una.',
  },
  {
    id: 'q5',
    question: '¿Cuál es el M.C.D. de 15, 25 y 35?',
    options: ['5', '7', '15', '1'],
    correctAnswer: 0,
    explanation:
      '15 = 3×5, 25 = 5×5, 35 = 5×7. El único factor común es 5, así que M.C.D.(15, 25, 35) = 5.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="¡Dominaste el M.C.D.!"
    />
  );
}
