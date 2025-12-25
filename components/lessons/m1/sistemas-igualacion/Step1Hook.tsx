'use client';

import { useState } from 'react';
import { ArrowRight, Scale, Equal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [stage, setStage] = useState<'intro' | 'reveal' | 'connect'>('intro');

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {stage === 'intro' && (
        <>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg mb-4">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Las Balanzas Gemelas
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Dos balanzas miden lo mismo... ¿qué pasa si las comparamos?
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-2xl p-6 shadow-lg">
            <div className="text-center space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Imagina que tienes dos balanzas que pesan la misma cantidad <strong className="text-cyan-600">y</strong>:
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                {/* Balance 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                  <p className="text-sm text-gray-500 mb-2">Balanza 1</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900/50 px-3 py-2 rounded-lg font-mono text-blue-700 dark:text-blue-300">
                      2x + 3
                    </div>
                    <Equal className="text-gray-400" size={20} />
                    <div className="bg-cyan-100 dark:bg-cyan-900/50 px-3 py-2 rounded-lg font-mono text-cyan-700 dark:text-cyan-300 font-bold">
                      y
                    </div>
                  </div>
                </div>

                {/* Balance 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                  <p className="text-sm text-gray-500 mb-2">Balanza 2</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 px-3 py-2 rounded-lg font-mono text-emerald-700 dark:text-emerald-300">
                      x + 5
                    </div>
                    <Equal className="text-gray-400" size={20} />
                    <div className="bg-cyan-100 dark:bg-cyan-900/50 px-3 py-2 rounded-lg font-mono text-cyan-700 dark:text-cyan-300 font-bold">
                      y
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 italic">
                Si ambas expresiones son iguales a <strong>y</strong>, entonces... ¡son iguales entre sí!
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setStage('reveal')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg"
            >
              <Equal size={20} />
              <span>Descubrir el truco</span>
            </button>
          </div>
        </>
      )}

      {stage === 'reveal' && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              La Técnica de Igualación
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Si ambas expresiones son iguales a <strong>y</strong>, podemos igualarlas:
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Despejamos "y" en ambas ecuaciones:</p>
                <div className="font-mono mt-2 space-y-1">
                  <p className="text-blue-600 dark:text-blue-400">y = 2x + 3</p>
                  <p className="text-emerald-600 dark:text-emerald-400">y = x + 5</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Igualamos las expresiones:</p>
                <p className="font-mono text-lg text-cyan-700 dark:text-cyan-300 mt-2">
                  <span className="text-blue-600 dark:text-blue-400">2x + 3</span> = <span className="text-emerald-600 dark:text-emerald-400">x + 5</span>
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Resolvemos:</p>
                <div className="font-mono mt-2 space-y-1">
                  <p className="text-gray-600 dark:text-gray-400">2x + 3 = x + 5</p>
                  <p className="text-gray-600 dark:text-gray-400">2x - x = 5 - 3</p>
                  <p className="font-bold text-purple-700 dark:text-purple-300">x = 2</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Encontramos "y":</p>
                <div className="font-mono mt-2 space-y-1">
                  <p className="text-gray-600 dark:text-gray-400">y = x + 5 = 2 + 5</p>
                  <p className="font-bold text-pink-700 dark:text-pink-300">y = 7</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl p-4 text-center">
              <p className="font-bold text-lg text-cyan-800 dark:text-cyan-200">
                Solución: (2, 7)
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Verificación: y = 2(2) + 3 = 7 ✓ y y = 2 + 5 = 7 ✓
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setStage('connect')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg"
            >
              <span>Entendido</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </>
      )}

      {stage === 'connect' && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              El Método de Igualación
            </h2>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-2xl p-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Despeja</strong> la misma variable en ambas ecuaciones
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">2</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Iguala</strong> las dos expresiones resultantes
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Resuelve</strong> y encuentra ambas variables
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Este método es útil cuando es fácil despejar la misma variable en ambas ecuaciones.
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg">
                <span className="text-green-700 dark:text-green-300">Ideal: y = 2x + 1</span>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg">
                <span className="text-green-700 dark:text-green-300">Ideal: y = -x + 5</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
