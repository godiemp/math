'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'bars' | 'mean';

const PHASE_DURATION = 4000;

// Sample data points
const DATA = [
  { label: 'Lun', value: 45, color: '#f97316' },
  { label: 'Mar', value: 72, color: '#f97316' },
  { label: 'Mié', value: 58, color: '#f97316' },
  { label: 'Jue', value: 85, color: '#f97316' },
  { label: 'Vie', value: 63, color: '#f97316' },
];

const MAX_VALUE = 100;
const MEAN = Math.round(DATA.reduce((sum, d) => sum + d.value, 0) / DATA.length);

export function StatsPreview() {
  const [phase, setPhase] = useState<Phase>('bars');
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === 'bars' ? 'mean' : 'bars'));
      setAnimKey((k) => k + 1);
    }, PHASE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'bars' ? (
          <BarChartAnimation key={`bars-${animKey}`} />
        ) : (
          <MeanAnimation key={`mean-${animKey}`} />
        )}
      </AnimatePresence>
    </div>
  );
}

function BarChartAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-3"
      >
        Representación de Datos
      </motion.p>

      {/* Bar chart */}
      <div className="flex items-end justify-center gap-3 h-32 w-full max-w-xs">
        {DATA.map((item, index) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <motion.div
              className="w-10 rounded-t-md"
              style={{ backgroundColor: item.color }}
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / MAX_VALUE) * 100}px` }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.1,
                ease: 'easeOut',
              }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Y-axis label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-2 text-xs text-gray-500 dark:text-gray-400"
      >
        Ejercicios completados por día
      </motion.p>
    </motion.div>
  );
}

function MeanAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-3"
      >
        Promedio (Media)
      </motion.p>

      {/* Bar chart with mean line */}
      <div className="relative flex items-end justify-center gap-3 h-32 w-full max-w-xs">
        {/* Mean line */}
        <motion.div
          className="absolute left-0 right-0 border-t-2 border-dashed border-red-500"
          style={{ bottom: `${(MEAN / MAX_VALUE) * 100}px` }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />

        {/* Mean label */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded"
          style={{ bottom: `${(MEAN / MAX_VALUE) * 100 + 4}px` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
        >
          x̄ = {MEAN}
        </motion.div>

        {DATA.map((item, index) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <motion.div
              className="w-10 rounded-t-md"
              style={{ backgroundColor: item.color }}
              initial={{ height: `${(item.value / MAX_VALUE) * 100}px` }}
              animate={{ height: `${(item.value / MAX_VALUE) * 100}px` }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Formula */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="mt-3 text-center"
      >
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          x̄ = Σx / n = {DATA.reduce((s, d) => s + d.value, 0)} / {DATA.length} = <span className="text-red-600 font-bold">{MEAN}</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
