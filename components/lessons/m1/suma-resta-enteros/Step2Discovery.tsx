'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Example {
  start: number;
  operation: number;
  result: number;
  insight: string;
}

const EXAMPLES: Example[] = [
  {
    start: 2,
    operation: 3,
    result: 5,
    insight: 'Sumar un positivo te mueve a la DERECHA',
  },
  {
    start: 2,
    operation: -4,
    result: -2,
    insight: 'Sumar un negativo te mueve a la IZQUIERDA',
  },
  {
    start: -3,
    operation: 5,
    result: 2,
    insight: 'No importa dónde empieces: positivo = derecha, negativo = izquierda',
  },
];

export default function Step2Discovery({ onComplete, isActive }: LessonStepProps) {
  const [currentExample, setCurrentExample] = useState(0);
  const [phase, setPhase] = useState<'show-problem' | 'animating' | 'insight'>('show-problem');
  const [animationStep, setAnimationStep] = useState(0);

  const example = EXAMPLES[currentExample];
  const isLastExample = currentExample === EXAMPLES.length - 1;

  // Animation sequence
  useEffect(() => {
    if (phase === 'animating') {
      const timer = setTimeout(() => {
        if (animationStep < 2) {
          setAnimationStep(prev => prev + 1);
        } else {
          setPhase('insight');
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [phase, animationStep]);

  const handleAnimate = () => {
    setPhase('animating');
    setAnimationStep(0);
  };

  const handleNext = () => {
    if (isLastExample) {
      onComplete();
    } else {
      setCurrentExample(prev => prev + 1);
      setPhase('show-problem');
      setAnimationStep(0);
    }
  };

  if (!isActive) return null;

  // Number line setup
  const lineMin = -6;
  const lineMax = 6;
  const lineNumbers = Array.from({ length: lineMax - lineMin + 1 }, (_, i) => lineMin + i);

  const getPosition = (value: number) => {
    return ((value - lineMin) / (lineMax - lineMin)) * 100;
  };

  const movingRight = example.operation > 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubriendo el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa qué pasa cuando sumamos en la recta numérica
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {EXAMPLES.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i === currentExample
                ? 'bg-purple-500 scale-125'
                : i < currentExample
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Problem display */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Empezamos en {example.start} y sumamos {example.operation > 0 ? '+' : ''}{example.operation}
        </p>
        <p className="text-4xl font-bold text-gray-900 dark:text-white">
          ({example.start}) + ({example.operation > 0 ? '+' : ''}{example.operation}) = ?
        </p>
      </div>

      {/* Number Line */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <div className="relative h-24">
          {/* Base line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-300 dark:bg-gray-600 -translate-y-1/2" />

          {/* Tick marks and numbers */}
          {lineNumbers.map(num => (
            <div
              key={num}
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `calc(${getPosition(num)}% * 0.92 + 4%)` }}
            >
              <div className={cn(
                'w-0.5 h-4 -mt-2',
                num === 0 ? 'bg-red-500 h-6' : 'bg-gray-400 dark:bg-gray-500'
              )} />
              <span className={cn(
                'text-sm mt-1 font-medium',
                num === 0
                  ? 'font-bold text-red-600 dark:text-red-400'
                  : 'text-gray-600 dark:text-gray-400'
              )}>
                {num}
              </span>
            </div>
          ))}

          {/* Starting position */}
          <div
            className="absolute top-1 -translate-x-1/2 transition-all duration-300"
            style={{ left: `calc(${getPosition(example.start)}% * 0.92 + 4%)` }}
          >
            <div className="relative">
              <div className="w-5 h-5 bg-blue-500 rounded-full shadow-lg" />
              <span className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-blue-600 dark:text-blue-400 font-bold whitespace-nowrap">
                inicio
              </span>
            </div>
          </div>

          {/* Animation: Arrow showing movement */}
          {animationStep >= 1 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3 transition-all duration-700 flex items-center"
              style={{
                left: `calc(${getPosition(Math.min(example.start, example.result))}% * 0.92 + 4%)`,
                width: `calc(${Math.abs(getPosition(example.result) - getPosition(example.start))}% * 0.92)`,
              }}
            >
              <div className={cn(
                'h-full w-full rounded-full',
                movingRight
                  ? 'bg-gradient-to-r from-blue-400 to-green-400'
                  : 'bg-gradient-to-l from-blue-400 to-orange-400'
              )} />
              {movingRight ? (
                <ArrowRight className="w-6 h-6 text-green-500 -ml-2 flex-shrink-0" />
              ) : (
                <ArrowLeft className="w-6 h-6 text-orange-500 -mr-2 flex-shrink-0 order-first" />
              )}
            </div>
          )}

          {/* Result position */}
          {animationStep >= 2 && (
            <div
              className="absolute -bottom-1 -translate-x-1/2 transition-all duration-500 animate-bounce"
              style={{ left: `calc(${getPosition(example.result)}% * 0.92 + 4%)` }}
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">{example.result}</span>
              </div>
            </div>
          )}
        </div>

        {/* Direction reminder */}
        <div className="flex justify-between text-sm mt-4 px-4">
          <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
            <ArrowLeft size={16} />
            <span>Negativos</span>
          </div>
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <span>Positivos</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Insight reveal */}
      {phase === 'insight' && (
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl p-6 border-2 border-yellow-400 animate-fadeIn">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200 text-lg mb-1">
                ¡Descubrimiento!
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300">
                {example.insight}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-mono">
                ({example.start}) + ({example.operation > 0 ? '+' : ''}{example.operation}) = {example.result}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary after all examples */}
      {phase === 'insight' && isLastExample && (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700 animate-fadeIn">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 text-center">
            Lo que descubriste:
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-3">
              <ArrowRight className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                Sumar un <strong className="text-green-600">positivo</strong> = moverse a la <strong>derecha</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-3">
              <ArrowLeft className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                Sumar un <strong className="text-orange-600">negativo</strong> = moverse a la <strong>izquierda</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action button */}
      <div className="flex justify-center">
        {phase === 'show-problem' && (
          <button
            onClick={handleAnimate}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            Ver qué pasa
          </button>
        )}

        {phase === 'animating' && (
          <div className="text-gray-500 dark:text-gray-400 py-3">
            Observa el movimiento...
          </div>
        )}

        {phase === 'insight' && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>{isLastExample ? 'Continuar' : 'Siguiente ejemplo'}</span>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
