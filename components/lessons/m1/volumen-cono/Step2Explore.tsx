'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, Play, RotateCcw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

// Dynamic import to avoid SSR issues with Three.js
const ConeScene3D = dynamic(() => import('./ConeScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] rounded-xl bg-slate-800 flex items-center justify-center">
      <div className="text-white animate-pulse">Cargando escena 3D...</div>
    </div>
  ),
});

type Phase = 0 | 1 | 2 | 3 | 4;

const PHASE_DESCRIPTIONS = [
  'Observa: un cilindro y 3 conos con la misma base y altura.',
  'El primer cono llena 1/3 del cilindro...',
  'El segundo cono llena otro tercio...',
  '¡El tercer cono completa exactamente el cilindro!',
  '¡Descubrimiento! El cono es exactamente 1/3 del cilindro.',
];

const PHASE_DELAY = 2000; // 2 seconds between phases

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Animation logic
  useEffect(() => {
    if (!isPlaying || phase >= 4) return;

    const timer = setTimeout(() => {
      const nextPhase = (phase + 1) as Phase;
      setPhase(nextPhase);

      // Update water level based on phase
      if (nextPhase === 1) setWaterLevel(0.33);
      else if (nextPhase === 2) setWaterLevel(0.66);
      else if (nextPhase === 3) setWaterLevel(1);

      if (nextPhase === 4) {
        setIsPlaying(false);
        setHasCompleted(true);
      }
    }, PHASE_DELAY);

    return () => clearTimeout(timer);
  }, [isPlaying, phase]);

  const handlePlay = () => {
    if (phase >= 4) {
      // Reset and replay
      setPhase(0);
      setWaterLevel(0);
      setHasCompleted(false);
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setPhase(0);
    setWaterLevel(0);
    setIsPlaying(false);
    setHasCompleted(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Experimento de los 3 Conos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Cuantos conos llenan un cilindro?
        </p>
      </div>

      {/* 3D Scene */}
      <div className="relative">
        <ConeScene3D phase={phase} waterLevel={waterLevel} />

        {/* Rotate hint */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Arrastra para rotar
        </div>
      </div>

      {/* Phase indicator */}
      <div className="flex justify-center gap-2">
        {[0, 1, 2, 3, 4].map((p) => (
          <div
            key={p}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              p <= phase ? 'bg-teal-500 scale-110' : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Phase description */}
      <div
        className={cn(
          'rounded-xl p-4 text-center transition-all',
          phase >= 4
            ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border-2 border-purple-300 dark:border-purple-600'
            : 'bg-teal-50 dark:bg-teal-900/30'
        )}
      >
        <p
          className={cn(
            'font-medium text-lg',
            phase >= 4
              ? 'text-purple-800 dark:text-purple-200'
              : 'text-teal-800 dark:text-teal-200'
          )}
        >
          {PHASE_DESCRIPTIONS[phase]}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handlePlay}
          disabled={isPlaying && phase < 4}
          className={cn(
            'flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all',
            isPlaying && phase < 4
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-teal-500 text-white hover:bg-teal-600'
          )}
        >
          <Play size={18} />
          <span>{phase >= 4 ? 'Repetir' : isPlaying ? 'Animando...' : 'Iniciar'}</span>
        </button>
        {phase > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <RotateCcw size={18} />
          </button>
        )}
      </div>

      {/* Formula reveal */}
      {hasCompleted && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span className="font-bold text-purple-800 dark:text-purple-200">
                ¡Lo descubriste!
              </span>
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                Se necesitan exactamente <strong>3 conos</strong> para llenar el cilindro.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Por lo tanto:
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 inline-block">
                <p className="font-mono text-xl text-purple-700 dark:text-purple-300">
                  V<sub>cono</sub> = <span className="text-red-500 font-bold">1/3</span> × V<sub>cilindro</sub>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-4 border border-teal-200 dark:border-teal-700">
            <p className="text-teal-800 dark:text-teal-200 text-center">
              Como V<sub>cilindro</sub> = π × r² × h, entonces:
            </p>
            <p className="font-mono text-xl text-center text-teal-700 dark:text-teal-300 mt-2 font-bold">
              V<sub>cono</sub> = (1/3) × π × r² × h
            </p>
          </div>
        </div>
      )}

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          disabled={!hasCompleted}
          className={cn(
            'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
            hasCompleted
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          )}
        >
          <span>Ver la formula completa</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
