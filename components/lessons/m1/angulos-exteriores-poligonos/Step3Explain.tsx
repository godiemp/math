'use client';

import { useState } from 'react';
import { ArrowRight, RotateCw, Calculator, ArrowLeftRight, Lightbulb, AlertTriangle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'regla360' | 'formula' | 'suplementarios' | 'tips';

interface Tab {
  id: TabId;
  title: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: 'regla360', title: 'La Regla', icon: <RotateCw size={16} /> },
  { id: 'formula', title: 'Fórmula', icon: <Calculator size={16} /> },
  { id: 'suplementarios', title: 'Interior + Exterior', icon: <ArrowLeftRight size={16} /> },
  { id: 'tips', title: 'Tips', icon: <Lightbulb size={16} /> },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('regla360');
  const [visitedTabs, setVisitedTabs] = useState<Set<TabId>>(new Set(['regla360']));

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setVisitedTabs((prev) => new Set([...prev, tabId]));
  };

  const allTabsVisited = visitedTabs.size === TABS.length;

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Las Fórmulas</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora cada sección para dominar los ángulos exteriores
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium text-sm transition-all',
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {tab.icon}
            {tab.title}
            {visitedTabs.has(tab.id) && activeTab !== tab.id && (
              <Check size={14} className="text-green-500" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[320px]">
        {activeTab === 'regla360' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-200 dark:border-red-700">
              <h4 className="text-center font-bold text-red-800 dark:text-red-200 text-lg mb-2">
                Regla Fundamental
              </h4>
              <p className="text-3xl font-bold text-center text-red-600 dark:text-red-400">
                Suma de ángulos exteriores = 360°
              </p>
              <p className="text-center text-red-700 dark:text-red-300 mt-2">
                ¡Para CUALQUIER polígono convexo!
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Cuando caminas alrededor de un polígono, al regresar al punto de inicio has
                girado exactamente <strong>una vuelta completa</strong> (360°).
              </p>
            </div>

            {/* Visual: 3 polygons showing 360 */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { sides: 3, name: 'Triángulo', angle: 120 },
                { sides: 5, name: 'Pentágono', angle: 72 },
                { sides: 8, name: 'Octágono', angle: 45 },
              ].map((p) => (
                <div
                  key={p.sides}
                  className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                >
                  <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto mb-2">
                    <polygon
                      points={generatePolygonPoints(p.sides, 25, 30, 30)}
                      fill="rgba(59, 130, 246, 0.2)"
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                      className="dark:stroke-blue-400"
                    />
                  </svg>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {p.sides} × {p.angle}° = 360°
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'formula' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
              <h4 className="text-center font-bold text-blue-800 dark:text-blue-200 mb-3">
                Fórmula para Polígonos Regulares
              </h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300">
                  Ángulo exterior = 360° ÷ n
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  donde n = número de lados
                </p>
              </div>
            </div>

            {/* Examples table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                      Polígono
                    </th>
                    <th className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">n</th>
                    <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                      Ángulo Exterior
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { name: 'Triángulo', n: 3, angle: 120 },
                    { name: 'Cuadrado', n: 4, angle: 90 },
                    { name: 'Pentágono', n: 5, angle: 72 },
                    { name: 'Hexágono', n: 6, angle: 60 },
                    { name: 'Decágono', n: 10, angle: 36 },
                  ].map((row) => (
                    <tr key={row.n}>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.name}</td>
                      <td className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">
                        {row.n}
                      </td>
                      <td className="px-4 py-2 text-right font-semibold text-blue-600 dark:text-blue-400">
                        {row.angle}°
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-400 text-center">
              A más lados, más pequeño es cada ángulo exterior, pero siempre suman 360°.
            </div>
          </div>
        )}

        {activeTab === 'suplementarios' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
              <h4 className="text-center font-bold text-purple-800 dark:text-purple-200 mb-3">
                Ángulos Suplementarios
              </h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-xl">
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    Interior
                  </span>{' '}
                  +{' '}
                  <span className="text-red-600 dark:text-red-400 font-semibold">Exterior</span> ={' '}
                  <span className="text-purple-600 dark:text-purple-400 font-bold">180°</span>
                </p>
              </div>
            </div>

            {/* Visual: One vertex showing both angles */}
            <div className="flex justify-center">
              <svg viewBox="0 0 200 120" className="w-full max-w-xs">
                {/* Two adjacent sides */}
                <line
                  x1="30"
                  y1="90"
                  x2="100"
                  y2="90"
                  stroke="#374151"
                  strokeWidth="3"
                  className="dark:stroke-gray-300"
                />
                <line
                  x1="100"
                  y1="90"
                  x2="160"
                  y2="40"
                  stroke="#374151"
                  strokeWidth="3"
                  className="dark:stroke-gray-300"
                />
                {/* Extended line (dashed) */}
                <line
                  x1="100"
                  y1="90"
                  x2="180"
                  y2="90"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  className="dark:stroke-gray-500"
                />

                {/* Interior angle arc (amber) */}
                <path
                  d="M 75 90 A 25 25 0 0 0 117 72"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />
                <path d="M 100 90 L 75 90 A 25 25 0 0 0 117 72 Z" fill="rgba(245, 158, 11, 0.2)" />
                <text x="85" y="75" fontSize="11" fill="#f59e0b" fontWeight="bold">
                  Int
                </text>

                {/* Exterior angle arc (red) */}
                <path
                  d="M 125 90 A 25 25 0 0 1 117 72"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                />
                <path
                  d="M 100 90 L 125 90 A 25 25 0 0 1 117 72 Z"
                  fill="rgba(239, 68, 68, 0.2)"
                />
                <text x="130" y="80" fontSize="11" fill="#ef4444" fontWeight="bold">
                  Ext
                </text>

                {/* Vertex point */}
                <circle cx="100" cy="90" r="4" fill="#6b21a8" />
              </svg>
            </div>

            {/* Formula derivation */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
              <p className="text-amber-800 dark:text-amber-200 text-sm font-medium mb-2">
                Útil: Si conoces el ángulo interior, puedes calcular el exterior:
              </p>
              <div className="bg-white dark:bg-gray-800 rounded p-3 text-center">
                <p className="font-mono font-bold text-amber-700 dark:text-amber-300">
                  Exterior = 180° − Interior
                </p>
              </div>
              <p className="text-amber-700 dark:text-amber-300 text-xs mt-2">
                Ejemplo: Si el interior es 108°, entonces el exterior es 180° − 108° = 72°
              </p>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Common errors */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-200 text-sm">
                    Error: Confundir ángulos interiores con exteriores
                  </p>
                  <p className="text-red-700 dark:text-red-300 text-xs mt-1">
                    Los ángulos interiores suman (n−2) × 180°.
                    <br />
                    Los ángulos exteriores <strong>SIEMPRE</strong> suman 360°.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-200 text-sm">
                    Error: Pensar que la suma cambia con más lados
                  </p>
                  <p className="text-red-700 dark:text-red-300 text-xs mt-1">
                    Aunque cada ángulo exterior se hace más pequeño, siempre hay más de ellos.
                    El producto siempre es 360°.
                  </p>
                </div>
              </div>
            </div>

            {/* Good practices */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-sm flex items-center gap-2">
                <Check size={16} />
                Tips para recordar
              </h4>
              <ul className="space-y-1 text-green-700 dark:text-green-300 text-xs">
                <li>• &ldquo;360 grados&rdquo; = una vuelta completa = suma de ángulos exteriores</li>
                <li>• Para encontrar UN ángulo exterior regular: 360 ÷ n</li>
                <li>• Interior + Exterior = 180° (línea recta)</li>
                <li>• Más lados → ángulo exterior más pequeño</li>
              </ul>
            </div>

            {/* Memory tip */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
              <p className="text-purple-800 dark:text-purple-200 text-sm text-center">
                <strong>Para recordar:</strong> &ldquo;Exterior = 360 siempre&rdquo;
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
              'w-3 h-3 rounded-full transition-all',
              visitedTabs.has(tab.id)
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {!allTabsVisited && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Visita todas las secciones para continuar
        </p>
      )}

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          disabled={!allTabsVisited}
          className={cn(
            'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
            allTabsVisited
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          )}
        >
          <span>Practicar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

// Helper function to generate polygon points for SVG
function generatePolygonPoints(
  sides: number,
  radius: number,
  cx: number,
  cy: number
): string {
  const points: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(' ');
}
