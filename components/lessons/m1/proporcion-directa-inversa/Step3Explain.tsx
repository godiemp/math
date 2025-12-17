'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<'direct' | 'inverse' | 'compare'>('direct');

  // Auto-complete on mount (explain steps don't require interaction)
  useEffect(() => {
    if (isActive) {
      onComplete();
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Proporciones: Directa e Inversa
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Material de referencia sobre proporcionalidad
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setActiveTab('direct')}
          className={cn(
            'px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2',
            activeTab === 'direct'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          )}
        >
          <TrendingUp size={18} />
          Directa
        </button>
        <button
          onClick={() => setActiveTab('inverse')}
          className={cn(
            'px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2',
            activeTab === 'inverse'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          )}
        >
          <TrendingDown size={18} />
          Inversa
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={cn(
            'px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2',
            activeTab === 'compare'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          )}
        >
          <BookOpen size={18} />
          Comparar
        </button>
      </div>

      {/* Direct proportion tab */}
      {activeTab === 'direct' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                PROPORCIÓN DIRECTA
              </h3>
            </div>

            {/* Definition */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                Dos magnitudes son <strong>directamente proporcionales</strong> cuando al multiplicar o dividir
                una de ellas por un número, la otra queda multiplicada o dividida por el mismo número.
              </p>
            </div>

            {/* Formula */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Fórmulas:</p>
              <div className="space-y-2 text-center font-mono text-lg">
                <p className="bg-green-50 dark:bg-green-900/30 rounded px-3 py-2">
                  y = k · x
                </p>
                <p className="text-sm text-gray-500">o equivalentemente:</p>
                <p className="bg-green-50 dark:bg-green-900/30 rounded px-3 py-2">
                  y/x = k (constante)
                </p>
              </div>
            </div>

            {/* Example */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Ejemplo:</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Si 3 kg de frutas cuestan $12, ¿cuánto cuestan 5 kg?
              </p>
              <div className="bg-green-50 dark:bg-green-900/30 rounded p-3 font-mono text-sm">
                <p>k = 12 ÷ 3 = 4 ($/kg)</p>
                <p>Precio = 4 × 5 = <strong>$20</strong></p>
              </div>
            </div>

            {/* Graphical representation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Gráfico:</p>
              <div className="flex justify-center">
                <svg viewBox="0 0 200 150" className="w-full max-w-xs">
                  {/* Axes */}
                  <line x1="30" y1="120" x2="180" y2="120" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                  <line x1="30" y1="120" x2="30" y2="20" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                  {/* Line */}
                  <line x1="30" y1="120" x2="170" y2="30" stroke="#22c55e" strokeWidth="3" />
                  {/* Labels */}
                  <text x="180" y="135" fontSize="12" className="fill-gray-600 dark:fill-gray-400">x</text>
                  <text x="15" y="20" fontSize="12" className="fill-gray-600 dark:fill-gray-400">y</text>
                  <text x="90" y="60" fontSize="10" fill="#22c55e">Línea recta</text>
                  <text x="90" y="75" fontSize="10" fill="#22c55e">por el origen</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inverse proportion tab */}
      {activeTab === 'inverse' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 rounded-2xl p-6 border-2 border-orange-300 dark:border-orange-700">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">
                PROPORCIÓN INVERSA
              </h3>
            </div>

            {/* Definition */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                Dos magnitudes son <strong>inversamente proporcionales</strong> cuando al multiplicar
                una de ellas por un número, la otra queda dividida por el mismo número, y viceversa.
              </p>
            </div>

            {/* Formula */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Fórmulas:</p>
              <div className="space-y-2 text-center font-mono text-lg">
                <p className="bg-orange-50 dark:bg-orange-900/30 rounded px-3 py-2">
                  y = k / x
                </p>
                <p className="text-sm text-gray-500">o equivalentemente:</p>
                <p className="bg-orange-50 dark:bg-orange-900/30 rounded px-3 py-2">
                  x · y = k (constante)
                </p>
              </div>
            </div>

            {/* Example */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Ejemplo:</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Si 4 obreros hacen un trabajo en 6 días, ¿cuántos días necesitan 3 obreros?
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/30 rounded p-3 font-mono text-sm">
                <p>k = 4 × 6 = 24 (días-obrero)</p>
                <p>Días = 24 ÷ 3 = <strong>8 días</strong></p>
              </div>
            </div>

            {/* Graphical representation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Gráfico:</p>
              <div className="flex justify-center">
                <svg viewBox="0 0 200 150" className="w-full max-w-xs">
                  {/* Axes */}
                  <line x1="30" y1="120" x2="180" y2="120" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                  <line x1="30" y1="120" x2="30" y2="20" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                  {/* Hyperbola curve */}
                  <path d="M 40 30 Q 60 50, 80 70 Q 100 85, 130 100 Q 150 108, 175 115" fill="none" stroke="#f97316" strokeWidth="3" />
                  {/* Labels */}
                  <text x="180" y="135" fontSize="12" className="fill-gray-600 dark:fill-gray-400">x</text>
                  <text x="15" y="20" fontSize="12" className="fill-gray-600 dark:fill-gray-400">y</text>
                  <text x="100" y="50" fontSize="10" fill="#f97316">Hipérbola</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison tab */}
      {activeTab === 'compare' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700">
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">
              COMPARACIÓN
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-purple-200 dark:border-purple-700">
                    <th className="text-left py-3 px-2 text-purple-600 dark:text-purple-400">Aspecto</th>
                    <th className="text-center py-3 px-2 text-green-600 dark:text-green-400">Directa</th>
                    <th className="text-center py-3 px-2 text-orange-600 dark:text-orange-400">Inversa</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-purple-100 dark:border-purple-800">
                    <td className="py-3 px-2 font-medium">Relación</td>
                    <td className="py-3 px-2 text-center">x ↑ entonces y ↑</td>
                    <td className="py-3 px-2 text-center">x ↑ entonces y ↓</td>
                  </tr>
                  <tr className="border-b border-purple-100 dark:border-purple-800">
                    <td className="py-3 px-2 font-medium">Fórmula</td>
                    <td className="py-3 px-2 text-center font-mono">y = k·x</td>
                    <td className="py-3 px-2 text-center font-mono">y = k/x</td>
                  </tr>
                  <tr className="border-b border-purple-100 dark:border-purple-800">
                    <td className="py-3 px-2 font-medium">Constante</td>
                    <td className="py-3 px-2 text-center font-mono">k = y/x</td>
                    <td className="py-3 px-2 text-center font-mono">k = x·y</td>
                  </tr>
                  <tr className="border-b border-purple-100 dark:border-purple-800">
                    <td className="py-3 px-2 font-medium">Gráfico</td>
                    <td className="py-3 px-2 text-center">Línea recta</td>
                    <td className="py-3 px-2 text-center">Hipérbola</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium">Ejemplo</td>
                    <td className="py-3 px-2 text-center text-xs">Precio vs cantidad</td>
                    <td className="py-3 px-2 text-center text-xs">Velocidad vs tiempo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to identify */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-4">
              ¿Cómo identificar el tipo?
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Directa:</strong> Si compras más, ¿pagas más? Si trabajas más horas, ¿ganas más?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Inversa:</strong> Si vas más rápido, ¿tardas menos? Si hay más personas, ¿cada una recibe menos?
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 border border-yellow-300 dark:border-yellow-700">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-8 h-8 text-yellow-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
              Tips importantes
            </h4>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>• <strong>Regla de tres directa:</strong> usa multiplicación cruzada cuando las magnitudes son directamente proporcionales</li>
              <li>• <strong>Regla de tres inversa:</strong> multiplica los valores del mismo lado cuando son inversamente proporcionales</li>
              <li>• La <strong>constante k</strong> siempre debe ser positiva en proporciones</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common errors */}
      <div className="bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 rounded-xl p-6 border border-red-300 dark:border-red-700">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">
              Errores comunes
            </h4>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>• <strong>Confundir el tipo:</strong> Pensar que "más trabajadores = más días" (es inversa, no directa)</li>
              <li>• <strong>Usar la fórmula incorrecta:</strong> Dividir cuando debes multiplicar o viceversa</li>
              <li>• <strong>No verificar:</strong> El resultado debe tener sentido en el contexto del problema</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
