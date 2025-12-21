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

  // Cone A: r=3, h=10 → V = (1/3) × 3.14 × 9 × 10 = 94.2 cm³
  // Cone B: r=4, h=6 → V = (1/3) × 3.14 × 16 × 6 = 100.48 cm³
  const correctAnswer = 1; // Cone B is larger

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Cono de Helado Perfecto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un problema del mundo real...
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Pedro trabaja en una <strong>heladeria</strong>.
              Un cliente le pregunta:
            </p>

            <div className="bg-teal-100 dark:bg-teal-900/40 rounded-lg p-4 border-2 border-teal-300 dark:border-teal-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-teal-700 dark:text-teal-300" />
              </div>
              <p className="text-teal-800 dark:text-teal-200 font-semibold text-lg">
                &ldquo;Quiero el cono que tenga MAS helado. ¿Cual deberia elegir?&rdquo;
              </p>
            </div>

            {/* Two cones visualization */}
            <div className="flex justify-center gap-8 py-4">
              {/* Cone A - tall and narrow */}
              <div className="text-center">
                <svg viewBox="0 0 100 160" className="w-24 h-40">
                  {/* Ice cream scoop */}
                  <circle cx="50" cy="25" r="22" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="42" cy="20" r="8" fill="#fde68a" opacity="0.5" />

                  {/* Cone */}
                  <polygon
                    points="28,35 72,35 50,145"
                    fill="#d4a574"
                    stroke="#92400e"
                    strokeWidth="2"
                  />
                  {/* Cone pattern */}
                  <line x1="35" y1="50" x2="50" y2="145" stroke="#92400e" strokeWidth="1" opacity="0.3" />
                  <line x1="65" y1="50" x2="50" y2="145" stroke="#92400e" strokeWidth="1" opacity="0.3" />
                  <line x1="50" y1="35" x2="50" y2="145" stroke="#92400e" strokeWidth="1" opacity="0.3" />

                  {/* Dimensions */}
                  <text x="50" y="155" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">
                    h = 10 cm
                  </text>
                </svg>
                <div className="mt-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg p-2">
                  <p className="font-bold text-blue-700 dark:text-blue-300">Cono A</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">r = 3 cm, h = 10 cm</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Alto y delgado</p>
                </div>
              </div>

              {/* Cone B - short and wide */}
              <div className="text-center">
                <svg viewBox="0 0 120 140" className="w-28 h-36">
                  {/* Ice cream scoop */}
                  <circle cx="60" cy="30" r="28" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="50" cy="22" r="10" fill="#fde68a" opacity="0.5" />

                  {/* Cone */}
                  <polygon
                    points="32,45 88,45 60,125"
                    fill="#d4a574"
                    stroke="#92400e"
                    strokeWidth="2"
                  />
                  {/* Cone pattern */}
                  <line x1="40" y1="55" x2="60" y2="125" stroke="#92400e" strokeWidth="1" opacity="0.3" />
                  <line x1="80" y1="55" x2="60" y2="125" stroke="#92400e" strokeWidth="1" opacity="0.3" />
                  <line x1="60" y1="45" x2="60" y2="125" stroke="#92400e" strokeWidth="1" opacity="0.3" />

                  {/* Dimensions */}
                  <text x="60" y="137" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">
                    h = 6 cm
                  </text>
                </svg>
                <div className="mt-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg p-2">
                  <p className="font-bold text-purple-700 dark:text-purple-300">Cono B</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">r = 4 cm, h = 6 cm</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Bajo y ancho</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400">
              El cliente piensa que el cono <strong>mas alto</strong> tiene mas helado...
              <br />
              <span className="text-teal-600 dark:text-teal-400 font-medium">¿Tiene razon?</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Vamos a comparar</span>
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
            El Cono de Helado Perfecto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cual cono tiene mas volumen?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Cono A:</strong> radio = 3 cm, altura = 10 cm (alto y delgado)
              </p>
              <p className="text-blue-800 dark:text-blue-200 mt-1">
                <strong>Cono B:</strong> radio = 4 cm, altura = 6 cm (bajo y ancho)
              </p>
            </div>
          </div>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: 'Cono A (el alto) tiene mas volumen', value: 0 },
            { label: 'Cono B (el ancho) tiene mas volumen', value: 1 },
            { label: 'Los dos tienen el mismo volumen', value: 2 },
            { label: 'No se puede saber sin una formula', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingCalculation}
              className={cn(
                'p-4 rounded-xl font-medium transition-all border-2 text-left',
                selectedAnswer === option.value
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
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
          El Cono de Helado Perfecto
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
            <h3
              className={cn(
                'font-bold text-lg mb-1',
                isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {isCorrect ? '¡Correcto!' : '¡Sorpresa!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              El <strong>Cono B</strong> (el mas ancho) tiene mas helado.
            </p>
          </div>
        </div>
      </div>

      {/* Calculation breakdown */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Los calculos:
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">A</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">V = (1/3) × 3.14 × 3² × 10 = </span>
              <span className="font-bold text-blue-700 dark:text-blue-400">94.2 cm³</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-sm">B</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">V = (1/3) × 3.14 × 4² × 6 = </span>
              <span className="font-bold text-purple-700 dark:text-purple-400">100.5 cm³</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-5 border border-teal-200 dark:border-teal-700">
        <p className="text-teal-800 dark:text-teal-200 font-medium text-center">
          <strong>Descubrimiento:</strong> El <span className="text-red-600 dark:text-red-400">radio</span> afecta mas que la altura porque se eleva al <strong>cuadrado</strong> (r²).
        </p>
        <p className="text-teal-700 dark:text-teal-300 mt-3 text-center">
          Pero... ¿de donde viene esa formula? ¿Por que hay un <strong>1/3</strong>?
        </p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Descubrir el secreto</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
