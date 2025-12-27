'use client';

import { useState } from 'react';
import { ArrowRight, ZoomIn, ZoomOut, RotateCcw, MoveHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'scaleDemo' | 'negativeDemo' | 'summary';

// Helper to convert coordinates with homotecia transformation
const applyHomotecia = (
  point: { x: number; y: number },
  center: { x: number; y: number },
  k: number
) => {
  return {
    x: center.x + k * (point.x - center.x),
    y: center.y + k * (point.y - center.y),
  };
};

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [k, setK] = useState(1.5);
  const [kNegative, setKNegative] = useState(-1);

  if (!isActive) return null;

  // Original triangle vertices (in SVG coordinates)
  // Original triangle positioned to fit when scaled up to k=2.5
  // With center at (120,160) and max point at (200,155):
  // k=2.5: 120 + 2.5*(200-120) = 320 < 350 ✓
  const originalTriangle = [
    { x: 160, y: 155 },
    { x: 200, y: 155 },
    { x: 180, y: 115 },
  ];

  // Center point
  const center = { x: 120, y: 160 };

  // Transform points based on k
  const transformedTriangle = originalTriangle.map((p) => applyHomotecia(p, center, k));
  const negativeTransformed = originalTriangle.map((p) => applyHomotecia(p, center, kNegative));

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Los Elementos de la Homotecia
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubre los tres componentes clave
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6">
          {/* Interactive SVG */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 350 280" className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg">
              {/* Grid */}
              <defs>
                <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-gray-700" />
                </pattern>
              </defs>
              <rect width="350" height="280" fill="url(#grid)" />

              {/* Center point O */}
              <circle cx={center.x} cy={center.y} r="8" fill="#dc2626" />
              <text x={center.x - 20} y={center.y + 5} fontSize="16" fontWeight="bold" fill="#dc2626">O</text>

              {/* Original triangle (blue) */}
              <polygon
                points={originalTriangle.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="#bfdbfe"
                stroke="#1d4ed8"
                strokeWidth="2"
              />
              <text x="230" y="180" textAnchor="middle" fontSize="12" fill="#1d4ed8" fontWeight="bold">
                Original
              </text>

              {/* Transformed triangle (green) - k=2 for demo */}
              <polygon
                points={originalTriangle.map((p) => {
                  const t = applyHomotecia(p, center, 2);
                  return `${t.x},${t.y}`;
                }).join(' ')}
                fill="#bbf7d0"
                fillOpacity="0.6"
                stroke="#16a34a"
                strokeWidth="2"
              />
              <text x="310" y="250" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="bold">
                Imagen (k=2)
              </text>

              {/* Dashed rays from center through all 3 vertices */}
              {originalTriangle.map((p, i) => {
                const t = applyHomotecia(p, center, 2);
                // Extend line slightly past the transformed point
                const dx = t.x - center.x;
                const dy = t.y - center.y;
                const extendedX = center.x + dx * 1.1;
                const extendedY = center.y + dy * 1.1;
                return (
                  <g key={i}>
                    <line
                      x1={center.x}
                      y1={center.y}
                      x2={Math.max(0, Math.min(350, extendedX))}
                      y2={Math.max(0, Math.min(280, extendedY))}
                      stroke="#6b7280"
                      strokeWidth="1.5"
                      strokeDasharray="6,4"
                      opacity="0.7"
                    />
                    {/* Vertex markers */}
                    <circle cx={p.x} cy={p.y} r="4" fill="#1d4ed8" />
                    <circle cx={t.x} cy={t.y} r="4" fill="#16a34a" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Three elements explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <h4 className="font-bold text-red-700 dark:text-red-400">Centro (O)</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                El punto fijo desde el cual se miden todas las distancias.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <h4 className="font-bold text-blue-700 dark:text-blue-400">Figura Original</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                La figura que queremos transformar.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <h4 className="font-bold text-green-700 dark:text-green-400">Figura Imagen</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                El resultado de aplicar la homotecia.
              </p>
            </div>
          </div>

          <button
            onClick={() => setPhase('scaleDemo')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            <span>Explorar la razón k</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: SCALE DEMO ============
  if (phase === 'scaleDemo') {
    const isEnlargement = k > 1;
    const isReduction = k > 0 && k < 1;

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Razón de Homotecia (k)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Mueve el control para ver cómo cambia la figura
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
          {/* Interactive SVG */}
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 350 280" className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg">
              {/* Grid */}
              <defs>
                <pattern id="grid2" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-gray-700" />
                </pattern>
              </defs>
              <rect width="350" height="280" fill="url(#grid2)" />

              {/* Center point O */}
              <circle cx={center.x} cy={center.y} r="6" fill="#dc2626" />
              <text x={center.x - 15} y={center.y - 10} fontSize="14" fontWeight="bold" fill="#dc2626">O</text>

              {/* Dashed rays from center through all 3 pairs of vertices */}
              {originalTriangle.map((p, i) => {
                const t = transformedTriangle[i];
                // Extend through the farthest point
                const endPoint = k >= 1 ? t : p;
                const dx = endPoint.x - center.x;
                const dy = endPoint.y - center.y;
                const extendedX = center.x + dx * 1.15;
                const extendedY = center.y + dy * 1.15;

                return (
                  <g key={i}>
                    {/* Ray line */}
                    <line
                      x1={center.x}
                      y1={center.y}
                      x2={Math.max(0, Math.min(350, extendedX))}
                      y2={Math.max(0, Math.min(280, extendedY))}
                      stroke="#6b7280"
                      strokeWidth="1.5"
                      strokeDasharray="6,4"
                      opacity="0.7"
                    />
                    {/* Vertex marker on original */}
                    <circle cx={p.x} cy={p.y} r="4" fill="#1d4ed8" />
                    {/* Vertex marker on transformed */}
                    <circle cx={t.x} cy={t.y} r="4" fill={k >= 1 ? '#16a34a' : '#ea580c'} />
                  </g>
                );
              })}

              {/* Original triangle (blue) */}
              <polygon
                points={originalTriangle.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="#bfdbfe"
                stroke="#1d4ed8"
                strokeWidth="2"
              />

              {/* Transformed triangle (green/orange based on k) */}
              <polygon
                points={transformedTriangle.map((p) => `${p.x},${p.y}`).join(' ')}
                fill={isEnlargement ? '#bbf7d0' : '#fed7aa'}
                fillOpacity="0.7"
                stroke={isEnlargement ? '#16a34a' : '#ea580c'}
                strokeWidth="2"
              />

              {/* Labels */}
              <text x="180" y="170" textAnchor="middle" fontSize="11" fill="#1d4ed8" fontWeight="bold">
                Original
              </text>
              {/* Label for transformed triangle - positioned at centroid */}
              {(() => {
                const centroidX = (transformedTriangle[0].x + transformedTriangle[1].x + transformedTriangle[2].x) / 3;
                const centroidY = (transformedTriangle[0].y + transformedTriangle[1].y + transformedTriangle[2].y) / 3;
                // Position label below the centroid
                const labelY = Math.min(centroidY + 25, 270);
                return (
                  <text
                    x={centroidX}
                    y={labelY}
                    textAnchor="middle"
                    fontSize="11"
                    fill={isEnlargement ? '#16a34a' : '#ea580c'}
                    fontWeight="bold"
                  >
                    Imagen
                  </text>
                );
              })()}

              {/* K value display */}
              <rect x="10" y="10" width="100" height="35" rx="8" fill="#7c3aed" />
              <text x="60" y="35" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">
                k = {k.toFixed(1)}
              </text>
            </svg>
          </div>

          {/* Slider control */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                <ZoomOut size={16} />
                Reducción
              </span>
              <span className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                Ampliación
                <ZoomIn size={16} />
              </span>
            </div>

            <input
              type="range"
              min="0.3"
              max="2.5"
              step="0.1"
              value={k}
              onChange={(e) => setK(parseFloat(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-orange-300 via-gray-300 to-green-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />

            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>k = 0.3</span>
              <span>k = 1.0</span>
              <span>k = 2.5</span>
            </div>
          </div>

          {/* Explanation card */}
          <div className={cn(
            'rounded-xl p-4 mb-4 transition-colors',
            isEnlargement
              ? 'bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-700'
              : isReduction
                ? 'bg-orange-100 dark:bg-orange-900/40 border border-orange-300 dark:border-orange-700'
                : 'bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
          )}>
            <div className="flex items-center gap-3">
              {isEnlargement ? (
                <ZoomIn className="w-8 h-8 text-green-600 dark:text-green-400" />
              ) : isReduction ? (
                <ZoomOut className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              ) : (
                <MoveHorizontal className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              )}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">
                  {isEnlargement ? 'Ampliación' : isReduction ? 'Reducción' : 'Sin cambio'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isEnlargement
                    ? `k > 1: Las distancias se multiplican por ${k.toFixed(1)}`
                    : isReduction
                      ? `0 < k < 1: Las distancias se reducen a ${(k * 100).toFixed(0)}%`
                      : 'k = 1: La figura no cambia de tamaño'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase('negativeDemo')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all"
          >
            <span>¿Y si k es negativo?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: NEGATIVE K DEMO ============
  if (phase === 'negativeDemo') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Homotecia con k Negativo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            La imagen aparece al lado opuesto del centro
          </p>
        </div>

        <div className="bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/30 dark:to-purple-900/30 rounded-xl p-6">
          {/* Interactive SVG */}
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 350 280" className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg">
              {/* Grid */}
              <defs>
                <pattern id="grid3" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-gray-700" />
                </pattern>
              </defs>
              <rect width="350" height="280" fill="url(#grid3)" />

              {/* Center point O (centered) */}
              <circle cx="175" cy="140" r="6" fill="#dc2626" />
              <text x="175" y="125" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">O</text>

              {/* Adjusted original triangle (right side, sized to fit with k=-2) */}
              {(() => {
                const origTri = [
                  { x: 210, y: 130 },
                  { x: 250, y: 130 },
                  { x: 230, y: 95 },
                ];
                const centerNeg = { x: 175, y: 140 };
                const negTri = origTri.map((p) => applyHomotecia(p, centerNeg, kNegative));

                return (
                  <>
                    {/* Dashed rays through center */}
                    {origTri.map((p, i) => (
                      <line
                        key={i}
                        x1={negTri[i].x}
                        y1={negTri[i].y}
                        x2={p.x}
                        y2={p.y}
                        stroke="#9ca3af"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                      />
                    ))}

                    {/* Original triangle (blue, right side) */}
                    <polygon
                      points={origTri.map((p) => `${p.x},${p.y}`).join(' ')}
                      fill="#bfdbfe"
                      stroke="#1d4ed8"
                      strokeWidth="2"
                    />
                    <text x="230" y="145" textAnchor="middle" fontSize="11" fill="#1d4ed8" fontWeight="bold">
                      Original
                    </text>

                    {/* Negative transformed triangle (purple, left side, inverted) */}
                    <polygon
                      points={negTri.map((p) => `${p.x},${p.y}`).join(' ')}
                      fill="#ddd6fe"
                      fillOpacity="0.7"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    {/* Dynamic label positioned below the transformed triangle */}
                    {(() => {
                      const centroidX = (negTri[0].x + negTri[1].x + negTri[2].x) / 3;
                      const maxY = Math.max(negTri[0].y, negTri[1].y, negTri[2].y);
                      const labelY = Math.min(maxY + 15, 270);
                      return (
                        <text x={centroidX} y={labelY} textAnchor="middle" fontSize="11" fill="#7c3aed" fontWeight="bold">
                          Imagen
                        </text>
                      );
                    })()}
                  </>
                );
              })()}

              {/* K value display */}
              <rect x="10" y="10" width="100" height="35" rx="8" fill="#7c3aed" />
              <text x="60" y="35" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">
                k = {kNegative.toFixed(1)}
              </text>
            </svg>
          </div>

          {/* Slider control */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Invertido y reducido
              </span>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Invertido y ampliado
              </span>
            </div>

            <input
              type="range"
              min="-2"
              max="-0.3"
              step="0.1"
              value={kNegative}
              onChange={(e) => setKNegative(parseFloat(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-purple-400 to-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />

            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>k = -2</span>
              <span>k = -1</span>
              <span>k = -0.3</span>
            </div>
          </div>

          {/* Key insight - Negative k ranges table */}
          <div className="bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-700 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h4 className="font-bold text-purple-800 dark:text-purple-200">k negativo = Inversión + ¿Qué tamaño?</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-800/30 rounded-lg p-2">
                <span className="font-mono font-bold text-purple-700 dark:text-purple-300 min-w-[80px]">-1 &lt; k &lt; 0</span>
                <span className="text-purple-600 dark:text-purple-400">
                  Inversión + reducción <span className="opacity-70">(ej: k = -0.5)</span>
                </span>
              </div>
              <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-800/30 rounded-lg p-2">
                <span className="font-mono font-bold text-purple-700 dark:text-purple-300 min-w-[80px]">k = -1</span>
                <span className="text-purple-600 dark:text-purple-400">
                  Inversión (mismo tamaño)
                </span>
              </div>
              <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-800/30 rounded-lg p-2">
                <span className="font-mono font-bold text-purple-700 dark:text-purple-300 min-w-[80px]">k &lt; -1</span>
                <span className="text-purple-600 dark:text-purple-400">
                  Inversión + ampliación <span className="opacity-70">(ej: k = -2)</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase('summary')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all"
          >
            <span>Ver resumen</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resumen: La Razón de Homotecia
        </h2>
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* k > 1 */}
          <div className="bg-green-100 dark:bg-green-900/40 border-2 border-green-300 dark:border-green-700 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              k &gt; 1
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <ZoomIn className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="font-bold text-green-800 dark:text-green-200">Ampliación</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              La imagen es más grande que el original
            </p>
          </div>

          {/* 0 < k < 1 */}
          <div className="bg-orange-100 dark:bg-orange-900/40 border-2 border-orange-300 dark:border-orange-700 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              0 &lt; k &lt; 1
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <ZoomOut className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <span className="font-bold text-orange-800 dark:text-orange-200">Reducción</span>
            </div>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              La imagen es más pequeña que el original
            </p>
          </div>

          {/* k < 0 */}
          <div className="bg-purple-100 dark:bg-purple-900/40 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              k &lt; 0
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="font-bold text-purple-800 dark:text-purple-200">Inversión</span>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              La imagen está al lado opuesto del centro
            </p>
          </div>
        </div>

        {/* Properties of figures */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
            Propiedades de las Figuras
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <span className="text-2xl">📐</span>
              <div>
                <h5 className="font-bold text-blue-800 dark:text-blue-200">Los ángulos se conservan</h5>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  La figura imagen es <strong>semejante</strong> a la original
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <span className="text-2xl">📏</span>
              <div>
                <h5 className="font-bold text-teal-800 dark:text-teal-200">Las distancias se multiplican por |k|</h5>
                <p className="text-sm text-teal-700 dark:text-teal-300">
                  Si k = 2, todos los lados miden el doble
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <span className="text-2xl">⬛</span>
              <div>
                <h5 className="font-bold text-purple-800 dark:text-purple-200">El área se multiplica por k²</h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Si k = 2, el área es 4 veces mayor (2² = 4).
                  ¿Por qué? Porque AMBAS dimensiones (ancho y alto) se multiplican por k.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
