'use client';

import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';
import { LessonStepProps } from '@/lib/lessons/types';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question:
      'En un colegio de 500 estudiantes, se pregunta a 50 al azar si prefieren educación física. 35 dicen que sí. ¿Cuál es la proporción muestral?',
    options: ['35%', '50%', '70%', '7%'],
    correctAnswer: 2,
    explanation:
      'La proporción muestral es: favorable ÷ total = 35 ÷ 50 = 0.70 = 70%',
  },
  {
    id: 'q2',
    question: '¿Qué podemos concluir si la proporción muestral es 70%?',
    options: [
      'Exactamente 70% de la población prefiere educación física',
      'Aproximadamente 70% de la población prefiere educación física',
      'Menos de 70% de la población prefiere educación física',
      'No podemos saber nada sobre la población',
    ],
    correctAnswer: 1,
    explanation:
      'La muestra nos da una estimación aproximada del valor real. Podría ser un poco más o un poco menos, pero estará cerca del 70%.',
  },
  {
    id: 'q3',
    question:
      '¿Cuál es una muestra SESGADA para conocer el deporte favorito de los estudiantes?',
    options: [
      'Preguntar a 30 estudiantes elegidos al azar de todos los cursos',
      'Preguntar solo a los miembros del equipo de fútbol',
      'Preguntar a 50 estudiantes usando una lista aleatoria',
      'Preguntar a un estudiante de cada curso seleccionado al azar',
    ],
    correctAnswer: 1,
    explanation:
      'Preguntar solo al equipo de fútbol sesga la muestra hacia personas que ya practican fútbol, sobrerrepresentando este deporte.',
  },
  {
    id: 'q4',
    question: '¿Por qué usamos muestras en lugar de estudiar toda la población?',
    options: [
      'Porque las muestras dan resultados más exactos',
      'Porque es más barato, rápido y a veces imposible estudiar a todos',
      'Porque las poblaciones son siempre pequeñas',
      'Porque los estadísticos prefieren trabajar con menos datos',
    ],
    correctAnswer: 1,
    explanation:
      'El muestreo permite estudiar poblaciones grandes de forma práctica, económica y rápida, cuando sería imposible o muy costoso estudiar a cada individuo.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Has demostrado que entiendes cómo usar muestras para estimar características de poblaciones."
    />
  );
}
