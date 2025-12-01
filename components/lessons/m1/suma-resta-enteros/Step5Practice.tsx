'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, RotateCcw, Check, X, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  a: number;
  b: number;
  operation: '+' | '-';
  result: number;
  hint: string;
}

// Mixed problems with increasing difficulty
const PROBLEMS: Problem[] = [
  { a: 4, b: 2, operation: '+', result: 6, hint: 'Ambos positivos: suma directa' },
  { a: 5, b: -3, operation: '+', result: 2, hint: 'Signos diferentes: resta y usa signo del mayor' },
  { a: -3, b: -2, operation: '+', result: -5, hint: 'Ambos negativos: suma y mantén el signo' },
  { a: 6, b: 4, operation: '-', result: 2, hint: '6 - 4 = 6 + (-4) = 2' },
  { a: 3, b: -5, operation: '-', result: 8, hint: '3 - (-5) = 3 + 5 = 8' },
  { a: -2, b: 4, operation: '-', result: -6, hint: '-2 - 4 = -2 + (-4) = -6' },
  { a: -7, b: 3, operation: '+', result: -4, hint: '|-7| > |3|, resultado negativo' },
  { a: -4, b: -6, operation: '-', result: 2, hint: '-4 - (-6) = -4 + 6 = 2' },
];

const REQUIRED_CORRECT = 6;

// Generate 4 answer options
function generateOptions(correct: number): number[] {
  const options = new Set<number>([correct]);
  options.add(correct + 2);
  options.add(correct - 2);
  options.add(-correct);
  while (options.size < 4) {
    options.add(correct + Math.floor(Math.random() * 6) - 3);
  }
  return Array.from(options).sort((a, b) => a - b);
}

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [options, setOptions] = useState<number[]>([]);

  const problem = PROBLEMS[currentIndex];
  const isCorrect = selectedAnswer === problem?.result;
  const passed = score >= REQUIRED_CORRECT;

  // Generate new options when problem changes
  useEffect(() => {
    if (problem) {
      setOptions(generateOptions(problem.result));
    }
  }, [currentIndex, problem]);

  const handleSelect = (value: number) => {
    if (showFeedback) return;
    setSelectedAnswer(value);
  };

  const handleCheck = useCallback(() => {
    if (selectedAnswer === null || showFeedback) return;

    const correct = selectedAnswer === problem.result;
    setShowFeedback(true);
    setAnswers(prev => [...prev, correct]);

    if (correct) {
      setScore(prev => prev + 1);
    }

    // Auto-advance after feedback
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentIndex < PROBLEMS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  }, [selectedAnswer, problem, currentIndex, showFeedback]);

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsComplete(false);
    setAnswers([]);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica lo que aprendiste: suma y resta de enteros
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentIndex + 1} de {PROBLEMS.length}
            </div>
            <div className="text-sm font-bold text-green-600 dark:text-green-400">
              Correctas: {score}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1">
            {PROBLEMS.map((_, i) => (
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

          {/* Problem display */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-8 text-center">
            <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-mono">
              ({problem.a}) {problem.operation} ({problem.b}) = ?
            </p>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={showFeedback}
                className={cn(
                  'p-6 rounded-xl font-bold text-2xl transition-all border-2',
                  selectedAnswer === option
                    ? showFeedback
                      ? option === problem.result
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-red-500 text-white border-red-500'
                      : 'bg-blue-500 text-white border-blue-500'
                    : showFeedback && option === problem.result
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:scale-105'
                )}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Check button */}
          {!showFeedback && (
            <div className="flex justify-center">
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={cn(
              'p-4 rounded-xl animate-fadeIn',
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/30'
                : 'bg-amber-100 dark:bg-amber-900/30'
            )}>
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
                    {isCorrect ? '¡Correcto!' : `La respuesta es ${problem.result}`}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {problem.hint}
                  </p>
                </div>
              </div>
            </div>
          )}
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
              {passed ? '¡Excelente trabajo!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {score} / {PROBLEMS.length}
            </div>

            <p className={cn(
              'text-sm',
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Dominas la suma y resta de enteros'
                : `Necesitas ${REQUIRED_CORRECT} correctas para continuar`}
            </p>
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
