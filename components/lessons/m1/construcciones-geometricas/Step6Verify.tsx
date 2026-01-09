'use client';

import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';
import { LessonStepProps } from '@/lib/lessons/types';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué construcción divide un segmento en dos partes iguales?',
    options: ['Bisectriz', 'Mediatriz', 'Perpendicular desde punto', 'Paralela'],
    correctAnswer: 1,
    explanation:
      'La mediatriz es la recta perpendicular que pasa por el punto medio del segmento, dividiéndolo en dos partes iguales.',
  },
  {
    id: 'q2',
    question: 'Para construir la bisectriz de un ángulo, ¿desde dónde dibujas el primer arco?',
    options: [
      'Desde un punto cualquiera',
      'Desde el punto medio de un lado',
      'Desde el vértice del ángulo',
      'Desde fuera del ángulo',
    ],
    correctAnswer: 2,
    explanation:
      'El primer paso de la bisectriz es trazar un arco desde el vértice que corte ambos lados del ángulo.',
  },
  {
    id: 'q3',
    question: '¿Cuántos puntos de intersección necesitas marcar para trazar la mediatriz?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation:
      'Los dos arcos (desde A y desde B) se cruzan en exactamente dos puntos. Uniendo esos dos puntos se obtiene la mediatriz.',
  },
  {
    id: 'q4',
    question:
      'Un arquitecto necesita trazar una línea perpendicular desde una ventana hacia el suelo. ¿Qué construcción usa?',
    options: [
      'Mediatriz del suelo',
      'Bisectriz del ángulo de la ventana',
      'Perpendicular desde un punto externo',
      'Ninguna de las anteriores',
    ],
    correctAnswer: 2,
    explanation:
      'La ventana es un punto externo al suelo (la recta). La construcción de perpendicular desde punto externo permite trazar una línea a 90° hacia la recta.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas las construcciones geométricas básicas."
    />
  );
}
