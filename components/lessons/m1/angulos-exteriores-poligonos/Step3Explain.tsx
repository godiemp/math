'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, RotateCw, Calculator, ArrowLeftRight, Lightbulb, AlertTriangle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'regla360' | 'formula' | 'suplementarios' | 'tips';

/**
 * Interactive diagram showing Interior + Exterior = 180°
 * User can drag a slider to change the angle and see both values update
 */
function InteractiveSupplementaryAngles() {
  // Interior angle in degrees (full range from 1° to 179°)
  const [interiorAngle, setInteriorAngle] = useState(120);
  const exteriorAngle = 180 - interiorAngle;

  // SVG geometry calculations
  const geometry = useMemo(() => {
    const cx = 120; // vertex x
    const cy = 100; // vertex y
    const radius = 35; // arc radius
    const lineLength = 90; // length of outgoing edge line

    // Convert interior angle to radians (measured from the left horizontal, going counterclockwise)
    // Interior angle of 180° means the line points left (same as incoming)
    // Interior angle of 0° means the line points right (same as extension)
    const angleRad = (interiorAngle * Math.PI) / 180;

    // Outgoing edge endpoint (from horizontal left, rotating counterclockwise by interior angle)
    // At 180°, it points left. At 90°, it points up. At 0°, it points right.
    const outX = cx + lineLength * Math.cos(Math.PI - angleRad);
    const outY = cy - lineLength * Math.sin(Math.PI - angleRad);

    // Arc endpoints at radius distance from vertex
    // Interior arc: from left horizontal (180°) to outgoing edge direction
    const intArcStartX = cx - radius; // left point on horizontal
    const intArcStartY = cy;
    const intArcEndX = cx + radius * Math.cos(Math.PI - angleRad);
    const intArcEndY = cy - radius * Math.sin(Math.PI - angleRad);

    // Exterior arc: from outgoing edge direction to right horizontal (0°)
    const extArcStartX = intArcEndX;
    const extArcStartY = intArcEndY;
    const extArcEndX = cx + radius; // right point on horizontal
    const extArcEndY = cy;

    // Determine large arc flags
    const intLargeArc = interiorAngle > 180 ? 1 : 0;
    const extLargeArc = exteriorAngle > 180 ? 1 : 0;

    // Interior angle fill and arc paths
    const intFillPath = `M ${cx} ${cy} L ${intArcStartX} ${intArcStartY} A ${radius} ${radius} 0 ${intLargeArc} 1 ${intArcEndX} ${intArcEndY} Z`;
    const intArcPath = `M ${intArcStartX} ${intArcStartY} A ${radius} ${radius} 0 ${intLargeArc} 1 ${intArcEndX} ${intArcEndY}`;

    // Exterior angle fill and arc paths
    const extFillPath = `M ${cx} ${cy} L ${extArcStartX} ${extArcStartY} A ${radius} ${radius} 0 ${extLargeArc} 1 ${extArcEndX} ${extArcEndY} Z`;
    const extArcPath = `M ${extArcStartX} ${extArcStartY} A ${radius} ${radius} 0 ${extLargeArc} 1 ${extArcEndX} ${extArcEndY}`;

    // Label positions (midpoint of each arc, pushed outward)
    const intMidAngle = Math.PI - angleRad / 2; // midpoint of interior arc
    const extMidAngle = (Math.PI - angleRad) / 2; // midpoint of exterior arc (between outgoing and right)

    const labelRadius = radius + 15;
    const intLabelX = cx + labelRadius * Math.cos(intMidAngle);
    const intLabelY = cy - labelRadius * Math.sin(intMidAngle);
    const extLabelX = cx + labelRadius * Math.cos(extMidAngle);
    const extLabelY = cy - labelRadius * Math.sin(extMidAngle);

    return {
      cx,
      cy,
      outX,
      outY,
      intFillPath,
      intArcPath,
      extFillPath,
      extArcPath,
      intLabelX,
      intLabelY,
      extLabelX,
      extLabelY,
    };
  }, [interiorAngle, exteriorAngle]);

  return (
    <div className="space-y-4">
      {/* Interactive SVG */}
      <div className="flex justify-center">
        <svg viewBox="0 0 240 140" className="w-full max-w-sm">
          {/* Previous side coming IN to vertex (horizontal from left) */}
          <line
            x1="30"
            y1={geometry.cy}
            x2={geometry.cx}
            y2={geometry.cy}
            stroke="#374151"
            strokeWidth="3"
            className="dark:stroke-gray-300"
          />

          {/* Next side going OUT from vertex (controlled by slider) */}
          <line
            x1={geometry.cx}
            y1={geometry.cy}
            x2={geometry.outX}
            y2={geometry.outY}
            stroke="#374151"
            strokeWidth="3"
            className="dark:stroke-gray-300"
          />

          {/* Extended line (dashed) - extension of incoming side going RIGHT */}
          <line
            x1={geometry.cx}
            y1={geometry.cy}
            x2="210"
            y2={geometry.cy}
            stroke="#9ca3af"
            strokeWidth="2"
            strokeDasharray="6,4"
            className="dark:stroke-gray-500"
          />

          {/* Interior angle fill (amber) */}
          <path d={geometry.intFillPath} fill="rgba(245, 158, 11, 0.25)" />
          {/* Interior angle arc */}
          <path
            d={geometry.intArcPath}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Exterior angle fill (red) */}
          <path d={geometry.extFillPath} fill="rgba(239, 68, 68, 0.25)" />
          {/* Exterior angle arc */}
          <path
            d={geometry.extArcPath}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Vertex point */}
          <circle cx={geometry.cx} cy={geometry.cy} r="5" fill="#7c3aed" className="dark:fill-purple-400" />

          {/* 180° indicator */}
          <text
            x={geometry.cx}
            y="125"
            fontSize="10"
            textAnchor="middle"
            fill="#6b7280"
            className="dark:fill-gray-400"
          >
            ← 180° →
          </text>
        </svg>
      </div>

      {/* Angle values display */}
      <div className="flex justify-center gap-4 text-lg font-bold">
        <div className="bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-lg">
          <span className="text-amber-700 dark:text-amber-400">Int: {interiorAngle}°</span>
        </div>
        <div className="text-gray-500 dark:text-gray-400 py-2">+</div>
        <div className="bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
          <span className="text-red-700 dark:text-red-400">Ext: {exteriorAngle}°</span>
        </div>
        <div className="text-gray-500 dark:text-gray-400 py-2">=</div>
        <div className="bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-lg">
          <span className="text-purple-700 dark:text-purple-400">180°</span>
        </div>
      </div>

      {/* Slider control */}
      <div className="px-4">
        <label className="block text-sm text-center text-gray-600 dark:text-gray-400 mb-2">
          Mueve el ángulo interior
        </label>
        <input
          type="range"
          min="1"
          max="179"
          value={interiorAngle}
          onChange={(e) => setInteriorAngle(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1°</span>
          <span>179°</span>
        </div>
      </div>
    </div>
  );
}

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

              {/* Interactive diagram */}
              <InteractiveSupplementaryAngles />
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
