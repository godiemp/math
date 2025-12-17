'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  fraction1: { num: number; den: number };
  fraction2: { num: number; den: number };
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    fraction1: { num: 1, den: 2 },
    fraction2: { num: 1, den: 4 },
    options: ['1/8', '2/6', '1/6', '2/4'],
    correctIndex: 0,
    hint: 'Multiplica 1×1 arriba y 2×4 abajo',
    explanation: '1/2 × 1/4 = (1×1)/(2×4) = 1/8',
  },
  {
    id: 'p2',
    fraction1: { num: 2, den: 3 },
    fraction2: { num: 3, den: 4 },
    options: ['5/7', '6/7', '1/2', '2/7'],
    correctIndex: 2,
    hint: 'Multiplica arriba por arriba y abajo por abajo, luego simplifica',
    explanation: '2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2',
  },
  {
    id: 'p3',
    fraction1: { num: 3, den: 5 },
    fraction2: { num: 2, den: 3 },
    options: ['5/8', '6/8', '2/5', '3/8'],
    correctIndex: 2,
    hint: 'Multiplica y luego simplifica dividiendo por 3',
    explanation: '3/5 × 2/3 = (3×2)/(5×3) = 6/15 = 2/5',
  },
  {
    id: 'p4',
    fraction1: { num: 4, den: 5 },
    fraction2: { num: 5, den: 8 },
    options: ['9/13', '4/13', '1/2', '2/3'],
    correctIndex: 2,
    hint: 'Observa que 4 y 8 tienen factor común, y 5 y 5 se cancelan',
    explanation: '4/5 × 5/8 = (4×5)/(5×8) = 20/40 = 1/2',
  },
];

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (!isActive) return null;

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedAnswer === problem?.correctIndex;
  const isComplete = currentProblem >= PROBLEMS.length;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setCurrentProblem(prev => prev + 1);
  };

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    const percentage = Math.round((correctCount / PROBLEMS.length) * 100);

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Practica: Multiplicacion
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Resultados!
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
          <div className="text-5xl font-bold mb-2">
            {correctCount}/{PROBLEMS.length}
          </div>
          <p className="text-2xl font-medium mb-4">{percentage}% correcto</p>
          <p
            className={cn(
              'font-medium',
              percentage >= 75
                ? 'text-green-700 dark:text-green-300'
                : 'text-amber-700 dark:text-amber-300',
            )}
          >
            {percentage === 100 && '¡Perfecto! Dominas la multiplicacion de fracciones.'}
            {percentage >= 75 && percentage < 100 && '¡Muy bien! Ya casi lo dominas.'}
            {percentage >= 50 && percentage < 75 && 'Buen progreso. Sigue practicando.'}
            {percentage < 50 && 'Repasa la regla y vuelve a intentarlo.'}
          </p>
        </div>

        {/* Quick recap */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">
            Recuerda:
          </h4>
          <div className="text-center text-lg font-bold mb-2">
            <span className="text-orange-600 dark:text-orange-400">a/b</span>
            <span className="text-gray-400 mx-2">×</span>
            <span className="text-blue-600 dark:text-blue-400">c/d</span>
            <span className="text-gray-400 mx-2">=</span>
            <span className="text-green-600 dark:text-green-400">(a×c)/(b×d)</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
            ¡Y no olvides simplificar al final!
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
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
          Practica: Multiplicacion
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Problema {currentProblem + 1} de {PROBLEMS.length}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {PROBLEMS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i < currentProblem
                ? 'bg-green-500'
                : i === currentProblem
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600',
            )}
          />
        ))}
      </div>

      {/* Problem */}
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/30 dark:to-blue-900/30 rounded-xl p-6">
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-2">Resuelve y simplifica:</p>
          <div className="text-3xl md:text-4xl font-bold">
            <span className="text-orange-600 dark:text-orange-400">
              {problem.fraction1.num}/{problem.fraction1.den}
            </span>
            <span className="text-gray-400 mx-3">×</span>
            <span className="text-blue-600 dark:text-blue-400">
              {problem.fraction2.num}/{problem.fraction2.den}
            </span>
            <span className="text-gray-400 mx-3">=</span>
            <span className="text-purple-600 dark:text-purple-400">?</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {problem.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl transition-all text-center font-medium text-lg border-2',
                selectedAnswer === index
                  ? showFeedback
                    ? isCorrect
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-400'
                    : 'bg-blue-100 dark:bg-blue-900/50 border-blue-400'
                  : showFeedback && index === problem.correctIndex
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500',
              )}
            >
              <div className="flex items-center justify-center gap-2">
                {showFeedback && (
                  selectedAnswer === index || index === problem.correctIndex
                ) && (
                  index === problem.correctIndex ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )
                )}
                <span className="text-gray-800 dark:text-gray-200">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Hint button */}
        {!showFeedback && !showHint && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <HelpCircle size={16} />
              <span>Ver pista</span>
            </button>
          </div>
        )}

        {/* Hint */}
        {showHint && !showFeedback && (
          <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg border border-amber-300 dark:border-amber-700 animate-fadeIn">
            <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
              <strong>Pista:</strong> {problem.hint}
            </p>
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
              : 'bg-red-50 dark:bg-red-900/30 border-red-400',
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div>
              <h4
                className={cn(
                  'font-bold',
                  isCorrect
                    ? 'text-green-800 dark:text-green-300'
                    : 'text-red-800 dark:text-red-300',
                )}
              >
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {problem.explanation}
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
            disabled={selectedAnswer === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
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
              {currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}
            </span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
