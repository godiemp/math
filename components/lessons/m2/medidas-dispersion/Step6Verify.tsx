'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cual es el RANGO del conjunto de datos: 5, 12, 8, 3, 10?',
    options: ['5', '7', '9', '12'],
    correctAnswer: 2,
    explanation: 'El rango = Maximo - Minimo = 12 - 3 = 9',
  },
  {
    id: 'q2',
    question: '¿Que mide la DESVIACION ESTANDAR?',
    options: [
      'El valor mas frecuente de los datos',
      'La diferencia entre el mayor y el menor',
      'Que tan dispersos estan los datos respecto a la media',
      'El valor central de los datos ordenados',
    ],
    correctAnswer: 2,
    explanation: 'La desviacion estandar mide que tan dispersos (alejados) estan los datos respecto a la media.',
  },
  {
    id: 'q3',
    question: 'Si la varianza de un conjunto de datos es 25, ¿cual es la desviacion estandar?',
    options: ['5', '12.5', '25', '625'],
    correctAnswer: 0,
    explanation: 'La desviacion estandar es la raiz cuadrada de la varianza: √25 = 5',
  },
  {
    id: 'q4',
    question: '¿Cual de estos conjuntos de datos tiene MAYOR dispersion?',
    options: [
      'A: 10, 10, 10, 10, 10',
      'B: 8, 9, 10, 11, 12',
      'C: 5, 8, 10, 12, 15',
      'D: 1, 5, 10, 15, 19',
    ],
    correctAnswer: 3,
    explanation: 'El conjunto D tiene el mayor rango (19-1=18) y sus valores estan mas alejados de la media.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas las medidas de dispersion! Ahora puedes analizar que tan variables son los datos."
    />
  );
}
