'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import {
  buildRegularPolygon,
  regularExteriorAngle,
  polygonPath,
  getPolygonName,
} from '@/lib/geometry/polygonUtils';

const CENTER_X = 140;
const CENTER_Y = 120;
const RADIUS = 70;

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [sides, setSides] = useState(5);
  const [visitedSides, setVisitedSides] = useState<Set<number>>(new Set([5]));
  const [showInsight, setShowInsight] = useState(false);

  // Build polygon vertices
  const vertices = useMemo(
    () => buildRegularPolygon(sides, RADIUS, CENTER_X, CENTER_Y, -90),
    [sides]
  );

  const exteriorAngle = regularExteriorAngle(sides);
  const polygonName = getPolygonName(sides);

  // Track visited polygon sizes
  const handleSidesChange = (newSides: number) => {
    setSides(newSides);
    setVisitedSides((prev) => new Set([...prev, newSides]));

    // Show insight after trying 3 different polygons
    if (visitedSides.size >= 2 && !visitedSides.has(newSides)) {
      setTimeout(() => setShowInsight(true), 500);
    }
  };

  const canContinue = visitedSides.size >= 3;

  if (!isActive) return null;

  // Render all exterior angles
  const renderExteriorAngles = () => {
    return vertices.map((v, i) => {
      const n = sides;
      const prev = vertices[(i - 1 + n) % n];
      const next = vertices[(i + 1) % n];

      // Direction from prev to current vertex (extended)
      const dx1 = v.x - prev.x;
      const dy1 = v.y - prev.y;
      const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

      // Extended point
      const extLen = 25;
      const extX = v.x + (dx1 / len1) * extLen;
      const extY = v.y + (dy1 / len1) * extLen;

      // Direction to next vertex
      const dx2 = next.x - v.x;
      const dy2 = next.y - v.y;
      const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      // Point along next edge
      const nextX = v.x + (dx2 / len2) * 20;
      const nextY = v.y + (dy2 / len2) * 20;

      // Calculate arc
      const arcRadius = 14;
      const angle1 = Math.atan2(extY - v.y, extX - v.x);
      const angle2 = Math.atan2(nextY - v.y, nextX - v.x);

      // Arc path
      const startX = v.x + arcRadius * Math.cos(angle1);
      const startY = v.y + arcRadius * Math.sin(angle1);
      const endX = v.x + arcRadius * Math.cos(angle2);
      const endY = v.y + arcRadius * Math.sin(angle2);

      // Determine sweep direction
      let angleDiff = angle2 - angle1;
      if (angleDiff < 0) angleDiff += 2 * Math.PI;
      const largeArc = angleDiff > Math.PI ? 1 : 0;
      const sweep = 1;

      return (
        <g key={`ext-${i}`}>
          {/* Extended line (dashed) */}
          <line
            x1={v.x}
            y1={v.y}
            x2={extX}
            y2={extY}
            stroke="#9ca3af"
            strokeWidth="1"
            strokeDasharray="3,2"
            className="dark:stroke-gray-500"
          />
          {/* Exterior angle arc */}
          <path
            d={`M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArc} ${sweep} ${endX} ${endY}`}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            className="dark:stroke-red-400"
          />
          {/* Angle fill */}
          <path
            d={`M ${v.x} ${v.y} L ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArc} ${sweep} ${endX} ${endY} Z`}
            fill="rgba(239, 68, 68, 0.15)"
            className="dark:fill-red-500/20"
          />
        </g>
      );
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Prueba con diferentes polígonos
        </p>
      </div>

      {/* Slider control */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Número de lados:</span>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {sides} ({polygonName})
          </span>
        </div>
        <input
          type="range"
          min="3"
          max="12"
          step="1"
          value={sides}
          onChange={(e) => handleSidesChange(parseInt(e.target.value))}
          className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>3</span>
          <span>6</span>
          <span>9</span>
          <span>12</span>
        </div>
      </div>

      {/* Polygon visualization */}
      <div className="flex justify-center">
        <svg viewBox="0 0 280 240" className="w-full max-w-xs">
          {/* Polygon */}
          <path
            d={polygonPath(vertices)}
            fill="rgba(59, 130, 246, 0.1)"
            stroke="#3b82f6"
            strokeWidth="2"
            className="dark:stroke-blue-400 dark:fill-blue-500/10"
          />

          {/* Exterior angles */}
          {renderExteriorAngles()}

          {/* Vertex dots */}
          {vertices.map((v, i) => (
            <circle
              key={`dot-${i}`}
              cx={v.x}
              cy={v.y}
              r="3"
              fill="#3b82f6"
              className="dark:fill-blue-400"
            />
          ))}
        </svg>
      </div>

      {/* Calculations */}
      <div className="space-y-3">
        {/* Exterior angle formula */}
        <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
          <div className="flex items-center justify-between">
            <span className="text-red-700 dark:text-red-300 font-medium">Ángulo exterior:</span>
            <span className="text-red-800 dark:text-red-200 font-bold text-lg">
              360° ÷ {sides} = {exteriorAngle.toFixed(1)}°
            </span>
          </div>
        </div>

        {/* Sum calculation */}
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <span className="text-green-700 dark:text-green-300 font-medium">
              Suma de exteriores:
            </span>
            <span className="text-green-800 dark:text-green-200 font-bold text-lg">
              {sides} × {exteriorAngle.toFixed(1)}° ={' '}
              <span className="text-xl">360°</span>
            </span>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Polígonos probados:</span>
          <div className="flex gap-1">
            {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <div
                key={n}
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all',
                  visitedSides.has(n)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                )}
              >
                {visitedSides.has(n) ? <Check size={12} /> : n}
              </div>
            ))}
          </div>
        </div>
        {!canContinue && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Prueba al menos 3 polígonos diferentes para continuar
          </p>
        )}
      </div>

      {/* Insight box */}
      {showInsight && (
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border-2 border-purple-300 dark:border-purple-600 animate-fadeIn">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2 text-center">
            ¡Patrón Descubierto!
          </h4>
          <p className="text-purple-700 dark:text-purple-300 text-center">
            Sin importar cuántos lados tenga el polígono, la{' '}
            <strong>suma de los ángulos exteriores siempre es 360°</strong>.
          </p>
          <div className="mt-3 text-center">
            <span className="inline-block bg-purple-200 dark:bg-purple-800 px-4 py-2 rounded-lg text-purple-900 dark:text-purple-100 font-mono font-bold">
              Σ ext = 360° (siempre)
            </span>
          </div>
        </div>
      )}

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          disabled={!canContinue}
          className={cn(
            'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
            canContinue
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          )}
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
