'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Check, Sparkles, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface SignCombination {
  left: '+' | '-';
  right: '+' | '-';
  result: '+' | '-';
  discovered: boolean;
}

const INITIAL_COMBINATIONS: SignCombination[] = [
  { left: '+', right: '+', result: '+', discovered: false },
  { left: '+', right: '-', result: '-', discovered: false },
  { left: '-', right: '+', result: '-', discovered: false },
  { left: '-', right: '-', result: '+', discovered: false },
];

const FEEDBACK_DELAY = 2500; // Increased for better cognitive processing

export default function Step2SignRules({ onComplete, isActive }: LessonStepProps) {
  const [combinations, setCombinations] = useState<SignCombination[]>(INITIAL_COMBINATIONS);
  const [selectedLeft, setSelectedLeft] = useState<'+' | '-' | null>(null);
  const [selectedRight, setSelectedRight] = useState<'+' | '-' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastResult, setLastResult] = useState<{ correct: boolean; result: '+' | '-' } | null>(null);
  const [lastDiscoveredIndex, setLastDiscoveredIndex] = useState<number | null>(null);

  // Pattern discovery state
  const [patternUnlocked, setPatternUnlocked] = useState<'none' | 'equal' | 'different' | 'both'>('none');
  const [showPatternMessage, setShowPatternMessage] = useState(false);
  const [patternMessageText, setPatternMessageText] = useState('');

  const allDiscovered = combinations.every(c => c.discovered);
  const discoveredCount = combinations.filter(c => c.discovered).length;

  // Check for pattern unlocks
  useEffect(() => {
    const hasEqualSigns = combinations[0].discovered && combinations[3].discovered; // ++ and --
    const hasDifferentSigns = combinations[1].discovered && combinations[2].discovered; // +- and -+

    if (hasEqualSigns && hasDifferentSigns && patternUnlocked !== 'both') {
      setPatternUnlocked('both');
      setPatternMessageText('¡Patrón completo! Signos iguales = (+), Signos diferentes = (−)');
      setShowPatternMessage(true);
      setTimeout(() => setShowPatternMessage(false), 3000);
    } else if (hasEqualSigns && patternUnlocked === 'none') {
      setPatternUnlocked('equal');
      setPatternMessageText('¡Descubriste un patrón! Signos iguales dan positivo');
      setShowPatternMessage(true);
      setTimeout(() => setShowPatternMessage(false), 3000);
    } else if (hasDifferentSigns && patternUnlocked === 'none') {
      setPatternUnlocked('different');
      setPatternMessageText('¡Descubriste un patrón! Signos diferentes dan negativo');
      setShowPatternMessage(true);
      setTimeout(() => setShowPatternMessage(false), 3000);
    } else if (hasDifferentSigns && patternUnlocked === 'equal') {
      setPatternUnlocked('both');
      setPatternMessageText('¡Patrón completo! Ya conoces ambas reglas');
      setShowPatternMessage(true);
      setTimeout(() => setShowPatternMessage(false), 3000);
    } else if (hasEqualSigns && patternUnlocked === 'different') {
      setPatternUnlocked('both');
      setPatternMessageText('¡Patrón completo! Ya conoces ambas reglas');
      setShowPatternMessage(true);
      setTimeout(() => setShowPatternMessage(false), 3000);
    }
  }, [combinations, patternUnlocked]);

  const handleTry = () => {
    if (!selectedLeft || !selectedRight) return;

    const result: '+' | '-' = (selectedLeft === selectedRight) ? '+' : '-';

    // Find which cell this corresponds to
    const cellIndex = INITIAL_COMBINATIONS.findIndex(
      c => c.left === selectedLeft && c.right === selectedRight
    );

    setCombinations(prev => prev.map((c, i) => {
      if (c.left === selectedLeft && c.right === selectedRight) {
        return { ...c, discovered: true };
      }
      return c;
    }));

    setLastDiscoveredIndex(cellIndex);
    setLastResult({ correct: true, result });
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedLeft(null);
      setSelectedRight(null);
      setLastResult(null);
      setLastDiscoveredIndex(null);
    }, FEEDBACK_DELAY);
  };

  const getResultColor = (sign: '+' | '-') => {
    return sign === '+' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const getResultBg = (sign: '+' | '-') => {
    return sign === '+' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50';
  };

  // Cell component with animation
  const CellDisplay = ({ index, combination }: { index: number; combination: SignCombination }) => {
    const isJustDiscovered = lastDiscoveredIndex === index && showFeedback;

    return (
      <div className="relative">
        <div className={cn(
          'w-14 h-14 mx-auto rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300',
          combination.discovered
            ? getResultBg(combination.result)
            : 'bg-gray-100 dark:bg-gray-700',
          isJustDiscovered && 'scale-125 ring-4 ring-yellow-400 shadow-lg'
        )}>
          {combination.discovered ? (
            <span className={cn(
              getResultColor(combination.result),
              isJustDiscovered && 'animate-bounce'
            )}>
              {combination.result === '+' ? '+' : '−'}
            </span>
          ) : (
            <span className="text-gray-400">?</span>
          )}
        </div>

        {/* Sparkle effect on discovery */}
        {isJustDiscovered && (
          <>
            <Star className="absolute -top-2 -left-2 w-5 h-5 text-yellow-400 animate-ping" />
            <Star className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400 animate-ping" style={{ animationDelay: '0.1s' }} />
            <Zap className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 text-yellow-500 animate-bounce" />
          </>
        )}
      </div>
    );
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre las Reglas de los Signos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Experimenta con diferentes combinaciones y encuentra el patrón
        </p>
      </div>

      {/* Pattern unlock notification */}
      {showPatternMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">{patternMessageText}</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Rules discovery grid */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
          Tabla de Signos en la Multiplicación
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full max-w-md mx-auto">
            <thead>
              <tr>
                <th className="p-3 text-gray-500 dark:text-gray-400">×</th>
                <th className="p-3 text-green-600 dark:text-green-400 text-2xl font-bold">+</th>
                <th className="p-3 text-red-600 dark:text-red-400 text-2xl font-bold">−</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-green-600 dark:text-green-400 text-2xl font-bold">+</td>
                <td className="p-3">
                  <CellDisplay index={0} combination={combinations[0]} />
                </td>
                <td className="p-3">
                  <CellDisplay index={1} combination={combinations[1]} />
                </td>
              </tr>
              <tr>
                <td className="p-3 text-red-600 dark:text-red-400 text-2xl font-bold">−</td>
                <td className="p-3">
                  <CellDisplay index={2} combination={combinations[2]} />
                </td>
                <td className="p-3">
                  <CellDisplay index={3} combination={combinations[3]} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Progress indicator with celebration */}
        <div className="text-center mt-4">
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  combinations[i].discovered
                    ? combinations[i].result === '+'
                      ? 'bg-green-500 scale-125'
                      : 'bg-red-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {discoveredCount} de 4 combinaciones descubiertas
            {discoveredCount === 2 && ' - ¡Sigue así!'}
            {discoveredCount === 3 && ' - ¡Solo falta una!'}
          </p>
        </div>
      </div>

      {/* Experiment area */}
      {!allDiscovered ? (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
            Experimenta
          </h3>

          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            {/* Left sign selector */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Primer signo</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedLeft('+')}
                  disabled={showFeedback}
                  aria-label="Seleccionar signo positivo como primer factor"
                  className={cn(
                    'w-14 h-14 rounded-xl text-2xl font-bold transition-all',
                    selectedLeft === '+'
                      ? 'bg-green-500 text-white ring-4 ring-green-300 scale-110'
                      : 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:scale-105'
                  )}
                >
                  +
                </button>
                <button
                  onClick={() => setSelectedLeft('-')}
                  disabled={showFeedback}
                  aria-label="Seleccionar signo negativo como primer factor"
                  className={cn(
                    'w-14 h-14 rounded-xl text-2xl font-bold transition-all',
                    selectedLeft === '-'
                      ? 'bg-red-500 text-white ring-4 ring-red-300 scale-110'
                      : 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:scale-105'
                  )}
                >
                  −
                </button>
              </div>
            </div>

            {/* Multiplication symbol */}
            <span className="text-3xl font-bold text-gray-400 mt-6">×</span>

            {/* Right sign selector */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Segundo signo</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedRight('+')}
                  disabled={showFeedback}
                  aria-label="Seleccionar signo positivo como segundo factor"
                  className={cn(
                    'w-14 h-14 rounded-xl text-2xl font-bold transition-all',
                    selectedRight === '+'
                      ? 'bg-green-500 text-white ring-4 ring-green-300 scale-110'
                      : 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:scale-105'
                  )}
                >
                  +
                </button>
                <button
                  onClick={() => setSelectedRight('-')}
                  disabled={showFeedback}
                  aria-label="Seleccionar signo negativo como segundo factor"
                  className={cn(
                    'w-14 h-14 rounded-xl text-2xl font-bold transition-all',
                    selectedRight === '-'
                      ? 'bg-red-500 text-white ring-4 ring-red-300 scale-110'
                      : 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:scale-105'
                  )}
                >
                  −
                </button>
              </div>
            </div>

            {/* Equals */}
            <span className="text-3xl font-bold text-gray-400 mt-6">=</span>

            {/* Result display */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Resultado</span>
              <div className={cn(
                'w-14 h-14 rounded-xl text-2xl font-bold flex items-center justify-center transition-all duration-300',
                showFeedback && lastResult
                  ? lastResult.result === '+'
                    ? 'bg-green-500 text-white scale-125 ring-4 ring-green-300'
                    : 'bg-red-500 text-white scale-125 ring-4 ring-red-300'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-400'
              )}>
                {showFeedback && lastResult ? (
                  <span className="animate-bounce">{lastResult.result === '+' ? '+' : '−'}</span>
                ) : '?'}
              </div>
            </div>
          </div>

          {/* Example with numbers */}
          {selectedLeft && selectedRight && !showFeedback && (
            <div className="text-center mb-4 text-gray-600 dark:text-gray-400">
              Ejemplo: ({selectedLeft}3) × ({selectedRight === '+' ? '+' : '−'}2) = ?
            </div>
          )}

          {/* Try button */}
          <div className="flex justify-center">
            <button
              onClick={handleTry}
              disabled={!selectedLeft || !selectedRight || showFeedback}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedLeft && selectedRight && !showFeedback
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              {showFeedback ? '¡Descubierto!' : 'Probar'}
            </button>
          </div>

          {/* Feedback */}
          {showFeedback && lastResult && (
            <div className="mt-6 text-center animate-fadeIn">
              <div className={cn(
                'inline-flex items-center gap-3 px-6 py-3 rounded-xl',
                lastResult.result === '+'
                  ? 'bg-green-100 dark:bg-green-900/50'
                  : 'bg-red-100 dark:bg-red-900/50'
              )}>
                <Check className={cn(
                  'w-6 h-6',
                  lastResult.result === '+' ? 'text-green-600' : 'text-red-600'
                )} />
                <div className="text-left">
                  <p className={cn(
                    'text-lg font-bold',
                    lastResult.result === '+' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                  )}>
                    ({selectedLeft}) × ({selectedRight}) = {lastResult.result}
                  </p>
                  <p className={cn(
                    'text-sm',
                    lastResult.result === '+' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  )}>
                    {lastResult.result === '+'
                      ? '✓ Signos iguales → positivo'
                      : '✓ Signos diferentes → negativo'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // All discovered - show summary with celebration
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700 relative overflow-hidden">
            {/* Celebration background effect */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-500 animate-pulse"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-500 animate-bounce" />
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300">
                  ¡Has descubierto las reglas!
                </h3>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-4 text-center transform hover:scale-105 transition-transform">
                  <p className="text-green-800 dark:text-green-200 font-bold text-lg mb-1">
                    Signos Iguales
                  </p>
                  <p className="text-green-600 dark:text-green-300 text-sm">
                    (+) × (+) = +
                  </p>
                  <p className="text-green-600 dark:text-green-300 text-sm">
                    (−) × (−) = +
                  </p>
                  <p className="text-green-700 dark:text-green-200 font-semibold mt-2 text-lg">
                    = Positivo ✓
                  </p>
                </div>

                <div className="bg-red-100 dark:bg-red-900/50 rounded-lg p-4 text-center transform hover:scale-105 transition-transform">
                  <p className="text-red-800 dark:text-red-200 font-bold text-lg mb-1">
                    Signos Diferentes
                  </p>
                  <p className="text-red-600 dark:text-red-300 text-sm">
                    (+) × (−) = −
                  </p>
                  <p className="text-red-600 dark:text-red-300 text-sm">
                    (−) × (+) = −
                  </p>
                  <p className="text-red-700 dark:text-red-200 font-semibold mt-2 text-lg">
                    = Negativo ✓
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Memory tip */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
            <p className="text-purple-800 dark:text-purple-200 text-center font-medium">
              <span className="text-lg">💡</span> Truco para recordar: <br/>
              <span className="text-lg font-bold">&ldquo;Amigos dan positivo, enemigos dan negativo&rdquo;</span>
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:scale-105"
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
