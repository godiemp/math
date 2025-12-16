'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué hace que dos términos sean "semejantes"?',
    options: [
      'Tienen el mismo coeficiente',
      'Tienen la misma variable y exponente',
      'Tienen el mismo valor numérico',
    ],
    correctAnswer: 1,
    explanation: 'Los coeficientes pueden ser diferentes; lo importante es que las variables y sus exponentes sean iguales.',
  },
  {
    id: 'q2',
    question: '¿Por qué NO podemos simplificar 3x + 4y?',
    options: [
      'Porque los coeficientes son diferentes',
      'Porque x e y son variables diferentes, no son términos semejantes',
      'Porque falta un signo de igual',
    ],
    correctAnswer: 1,
    explanation: 'Solo podemos combinar términos con la misma parte literal. 3x y 4y tienen variables diferentes (x vs y).',
  },
  {
    id: 'q3',
    question: 'Simplifica: 2x² + 5x + 3x² - 2x',
    options: ['8x³', '5x² + 3x', '10x²'],
    correctAnswer: 1,
    explanation: 'Agrupamos términos semejantes: (2x² + 3x²) + (5x - 2x) = 5x² + 3x. Nota: x² y x NO son semejantes.',
  },
  {
    id: 'q4',
    question: 'Si una expresión tiene 4ab, -2ba, y 3ab, ¿cuántos términos semejantes hay?',
    options: [
      '2 (solo 4ab y 3ab)',
      '3 (todos son semejantes)',
      '0 (ninguno es igual)',
    ],
    correctAnswer: 1,
    explanation: 'ab = ba, así que 4ab, -2ba (= -2ab), y 3ab son todos semejantes. Simplificado: (4 - 2 + 3)ab = 5ab',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      title="Checkpoint"
      successMessage="Has demostrado que entiendes los términos semejantes. Ahora puedes identificar y combinar términos algebraicos."
    />
  );
}
