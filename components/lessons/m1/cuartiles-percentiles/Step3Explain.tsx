'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, BarChart3, Divide, AlertTriangle, Percent, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

const CONCEPTS = [
  {
    id: 'cuartiles',
    title: 'Cuartiles',
    subtitle: 'Dividir en 4 partes iguales',
    icon: Divide,
    color: 'blue',
    formula: 'Q₁ (25%), Q₂ (50%), Q₃ (75%)',
    steps: [
      '1. Ordenar los datos de menor a mayor',
      '2. Encontrar Q₂ (mediana): divide los datos en dos mitades',
      '3. Q₁ = mediana de la mitad inferior (SIN incluir Q₂)',
      '4. Q₃ = mediana de la mitad superior (SIN incluir Q₂)',
    ],
    example: {
      data: [10, 15, 20, 25, 30, 35, 40],
      steps: [
        'n=7 (impar): 10, 15, 20, [25], 30, 35, 40',
        'Q₂ = 25 (el valor del medio)',
        'Mitad inferior (sin 25): 10, 15, 20 → Q₁ = 15',
        'Mitad superior (sin 25): 30, 35, 40 → Q₃ = 35',
      ],
      result: 'Q₁ = 15, Q₂ = 25, Q₃ = 35'
    },
    keyInsight: 'Cada cuartil marca donde esta el 25%, 50% o 75% de los datos',
    metaphor: 'Como dividir una fila ordenada en 4 grupos iguales'
  },
  {
    id: 'cuartiles-par',
    title: 'Caso Especial: n PAR',
    subtitle: 'Cuando hay cantidad par de datos',
    icon: Divide,
    color: 'blue',
    formula: 'Si n es par, Q₂ es promedio de los 2 del medio',
    steps: [
      '1. Ordenar los datos',
      '2. Q₂ = promedio de los 2 valores centrales',
      '3. Mitad inferior = primera mitad (antes de Q₂)',
      '4. Mitad superior = segunda mitad (despues de Q₂)',
      '5. Q₁ y Q₃ = medianas de cada mitad',
    ],
    example: {
      data: [10, 20, 30, 40, 50, 60, 70, 80],
      steps: [
        'n=8 (par): 10, 20, 30, 40 | 50, 60, 70, 80',
        'Q₂ = (40+50)/2 = 45',
        'Mitad inferior: 10, 20, 30, 40 → Q₁ = (20+30)/2 = 25',
        'Mitad superior: 50, 60, 70, 80 → Q₃ = (60+70)/2 = 65',
      ],
      result: 'Q₁ = 25, Q₂ = 45, Q₃ = 65'
    },
    keyInsight: 'Con n par, tanto Q₂ como Q₁ y Q₃ pueden ser promedios',
    warning: 'No incluyas la mediana en las mitades cuando n es impar',
    metaphor: 'Cuando la fila tiene numero par, el "medio" esta entre dos personas'
  },
  {
    id: 'iqr',
    title: 'Rango Intercuartilico (IQR)',
    subtitle: 'El ancho del 50% central',
    icon: BarChart3,
    color: 'orange',
    formula: 'IQR = Q₃ - Q₁',
    steps: [
      '1. Calcular Q₁ y Q₃',
      '2. Restar: IQR = Q₃ - Q₁',
    ],
    example: {
      data: [10, 15, 20, 25, 30, 35, 40],
      steps: [
        'Q₁ = 15, Q₃ = 35',
        'IQR = 35 - 15 = 20',
      ],
      result: 'IQR = 20'
    },
    keyInsight: 'El IQR contiene el 50% central de los datos, ignorando los extremos',
    useCase: 'Medir dispersion sin que valores extremos afecten',
    metaphor: 'La distancia entre el grupo bajo y el grupo alto de la clase'
  },
  {
    id: 'outliers',
    title: 'Valores Atipicos (Outliers)',
    subtitle: 'Detectar datos sospechosos',
    icon: AlertTriangle,
    color: 'red',
    formula: 'Atipico si: < Q₁ - 1.5×IQR  o  > Q₃ + 1.5×IQR',
    steps: [
      '1. Calcular Q₁, Q₃ e IQR',
      '2. Limite inferior = Q₁ - 1.5 × IQR',
      '3. Limite superior = Q₃ + 1.5 × IQR',
      '4. Valores fuera de estos limites son atipicos',
    ],
    example: {
      data: [10, 15, 20, 25, 30, 35, 100],
      steps: [
        'Q₁ = 15, Q₃ = 35, IQR = 20',
        'Limite inferior: 15 - 1.5(20) = -15',
        'Limite superior: 35 + 1.5(20) = 65',
        '100 > 65, entonces 100 es ATIPICO',
      ],
      result: '100 es un valor atipico'
    },
    keyInsight: 'Los outliers pueden indicar errores o casos especiales que merecen atencion',
    warning: 'No siempre hay que eliminar outliers - a veces son datos importantes',
    metaphor: 'El estudiante con un puntaje muy diferente al resto'
  },
  {
    id: 'percentiles',
    title: 'Percentiles',
    subtitle: 'Dividir en 100 partes',
    icon: Percent,
    color: 'purple',
    formula: 'Pₖ = el valor donde k% de los datos son menores',
    connections: [
      'P₂₅ = Q₁ (25% debajo)',
      'P₅₀ = Q₂ = Mediana (50% debajo)',
      'P₇₅ = Q₃ (75% debajo)',
    ],
    example: {
      scenario: 'Juan obtuvo P₈₅ = 720 en la PAES',
      interpretation: 'El 85% de los estudiantes saco menos que Juan',
      reverse: 'Juan esta en el top 15% de puntajes',
    },
    keyInsight: 'Los percentiles ubican un dato dentro de una distribucion',
    useCase: 'Pruebas estandarizadas, tablas de crecimiento infantil, rankings',
    metaphor: 'Tu posicion en una carrera de 100 personas'
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-700',
    text: 'text-blue-800 dark:text-blue-200',
    accent: 'text-blue-600 dark:text-blue-400',
    icon: 'bg-blue-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-700',
    text: 'text-orange-800 dark:text-orange-200',
    accent: 'text-orange-600 dark:text-orange-400',
    icon: 'bg-orange-500',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-700',
    text: 'text-red-800 dark:text-red-200',
    accent: 'text-red-600 dark:text-red-400',
    icon: 'bg-red-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-700',
    text: 'text-purple-800 dark:text-purple-200',
    accent: 'text-purple-600 dark:text-purple-400',
    icon: 'bg-purple-500',
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

        {/* Steps (for cuartiles, iqr, outliers) */}
        {concept.steps && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Como calcular:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 space-y-1">
              {concept.steps.map((step, i) => (
                <p key={i} className="text-sm text-gray-600 dark:text-gray-400">
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Connections (for percentiles) */}
        {concept.connections && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Conexion con cuartiles:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 space-y-1">
              {concept.connections.map((conn, i) => (
                <p key={i} className={cn('text-sm font-mono', colors.accent)}>
                  {conn}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Example */}
        {concept.example && 'data' in concept.example && concept.example.data && concept.example.steps && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ejemplo:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Datos: [{concept.example.data.join(', ')}]
              </p>
              {concept.example.steps.map((step, i) => (
                <p key={i} className="font-mono text-sm">
                  {step}
                </p>
              ))}
              <p className={cn('font-bold mt-2', colors.accent)}>
                {concept.example.result}
              </p>
            </div>
          </div>
        )}

        {/* Example for percentiles */}
        {concept.example && 'scenario' in concept.example && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ejemplo practico:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {concept.example.scenario}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Significa: {concept.example.interpretation}
              </p>
              <p className={cn('text-sm font-semibold mt-1', colors.accent)}>
                O sea: {concept.example.reverse}
              </p>
            </div>
          </div>
        )}

        {/* Key insight */}
        <div className="flex items-start gap-2 mb-3">
          <CheckCircle size={18} className={colors.accent} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Clave:</strong> {concept.keyInsight}
          </p>
        </div>

        {/* Use case */}
        {concept.useCase && (
          <div className="flex items-start gap-2 mb-3">
            <CheckCircle size={18} className="text-green-500" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Uso:</strong> {concept.useCase}
            </p>
          </div>
        )}

        {/* Warning */}
        {concept.warning && (
          <div className="flex items-start gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-500" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Cuidado:</strong> {concept.warning}
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
