'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Map, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

interface TreasureOption {
  id: string;
  x: number;
  y: number;
  label: string;
}

const TREASURE_OPTIONS: TreasureOption[] = [
  { id: 'a', x: 2, y: 3, label: 'A' },
  { id: 'b', x: 3, y: 2, label: 'B' }, // Correct answer
  { id: 'c', x: -3, y: 2, label: 'C' },
  { id: 'd', x: 3, y: -2, label: 'D' },
];

const CORRECT_ANSWER = 'b';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  if (!isActive) return null;

  const toSvgX = (x: number) => 150 + x * 20;
  const toSvgY = (y: number) => 130 - y * 20;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Tesoro Escondido
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Un misterio por resolver...</p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Tu amigo encontró un <strong>mapa antiguo</strong> de la Isla Mocha.
            </p>

            {/* Treasure map visualization */}
            <div className="flex justify-center py-4">
              <svg viewBox="0 0 300 260" className="w-80 h-72">
                {/* Parchment background */}
                <rect
                  x="10"
                  y="10"
                  width="280"
                  height="240"
                  rx="8"
                  className="fill-amber-100 dark:fill-amber-900/50"
                  stroke="#92400e"
                  strokeWidth="3"
                />

                {/* Decorative corner */}
                <path d="M 10 30 Q 10 10 30 10" fill="none" stroke="#92400e" strokeWidth="2" />
                <path d="M 270 10 Q 290 10 290 30" fill="none" stroke="#92400e" strokeWidth="2" />
                <path d="M 290 220 Q 290 240 270 240" fill="none" stroke="#92400e" strokeWidth="2" />
                <path d="M 30 240 Q 10 240 10 220" fill="none" stroke="#92400e" strokeWidth="2" />

                {/* Grid lines */}
                {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => (
                  <g key={`grid-${i}`}>
                    {/* Vertical lines */}
                    <line
                      x1={toSvgX(i)}
                      y1={50}
                      x2={toSvgX(i)}
                      y2={210}
                      className="stroke-amber-300 dark:stroke-amber-700"
                      strokeWidth="1"
                    />
                    {/* Horizontal lines */}
                    <line
                      x1={70}
                      y1={toSvgY(i)}
                      x2={230}
                      y2={toSvgY(i)}
                      className="stroke-amber-300 dark:stroke-amber-700"
                      strokeWidth="1"
                    />
                  </g>
                ))}

                {/* Axes */}
                <line
                  x1={70}
                  y1={toSvgY(0)}
                  x2={230}
                  y2={toSvgY(0)}
                  stroke="#92400e"
                  strokeWidth="2"
                />
                <line
                  x1={toSvgX(0)}
                  y1={50}
                  x2={toSvgX(0)}
                  y2={210}
                  stroke="#92400e"
                  strokeWidth="2"
                />

                {/* Origin label */}
                <text
                  x={toSvgX(0) - 12}
                  y={toSvgY(0) + 15}
                  fontSize="10"
                  className="fill-amber-800 dark:fill-amber-300"
                >
                  0
                </text>

                {/* Axis numbers */}
                {[-3, -2, -1, 1, 2, 3].map((n) => (
                  <g key={`num-${n}`}>
                    <text
                      x={toSvgX(n)}
                      y={toSvgY(0) + 15}
                      fontSize="10"
                      textAnchor="middle"
                      className="fill-amber-800 dark:fill-amber-300"
                    >
                      {n}
                    </text>
                    <text
                      x={toSvgX(0) - 12}
                      y={toSvgY(n) + 4}
                      fontSize="10"
                      textAnchor="middle"
                      className="fill-amber-800 dark:fill-amber-300"
                    >
                      {n}
                    </text>
                  </g>
                ))}

                {/* Mystery X marks */}
                {TREASURE_OPTIONS.map((opt) => (
                  <g key={opt.id}>
                    <text
                      x={toSvgX(opt.x)}
                      y={toSvgY(opt.y) + 5}
                      fontSize="20"
                      textAnchor="middle"
                      className="fill-red-600 dark:fill-red-400"
                      fontWeight="bold"
                    >
                      X
                    </text>
                    <text
                      x={toSvgX(opt.x) + 12}
                      y={toSvgY(opt.y) - 5}
                      fontSize="11"
                      className="fill-gray-700 dark:fill-gray-300"
                      fontWeight="bold"
                    >
                      {opt.label}
                    </text>
                  </g>
                ))}

                {/* Compass rose */}
                <g transform="translate(255, 45)">
                  <circle r="18" fill="none" stroke="#92400e" strokeWidth="1" />
                  <text y="-8" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="bold">
                    N
                  </text>
                  <text y="14" textAnchor="middle" fontSize="8" fill="#92400e">
                    S
                  </text>
                  <text x="-12" y="3" textAnchor="middle" fontSize="8" fill="#92400e">
                    O
                  </text>
                  <text x="12" y="3" textAnchor="middle" fontSize="8" fill="#92400e">
                    E
                  </text>
                </g>

                {/* Title */}
                <text
                  x="150"
                  y="35"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  className="fill-amber-900 dark:fill-amber-200"
                  fontStyle="italic"
                >
                  Isla Mocha
                </text>
              </svg>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              El mapa tiene una pista escrita:
            </p>

            <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 border-2 border-amber-400 dark:border-amber-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Map className="w-6 h-6 text-amber-700 dark:text-amber-300" />
              </div>
              <p className="text-amber-900 dark:text-amber-100 font-semibold text-lg italic">
                &ldquo;El tesoro está en la posición (3, 2)&rdquo;
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Pero hay <strong>varias X</strong> marcadas... ¿Cuál es la correcta?
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>¡Encontrar el tesoro!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    const handleSubmit = () => {
      if (selectedAnswer === null) return;
      setIsRevealing(true);
      setTimeout(() => {
        setPhase('result');
      }, 1500);
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Tesoro Escondido
          </h2>
          <p className="text-gray-600 dark:text-gray-300">¿Cuál X marca la posición (3, 2)?</p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <Compass className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-amber-800 dark:text-amber-200">
                <strong>Pista:</strong> El primer número (3) indica la posición horizontal
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                El segundo número (2) indica la posición vertical
              </p>
            </div>
          </div>
        </div>

        {/* Interactive map */}
        <div className="flex justify-center py-2">
          <svg viewBox="0 0 300 260" className="w-80 h-72">
            {/* Parchment background */}
            <rect
              x="10"
              y="10"
              width="280"
              height="240"
              rx="8"
              className="fill-amber-100 dark:fill-amber-900/50"
              stroke="#92400e"
              strokeWidth="3"
            />

            {/* Grid lines */}
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => (
              <g key={`grid-${i}`}>
                <line
                  x1={toSvgX(i)}
                  y1={50}
                  x2={toSvgX(i)}
                  y2={210}
                  className="stroke-amber-300 dark:stroke-amber-700"
                  strokeWidth="1"
                />
                <line
                  x1={70}
                  y1={toSvgY(i)}
                  x2={230}
                  y2={toSvgY(i)}
                  className="stroke-amber-300 dark:stroke-amber-700"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* Axes */}
            <line
              x1={70}
              y1={toSvgY(0)}
              x2={230}
              y2={toSvgY(0)}
              stroke="#92400e"
              strokeWidth="2"
            />
            <line
              x1={toSvgX(0)}
              y1={50}
              x2={toSvgX(0)}
              y2={210}
              stroke="#92400e"
              strokeWidth="2"
            />

            {/* Axis labels */}
            <text
              x={toSvgX(0) - 12}
              y={toSvgY(0) + 15}
              fontSize="10"
              className="fill-amber-800 dark:fill-amber-300"
            >
              0
            </text>
            {[-3, -2, -1, 1, 2, 3].map((n) => (
              <g key={`num-${n}`}>
                <text
                  x={toSvgX(n)}
                  y={toSvgY(0) + 15}
                  fontSize="10"
                  textAnchor="middle"
                  className="fill-amber-800 dark:fill-amber-300"
                >
                  {n}
                </text>
                <text
                  x={toSvgX(0) - 12}
                  y={toSvgY(n) + 4}
                  fontSize="10"
                  textAnchor="middle"
                  className="fill-amber-800 dark:fill-amber-300"
                >
                  {n}
                </text>
              </g>
            ))}

            {/* X marks with selection states */}
            {TREASURE_OPTIONS.map((opt) => {
              const isSelected = selectedAnswer === opt.id;
              const isCorrectAndRevealing = isRevealing && opt.id === CORRECT_ANSWER;

              return (
                <g key={opt.id}>
                  {/* Selection highlight */}
                  {isSelected && (
                    <circle
                      cx={toSvgX(opt.x)}
                      cy={toSvgY(opt.y)}
                      r="16"
                      className={cn(
                        'transition-all duration-300',
                        isRevealing
                          ? opt.id === CORRECT_ANSWER
                            ? 'fill-green-300 dark:fill-green-700'
                            : 'fill-red-300 dark:fill-red-700'
                          : 'fill-purple-200 dark:fill-purple-800'
                      )}
                      fillOpacity="0.6"
                    />
                  )}
                  {/* Correct answer glow when revealing */}
                  {isCorrectAndRevealing && (
                    <circle
                      cx={toSvgX(opt.x)}
                      cy={toSvgY(opt.y)}
                      r="20"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3"
                      className="animate-pulse"
                    />
                  )}
                  <text
                    x={toSvgX(opt.x)}
                    y={toSvgY(opt.y) + 5}
                    fontSize="20"
                    textAnchor="middle"
                    className="fill-red-600 dark:fill-red-400"
                    fontWeight="bold"
                  >
                    X
                  </text>
                  <text
                    x={toSvgX(opt.x) + 12}
                    y={toSvgY(opt.y) - 5}
                    fontSize="11"
                    className="fill-gray-700 dark:fill-gray-300"
                    fontWeight="bold"
                  >
                    {opt.label}
                  </text>
                </g>
              );
            })}

            {/* Title */}
            <text
              x="150"
              y="35"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              className="fill-amber-900 dark:fill-amber-200"
              fontStyle="italic"
            >
              Isla Mocha
            </text>
          </svg>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {TREASURE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedAnswer(opt.id)}
              disabled={isRevealing}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2',
                selectedAnswer === opt.id
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              <span className="font-bold">{opt.label}:</span> ({opt.x}, {opt.y})
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null || isRevealing}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null && !isRevealing
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {isRevealing ? 'Verificando...' : 'Verificar'}
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: RESULT ============
  const isCorrect = selectedAnswer === CORRECT_ANSWER;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Tesoro Escondido
        </h2>
        <p className="text-gray-600 dark:text-gray-300">¡Veamos la respuesta!</p>
      </div>

      {/* Answer feedback */}
      <div
        className={cn(
          'p-5 rounded-xl border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
        )}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
          ) : (
            <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h3
              className={cn(
                'font-bold text-lg mb-1',
                isCorrect
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {isCorrect ? '¡Encontraste el tesoro!' : '¡Casi!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              El tesoro está en la posición <strong>B: (3, 2)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">¿Cómo encontrarlo?</h4>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
              1
            </div>
            <span className="text-gray-700 dark:text-gray-300">
              El primer número <strong>(3)</strong> te dice: muévete{' '}
              <strong>3 hacia la derecha</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">
              2
            </div>
            <span className="text-gray-700 dark:text-gray-300">
              El segundo número <strong>(2)</strong> te dice: muévete{' '}
              <strong>2 hacia arriba</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
          <strong>Este sistema se llama:</strong> El Plano Cartesiano
        </p>
        <p className="text-purple-700 dark:text-purple-300 mt-2 text-sm text-center">
          Con él puedes ubicar cualquier punto usando dos números: <strong>(x, y)</strong>
        </p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
        >
          <span>Explorar el plano cartesiano</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
