'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface ProblemType {
  id: string;
  title: string;
  description: string;
  formula: string;
  example: {
    question: string;
    data: string;
    steps: string[];
    result: string;
  };
  color: string;
}

const PROBLEM_TYPES: ProblemType[] = [
  {
    id: 'find-part',
    title: 'Encontrar la Parte',
    description: 'Dado el porcentaje y el total, encuentra cuánto es.',
    formula: 'Parte = (Porcentaje × Total) ÷ 100',
    example: {
      question: 'El 25% de 200 estudiantes aprobaron con nota máxima.',
      data: 'Porcentaje = 25%, Total = 200',
      steps: ['Parte = (25 × 200) ÷ 100', '= 5000 ÷ 100', '= 50'],
      result: '50 estudiantes',
    },
    color: 'blue',
  },
  {
    id: 'find-percent',
    title: 'Encontrar el Porcentaje',
    description: 'Dado la parte y el total, encuentra qué porcentaje representa.',
    formula: 'Porcentaje = (Parte ÷ Total) × 100',
    example: {
      question: '45 de 180 alumnos practican deporte.',
      data: 'Parte = 45, Total = 180',
      steps: ['Porcentaje = (45 ÷ 180) × 100', '= 0,25 × 100', '= 25%'],
      result: '25%',
    },
    color: 'purple',
  },
  {
    id: 'find-total',
    title: 'Encontrar el Total',
    description: 'Dado la parte y el porcentaje, encuentra el total.',
    formula: 'Total = (Parte × 100) ÷ Porcentaje',
    example: {
      question: '30 personas son el 15% de los asistentes.',
      data: 'Parte = 30, Porcentaje = 15%',
      steps: ['Total = (30 × 100) ÷ 15', '= 3000 ÷ 15', '= 200'],
      result: '200 asistentes',
    },
    color: 'teal',
  },
  {
    id: 'increase-decrease',
    title: 'Aumento y Disminución',
    description: 'Calcula el nuevo valor después de un cambio porcentual.',
    formula: 'Nuevo = Original × (1 ± Porcentaje/100)',
    example: {
      question: 'Un producto de $50.000 sube 20%.',
      data: 'Original = $50.000, Aumento = 20%',
      steps: ['Nuevo = 50.000 × (1 + 0,20)', '= 50.000 × 1,20', '= 60.000'],
      result: '$60.000',
    },
    color: 'pink',
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-700',
    text: 'text-blue-700 dark:text-blue-300',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    border: 'border-purple-200 dark:border-purple-700',
    text: 'text-purple-700 dark:text-purple-300',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    border: 'border-teal-200 dark:border-teal-700',
    text: 'text-teal-700 dark:text-teal-300',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/30',
    border: 'border-pink-200 dark:border-pink-700',
    text: 'text-pink-700 dark:text-pink-300',
  },
};

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentType, setCurrentType] = useState(0);
  const [discoveredTypes, setDiscoveredTypes] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState(false);

  const problemType = PROBLEM_TYPES[currentType];
  const colors = colorClasses[problemType.color];

  const handleDiscoverType = () => {
    if (!discoveredTypes.includes(problemType.id)) {
      setDiscoveredTypes([...discoveredTypes, problemType.id]);
    }
    setShowSteps(true);
  };

  const handleNextType = () => {
    if (currentType < PROBLEM_TYPES.length - 1) {
      setCurrentType(currentType + 1);
      setShowSteps(false);
    } else {
      setPhase('pattern');
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tipos de Problemas con Porcentajes
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aprende a identificar qué tipo de problema enfrentas
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Los problemas con porcentajes se pueden clasificar en <strong>4 tipos principales</strong>.
              Identificar el tipo te ayuda a saber qué fórmula usar.
            </p>

            {/* Problem triangle visual */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center mb-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  La relación entre las tres cantidades:
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-48">
                  {/* Triangle points */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                    Porcentaje (%)
                  </div>
                  <div className="absolute bottom-0 left-0 bg-amber-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                    Parte
                  </div>
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                    Total
                  </div>
                  {/* Triangle lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 192">
                    <path
                      d="M 128 40 L 40 160 L 216 160 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-300 dark:text-gray-600"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Siempre conoces 2 de estas cantidades y debes encontrar la tercera
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discover')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>Explorar los 4 tipos</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'discover' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress */}
          <div className="flex justify-center gap-2">
            {PROBLEM_TYPES.map((type, i) => (
              <div
                key={type.id}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  discoveredTypes.includes(type.id)
                    ? 'bg-green-500 text-white'
                    : i === currentType
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {discoveredTypes.includes(type.id) ? <Check size={18} /> : i + 1}
              </div>
            ))}
          </div>

          {/* Problem type card */}
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="text-center mb-4">
              <h3 className={cn('text-xl font-bold', colors.text)}>
                {problemType.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {problemType.description}
              </p>
            </div>

            {/* Formula */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Fórmula:</p>
              <p className="font-mono text-lg text-gray-800 dark:text-gray-200 font-bold">
                {problemType.formula}
              </p>
            </div>

            {/* Example */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">Ejemplo:</h4>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                &quot;{problemType.example.question}&quot;
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                <strong>Datos:</strong> {problemType.example.data}
              </p>

              {!showSteps ? (
                <div className="flex justify-center">
                  <button
                    onClick={handleDiscoverType}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                  >
                    Ver solución
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                    {problemType.example.steps.map((step, i) => (
                      <p key={i} className="font-mono text-gray-600 dark:text-gray-400">
                        {step}
                      </p>
                    ))}
                  </div>
                  <div className={cn('p-4 rounded-lg', colors.bg)}>
                    <p className={cn('font-mono font-bold text-xl text-center', colors.text)}>
                      Respuesta: {problemType.example.result}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showSteps && (
            <div className="flex justify-center">
              <button
                onClick={handleNextType}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              >
                <span>{currentType < PROBLEM_TYPES.length - 1 ? 'Siguiente tipo' : 'Ver resumen'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'pattern' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              Resumen: Los 4 Tipos de Problemas
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {PROBLEM_TYPES.map((type) => {
                const typeColors = colorClasses[type.color];
                return (
                  <div
                    key={type.id}
                    className={cn('p-4 rounded-xl border', typeColors.bg, typeColors.border)}
                  >
                    <h4 className={cn('font-bold mb-2', typeColors.text)}>{type.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{type.description}</p>
                    <p className="font-mono text-xs bg-white dark:bg-gray-800 p-2 rounded">
                      {type.formula}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick reference */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              ¿Cómo identificar el tipo?
            </h4>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>1. <strong>Lee el problema</strong> e identifica qué datos te dan.</p>
              <p>2. <strong>Determina qué te piden</strong>: ¿la parte, el porcentaje o el total?</p>
              <p>3. <strong>Usa la fórmula correcta</strong> según lo que necesitas encontrar.</p>
              <p>4. Para <strong>aumentos/disminuciones</strong>, multiplica por el factor (1 ± %/100).</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
