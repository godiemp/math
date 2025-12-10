'use client';

import { useState } from 'react';
import { ArrowRight, Grid3X3, Sparkles, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'explore' | 'discover' | 'challenge';

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// TileGrid component - shows a rectangle filled with square tiles
function TileGrid({
  width,
  height,
  tileSize,
  showGrid = true,
}: {
  width: number;
  height: number;
  tileSize: number;
  showGrid?: boolean;
}) {
  const fitsWidth = width % tileSize === 0;
  const fitsHeight = height % tileSize === 0;
  const fitsPerfectly = fitsWidth && fitsHeight;

  const tilesX = Math.floor(width / tileSize);
  const tilesY = Math.floor(height / tileSize);
  const remainderX = width % tileSize;
  const remainderY = height % tileSize;

  const scale = 12; // pixels per unit
  const svgWidth = width * scale + 2;
  const svgHeight = height * scale + 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={svgWidth}
        height={svgHeight}
        className="border-2 border-gray-400 dark:border-gray-500 rounded"
      >
        {/* Background */}
        <rect
          x="1"
          y="1"
          width={width * scale}
          height={height * scale}
          className="fill-gray-100 dark:fill-gray-800"
        />

        {/* Tiles that fit */}
        {Array.from({ length: tilesY }).map((_, row) =>
          Array.from({ length: tilesX }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={1 + col * tileSize * scale}
              y={1 + row * tileSize * scale}
              width={tileSize * scale - 1}
              height={tileSize * scale - 1}
              className={cn(
                'transition-all',
                fitsPerfectly
                  ? 'fill-green-400 dark:fill-green-500 stroke-green-600'
                  : 'fill-blue-300 dark:fill-blue-500 stroke-blue-500',
              )}
              strokeWidth="1"
            />
          ))
        )}

        {/* Remainder area X (if any) */}
        {remainderX > 0 && (
          <rect
            x={1 + tilesX * tileSize * scale}
            y="1"
            width={remainderX * scale}
            height={height * scale}
            className="fill-red-200 dark:fill-red-900/50 stroke-red-400"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
        )}

        {/* Remainder area Y (if any) */}
        {remainderY > 0 && (
          <rect
            x="1"
            y={1 + tilesY * tileSize * scale}
            width={tilesX * tileSize * scale}
            height={remainderY * scale}
            className="fill-red-200 dark:fill-red-900/50 stroke-red-400"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
        )}

        {/* Grid lines */}
        {showGrid && (
          <>
            {Array.from({ length: width + 1 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={1 + i * scale}
                y1="1"
                x2={1 + i * scale}
                y2={1 + height * scale}
                className="stroke-gray-300 dark:stroke-gray-600"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: height + 1 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="1"
                y1={1 + i * scale}
                x2={1 + width * scale}
                y2={1 + i * scale}
                className="stroke-gray-300 dark:stroke-gray-600"
                strokeWidth="0.5"
              />
            ))}
          </>
        )}

        {/* Dimension labels */}
        <text
          x={width * scale / 2}
          y={height * scale + 16}
          className="fill-gray-600 dark:fill-gray-300 text-xs"
          textAnchor="middle"
        >
          {width}
        </text>
        <text
          x={-height * scale / 2}
          y={-6}
          className="fill-gray-600 dark:fill-gray-300 text-xs"
          textAnchor="middle"
          transform="rotate(-90)"
        >
          {height}
        </text>
      </svg>

      <div
        className={cn(
          'text-sm font-medium px-3 py-1 rounded-full',
          fitsPerfectly
            ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
            : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
        )}
      >
        Baldosa {tileSize}×{tileSize}: {fitsPerfectly ? '¡Cabe perfecto!' : 'No cabe'}
      </div>
    </div>
  );
}

