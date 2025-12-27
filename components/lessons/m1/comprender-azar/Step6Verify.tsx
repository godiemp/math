'use client';

import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';
import { LessonStepProps } from '@/lib/lessons/types';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Una moneda ha caido cara 5 veces seguidas. ¿Cual es la probabilidad de que el proximo lanzamiento sea cara?',
    options: [
      'Menos del 50% (le toca a sello)',
      'Exactamente 50%',
      'Mas del 50% (esta "caliente")',
      'Depende de los lanzamientos anteriores',
    ],
    correctAnswer: 1,
    explanation: 'Cada lanzamiento es independiente. La moneda no tiene memoria. La probabilidad siempre es 50%.',
  },
  {
    id: 'q2',
    question: 'En 20 lanzamientos de un dado, el 6 salio 5 veces. ¿Cual es la frecuencia relativa de obtener 6?',
    options: ['5%', '20%', '25%', '30%'],
    correctAnswer: 2,
    explanation: 'Frecuencia relativa = eventos favorables / total = 5/20 = 0.25 = 25%',
  },
  {
    id: 'q3',
    question: '¿Por que la frecuencia relativa se estabiliza cuando aumentamos los ensayos?',
    options: [
      'Porque la moneda aprende el patron',
      'Por la Ley de los Grandes Numeros',
      'Porque siempre hay exactamente 50% de cada resultado',
      'Porque hacemos trampa con mas lanzamientos',
    ],
    correctAnswer: 1,
    explanation: 'La Ley de los Grandes Numeros dice que con muchos ensayos, la frecuencia relativa converge a la probabilidad teorica.',
  },
  {
    id: 'q4',
    question: '¿Que forma tiene la distribucion de bolas en la Tabla de Galton despues de muchas bolas?',
    options: ['Plana (uniforme)', 'Forma de campana (normal)', 'Triangular', 'Todo en una columna'],
    correctAnswer: 1,
    explanation: 'La Tabla de Galton demuestra como eventos aleatorios independientes producen una distribucion normal (campana de Gauss).',
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
      subtitle="Responde correctamente 3 de 4 preguntas para completar la leccion"
      successMessage="¡Excelente! Dominas los conceptos del azar"
      failureMessage="Repasa los conceptos y vuelve a intentarlo"
    />
  );
}
