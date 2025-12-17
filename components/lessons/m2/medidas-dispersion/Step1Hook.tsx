'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Target, HelpCircle, Sparkles, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'guess' | 'reveal';

// Two archers with same average but very different consistency
const ARCHER_A = {
  name: 'Ana',
  emoji: '🎯',
  scores: [7, 8, 8, 9, 8], // Consistent - all close to 8
};

const ARCHER_B = {
  name: 'Bruno',
  emoji: '🏹',
  scores: [2, 5, 8, 11, 14], // Inconsistent - spread out
};

// Calculate mean
function calculateMean(data: number[]) {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

// Calculate range
function calculateRange(data: number[]) {
  return Math.max(...data) - Math.min(...data);
}

// Calculate variance
function calculateVariance(data: number[]) {
  const mean = calculateMean(data);
  const squaredDiffs = data.map(x => Math.pow(x - mean, 2));
  return squaredDiffs.reduce((a, b) => a + b, 0) / data.length;
}

// Calculate standard deviation
function calculateStdDev(data: number[]) {
  return Math.sqrt(calculateVariance(data));
}

const MEAN_A = calculateMean(ARCHER_A.scores);
const MEAN_B = calculateMean(ARCHER_B.scores);
const RANGE_A = calculateRange(ARCHER_A.scores);
const RANGE_B = calculateRange(ARCHER_B.scores);
const STD_A = calculateStdDev(ARCHER_A.scores);
const STD_B = calculateStdDev(ARCHER_B.scores);

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedArcher, setSelectedArcher] = useState<'A' | 'B' | null>(null);

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <Target className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              El Torneo de Tiro con Arco
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Quien es el mejor arquero?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Dos arqueros compiten. Mira sus puntajes en 5 tiros.
          </p>
        </div>

        {/* Archers comparison */}
        <div className="grid grid-cols-2 gap-4">
          {/* Archer A - Consistent */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
            <div className="text-center mb-3">
              <span className="text-4xl">{ARCHER_A.emoji}</span>
              <p className="font-bold text-blue-700 dark:text-blue-300 mt-1">{ARCHER_A.name}</p>
            </div>
            <div className="space-y-2">
              {ARCHER_A.scores.map((score, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-12">Tiro {i + 1}:</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all"
                      style={{ width: `${(score / 15) * 100}%` }}
                    />
                  </div>
                  <span className="font-bold text-blue-600 w-6 text-right">{score}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
              <p className="text-center text-sm text-blue-600 dark:text-blue-400">
                Promedio: <strong>{MEAN_A} puntos</strong>
              </p>
            </div>
          </div>

          {/* Archer B - Inconsistent */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-700">
            <div className="text-center mb-3">
              <span className="text-4xl">{ARCHER_B.emoji}</span>
              <p className="font-bold text-orange-700 dark:text-orange-300 mt-1">{ARCHER_B.name}</p>
            </div>
            <div className="space-y-2">
              {ARCHER_B.scores.map((score, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-12">Tiro {i + 1}:</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-orange-500 h-full rounded-full transition-all"
                      style={{ width: `${(score / 15) * 100}%` }}
                    />
                  </div>
                  <span className="font-bold text-orange-600 w-6 text-right">{score}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-orange-200 dark:border-orange-700">
              <p className="text-center text-sm text-orange-600 dark:text-orange-400">
                Promedio: <strong>{MEAN_B} puntos</strong>
              </p>
            </div>
          </div>
        </div>

        {/* The dilemma */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-800 dark:text-purple-200 font-semibold">
                El dilema del entrenador
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                ¡Ambos tienen el <strong>mismo promedio</strong>!
                Pero para la final necesita al arquero mas <strong>confiable</strong>.
                ¿A quien elegirias?
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('guess')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Elegir mi arquero</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: GUESS ============
  if (phase === 'guess') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <Target className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              Tu decision
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Quien es mas confiable?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Elige al arquero que llevarias a la final
          </p>
        </div>

        {/* Selection cards */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedArcher('A')}
            className={cn(
              'p-6 rounded-xl border-2 transition-all',
              selectedArcher === 'A'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-300'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
            )}
          >
            <span className="text-4xl block mb-2">{ARCHER_A.emoji}</span>
            <p className="font-bold text-lg">{ARCHER_A.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Puntajes: {ARCHER_A.scores.join(', ')}
            </p>
          </button>

          <button
            onClick={() => setSelectedArcher('B')}
            className={cn(
              'p-6 rounded-xl border-2 transition-all',
              selectedArcher === 'B'
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 ring-2 ring-orange-300'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
            )}
          >
            <span className="text-4xl block mb-2">{ARCHER_B.emoji}</span>
            <p className="font-bold text-lg">{ARCHER_B.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Puntajes: {ARCHER_B.scores.join(', ')}
            </p>
          </button>
        </div>

        {selectedArcher && (
          <div className="flex justify-center animate-fadeIn">
            <button
              onClick={() => setPhase('reveal')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>Confirmar eleccion</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: REVEAL ============
  const isCorrect = selectedArcher === 'A';

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
          isCorrect
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-amber-100 dark:bg-amber-900/30'
        )}>
          {isCorrect ? (
            <>
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-green-700 dark:text-green-300 font-medium">
                ¡Excelente eleccion!
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span className="text-amber-700 dark:text-amber-300 font-medium">
                Interesante... pero hay un mejor criterio
              </span>
            </>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Secreto esta en la Dispersion
        </h2>
      </div>

      {/* Comparison with dispersion */}
      <div className="space-y-4">
        {/* Ana - Low dispersion */}
        <div className={cn(
          'p-4 rounded-xl border-2',
          'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700'
        )}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{ARCHER_A.emoji}</span>
            <div>
              <p className="font-bold text-green-700 dark:text-green-300">{ARCHER_A.name}</p>
              <p className="text-sm text-green-600 dark:text-green-400">Promedio: {MEAN_A} puntos</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-green-600">
              <Check size={20} />
              <span className="font-medium">Mas confiable</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
              <p className="text-gray-500">Rango:</p>
              <p className="font-bold text-green-600">{RANGE_A} puntos</p>
              <p className="text-xs text-gray-400">(max - min)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
              <p className="text-gray-500">Desviacion:</p>
              <p className="font-bold text-green-600">{STD_A.toFixed(1)} puntos</p>
              <p className="text-xs text-gray-400">(variacion tipica)</p>
            </div>
          </div>
        </div>

        {/* Bruno - High dispersion */}
        <div className={cn(
          'p-4 rounded-xl border-2',
          'border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-700'
        )}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{ARCHER_B.emoji}</span>
            <div>
              <p className="font-bold text-orange-700 dark:text-orange-300">{ARCHER_B.name}</p>
              <p className="text-sm text-orange-600 dark:text-orange-400">Promedio: {MEAN_B} puntos</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-orange-600">
              <X size={20} />
              <span className="font-medium">Menos confiable</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
              <p className="text-gray-500">Rango:</p>
              <p className="font-bold text-orange-600">{RANGE_B} puntos</p>
              <p className="text-xs text-gray-400">(max - min)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
              <p className="text-gray-500">Desviacion:</p>
              <p className="font-bold text-orange-600">{STD_B.toFixed(1)} puntos</p>
              <p className="text-xs text-gray-400">(variacion tipica)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-purple-800 dark:text-purple-200 font-semibold">
              El gran descubrimiento
            </p>
            <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
              El promedio solo cuenta <strong>una parte de la historia</strong>.
              Para saber que tan consistentes son los datos, necesitamos medir la <strong>dispersion</strong>:
              que tan separados estan los valores del promedio.
            </p>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          <span>¡Aprender a medir la dispersion!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
