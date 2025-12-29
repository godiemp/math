'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'richter' | 'decibeles' | 'ph' | 'tips';

interface ApplicationTab {
  id: TabId;
  title: string;
  shortTitle: string;
  emoji: string;
  formula: string;
  description: string;
  example: {
    question: string;
    steps: string[];
    answer: string;
  };
  color: string;
}

const APPLICATIONS: ApplicationTab[] = [
  {
    id: 'richter',
    title: 'Escala Richter (Terremotos)',
    shortTitle: 'Richter',
    emoji: '🌋',
    formula: '1 punto en la escala = 10× más amplitud',
    description: 'Es una escala logarítmica: un terremoto de magnitud 6 tiene 10 veces más amplitud que uno de magnitud 5.',
    example: {
      question: 'Un terremoto de magnitud 7 vs uno de magnitud 5: ¿cuántas veces más amplitud?',
      steps: [
        'Diferencia: 7 - 5 = 2 puntos',
        'Cada punto = 10× más amplitud',
        '2 puntos = 10 × 10 = 10² = 100×',
      ],
      answer: '100 veces más amplitud',
    },
    color: 'orange',
  },
  {
    id: 'decibeles',
    title: 'Decibeles (Sonido)',
    shortTitle: 'Decibeles',
    emoji: '🔊',
    formula: '10 dB más = 10× más intensidad',
    description: 'Es una escala logarítmica: un sonido de 70 dB es 10 veces más intenso que uno de 60 dB.',
    example: {
      question: 'Un concierto (100 dB) vs una conversación (60 dB): ¿cuántas veces más intenso?',
      steps: [
        'Diferencia: 100 - 60 = 40 dB',
        'Cada 10 dB = 10× más intensidad',
        '40 dB = 4 saltos de 10 dB = 10⁴ = 10.000×',
      ],
      answer: '10.000 veces más intenso',
    },
    color: 'blue',
  },
  {
    id: 'ph',
    title: 'Escala pH (Acidez)',
    shortTitle: 'pH',
    emoji: '🧪',
    formula: '1 punto menos en pH = 10× más ácido',
    description: 'Es una escala logarítmica inversa: pH 3 es 10 veces más ácido que pH 4 (número menor = más ácido).',
    example: {
      question: 'Jugo de limón (pH 2) vs agua pura (pH 7): ¿cuántas veces más ácido?',
      steps: [
        'Diferencia: 7 - 2 = 5 puntos',
        'Cada punto = 10× más ácido',
        '5 puntos = 10⁵ = 100.000×',
      ],
      answer: '100.000 veces más ácido',
    },
    color: 'green',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-700',
    tab: 'bg-orange-500 text-white',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
    tab: 'bg-blue-500 text-white',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-700',
    tab: 'bg-green-500 text-white',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('richter');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['richter']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentApp = APPLICATIONS.find(a => a.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentApp!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Aplicaciones Reales
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Fórmulas y ejemplos de cada escala logarítmica
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {APPLICATIONS.map((app) => {
          const tabColors = colorClasses[app.color];
          const isVisited = visitedTabs.includes(app.id);
          return (
            <button
              key={app.id}
              onClick={() => handleTabChange(app.id)}
              className={cn(
                'px-3 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-1',
                activeTab === app.id
                  ? tabColors.tab
                  : isVisited
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{app.emoji}</span>
              <span>{app.shortTitle}</span>
              {isVisited && activeTab !== app.id && (
                <span className="ml-1 text-green-500">✓</span>
              )}
            </button>
          );
        })}
        <button
          onClick={() => handleTabChange('tips')}
          className={cn(
            'px-3 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-1',
            activeTab === 'tips'
              ? colorClasses.amber.tab
              : visitedTabs.includes('tips')
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
          )}
        >
          <span>💡</span>
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
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips y resumen</h3>
          </div>

          {/* Quick reference */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Regla clave de cada escala:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <span>🌋</span>
                <span className="flex-1"><strong>Richter:</strong> +1 punto → 10× más amplitud</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <span>🔊</span>
                <span className="flex-1"><strong>Decibeles:</strong> +10 dB → 10× más intenso</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <span>🧪</span>
                <span className="flex-1"><strong>pH:</strong> −1 punto → 10× más ácido</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Estrategia:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Calcula la diferencia en la escala</li>
                <li>• Identifica cuánto representa cada unidad</li>
                <li>• Usa potencias de 10 para el factor</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Pensar que 2× en escala = 2× real</li>
                <li>• Olvidar que pH menor = más ácido</li>
                <li>• Confundir amplitud con energía</li>
              </ul>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Clave para resolver problemas:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Diferencia en escala log → Factor = 10^(diferencia)</strong>
              <br />
              Ejemplo: 3 puntos de diferencia = 10³ = 1000 veces
            </p>
          </div>
        </div>
      ) : (
        /* Application content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{currentApp!.emoji}</span>
            <div>
              <h3 className={cn('text-xl font-bold', colors.text)}>
                {currentApp!.title}
              </h3>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {currentApp!.description}
          </p>

          {/* Formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
            <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
              {currentApp!.formula}
            </p>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-500" />
              Ejemplo:
            </h4>
            <div className="space-y-3">
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {currentApp!.example.question}
              </p>
              <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                {currentApp!.example.steps.map((step, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                    {i === currentApp!.example.steps.length - 1 ? '→ ' : '• '}
                    {step}
                  </p>
                ))}
              </div>
              <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                <p className={cn('font-bold text-center', colors.text)}>
                  Respuesta: {currentApp!.example.answer}
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
