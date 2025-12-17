'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Un circulo tiene radio 5 cm. ¿Cual es su area? (Usa π ≈ 3.14)',
    options: ['78.5 cm²', '31.4 cm²', '15.7 cm²', '157 cm²'],
    correctAnswer: 0,
    explanation: 'Area = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 cm²',
  },
  {
    id: 'q2',
    question: 'Una rueda tiene diametro 50 cm. ¿Cual es su circunferencia?',
    options: ['157 cm', '7850 cm²', '314 cm', '1962.5 cm²'],
    correctAnswer: 0,
    explanation: 'Circunferencia = πd = 3.14 × 50 = 157 cm',
  },
  {
    id: 'q3',
    question: 'Si la circunferencia de un circulo es 62.8 cm, ¿cual es su diametro?',
    options: ['10 cm', '20 cm', '5 cm', '40 cm'],
    correctAnswer: 1,
    explanation: 'C = πd → d = C ÷ π = 62.8 ÷ 3.14 = 20 cm',
  },
  {
    id: 'q4',
    question: '¿Cual formula da el area de un circulo?',
    options: ['A = πd', 'A = 2πr', 'A = πr²', 'A = πd²'],
    correctAnswer: 2,
    explanation: 'El area de un circulo es A = πr² (pi por radio al cuadrado)',
  },
];

export default function Step5Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="Has dominado las formulas del circulo"
    />
  );
}
