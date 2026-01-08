'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Mountain, Ruler } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { TriangleFigure } from '@/components/figures/TriangleFigure';

type Phase = 'intro' | 'question' | 'reveal' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Tower height problem: shadow = 30m, angle = 60°
  // tan(60°) ≈ 1.73, so height ≈ 30 × 1.73 ≈ 52m
  // Options: A) 17m, B) 30m, C) 52m (correct), D) 90m
  const correctAnswer = 2;

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
            La Torre Misteriosa
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un desafío de medición imposible...
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center">
                <Ruler className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              <strong>Carmen</strong> es ingeniera y necesita conocer la altura
              exacta de una <strong>antena de telefonía</strong> para un proyecto.
            </p>

            {/* Tower visualization */}
            <div className="flex justify-center py-4">
              <svg viewBox="0 0 360 200" className="w-full max-w-md">
                {/* Sky gradient background */}
                <defs>
                  <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#bfdbfe" />
                    <stop offset="100%" stopColor="#e0f2fe" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="360" height="200" fill="url(#skyGradient)" className="dark:opacity-30" />

                {/* Ground */}
                <rect x="0" y="160" width="360" height="40" fill="#86efac" className="dark:fill-green-800" />

                {/* Implicit triangle using TriangleFigure as group */}
                <TriangleFigure
                  asSvgGroup
                  vertices={[
                    { x: 60, y: 160 },
                    { x: 290, y: 160 },
                    { x: 290, y: 40 },
                  ]}
                  fill="transparent"
                  stroke="transparent"
                  showRightAngleMarker
                  rightAngleVertex={1}
                  rightAngleSize={10}
                  angles={[
                    { showArc: true, label: '60°', color: '#dc2626', arcRadius: 20 },
                    {},
                    {},
                  ]}
                  showVertices={false}
                />

                {/* Tower */}
                <rect x="280" y="40" width="20" height="120" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                <polygon points="290,40 275,55 305,55" fill="#dc2626" />
                <rect x="270" y="60" width="40" height="4" fill="#64748b" />
                <rect x="270" y="80" width="40" height="4" fill="#64748b" />
                <rect x="270" y="100" width="40" height="4" fill="#64748b" />
                <rect x="270" y="120" width="40" height="4" fill="#64748b" />

                {/* Person (Carmen) */}
                <circle cx="60" cy="145" r="8" fill="#fcd34d" stroke="#92400e" strokeWidth="1" />
                <rect x="55" y="152" width="10" height="8" fill="#3b82f6" />

                {/* Sun rays (angle indicator) - the hypotenuse */}
                <line x1="60" y1="160" x2="290" y2="40" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />

                {/* Shadow on ground */}
                <line x1="290" y1="160" x2="60" y2="160" stroke="#1f2937" strokeWidth="3" />
                <text x="175" y="178" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937" className="dark:fill-gray-300">
                  Sombra: 30 m
                </text>

                {/* Height question mark */}
                <text x="320" y="100" fontSize="24" fontWeight="bold" fill="#6366f1">?</text>
                <line x1="310" y1="50" x2="310" y2="155" stroke="#6366f1" strokeWidth="2" strokeDasharray="6,3" />
              </svg>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              El problema es que <strong>no puede subir</strong> a la antena para medirla directamente.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Solo puede medir la <strong>sombra</strong> (30 metros) y el <strong>ángulo del sol</strong> (60°).
            </p>
          </div>

          <button
            onClick={() => setPhase('question')}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>¿Cuánto mide la torre?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    const options = ['17 m', '30 m', '52 m', '90 m'];

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cuál es la altura de la antena?
          </h2>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <p className="text-center text-lg text-gray-800 dark:text-gray-200 mb-6">
            Con una <strong>sombra de 30 m</strong> y un <strong>ángulo de 60°</strong>,<br />
            ¿cuánto mide la altura de la antena?
          </p>

          {/* Visual reminder */}
          <div className="flex justify-center mb-6">
            <TriangleFigure
              fromAngles={{ angles: [60, 30, 90], size: 160 }}
              showRightAngleMarker
              fill="rgba(224, 231, 255, 0.3)"
              stroke="#475569"
              angles={[
                { showArc: true, label: '60°', color: '#dc2626', arcRadius: 30 },
                {},
                {},
              ]}
              sides={[
                { label: '?', labelColor: '#6366f1' },
                {},
                { label: '30 m', labelColor: '#1f2937' },
              ]}
              showVertices={false}
              className="w-72"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all font-medium text-lg',
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
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
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
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
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              La respuesta es: 52 m (aprox.)
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Usando la relación entre el ángulo y los lados del triángulo.
            </p>
            <p className="text-lg font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              altura ÷ sombra = tan(60°) ≈ <strong>1,73</strong>
            </p>
            <p className="text-lg font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              altura = 30 × 1,73 ≈ <strong>52 m</strong>
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
          ¡Esto es Trigonometría!
        </h2>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <TriangleFigure
              vertices={[
                { x: 40, y: 150, label: 'A' },
                { x: 260, y: 150, label: 'B' },
                { x: 260, y: 30, label: 'C' },
              ]}
              showRightAngleMarker
              rightAngleVertex={1}
              fill="rgba(191, 219, 254, 0.5)"
              stroke="#1d4ed8"
              strokeWidth={3}
              angles={[
                { showArc: true, label: 'θ', color: '#dc2626' },
                {},
                {},
              ]}
              sides={[
                { label: 'Adyacente (junto a θ)', labelColor: '#059669' },
                { label: 'Opuesto', labelColor: '#dc2626' },
                { label: 'Hipotenusa', labelColor: '#7c3aed' },
              ]}
              className="w-full max-w-sm"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-3">
            <p className="text-gray-800 dark:text-gray-200">
              Las <strong className="text-blue-600 dark:text-blue-400">razones trigonométricas</strong> relacionan
              los ángulos con los lados de un triángulo rectángulo.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <strong>Opuesto:</strong> El lado frente al ángulo
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <strong>Adyacente:</strong> El lado junto al ángulo (no la hipotenusa)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <strong>Hipotenusa:</strong> El lado más largo (frente al ángulo recto)
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mt-4">
              <p className="text-center text-lg font-medium text-gray-800 dark:text-gray-200">
                Carmen usó: <span className="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">tan(θ) = opuesto ÷ adyacente</span>
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Descubrir las tres razones</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
