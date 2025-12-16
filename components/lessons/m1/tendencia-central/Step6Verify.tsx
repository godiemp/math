'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cual es la MEDIA de los datos: 8, 10, 12, 14, 16?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    explanation: 'Media = (8 + 10 + 12 + 14 + 16) / 5 = 60 / 5 = 12',
  },
  {
    id: 'q2',
    question: '¿Cual es la MEDIANA de: 15, 8, 12, 20, 10?',
    options: ['10', '12', '13', '15'],
    correctAnswer: 1,
    explanation:
      'Ordenados: 8, 10, [12], 15, 20. Con 5 datos (impar), la mediana es el valor central: 12',
  },
  {
    id: 'q3',
    question: 'Con 6 datos: 4, 8, 12, 16, 20, 24, ¿cual es la MEDIANA?',
    options: ['12', '14', '16', '13'],
    correctAnswer: 1,
    explanation:
      'Con cantidad PAR, promediamos los 2 del medio: (12 + 16) / 2 = 14',
  },
  {
    id: 'q4',
    question: 'El conjunto [5, 7, 5, 9, 7, 3, 5, 7] tiene:',
    options: ['Una moda: 5', 'Una moda: 7', 'Dos modas: 5 y 7', 'Sin moda'],
    correctAnswer: 2,
    explanation:
      'El 5 aparece 3 veces y el 7 aparece 3 veces. Es BIMODAL con modas 5 y 7.',
  },
  {
    id: 'q5',
    question:
      'Sueldos: $400k, $450k, $500k, $550k, $2000k. ¿Que medida representa mejor el sueldo tipico?',
    options: [
      'Media ($780k)',
      'Mediana ($500k)',
      'Moda (no hay)',
      'Rango ($1600k)',
    ],
    correctAnswer: 1,
    explanation:
      'La mediana ($500k) es mejor porque no se afecta por el valor extremo de $2000k. La media ($780k) esta inflada por ese outlier.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="¡Has dominado las medidas de tendencia central!"
    />
  );
}
