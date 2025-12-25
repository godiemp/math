'use client';

import { useState } from 'react';
import { ArrowRight, AlertTriangle, Lightbulb, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Topic = 'graficar' | 'interseccion' | 'casos';

interface TopicContent {
  id: Topic;
  name: string;
  description: string;
  content: React.ReactNode;
}

function GraficarContent() {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Pasos para graficar una recta:</h4>
        <div className="space-y-3">
          {[
            'Despeja y para obtener la forma y = mx + b',
            'Encuentra 2 puntos sustituyendo valores de x',
            'Marca los puntos en el plano cartesiano',
            'Une los puntos con una línea recta',
          ].map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ejemplo 1: Pendiente negativa - x + y = 4 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="text-lg">📝</span> Ejemplo 1: x + y = 4
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Despejar:</strong> y = 4 - x</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-sm">
              <p className="font-mono">x = 0 → y = 4 → (0, 4)</p>
              <p className="font-mono">x = 4 → y = 0 → (4, 0)</p>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Pendiente negativa: baja de izquierda a derecha</p>
          </div>
          <div className="flex justify-center">
            <svg width="140" height="140" className="bg-white dark:bg-gray-800 rounded-lg">
              {/* Grid */}
              {[0, 1, 2, 3, 4].map(i => (
                <g key={i}>
                  <line x1={20 + i * 25} y1={15} x2={20 + i * 25} y2={120} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
                  <line x1={20} y1={20 + i * 25} x2={125} y2={20 + i * 25} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
                </g>
              ))}
              {/* Axes */}
              <line x1={20} y1={120} x2={125} y2={120} stroke="currentColor" className="text-gray-500" strokeWidth="2" />
              <line x1={20} y1={15} x2={20} y2={120} stroke="currentColor" className="text-gray-500" strokeWidth="2" />
              {/* Axis labels */}
              <text x="130" y="123" fontSize="10" className="fill-gray-500">x</text>
              <text x="14" y="12" fontSize="10" className="fill-gray-500">y</text>
              {/* Line: from (0,4) to (4,0) */}
              <line x1={20} y1={20} x2={120} y2={120} stroke="#3B82F6" strokeWidth="2.5" />
              {/* Point (0, 4) */}
              <circle cx={20} cy={20} r="5" fill="#EF4444" />
              <text x={26} y={18} fontSize="9" className="fill-gray-700 dark:fill-gray-300 font-semibold">(0,4)</text>
              {/* Point (4, 0) */}
              <circle cx={120} cy={120} r="5" fill="#EF4444" />
              <text x={100} y={115} fontSize="9" className="fill-gray-700 dark:fill-gray-300 font-semibold">(4,0)</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Ejemplo 2: Pendiente positiva - y = 2x - 2 */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="text-lg">📝</span> Ejemplo 2: y = 2x - 2
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Ya despejada:</strong> y = 2x - 2</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-sm">
              <p className="font-mono">x = 0 → y = -2 → (0, -2)</p>
              <p className="font-mono">x = 2 → y = 2 → (2, 2)</p>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Pendiente positiva: sube de izquierda a derecha</p>
          </div>
          <div className="flex justify-center">
            <svg width="140" height="140" className="bg-white dark:bg-gray-800 rounded-lg">
              {/* Grid */}
              {[0, 1, 2, 3, 4].map(i => (
                <g key={i}>
                  <line x1={20 + i * 25} y1={15} x2={20 + i * 25} y2={120} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
                  <line x1={20} y1={20 + i * 25} x2={125} y2={20 + i * 25} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
                </g>
              ))}
              {/* Axes - x axis at y=0 (row 2 from bottom), y axis at x=0 */}
              <line x1={20} y1={95} x2={125} y2={95} stroke="currentColor" className="text-gray-500" strokeWidth="2" />
              <line x1={20} y1={15} x2={20} y2={120} stroke="currentColor" className="text-gray-500" strokeWidth="2" />
              {/* Axis labels */}
              <text x="130" y="98" fontSize="10" className="fill-gray-500">x</text>
              <text x="14" y="12" fontSize="10" className="fill-gray-500">y</text>
              {/* Scale labels */}
              <text x="16" y="130" fontSize="8" className="fill-gray-400">0</text>
              <text x="66" y="130" fontSize="8" className="fill-gray-400">2</text>
              {/* Line: from (0,-2) to (2,2) - extends beyond */}
              <line x1={20} y1={120} x2={70} y2={45} stroke="#10B981" strokeWidth="2.5" />
              {/* Point (0, -2) */}
              <circle cx={20} cy={120} r="5" fill="#EF4444" />
              <text x={26} y={118} fontSize="9" className="fill-gray-700 dark:fill-gray-300 font-semibold">(0,-2)</text>
              {/* Point (2, 2) */}
              <circle cx={70} cy={45} r="5" fill="#EF4444" />
              <text x={76} y={43} fontSize="9" className="fill-gray-700 dark:fill-gray-300 font-semibold">(2,2)</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Ejemplo 3: Requiere despejar - 2x - y = 4 → y = 2x - 4 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="text-lg">📝</span> Ejemplo 3: 2x - y = 4
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Despejar:</strong> y = 2x - 4</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-sm">
              <p className="font-mono">x = 0 → y = -4 → (0, -4)</p>
              <p className="font-mono">x = 3 → y = 2 → (3, 2)</p>
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400">Intercepto y negativo, pendiente 2</p>
          </div>
          <div className="flex justify-center">
            <svg width="140" height="140" className="bg-white dark:bg-gray-800 rounded-lg">
              {/* Grid */}
              {[0, 1, 2, 3, 4].map(i => (
                <g key={i}>
                  <line x1={20 + i * 25} y1={15} x2={20 + i * 25} y2={120} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
                  <line x1={20} y1={20 + i * 25} x2={125} y2={20 + i * 25} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
                </g>
              ))}
              {/* Axes */}
              <line x1={20} y1={70} x2={125} y2={70} stroke="currentColor" className="text-gray-500" strokeWidth="2" />
              <line x1={20} y1={15} x2={20} y2={120} stroke="currentColor" className="text-gray-500" strokeWidth="2" />
              {/* Axis labels */}
              <text x="130" y="73" fontSize="10" className="fill-gray-500">x</text>
              <text x="14" y="12" fontSize="10" className="fill-gray-500">y</text>
              {/* Scale labels */}
              <text x="16" y="130" fontSize="8" className="fill-gray-400">0</text>
              <text x="91" y="130" fontSize="8" className="fill-gray-400">3</text>
              {/* Line: from (0,-4) to (3,2) */}
              <line x1={20} y1={120} x2={95} y2={45} stroke="#8B5CF6" strokeWidth="2.5" />
              {/* Point (0, -4) */}
              <circle cx={20} cy={120} r="5" fill="#EF4444" />
              <text x={26} y={118} fontSize="9" className="fill-gray-700 dark:fill-gray-300 font-semibold">(0,-4)</text>
              {/* Point (3, 2) */}
              <circle cx={95} cy={45} r="5" fill="#EF4444" />
              <text x={101} y={43} fontSize="9" className="fill-gray-700 dark:fill-gray-300 font-semibold">(3,2)</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function InterseccionContent() {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Encontrar la solución gráficamente:</h4>
        <div className="space-y-3">
          {[
            'Grafica la primera ecuación (recta 1)',
            'Grafica la segunda ecuación (recta 2)',
            'Identifica el punto donde se cruzan',
            'Lee las coordenadas (x, y) del punto de intersección',
          ].map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <span className="text-xl">🎯</span> El punto de intersección
        </h4>

        <div className="text-center space-y-4">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            El punto donde se cruzan las rectas es la <strong>solución del sistema</strong>.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 inline-block">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Este punto satisface AMBAS ecuaciones:</p>
            <div className="font-mono text-lg">
              <span className="text-blue-600">Ecuación 1</span> ✓ y <span className="text-green-600">Ecuación 2</span> ✓
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Las coordenadas (x, y) del punto de intersección son los valores que resuelven el sistema.
          </p>
        </div>
      </div>
    </div>
  );
}

function CasosContent() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        {/* Caso 1: Una solución */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <div className="text-center mb-3">
            <svg width="100" height="80" className="mx-auto bg-white dark:bg-gray-800 rounded">
              <line x1="10" y1="70" x2="90" y2="10" stroke="#3B82F6" strokeWidth="2" />
              <line x1="10" y1="10" x2="90" y2="70" stroke="#10B981" strokeWidth="2" />
              <circle cx="50" cy="40" r="5" fill="#EF4444" />
            </svg>
          </div>
          <h5 className="font-bold text-green-800 dark:text-green-300 text-center mb-2">Una solución</h5>
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            Las rectas se cruzan en <strong>un punto</strong>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
            Sistema compatible determinado
          </p>
        </div>

        {/* Caso 2: Sin solución */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <div className="text-center mb-3">
            <svg width="100" height="80" className="mx-auto bg-white dark:bg-gray-800 rounded">
              <line x1="10" y1="60" x2="90" y2="20" stroke="#3B82F6" strokeWidth="2" />
              <line x1="10" y1="70" x2="90" y2="30" stroke="#10B981" strokeWidth="2" />
            </svg>
          </div>
          <h5 className="font-bold text-red-800 dark:text-red-300 text-center mb-2">Sin solución</h5>
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            Las rectas son <strong>paralelas</strong>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
            Sistema incompatible
          </p>
        </div>

        {/* Caso 3: Infinitas soluciones */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
          <div className="text-center mb-3">
            <svg width="100" height="80" className="mx-auto bg-white dark:bg-gray-800 rounded">
              <line x1="10" y1="70" x2="90" y2="10" stroke="#8B5CF6" strokeWidth="4" />
            </svg>
          </div>
          <h5 className="font-bold text-amber-800 dark:text-amber-300 text-center mb-2">Infinitas soluciones</h5>
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            Las rectas son <strong>la misma</strong>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
            Sistema compatible indeterminado
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          <div>
            <h5 className="font-bold text-purple-800 dark:text-purple-300 mb-1">¿Cómo identificar el caso?</h5>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Si las rectas tienen <strong>diferente pendiente</strong>, se cruzan (una solución).<br />
              Si tienen <strong>igual pendiente</strong> pero diferente intercepto, son paralelas (sin solución).<br />
              Si son <strong>la misma recta</strong>, hay infinitas soluciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const TOPICS: TopicContent[] = [
  {
    id: 'graficar',
    name: 'Cómo Graficar',
    description: 'Aprende a convertir una ecuación en una recta en el plano.',
    content: <GraficarContent />,
  },
  {
    id: 'interseccion',
    name: 'Encontrar la Solución',
    description: 'El punto de intersección es la respuesta.',
    content: <InterseccionContent />,
  },
  {
    id: 'casos',
    name: 'Tipos de Sistemas',
    description: 'No siempre hay una solución única.',
    content: <CasosContent />,
  },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTopic, setActiveTopic] = useState<Topic>('graficar');

  const topic = TOPICS.find(t => t.id === activeTopic)!;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Método Gráfico
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resuelve sistemas de ecuaciones visualmente
        </p>
      </div>

      {/* Topic tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTopic(t.id)}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-sm transition-all',
              activeTopic === t.id
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            )}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Topic content */}
      <div className="animate-fadeIn space-y-6">
        {/* Description */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                {topic.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
            </div>
          </div>
        </div>

        {topic.content}
      </div>

      {/* Tips */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-amber-800 dark:text-amber-300 mb-1">Consejo</h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Usa los interceptos (donde la recta cruza los ejes) para graficar más fácilmente.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-red-800 dark:text-red-300 mb-1">Error común</h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Leer las coordenadas al revés: primero va x (horizontal), luego y (vertical).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue button */}
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
