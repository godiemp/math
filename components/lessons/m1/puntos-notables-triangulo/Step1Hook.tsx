'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Droplets, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

const PLAZA_IMAGE_URL = 'https://math-chile.s3.us-east-1.amazonaws.com/plaza-triangular.png';

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
  const [imageLoaded, setImageLoaded] = useState(false);

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
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3]">
              {/* Skeleton placeholder while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-xl animate-pulse flex items-center justify-center">
                  <div className="text-emerald-400 dark:text-emerald-600">
                    <svg className="w-16 h-16 animate-spin-slow" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                </div>
              )}
              <Image
                src={PLAZA_IMAGE_URL}
                alt="Plaza triangular con caminos y fuente central"
                fill
                className={cn(
                  "object-contain rounded-xl shadow-lg transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
                priority
              />
            </div>
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
