'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Un producto de $120.000 tiene dos descuentos sucesivos: primero 20% y luego 10%. ¿Cuánto cuesta finalmente?',
    options: ['$84.000', '$86.400', '$90.000', '$96.000'],
    correctAnswer: 1,
    explanation:
      'Primer descuento: $120.000 × 0,80 = $96.000. Segundo descuento: $96.000 × 0,90 = $86.400. ¡No es lo mismo que 30% directo!',
  },
  {
    id: 'q2',
    question: 'Después de un aumento del 25%, el precio de un artículo es $100.000. ¿Cuál era el precio original?',
    options: ['$75.000', '$80.000', '$85.000', '$90.000'],
    correctAnswer: 1,
    explanation:
      'Si el precio actual es el 125% del original, entonces: Original = $100.000 ÷ 1,25 = $80.000. Verificación: $80.000 × 1,25 = $100.000 ✓',
  },
  {
    id: 'q3',
    question: 'Las ventas de una empresa subieron de $800.000 a $1.000.000. ¿Cuál fue el porcentaje de aumento?',
    options: ['20%', '25%', '30%', '80%'],
    correctAnswer: 1,
    explanation:
      'Aumento = $1.000.000 - $800.000 = $200.000. Porcentaje = ($200.000 ÷ $800.000) × 100 = 25%. El aumento se calcula sobre el valor original.',
  },
  {
    id: 'q4',
    question: 'Un precio sube 20% y luego baja 20%. Si el precio inicial era $50.000, ¿cuál es el precio final?',
    options: ['$48.000', '$50.000', '$52.000', '$54.000'],
    correctAnswer: 0,
    explanation:
      'Sube 20%: $50.000 × 1,20 = $60.000. Baja 20%: $60.000 × 0,80 = $48.000. ¡Subir y bajar el mismo porcentaje NO devuelve al valor original!',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Has dominado los problemas de porcentajes en diversos contextos!"
    />
  );
}
