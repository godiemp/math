'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingCalculation, setShowingCalculation] = useState(false);

  // Ferris wheel diameter = 10m, so circumference = pi * 10 ≈ 31.4m
  const correctAnswer = 1; // Index for "31.4 m" option

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Rueda de la Fortuna
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un problema del mundo real...
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              La feria del pueblo instalara una <strong>rueda de la fortuna</strong>.
              Quieren decorarla con luces LED alrededor del borde.
            </p>

            {/* Ferris wheel visualization */}
            <div className="flex justify-center py-4">
              <svg viewBox="0 0 200 220" className="w-64 h-72">
                {/* Support structure */}
                <line x1="100" y1="180" x2="60" y2="220" stroke="#6b7280" strokeWidth="4" />
                <line x1="100" y1="180" x2="140" y2="220" stroke="#6b7280" strokeWidth="4" />

                {/* Main wheel circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="75"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="4"
                />

                {/* Inner decorative circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="65"
                  fill="none"
                  stroke="#5eead4"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                />

                {/* Center hub */}
                <circle cx="100" cy="100" r="8" fill="#0d9488" />

                {/* Spokes */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x2 = 100 + 65 * Math.cos(rad);
                  const y2 = 100 + 65 * Math.sin(rad);
                  return (
                    <line
                      key={angle}
                      x1="100"
                      y1="100"
                      x2={x2}
                      y2={y2}
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                  );
                })}

                {/* Cabins (small circles at spoke ends) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 100 + 75 * Math.cos(rad);
                  const cy = 100 + 75 * Math.sin(rad);
                  return (
                    <circle
                      key={`cabin-${angle}`}
                      cx={cx}
                      cy={cy}
                      r="8"
                      fill="#fbbf24"
                      stroke="#92400e"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Diameter line with arrows */}
                <line x1="25" y1="100" x2="175" y2="100" stroke="#dc2626" strokeWidth="2" strokeDasharray="6,3" />
                <polygon points="25,100 32,96 32,104" fill="#dc2626" />
                <polygon points="175,100 168,96 168,104" fill="#dc2626" />

                {/* Diameter label */}
                <rect x="70" y="105" width="60" height="20" fill="white" rx="3" />
                <text x="100" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">
                  10 metros
                </text>
              </svg>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              El <span className="text-red-600 font-semibold">diametro</span> de la rueda es de <strong>10 metros</strong>.
            </p>

            <div className="bg-teal-100 dark:bg-teal-900/40 rounded-lg p-4 border-2 border-teal-300 dark:border-teal-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-teal-700 dark:text-teal-300" />
              </div>
              <p className="text-teal-800 dark:text-teal-200 font-semibold text-lg">
                &ldquo;¿Cuantos metros de luces LED necesitamos para rodear toda la rueda?&rdquo;
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Necesitas calcular la <strong>circunferencia</strong> (perimetro del circulo).
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Vamos a calcularlo</span>
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
            La Rueda de la Fortuna
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuantos metros de luces se necesitan?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-blue-800 dark:text-blue-200">
                La rueda tiene un <strong>diametro de 10 metros</strong>.
              </p>
              <p className="text-blue-800 dark:text-blue-200 mt-1">
                Las luces van alrededor de todo el borde exterior.
              </p>
            </div>
          </div>
        </div>

        {/* Visual with highlighted circumference */}
        <div className="flex justify-center py-2">
          <svg viewBox="0 0 180 180" className="w-48 h-48">
            {/* Main wheel circle - highlighted */}
            <circle
              cx="90"
              cy="90"
              r="70"
              fill={showingCalculation ? '#ccfbf1' : 'none'}
              stroke={showingCalculation ? '#14b8a6' : '#0d9488'}
              strokeWidth={showingCalculation ? '8' : '4'}
              className="transition-all duration-500"
            />

            {/* Center hub */}
            <circle cx="90" cy="90" r="6" fill="#0d9488" />

            {/* Diameter line */}
            <line x1="20" y1="90" x2="160" y2="90" stroke="#dc2626" strokeWidth="2" strokeDasharray="6,3" />

            {/* Diameter label */}
            <text x="90" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
              d = 10 m
            </text>

            {showingCalculation && (
              <text x="90" y="40" textAnchor="middle" fontSize="14" fill="#0d9488" fontWeight="bold">
                Circunferencia
              </text>
            )}
          </svg>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '20 m', value: 0 },
            { label: '31.4 m', value: 1 },
            { label: '100 m', value: 2 },
            { label: '314 m', value: 3 },
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
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
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
          La Rueda de la Fortuna
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
              Se necesitan <strong>31.4 metros</strong> de luces LED.
            </p>
          </div>
        </div>
      </div>

      {/* Calculation breakdown */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Asi se calcula:
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center text-white font-bold">1</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">La circunferencia es: </span>
              <span className="font-bold text-teal-700 dark:text-teal-400">C = π × d</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">2</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">Sustituimos: </span>
              <span className="font-bold text-blue-700 dark:text-blue-400">C = 3.14 × 10</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">3</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">Resultado: </span>
              <span className="font-bold text-purple-700 dark:text-purple-400">C = 31.4 metros</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pi introduction */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
          Usamos un numero especial llamado <strong>π (pi)</strong>:
        </p>
        <div className="mt-3 text-center">
          <span className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            π ≈ 3.14159...
          </span>
        </div>
        <p className="text-purple-700 dark:text-purple-300 mt-3 text-sm text-center">
          En esta leccion aprenderas de donde viene π y como usarlo para calcular circunferencias y areas de circulos.
        </p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
