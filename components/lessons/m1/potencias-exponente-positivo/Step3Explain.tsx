'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'definition' | 'special' | 'reading' | 'applications' | 'tips';

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
    id: 'definition',
    title: 'Definición de Potencia',
    shortTitle: 'Definición',
    description: 'Una potencia es una multiplicación repetida del mismo número',
    formula: 'aⁿ = a × a × a × ... × a (n veces)',
    example: {
      input: '5³',
      steps: [
        'Base = 5',
        'Exponente = 3',
        '5³ = 5 × 5 × 5',
        '= 25 × 5',
        '= 125',
      ],
      result: '125',
    },
    color: 'blue',
  },
  {
    id: 'special',
    title: 'Casos Especiales',
    shortTitle: 'Especiales',
    description: 'Exponentes 0, 1 y base 1 tienen resultados especiales',
    formula: 'a¹ = a,  a⁰ = 1 (a ≠ 0),  1ⁿ = 1',
    example: {
      input: '7⁰ y 7¹',
      steps: [
        'Cualquier número ≠ 0 elevado a 0 es 1',
        '7⁰ = 1',
        'Cualquier número elevado a 1 es él mismo',
        '7¹ = 7',
      ],
      result: '7⁰ = 1, 7¹ = 7',
    },
    color: 'purple',
  },
  {
    id: 'reading',
    title: 'Cómo Leer Potencias',
    shortTitle: 'Lectura',
    description: 'Los exponentes 2 y 3 tienen nombres especiales',
    formula: 'a² = "a al cuadrado",  a³ = "a al cubo"',
    example: {
      input: '4² y 2³',
      steps: [
        '4² se lee "cuatro al cuadrado"',
        '4² = 4 × 4 = 16',
        '2³ se lee "dos al cubo"',
        '2³ = 2 × 2 × 2 = 8',
      ],
      result: '4² = 16, 2³ = 8',
    },
    color: 'teal',
  },
  {
    id: 'applications',
    title: 'Aplicaciones',
    shortTitle: 'Usos',
    description: 'Las potencias aparecen en áreas, volúmenes y notación científica',
    formula: 'Área = lado², Volumen = lado³',
    example: {
      input: 'Cuadrado de lado 5',
      steps: [
        'Área de un cuadrado = lado²',
        'Área = 5² = 5 × 5',
        '= 25 unidades²',
        'Por eso "al cuadrado" = exponente 2',
      ],
      result: '25 unidades²',
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
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('definition');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['definition']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find(f => f.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentFormula!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Conceptos de Potencias
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Todo lo que necesitas saber sobre las potencias
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
        <button
          onClick={() => handleTabChange('tips')}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all text-sm',
            activeTab === 'tips'
              ? colorClasses.amber.tab
              : visitedTabs.includes('tips')
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
          )}
        >
          <span>Tips</span>
          {visitedTabs.includes('tips') && activeTab !== 'tips' && (
            <span className="ml-1 text-green-500">✓</span>
          )}
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'tips' ? (
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>
              Tips y errores comunes
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 2³ = 2 × 2 × 2 = 8</li>
                <li>• El exponente indica veces que se multiplica</li>
                <li>• 5⁰ = 1 (no es 0 ni 5)</li>
                <li>• 3² = 9 (no es 6)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Confundir 2³ = 8 con 2 × 3 = 6</li>
                <li>• Pensar que 5⁰ = 0</li>
                <li>• Confundir base con exponente</li>
                <li>• Sumar en vez de multiplicar</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>
              {currentFormula!.title}
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {currentFormula!.description}
          </p>

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
              {currentFormula!.formula}
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
                {currentFormula!.example.input}
              </p>
              <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                {currentFormula!.example.steps.map((step, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                    {i === currentFormula!.example.steps.length - 1 ? '→ ' : '• '}
                    {step}
                  </p>
                ))}
              </div>
              <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                  = {currentFormula!.example.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Memory tip */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
        <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Truco para recordar:
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          El exponente te dice <strong>&quot;cuántas veces escribir la base&quot;</strong> antes de multiplicar:
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center">
          <span className="text-blue-600">4</span><sup className="text-purple-600">3</sup>
          <span className="text-gray-400 mx-2">=</span>
          <span className="text-blue-600">4</span>
          <span className="text-gray-400 mx-1">×</span>
          <span className="text-blue-600">4</span>
          <span className="text-gray-400 mx-1">×</span>
          <span className="text-blue-600">4</span>
          <span className="text-gray-400 mx-2">=</span>
          <span className="text-green-600 font-bold">64</span>
          <p className="text-xs text-gray-500 mt-2">
            Exponente 3 → escribimos el 4 tres veces → multiplicamos
          </p>
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
