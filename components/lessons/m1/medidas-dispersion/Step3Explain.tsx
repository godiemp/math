'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Ruler, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

const CONCEPTS = [
  {
    id: 'rango',
    title: 'Rango',
    subtitle: 'La medida mas simple',
    icon: Ruler,
    color: 'orange',
    formula: 'Rango = Maximo - Minimo',
    example: {
      data: [3, 5, 7, 9, 15],
      calculation: 'Rango = 15 - 3 = 12',
      result: 12,
    },
    whenToUse: 'Para tener una idea rapida de la dispersion',
    advantage: 'Muy facil de calcular',
    warning: 'Solo usa 2 valores, ignora los demas datos',
    tip: 'Util para detectar datos erroneos (si el rango es muy grande)',
  },
  {
    id: 'desviacion',
    title: 'Desviacion',
    subtitle: 'Distancia a la media',
    icon: TrendingUp,
    color: 'purple',
    formula: 'Desviacion = Dato - Media',
    example: {
      data: [4, 6, 8, 10, 12],
      mean: 8,
      deviations: [-4, -2, 0, 2, 4],
    },
    whenToUse: 'Para ver que tan lejos esta cada dato del promedio',
    insight: 'La suma de todas las desviaciones siempre es 0',
    problem: 'No podemos promediar las desviaciones directamente',
  },
  {
    id: 'varianza',
    title: 'Varianza (σ²)',
    subtitle: 'Promedio de desviaciones al cuadrado',
    icon: BarChart3,
    color: 'green',
    formula: 'σ² = Σ(x - x̄)² / n',
    steps: [
      '1. Calcular la media (x̄)',
      '2. Restar la media a cada dato (x - x̄)',
      '3. Elevar al cuadrado cada resultado',
      '4. Sumar todos los cuadrados',
      '5. Dividir por n (cantidad de datos)',
    ],
    example: {
      data: [4, 6, 8, 10, 12],
      mean: 8,
      squaredDeviations: [16, 4, 0, 4, 16],
      sum: 40,
      variance: 8,
    },
    whenToUse: 'Base para calcular la desviacion estandar',
    warning: 'Esta en unidades cuadradas (no muy intuitivo)',
  },
  {
    id: 'desviacion-estandar',
    title: 'Desviacion Estandar (σ)',
    subtitle: 'La medida mas utilizada',
    icon: TrendingUp,
    color: 'blue',
    formula: 'σ = √Varianza = √(Σ(x - x̄)² / n)',
    example: {
      variance: 8,
      stdDev: 2.83,
    },
    interpretation: [
      'σ pequeña → datos muy juntos al promedio',
      'σ grande → datos muy dispersos',
    ],
    whenToUse: 'Siempre que necesites medir dispersion de forma precisa',
    advantage: 'Esta en las mismas unidades que los datos originales',
    realWorld: [
      'Notas de un curso: σ = 1.5 puntos',
      'Estaturas: σ = 10 cm',
      'Control de calidad: σ determina si un producto es aceptable',
    ],
  },
];

