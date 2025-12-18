'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question:
      'Si 6 pintores terminan un mural en 8 días, ¿cuántos días tardarán 4 pintores en hacer el mismo mural?',
    options: ['6 días', '10 días', '12 días', '16 días'],
    correctAnswer: 2,
    explanation:
      'Es proporcionalidad inversa (más pintores = menos días). y₂ = (6 · 8) / 4 = 48 / 4 = 12 días.',
  },
  {
    id: 'q2',
    question:
      'Un automóvil recorre 240 km en 3 horas. ¿Cuántos kilómetros recorrerá en 5 horas a la misma velocidad?',
    options: ['300 km', '400 km', '350 km', '450 km'],
    correctAnswer: 1,
    explanation:
      'Es proporcionalidad directa (más tiempo = más distancia). y₂ = (5 · 240) / 3 = 1200 / 3 = 400 km.',
  },
  {
    id: 'q3',
    question:
      'Si 4 obreros trabajando 5 horas/día terminan una obra en 12 días, ¿cuántos días tardarán 6 obreros trabajando 4 horas/día?',
    options: ['8 días', '10 días', '12 días', '15 días'],
    correctAnswer: 1,
    explanation:
      'Compuesta: Obreros ↑ → Días ↓ (inversa). Horas ↓ → Días ↑ (inversa). x = 12 × (4/6) × (5/4) = 12 × 20/24 = 10 días.',
  },
  {
    id: 'q4',
    question:
      'Un grifo llena un tanque en 12 horas. Si se abren 3 grifos iguales, ¿en cuántas horas se llenará?',
    options: ['36 horas', '6 horas', '4 horas', '9 horas'],
    correctAnswer: 2,
    explanation:
      'Es proporcionalidad inversa (más grifos = menos tiempo). y₂ = (1 · 12) / 3 = 12 / 3 = 4 horas.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas la proporcionalidad directa, inversa y compuesta!"
    />
  );
}
