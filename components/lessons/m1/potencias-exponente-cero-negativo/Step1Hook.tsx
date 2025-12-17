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

  const correctAnswer = 1; // "1"

  const options = ['0', '1', '2', 'No existe'];

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
          El Misterio del Exponente Cero
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Qué pasa cuando el exponente llega a cero... o se vuelve negativo?
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              En una fábrica de galletas, una máquina duplica la producción cada hora.
              Al final del día producen <strong className="text-purple-600">2⁴ = 16</strong> galletas.
              Pero... ¿cuántas tenían al <strong className="text-blue-600">inicio</strong>, antes de empezar a duplicar?
            </p>

            {/* Visual representation - Backwards pattern */}
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Observa el patrón al retroceder:
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-3 text-center border-2 border-blue-400 dark:border-blue-600">
                      <span className="font-mono text-sm text-blue-600 font-bold">2⁴</span>
                      <div className="text-lg font-bold">16</div>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                  <div className="flex flex-col items-center">
                    <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-3 text-center border-2 border-purple-400 dark:border-purple-600">
                      <span className="font-mono text-sm text-purple-600 font-bold">2³</span>
                      <div className="text-lg font-bold">8</div>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                  <div className="flex flex-col items-center">
                    <div className="bg-pink-100 dark:bg-pink-900/50 rounded-lg p-3 text-center border-2 border-pink-400 dark:border-pink-600">
                      <span className="font-mono text-sm text-pink-600 font-bold">2²</span>
                      <div className="text-lg font-bold">4</div>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                  <div className="flex flex-col items-center">
                    <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3 text-center border-2 border-amber-400 dark:border-amber-600">
                      <span className="font-mono text-sm text-amber-600 font-bold">2¹</span>
                      <div className="text-lg font-bold">2</div>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-3 text-center border-2 border-green-500 dark:border-green-500">
                      <span className="font-mono text-sm text-green-600 font-bold">2⁰</span>
                      <div className="text-lg font-bold">❓</div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
                  Cada paso dividimos por 2
                </p>
              </div>

              {/* Question */}
              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  <strong>¿Cuánto vale 2⁰?</strong>
                  <br />
                  <span className="text-sm">Sigue el patrón: cada vez dividimos por 2</span>
                </p>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>Hacer mi predicción</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question reminder */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Patrón: 16 → 8 → 4 → 2 → <span className="font-mono font-bold text-green-600">?</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              (dividiendo por 2 cada vez)
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-center font-medium transition-all border-2',
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
                <div className="flex items-center justify-center gap-3">
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
                  <span className="text-gray-800 dark:text-gray-200 font-mono text-xl">{option}</span>
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
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos por qué...
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
              ¡Descubriste el patrón!
            </h3>

            {/* Visual breakdown */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <div className="text-center">
                      <p className="font-mono text-lg text-gray-700 dark:text-gray-300">2⁴ = 16</p>
                    </div>
                    <span className="text-gray-400">÷2→</span>
                    <div className="text-center">
                      <p className="font-mono text-lg text-gray-700 dark:text-gray-300">2³ = 8</p>
                    </div>
                    <span className="text-gray-400">÷2→</span>
                    <div className="text-center">
                      <p className="font-mono text-lg text-gray-700 dark:text-gray-300">2² = 4</p>
                    </div>
                    <span className="text-gray-400">÷2→</span>
                    <div className="text-center">
                      <p className="font-mono text-lg text-gray-700 dark:text-gray-300">2¹ = 2</p>
                    </div>
                    <span className="text-gray-400">÷2→</span>
                    <div className="text-center bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-lg">
                      <p className="font-mono text-lg text-green-600 font-bold">2⁰ = 1</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    2 ÷ 2 = 1, así que <strong>2⁰ = 1</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Continue pattern to negatives */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                ¿Y si seguimos dividiendo?
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="text-center bg-green-100 dark:bg-green-900/50 px-3 py-2 rounded-lg">
                  <p className="font-mono text-sm text-green-600 font-bold">2⁰ = 1</p>
                </div>
                <span className="text-gray-400">÷2→</span>
                <div className="text-center bg-blue-100 dark:bg-blue-900/50 px-3 py-2 rounded-lg">
                  <p className="font-mono text-sm text-blue-600 font-bold">2⁻¹ = ½</p>
                </div>
                <span className="text-gray-400">÷2→</span>
                <div className="text-center bg-purple-100 dark:bg-purple-900/50 px-3 py-2 rounded-lg">
                  <p className="font-mono text-sm text-purple-600 font-bold">2⁻² = ¼</p>
                </div>
                <span className="text-gray-400">÷2→</span>
                <div className="text-center bg-pink-100 dark:bg-pink-900/50 px-3 py-2 rounded-lg">
                  <p className="font-mono text-sm text-pink-600 font-bold">2⁻³ = ⅛</p>
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
                  ¡Exponentes Cero y Negativos!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                      <p className="text-sm mb-2 text-gray-500">Exponente cero:</p>
                      <p className="font-mono text-xl">
                        <span className="text-blue-600 font-bold">a⁰ = 1</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">(cualquier número ≠ 0)</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                      <p className="text-sm mb-2 text-gray-500">Exponente negativo:</p>
                      <p className="font-mono text-xl">
                        <span className="text-purple-600 font-bold">a⁻ⁿ = 1/aⁿ</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">(es el recíproco)</p>
                    </div>
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
              <span>Explorar más ejemplos</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
