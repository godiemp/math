'use client';

import { useState } from 'react';
import { ArrowRight, Wand2, Plus, Minus } from 'lucide-react';
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg mb-4">
              <Wand2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              El Truco del Mago
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              ¿Y si pudieras hacer desaparecer una variable sumando ecuaciones?
            </p>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 shadow-lg">
            <div className="text-center space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Observa estas dos ecuaciones:
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 inline-block">
                <div className="flex flex-col gap-2 font-mono text-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400">x + y = 7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">x - y = 3</span>
                  </div>
                  <div className="border-t border-gray-300 dark:border-gray-600 pt-2 flex items-center gap-2">
                    <Plus className="text-violet-500" size={16} />
                    <span className="text-violet-700 dark:text-violet-300 font-bold">2x + 0 = 10</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 italic">
                ¡Al sumar las ecuaciones, la <strong>y</strong> desaparece!
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setStage('reveal')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <Wand2 size={20} />
              <span>Ver la magia</span>
            </button>
          </div>
        </>
      )}

      {stage === 'reveal' && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              La Técnica de Reducción
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sumamos o restamos ecuaciones para eliminar una variable
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Observa los coeficientes de y:</p>
                <div className="font-mono mt-2 space-y-1">
                  <p>x + <span className="text-blue-600 dark:text-blue-400 font-bold">y</span> = 7</p>
                  <p>x - <span className="text-emerald-600 dark:text-emerald-400 font-bold">y</span> = 3</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Los coeficientes son +1 y -1 (opuestos)
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Sumamos las ecuaciones:</p>
                <div className="font-mono mt-2 bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400">(x + y) + (x - y) = 7 + 3</p>
                  <p className="text-violet-700 dark:text-violet-300 font-bold mt-1">2x = 10</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Resolvemos:</p>
                <div className="font-mono mt-2 space-y-1">
                  <p className="text-gray-600 dark:text-gray-400">2x = 10</p>
                  <p className="font-bold text-purple-700 dark:text-purple-300">x = 5</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Encontramos y:</p>
                <div className="font-mono mt-2 space-y-1">
                  <p className="text-gray-600 dark:text-gray-400">5 + y = 7</p>
                  <p className="font-bold text-pink-700 dark:text-pink-300">y = 2</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl p-4 text-center">
              <p className="font-bold text-lg text-violet-800 dark:text-violet-200">
                Solución: (5, 2)
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Verificación: 5 + 2 = 7 ✓ y 5 - 2 = 3 ✓
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setStage('connect')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
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
              El Método de Reducción
            </h2>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Busca</strong> coeficientes opuestos o iguales
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold">2</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Suma o resta</strong> las ecuaciones para eliminar una variable
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

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">¿Sumar o Restar?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                <Plus className="mx-auto text-green-600 mb-2" size={24} />
                <p className="font-semibold text-green-700 dark:text-green-300">SUMA</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Cuando los coeficientes son <strong>opuestos</strong>
                </p>
                <p className="font-mono text-xs mt-2 text-gray-500">+y y -y → suma</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                <Minus className="mx-auto text-red-600 mb-2" size={24} />
                <p className="font-semibold text-red-700 dark:text-red-300">RESTA</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Cuando los coeficientes son <strong>iguales</strong>
                </p>
                <p className="font-mono text-xs mt-2 text-gray-500">+2y y +2y → resta</p>
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
