'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Plus, Equal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface RuleExample {
  a: number;
  b: number;
  result: number;
  explanation: string;
}

const SAME_SIGN_EXAMPLES: RuleExample[] = [
  { a: 3, b: 5, result: 8, explanation: 'Ambos positivos: sumamos y queda positivo' },
  { a: -2, b: -4, result: -6, explanation: 'Ambos negativos: sumamos y queda negativo' },
];

const DIFFERENT_SIGN_EXAMPLES: RuleExample[] = [
  { a: 5, b: -3, result: 2, explanation: '|5| > |-3|, así que el resultado es positivo' },
  { a: -7, b: 4, result: -3, explanation: '|-7| > |4|, así que el resultado es negativo' },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [selectedSame, setSelectedSame] = useState<number | null>(null);
  const [selectedDiff, setSelectedDiff] = useState<number | null>(null);

  // Mark step as completed when it becomes active
  useEffect(() => {
    if (isActive) {
      onComplete();
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las Reglas de Signos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Dos casos simples para sumar enteros
        </p>
      </div>

      {/* Visual summary */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Same signs */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border-2 border-green-300 dark:border-green-700">
          <h3 className="font-bold text-lg text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">1</span>
            Signos Iguales
          </h3>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-2 text-xl font-mono">
              <span className="text-green-600">+</span>
              <span>con</span>
              <span className="text-green-600">+</span>
              <span className="mx-2">→</span>
              <span className="font-bold text-green-600">+</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xl font-mono mt-2">
              <span className="text-blue-600">−</span>
              <span>con</span>
              <span className="text-blue-600">−</span>
              <span className="mx-2">→</span>
              <span className="font-bold text-blue-600">−</span>
            </div>
          </div>

          <p className="text-sm text-green-700 dark:text-green-300 text-center mb-4">
            <strong>Suma</strong> los valores y <strong>mantén</strong> el signo
          </p>

          {/* Examples */}
          <div className="space-y-2">
            {SAME_SIGN_EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => setSelectedSame(i === selectedSame ? null : i)}
                className={cn(
                  'w-full p-3 rounded-lg text-left transition-all',
                  selectedSame === i
                    ? 'bg-green-200 dark:bg-green-800/50 ring-2 ring-green-400'
                    : 'bg-white/50 dark:bg-gray-700/50 hover:bg-green-100 dark:hover:bg-green-900/30'
                )}
              >
                <div className="font-mono text-lg text-center">
                  ({ex.a}) + ({ex.b}) = <strong>{ex.result}</strong>
                </div>
                {selectedSame === i && (
                  <p className="text-xs text-green-700 dark:text-green-300 mt-2 text-center animate-fadeIn">
                    {ex.explanation}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Different signs */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border-2 border-purple-300 dark:border-purple-700">
          <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">2</span>
            Signos Diferentes
          </h3>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-2 text-xl font-mono">
              <span className="text-green-600">+</span>
              <span>con</span>
              <span className="text-blue-600">−</span>
              <span className="mx-2">→</span>
              <span className="font-bold text-gray-600">?</span>
            </div>
          </div>

          <p className="text-sm text-purple-700 dark:text-purple-300 text-center mb-4">
            <strong>Resta</strong> los valores y usa el signo del <strong>mayor</strong>
          </p>

          {/* Examples */}
          <div className="space-y-2">
            {DIFFERENT_SIGN_EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => setSelectedDiff(i === selectedDiff ? null : i)}
                className={cn(
                  'w-full p-3 rounded-lg text-left transition-all',
                  selectedDiff === i
                    ? 'bg-purple-200 dark:bg-purple-800/50 ring-2 ring-purple-400'
                    : 'bg-white/50 dark:bg-gray-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                )}
              >
                <div className="font-mono text-lg text-center">
                  ({ex.a}) + ({ex.b}) = <strong>{ex.result}</strong>
                </div>
                {selectedDiff === i && (
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-2 text-center animate-fadeIn">
                    {ex.explanation}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Memory trick */}
      <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-6 border border-yellow-300 dark:border-yellow-700">
        <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3 text-center">
          💡 Truco para recordar
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="font-bold text-green-600 dark:text-green-400 mb-1">Signos iguales = Amigos</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Se suman y mantienen su signo</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="font-bold text-purple-600 dark:text-purple-400 mb-1">Signos diferentes = Pelea</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Gana el más grande (en valor absoluto)</p>
          </div>
        </div>
      </div>

      {/* Direction reminder from Step 2 */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
          <strong>Recuerda:</strong> En la recta numérica, sumar positivo = derecha, sumar negativo = izquierda
        </p>
      </div>
    </div>
  );
}
