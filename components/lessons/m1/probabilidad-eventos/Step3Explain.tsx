'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'formula' | 'terminology' | 'properties' | 'examples';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('formula');

  if (!isActive) return null;

  // ============ FORMULA ============
  if (phase === 'formula') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Fórmula de Probabilidad
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            La herramienta fundamental
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <span className="text-lg font-semibold text-purple-800 dark:text-purple-200">
              Fórmula clásica de probabilidad
            </span>
          </div>

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                P(A) = <span className="text-blue-600 dark:text-blue-400">n(A)</span> / <span className="text-purple-600 dark:text-purple-400">n(S)</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-6 text-left">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-bold text-gray-900 dark:text-white">P(A)</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Probabilidad del evento A
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                  <div className="font-bold text-blue-600 dark:text-blue-400">n(A)</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Número de casos favorables
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
                  <div className="font-bold text-purple-600 dark:text-purple-400">n(S)</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Número de casos posibles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Importante:</strong> Esta fórmula solo funciona cuando todos los resultados
              son <strong>igualmente probables</strong> (equiprobables), como en un dado justo o una moneda justa.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('terminology')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver terminología</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ TERMINOLOGY ============
  if (phase === 'terminology') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Vocabulario de Probabilidad
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Términos que necesitas conocer
          </p>
        </div>

        <div className="space-y-4">
          {/* Experimento aleatorio */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎲</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  Experimento Aleatorio
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Proceso cuyo resultado no se puede predecir con certeza.
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                  Ejemplos: lanzar un dado, lanzar una moneda, sacar una carta
                </p>
              </div>
            </div>
          </div>

          {/* Espacio muestral */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">S</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  Espacio Muestral (S)
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Conjunto de <strong>todos</strong> los resultados posibles.
                </p>
                <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Dado: S = &#123;1, 2, 3, 4, 5, 6&#125;
                    <br />
                    Moneda: S = &#123;Cara, Sello&#125;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Evento */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">A</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  Evento (A)
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Subconjunto del espacio muestral. Lo que &ldquo;queremos que pase&rdquo;.
                </p>
                <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    A = &ldquo;Sacar número par&rdquo; = &#123;2, 4, 6&#125;
                    <br />
                    B = &ldquo;Sacar mayor que 4&rdquo; = &#123;5, 6&#125;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('properties')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver propiedades</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PROPERTIES ============
  if (phase === 'properties') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Propiedades de la Probabilidad
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Reglas que siempre se cumplen
          </p>
        </div>

        <div className="space-y-4">
          {/* Property 1 */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  La probabilidad está entre 0 y 1
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  0 ≤ P(A) ≤ 1
                </p>
              </div>
            </div>
          </div>

          {/* Property 2 */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">2</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Evento imposible tiene probabilidad 0
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
                  P(∅) = 0
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Ejemplo: Sacar un 7 en un dado normal
                </p>
              </div>
            </div>
          </div>

          {/* Property 3 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">3</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Evento seguro tiene probabilidad 1
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                  P(S) = 1
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Ejemplo: Sacar un número entre 1 y 6 en un dado
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual scale */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-3">
            Escala de probabilidad:
          </p>
          <div className="relative h-8 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full">
            <div className="absolute left-0 -bottom-6 text-xs font-bold text-red-600">0 (Imposible)</div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-xs font-bold text-yellow-600">0.5 (50%)</div>
            <div className="absolute right-0 -bottom-6 text-xs font-bold text-green-600">1 (Seguro)</div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => setPhase('examples')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver ejemplos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ EXAMPLES ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Ejemplos Resueltos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplicando la fórmula paso a paso
        </p>
      </div>

      <div className="space-y-4">
        {/* Example 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎲</span>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 1: Dado
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            ¿Cuál es la probabilidad de sacar un número menor que 4?
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Paso 1:</strong> Espacio muestral: S = &#123;1, 2, 3, 4, 5, 6&#125; → n(S) = 6
            </p>
            <p className="text-sm">
              <strong>Paso 2:</strong> Casos favorables: A = &#123;1, 2, 3&#125; → n(A) = 3
            </p>
            <p className="text-sm">
              <strong>Paso 3:</strong> P(A) = 3/6 = <strong className="text-green-600 dark:text-green-400">1/2 = 0.5 = 50%</strong>
            </p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🪙</span>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 2: Moneda
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            ¿Cuál es la probabilidad de obtener cara?
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Paso 1:</strong> Espacio muestral: S = &#123;Cara, Sello&#125; → n(S) = 2
            </p>
            <p className="text-sm">
              <strong>Paso 2:</strong> Casos favorables: A = &#123;Cara&#125; → n(A) = 1
            </p>
            <p className="text-sm">
              <strong>Paso 3:</strong> P(A) = 1/2 = <strong className="text-green-600 dark:text-green-400">0.5 = 50%</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-semibold">
              Formas de expresar la probabilidad:
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
              • Como fracción: 1/2
              <br />
              • Como decimal: 0.5
              <br />
              • Como porcentaje: 50%
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>¡Hora de practicar!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
