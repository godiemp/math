'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, Minus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'when' | 'multiply' | 'examples';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'when', label: '¿Sumar o Restar?' },
  { id: 'multiply', label: 'Multiplicar Primero' },
  { id: 'examples', label: 'Ejemplos' },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('when');

  if (!isActive) return null;

  const currentIndex = TABS.findIndex(t => t.id === activeTab);
  const isLastTab = currentIndex === TABS.length - 1;

  const handleNext = () => {
    if (isLastTab) {
      onComplete();
    } else {
      setActiveTab(TABS[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Método de Reducción
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Suma o resta ecuaciones para eliminar una variable
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg min-h-[400px]">
        {activeTab === 'when' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              ¿Cuándo Sumar y Cuándo Restar?
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* SUMA */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border-2 border-green-300 dark:border-green-700">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Plus className="text-green-600" size={28} />
                  <h4 className="font-bold text-xl text-green-700 dark:text-green-300">SUMA</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
                  Cuando los coeficientes son <strong>opuestos</strong>
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 font-mono text-sm">
                  <p className="text-blue-600">x + <span className="bg-yellow-200 dark:bg-yellow-900 px-1">2y</span> = 10</p>
                  <p className="text-emerald-600">x - <span className="bg-yellow-200 dark:bg-yellow-900 px-1">2y</span> = 4</p>
                  <div className="border-t border-gray-300 dark:border-gray-600 mt-2 pt-2">
                    <p className="text-purple-600 font-bold">2x = 14</p>
                  </div>
                </div>
                <p className="text-sm text-center text-gray-500 mt-2">+2y y -2y se cancelan</p>
              </div>

              {/* RESTA */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border-2 border-red-300 dark:border-red-700">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Minus className="text-red-600" size={28} />
                  <h4 className="font-bold text-xl text-red-700 dark:text-red-300">RESTA</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
                  Cuando los coeficientes son <strong>iguales</strong>
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 font-mono text-sm">
                  <p className="text-blue-600"><span className="bg-yellow-200 dark:bg-yellow-900 px-1">3x</span> + y = 11</p>
                  <p className="text-emerald-600"><span className="bg-yellow-200 dark:bg-yellow-900 px-1">3x</span> - 2y = 5</p>
                  <div className="border-t border-gray-300 dark:border-gray-600 mt-2 pt-2">
                    <p className="text-purple-600 font-bold">3y = 6</p>
                  </div>
                </div>
                <p className="text-sm text-center text-gray-500 mt-2">3x - 3x = 0</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'multiply' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              ¿Y si los coeficientes no coinciden?
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-center">
              A veces necesitamos <strong>multiplicar</strong> una o ambas ecuaciones para que los coeficientes sean iguales u opuestos.
            </p>

            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-5 border border-violet-300 dark:border-violet-700">
              <p className="font-semibold text-violet-700 dark:text-violet-300 mb-3">Ejemplo:</p>
              <div className="font-mono space-y-2">
                <p className="text-gray-700 dark:text-gray-300">2x + 3y = 13</p>
                <p className="text-gray-700 dark:text-gray-300">x + y = 5</p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <X className="text-violet-500" size={16} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Multiplicamos la ec.2 por -2:
                </span>
              </div>
              <div className="font-mono mt-2 space-y-2 bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-blue-600">2x + 3y = 13</p>
                <p className="text-emerald-600">-2x - 2y = -10</p>
                <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                  <p className="text-purple-600 font-bold">y = 3</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                <strong>Tip:</strong> Busca el mínimo común múltiplo de los coeficientes para saber por cuánto multiplicar.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Ejemplos Resueltos
            </h3>

            <div className="space-y-6">
              {/* Example 1 - Direct sum */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Plus className="text-green-500" size={18} />
                  <span className="text-sm font-semibold text-green-700 dark:text-green-300">Suma directa</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 font-mono text-sm">
                    x + y = 8
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-300 font-mono text-sm">
                    x - y = 2
                  </span>
                </div>
                <div className="text-sm space-y-1 font-mono">
                  <p className="text-gray-600 dark:text-gray-400">Sumar: 2x = 10 → x = 5</p>
                  <p className="text-gray-600 dark:text-gray-400">Encontrar y: 5 + y = 8 → y = 3</p>
                  <p className="font-bold text-purple-600 dark:text-purple-400">Solución: (5, 3)</p>
                </div>
              </div>

              {/* Example 2 - Multiply first */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <X className="text-violet-500" size={18} />
                  <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">Multiplicar primero</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 font-mono text-sm">
                    2x + y = 7
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-300 font-mono text-sm">
                    x + y = 4
                  </span>
                </div>
                <div className="text-sm space-y-1 font-mono">
                  <p className="text-gray-600 dark:text-gray-400">Restar (y son iguales): x = 3</p>
                  <p className="text-gray-600 dark:text-gray-400">Encontrar y: 3 + y = 4 → y = 1</p>
                  <p className="font-bold text-purple-600 dark:text-purple-400">Solución: (3, 1)</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <ArrowLeft size={18} />
            <span>Anterior</span>
          </button>
        )}
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>{isLastTab ? 'Continuar' : 'Siguiente'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
