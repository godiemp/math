'use client';

import { useState } from 'react';
import { ArrowRight, Shuffle, Eye, Lightbulb, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import {
  POPULATION_SIZE,
  DEFAULT_SAMPLE_SIZE,
  PREFERENCE_COLORS,
  PRE_GENERATED_SAMPLES,
  ACTUAL_COUNTS,
  Preference,
} from './data';

type Phase = 'intro' | 'sampling' | 'compare' | 'reveal';

interface SampleResult {
  galletas: number;
  papas: number;
  frutas: number;
  total: number;
}

// Population grid showing hidden preferences
function PopulationGridHidden({ revealedIndices }: { revealedIndices: Set<number> }) {
  const gridSize = 200; // 200 squares representing 800 students (4 each)
  const cols = 20;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid gap-0.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: gridSize }).map((_, i) => {
          const isRevealed = revealedIndices.has(i);
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scale: isRevealed ? 1.2 : 1,
                backgroundColor: isRevealed ? '#f59e0b' : undefined,
              }}
              className={cn(
                'w-3 h-3 rounded-sm transition-colors',
                isRevealed ? 'bg-amber-500 z-10' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          );
        })}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Población: {POPULATION_SIZE} estudiantes (preferencias ocultas)
      </p>
    </div>
  );
}

