'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { PRACTICE_PROBLEMS, PracticeProblem } from './data';

interface ProblemState {
  selectedAnswer: number | null;
  showHint: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
}

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [problemStates, setProblemStates] = useState<ProblemState[]>(
    PRACTICE_PROBLEMS.map(() => ({
      selectedAnswer: null,
      showHint: false,
      isAnswered: false,
      isCorrect: false,
    }))
  );

  if (!isActive) return null;

  const currentProblem = PRACTICE_PROBLEMS[currentIndex];
  const currentState = problemStates[currentIndex];
  const completedCount = problemStates.filter((s) => s.isAnswered).length;
  const correctCount = problemStates.filter((s) => s.isCorrect).length;

  const handleSelectAnswer = (answerIndex: number) => {
    if (currentState.isAnswered) return;

    setProblemStates((prev) => {
      const newStates = [...prev];
      newStates[currentIndex] = {
        ...newStates[currentIndex],
        selectedAnswer: answerIndex,
      };
      return newStates;
    });
  };

  const handleVerify = () => {
    if (currentState.selectedAnswer === null) return;

    const isCorrect = currentState.selectedAnswer === currentProblem.correctAnswer;

    setProblemStates((prev) => {
      const newStates = [...prev];
      newStates[currentIndex] = {
        ...newStates[currentIndex],
        isAnswered: true,
        isCorrect,
      };
      return newStates;
    });
  };

  const handleToggleHint = () => {
    setProblemStates((prev) => {
      const newStates = [...prev];
      newStates[currentIndex] = {
        ...newStates[currentIndex],
        showHint: !newStates[currentIndex].showHint,
      };
      return newStates;
    });
  };

  const handleNext = () => {
    if (currentIndex < PRACTICE_PROBLEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const allCompleted = completedCount === PRACTICE_PROBLEMS.length;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Práctica Guiada</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Problema {currentIndex + 1} de {PRACTICE_PROBLEMS.length}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {PRACTICE_PROBLEMS.map((_, i) => {
          const state = problemStates[i];
          return (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                i === currentIndex
                  ? 'bg-blue-500 text-white scale-110'
                  : state.isAnswered
                  ? state.isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              )}
            >
              {state.isAnswered ? (
                state.isCorrect ? (
                  <Check size={16} />
                ) : (
                  <X size={16} />
                )
              ) : (
                i + 1
              )}
            </button>
          );
        })}
      </div>

      {/* Problem card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
        >
          {/* Context */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">{currentProblem.context}</p>
          </div>

          {/* Question */}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {currentProblem.question}
          </h3>

          {/* Options */}
          <div className="space-y-2 mb-4">
            {currentProblem.options.map((option, i) => {
              const isSelected = currentState.selectedAnswer === i;
              const isCorrectAnswer = i === currentProblem.correctAnswer;
              const showResult = currentState.isAnswered;

              return (
                <button
                  key={i}
                  onClick={() => handleSelectAnswer(i)}
                  disabled={currentState.isAnswered}
                  className={cn(
                    'w-full p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3',
                    showResult
                      ? isCorrectAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : isSelected
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : 'border-gray-200 dark:border-gray-700 opacity-50'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  )}
                >
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0',
                      showResult
                        ? isCorrectAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : isSelected
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-400'
                        : isSelected
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 dark:border-gray-600 text-gray-400'
                    )}
                  >
                    {showResult ? (
                      isCorrectAnswer ? (
                        <Check size={14} />
                      ) : isSelected ? (
                        <X size={14} />
                      ) : (
                        String.fromCharCode(65 + i)
                      )
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Hint toggle */}
          {!currentState.isAnswered && (
            <button
              onClick={handleToggleHint}
              className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mb-4"
            >
              <Lightbulb size={16} />
              <span>{currentState.showHint ? 'Ocultar pista' : 'Mostrar pista'}</span>
              {currentState.showHint ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}

          {/* Hint content */}
          <AnimatePresence>
            {currentState.showHint && !currentState.isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 mb-4 border border-amber-200 dark:border-amber-700"
              >
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  💡 <strong>Pista:</strong> {currentProblem.hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanation after answering */}
          {currentState.isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'rounded-lg p-4 mb-4 border',
                currentState.isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                  : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {currentState.isCorrect ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      ¡Correcto!
                    </span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-800 dark:text-amber-200">
                      No exactamente
                    </span>
                  </>
                )}
              </div>
              <p
                className={cn(
                  'text-sm',
                  currentState.isCorrect
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-amber-700 dark:text-amber-300'
                )}
              >
                {currentProblem.explanation}
              </p>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!currentState.isAnswered ? (
              <button
                onClick={handleVerify}
                disabled={currentState.selectedAnswer === null}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all',
                  currentState.selectedAnswer !== null
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                )}
              >
                <span>Verificar</span>
                <Check size={20} />
              </button>
            ) : currentIndex < PRACTICE_PROBLEMS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>Siguiente problema</span>
                <ArrowRight size={20} />
              </button>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Summary and continue when all done */}
      {allCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Results summary */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-700 text-center">
            <p className="text-green-800 dark:text-green-200">
              <strong>¡Práctica completada!</strong> Obtuviste{' '}
              <span className="text-2xl font-bold">{correctCount}/{PRACTICE_PROBLEMS.length}</span>{' '}
              correctas.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Ir al checkpoint final</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
