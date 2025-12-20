'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question:
      'Si 5 obreros trabajando 8 horas/día terminan una obra en 12 días, ¿cuántos días tardarán 10 obreros trabajando 6 horas/día?',
    options: ['6 días', '8 días', '10 días', '16 días'],
    correctAnswer: 1,
    explanation:
      'Obreros ↑ → Días ↓ (inversa: 5/10). Horas ↓ → Días ↑ (inversa: 8/6). x = 12 × (5/10) × (8/6) = 12 × 40/60 = 8 días.',
  },
  {
    id: 'q2',
    question:
      'Si 4 máquinas producen 200 piezas en 5 horas, ¿cuántas piezas producirán 6 máquinas en 10 horas?',
    options: ['400 piezas', '500 piezas', '600 piezas', '800 piezas'],
    correctAnswer: 2,
    explanation:
      'Máquinas ↑ → Piezas ↑ (directa: 6/4). Horas ↑ → Piezas ↑ (directa: 10/5). x = 200 × (6/4) × (10/5) = 200 × 3 = 600 piezas.',
  },
  {
    id: 'q3',
    question:
      'Si 6 grifos llenan un tanque en 8 horas, ¿cuántas horas tardarán 4 grifos?',
    options: ['6 horas', '10 horas', '12 horas', '16 horas'],
    correctAnswer: 2,
    explanation:
      'Grifos ↓ → Tiempo ↑ (inversa: 6/4). x = 8 × (6/4) = 8 × 1.5 = 12 horas.',
  },
  {
    id: 'q4',
    question:
      '8 camiones hacen 24 viajes en 3 días. ¿Cuántos viajes harán 12 camiones en 5 días?',
    options: ['40 viajes', '48 viajes', '60 viajes', '72 viajes'],
    correctAnswer: 2,
    explanation:
      'Camiones ↑ → Viajes ↑ (directa: 12/8). Días ↑ → Viajes ↑ (directa: 5/3). x = 24 × (12/8) × (5/3) = 24 × 60/24 = 60 viajes.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Dominas la proporcionalidad compuesta!"
    />
  );
}
