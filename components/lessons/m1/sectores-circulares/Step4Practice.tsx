'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

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

// Helper function to create arc path
function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
}

interface Scenario {
  id: string;
  title: string;
  context: string;
  question: string;
  visual: React.ReactNode;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const scenarios: Scenario[] = [
  {
    id: 'pizza',
    title: 'La Pizza Familiar',
    context: 'Una pizza familiar tiene radio de 15 cm. Cada porcion es un sector de 60°.',
    question: '¿Cual es el area de una porcion?',
    visual: (
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        <circle cx="60" cy="60" r="50" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />
        <path d={sectorPath(60, 60, 50, 0, 60)} fill="#ef4444" fillOpacity="0.6" stroke="#dc2626" strokeWidth="2" />
        {[60, 120, 180, 240, 300, 360].map((angle) => {
          const rad = (angle - 90) * (Math.PI / 180);
          return <line key={angle} x1="60" y1="60" x2={60 + 48 * Math.cos(rad)} y2={60 + 48 * Math.sin(rad)} stroke="#92400e" strokeWidth="1" />;
        })}
        <circle cx="60" cy="60" r="3" fill="#92400e" />
        {/* Angle label with background */}
        <rect x="68" y="42" width="24" height="14" fill="white" rx="2" />
        <text x="80" y="53" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">60°</text>
        {/* Radius label */}
        <rect x="72" y="58" width="38" height="14" fill="white" rx="2" />
        <text x="91" y="69" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7c3aed">r=15cm</text>
      </svg>
    ),
    options: ['37.5π cm² ≈ 118 cm²', '75π cm² ≈ 236 cm²', '225π cm² ≈ 707 cm²', '12.5π cm² ≈ 39 cm²'],
    correctIndex: 0,
    explanation: 'A = (60/360) × π × 15² = (1/6) × 225π = 37.5π ≈ 117.8 cm²',
    hint: 'Fraccion = 60/360 = 1/6. Area total = π × 15² = 225π',
  },
  {
    id: 'clock',
    title: 'El Minutero del Reloj',
    context: 'El minutero de un reloj mide 12 cm. En 5 minutos, el minutero recorre un arco.',
    question: '¿Cual es la longitud del arco que recorre en 5 minutos?',
    visual: (
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        <circle cx="60" cy="60" r="50" fill="#e5e7eb" stroke="#374151" strokeWidth="3" />
        {/* Hour markers */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
          const rad = (angle - 90) * (Math.PI / 180);
          return (
            <line
              key={angle}
              x1={60 + 40 * Math.cos(rad)}
              y1={60 + 40 * Math.sin(rad)}
              x2={60 + 47 * Math.cos(rad)}
              y2={60 + 47 * Math.sin(rad)}
              stroke="#374151"
              strokeWidth="2"
            />
          );
        })}
        {/* Arc swept by minute hand - on clock frame */}
        <path d={arcPath(60, 60, 50, 0, 30)} fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
        {/* Minute hand at 12 o'clock */}
        <line x1="60" y1="60" x2="60" y2="10" stroke="#1f2937" strokeWidth="2" />
        {/* Minute hand end position (5 min later = 30°) */}
        <line x1="60" y1="60" x2={60 + 50 * Math.cos((-60) * Math.PI / 180)} y2={60 + 50 * Math.sin((-60) * Math.PI / 180)} stroke="#7c3aed" strokeWidth="2" strokeDasharray="4,2" />
        <circle cx="60" cy="60" r="4" fill="#1f2937" />
        {/* Angle arc indicator near center - radius 22 for visibility */}
        <path d={arcPath(60, 60, 22, 0, 30)} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        {/* Angle label - amber color to match arc, positioned at middle of angle (15°) */}
        <text x={60 + 32 * Math.cos((-75) * Math.PI / 180)} y={60 + 32 * Math.sin((-75) * Math.PI / 180)} fontSize="9" fontWeight="bold" fill="#f59e0b">30°</text>
        {/* Radius label - moved left of minute hand */}
        <text x="50" y="35" fontSize="7" fill="#dc2626">12cm</text>
      </svg>
    ),
    options: ['π cm ≈ 3.14 cm', '2π cm ≈ 6.28 cm', '4π cm ≈ 12.57 cm', '6π cm ≈ 18.85 cm'],
    correctIndex: 1,
    explanation: '5 minutos = 30° (360°/60min × 5min). L = (30/360) × 2π × 12 = (1/12) × 24π = 2π ≈ 6.28 cm',
    hint: '5 minutos = 30° (cada minuto = 6°). Longitud = (30/360) × circunferencia',
  },
  {
    id: 'piechart',
    title: 'El Grafico Circular',
    context: 'Un grafico circular tiene radio 8 cm. Un sector representa el 25% del total.',
    question: '¿Cual es el area del sector?',
    visual: (
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        <circle cx="60" cy="60" r="50" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
        <path d={sectorPath(60, 60, 50, 0, 90)} fill="#3b82f6" fillOpacity="0.7" stroke="#1d4ed8" strokeWidth="2" />
        <path d={sectorPath(60, 60, 50, 90, 180)} fill="#a3a3a3" fillOpacity="0.5" stroke="#737373" strokeWidth="1" />
        <path d={sectorPath(60, 60, 50, 180, 270)} fill="#a3a3a3" fillOpacity="0.5" stroke="#737373" strokeWidth="1" />
        <path d={sectorPath(60, 60, 50, 270, 360)} fill="#a3a3a3" fillOpacity="0.5" stroke="#737373" strokeWidth="1" />
        <circle cx="60" cy="60" r="3" fill="#374151" />
        {/* Labels with backgrounds */}
        <rect x="38" y="33" width="28" height="14" fill="white" rx="2" />
        <text x="52" y="44" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">25%</text>
        <rect x="78" y="48" width="36" height="14" fill="white" rx="2" />
        <text x="96" y="59" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7c3aed">r=8cm</text>
        <rect x="63" y="68" width="22" height="14" fill="white" rx="2" />
        <text x="74" y="79" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f59e0b">90°</text>
      </svg>
    ),
    options: ['8π cm² ≈ 25 cm²', '16π cm² ≈ 50 cm²', '32π cm² ≈ 100 cm²', '64π cm² ≈ 201 cm²'],
    correctIndex: 1,
    explanation: '25% = 90°. A = (90/360) × π × 8² = (1/4) × 64π = 16π ≈ 50.3 cm²',
    hint: '25% del circulo = 90°. Area total = π × 8² = 64π',
  },
  {
    id: 'sprinkler',
    title: 'El Aspersor de Jardin',
    context: 'Un aspersor riega en un sector de 120° con alcance de 5 metros.',
    question: '¿Cual es el area del jardin que riega?',
    visual: (
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        <circle cx="60" cy="60" r="50" fill="#dcfce7" fillOpacity="0.3" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4,4" />
        <path d={sectorPath(60, 60, 50, -60, 60)} fill="#22c55e" fillOpacity="0.5" stroke="#15803d" strokeWidth="2" />
        {/* Water droplets */}
        {[0, 20, -20, 40, -40].map((angle, i) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const r = 30 + (i % 2) * 10;
          return (
            <circle
              key={i}
              cx={60 + r * Math.cos(rad)}
              cy={60 + r * Math.sin(rad)}
              r="3"
              fill="#3b82f6"
              fillOpacity="0.6"
            />
          );
        })}
        <circle cx="60" cy="60" r="5" fill="#374151" />
        {/* Labels with backgrounds */}
        <rect x="45" y="20" width="30" height="14" fill="white" rx="2" />
        <text x="60" y="31" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">120°</text>
        <rect x="78" y="43" width="24" height="14" fill="white" rx="2" />
        <text x="90" y="54" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">5m</text>
      </svg>
    ),
    options: ['25π/6 m² ≈ 13 m²', '25π/3 m² ≈ 26 m²', '25π m² ≈ 79 m²', '50π/3 m² ≈ 52 m²'],
    correctIndex: 1,
    explanation: 'A = (120/360) × π × 5² = (1/3) × 25π = 25π/3 ≈ 26.2 m²',
    hint: 'Fraccion = 120/360 = 1/3. Area total = π × 5² = 25π',
  },
];

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!isActive) return null;

  const currentScenario = scenarios[currentIndex];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === currentScenario.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      setCompleted(true);
    }
  };

  // ============ COMPLETED ============
  if (completed) {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Practica Completada!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Has terminado los 4 escenarios
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 text-center">
          <div className="text-5xl mb-4">
            {correctCount === 4 ? '🎉' : correctCount >= 3 ? '👏' : correctCount >= 2 ? '👍' : '💪'}
          </div>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
            {correctCount} de 4 correctas
          </p>
          <p className="text-green-700 dark:text-green-300">
            {correctCount === 4
              ? '¡Excelente! Dominas el calculo de sectores.'
              : correctCount >= 3
              ? '¡Muy bien! Solo un pequeño error.'
              : correctCount >= 2
              ? 'Buen trabajo. Practica un poco mas.'
              : 'Sigue practicando, lo lograras.'}
          </p>
        </div>

        {/* Summary of formulas */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
            Recuerda las formulas
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-teal-100 dark:bg-teal-900/40 rounded-lg p-3 text-center">
              <p className="text-teal-800 dark:text-teal-200 font-bold text-sm">Area Sector</p>
              <p className="text-teal-700 dark:text-teal-300 font-mono">
                (θ/360°) × πr²
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-3 text-center">
              <p className="text-purple-800 dark:text-purple-200 font-bold text-sm">Longitud Arco</p>
              <p className="text-purple-700 dark:text-purple-300 font-mono">
                (θ/360°) × 2πr
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ir al Checkpoint</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PRACTICE ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Escenario {currentIndex + 1} de {scenarios.length}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {scenarios.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              idx === currentIndex
                ? 'bg-teal-500 scale-125'
                : idx < currentIndex
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Scenario card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
          {currentScenario.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {currentScenario.context}
        </p>

        {/* Visual */}
        <div className="flex justify-center mb-4">
          {currentScenario.visual}
        </div>

        {/* Question */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-4">
          <p className="text-blue-800 dark:text-blue-200 font-semibold text-center">
            {currentScenario.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {currentScenario.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showFeedback && setSelectedAnswer(idx)}
              disabled={showFeedback}
              className={cn(
                'p-3 rounded-xl font-medium transition-all border-2 text-sm',
                selectedAnswer === idx
                  ? showFeedback
                    ? idx === currentScenario.correctIndex
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-teal-100 dark:bg-teal-900/50 border-teal-500 text-teal-800 dark:text-teal-200'
                  : showFeedback && idx === currentScenario.correctIndex
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Hint toggle */}
        {!showFeedback && (
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <HelpCircle size={16} />
              <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
            </button>
          </div>
        )}

        {/* Hint */}
        {showHint && !showFeedback && (
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 mb-4 border border-amber-200 dark:border-amber-700">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              💡 {currentScenario.hint}
            </p>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div
            className={cn(
              'p-4 rounded-xl border-2 mb-4',
              selectedAnswer === currentScenario.correctIndex
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
            )}
          >
            <div className="flex items-start gap-3">
              {selectedAnswer === currentScenario.correctIndex ? (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <p
                  className={cn(
                    'font-bold mb-1',
                    selectedAnswer === currentScenario.correctIndex
                      ? 'text-green-800 dark:text-green-300'
                      : 'text-amber-800 dark:text-amber-300'
                  )}
                >
                  {selectedAnswer === currentScenario.correctIndex ? '¡Correcto!' : '¡Casi!'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {currentScenario.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-3">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>{currentIndex < scenarios.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
