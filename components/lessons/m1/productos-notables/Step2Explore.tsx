'use client';

import { useState } from 'react';
import { ArrowRight, Check, Sparkles, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'cuadrado-binomio' | 'suma-diferencia' | 'termino-comun' | 'resumen' | 'complete';

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('cuadrado-binomio');

  // Cuadrado de binomio state
  const [cuadradoStep, setCuadradoStep] = useState(0);

  // Suma por diferencia state
  const [sumaStep, setSumaStep] = useState(0);

  // Termino comun state
  const [terminoStep, setTerminoStep] = useState(0);

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre los Patrones
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'cuadrado-binomio' && 'Patrón 1: El cuadrado de un binomio'}
          {phase === 'suma-diferencia' && 'Patrón 2: La suma por diferencia'}
          {phase === 'termino-comun' && 'Patrón 3: Binomios con término común'}
          {phase === 'resumen' && '¡Los tres productos notables!'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {['cuadrado-binomio', 'suma-diferencia', 'termino-comun', 'resumen'].map((p, i) => (
          <div
            key={p}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              phase === p
                ? 'bg-purple-500 scale-125'
                : ['cuadrado-binomio', 'suma-diferencia', 'termino-comun', 'resumen'].indexOf(phase) > i
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* PHASE 1: Cuadrado de Binomio */}
      {phase === 'cuadrado-binomio' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700 text-center">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              Ya vimos que <span className="font-mono">(x + 3)² = x² + 6x + 9</span>
            </p>
            <p className="text-blue-600 dark:text-blue-300 text-sm mt-1">
              ¿Hay un patrón general?
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Exploremos <span className="font-mono text-blue-600 font-bold">(a + b)²</span>
            </p>

            {/* Area model for (a+b)² */}
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 260 260" className="w-56 h-56">
                {/* a² section */}
                <rect
                  x="40"
                  y="40"
                  width={cuadradoStep >= 1 ? 100 : 0}
                  height={cuadradoStep >= 1 ? 100 : 0}
                  fill="currentColor"
                  className="text-blue-200 dark:text-blue-800 transition-all duration-500"
                />
                {cuadradoStep >= 1 && (
                  <text x="90" y="95" textAnchor="middle" className="text-xl font-bold fill-blue-700 dark:fill-blue-300 animate-fadeIn">a²</text>
                )}

                {/* ab sections */}
                <rect
                  x="140"
                  y="40"
                  width={cuadradoStep >= 2 ? 60 : 0}
                  height={cuadradoStep >= 2 ? 100 : 0}
                  fill="currentColor"
                  className="text-purple-200 dark:text-purple-800 transition-all duration-500"
                />
                {cuadradoStep >= 2 && (
                  <text x="170" y="95" textAnchor="middle" className="text-lg font-bold fill-purple-700 dark:fill-purple-300 animate-fadeIn">ab</text>
                )}

                <rect
                  x="40"
                  y="140"
                  width={cuadradoStep >= 2 ? 100 : 0}
                  height={cuadradoStep >= 2 ? 60 : 0}
                  fill="currentColor"
                  className="text-purple-200 dark:text-purple-800 transition-all duration-500"
                />
                {cuadradoStep >= 2 && (
                  <text x="90" y="175" textAnchor="middle" className="text-lg font-bold fill-purple-700 dark:fill-purple-300 animate-fadeIn">ab</text>
                )}

                {/* b² section */}
                <rect
                  x="140"
                  y="140"
                  width={cuadradoStep >= 3 ? 60 : 0}
                  height={cuadradoStep >= 3 ? 60 : 0}
                  fill="currentColor"
                  className="text-teal-200 dark:text-teal-800 transition-all duration-500"
                />
                {cuadradoStep >= 3 && (
                  <text x="170" y="175" textAnchor="middle" className="text-lg font-bold fill-teal-700 dark:fill-teal-300 animate-fadeIn">b²</text>
                )}

                {/* Border */}
                <rect
                  x="40"
                  y="40"
                  width="160"
                  height="160"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300 dark:text-gray-600"
                />

                {/* Division lines */}
                {cuadradoStep >= 1 && (
                  <>
                    <line x1="140" y1="40" x2="140" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-gray-400" />
                    <line x1="40" y1="140" x2="200" y2="140" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-gray-400" />
                  </>
                )}

                {/* Labels */}
                <text x="90" y="25" textAnchor="middle" className="text-sm font-bold fill-blue-600">a</text>
                <text x="170" y="25" textAnchor="middle" className="text-sm font-bold fill-teal-600">b</text>
                <text x="25" y="90" textAnchor="middle" className="text-sm font-bold fill-blue-600">a</text>
                <text x="25" y="170" textAnchor="middle" className="text-sm font-bold fill-teal-600">b</text>
              </svg>
            </div>

            {/* Step controls */}
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setCuadradoStep(step)}
                  className={cn(
                    'w-10 h-10 rounded-full font-bold transition-all',
                    cuadradoStep === step
                      ? 'bg-blue-500 text-white'
                      : cuadradoStep > step
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {step + 1}
                </button>
              ))}
            </div>

            {/* Step explanations */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 min-h-[100px]">
              {cuadradoStep === 0 && (
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Tenemos un cuadrado de lado <span className="font-mono text-purple-600">(a + b)</span>.
                  <br />Haz clic en los pasos para ver cómo se divide.
                </p>
              )}
              {cuadradoStep === 1 && (
                <p className="text-gray-600 dark:text-gray-300 text-center animate-fadeIn">
                  El cuadrado grande azul tiene área:
                  <br /><span className="font-mono text-blue-600 text-xl font-bold">a × a = a²</span>
                </p>
              )}
              {cuadradoStep === 2 && (
                <p className="text-gray-600 dark:text-gray-300 text-center animate-fadeIn">
                  Los dos rectángulos morados tienen área:
                  <br /><span className="font-mono text-purple-600 text-xl font-bold">a × b + a × b = 2ab</span>
                </p>
              )}
              {cuadradoStep === 3 && (
                <p className="text-gray-600 dark:text-gray-300 text-center animate-fadeIn">
                  El cuadrado pequeño tiene área:
                  <br /><span className="font-mono text-teal-600 text-xl font-bold">b × b = b²</span>
                </p>
              )}
              {cuadradoStep === 4 && (
                <div className="text-gray-600 dark:text-gray-300 text-center animate-fadeIn space-y-2">
                  <p><strong>¡El patrón!</strong></p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <p className="font-mono text-xl">
                      (<span className="text-blue-600">a</span> + <span className="text-teal-600">b</span>)² = <span className="text-blue-600">a²</span> + <span className="text-purple-600">2ab</span> + <span className="text-teal-600">b²</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Primero al cuadrado + doble producto + segundo al cuadrado
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Also works for subtraction */}
          {cuadradoStep >= 4 && (
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
              <p className="text-amber-800 dark:text-amber-200 text-center font-medium">
                ¿Y si es resta? <span className="font-mono">(a - b)² = a² - 2ab + b²</span>
              </p>
              <p className="text-amber-600 dark:text-amber-300 text-sm text-center mt-1">
                El signo del término medio cambia
              </p>
            </div>
          )}

          {/* Continue button */}
          {cuadradoStep >= 4 && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('suma-diferencia')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Siguiente patrón</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: Suma por Diferencia */}
      {phase === 'suma-diferencia' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700 text-center">
            <p className="text-green-800 dark:text-green-200 font-medium">
              ¿Qué pasa cuando multiplicamos <span className="font-mono">(a + b)(a - b)</span>?
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Usemos la propiedad distributiva:
            </p>

            {/* Step by step expansion */}
            <div className="space-y-4">
              {/* Original */}
              <div className={cn(
                'bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center transition-all',
                sumaStep >= 0 ? 'opacity-100' : 'opacity-50'
              )}>
                <p className="font-mono text-2xl">
                  (<span className="text-blue-600 font-bold">a</span> + <span className="text-purple-600 font-bold">b</span>)(<span className="text-blue-600 font-bold">a</span> - <span className="text-purple-600 font-bold">b</span>)
                </p>
              </div>

              {/* Expanded */}
              {sumaStep >= 1 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center animate-fadeIn">
                  <p className="text-gray-500 mb-2">↓ distribuimos</p>
                  <p className="font-mono text-xl">
                    <span className="text-blue-600">a·a</span> - <span className="text-green-600">a·b</span> + <span className="text-green-600">b·a</span> - <span className="text-purple-600">b·b</span>
                  </p>
                </div>
              )}

              {/* Simplified */}
              {sumaStep >= 2 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center animate-fadeIn">
                  <p className="text-gray-500 mb-2">↓ simplificamos</p>
                  <p className="font-mono text-xl">
                    <span className="text-blue-600">a²</span> <span className="line-through text-gray-400">- ab + ab</span> - <span className="text-purple-600">b²</span>
                  </p>
                  <p className="text-sm text-green-600 mt-2 font-medium">
                    ¡Los términos medios se cancelan!
                  </p>
                </div>
              )}

              {/* Final */}
              {sumaStep >= 3 && (
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center animate-fadeIn border-2 border-green-300 dark:border-green-700">
                  <p className="font-mono text-2xl font-bold text-green-700 dark:text-green-300">
                    a² - b²
                  </p>
                </div>
              )}
            </div>

            {/* Step controls */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3].map((step) => (
                <button
                  key={step}
                  onClick={() => setSumaStep(step)}
                  className={cn(
                    'w-10 h-10 rounded-full font-bold transition-all',
                    sumaStep === step
                      ? 'bg-green-500 text-white'
                      : sumaStep > step
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {step + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern summary */}
          {sumaStep >= 3 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700 animate-fadeIn">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-yellow-800 dark:text-yellow-200">¡El patrón mágico!</span>
              </div>
              <p className="text-center font-mono text-xl text-gray-800 dark:text-gray-200">
                (a + b)(a - b) = a² - b²
              </p>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                Suma por diferencia = <strong>diferencia de cuadrados</strong> (sin término medio)
              </p>
            </div>
          )}

          {/* Continue button */}
          {sumaStep >= 3 && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('termino-comun')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Último patrón</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 3: Término Común */}
      {phase === 'termino-comun' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700 text-center">
            <p className="text-purple-800 dark:text-purple-200 font-medium">
              ¿Qué pasa cuando multiplicamos <span className="font-mono">(x + a)(x + b)</span>?
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              Ejemplo: <span className="font-mono text-purple-600 font-bold">(x + 2)(x + 5)</span>
            </p>

            {/* Step by step expansion */}
            <div className="space-y-4">
              {/* Original */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="font-mono text-2xl">
                  (<span className="text-blue-600 font-bold">x</span> + <span className="text-purple-600 font-bold">2</span>)(<span className="text-blue-600 font-bold">x</span> + <span className="text-teal-600 font-bold">5</span>)
                </p>
              </div>

              {/* Expanded */}
              {terminoStep >= 1 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center animate-fadeIn">
                  <p className="text-gray-500 mb-2">↓ distribuimos</p>
                  <p className="font-mono text-xl">
                    <span className="text-blue-600">x·x</span> + <span className="text-teal-600">x·5</span> + <span className="text-purple-600">2·x</span> + <span className="text-green-600">2·5</span>
                  </p>
                </div>
              )}

              {/* Simplified */}
              {terminoStep >= 2 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center animate-fadeIn">
                  <p className="text-gray-500 mb-2">↓ simplificamos</p>
                  <p className="font-mono text-xl">
                    <span className="text-blue-600">x²</span> + <span className="text-teal-600">5x</span> + <span className="text-purple-600">2x</span> + <span className="text-green-600">10</span>
                  </p>
                </div>
              )}

              {/* Combined */}
              {terminoStep >= 3 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center animate-fadeIn">
                  <p className="text-gray-500 mb-2">↓ combinamos términos semejantes</p>
                  <p className="font-mono text-xl">
                    <span className="text-blue-600">x²</span> + <span className="text-purple-600">(2+5)x</span> + <span className="text-green-600">(2·5)</span>
                  </p>
                </div>
              )}

              {/* Final */}
              {terminoStep >= 4 && (
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center animate-fadeIn border-2 border-purple-300 dark:border-purple-700">
                  <p className="font-mono text-2xl font-bold text-purple-700 dark:text-purple-300">
                    x² + 7x + 10
                  </p>
                </div>
              )}
            </div>

            {/* Step controls */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setTerminoStep(step)}
                  className={cn(
                    'w-10 h-10 rounded-full font-bold transition-all',
                    terminoStep === step
                      ? 'bg-purple-500 text-white'
                      : terminoStep > step
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {step + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern summary */}
          {terminoStep >= 4 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700 animate-fadeIn">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-yellow-800 dark:text-yellow-200">¡El patrón del término común!</span>
              </div>
              <p className="text-center font-mono text-xl text-gray-800 dark:text-gray-200">
                (x + a)(x + b) = x² + (a+b)x + ab
              </p>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                <strong>Suma</strong> de los números en el medio, <strong>producto</strong> al final
              </p>
            </div>
          )}

          {/* Continue button */}
          {terminoStep >= 4 && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('resumen')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Ver resumen</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 4: Resumen */}
      {phase === 'resumen' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
              Los Tres Productos Notables
            </h3>

            <div className="grid gap-4">
              {/* Cuadrado de binomio */}
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <span className="font-bold text-blue-800 dark:text-blue-200">Cuadrado de Binomio</span>
                </div>
                <div className="font-mono text-lg text-center space-y-1">
                  <p>(a + b)² = a² + 2ab + b²</p>
                  <p>(a - b)² = a² - 2ab + b²</p>
                </div>
              </div>

              {/* Suma por diferencia */}
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <span className="font-bold text-green-800 dark:text-green-200">Suma por Diferencia</span>
                </div>
                <div className="font-mono text-lg text-center">
                  <p>(a + b)(a - b) = a² - b²</p>
                </div>
              </div>

              {/* Término común */}
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <span className="font-bold text-purple-800 dark:text-purple-200">Binomios con Término Común</span>
                </div>
                <div className="font-mono text-lg text-center">
                  <p>(x + a)(x + b) = x² + (a+b)x + ab</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
            <p className="text-yellow-800 dark:text-yellow-200 text-center font-medium">
              <Sparkles className="inline w-5 h-5 mr-2" />
              Estos patrones son <strong>atajos</strong> para multiplicar. ¡Memorízalos y ahorrarás tiempo!
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <Check size={20} />
              <span>¡Entendido!</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
