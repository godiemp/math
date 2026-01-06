'use client';

import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';
import { LessonStepProps } from '@/lib/lessons/types';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'María tiene $20.000 y compra 4 libros de $3.500 cada uno. ¿Cuánto vuelto recibe?',
    options: ['$6.000', '$14.000', '$8.500', '$5.500'],
    correctAnswer: 0,
    explanation: 'Costo total: 4 × $3.500 = $14.000. Vuelto: $20.000 - $14.000 = $6.000',
  },
  {
    id: 'q2',
    question: 'La temperatura era de 5°C y bajó 12 grados. ¿Cuál es la temperatura actual?',
    options: ['17°C', '-17°C', '7°C', '-7°C'],
    correctAnswer: 3,
    explanation: '5 - 12 = -7°C (bajo cero)',
  },
  {
    id: 'q3',
    question: '¿Qué palabra clave indica que debes usar DIVISIÓN?',
    options: ['"en total"', '"repartir en partes iguales"', '"el doble"', '"la diferencia"'],
    correctAnswer: 1,
    explanation: 'Palabras como "repartir", "dividir" o "por partes iguales" indican división.',
  },
  {
    id: 'q4',
    question: 'Un auto viaja a 60 km/h. ¿Cuánto tiempo tarda en recorrer 150 km?',
    options: ['2 horas', '2,5 horas', '3 horas', '90 minutos'],
    correctAnswer: 1,
    explanation: 'Tiempo = distancia ÷ velocidad = 150 ÷ 60 = 2,5 horas',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Felicitaciones! Ya dominas los problemas de la vida cotidiana."
    />
  );
}
