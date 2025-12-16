'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question:
      'Un rectángulo tiene base 12 cm y altura 5 cm. ¿Cuál es su área?',
    options: ['17 cm²', '60 cm²', '34 cm²', '30 cm²'],
    correctAnswer: 1,
    explanation: 'Área del rectángulo = b × h = 12 × 5 = 60 cm²',
  },
  {
    id: 'q2',
    question: 'Un triángulo tiene base 14 m y altura 6 m. ¿Cuál es su área?',
    options: ['84 m²', '20 m²', '42 m²', '21 m²'],
    correctAnswer: 2,
    explanation: 'Área del triángulo = ½ × b × h = ½ × 14 × 6 = 42 m²',
  },
  {
    id: 'q3',
    question: 'Un cuadrado tiene lado 9 cm. ¿Cuál es su área?',
    options: ['36 cm²', '81 cm²', '18 cm²', '72 cm²'],
    correctAnswer: 1,
    explanation: 'Área del cuadrado = lado × lado = 9 × 9 = 81 cm²',
  },
  {
    id: 'q4',
    question: 'Un triángulo tiene base 20 m y altura 7 m. ¿Cuál es su área?',
    options: ['140 m²', '27 m²', '70 m²', '35 m²'],
    correctAnswer: 2,
    explanation: 'Área del triángulo = ½ × b × h = ½ × 20 × 7 = 70 m²',
  },
];

export default function Step5Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado el cálculo de áreas de rectángulos y triángulos!"
    />
  );
}
