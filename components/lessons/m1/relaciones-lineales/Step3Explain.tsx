'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, Target, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'general' | 'interceptoY' | 'interceptoX' | 'tips';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: 'general', label: 'Forma General', icon: <BookOpen size={18} /> },
  { id: 'interceptoY', label: 'Intercepto Y', icon: <Target size={18} /> },
  { id: 'interceptoX', label: 'Intercepto X', icon: <Target size={18} /> },
  { id: 'tips', label: 'Tips', icon: <Lightbulb size={18} /> },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('general');

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Relaciones Lineales: ax + by = c
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aprende la forma general y como encontrar los interceptos
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
                ? 'bg-amber-500 text-white shadow-lg'
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
        {activeTab === 'general' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Forma General
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                La forma estandar de una relacion lineal en dos variables
              </p>
            </div>

            {/* Formula box */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
              <div className="text-center space-y-4">
                <p className="font-mono text-3xl text-amber-800 dark:text-amber-200">
                  ax + by = c
                </p>
                <div className="flex justify-center gap-4 text-sm flex-wrap">
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-amber-600">a</strong> = coef. de x
                  </span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-purple-600">b</strong> = coef. de y
                  </span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-green-600">c</strong> = constante
                  </span>
                </div>
              </div>
            </div>

            {/* Key concepts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                  Solucion
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  Cualquier par (x, y) que satisfaga la ecuacion es un punto en la recta
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                  Grafico
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  Todos los puntos solucion forman una linea recta en el plano
                </p>
              </div>
            </div>

            {/* Mini graph */}
            <div className="flex justify-center">
              <svg viewBox="0 0 160 100" className="w-56">
                {/* Axes */}
                <line x1="20" y1="80" x2="140" y2="80" className="stroke-gray-400" strokeWidth="1" />
                <line x1="20" y1="80" x2="20" y2="10" className="stroke-gray-400" strokeWidth="1" />
                {/* Line */}
                <line x1="20" y1="25" x2="120" y2="75" stroke="#f59e0b" strokeWidth="2" />
                {/* Points */}
                <circle cx="20" cy="25" r="4" fill="#8b5cf6" />
                <circle cx="70" cy="50" r="4" fill="#22c55e" />
                <circle cx="120" cy="75" r="4" fill="#f59e0b" />
                {/* Labels */}
                <text x="130" y="85" className="fill-amber-600 text-xs">x</text>
                <text x="15" y="8" className="fill-purple-600 text-xs">y</text>
                <text x="80" y="95" className="fill-gray-500 text-xs">ax + by = c</text>
              </svg>
            </div>

            {/* Examples */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Ejemplos:</h4>
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-sm">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2">2x + 3y = 12</div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2">x + y = 5</div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2">4x - 2y = 8</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interceptoY' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Intercepto Y
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Donde la recta cruza el eje Y (cuando x = 0)
              </p>
            </div>

            {/* Formula box */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="text-center space-y-4">
                <p className="font-mono text-2xl text-purple-800 dark:text-purple-200">
                  Para encontrar: sustituye x = 0
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  El resultado es el punto (0, y)
                </p>
              </div>
            </div>

            {/* Worked example */}
            <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Ejemplo: 2x + 3y = 12
              </h4>
              <div className="space-y-3 text-center font-mono">
                <p className="text-gray-700 dark:text-gray-300">
                  2(<span className="text-amber-600 font-bold">0</span>) + 3y = 12
                </p>
                <p className="text-gray-700 dark:text-gray-300">0 + 3y = 12</p>
                <p className="text-gray-700 dark:text-gray-300">3y = 12</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  y = 4
                </p>
                <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-3 mt-4">
                  <p className="text-purple-800 dark:text-purple-200">
                    Intercepto Y: <strong>(0, 4)</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Mini graph */}
            <div className="flex justify-center">
              <svg viewBox="0 0 140 100" className="w-48">
                {/* Axes */}
                <line x1="40" y1="80" x2="130" y2="80" className="stroke-gray-400" strokeWidth="1" />
                <line x1="40" y1="80" x2="40" y2="10" className="stroke-gray-400" strokeWidth="1" />
                {/* Line */}
                <line x1="40" y1="25" x2="120" y2="70" stroke="#f59e0b" strokeWidth="2" />
                {/* Y-intercept highlight */}
                <circle cx="40" cy="25" r="6" fill="#8b5cf6" />
                <text x="50" y="22" className="fill-purple-600 text-xs font-bold">(0, y)</text>
              </svg>
            </div>

            {/* Method summary */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Metodo rapido:
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Intercepto Y = <span className="font-mono font-bold">c ÷ b</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                (Solo cuando b ≠ 0)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'interceptoX' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Intercepto X
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Donde la recta cruza el eje X (cuando y = 0)
              </p>
            </div>

            {/* Formula box */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
              <div className="text-center space-y-4">
                <p className="font-mono text-2xl text-amber-800 dark:text-amber-200">
                  Para encontrar: sustituye y = 0
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  El resultado es el punto (x, 0)
                </p>
              </div>
            </div>

            {/* Worked example */}
            <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Ejemplo: 2x + 3y = 12
              </h4>
              <div className="space-y-3 text-center font-mono">
                <p className="text-gray-700 dark:text-gray-300">
                  2x + 3(<span className="text-purple-600 font-bold">0</span>) = 12
                </p>
                <p className="text-gray-700 dark:text-gray-300">2x + 0 = 12</p>
                <p className="text-gray-700 dark:text-gray-300">2x = 12</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  x = 6
                </p>
                <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3 mt-4">
                  <p className="text-amber-800 dark:text-amber-200">
                    Intercepto X: <strong>(6, 0)</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Mini graph */}
            <div className="flex justify-center">
              <svg viewBox="0 0 140 100" className="w-48">
                {/* Axes */}
                <line x1="20" y1="60" x2="130" y2="60" className="stroke-gray-400" strokeWidth="1" />
                <line x1="20" y1="80" x2="20" y2="10" className="stroke-gray-400" strokeWidth="1" />
                {/* Line */}
                <line x1="20" y1="25" x2="110" y2="60" stroke="#f59e0b" strokeWidth="2" />
                {/* X-intercept highlight */}
                <circle cx="110" cy="60" r="6" fill="#f59e0b" />
                <text x="100" y="75" className="fill-amber-600 text-xs font-bold">(x, 0)</text>
              </svg>
            </div>

            {/* Method summary */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Metodo rapido:
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Intercepto X = <span className="font-mono font-bold">c ÷ a</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                (Solo cuando a ≠ 0)
              </p>
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
                    Error: Confundir los interceptos
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-red-700 dark:text-red-300">
                      ❌ Para el intercepto Y, hacer y = 0
                    </p>
                    <p className="text-green-700 dark:text-green-300">
                      ✓ Para el intercepto Y, hacer <strong>x = 0</strong> (porque es donde cruza el eje Y)
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
                    Error: Olvidar verificar
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-red-700 dark:text-red-300">
                      ❌ Asumir que el calculo esta bien sin verificar
                    </p>
                    <p className="text-green-700 dark:text-green-300">
                      ✓ <strong>Siempre sustituye</strong> el punto en la ecuacion original para verificar
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
                    Tip: Graficar con 2 puntos
                  </p>
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <p>1. Encuentra el intercepto Y (x = 0)</p>
                    <p>2. Encuentra el intercepto X (y = 0)</p>
                    <p>3. Une los dos puntos con una linea recta</p>
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
                    Tip: Convertir a forma pendiente-intercepto
                  </p>
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <p>De ax + by = c puedes despejar y:</p>
                    <p className="font-mono">y = (-a/b)x + (c/b)</p>
                    <p>Asi obtienes la forma y = mx + n</p>
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
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
