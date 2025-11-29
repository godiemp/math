'use client';

import { useState, useEffect, ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Lesson, LessonStep } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';

interface LessonShellProps {
  lesson: Lesson;
  children: (props: {
    currentStep: number;
    goToStep: (step: number) => void;
    completeStep: () => void;
    canAdvance: boolean;
    setCanAdvance: (can: boolean) => void;
  }) => ReactNode;
  onComplete?: () => void;
  onExit?: () => void;
}

export default function LessonShell({
  lesson,
  children,
  onComplete,
  onExit,
}: LessonShellProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [canAdvance, setCanAdvance] = useState(true);

  const totalSteps = lesson.steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentStepDef = lesson.steps[currentStep];
  const isLastStep = currentStep === totalSteps - 1;

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
      setCanAdvance(!lesson.steps[step].requiredToAdvance);
    }
  };

  const completeStep = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    setCanAdvance(true);

    if (isLastStep) {
      onComplete?.();
    } else {
      // Auto-advance to next step
      setCurrentStep(prev => prev + 1);
      // Reset canAdvance for next step
      const nextStepDef = lesson.steps[currentStep + 1];
      setCanAdvance(!nextStepDef?.requiredToAdvance);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      const prevStepDef = lesson.steps[currentStep - 1];
      setCanAdvance(completedSteps.has(currentStep - 1) || !prevStepDef?.requiredToAdvance);
    } else {
      onExit?.();
    }
  };

  const handleNext = () => {
    if (canAdvance && currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      const nextStepDef = lesson.steps[currentStep + 1];
      setCanAdvance(completedSteps.has(currentStep + 1) || !nextStepDef?.requiredToAdvance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Top row: Back button and title */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm hidden sm:inline">
                {currentStep === 0 ? 'Salir' : 'Anterior'}
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
              {lesson.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => {
                    if (index <= currentStep || completedSteps.has(index - 1)) {
                      goToStep(index);
                    }
                  }}
                  disabled={index > currentStep && !completedSteps.has(index - 1)}
                  className={cn(
                    'w-4 h-4 rounded-full border-2 transition-all',
                    index === currentStep
                      ? 'bg-blue-500 border-blue-500 scale-125'
                      : completedSteps.has(index)
                      ? 'bg-green-500 border-green-500'
                      : index < currentStep
                      ? 'bg-gray-400 border-gray-400'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                  )}
                  title={step.title}
                >
                  {completedSteps.has(index) && (
                    <Check size={10} className="text-white mx-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {children({
          currentStep,
          goToStep,
          completeStep,
          canAdvance,
          setCanAdvance,
        })}
      </div>

      {/* Footer navigation (only show if not on verify step or step allows manual advance) */}
      {currentStepDef.type !== 'verify' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-4xl mx-auto flex justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span>{currentStep === 0 ? 'Salir' : 'Anterior'}</span>
            </button>

            {!isLastStep && (
              <button
                onClick={handleNext}
                disabled={!canAdvance}
                className={cn(
                  'flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all',
                  canAdvance
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
