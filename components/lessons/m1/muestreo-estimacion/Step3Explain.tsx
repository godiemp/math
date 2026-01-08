'use client';

import { useState } from 'react';
import { ArrowRight, Users, Calculator, BarChart3, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { POPULATION_SIZE, DEFAULT_SAMPLE_SIZE } from './data';

type TabId = 'muestra' | 'estimacion' | 'variacion' | 'tips';

interface Tab {
  id: TabId;
  title: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: 'muestra', title: 'Muestra', icon: <Users size={18} /> },
  { id: 'estimacion', title: 'Estimación', icon: <Calculator size={18} /> },
  { id: 'variacion', title: 'Variación', icon: <BarChart3 size={18} /> },
  { id: 'tips', title: 'Tips', icon: <Lightbulb size={18} /> },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('muestra');
  const [visitedTabs, setVisitedTabs] = useState<Set<TabId>>(new Set(['muestra']));

  if (!isActive) return null;

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setVisitedTabs((prev) => new Set([...prev, tabId]));
  };

  const allTabsVisited = visitedTabs.size === TABS.length;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Arte de Estimar
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora cada pestaña para entender cómo funciona el muestreo
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => {
          const isVisited = visitedTabs.has(tab.id);
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm',
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : isVisited
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              {tab.icon}
              <span>{tab.title}</span>
              {isVisited && !isActive && (
                <CheckCircle size={14} className="text-green-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md min-h-[320px]">
        {activeTab === 'muestra' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                ¿Qué es una Muestra?
              </h3>
            </div>

            {/* Definition */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
              <p className="text-blue-800 dark:text-blue-200">
                Una <strong>muestra</strong> es un subconjunto de individuos seleccionados de una{' '}
                <strong>población</strong> (el grupo completo que queremos estudiar).
              </p>
            </div>

            {/* Visual example */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">👥</div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Población</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{POPULATION_SIZE}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">estudiantes del colegio</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">👤</div>
                <p className="font-semibold text-amber-700 dark:text-amber-300">Muestra</p>
                <p className="text-2xl font-bold text-amber-600">{DEFAULT_SAMPLE_SIZE}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">estudiantes seleccionados</p>
              </div>
            </div>

            {/* Key point */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-700">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <strong>Clave:</strong> La muestra debe ser <strong>aleatoria</strong> para que
                represente bien a toda la población.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'estimacion' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Calculator className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Cómo Estimar
              </h3>
            </div>

            {/* Formula card */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
              <h4 className="text-center text-purple-800 dark:text-purple-200 font-semibold mb-3">
                Proporción Muestral
              </h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-2xl font-mono">
                  <span className="text-purple-600">p̂</span> ={' '}
                  <span className="text-green-600">favorable</span> ÷{' '}
                  <span className="text-blue-600">total muestra</span>
                </p>
              </div>
            </div>

            {/* Example */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Ejemplo:</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Si 24 de 40 estudiantes prefieren Galletas:
                </p>
                <p className="font-mono text-lg text-center py-2">
                  p̂ = <span className="text-green-600">24</span> ÷{' '}
                  <span className="text-blue-600">40</span> ={' '}
                  <span className="text-purple-600 font-bold">0.60 = 60%</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Estimamos que aproximadamente <strong>60%</strong> de TODA la población prefiere
                  Galletas.
                </p>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Importante:</strong> La proporción muestral (p̂) es nuestra{' '}
                <em>mejor estimación</em> de la proporción real de la población.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'variacion' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <BarChart3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                ¿Por Qué Varían las Muestras?
              </h3>
            </div>

            {/* Explanation */}
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-700">
              <p className="text-teal-800 dark:text-teal-200">
                Cada muestra incluye personas diferentes, por eso los resultados varían. Esto se
                llama <strong>variabilidad muestral</strong> o <strong>error de muestreo</strong>.
              </p>
            </div>

            {/* Visual: Multiple samples */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                4 muestras diferentes del mismo colegio:
              </h4>
              <div className="flex justify-center gap-3">
                {['60%', '55%', '62%', '58%'].map((pct, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm"
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Muestra {i + 1}
                    </div>
                    <div className="text-lg font-bold text-amber-600">{pct}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                Todas diferentes, pero todas cerca de 58% (valor real)
              </p>
            </div>

            {/* Key points */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Las muestras más grandes tienden a dar estimaciones más precisas
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  El promedio de muchas muestras se acerca al valor real
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  La variación es normal y esperada en el muestreo
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Tips y Errores Comunes
              </h3>
            </div>

            {/* Common errors */}
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-200 text-sm">
                      Error: Pensar que la muestra da el valor exacto
                    </p>
                    <p className="text-red-700 dark:text-red-300 text-xs mt-1">
                      Si 60% de la muestra prefiere X, NO significa que exactamente 60% de la
                      población lo prefiere. Es una <em>estimación</em>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-200 text-sm">
                      Error: Usar muestras no aleatorias
                    </p>
                    <p className="text-red-700 dark:text-red-300 text-xs mt-1">
                      Preguntar solo a tus amigos o a personas de un solo lugar puede dar
                      resultados sesgados que no representan a la población.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Good practices */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-sm">
                ✓ Buenas prácticas:
              </h4>
              <ul className="space-y-1 text-green-700 dark:text-green-300 text-xs">
                <li>• Selecciona personas al azar de toda la población</li>
                <li>• Usa muestras lo más grandes posible</li>
                <li>• Recuerda que tu resultado es una estimación, no un valor exacto</li>
                <li>• Si es posible, toma varias muestras y promedia</li>
              </ul>
            </div>

            {/* Memory tip */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                <strong>💡 Para recordar:</strong> &quot;Muestra aleatoria + tamaño adecuado =
                buena estimación&quot;
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              'w-3 h-3 rounded-full transition-colors',
              visitedTabs.has(tab.id) ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          disabled={!allTabsVisited}
          className={cn(
            'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
            allTabsVisited
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
          )}
        >
          <span>{allTabsVisited ? 'Continuar' : 'Visita todas las pestañas'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
