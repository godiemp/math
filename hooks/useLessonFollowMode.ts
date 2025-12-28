'use client';

import { useMemo } from 'react';
import { useStudentLessonSync } from './useStudentLessonSync';
import type { FollowMode } from '@/components/lessons/shared/LessonShell';

interface UseLessonFollowModeOptions {
  /** The slug of the current lesson */
  lessonSlug: string;
}

interface UseLessonFollowModeReturn {
  /** Follow mode props to pass to LessonShell, or undefined if not in follow mode */
  followMode: FollowMode | undefined;
  /** Whether the student is in an active lesson session */
  isInLiveSession: boolean;
  /** Whether the current lesson matches the teacher's active lesson */
  isMatchingLesson: boolean;
}

/**
 * Hook to enable follow mode for a specific lesson page.
 *
 * When a student has an assigned teacher with an active live lesson,
 * this hook provides the followMode props to pass to LessonShell.
 *
 * @example
 * ```tsx
 * function LessonPage() {
 *   const { followMode } = useLessonFollowMode({ lessonSlug: 'relaciones-lineales' });
 *
 *   return (
 *     <LessonShell lesson={lesson} followMode={followMode}>
 *       {({ currentStep, completeStep }) => (
 *         // ... step components
 *       )}
 *     </LessonShell>
 *   );
 * }
 * ```
 */
export function useLessonFollowMode({
  lessonSlug,
}: UseLessonFollowModeOptions): UseLessonFollowModeReturn {
  const {
    activeLesson,
    isFollowing,
    leaveLesson,
    submitAnswer,
  } = useStudentLessonSync();

  // Check if the current lesson matches the teacher's active lesson
  const isMatchingLesson = useMemo(() => {
    if (!activeLesson) return false;
    // Match by lesson ID (which is typically the slug)
    return activeLesson.lessonId === lessonSlug;
  }, [activeLesson, lessonSlug]);

  // Create follow mode props if conditions are met
  const followMode: FollowMode | undefined = useMemo(() => {
    // Only provide follow mode if:
    // 1. There's an active lesson from teacher
    // 2. Student is following the lesson
    // 3. The current lesson matches the teacher's lesson
    if (!activeLesson || !isFollowing || !isMatchingLesson) {
      return undefined;
    }

    return {
      teacherName: activeLesson.teacherUsername,
      teacherStep: activeLesson.currentStep,
      onLeave: leaveLesson,
      onStepComplete: (stepNumber: number, isCorrect: boolean) => {
        submitAnswer(stepNumber, isCorrect);
      },
    };
  }, [activeLesson, isFollowing, isMatchingLesson, leaveLesson, submitAnswer]);

  return {
    followMode,
    isInLiveSession: !!activeLesson && isFollowing,
    isMatchingLesson,
  };
}
