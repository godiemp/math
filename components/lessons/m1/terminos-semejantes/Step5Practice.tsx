'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, ArrowRight, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  expression: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

const PROBLEMS: Problem[] = [
  {
    expression: '4x + 3x',
    options: ['7x', '7x²', '12x', '1x'],
    correctIndex: 0,
    hint: '4 + 3 = 7',
  },
  {
    expression: '5y - 2y',
    options: ['3y', '7y', '3', '3y²'],
    correctIndex: 0,
    hint: '5 - 2 = 3',
  },
  {
    expression: '3a + 2b + 5a',
    options: ['8a + 2b', '10ab', '5a + 5b', '10a + b'],
    correctIndex: 0,
    hint: '(3a + 5a) + 2b = 8a + 2b',
  },
  {
    expression: '6x² - 2x² + x²',
    options: ['5x²', '5x⁶', '4x²', '6x²'],
    correctIndex: 0,
    hint: '6 - 2 + 1 = 5',
  },
  {
    expression: '4xy + 3xy - xy',
    options: ['6xy', '6x²y²', '7xy', '6'],
    correctIndex: 0,
    hint: '4 + 3 - 1 = 6',
  },
  {
    expression: '2x + 3y + 4x - y',
    options: ['6x + 2y', '8xy', '6x - 2y', '6x + 4y'],
    correctIndex: 0,
    hint: '(2x + 4x) + (3y - y) = 6x + 2y',
  },
  {
    expression: '5 + 3x - 2 + x',
    options: ['4x + 3', '7x', '3 + 3x', '6x + 3'],
    correctIndex: 0,
    hint: '(3x + x) + (5 - 2) = 4x + 3',
  },
  {
    expression: '-2a + 5a - a',
    options: ['2a', '-8a', '4a', '6a'],
    correctIndex: 0,
    hint: '-2 + 5 - 1 = 2',
  },
  {
    expression: '3m² + 2m + m² - m',
    options: ['4m² + m', '5m³', '4m² + 3m', '6m²'],
    correctIndex: 0,
    hint: '(3m² + m²) + (2m - m) = 4m² + m',
  },
  {
    expression: '7p - 3q + 2p + 3q',
    options: ['9p', '9p + 6q', '9pq', '9p - 6q'],
    correctIndex: 0,
    hint: '(7p + 2p) + (-3q + 3q) = 9p + 0 = 9p',
  },
];

const REQUIRED_CORRECT = 7;

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  const problem = PROBLEMS[currentProblem];
  const correctCount = answers.filter(a => a).length;
  const passed = correctCount >= REQUIRED_CORRECT;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === problem.correctIndex;
    setShowFeedback(true);
    setAnswers(prev => [...prev, isCorrect]);

    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswers([]);
    setIsComplete(false);
    setStreak(0);
  };

  const isCorrect = selectedAnswer === problem?.correctIndex;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Desafío Express
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Necesitas {REQUIRED_CORRECT} de {PROBLEMS.length} correctas para avanzar
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress and streak */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {PROBLEMS.length}
            </div>
            {streak >= 3 && (
              <div className="flex items-center gap-1 text-orange-500 animate-pulse">
                <Flame size={20} />
                <span className="font-bold">{streak} racha</span>
              </div>
            )}
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    i < answers.length
                      ? answers[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-center">Simplifica:</p>
            <p className="text-3xl font-mono font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              {problem.expression}
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-mono font-bold text-lg transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === problem.correctIndex
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : showFeedback && index === problem.correctIndex
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl animate-fadeIn',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className={cn('font-bold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {problem.hint}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Check/Next button */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              passed
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            {passed ? (
              <Check className="w-20 h-20 mx-auto text-green-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Felicitaciones!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>

            <p
              className={cn(
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed
                ? 'Has demostrado que dominas los términos semejantes'
                : `Necesitas ${REQUIRED_CORRECT} respuestas correctas. ¡Puedes intentarlo de nuevo!`}
            </p>
          </div>

          {/* Answer summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="grid grid-cols-5 gap-2">
              {PROBLEMS.map((p, i) => (
                <div
                  key={i}
                  className={cn(
                    'p-2 rounded-lg text-center text-xs',
                    answers[i]
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  )}
                >
                  <div className="font-mono font-bold">{p.expression.split(' ')[0]}...</div>
                  {answers[i] ? <Check size={14} className="mx-auto" /> : <X size={14} className="mx-auto" />}
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
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
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
