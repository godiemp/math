'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'lineal' | 'afin' | 'pendiente' | 'tips';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: 'lineal', label: 'F. Lineal', icon: <BookOpen size={18} /> },
  { id: 'afin', label: 'F. Afín', icon: <BookOpen size={18} /> },
  { id: 'pendiente', label: 'Pendiente', icon: <TrendingUp size={18} /> },
  { id: 'tips', label: 'Tips', icon: <Lightbulb size={18} /> },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('lineal');

  if (!isActive) return null;

  // SVG coordinate helpers for mini graphs
  const toSvgX = (x: number) => 30 + x * 25;
  const toSvgY = (y: number) => 80 - y * 12;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Función Lineal vs Afín
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora las diferencias y características de cada tipo
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all',
              activeTab === tab.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        {activeTab === 'lineal' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Función Lineal
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pasa siempre por el origen (0, 0)
              </p>
            </div>

            {/* Formula box */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
              <div className="text-center space-y-4">
                <p className="font-mono text-3xl text-blue-800 dark:text-blue-200">
                  y = mx
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-purple-600">m</strong> = pendiente
                  </span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-amber-600">b = 0</strong> (no hay)
                  </span>
                </div>
              </div>
            </div>

            {/* Characteristics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Característica clave
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  Cuando x = 0, entonces y = 0
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  En el gráfico
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  La recta pasa por el origen
                </p>
              </div>
            </div>

            {/* Mini graph */}
            <div className="flex justify-center">
              <svg viewBox="0 0 140 100" className="w-48">
                {/* Axes */}
                <line x1="30" y1="80" x2="130" y2="80" className="stroke-gray-400" strokeWidth="1" />
                <line x1="30" y1="80" x2="30" y2="10" className="stroke-gray-400" strokeWidth="1" />
                {/* Origin label */}
                <text x="25" y="90" className="fill-gray-500 text-xs">(0,0)</text>
                {/* Line through origin */}
                <line x1="30" y1="80" x2="110" y2="32" stroke="#3b82f6" strokeWidth="2" />
                {/* Label */}
                <text x="90" y="25" className="fill-blue-600 text-xs font-bold">y = 2x</text>
              </svg>
            </div>

            {/* Examples */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Ejemplos:</h4>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2">y = 3x</div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2">y = -2x</div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2">y = 0.5x</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'afin' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Función Afín
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Forma general con desplazamiento vertical
              </p>
            </div>

            {/* Formula box */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="text-center space-y-4">
                <p className="font-mono text-3xl text-purple-800 dark:text-purple-200">
                  y = mx + b
                </p>
                <div className="flex justify-center gap-4 text-sm flex-wrap">
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-purple-600">m</strong> = pendiente
                  </span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-amber-600">b</strong> = coef. de posición
                  </span>
                </div>
              </div>
            </div>

            {/* Key concepts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">
                  Pendiente (m)
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  Cuánto sube o baja la recta por cada unidad de x
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                  Coef. de Posición (b)
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  Donde la recta corta el eje Y (cuando x = 0)
                </p>
              </div>
            </div>

            {/* Mini graph */}
            <div className="flex justify-center">
              <svg viewBox="0 0 160 100" className="w-56">
                {/* Axes */}
                <line x1="30" y1="80" x2="130" y2="80" className="stroke-gray-400" strokeWidth="1" />
                <line x1="30" y1="80" x2="30" y2="10" className="stroke-gray-400" strokeWidth="1" />
                {/* Y-intercept point */}
                <circle cx="30" cy="56" r="4" fill="#f59e0b" />
                <text x="40" y="53" className="fill-amber-600 text-xs font-bold">(0, b)</text>
                {/* Line */}
                <line x1="10" y1="68" x2="120" y2="20" stroke="#8b5cf6" strokeWidth="2" />
                {/* Label */}
                <text x="95" y="15" className="fill-purple-600 text-xs font-bold">y = mx + b</text>
              </svg>
            </div>

            {/* Comparison */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-center text-gray-700 dark:text-gray-300">
                <strong>Nota:</strong> Toda función lineal es afín (con b = 0),
                <br />
                pero no toda función afín es lineal
              </p>
            </div>
          </div>
        )}

        {activeTab === 'pendiente' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                La Pendiente (m)
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Mide cuánto sube o baja la recta
              </p>
            </div>

            {/* Formula box */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="text-center space-y-4">
                <p className="font-mono text-2xl text-purple-800 dark:text-purple-200">
                  m = (y₂ - y₁) / (x₂ - x₁)
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  También se escribe como: m = Δy / Δx
                </p>
              </div>
            </div>

            {/* Slope cases */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-3 text-center border border-green-200 dark:border-green-700">
                <p className="font-bold text-green-600 dark:text-green-400">m &gt; 0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sube ↗</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-3 text-center border border-red-200 dark:border-red-700">
                <p className="font-bold text-red-600 dark:text-red-400">m &lt; 0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Baja ↘</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center border border-gray-200 dark:border-gray-600">
                <p className="font-bold text-gray-600 dark:text-gray-400">m = 0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Horizontal →</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 text-center border border-blue-200 dark:border-blue-700">
                <p className="font-bold text-blue-600 dark:text-blue-400">m = 1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">45°</p>
              </div>
            </div>

            {/* Worked example */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4">
                Ejemplo: Puntos (1, 3) y (4, 9)
              </h4>
              <div className="text-center space-y-3">
                <p className="font-mono text-lg">
                  m = (<span className="text-green-600">9</span> -{' '}
                  <span className="text-green-600">3</span>) / (
                  <span className="text-blue-600">4</span> -{' '}
                  <span className="text-blue-600">1</span>)
                </p>
                <p className="font-mono text-lg">m = 6 / 3</p>
                <p className="font-mono text-2xl font-bold text-green-600">m = 2</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Por cada unidad que x avanza, y sube 2
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Consejos y Errores Comunes
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Evita estos errores frecuentes
              </p>
            </div>

            {/* Error 1 */}
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Error: Confundir m con b
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-red-700 dark:text-red-300">
                      ❌ En y = 3x + 2, la pendiente es 2
                    </p>
                    <p className="text-green-700 dark:text-green-300">
                      ✓ En y = 3x + 2, la pendiente es <strong>3</strong> (el número que multiplica a x)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error 2 */}
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Error: Orden en la fórmula de pendiente
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-red-700 dark:text-red-300">
                      ❌ m = (x₂ - x₁) / (y₂ - y₁)
                    </p>
                    <p className="text-green-700 dark:text-green-300">
                      ✓ m = (y₂ - y₁) / (x₂ - x₁) — siempre <strong>y arriba, x abajo</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip 1 */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Tip: Identificar lineal vs afín
                  </p>
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <p>• y = 5x → <strong>Lineal</strong> (b = 0)</p>
                    <p>• y = 5x + 1 → <strong>Afín</strong> (b ≠ 0)</p>
                    <p>• y = x - 3 → <strong>Afín</strong> (b = -3)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Tip: Para graficar rápido
                  </p>
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <p>1. Marca el punto (0, b) en el eje Y</p>
                    <p>2. Desde ahí, avanza 1 en x y m en y</p>
                    <p>3. Une los puntos con una recta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
