'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

interface FrequencySimulatorProps {
  probability: number;
  trialSteps?: number[];
  showTargetLine?: boolean;
  eventLabel?: string;
  eventEmoji?: string;
  onConvergenceReached?: () => void;
  className?: string;
}

// Generate random outcomes for a given number of trials
const generateOutcomes = (count: number, probability: number): boolean[] => {
  return Array.from({ length: count }, () => Math.random() < probability);
};

// Calculate running relative frequencies
const calculateFrequencies = (outcomes: boolean[]): number[] => {
  let successes = 0;
  return outcomes.map((outcome, i) => {
    if (outcome) successes++;
    return successes / (i + 1);
  });
};

export default function FrequencySimulator({
  probability,
  trialSteps = [10, 50, 100, 500, 1000],
  showTargetLine = true,
  eventLabel = 'Cara',
  eventEmoji = '🪙',
  onConvergenceReached,
  className,
}: FrequencySimulatorProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [outcomes, setOutcomes] = useState<boolean[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [key, setKey] = useState(0); // For resetting

  const currentTrials = trialSteps[currentStepIndex];
  const frequencies = useMemo(() => calculateFrequencies(outcomes), [outcomes]);
  const currentFrequency = frequencies[frequencies.length - 1] || 0;

  // Generate new outcomes when trial count changes
  useEffect(() => {
    const newOutcomes = generateOutcomes(currentTrials, probability);
    setOutcomes(newOutcomes);
    setIsAnimating(true);

    // Check for convergence (within 5% of true probability with 500+ trials)
    const freq = calculateFrequencies(newOutcomes);
    const finalFreq = freq[freq.length - 1] || 0;
    if (currentTrials >= 500 && Math.abs(finalFreq - probability) < 0.05) {
      onConvergenceReached?.();
    }

    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentTrials, probability, key, onConvergenceReached]);

  const handleStepChange = (index: number) => {
    setCurrentStepIndex(index);
  };

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  // SVG chart dimensions
  const chartWidth = 320;
  const chartHeight = 180;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  // Scale functions
  const xScale = useCallback(
    (index: number) => {
      return padding.left + (index / (currentTrials - 1)) * plotWidth;
    },
    [currentTrials, plotWidth, padding.left]
  );

  const yScale = useCallback(
    (value: number) => {
      return padding.top + (1 - value) * plotHeight;
    },
    [plotHeight, padding.top]
  );

  // Generate path for the frequency line
  const linePath = useMemo(() => {
    if (frequencies.length === 0) return '';

    // Sample points for performance (max 100 points)
    const step = Math.max(1, Math.floor(frequencies.length / 100));
    const sampledPoints: { x: number; y: number }[] = [];

    for (let i = 0; i < frequencies.length; i += step) {
      sampledPoints.push({
        x: xScale(i),
        y: yScale(frequencies[i]),
      });
    }

    // Always include the last point
    if (sampledPoints[sampledPoints.length - 1]?.x !== xScale(frequencies.length - 1)) {
      sampledPoints.push({
        x: xScale(frequencies.length - 1),
        y: yScale(frequencies[frequencies.length - 1]),
      });
    }

    return sampledPoints
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');
  }, [frequencies, xScale, yScale]);

  // Count successes
  const successCount = outcomes.filter(Boolean).length;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Trial step selector */}
      <div className="flex justify-center gap-2 flex-wrap">
        {trialSteps.map((step, index) => (
          <button
            key={step}
            onClick={() => handleStepChange(index)}
            className={cn(
              'px-4 py-2 rounded-lg font-semibold transition-all text-sm',
              currentStepIndex === index
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {step} ensayos
          </button>
        ))}
        <button
          onClick={handleReset}
          className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          title="Reiniciar"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <svg width={chartWidth} height={chartHeight} className="mx-auto">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((val) => (
            <g key={val}>
              <line
                x1={padding.left}
                y1={yScale(val)}
                x2={chartWidth - padding.right}
                y2={yScale(val)}
                className="stroke-gray-200 dark:stroke-gray-700"
                strokeWidth={1}
                strokeDasharray={val === probability ? '0' : '4 4'}
              />
              <text
                x={padding.left - 8}
                y={yScale(val) + 4}
                textAnchor="end"
                className="fill-gray-500 dark:fill-gray-400 text-xs"
              >
                {(val * 100).toFixed(0)}%
              </text>
            </g>
          ))}

          {/* Target probability line */}
          {showTargetLine && (
            <line
              x1={padding.left}
              y1={yScale(probability)}
              x2={chartWidth - padding.right}
              y2={yScale(probability)}
              className="stroke-green-500 dark:stroke-green-400"
              strokeWidth={2}
              strokeDasharray="8 4"
            />
          )}

          {/* Frequency line */}
          <motion.path
            key={`path-${key}-${currentTrials}`}
            d={linePath}
            fill="none"
            className="stroke-blue-500 dark:stroke-blue-400"
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Current frequency point */}
          {frequencies.length > 0 && (
            <motion.circle
              cx={xScale(frequencies.length - 1)}
              cy={yScale(currentFrequency)}
              r={6}
              className="fill-blue-500 dark:fill-blue-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 }}
            />
          )}

          {/* X-axis labels */}
          <text
            x={chartWidth / 2}
            y={chartHeight - 5}
            textAnchor="middle"
            className="fill-gray-600 dark:fill-gray-400 text-xs"
          >
            Numero de ensayos
          </text>
          <text
            x={padding.left}
            y={chartHeight - 5}
            textAnchor="start"
            className="fill-gray-500 dark:fill-gray-400 text-xs"
          >
            0
          </text>
          <text
            x={chartWidth - padding.right}
            y={chartHeight - 5}
            textAnchor="end"
            className="fill-gray-500 dark:fill-gray-400 text-xs"
          >
            {currentTrials}
          </text>
        </svg>
      </div>

      {/* Results summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">{eventEmoji}</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {successCount} / {currentTrials}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {eventLabel}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Frecuencia Relativa
          </div>
          <motion.div
            key={`freq-${key}-${currentTrials}`}
            className="text-2xl font-bold text-purple-600 dark:text-purple-400"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {(currentFrequency * 100).toFixed(1)}%
          </motion.div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Teorico: {(probability * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Convergence indicator */}
      <div className="text-center">
        {currentTrials >= 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
              Math.abs(currentFrequency - probability) < 0.1
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
            )}
          >
            {Math.abs(currentFrequency - probability) < 0.1 ? (
              <>
                <span className="text-lg">✓</span>
                <span>La frecuencia se acerca al valor teorico</span>
              </>
            ) : (
              <>
                <span className="text-lg">↻</span>
                <span>Aumenta los ensayos para mayor precision</span>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500 dark:bg-blue-400 rounded" />
          <span className="text-gray-600 dark:text-gray-400">
            Frecuencia observada
          </span>
        </div>
        {showTargetLine && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-0 border-t-2 border-dashed border-green-500 dark:border-green-400" />
            <span className="text-gray-600 dark:text-gray-400">
              Probabilidad teorica
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
