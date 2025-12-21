'use client';

import { useRouter } from 'next/navigation';
import LessonShell from '@/components/lessons/shared/LessonShell';
import type { Lesson } from '@/lib/lessons/types';
import type { DynamicLesson, DynamicStep } from '@/lib/builder/types';
import {
  DynamicHookStep,
  DynamicExploreStep,
  DynamicExplainStep,
  DynamicPracticeStep,
  DynamicVerifyStep,
} from './steps';

interface DynamicLessonRendererProps {
  /** The dynamic lesson to render */
  lesson: DynamicLesson;
  /** Callback when lesson is completed */
  onComplete?: () => void;
  /** Callback when user exits */
  onExit?: () => void;
  /** Whether in preview mode (for builder) */
  previewMode?: boolean;
  /** Active step index (controlled, for preview mode) */
  activeStep?: number;
  /** Callback when step changes (for preview mode) */
  onStepChange?: (step: number) => void;
}

/**
 * Convert DynamicLesson to the Lesson type expected by LessonShell
 */
function toLesson(dynamicLesson: DynamicLesson): Lesson {
  return {
    id: dynamicLesson.id,
    slug: dynamicLesson.slug,
    title: dynamicLesson.title,
    description: dynamicLesson.description,
    level: dynamicLesson.level,
    subject: dynamicLesson.subject,
    thematicUnit: dynamicLesson.thematicUnit || '',
    skills: dynamicLesson.skills || [],
    estimatedMinutes: dynamicLesson.estimatedMinutes || 15,
    minEducOA: dynamicLesson.minEducOA,
    steps: dynamicLesson.steps.map(step => ({
      id: step.id,
      // Map step types: classify -> explore (since classify uses explore type internally)
      type: step.type === 'explore' ? 'explore' : step.type,
      title: step.title,
    })),
  };
}

/**
 * Render a single step based on its type
 */
function renderStep(
  step: DynamicStep,
  isActive: boolean,
  onComplete: () => void
) {
  const props = { step, isActive, onComplete } as any;

  switch (step.type) {
    case 'hook':
      return <DynamicHookStep key={step.id} {...props} />;
    case 'explore':
      return <DynamicExploreStep key={step.id} {...props} />;
    case 'explain':
      return <DynamicExplainStep key={step.id} {...props} />;
    case 'practice':
      return <DynamicPracticeStep key={step.id} {...props} />;
    case 'verify':
      return <DynamicVerifyStep key={step.id} {...props} />;
    default:
      console.warn(`Unknown step type: ${(step as any).type}`);
      return null;
  }
}

/**
 * DynamicLessonRenderer - Renders a complete dynamic lesson
 *
 * Takes a DynamicLesson object (JSON schema) and renders it with full interactivity.
 * Wraps LessonShell for consistent navigation and progress tracking.
 */
export default function DynamicLessonRenderer({
  lesson,
  onComplete,
  onExit,
  previewMode = false,
  activeStep = 0,
  onStepChange,
}: DynamicLessonRendererProps) {
  const router = useRouter();

  // Convert to Lesson format for LessonShell
  const lessonMeta = toLesson(lesson);

  // Default handlers
  const handleComplete = onComplete || (() => router.push('/mini-lessons'));
  const handleExit = onExit || (() => router.push('/mini-lessons'));

  // In preview mode, render only the active step without full shell
  if (previewMode) {
    const step = lesson.steps[activeStep];
    if (!step) return null;

    const handleStepComplete = () => {
      // In preview mode, advance to next step if available
      if (onStepChange && activeStep < lesson.steps.length - 1) {
        onStepChange(activeStep + 1);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
          {renderStep(step, true, handleStepComplete)}
        </div>
      </div>
    );
  }

  return (
    <LessonShell
      lesson={lessonMeta}
      onComplete={handleComplete}
      onExit={handleExit}
    >
      {({ currentStep, completeStep }) => (
        <>
          {lesson.steps.map((step, index) =>
            renderStep(step, currentStep === index, completeStep)
          )}
        </>
      )}
    </LessonShell>
  );
}

/**
 * Standalone preview component for the builder
 * Shows a single step without the shell wrapper
 */
export function DynamicStepPreview({
  step,
  onComplete,
}: {
  step: DynamicStep;
  onComplete?: () => void;
}) {
  return (
    <div className="p-4">
      {renderStep(step, true, onComplete || (() => {}))}
    </div>
  );
}
