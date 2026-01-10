'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { MathText } from '@/components/math/MathDisplay';

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
    formula: '$a^n = a \\times a \\times a \\times ... \\times a$ (n veces)',
    example: {
      input: '$5^3$',
      steps: [
        'Base = 5',
        'Exponente = 3',
        '$5^3 = 5 \\times 5 \\times 5$',
        '$= 25 \\times 5$',
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
    formula: '$a^1 = a$,  $a^0 = 1$ (a ≠ 0),  $1^n = 1$',
    example: {
      input: '$7^0$ y $7^1$',
      steps: [
        'Cualquier número ≠ 0 elevado a 0 es 1',
        '$7^0 = 1$',
        'Cualquier número elevado a 1 es él mismo',
        '$7^1 = 7$',
      ],
      result: '$7^0 = 1$, $7^1 = 7$',
    },
    color: 'purple',
  },
  {
    id: 'reading',
    title: 'Cómo Leer Potencias',
    shortTitle: 'Lectura',
    description: 'Los exponentes 2 y 3 tienen nombres especiales',
    formula: '$a^2$ = "a al cuadrado",  $a^3$ = "a al cubo"',
    example: {
      input: '$4^2$ y $2^3$',
      steps: [
        '$4^2$ se lee "cuatro al cuadrado"',
        '$4^2 = 4 \\times 4 = 16$',
        '$2^3$ se lee "dos al cubo"',
        '$2^3 = 2 \\times 2 \\times 2 = 8$',
      ],
      result: '$4^2 = 16$, $2^3 = 8$',
    },
    color: 'teal',
  },
  {
    id: 'applications',
    title: 'Aplicaciones',
    shortTitle: 'Usos',
    description: 'Las potencias aparecen en áreas, volúmenes y notación científica',
    formula: 'Área = $\\text{lado}^2$, Volumen = $\\text{lado}^3$',
    example: {
      input: 'Cuadrado de lado 5',
      steps: [
        'Área de un cuadrado = $\\text{lado}^2$',
        'Área = $5^2 = 5 \\times 5$',
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
                <li>• <MathText content="$2^3 = 2 \\times 2 \\times 2 = 8$" /></li>
                <li>• El exponente indica veces que se multiplica</li>
                <li>• <MathText content="$5^0 = 1$" /> (no es 0 ni 5)</li>
                <li>• <MathText content="$3^2 = 9$" /> (no es 6)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Confundir <MathText content="$2^3 = 8$" /> con <MathText content="$2 \\times 3 = 6$" /></li>
                <li>• Pensar que <MathText content="$5^0 = 0$" /></li>
                <li>• Confundir base con exponente</li>
                <li>• Sumar en vez de multiplicar</li>
              </ul>
            </div>
          </div>
          {/* Memory tip */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 mt-4 border border-green-200 dark:border-green-700">
            <h5 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              Truco para recordar:
            </h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              El exponente te dice <strong>&quot;cuántas veces escribir la base&quot;</strong> antes de multiplicar:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-lg">
                <MathText content="$\\textcolor{blue}{4}^{\\textcolor{purple}{3}} = \\textcolor{blue}{4} \\times \\textcolor{blue}{4} \\times \\textcolor{blue}{4} = \\textcolor{green}{\\textbf{64}}$" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Exponente 3 → escribimos el 4 tres veces → multiplicamos
              </p>
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
            <div className="text-center text-2xl text-gray-800 dark:text-gray-200">
              <MathText content={currentFormula!.formula} />
            </div>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ejemplo:
            </h4>
            <div className="space-y-3">
              <div className="text-lg text-gray-800 dark:text-gray-200">
                <MathText content={currentFormula!.example.input} />
              </div>
              <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                {currentFormula!.example.steps.map((step, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                    {i === currentFormula!.example.steps.length - 1 ? '→ ' : '• '}
                    <MathText content={step} />
                  </p>
                ))}
              </div>
              <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                <div className={cn('font-bold text-lg text-center', colors.text)}>
                  = <MathText content={currentFormula!.example.result} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
