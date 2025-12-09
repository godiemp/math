'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'addition' | 'subtraction' | 'simplify' | 'summary';

// Fraction bar component
function FractionBar({
  numerator,
  denominator,
  color = 'blue',
}: {
  numerator: number;
  denominator: number;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}) {
  const colorClasses = {
    blue: {
      filled: 'bg-blue-500 dark:bg-blue-600',
      empty: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-700 dark:border-blue-400',
    },
    green: {
      filled: 'bg-green-500 dark:bg-green-600',
      empty: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-700 dark:border-green-400',
    },
    purple: {
      filled: 'bg-purple-500 dark:bg-purple-600',
      empty: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-700 dark:border-purple-400',
    },
    orange: {
      filled: 'bg-orange-500 dark:bg-orange-600',
      empty: 'bg-orange-100 dark:bg-orange-900/30',
      border: 'border-orange-700 dark:border-orange-400',
    },
    red: {
      filled: 'bg-red-500 dark:bg-red-600',
      empty: 'bg-red-100 dark:bg-red-900/30',
      border: 'border-red-700 dark:border-red-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="w-full">
      <div
        className={cn(
          'relative h-6 rounded overflow-hidden border',
          colors.border,
        )}
      >
        <div className="flex h-full">
          {Array.from({ length: denominator }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 h-full',
                i < numerator ? colors.filled : colors.empty,
                i > 0 && 'border-l',
                colors.border,
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('addition');

  if (!isActive) return null;

  // ============ PHASE 1: ADDITION ============
  if (phase === 'addition') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Regla de Oro
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Suma de fracciones con igual denominador
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-green-500 rounded-full">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
              Para Sumar
            </h3>
          </div>

          {/* The formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">
                <span className="text-orange-600 dark:text-orange-400">a</span>
                <span className="text-gray-400">/</span>
                <span className="text-purple-600 dark:text-purple-400">c</span>
                <span className="text-gray-400 mx-2">+</span>
                <span className="text-blue-600 dark:text-blue-400">b</span>
                <span className="text-gray-400">/</span>
                <span className="text-purple-600 dark:text-purple-400">c</span>
                <span className="text-gray-400 mx-2">=</span>
                <span className="text-green-600 dark:text-green-400">(a + b)</span>
                <span className="text-gray-400">/</span>
                <span className="text-purple-600 dark:text-purple-400">c</span>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="space-y-3">
            <p className="text-center text-gray-600 dark:text-gray-400">Ejemplo:</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="text-center">
                <div className="w-32">
                  <FractionBar numerator={2} denominator={6} color="orange" />
                </div>
                <p className="mt-1 font-bold text-orange-600 dark:text-orange-400">2/6</p>
              </div>
              <span className="text-2xl font-bold text-gray-400">+</span>
              <div className="text-center">
                <div className="w-32">
                  <FractionBar numerator={3} denominator={6} color="blue" />
                </div>
                <p className="mt-1 font-bold text-blue-600 dark:text-blue-400">3/6</p>
              </div>
              <span className="text-2xl font-bold text-gray-400">=</span>
              <div className="text-center">
                <div className="w-32">
                  <FractionBar numerator={5} denominator={6} color="green" />
                </div>
                <p className="mt-1 font-bold text-green-600 dark:text-green-400">5/6</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Recuerda:</strong> El denominador indica el tamaño de los pedazos.
              Como son del mismo tamaño, ¡solo contamos cuántos tenemos!
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('subtraction')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>¿Y la resta?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: SUBTRACTION ============
  if (phase === 'subtraction') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Regla de Oro
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Resta de fracciones con igual denominador
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-red-500 rounded-full">
              <Minus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-red-700 dark:text-red-300">
              Para Restar
            </h3>
          </div>

          {/* The formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">
                <span className="text-orange-600 dark:text-orange-400">a</span>
                <span className="text-gray-400">/</span>
                <span className="text-purple-600 dark:text-purple-400">c</span>
                <span className="text-gray-400 mx-2">−</span>
                <span className="text-blue-600 dark:text-blue-400">b</span>
                <span className="text-gray-400">/</span>
                <span className="text-purple-600 dark:text-purple-400">c</span>
                <span className="text-gray-400 mx-2">=</span>
                <span className="text-red-600 dark:text-red-400">(a − b)</span>
                <span className="text-gray-400">/</span>
                <span className="text-purple-600 dark:text-purple-400">c</span>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="space-y-3">
            <p className="text-center text-gray-600 dark:text-gray-400">Ejemplo:</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="text-center">
                <div className="w-32">
                  <FractionBar numerator={5} denominator={8} color="orange" />
                </div>
                <p className="mt-1 font-bold text-orange-600 dark:text-orange-400">5/8</p>
              </div>
              <span className="text-2xl font-bold text-gray-400">−</span>
              <div className="text-center">
                <div className="w-32">
                  <FractionBar numerator={2} denominator={8} color="blue" />
                </div>
                <p className="mt-1 font-bold text-blue-600 dark:text-blue-400">2/8</p>
              </div>
              <span className="text-2xl font-bold text-gray-400">=</span>
              <div className="text-center">
                <div className="w-32">
                  <FractionBar numerator={3} denominator={8} color="red" />
                </div>
                <p className="mt-1 font-bold text-red-600 dark:text-red-400">3/8</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-sm text-center">
            <strong>¡Es igual que la suma!</strong> Solo que restamos los numeradores en vez de sumarlos.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('simplify')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>¿Y si se puede simplificar?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: SIMPLIFY ============
  if (phase === 'simplify') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Regla de Oro
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Simplificar el resultado
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Después de sumar o restar, <strong>siempre verifica</strong> si puedes simplificar el resultado.
            </p>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <p className="text-center text-gray-600 dark:text-gray-400">Ejemplo:</p>

            {/* Step 1: Addition */}
            <div className="flex items-center justify-center gap-3 text-xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">2/8</span>
              <span className="text-gray-400">+</span>
              <span className="text-blue-600 dark:text-blue-400">2/8</span>
              <span className="text-gray-400">=</span>
              <span className="text-green-600 dark:text-green-400">4/8</span>
            </div>

            {/* Step 2: Simplify */}
            <div className="text-center pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                ¿4 y 8 tienen factor común? ¡Sí, el 4!
              </p>
              <div className="flex items-center justify-center gap-3 text-xl font-bold">
                <span className="text-green-600 dark:text-green-400">4/8</span>
                <span className="text-gray-400">=</span>
                <span className="text-purple-600 dark:text-purple-400">(4÷4)/(8÷4)</span>
                <span className="text-gray-400">=</span>
                <span className="text-purple-600 dark:text-purple-400 text-2xl">1/2</span>
              </div>
            </div>

            {/* Visual */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="text-center">
                <div className="w-28">
                  <FractionBar numerator={4} denominator={8} color="green" />
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">4/8</p>
              </div>
              <span className="text-xl font-bold text-gray-400">=</span>
              <div className="text-center">
                <div className="w-28">
                  <FractionBar numerator={1} denominator={2} color="purple" />
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">1/2</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
            <strong>Consejo:</strong> Para simplificar, divide el numerador y el denominador por su máximo común divisor (MCD).
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Ver resumen</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Regla de Oro
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resumen
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 space-y-4">
        {/* Addition */}
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500 rounded-full">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-bold text-green-700 dark:text-green-300">Suma</h4>
          </div>
          <div className="text-xl font-bold text-center">
            <span className="text-orange-600 dark:text-orange-400">a/c</span>
            <span className="text-gray-400 mx-2">+</span>
            <span className="text-blue-600 dark:text-blue-400">b/c</span>
            <span className="text-gray-400 mx-2">=</span>
            <span className="text-green-600 dark:text-green-400">(a+b)/c</span>
          </div>
        </div>

        {/* Subtraction */}
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500 rounded-full">
              <Minus className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-bold text-red-700 dark:text-red-300">Resta</h4>
          </div>
          <div className="text-xl font-bold text-center">
            <span className="text-orange-600 dark:text-orange-400">a/c</span>
            <span className="text-gray-400 mx-2">−</span>
            <span className="text-blue-600 dark:text-blue-400">b/c</span>
            <span className="text-gray-400 mx-2">=</span>
            <span className="text-red-600 dark:text-red-400">(a−b)/c</span>
          </div>
        </div>
      </div>

      {/* Key points */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center">
          Pasos a seguir:
        </h4>
        <ol className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-600 dark:text-purple-400">1.</span>
            Verifica que los denominadores sean <strong>iguales</strong>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-600 dark:text-purple-400">2.</span>
            Suma o resta los <strong>numeradores</strong>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-600 dark:text-purple-400">3.</span>
            Mantén el <strong>mismo denominador</strong>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-600 dark:text-purple-400">4.</span>
            <strong>Simplifica</strong> si es posible
          </li>
        </ol>
      </div>

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
  );
}
