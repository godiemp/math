'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el resultado de (x + 2)³?',
    options: [
      'x³ + 8',
      'x³ + 6x² + 12x + 8',
      'x³ + 4x² + 4x + 8',
      '3x³ + 6x² + 12x + 8',
    ],
    correctAnswer: 1,
    explanation:
      'Usando (a + b)³ = a³ + 3a²b + 3ab² + b³ con a = x y b = 2: x³ + 3(x²)(2) + 3(x)(4) + 8 = x³ + 6x² + 12x + 8',
  },
  {
    id: 'q2',
    question: 'Factoriza x³ - 64:',
    options: [
      '(x - 4)(x² + 4x + 16)',
      '(x - 4)(x² - 4x + 16)',
      '(x + 4)(x² - 4x + 16)',
      '(x - 4)³',
    ],
    correctAnswer: 0,
    explanation:
      'x³ - 64 = x³ - 4³ es una diferencia de cubos. Usando a³ - b³ = (a - b)(a² + ab + b²): (x - 4)(x² + 4x + 16). Recuerda SOAP: el término medio es positivo en diferencia de cubos.',
  },
  {
    id: 'q3',
    question:
      'En (a - b)³ = a³ - 3a²b + 3ab² - b³, ¿qué patrón siguen los signos?',
    options: [
      'Todos positivos',
      'Todos negativos',
      'Alternan: +, -, +, -',
      'Depende de los valores de a y b',
    ],
    correctAnswer: 2,
    explanation:
      'En el cubo de una resta, los signos alternan: el primer término es +, el segundo -, el tercero +, y el cuarto -. Esto es porque cada vez que aparece un factor b, cambia el signo.',
  },
  {
    id: 'q4',
    question: '¿Cuál expresión es una suma de cubos?',
    options: ['x³ + 9', 'x³ + 27', 'x² + 8', 'x³ - 1'],
    correctAnswer: 1,
    explanation:
      'x³ + 27 = x³ + 3³ es una suma de cubos porque 27 = 3³. Las otras opciones: 9 no es un cubo perfecto, x² + 8 tiene x², y x³ - 1 es una diferencia (no suma) de cubos.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado los productos notables con cubos!"
    />
  );
}
