'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, BookOpen, Divide } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'definition' | 'method' | 'example' | 'connection';

// Fraction bar component for visualization
function FractionBar({
  numerator,
  denominator,
  color = 'blue',
  label,
}: {
  numerator: number;
  denominator: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  label?: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: denominator }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-8 h-6 border border-gray-400 dark:border-gray-500 first:rounded-l-md last:rounded-r-md',
              i < numerator ? colorClasses[color] : 'bg-gray-100 dark:bg-gray-700',
            )}
          />
        ))}
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>
      )}
    </div>
  );
}

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('definition');

  if (!isActive) return null;

  // ============ PHASE 1: DEFINITION ============
  if (phase === 'definition') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Método de los Factores
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Qué es el M.C.D.?
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="text-center space-y-4">
            <BookOpen className="w-16 h-16 mx-auto text-blue-500" />

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-lg mx-auto">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Máximo Común Divisor (M.C.D.)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                El <strong className="text-blue-600">M.C.D.</strong> de dos o más números es el{' '}
                <strong className="text-purple-600">número más grande</strong> que{' '}
                <strong className="text-green-600">divide exactamente</strong> a todos ellos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-4">
                <p className="font-bold text-blue-800 dark:text-blue-200">Máximo</p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">El más grande posible</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-4">
                <p className="font-bold text-purple-800 dark:text-purple-200">Común</p>
                <p className="text-purple-700 dark:text-purple-300 text-sm">Compartido por todos</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-4">
                <p className="font-bold text-green-800 dark:text-green-200">Divisor</p>
                <p className="text-green-700 dark:text-green-300 text-sm">Divide sin residuo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('method')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver el método</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: METHOD ============
  if (phase === 'method') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Método de los Factores
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Pasos para encontrar el M.C.D.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="space-y-4 max-w-lg mx-auto">
            <div className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">
                  Lista los divisores del primer número
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Encuentra todos los números que lo dividen exactamente
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">
                  Lista los divisores del segundo número
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Repite el proceso para el otro número
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">
                  Identifica los divisores comunes
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Marca los que aparecen en ambas listas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border-2 border-green-400">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                4
              </div>
              <div>
                <p className="font-bold text-green-800 dark:text-green-200">
                  Elige el mayor de los comunes
                </p>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  ¡Ese es el M.C.D.!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('example')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Ver ejemplo</span>
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
            El Método de los Factores
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ejemplo: M.C.D.(24, 36)
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-lg mx-auto space-y-4">
          {/* Step 1: Divisors of 24 */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
              Paso 1: Divisores de 24
            </p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 6, 8, 12, 24].map(d => (
                <span
                  key={d}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    [1, 2, 3, 4, 6, 12].includes(d)
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-blue-100 text-blue-800',
                  )}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Step 2: Divisors of 36 */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="font-bold text-green-600 dark:text-green-400 mb-2">
              Paso 2: Divisores de 36
            </p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 6, 9, 12, 18, 36].map(d => (
                <span
                  key={d}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    [1, 2, 3, 4, 6, 12].includes(d)
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-green-100 text-green-800',
                  )}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Step 3: Common divisors */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              Paso 3: Divisores comunes
            </p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 6, 12].map(d => (
                <span
                  key={d}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-bold',
                    d === 12
                      ? 'bg-yellow-400 text-yellow-900 ring-2 ring-yellow-600'
                      : 'bg-yellow-200 text-yellow-800',
                  )}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Step 4: Result */}
          <div className="text-center pt-2">
            <p className="font-bold text-green-600 dark:text-green-400 mb-2">
              Paso 4: El mayor es...
            </p>
            <p className="text-3xl font-bold text-green-700 dark:text-green-400">
              M.C.D.(24, 36) = 12
            </p>
          </div>
        </div>

        {/* Lightbulb tip */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700 max-w-lg mx-auto">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Tip:</strong> Si un número divide exactamente a otro, el M.C.D. es el menor de los dos.
              Por ejemplo: M.C.D.(12, 36) = 12 porque 12 divide a 36.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('connection')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>¿Para qué sirve?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: CONNECTION TO FRACTIONS ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Método de los Factores
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          El M.C.D. y las fracciones
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
        <div className="text-center space-y-4">
          <Divide className="w-12 h-12 mx-auto text-purple-500" />
          <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
            Simplificar Fracciones
          </h3>
          <p className="text-gray-700 dark:text-gray-300 max-w-md mx-auto">
            El M.C.D. nos ayuda a simplificar fracciones a su forma más simple.
            Dividimos numerador y denominador por el M.C.D.
          </p>
        </div>
      </div>

      {/* Example with fraction bars */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-lg mx-auto">
        <h4 className="font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          Ejemplo: Simplificar 12/18
        </h4>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Fracción original:</p>
            <FractionBar numerator={12} denominator={18} color="blue" label="12/18" />
          </div>

          <div className="text-center py-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              M.C.D.(12, 18) = <strong>6</strong>
            </p>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
              12 ÷ 6 = 2 | 18 ÷ 6 = 3
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Fracción simplificada:</p>
            <FractionBar numerator={2} denominator={3} color="green" label="2/3" />
          </div>

          <div className="text-center pt-2">
            <p className="text-lg font-bold">
              <span className="text-blue-600">12/18</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-green-600">2/3</span>
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              ¡Representan la misma cantidad!
            </p>
          </div>
        </div>
      </div>

      {/* Summary box */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700 max-w-lg mx-auto">
        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 text-center">
          Resumen
        </h4>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">1.</span>
            <span>Lista los divisores de cada número</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">2.</span>
            <span>Encuentra los divisores comunes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">3.</span>
            <span>El mayor común es el M.C.D.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">4.</span>
            <span>Úsalo para simplificar fracciones</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar a práctica</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
