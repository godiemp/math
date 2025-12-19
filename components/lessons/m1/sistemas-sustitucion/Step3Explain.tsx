'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'steps' | 'choose' | 'cases';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'steps', label: 'Los 3 Pasos' },
  { id: 'choose', label: 'Qué Despejar' },
  { id: 'cases', label: 'Ejemplos' },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('steps');

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
          Método de Sustitución
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Reemplaza una variable por su expresión equivalente
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
                  ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm'
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
        {activeTab === 'steps' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Los 3 Pasos del Método
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-blue-800 dark:text-blue-300">DESPEJAR</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Despeja una variable de una de las ecuaciones.
                  </p>
                  <p className="font-mono text-sm text-blue-600 dark:text-blue-400 mt-2">
                    x + y = 5 → y = 5 - x
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-300">SUSTITUIR</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Reemplaza esa variable en la otra ecuación.
                  </p>
                  <p className="font-mono text-sm text-emerald-600 dark:text-emerald-400 mt-2">
                    2x + y = 8 → 2x + (5 - x) = 8
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-purple-800 dark:text-purple-300">RESOLVER</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Resuelve la ecuación de una variable y luego encuentra la otra.
                  </p>
                  <p className="font-mono text-sm text-purple-600 dark:text-purple-400 mt-2">
                    x + 5 = 8 → x = 3, luego y = 5 - 3 = 2
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'choose' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              ¿Qué Variable Despejar?
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              Elige la variable que sea más fácil de despejar. Busca coeficiente 1 o -1.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-2 border-green-300 dark:border-green-700">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-3">Ideal para Sustitución</h4>
                <div className="space-y-2 font-mono text-sm">
                  <p className="text-gray-700 dark:text-gray-300"><strong>y = 3x + 2</strong> <span className="text-green-600">(ya despejada)</span></p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>x + 2y = 10</strong> <span className="text-green-600">(coef. de x es 1)</span></p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>-y + x = 4</strong> <span className="text-green-600">(coef. de y es -1)</span></p>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border-2 border-red-300 dark:border-red-700">
                <h4 className="font-bold text-red-700 dark:text-red-300 mb-3">Menos Conveniente</h4>
                <div className="space-y-2 font-mono text-sm">
                  <p className="text-gray-700 dark:text-gray-300"><strong>3x + 2y = 12</strong> <span className="text-red-600">(genera fracciones)</span></p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>5x + 7y = 20</strong> <span className="text-red-600">(ningún coef. es 1)</span></p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mt-4">
              <p className="text-amber-800 dark:text-amber-300 font-medium">
                <strong>Tip:</strong> Si ninguna ecuación tiene coeficiente 1 o -1, considera usar otro método como reducción.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Ejemplos Resueltos
            </h3>

            <div className="space-y-6">
              {/* Example 1 */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 font-mono text-sm">
                    y = 2x
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-300 font-mono text-sm">
                    x + y = 9
                  </span>
                </div>
                <div className="text-sm space-y-1 font-mono">
                  <p className="text-gray-600 dark:text-gray-400">Sustituir y: x + (2x) = 9</p>
                  <p className="text-gray-600 dark:text-gray-400">Resolver: 3x = 9 → x = 3</p>
                  <p className="text-gray-600 dark:text-gray-400">Encontrar y: y = 2(3) = 6</p>
                  <p className="font-bold text-purple-600 dark:text-purple-400">Solución: (3, 6)</p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 font-mono text-sm">
                    x - y = 2
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-300 font-mono text-sm">
                    2x + y = 10
                  </span>
                </div>
                <div className="text-sm space-y-1 font-mono">
                  <p className="text-gray-600 dark:text-gray-400">Despejar x: x = y + 2</p>
                  <p className="text-gray-600 dark:text-gray-400">Sustituir: 2(y + 2) + y = 10</p>
                  <p className="text-gray-600 dark:text-gray-400">Resolver: 3y + 4 = 10 → y = 2</p>
                  <p className="text-gray-600 dark:text-gray-400">Encontrar x: x = 2 + 2 = 4</p>
                  <p className="font-bold text-purple-600 dark:text-purple-400">Solución: (4, 2)</p>
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
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
        >
          <span>{isLastTab ? 'Continuar' : 'Siguiente'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
