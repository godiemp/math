'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, RotateCcw, Check, X, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ComparisonPair {
  left: number;
  right: number;
}

// Generate comparison pairs with increasing difficulty
const COMPARISON_PAIRS: ComparisonPair[] = [
  { left: 3, right: 5 },      // Easy: both positive
  { left: -2, right: 4 },     // Mixed: negative vs positive
  { left: -3, right: 2 },     // Mixed
  { left: -5, right: -2 },    // Tricky: both negative
  { left: 0, right: -3 },     // Zero vs negative
  { left: -1, right: -4 },    // Both negative
  { left: -10, right: -1 },   // Tricky: bigger absolute value
  { left: 7, right: -7 },     // Opposites
  { left: -8, right: 0 },     // Zero vs negative
  { left: -6, right: -9 },    // Both negative, close
];

const REQUIRED_CORRECT = 8;
const TOTAL_QUESTIONS = 10;

export default function Step4Comparison({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const currentPair = COMPARISON_PAIRS[currentIndex];
  const correctAnswer = currentPair?.left > currentPair?.right ? 'left' : 'right';

  const handleAnswer = useCallback((answer: 'left' | 'right') => {
    if (showFeedback || isComplete) return;

    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setAnswers(prev => [...prev, correct]);

    if (correct) {
      setScore(prev => prev + 1);
    }

    // Auto-advance after feedback
    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < TOTAL_QUESTIONS - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 1200);
  }, [currentIndex, correctAnswer, showFeedback, isComplete]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isActive || showFeedback || isComplete) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        handleAnswer('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        handleAnswer('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, showFeedback, isComplete, handleAnswer]);

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setIsComplete(false);
    setAnswers([]);
  };

  const passed = score >= REQUIRED_CORRECT;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Juego de Comparación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Cuál número es mayor? Haz clic o usa las flechas del teclado
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Pregunta {currentIndex + 1} de {TOTAL_QUESTIONS}
            </div>
            <div className="text-sm font-bold text-green-600 dark:text-green-400">
              Correctas: {score}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>

          {/* Answer indicators */}
          <div className="flex justify-center gap-1">
            {Array(TOTAL_QUESTIONS).fill(0).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all',
                  i < answers.length
                    ? answers[i]
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : i === currentIndex
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-gray-200 dark:bg-gray-700'
                )}
              >
                {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
              </div>
            ))}
          </div>

          {/* Comparison cards */}
          <div className="flex items-center justify-center gap-4 md:gap-8 py-8">
            {/* Left number */}
            <button
              onClick={() => handleAnswer('left')}
              disabled={showFeedback}
              className={cn(
                'w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-bold transition-all',
                'shadow-lg hover:shadow-xl',
                showFeedback && correctAnswer === 'left'
                  ? 'bg-green-500 text-white ring-4 ring-green-300 scale-110'
                  : showFeedback && correctAnswer === 'right'
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 scale-95'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              )}
            >
              {currentPair.left}
            </button>

            {/* VS indicator */}
            <div className="text-2xl font-bold text-gray-400">
              vs
            </div>

            {/* Right number */}
            <button
              onClick={() => handleAnswer('right')}
              disabled={showFeedback}
              className={cn(
                'w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-bold transition-all',
                'shadow-lg hover:shadow-xl',
                showFeedback && correctAnswer === 'right'
                  ? 'bg-green-500 text-white ring-4 ring-green-300 scale-110'
                  : showFeedback && correctAnswer === 'left'
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 scale-95'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              )}
            >
              {currentPair.right}
            </button>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={cn(
              'text-center py-4 rounded-xl animate-fadeIn',
              isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
            )}>
              <div className="flex items-center justify-center gap-2">
                {isCorrect ? (
                  <>
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-green-800 dark:text-green-300">¡Correcto!</span>
                  </>
                ) : (
                  <>
                    <X className="w-6 h-6 text-amber-600" />
                    <span className="font-bold text-amber-800 dark:text-amber-300">
                      La respuesta era {currentPair.left > currentPair.right ? currentPair.left : currentPair.right}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {currentPair.left} {currentPair.left > currentPair.right ? '>' : '<'} {currentPair.right}
              </p>
            </div>
          )}

          {/* Hint */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Recuerda: en la recta numérica, el número más a la <strong>derecha</strong> es mayor
          </div>
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div className={cn(
            'rounded-2xl p-8 text-center',
            passed
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
              : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
          )}>
            <div className="mb-4">
              {passed ? (
                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
              ) : (
                <RotateCcw className="w-16 h-16 mx-auto text-amber-500" />
              )}
            </div>

            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Excelente trabajo!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {score} / {TOTAL_QUESTIONS}
            </div>

            <p className={cn(
              'text-sm',
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Has demostrado que sabes comparar números enteros'
                : `Necesitas ${REQUIRED_CORRECT} correctas para continuar. ¡Inténtalo de nuevo!`}
            </p>
          </div>

          {/* Answer summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {COMPARISON_PAIRS.map((pair, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg',
                    answers[i] ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  )}
                >
                  {answers[i] ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-gray-700 dark:text-gray-300">
                    {pair.left} vs {pair.right}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!passed && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}

            {passed && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>Continuar</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
