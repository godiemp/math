'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'En un triángulo rectángulo, ¿qué razón trigonométrica relaciona el lado opuesto con la hipotenusa?',
    options: ['Seno (sin)', 'Coseno (cos)', 'Tangente (tan)', 'Ninguna de las anteriores'],
    correctAnswer: 0,
    explanation: 'El seno (sin) se define como: sin(θ) = Opuesto / Hipotenusa',
  },
  {
    id: 'q2',
    question: 'Si sin(30°) = 0,5 y la hipotenusa mide 16, ¿cuánto mide el lado opuesto?',
    options: ['4', '8', '12', '32'],
    correctAnswer: 1,
    explanation: 'Opuesto = sin(30°) × Hipotenusa = 0,5 × 16 = 8',
  },
  {
    id: 'q3',
    question: '¿Cuál es el valor de tan(45°)?',
    options: ['0', '0,5', '1', '1,732'],
    correctAnswer: 2,
    explanation: 'tan(45°) = 1 porque en un triángulo con ángulo de 45°, los catetos son iguales, entonces Opuesto/Adyacente = 1',
  },
  {
    id: 'q4',
    question: 'Si conoces el ángulo θ, el lado adyacente, y quieres encontrar el lado opuesto, ¿qué razón usas?',
    options: ['Seno', 'Coseno', 'Tangente', 'Cualquiera de las tres'],
    correctAnswer: 2,
    explanation: 'Tangente: tan(θ) = Opuesto/Adyacente → Opuesto = tan(θ) × Adyacente',
  },
  {
    id: 'q5',
    question: 'En un triángulo rectángulo con θ = 60° y hipotenusa = 10, ¿cuánto mide el lado adyacente?',
    options: ['5', '8,66', '10', '17,32'],
    correctAnswer: 0,
    explanation: 'cos(60°) = 0,5 → Adyacente = cos(60°) × 10 = 0,5 × 10 = 5',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={4}
      successMessage="Dominas las razones trigonométricas seno, coseno y tangente."
    />
  );
}
