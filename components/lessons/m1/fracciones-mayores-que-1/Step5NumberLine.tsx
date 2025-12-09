'use client';

import { useState, useRef } from 'react';
import { ArrowRight, Check, X, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Challenge {
  id: string;
  numerator: number;
  denominator: number;
  correctPosition: number;
  mixedForm: string;
  hint: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    numerator: 5,
    denominator: 4,
    correctPosition: 1.25,
    mixedForm: '1 1/4',
    hint: '5/4 = 1 entero y 1/4 más',
  },
  {
    id: 'c2',
    numerator: 3,
    denominator: 2,
    correctPosition: 1.5,
    mixedForm: '1 1/2',
    hint: '3/2 = 1 entero y 1/2 más (la mitad entre 1 y 2)',
  },
  {
    id: 'c3',
    numerator: 7,
    denominator: 4,
    correctPosition: 1.75,
    mixedForm: '1 3/4',
    hint: '7/4 = 1 entero y 3/4 más',
  },
  {
    id: 'c4',
    numerator: 5,
    denominator: 2,
    correctPosition: 2.5,
    mixedForm: '2 1/2',
    hint: '5/2 = 2 enteros y 1/2 más (la mitad entre 2 y 3)',
  },
];

const TOLERANCE = 0.15; // Allow some tolerance for correct placement
const MAX_VALUE = 3;

