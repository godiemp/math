'use client';

import { useState, useEffect, ReactNode } from 'react';
import { ArrowLeft, Check, Radio, X } from 'lucide-react';
import { Lesson } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export interface FollowMode {
  /** Teacher's display name */
  teacherName: string;
  /** Current step the teacher is on (1-indexed) */
  teacherStep: number;
  /** Callback when student leaves follow mode */
  onLeave: () => void;
  /** Callback when student completes a step */
  onStepComplete?: (stepNumber: number, isCorrect: boolean) => void;
}

interface LessonShellProps {
  lesson: Lesson;
  children: (props: {
    currentStep: number;
    goToStep: (step: number) => void;
    completeStep: (isCorrect?: boolean) => void;
  }) => ReactNode;
  onComplete?: () => void;
  onExit?: () => void;
  /** Follow mode for real-time sync with teacher */
  followMode?: FollowMode;
}

export default function LessonShell({
  lesson,
  children,
  onComplete,
  onExit,
  followMode,
}: LessonShellProps) {
  const { isAdmin } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const totalSteps = lesson.steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentStepDef = lesson.steps[currentStep];
  const isLastStep = currentStep === totalSteps - 1;

  // Auto-sync with teacher's step when in follow mode
  useEffect(() => {
    if (followMode && followMode.teacherStep >= 1 && followMode.teacherStep <= totalSteps) {
      const teacherStepIndex = followMode.teacherStep - 1; // Convert 1-indexed to 0-indexed
      if (teacherStepIndex !== currentStep) {
        setCurrentStep(teacherStepIndex);
      }
    }
  }, [followMode?.teacherStep, totalSteps]);

  const goToStep = (step: number) => {
    // In follow mode, students can't navigate freely (they follow the teacher)
    if (followMode) {
      return;
    }
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const completeStep = (isCorrect: boolean = true) => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));

    // Report progress to teacher if in follow mode
    if (followMode?.onStepComplete) {
      followMode.onStepComplete(currentStep + 1, isCorrect); // Convert to 1-indexed
    }

    if (isLastStep) {
      onComplete?.();
    } else if (!followMode) {
      // Only auto-advance if NOT in follow mode (teacher controls the pace)
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    // In follow mode, back button exits follow mode
    if (followMode) {
      followMode.onLeave();
      return;
    }
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onExit?.();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Follow Mode Banner */}
      {followMode && (
        <div className="sticky top-0 z-20 bg-emerald-500 text-white">
          <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio size={16} className="animate-pulse" />
              <span className="font-medium">
                Siguiendo a {followMode.teacherName}
              </span>
            </div>
            <button
              onClick={followMode.onLeave}
              className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm transition-colors"
            >
              <X size={14} />
              Salir
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={cn(
        "sticky z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700",
        followMode ? "top-[44px]" : "top-0"
      )}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Top row: Back button and title */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm hidden sm:inline">
                {followMode ? 'Salir' : currentStep === 0 ? 'Salir' : 'Anterior'}
              </span>
            </button>

            <div className="text-center flex-1 mx-4">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {lesson.title}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Paso {currentStep + 1} de {totalSteps}: {currentStepDef.title}
              </p>
            </div>

            <div className="w-20" /> {/* Spacer for centering */}
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Step dots */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-0">
              {lesson.steps.map((step, index) => {
                // In follow mode, step navigation is controlled by teacher
                const canClick = !followMode && (isAdmin || index <= currentStep || completedSteps.has(index - 1));
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      if (canClick) {
                        goToStep(index);
                      }
                    }}
                    disabled={!canClick}
                    className={cn(
                      'w-4 h-4 rounded-full border-2 transition-all',
                      index === currentStep
                        ? followMode
                          ? 'bg-emerald-500 border-emerald-500 scale-125'
                          : 'bg-blue-500 border-blue-500 scale-125'
                        : completedSteps.has(index)
                        ? 'bg-green-500 border-green-500'
                        : index < currentStep
                        ? 'bg-gray-400 border-gray-400'
                        : isAdmin && !followMode
                        ? 'bg-orange-200 dark:bg-orange-900 border-orange-400 cursor-pointer hover:scale-110'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                    )}
                    title={followMode ? `${step.title} (controlado por profesor)` : isAdmin ? `[Admin] ${step.title}` : step.title}
                  >
                    {completedSteps.has(index) && (
                      <Check size={10} className="text-white mx-auto" />
                    )}
                  </button>
                );
              })}
            </div>
            {/* Admin mode indicator */}
            {isAdmin && (
              <div className="absolute -bottom-5 left-0 right-0 text-center">
                <span className="text-xs text-orange-500 font-medium">
                  Admin: click en cualquier paso
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {children({
          currentStep,
          goToStep,
          completeStep,
        })}
      </div>
    </div>
  );
}
