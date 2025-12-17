'use client';

import { useEffect, useState } from 'react';
import { Check, X, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
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
          Factorización de Trinomios Cuadráticos Perfectos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Material de referencia - haz clic en cada tarjeta para más detalles
        </p>
      </div>

      {/* Card 1: Definition & Formula */}
      <div
        className={cn(
          'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-2xl p-6 border-2 border-blue-300 dark:border-blue-700 cursor-pointer transition-all',
          expandedCard === 0 && 'ring-4 ring-blue-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
            DEFINICIÓN Y FÓRMULAS
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <div className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Un trinomio cuadrático perfecto es el resultado de elevar un binomio al cuadrado
            </p>
            <div className="space-y-3">
              <p className="font-mono text-lg">
                <span className="text-blue-600">a²</span> + <span className="text-green-600">2ab</span> + <span className="text-purple-600">b²</span> = (<span className="text-blue-600">a</span> + <span className="text-purple-600">b</span>)²
              </p>
              <p className="font-mono text-lg">
                <span className="text-blue-600">a²</span> - <span className="text-green-600">2ab</span> + <span className="text-purple-600">b²</span> = (<span className="text-blue-600">a</span> - <span className="text-purple-600">b</span>)²
              </p>
            </div>
          </div>
        </div>

        {expandedCard === 0 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
              Características de un trinomio cuadrático perfecto:
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">1.</span>
                  <span>El primer término es un <strong>cuadrado perfecto</strong> (a²)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">2.</span>
                  <span>El tercer término es un <strong>cuadrado perfecto</strong> (b²)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">3.</span>
                  <span>El término medio es el <strong>doble producto</strong> de las bases (±2ab)</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <Lightbulb className="inline w-4 h-4 mr-1" />
                <strong>Clave:</strong> Si el término medio NO es exactamente ±2ab, entonces NO es un trinomio cuadrático perfecto.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card 2: Case with + sign */}
      <div
        className={cn(
          'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700 cursor-pointer transition-all',
          expandedCard === 1 && 'ring-4 ring-green-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">+</div>
          <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
            CASO CON TÉRMINO MEDIO POSITIVO
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <div className="text-center">
            <p className="font-mono text-xl">
              <span className="text-blue-600">a²</span> + <span className="text-green-600 font-bold">2ab</span> + <span className="text-purple-600">b²</span> = (<span className="text-blue-600">a</span> + <span className="text-purple-600">b</span>)²
            </p>
          </div>
        </div>

        {expandedCard === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
              Cuando el término medio es <strong>positivo</strong>, el binomio tiene signo <strong>+</strong>
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Ejemplos:</p>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="font-mono text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">x² + 8x + 16</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    a = x, b = 4 → 2(x)(4) = 8x ✓
                  </p>
                  <p className="font-mono text-green-600 font-bold">= (x + 4)²</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="font-mono text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">9x² + 24xy + 16y²</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    a = 3x, b = 4y → 2(3x)(4y) = 24xy ✓
                  </p>
                  <p className="font-mono text-green-600 font-bold">= (3x + 4y)²</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <Lightbulb className="inline w-4 h-4 mr-1" />
                <strong>Recuerda:</strong> El signo + en el trinomio da signo + en el binomio.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card 3: Case with - sign */}
      <div
        className={cn(
          'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700 cursor-pointer transition-all',
          expandedCard === 2 && 'ring-4 ring-purple-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">-</div>
          <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
            CASO CON TÉRMINO MEDIO NEGATIVO
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <div className="text-center">
            <p className="font-mono text-xl">
              <span className="text-blue-600">a²</span> - <span className="text-purple-600 font-bold">2ab</span> + <span className="text-purple-600">b²</span> = (<span className="text-blue-600">a</span> - <span className="text-purple-600">b</span>)²
            </p>
          </div>
        </div>

        {expandedCard === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
              Cuando el término medio es <strong>negativo</strong>, el binomio tiene signo <strong>-</strong>
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Ejemplos:</p>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="font-mono text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">x² - 14x + 49</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    a = x, b = 7 → 2(x)(7) = 14x ✓
                  </p>
                  <p className="font-mono text-purple-600 font-bold">= (x - 7)²</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="font-mono text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">4x² - 20x + 25</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    a = 2x, b = 5 → 2(2x)(5) = 20x ✓
                  </p>
                  <p className="font-mono text-purple-600 font-bold">= (2x - 5)²</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                <Lightbulb className="inline w-4 h-4 mr-1" />
                <strong>Importante:</strong> El tercer término siempre es positivo (es un cuadrado).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card 4: Common Errors */}
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
          {/* Error 1: Not a perfect square trinomial */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-2 font-medium">Error: Confundir con trinomio no perfecto</p>
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-mono text-red-600">x² + 5x + 4 = (x + 2)²</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              NO es TCP porque 2·x·2 = 4x ≠ 5x
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-mono text-green-600">x² + 5x + 4 = (x + 1)(x + 4)</span>
            </div>
          </div>

          {/* Error 2: Wrong sign */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-2 font-medium">Error: Signo incorrecto en el binomio</p>
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-mono text-red-600">x² - 6x + 9 = (x + 3)²</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-mono text-green-600">x² - 6x + 9 = (x - 3)²</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              El signo del término medio determina el signo del binomio
            </p>
          </div>

          {/* Error 3: Forgetting to take square root of coefficient */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-2 font-medium">Error: No sacar raíz al coeficiente</p>
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-mono text-red-600">4x² + 12x + 9 = (4x + 3)²</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-mono text-green-600">4x² + 12x + 9 = (2x + 3)²</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              √4x² = 2x, no 4x
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
              Truco para verificar
            </h4>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Paso rápido:</strong> Si tienes <span className="font-mono">a² ± 2ab + b²</span>:
              </li>
              <li className="ml-4">
                1. Saca raíz al primer término → obtienes <span className="font-mono text-blue-600">a</span>
              </li>
              <li className="ml-4">
                2. Saca raíz al tercer término → obtienes <span className="font-mono text-purple-600">b</span>
              </li>
              <li className="ml-4">
                3. Verifica: ¿es el término medio igual a <span className="font-mono text-green-600">2·a·b</span>?
              </li>
              <li className="ml-4">
                4. Si sí: escribe <span className="font-mono">(a ± b)²</span> con el signo del medio
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
