'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  expression: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    expression: 'x² + 16x + 64',
    options: ['(x + 4)²', '(x + 8)²', '(x + 16)²', '(x - 8)²'],
    correctIndex: 1,
    hint: '¿Cuál es √64? Y verifica que 2·x·(√64) = 16x',
    explanation: 'a = x, b = 8 (porque √64 = 8). Verificamos: 2(x)(8) = 16x ✓. Por lo tanto: (x + 8)²',
  },
  {
    expression: '9x² - 24x + 16',
    options: ['(3x - 4)²', '(3x + 4)²', '(9x - 4)²', '(3x - 8)²'],
    correctIndex: 0,
    hint: '√9x² = 3x y √16 = 4. El signo del medio es negativo.',
    explanation: 'a = 3x (√9x² = 3x), b = 4 (√16 = 4). Verificamos: 2(3x)(4) = 24x ✓. Como el término medio es negativo: (3x - 4)²',
  },
  {
    expression: '25a² + 70ab + 49b²',
    options: ['(5a + 7b)²', '(25a + 49b)²', '(5a - 7b)²', '(5a + 49b)²'],
    correctIndex: 0,
    hint: '√25a² = 5a y √49b² = 7b. Verifica el término medio.',
    explanation: 'a = 5a (√25a² = 5a), b = 7b (√49b² = 7b). Verificamos: 2(5a)(7b) = 70ab ✓. Resultado: (5a + 7b)²',
  },
  {
    expression: '16x⁴ - 40x²y + 25y²',
    options: ['(4x² - 5y)²', '(4x - 5y)²', '(16x² - 25y)²', '(4x² + 5y)²'],
    correctIndex: 0,
    hint: '√16x⁴ = 4x² y √25y² = 5y. El término medio es negativo.',
    explanation: 'a = 4x² (√16x⁴ = 4x²), b = 5y (√25y² = 5y). Verificamos: 2(4x²)(5y) = 40x²y ✓. Como el medio es negativo: (4x² - 5y)²',
  },
  {
    expression: '1 + 2x + x²',
    options: ['(1 + x)²', '(1 - x)²', '(x + 1)²', 'A y C son correctas'],
    correctIndex: 3,
    hint: 'Reordena: x² + 2x + 1. ¿Qué notas sobre (1 + x)² y (x + 1)²?',
    explanation: 'Reordenando: x² + 2x + 1. Aquí a = x, b = 1. Como la suma es conmutativa, (1 + x)² = (x + 1)² = x² + 2x + 1. ¡Ambas son correctas!',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentProblem = PROBLEMS[currentIndex];
  const isCorrect = selectedAnswer === currentProblem.correctIndex;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < PROBLEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowHint(false);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowHint(false);
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
            Obtuviste {score} de {PROBLEMS.length} correctas
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
            {score}/{PROBLEMS.length}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Resumen:</h3>
          <div className="space-y-2">
            {PROBLEMS.map((problem, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-sm"
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600"
                >
                  <Check size={14} />
                </span>
                <span className="font-mono text-gray-700 dark:text-gray-300">{problem.expression}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  = {problem.options[problem.correctIndex]}
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
            <span>Continuar al checkpoint</span>
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
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Factoriza los siguientes trinomios cuadráticos perfectos
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {PROBLEMS.map((_, index) => (
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

      {/* Problem */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4">
          Problema {currentIndex + 1} de {PROBLEMS.length}
        </p>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Factoriza:
        </p>
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-4 shadow-inner">
            <span className="font-mono text-2xl text-gray-800 dark:text-gray-200">
              {currentProblem.expression}
            </span>
          </div>
        </div>
      </div>

      {/* Hint button */}
      {!showFeedback && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          >
            <Lightbulb size={20} />
            <span>{showHint ? 'Ocultar pista' : 'Mostrar pista'}</span>
          </button>
        </div>
      )}

      {/* Hint */}
      {showHint && !showFeedback && (
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              {currentProblem.hint}
            </p>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {currentProblem.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={showFeedback}
            className={cn(
              'p-4 rounded-xl text-center font-mono text-lg transition-all border-2',
              selectedAnswer === index
                ? showFeedback
                  ? index === currentProblem.correctIndex
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                  : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                : showFeedback && index === currentProblem.correctIndex
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500'
            )}
          >
            <div className="flex items-center justify-center gap-2">
              {showFeedback && index === currentProblem.correctIndex && (
                <Check size={20} className="text-green-500" />
              )}
              {showFeedback && selectedAnswer === index && index !== currentProblem.correctIndex && (
                <X size={20} className="text-red-500" />
              )}
              <span>{option}</span>
            </div>
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
              {currentProblem.explanation}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>{currentIndex < PROBLEMS.length - 1 ? 'Siguiente problema' : 'Ver resultados'}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
