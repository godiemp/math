'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, Triangle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { PolygonFigure } from '@/components/figures/PolygonFigure';

type Phase = 'intro' | 'triangle' | 'quadrilateral' | 'pentagon' | 'hexagon' | 'pattern' | 'formula';

interface PolygonData {
  sides: number;
  name: string;
  triangles: number;
  sum: number;
}

const POLYGON_DATA: PolygonData[] = [
  { sides: 3, name: 'Triángulo', triangles: 1, sum: 180 },
  { sides: 4, name: 'Cuadrilátero', triangles: 2, sum: 360 },
  { sides: 5, name: 'Pentágono', triangles: 3, sum: 540 },
  { sides: 6, name: 'Hexágono', triangles: 4, sum: 720 },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showDiagonals, setShowDiagonals] = useState(false);
  const [patternAnswer, setPatternAnswer] = useState<number | null>(null);
  const [showPatternFeedback, setShowPatternFeedback] = useState(false);

  if (!isActive) return null;

  // Helper to get diagonals from vertex 0
  const getDiagonalsFromVertex0 = (sides: number) => {
    const diagonals = [];
    for (let i = 2; i < sides - 1; i++) {
      diagonals.push({ from: 0, to: i, color: '#dc2626', strokeStyle: 'dashed' as const });
    }
    return diagonals;
  };

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubre el Patrón
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            La clave está en los triángulos
          </p>
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
              Todo polígono se puede dividir en <strong>triángulos</strong> trazando líneas desde un solo vértice.
            </p>

            <div className="flex justify-center gap-4">
              <div className="text-center">
                <PolygonFigure
                  fromRegular={{ sides: 5, radius: 40, centerX: 50, centerY: 45 }}
                  fill="rgba(147, 51, 234, 0.1)"
                  stroke="rgb(147, 51, 234)"
                  strokeWidth={2}
                  diagonals={getDiagonalsFromVertex0(5)}
                  width={100}
                  height={90}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pentágono</p>
              </div>
              <div className="text-center">
                <PolygonFigure
                  fromRegular={{ sides: 6, radius: 40, centerX: 50, centerY: 45 }}
                  fill="rgba(147, 51, 234, 0.1)"
                  stroke="rgb(147, 51, 234)"
                  strokeWidth={2}
                  diagonals={getDiagonalsFromVertex0(6)}
                  width={100}
                  height={90}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hexágono</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-4 text-center">
            ¿Cuántos triángulos se forman en cada caso? ¡Vamos a investigar!
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('triangle')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Empezar con el triángulo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ TRIANGLE ============
  if (phase === 'triangle') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Triángulo (3 lados)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Nuestro punto de partida
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <PolygonFigure
              fromRegular={{ sides: 3, radius: 70, centerX: 90, centerY: 80 }}
              fill="rgba(59, 130, 246, 0.2)"
              stroke="rgb(59, 130, 246)"
              strokeWidth={3}
              angles={[
                { showArc: true, color: '#f59e0b', arcRadius: 18 },
                { showArc: true, color: '#f59e0b', arcRadius: 18 },
                { showArc: true, color: '#f59e0b', arcRadius: 18 },
              ]}
              width={180}
              height={160}
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Triangle className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800 dark:text-blue-200">
                Dato conocido:
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              La suma de los ángulos interiores de un triángulo es siempre:
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              180°
            </p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center">
            <strong>El triángulo es 1 triángulo.</strong> Suma = 1 × 180° = 180°
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('quadrilateral')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
          >
            <span>Siguiente: Cuadrilátero</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ QUADRILATERAL ============
  if (phase === 'quadrilateral') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Cuadrilátero (4 lados)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuántos triángulos se forman?
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <PolygonFigure
              fromRegular={{ sides: 4, radius: 65, centerX: 85, centerY: 75 }}
              fill="rgba(34, 197, 94, 0.2)"
              stroke="rgb(34, 197, 94)"
              strokeWidth={3}
              diagonals={showDiagonals ? [{ from: 0, to: 2, color: '#dc2626', strokeStyle: 'dashed' }] : []}
              width={170}
              height={150}
            />
          </div>

          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowDiagonals(!showDiagonals)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all',
                showDiagonals
                  ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              {showDiagonals ? 'Ocultar diagonal' : 'Trazar diagonal'}
            </button>
          </div>

          {showDiagonals && (
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center animate-fadeIn">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Al trazar una diagonal desde un vértice, se forman:
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                2 triángulos
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Suma de ángulos = 2 × 180° = <strong>360°</strong>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setShowDiagonals(false);
              setPhase('pentagon');
            }}
            disabled={!showDiagonals}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
              showDiagonals
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>Siguiente: Pentágono</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PENTAGON ============
  if (phase === 'pentagon') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Pentágono (5 lados)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Ves el patrón emergiendo?
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <PolygonFigure
              fromRegular={{ sides: 5, radius: 65, centerX: 85, centerY: 75 }}
              fill="rgba(168, 85, 247, 0.2)"
              stroke="rgb(168, 85, 247)"
              strokeWidth={3}
              diagonals={showDiagonals ? getDiagonalsFromVertex0(5) : []}
              width={170}
              height={150}
            />
          </div>

          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowDiagonals(!showDiagonals)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all',
                showDiagonals
                  ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              {showDiagonals ? 'Ocultar diagonales' : 'Trazar diagonales'}
            </button>
          </div>

          {showDiagonals && (
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center animate-fadeIn">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Al trazar diagonales desde un vértice, se forman:
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                3 triángulos
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Suma de ángulos = 3 × 180° = <strong>540°</strong>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setShowDiagonals(false);
              setPhase('hexagon');
            }}
            disabled={!showDiagonals}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
              showDiagonals
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>Siguiente: Hexágono</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ HEXAGON ============
  if (phase === 'hexagon') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Hexágono (6 lados)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Ya casi descubrimos el patrón!
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <PolygonFigure
              fromRegular={{ sides: 6, radius: 65, centerX: 85, centerY: 75 }}
              fill="rgba(236, 72, 153, 0.2)"
              stroke="rgb(236, 72, 153)"
              strokeWidth={3}
              diagonals={showDiagonals ? getDiagonalsFromVertex0(6) : []}
              width={170}
              height={150}
            />
          </div>

          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowDiagonals(!showDiagonals)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all',
                showDiagonals
                  ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              {showDiagonals ? 'Ocultar diagonales' : 'Trazar diagonales'}
            </button>
          </div>

          {showDiagonals && (
            <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg p-4 text-center animate-fadeIn">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Al trazar diagonales desde un vértice, se forman:
              </p>
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                4 triángulos
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Suma de ángulos = 4 × 180° = <strong>720°</strong>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setShowDiagonals(false);
              setPhase('pattern');
            }}
            disabled={!showDiagonals}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
              showDiagonals
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>¡Descubrir el patrón!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PATTERN ============
  if (phase === 'pattern') {
    const handleCheckPattern = () => {
      setShowPatternFeedback(true);
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cuál es el Patrón?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Observa la tabla y descúbrelo
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 px-3 text-gray-600 dark:text-gray-400 text-sm">Polígono</th>
                <th className="py-2 px-3 text-gray-600 dark:text-gray-400 text-sm">Lados (n)</th>
                <th className="py-2 px-3 text-gray-600 dark:text-gray-400 text-sm">Triángulos</th>
                <th className="py-2 px-3 text-gray-600 dark:text-gray-400 text-sm">Suma ángulos</th>
              </tr>
            </thead>
            <tbody>
              {POLYGON_DATA.map((p) => (
                <tr key={p.sides} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-3 font-medium text-gray-800 dark:text-gray-200">{p.name}</td>
                  <td className="py-3 px-3 text-blue-600 dark:text-blue-400 font-bold">{p.sides}</td>
                  <td className="py-3 px-3 text-red-600 dark:text-red-400 font-bold">{p.triangles}</td>
                  <td className="py-3 px-3 text-green-600 dark:text-green-400 font-bold">{p.sum}°</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                    : 'bg-white dark:bg-gray-700 border-transparent hover:border-gray-300'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {showPatternFeedback && (
          <div className={cn(
            'p-4 rounded-xl animate-fadeIn',
            patternAnswer === 1
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
          )}>
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-green-800 dark:text-green-300 mb-1">
                  {patternAnswer === 1 ? '¡Exacto!' : 'La respuesta correcta es n - 2'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Un polígono de <strong>n lados</strong> se divide en <strong>(n - 2) triángulos</strong>.
                  <br />
                  Ejemplos: 4 lados → 2 triángulos, 5 lados → 3 triángulos, 6 lados → 4 triángulos.
                </p>
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
              onClick={() => setPhase('formula')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Ver la fórmula</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ FORMULA ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡La Fórmula Descubierta!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ahora puedes calcular ángulos de cualquier polígono
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            La fórmula mágica:
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border-2 border-green-300 dark:border-green-600">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Suma de ángulos interiores =
          </p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            (n - 2) × 180°
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            donde <strong>n</strong> = número de lados
          </p>
        </div>

        <div className="mt-4 space-y-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Triángulo (3 lados):</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">(3-2) × 180° = 180°</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Cuadrilátero (4 lados):</span>
            <span className="font-bold text-green-600 dark:text-green-400">(4-2) × 180° = 360°</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Pentágono (5 lados):</span>
            <span className="font-bold text-purple-600 dark:text-purple-400">(5-2) × 180° = 540°</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Hexágono (6 lados):</span>
            <span className="font-bold text-pink-600 dark:text-pink-400">(6-2) × 180° = 720°</span>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 text-center">
          <strong>Para polígonos regulares:</strong> Cada ángulo = (n-2) × 180° ÷ n
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg"
        >
          <span>Continuar a las fórmulas</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
