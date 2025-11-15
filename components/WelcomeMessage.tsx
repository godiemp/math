'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TypeAnimation } from 'react-type-animation';
import { cn } from '@/lib/utils';

interface WelcomeMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [step, setStep] = useState<'year-selection' | 'message'>('year-selection');
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026' | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [key, setKey] = useState(0);

  // Message sequences for TypeAnimation
  const getSequence = (year: '2025' | '2026') => {
    if (year === '2025') {
      return [
        '¡bienvenido! 🌿',
        600,
        '¡bienvenido! 🌿\n\n¡la paes está cerca! pero no te preocupes,',
        400,
        '¡bienvenido! 🌿\n\n¡la paes está cerca! pero no te preocupes,\nestamos acá para ayudarte en estos últimos días.',
        400,
        '¡bienvenido! 🌿\n\n¡la paes está cerca! pero no te preocupes,\nestamos acá para ayudarte en estos últimos días.\n\nvamos a las sesiones en vivo donde puedes practicar\nensayos completos con otros estudiantes.',
        400,
        '¡bienvenido! 🌿\n\n¡la paes está cerca! pero no te preocupes,\nestamos acá para ayudarte en estos últimos días.\n\nvamos a las sesiones en vivo donde puedes practicar\nensayos completos con otros estudiantes.\n\n¡vamos con todo! 💪',
        () => setIsComplete(true)
      ];
    } else {
      return [
        '¡bienvenido! 🌿',
        600,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de junio 2026.',
        400,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de junio 2026.\ntienes tiempo, tienes apoyo, y tienes todo lo que necesitas\npara llegar preparado.',
        400,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de junio 2026.\ntienes tiempo, tienes apoyo, y tienes todo lo que necesitas\npara llegar preparado.\n\nvamos paso a paso, sin presión.',
        400,
        '¡bienvenido! 🌿\n\nacabas de dar el primer paso para tu paes de junio 2026.\ntienes tiempo, tienes apoyo, y tienes todo lo que necesitas\npara llegar preparado.\n\nvamos paso a paso, sin presión.\n\n¡esto recién comienza! 🎉',
        () => setIsComplete(true)
      ];
    }
  };

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('year-selection');
      setSelectedYear(null);
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

  const handleYearSelection = (year: '2025' | '2026') => {
    setSelectedYear(year);
    setStep('message');
    setIsComplete(false);
  };

  const handleSkip = () => {
    if (!canSkip || !selectedYear) return;
    setIsComplete(true);
  };

  const handleComplete = () => {
    if (selectedYear === '2025') {
      onClose();
      router.push('/live-practice');
    } else {
      onClose();
    }
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
          {step === 'year-selection' ? (
            // Year Selection Step
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
                {/* PAES 2025 Option */}
                <button
                  onClick={() => handleYearSelection('2025')}
                  className={cn(
                    'group relative overflow-hidden',
                    'p-4 sm:p-6 md:p-8 rounded-2xl',
                    'bg-gradient-to-br from-orange-500 to-red-500',
                    'hover:from-orange-600 hover:to-red-600',
                    'text-white font-semibold text-xl',
                    'shadow-[0_8px_24px_rgba(249,115,22,0.4)]',
                    'hover:shadow-[0_12px_32px_rgba(249,115,22,0.5)]',
                    'transition-all duration-300',
                    'active:scale-[0.98]',
                    'border border-orange-400/30'
                  )}
                >
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🔥</div>
                    <div className="font-bold text-xl sm:text-2xl mb-1">PAES 2025</div>
                    <div className="text-xs sm:text-sm text-white/90 font-normal">
                      ¡está cerca! preparación intensiva
                    </div>
                  </div>
                </button>

                {/* PAES 2026 Option */}
                <button
                  onClick={() => handleYearSelection('2026')}
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
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🌱</div>
                    <div className="font-bold text-xl sm:text-2xl mb-1">PAES 2026</div>
                    <div className="text-xs sm:text-sm text-white/90 font-normal">
                      junio 2026 • tienes tiempo
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
                {selectedYear && (
                  <TypeAnimation
                    key={key}
                    sequence={getSequence(selectedYear)}
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
                    {selectedYear === '2025' ? 'ir a práctica en vivo 🔥' : 'comenzar 🚀'}
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
