'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface WelcomeMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ isOpen, onClose }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  // Message lines with emojis
  const lines = [
    { text: '¡bienvenido! 🌿', pause: 600 },
    { text: '', pause: 0 }, // Empty line for spacing
    { text: 'acabas de dar el primer paso para tu paes de junio 2026.', pause: 400 },
    { text: 'tienes tiempo, tienes apoyo, y tienes todo lo que necesitas', pause: 0 },
    { text: 'para llegar preparado.', pause: 400 },
    { text: '', pause: 0 }, // Empty line for spacing
    { text: 'vamos paso a paso, sin presión.', pause: 400 },
    { text: '¡esto recién comienza! 🎉', pause: 0 },
  ];

  // Allow skip after 1 second
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setCanSkip(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect with human-like timing
  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setDisplayedText('');
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsComplete(false);
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
    let delay = 30; // Base delay

    // Punctuation gets longer pauses
    if (char === '.' || char === '!' || char === '?') {
      delay = 150;
    } else if (char === ',' || char === ';') {
      delay = 100;
    } else if (char === ' ') {
      delay = 40;
    } else {
      // Random variation for natural feel
      delay = 25 + Math.random() * 35; // 25-60ms
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + char);
      setCurrentCharIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isOpen, currentLineIndex, currentCharIndex, isComplete]);

  const handleSkip = () => {
    if (!canSkip) return;

    // Complete all text immediately
    const fullText = lines.map(line => line.text).join('\n');
    setDisplayedText(fullText);
    setIsComplete(true);
  };

  const handleComplete = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
      onClick={canSkip ? handleSkip : undefined}
    >
      <div
        className={cn(
          // Modern glass morphism with gradient
          'relative overflow-hidden',
          'backdrop-blur-[40px]',
          'bg-gradient-to-br from-white/95 via-white/90 to-white/85',
          'dark:from-[#1C1C1C]/95 dark:via-[#1C1C1C]/90 dark:to-[#1C1C1C]/85',
          // Border with subtle gradient
          'rounded-[32px]',
          'border border-black/[0.08] dark:border-white/[0.12]',
          // Shadow for depth
          'shadow-[0_24px_64px_rgba(0,0,0,0.18)]',
          // Layout
          'w-full max-w-2xl p-12',
          // Animation
          'animate-in zoom-in-95 duration-500'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient orb background effect */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-500/15 to-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Message text with typewriter effect */}
          <div className="min-h-[280px]">
            <p className="text-[22px] leading-[1.6] text-gray-900 dark:text-gray-100 font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif] whitespace-pre-wrap">
              {displayedText}
              {!isComplete && showCursor && (
                <span className="inline-block w-[3px] h-[28px] bg-blue-500 ml-[2px] animate-pulse" />
              )}
            </p>
          </div>

          {/* Button - only show when complete */}
          {isComplete && (
            <div className="flex justify-center mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                comenzar 🚀
              </button>
            </div>
          )}

          {/* Skip hint - only show before complete and after 1 second */}
          {!isComplete && canSkip && (
            <div className="absolute bottom-6 left-0 right-0 text-center animate-in fade-in duration-1000">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                (haz clic en cualquier parte para saltar)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

WelcomeMessage.displayName = 'WelcomeMessage';
