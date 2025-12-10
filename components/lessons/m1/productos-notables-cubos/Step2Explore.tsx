'use client';

import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface CubePart {
  id: string;
  label: string;
  formula: string;
  count: number;
  color: string;
  darkColor: string;
}

const CUBE_PARTS: CubePart[] = [
  { id: 'a3', label: 'a³', formula: 'a × a × a', count: 1, color: 'bg-blue-500', darkColor: 'dark:bg-blue-600' },
  { id: 'a2b', label: 'a²b', formula: 'a × a × b', count: 3, color: 'bg-teal-500', darkColor: 'dark:bg-teal-600' },
  { id: 'ab2', label: 'ab²', formula: 'a × b × b', count: 3, color: 'bg-purple-500', darkColor: 'dark:bg-purple-600' },
  { id: 'b3', label: 'b³', formula: 'b × b × b', count: 1, color: 'bg-pink-500', darkColor: 'dark:bg-pink-600' },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showLabels, setShowLabels] = useState(true);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [discoveredParts, setDiscoveredParts] = useState<string[]>([]);

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
    if (!discoveredParts.includes(partId)) {
      setDiscoveredParts([...discoveredParts, partId]);
    }
  };

  const allPartsDiscovered = discoveredParts.length === CUBE_PARTS.length;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Exploremos cómo se forma el cubo de un binomio
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Cuando expandimos <span className="font-mono font-bold text-purple-600">(a + b)³</span>, el resultado se puede visualizar como un cubo grande dividido en <strong>8 partes</strong>.
            </p>

            {/* 3D cube visualization showing the decomposition */}
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 320 280" className="w-80 h-70">
                {/* Main cube outline */}
                <g transform="translate(160, 140)">
                  {/* Back corner cube (a³) */}
                  <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <polygon
                      points="-80,-60 -20,-60 -20,0 -80,0"
                      fill="#3b82f6"
                      stroke="#1d4ed8"
                      strokeWidth="2"
                    />
                    <polygon
                      points="-80,-60 -50,-90 10,-90 -20,-60"
                      fill="#60a5fa"
                      stroke="#1d4ed8"
                      strokeWidth="2"
                    />
                    <polygon
                      points="-20,-60 10,-90 10,-30 -20,0"
                      fill="#2563eb"
                      stroke="#1d4ed8"
                      strokeWidth="2"
                    />
                    <text x="-50" y="-25" textAnchor="middle" className="text-sm font-bold" fill="white">a³</text>
                  </g>

                  {/* Top front a²b */}
                  <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <polygon
                      points="10,-90 70,-90 70,-30 10,-30"
                      fill="#14b8a6"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                    <polygon
                      points="-20,-60 10,-90 70,-90 40,-60"
                      fill="#2dd4bf"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                    <polygon
                      points="40,-60 70,-90 70,-30 40,0"
                      fill="#0d9488"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                    <text x="30" y="-55" textAnchor="middle" className="text-xs font-bold" fill="white">a²b</text>
                  </g>

                  {/* Right back a²b */}
                  <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <polygon
                      points="-20,0 40,0 40,60 -20,60"
                      fill="#14b8a6"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                    <polygon
                      points="-20,0 10,-30 70,-30 40,0"
                      fill="#2dd4bf"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                    <polygon
                      points="40,0 70,-30 70,30 40,60"
                      fill="#0d9488"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                    <text x="30" y="25" textAnchor="middle" className="text-xs font-bold" fill="white">a²b</text>
                  </g>

                  {/* Left middle a²b */}
                  <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <polygon
                      points="-80,0 -20,0 -20,60 -80,60"
                      fill="#14b8a6"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                    <polygon
                      points="-80,0 -50,-30 10,-30 -20,0"
                      fill="#2dd4bf"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                    <polygon
                      points="-20,0 10,-30 10,30 -20,60"
                      fill="#0d9488"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                    <text x="-50" y="25" textAnchor="middle" className="text-xs font-bold" fill="white">a²b</text>
                  </g>

                  {/* Front top ab² */}
                  <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <polygon
                      points="10,-30 70,-30 70,30 10,30"
                      fill="#a855f7"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    <polygon
                      points="10,-30 40,-60 100,-60 70,-30"
                      fill="#c084fc"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    <polygon
                      points="70,-30 100,-60 100,0 70,30"
                      fill="#7c3aed"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    <text x="50" y="-10" textAnchor="middle" className="text-xs font-bold" fill="white">ab²</text>
                  </g>

                  {/* Right middle ab² */}
                  <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <polygon
                      points="40,0 100,0 100,60 40,60"
                      fill="#a855f7"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    <polygon
                      points="40,0 70,-30 130,-30 100,0"
                      fill="#c084fc"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    <polygon
                      points="100,0 130,-30 130,30 100,60"
                      fill="#7c3aed"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    <text x="80" y="25" textAnchor="middle" className="text-xs font-bold" fill="white">ab²</text>
                  </g>

                  {/* Bottom front ab² */}
                  <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <polygon
                      points="-20,60 40,60 40,120 -20,120"
                      fill="#a855f7"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    <polygon
                      points="-20,60 10,30 70,30 40,60"
                      fill="#c084fc"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    <polygon
                      points="40,60 70,30 70,90 40,120"
                      fill="#7c3aed"
                      stroke="#7c3aed"
                      strokeWidth="2"
                    />
                    <text x="20" y="85" textAnchor="middle" className="text-xs font-bold" fill="white">ab²</text>
                  </g>

                  {/* Front corner (b³) */}
                  <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <polygon
                      points="40,60 100,60 100,120 40,120"
                      fill="#ec4899"
                      stroke="#db2777"
                      strokeWidth="2"
                    />
                    <polygon
                      points="40,60 70,30 130,30 100,60"
                      fill="#f472b6"
                      stroke="#db2777"
                      strokeWidth="2"
                    />
                    <polygon
                      points="100,60 130,30 130,90 100,120"
                      fill="#db2777"
                      stroke="#db2777"
                      strokeWidth="2"
                    />
                    <text x="80" y="85" textAnchor="middle" className="text-sm font-bold" fill="white">b³</text>
                  </g>

                  {/* Dimension labels */}
                  <text x="-65" y="-100" className="text-sm font-bold" fill="#3b82f6">a</text>
                  <text x="30" y="-100" className="text-sm font-bold" fill="#ec4899">b</text>
                </g>
              </svg>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-center">
              Cada color representa un tipo de pieza diferente.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discover')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Explorar las partes</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'discover' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
              Haz clic en cada tipo de pieza para descubrir cuántas hay:
            </p>

            {/* Interactive parts grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {CUBE_PARTS.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handlePartClick(part.id)}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all transform hover:scale-105',
                    selectedPart === part.id
                      ? 'ring-2 ring-offset-2 ring-blue-500'
                      : '',
                    discoveredParts.includes(part.id)
                      ? `${part.color} ${part.darkColor} border-transparent text-white`
                      : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  )}
                >
                  <div className="text-center">
                    <p className="font-mono text-2xl font-bold">{part.label}</p>
                    {discoveredParts.includes(part.id) && (
                      <div className="mt-2 animate-fadeIn">
                        <p className="text-sm opacity-90">× {part.count}</p>
                        <p className="text-xs opacity-75 mt-1">{part.formula}</p>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Discovery progress */}
            <div className="flex justify-center gap-2">
              {CUBE_PARTS.map((part) => (
                <div
                  key={part.id}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all',
                    discoveredParts.includes(part.id)
                      ? `${part.color}`
                      : 'bg-gray-300 dark:bg-gray-600'
                  )}
                />
              ))}
            </div>

            {/* Selected part info */}
            {selectedPart && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 animate-fadeIn">
                {(() => {
                  const part = CUBE_PARTS.find(p => p.id === selectedPart);
                  if (!part) return null;
                  return (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Hay <span className={cn('font-bold text-2xl', part.color.replace('bg-', 'text-'))}>{part.count}</span> piezas de tipo <span className="font-mono">{part.label}</span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Cada una tiene dimensiones: <span className="font-mono">{part.formula}</span>
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {allPartsDiscovered && (
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <p className="font-semibold text-green-800 dark:text-green-200">
                  ¡Has descubierto todas las partes!
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                El cubo se divide en: <span className="font-mono font-bold">1</span> × a³ + <span className="font-mono font-bold">3</span> × a²b + <span className="font-mono font-bold">3</span> × ab² + <span className="font-mono font-bold">1</span> × b³
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-center mt-2 text-sm">
                Nota los coeficientes: <span className="font-bold">1 - 3 - 3 - 1</span>
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('pattern')}
              disabled={!allPartsDiscovered}
              className={cn(
                'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
                allPartsDiscovered
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              <span>Ver el patrón completo</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'pattern' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              El Patrón del Cubo de un Binomio
            </h3>

            {/* Formula breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              <div className="text-center space-y-4">
                <p className="font-mono text-xl">
                  (<span className="text-blue-600">a</span> + <span className="text-pink-600">b</span>)³ =
                </p>
                <div className="flex flex-wrap justify-center gap-2 items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-2 rounded-lg font-mono text-blue-700 dark:text-blue-300">1×a³</span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-teal-100 dark:bg-teal-900/50 px-3 py-2 rounded-lg font-mono text-teal-700 dark:text-teal-300">3×a²b</span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-purple-100 dark:bg-purple-900/50 px-3 py-2 rounded-lg font-mono text-purple-700 dark:text-purple-300">3×ab²</span>
                  <span className="text-gray-400">+</span>
                  <span className="bg-pink-100 dark:bg-pink-900/50 px-3 py-2 rounded-lg font-mono text-pink-700 dark:text-pink-300">1×b³</span>
                </div>
                <p className="text-gray-400">↓</p>
                <p className="font-mono text-2xl font-bold text-gray-800 dark:text-gray-200">
                  <span className="text-blue-600">a³</span> + <span className="text-teal-600">3a²b</span> + <span className="text-purple-600">3ab²</span> + <span className="text-pink-600">b³</span>
                </p>
              </div>
            </div>

            {/* Pascal's triangle connection */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 text-center">
                Los coeficientes vienen del Triángulo de Pascal:
              </h4>
              <div className="flex flex-col items-center gap-2 font-mono">
                <div className="flex gap-4 text-gray-400 text-sm">
                  <span>n=0:</span>
                  <span className="text-gray-600 dark:text-gray-400">1</span>
                </div>
                <div className="flex gap-4 text-gray-400 text-sm">
                  <span>n=1:</span>
                  <span className="text-gray-600 dark:text-gray-400">1 &nbsp; 1</span>
                </div>
                <div className="flex gap-4 text-gray-400 text-sm">
                  <span>n=2:</span>
                  <span className="text-gray-600 dark:text-gray-400">1 &nbsp; 2 &nbsp; 1</span>
                </div>
                <div className="flex gap-4 text-amber-700 dark:text-amber-300 font-bold">
                  <span>n=3:</span>
                  <span className="bg-amber-200 dark:bg-amber-800 px-3 py-1 rounded">1 &nbsp; 3 &nbsp; 3 &nbsp; 1</span>
                </div>
              </div>
            </div>

            {/* Subtraction variant */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
                ¿Y si es resta?
              </h4>
              <p className="text-center font-mono text-lg">
                (<span className="text-blue-600">a</span> - <span className="text-pink-600">b</span>)³ = <span className="text-blue-600">a³</span> <span className="text-red-500">-</span> 3a²b <span className="text-green-500">+</span> 3ab² <span className="text-red-500">-</span> <span className="text-pink-600">b³</span>
              </p>
              <p className="text-center text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Los signos <strong>alternan</strong>: + - + -
              </p>
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
      )}
    </div>
  );
}
