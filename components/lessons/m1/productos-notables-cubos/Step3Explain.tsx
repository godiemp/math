'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'cubo-suma' | 'cubo-resta' | 'suma-cubos' | 'diferencia-cubos';

interface FormulaTab {
  id: TabId;
  title: string;
  shortTitle: string;
  formula: string;
  expanded: string;
  example: {
    input: string;
    steps: string[];
    result: string;
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'cubo-suma',
    title: 'Cubo de una Suma',
    shortTitle: '(a+b)³',
    formula: '(a + b)³ = a³ + 3a²b + 3ab² + b³',
    expanded: 'a³ + 3a²b + 3ab² + b³',
    example: {
      input: '(x + 2)³',
      steps: [
        'a = x, b = 2',
        'x³ + 3(x²)(2) + 3(x)(2²) + 2³',
        'x³ + 6x² + 12x + 8',
      ],
      result: 'x³ + 6x² + 12x + 8',
    },
    color: 'blue',
  },
  {
    id: 'cubo-resta',
    title: 'Cubo de una Resta',
    shortTitle: '(a-b)³',
    formula: '(a - b)³ = a³ - 3a²b + 3ab² - b³',
    expanded: 'a³ - 3a²b + 3ab² - b³',
    example: {
      input: '(x - 3)³',
      steps: [
        'a = x, b = 3',
        'x³ - 3(x²)(3) + 3(x)(3²) - 3³',
        'x³ - 9x² + 27x - 27',
      ],
      result: 'x³ - 9x² + 27x - 27',
    },
    color: 'purple',
  },
  {
    id: 'suma-cubos',
    title: 'Suma de Cubos',
    shortTitle: 'a³+b³',
    formula: 'a³ + b³ = (a + b)(a² - ab + b²)',
    expanded: '(a + b)(a² - ab + b²)',
    example: {
      input: 'x³ + 27',
      steps: [
        'x³ + 3³ (identificar cubos)',
        'a = x, b = 3',
        '(x + 3)(x² - 3x + 9)',
      ],
      result: '(x + 3)(x² - 3x + 9)',
    },
    color: 'teal',
  },
  {
    id: 'diferencia-cubos',
    title: 'Diferencia de Cubos',
    shortTitle: 'a³-b³',
    formula: 'a³ - b³ = (a - b)(a² + ab + b²)',
    expanded: '(a - b)(a² + ab + b²)',
    example: {
      input: '8x³ - 125',
      steps: [
        '(2x)³ - 5³ (identificar cubos)',
        'a = 2x, b = 5',
        '(2x - 5)((2x)² + (2x)(5) + 5²)',
        '(2x - 5)(4x² + 10x + 25)',
      ],
      result: '(2x - 5)(4x² + 10x + 25)',
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
  const [activeTab, setActiveTab] = useState<TabId>('cubo-suma');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['cubo-suma']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find(f => f.id === activeTab)!;
  const colors = colorClasses[currentFormula.color];
  const allVisited = visitedTabs.length === FORMULAS.length;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las Fórmulas de los Cubos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Cuatro productos notables para dominar
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
              <span className="font-mono">{formula.shortTitle}</span>
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

        {/* Main formula */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
          <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
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

      {/* Memory tips */}
      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
        <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Tips para recordar:
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Cubo de binomio:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Coeficientes: <span className="font-mono font-bold">1 - 3 - 3 - 1</span></li>
              <li>• Potencias de a: <span className="font-mono">3 → 2 → 1 → 0</span></li>
              <li>• Potencias de b: <span className="font-mono">0 → 1 → 2 → 3</span></li>
              <li>• En resta: signos <span className="font-mono text-red-500">alternan</span></li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Suma/Diferencia de cubos (SOAP):</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>S</strong>ame: primer factor tiene mismo signo</li>
              <li>• <strong>O</strong>pposite: término medio tiene signo opuesto</li>
              <li>• <strong>A</strong>lways <strong>P</strong>ositive: último término siempre +</li>
            </ul>
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

      {/* Progress indicator */}
      {!allVisited && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Explora todas las fórmulas ({visitedTabs.length}/{FORMULAS.length})
        </p>
      )}

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
