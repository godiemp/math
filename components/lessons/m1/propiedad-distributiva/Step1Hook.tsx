'use client';

import { useState } from 'react';
import { Gift, Car, Check, X, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

// Teddy bear icon as inline SVG (lucide doesn't have one)
function TeddyBear({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="6" />
      <circle cx="8" cy="5" r="2.5" />
      <circle cx="16" cy="5" r="2.5" />
      <circle cx="10" cy="10" r="0.5" fill="currentColor" />
      <circle cx="14" cy="10" r="0.5" fill="currentColor" />
      <ellipse cx="12" cy="13" rx="1.5" ry="1" />
    </svg>
  );
}

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 1; // "3x + 30"

  const options = [
    '3x + 5',
    '3x + 30',
    '3x + 10',
    'x + 30',
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
          La Tienda de Juguetes
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          María necesita calcular el costo total de un pedido...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              María trabaja en una juguetería. Recibe un pedido de <strong className="text-purple-600">3 bolsas de regalo idénticas</strong>.
            </p>

            {/* Gift bag display */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Cada bolsa contiene:
              </p>

              {/* Single bag contents */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-purple-300 dark:border-purple-600">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl mb-2">
                      <TeddyBear className="w-12 h-12 text-amber-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      1 oso de peluche
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      x pesos
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-gray-400">+</div>

                  <div className="flex flex-col items-center">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl mb-2">
                      <div className="flex gap-1">
                        <Car className="w-8 h-8 text-red-500" />
                        <Car className="w-8 h-8 text-red-500" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      2 autitos
                    </span>
                    <span className="text-lg font-bold text-teal-600">
                      5 pesos c/u
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 bags visual */}
              <div className="flex items-center gap-4 mt-4">
                {[1, 2, 3].map((bag) => (
                  <div
                    key={bag}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800/50 dark:to-pink-800/50 p-4 rounded-xl shadow-md"
                    style={{
                      animation: `fadeIn 0.5s ease-out ${bag * 0.2}s both`,
                    }}
                  >
                    <Gift className="w-10 h-10 text-purple-500" />
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-300 mt-1 block text-center">
                      Bolsa {bag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cuál es el costo total del pedido?
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Calcular el total</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question reminder */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 text-center border border-purple-200 dark:border-purple-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              3 bolsas, cada una con: 1 oso (<span className="text-blue-600">x</span> pesos) + 2 autitos (5 pesos c/u)
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Cuál expresión representa el costo total?
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
                      : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500'
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
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos cómo se calcula...
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Paso a paso:
            </h3>

            <div className="space-y-4">
              {/* Step 1: Teddy bears */}
              <div className="flex items-center justify-center gap-3 flex-wrap bg-white dark:bg-gray-800 p-4 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">3 osos a</span>
                <span className="font-mono font-bold text-blue-600 text-xl">x</span>
                <span className="text-gray-600 dark:text-gray-400">pesos cada uno =</span>
                <span className="font-mono font-bold text-blue-600 text-xl bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-lg">3x</span>
              </div>

              {/* Step 2: Cars */}
              <div className="flex items-center justify-center gap-3 flex-wrap bg-white dark:bg-gray-800 p-4 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">3 bolsas × 2 autitos × 5 pesos =</span>
                <span className="font-mono font-bold text-teal-600 text-xl bg-teal-100 dark:bg-teal-900/50 px-3 py-1 rounded-lg">30</span>
              </div>

              {/* Final result */}
              <div className="text-center pt-4 border-t border-purple-200 dark:border-purple-700">
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Total: <span className="text-blue-600">3x</span> + <span className="text-teal-600">30</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to algebra */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  ¡Esto es la Propiedad Distributiva!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Cada bolsa cuesta <span className="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">x + 10</span> pesos.
                  </p>
                  <p>
                    Para 3 bolsas, escribimos:
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="font-mono text-xl">
                      <span className="text-purple-600 font-bold">3</span>(x + 10)
                    </p>
                    <p className="text-gray-400 my-2">↓ distribuimos el 3</p>
                    <p className="font-mono text-xl">
                      <span className="text-purple-600 font-bold">3</span> · x + <span className="text-purple-600 font-bold">3</span> · 10
                    </p>
                    <p className="text-gray-400 my-2">↓</p>
                    <p className="font-mono text-xl text-green-600 font-bold">
                      3x + 30
                    </p>
                  </div>
                  <p className="text-sm mt-2 bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                    El número de afuera <strong>multiplica a CADA término</strong> dentro del paréntesis.
                  </p>
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
