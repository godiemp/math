'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Droplets, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

const OPTIONS = [
  {
    id: 'A',
    text: 'Equidistante de las 3 esquinas',
    description: 'A igual distancia de los 3 vértices',
  },
  {
    id: 'B',
    text: 'Equidistante de los 3 lados',
    description: 'A igual distancia de cada borde',
  },
  {
    id: 'C',
    text: 'En el centro de equilibrio',
    description: 'Donde la plaza se equilibraría en un punto',
  },
  {
    id: 'D',
    text: 'Donde se cruzan las perpendiculares',
    description: 'Desde cada vértice al lado opuesto',
  },
];

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Auto-advance after reveal
  useEffect(() => {
    if (phase === 'reveal') {
      const timer = setTimeout(() => setPhase('result'), 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Plaza del Pueblo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'scenario' && 'Un desafío de diseño urbano'}
          {phase === 'question' && '¿Dónde colocarías la fuente?'}
          {phase === 'reveal' && '¡Veamos la respuesta!'}
          {phase === 'result' && 'La sorpresa matemática'}
        </p>
      </div>

      {/* Phase: Scenario */}
      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Plaza illustration */}
          <div className="bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-inner">
            <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto">
              <defs>
                {/* Grass pattern */}
                <pattern id="grass" patternUnits="userSpaceOnUse" width="10" height="10">
                  <rect width="10" height="10" fill="rgb(134, 239, 172)" className="dark:fill-emerald-700" />
                  <circle cx="2" cy="3" r="0.5" fill="rgb(74, 222, 128)" className="dark:fill-emerald-600" />
                  <circle cx="7" cy="7" r="0.5" fill="rgb(74, 222, 128)" className="dark:fill-emerald-600" />
                </pattern>
                {/* Stone path pattern */}
                <pattern id="stonePath" patternUnits="userSpaceOnUse" width="12" height="12">
                  <rect width="12" height="12" fill="rgb(214, 211, 209)" className="dark:fill-stone-600" />
                  <rect x="1" y="1" width="4" height="4" rx="0.5" fill="rgb(168, 162, 158)" className="dark:fill-stone-500" />
                  <rect x="7" y="1" width="4" height="4" rx="0.5" fill="rgb(168, 162, 158)" className="dark:fill-stone-500" />
                  <rect x="4" y="7" width="4" height="4" rx="0.5" fill="rgb(168, 162, 158)" className="dark:fill-stone-500" />
                </pattern>
                {/* Shadow gradient */}
                <linearGradient id="plazaShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.05)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
                </linearGradient>
              </defs>

              {/* Ground/context */}
              <rect x="0" y="0" width="400" height="320" fill="rgb(226, 232, 240)" className="dark:fill-slate-800" />

              {/* Plaza grass area with shadow */}
              <polygon
                points="200,50 50,270 350,270"
                fill="url(#plazaShadow)"
                transform="translate(3, 3)"
              />
              <polygon
                points="200,50 50,270 350,270"
                fill="url(#grass)"
                stroke="rgb(34, 197, 94)"
                strokeWidth="2"
                className="dark:stroke-emerald-500"
              />

              {/* Stone border */}
              <polygon
                points="200,50 50,270 350,270"
                fill="none"
                stroke="rgb(168, 162, 158)"
                strokeWidth="6"
                className="dark:stroke-stone-500"
              />

              {/* Paths - subtle stone walkways */}
              <line x1="200" y1="50" x2="200" y2="175" stroke="url(#stonePath)" strokeWidth="12" strokeLinecap="round" />
              <line x1="50" y1="270" x2="155" y2="175" stroke="url(#stonePath)" strokeWidth="12" strokeLinecap="round" />
              <line x1="350" y1="270" x2="245" y2="175" stroke="url(#stonePath)" strokeWidth="12" strokeLinecap="round" />

              {/* Path borders */}
              <line x1="200" y1="50" x2="200" y2="175" stroke="rgb(120, 113, 108)" strokeWidth="14" strokeLinecap="round" opacity="0.3" className="dark:stroke-stone-600" />
              <line x1="50" y1="270" x2="155" y2="175" stroke="rgb(120, 113, 108)" strokeWidth="14" strokeLinecap="round" opacity="0.3" className="dark:stroke-stone-600" />
              <line x1="350" y1="270" x2="245" y2="175" stroke="rgb(120, 113, 108)" strokeWidth="14" strokeLinecap="round" opacity="0.3" className="dark:stroke-stone-600" />

              {/* Decorative benches along edges */}
              <rect x="110" y="155" width="20" height="8" rx="2" fill="rgb(120, 53, 15)" className="dark:fill-amber-900" transform="rotate(-60, 120, 159)" />
              <rect x="270" y="155" width="20" height="8" rx="2" fill="rgb(120, 53, 15)" className="dark:fill-amber-900" transform="rotate(60, 280, 159)" />
              <rect x="190" y="245" width="20" height="8" rx="2" fill="rgb(120, 53, 15)" className="dark:fill-amber-900" />

              {/* Trees at corners with shadows */}
              <g transform="translate(200, 38)">
                <ellipse cx="3" cy="15" rx="12" ry="4" fill="rgba(0,0,0,0.2)" />
                <circle cx="0" cy="-5" r="18" fill="rgb(22, 163, 74)" className="dark:fill-green-600" />
                <circle cx="-8" cy="-2" r="12" fill="rgb(34, 197, 94)" className="dark:fill-green-500" />
                <circle cx="8" cy="-8" r="10" fill="rgb(74, 222, 128)" className="dark:fill-green-400" />
                <rect x="-2" y="5" width="4" height="10" fill="rgb(120, 53, 15)" className="dark:fill-amber-900" />
              </g>
              <g transform="translate(38, 280)">
                <ellipse cx="3" cy="5" rx="12" ry="4" fill="rgba(0,0,0,0.2)" />
                <circle cx="0" cy="-15" r="18" fill="rgb(22, 163, 74)" className="dark:fill-green-600" />
                <circle cx="-8" cy="-12" r="12" fill="rgb(34, 197, 94)" className="dark:fill-green-500" />
                <circle cx="8" cy="-18" r="10" fill="rgb(74, 222, 128)" className="dark:fill-green-400" />
                <rect x="-2" y="-5" width="4" height="10" fill="rgb(120, 53, 15)" className="dark:fill-amber-900" />
              </g>
              <g transform="translate(362, 280)">
                <ellipse cx="-3" cy="5" rx="12" ry="4" fill="rgba(0,0,0,0.2)" />
                <circle cx="0" cy="-15" r="18" fill="rgb(22, 163, 74)" className="dark:fill-green-600" />
                <circle cx="8" cy="-12" r="12" fill="rgb(34, 197, 94)" className="dark:fill-green-500" />
                <circle cx="-8" cy="-18" r="10" fill="rgb(74, 222, 128)" className="dark:fill-green-400" />
                <rect x="-2" y="-5" width="4" height="10" fill="rgb(120, 53, 15)" className="dark:fill-amber-900" />
              </g>

              {/* Central fountain area - question mark */}
              <circle cx="200" cy="175" r="28" fill="rgb(241, 245, 249)" stroke="rgb(148, 163, 184)" strokeWidth="3" className="dark:fill-slate-700 dark:stroke-slate-500" />
              <circle cx="200" cy="175" r="20" fill="white" stroke="rgb(59, 130, 246)" strokeWidth="2" strokeDasharray="4 2" className="dark:fill-slate-800 dark:stroke-blue-400" />
              <text x="200" y="182" textAnchor="middle" fontSize="24" fontWeight="bold" fill="rgb(59, 130, 246)" className="dark:fill-blue-400">?</text>

              {/* Small decorative elements */}
              <circle cx="130" cy="200" r="3" fill="rgb(251, 191, 36)" className="dark:fill-amber-500" />
              <circle cx="270" cy="200" r="3" fill="rgb(251, 191, 36)" className="dark:fill-amber-500" />
              <circle cx="200" cy="230" r="3" fill="rgb(251, 191, 36)" className="dark:fill-amber-500" />
            </svg>
          </div>

          {/* Story text */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  El alcalde de un pequeño pueblo quiere construir una <strong>fuente</strong> en el centro
                  de su plaza triangular. Pero... <em>¿dónde exactamente debería ir?</em>
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Los vecinos tienen diferentes opiniones sobre cuál es el &quot;verdadero centro&quot;...
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Ver las opciones</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Phase: Question */}
      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Plaza with fountain icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Droplets className="w-16 h-16 text-blue-500 dark:text-blue-400" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold">?</div>
            </div>
          </div>

          <p className="text-center text-gray-700 dark:text-gray-200 font-medium">
            ¿Cuál de estos criterios usarías para ubicar la fuente?
          </p>

          {/* Options */}
          <div className="grid gap-3">
            {OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all',
                  selectedOption === option.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/40 dark:border-blue-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800'
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0',
                      selectedOption === option.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    )}
                  >
                    {option.id}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {option.text}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('reveal')}
              disabled={!selectedOption}
              className={cn(
                'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
                selectedOption
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              <span>Verificar</span>
            </button>
          </div>
        </div>
      )}

      {/* Phase: Reveal */}
      {phase === 'reveal' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-8 border-2 border-green-400 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
              ¡Todas son correctas!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cada opción define un punto &quot;central&quot; diferente del triángulo...
            </p>
          </div>
        </div>
      )}

      {/* Phase: Result */}
      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4 text-center">
              Los 4 Puntos Notables del Triángulo
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold mb-2">A</div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">Circuncentro</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Equidistante de los vértices</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold mb-2">B</div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">Incentro</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Equidistante de los lados</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-emerald-200 dark:border-emerald-700">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-2">C</div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">Baricentro</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Centro de gravedad</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-red-200 dark:border-red-700">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold mb-2">D</div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">Ortocentro</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Cruce de alturas</p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-300">
            Cada punto se construye de forma diferente. ¡Vamos a descubrirlos!
          </p>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Descubrir los puntos</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
