'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Si dos rectas se intersectan en un único punto, el sistema tiene:',
    options: ['Sin solución', 'Una solución única', 'Infinitas soluciones', 'Dos soluciones'],
    correctAnswer: 1,
    explanation: 'Cuando dos rectas se cruzan en exactamente un punto, ese punto es la única solución del sistema.',
  },
  {
    id: 'q2',
    question: '¿Qué significa gráficamente que un sistema no tenga solución?',
    options: [
      'Las rectas se cruzan en el origen',
      'Las rectas son paralelas',
      'Las rectas son la misma línea',
      'Las rectas se cruzan en dos puntos',
    ],
    correctAnswer: 1,
    explanation: 'Si las rectas son paralelas, nunca se cruzan, por lo tanto no existe ningún punto que satisfaga ambas ecuaciones.',
  },
  {
    id: 'q3',
    question: 'Para graficar la recta 2x + y = 6, un método útil es:',
    options: [
      'Encontrar los cortes con los ejes',
      'Usar solo la pendiente',
      'Calcular el área bajo la curva',
      'Encontrar el máximo de la función',
    ],
    correctAnswer: 0,
    explanation: 'Encontrar los cortes con los ejes (x=0 da y=6, y=0 da x=3) permite graficar la recta fácilmente con dos puntos.',
  },
  {
    id: 'q4',
    question: 'Si al graficar un sistema obtienes que ambas ecuaciones son la misma recta, entonces:',
    options: ['No hay solución', 'Hay una solución única', 'Hay exactamente dos soluciones', 'Hay infinitas soluciones'],
    correctAnswer: 3,
    explanation: 'Si ambas ecuaciones representan la misma recta, todos los puntos de esa recta satisfacen ambas ecuaciones, dando infinitas soluciones.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas el método gráfico para sistemas 2x2!"
    />
  );
}
