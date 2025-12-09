'use client';

import { useState, useRef } from 'react';
import { ArrowRight, Check, X, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PlacementChallenge {
  id: number;
  fraction: { num: number; den: number };
  correctPosition: number; // 0 to 1
  tolerance: number; // acceptable error
}

const CHALLENGES: PlacementChallenge[] = [
  { id: 1, fraction: { num: 1, den: 2 }, correctPosition: 0.5, tolerance: 0.08 },
  { id: 2, fraction: { num: 1, den: 4 }, correctPosition: 0.25, tolerance: 0.08 },
  { id: 3, fraction: { num: 3, den: 4 }, correctPosition: 0.75, tolerance: 0.08 },
  { id: 4, fraction: { num: 2, den: 3 }, correctPosition: 0.667, tolerance: 0.08 },
];

export default function Step5NumberLine({ onComplete, isActive }: LessonStepProps) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [placedPosition, setPlacedPosition] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const numberLineRef = useRef<HTMLDivElement>(null);

  const challenge = CHALLENGES[currentChallenge];
  const isComplete = currentChallenge >= CHALLENGES.length;

  if (!isActive) return null;

  const isCorrect = placedPosition !== null &&
    Math.abs(placedPosition - challenge?.correctPosition) <= challenge?.tolerance;

  const getPositionFromEvent = (e: React.MouseEvent | React.TouchEvent) => {
    if (!numberLineRef.current) return 0;
    const rect = numberLineRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(1, x / rect.width));
    return position;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (showFeedback) return;
    setIsDragging(true);
    setPlacedPosition(getPositionFromEvent(e));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || showFeedback) return;
    setPlacedPosition(getPositionFromEvent(e));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (showFeedback) return;
    setIsDragging(true);
    setPlacedPosition(getPositionFromEvent(e));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || showFeedback) return;
    setPlacedPosition(getPositionFromEvent(e));
  };

  const handleCheck = () => {
    if (placedPosition === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setPlacedPosition(null);
    setShowFeedback(false);
    setCurrentChallenge(prev => prev + 1);
  };

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Recta Numérica
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Práctica completada!
          </p>
        </div>

        <div className={cn(
          'p-6 rounded-xl border-2 text-center',
          correctCount >= 3
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
        )}>
          <div className="text-4xl font-bold mb-2">
            {correctCount}/{CHALLENGES.length}
          </div>
          <p className={cn(
            'font-medium',
            correctCount >= 3
              ? 'text-green-700 dark:text-green-300'
              : 'text-amber-700 dark:text-amber-300'
          )}>
            {correctCount === CHALLENGES.length && '¡Excelente! Dominas la recta numérica.'}
            {correctCount === 3 && '¡Muy bien! Tienes buen sentido de las fracciones.'}
            {correctCount === 2 && '¡Buen intento! Sigue practicando.'}
            {correctCount <= 1 && 'La práctica hace al maestro.'}
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3">Lo que aprendiste:</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Cada fracción tiene un <strong>lugar exacto</strong> en la recta numérica.
            Practicar ubicar fracciones te ayuda a entender su <strong>tamaño real</strong>.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Recta Numérica
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ubica la fracción en su lugar
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {CHALLENGES.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i < currentChallenge
                ? 'bg-green-500'
                : i === currentChallenge
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Challenge */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
        <div className="text-center mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Coloca esta fracción en la recta numérica:
          </p>
          <div className="inline-flex flex-col items-center bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-md">
            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {challenge.fraction.num}
            </span>
            <div className="h-1 w-12 bg-gray-400 dark:bg-gray-500 my-1"></div>
            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {challenge.fraction.den}
            </span>
          </div>
        </div>

        {/* Interactive number line */}
        <div className="relative py-12">
          {/* Instruction */}
          {placedPosition === null && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
              Toca o arrastra en la recta
            </div>
          )}

          {/* Number line container */}
          <div
            ref={numberLineRef}
            className={cn(
              'relative h-4 bg-gray-200 dark:bg-gray-600 rounded-full cursor-pointer select-none',
              !showFeedback && 'hover:bg-gray-300 dark:hover:bg-gray-500'
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* Tick marks */}
            {[0, 0.25, 0.5, 0.75, 1].map((pos) => (
              <div
                key={pos}
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gray-400 dark:bg-gray-500"
                style={{ left: `${pos * 100}%` }}
              />
            ))}

            {/* Labels */}
            <div className="absolute -bottom-8 left-0 text-sm font-bold text-gray-700 dark:text-gray-300">0</div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">1/2</div>
            <div className="absolute -bottom-8 right-0 text-sm font-bold text-gray-700 dark:text-gray-300">1</div>

            {/* User's placed marker */}
            {placedPosition !== null && (
              <div
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-100',
                  isDragging && 'scale-125'
                )}
                style={{ left: `${placedPosition * 100}%` }}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center',
                  showFeedback
                    ? isCorrect
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-blue-500'
                )}>
                  {showFeedback && (
                    isCorrect
                      ? <Check className="w-3 h-3 text-white" />
                      : <X className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            )}

            {/* Correct position marker (shown after feedback if wrong) */}
            {showFeedback && !isCorrect && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${challenge.correctPosition * 100}%` }}
              >
                <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                  <Target className="w-3 h-3 text-white" />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-green-600 dark:text-green-400 font-bold whitespace-nowrap">
                  Correcto
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hint */}
        {!showFeedback && (
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            <strong>Pista:</strong>{' '}
            {challenge.fraction.num === 1 && challenge.fraction.den === 2 && 'La mitad está justo en el centro.'}
            {challenge.fraction.num === 1 && challenge.fraction.den === 4 && '1/4 es la mitad de 1/2.'}
            {challenge.fraction.num === 3 && challenge.fraction.den === 4 && '3/4 está entre 1/2 y 1.'}
            {challenge.fraction.num === 2 && challenge.fraction.den === 3 && '2/3 es un poco más que 1/2.'}
          </div>
        )}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl border-2 animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
            )}
            <div>
              <h4 className={cn(
                'font-bold',
                isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}>
                {isCorrect ? '¡Excelente!' : '¡Casi!'}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {isCorrect
                  ? `Ubicaste ${challenge.fraction.num}/${challenge.fraction.den} correctamente.`
                  : `${challenge.fraction.num}/${challenge.fraction.den} está más cerca de ${challenge.correctPosition < 0.5 ? 'cero' : 'uno'}.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <button
            onClick={handleCheck}
            disabled={placedPosition === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              placedPosition !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Comprobar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>{currentChallenge < CHALLENGES.length - 1 ? 'Siguiente' : 'Finalizar'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
