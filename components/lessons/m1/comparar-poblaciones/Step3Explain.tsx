'use client';

import { useState } from 'react';
import { ArrowRight, ScatterChart, TrendingUp, GitCompare, Lightbulb, AlertTriangle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { ESCUELA_A, ESCUELA_B, POPULATION_COLORS, DataPoint } from './data';

type TabId = 'scatter' | 'correlation' | 'compare' | 'tips';

// Mini scatter plot for examples
function MiniScatter({
  data,
  type = 'positive',
  size = 'small',
}: {
  data?: DataPoint[];
  type?: 'positive' | 'negative' | 'none' | 'custom';
  size?: 'small' | 'medium';
}) {
  const width = size === 'small' ? 120 : 180;
  const height = size === 'small' ? 80 : 120;
  const padding = 15;

  // Generate sample data based on type if not provided
  const sampleData: { x: number; y: number }[] = data
    ? data.map((d) => ({ x: d.x, y: d.y }))
    : type === 'positive'
    ? [
        { x: 1, y: 20 }, { x: 2, y: 30 }, { x: 3, y: 35 },
        { x: 4, y: 45 }, { x: 5, y: 55 }, { x: 6, y: 60 },
      ]
    : type === 'negative'
    ? [
        { x: 1, y: 60 }, { x: 2, y: 55 }, { x: 3, y: 45 },
        { x: 4, y: 35 }, { x: 5, y: 30 }, { x: 6, y: 20 },
      ]
    : [
        { x: 1, y: 40 }, { x: 2, y: 20 }, { x: 3, y: 50 },
        { x: 4, y: 30 }, { x: 5, y: 55 }, { x: 6, y: 35 },
      ];

  const toX = (x: number) => padding + ((x - 1) / 5) * (width - padding * 2);
  const toY = (y: number) => height - padding - ((y - 10) / 60) * (height - padding * 2);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {/* Axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1" />
      <line x1={padding} y1={height - padding} x2={padding} y2={padding} className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1" />

      {/* Points */}
      {sampleData.map((p, i) => (
        <circle key={i} cx={toX(p.x)} cy={toY(p.y)} r={4} className="fill-blue-500" />
      ))}
    </svg>
  );
}

// Dual scatter for comparison
function DualScatter() {
  const width = 200;
  const height = 140;
  const padding = 20;

  const toX = (x: number) => padding + (x / 10) * (width - padding * 2);
  const toY = (y: number) => height - padding - (y / 100) * (height - padding * 2);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[200px]">
      {/* Axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1" />
      <line x1={padding} y1={height - padding} x2={padding} y2={padding} className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1" />

      {/* Escuela A points */}
      {ESCUELA_A.slice(0, 6).map((p) => (
        <circle key={p.id} cx={toX(p.x)} cy={toY(p.y)} r={4} fill={POPULATION_COLORS.A.fill} />
      ))}

      {/* Escuela B points */}
      {ESCUELA_B.slice(0, 6).map((p) => (
        <circle key={p.id} cx={toX(p.x)} cy={toY(p.y)} r={4} fill={POPULATION_COLORS.B.fill} />
      ))}
    </svg>
  );
}

