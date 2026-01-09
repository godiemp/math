'use client';

import { useState } from 'react';
import { ArrowRight, Calculator, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { PolygonFigure } from '@/components/figures/PolygonFigure';

type TabId = 'suma' | 'regular' | 'tips';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabConfig[] = [
  { id: 'suma', label: 'Suma Total', icon: <Calculator size={16} /> },
  { id: 'regular', label: 'Polígonos Regulares', icon: <span className="text-sm">⬡</span> },
  { id: 'tips', label: 'Tips', icon: <Lightbulb size={16} /> },
];

const POLYGON_TABLE = [
  { name: 'Triángulo', sides: 3, triangles: 1, sum: 180, regular: 60 },
  { name: 'Cuadrilátero', sides: 4, triangles: 2, sum: 360, regular: 90 },
  { name: 'Pentágono', sides: 5, triangles: 3, sum: 540, regular: 108 },
  { name: 'Hexágono', sides: 6, triangles: 4, sum: 720, regular: 120 },
  { name: 'Heptágono', sides: 7, triangles: 5, sum: 900, regular: 128.57 },
  { name: 'Octágono', sides: 8, triangles: 6, sum: 1080, regular: 135 },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('suma');

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las Fórmulas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Todo lo que necesitas saber sobre ángulos interiores
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm',
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        {activeTab === 'suma' ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Main Formula */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 text-center border-2 border-blue-200 dark:border-blue-700">
              <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
                Suma de ángulos interiores de un polígono de n lados:
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                S = (n - 2) × 180°
              </p>
            </div>

            {/* Visual explanation */}
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <PolygonFigure
                  fromRegular={{ sides: 5, radius: 45, centerX: 55, centerY: 50 }}
                  fill="rgba(59, 130, 246, 0.2)"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth={2}
                  diagonals={[
                    { from: 0, to: 2, color: '#dc2626', strokeStyle: 'dashed' },
                    { from: 0, to: 3, color: '#dc2626', strokeStyle: 'dashed' },
                  ]}
                  width={110}
                  height={100}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">n = 5 → 3 triángulos</p>
              </div>
              <div className="text-4xl text-gray-400">=</div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  (5 - 2) × 180°
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                  = 540°
                </p>
              </div>
            </div>

            {/* Reference Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 px-2 text-gray-600 dark:text-gray-400">Polígono</th>
                    <th className="py-2 px-2 text-gray-600 dark:text-gray-400">n</th>
                    <th className="py-2 px-2 text-gray-600 dark:text-gray-400">n - 2</th>
                    <th className="py-2 px-2 text-gray-600 dark:text-gray-400">Suma</th>
                  </tr>
                </thead>
                <tbody>
                  {POLYGON_TABLE.map((p) => (
                    <tr key={p.sides} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200">{p.name}</td>
                      <td className="py-2 px-2 text-blue-600 dark:text-blue-400 font-bold">{p.sides}</td>
                      <td className="py-2 px-2 text-red-600 dark:text-red-400">{p.triangles}</td>
                      <td className="py-2 px-2 text-green-600 dark:text-green-400 font-bold">{p.sum}°</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'regular' ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Regular Polygon Formula */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 text-center border-2 border-purple-200 dark:border-purple-700">
              <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
                Cada ángulo interior de un polígono <strong>regular</strong> de n lados:
              </p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                α = (n - 2) × 180° ÷ n
              </p>
            </div>

            {/* Explanation */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                En un polígono <strong>regular</strong>, todos los ángulos son iguales.
                <br />
                Solo divide la suma total por el número de ángulos (n).
              </p>
            </div>

            {/* Visual examples */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <PolygonFigure
                  fromRegular={{ sides: 4, radius: 35, centerX: 45, centerY: 40 }}
                  fill="rgba(34, 197, 94, 0.2)"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth={2}
                  angles={[{ showArc: true, color: '#f59e0b', arcRadius: 12 }, {}, {}, {}]}
                  width={90}
                  height={80}
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Cuadrado</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400">90°</p>
              </div>
              <div className="text-center">
                <PolygonFigure
                  fromRegular={{ sides: 5, radius: 35, centerX: 45, centerY: 40 }}
                  fill="rgba(168, 85, 247, 0.2)"
                  stroke="rgb(168, 85, 247)"
                  strokeWidth={2}
                  angles={[{ showArc: true, color: '#f59e0b', arcRadius: 12 }, {}, {}, {}, {}]}
                  width={90}
                  height={80}
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Pentágono</p>
                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">108°</p>
              </div>
              <div className="text-center">
                <PolygonFigure
                  fromRegular={{ sides: 6, radius: 35, centerX: 45, centerY: 40 }}
                  fill="rgba(236, 72, 153, 0.2)"
                  stroke="rgb(236, 72, 153)"
                  strokeWidth={2}
                  angles={[{ showArc: true, color: '#f59e0b', arcRadius: 12 }, {}, {}, {}, {}, {}]}
                  width={90}
                  height={80}
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Hexágono</p>
                <p className="text-sm font-bold text-pink-600 dark:text-pink-400">120°</p>
              </div>
            </div>

            {/* Reference Table for Regular Polygons */}
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 px-2 text-gray-600 dark:text-gray-400">Polígono Regular</th>
                    <th className="py-2 px-2 text-gray-600 dark:text-gray-400">n</th>
                    <th className="py-2 px-2 text-gray-600 dark:text-gray-400">Suma</th>
                    <th className="py-2 px-2 text-gray-600 dark:text-gray-400">Cada ángulo</th>
                  </tr>
                </thead>
                <tbody>
                  {POLYGON_TABLE.map((p) => (
                    <tr key={p.sides} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200">{p.name}</td>
                      <td className="py-2 px-2 text-blue-600 dark:text-blue-400">{p.sides}</td>
                      <td className="py-2 px-2 text-gray-600 dark:text-gray-400">{p.sum}°</td>
                      <td className="py-2 px-2 text-purple-600 dark:text-purple-400 font-bold">
                        {Number.isInteger(p.regular) ? `${p.regular}°` : `≈${p.regular.toFixed(1)}°`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // TIPS TAB
          <div className="space-y-4 animate-fadeIn">
            {/* Tip 1 */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200 mb-1">
                    Memoriza los casos comunes
                  </p>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Triángulo = 180°, Cuadrilátero = 360°, Hexágono = 720°.
                    Los demás puedes calcularlos con la fórmula.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                    Verifica tu respuesta
                  </p>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    La suma siempre es un múltiplo de 180°.
                    Si tu resultado no lo es, revisa el cálculo.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
                    Para encontrar n desde la suma
                  </p>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    Despeja: n = (Suma ÷ 180°) + 2.
                    <br />
                    Ejemplo: Si suma = 1080°, entonces n = (1080÷180) + 2 = 6 + 2 = 8 lados.
                  </p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Error común: confundir con ángulos exteriores
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    Los ángulos <strong>exteriores</strong> siempre suman 360° (sin importar n).
                    Esta fórmula es solo para ángulos <strong>interiores</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Memory trick */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 rounded-lg p-4 border border-pink-200 dark:border-pink-700">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧠</span>
                <div>
                  <p className="font-semibold text-pink-800 dark:text-pink-200 mb-1">
                    Truco para recordar
                  </p>
                  <p className="text-pink-700 dark:text-pink-300 text-sm">
                    &ldquo;Resta 2 al número de lados y multiplica por 180&rdquo;
                    <br />
                    El &ldquo;-2&rdquo; viene de que necesitas 2 lados para formar cada triángulo desde el vértice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg"
        >
          <span>Practicar identificación</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
