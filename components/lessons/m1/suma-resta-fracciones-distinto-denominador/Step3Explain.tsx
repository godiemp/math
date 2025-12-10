'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Plus, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'method' | 'steps' | 'example' | 'summary';

// Fraction bar component
function FractionBar({
  numerator,
  denominator,
  color = 'blue',
}: {
  numerator: number;
  denominator: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
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
  const [phase, setPhase] = useState<Phase>('method');

  if (!isActive) return null;

  // ============ PHASE 1: METHOD ============
  if (phase === 'method') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Regla de la Conversión
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El método completo
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-purple-500 rounded-full">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">
              Para Sumar con Distinto Denominador
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <p className="font-bold text-purple-800 dark:text-purple-200">
                    Encuentra el MCM
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Busca el mínimo común múltiplo de los denominadores
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <p className="font-bold text-blue-800 dark:text-blue-200">
                    Convierte cada fracción
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Multiplica numerador y denominador por el mismo número
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <p className="font-bold text-green-800 dark:text-green-200">
                    Suma los numeradores
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ahora que tienen igual denominador, solo suma arriba
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </span>
                <div>
                  <p className="font-bold text-amber-800 dark:text-amber-200">
                    Simplifica si es posible
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Divide numerador y denominador por su MCD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('steps')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Ver el detalle</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: STEPS ============
  if (phase === 'steps') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Regla de la Conversión
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cómo convertir fracciones
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Para convertir una fracción a un <strong>denominador diferente</strong>,
              multiplica <strong>arriba y abajo</strong> por el mismo número.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              Ejemplo: Convertir <span className="font-bold text-orange-600 dark:text-orange-400">1/2</span> a sextos
            </p>

            <div className="space-y-4">
              {/* Original fraction */}
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    <div>1</div>
                    <div className="border-t-2 border-orange-600 dark:border-orange-400 w-8 mx-auto" />
                    <div>2</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-gray-400" />
              </div>

              {/* Multiplication step */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">×3</p>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    <div>1</div>
                    <div className="border-t-2 border-orange-600 dark:border-orange-400 w-8 mx-auto" />
                    <div>2</div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">×3</p>
                </div>

                <span className="text-2xl font-bold text-gray-400">=</span>

                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    <div>1×3 = 3</div>
                    <div className="border-t-2 border-green-600 dark:border-green-400 w-20 mx-auto" />
                    <div>2×3 = 6</div>
                  </div>
                </div>

                <span className="text-2xl font-bold text-gray-400">=</span>

                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  <div>3</div>
                  <div className="border-t-2 border-green-600 dark:border-green-400 w-8 mx-auto" />
                  <div>6</div>
                </div>
              </div>
            </div>

            <p className="text-center text-purple-700 dark:text-purple-300 mt-4 text-sm">
              <strong>¿Por qué ×3?</strong> Porque 6 ÷ 2 = 3
            </p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
            <strong>Regla:</strong> Para saber por cuánto multiplicar, divide el MCM entre el denominador original.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('example')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all shadow-lg"
          >
            <span>Ver ejemplo completo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: EXAMPLE ============
  if (phase === 'example') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Regla de la Conversión
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ejemplo: 2/3 + 1/4
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/30 dark:to-blue-900/30 rounded-xl p-6 space-y-4">
          {/* Step 1: Find MCM */}
          <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <p className="font-bold text-purple-700 dark:text-purple-300">Encuentra el MCM</p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm ml-8">
              MCM(3, 4) = <strong className="text-purple-600 dark:text-purple-400">12</strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 ml-8">
              Múltiplos de 3: 3, 6, 9, <strong>12</strong>... | Múltiplos de 4: 4, 8, <strong>12</strong>...
            </p>
          </div>

          {/* Step 2: Convert fractions */}
          <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <p className="font-bold text-blue-700 dark:text-blue-300">Convierte cada fracción</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
              <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">12 ÷ 3 = 4</p>
                <p className="font-bold">
                  <span className="text-orange-600 dark:text-orange-400">2/3</span>
                  {' = '}
                  <span className="text-orange-600 dark:text-orange-400">(2×4)/(3×4)</span>
                  {' = '}
                  <span className="text-orange-600 dark:text-orange-400">8/12</span>
                </p>
              </div>
              <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">12 ÷ 4 = 3</p>
                <p className="font-bold">
                  <span className="text-blue-600 dark:text-blue-400">1/4</span>
                  {' = '}
                  <span className="text-blue-600 dark:text-blue-400">(1×3)/(4×3)</span>
                  {' = '}
                  <span className="text-blue-600 dark:text-blue-400">3/12</span>
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Add */}
          <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <p className="font-bold text-green-700 dark:text-green-300">Suma los numeradores</p>
            </div>
            <div className="text-center ml-8">
              <p className="text-xl font-bold">
                <span className="text-orange-600 dark:text-orange-400">8/12</span>
                {' + '}
                <span className="text-blue-600 dark:text-blue-400">3/12</span>
                {' = '}
                <span className="text-green-600 dark:text-green-400">11/12</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">8 + 3 = 11</p>
            </div>
          </div>

          {/* Step 4: Simplify */}
          <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <p className="font-bold text-amber-700 dark:text-amber-300">Simplifica</p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm ml-8">
              11 y 12 no tienen factores comunes → <strong className="text-green-600 dark:text-green-400">11/12 es la respuesta final</strong>
            </p>
          </div>

          {/* Visual result */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="w-24">
              <FractionBar numerator={11} denominator={12} color="green" />
              <p className="text-center text-sm font-bold text-green-600 dark:text-green-400 mt-1">11/12</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
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
          La Regla de la Conversión
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resumen
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 space-y-4">
        {/* Formula */}
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center">
            Fórmula General
          </h4>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-2">+</span>
              <span className="text-blue-600 dark:text-blue-400">c/d</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-green-600 dark:text-green-400">(a×d + c×b)</span>
              <span className="text-gray-400">/</span>
              <span className="text-purple-600 dark:text-purple-400">(b×d)</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              (Usando el producto de denominadores)
            </p>
          </div>
        </div>

        {/* Alternative with MCM */}
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 text-center">
            Método Recomendado (con MCM)
          </h4>
          <div className="text-center text-sm text-gray-700 dark:text-gray-300">
            <p>Si MCM(b,d) = m, entonces:</p>
            <div className="text-lg font-bold mt-2">
              <span className="text-orange-600 dark:text-orange-400">a/b</span>
              <span className="text-gray-400 mx-1">→</span>
              <span className="text-orange-600 dark:text-orange-400">(a×k₁)/m</span>
              <span className="mx-3 text-gray-400">y</span>
              <span className="text-blue-600 dark:text-blue-400">c/d</span>
              <span className="text-gray-400 mx-1">→</span>
              <span className="text-blue-600 dark:text-blue-400">(c×k₂)/m</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              donde k₁ = m÷b y k₂ = m÷d
            </p>
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
            Encuentra el <strong>MCM</strong> de los denominadores
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-600 dark:text-purple-400">2.</span>
            <strong>Convierte</strong> cada fracción al denominador común
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-600 dark:text-purple-400">3.</span>
            <strong>Suma</strong> los numeradores
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
