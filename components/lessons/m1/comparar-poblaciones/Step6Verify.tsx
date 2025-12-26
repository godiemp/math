'use client';

import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';
import { LessonStepProps } from '@/lib/lessons/types';
import { CHECKPOINT_QUESTIONS } from './data';

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={CHECKPOINT_QUESTIONS as CheckpointQuestion[]}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas la comparacion de poblaciones con graficos de dispersion."
    />
  );
}
