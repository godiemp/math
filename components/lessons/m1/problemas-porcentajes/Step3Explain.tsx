'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'successive' | 'reverse' | 'comparison' | 'variations';

interface FormulaTab {
  id: TabId;
  title: string;
  shortTitle: string;
  description: string;
  formula: string;
  example: {
    input: string;
    steps: string[];
    result: string;
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'successive',
    title: 'Descuentos Sucesivos',
    shortTitle: 'Sucesivos',
    description: 'Cuando se aplican varios porcentajes uno tras otro sobre el resultado anterior.',
    formula: 'Final = Original × (1 - d₁/100) × (1 - d₂/100)',
    example: {
      input: 'Precio $100.000 con 20% y luego 10% de descuento',
      steps: [
        'Primer descuento: $100.000 × 0,80 = $80.000',
        'Segundo descuento: $80.000 × 0,90 = $72.000',
        'O directo: $100.000 × 0,80 × 0,90 = $72.000',
        '¡OJO! No es lo mismo que 30% directo ($70.000)',
      ],
      result: '$72.000',
    },
    color: 'blue',
  },
  {
    id: 'reverse',
    title: 'Porcentaje Inverso',
    shortTitle: 'Inverso',
    description: 'Encontrar el valor original conociendo el resultado después de un cambio.',
    formula: 'Original = Actual ÷ (1 ± cambio/100)',
    example: {
      input: 'Después de 25% de aumento, el precio es $50.000',
      steps: [
        'Si subió 25%, el actual es el 125% del original',
        'Original = $50.000 ÷ 1,25',
        '= $40.000',
        'Verificación: $40.000 × 1,25 = $50.000 ✓',
      ],
      result: '$40.000',
    },
    color: 'purple',
  },
  {
    id: 'comparison',
    title: 'Comparación Porcentual',
    shortTitle: 'Comparación',
    description: 'Calcular qué porcentaje mayor o menor es una cantidad respecto a otra.',
    formula: 'Diferencia % = ((Nuevo - Original) ÷ Original) × 100',
    example: {
      input: 'El precio subió de $80 a $100',
      steps: [
        'Diferencia = $100 - $80 = $20',
        'Porcentaje = ($20 ÷ $80) × 100',
        '= 0,25 × 100 = 25%',
        'El precio aumentó un 25%',
      ],
      result: 'Aumento del 25%',
    },
    color: 'teal',
  },
  {
    id: 'variations',
    title: 'Variaciones Múltiples',
    shortTitle: 'Variaciones',
    description: 'Cuando un valor sube y luego baja (o viceversa) por porcentajes.',
    formula: 'Si sube x% y baja x%: Final ≠ Original',
    example: {
      input: 'Un precio sube 20% y luego baja 20%',
      steps: [
        'Inicio: $100',
        'Sube 20%: $100 × 1,20 = $120',
        'Baja 20%: $120 × 0,80 = $96',
        '¡El precio final es menor que el original!',
      ],
      result: '$96 (no vuelve a $100)',
    },
    color: 'pink',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
    tab: 'bg-blue-500 text-white',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
    tab: 'bg-purple-500 text-white',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-700',
    tab: 'bg-teal-500 text-white',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-200 dark:border-pink-700',
    tab: 'bg-pink-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('successive');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['successive']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find(f => f.id === activeTab)!;
  const colors = colorClasses[currentFormula.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Estrategias Avanzadas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Técnicas para resolver problemas más complejos
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {FORMULAS.map((formula) => {
          const tabColors = colorClasses[formula.color];
          const isVisited = visitedTabs.includes(formula.id);
          return (
            <button
              key={formula.id}
              onClick={() => handleTabChange(formula.id)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all text-sm',
                activeTab === formula.id
                  ? tabColors.tab
                  : isVisited
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{formula.shortTitle}</span>
              {isVisited && activeTab !== formula.id && (
                <span className="ml-1 text-green-500">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Formula content */}
      <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className={cn('w-6 h-6', colors.text)} />
          <h3 className={cn('text-xl font-bold', colors.text)}>
            {currentFormula.title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {currentFormula.description}
        </p>

        {/* Main formula */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
          <p className="text-center font-mono text-xl text-gray-800 dark:text-gray-200">
            {currentFormula.formula}
          </p>
        </div>

        {/* Example */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Ejemplo:
          </h4>
          <div className="space-y-3">
            <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
              {currentFormula.example.input}
            </p>
            <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
              {currentFormula.example.steps.map((step, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                  {i === currentFormula.example.steps.length - 1 ? '→ ' : '• '}
                  {step}
                </p>
              ))}
            </div>
            <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
              <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                = {currentFormula.example.result}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips and common errors */}
      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
        <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Errores comunes a evitar:
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Incorrecto:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Sumar porcentajes sucesivos directamente</li>
              <li>• Pensar que +20% y -20% se cancelan</li>
              <li>• Calcular el % sobre el valor nuevo, no el original</li>
              <li>• Olvidar dividir por 100 al convertir %</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Multiplicar factores sucesivos</li>
              <li>• Aplicar cada cambio al valor actual</li>
              <li>• Usar la base correcta para cada cálculo</li>
              <li>• Verificar el resultado en sentido inverso</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick reference */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
        <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Factores de cambio rápidos:
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-green-600 text-lg">+10%</p>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">× 1,10</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-green-600 text-lg">+25%</p>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">× 1,25</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-red-600 text-lg">-10%</p>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">× 0,90</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-red-600 text-lg">-25%</p>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">× 0,75</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-green-600 text-lg">+50%</p>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">× 1,50</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-green-600 text-lg">+100%</p>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">× 2,00</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-red-600 text-lg">-50%</p>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">× 0,50</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-red-600 text-lg">-75%</p>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">× 0,25</p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FORMULAS.map((formula) => {
          const cardColors = colorClasses[formula.color];
          return (
            <div
              key={formula.id}
              className={cn(
                'p-3 rounded-lg border text-center',
                cardColors.bg,
                cardColors.border
              )}
            >
              <p className={cn('font-mono text-sm font-bold', cardColors.text)}>
                {formula.shortTitle}
              </p>
            </div>
          );
        })}
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
  );
}
