'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Datos ordenados: 10, 15, 20, 25, 30, 35, 40. ¿Cual es Q₂ (la mediana)?',
    options: ['20', '25', '27.5', '30'],
    correctAnswer: 1,
    explanation: 'Con 7 datos (impar), la mediana es el valor del medio: el 4to valor = 25.',
  },
  {
    id: 'q2',
    question: 'Con los mismos datos: 10, 15, 20, 25, 30, 35, 40. ¿Cual es Q₁?',
    options: ['10', '15', '17.5', '20'],
    correctAnswer: 1,
    explanation: 'Q₁ es la mediana de la mitad inferior (sin incluir Q₂). Mitad inferior: [10, 15, 20]. Q₁ = 15 (el del medio).',
  },
  {
    id: 'q3',
    question: 'Si Q₁ = 20 y Q₃ = 50, ¿cual es el IQR (rango intercuartilico)?',
    options: ['20', '30', '35', '70'],
    correctAnswer: 1,
    explanation: 'IQR = Q₃ - Q₁ = 50 - 20 = 30. El IQR mide la amplitud del 50% central de los datos.',
  },
  {
    id: 'q4',
    question: 'Con Q₁=10, Q₃=30 e IQR=20, ¿el valor 75 seria un outlier?',
    options: [
      'No, esta dentro del rango normal',
      'Si, es un outlier',
      'Depende del contexto',
      'No se puede determinar',
    ],
    correctAnswer: 1,
    explanation: 'Limite superior = Q₃ + 1.5×IQR = 30 + 1.5(20) = 30 + 30 = 60. Como 75 > 60, SI es un outlier.',
  },
  {
    id: 'q5',
    question: 'En un diagrama de caja (boxplot), ¿que representa la CAJA?',
    options: [
      'El rango total de los datos',
      'El rango intercuartilico (IQR) - el 50% central',
      'Los valores atipicos',
      'La media de los datos',
    ],
    correctAnswer: 1,
    explanation: 'La caja va desde Q₁ hasta Q₃, que es el IQR. Contiene el 50% central de los datos.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="¡Has dominado los cuartiles, el IQR y los boxplots!"
    />
  );
}
