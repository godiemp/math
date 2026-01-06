'use client';

import { useState } from 'react';
import { ShoppingCart, ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Item {
  name: string;
  emoji: string;
  price: number;
  quantity: number;
}

const SCENARIO = {
  budget: 10000, // $10,000 CLP
  items: [
    { name: 'Pan', emoji: '🥖', price: 1500, quantity: 2 },
    { name: 'Leche', emoji: '🥛', price: 1200, quantity: 1 },
    { name: 'Manzanas', emoji: '🍎', price: 800, quantity: 3 },
  ],
  // Total: 2×1500 + 1×1200 + 3×800 = 3000 + 1200 + 2400 = 6600
  // Change: 10000 - 6600 = 3400
  correctAnswer: 3400,
  options: [2400, 3400, 4200, 6600],
};

const calculateTotal = (items: Item[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<'scenario' | 'question' | 'reveal' | 'result'>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const total = calculateTotal(SCENARIO.items);
  const isCorrect = selectedAnswer === SCENARIO.correctAnswer;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setPhase('reveal');
    setTimeout(() => setPhase('result'), 1500);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Cuenta del Supermercado
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'scenario' && 'Tu mamá te envía a comprar algunas cosas...'}
          {phase === 'question' && '¿Cuánto vuelto recibirás?'}
          {phase === 'reveal' && (isCorrect ? '¡Excelente!' : '¡Casi!')}
          {phase === 'result' && 'Veamos cómo resolverlo...'}
        </p>
      </div>

      {/* Shopping Cart Visual */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ShoppingCart className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 font-bold text-sm px-3 py-1 rounded-full shadow-md">
            ${SCENARIO.budget.toLocaleString('es-CL')}
          </div>
        </div>
      </div>

      {/* Phase: Scenario */}
      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Budget info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Llevas <span className="font-bold text-green-600 dark:text-green-400">${SCENARIO.budget.toLocaleString('es-CL')}</span> para comprar:
            </p>
          </div>

          {/* Shopping list */}
          <div className="space-y-3">
            {SCENARIO.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="text-3xl">{item.emoji}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {item.quantity} {item.name}{item.quantity > 1 ? (item.name === 'Pan' ? 'es' : 's') : ''}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${item.price.toLocaleString('es-CL')} c/u
                  </p>
                </div>
                <div className="font-bold text-lg text-gray-700 dark:text-gray-300">
                  ${(item.price * item.quantity).toLocaleString('es-CL')}
                </div>
              </div>
            ))}
          </div>

          {/* Continue button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('question')}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              Explorar
            </button>
          </div>
        </div>
      )}

      {/* Phase: Question */}
      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Challenge */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 text-center">
            <p className="text-lg font-semibold text-amber-800 dark:text-amber-200">
              Si pagas con ${SCENARIO.budget.toLocaleString('es-CL')}...
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              ¿Cuánto vuelto deberías recibir?
            </p>
          </div>

          {/* Quick summary */}
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {SCENARIO.items.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300"
              >
                {item.emoji} {item.quantity} × ${item.price.toLocaleString('es-CL')}
              </span>
            ))}
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4">
            {SCENARIO.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedAnswer(option)}
                className={cn(
                  'p-5 rounded-xl font-bold text-xl transition-all border-2',
                  selectedAnswer === option
                    ? 'bg-green-500 text-white border-green-500 scale-105 shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                )}
              >
                ${option.toLocaleString('es-CL')}
              </button>
            ))}
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          </div>
        </div>
      )}

      {/* Phase: Reveal */}
      {phase === 'reveal' && (
        <div className="flex justify-center animate-fadeIn">
          <div
            className={cn(
              'w-24 h-24 rounded-full flex items-center justify-center',
              isCorrect ? 'bg-green-500' : 'bg-amber-500'
            )}
          >
            {isCorrect ? (
              <Check className="w-12 h-12 text-white" />
            ) : (
              <X className="w-12 h-12 text-white" />
            )}
          </div>
        </div>
      )}

      {/* Phase: Result */}
      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Result feedback */}
          <div
            className={cn(
              'p-5 rounded-xl border-2',
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
            )}
          >
            <div className="flex items-start gap-4">
              {isCorrect ? (
                <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <h3 className={cn(
                  'font-bold text-lg mb-1',
                  isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {isCorrect ? '¡Excelente cálculo!' : '¡Casi! Veamos el proceso.'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  El vuelto correcto es <strong>${SCENARIO.correctAnswer.toLocaleString('es-CL')}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-step breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">
              Paso a paso:
            </h4>
            <div className="space-y-2 text-base">
              {SCENARIO.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.emoji} {item.quantity} × ${item.price.toLocaleString('es-CL')}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    ${(item.price * item.quantity).toLocaleString('es-CL')}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Total:</span>
                  <span className="text-blue-600 dark:text-blue-400">${total.toLocaleString('es-CL')}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  ${SCENARIO.budget.toLocaleString('es-CL')} - ${total.toLocaleString('es-CL')}
                </span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  = ${SCENARIO.correctAnswer.toLocaleString('es-CL')}
                </span>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              <strong>Observa:</strong> Resolviste un problema de la vida real usando:
            </p>
            <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300 text-sm">
              <li>• <strong>Multiplicación</strong> para calcular el subtotal de cada producto</li>
              <li>• <strong>Suma</strong> para obtener el total de la compra</li>
              <li>• <strong>Resta</strong> para calcular el vuelto</li>
            </ul>
            <p className="text-blue-700 dark:text-blue-300 mt-3 text-sm">
              En esta lección aprenderás a resolver diferentes tipos de problemas cotidianos con números enteros y racionales.
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
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
