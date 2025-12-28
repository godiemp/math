'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Users, Radio } from 'lucide-react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text } from '@/components/ui';
import { useLessonControl } from '@/hooks/teacher';
import { getLessonBySlug } from '@/lib/lessons/lessons';
import { cn } from '@/lib/utils';

export default function TeacherLiveLessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonSlug = params['lesson-slug'] as string;

  const lesson = getLessonBySlug(lessonSlug);
  const {
    isConnected,
    activeLesson,
    students,
    studentProgress,
    startLesson,
    setStep,
    nextStep,
    prevStep,
    endLesson,
  } = useLessonControl();

  // Auto-start lesson when page loads (if lesson exists and not already active)
  useEffect(() => {
    if (lesson && isConnected && !activeLesson) {
      startLesson(lesson);
    }
  }, [lesson, isConnected, activeLesson, startLesson]);

  // Handle lesson end
  const handleEndLesson = () => {
    endLesson();
    router.push('/teacher');
  };

  // Handle exit without ending
  const handleExit = () => {
    router.push('/teacher');
  };

  if (!lesson) {
    return (
      <TeacherLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Text variant="secondary">Lección no encontrada</Text>
          <button
            onClick={() => router.push('/teacher')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Volver al Dashboard
          </button>
        </div>
      </TeacherLayout>
    );
  }

  const currentStep = activeLesson?.currentStep || 1;
  const totalSteps = activeLesson?.totalSteps || lesson.steps.length;
  const currentStepDef = lesson.steps[currentStep - 1];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleExit}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Salir</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Connection status */}
            <div
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
                isConnected
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              )}
            >
              <span
                className={cn('w-2 h-2 rounded-full', isConnected ? 'bg-emerald-500' : 'bg-red-500')}
              />
              {isConnected ? 'Conectado' : 'Desconectado'}
            </div>

            {/* Live indicator */}
            {activeLesson && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-full text-sm font-medium">
                <Radio size={14} className="animate-pulse" />
                EN VIVO
              </div>
            )}
          </div>
        </div>

        {/* Lesson Title Card */}
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white" padding="lg">
          <Heading level={1} size="lg" className="text-white mb-2">
            {lesson.title}
          </Heading>
          <Text className="text-emerald-100">{lesson.description}</Text>
        </Card>

        {/* Step Navigation */}
        <Card padding="lg">
          <div className="flex flex-col items-center gap-6">
            {/* Step title */}
            <div className="text-center">
              <Text variant="secondary" size="sm">
                Paso {currentStep} de {totalSteps}
              </Text>
              <Heading level={2} size="md" className="mt-1">
                {currentStepDef?.title || 'Cargando...'}
              </Heading>
              {currentStepDef?.description && (
                <Text variant="secondary" className="mt-2">
                  {currentStepDef.description}
                </Text>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevStep}
                disabled={isFirstStep}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                  isFirstStep
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                )}
              >
                <ChevronLeft size={20} />
                Anterior
              </button>

              <button
                onClick={nextStep}
                disabled={isLastStep}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                  isLastStep
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                )}
              >
                Siguiente
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Step dots */}
            <div className="flex items-center gap-2">
              {lesson.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setStep(index + 1)}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all',
                    index + 1 === currentStep
                      ? 'bg-emerald-500 scale-125'
                      : index + 1 < currentStep
                        ? 'bg-emerald-300 dark:bg-emerald-700'
                        : 'bg-gray-200 dark:bg-gray-700'
                  )}
                  title={step.title}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Students Panel */}
        <Card padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-emerald-600" />
            <Heading level={3} size="sm">
              Estudiantes Conectados ({students.length})
            </Heading>
          </div>

          {students.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users size={24} className="text-gray-400" />
              </div>
              <Text variant="secondary">Esperando estudiantes...</Text>
              <Text variant="secondary" size="sm" className="mt-1">
                Los estudiantes asignados a ti recibirán una notificación
              </Text>
            </div>
          ) : (
            <div className="space-y-2">
              {students.map((student) => {
                // Find latest progress for this student
                const latestProgress = studentProgress.find((p) => p.studentId === student.studentId);

                return (
                  <div
                    key={student.studentId}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
                        {student.studentName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {student.studentName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {latestProgress && (
                        <span
                          className={cn(
                            'text-sm px-2 py-1 rounded',
                            latestProgress.isCorrect
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          )}
                        >
                          Paso {latestProgress.stepNumber}: {latestProgress.isCorrect ? '✓' : '✗'}
                        </span>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Conectado
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* End Lesson Button */}
        <div className="flex justify-center">
          <button
            onClick={handleEndLesson}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
          >
            Terminar Lección
          </button>
        </div>
      </div>
    </TeacherLayout>
  );
}
