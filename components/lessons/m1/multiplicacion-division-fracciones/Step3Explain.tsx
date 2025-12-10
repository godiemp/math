'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Zap, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'multiplication' | 'simplify-trick' | 'examples' | 'summary';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('multiplication');

  if (!isActive) return null;

  // ============ PHASE 1: MULTIPLICATION RULE ============
  if (phase === 'multiplication') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Las Reglas de Oro
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Multiplicacion de fracciones
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-center font-bold text-amber-700 dark:text-amber-300 mb-4 text-lg">
              La Regla de la Multiplicacion
            </h3>

            {/* The rule */}
            <div className="text-center mb-6">
              <div className="text-2xl md:text-3xl font-bold">
                <div className="inline-flex items-center gap-2 flex-wrap justify-center">
                  <div className="text-center">
                    <div className="text-orange-600 dark:text-orange-400">a</div>
                    <div className="border-t-2 border-orange-600 dark:border-orange-400 w-8 mx-auto" />
                    <div className="text-orange-600 dark:text-orange-400">b</div>
                  </div>
                  <span className="text-gray-400 text-2xl">×</span>
                  <div className="text-center">
                    <div className="text-blue-600 dark:text-blue-400">c</div>
                    <div className="border-t-2 border-blue-600 dark:border-blue-400 w-8 mx-auto" />
                    <div className="text-blue-600 dark:text-blue-400">d</div>
                  </div>
                  <span className="text-gray-400 text-2xl">=</span>
                  <div className="text-center">
                    <div className="text-green-600 dark:text-green-400">a × c</div>
                    <div className="border-t-2 border-green-600 dark:border-green-400 w-16 mx-auto" />
                    <div className="text-green-600 dark:text-green-400">b × d</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <span className="flex-shrink-0 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-bold text-orange-800 dark:text-orange-200">
                    Multiplica los numeradores
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    El numero de arriba × el numero de arriba
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-bold text-blue-800 dark:text-blue-200">
                    Multiplica los denominadores
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    El numero de abajo × el numero de abajo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-bold text-green-800 dark:text-green-200">
                    Simplifica si es posible
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Busca factores comunes entre numerador y denominador
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('simplify-trick')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Ver el truco pro</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: SIMPLIFY TRICK ============
  if (phase === 'simplify-trick') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Las Reglas de Oro
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El truco de simplificar antes
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="w-6 h-6 text-purple-500 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Puedes <strong>simplificar cruzado</strong> antes de multiplicar.
              ¡Hace los calculos mucho mas faciles!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              Ejemplo: <span className="font-bold">2/3 × 3/4</span>
            </p>

            <div className="space-y-4">
              {/* Without trick */}
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Metodo normal:
                </p>
                <div className="text-center text-lg">
                  <span className="text-gray-700 dark:text-gray-300">2/3 × 3/4 = 6/12 = </span>
                  <span className="text-green-600 dark:text-green-400 font-bold">1/2</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
                  (hay que simplificar 6/12 al final)
                </p>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-purple-400" />
              </div>

              {/* With trick */}
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg border-2 border-purple-300 dark:border-purple-600">
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                  Truco pro - simplifica ANTES:
                </p>
                <div className="text-center">
                  <div className="text-lg mb-2">
                    <span className="text-orange-600 dark:text-orange-400">2</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-orange-600 dark:text-orange-400 line-through decoration-2">3</span>
                    <span className="text-gray-400 mx-2">×</span>
                    <span className="text-blue-600 dark:text-blue-400 line-through decoration-2">3</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-blue-600 dark:text-blue-400">4</span>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    El <span className="font-bold">3</span> de arriba cancela con el <span className="font-bold">3</span> de abajo
                  </p>
                  <div className="text-lg mt-2">
                    <span className="text-gray-700 dark:text-gray-300">= 2/1 × 1/4 = 2/4 = </span>
                    <span className="text-green-600 dark:text-green-400 font-bold">1/2</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                <Lightbulb className="w-4 h-4 inline mr-1" />
                Puedes simplificar cualquier numerador con cualquier denominador si tienen factores comunes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('examples')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Ver mas ejemplos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: EXAMPLES ============
  if (phase === 'examples') {
    const examples = [
      {
        problem: '1/2 × 2/3',
        step: '(1×2)/(2×3)',
        result: '2/6 = 1/3',
        tip: 'Simplifica al final',
      },
      {
        problem: '3/4 × 2/5',
        step: '(3×2)/(4×5)',
        result: '6/20 = 3/10',
        tip: 'Divide ambos por 2',
      },
      {
        problem: '5/6 × 3/10',
        step: '(5×3)/(6×10)',
        result: '15/60 = 1/4',
        tip: 'O simplifica: 5 con 10, y 3 con 6 primero',
      },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Las Reglas de Oro
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ejemplos resueltos
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl p-6">
          <div className="space-y-4">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">
                        {ex.problem}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        = {ex.step}
                      </p>
                    </div>
                  </div>
                  <div className="text-right md:text-left ml-11 md:ml-0">
                    <p className="text-green-600 dark:text-green-400 font-bold">
                      = {ex.result}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {ex.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Special case: fraction times integer */}
          <div className="mt-4 p-4 bg-amber-100 dark:bg-amber-900/50 rounded-xl border border-amber-300 dark:border-amber-700">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
              Caso especial: Fraccion × Entero
            </h4>
            <div className="text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Un entero es una fraccion con denominador 1:
              </p>
              <p className="text-lg font-bold">
                <span className="text-orange-600 dark:text-orange-400">2/3</span>
                <span className="text-gray-400 mx-2">×</span>
                <span className="text-blue-600 dark:text-blue-400">4</span>
                <span className="text-gray-400 mx-2">=</span>
                <span className="text-orange-600 dark:text-orange-400">2/3</span>
                <span className="text-gray-400 mx-2">×</span>
                <span className="text-blue-600 dark:text-blue-400">4/1</span>
                <span className="text-gray-400 mx-2">=</span>
                <span className="text-green-600 dark:text-green-400">8/3</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all shadow-lg"
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
          Las Reglas de Oro
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resumen
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
        {/* Main formula box */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg text-center mb-4">
          <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">
            Formula de Multiplicacion
          </h3>
          <div className="text-2xl font-bold">
            <span className="text-orange-600 dark:text-orange-400">a/b</span>
            <span className="text-gray-400 mx-2">×</span>
            <span className="text-blue-600 dark:text-blue-400">c/d</span>
            <span className="text-gray-400 mx-2">=</span>
            <span className="text-green-600 dark:text-green-400">(a×c)/(b×d)</span>
          </div>
        </div>

        {/* Key points */}
        <div className="space-y-3">
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Multiplica directo</strong>: numerador × numerador, denominador × denominador
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>No necesitas</strong> denominador comun (a diferencia de la suma)
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Simplifica</strong> antes o despues de multiplicar
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Enteros</strong>: conviertelos a fraccion (4 = 4/1)
            </p>
          </div>
        </div>
      </div>

      {/* Next up teaser */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 text-center text-sm">
          <strong>A continuacion:</strong> ¡Practica de multiplicacion de fracciones!
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
