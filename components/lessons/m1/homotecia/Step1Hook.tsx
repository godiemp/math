'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Palette, Train } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'reveal' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Original sketch: 20cm × 15cm, Mural: 2m × 1.5m (ratio 10:1)
  // If width is multiplied by 10, height is also multiplied by 10
  // Answer: 1.5m (index 0)
  const correctAnswer = 0;

  // Auto-advance from reveal to result
  useEffect(() => {
    if (phase === 'reveal') {
      const timer = setTimeout(() => setPhase('result'), 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Mural del Metro
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un desafío de proporciones...
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-800/50 flex items-center justify-center">
                <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              <strong>Martina</strong> es artista y diseñó un boceto para una
              estación del <strong>Metro de Santiago</strong>.
            </p>

            {/* Sketch and Mural visualization */}
            <div className="flex justify-center py-4">
              <svg viewBox="0 0 360 180" className="w-full max-w-md">
                {/* Background */}
                <rect x="0" y="0" width="360" height="180" fill="none" />

                {/* Original sketch (small) */}
                <g>
                  <text x="60" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b7280" className="dark:fill-gray-400">
                    Boceto Original
                  </text>
                  {/* Paper background */}
                  <rect x="20" y="30" width="80" height="60" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="2" />
                  {/* Simple art sketch inside */}
                  <circle cx="50" cy="55" r="12" fill="#f472b6" opacity="0.7" />
                  <rect x="65" y="45" width="20" height="25" fill="#60a5fa" opacity="0.7" />
                  <polygon points="35,80 45,65 55,80" fill="#34d399" opacity="0.7" />
                  {/* Dimension labels */}
                  <text x="60" y="105" textAnchor="middle" fontSize="11" fill="#1f2937" className="dark:fill-gray-300">
                    20 cm × 15 cm
                  </text>
                </g>

                {/* Arrow */}
                <g>
                  <line x1="120" y1="60" x2="150" y2="60" stroke="#9ca3af" strokeWidth="2" />
                  <polygon points="155,60 148,55 148,65" fill="#9ca3af" />
                  <text x="137" y="80" textAnchor="middle" fontSize="10" fill="#9ca3af">
                    ×10
                  </text>
                </g>

                {/* Mural (large) - scaled representation */}
                <g>
                  <text x="250" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b7280" className="dark:fill-gray-400">
                    Mural Final
                  </text>
                  {/* Wall background */}
                  <rect x="160" y="30" width="180" height="135" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" rx="4" />
                  {/* Scaled art */}
                  <circle cx="210" cy="80" r="27" fill="#f472b6" opacity="0.7" />
                  <rect x="245" y="55" width="45" height="56" fill="#60a5fa" opacity="0.7" />
                  <polygon points="178,145 200,110 222,145" fill="#34d399" opacity="0.7" />
                  {/* Metro train icon */}
                  <g transform="translate(280, 120)">
                    <rect x="0" y="0" width="40" height="20" fill="#374151" rx="3" />
                    <rect x="5" y="3" width="10" height="8" fill="#93c5fd" rx="1" />
                    <rect x="18" y="3" width="10" height="8" fill="#93c5fd" rx="1" />
                    <circle cx="10" cy="22" r="4" fill="#1f2937" />
                    <circle cx="30" cy="22" r="4" fill="#1f2937" />
                  </g>
                  {/* Width label */}
                  <text x="250" y="178" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937" className="dark:fill-gray-300">
                    2 m de ancho
                  </text>
                </g>
              </svg>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Su boceto mide <strong>20 cm de ancho</strong> y <strong>15 cm de alto</strong>.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              El mural debe tener <strong>2 metros de ancho</strong>.
            </p>
          </div>

          <button
            onClick={() => setPhase('question')}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explorar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    const options = ['1,5 m', '15 m', '0,15 m', '10 m'];

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cuánto debe medir de alto?
          </h2>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <p className="text-center text-lg text-gray-800 dark:text-gray-200 mb-6">
            Si el boceto de <strong>20 cm</strong> se amplía a <strong>2 m</strong> (×10),<br />
            ¿cuánto debe medir el alto del mural?
          </p>

          {/* Visual reminder */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 200 100" className="w-48">
              <rect x="10" y="20" width="40" height="30" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="2" />
              <text x="30" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">20×15 cm</text>
              <line x1="60" y1="35" x2="80" y2="35" stroke="#9ca3af" strokeWidth="2" />
              <polygon points="85,35 78,30 78,40" fill="#9ca3af" />
              <rect x="90" y="10" width="100" height="75" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" rx="3" />
              <text x="140" y="95" textAnchor="middle" fontSize="10" fill="#1f2937">2 m × <tspan fontWeight="bold">?</tspan></text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all font-medium text-lg',
                  selectedAnswer === index
                    ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <span className="text-gray-400 dark:text-gray-500 mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <button
              onClick={() => setPhase('reveal')}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Verificar</span>
              <Check size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ PHASE 3: REVEAL ============
  if (phase === 'reveal') {
    const isCorrect = selectedAnswer === correctAnswer;

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <div
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3 rounded-full text-xl font-bold',
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                : 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200'
            )}
          >
            {isCorrect ? (
              <>
                <Check className="w-6 h-6" />
                <span>¡Correcto!</span>
              </>
            ) : (
              <>
                <X className="w-6 h-6" />
                <span>¡Casi!</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="text-center space-y-4">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              La respuesta es: 1,5 m
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Si el ancho se multiplica por 10, el alto también debe multiplicarse por 10.
            </p>
            <p className="text-lg font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              15 cm × 10 = 150 cm = <strong>1,5 m</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: RESULT ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Esto es una Homotecia!
        </h2>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg viewBox="0 0 300 160" className="w-full max-w-sm">
              {/* Center point O */}
              <circle cx="20" cy="80" r="6" fill="#dc2626" />
              <text x="10" y="100" fontSize="14" fontWeight="bold" fill="#dc2626">O</text>

              {/* Small shape (original) */}
              <polygon points="80,60 120,60 120,100 80,100" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
              <text x="100" y="120" textAnchor="middle" fontSize="10" fill="#1d4ed8">Original</text>

              {/* Large shape (image) */}
              <polygon points="140,30 260,30 260,130 140,130" fill="#bbf7d0" fillOpacity="0.7" stroke="#16a34a" strokeWidth="2" />
              <text x="200" y="150" textAnchor="middle" fontSize="10" fill="#16a34a">Imagen (k=3)</text>

              {/* Dashed rays from center */}
              <line x1="20" y1="80" x2="80" y2="60" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="20" y1="80" x2="260" y2="30" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="20" y1="80" x2="80" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="20" y1="80" x2="260" y2="130" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
            </svg>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-3">
            <p className="text-gray-800 dark:text-gray-200">
              Una <strong className="text-purple-600 dark:text-purple-400">homotecia</strong> es
              una transformación que <strong>agranda o reduce</strong> una figura
              manteniendo su forma.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <strong>Centro (O):</strong> El punto desde donde se miden las distancias
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <strong>Razón (k):</strong> El factor por el que se multiplican las distancias
              </li>
            </ul>
            <p className="text-center text-lg font-medium text-gray-800 dark:text-gray-200 pt-2">
              En el mural de Martina: <span className="font-mono bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded">k = 10</span>
            </p>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Descubrir el patrón</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
