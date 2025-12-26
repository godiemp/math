'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, ArrowRight, Flame, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  description: string;
  expression: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    description: 'Centro C = (0, 0), Punto P = (2, 3), k = 2',
    expression: "P' = ?",
    options: ['(4, 6)', '(1, 1.5)', '(2, 3)', '(-4, -6)'],
    correctIndex: 0,
    hint: "P' = C + k·(P - C) = (0,0) + 2·(2,3) = (4, 6). Amplificación al doble.",
  },
  {
    id: 'p2',
    description: 'Centro C = (0, 0), Punto P = (6, 4), k = 0.5',
    expression: "P' = ?",
    options: ['(12, 8)', '(3, 2)', '(6, 4)', '(-3, -2)'],
    correctIndex: 1,
    hint: "P' = C + k·(P - C) = (0,0) + 0.5·(6,4) = (3, 2). Reducción a la mitad.",
  },
  {
    id: 'p3',
    description: 'Centro C = (1, 1), Punto P = (4, 3), k = -1',
    expression: "P' = ?",
    options: ['(4, 3)', '(-2, -1)', '(7, 5)', '(1, 1)'],
    correctIndex: 1,
    hint: "P' = (1,1) + (-1)·((4,3) - (1,1)) = (1,1) + (-1)·(3,2) = (-2, -1). Inversión.",
  },
  {
    id: 'p4',
    description: 'Centro C = (2, 2), Punto P = (4, 4), k = 3',
    expression: "P' = ?",
    options: ['(8, 8)', '(6, 6)', '(12, 12)', '(2, 2)'],
    correctIndex: 0,
    hint: "P' = (2,2) + 3·((4,4) - (2,2)) = (2,2) + 3·(2,2) = (8, 8). Amplificación.",
  },
  {
    id: 'p5',
    description: 'Centro C = (0, 0), Punto P = (8, 6), k = 0.25',
    expression: "P' = ?",
    options: ['(32, 24)', '(4, 3)', '(2, 1.5)', '(16, 12)'],
    correctIndex: 2,
    hint: "P' = (0,0) + 0.25·(8,6) = (2, 1.5). Reducción a un cuarto.",
  },
  {
    id: 'p6',
    description: 'Centro C = (3, 2), Punto P = (5, 4), k = -2',
    expression: "P' = ?",
    options: ['(-1, -2)', '(7, 6)', '(-4, -4)', '(11, 8)'],
    correctIndex: 0,
    hint: "P' = (3,2) + (-2)·((5,4) - (3,2)) = (3,2) + (-2)·(2,2) = (-1, -2). Inversión con amplificación.",
  },
  {
    id: 'p7',
    description: 'Centro C = (1, 0), Punto P = (5, 4), k = 1.5',
    expression: "P' = ?",
    options: ['(7, 6)', '(5, 4)', '(9, 8)', '(3, 2)'],
    correctIndex: 0,
    hint: "P' = (1,0) + 1.5·((5,4) - (1,0)) = (1,0) + 1.5·(4,4) = (7, 6). Amplificación.",
  },
  {
    id: 'p8',
    description: 'Centro C = (0, 0), Punto P = (3, 6), k = ⅓',
    expression: "P' = ?",
    options: ['(9, 18)', '(1, 2)', '(3, 6)', '(-1, -2)'],
    correctIndex: 1,
    hint: "P' = (0,0) + (1/3)·(3,6) = (1, 2). Reducción a un tercio.",
  },
  {
    id: 'p9',
    description: 'Centro C = (2, 3), Punto P = (2, 3), k = 5',
    expression: "P' = ?",
    options: ['(10, 15)', '(2, 3)', '(0, 0)', '(7, 8)'],
    correctIndex: 1,
    hint: "Cuando P = C, el punto no se mueve: P' = C + k·(0,0) = C = (2, 3).",
  },
  {
    id: 'p10',
    description: 'Centro C = (0, 0), Punto P = (4, -2), k = -0.5',
    expression: "P' = ?",
    options: ['(-2, 1)', '(8, -4)', '(2, -1)', '(-4, 2)'],
    correctIndex: 0,
    hint: "P' = (0,0) + (-0.5)·(4,-2) = (-2, 1). Inversión con reducción.",
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
  const correctCount = answers.filter((a) => a).length;
  const passed = correctCount >= REQUIRED_CORRECT;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === problem.correctIndex;
    setShowFeedback(true);
    setAnswers((prev) => [...prev, isCorrect]);

    if (isCorrect) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem((prev) => prev + 1);
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
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
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
                  {i < answers.length ? answers[i] ? '✓' : '✗' : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="mb-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Datos:</p>
              <p className="font-mono text-lg font-semibold text-purple-600 dark:text-purple-400 text-center bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
                {problem.description}
              </p>
            </div>

            <p className="text-3xl font-mono font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              {problem.expression}
            </p>

            {/* Formula reminder */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lightbulb size={16} className="text-yellow-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                P&apos; = C + k · (P - C)
              </p>
            </div>

            {/* Options - 2x2 grid */}
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
                    <p
                      className={cn(
                        'font-bold',
                        isCorrect
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-amber-700 dark:text-amber-300'
                      )}
                    >
                      {isCorrect ? '¡Correcto!' : '¡Casi!'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{problem.hint}</p>
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
        /* Results screen */
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
                ? '¡Dominas el cálculo de homotecias!'
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
                  <div className="font-mono font-bold">{i + 1}</div>
                  {answers[i] ? (
                    <Check size={14} className="mx-auto" />
                  ) : (
                    <X size={14} className="mx-auto" />
                  )}
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
