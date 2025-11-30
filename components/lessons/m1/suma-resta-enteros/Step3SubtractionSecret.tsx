'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Equal, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'example1-setup' | 'example1-reveal' | 'example2-setup' | 'example2-reveal' | 'summary';

export default function Step3SubtractionSecret({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');

  // Auto-advance for reveals
  useEffect(() => {
    if (phase === 'example1-setup' || phase === 'example2-setup') {
      const timer = setTimeout(() => {
        if (phase === 'example1-setup') setPhase('example1-reveal');
        if (phase === 'example2-setup') setPhase('example2-reveal');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleNext = () => {
    switch (phase) {
      case 'intro':
        setPhase('example1-setup');
        break;
      case 'example1-reveal':
        setPhase('example2-setup');
        break;
      case 'example2-reveal':
        setPhase('summary');
        break;
      case 'summary':
        onComplete();
        break;
    }
  };

  if (!isActive) return null;

  // Number line helper
  const lineMin = -4;
  const lineMax = 8;
  const lineNumbers = Array.from({ length: lineMax - lineMin + 1 }, (_, i) => lineMin + i);
  const getPosition = (value: number) => ((value - lineMin) / (lineMax - lineMin)) * 100;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Secreto de la Resta
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre algo que te hará la vida más fácil
        </p>
      </div>

      {/* Intro */}
      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              ¿Y si te dijera que la resta NO existe?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Bueno, no exactamente... pero hay un truco que convierte cualquier resta en una suma.
            </p>
          </div>
        </div>
      )}

      {/* Example 1: 5 - 3 vs 5 + (-3) */}
      {(phase === 'example1-setup' || phase === 'example1-reveal') && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center mb-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Observa estas dos operaciones:</p>
          </div>

          {/* Side by side comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left: 5 - 3 */}
            <div className={cn(
              'bg-white dark:bg-gray-800 rounded-xl p-4 border-2 transition-all',
              phase === 'example1-reveal' ? 'border-green-400' : 'border-gray-200 dark:border-gray-700'
            )}>
              <p className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-2">
                5 − 3
              </p>
              <div className={cn(
                'text-center text-3xl font-bold transition-all',
                phase === 'example1-reveal' ? 'text-green-500' : 'text-gray-300'
              )}>
                {phase === 'example1-reveal' ? '= 2' : '= ?'}
              </div>
            </div>

            {/* Right: 5 + (-3) */}
            <div className={cn(
              'bg-white dark:bg-gray-800 rounded-xl p-4 border-2 transition-all',
              phase === 'example1-reveal' ? 'border-green-400' : 'border-gray-200 dark:border-gray-700'
            )}>
              <p className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-2">
                5 + (−3)
              </p>
              <div className={cn(
                'text-center text-3xl font-bold transition-all',
                phase === 'example1-reveal' ? 'text-green-500' : 'text-gray-300'
              )}>
                {phase === 'example1-reveal' ? '= 2' : '= ?'}
              </div>
            </div>
          </div>

          {/* Reveal message */}
          {phase === 'example1-reveal' && (
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center animate-fadeIn">
              <div className="flex items-center justify-center gap-3">
                <Equal className="w-6 h-6 text-green-500" />
                <p className="text-lg font-bold text-green-700 dark:text-green-300">
                  ¡Son lo mismo!
                </p>
                <Equal className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Restar 3 es lo mismo que sumar −3
              </p>
            </div>
          )}
        </div>
      )}

      {/* Example 2: 4 - (-2) = 4 + 2 (the double negative) */}
      {(phase === 'example2-setup' || phase === 'example2-reveal') && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center mb-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2">¿Y qué pasa si restamos un negativo?</p>
          </div>

          {/* Side by side comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left: 4 - (-2) */}
            <div className={cn(
              'bg-white dark:bg-gray-800 rounded-xl p-4 border-2 transition-all',
              phase === 'example2-reveal' ? 'border-purple-400' : 'border-gray-200 dark:border-gray-700'
            )}>
              <p className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-2">
                4 − (−2)
              </p>
              <div className={cn(
                'text-center text-3xl font-bold transition-all',
                phase === 'example2-reveal' ? 'text-purple-500' : 'text-gray-300'
              )}>
                {phase === 'example2-reveal' ? '= 6' : '= ?'}
              </div>
            </div>

            {/* Right: 4 + 2 */}
            <div className={cn(
              'bg-white dark:bg-gray-800 rounded-xl p-4 border-2 transition-all',
              phase === 'example2-reveal' ? 'border-purple-400' : 'border-gray-200 dark:border-gray-700'
            )}>
              <p className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-2">
                4 + 2
              </p>
              <div className={cn(
                'text-center text-3xl font-bold transition-all',
                phase === 'example2-reveal' ? 'text-purple-500' : 'text-gray-300'
              )}>
                {phase === 'example2-reveal' ? '= 6' : '= ?'}
              </div>
            </div>
          </div>

          {/* Reveal message */}
          {phase === 'example2-reveal' && (
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center animate-fadeIn">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                  ¡También son iguales!
                </p>
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
                Restar un negativo es lo mismo que sumar un positivo
              </p>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {phase === 'summary' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl p-6 border-2 border-yellow-400">
            <div className="text-center mb-4">
              <Sparkles className="w-10 h-10 mx-auto text-yellow-500 mb-2" />
              <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
                El Gran Secreto
              </h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Restar es sumar el opuesto
              </p>
              <div className="space-y-3 text-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">a − b</span>
                  {' = '}
                  <span className="font-mono bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded text-blue-700 dark:text-blue-300">a + (−b)</span>
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p className="text-yellow-700 dark:text-yellow-300 text-center">
                Ahora cualquier resta la puedes convertir en suma
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action button */}
      <div className="flex justify-center">
        {(phase === 'intro' || phase === 'example1-reveal' || phase === 'example2-reveal' || phase === 'summary') && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>
              {phase === 'summary' ? 'Continuar' : 'Ver'}
            </span>
            <ChevronRight size={20} />
          </button>
        )}

        {(phase === 'example1-setup' || phase === 'example2-setup') && (
          <div className="text-gray-500 dark:text-gray-400 py-3 animate-pulse">
            Calculando...
          </div>
        )}
      </div>
    </div>
  );
}
