'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'ax-b' | 'x-div-a' | 'ax-b-c' | 'tips';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: 'ax-b', label: 'ax < b', icon: <BookOpen size={18} /> },
  { id: 'x-div-a', label: 'x/a < b', icon: <BookOpen size={18} /> },
  { id: 'ax-b-c', label: 'ax + b < c', icon: <BookOpen size={18} /> },
  { id: 'tips', label: 'Consejos', icon: <Lightbulb size={18} /> },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('ax-b');

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tipos de Inecuaciones</h2>
        <p className="text-gray-600 dark:text-gray-300">Explora los diferentes casos y sus métodos de solución</p>
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
        {activeTab === 'ax-b' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Inecuaciones de la forma <span className="font-mono text-purple-600">ax {'<'} b</span> o{' '}
                <span className="font-mono text-purple-600">ax {'>'} b</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400">La variable tiene un coeficiente multiplicando</p>
            </div>

            {/* Formula box */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">Si a {'>'} 0 (positivo)</p>
                    <p className="font-mono text-lg text-purple-800 dark:text-purple-200">
                      ax {'<'} b → x {'<'} b/a
                    </p>
                    <p className="text-xs text-green-600 mt-2">Signo NO cambia</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-red-300 dark:border-red-700">
                    <p className="text-sm text-gray-500 mb-2">Si a {'<'} 0 (negativo)</p>
                    <p className="font-mono text-lg text-purple-800 dark:text-purple-200">
                      ax {'<'} b → x {'>'} b/a
                    </p>
                    <p className="text-xs text-red-600 mt-2 font-bold">¡Signo CAMBIA!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Method */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Método de solución:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paso 1: Divide entre a</p>
                  <p className="font-mono text-center text-lg">x {'<'} b  a</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Paso 2: Si a es negativo
                  </p>
                  <p className="font-mono text-center text-lg text-red-600">¡Invierte el signo!</p>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Ejemplo (a positivo):</h4>
                <div className="text-center space-y-2">
                  <p className="font-mono text-lg">4x {'<'} 20</p>
                  <p className="text-gray-400">↓</p>
                  <p className="font-mono">x {'<'} 20 / 4</p>
                  <p className="font-mono text-lg text-green-600 font-bold">x {'<'} 5</p>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">Ejemplo (a negativo):</h4>
                <div className="text-center space-y-2">
                  <p className="font-mono text-lg">-4x {'<'} 20</p>
                  <p className="text-gray-400">↓ signo cambia</p>
                  <p className="font-mono">x {'>'} 20 / (-4)</p>
                  <p className="font-mono text-lg text-red-600 font-bold">x {'>'} -5</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'x-div-a' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Inecuaciones de la forma <span className="font-mono text-purple-600">x/a {'<'} b</span> o{' '}
                <span className="font-mono text-purple-600">x/a {'>'} b</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400">La variable está siendo dividida</p>
            </div>

            {/* Formula box */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">Si a {'>'} 0 (positivo)</p>
                    <p className="font-mono text-lg text-purple-800 dark:text-purple-200">
                      x/a {'<'} b → x {'<'} ab
                    </p>
                    <p className="text-xs text-green-600 mt-2">Signo NO cambia</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-red-300 dark:border-red-700">
                    <p className="text-sm text-gray-500 mb-2">Si a {'<'} 0 (negativo)</p>
                    <p className="font-mono text-lg text-purple-800 dark:text-purple-200">
                      x/a {'<'} b → x {'>'} ab
                    </p>
                    <p className="text-xs text-red-600 mt-2 font-bold">¡Signo CAMBIA!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Ejemplo (a positivo):</h4>
                <div className="text-center space-y-2">
                  <p className="font-mono text-lg">x/3 {'>'} 4</p>
                  <p className="text-gray-400">↓ multiplicamos por 3</p>
                  <p className="font-mono">x {'>'} 3  4</p>
                  <p className="font-mono text-lg text-green-600 font-bold">x {'>'} 12</p>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">Ejemplo (a negativo):</h4>
                <div className="text-center space-y-2">
                  <p className="font-mono text-lg">x/(-3) {'>'} 4</p>
                  <p className="text-gray-400">↓ signo cambia</p>
                  <p className="font-mono">x {'<'} (-3)  4</p>
                  <p className="font-mono text-lg text-red-600 font-bold">x {'<'} -12</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ax-b-c' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Inecuaciones combinadas <span className="font-mono text-purple-600">ax + b {'<'} c</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Hay suma/resta Y multiplicación/división</p>
            </div>

            {/* Formula box */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="text-center space-y-4">
                <p className="font-mono text-2xl text-purple-800 dark:text-purple-200">ax + b {'<'} c</p>
                <div className="space-y-2 text-sm">
                  <p className="font-mono">
                    1. ax {'<'} c - b <span className="text-gray-500">(resta b)</span>
                  </p>
                  <p className="font-mono">
                    2. x {'<'} (c-b)/a <span className="text-gray-500">(divide entre a)</span>
                  </p>
                  <p className="text-red-600 font-bold">Si a {'<'} 0, ¡invierte el signo!</p>
                </div>
              </div>
            </div>

            {/* Method */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Método de solución:</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Paso 1: Aísla el término con x
                  </p>
                  <p className="font-mono text-center text-lg">ax {'<'} c - b</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paso 2: Divide entre a</p>
                  <p className="font-mono text-center text-lg">x {'<'} (c - b) / a</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                  <p className="text-sm font-medium text-red-500 dark:text-red-400 mb-2">Paso 3: Verifica el signo de a</p>
                  <p className="font-mono text-center text-lg text-red-600">Si a {'<'} 0, ¡INVIERTE el signo!</p>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Ejemplo (a positivo):</h4>
                <div className="text-center space-y-2">
                  <p className="font-mono text-lg">3x + 7 {'<='} 19</p>
                  <p className="text-gray-400">↓</p>
                  <p className="font-mono">3x {'<='} 19 - 7 = 12</p>
                  <p className="text-gray-400">↓</p>
                  <p className="font-mono text-lg text-green-600 font-bold">x {'<='} 4</p>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">Ejemplo (a negativo):</h4>
                <div className="text-center space-y-2">
                  <p className="font-mono text-lg">-3x + 7 {'<='} 19</p>
                  <p className="text-gray-400">↓</p>
                  <p className="font-mono">-3x {'<='} 12</p>
                  <p className="text-gray-400">↓ signo cambia</p>
                  <p className="font-mono text-lg text-red-600 font-bold">x {'>='} -4</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Consejos y Errores Comunes</h3>
              <p className="text-gray-600 dark:text-gray-400">Evita estos errores frecuentes</p>
            </div>

            {/* Tips */}
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                      Verifica sustituyendo un valor
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Toma un valor de tu solución y sustitúyelo en la inecuación original. ¡Debe cumplirse!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Círculos en la recta</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Abierto (○)</strong> para {'<'} y {'>'} (NO incluye el valor)
                      <br />
                      <strong>Cerrado (●)</strong> para {'<='} y {'>='} (SÍ incluye el valor)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Truco para recordar</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Imagina que el número negativo voltea todo, incluyendo el signo de desigualdad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Common errors */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Errores comunes:
              </h4>

              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-red-600 font-bold text-lg">X</span>
                    <div>
                      <p className="font-mono text-sm line-through text-gray-500">-2x {'<'} 4 → x {'<'} -2</p>
                      <p className="text-xs text-red-600">Error: Olvidó invertir el signo al dividir por negativo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 font-bold text-lg">O</span>
                    <p className="font-mono text-sm text-green-700">-2x {'<'} 4 → x {'>'} -2</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-red-600 font-bold text-lg">X</span>
                    <div>
                      <p className="font-mono text-sm line-through text-gray-500">
                        x {'<='} 5 con círculo abierto en la recta
                      </p>
                      <p className="text-xs text-red-600">Error: {'<='} incluye el 5, debe ser círculo cerrado</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 font-bold text-lg">O</span>
                    <p className="font-mono text-sm text-green-700">x {'<='} 5 con círculo cerrado (●)</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-red-600 font-bold text-lg">X</span>
                    <div>
                      <p className="font-mono text-sm line-through text-gray-500">x {'<'} 5 tiene solución x = 5</p>
                      <p className="text-xs text-red-600">Error: {'<'} NO incluye el 5, ¡tiene infinitas soluciones!</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 font-bold text-lg">O</span>
                    <p className="font-mono text-sm text-green-700">x {'<'} 5 tiene soluciones: 4, 3, 2, 1, 0, -1...</p>
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
          <span>Practicar resolución</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
