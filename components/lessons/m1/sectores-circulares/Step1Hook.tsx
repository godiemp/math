'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

// Helper function to create sector path
function sectorPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingCalculation, setShowingCalculation] = useState(false);

  // Pizza: radius = 20cm, slice angle = 45° (1/8 of pizza)
  // Correct area = (45/360) × π × 20² = (1/8) × π × 400 = 50π ≈ 157.08 cm²
  const correctAnswer = 1; // Index for "157 cm²"

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Porcion de Pizza
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un problema delicioso...
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Una pizzeria vende porciones individuales de pizza.
              Cada porcion es un <strong>sector</strong> de la pizza completa.
            </p>

            {/* Pizza visualization */}
            <div className="flex justify-center py-4">
              <svg viewBox="0 0 220 220" className="w-64 h-64">
                {/* Pizza crust (outer circle) */}
                <circle
                  cx="110"
                  cy="110"
                  r="90"
                  fill="#f59e0b"
                  stroke="#92400e"
                  strokeWidth="4"
                />

                {/* Pizza sauce/cheese (inner circle) */}
                <circle
                  cx="110"
                  cy="110"
                  r="82"
                  fill="#fbbf24"
                />

                {/* Slice lines (8 slices) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x2 = 110 + 82 * Math.cos(rad);
                  const y2 = 110 + 82 * Math.sin(rad);
                  return (
                    <line
                      key={angle}
                      x1="110"
                      y1="110"
                      x2={x2}
                      y2={y2}
                      stroke="#92400e"
                      strokeWidth="2"
                    />
                  );
                })}

                {/* Highlighted slice (first 45°) */}
                <path
                  d={sectorPath(110, 110, 82, 0, 45)}
                  fill="#ef4444"
                  fillOpacity="0.6"
                  stroke="#dc2626"
                  strokeWidth="3"
                />

                {/* Pepperoni dots */}
                {[
                  { cx: 80, cy: 70 },
                  { cx: 130, cy: 65 },
                  { cx: 150, cy: 100 },
                  { cx: 140, cy: 140 },
                  { cx: 100, cy: 150 },
                  { cx: 70, cy: 130 },
                  { cx: 90, cy: 100 },
                  { cx: 120, cy: 110 },
                ].map((pos, i) => (
                  <circle
                    key={i}
                    cx={pos.cx}
                    cy={pos.cy}
                    r="8"
                    fill="#b91c1c"
                    stroke="#7f1d1d"
                    strokeWidth="1"
                  />
                ))}

                {/* Center point */}
                <circle cx="110" cy="110" r="4" fill="#92400e" />

                {/* Radius lines - bounding the sector */}
                {/* First radius: from center to top (0° = 12 o'clock) */}
                <line
                  x1="110"
                  y1="110"
                  x2="110"
                  y2="28"
                  stroke="#7c3aed"
                  strokeWidth="3"
                  strokeDasharray="6,3"
                />
                {/* Second radius: from center to 45° position */}
                <line
                  x1="110"
                  y1="110"
                  x2={110 + 82 * Math.cos((-45) * Math.PI / 180)}
                  y2={110 + 82 * Math.sin((-45) * Math.PI / 180)}
                  stroke="#7c3aed"
                  strokeWidth="3"
                  strokeDasharray="6,3"
                />

                {/* Radius label - along the second radius */}
                <rect x="140" y="55" width="70" height="22" fill="white" stroke="#7c3aed" strokeWidth="1" rx="4" />
                <text x="175" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">
                  r = 20 cm
                </text>

                {/* Angle arc - from 12 o'clock to 45° position */}
                <path
                  d={`M 110 85 A 25 25 0 0 1 ${110 + 25 * Math.cos((-45) * Math.PI / 180)} ${110 + 25 * Math.sin((-45) * Math.PI / 180)}`}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                />

                {/* Angle label - positioned at ~22.5° (middle of the arc) */}
                <text x={110 + 38 * Math.cos((-22.5) * Math.PI / 180)} y={110 + 38 * Math.sin((-22.5) * Math.PI / 180)} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
                  45°
                </text>
              </svg>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              La pizza tiene <span className="text-purple-600 font-semibold">radio 20 cm</span>.
              Una porcion ocupa un angulo de <span className="text-red-600 font-semibold">45°</span>.
            </p>

            <div className="bg-orange-100 dark:bg-orange-900/40 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-orange-700 dark:text-orange-300" />
              </div>
              <p className="text-orange-800 dark:text-orange-200 font-semibold text-lg">
                &ldquo;¿Cuantos cm² de pizza tiene una porcion?&rdquo;
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Necesitas calcular el <strong>area del sector circular</strong>.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
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
            La Porcion de Pizza
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuantos cm² tiene la porcion?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-blue-800 dark:text-blue-200">
                La pizza tiene <strong>radio r = 20 cm</strong>.
              </p>
              <p className="text-blue-800 dark:text-blue-200 mt-1">
                La porcion tiene un angulo de <strong>θ = 45°</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Visual with highlighted sector */}
        <div className="flex justify-center py-2">
          <svg viewBox="0 0 180 180" className="w-48 h-48">
            {/* Pizza base */}
            <circle
              cx="90"
              cy="90"
              r="75"
              fill={showingCalculation ? '#fef3c7' : '#fbbf24'}
              stroke="#92400e"
              strokeWidth="3"
              className="transition-all duration-500"
            />

            {/* Highlighted sector */}
            <path
              d={sectorPath(90, 90, 75, 0, 45)}
              fill={showingCalculation ? '#fca5a5' : '#ef4444'}
              fillOpacity="0.7"
              stroke="#dc2626"
              strokeWidth={showingCalculation ? '4' : '2'}
              className="transition-all duration-500"
            />

            {/* Center point */}
            <circle cx="90" cy="90" r="4" fill="#92400e" />

            {/* Radius lines - bounding the sector */}
            <line x1="90" y1="90" x2="90" y2="15" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4,2" />
            <line
              x1="90"
              y1="90"
              x2={90 + 75 * Math.cos((-45) * Math.PI / 180)}
              y2={90 + 75 * Math.sin((-45) * Math.PI / 180)}
              stroke="#7c3aed"
              strokeWidth="2"
              strokeDasharray="4,2"
            />

            {/* Angle arc indicator */}
            <path
              d={`M 90 70 A 20 20 0 0 1 ${90 + 20 * Math.cos((-45) * Math.PI / 180)} ${90 + 20 * Math.sin((-45) * Math.PI / 180)}`}
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
            />

            {/* Radius label */}
            <text x={90 + 45 * Math.cos((-22.5) * Math.PI / 180) + 20} y={90 + 45 * Math.sin((-22.5) * Math.PI / 180)} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">
              r=20
            </text>

            {/* Angle label - positioned at middle of angle arc */}
            <text x={90 + 32 * Math.cos((-22.5) * Math.PI / 180)} y={90 + 32 * Math.sin((-22.5) * Math.PI / 180)} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">
              45°
            </text>

            {showingCalculation && (
              <text x="90" y="40" textAnchor="middle" fontSize="14" fill="#dc2626" fontWeight="bold">
                Area del Sector
              </text>
            )}
          </svg>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '70 cm²', value: 0 },
            { label: '157 cm²', value: 1 },
            { label: '314 cm²', value: 2 },
            { label: '628 cm²', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingCalculation}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2',
                selectedAnswer === option.value
                  ? 'bg-orange-100 dark:bg-orange-900/50 border-orange-500 text-orange-800 dark:text-orange-200'
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
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg'
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
          La Porcion de Pizza
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
              Una porcion tiene aproximadamente <strong>157 cm²</strong> de pizza.
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
          <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">1</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">La porcion es una fraccion del circulo: </span>
              <span className="font-bold text-purple-700 dark:text-purple-400">45° / 360° = 1/8</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">2</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">El area del circulo completo: </span>
              <span className="font-bold text-blue-700 dark:text-blue-400">π × 20² = 400π ≈ 1257 cm²</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg p-3">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold">3</div>
            <div className="flex-1">
              <span className="text-gray-700 dark:text-gray-300">Area del sector: </span>
              <span className="font-bold text-orange-700 dark:text-orange-400">(1/8) × 1257 ≈ 157 cm²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-5 border border-teal-200 dark:border-teal-700">
        <p className="text-teal-800 dark:text-teal-200 font-medium text-center">
          El <strong>sector circular</strong> es una fraccion del circulo:
        </p>
        <div className="mt-3 text-center">
          <span className="text-2xl font-bold text-teal-900 dark:text-teal-100">
            Area = (θ / 360°) × πr²
          </span>
        </div>
        <p className="text-teal-700 dark:text-teal-300 mt-3 text-sm text-center">
          En esta leccion aprenderas esta formula y tambien como calcular la longitud del arco.
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
