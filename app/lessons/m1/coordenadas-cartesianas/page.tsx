'use client';

import { useRouter } from 'next/navigation';
import { LessonShell } from '@/components/lessons/shared';
import { getLessonBySlug } from '@/lib/lessons/types';
import {
  Step1Hook,
  Step2Explore,
  Step3Classify,
  Step4Practice,
  Step5Verify,
} from '@/components/lessons/m1/coordenadas-cartesianas';

const LESSON_SLUG = 'coordenadas-cartesianas';

export default function CoordenadasCartesianasPage() {
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
          <Step3Classify key="3" onComplete={completeStep} isActive={currentStep === 2} />,
          <Step4Practice key="4" onComplete={completeStep} isActive={currentStep === 3} />,
          <Step5Verify key="5" onComplete={completeStep} isActive={currentStep === 4} />,
        ];
        return steps[currentStep] || null;
      }}
    </LessonShell>
  );
}
