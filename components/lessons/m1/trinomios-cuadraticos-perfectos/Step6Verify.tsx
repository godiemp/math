'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es la factorización de x² + 14x + 49?',
    options: ['(x + 7)²', '(x - 7)²', '(x + 14)²', '(x + 49)²'],
    correctAnswer: 0,
    explanation: 'a = x, b = 7 (√49 = 7). Verificamos: 2(x)(7) = 14x ✓. Como el término medio es positivo: (x + 7)²',
  },
  {
    id: 'q2',
    question: '¿Cuál es la factorización de 4x² - 28x + 49?',
    options: ['(2x + 7)²', '(4x - 7)²', '(2x - 7)²', '(2x - 49)²'],
    correctAnswer: 2,
    explanation: 'a = 2x (√4x² = 2x), b = 7 (√49 = 7). Verificamos: 2(2x)(7) = 28x ✓. Como el término medio es negativo: (2x - 7)²',
  },
  {
    id: 'q3',
    question: '¿Cuál de estos NO es un trinomio cuadrático perfecto?',
    options: ['x² + 6x + 9', 'x² + 8x + 15', '4x² - 20x + 25', '9x² + 12x + 4'],
    correctAnswer: 1,
    explanation: 'x² + 8x + 15 no es TCP porque √15 no es un entero perfecto, y además 2·x·√15 ≠ 8x. Este trinomio se factoriza como (x + 3)(x + 5).',
  },
  {
    id: 'q4',
    question: '¿Cuál es la factorización de 25a² + 60ab + 36b²?',
    options: ['(5a + 6b)²', '(25a + 36b)²', '(5a - 6b)²', '(5a + 36b)²'],
    correctAnswer: 0,
    explanation: 'a = 5a (√25a² = 5a), b = 6b (√36b² = 6b). Verificamos: 2(5a)(6b) = 60ab ✓. Resultado: (5a + 6b)²',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Felicitaciones! Has dominado la factorización de trinomios cuadráticos perfectos."
    />
  );
}
