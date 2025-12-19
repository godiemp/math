'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'basic' | 'multiple' | 'restrictions' | 'order';

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
    id: 'basic',
    title: 'Caso Básico',
    shortTitle: 'Básico',
    description: 'Dos decisiones independientes con opciones fijas',
    formula: 'Total = n₁ × n₂',
    example: {
      input: '3 camisas y 5 pantalones',
      steps: [
        'n₁ = 3 (opciones de camisa)',
        'n₂ = 5 (opciones de pantalón)',
        'Total = 3 × 5',
      ],
      result: '15 combinaciones',
    },
    color: 'blue',
  },
  {
    id: 'multiple',
    title: 'Múltiples Decisiones',
    shortTitle: 'Múltiples',
    description: 'Cuando hay más de dos decisiones que tomar',
    formula: 'Total = n₁ × n₂ × n₃ × ... × nₖ',
    example: {
      input: '2 entradas, 4 platos, 3 postres',
      steps: [
        'n₁ = 2 (entradas)',
        'n₂ = 4 (platos principales)',
        'n₃ = 3 (postres)',
        'Total = 2 × 4 × 3',
      ],
      result: '24 menús diferentes',
    },
    color: 'purple',
  },
  {
    id: 'restrictions',
    title: 'Con Repetición',
    shortTitle: 'Repetición',
    description: 'Cuando puedes usar el mismo elemento varias veces',
    formula: 'Total = n^k (n opciones, k posiciones)',
    example: {
      input: 'Contraseña de 4 dígitos (0-9)',
      steps: [
        'Cada posición tiene 10 opciones (0-9)',
        'Hay 4 posiciones',
        'Total = 10 × 10 × 10 × 10 = 10⁴',
      ],
      result: '10,000 contraseñas posibles',
    },
    color: 'teal',
  },
  {
    id: 'order',
    title: 'Sin Repetición (Orden)',
    shortTitle: 'Sin repetir',
    description: 'Cuando no puedes repetir elementos (permutaciones)',
    formula: 'Total = n × (n-1) × (n-2) × ...',
    example: {
      input: 'Ordenar 4 personas en fila',
      steps: [
        'Primera posición: 4 opciones',
        'Segunda posición: 3 opciones (una ya usada)',
        'Tercera posición: 2 opciones',
        'Cuarta posición: 1 opción',
        'Total = 4 × 3 × 2 × 1 = 4!',
      ],
      result: '24 órdenes diferentes',
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
  const [activeTab, setActiveTab] = useState<TabId>('basic');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['basic']);

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
          Principio Multiplicativo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Diferentes aplicaciones del principio de conteo
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
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
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
            <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Usa multiplicación cuando:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Las decisiones son independientes</li>
              <li>• Necesitas contar combinaciones</li>
              <li>• Cada opción puede ir con cualquier otra</li>
              <li>• Se forman secuencias o conjuntos</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Sumar en lugar de multiplicar</li>
              <li>• Olvidar que hay repetición/no repetición</li>
              <li>• No considerar todas las posiciones</li>
              <li>• Confundir orden importante vs no importante</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
        <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Pregunta clave:
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Antes de resolver, pregúntate:
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>1.</strong> ¿Cuántas decisiones/posiciones hay?
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>2.</strong> ¿Cuántas opciones tiene cada una?
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>3.</strong> ¿Se puede repetir o no?
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>4.</strong> <span className="text-green-600 dark:text-green-400 font-semibold">Multiplica todas las opciones.</span>
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
