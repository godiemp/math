'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Equivalent fractions that all equal 1/2
const FRACTIONS = [
  { numerator: 1, denominator: 2, color: 'blue' as const },
  { numerator: 2, denominator: 4, color: 'green' as const },
  { numerator: 4, denominator: 8, color: 'purple' as const },
  { numerator: 3, denominator: 6, color: 'orange' as const },
];

const FRACTION_DURATION = 2000; // 2 seconds per fraction

type FractionColor = 'blue' | 'green' | 'purple' | 'orange';

const colorClasses: Record<FractionColor, { filled: string; empty: string; border: string; text: string }> = {
  blue: {
    filled: 'bg-blue-500 dark:bg-blue-600',
    empty: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-600 dark:border-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    filled: 'bg-green-500 dark:bg-green-600',
    empty: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-600 dark:border-green-500',
    text: 'text-green-600 dark:text-green-400',
  },
  purple: {
    filled: 'bg-purple-500 dark:bg-purple-600',
    empty: 'bg-purple-100 dark:bg-purple-900/30',
    border: 'border-purple-600 dark:border-purple-500',
    text: 'text-purple-600 dark:text-purple-400',
  },
  orange: {
    filled: 'bg-orange-500 dark:bg-orange-600',
    empty: 'bg-orange-100 dark:bg-orange-900/30',
    border: 'border-orange-600 dark:border-orange-500',
    text: 'text-orange-600 dark:text-orange-400',
  },
};

interface FractionBarProps {
  denominator: number;
  numerator: number;
  color: FractionColor;
}

function FractionBar({ denominator, numerator, color }: FractionBarProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={{ scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full origin-left"
    >
      <div
        className={cn(
          'relative w-full h-8 rounded-lg overflow-hidden border-2',
          colors.border
        )}
      >
        <div className="flex h-full">
          {Array.from({ length: denominator }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'flex-1 h-full transition-colors duration-300',
                i < numerator ? colors.filled : colors.empty,
                i > 0 && 'border-l',
                colors.border
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function FractionBarsPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through fractions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % FRACTIONS.length);
    }, FRACTION_DURATION);

    return () => clearInterval(interval);
  }, []);

  const currentFraction = FRACTIONS[currentIndex];
  const colors = colorClasses[currentFraction.color];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl overflow-hidden p-6">
      {/* Title */}
      <motion.p
        key={currentIndex}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4"
      >
        Fracciones Equivalentes
      </motion.p>

      {/* Fraction display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4 w-full max-w-xs"
        >
          {/* Fraction number */}
          <div className={cn('text-3xl font-bold', colors.text)}>
            {currentFraction.numerator}/{currentFraction.denominator}
          </div>

          {/* Fraction bar */}
          <FractionBar
            denominator={currentFraction.denominator}
            numerator={currentFraction.numerator}
            color={currentFraction.color}
          />
        </motion.div>
      </AnimatePresence>

      {/* Equivalence indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
      >
        <span>=</span>
        <span className="font-semibold">la mitad</span>
        <span>=</span>
        <span className="font-mono">50%</span>
      </motion.div>

      {/* Dots indicator */}
      <div className="mt-4 flex gap-2">
        {FRACTIONS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i === currentIndex
                ? 'bg-purple-500 scale-125'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>
    </div>
  );
}
