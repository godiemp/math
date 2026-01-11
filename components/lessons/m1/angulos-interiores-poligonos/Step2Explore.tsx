'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { PolygonFigure } from '@/components/figures/PolygonFigure';

type Phase = 'intro' | 'interactive' | 'pattern';

const POLYGON_NAMES: Record<number, string> = {
  3: 'Triángulo',
  4: 'Cuadrilátero',
  5: 'Pentágono',
  6: 'Hexágono',
  7: 'Heptágono',
  8: 'Octágono',
  9: 'Eneágono',
  10: 'Decágono',
  11: 'Endecágono',
  12: 'Dodecágono',
};

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [sides, setSides] = useState(3);
  const [showDiagonals, setShowDiagonals] = useState(true);
  const [exploredSides, setExploredSides] = useState<Set<number>>(new Set([3]));
  const [patternAnswer, setPatternAnswer] = useState<number | null>(null);
  const [showPatternFeedback, setShowPatternFeedback] = useState(false);

  if (!isActive) return null;

  // Track explored polygons
  useEffect(() => {
    if (phase === 'interactive') {
      setExploredSides((prev) => new Set([...prev, sides]));
    }
  }, [sides, phase]);

  // Helper to get diagonals from vertex 0
  const getDiagonalsFromVertex0 = (n: number) => {
    const diagonals = [];
    for (let i = 2; i < n - 1; i++) {
      diagonals.push({ from: 0, to: i, color: '#dc2626', strokeStyle: 'dashed' as const });
    }
    return diagonals;
  };

  const triangles = sides - 2;
  const sum = triangles * 180;
  const hasExploredEnough = exploredSides.size >= 4;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubre el Patrón
          </h2>
          <p className="text-gray-600 dark:text-gray-300">La clave está en los triángulos</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Vamos a descubrir algo increíble...
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-700">
            <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
              Todo polígono se puede dividir en <strong>triángulos</strong> trazando líneas desde
              un solo vértice.
            </p>

            <div className="flex justify-center gap-6">
              <div className="text-center">
                <PolygonFigure
                  fromRegular={{ sides: 5, radius: 45, centerX: 55, centerY: 50 }}
                  fill="rgba(147, 51, 234, 0.1)"
                  stroke="rgb(147, 51, 234)"
                  strokeWidth={2}
                  diagonals={getDiagonalsFromVertex0(5)}
                  width={110}
                  height={100}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  5 lados → 3 triángulos
                </p>
              </div>
              <div className="text-center">
                <PolygonFigure
                  fromRegular={{ sides: 6, radius: 45, centerX: 55, centerY: 50 }}
                  fill="rgba(147, 51, 234, 0.1)"
                  stroke="rgb(147, 51, 234)"
                  strokeWidth={2}
                  diagonals={getDiagonalsFromVertex0(6)}
                  width={110}
                  height={100}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  6 lados → 4 triángulos
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-4 text-center">
            ¿Cuántos triángulos se forman en cada caso? ¡Vamos a explorar!
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('interactive')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Empezar a explorar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ INTERACTIVE ============
  if (phase === 'interactive') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Explora los Polígonos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Mueve el control para cambiar el número de lados
          </p>
        </div>

        {/* Main polygon display */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <PolygonFigure
              fromRegular={{ sides, radius: 80, centerX: 100, centerY: 90 }}
              fill="rgba(147, 51, 234, 0.15)"
              stroke="rgb(147, 51, 234)"
              strokeWidth={3}
              diagonals={showDiagonals ? getDiagonalsFromVertex0(sides) : []}
              width={200}
              height={180}
            />
          </div>

          {/* Slider control */}
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>3 lados</span>
              <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">
                {sides} lados
              </span>
              <span>12 lados</span>
            </div>
            <input
              type="range"
              min={3}
              max={12}
              step={1}
              value={sides}
              onChange={(e) => setSides(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Toggle diagonals */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowDiagonals(!showDiagonals)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all text-sm',
                showDiagonals
                  ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              {showDiagonals ? 'Ocultar diagonales' : 'Mostrar diagonales'}
            </button>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Polígono</p>
            <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
              {POLYGON_NAMES[sides]}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">n = {sides}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 text-center">
            <p className="text-sm text-red-600 dark:text-red-400 mb-1">Triángulos</p>
            <p className="text-xl font-bold text-red-800 dark:text-red-200">{triangles}</p>
            <p className="text-sm text-red-600 dark:text-red-400">n - 2 = {triangles}</p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">
            Suma de ángulos interiores
          </p>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">
            ({sides} - 2) × 180° = <span className="text-green-600 dark:text-green-400">{sum}°</span>
          </p>
        </div>

        {/* Progress indicator */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Polígonos explorados: {exploredSides.size} de 10
          </p>
          <div className="flex justify-center gap-1">
            {Array.from({ length: 10 }, (_, i) => i + 3).map((n) => (
              <div
                key={n}
                className={cn(
                  'w-3 h-3 rounded-full transition-all',
                  exploredSides.has(n)
                    ? 'bg-purple-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            ))}
          </div>
        </div>

        {/* Next button - only appears after exploring enough */}
        <div className="flex justify-center">
          <button
            onClick={() => setPhase('pattern')}
            disabled={!hasExploredEnough}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
              hasExploredEnough
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>{hasExploredEnough ? '¡Ya entendí el patrón!' : 'Explora más polígonos...'}</span>
            {hasExploredEnough && <ArrowRight size={20} />}
          </button>
        </div>

        {!hasExploredEnough && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Explora al menos 4 polígonos diferentes para continuar
          </p>
        )}
      </div>
    );
  }

  // ============ PATTERN ============
  const handleCheckPattern = () => {
    setShowPatternFeedback(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Cuál es el Patrón?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Confirma lo que descubriste</p>
      </div>

      {/* Summary table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg overflow-x-auto">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 px-2 text-gray-600 dark:text-gray-400">Polígono</th>
              <th className="py-2 px-2 text-gray-600 dark:text-gray-400">Lados (n)</th>
              <th className="py-2 px-2 text-gray-600 dark:text-gray-400">Triángulos</th>
              <th className="py-2 px-2 text-gray-600 dark:text-gray-400">Suma</th>
            </tr>
          </thead>
          <tbody>
            {[3, 4, 5, 6].map((n) => (
              <tr key={n} className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 px-2 text-gray-800 dark:text-gray-200">{POLYGON_NAMES[n]}</td>
                <td className="py-2 px-2 text-blue-600 dark:text-blue-400 font-bold">{n}</td>
                <td className="py-2 px-2 text-red-600 dark:text-red-400 font-bold">{n - 2}</td>
                <td className="py-2 px-2 text-green-600 dark:text-green-400 font-bold">
                  {(n - 2) * 180}°
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pattern question */}
      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
        <p className="text-amber-800 dark:text-amber-200 text-center font-medium mb-3">
          ¿Qué relación hay entre el número de lados (n) y el número de triángulos?
        </p>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'n - 1', value: 0 },
            { label: 'n - 2', value: 1 },
            { label: 'n - 3', value: 2 },
            { label: 'n ÷ 2', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setPatternAnswer(option.value)}
              disabled={showPatternFeedback}
              className={cn(
                'p-3 rounded-lg font-semibold transition-all border-2',
                patternAnswer === option.value
                  ? showPatternFeedback
                    ? option.value === 1
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                    : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500'
                  : showPatternFeedback && option.value === 1
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-white dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {showPatternFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl animate-fadeIn',
            patternAnswer === 1
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
          )}
        >
          <div className="flex items-start gap-3">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-green-800 dark:text-green-300 mb-1">
                {patternAnswer === 1 ? '¡Exacto!' : 'La respuesta correcta es n - 2'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Un polígono de <strong>n lados</strong> se divide en{' '}
                <strong>(n - 2) triángulos</strong>.
              </p>
              <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-3 text-center border-2 border-green-300 dark:border-green-600">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">La fórmula:</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  Suma = (n - 2) × 180°
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        {!showPatternFeedback ? (
          <button
            onClick={handleCheckPattern}
            disabled={patternAnswer === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              patternAnswer !== null
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