export default function Step5NumberLine({
  onComplete,
  isActive,
}: LessonStepProps) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [markerPosition, setMarkerPosition] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCorrectPosition, setShowCorrectPosition] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const numberLineRef = useRef<HTMLDivElement>(null);

  const challenge = CHALLENGES[currentChallenge];
  const isComplete = currentChallenge >= CHALLENGES.length;

  const isCorrect =
    markerPosition !== null &&
    Math.abs(markerPosition - challenge?.correctPosition) <= TOLERANCE;

  if (!isActive) return null;

  const getPositionFromEvent = (
    clientX: number,
  ): number => {
    if (!numberLineRef.current) return 0;
    const rect = numberLineRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = x / rect.width;
    return Math.max(0, Math.min(MAX_VALUE, percentage * MAX_VALUE));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (showFeedback) return;
    setIsDragging(true);
    const position = getPositionFromEvent(e.clientX);
    setMarkerPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || showFeedback) return;
    const position = getPositionFromEvent(e.clientX);
    setMarkerPosition(position);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (showFeedback) return;
    setIsDragging(true);
    const touch = e.touches[0];
    const position = getPositionFromEvent(touch.clientX);
    setMarkerPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || showFeedback) return;
    const touch = e.touches[0];
    const position = getPositionFromEvent(touch.clientX);
    setMarkerPosition(position);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCheck = () => {
    if (markerPosition === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setShowCorrectPosition(true);
    }
  };

  const handleNext = () => {
    setMarkerPosition(null);
    setShowFeedback(false);
    setShowCorrectPosition(false);
    setCurrentChallenge(prev => prev + 1);
  };

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    const percentage = Math.round((correctCount / CHALLENGES.length) * 100);

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Más Allá del 1
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Desafíos completados!
          </p>
        </div>

        <div
          className={cn(
            'p-8 rounded-xl border-2 text-center',
            percentage >= 75
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400',
          )}
        >
          <Target
            className={cn(
              'w-16 h-16 mx-auto mb-4',
              percentage >= 75 ? 'text-green-500' : 'text-amber-500',
            )}
          />

          <div className="text-5xl font-bold mb-2">
            {correctCount}/{CHALLENGES.length}
          </div>

          <p className="text-2xl font-medium mb-4">{percentage}% correcto</p>

          <p
            className={cn(
              'font-medium text-lg',
              percentage >= 75
                ? 'text-green-700 dark:text-green-300'
                : 'text-amber-700 dark:text-amber-300',
            )}
          >
            {percentage >= 75
              ? '¡Excelente! Ubicas bien las fracciones mayores que 1.'
              : 'Sigue practicando. ¡Cada vez lo harás mejor!'}
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
          Más Allá del 1
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ubica la fracción en la recta numérica
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
                  : 'bg-gray-300 dark:bg-gray-600',
            )}
          />
        ))}
      </div>

      {/* Fraction to place */}
      <div className="text-center">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-orange-100 to-purple-100 dark:from-orange-900/50 dark:to-purple-900/50 rounded-xl">
          <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
            Ubica esta fracción:
          </span>
          <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">
            {challenge.numerator}/{challenge.denominator}
          </span>
          {showFeedback && (
            <span className="text-lg text-gray-500 dark:text-gray-400 ml-3">
              = {challenge.mixedForm}
            </span>
          )}
        </div>
      </div>

      {/* Number line */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <div
          ref={numberLineRef}
          className="relative h-24 cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Number line base */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 dark:bg-gray-500 -translate-y-1/2" />

          {/* Integer markers */}
          {[0, 1, 2, 3].map(num => (
            <div
              key={num}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(num / MAX_VALUE) * 100}%` }}
            >
              <div className="w-1 h-6 bg-gray-600 dark:bg-gray-300 -translate-x-1/2" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-lg font-bold text-gray-700 dark:text-gray-300">
                {num}
              </div>
            </div>
          ))}

          {/* Half markers */}
          {[0.5, 1.5, 2.5].map(num => (
            <div
              key={num}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(num / MAX_VALUE) * 100}%` }}
            >
              <div className="w-0.5 h-4 bg-gray-400 dark:bg-gray-500 -translate-x-1/2" />
            </div>
          ))}

          {/* Quarter markers */}
          {[0.25, 0.75, 1.25, 1.75, 2.25, 2.75].map(num => (
            <div
              key={num}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(num / MAX_VALUE) * 100}%` }}
            >
              <div className="w-0.5 h-2 bg-gray-300 dark:bg-gray-600 -translate-x-1/2" />
            </div>
          ))}

          {/* Correct position indicator (shown after wrong answer) */}
          {showCorrectPosition && (
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
              style={{
                left: `${(challenge.correctPosition / MAX_VALUE) * 100}%`,
              }}
            >
              <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded font-medium">
                  Posición correcta
                </span>
              </div>
            </div>
          )}

          {/* User marker */}
          {markerPosition !== null && (
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all z-20',
                isDragging ? 'scale-125' : 'scale-100',
              )}
              style={{ left: `${(markerPosition / MAX_VALUE) * 100}%` }}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full border-4 shadow-lg flex items-center justify-center',
                  showFeedback
                    ? isCorrect
                      ? 'bg-green-500 border-green-300'
                      : 'bg-red-500 border-red-300'
                    : 'bg-blue-500 border-blue-300',
                )}
              >
                {showFeedback ? (
                  isCorrect ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <X className="w-4 h-4 text-white" />
                  )
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          )}

          {/* Touch instruction */}
          {markerPosition === null && !showFeedback && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm pointer-events-none">
              Toca o arrastra para ubicar
            </div>
          )}
        </div>
      </div>

      {/* Hint */}
      {!showFeedback && (
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
            <strong>Pista:</strong> {challenge.hint}
          </p>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl border-2 animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400',
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <Target className="w-6 h-6 text-amber-600 flex-shrink-0" />
            )}
            <div>
              <h4
                className={cn(
                  'font-bold',
                  isCorrect
                    ? 'text-green-800 dark:text-green-300'
                    : 'text-amber-800 dark:text-amber-300',
                )}
              >
                {isCorrect ? '¡Perfecto!' : '¡Casi!'}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {challenge.numerator}/{challenge.denominator} = {challenge.mixedForm}, que se
                ubica en {challenge.correctPosition} en la recta numérica.
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
            disabled={markerPosition === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              markerPosition !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
            )}
          >
            Comprobar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>
              {currentChallenge < CHALLENGES.length - 1
                ? 'Siguiente'
                : 'Ver resultados'}
            </span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
