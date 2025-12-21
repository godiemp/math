'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Un cono tiene radio 4 cm y altura 9 cm. ¿Cual es su volumen? (Usa π ≈ 3.14)',
    options: ['150.72 cm³', '452.16 cm³', '113.04 cm³', '48 cm³'],
    correctAnswer: 0,
    explanation: 'V = (1/3) × π × r² × h = (1/3) × 3.14 × 16 × 9 = (1/3) × 452.16 = 150.72 cm³',
  },
  {
    id: 'q2',
    question: '¿Cual es la relacion entre el volumen de un cono y un cilindro con la misma base y altura?',
    options: [
      'El cono es 1/2 del cilindro',
      'El cono es 1/3 del cilindro',
      'El cono es 2/3 del cilindro',
      'Son iguales',
    ],
    correctAnswer: 1,
    explanation: 'El volumen del cono es exactamente 1/3 del volumen del cilindro con la misma base y altura. Por eso V = (1/3)πr²h.',
  },
  {
    id: 'q3',
    question: 'Un estudiante calcula V = 3.14 × 5² × 10 = 785 cm³ para un cono. ¿Cual fue su ERROR?',
    options: [
      'No elevo al cuadrado el radio',
      'Uso el diametro en vez del radio',
      'Olvido dividir entre 3',
      'Multiplico mal los numeros',
    ],
    correctAnswer: 2,
    explanation: 'El error fue olvidar el factor 1/3. Calculo el volumen del CILINDRO, no del cono. El volumen correcto es 785 ÷ 3 ≈ 261.67 cm³.',
  },
  {
    id: 'q4',
    question: 'Un cono tiene diametro 12 cm y altura 7 cm. ¿Cual es su volumen? (Usa π ≈ 3.14)',
    options: ['87.92 cm³', '263.76 cm³', '791.28 cm³', '131.88 cm³'],
    correctAnswer: 1,
    explanation: 'Radio = d/2 = 6 cm. V = (1/3) × 3.14 × 6² × 7 = (1/3) × 3.14 × 36 × 7 = (1/3) × 791.28 = 263.76 cm³',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="Has dominado el volumen del cono"
    />
  );
}
