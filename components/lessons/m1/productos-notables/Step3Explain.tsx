'use client';

import { useEffect, useState } from 'react';
import { Check, X, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Auto-complete on mount (explain steps don't require interaction)
  useEffect(() => {
    if (isActive) {
      onComplete();
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Los Tres Productos Notables
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Material de referencia - haz clic en cada tarjeta para más detalles
        </p>
      </div>

      {/* Card 1: Cuadrado de Binomio */}
      <div
        className={cn(
          'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-2xl p-6 border-2 border-blue-300 dark:border-blue-700 cursor-pointer transition-all',
          expandedCard === 0 && 'ring-4 ring-blue-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
            CUADRADO DE UN BINOMIO
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <div className="text-center space-y-2">
            <p className="font-mono text-xl">
              (<span className="text-blue-600">a</span> + <span className="text-purple-600">b</span>)² = <span className="text-blue-600">a²</span> + <span className="text-green-600">2ab</span> + <span className="text-purple-600">b²</span>
            </p>
            <p className="font-mono text-xl">
              (<span className="text-blue-600">a</span> - <span className="text-purple-600">b</span>)² = <span className="text-blue-600">a²</span> - <span className="text-green-600">2ab</span> + <span className="text-purple-600">b²</span>
            </p>
          </div>
        </div>

        {expandedCard === 0 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
              <strong>Primero</strong> al cuadrado + <strong>doble producto</strong> + <strong>segundo</strong> al cuadrado
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Ejemplos:</p>
              <div className="font-mono text-lg space-y-2">
                <p>
                  <span className="text-gray-600 dark:text-gray-400">(x + 4)²</span>
                  <span className="text-gray-400 mx-2">=</span>
                  <span className="text-blue-600">x²</span> + <span className="text-green-600">8x</span> + <span className="text-purple-600">16</span>
                </p>
                <p>
                  <span className="text-gray-600 dark:text-gray-400">(2x - 3)²</span>
                  <span className="text-gray-400 mx-2">=</span>
                  <span className="text-blue-600">4x²</span> - <span className="text-green-600">12x</span> + <span className="text-purple-600">9</span>
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <Lightbulb className="inline w-4 h-4 mr-1" />
                <strong>Truco:</strong> El término del medio siempre es el doble del producto de ambos términos.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card 2: Suma por Diferencia */}
      <div
        className={cn(
          'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700 cursor-pointer transition-all',
          expandedCard === 1 && 'ring-4 ring-green-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
          <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
            SUMA POR DIFERENCIA
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <div className="text-center">
            <p className="font-mono text-xl">
              (<span className="text-blue-600">a</span> + <span className="text-purple-600">b</span>)(<span className="text-blue-600">a</span> - <span className="text-purple-600">b</span>) = <span className="text-blue-600">a²</span> - <span className="text-purple-600">b²</span>
            </p>
          </div>
        </div>

        {expandedCard === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
              <strong>Diferencia de cuadrados</strong> - ¡sin término medio!
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Ejemplos:</p>
              <div className="font-mono text-lg space-y-2">
                <p>
                  <span className="text-gray-600 dark:text-gray-400">(x + 5)(x - 5)</span>
                  <span className="text-gray-400 mx-2">=</span>
                  <span className="text-green-600 font-bold">x² - 25</span>
                </p>
                <p>
                  <span className="text-gray-600 dark:text-gray-400">(3y + 2)(3y - 2)</span>
                  <span className="text-gray-400 mx-2">=</span>
                  <span className="text-green-600 font-bold">9y² - 4</span>
                </p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <Lightbulb className="inline w-4 h-4 mr-1" />
                <strong>Por qué funciona:</strong> Los términos +ab y -ab se cancelan entre sí.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card 3: Binomios con Término Común */}
      <div
        className={cn(
          'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700 cursor-pointer transition-all',
          expandedCard === 2 && 'ring-4 ring-purple-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
          <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
            BINOMIOS CON TÉRMINO COMÚN
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <div className="text-center">
            <p className="font-mono text-xl">
              (<span className="text-blue-600">x</span> + <span className="text-purple-600">a</span>)(<span className="text-blue-600">x</span> + <span className="text-teal-600">b</span>) = <span className="text-blue-600">x²</span> + <span className="text-green-600">(a+b)x</span> + <span className="text-orange-600">ab</span>
            </p>
          </div>
        </div>

        {expandedCard === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
              <strong>Suma</strong> de los números en medio, <strong>producto</strong> al final
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Ejemplos:</p>
              <div className="font-mono text-lg space-y-2">
                <p>
                  <span className="text-gray-600 dark:text-gray-400">(x + 3)(x + 5)</span>
                  <span className="text-gray-400 mx-2">=</span>
                  x² + <span className="text-green-600">8</span>x + <span className="text-orange-600">15</span>
                  <span className="text-gray-400 text-sm ml-2">(3+5=8, 3×5=15)</span>
                </p>
                <p>
                  <span className="text-gray-600 dark:text-gray-400">(x - 2)(x + 7)</span>
                  <span className="text-gray-400 mx-2">=</span>
                  x² + <span className="text-green-600">5</span>x - <span className="text-orange-600">14</span>
                  <span className="text-gray-400 text-sm ml-2">(-2+7=5, -2×7=-14)</span>
                </p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                <Lightbulb className="inline w-4 h-4 mr-1" />
                <strong>Clave:</strong> Cuidado con los signos cuando hay restas.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card 4: Errores Comunes */}
      <div
        className={cn(
          'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl p-6 border-2 border-red-200 dark:border-red-800 cursor-pointer transition-all',
          expandedCard === 3 && 'ring-4 ring-red-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 3 ? null : 3)}
      >
        <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          ERRORES COMUNES
        </h3>

        <div className="space-y-4">
          {/* Error 1: Forgetting middle term */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-mono text-red-600">(x + 3)² = x² + 9</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-mono text-green-600">(x + 3)² = x² + 6x + 9</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ¡No olvides el término del medio (2ab)!
            </p>
          </div>

          {/* Error 2: Confusing with suma por diferencia */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-mono text-red-600">(2x - 3)² = 4x² - 9</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-mono text-green-600">(2x - 3)² = 4x² - 12x + 9</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Confundieron cuadrado de binomio con suma por diferencia
            </p>
          </div>

          {/* Error 3: Coefficient squaring */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-mono text-red-600">(2x)² = 2x²</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-mono text-green-600">(2x)² = 4x²</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ¡El coeficiente también se eleva al cuadrado!
            </p>
          </div>
        </div>
      </div>

      {/* Memory tip */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 border border-yellow-300 dark:border-yellow-700">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-8 h-8 text-yellow-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
              Truco para recordar
            </h4>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Cuadrado:</strong> &ldquo;Primero, doble, segundo&rdquo; → a² + 2ab + b²</li>
              <li><strong>Suma × Diferencia:</strong> &ldquo;Sin medio&rdquo; → a² - b²</li>
              <li><strong>Término común:</strong> &ldquo;Suma arriba, producto abajo&rdquo; → x² + (a+b)x + ab</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
