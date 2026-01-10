'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, AlertTriangle, Circle, Target, Scale, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { TriangleFigure } from '@/components/figures/TriangleFigure';
import type { SpecialLineConfig, NotablePointConfig, TriangleCircleConfig } from '@/lib/types/triangle';

type TabId = 'circuncentro' | 'incentro' | 'baricentro' | 'ortocentro' | 'tips';

interface TabConfig {
  id: TabId;
  label: string;
  icon: typeof Circle;
  color: string;
}

const TABS: TabConfig[] = [
  { id: 'circuncentro', label: 'Circuncentro', icon: Circle, color: 'purple' },
  { id: 'incentro', label: 'Incentro', icon: Target, color: 'amber' },
  { id: 'baricentro', label: 'Baricentro', icon: Scale, color: 'emerald' },
  { id: 'ortocentro', label: 'Ortocentro', icon: Crosshair, color: 'red' },
  { id: 'tips', label: 'Tips', icon: Lightbulb, color: 'blue' },
];

// Default triangle vertices for explanations
const DEFAULT_VERTICES: [{ x: number; y: number; label: string }, { x: number; y: number; label: string }, { x: number; y: number; label: string }] = [
  { x: 200, y: 60, label: 'A' },
  { x: 80, y: 280, label: 'B' },
  { x: 320, y: 280, label: 'C' },
];

