'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question:
      'Un punto está ubicado 3 unidades a la derecha del origen y 2 unidades hacia abajo. ¿Cuáles son sus coordenadas?',
    options: ['(3, 2)', '(-3, 2)', '(3, -2)', '(2, -3)'],
    correctAnswer: 2,
    explanation:
      'Derecha significa x positivo (x = 3), abajo significa y negativo (y = -2). Las coordenadas son (3, -2).',
  },
  {
    id: 'q2',
    question: '¿En qué cuadrante se encuentra el punto (-5, 7)?',
    options: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'],
    correctAnswer: 1,
    explanation:
      'El valor x = -5 es negativo (izquierda) y el valor y = 7 es positivo (arriba). Eso corresponde al Cuadrante II.',
  },
  {
    id: 'q3',
    question: 'Si un punto tiene coordenadas (0, -4), ¿dónde se encuentra ubicado?',
    options: ['En el origen', 'Sobre el eje X', 'Sobre el eje Y', 'En el Cuadrante III'],
    correctAnswer: 2,
    explanation:
      'Cuando x = 0, el punto está sobre el eje Y. En este caso, está 4 unidades debajo del origen, sobre el eje Y.',
  },
  {
    id: 'q4',
    question:
      '¿Cuál es el punto de referencia central del plano cartesiano, desde donde se miden todas las coordenadas?',
    options: ['El punto (1, 1)', 'El Cuadrante I', 'El origen (0, 0)', 'El eje X'],
    correctAnswer: 2,
    explanation:
      'El origen (0, 0) es el punto donde se cruzan los ejes X e Y. Es el punto de referencia desde donde se miden todas las coordenadas.',
  },
];

export default function Step5Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas el sistema de coordenadas cartesianas."
    />
  );
}
