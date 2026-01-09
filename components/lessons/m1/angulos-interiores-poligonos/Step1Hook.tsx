'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { PolygonFigure } from '@/components/figures/PolygonFigure';

type Phase = 'intro' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingCalculation, setShowingCalculation] = useState(false);

  // Correct answer: 120° (hexagon interior angle)
  const correctAnswer = 2;

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Kultrun del Artesano
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un desafío de ángulos y geometría...
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Un artesano mapuche está diseñando un <strong>kultrun</strong> tradicional
              con un patrón hexagonal en su superficie.
            </p>

            {/* Kultrun with hexagonal pattern */}
            <div className="flex justify-center py-4">
              <div className="relative">
                {/* Circle representing kultrun surface */}
                <svg viewBox="0 0 200 200" className="w-48 h-48">
                  {/* Kultrun circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="#fef3c7"
                    stroke="#92400e"
                    strokeWidth="4"
                  />
                  {/* Decorative ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r="75"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeDasharray="8,4"
                  />
                </svg>
                {/* Hexagon overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <PolygonFigure
                    fromRegular={{ sides: 6, radius: 50, centerX: 75, centerY: 75 }}
                    fill="rgba(217, 119, 6, 0.3)"
                    stroke="rgb(146, 64, 14)"
                    strokeWidth={2}
                    showVertices={false}
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Para que el diseño quede perfecto, necesita saber:
            </p>

            <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Palette className="w-6 h-6 text-amber-700 dark:text-amber-300" />
              </div>
              <p className="text-amber-800 dark:text-amber-200 font-semibold text-lg">
                &ldquo;¿Cuánto mide cada ángulo interior del hexágono?&rdquo;
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Para responder, necesitas entender cómo se relacionan los <strong>lados</strong> de un polígono con sus <strong>ángulos interiores</strong>.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Intentar responder</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    const handleSubmit = () => {
      if (selectedAnswer === null) return;
      setShowingCalculation(true);
      setTimeout(() => {
        setPhase('result');
      }, 1500);
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Kultrun del Artesano
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuánto mide cada ángulo interior?
          </p>
        </div>

        {/* Hexagon with one angle highlighted */}
        <div className="flex justify-center py-2">
          <PolygonFigure
            fromRegular={{ sides: 6, radius: 70, centerX: 100, centerY: 90 }}
            fill={showingCalculation ? 'rgba(34, 197, 94, 0.2)' : 'rgba(217, 119, 6, 0.2)'}
            stroke={showingCalculation ? 'rgb(22, 163, 74)' : 'rgb(217, 119, 6)'}
            strokeWidth={3}
            angles={[
              { showArc: true, color: '#7c3aed', arcRadius: 20 },
              {},
              {},
              {},
              {},
              {},
            ]}
            width={200}
            height={180}
          />
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '90°', value: 0 },
            { label: '108°', value: 1 },
            { label: '120°', value: 2 },
            { label: '135°', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingCalculation}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2',
                selectedAnswer === option.value
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null || showingCalculation}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null && !showingCalculation
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {showingCalculation ? 'Calculando...' : 'Verificar'}
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: RESULT ============
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Kultrun del Artesano
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡Veamos la respuesta!
        </p>
      </div>

      {/* Answer feedback */}
      <div
        className={cn(
          'p-5 rounded-xl border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
        )}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
          ) : (
            <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h3 className={cn(
              'font-bold text-lg mb-1',
              isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {isCorrect ? '¡Correcto!' : '¡Casi!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Cada ángulo interior del hexágono regular mide <strong>120°</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Explanation with triangulation hint */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ¿Cómo se calcula?
        </h4>

        <div className="flex justify-center mb-4">
          <PolygonFigure
            fromRegular={{ sides: 6, radius: 60, centerX: 80, centerY: 70 }}
            fill="rgba(147, 51, 234, 0.1)"
            stroke="rgb(147, 51, 234)"
            strokeWidth={2}
            diagonals={[
              { from: 0, to: 2, color: '#dc2626', strokeStyle: 'dashed' },
              { from: 0, to: 3, color: '#dc2626', strokeStyle: 'dashed' },
              { from: 0, to: 4, color: '#dc2626', strokeStyle: 'dashed' },
            ]}
            showCenter
            width={160}
            height={140}
          />
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>El secreto:</strong> Desde un vértice, podemos dividir el hexágono en <span className="text-red-600 font-bold">4 triángulos</span>.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Cada triángulo tiene <strong>180°</strong>, así que:
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-bold text-center text-base">
            4 × 180° = 720° (suma total)
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-bold text-center text-base">
            720° ÷ 6 lados = <span className="text-green-600">120° cada ángulo</span>
          </p>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
          <strong>Ángulos interiores:</strong> Existe una fórmula para cualquier polígono
        </p>
        <p className="text-purple-700 dark:text-purple-300 mt-2 text-sm text-center">
          En esta lección descubrirás el patrón que relaciona el número de lados con la suma de ángulos.
        </p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg"
        >
          <span>Descubrir el patrón</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
