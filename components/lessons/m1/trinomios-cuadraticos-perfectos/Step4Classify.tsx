'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyItem {
  expression: string;
  isPerfectSquare: boolean;
  explanation: string;
  factorization?: string;
}

const ITEMS: ClassifyItem[] = [
  {
    expression: 'x² + 12x + 36',
    isPerfectSquare: true,
    explanation: 'a = x, b = 6 → 2(x)(6) = 12x ✓',
    factorization: '(x + 6)²',
  },
  {
    expression: 'x² + 10x + 16',
    isPerfectSquare: false,
    explanation: 'Si fuera TCP: a = x, b = 4 → 2(x)(4) = 8x ≠ 10x',
  },
  {
    expression: '4x² - 20x + 25',
    isPerfectSquare: true,
    explanation: 'a = 2x, b = 5 → 2(2x)(5) = 20x ✓',
    factorization: '(2x - 5)²',
  },
  {
    expression: '9a² + 30ab + 25b²',
    isPerfectSquare: true,
    explanation: 'a = 3a, b = 5b → 2(3a)(5b) = 30ab ✓',
    factorization: '(3a + 5b)²',
  },
  {
    expression: 'x² - 8x + 12',
    isPerfectSquare: false,
    explanation: 'Si fuera TCP: √12 no es entero, y 2(x)(√12) ≠ 8x',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentItem = ITEMS[currentIndex];
  const isCorrect = selectedAnswer === currentItem.isPerfectSquare;

  const handleSelect = (answer: boolean) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < ITEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
  };

  if (!isActive) return null;

  if (completed) {
    const passed = score >= 4;
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {passed ? '¡Excelente trabajo!' : 'Necesitas más práctica'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Obtuviste {score} de {ITEMS.length} correctas
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className={cn(
              'w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold',
              passed
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
            )}
          >
            {score}/{ITEMS.length}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Resumen:</h3>
          <div className="space-y-2">
            {ITEMS.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-sm"
              >
                <span
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center',
                    item.isPerfectSquare
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                  )}
                >
                  {item.isPerfectSquare ? <Check size={14} /> : <X size={14} />}
                </span>
                <span className="font-mono text-gray-700 dark:text-gray-300">{item.expression}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {item.isPerfectSquare ? `= ${item.factorization}` : '(No es TCP)'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {!passed && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RotateCcw size={20} />
              Intentar de nuevo
            </button>
          )}
          <button
            onClick={onComplete}
            disabled={!passed}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              passed
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Tipo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Es un trinomio cuadrático perfecto?
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {ITEMS.map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              index === currentIndex
                ? 'bg-purple-500 scale-125'
                : index < currentIndex
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Expression to classify */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl px-10 py-6 shadow-inner">
            <span className="font-mono text-3xl text-gray-800 dark:text-gray-200">
              {currentItem.expression}
            </span>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect(true)}
          disabled={showFeedback}
          className={cn(
            'p-6 rounded-xl text-center font-semibold transition-all border-2',
            selectedAnswer === true
              ? showFeedback
                ? isCorrect
                  ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
              : showFeedback && currentItem.isPerfectSquare
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500'
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <Check
              size={32}
              className={cn(
                selectedAnswer === true && showFeedback && isCorrect
                  ? 'text-green-500'
                  : selectedAnswer === true
                  ? 'text-purple-500'
                  : 'text-gray-400'
              )}
            />
            <span className="text-lg">Sí es TCP</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Se puede factorizar como (a ± b)²</span>
          </div>
        </button>

        <button
          onClick={() => handleSelect(false)}
          disabled={showFeedback}
          className={cn(
            'p-6 rounded-xl text-center font-semibold transition-all border-2',
            selectedAnswer === false
              ? showFeedback
                ? isCorrect
                  ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
              : showFeedback && !currentItem.isPerfectSquare
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500'
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <X
              size={32}
              className={cn(
                selectedAnswer === false && showFeedback && isCorrect
                  ? 'text-green-500'
                  : selectedAnswer === false
                  ? 'text-purple-500'
                  : 'text-gray-400'
              )}
            />
            <span className="text-lg">No es TCP</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">El término medio no coincide</span>
          </div>
        </button>
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
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className="space-y-4 animate-fadeIn">
          <div
            className={cn(
              'p-4 rounded-xl',
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
            )}
          >
            <p
              className={cn(
                'font-semibold mb-2',
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              )}
            >
              {isCorrect ? '¡Correcto!' : 'Incorrecto'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {currentItem.explanation}
            </p>
            {currentItem.isPerfectSquare && currentItem.factorization && (
              <p className="font-mono text-sm mt-2 text-gray-600 dark:text-gray-400">
                Factorización: <span className="font-bold text-purple-600">{currentItem.factorization}</span>
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>{currentIndex < ITEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
