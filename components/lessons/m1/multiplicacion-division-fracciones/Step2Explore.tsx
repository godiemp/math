'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'interactive' | 'pattern' | 'formula';

// Interactive area model grid
function AreaModelGrid({
  rows,
  cols,
  selectedRows,
  selectedCols,
  onCellSelect,
  interactive = false,
}: {
  rows: number;
  cols: number;
  selectedRows: number;
  selectedCols: number;
  onCellSelect?: (row: number, col: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="inline-block border-2 border-gray-400 dark:border-gray-500 rounded-lg overflow-hidden">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const isSelected = row < selectedRows && col < selectedCols;
          const isRowSelected = row < selectedRows;
          const isColSelected = col < selectedCols;

          return (
            <div
              key={i}
              onClick={() => interactive && onCellSelect?.(row, col)}
              onMouseEnter={() => interactive && onCellSelect?.(row, col)}
              className={cn(
                'w-10 h-10 md:w-12 md:h-12 border border-gray-300 dark:border-gray-600 transition-all duration-200',
                isSelected
                  ? 'bg-purple-500 dark:bg-purple-600'
                  : isRowSelected
                    ? 'bg-blue-200 dark:bg-blue-800/50'
                    : isColSelected
                      ? 'bg-orange-200 dark:bg-orange-800/50'
                      : 'bg-gray-100 dark:bg-gray-800',
                interactive && 'cursor-pointer hover:opacity-80 active:scale-95',
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedCols, setSelectedCols] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  if (!isActive) return null;

  const handleCellSelect = (row: number, col: number) => {
    setSelectedRows(row + 1);
    setSelectedCols(col + 1);
    setHasInteracted(true);
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubre la Multiplicacion
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El modelo de area
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Multiplicar fracciones es como encontrar el <strong>area</strong> de un rectangulo.
              Veamos como funciona...
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              Imagina un cuadrado de 1×1 dividido en partes iguales:
            </p>

            <div className="flex justify-center items-center gap-8 flex-wrap">
              {/* Example: 2/3 × 3/4 */}
              <div className="text-center">
                <div className="mb-2">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">2/3</span>
                  <span className="text-gray-400 mx-2">×</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">3/4</span>
                </div>
                <AreaModelGrid rows={3} cols={4} selectedRows={2} selectedCols={3} />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">6</span> de{' '}
                  <span className="font-bold">12</span> cuadros = <span className="text-purple-600 dark:text-purple-400 font-bold">6/12 = 1/2</span>
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-center">
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                <strong>El area morada</strong> = numeradores multiplicados / denominadores multiplicados
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-xs mt-1">
                (2×3) / (3×4) = 6/12 = 1/2
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('interactive')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Probar tu mismo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: INTERACTIVE ============
  if (phase === 'interactive') {
    const totalCells = 5 * 5;
    const selectedCells = selectedRows * selectedCols;

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubre la Multiplicacion
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Pruebalo tu!
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Hand className="w-5 h-5 text-gray-500" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Toca un cuadro para seleccionar
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <AreaModelGrid
              rows={5}
              cols={5}
              selectedRows={selectedRows}
              selectedCols={selectedCols}
              onCellSelect={handleCellSelect}
              interactive
            />
          </div>

          {/* Current selection info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex justify-center items-center gap-4 text-xl font-bold flex-wrap">
              <span className="text-orange-600 dark:text-orange-400">{selectedRows}/5</span>
              <span className="text-gray-400">×</span>
              <span className="text-blue-600 dark:text-blue-400">{selectedCols}/5</span>
              <span className="text-gray-400">=</span>
              <span className="text-purple-600 dark:text-purple-400">
                {selectedCells}/{totalCells}
              </span>
            </div>

            {selectedCells > 0 && (
              <div className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="text-orange-600 dark:text-orange-400">{selectedRows}</span> ×{' '}
                  <span className="text-blue-600 dark:text-blue-400">{selectedCols}</span> ={' '}
                  <span className="text-purple-600 dark:text-purple-400">{selectedCells}</span> cuadros morados
                </p>
                <p>
                  <span className="text-gray-500">5</span> ×{' '}
                  <span className="text-gray-500">5</span> ={' '}
                  <span className="text-gray-500">{totalCells}</span> cuadros en total
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('pattern')}
            disabled={!hasInteracted}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
              hasInteracted
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
            )}
          >
            <span>Ver el patron</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: PATTERN ============
  if (phase === 'pattern') {
    const examples = [
      { n1: 1, d1: 2, n2: 1, d2: 3, result: '1/6' },
      { n1: 2, d1: 3, n2: 1, d2: 4, result: '2/12 = 1/6' },
      { n1: 3, d1: 4, n2: 2, d2: 5, result: '6/20 = 3/10' },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubre la Multiplicacion
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Ves el patron?
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="space-y-4">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
              >
                <div className="flex items-center justify-center gap-2 flex-wrap text-lg">
                  <div className="text-center">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">{ex.n1}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold">{ex.d1}</span>
                  </div>
                  <span className="text-gray-400 mx-1">×</span>
                  <div className="text-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{ex.n2}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{ex.d2}</span>
                  </div>
                  <span className="text-gray-400 mx-1">=</span>
                  <div className="text-center">
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      ({ex.n1}×{ex.n2})
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      ({ex.d1}×{ex.d2})
                    </span>
                  </div>
                  <span className="text-gray-400 mx-1">=</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    {ex.result}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/50 rounded-xl border border-green-300 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 text-center">
              ¡El Patron!
            </h4>
            <p className="text-center text-green-700 dark:text-green-300">
              <strong>Numerador</strong> del resultado = numerador × numerador
            </p>
            <p className="text-center text-green-700 dark:text-green-300">
              <strong>Denominador</strong> del resultado = denominador × denominador
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('formula')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Ver la formula</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: FORMULA ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre la Multiplicacion
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          La formula oficial
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
        {/* The Formula */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-4">
            Multiplicacion de Fracciones
          </h3>

          <div className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-orange-600 dark:text-orange-400">a</span>
            <span className="text-gray-400">/</span>
            <span className="text-orange-600 dark:text-orange-400">b</span>
            <span className="text-gray-400 mx-3">×</span>
            <span className="text-blue-600 dark:text-blue-400">c</span>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 dark:text-blue-400">d</span>
            <span className="text-gray-400 mx-3">=</span>
            <span className="text-purple-600 dark:text-purple-400">a×c</span>
            <span className="text-gray-400">/</span>
            <span className="text-purple-600 dark:text-purple-400">b×d</span>
          </div>

          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <p>Multiplica <span className="text-orange-600 dark:text-orange-400 font-bold">numeradores</span> entre si</p>
            <p>Multiplica <span className="text-orange-600 dark:text-orange-400 font-bold">denominadores</span> entre si</p>
          </div>
        </div>

        {/* Key points */}
        <div className="mt-4 space-y-2">
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span> No necesitas denominador comun
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span> Puedes simplificar antes O despues de multiplicar
            </p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span> Es la operacion mas simple con fracciones
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
