'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { MathText } from '@/components/math/MathDisplay';

type TabId = 'zero' | 'negative' | 'fractions' | 'combined' | 'tips';

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
    id: 'zero',
    title: 'Exponente Cero',
    shortTitle: '$a^0$',
    description: 'Cualquier número distinto de cero elevado a la potencia cero es igual a 1.',
    formula: '$a^0 = 1$ (donde $a \\neq 0$)',
    example: {
      input: '$7^0$',
      steps: ['Aplicamos la regla: cualquier número $\\neq 0$ elevado a 0 es 1'],
      result: '1',
    },
    color: 'blue',
  },
  {
    id: 'negative',
    title: 'Exponente Negativo',
    shortTitle: '$a^{-n}$',
    description: 'Un exponente negativo indica que debemos tomar el recíproco de la base elevada al exponente positivo.',
    formula: '$a^{-n} = \\frac{1}{a^n}$',
    example: {
      input: '$4^{-2}$',
      steps: ['Aplicamos la regla: $a^{-n} = \\frac{1}{a^n}$', '$4^{-2} = \\frac{1}{4^2}$', '$= \\frac{1}{16}$'],
      result: '$\\frac{1}{16}$',
    },
    color: 'purple',
  },
  {
    id: 'fractions',
    title: 'Fracciones con Exp. Negativo',
    shortTitle: '$(\\frac{a}{b})^{-n}$',
    description: 'Una fracción con exponente negativo invierte la fracción y cambia el signo del exponente.',
    formula: '$\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n$',
    example: {
      input: '$\\left(\\frac{2}{3}\\right)^{-2}$',
      steps: ['Invertimos la fracción y quitamos el negativo', '$\\left(\\frac{2}{3}\\right)^{-2} = \\left(\\frac{3}{2}\\right)^2$', '$= \\frac{9}{4}$'],
      result: '$\\frac{9}{4}$',
    },
    color: 'teal',
  },
  {
    id: 'combined',
    title: 'Casos Especiales',
    shortTitle: 'Especiales',
    description: 'Algunos casos especiales que debes conocer.',
    formula: '$(-a)^0 = 1$ y $1^{-n} = 1$',
    example: {
      input: '$(-5)^0$ y $1^{-3}$',
      steps: ['$(-5)^0 = 1$ (cualquier número $\\neq 0$)', '$1^{-3} = \\frac{1}{1^3} = \\frac{1}{1} = 1$'],
      result: 'Ambos = 1',
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
  const [activeTab, setActiveTab] = useState<TabId>('zero');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['zero']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find((f) => f.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentFormula!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Reglas de Exponentes
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Formalicemos lo que hemos descubierto
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
              <span><MathText content={formula.shortTitle} /></span>
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
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips y errores comunes</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <MathText content="$5^0 = 1$" /> (no es 0 ni 5)</li>
                <li>• <MathText content="$2^{-3} = \\frac{1}{8}$" /> (no es -8)</li>
                <li>• El exponente negativo NO hace al resultado negativo</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• ❌ <MathText content="$3^0 = 0$" /> (incorrecto, es 1)</li>
                <li>• ❌ <MathText content="$2^{-2} = -4$" /> (incorrecto, es <MathText content="$\\frac{1}{4}$" />)</li>
                <li>• ❌ <MathText content="$0^0$" /> está indefinido (cuidado)</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>{currentFormula!.title}</h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">{currentFormula!.description}</p>

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <p className="text-center text-2xl text-gray-800 dark:text-gray-200">
              <MathText content={currentFormula!.formula} />
            </p>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ejemplo:
            </h4>
            <div className="space-y-3">
              <p className="text-lg text-gray-800 dark:text-gray-200">
                <MathText content={currentFormula!.example.input} />
              </p>
              <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                {currentFormula!.example.steps.map((step, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                    {i === currentFormula!.example.steps.length - 1 ? '→ ' : '• '}
                    <MathText content={step} />
                  </p>
                ))}
              </div>
              <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                <p className={cn('font-bold text-lg text-center', colors.text)}>
                  = <MathText content={currentFormula!.example.result} />
                </p>
              </div>
            </div>
          </div>
        </div>
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
