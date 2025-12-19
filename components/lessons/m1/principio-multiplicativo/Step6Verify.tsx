'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question:
      'Si tienes 3 camisas y 4 pantalones, ¿de cuántas formas puedes vestirte?',
    options: ['7', '12', '16', '24'],
    correctAnswer: 1,
    explanation:
      'Aplicamos el principio multiplicativo: 3 camisas × 4 pantalones = 12 formas diferentes.',
  },
  {
    id: 'q2',
    question:
      'Un menú ofrece 2 entradas, 5 platos principales y 3 postres. ¿Cuántos menús diferentes se pueden formar?',
    options: ['10', '15', '30', '60'],
    correctAnswer: 2,
    explanation:
      'Multiplicamos las opciones de cada categoría: 2 × 5 × 3 = 30 menús diferentes.',
  },
  {
    id: 'q3',
    question:
      '¿Cuántos números de 3 dígitos se pueden formar con 1, 2, 3, 4, 5 si se permite repetición?',
    options: ['15', '60', '125', '243'],
    correctAnswer: 2,
    explanation:
      'Con repetición, cada posición tiene 5 opciones: 5 × 5 × 5 = 5³ = 125 números.',
  },
  {
    id: 'q4',
    question:
      '¿De cuántas maneras se pueden organizar las letras de "SOL"?',
    options: ['3', '6', '9', '27'],
    correctAnswer: 1,
    explanation:
      'Sin repetición (permutaciones): 3 × 2 × 1 = 3! = 6 formas de ordenar 3 letras distintas.',
  },
  {
    id: 'q5',
    question:
      'Si lanzas una moneda 4 veces, ¿cuántos resultados posibles hay?',
    options: ['4', '8', '16', '32'],
    correctAnswer: 2,
    explanation:
      'Cada lanzamiento tiene 2 resultados. Para 4 lanzamientos: 2 × 2 × 2 × 2 = 2⁴ = 16 resultados.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="¡Has dominado el principio multiplicativo de conteo!"
    />
  );
}
