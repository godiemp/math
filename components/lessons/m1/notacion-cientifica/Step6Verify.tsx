'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es la notación científica correcta de 5.400.000?',
    options: ['$54 \\times 10^5$', '$5,4 \\times 10^6$', '$0,54 \\times 10^7$', '$5,4 \\times 10^5$'],
    correctAnswer: 1,
    explanation: 'Movemos la coma 6 lugares a la izquierda: 5.400.000 → 5,4. El coeficiente 5,4 está entre 1 y 10, así que es $5,4 \\times 10^6$.',
  },
  {
    id: 'q2',
    question: '¿Cuál es el valor estándar de $2,8 \\times 10^{-5}$?',
    options: ['0,28', '0,028', '0,00028', '0,000028'],
    correctAnswer: 3,
    explanation: 'El exponente -5 indica mover la coma 5 lugares a la izquierda: 2,8 → 0,000028.',
  },
  {
    id: 'q3',
    question: '¿Cuál de estas expresiones NO está en notación científica correcta?',
    options: ['$3,7 \\times 10^4$', '$12 \\times 10^3$', '$1 \\times 10^0$', '$9,9 \\times 10^{-2}$'],
    correctAnswer: 1,
    explanation: '$12 \\times 10^3$ no es válida porque el coeficiente 12 no está entre 1 y 10. Debería ser $1,2 \\times 10^4$.',
  },
  {
    id: 'q4',
    question: 'Si un virus mide 0,0000003 metros, ¿cuál es su tamaño en notación científica?',
    options: ['$3 \\times 10^{-6}$ m', '$3 \\times 10^{-7}$ m', '$3 \\times 10^7$ m', '$30 \\times 10^{-8}$ m'],
    correctAnswer: 1,
    explanation: 'Contamos 7 posiciones hasta llegar al 3: $0,0000003 = 3 \\times 10^{-7}$ metros.',
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
