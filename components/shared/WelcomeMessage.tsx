'use client';

import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api-client';
import type { PaesExamTarget } from '@/lib/types/core';

interface WelcomeMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

type WelcomeStep = 'exam-selection' | 'winter-followup' | 'message';

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<WelcomeStep>('exam-selection');
  const [selectedExam, setSelectedExam] = useState<PaesExamTarget | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [key, setKey] = useState(0);

  // Message sequences for TypeAnimation
  const getSequence = (exam: PaesExamTarget) => {
    if (exam === 'invierno_2026') {
      return [
        '¡bienvenido! 🌿',
        600,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de invierno 2026.',
        400,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de invierno 2026.\njunio está más cerca de lo que parece, pero tienes todo\nlo que necesitas para llegar preparado.',
        400,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de invierno 2026.\njunio está más cerca de lo que parece, pero tienes todo\nlo que necesitas para llegar preparado.\n\nvamos paso a paso, con dedicación.',
        400,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de invierno 2026.\njunio está más cerca de lo que parece, pero tienes todo\nlo que necesitas para llegar preparado.\n\nvamos paso a paso, con dedicación.\n\n¡a darle con todo! 💪',
        () => setIsComplete(true)
      ];
    } else if (exam === 'verano_2026') {
      return [
        '¡bienvenido! 🌿',
        600,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de verano 2026.',
        400,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de verano 2026.\ndiciembre parece lejos, pero el tiempo pasa rápido.\ntienes tiempo de sobra para prepararte bien.',
        400,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de verano 2026.\ndiciembre parece lejos, pero el tiempo pasa rápido.\ntienes tiempo de sobra para prepararte bien.\n\nvamos sin prisa, pero sin pausa.',
        400,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de verano 2026.\ndiciembre parece lejos, pero el tiempo pasa rápido.\ntienes tiempo de sobra para prepararte bien.\n\nvamos sin prisa, pero sin pausa.\n\n¡esto recién comienza! 🎉',
        () => setIsComplete(true)
      ];
    } else {
      // verano_e_invierno_2026
      return [
        '¡bienvenido! 🌿',
        600,
        '¡bienvenido! 🌿\n\n¡dos oportunidades para demostrar lo que vales!',
        400,
        '¡bienvenido! 🌿\n\n¡dos oportunidades para demostrar lo que vales!\nprimero la paes de invierno en junio,\ny luego la de verano en diciembre.',
        400,
        '¡bienvenido! 🌿\n\n¡dos oportunidades para demostrar lo que vales!\nprimero la paes de invierno en junio,\ny luego la de verano en diciembre.\n\ntienes tiempo para prepararte bien para ambas.',
        400,
        '¡bienvenido! 🌿\n\n¡dos oportunidades para demostrar lo que vales!\nprimero la paes de invierno en junio,\ny luego la de verano en diciembre.\n\ntienes tiempo para prepararte bien para ambas.\n\n¡vamos con todo! 💪🎉',
        () => setIsComplete(true)
      ];
    }
  };

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('exam-selection');
      setSelectedExam(null);
      setIsComplete(false);
      setCanSkip(false);
      setKey(prev => prev + 1);
    }
  }, [isOpen]);

  // Allow skip after 1 second (only in message step)
  useEffect(() => {
    if (isOpen && step === 'message') {
      const timer = setTimeout(() => setCanSkip(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, step]);

  const handleExamSelection = (exam: 'invierno_2026' | 'verano_2026') => {
    if (exam === 'verano_2026') {
      // Ask follow-up question for verano
      setStep('winter-followup');
    } else {
      // Go directly to message for invierno
      setSelectedExam(exam);
      setStep('message');
      setIsComplete(false);
    }
  };

  const handleWinterFollowup = (alsoWinter: boolean) => {
    if (alsoWinter) {
      setSelectedExam('verano_e_invierno_2026');
    } else {
      setSelectedExam('verano_2026');
    }
    setStep('message');
    setIsComplete(false);
  };

  const handleSkip = () => {
    if (!canSkip || !selectedExam) return;
    setIsComplete(true);
  };

  const handleComplete = async () => {
    // Save the selection to the backend
    if (selectedExam) {
      try {
        await api.post('/api/user/welcome-seen', { paesExamTarget: selectedExam });
      } catch (error) {
        console.error('Failed to save PAES exam target:', error);
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
      onClick={step === 'message' && canSkip ? handleSkip : undefined}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          'backdrop-blur-[40px]',
          'bg-gradient-to-br from-white/95 via-white/90 to-white/85',
          'dark:from-[#1C1C1C]/95 dark:via-[#1C1C1C]/90 dark:to-[#1C1C1C]/85',
          'rounded-[32px]',
          'border border-black/[0.08] dark:border-white/[0.12]',
          'shadow-[0_24px_64px_rgba(0,0,0,0.18)]',
          'w-full max-w-2xl',
          'animate-in zoom-in-95 duration-500'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient orb background effect */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-500/15 to-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-8 md:p-12">
          {step === 'exam-selection' ? (
            // Exam Selection Step
            <div className="text-center">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  ¡bienvenido! 🌿
                </h2>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  ¿para qué paes te estás preparando?
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6 max-w-md mx-auto">
                {/* PAES Invierno 2026 Option */}
                <button
                  onClick={() => handleExamSelection('invierno_2026')}
                  className={cn(
                    'group relative overflow-hidden',
                    'p-4 sm:p-6 md:p-8 rounded-2xl',
                    'bg-gradient-to-br from-blue-500 to-indigo-500',
                    'hover:from-blue-600 hover:to-indigo-600',
                    'text-white font-semibold text-xl',
                    'shadow-[0_8px_24px_rgba(59,130,246,0.4)]',
                    'hover:shadow-[0_12px_32px_rgba(59,130,246,0.5)]',
                    'transition-all duration-300',
                    'active:scale-[0.98]',
                    'border border-blue-400/30'
                  )}
                >
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">❄️</div>
                    <div className="font-bold text-xl sm:text-2xl mb-1">PAES invierno 2026</div>
                    <div className="text-xs sm:text-sm text-white/90 font-normal">
                      junio 2026
                    </div>
                  </div>
                </button>

                {/* PAES Verano 2026 Option */}
                <button
                  onClick={() => handleExamSelection('verano_2026')}
                  className={cn(
                    'group relative overflow-hidden',
                    'p-4 sm:p-6 md:p-8 rounded-2xl',
                    'bg-gradient-to-br from-emerald-500 to-teal-500',
                    'hover:from-emerald-600 hover:to-teal-600',
                    'text-white font-semibold text-xl',
                    'shadow-[0_8px_24px_rgba(16,185,129,0.4)]',
                    'hover:shadow-[0_12px_32px_rgba(16,185,129,0.5)]',
                    'transition-all duration-300',
                    'active:scale-[0.98]',
                    'border border-emerald-400/30'
                  )}
                >
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">☀️</div>
                    <div className="font-bold text-xl sm:text-2xl mb-1">PAES verano 2026</div>
                    <div className="text-xs sm:text-sm text-white/90 font-normal">
                      diciembre 2026
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : step === 'winter-followup' ? (
            // Winter Follow-up Question (only shown if they selected verano)
            <div className="text-center">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  una pregunta más
                </h2>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  ¿también darás la PAES de invierno 2026?
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6 max-w-md mx-auto">
                {/* Yes, both */}
                <button
                  onClick={() => handleWinterFollowup(true)}
                  className={cn(
                    'group relative overflow-hidden',
                    'p-4 sm:p-6 rounded-2xl',
                    'bg-gradient-to-br from-purple-500 to-pink-500',
                    'hover:from-purple-600 hover:to-pink-600',
                    'text-white font-semibold text-lg',
                    'shadow-[0_8px_24px_rgba(168,85,247,0.4)]',
                    'hover:shadow-[0_12px_32px_rgba(168,85,247,0.5)]',
                    'transition-all duration-300',
                    'active:scale-[0.98]',
                    'border border-purple-400/30'
                  )}
                >
                  <div className="relative z-10">
                    <div className="text-xl sm:text-2xl mb-1">❄️ + ☀️</div>
                    <div className="font-bold text-lg sm:text-xl">sí, ambas</div>
                    <div className="text-xs sm:text-sm text-white/90 font-normal">
                      invierno y verano 2026
                    </div>
                  </div>
                </button>

                {/* No, just verano */}
                <button
                  onClick={() => handleWinterFollowup(false)}
                  className={cn(
                    'group relative overflow-hidden',
                    'p-4 sm:p-6 rounded-2xl',
                    'bg-gradient-to-br from-gray-500 to-gray-600',
                    'hover:from-gray-600 hover:to-gray-700',
                    'text-white font-semibold text-lg',
                    'shadow-[0_8px_24px_rgba(107,114,128,0.4)]',
                    'hover:shadow-[0_12px_32px_rgba(107,114,128,0.5)]',
                    'transition-all duration-300',
                    'active:scale-[0.98]',
                    'border border-gray-400/30'
                  )}
                >
                  <div className="relative z-10">
                    <div className="text-xl sm:text-2xl mb-1">☀️</div>
                    <div className="font-bold text-lg sm:text-xl">no, solo verano</div>
                    <div className="text-xs sm:text-sm text-white/90 font-normal">
                      diciembre 2026
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            // Message Step with TypeAnimation
            <div>
              {/* Message text with typewriter effect using library */}
              <div className="mb-6 sm:mb-8 min-h-[280px] sm:min-h-[260px] md:min-h-[240px]">
                {selectedExam && (
                  <TypeAnimation
                    key={key}
                    sequence={getSequence(selectedExam)}
                    wrapper="p"
                    speed={75}
                    className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-900 dark:text-gray-100 font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif] whitespace-pre-wrap"
                    cursor={true}
                    repeat={0}
                  />
                )}
              </div>

              {/* Button - only show when complete */}
              {isComplete && (
                <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <button
                    onClick={handleComplete}
                    className={cn(
                      'px-6 sm:px-8 py-3 sm:py-4 rounded-2xl',
                      'bg-gradient-to-r from-blue-600 to-blue-500',
                      'hover:from-blue-700 hover:to-blue-600',
                      'text-white font-semibold text-base sm:text-lg',
                      'shadow-[0_8px_24px_rgba(37,99,235,0.35)]',
                      'hover:shadow-[0_12px_32px_rgba(37,99,235,0.45)]',
                      'transition-all duration-300',
                      'active:scale-[0.98]',
                      'border border-blue-400/20'
                    )}
                  >
                    comenzar 🚀
                  </button>
                </div>
              )}

              {/* Skip hint */}
              {!isComplete && canSkip && (
                <div className="mt-6 text-center animate-in fade-in duration-1000">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    (haz clic en cualquier parte para saltar)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

WelcomeMessage.displayName = 'WelcomeMessage';
