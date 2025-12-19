'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'definition' | 'notation' | 'inverse' | 'fractional' | 'tips';

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
    title: 'Definición de Raíz Enésima',
    shortTitle: 'Definición',
    description: 'La raíz n-ésima de a es el número que elevado a n da a',
    formula: 'ⁿ√a = b  ⟺  bⁿ = a',
    example: {
      input: '∛64',
      steps: [
        'Buscamos b tal que b³ = 64',
        '4 × 4 × 4 = 64 ✓',
        'Por lo tanto ∛64 = 4',
      ],
      result: '4',
    },
    color: 'blue',
  },
  {
    id: 'notation',
    title: 'Notación Especial',
    shortTitle: 'Notación',
    description: 'La raíz cuadrada y cúbica tienen símbolos especiales',
    formula: '²√a = √a (raíz cuadrada),  ³√a = ∛a (raíz cúbica)',
    example: {
      input: '√49 y ∛125',
      steps: [
        '√49: buscamos b tal que b² = 49',
        '7 × 7 = 49, entonces √49 = 7',
        '∛125: buscamos b tal que b³ = 125',
        '5 × 5 × 5 = 125, entonces ∛125 = 5',
      ],
      result: '√49 = 7, ∛125 = 5',
    },
    color: 'purple',
  },
  {
    id: 'inverse',
    title: 'Raíz y Potencia: Operaciones Inversas',
    shortTitle: 'Inversa',
    description: 'La raíz n-ésima "deshace" la potencia n-ésima y viceversa',
    formula: 'ⁿ√(aⁿ) = a  y  (ⁿ√a)ⁿ = a',
    example: {
      input: '∛(5³) y (∛27)³',
      steps: [
        '∛(5³) = ∛125 = 5',
        'La raíz cúbica deshace el cubo',
        '(∛27)³ = 3³ = 27',
        'El cubo deshace la raíz cúbica',
      ],
      result: 'Ambos vuelven al original',
    },
    color: 'teal',
  },
  {
    id: 'fractional',
    title: 'Raíces como Exponentes Fraccionarios',
    shortTitle: 'Exponente',
    description: 'Las raíces se pueden escribir como potencias con exponente fraccionario',
    formula: 'ⁿ√a = a^(1/n)  y  ⁿ√(aᵐ) = a^(m/n)',
    example: {
      input: '√16 como potencia',
      steps: [
        '√16 = 16^(1/2)',
        '= (2⁴)^(1/2)',
        '= 2^(4×1/2)',
        '= 2² = 4',
      ],
      result: '16^(1/2) = 4',
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
          Conceptos de Raíces Enésimas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Todo lo que necesitas saber sobre las raíces
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

      {activeTab === 'tips' ? (
        /* Tips content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips y errores comunes</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• √25 = 5 (porque 5² = 25)</li>
                <li>• ∛(-8) = -2 (raíz impar de negativo existe)</li>
                <li>• ⁴√81 = 3 (porque 3⁴ = 81)</li>
                <li>• 8^(1/3) = ∛8 = 2</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Confundir √16 con 16/2 = 8</li>
                <li>• Pensar que √25 = 12.5</li>
                <li>• Olvidar que √(-4) no existe en reales</li>
                <li>• Confundir índice con exponente</li>
              </ul>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Clave para recordar:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              La raíz es <strong>&quot;deshacer&quot;</strong> una potencia. Pregúntate: <strong>&quot;¿Qué número elevado a n da este resultado?&quot;</strong>
            </p>
          </div>
        </div>
      ) : (
        /* Formula content */
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
          La raíz es <strong>&quot;deshacer&quot;</strong> una potencia. Pregúntate: <strong>&quot;¿Qué número elevado a n da este resultado?&quot;</strong>
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="text-center">
              <p className="text-blue-600">√100</p>
              <p className="text-xs text-gray-500">¿qué² = 100?</p>
              <p className="text-green-600 font-bold">= 10</p>
            </div>
            <div className="text-center">
              <p className="text-purple-600">∛1000</p>
              <p className="text-xs text-gray-500">¿qué³ = 1000?</p>
              <p className="text-green-600 font-bold">= 10</p>
            </div>
            <div className="text-center">
              <p className="text-pink-600">⁴√10000</p>
              <p className="text-xs text-gray-500">¿qué⁴ = 10000?</p>
              <p className="text-green-600 font-bold">= 10</p>
            </div>
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
