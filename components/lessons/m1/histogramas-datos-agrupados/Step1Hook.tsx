'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Timer, HelpCircle, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'chaos' | 'guess' | 'reveal';

// Individual race times (in seconds) - raw data that's hard to interpret
const RACE_TIMES = [
  12.3, 14.1, 15.8, 11.9, 13.5, 16.2, 12.8, 14.7, 15.1, 13.2,
  11.5, 14.9, 15.5, 12.1, 13.8, 16.0, 12.5, 14.3, 15.3, 13.0,
  11.8, 14.5, 15.9, 12.7, 13.4, 15.7, 12.0, 14.0, 15.0, 13.6,
];

// Grouped intervals for the reveal
const INTERVALS = [
  { range: '11-12', label: '11 - 12 s', count: 4, color: '#10B981' },
  { range: '12-13', label: '12 - 13 s', count: 6, color: '#3B82F6' },
  { range: '13-14', label: '13 - 14 s', count: 6, color: '#8B5CF6' },
  { range: '14-15', label: '14 - 15 s', count: 6, color: '#F59E0B' },
  { range: '15-16', label: '15 - 16 s', count: 6, color: '#EF4444' },
  { range: '16-17', label: '16 - 17 s', count: 2, color: '#EC4899' },
];

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('chaos');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [visibleTimes, setVisibleTimes] = useState<number>(0);

  // Animate the times appearing in chaos phase
  useEffect(() => {
    if (phase === 'chaos' && isActive) {
      const interval = setInterval(() => {
        setVisibleTimes((prev) => {
          if (prev >= RACE_TIMES.length) {
            return prev;
          }
          return prev + 1;
        });
      }, 80);

      return () => clearInterval(interval);
    }
  }, [phase, isActive]);

  if (!isActive) return null;

  // ============ PHASE 1: CHAOS - Raw data display ============
  if (phase === 'chaos') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <Timer className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              Carrera de 100 metros
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Entrenador Confundido
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Estos son los tiempos de 30 estudiantes en la carrera...
          </p>
        </div>

        {/* Raw data container */}
        <div className="bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
          <div className="min-h-32 max-h-64 overflow-y-auto relative">
            <div className="flex flex-wrap gap-2 justify-center">
              {RACE_TIMES.slice(0, visibleTimes).map((time, index) => (
                <div
                  key={index}
                  className={cn(
                    'px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-sm font-mono',
                    'animate-fadeIn border border-gray-100 dark:border-gray-700'
                  )}
                  style={{ animationDelay: `${index * 20}ms` }}
                >
                  <span className="text-gray-700 dark:text-gray-300">{time.toFixed(1)}s</span>
                </div>
              ))}
            </div>
          </div>

          {/* Counter */}
          <div className="text-center mt-3 text-amber-700 dark:text-amber-300">
            <span className="font-mono">{visibleTimes}</span> / {RACE_TIMES.length} tiempos
          </div>
        </div>

        {/* Progress to next phase */}
        {visibleTimes >= RACE_TIMES.length && (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Muchos datos... <strong>Es dificil ver un patron, ¿verdad?</strong>
            </p>
            <button
              onClick={() => setPhase('guess')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Intentar responder</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Speed up button */}
        {visibleTimes < RACE_TIMES.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleTimes(RACE_TIMES.length)}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              Ver todos los tiempos
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 2: GUESS - Multiple choice ============
  if (phase === 'guess') {
    const options = [
      { id: 'A', text: 'La mayoria esta entre 11-12 segundos' },
      { id: 'B', text: 'Los tiempos estan distribuidos uniformemente' },
      { id: 'C', text: 'La mayoria esta entre 12-15 segundos' },
      { id: 'D', text: 'Hay mas tiempos lentos (15+) que rapidos' },
    ];
    const correctAnswer = 'C';

    const handleGuess = (answer: string) => {
      setSelectedAnswer(answer);
      setShowResult(true);
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              ¿Puedes adivinarlo?
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Que puedes decir de los datos?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Sin organizarlos, intenta identificar el patron...
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrect = option.id === correctAnswer;
            const showFeedback = showResult && isSelected;

            return (
              <button
                key={option.id}
                onClick={() => !showResult && handleGuess(option.id)}
                disabled={showResult}
                className={cn(
                  'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
                  !showResult && 'hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-300',
                  isSelected && !showResult && 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
                  showFeedback && isCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                  showFeedback && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                  !isSelected && showResult && 'opacity-50',
                  !showResult && !isSelected && 'border-gray-200 dark:border-gray-700'
                )}
              >
                <span
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                    isSelected
                      ? showFeedback
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  )}
                >
                  {option.id}
                </span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Result feedback */}
        {showResult && (
          <div
            className={cn(
              'p-4 rounded-xl animate-fadeIn',
              selectedAnswer === correctAnswer
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
            )}
          >
            <p className="text-center">
              {selectedAnswer === correctAnswer ? (
                <span className="text-green-700 dark:text-green-300">
                  <strong>¡Correcto!</strong> Pero fue dificil verlo sin organizar los datos, ¿verdad?
                </span>
              ) : (
                <span className="text-amber-700 dark:text-amber-300">
                  <strong>No exactamente.</strong> Con tantos datos sueltos es dificil ver el patron real.
                </span>
              )}
            </p>
          </div>
        )}

        {/* Continue button */}
        {showResult && (
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('reveal')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Ver la solucion</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: REVEAL - Organized grouped data ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡La solucion!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Agrupando los Datos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Al agrupar en intervalos, el patron aparece
        </p>
      </div>

      {/* Histogram visualization */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
        <div className="space-y-3">
          {INTERVALS.map((interval, index) => (
            <div
              key={interval.range}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className="w-20 text-sm font-mono text-gray-600 dark:text-gray-400">
                {interval.label}
              </span>

              {/* Visual bar */}
              <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{
                    width: `${(interval.count / 6) * 100}%`,
                    backgroundColor: interval.color,
                  }}
                >
                  <span className="text-white text-sm font-bold">{interval.count}</span>
                </div>
              </div>

              {interval.count >= 6 && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded">
                  Mayor frecuencia
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <div className="flex items-start gap-3">
          <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-800 dark:text-blue-200 font-semibold">
              Esto es un Histograma
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
              Al <strong>agrupar</strong> datos numericos en <strong>intervalos</strong> y
              graficar sus frecuencias, podemos ver como se distribuyen.
              ¡La mayoria de tiempos esta entre 12-15 segundos!
            </p>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>¡Aprender a construirlo!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