// Sample results bar chart
function SampleBarChart({ sample, showPercentages = true }: { sample: SampleResult; showPercentages?: boolean }) {
  const maxCount = Math.max(sample.galletas, sample.papas, sample.frutas);
  const barHeight = 120;

  const bars = [
    { key: 'galletas' as Preference, count: sample.galletas },
    { key: 'papas' as Preference, count: sample.papas },
    { key: 'frutas' as Preference, count: sample.frutas },
  ];

  return (
    <div className="flex justify-center items-end gap-6 h-48">
      {bars.map(({ key, count }) => {
        const height = maxCount > 0 ? (count / maxCount) * barHeight : 0;
        const percentage = ((count / sample.total) * 100).toFixed(0);
        const colors = PREFERENCE_COLORS[key];

        return (
          <div key={key} className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={cn('w-16 rounded-t-lg', colors.bg, colors.border, 'border-2')}
              style={{ minHeight: height > 0 ? 20 : 0 }}
            />
            <div className="text-center">
              <div className="text-2xl">{colors.emoji}</div>
              <div className={cn('text-lg font-bold', colors.text)}>{count}</div>
              {showPercentages && (
                <div className="text-xs text-gray-500 dark:text-gray-400">{percentage}%</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// All samples comparison
function SamplesComparison({ samples }: { samples: SampleResult[] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {samples.map((sample, i) => {
          const galletasPct = ((sample.galletas / sample.total) * 100).toFixed(0);
          return (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
                Muestra {i + 1}
              </div>
              <div className="flex justify-center gap-2 text-sm mb-2">
                <span className="text-amber-600">{sample.galletas}</span>
                <span className="text-red-600">{sample.papas}</span>
                <span className="text-green-600">{sample.frutas}</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-amber-600">{galletasPct}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Galletas</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [samples, setSamples] = useState<SampleResult[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  if (!isActive) return null;

  const handleTakeSample = () => {
    if (currentSampleIndex >= PRE_GENERATED_SAMPLES.length) return;

    setIsAnimating(true);

    // Animate revealing random grid squares
    const newIndices = new Set(revealedIndices);
    const indicesToAdd: number[] = [];
    while (indicesToAdd.length < 10) {
      const idx = Math.floor(Math.random() * 200);
      if (!newIndices.has(idx) && !indicesToAdd.includes(idx)) {
        indicesToAdd.push(idx);
      }
    }

    // Animate indices one by one
    indicesToAdd.forEach((idx, i) => {
      setTimeout(() => {
        setRevealedIndices((prev) => new Set([...prev, idx]));
      }, i * 50);
    });

    // After animation, show the sample result
    setTimeout(() => {
      const newSample = PRE_GENERATED_SAMPLES[currentSampleIndex];
      setSamples((prev) => [...prev, newSample]);
      setCurrentSampleIndex((prev) => prev + 1);
      setIsAnimating(false);
    }, 600);
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Shuffle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              El Laboratorio de Muestras
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Vamos a Experimentar
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tomaremos varias muestras de la población para ver qué descubrimos
          </p>
        </div>

        {/* Population grid */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <PopulationGridHidden revealedIndices={new Set()} />
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            Cada vez que tomes una muestra, seleccionarás <strong>{DEFAULT_SAMPLE_SIZE} estudiantes al azar</strong> y
            verás sus preferencias. ¿Todas las muestras darán el mismo resultado?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('sampling')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Comenzar a muestrear</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: SAMPLING ============
  if (phase === 'sampling') {
    const currentSample = samples[samples.length - 1];
    const canTakeMore = currentSampleIndex < PRE_GENERATED_SAMPLES.length;

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Muestra {samples.length} de {PRE_GENERATED_SAMPLES.length}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {samples.length === 0 ? 'Toma tu Primera Muestra' : `Resultados de Muestra ${samples.length}`}
          </h2>
        </div>

        {/* Population grid with revealed samples */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <PopulationGridHidden revealedIndices={revealedIndices} />
        </div>

        {/* Current sample results */}
        <AnimatePresence mode="wait">
          {currentSample && (
            <motion.div
              key={samples.length}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
            >
              <SampleBarChart sample={currentSample} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress and hint */}
        {samples.length >= 2 && samples.length < PRE_GENERATED_SAMPLES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700"
          >
            <p className="text-amber-800 dark:text-amber-200 text-center text-sm">
              <strong>¿Notas algo?</strong> Cada muestra da un porcentaje ligeramente diferente
              para Galletas: {samples.map((s) => `${((s.galletas / s.total) * 100).toFixed(0)}%`).join(', ')}
            </p>
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {canTakeMore ? (
            <button
              onClick={handleTakeSample}
              disabled={isAnimating}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all',
                isAnimating
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
              )}
            >
              <Shuffle size={20} className={isAnimating ? 'animate-spin' : ''} />
              <span>{isAnimating ? 'Tomando muestra...' : 'Tomar otra muestra'}</span>
            </button>
          ) : (
            <button
              onClick={() => setPhase('compare')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Comparar todas las muestras</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>

        {/* Sample count indicator */}
        <div className="flex justify-center gap-2">
          {PRE_GENERATED_SAMPLES.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                i < samples.length ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  // ============ PHASE 3: COMPARE ============
  if (phase === 'compare') {
    const galletasPercentages = samples.map((s) => (s.galletas / s.total) * 100);
    const minPct = Math.min(...galletasPercentages).toFixed(0);
    const maxPct = Math.max(...galletasPercentages).toFixed(0);
    const avgPct = (galletasPercentages.reduce((a, b) => a + b, 0) / galletasPercentages.length).toFixed(0);

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">
              Comparación de Muestras
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Qué Observas?
          </h2>
        </div>

        {/* All samples side by side */}
        <SamplesComparison samples={samples} />

        {/* Key observation */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-700">
          <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
            Observaciones clave:
          </h4>
          <ul className="space-y-2 text-indigo-700 dark:text-indigo-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500">•</span>
              <span>
                El porcentaje de Galletas varió entre <strong>{minPct}%</strong> y{' '}
                <strong>{maxPct}%</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500">•</span>
              <span>
                El promedio de las muestras es <strong>{avgPct}%</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500">•</span>
              <span>
                ¡Las muestras no son idénticas, pero están <strong>cerca unas de otras</strong>!
              </span>
            </li>
          </ul>
        </div>

        {/* Question prompt */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-center">
            <strong>Pregunta:</strong> ¿Cuál crees que es el porcentaje REAL de estudiantes que
            prefiere Galletas en toda la población?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('reveal')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Revelar la verdad</span>
            <Target size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: REVEAL ============
  const trueGalletasPct = ((ACTUAL_COUNTS.galletas / POPULATION_SIZE) * 100).toFixed(0);
  const truePapasPct = ((ACTUAL_COUNTS.papas / POPULATION_SIZE) * 100).toFixed(0);
  const trueFrutasPct = ((ACTUAL_COUNTS.frutas / POPULATION_SIZE) * 100).toFixed(0);
  const avgSamplePct = (
    samples.reduce((sum, s) => sum + (s.galletas / s.total) * 100, 0) / samples.length
  ).toFixed(0);

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            La Verdad Revelada
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Valores Reales de la Población
        </h2>
      </div>

      {/* True population values */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
          Preferencias REALES de los {POPULATION_SIZE} estudiantes
        </h4>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-4xl mb-2">{PREFERENCE_COLORS.galletas.emoji}</div>
            <div className="text-3xl font-bold text-amber-600">{trueGalletasPct}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {ACTUAL_COUNTS.galletas} estudiantes
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">{PREFERENCE_COLORS.papas.emoji}</div>
            <div className="text-3xl font-bold text-red-600">{truePapasPct}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {ACTUAL_COUNTS.papas} estudiantes
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">{PREFERENCE_COLORS.frutas.emoji}</div>
            <div className="text-3xl font-bold text-green-600">{trueFrutasPct}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {ACTUAL_COUNTS.frutas} estudiantes
            </div>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-green-800 dark:text-green-200 mb-2">
              ¡El muestreo funcionó!
            </p>
            <p className="text-green-700 dark:text-green-300 text-sm">
              El valor real de Galletas es <strong>{trueGalletasPct}%</strong> y el promedio de
              nuestras muestras fue <strong>{avgSamplePct}%</strong>. ¡Muy cerca! Con solo{' '}
              {DEFAULT_SAMPLE_SIZE} estudiantes pudimos estimar bien lo que piensan{' '}
              {POPULATION_SIZE}.
            </p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-center text-sm">
          <strong>Descubrimiento:</strong> Las muestras varían, pero{' '}
          <em>se agrupan alrededor del valor verdadero</em>. Por eso el muestreo es tan útil.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Aprender la teoría</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
