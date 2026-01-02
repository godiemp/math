'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';

type Phase = 'intro' | 'explore' | 'summary';

interface Scale {
  id: string;
  name: string;
  emoji: string;
  formula: string;
  comparison1: { value: number; name: string };
  comparison2: { value: number; name: string };
  difference: number;
  factor: string;
  explanation: string;
  color: string;
}

const SCALES: Scale[] = [
  {
    id: 'richter',
    name: 'Escala Richter',
    emoji: '🌋',
    formula: 'M = log₁₀(A/A₀)',
    comparison1: { value: 8.8, name: 'Maule 2010' },
    comparison2: { value: 6.8, name: 'Temblor fuerte' },
    difference: 2,
    factor: '100 veces',
    explanation: 'Cada punto = 10× más amplitud. 2 puntos = 10² = 100 veces más energía.',
    color: 'orange',
  },
  {
    id: 'decibeles',
    name: 'Decibeles (Sonido)',
    emoji: '🔊',
    formula: 'dB = 10·log₁₀(I/I₀)',
    comparison1: { value: 100, name: 'Concierto' },
    comparison2: { value: 60, name: 'Conversación' },
    difference: 40,
    factor: '10.000 veces',
    explanation: 'Cada 10 dB = 10× más intenso. 40 dB = 10⁴ = 10.000 veces más intenso.',
    color: 'blue',
  },
  {
    id: 'ph',
    name: 'Escala pH',
    emoji: '🧪',
    formula: 'pH = -log₁₀[H⁺]',
    comparison1: { value: 3, name: 'Vinagre' },
    comparison2: { value: 7, name: 'Agua pura' },
    difference: 4,
    factor: '10.000 veces',
    explanation: 'Cada punto de pH = 10× diferencia en acidez. 4 puntos = 10⁴ = 10.000 veces más ácido.',
    color: 'green',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-700',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-700',
  },
};

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentScale, setCurrentScale] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [completedScales, setCompletedScales] = useState<string[]>([]);

  if (!isActive) return null;

  const handleReveal = () => {
    setShowResult(true);
  };

  const handleNext = () => {
    const scale = SCALES[currentScale];
    if (!completedScales.includes(scale.id)) {
      setCompletedScales([...completedScales, scale.id]);
    }

    if (currentScale < SCALES.length - 1) {
      setCurrentScale(currentScale + 1);
      setShowResult(false);
    } else {
      setPhase('summary');
    }
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Escalas Logarítmicas
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubre cómo los logaritmos miden fenómenos del mundo real
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              ¿Por qué escalas logarítmicas?
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Muchos fenómenos naturales varían en rangos <strong>enormes</strong>. Los logaritmos comprimen estos rangos en escalas manejables.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              Ejemplo: El sonido más fuerte que puedes oír es <strong>1.000.000.000.000 veces</strong> más intenso que el más débil.
              <br />
              ¡Con decibeles, esto va de 0 a 120!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {SCALES.map((scale) => {
            const colors = colorClasses[scale.color];
            return (
              <div
                key={scale.id}
                className={cn('p-3 rounded-xl border text-center', colors.bg, colors.border)}
              >
                <p className="text-3xl mb-1">{scale.emoji}</p>
                <p className={cn('font-semibold text-xs', colors.text)}>{scale.name}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('explore')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Explorar cada escala</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: EXPLORE ============
  if (phase === 'explore') {
    const scale = SCALES[currentScale];
    const colors = colorClasses[scale.color];

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <p className="text-4xl mb-2">{scale.emoji}</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {scale.name}
          </h2>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {SCALES.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all',
                completedScales.includes(s.id)
                  ? 'bg-green-500 text-white'
                  : i === currentScale
                  ? `${colorClasses[s.color].bg} ${colorClasses[s.color].text} border-2 ${colorClasses[s.color].border}`
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              )}
            >
              {completedScales.includes(s.id) ? '✓' : i + 1}
            </div>
          ))}
        </div>

        {/* Formula */}
        <div className={cn('rounded-xl p-4 border', colors.bg, colors.border)}>
          <p className="text-center text-gray-500 text-sm mb-2">Fórmula:</p>
          <p className={cn('font-mono text-xl text-center font-bold', colors.text)}>
            {scale.formula}
          </p>
        </div>

        {/* Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Compara estos dos valores:
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className={cn('p-4 rounded-xl text-center', colors.bg)}>
              <p className={cn('text-3xl font-bold', colors.text)}>{scale.comparison1.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{scale.comparison1.name}</p>
            </div>
            <span className="text-gray-400 text-2xl">vs</span>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">{scale.comparison2.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{scale.comparison2.name}</p>
            </div>
          </div>
          <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
            Diferencia: <span className="font-bold">{scale.difference}</span> {scale.id === 'decibeles' ? 'dB' : 'puntos'}
          </p>
        </div>

        {/* Result */}
        {showResult && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="font-bold text-green-700 dark:text-green-300">
                ¡{scale.factor} de diferencia real!
              </p>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              {scale.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-center">
          {!showResult ? (
            <button
              onClick={handleReveal}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg text-white',
                scale.color === 'orange' && 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
                scale.color === 'blue' && 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                scale.color === 'green' && 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              )}
            >
              <span>¿Cuántas veces más?</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>{currentScale < SCALES.length - 1 ? 'Siguiente escala' : 'Ver resumen'}</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ PHASE 3: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡3 escalas exploradas!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resumen de Escalas
        </h2>
      </div>

      <div className="space-y-3">
        {SCALES.map((scale) => {
          const colors = colorClasses[scale.color];
          return (
            <div
              key={scale.id}
              className={cn('rounded-xl p-4 border', colors.bg, colors.border)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{scale.emoji}</span>
                <div className="flex-1">
                  <p className={cn('font-semibold', colors.text)}>{scale.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">{scale.formula}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-700">
        <p className="text-indigo-800 dark:text-indigo-200 text-center">
          <Lightbulb className="inline w-4 h-4 mr-1" />
          <strong>Patrón común:</strong> En todas estas escalas, cada unidad representa multiplicar por 10 (o una potencia de 10).
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Aprender las fórmulas</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