// Helper to generate special lines for all 3 vertices
function allLinesOfType(type: SpecialLineConfig['type'], showRightAngleMarker = false): SpecialLineConfig[] {
  return [
    { type, fromVertex: 0, showRightAngleMarker },
    { type, fromVertex: 1, showRightAngleMarker },
    { type, fromVertex: 2, showRightAngleMarker },
  ];
}

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('circuncentro');

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Los 4 Puntos Notables
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resumen y referencia
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            )}
            style={{
              color: activeTab === tab.id
                ? tab.color === 'purple' ? 'rgb(168, 85, 247)'
                  : tab.color === 'amber' ? 'rgb(217, 119, 6)'
                  : tab.color === 'emerald' ? 'rgb(16, 185, 129)'
                  : tab.color === 'red' ? 'rgb(239, 68, 68)'
                  : 'rgb(59, 130, 246)'
                : undefined
            }}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        {/* CIRCUNCENTRO TAB */}
        {activeTab === 'circuncentro' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                <Circle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-800 dark:text-purple-200">Circuncentro</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Centro del círculo circunscrito</p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
              <TriangleFigure
                vertices={DEFAULT_VERTICES}
                specialLines={allLinesOfType('simetral')}
                notablePoints={[{ type: 'circuncentro', animate: true }]}
                circles={[{ type: 'circumscribed' }]}
                className="mx-auto max-w-xs"
              />
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-semibold text-gray-800 dark:text-white">Construcción:</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Intersección de las 3 <strong>simetrales</strong> (perpendiculares por el punto medio de cada lado)
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-semibold text-gray-800 dark:text-white">Propiedad clave:</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Equidistante de los 3 vértices (es el centro del círculo que pasa por A, B y C)
                </p>
              </div>

              <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3 border border-purple-300 dark:border-purple-600">
                <p className="font-semibold text-purple-800 dark:text-purple-200">Ubicación:</p>
                <p className="text-purple-700 dark:text-purple-300 text-sm">
                  <strong>Dentro</strong> en triángulos acutángulos, <strong>sobre la hipotenusa</strong> en rectángulos, <strong>fuera</strong> en obtusángulos
                </p>
              </div>
            </div>
          </div>
        )}

        {/* INCENTRO TAB */}
        {activeTab === 'incentro' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200">Incentro</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Centro del círculo inscrito</p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4">
              <TriangleFigure
                vertices={DEFAULT_VERTICES}
                specialLines={allLinesOfType('bisectriz')}
                notablePoints={[{ type: 'incentro', animate: true }]}
                circles={[{ type: 'inscribed' }]}
                className="mx-auto max-w-xs"
              />
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-semibold text-gray-800 dark:text-white">Construcción:</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Intersección de las 3 <strong>bisectrices</strong> (líneas que dividen cada ángulo en 2 partes iguales)
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-semibold text-gray-800 dark:text-white">Propiedad clave:</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Equidistante de los 3 lados (es el centro del círculo tangente a los 3 lados)
                </p>
              </div>

              <div className="bg-amber-100 dark:bg-amber-800/30 rounded-lg p-3 border border-amber-300 dark:border-amber-600">
                <p className="font-semibold text-amber-800 dark:text-amber-200">Ubicación:</p>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  <strong>Siempre dentro</strong> del triángulo (en todo tipo de triángulo)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BARICENTRO TAB */}
        {activeTab === 'baricentro' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-200">Baricentro</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Centro de gravedad</p>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
              <TriangleFigure
                vertices={DEFAULT_VERTICES}
                specialLines={allLinesOfType('transversal')}
                notablePoints={[{ type: 'baricentro', animate: true }]}
                className="mx-auto max-w-xs"
              />
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-semibold text-gray-800 dark:text-white">Construcción:</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Intersección de las 3 <strong>transversales de gravedad</strong> (líneas desde cada vértice al punto medio del lado opuesto)
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-semibold text-gray-800 dark:text-white">Propiedad clave:</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Divide cada transversal en razón <strong>2:1</strong> desde el vértice. Es el centro de masa del triángulo.
                </p>
              </div>

              <div className="bg-emerald-100 dark:bg-emerald-800/30 rounded-lg p-3 border border-emerald-300 dark:border-emerald-600">
                <p className="font-semibold text-emerald-800 dark:text-emerald-200">Ubicación:</p>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                  <strong>Siempre dentro</strong> del triángulo (en todo tipo de triángulo)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ORTOCENTRO TAB */}
        {activeTab === 'ortocentro' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                <Crosshair className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-800 dark:text-red-200">Ortocentro</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Intersección de alturas</p>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4">
              <TriangleFigure
                vertices={DEFAULT_VERTICES}
                specialLines={allLinesOfType('altura', true)}
                notablePoints={[{ type: 'ortocentro', animate: true }]}
                className="mx-auto max-w-xs"
              />
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-semibold text-gray-800 dark:text-white">Construcción:</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Intersección de las 3 <strong>alturas</strong> (perpendiculares desde cada vértice al lado opuesto)
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-semibold text-gray-800 dark:text-white">Propiedad clave:</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Las alturas siempre se cortan en un punto (aunque esté fuera del triángulo)
                </p>
              </div>

              <div className="bg-red-100 dark:bg-red-800/30 rounded-lg p-3 border border-red-300 dark:border-red-600">
                <p className="font-semibold text-red-800 dark:text-red-200">Ubicación:</p>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  <strong>Dentro</strong> en acutángulos, <strong>en el vértice recto</strong> en rectángulos, <strong>fuera</strong> en obtusángulos
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Consejos para recordar los puntos notables:
            </p>

            <div className="space-y-3">
              {/* Tip 1: Mnemonic */}
              <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <Lightbulb className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-200">Truco para recordar</p>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    <strong>C</strong>ircuncentro = <strong>C</strong>írculo circuns<strong>c</strong>rito (pasa por vértices)<br />
                    <strong>I</strong>ncentro = Círculo <strong>I</strong>nscrito (toca los lados)
                  </p>
                </div>
              </div>

              {/* Tip 2: Inside vs Outside */}
              <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <Lightbulb className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">¿Dentro o fuera?</p>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Solo <strong>Incentro</strong> y <strong>Baricentro</strong> están <em>siempre</em> dentro del triángulo.
                    Circuncentro y Ortocentro pueden estar fuera en triángulos obtusángulos.
                  </p>
                </div>
              </div>

              {/* Common error */}
              <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-amber-800 dark:text-amber-200">Error común</p>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    No confundas <strong>transversal de gravedad</strong> (vértice → punto medio) con <strong>simetral</strong> (perpendicular en el punto medio).
                    ¡Las transversales dan el baricentro, las simetrales dan el circuncentro!
                  </p>
                </div>
              </div>

              {/* Tip 3: Lines table */}
              <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <Lightbulb className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Resumen rápido</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <p className="font-bold text-purple-600 dark:text-purple-400">3 Simetrales →</p>
                      <p className="text-gray-600 dark:text-gray-300">Circuncentro</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <p className="font-bold text-amber-600 dark:text-amber-400">3 Bisectrices →</p>
                      <p className="text-gray-600 dark:text-gray-300">Incentro</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">3 Transversales →</p>
                      <p className="text-gray-600 dark:text-gray-300">Baricentro</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <p className="font-bold text-red-600 dark:text-red-400">3 Alturas →</p>
                      <p className="text-gray-600 dark:text-gray-300">Ortocentro</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Practicar identificación</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
