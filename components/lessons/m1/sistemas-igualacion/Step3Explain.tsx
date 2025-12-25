'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'steps' | 'compare' | 'examples';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'steps', label: 'Los 3 Pasos' },
  { id: 'compare', label: 'vs Sustitución' },
  { id: 'examples', label: 'Ejemplos' },
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
          Método de Igualación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Despeja la misma variable en ambas ecuaciones e iguala
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
                  ? 'bg-white dark:bg-gray-700 text-cyan-600 dark:text-cyan-400 shadow-sm'
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
                  <h4 className="font-bold text-blue-800 dark:text-blue-300">DESPEJAR LA MISMA VARIABLE</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Despeja la misma variable (x o y) en ambas ecuaciones.
                  </p>
                  <div className="font-mono text-sm text-blue-600 dark:text-blue-400 mt-2">
                    <p>Ec.1: y = 3x - 2</p>
                    <p>Ec.2: y = x + 4</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-cyan-800 dark:text-cyan-300">IGUALAR LAS EXPRESIONES</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Como ambas expresiones son iguales a y, son iguales entre sí.
                  </p>
                  <p className="font-mono text-sm text-cyan-600 dark:text-cyan-400 mt-2">
                    3x - 2 = x + 4
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
                  <div className="font-mono text-sm text-purple-600 dark:text-purple-400 mt-2">
                    <p>2x = 6 → x = 3</p>
                    <p>y = 3 + 4 = 7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Igualación vs Sustitución
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border-2 border-cyan-300 dark:border-cyan-700">
                <h4 className="font-bold text-cyan-700 dark:text-cyan-300 mb-3">Igualación</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Despeja la <strong>misma variable</strong> en ambas</li>
                  <li>• Iguala las dos expresiones</li>
                  <li>• Útil cuando ambas ecuaciones se despejan fácil</li>
                </ul>
                <div className="mt-3 font-mono text-xs bg-white dark:bg-gray-800 p-2 rounded">
                  <p>y = 2x → y = x + 3</p>
                  <p className="text-cyan-600">2x = x + 3</p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border-2 border-amber-300 dark:border-amber-700">
                <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-3">Sustitución</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Despeja <strong>una variable</strong> de una ecuación</li>
                  <li>• Sustituye en la otra ecuación</li>
                  <li>• Útil cuando solo una ecuación se despeja fácil</li>
                </ul>
                <div className="mt-3 font-mono text-xs bg-white dark:bg-gray-800 p-2 rounded">
                  <p>y = 2x</p>
                  <p className="text-amber-600">x + (2x) = 9</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                <strong>Clave:</strong> Igualación requiere despejar la <strong>misma variable dos veces</strong>,
                mientras que sustitución solo requiere <strong>un despeje</strong>.
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
              {/* Example 1 */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 font-mono text-sm">
                    y = x + 2
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-300 font-mono text-sm">
                    y = 3x - 4
                  </span>
                </div>
                <div className="text-sm space-y-1 font-mono">
                  <p className="text-gray-600 dark:text-gray-400">Igualar: x + 2 = 3x - 4</p>
                  <p className="text-gray-600 dark:text-gray-400">Resolver: 6 = 2x → x = 3</p>
                  <p className="text-gray-600 dark:text-gray-400">Encontrar y: y = 3 + 2 = 5</p>
                  <p className="font-bold text-purple-600 dark:text-purple-400">Solución: (3, 5)</p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 font-mono text-sm">
                    x + y = 10
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-300 font-mono text-sm">
                    x - y = 2
                  </span>
                </div>
                <div className="text-sm space-y-1 font-mono">
                  <p className="text-gray-600 dark:text-gray-400">Despejar x: x = 10 - y, x = y + 2</p>
                  <p className="text-gray-600 dark:text-gray-400">Igualar: 10 - y = y + 2</p>
                  <p className="text-gray-600 dark:text-gray-400">Resolver: 8 = 2y → y = 4</p>
                  <p className="text-gray-600 dark:text-gray-400">Encontrar x: x = 4 + 2 = 6</p>
                  <p className="font-bold text-purple-600 dark:text-purple-400">Solución: (6, 4)</p>
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
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg"
        >
          <span>{isLastTab ? 'Continuar' : 'Siguiente'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
