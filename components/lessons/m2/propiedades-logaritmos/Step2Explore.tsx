'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';

type Phase = 'intro' | 'discover' | 'pattern';

interface Discovery {
  id: string;
  property: string;
  leftSide: string;
  leftResult: string;
  rightSide: string;
  rightResult: string;
  pattern: string;
  color: string;
}

const DISCOVERIES: Discovery[] = [
  {
    id: 'producto',
    property: 'Producto',
    leftSide: 'log₂(4) + log₂(8)',
    leftResult: '2 + 3 = 5',
    rightSide: 'log₂(4 × 8) = log₂(32)',
    rightResult: '5',
    pattern: '¡Sumar logaritmos = multiplicar números!',
    color: 'blue',
  },
  {
    id: 'cociente',
    property: 'Cociente',
    leftSide: 'log₁₀(1000) - log₁₀(10)',
    leftResult: '3 - 1 = 2',
    rightSide: 'log₁₀(1000 ÷ 10) = log₁₀(100)',
    rightResult: '2',
    pattern: '¡Restar logaritmos = dividir números!',
    color: 'purple',
  },
  {
    id: 'potencia',
    property: 'Potencia',
    leftSide: '3 · log₂(4)',
    leftResult: '3 × 2 = 6',
    rightSide: 'log₂(4³) = log₂(64)',
    rightResult: '6',
    pattern: '¡Multiplicar por n = elevar a la n!',
    color: 'teal',
  },
  {
    id: 'especiales',
    property: 'Casos Especiales',
    leftSide: 'log₅(1)',
    leftResult: '0',
    rightSide: 'log₅(5)',
    rightResult: '1',
    pattern: 'log(1) siempre es 0, log(base) siempre es 1',
    color: 'amber',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-700',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
  },
};

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentDiscovery, setCurrentDiscovery] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [completedDiscoveries, setCompletedDiscoveries] = useState<string[]>([]);

  if (!isActive) return null;

  const handleReveal = () => {
    setShowResult(true);
  };

  const handleNext = () => {
    const discovery = DISCOVERIES[currentDiscovery];
    if (!completedDiscoveries.includes(discovery.id)) {
      setCompletedDiscoveries([...completedDiscoveries, discovery.id]);
    }

    if (currentDiscovery < DISCOVERIES.length - 1) {
      setCurrentDiscovery(currentDiscovery + 1);
      setShowResult(false);
    } else {
      setPhase('pattern');
    }
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubre los Patrones
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Vamos a descubrir 4 propiedades mágicas de los logaritmos
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              El método de descubrimiento
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Para cada propiedad, verás dos expresiones diferentes. Calcúlalas y descubrirás que dan el <strong>mismo resultado</strong>.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Ejemplo: Si <span className="font-mono">log₂(4) + log₂(8)</span> da lo mismo que <span className="font-mono">log₂(32)</span>...
            </p>
            <p className="text-center text-indigo-600 font-semibold mt-2">
              ¡Entonces sumar logs equivale a multiplicar los números!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {DISCOVERIES.map((d, i) => {
            const colors = colorClasses[d.color];
            return (
              <div
                key={d.id}
                className={cn('p-3 rounded-xl border', colors.bg, colors.border)}
              >
                <p className={cn('font-semibold text-sm', colors.text)}>{d.property}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('discover')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>¡Empezar a descubrir!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: DISCOVER ============
  if (phase === 'discover') {
    const discovery = DISCOVERIES[currentDiscovery];
    const colors = colorClasses[discovery.color];

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Propiedad {currentDiscovery + 1}: {discovery.property}
          </h2>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {DISCOVERIES.map((d, i) => (
            <div
              key={d.id}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all',
                completedDiscoveries.includes(d.id)
                  ? 'bg-green-500 text-white'
                  : i === currentDiscovery
                  ? `${colorClasses[d.color].bg} ${colorClasses[d.color].text} border-2 ${colorClasses[d.color].border}`
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              )}
            >
              {completedDiscoveries.includes(d.id) ? '✓' : i + 1}
            </div>
          ))}
        </div>

        {/* Discovery comparison */}
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <p className={cn('text-center mb-4 font-semibold', colors.text)}>
            Calcula ambos lados y compara:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Left side */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-2 text-center">Expresión 1:</p>
              <p className="font-mono text-lg text-center text-gray-800 dark:text-gray-200 mb-3">
                {discovery.leftSide}
              </p>
              {showResult && (
                <div className={cn('p-2 rounded-lg text-center animate-fadeIn', colors.bg)}>
                  <p className={cn('font-mono font-bold', colors.text)}>
                    = {discovery.leftResult}
                  </p>
                </div>
              )}
            </div>

            {/* Right side */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-2 text-center">Expresión 2:</p>
              <p className="font-mono text-lg text-center text-gray-800 dark:text-gray-200 mb-3">
                {discovery.rightSide}
              </p>
              {showResult && (
                <div className={cn('p-2 rounded-lg text-center animate-fadeIn', colors.bg)}>
                  <p className={cn('font-mono font-bold', colors.text)}>
                    = {discovery.rightResult}
                  </p>
                </div>
              )}
            </div>
          </div>

          {showResult && (
            <div className="mt-4 bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700 animate-fadeIn">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <p className="font-bold text-green-700 dark:text-green-300">¡Son iguales!</p>
              </div>
              <p className="text-center text-green-600 dark:text-green-400">
                {discovery.pattern}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {!showResult ? (
            <button
              onClick={handleReveal}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg text-white',
                discovery.color === 'blue' && 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                discovery.color === 'purple' && 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                discovery.color === 'teal' && 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
                discovery.color === 'amber' && 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              )}
            >
              <span>Revelar resultados</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>{currentDiscovery < DISCOVERIES.length - 1 ? 'Siguiente propiedad' : 'Ver resumen'}</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ PHASE 3: PATTERN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡4 propiedades descubiertas!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resumen de Propiedades
        </h2>
      </div>

      <div className="space-y-3">
        {DISCOVERIES.map((d) => {
          const colors = colorClasses[d.color];
          return (
            <div
              key={d.id}
              className={cn('rounded-xl p-4 border', colors.bg, colors.border)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn('font-semibold', colors.text)}>{d.property}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{d.pattern}</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-700">
        <p className="text-indigo-800 dark:text-indigo-200 text-center">
          <Lightbulb className="inline w-4 h-4 mr-1" />
          <strong>Clave:</strong> Los logaritmos transforman operaciones &quot;difíciles&quot; en operaciones &quot;fáciles&quot;.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Ver las fórmulas</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
