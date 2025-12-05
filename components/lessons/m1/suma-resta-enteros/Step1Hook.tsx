'use client';

import { useState } from 'react';
import { PiggyBank, ArrowRight, Plus, Minus, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Transaction {
  type: 'deposit' | 'withdraw';
  amount: number;
  label: string;
}

const SCENARIO = {
  initial: 5,
  transactions: [
    { type: 'deposit' as const, amount: 3, label: 'Tu abuela te regala $3' },
    { type: 'withdraw' as const, amount: 7, label: 'Compras un helado por $7' },
  ],
  correctAnswer: 1, // 5 + 3 - 7 = 1
  options: [-1, 1, 8, 15],
};

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<'intro' | 'predict' | 'reveal'>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isCorrect = selectedAnswer === SCENARIO.correctAnswer;

  const handleStartPrediction = () => {
    setPhase('predict');
  };

  const handleSubmitPrediction = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    setPhase('reveal');
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Banco de Monedas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'intro' && 'Una historia sobre tu alcancía...'}
          {phase === 'predict' && '¿Puedes predecir el resultado?'}
          {phase === 'reveal' && 'Veamos qué pasó...'}
        </p>
      </div>

      {/* Piggy Bank Visual */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <PiggyBank className="w-16 h-16 text-white" />
          </div>
          {/* Current amount display */}
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 font-bold text-xl px-3 py-1 rounded-full shadow-md">
            ${phase === 'intro' ? SCENARIO.initial : '?'}
          </div>
        </div>
      </div>

      {/* Phase: Introduction */}
      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Story setup */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
            <p className="text-lg text-gray-800 dark:text-gray-200 text-center">
              Tienes <span className="font-bold text-green-600 dark:text-green-400">${SCENARIO.initial}</span> en tu alcancía.
            </p>
          </div>

          {/* Transactions preview */}
          <div className="space-y-3">
            {SCENARIO.transactions.map((tx, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                  tx.type === 'deposit'
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700'
                    : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  tx.type === 'deposit' ? 'bg-green-500' : 'bg-red-500'
                )}>
                  {tx.type === 'deposit' ? (
                    <Plus className="w-6 h-6 text-white" />
                  ) : (
                    <Minus className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{tx.label}</p>
                </div>
                <div className={cn(
                  'font-bold text-lg',
                  tx.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}>
                  {tx.type === 'deposit' ? '+' : '-'}${tx.amount}
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center">
            <button
              onClick={handleStartPrediction}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              ¿Cuánto dinero te queda?
            </button>
          </div>
        </div>
      )}

      {/* Phase: Prediction */}
      {phase === 'predict' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Challenge */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 text-center">
            <p className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Piensa antes de responder...
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Tenías <strong>${SCENARIO.initial}</strong>, te dieron <strong>+${SCENARIO.transactions[0].amount}</strong>,
              luego gastaste <strong>-${SCENARIO.transactions[1].amount}</strong>.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              ¿Cuánto te queda?
            </p>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4">
            {SCENARIO.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedAnswer(option)}
                className={cn(
                  'p-6 rounded-xl font-bold text-2xl transition-all border-2',
                  selectedAnswer === option
                    ? 'bg-blue-500 text-white border-blue-500 scale-105 shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                )}
              >
                ${option}
              </button>
            ))}
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmitPrediction}
              disabled={selectedAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Confirmar mi predicción
            </button>
          </div>
        </div>
      )}

      {/* Phase: Reveal */}
      {phase === 'reveal' && showResult && (
        <div className="space-y-6 animate-fadeIn">
          {/* Result feedback */}
          <div
            className={cn(
              'p-6 rounded-xl border-2',
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
            )}
          >
            <div className="flex items-start gap-4">
              {isCorrect ? (
                <Check className="w-8 h-8 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-8 h-8 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <h3 className={cn(
                  'font-bold text-lg mb-2',
                  isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {isCorrect ? '¡Excelente predicción!' : '¡Casi! Veamos por qué.'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  La respuesta correcta es <strong>${SCENARIO.correctAnswer}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-step breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">
              Paso a paso:
            </h4>
            <div className="space-y-3 font-mono text-lg">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Empezaste con:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">${SCENARIO.initial}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">+${SCENARIO.transactions[0].amount}</span>
                <span className="text-gray-400">=</span>
                <span className="font-bold">${SCENARIO.initial + SCENARIO.transactions[0].amount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-600 dark:text-red-400">-${SCENARIO.transactions[1].amount}</span>
                <span className="text-gray-400">=</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">${SCENARIO.correctAnswer}</span>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              <strong>Observa:</strong> Acabas de hacer una <strong>suma</strong> (+3) y una <strong>resta</strong> (-7).
              En matemáticas, escribimos esto como:
            </p>
            <p className="text-center text-2xl font-bold text-gray-900 dark:text-white mt-3">
              5 + 3 - 7 = 1
            </p>
            <p className="text-blue-700 dark:text-blue-300 mt-3 text-sm">
              Esto es exactamente lo que aprenderás en esta lección: sumar y restar números positivos y negativos.
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
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
