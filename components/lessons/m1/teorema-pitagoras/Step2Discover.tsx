'use client';

import { useState } from 'react';
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

  if (!isActive) return null;

  // Scale for squares visualization (normalize to fit nicely)
  const maxArea = Math.max(areaA, areaB, areaC);
  const squareScale = 80 / Math.sqrt(maxArea);

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

      {/* Main visualization - Side by side layout */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Triangle */}
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
              Triángulo Rectángulo
            </h3>
            <svg viewBox="0 0 160 140" className="w-full max-w-[200px] h-auto">
              {/* Triangle */}
              <polygon
                points="20,120 140,120 20,30"
                fill="#F0FDF4"
                stroke="#059669"
                strokeWidth="3"
              />
              {/* Right angle marker */}
              <path
                d="M 20,105 L 35,105 L 35,120"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
              />
              {/* Side a (vertical) */}
              <line x1="20" y1="30" x2="20" y2="120" stroke="#3B82F6" strokeWidth="4" />
              <text x="8" y="80" className="text-sm font-bold fill-blue-600">a</text>

              {/* Side b (horizontal) */}
              <line x1="20" y1="120" x2="140" y2="120" stroke="#10B981" strokeWidth="4" />
              <text x="80" y="135" textAnchor="middle" className="text-sm font-bold fill-green-600">b</text>

              {/* Side c (hypotenuse) */}
              <line x1="20" y1="30" x2="140" y2="120" stroke="#F59E0B" strokeWidth="4" />
              <text x="90" y="65" className="text-sm font-bold fill-amber-600">c</text>
            </svg>

            {/* Side values */}
            <div className="flex gap-4 mt-4 text-sm">
              <span className="text-blue-600 font-semibold">a = {triangle.a}</span>
              <span className="text-green-600 font-semibold">b = {triangle.b}</span>
              <span className="text-amber-600 font-semibold">c = {triangle.c}</span>
            </div>
          </div>

          {/* Right: Squares representing areas */}
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
              Cuadrados sobre cada lado
            </h3>

            <div className="flex items-end justify-center gap-3">
              {/* Square a² */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'bg-blue-500 rounded transition-all duration-500',
                    showAreas ? 'opacity-100' : 'opacity-30'
                  )}
                  style={{
                    width: Math.sqrt(areaA) * squareScale,
                    height: Math.sqrt(areaA) * squareScale,
                  }}
                />
                <span className="text-xs text-blue-600 font-semibold mt-1">a²</span>
                {showAreas && (
                  <span className="text-lg font-bold text-blue-600 animate-fadeIn">{areaA}</span>
                )}
              </div>

              {/* Plus sign */}
              <span className={cn(
                'text-2xl font-bold text-gray-400 mb-8 transition-opacity',
                showAreas ? 'opacity-100' : 'opacity-30'
              )}>+</span>

              {/* Square b² */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'bg-green-500 rounded transition-all duration-500',
                    showAreas ? 'opacity-100' : 'opacity-30'
                  )}
                  style={{
                    width: Math.sqrt(areaB) * squareScale,
                    height: Math.sqrt(areaB) * squareScale,
                  }}
                />
                <span className="text-xs text-green-600 font-semibold mt-1">b²</span>
                {showAreas && (
                  <span className="text-lg font-bold text-green-600 animate-fadeIn">{areaB}</span>
                )}
              </div>

              {/* Equals sign */}
              <span className={cn(
                'text-2xl font-bold text-gray-400 mb-8 transition-opacity',
                showAreas ? 'opacity-100' : 'opacity-30'
              )}>=</span>

              {/* Square c² */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'bg-amber-500 rounded transition-all duration-500',
                    showAreas ? 'opacity-100' : 'opacity-30'
                  )}
                  style={{
                    width: Math.sqrt(areaC) * squareScale,
                    height: Math.sqrt(areaC) * squareScale,
                  }}
                />
                <span className="text-xs text-amber-600 font-semibold mt-1">c²</span>
                {showAreas && (
                  <span className="text-lg font-bold text-amber-600 animate-fadeIn">{areaC}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruction or Areas display */}
      {!showAreas ? (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 text-center">
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Si construimos un <strong>cuadrado</strong> sobre cada lado del triángulo,
            ¿qué relación tendrán sus áreas?
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
            <div className="flex flex-col items-center gap-4">
              {/* Visual equation */}
              <div className="flex items-center gap-3 text-lg flex-wrap justify-center">
                <span className="px-3 py-1 bg-blue-500 text-white rounded-lg font-bold">{areaA}</span>
                <span className="text-gray-600 dark:text-gray-300 font-bold">+</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded-lg font-bold">{areaB}</span>
                <span className="text-gray-600 dark:text-gray-300 font-bold">=</span>
                <span className="px-3 py-1 bg-purple-500 text-white rounded-lg font-bold text-xl">
                  {areaA + areaB}
                </span>
              </div>

              {/* Comparison with c² */}
              <div className="flex items-center gap-2 text-lg">
                <span className="text-gray-600 dark:text-gray-300">Área de c² =</span>
                <span className="px-3 py-1 bg-amber-500 text-white rounded-lg font-bold">{areaC}</span>
              </div>

              {/* Success message */}
              {areaA + areaB === areaC && (
                <div className="mt-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full font-bold">
                    <Check size={20} />
                    ¡Son iguales! a² + b² = c²
                  </span>
                </div>
              )}
            </div>

            {/* Formula */}
            <div className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <MathDisplay latex={`${triangle.a}^2 + ${triangle.b}^2 = ${areaA} + ${areaB} = ${areaC} = ${triangle.c}^2`} />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleNextTriangle}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RotateCcw size={18} />
              <span>Probar Otro Triángulo</span>
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
                  En <strong>todos</strong> los triángulos rectángulos que probaste,
                  la suma de las áreas de los cuadrados pequeños (a² + b²) es <strong>siempre igual</strong> al
                  área del cuadrado grande (c²).
                </p>
                <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                  Esto no es coincidencia. Es una ley matemática que funciona para
                  <strong> cualquier</strong> triángulo rectángulo:
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
              <span>¿Por qué siempre funciona?</span>
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
