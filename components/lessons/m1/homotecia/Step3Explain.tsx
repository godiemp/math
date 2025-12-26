'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, ListOrdered, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'conceptos' | 'pasos' | 'tips';

interface TabInfo {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabInfo[] = [
  { id: 'conceptos', label: 'Conceptos', icon: <BookOpen size={18} /> },
  { id: 'pasos', label: 'Pasos', icon: <ListOrdered size={18} /> },
  { id: 'tips', label: 'Tips', icon: <Lightbulb size={18} /> },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('conceptos');

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Conceptos Clave de Homotecia
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Todo lo que necesitas saber
        </p>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white dark:bg-gray-800 p-1 rounded-xl">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          {activeTab === 'conceptos' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main definition */}
              <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                  HOMOTECIA
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Una transformación que agranda o reduce una figura desde un punto fijo,
                  manteniendo su forma.
                </p>
              </div>

              {/* Key elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Centro */}
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
                      O
                    </div>
                    <h4 className="font-bold text-red-800 dark:text-red-200">Centro de Homotecia</h4>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    El punto fijo desde el cual se miden todas las distancias.
                    Puede estar dentro, fuera o sobre la figura.
                  </p>
                </div>

                {/* Razón */}
                <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      k
                    </div>
                    <h4 className="font-bold text-purple-800 dark:text-purple-200">Razón de Homotecia</h4>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    El factor por el que se multiplican todas las distancias desde el centro.
                  </p>
                </div>
              </div>

              {/* Formula */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-center">
                  Fórmula de Transformación
                </h4>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="font-mono text-2xl text-indigo-600 dark:text-indigo-400">
                    P&apos; = O + k · (P - O)
                  </p>
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
                  <span className="font-mono">P</span> = punto original,{' '}
                  <span className="font-mono">O</span> = centro,{' '}
                  <span className="font-mono">k</span> = razón,{' '}
                  <span className="font-mono">P&apos;</span> = punto imagen
                </div>
              </div>

              {/* K values summary */}
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-lg">
                  <div className="font-bold text-green-700 dark:text-green-300">k &gt; 1</div>
                  <div className="text-green-600 dark:text-green-400">Ampliación</div>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/40 p-3 rounded-lg">
                  <div className="font-bold text-orange-700 dark:text-orange-300">0 &lt; k &lt; 1</div>
                  <div className="text-orange-600 dark:text-orange-400">Reducción</div>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-lg">
                  <div className="font-bold text-purple-700 dark:text-purple-300">k &lt; 0</div>
                  <div className="text-purple-600 dark:text-purple-400">Inversión</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pasos' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                Cómo construir una Homotecia
              </h3>

              {[
                {
                  step: 1,
                  title: 'Identificar el centro O y la razón k',
                  description: 'Ubica el punto fijo (centro) y determina el valor de k.',
                  color: 'red',
                },
                {
                  step: 2,
                  title: 'Trazar rayos desde O',
                  description: 'Dibuja líneas rectas desde el centro pasando por cada vértice de la figura.',
                  color: 'orange',
                },
                {
                  step: 3,
                  title: 'Medir distancias originales',
                  description: 'Calcula la distancia desde O hasta cada vértice original.',
                  color: 'yellow',
                },
                {
                  step: 4,
                  title: 'Multiplicar por |k|',
                  description: 'Multiplica cada distancia por el valor absoluto de k.',
                  color: 'green',
                },
                {
                  step: 5,
                  title: 'Ubicar puntos imagen',
                  description: 'Si k > 0, marca en el mismo sentido. Si k < 0, marca en sentido opuesto.',
                  color: 'blue',
                },
                {
                  step: 6,
                  title: 'Unir los puntos',
                  description: 'Conecta los nuevos puntos para formar la figura imagen.',
                  color: 'purple',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={cn(
                    'flex gap-4 p-4 rounded-xl border-l-4',
                    item.color === 'red' && 'bg-red-50 dark:bg-red-900/20 border-red-500',
                    item.color === 'orange' && 'bg-orange-50 dark:bg-orange-900/20 border-orange-500',
                    item.color === 'yellow' && 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500',
                    item.color === 'green' && 'bg-green-50 dark:bg-green-900/20 border-green-500',
                    item.color === 'blue' && 'bg-blue-50 dark:bg-blue-900/20 border-blue-500',
                    item.color === 'purple' && 'bg-purple-50 dark:bg-purple-900/20 border-purple-500'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0',
                      item.color === 'red' && 'bg-red-500',
                      item.color === 'orange' && 'bg-orange-500',
                      item.color === 'yellow' && 'bg-yellow-500',
                      item.color === 'green' && 'bg-green-500',
                      item.color === 'blue' && 'bg-blue-500',
                      item.color === 'purple' && 'bg-purple-500'
                    )}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                Consejos y Errores Comunes
              </h3>

              {/* Tips */}
              <div className="space-y-3">
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-green-800 dark:text-green-200">Los ángulos se conservan</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        La figura imagen siempre es <strong>semejante</strong> a la original. Los ángulos nunca cambian.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-800 dark:text-blue-200">El perímetro se multiplica por |k|</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Si k = 2, el perímetro de la imagen es el doble del original.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-purple-800 dark:text-purple-200">El área se multiplica por k²</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Si k = 3, el área es 9 veces mayor (3² = 9).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common errors */}
              <div className="mt-6">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Errores Comunes
                </h4>

                <div className="space-y-3">
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-500 font-bold">✗</span>
                      <span className="font-medium text-red-800 dark:text-red-200">
                        Confundir k negativo con reducción
                      </span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300 ml-6">
                      k = -2 es una <strong>ampliación invertida</strong>, no una reducción.
                      El tamaño depende de |k|, no del signo.
                    </p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-500 font-bold">✗</span>
                      <span className="font-medium text-red-800 dark:text-red-200">
                        Olvidar restar el centro antes de multiplicar
                      </span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300 ml-6">
                      La fórmula es P&apos; = O + k(P - O), no P&apos; = k · P.
                      Primero resta O, multiplica, luego suma O.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onComplete}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
