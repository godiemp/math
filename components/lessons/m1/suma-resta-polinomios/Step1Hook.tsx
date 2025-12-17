'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Lightbulb, Calculator, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 1; // "4x² - 2x - 2"

  const options = [
    '4x² + 6x - 8',
    '4x² - 2x - 2',
    '3x² - 2x + 2',
    '4x² - 2x + 8',
  ];

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setTimeout(() => {
      setPhase('result');
    }, 1500);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Gerente de la Empresa
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Un problema de costos que requiere álgebra...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-8 h-8 text-blue-500" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Situación
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Una empresa de logística calcula sus costos operativos mensuales usando dos expresiones
              algebraicas, donde <strong className="text-blue-600">x</strong> representa el número de rutas operativas:
            </p>

            {/* Cost expressions */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Fixed costs */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Costos Fijos
                  </span>
                </div>
                <p className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200">
                  3x² + 2x - 5
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  (miles de dólares)
                </p>
              </div>

              {/* Variable costs */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-l-4 border-orange-500">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Costos Variables
                  </span>
                </div>
                <p className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200">
                  x² - 4x + 3
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  (miles de dólares)
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
              El gerente necesita <span className="text-purple-600 font-bold">sumar</span> ambas expresiones
              para obtener el costo total mensual.
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>¿Cuál es el costo total?</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question reminder */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Calcula:</p>
            <p className="text-xl font-mono font-bold text-gray-800 dark:text-gray-200">
              (3x² + 2x - 5) + (x² - 4x + 3) = ?
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-center font-mono font-bold text-lg transition-all border-2',
                  selectedAnswer === index
                    ? showFeedback
                      ? index === correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                      : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500'
                )}
              >
                <div className="flex items-center justify-center gap-3">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      selectedAnswer === index
                        ? showFeedback
                          ? index === correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    )}
                  >
                    {showFeedback && index === correctAnswer ? (
                      <Check size={16} />
                    ) : showFeedback && selectedAnswer === index && index !== correctAnswer ? (
                      <X size={16} />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">{option}</span>
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
            <div
              className={cn(
                'p-4 rounded-xl animate-fadeIn text-center',
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                  : 'bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700'
              )}
            >
              <p className={cn('font-semibold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos cómo se hace paso a paso...
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Paso a paso:
            </h3>

            <div className="space-y-4">
              {/* Step 1: Group by type */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  1. Agrupamos términos semejantes:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-lg font-mono">
                  <span className="bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded text-purple-700 dark:text-purple-300">
                    (3x² + x²)
                  </span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded text-blue-700 dark:text-blue-300">
                    (2x - 4x)
                  </span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded text-orange-700 dark:text-orange-300">
                    (-5 + 3)
                  </span>
                </div>
              </div>

              {/* Step 2: Calculate */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  2. Sumamos los coeficientes de cada grupo:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-lg font-mono">
                  <span className="bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded text-purple-700 dark:text-purple-300">
                    4x²
                  </span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded text-blue-700 dark:text-blue-300">
                    (-2x)
                  </span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded text-orange-700 dark:text-orange-300">
                    (-2)
                  </span>
                </div>
              </div>

              {/* Final result */}
              <div className="text-center pt-4 border-t border-green-200 dark:border-green-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Resultado final:</p>
                <p className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200">
                  4x² - 2x - 2
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to lesson */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
                  El secreto de la suma de polinomios
                </h4>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    Para sumar o restar polinomios, solo necesitas:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Identificar los <strong>términos semejantes</strong> (misma variable y exponente)</li>
                    <li>Sumar o restar sus <strong>coeficientes</strong></li>
                    <li>Mantener la <strong>parte literal</strong> igual</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