export default function Step5ExploreTiles({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [tileSize, setTileSize] = useState(1);
  const [challengeTileSize, setChallengeTileSize] = useState(1);
  const [foundGcd, setFoundGcd] = useState(false);

  // Problem dimensions
  const width1 = 12;
  const height1 = 8;
  const gcd1 = gcd(width1, height1); // 4

  const width2 = 15;
  const height2 = 10;
  const gcd2 = gcd(width2, height2); // 5

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Constructor de Baldosas
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una forma visual de entender el M.C.D.
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="text-center space-y-4">
            <Grid3X3 className="w-16 h-16 mx-auto text-cyan-500" />
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Imagina que tienes un piso rectangular de{' '}
              <strong className="text-cyan-600">{width1} × {height1}</strong> metros.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Quieres cubrirlo con <strong>baldosas cuadradas</strong>,
              sin cortar ninguna baldosa.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-sm mx-auto">
              <p className="text-cyan-700 dark:text-cyan-300 font-medium">
                ¿Cuál es el tamaño de la baldosa más grande que cabe perfectamente?
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('explore')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Explorar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: EXPLORE ============
  if (phase === 'explore') {
    const currentFits = width1 % tileSize === 0 && height1 % tileSize === 0;
    const isMaxTile = tileSize === gcd1;

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Constructor de Baldosas
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Piso de {width1} × {height1} metros - Ajusta el tamaño de baldosa
          </p>
        </div>

        {/* Tile size slider */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setTileSize(Math.max(1, tileSize - 1))}
              disabled={tileSize <= 1}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              <Minus size={20} />
            </button>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {tileSize} × {tileSize}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                metros por baldosa
              </p>
            </div>
            <button
              onClick={() => setTileSize(Math.min(8, tileSize + 1))}
              disabled={tileSize >= 8}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Visual grid */}
        <div className="flex justify-center">
          <TileGrid width={width1} height={height1} tileSize={tileSize} />
        </div>

        {/* Status message */}
        {isMaxTile && !foundGcd && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 border border-yellow-300 dark:border-yellow-700 animate-fadeIn text-center">
            <Sparkles className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-yellow-800 dark:text-yellow-200 font-bold">
              ¡Encontraste la baldosa más grande!
            </p>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              {tileSize} × {tileSize} es el M.C.D.({width1}, {height1})
            </p>
          </div>
        )}

        {/* Hint */}
        {!currentFits && (
          <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-3 text-center">
            <p className="text-red-700 dark:text-red-300 text-sm">
              Las baldosas de {tileSize}×{tileSize} <strong>no caben</strong> perfectamente.
              {remainderInfo(width1, height1, tileSize)}
            </p>
          </div>
        )}

        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setFoundGcd(true);
              setPhase('discover');
            }}
            disabled={!isMaxTile}
            className={cn(
              'flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all',
              isMaxTile
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
            )}
          >
            <span>Ver conexión</span>
            <Sparkles size={18} />
          </button>
        </div>

        {/* Quick test buttons */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">Prueba rápida:</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map(size => (
              <button
                key={size}
                onClick={() => setTileSize(size)}
                className={cn(
                  'w-10 h-10 rounded-lg font-bold transition-all',
                  tileSize === size
                    ? 'bg-blue-500 text-white'
                    : width1 % size === 0 && height1 % size === 0
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: DISCOVER ============
  if (phase === 'discover') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Constructor de Baldosas
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Conexión descubierta!
          </p>
        </div>

        {/* Visual comparison */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-xl p-4 text-center">
            <h4 className="font-bold text-cyan-800 dark:text-cyan-200 mb-3">
              Baldosas que caben en {width1}×{height1}
            </h4>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {[1, 2, 4].map(size => (
                <span
                  key={size}
                  className={cn(
                    'px-3 py-1 rounded-full font-bold',
                    size === gcd1
                      ? 'bg-yellow-300 text-yellow-900 ring-2 ring-yellow-600'
                      : 'bg-cyan-200 text-cyan-800',
                  )}
                >
                  {size}×{size}
                </span>
              ))}
            </div>
            <p className="text-cyan-700 dark:text-cyan-300 text-sm">
              La más grande: <strong>{gcd1}×{gcd1}</strong>
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
            <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3">
              Divisores comunes de {width1} y {height1}
            </h4>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {[1, 2, 4].map(d => (
                <span
                  key={d}
                  className={cn(
                    'px-3 py-1 rounded-full font-bold',
                    d === gcd1
                      ? 'bg-yellow-300 text-yellow-900 ring-2 ring-yellow-600'
                      : 'bg-purple-200 text-purple-800',
                  )}
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              El mayor: <strong>{gcd1}</strong>
            </p>
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 border-2 border-yellow-400">
          <h4 className="font-bold text-yellow-800 dark:text-yellow-200 text-center text-lg mb-3">
            ¡Es lo mismo!
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-center">
            La <strong>baldosa cuadrada más grande</strong> que cabe perfectamente
            tiene lado igual al <strong>M.C.D.</strong> de las dimensiones.
          </p>
          <p className="text-2xl font-bold text-center mt-4 text-yellow-700 dark:text-yellow-400">
            M.C.D.({width1}, {height1}) = {gcd1}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('challenge')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Desafío final</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: CHALLENGE ============
  const challengeFits = width2 % challengeTileSize === 0 && height2 % challengeTileSize === 0;
  const isMaxChallenge = challengeTileSize === gcd2;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Constructor de Baldosas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Desafío: Piso de {width2} × {height2} metros
        </p>
      </div>

      {/* Tile size slider */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setChallengeTileSize(Math.max(1, challengeTileSize - 1))}
            disabled={challengeTileSize <= 1}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            <Minus size={20} />
          </button>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {challengeTileSize} × {challengeTileSize}
            </p>
          </div>
          <button
            onClick={() => setChallengeTileSize(Math.min(10, challengeTileSize + 1))}
            disabled={challengeTileSize >= 10}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Visual grid */}
      <div className="flex justify-center">
        <TileGrid width={width2} height={height2} tileSize={challengeTileSize} />
      </div>

      {/* Success message */}
      {isMaxChallenge && (
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-300 dark:border-green-700 animate-fadeIn text-center">
          <Sparkles className="w-8 h-8 mx-auto text-green-500 mb-2" />
          <p className="text-green-800 dark:text-green-200 font-bold">
            ¡Correcto! M.C.D.({width2}, {height2}) = {gcd2}
          </p>
        </div>
      )}

      {/* Quick test buttons */}
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">Prueba:</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map(size => (
            <button
              key={size}
              onClick={() => setChallengeTileSize(size)}
              className={cn(
                'w-9 h-9 rounded-lg font-bold text-sm transition-all',
                challengeTileSize === size
                  ? 'bg-purple-500 text-white'
                  : width2 % size === 0 && height2 % size === 0
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          disabled={!isMaxChallenge}
          className={cn(
            'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
            isMaxChallenge
              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
          )}
        >
          <span>Continuar al checkpoint</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

function remainderInfo(width: number, height: number, tileSize: number): string {
  const remW = width % tileSize;
  const remH = height % tileSize;
  if (remW > 0 && remH > 0) {
    return ` Sobran ${remW}m de ancho y ${remH}m de alto.`;
  } else if (remW > 0) {
    return ` Sobran ${remW}m de ancho.`;
  } else if (remH > 0) {
    return ` Sobran ${remH}m de alto.`;
  }
  return '';
}
