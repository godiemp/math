'use client';

import { useEffect } from 'react';
import { BookOpen, BarChart2, PieChart as PieChartIcon, Hash, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

const CONCEPTS = [
  {
    id: 'absoluta',
    title: 'Frecuencia Absoluta',
    symbol: 'fᵢ',
    icon: Hash,
    color: 'blue',
    description: 'Es el numero de veces que aparece un valor o categoria en los datos.',
    example: 'Si 8 estudiantes prefieren pizza, entonces f(pizza) = 8',
    formula: null,
  },
  {
    id: 'relativa',
    title: 'Frecuencia Relativa',
    symbol: 'hᵢ',
    icon: Percent,
    color: 'purple',
    description: 'Es la proporcion que representa cada categoria respecto al total.',
    example: 'Si 8 de 40 prefieren pizza: h(pizza) = 8/40 = 0.20',
    formula: 'hᵢ = fᵢ / n',
  },
  {
    id: 'porcentual',
    title: 'Frecuencia Porcentual',
    symbol: '%',
    icon: Percent,
    color: 'amber',
    description: 'Es la frecuencia relativa expresada como porcentaje.',
    example: 'h(pizza) = 0.20 → 20%',
    formula: '% = hᵢ × 100',
  },
  {
    id: 'barras',
    title: 'Grafico de Barras',
    symbol: null,
    icon: BarChart2,
    color: 'green',
    description: 'Representa las frecuencias como barras verticales. Ideal para comparar categorias.',
    example: 'La altura de cada barra muestra cuantos hay en esa categoria.',
    formula: null,
  },
  {
    id: 'circular',
    title: 'Grafico Circular',
    symbol: null,
    icon: PieChartIcon,
    color: 'rose',
    description: 'Muestra las proporciones como sectores de un circulo. Todas las partes suman 100%.',
    example: 'Si pizza es 20%, ocupa 20% del circulo (72° de 360°).',
    formula: 'Angulo = hᵢ × 360°',
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-700',
    text: 'text-blue-800 dark:text-blue-200',
    icon: 'text-blue-600',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    border: 'border-purple-200 dark:border-purple-700',
    text: 'text-purple-800 dark:text-purple-200',
    icon: 'text-purple-600',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    border: 'border-amber-200 dark:border-amber-700',
    text: 'text-amber-800 dark:text-amber-200',
    icon: 'text-amber-600',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    border: 'border-green-200 dark:border-green-700',
    text: 'text-green-800 dark:text-green-200',
    icon: 'text-green-600',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    border: 'border-rose-200 dark:border-rose-700',
    text: 'text-rose-800 dark:text-rose-200',
    icon: 'text-rose-600',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  // Auto-complete after viewing (no interaction required)
  useEffect(() => {
    if (isActive) {
      // Allow user to read for a few seconds, then enable continue
      const timer = setTimeout(() => {
        // Component is ready
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span className="text-indigo-700 dark:text-indigo-300 font-medium">
            Conceptos Clave
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Frecuencias y Graficos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resumen de lo que has aprendido
        </p>
      </div>

      {/* Concept cards */}
      <div className="space-y-4">
        {CONCEPTS.map((concept, index) => {
          const colors = colorClasses[concept.color];
          const Icon = concept.icon;

          return (
            <div
              key={concept.id}
              className={cn(
                'rounded-xl p-4 border animate-fadeIn',
                colors.bg,
                colors.border
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    'bg-white dark:bg-gray-800 shadow-sm'
                  )}
                >
                  <Icon className={cn('w-5 h-5', colors.icon)} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn('font-semibold', colors.text)}>
                      {concept.title}
                    </h3>
                    {concept.symbol && (
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-sm font-mono',
                          'bg-white/50 dark:bg-gray-800/50'
                        )}
                      >
                        {concept.symbol}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {concept.description}
                  </p>

                  {/* Formula if exists */}
                  {concept.formula && (
                    <div className="inline-block px-3 py-1 bg-white/60 dark:bg-gray-800/60 rounded-lg mb-2">
                      <span className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {concept.formula}
                      </span>
                    </div>
                  )}

                  {/* Example */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    Ejemplo: {concept.example}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key relationship summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-700">
        <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3 text-center">
          Relacion entre Frecuencias
        </h4>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center">
          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <span className="font-mono font-semibold text-blue-800 dark:text-blue-200">fᵢ</span>
            <span className="text-xs text-blue-600 dark:text-blue-400 block">Conteo</span>
          </div>
          <span className="text-gray-400">→</span>
          <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
            <span className="font-mono font-semibold text-purple-800 dark:text-purple-200">
              hᵢ = fᵢ/n
            </span>
            <span className="text-xs text-purple-600 dark:text-purple-400 block">Proporcion</span>
          </div>
          <span className="text-gray-400">→</span>
          <div className="px-4 py-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
            <span className="font-mono font-semibold text-amber-800 dark:text-amber-200">
              hᵢ × 100
            </span>
            <span className="text-xs text-amber-600 dark:text-amber-400 block">Porcentaje</span>
          </div>
        </div>
      </div>

      {/* When to use each graph */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
          ¿Cuándo usar cada grafico?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <BarChart2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">Grafico de Barras</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Para <strong>comparar</strong> cantidades entre categorias
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <PieChartIcon className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-rose-800 dark:text-rose-200">Grafico Circular</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Para mostrar <strong>partes de un todo</strong> (proporciones)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar a Practica</span>
        </button>
      </div>
    </div>
  );
}
