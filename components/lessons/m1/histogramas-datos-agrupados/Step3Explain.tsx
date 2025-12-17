'use client';

import { BookOpen, BarChart3, Hash, Calculator, Ruler, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

const CONCEPTS = [
  {
    id: 'intervalo',
    title: 'Intervalo (Clase)',
    symbol: '[a, b)',
    icon: Ruler,
    color: 'blue',
    description:
      'Un rango de valores que agrupa datos. Por ejemplo, [150, 160) incluye desde 150 hasta antes de 160.',
    example: 'Intervalo [20, 30): incluye 20, 25, 29.9... pero NO incluye 30',
    formula: null,
    tip: 'El parentesis ) significa que el limite superior NO esta incluido',
  },
  {
    id: 'amplitud',
    title: 'Amplitud del Intervalo',
    symbol: 'A',
    icon: Ruler,
    color: 'purple',
    description: 'El ancho de cada intervalo. Todos los intervalos deben tener la misma amplitud.',
    example: 'Si el intervalo es [150, 160), la amplitud es 160 - 150 = 10',
    formula: 'A = limite superior - limite inferior',
    tip: null,
  },
  {
    id: 'marca',
    title: 'Marca de Clase',
    symbol: 'xᵢ',
    icon: Calculator,
    color: 'amber',
    description: 'El punto medio del intervalo. Representa a todos los datos de esa clase.',
    example: 'Para [150, 160), la marca de clase es (150 + 160) / 2 = 155',
    formula: 'xᵢ = (limite inferior + limite superior) / 2',
    tip: null,
  },
  {
    id: 'frecuencia',
    title: 'Frecuencia Absoluta',
    symbol: 'fᵢ',
    icon: Hash,
    color: 'green',
    description: 'El numero de datos que caen dentro de cada intervalo.',
    example: 'Si 8 estudiantes miden entre 150-160 cm, entonces f = 8 para ese intervalo',
    formula: null,
    tip: null,
  },
  {
    id: 'histograma',
    title: 'Histograma',
    symbol: null,
    icon: BarChart3,
    color: 'rose',
    description:
      'Grafico de barras para datos agrupados. Las barras son contiguas (se tocan) porque los intervalos son continuos.',
    example: 'La altura de cada barra representa la frecuencia del intervalo',
    formula: null,
    tip: 'A diferencia del grafico de barras, las barras del histograma NO tienen espacio entre ellas',
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
  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span className="text-indigo-700 dark:text-indigo-300 font-medium">Conceptos Clave</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Histogramas y Datos Agrupados
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Resumen de lo que has aprendido</p>
      </div>

      {/* Concept cards */}
      <div className="space-y-4">
        {CONCEPTS.map((concept, index) => {
          const colors = colorClasses[concept.color];
          const Icon = concept.icon;

          return (
            <div
              key={concept.id}
              className={cn('rounded-xl p-4 border animate-fadeIn', colors.bg, colors.border)}
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
                    <h3 className={cn('font-semibold', colors.text)}>{concept.title}</h3>
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

                  {/* Tip if exists */}
                  {concept.tip && (
                    <div className="mt-2 flex items-start gap-2 p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700 dark:text-amber-300">{concept.tip}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual comparison */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-700">
        <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-4 text-center">
          Grafico de Barras vs Histograma
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {/* Bar chart */}
          <div className="text-center">
            <div className="h-24 flex items-end justify-around gap-2 mb-2">
              <div className="w-8 h-12 bg-blue-400 rounded-t" />
              <div className="w-8 h-16 bg-green-400 rounded-t" />
              <div className="w-8 h-8 bg-amber-400 rounded-t" />
              <div className="w-8 h-20 bg-red-400 rounded-t" />
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Grafico de Barras
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Barras separadas
              <br />
              (datos categoricos)
            </p>
          </div>

          {/* Histogram */}
          <div className="text-center">
            <div className="h-24 flex items-end justify-center mb-2">
              <div className="w-6 h-8 bg-purple-300 rounded-tl" />
              <div className="w-6 h-16 bg-purple-400" />
              <div className="w-6 h-20 bg-purple-500" />
              <div className="w-6 h-14 bg-purple-400" />
              <div className="w-6 h-6 bg-purple-300 rounded-tr" />
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Histograma</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Barras contiguas
              <br />
              (datos numericos agrupados)
            </p>
          </div>
        </div>
      </div>

      {/* When to use grouped data */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
          ¿Cuando agrupar datos en intervalos?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">Si</span>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Muchos datos</strong> (mas de 20-30 valores diferentes)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">Si</span>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Datos continuos</strong> (estaturas, pesos, tiempos, temperaturas)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold">No</span>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Pocos datos</strong> (menos de 20 valores)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold">No</span>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Datos categoricos</strong> (colores, marcas, nombres)
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