const colorClasses = {
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-700',
    text: 'text-orange-800 dark:text-orange-200',
    accent: 'text-orange-600 dark:text-orange-400',
    icon: 'bg-orange-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-700',
    text: 'text-purple-800 dark:text-purple-200',
    accent: 'text-purple-600 dark:text-purple-400',
    icon: 'bg-purple-500',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-700',
    text: 'text-green-800 dark:text-green-200',
    accent: 'text-green-600 dark:text-green-400',
    icon: 'bg-green-500',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-700',
    text: 'text-blue-800 dark:text-blue-200',
    accent: 'text-blue-600 dark:text-blue-400',
    icon: 'bg-blue-500',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isActive) return null;

  const concept = CONCEPTS[currentIndex];
  const colors = colorClasses[concept.color as keyof typeof colorClasses];
  const Icon = concept.icon;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {CONCEPTS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i === currentIndex
                ? colorClasses[c.color as keyof typeof colorClasses].icon
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Concept card */}
      <div className={cn('rounded-xl p-6 border', colors.bg, colors.border)}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', colors.icon)}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className={cn('text-2xl font-bold', colors.text)}>{concept.title}</h2>
            <p className={cn('text-sm', colors.accent)}>{concept.subtitle}</p>
          </div>
        </div>

        {/* Formula */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
          <p className={cn('font-mono text-lg font-semibold text-center', colors.accent)}>
            {concept.formula}
          </p>
        </div>

        {/* Steps (for variance) */}
        {concept.steps && (
          <div className="mb-4 space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Pasos:</p>
            {concept.steps.map((step, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-sm font-mono">
                {step}
              </div>
            ))}
          </div>
        )}

        {/* Example for range */}
        {concept.id === 'rango' && concept.example && 'calculation' in concept.example && 'data' in concept.example && concept.example.data && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ejemplo:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Datos: [{concept.example.data.join(', ')}]
              </p>
              <p className="font-mono text-sm mt-1">
                {concept.example.calculation}
              </p>
              <p className={cn('font-bold mt-1', colors.accent)}>
                Rango = {concept.example.result}
              </p>
            </div>
          </div>
        )}

        {/* Example for deviations */}
        {concept.id === 'desviacion' && concept.example && 'deviations' in concept.example && 'data' in concept.example && concept.example.data && concept.example.deviations && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ejemplo (Media = {concept.example.mean}):</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="grid grid-cols-5 gap-2 text-center text-sm">
                {concept.example.data.map((d, i) => (
                  <div key={i}>
                    <div className="font-bold">{d}</div>
                    <div className="text-xs text-gray-400">- {concept.example.mean}</div>
                    <div className={cn(
                      'font-mono',
                      concept.example.deviations![i] > 0 ? 'text-red-500' :
                        concept.example.deviations![i] < 0 ? 'text-green-500' : 'text-gray-500'
                    )}>
                      = {concept.example.deviations![i] > 0 ? '+' : ''}{concept.example.deviations![i]}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm mt-2 text-gray-500">
                Suma: {concept.example.deviations.join(' + ')} = <strong>0</strong>
              </p>
            </div>
          </div>
        )}

        {/* Example for variance */}
        {concept.id === 'varianza' && concept.example && 'squaredDeviations' in concept.example && 'data' in concept.example && concept.example.data && concept.example.squaredDeviations && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ejemplo (Media = {concept.example.mean}):</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="grid grid-cols-5 gap-2 text-center text-sm">
                {concept.example.data.map((d, i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-400">({d} - {concept.example.mean})²</div>
                    <div className="font-mono font-bold text-green-600">
                      {concept.example.squaredDeviations![i]}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm mt-2">
                Suma: {concept.example.squaredDeviations.join(' + ')} = {concept.example.sum}
              </p>
              <p className={cn('text-center font-bold mt-1', colors.accent)}>
                Varianza = {concept.example.sum} / 5 = {concept.example.variance}
              </p>
            </div>
          </div>
        )}

        {/* Example for standard deviation */}
        {concept.id === 'desviacion-estandar' && concept.example && 'stdDev' in concept.example && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ejemplo:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="font-mono">
                σ = √{concept.example.variance} ≈ <strong className="text-blue-600 text-xl">{concept.example.stdDev}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Interpretation */}
        {concept.interpretation && (
          <div className="mb-4 space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Interpretacion:</p>
            {concept.interpretation.map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                <CheckCircle size={14} className={colors.accent} />
                {item}
              </div>
            ))}
          </div>
        )}

        {/* Real world examples */}
        {concept.realWorld && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Ejemplos del mundo real:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 space-y-1">
              {concept.realWorld.map((item, i) => (
                <p key={i} className="text-sm text-gray-600 dark:text-gray-400">• {item}</p>
              ))}
            </div>
          </div>
        )}

        {/* When to use */}
        <div className="flex items-start gap-2 mb-3">
          <CheckCircle size={18} className={colors.accent} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Cuando usar:</strong> {concept.whenToUse}
          </p>
        </div>

        {/* Advantage */}
        {concept.advantage && (
          <div className="flex items-start gap-2 mb-2">
            <CheckCircle size={18} className="text-green-500" />
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Ventaja:</strong> {concept.advantage}
            </p>
          </div>
        )}

        {/* Warning */}
        {concept.warning && (
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Cuidado:</strong> {concept.warning}
            </p>
          </div>
        )}

        {/* Insight/problem */}
        {concept.insight && (
          <div className="flex items-start gap-2 mb-2">
            <Lightbulb size={18} className={colors.accent} />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {concept.insight}
            </p>
          </div>
        )}
        {concept.problem && (
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Problema:</strong> {concept.problem}
            </p>
          </div>
        )}

        {/* Tip */}
        {concept.tip && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-2">
              <Lightbulb size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-300 italic">
                {concept.tip}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
            currentIndex === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
          )}
        >
          <ArrowLeft size={16} />
          <span>Anterior</span>
        </button>

        {currentIndex < CONCEPTS.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Siguiente</span>
            <ArrowRight size={20} />
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>¡A practicar!</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
