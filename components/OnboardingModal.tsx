'use client';

import { useState } from 'react';
import { Button, Heading, Text } from '@/components/ui';
import { OnboardingStage } from '@/lib/types/core';

interface OnboardingModalProps {
  userName: string;
  onComplete: (preferredSubject: 'M1' | 'M2' | 'both') => void;
  onSkip: () => void;
}

export function OnboardingModal({ userName, onComplete, onSkip }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<'M1' | 'M2' | 'both' | null>(null);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4 && selectedGoal) {
      onComplete(selectedGoal);
    }
  };

  const handleGoalSelection = (goal: 'M1' | 'M2' | 'both') => {
    setSelectedGoal(goal);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Progress Indicator */}
        <div className="sticky top-0 bg-white dark:bg-[#1C1C1E] border-b border-black/[0.12] dark:border-white/[0.16] px-6 py-4 rounded-t-3xl">
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step <= currentStep
                    ? 'bg-[#0A84FF]'
                    : 'bg-black/10 dark:bg-white/10'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <Text size="xs" variant="secondary">
              Paso {currentStep} de 4
            </Text>
            <button
              onClick={onSkip}
              className="text-xs text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80 transition-colors"
            >
              Saltar tutorial
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="text-6xl mb-4">👋</div>
              <Heading level={2} size="lg" className="mb-3">
                ¡Bienvenido, {userName}!
              </Heading>
              <Text size="md" variant="secondary" className="max-w-md mx-auto leading-relaxed">
                Esta plataforma te ayudará a prepararte para la PAES de Matemática.
                Te guiaremos paso a paso para que aproveches al máximo todas las herramientas disponibles.
              </Text>
              <div className="pt-4">
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📝</div>
                    <Text size="xs" variant="secondary">
                      Práctica ilimitada
                    </Text>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🔥</div>
                    <Text size="xs" variant="secondary">
                      Rachas diarias
                    </Text>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🤖</div>
                    <Text size="xs" variant="secondary">
                      Tutor IA
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Goal Selection */}
          {currentStep === 2 && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="text-6xl mb-4">🎯</div>
              <Heading level={2} size="lg" className="mb-3">
                ¿Cuál es tu objetivo?
              </Heading>
              <Text size="md" variant="secondary" className="max-w-md mx-auto mb-6">
                Selecciona qué competencia matemática necesitas preparar
              </Text>

              <div className="space-y-3 max-w-md mx-auto">
                <button
                  onClick={() => handleGoalSelection('M1')}
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedGoal === 'M1'
                      ? 'border-[#0A84FF] bg-[#0A84FF]/10 dark:bg-[#0A84FF]/20'
                      : 'border-black/10 dark:border-white/10 hover:border-[#0A84FF]/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📐</div>
                    <div className="flex-1">
                      <Heading level={3} size="xs" className="mb-1">
                        Competencia M1
                      </Heading>
                      <Text size="sm" variant="secondary">
                        Matemática básica: números, álgebra, geometría y probabilidades
                      </Text>
                    </div>
                    {selectedGoal === 'M1' && (
                      <div className="text-2xl text-[#0A84FF]">✓</div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => handleGoalSelection('M2')}
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedGoal === 'M2'
                      ? 'border-[#0A84FF] bg-[#0A84FF]/10 dark:bg-[#0A84FF]/20'
                      : 'border-black/10 dark:border-white/10 hover:border-[#0A84FF]/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🎓</div>
                    <div className="flex-1">
                      <Heading level={3} size="xs" className="mb-1">
                        Competencia M2
                      </Heading>
                      <Text size="sm" variant="secondary">
                        Matemática avanzada para carreras científicas y de ingeniería
                      </Text>
                    </div>
                    {selectedGoal === 'M2' && (
                      <div className="text-2xl text-[#0A84FF]">✓</div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => handleGoalSelection('both')}
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedGoal === 'both'
                      ? 'border-[#0A84FF] bg-[#0A84FF]/10 dark:bg-[#0A84FF]/20'
                      : 'border-black/10 dark:border-white/10 hover:border-[#0A84FF]/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🚀</div>
                    <div className="flex-1">
                      <Heading level={3} size="xs" className="mb-1">
                        Ambas Competencias
                      </Heading>
                      <Text size="sm" variant="secondary">
                        Preparación completa para M1 y M2
                      </Text>
                    </div>
                    {selectedGoal === 'both' && (
                      <div className="text-2xl text-[#0A84FF]">✓</div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Dashboard Tour */}
          {currentStep === 3 && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="text-6xl mb-4">🗺️</div>
              <Heading level={2} size="lg" className="mb-3">
                Tu Panel de Control
              </Heading>
              <Text size="md" variant="secondary" className="max-w-md mx-auto mb-6">
                Aquí encontrarás todo lo que necesitas para practicar
              </Text>

              <div className="space-y-4 max-w-lg mx-auto text-left">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                  <div className="text-3xl flex-shrink-0">📝</div>
                  <div>
                    <Heading level={4} size="xs" className="mb-1">
                      Práctica por Temas
                    </Heading>
                    <Text size="sm" variant="secondary">
                      Elige un tema específico y comienza a practicar. Modo Zen para aprender sin presión o Rapid Fire para simular el examen.
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                  <div className="text-3xl flex-shrink-0">🔥</div>
                  <div>
                    <Heading level={4} size="xs" className="mb-1">
                      Rachas de Estudio
                    </Heading>
                    <Text size="sm" variant="secondary">
                      Mantén tu racha diaria completando al menos un quiz cada día. ¡La constancia es clave!
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                  <div className="text-3xl flex-shrink-0">🤖</div>
                  <div>
                    <Heading level={4} size="xs" className="mb-1">
                      Tutor con IA
                    </Heading>
                    <Text size="sm" variant="secondary">
                      En modo Zen, puedes chatear con un tutor IA que te ayudará a entender cualquier concepto.
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                  <div className="text-3xl flex-shrink-0">📊</div>
                  <div>
                    <Heading level={4} size="xs" className="mb-1">
                      Seguimiento de Progreso
                    </Heading>
                    <Text size="sm" variant="secondary">
                      Revisa tus estadísticas, identifica áreas de mejora y celebra tus logros.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: First Quiz CTA */}
          {currentStep === 4 && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="text-6xl mb-4">🎉</div>
              <Heading level={2} size="lg" className="mb-3">
                ¡Todo Listo!
              </Heading>
              <Text size="md" variant="secondary" className="max-w-md mx-auto mb-6">
                Es hora de comenzar tu primera práctica. Te recomendamos empezar con el modo Zen para familiarizarte con la plataforma.
              </Text>

              <div className="bg-gradient-to-r from-[#5E5CE6]/10 to-[#0A84FF]/10 dark:from-[#9A99FF]/10 dark:to-[#0A84FF]/10 rounded-2xl p-6 max-w-md mx-auto">
                <div className="text-4xl mb-3">💡</div>
                <Heading level={4} size="xs" className="mb-2">
                  Consejo para tu primer quiz
                </Heading>
                <Text size="sm" variant="secondary">
                  No te preocupes por tu puntaje inicial. El objetivo es aprender. Usa el tutor IA si tienes dudas y revisa siempre las explicaciones.
                </Text>
              </div>

              <div className="pt-4">
                <Text size="sm" className="font-semibold mb-2">
                  {selectedGoal === 'M1' ? '📐 Comenzarás con M1' :
                   selectedGoal === 'M2' ? '🎓 Comenzarás con M2' :
                   '🚀 Puedes elegir M1 o M2'}
                </Text>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white dark:bg-[#1C1C1E] border-t border-black/[0.12] dark:border-white/[0.16] px-8 py-6 rounded-b-3xl">
          <div className="flex gap-3 justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="min-w-[100px]"
            >
              ← Atrás
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentStep === 2 && !selectedGoal}
              className="min-w-[140px]"
            >
              {currentStep === 4 ? '¡Comenzar! 🚀' : 'Siguiente →'}
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
