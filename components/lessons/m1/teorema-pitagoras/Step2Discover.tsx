'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Lightbulb, RotateCcw, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';

interface Triangle {
  a: number;
  b: number;
  c: number;
  name: string;
}

const TRIANGLES: Triangle[] = [
  { a: 3, b: 4, c: 5, name: 'El Clásico' },
  { a: 5, b: 12, c: 13, name: 'El Grande' },
  { a: 6, b: 8, c: 10, name: 'El Doble' },
  { a: 8, b: 15, c: 17, name: 'El Desafío' },
];

export default function Step2Discover({ onComplete, isActive }: LessonStepProps) {
  const [currentTriangle, setCurrentTriangle] = useState(0);
  const [showAreas, setShowAreas] = useState(false);
  const [discoveredPattern, setDiscoveredPattern] = useState(false);
  const [checkedTriangles, setCheckedTriangles] = useState<Set<number>>(new Set());

  const triangle = TRIANGLES[currentTriangle];

  // Calculate areas
  const areaA = triangle.a * triangle.a;
  const areaB = triangle.b * triangle.b;
  const areaC = triangle.c * triangle.c;

  // Scale factor for SVG
  const maxSide = Math.max(...TRIANGLES.map(t => t.c));
  const scale = 180 / maxSide;

  // Triangle vertices (right angle at origin)
  const scaledA = triangle.a * scale;
  const scaledB = triangle.b * scale;

  const handleCheckAreas = () => {
    setShowAreas(true);
    setCheckedTriangles(prev => new Set([...prev, currentTriangle]));

    // Check if discovered pattern (after checking at least 2 triangles)
    if (checkedTriangles.size >= 1 && !discoveredPattern) {
      setTimeout(() => {
        setDiscoveredPattern(true);
      }, 1500);
    }
  };

  const handleNextTriangle = () => {
    setShowAreas(false);
    setCurrentTriangle(prev => (prev + 1) % TRIANGLES.length);
  };

  const handleReset = () => {
    setShowAreas(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora diferentes triángulos rectángulos y encuentra qué tienen en común
        </p>
      </div>

      {/* Triangle selector */}
      <div className="flex justify-center gap-2">
        {TRIANGLES.map((t, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentTriangle(i);
              setShowAreas(false);
            }}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-all',
              currentTriangle === i
                ? 'bg-green-500 text-white'
                : checkedTriangles.has(i)
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {t.name}
            {checkedTriangles.has(i) && <Check size={14} className="inline ml-1" />}
          </button>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Triángulos explorados: {checkedTriangles.size} / {TRIANGLES.length}
      </div>

      {/* Interactive Triangle Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
        <div className="flex justify-center">
          <svg viewBox="-50 -50 400 320" className="w-full max-w-lg h-80">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x="-50" y="-50" width="400" height="320" fill="url(#grid)" className="dark:opacity-20" />

            {/* Square on side a (vertical, left) */}
            <g className={cn('transition-all duration-500', showAreas ? 'opacity-100' : 'opacity-30')}>
              <rect
                x={-scaledA}
                y={0}
                width={scaledA}
                height={scaledA}
                fill="#3B82F6"
                fillOpacity={showAreas ? 0.3 : 0.1}
                stroke="#3B82F6"
                strokeWidth="2"
              />
              {showAreas && (
                <text
                  x={-scaledA / 2}
                  y={scaledA / 2 + 5}
                  textAnchor="middle"
                  className="text-lg font-bold fill-blue-600"
                >
                  {areaA}
                </text>
              )}
            </g>

            {/* Square on side b (horizontal, bottom) */}
            <g className={cn('transition-all duration-500', showAreas ? 'opacity-100' : 'opacity-30')}>
              <rect
                x={0}
                y={scaledA}
                width={scaledB}
                height={scaledB}
                fill="#10B981"
                fillOpacity={showAreas ? 0.3 : 0.1}
                stroke="#10B981"
                strokeWidth="2"
              />
              {showAreas && (
                <text
                  x={scaledB / 2}
                  y={scaledA + scaledB / 2 + 5}
                  textAnchor="middle"
                  className="text-lg font-bold fill-green-600"
                >
                  {areaB}
                </text>
              )}
            </g>

            {/* Square on side c (hypotenuse) */}
            <g className={cn('transition-all duration-500', showAreas ? 'opacity-100' : 'opacity-30')}>
              {/* Calculate the hypotenuse square position */}
              {(() => {
                const scaledC = triangle.c * scale;
                // Direction perpendicular to hypotenuse
                const dx = scaledB / Math.sqrt(scaledA * scaledA + scaledB * scaledB);
                const dy = scaledA / Math.sqrt(scaledA * scaledA + scaledB * scaledB);
                // Four corners of the square
                const p1 = { x: 0, y: 0 };
                const p2 = { x: scaledB, y: scaledA };
                const p3 = { x: scaledB + scaledC * dy, y: scaledA - scaledC * dx };
                const p4 = { x: scaledC * dy, y: -scaledC * dx };

                return (
                  <>
                    <polygon
                      points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
                      fill="#F59E0B"
                      fillOpacity={showAreas ? 0.3 : 0.1}
                      stroke="#F59E0B"
                      strokeWidth="2"
                    />
                    {showAreas && (
                      <text
                        x={(p1.x + p2.x + p3.x + p4.x) / 4}
                        y={(p1.y + p2.y + p3.y + p4.y) / 4 + 5}
                        textAnchor="middle"
                        className="text-lg font-bold fill-amber-600"
                      >
                        {areaC}
                      </text>
                    )}
                  </>
                );
              })()}
            </g>

            {/* Triangle */}
            <polygon
              points={`0,0 ${scaledB},${scaledA} 0,${scaledA}`}
              fill="white"
              fillOpacity="0.9"
              stroke="#1F2937"
              strokeWidth="3"
              className="dark:fill-gray-800"
            />

            {/* Right angle marker */}
            <path
              d={`M 0,${scaledA - 15} L 15,${scaledA - 15} L 15,${scaledA}`}
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
            />

            {/* Side labels */}
            <text x={-15} y={scaledA / 2} textAnchor="middle" className="text-base font-bold fill-blue-600">
              a = {triangle.a}
            </text>
            <text x={scaledB / 2} y={scaledA + 20} textAnchor="middle" className="text-base font-bold fill-green-600">
              b = {triangle.b}
            </text>
            <text
              x={scaledB / 2 + 15}
              y={scaledA / 2 - 10}
              textAnchor="middle"
              className="text-base font-bold fill-amber-600"
              transform={`rotate(${Math.atan2(scaledA, scaledB) * 180 / Math.PI}, ${scaledB / 2 + 15}, ${scaledA / 2 - 10})`}
            >
              c = {triangle.c}
            </text>
          </svg>
        </div>

        {/* Side info */}
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span className="text-gray-700 dark:text-gray-300">Cateto a = {triangle.a}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-gray-700 dark:text-gray-300">Cateto b = {triangle.b}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded" />
            <span className="text-gray-700 dark:text-gray-300">Hipotenusa c = {triangle.c}</span>
          </div>
        </div>
      </div>

      {/* Instruction or Areas display */}
      {!showAreas ? (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 text-center">
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            ¿Qué pasa si construimos un <strong>cuadrado</strong> sobre cada lado del triángulo?
          </p>
          <button
            onClick={handleCheckAreas}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            Calcular las Áreas
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          {/* Areas comparison */}
          <div className="bg-gradient-to-r from-blue-50 via-green-50 to-amber-50 dark:from-blue-900/30 dark:via-green-900/30 dark:to-amber-900/30 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-500 text-white rounded-lg font-bold">{areaA}</span>
                <span className="text-gray-600 dark:text-gray-300">+</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded-lg font-bold">{areaB}</span>
              </div>
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">=</span>
              <span className="px-3 py-1 bg-purple-500 text-white rounded-lg font-bold text-xl">
                {areaA + areaB}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-lg">
              <span className="text-gray-600 dark:text-gray-300">Área del cuadrado grande:</span>
              <span className="px-3 py-1 bg-amber-500 text-white rounded-lg font-bold">{areaC}</span>
            </div>

            {areaA + areaB === areaC && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full font-bold">
                  <Check size={20} />
                  ¡Son iguales! {areaA} + {areaB} = {areaC}
                </span>
              </div>
            )}
          </div>

          {/* Formula preview */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MathDisplay latex={`${triangle.a}^2 + ${triangle.b}^2 = ${triangle.a * triangle.a} + ${triangle.b * triangle.b} = ${areaC} = ${triangle.c}^2`} />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleNextTriangle}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RotateCcw size={18} />
              <span>Probar Otro</span>
            </button>
          </div>
        </div>
      )}

      {/* Discovery moment */}
      {discoveredPattern && (
        <div className="animate-fadeIn space-y-6">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl p-6 border-2 border-yellow-400">
            <div className="flex items-start gap-3">
              <Sparkles className="w-8 h-8 text-yellow-500 flex-shrink-0 animate-pulse" />
              <div>
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 text-lg mb-2">
                  ¡Descubrimiento!
                </h4>
                <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                  En <strong>todos</strong> los triángulos rectángulos, la suma de las áreas de los cuadrados de los catetos es igual al área del cuadrado de la hipotenusa.
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <MathDisplay latex="a^2 + b^2 = c^2" displayMode />
                </div>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Ver por qué funciona</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Hint if stuck */}
      {showAreas && !discoveredPattern && checkedTriangles.size >= 2 && (
        <div className="text-center">
          <button
            onClick={() => setDiscoveredPattern(true)}
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            <Lightbulb size={16} className="inline mr-1" />
            Ya lo descubrí
          </button>
        </div>
      )}
    </div>
  );
}
