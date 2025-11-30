'use client';

import { useRouter } from 'next/navigation';
import { LessonShell } from '@/components/lessons/shared';
import { getLessonBySlug } from '@/lib/lessons/types';
import {
  Step1Hook,
  Step2Discovery,
  Step3SubtractionSecret,
  Step4Verify,
} from '@/components/lessons/m1/suma-resta-enteros';

const LESSON_SLUG = 'suma-resta-enteros';

export default function SumaRestaEnterosLesson() {
  const router = useRouter();
  const lesson = getLessonBySlug(LESSON_SLUG);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Lección no encontrada</p>
      </div>
    );
  }

  const handleComplete = () => {
    // TODO: Save lesson completion to user progress
    router.push('/mini-lessons');
  };

  const handleExit = () => {
    router.push('/mini-lessons');
  };

  return (
    <LessonShell
      lesson={lesson}
      onComplete={handleComplete}
      onExit={handleExit}
    >
      {({ currentStep, completeStep }) => {
        const stepComponents = [
          <Step1Hook
            key="step1"
            onComplete={completeStep}
            isActive={currentStep === 0}
          />,
          <Step2Discovery
            key="step2"
            onComplete={completeStep}
            isActive={currentStep === 1}
          />,
          <Step3SubtractionSecret
            key="step3"
            onComplete={completeStep}
            isActive={currentStep === 2}
          />,
          <Step4Verify
            key="step4"
            onComplete={completeStep}
            isActive={currentStep === 3}
          />,
        ];

        return stepComponents[currentStep] || null;
      }}
    </LessonShell>
  );
}
