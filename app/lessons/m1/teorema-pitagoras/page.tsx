'use client';

import { useRouter } from 'next/navigation';
import { LessonShell } from '@/components/lessons/shared';
import { getLessonBySlug } from '@/lib/lessons/types';
import {
  Step1Hook,
  Step2Discover,
  Step3Proof,
  Step4Explain,
  Step5Practice,
  Step6Verify,
} from '@/components/lessons/m1/teorema-pitagoras';

const LESSON_SLUG = 'teorema-pitagoras';

export default function TeoremaPitagorasLesson() {
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
    router.push('/mini-lessons/m1/geometria');
  };

  const handleExit = () => {
    router.push('/mini-lessons/m1/geometria');
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
          <Step2Discover
            key="step2"
            onComplete={completeStep}
            isActive={currentStep === 1}
          />,
          <Step3Proof
            key="step3"
            onComplete={completeStep}
            isActive={currentStep === 2}
          />,
          <Step4Explain
            key="step4"
            onComplete={completeStep}
            isActive={currentStep === 3}
          />,
          <Step5Practice
            key="step5"
            onComplete={completeStep}
            isActive={currentStep === 4}
          />,
          <Step6Verify
            key="step6"
            onComplete={completeStep}
            isActive={currentStep === 5}
          />,
        ];

        return stepComponents[currentStep] || null;
      }}
    </LessonShell>
  );
}
