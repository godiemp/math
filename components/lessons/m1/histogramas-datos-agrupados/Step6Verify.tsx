'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cual es la principal diferencia entre un grafico de barras y un histograma?',
    options: [
      'El histograma usa colores y el grafico de barras no',
      'En el histograma las barras se tocan porque los intervalos son continuos',
      'El grafico de barras siempre es mas alto',
      'No hay diferencia, son lo mismo',
    ],
    correctAnswer: 1,
    explanation:
      'En un histograma las barras son contiguas (se tocan) porque representan intervalos continuos de datos numericos, mientras que en el grafico de barras las barras estan separadas porque representan categorias distintas.',
  },
  {
    id: 'q2',
    question: 'Si un intervalo es [25, 30), ¿cual de estos valores NO pertenece al intervalo?',
    options: ['25', '27.5', '29.9', '30'],
    correctAnswer: 3,
    explanation:
      'El intervalo [25, 30) incluye el 25 (corchete) pero NO incluye el 30 (parentesis). Por lo tanto, 30 no pertenece a este intervalo.',
  },
  {
    id: 'q3',
    question: '¿Cual es la marca de clase del intervalo [40, 50)?',
    options: ['40', '45', '50', '90'],
    correctAnswer: 1,
    explanation:
      'La marca de clase es el punto medio del intervalo. Marca de clase = (40 + 50) / 2 = 90 / 2 = 45',
  },
  {
    id: 'q4',
    question:
      'En un histograma de notas, el intervalo [5, 6) tiene frecuencia 12 y el intervalo [6, 7) tiene frecuencia 8. ¿Cuantos estudiantes sacaron nota menor a 7?',
    options: ['8', '12', '20', 'No se puede saber'],
    correctAnswer: 2,
    explanation:
      'Para saber cuantos sacaron menos de 7, sumamos las frecuencias de [5, 6) y [6, 7): 12 + 8 = 20 estudiantes. (Nota: asumiendo que solo hay estos dos intervalos relevantes)',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      title="Checkpoint Final"
      subtitle="Demuestra lo que aprendiste sobre histogramas y datos agrupados"
      successMessage="¡Felicitaciones! Has dominado los conceptos de histogramas y datos agrupados."
    />
  );
}
