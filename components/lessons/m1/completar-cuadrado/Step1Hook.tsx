'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 2; // "x = -3 ± √5"

  const options = [
    'x = -3 ± √4',
    'x = 3 ± √5',
    'x = -3 ± √5',
    'x = -6 ± √5',
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
          El Arquitecto y el Jardín
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Una ecuación cuadrática que no se puede factorizar fácilmente...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Un arquitecto diseña un jardín cuadrado. El área del jardín está dada por la expresión{' '}
              <strong className="text-blue-600 font-mono">x² + 6x + 4</strong> metros cuadrados.
              Para calcular las dimensiones exactas, necesita resolver:
            </p>

            {/* Visual representation */}
            <div className="flex flex-col items-center gap-6 mb-6">
              {/* Equation */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Ecuación a resolver:
                </p>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏗️</div>
                    <span className="font-mono text-lg text-blue-600 font-bold">
                      x² + 6x + 4 = 0
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Problem */}
              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  <strong>Problema:</strong> Esta ecuación <strong>no se puede factorizar</strong> fácilmente
                  porque no hay dos enteros que sumen 6 y multipliquen 4.
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cómo podemos encontrar las soluciones?
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>Descubrir la técnica</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question explanation */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Hay una técnica llamada <span className="text-purple-600">&quot;Completar el Cuadrado&quot;</span>
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-2">
                x² + 6x + 4 = 0
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">↓ Completamos el cuadrado</p>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mt-2">
                (x + 3)² - 5 = 0
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">↓ Despejamos</p>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mt-2">
                (x + 3)² = 5
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              ¿Cuál es la solución de la ecuación?
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
                  'p-4 rounded-xl text-left font-medium transition-all border-2',
                  selectedAnswer === index
                    ? showFeedback
                      ? index === correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                      : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      selectedAnswer === index
                        ? showFeedback
                          ? index === correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-amber-500 text-white'
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
                  <span className="text-gray-800 dark:text-gray-200 font-mono text-lg">{option}</span>
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
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
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
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos cómo funciona...
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Así funciona Completar el Cuadrado!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-3">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">x² + 6x + 4 = 0</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ sumamos y restamos (6/2)² = 9</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    x² + 6x + <span className="text-green-600">9</span> - <span className="text-red-600">9</span> + 4 = 0
                  </p>
                  <p className="text-gray-400 text-sm">↓ agrupamos el trinomio cuadrado perfecto</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-purple-600">(x + 3)²</span> - 5 = 0
                  </p>
                  <p className="text-gray-400 text-sm">↓ despejamos</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    (x + 3)² = 5
                  </p>
                  <p className="text-gray-400 text-sm">↓ sacamos raíz cuadrada</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">x = -3 ± √5</p>
                </div>
              </div>
            </div>

            {/* Numerical values */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                Las soluciones aproximadas son:
              </p>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <span className="font-mono text-lg text-blue-600 font-bold">x₁ ≈ -0.76</span>
                  <p className="text-xs text-gray-500">(-3 + √5)</p>
                </div>
                <div className="text-center">
                  <span className="font-mono text-lg text-blue-600 font-bold">x₂ ≈ -5.24</span>
                  <p className="text-xs text-gray-500">(-3 - √5)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge to concept */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  ¿Por qué &quot;Completar el Cuadrado&quot;?
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-sm mb-2">Transformamos cualquier ecuación cuadrática en:</p>
                    <p className="font-mono text-lg">
                      <span className="text-purple-600 font-bold">(x + h)²</span> = k
                    </p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                      Esta forma es fácil de resolver: <strong>x + h = ±√k</strong>
                      <br />
                      por lo tanto <strong>x = -h ± √k</strong>
                    </p>
                  </div>
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
              <span>Descubrir el patrón</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
