'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'v1',
    question:
      'El Teorema de Tales establece que si tres o mas lineas PARALELAS cortan dos transversales, entonces:',
    options: [
      'Los segmentos son todos iguales',
      'Los segmentos correspondientes son proporcionales',
      'Los angulos son iguales',
      'Las areas son iguales',
    ],
    correctAnswer: 1,
    explanation:
      'El teorema dice que los segmentos CORRESPONDIENTES en las transversales son PROPORCIONALES, no iguales.',
  },
  {
    id: 'v2',
    question: 'Si AB/BC = 2/3 y A\'B\' = 8, entonces B\'C\' es igual a:',
    options: ['10', '12', '16', '24'],
    correctAnswer: 1,
    explanation:
      'Aplicando Tales: AB/BC = A\'B\'/B\'C\' → 2/3 = 8/x → x = (3 × 8) / 2 = 24/2 = 12.',
  },
  {
    id: 'v3',
    question:
      'En un triangulo ABC, DE es paralelo a BC con D en AB y E en AC. ¿Cual de estas afirmaciones es VERDADERA?',
    options: [
      'AD = AE siempre',
      'AD/DB = AE/EC',
      'DE = BC siempre',
      'El triangulo ADE tiene la misma area que ABC',
    ],
    correctAnswer: 1,
    explanation:
      'Por el Teorema de Tales aplicado a triangulos, AD/DB = AE/EC cuando DE es paralelo a BC.',
  },
  {
    id: 'v4',
    question: 'Para aplicar el Teorema de Tales, es ESENCIAL que:',
    options: [
      'Los triangulos sean rectangulos',
      'Las lineas sean perpendiculares',
      'Las lineas cortadas sean paralelas',
      'Los segmentos sean numeros enteros',
    ],
    correctAnswer: 2,
    explanation:
      'El requisito fundamental del Teorema de Tales es que las lineas que cortan las transversales deben ser PARALELAS.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Has dominado el Teorema de Tales. Ahora puedes encontrar longitudes desconocidas usando proporciones con lineas paralelas."
    />
  );
}
