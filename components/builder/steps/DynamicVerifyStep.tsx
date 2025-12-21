'use client';

import CheckpointQuiz from '@/components/lessons/shared/CheckpointQuiz';
import type { VerifyStep, DynamicStepProps } from '@/lib/builder/types';

interface DynamicVerifyStepProps extends DynamicStepProps<VerifyStep> {}

/**
 * DynamicVerifyStep - Renders a verify/checkpoint step from JSON schema
 *
 * This is the simplest dynamic step because it wraps the already data-driven
 * CheckpointQuiz component.
 */
export default function DynamicVerifyStep({
  step,
  isActive,
  onComplete,
}: DynamicVerifyStepProps) {
  const { content } = step;

  return (
    <CheckpointQuiz
      isActive={isActive}
      onComplete={onComplete}
      questions={content.questions}
      requiredCorrect={content.requiredCorrect}
      title={step.title}
      subtitle={content.subtitle}
      successMessage={content.successMessage}
      failureMessage={content.failureMessage}
    />
  );
}
