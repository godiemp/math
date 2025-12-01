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

type Phase = 'show-problem' | 'starting' | 'jumping' | 'arrived' | 'insight';

export default function Step2NumberLineAddition({ onComplete, isActive }: LessonStepProps) {
  const [currentExample, setCurrentExample] = useState(0);
  const [phase, setPhase] = useState<Phase>('show-problem');
  const [currentPosition, setCurrentPosition] = useState(0);
  const [visitedPositions, setVisitedPositions] = useState<number[]>([]);
  const [jumpCount, setJumpCount] = useState(0);

  const example = EXAMPLES[currentExample];
  const isLastExample = currentExample === EXAMPLES.length - 1;
  const movingRight = example.operation > 0;
  const direction = movingRight ? 1 : -1;

  // Animation: show starting position
  useEffect(() => {
    if (phase === 'starting') {
      const timer = setTimeout(() => {
        setPhase('jumping');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Animation: jump step by step
  useEffect(() => {
    if (phase === 'jumping' && currentPosition !== example.result) {
      const timer = setTimeout(() => {
        setVisitedPositions(prev => [...prev, currentPosition]);
        setCurrentPosition(prev => prev + direction);
        setJumpCount(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (phase === 'jumping' && currentPosition === example.result) {
      // Arrived at destination
      const timer = setTimeout(() => {
        setPhase('arrived');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [phase, currentPosition, example.result, direction]);

  // Animation: show arrived state briefly before insight
  useEffect(() => {
    if (phase === 'arrived') {
      const timer = setTimeout(() => {
        setPhase('insight');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleAnimate = () => {
    setCurrentPosition(example.start);
    setVisitedPositions([]);
    setJumpCount(0);
    setPhase('starting');
  };

  const handleNext = () => {
    if (isLastExample) {
      onComplete();
    } else {
      setCurrentExample(prev => prev + 1);
      setPhase('show-problem');
      setCurrentPosition(0);
      setVisitedPositions([]);
      setJumpCount(0);
    }
  };

  if (!isActive) return null;

  // Number line setup: -6 to 6
  const lineMin = -6;
  const lineMax = 6;
  const lineNumbers = Array.from({ length: lineMax - lineMin + 1 }, (_, i) => lineMin + i);

  // Simple positioning: map -6..6 to 0..100%
  const getPosition = (value: number) => {
    return ((value - lineMin) / (lineMax - lineMin)) * 100;
  };

  const isAnimating = phase === 'starting' || phase === 'jumping' || phase === 'arrived';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Suma en la Recta Numérica
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa cómo nos movemos al sumar
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
          ({example.start}) + ({example.operation > 0 ? '+' : ''}{example.operation}) = {phase === 'arrived' || phase === 'insight' ? example.result : '?'}
        </p>
      </div>

      {/* Number Line */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md overflow-hidden">
        <div className="relative h-32 mx-4">
          {/* Base line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 -translate-y-1/2" />

          {/* Tick marks and numbers */}
          {lineNumbers.map(num => {
            const isVisited = visitedPositions.includes(num);
            const isCurrent = isAnimating && currentPosition === num;

            return (
              <div
                key={num}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${getPosition(num)}%` }}
              >
                {/* Tick mark */}
                <div className={cn(
                  'w-0.5 -mt-3 transition-all duration-300',
                  num === 0 ? 'bg-red-500 h-8' : 'bg-gray-400 dark:bg-gray-500 h-5',
                  isCurrent && 'bg-purple-500 h-8 w-1',
                  isVisited && 'bg-blue-400 h-6'
                )} />

                {/* Number label */}
                <span className={cn(
                  'text-sm mt-2 font-medium transition-all duration-300',
                  num === 0
                    ? 'font-bold text-red-600 dark:text-red-400'
                    : 'text-gray-500 dark:text-gray-400',
                  isCurrent && 'text-purple-600 dark:text-purple-400 font-bold text-base scale-110',
                  isVisited && 'text-blue-500 dark:text-blue-400'
                )}>
                  {num}
                </span>

                {/* Visited marker (footprint) */}
                {isVisited && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-3 h-3 bg-blue-400/60 rounded-full" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Moving point */}
          {isAnimating && (
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-400 ease-out"
              style={{ left: `${getPosition(currentPosition)}%` }}
            >
              {/* Main point */}
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform',
                phase === 'arrived' ? 'bg-green-500 scale-110' : 'bg-purple-500'
              )}>
                <span className="text-white text-sm font-bold">{currentPosition}</span>
              </div>

              {/* Direction arrow */}
              {phase === 'jumping' && currentPosition !== example.result && (
                <div className={cn(
                  'absolute top-1/2 -translate-y-1/2',
                  movingRight ? 'left-full ml-1' : 'right-full mr-1'
                )}>
                  {movingRight ? (
                    <ArrowRight className="w-5 h-5 text-green-500 animate-pulse" />
                  ) : (
                    <ArrowLeft className="w-5 h-5 text-orange-500 animate-pulse" />
                  )}
                </div>
              )}

              {/* Starting label */}
              {phase === 'starting' && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded">
                    Inicio
                  </span>
                </div>
              )}

              {/* Arrival label */}
              {phase === 'arrived' && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">
                    ¡Llegamos!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Jump counter */}
          {phase === 'jumping' && jumpCount > 0 && (
            <div className="absolute top-0 right-0 bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-lg">
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                {movingRight ? '+' : ''}{jumpCount * direction}
              </span>
            </div>
          )}
        </div>

        {/* Status message */}
        <div className="text-center mt-4 h-6">
          {phase === 'starting' && (
            <p className="text-purple-600 dark:text-purple-400 font-medium animate-fadeIn">
              Empezamos en {example.start}...
            </p>
          )}
          {phase === 'jumping' && (
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {movingRight ? 'Avanzando a la derecha' : 'Avanzando a la izquierda'}... ({jumpCount} de {Math.abs(example.operation)})
            </p>
          )}
          {phase === 'arrived' && (
            <p className="text-green-600 dark:text-green-400 font-medium animate-fadeIn">
              Nos movimos {Math.abs(example.operation)} {Math.abs(example.operation) === 1 ? 'posición' : 'posiciones'} a la {movingRight ? 'derecha' : 'izquierda'}
            </p>
          )}
        </div>

        {/* Direction reminder */}
        <div className="flex justify-between text-sm mt-2 px-4">
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
            Ver el movimiento
          </button>
        )}

        {(phase === 'starting' || phase === 'jumping') && (
          <div className="text-gray-500 dark:text-gray-400 py-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
            <span>Observa el movimiento...</span>
          </div>
        )}

        {phase === 'arrived' && (
          <div className="text-green-600 dark:text-green-400 py-3 font-medium">
            ¡Listo!
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
