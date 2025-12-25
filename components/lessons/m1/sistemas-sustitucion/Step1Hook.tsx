'use client';

import { useState } from 'react';
import { ArrowRight, Search, Eye } from 'lucide-react';
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg mb-4">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              El Detective de Variables
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Un detective descubre el valor de una variable... y la usa para descubrir la otra.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 shadow-lg">
            <div className="text-center space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                En una tienda de tecnología, un notebook y una tablet juntos cuestan <strong className="text-amber-600">$500.000</strong>.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Sabemos que el notebook cuesta <strong className="text-blue-600">$100.000 más</strong> que la tablet.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 inline-block">
                <div className="flex flex-col gap-2 font-mono text-lg">
                  <span className="text-blue-600 dark:text-blue-400">notebook + tablet = 500.000</span>
                  <span className="text-emerald-600 dark:text-emerald-400">notebook = tablet + 100.000</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 italic">
                ¿Puedes usar la segunda pista para reemplazar en la primera?
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setStage('reveal')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <Eye size={20} />
              <span>Descubrir el truco</span>
            </button>
          </div>
        </>
      )}

      {stage === 'reveal' && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              La Técnica de Sustitución
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Si sabemos que <strong>notebook = tablet + 100.000</strong>, podemos reemplazar:
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Tenemos despejado &quot;notebook&quot;:</p>
                <p className="font-mono text-blue-600 dark:text-blue-400 mt-1">notebook = tablet + 100.000</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Sustituimos en la primera ecuación:</p>
                <div className="font-mono mt-2 space-y-1">
                  <p><span className="text-gray-500">notebook</span> + tablet = 500.000</p>
                  <p><span className="text-emerald-600 dark:text-emerald-400">(tablet + 100.000)</span> + tablet = 500.000</p>
                  <p className="text-purple-600 dark:text-purple-400">2·tablet + 100.000 = 500.000</p>
                  <p className="text-purple-600 dark:text-purple-400">2·tablet = 400.000</p>
                  <p className="font-bold text-purple-700 dark:text-purple-300">tablet = 200.000</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Encontramos &quot;notebook&quot;:</p>
                <div className="font-mono mt-2 space-y-1">
                  <p>notebook = <span className="text-emerald-600">200.000</span> + 100.000</p>
                  <p className="font-bold text-blue-700 dark:text-blue-300">notebook = 300.000</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-4 text-center">
              <p className="font-bold text-lg text-amber-800 dark:text-amber-200">
                La tablet cuesta $200.000 y el notebook $300.000
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Verificación: 300.000 + 200.000 = 500.000 ✓
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setStage('connect')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
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
              El Método de Sustitución
            </h2>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Despeja</strong> una variable de una ecuación
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">2</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Sustituye</strong> esa expresión en la otra ecuación
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Resuelve</strong> y luego encuentra la otra variable
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Este método es especialmente útil cuando una variable ya está despejada o es fácil de despejar.
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg">
                <span className="text-green-700 dark:text-green-300">Ideal: y = 2x + 1</span>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg">
                <span className="text-green-700 dark:text-green-300">Ideal: x = 3y</span>
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
