'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'multiply' | 'divide' | 'power-of-power' | 'combined';

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
    id: 'multiply',
    title: 'Producto de Potencias',
    shortTitle: 'Producto',
    description: 'Cuando multiplicas potencias con la misma base, sumas los exponentes',
    formula: 'aᵐ × aⁿ = aᵐ⁺ⁿ',
    example: {
      input: '4³ × 4²',
      steps: [
        'Misma base: 4',
        'Exponentes: 3 y 2',
        'Suma exponentes: 3 + 2 = 5',
        '= 4⁵ = 1024',
      ],
      result: '4⁵ = 1024',
    },
    color: 'blue',
  },
  {
    id: 'divide',
    title: 'Cociente de Potencias',
    shortTitle: 'Cociente',
    description: 'Cuando divides potencias con la misma base, restas los exponentes',
    formula: 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ',
    example: {
      input: '7⁵ ÷ 7³',
      steps: [
        'Misma base: 7',
        'Exponentes: 5 y 3',
        'Resta exponentes: 5 - 3 = 2',
        '= 7² = 49',
      ],
      result: '7² = 49',
    },
    color: 'purple',
  },
  {
    id: 'power-of-power',
    title: 'Potencia de Potencia',
    shortTitle: 'Potencia²',
    description: 'Cuando elevas una potencia a otro exponente, multiplicas los exponentes',
    formula: '(aᵐ)ⁿ = aᵐˣⁿ',
    example: {
      input: '(3²)⁴',
      steps: [
        'Base: 3',
        'Exponentes: 2 y 4',
        'Multiplica exponentes: 2 × 4 = 8',
        '= 3⁸ = 6561',
      ],
      result: '3⁸ = 6561',
    },
    color: 'teal',
  },
  {
    id: 'combined',
    title: 'Propiedades Combinadas',
    shortTitle: 'Combinadas',
    description: 'Puedes aplicar varias propiedades en una misma expresión',
    formula: 'aᵐ × aⁿ ÷ aᵖ = aᵐ⁺ⁿ⁻ᵖ',
    example: {
      input: '2⁴ × 2³ ÷ 2⁵',
      steps: [
        'Misma base: 2',
        'Exponentes: 4, 3, 5',
        'Opera: 4 + 3 - 5 = 2',
        '= 2² = 4',
      ],
      result: '2² = 4',
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
  const [activeTab, setActiveTab] = useState<TabId>('multiply');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['multiply']);

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
          Propiedades de las Potencias
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Las reglas que simplifican tus cálculos
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

      {/* Tips and common errors */}
      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
        <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Tips y errores comunes:
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 2³ × 2⁴ = 2⁷ (suma: 3 + 4 = 7)</li>
              <li>• 5⁶ ÷ 5² = 5⁴ (resta: 6 - 2 = 4)</li>
              <li>• (3²)³ = 3⁶ (multiplica: 2 × 3 = 6)</li>
              <li>• La base debe ser la misma</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 2³ × 2⁴ = 2¹² (multiplicar en vez de sumar)</li>
              <li>• 2³ × 3² = 6⁵ (bases diferentes, no se puede)</li>
              <li>• (3²)³ = 3⁵ (sumar en vez de multiplicar)</li>
              <li>• 5⁴ ÷ 5⁶ = 5² (el orden importa en la resta)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Memory tip */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
        <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Truco para recordar:
        </h4>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-mono text-blue-600 text-lg">×</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Multiplicar potencias</p>
              <p className="font-bold text-blue-600">→ Sumar exponentes</p>
            </div>
            <div>
              <p className="font-mono text-purple-600 text-lg">÷</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dividir potencias</p>
              <p className="font-bold text-purple-600">→ Restar exponentes</p>
            </div>
            <div>
              <p className="font-mono text-green-600 text-lg">( )ⁿ</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Potencia de potencia</p>
              <p className="font-bold text-green-600">→ Multiplicar exponentes</p>
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
