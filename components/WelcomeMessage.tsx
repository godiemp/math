'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface WelcomeMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [step, setStep] = useState<'year-selection' | 'message'>('year-selection');
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026' | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  // Message lines based on selected year
  const getLines = (year: '2025' | '2026') => {
    if (year === '2025') {
      return [
        { text: '¡bienvenido! 🌿', pause: 600 },
        { text: '', pause: 0 },
        { text: '¡la paes está cerca! pero no te preocupes,', pause: 400 },
        { text: 'estamos acá para ayudarte en estos últimos días.', pause: 400 },
        { text: '', pause: 0 },
        { text: 'vamos a las sesiones en vivo donde puedes practicar', pause: 0 },
        { text: 'ensayos completos con otros estudiantes.', pause: 400 },
        { text: '', pause: 0 },
        { text: '¡vamos con todo! 💪', pause: 0 },
      ];
    } else {
      return [
        { text: '¡bienvenido! 🌿', pause: 600 },
        { text: '', pause: 0 },
        { text: 'acabas de dar el primer paso para tu paes de junio 2026.', pause: 400 },
        { text: 'tienes tiempo, tienes apoyo, y tienes todo lo que necesitas', pause: 0 },
        { text: 'para llegar preparado.', pause: 400 },
        { text: '', pause: 0 },
        { text: 'vamos paso a paso, sin presión.', pause: 400 },
        { text: '¡esto recién comienza! 🎉', pause: 0 },
      ];
    }
  };

  const lines = selectedYear ? getLines(selectedYear) : [];

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('year-selection');
      setSelectedYear(null);
      setDisplayedText('');
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsComplete(false);
      setCanSkip(false);
    }
  }, [isOpen]);

  // Allow skip after 1 second (only in message step)
  useEffect(() => {
    if (isOpen && step === 'message') {
      const timer = setTimeout(() => setCanSkip(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, step]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect with human-like timing
  useEffect(() => {
    if (!isOpen || step !== 'message' || !selectedYear) {
      return;
    }

    if (isComplete || currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];

    // Handle empty lines (spacing)
    if (currentLine.text === '') {
      setDisplayedText((prev) => prev + '\n');
      setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 100);
      return;
    }

    // If we've finished this line, move to next
    if (currentCharIndex >= currentLine.text.length) {
      setTimeout(() => {
        setDisplayedText((prev) => prev + '\n');
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, currentLine.pause);
      return;
    }

    // Type the next character
    const char = currentLine.text[currentCharIndex];

    // Variable speed for human-like typing
    let delay = 30;

    if (char === '.' || char === '!' || char === '?') {
      delay = 150;
    } else if (char === ',' || char === ';') {
      delay = 100;
    } else if (char === ' ') {
      delay = 40;
    } else {
      delay = 25 + Math.random() * 35;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + char);
      setCurrentCharIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isOpen, step, selectedYear, currentLineIndex, currentCharIndex, isComplete, lines]);

  const handleYearSelection = (year: '2025' | '2026') => {
    setSelectedYear(year);
    setStep('message');
  };

  const handleSkip = () => {
    if (!canSkip || !selectedYear) return;

    const fullText = lines.map(line => line.text).join('\n');
    setDisplayedText(fullText);
    setIsComplete(true);
  };

  const handleComplete = () => {
    if (selectedYear === '2025') {
      // Redirect to live practice for 2025
      onClose();
      router.push('/live-practice');
    } else {
      // Just close for 2026
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
        <div className="relative z-10 p-8 sm:p-12">
          {step === 'year-selection' ? (
            // Year Selection Step
            <div className="text-center">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  ¡bienvenido! 🌿
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  ¿para qué paes te estás preparando?
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6 max-w-md mx-auto">
                {/* PAES 2025 Option */}
                <button
                  onClick={() => handleYearSelection('2025')}
                  className={cn(
                    'group relative overflow-hidden',
                    'p-6 sm:p-8 rounded-2xl',
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
                    <div className="text-3xl mb-2">🔥</div>
                    <div className="font-bold text-2xl mb-1">PAES 2025</div>
                    <div className="text-sm text-white/90 font-normal">
                      ¡está cerca! preparación intensiva
                    </div>
                  </div>
                </button>

                {/* PAES 2026 Option */}
                <button
                  onClick={() => handleYearSelection('2026')}
                  className={cn(
                    'group relative overflow-hidden',
                    'p-6 sm:p-8 rounded-2xl',
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
                    <div className="text-3xl mb-2">🌱</div>
                    <div className="font-bold text-2xl mb-1">PAES 2026</div>
                    <div className="text-sm text-white/90 font-normal">
                      junio 2026 • tienes tiempo
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            // Message Step with Typewriter
            <div>
              {/* Message text with typewriter effect - Fixed height to prevent overlap */}
              <div className="mb-8" style={{ minHeight: '320px' }}>
                <p className="text-[22px] leading-[1.6] text-gray-900 dark:text-gray-100 font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif] whitespace-pre-wrap">
                  {displayedText}
                  {!isComplete && showCursor && (
                    <span className="inline-block w-[3px] h-[28px] bg-blue-500 ml-[2px] animate-pulse" />
                  )}
                </p>
              </div>

              {/* Button - only show when complete - Now has proper spacing */}
              {isComplete && (
                <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <button
                    onClick={handleComplete}
                    className={cn(
                      'px-8 py-4 rounded-2xl',
                      'bg-gradient-to-r from-blue-600 to-blue-500',
                      'hover:from-blue-700 hover:to-blue-600',
                      'text-white font-semibold text-lg',
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

              {/* Skip hint - Now positioned relative to avoid overlap */}
              {!isComplete && canSkip && (
                <div className="mt-8 text-center animate-in fade-in duration-1000">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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
