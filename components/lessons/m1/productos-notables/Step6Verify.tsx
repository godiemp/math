'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál simplificación es CORRECTA para (x + 4)²?',
    options: ['x² + 16', 'x² + 4x + 16', 'x² + 8x + 16', '2x + 8'],
    correctAnswer: 2,
    explanation:
      'El cuadrado de un binomio tiene TRES términos: el primero al cuadrado (x²), el doble producto (2·x·4=8x), y el segundo al cuadrado (16). La fórmula es (a+b)² = a² + 2ab + b².',
  },
  {
    id: 'q2',
    question: '¿Qué tipo de producto notable es (3a - 7)(3a + 7)?',
    options: [
      'Cuadrado de un binomio',
      'Suma por diferencia',
      'Producto de binomios con término común',
      'Ninguno de los anteriores',
    ],
    correctAnswer: 1,
    explanation:
      'Es suma por diferencia porque tiene la forma (A+B)(A-B) donde A=3a y B=7. El resultado será A² - B² = 9a² - 49. Los términos medios se cancelan.',
  },
  {
    id: 'q3',
    question: 'Simplifica: (x - 5)(x + 3)',
    options: ['x² - 15', 'x² - 2x - 15', 'x² + 2x - 15', 'x² - 8x - 15'],
    correctAnswer: 1,
    explanation:
      'Usando (x+a)(x+b) = x² + (a+b)x + ab con a=-5 y b=3: La suma es -5+3=-2, el producto es (-5)(3)=-15. Resultado: x² - 2x - 15',
  },
  {
    id: 'q4',
    question:
      'Un estudiante escribió: (2x - 3)² = 4x² - 9. ¿Qué error cometió?',
    options: [
      'Confundió cuadrado de binomio con suma por diferencia',
      'Olvidó elevar al cuadrado el 2',
      'El signo del 9 debería ser positivo',
      'No hay error, la respuesta es correcta',
    ],
    correctAnswer: 0,
    explanation:
      '(2x - 3)² es un cuadrado de binomio, NO suma por diferencia. La respuesta correcta es 4x² - 12x + 9. El estudiante aplicó la fórmula de (A+B)(A-B) = A² - B² en lugar de (A-B)² = A² - 2AB + B².',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado los productos notables!"
    />
  );
}
