'use client';

import { useRouter } from 'next/navigation';
import { LessonShell } from '@/components/lessons/shared';
import { getLessonBySlug } from '@/lib/lessons/types';
import {
  Step1Hook,
  Step2SignRules,
  Step3Explain,
  Step4Practice,
  Step5Division,
  Step6Verify,
} from '@/components/lessons/m1/multiplicacion-division-enteros';

const LESSON_SLUG = 'multiplicacion-division-enteros';

export default function MultiplicacionDivisionEnterosLesson() {
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
    router.push('/curriculum/m1');
  };

  const handleExit = () => {
    router.push('/curriculum/m1');
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
          <Step2SignRules
            key="step2"
            onComplete={completeStep}
            isActive={currentStep === 1}
          />,
          <Step3Explain
            key="step3"
            onComplete={completeStep}
            isActive={currentStep === 2}
          />,
          <Step4Practice
            key="step4"
            onComplete={completeStep}
            isActive={currentStep === 3}
          />,
          <Step5Division
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
