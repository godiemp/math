'use client';

import { useRouter } from 'next/navigation';
import { LessonShell } from '@/components/lessons/shared';
import { getLessonBySlug } from '@/lib/lessons/types';
import {
  Step1Hook,
  Step2Explore,
  Step3Explain,
  Step4Classify,
  Step5Practice,
  Step6Verify,
} from '@/components/lessons/m1/problemas-vida-cotidiana';

const LESSON_SLUG = 'problemas-vida-cotidiana';

export default function LessonPage() {
  const router = useRouter();
  const lesson = getLessonBySlug(LESSON_SLUG);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Lección no encontrada</p>
      </div>
    );
  }

  return (
    <LessonShell
      lesson={lesson}
      onComplete={() => router.push('/mini-lessons')}
      onExit={() => router.push('/mini-lessons')}
    >
      {({ currentStep, completeStep }) => {
        const steps = [
          <Step1Hook key="1" onComplete={completeStep} isActive={currentStep === 0} />,
          <Step2Explore key="2" onComplete={completeStep} isActive={currentStep === 1} />,
          <Step3Explain key="3" onComplete={completeStep} isActive={currentStep === 2} />,
          <Step4Classify key="4" onComplete={completeStep} isActive={currentStep === 3} />,
          <Step5Practice key="5" onComplete={completeStep} isActive={currentStep === 4} />,
          <Step6Verify key="6" onComplete={completeStep} isActive={currentStep === 5} />,
        ];
        return steps[currentStep] || null;
      }}
    </LessonShell>
  );
}
