'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Simplifica: $\\sqrt{25 \\times 16}$',
    options: ['20', '41', '400', '9'],
    correctAnswer: 0,
    explanation: '$\\sqrt{25 \\times 16} = \\sqrt{25} \\times \\sqrt{16} = 5 \\times 4 = 20$. Aplicamos la propiedad del producto.',
  },
  {
    id: 'q2',
    question: 'Simplifica: $\\sqrt{\\dfrac{144}{36}}$',
    options: ['4', '2', '108', '180'],
    correctAnswer: 1,
    explanation: '$\\sqrt{\\dfrac{144}{36}} = \\dfrac{\\sqrt{144}}{\\sqrt{36}} = \\dfrac{12}{6} = 2$. Aplicamos la propiedad del cociente.',
  },
  {
    id: 'q3',
    question: '¿Cuál es el valor de $\\sqrt{\\sqrt[3]{64}}$?',
    options: ['2', '4', '8', '16'],
    correctAnswer: 0,
    explanation: '$\\sqrt{\\sqrt[3]{64}} = \\sqrt[6]{64}$ porque los índices se multiplican ($2 \\times 3 = 6$). Como $2^6 = 64$, entonces $\\sqrt[6]{64} = 2$.',
  },
  {
    id: 'q4',
    question: '¿Cuál expresión es INCORRECTA?',
    options: ['$\\sqrt{4 \\times 9} = \\sqrt{4} \\times \\sqrt{9}$', '$\\sqrt{\\dfrac{16}{4}} = \\dfrac{\\sqrt{16}}{\\sqrt{4}}$', '$\\sqrt{9+16} = \\sqrt{9}+\\sqrt{16}$', '$\\sqrt{\\sqrt{81}} = \\sqrt[4]{81}$'],
    correctAnswer: 2,
    explanation: '$\\sqrt{9+16} = \\sqrt{25} = 5$, pero $\\sqrt{9}+\\sqrt{16} = 3+4 = 7$. Las raíces NO se distribuyen sobre la suma ni la resta.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas las propiedades de raíces."
    />
  );
}
