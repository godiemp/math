'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'formula' | 'pasos' | 'tips';

const colorClasses = {
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
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('formula');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['formula']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const colors = activeTab === 'formula' ? colorClasses.blue :
                 activeTab === 'pasos' ? colorClasses.purple :
                 colorClasses.amber;

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Formula del Cono
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Todo lo que necesitas saber
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {[
          { id: 'formula' as TabId, label: 'Formula', color: colorClasses.blue },
          { id: 'pasos' as TabId, label: 'Pasos', color: colorClasses.purple },
          { id: 'tips' as TabId, label: 'Tips', color: colorClasses.amber },
        ].map((tab) => {
          const isVisited = visitedTabs.includes(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'px-6 py-2 rounded-lg font-medium transition-all',
                activeTab === tab.id
                  ? tab.color.tab
                  : isVisited
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{tab.label}</span>
              {isVisited && activeTab !== tab.id && (
                <span className="ml-1 text-green-500">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'formula' && (
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>
              Formula del Volumen del Cono
            </h3>
          </div>

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <p className="text-center font-mono text-3xl text-gray-800 dark:text-gray-200">
              V = <span className="text-red-500">1/3</span> × π × r² × h
            </p>
            <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
              Donde: r = radio de la base, h = altura perpendicular
            </p>
          </div>

          {/* Cone diagram */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 200 180" className="w-64 h-48">
              {/* Cone */}
              <ellipse cx="100" cy="140" rx="60" ry="15" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
              <line x1="40" y1="140" x2="100" y2="30" stroke="#0d9488" strokeWidth="2" />
              <line x1="160" y1="140" x2="100" y2="30" stroke="#0d9488" strokeWidth="2" />
              <circle cx="100" cy="30" r="4" fill="#0d9488" />

              {/* Height line */}
              <line x1="100" y1="30" x2="100" y2="140" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" />
              <text x="110" y="90" fontSize="14" fontWeight="bold" fill="#3b82f6">h</text>

              {/* Radius line */}
              <line x1="100" y1="140" x2="160" y2="140" stroke="#ef4444" strokeWidth="2" />
              <text x="130" y="158" fontSize="14" fontWeight="bold" fill="#ef4444">r</text>

              {/* Center point */}
              <circle cx="100" cy="140" r="3" fill="#0d9488" />
            </svg>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ejemplo: r = 5 cm, h = 12 cm
            </h4>
            <div className="space-y-2 font-mono text-gray-700 dark:text-gray-300">
              <p>V = (1/3) × 3.14 × 5² × 12</p>
              <p>V = (1/3) × 3.14 × 25 × 12</p>
              <p>V = (1/3) × 942</p>
              <p className="text-lg font-bold text-teal-600 dark:text-teal-400">V = 314 cm³</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pasos' && (
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>
              Procedimiento Paso a Paso
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { step: 1, text: 'Identifica el radio (r) de la base circular', color: 'bg-red-500' },
              { step: 2, text: 'Identifica la altura (h) perpendicular a la base', color: 'bg-blue-500' },
              { step: 3, text: 'Eleva el radio al cuadrado: r²', color: 'bg-purple-500' },
              { step: 4, text: 'Multiplica por π (usa 3.14): π × r²', color: 'bg-teal-500' },
              { step: 5, text: 'Multiplica por la altura: π × r² × h', color: 'bg-cyan-500' },
              { step: 6, text: 'Divide entre 3 (o multiplica por 1/3)', color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-white font-bold', item.color)}>
                  {item.step}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-700">
            <p className="text-green-800 dark:text-green-200 font-medium text-center">
              Recuerda: ¡El paso 6 es CRUCIAL! Sin el 1/3, calculas el cilindro.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>
              Tips y Errores Comunes
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Siempre incluir el factor 1/3</li>
                <li>• Elevar al cuadrado SOLO el radio</li>
                <li>• Usar la altura perpendicular</li>
                <li>• Verificar unidades (cm³, m³)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Olvidar el 1/3 (error mas comun!)</li>
                <li>• Usar diametro en vez de radio</li>
                <li>• Confundir altura con generatriz</li>
                <li>• Elevar al cuadrado la altura</li>
              </ul>
            </div>
          </div>

          {/* Key distinction */}
          <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700 mb-4">
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">
              ¡Cuidado! No confundas:
            </h4>
            <div className="grid grid-cols-2 gap-4 font-mono text-center">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-red-600 line-through">V = πr²h</p>
                <p className="text-xs text-gray-500 mt-1">CILINDRO</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-green-600">V = (1/3)πr²h</p>
                <p className="text-xs text-gray-500 mt-1">CONO ✓</p>
              </div>
            </div>
          </div>

          {/* Mnemonic */}
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Regla mnemotecnica:
            </h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-lg text-center font-semibold">
              &ldquo;CONO = UN TERCIO del cilindro&rdquo;
            </p>
            <p className="text-yellow-600 dark:text-yellow-400 text-sm text-center mt-2">
              Cada vez que veas un cono, piensa: 1/3
            </p>
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
