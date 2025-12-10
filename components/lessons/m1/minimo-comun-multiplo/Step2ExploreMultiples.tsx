'use client';

import { useState } from 'react';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'explore-first' | 'explore-second' | 'discovery';

function getMultiples(n: number, limit: number): number[] {
  const multiples: number[] = [];
  for (let i = n; i <= limit; i += n) {
    multiples.push(i);
  }
  return multiples;
}

// Interactive Number Grid for Multiples
function NumberGrid({
  maxNumber,
  number1,
  number2,
  revealedNumbers,
  onNumberClick,
  interactive,
}: {
  maxNumber: number;
  number1: number;
  number2: number;
  revealedNumbers: Set<number>;
  onNumberClick: (n: number) => void;
  interactive: boolean;
}) {
  const multiples1 = getMultiples(number1, maxNumber);
  const multiples2 = getMultiples(number2, maxNumber);

  return (
    <div className="grid grid-cols-6 gap-2 max-w-sm mx-auto">
      {Array.from({ length: maxNumber }, (_, i) => i + 1).map((n) => {
        const isRevealed = revealedNumbers.has(n);
        const isMultiple1 = multiples1.includes(n);
        const isMultiple2 = multiples2.includes(n);
        const isBoth = isMultiple1 && isMultiple2;

        let bgColor = 'bg-gray-200 dark:bg-gray-700';
        let textColor = 'text-gray-600 dark:text-gray-400';

        if (isRevealed) {
          if (isBoth) {
            bgColor = 'bg-yellow-400 dark:bg-yellow-500';
            textColor = 'text-yellow-900';
          } else if (isMultiple1) {
            bgColor = 'bg-blue-400 dark:bg-blue-500';
            textColor = 'text-white';
          } else if (isMultiple2) {
            bgColor = 'bg-green-400 dark:bg-green-500';
            textColor = 'text-white';
          } else {
            bgColor = 'bg-gray-300 dark:bg-gray-600';
            textColor = 'text-gray-500 dark:text-gray-400';
          }
        }

        return (
          <button
            key={n}
            onClick={() => interactive && onNumberClick(n)}
            disabled={!interactive || isRevealed}
            className={cn(
              'w-12 h-12 rounded-lg font-bold text-lg transition-all flex items-center justify-center',
              bgColor,
              textColor,
              interactive && !isRevealed && 'hover:scale-110 hover:shadow-lg cursor-pointer',
              isRevealed && isBoth && 'ring-2 ring-yellow-600 scale-105',
              !interactive && 'cursor-default',
            )}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

// Legend component
function Legend({ number1, number2, showSecond }: { number1: number; number2: number; showSecond: boolean }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-blue-400" />
        <span className="text-gray-700 dark:text-gray-300">Múltiplo de {number1}</span>
      </div>
      {showSecond && (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-400" />
          <span className="text-gray-700 dark:text-gray-300">Múltiplo de {number2}</span>
        </div>
      )}
      {showSecond && (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-400 ring-2 ring-yellow-600" />
          <span className="text-gray-700 dark:text-gray-300 font-bold">¡Múltiplo de ambos!</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-gray-300" />
        <span className="text-gray-700 dark:text-gray-300">No es múltiplo</span>
      </div>
    </div>
  );
}

export default function Step2ExploreMultiples({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [revealedNumbers, setRevealedNumbers] = useState<Set<number>>(new Set());
  const [foundCommon, setFoundCommon] = useState<number[]>([]);

  const number1 = 6;
  const number2 = 8;
  const maxNumber = 36;
  const multiples1 = getMultiples(number1, maxNumber);
  const multiples2 = getMultiples(number2, maxNumber);
  const commonMultiples = multiples1.filter(m => multiples2.includes(m));
  const mcm = Math.min(...commonMultiples);

  if (!isActive) return null;

  const handleNumberClick = (n: number) => {
    setRevealedNumbers(prev => new Set([...prev, n]));

    // Check if it's a common multiple
    if (commonMultiples.includes(n) && !foundCommon.includes(n)) {
      setFoundCommon(prev => [...prev, n]);
    }
  };

  const revealAll = () => {
    const all = new Set(Array.from({ length: maxNumber }, (_, i) => i + 1));
    setRevealedNumbers(all);
    setFoundCommon(commonMultiples);
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Cazador de Múltiplos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Vamos a encontrar los múltiplos comunes
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="text-center space-y-4">
            <Search className="w-16 h-16 mx-auto text-blue-500" />
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Un <strong>múltiplo</strong> de un número es el resultado de multiplicar
              ese número por 1, 2, 3, 4...
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-sm mx-auto">
              <p className="text-gray-700 dark:text-gray-300">
                Por ejemplo, los múltiplos de <strong className="text-blue-600">6</strong> son:
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                6, 12, 18, 24, 30, 36...
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                (6×1, 6×2, 6×3, 6×4, 6×5, 6×6...)
              </p>
            </div>
            <p className="text-purple-700 dark:text-purple-300 font-medium">
              ¡Vamos a encontrar los múltiplos de 6 y 8!
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('explore-first')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Empezar a explorar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: EXPLORE FIRST NUMBER ============
  if (phase === 'explore-first') {
    const foundMultiples1 = multiples1.filter(m => revealedNumbers.has(m));
    const allMultiples1Found = multiples1.every(m => revealedNumbers.has(m));

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Cazador de Múltiplos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Haz clic en los <strong className="text-blue-600">múltiplos de {number1}</strong>
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-center text-blue-800 dark:text-blue-200 font-medium">
            Pista: Los múltiplos de {number1} son: {number1}×1, {number1}×2, {number1}×3...
          </p>
        </div>

        <NumberGrid
          maxNumber={maxNumber}
          number1={number1}
          number2={number2}
          revealedNumbers={revealedNumbers}
          onNumberClick={handleNumberClick}
          interactive={true}
        />

        <Legend number1={number1} number2={number2} showSecond={false} />

        {/* Progress */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Múltiplos de {number1} encontrados:{' '}
            <strong className="text-blue-600">
              {foundMultiples1.length}/{multiples1.length}
            </strong>
          </p>
          {foundMultiples1.length > 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Encontrados: {foundMultiples1.sort((a, b) => a - b).join(', ')}
            </p>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={revealAll}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Revelar todos
          </button>
          <button
            onClick={() => {
              revealAll();
              setPhase('explore-second');
            }}
            disabled={!allMultiples1Found && revealedNumbers.size < 15}
            className={cn(
              'flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all',
              allMultiples1Found || revealedNumbers.size >= 15
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
            )}
          >
            <span>Siguiente: múltiplos de {number2}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: EXPLORE SECOND NUMBER ============
  if (phase === 'explore-second') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Cazador de Múltiplos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ahora encontremos los múltiplos de{' '}
            <strong className="text-green-600">{number2}</strong> y veamos cuáles son{' '}
            <strong className="text-yellow-600">comunes</strong>
          </p>
        </div>

        <NumberGrid
          maxNumber={maxNumber}
          number1={number1}
          number2={number2}
          revealedNumbers={revealedNumbers}
          onNumberClick={handleNumberClick}
          interactive={true}
        />

        <Legend number1={number1} number2={number2} showSecond={true} />

        {/* Found common multiples */}
        {foundCommon.length > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 border border-yellow-300 dark:border-yellow-700 animate-fadeIn">
            <p className="text-center text-yellow-800 dark:text-yellow-200 font-medium mb-2">
              <Sparkles className="inline w-5 h-5 mr-1" />
              ¡Múltiplos comunes encontrados!
            </p>
            <div className="flex justify-center gap-2">
              {foundCommon.sort((a, b) => a - b).map(m => (
                <span
                  key={m}
                  className={cn(
                    'px-3 py-1 rounded-full font-bold',
                    m === mcm
                      ? 'bg-yellow-400 text-yellow-900 ring-2 ring-yellow-600'
                      : 'bg-yellow-200 text-yellow-800',
                  )}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              const all = new Set(Array.from({ length: maxNumber }, (_, i) => i + 1));
              setRevealedNumbers(all);
              setFoundCommon(commonMultiples);
            }}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Revelar todos
          </button>
          <button
            onClick={() => {
              const all = new Set(Array.from({ length: maxNumber }, (_, i) => i + 1));
              setRevealedNumbers(all);
              setFoundCommon(commonMultiples);
              setPhase('discovery');
            }}
            disabled={foundCommon.length < 1}
            className={cn(
              'flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all',
              foundCommon.length >= 1
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
            )}
          >
            <span>Ver descubrimiento</span>
            <Sparkles size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: DISCOVERY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Cazador de Múltiplos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡Descubrimiento importante!
        </p>
      </div>

      {/* Summary of multiples */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 text-center mb-2">
            Múltiplos de {number1}
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {multiples1.map(m => (
              <span
                key={m}
                className={cn(
                  'px-3 py-1 rounded-full font-bold',
                  commonMultiples.includes(m)
                    ? 'bg-yellow-300 text-yellow-900'
                    : 'bg-blue-200 text-blue-800',
                )}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <h4 className="font-bold text-green-800 dark:text-green-200 text-center mb-2">
            Múltiplos de {number2}
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {multiples2.map(m => (
              <span
                key={m}
                className={cn(
                  'px-3 py-1 rounded-full font-bold',
                  commonMultiples.includes(m)
                    ? 'bg-yellow-300 text-yellow-900'
                    : 'bg-green-200 text-green-800',
                )}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Common multiples highlight */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 border-2 border-yellow-400">
        <h4 className="font-bold text-yellow-800 dark:text-yellow-200 text-center text-lg mb-3">
          Múltiplos Comunes
        </h4>
        <div className="flex justify-center gap-3 mb-4">
          {commonMultiples.map(m => (
            <span
              key={m}
              className={cn(
                'px-4 py-2 rounded-full font-bold text-lg transition-all',
                m === mcm
                  ? 'bg-yellow-400 text-yellow-900 ring-4 ring-yellow-600 scale-110'
                  : 'bg-yellow-200 text-yellow-800',
              )}
            >
              {m}
            </span>
          ))}
        </div>
        <div className="text-center">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium">
            El <strong>menor</strong> de todos es:
          </p>
          <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
            M.C.M.({number1}, {number2}) = {mcm}
          </p>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 text-center">
          <strong>Patrón descubierto:</strong> Para encontrar el M.C.M., buscamos
          todos los múltiplos comunes y elegimos el <strong>más pequeño</strong>.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
