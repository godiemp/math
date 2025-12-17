'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyProblem {
  id: string;
  problem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  answered: boolean;
  isCorrect: boolean | null;
}

const CLASSIFY_PROBLEMS: ClassifyProblem[] = [
  {
    id: '1',
    problem: 'Juan tiene 3 veces más dinero que Pedro. Juntos tienen $80.',
    options: ['x + 3x = 80', '3x = 80', 'x + 3 = 80', 'x - 3x = 80'],
    correctIndex: 0,
    explanation: 'Si Pedro tiene x, Juan tiene 3x. Juntos: x + 3x = 80',
    answered: false,
    isCorrect: null,
  },
  {
    id: '2',
    problem: 'Un número aumentado en 12 es igual a 45.',
    options: ['x - 12 = 45', '12x = 45', 'x + 12 = 45', 'x / 12 = 45'],
    correctIndex: 2,
    explanation: '"Aumentado en" significa sumar: x + 12 = 45',
    answered: false,
    isCorrect: null,
  },
  {
    id: '3',
    problem: 'La mitad de un número menos 3 es 10.',
    options: ['x/2 - 3 = 10', '(x - 3)/2 = 10', '2x - 3 = 10', 'x - 3/2 = 10'],
    correctIndex: 0,
    explanation: '"La mitad de un número" es x/2, luego le restamos 3: x/2 - 3 = 10',
    answered: false,
    isCorrect: null,
  },
  {
    id: '4',
    problem: 'El doble de la suma de un número y 4 es 18.',
    options: ['2x + 4 = 18', '2(x + 4) = 18', 'x + 4 = 18/2', '2x + 8 = 18'],
    correctIndex: 1,
    explanation: 'Primero "la suma de x y 4" es (x + 4), luego "el doble de" es 2(x + 4)',
    answered: false,
    isCorrect: null,
  },
  {
    id: '5',
    problem: 'Si a un número le resto 7 obtengo el triple del número.',
    options: ['x - 7 = 3x', '7 - x = 3x', 'x - 7 = 3', '3(x - 7) = x'],
    correctIndex: 0,
    explanation: '"A un número le resto 7" es x - 7, "el triple del número" es 3x',
    answered: false,
    isCorrect: null,
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [problems, setProblems] = useState(CLASSIFY_PROBLEMS);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const problem = problems[currentProblem];
  const answeredCount = problems.filter(p => p.answered).length;
  const correctCount = problems.filter(p => p.isCorrect).length;
  const allAnswered = problems.every(p => p.answered);

  const handleSelectOption = (optionIndex: number) => {
    if (problem.answered) return;

    const isCorrect = optionIndex === problem.correctIndex;

    setProblems(prev => prev.map((p, i) =>
      i === currentProblem
        ? { ...p, answered: true, isCorrect }
        : p
    ));
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
    } else {
      setShowComplete(true);
    }
  };

  const handleReset = () => {
    setProblems(CLASSIFY_PROBLEMS);
    setCurrentProblem(0);
    setShowComplete(false);
  };

  const passed = correctCount >= 4;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica la Ecuación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {!showComplete
            ? `Necesitas 4 de ${problems.length} correctas para avanzar`
            : '¡Resultados!'}
        </p>
      </div>

      {!showComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {problems.length}
            </div>
            <div className="flex gap-1">
              {problems.map((p, i) => (
                <div
                  key={p.id}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    p.answered
                      ? p.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {p.answered ? (p.isCorrect ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 text-center font-medium">
              &ldquo;{problem.problem}&rdquo;
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
              ¿Qué ecuación representa este problema?
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={problem.answered}
                  className={cn(
                    'p-4 rounded-xl font-mono font-bold text-lg transition-all border-2',
                    problem.answered
                      ? index === problem.correctIndex
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400 text-gray-800 dark:text-gray-200'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {problem.answered && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl animate-fadeIn',
                  problem.isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {problem.isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className={cn('font-bold', problem.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                      {problem.isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {problem.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Next button */}
          {problem.answered && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentProblem < problems.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
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
              <Sparkles className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            ) : (
              <X className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Buen trabajo!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {problems.length}
            </div>

            <p
              className={cn(
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed
                ? 'Has demostrado que puedes identificar ecuaciones correctamente'
                : `Necesitas 4 respuestas correctas. ¡Puedes intentarlo de nuevo!`}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!passed && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <X size={18} />
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
