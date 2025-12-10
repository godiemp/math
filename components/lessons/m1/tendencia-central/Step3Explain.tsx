'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Scale, Target, Star, Ruler, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

const CONCEPTS = [
  {
    id: 'media',
    title: 'Media Aritmetica',
    subtitle: 'El promedio',
    icon: Scale,
    color: 'blue',
    formula: 'Media = Suma de todos / n',
    example: {
      data: [4, 6, 8, 10, 12],
      calculation: '(4 + 6 + 8 + 10 + 12) / 5 = 40 / 5 = 8',
      result: 8
    },
    whenToUse: 'Cuando todos los datos son importantes y no hay valores extremos',
    warning: 'Un solo valor muy alto o bajo puede distorsionarla',
    metaphor: 'Como el punto de equilibrio en una balanza'
  },
  {
    id: 'mediana',
    title: 'Mediana',
    subtitle: 'El valor central',
    icon: Target,
    color: 'green',
    formula: 'Ordenar datos, encontrar el del medio',
    example: {
      data: [3, 7, 9, 15, 20],
      calculation: 'Ordenados: 3, 7, [9], 15, 20',
      result: 9
    },
    evenExample: {
      data: [2, 4, 6, 8],
      calculation: 'Ordenados: 2, [4, 6], 8 -> (4+6)/2 = 5',
      result: 5
    },
    whenToUse: 'Cuando hay valores extremos (salarios, precios de casas)',
    advantage: 'No se afecta por valores extremos',
    metaphor: 'El corredor que llega justo en la mitad de la carrera'
  },
  {
    id: 'moda',
    title: 'Moda',
    subtitle: 'El mas popular',
    icon: Star,
    color: 'purple',
    formula: 'El valor que mas se repite',
    example: {
      data: [2, 5, 5, 5, 8, 9],
      calculation: '5 aparece 3 veces (mas que cualquier otro)',
      result: 5
    },
    cases: [
      { name: 'Unimodal', example: '[2, 5, 5, 5, 8] -> Moda: 5' },
      { name: 'Bimodal', example: '[2, 2, 5, 5, 8] -> Modas: 2 y 5' },
      { name: 'Sin moda', example: '[1, 2, 3, 4, 5] -> No hay moda' },
    ],
    whenToUse: 'Para datos categoricos o encontrar lo mas comun',
    metaphor: 'La cancion #1 del ranking'
  },
  {
    id: 'rango',
    title: 'Rango',
    subtitle: 'La dispersion',
    icon: Ruler,
    color: 'orange',
    formula: 'Rango = Maximo - Minimo',
    example: {
      data: [5, 12, 8, 20, 3],
      calculation: 'Max: 20, Min: 3 -> 20 - 3 = 17',
      result: 17
    },
    whenToUse: 'Para ver que tan dispersos estan los datos',
    insight: 'Un rango grande = datos muy variados',
    metaphor: 'La distancia entre el mas alto y el mas bajo del curso'
  }
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-700',
    text: 'text-blue-800 dark:text-blue-200',
    accent: 'text-blue-600 dark:text-blue-400',
    icon: 'bg-blue-500',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-700',
    text: 'text-green-800 dark:text-green-200',
    accent: 'text-green-600 dark:text-green-400',
    icon: 'bg-green-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-700',
    text: 'text-purple-800 dark:text-purple-200',
    accent: 'text-purple-600 dark:text-purple-400',
    icon: 'bg-purple-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-700',
    text: 'text-orange-800 dark:text-orange-200',
    accent: 'text-orange-600 dark:text-orange-400',
    icon: 'bg-orange-500',
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

        {/* Example */}
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
              {concept.id === 'moda' ? 'Moda' : concept.id === 'rango' ? 'Rango' : concept.id === 'mediana' ? 'Mediana' : 'Media'} = {concept.example.result}
            </p>
          </div>
        </div>

        {/* Even case for median */}
        {concept.id === 'mediana' && concept.evenExample && (
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 mb-4 border border-amber-200 dark:border-amber-700">
            <p className="text-sm text-amber-700 dark:text-amber-300 font-semibold mb-1">
              Caso especial: cantidad PAR de datos
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Datos: [{concept.evenExample.data.join(', ')}]
            </p>
            <p className="font-mono text-sm">
              {concept.evenExample.calculation}
            </p>
          </div>
        )}

        {/* Mode cases */}
        {concept.id === 'moda' && concept.cases && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Casos posibles:</p>
            {concept.cases.map((c) => (
              <div key={c.name} className="bg-white dark:bg-gray-800 rounded-lg p-2 text-sm">
                <span className="font-semibold text-purple-600">{c.name}:</span>{' '}
                <span className="font-mono">{c.example}</span>
              </div>
            ))}
          </div>
        )}

        {/* When to use */}
        <div className="flex items-start gap-2 mb-3">
          <CheckCircle size={18} className={colors.accent} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Cuando usar:</strong> {concept.whenToUse}
          </p>
        </div>

        {/* Warning/advantage */}
        {concept.warning && (
          <div className="flex items-start gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Cuidado:</strong> {concept.warning}
            </p>
          </div>
        )}
        {concept.advantage && (
          <div className="flex items-start gap-2">
            <CheckCircle size={18} className="text-green-500" />
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Ventaja:</strong> {concept.advantage}
            </p>
          </div>
        )}
        {concept.insight && (
          <div className="flex items-start gap-2">
            <CheckCircle size={18} className={colors.accent} />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {concept.insight}
            </p>
          </div>
        )}

        {/* Metaphor */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className={cn('text-sm italic', colors.text)}>
            &ldquo;{concept.metaphor}&rdquo;
          </p>
        </div>
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