const TABS = [
  { id: 'scatter' as TabId, label: 'Grafico XY', icon: ScatterChart },
  { id: 'correlation' as TabId, label: 'Correlacion', icon: TrendingUp },
  { id: 'compare' as TabId, label: 'Comparar', icon: GitCompare },
  { id: 'tips' as TabId, label: 'Tips', icon: Lightbulb },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('scatter');
  const [visitedTabs, setVisitedTabs] = useState<Set<TabId>>(new Set(['scatter']));

  if (!isActive) return null;

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setVisitedTabs((prev) => new Set([...prev, tabId]));
  };

  const allVisited = visitedTabs.size === TABS.length;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Nubes de Puntos y Correlacion
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora cada pestana para aprender los conceptos clave
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isVisited = visitedTabs.has(tab.id);

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all',
                isActive
                  ? 'bg-indigo-500 text-white'
                  : isVisited
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              )}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              {isVisited && !isActive && (
                <Check size={14} className="text-green-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md min-h-[400px]">
        {/* TAB 1: Grafico XY */}
        {activeTab === 'scatter' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                <ScatterChart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                ¿Que es un Grafico de Dispersion?
              </h3>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Un <strong>grafico de dispersion</strong> (o nube de puntos) muestra la relacion
                entre dos variables usando puntos en un plano cartesiano.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Cada punto representa:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">X:</span>
                    <span>Una variable (ej: horas de estudio)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">Y:</span>
                    <span>Otra variable (ej: nota obtenida)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Ejemplo: (5, 70)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Un estudiante que estudio <strong>5 horas</strong> y obtuvo <strong>70 puntos</strong>.
                </p>
                <div className="mt-3 flex justify-center">
                  <MiniScatter type="positive" size="medium" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Correlacion */}
        {activeTab === 'correlation' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Tipos de Correlacion
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Positive */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 text-center">
                  Positiva
                </h4>
                <div className="flex justify-center mb-3">
                  <MiniScatter type="positive" />
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 text-center">
                  Cuando X aumenta, Y tambien aumenta
                </p>
              </div>

              {/* Negative */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <h4 className="font-bold text-red-800 dark:text-red-200 mb-2 text-center">
                  Negativa
                </h4>
                <div className="flex justify-center mb-3">
                  <MiniScatter type="negative" />
                </div>
                <p className="text-sm text-red-700 dark:text-red-300 text-center">
                  Cuando X aumenta, Y disminuye
                </p>
              </div>

              {/* None */}
              <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-center">
                  Sin Correlacion
                </h4>
                <div className="flex justify-center mb-3">
                  <MiniScatter type="none" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  No hay patron claro
                </p>
              </div>
            </div>

            {/* Strength */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                Fuerza de la Correlacion
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    <strong>Fuerte:</strong> Puntos muy alineados (facil predecir Y conociendo X)
                  </p>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    <strong>Debil:</strong> Puntos dispersos (dificil predecir)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Comparar */}
        {activeTab === 'compare' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                <GitCompare className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Comparar Dos Poblaciones
              </h3>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300">
                Para comparar dos poblaciones en un grafico XY:
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Usa colores diferentes
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Cada poblacion debe tener su propio color para distinguirlas facilmente.
                  </p>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Poblacion A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Poblacion B</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Grafica ambas en los mismos ejes
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Usar la misma escala permite comparar directamente.
                  </p>
                  <div className="flex justify-center mt-3">
                    <DualScatter />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Compara tres aspectos
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                    <li>• <strong>Posicion:</strong> ¿Cual esta mas arriba o a la derecha?</li>
                    <li>• <strong>Dispersion:</strong> ¿Cual nube es mas compacta?</li>
                    <li>• <strong>Tendencia:</strong> ¿Cual tiene patron mas claro?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Tips - INSIDE TABS (RULE 3) */}
        {activeTab === 'tips' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Tips y Errores Comunes
              </h3>
            </div>

            <div className="space-y-4">
              {/* Error 1 */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-200">
                      Error: Confundir correlacion con causalidad
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Que dos variables esten correlacionadas NO significa que una cause la otra.
                      Ejemplo: El consumo de helado y los ahogamientos estan correlacionados
                      (ambos suben en verano), pero el helado no causa ahogamientos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error 2 */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-200">
                      Error: Ignorar valores atipicos
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Un punto muy alejado del resto puede distorsionar la interpretacion.
                      Siempre identifica y analiza los outliers antes de concluir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tip 1 */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                      Tip: Usa colores contrastantes
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Azul y naranja, verde y rojo, morado y amarillo son buenas combinaciones
                      que facilitan distinguir las poblaciones.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tip 2 */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                      Tip: Etiqueta los ejes claramente
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Un grafico sin etiquetas es dificil de interpretar.
                      Siempre indica que representa cada eje y sus unidades.
                    </p>
                  </div>
                </div>
              </div>
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
              visitedTabs.has(tab.id)
                ? activeTab === tab.id
                  ? 'bg-indigo-500'
                  : 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        {allVisited ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Practicar clasificacion</span>
            <ArrowRight size={20} />
          </button>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Visita todas las pestañas para continuar ({visitedTabs.size}/{TABS.length})
          </p>
        )}
      </div>
    </div>
  );
}
