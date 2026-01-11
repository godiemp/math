'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Hammer, Play, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

const OPTIONS = [
  { id: 'a', text: 'Medir con los dedos y marcar aproximadamente', isCorrect: false },
  { id: 'b', text: 'Doblar el tablón por la mitad', isCorrect: false },
  { id: 'c', text: 'Usar el compás para trazar arcos que se cruzan', isCorrect: true },
  { id: 'd', text: 'Dibujar líneas al azar hasta acertar', isCorrect: false },
];

const ANIMATION_STEPS = [
  'Tenemos el segmento AB (el tablón)',
  'Colocamos el compás en A y trazamos un arco',
  'Sin cambiar la apertura, colocamos el compás en B',
  'Trazamos otro arco desde B',
  'Los arcos se cruzan en dos puntos',
  '¡Unimos los puntos y encontramos el centro!',
];

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (phase === 'reveal') {
      const timer = setTimeout(() => setPhase('result'), 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Auto-advance animation
  useEffect(() => {
    if (!isAnimating || phase !== 'result') return;
    if (animationStep >= 5) {
      setIsAnimating(false);
      return;
    }

    const timer = setTimeout(() => {
      setAnimationStep((s) => s + 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAnimating, animationStep, phase]);

  const handleOptionSelect = (optionId: string) => {
    if (phase !== 'question') return;
    setSelectedOption(optionId);
  };

  const handleVerify = () => {
    if (!selectedOption) return;
    const option = OPTIONS.find((o) => o.id === selectedOption);
    setIsCorrect(option?.isCorrect ?? false);
    setPhase('reveal');
  };

  const startAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(true);
  };

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-3">
          <Hammer className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <span className="text-amber-700 dark:text-amber-300 font-medium">El Maestro Carpintero</span>
        </div>
      </div>

      {/* Phase: Scenario */}
      {phase === 'scenario' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Don Roberto es un maestro carpintero que construye muebles de madera. Hoy necesita hacer un
            agujero <strong>exactamente en el centro</strong> de un tablón para montar una repisa.
          </p>

          <div className="flex justify-center my-4">
            {/* SVG: Wooden plank with compass */}
            <svg viewBox="0 0 300 120" className="w-full max-w-md">
              {/* Plank */}
              <rect x="20" y="40" width="260" height="40" rx="4" fill="#D2691E" stroke="#8B4513" strokeWidth="2" />
              {/* Wood grain lines */}
              <line x1="40" y1="50" x2="40" y2="70" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
              <line x1="80" y1="45" x2="80" y2="75" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
              <line x1="120" y1="48" x2="120" y2="72" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
              <line x1="160" y1="45" x2="160" y2="75" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
              <line x1="200" y1="50" x2="200" y2="70" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
              <line x1="240" y1="48" x2="240" y2="72" stroke="#8B4513" strokeWidth="1" opacity="0.5" />

              {/* Question mark at center */}
              <circle cx="150" cy="60" r="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
              <text x="150" y="65" textAnchor="middle" className="text-sm font-bold fill-amber-600">?</text>

              {/* Labels */}
              <text x="150" y="100" textAnchor="middle" className="text-xs fill-gray-500 dark:fill-gray-400">
                Centro exacto
              </text>

              {/* Dimension arrow */}
              <line x1="20" y1="20" x2="280" y2="20" stroke="#6B7280" strokeWidth="1" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-rev)" />
              <text x="150" y="15" textAnchor="middle" className="text-xs fill-gray-500">60 cm</text>
            </svg>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>El problema:</strong> Don Roberto solo tiene un <strong>compás</strong> y una{' '}
              <strong>regla sin marcas</strong>. No tiene cinta métrica ni calculadora.
            </p>
          </div>

          <button
            onClick={() => setPhase('question')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Explorar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Phase: Question */}
      {phase === 'question' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
          <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
            ¿Cómo puede Don Roberto encontrar el <strong>centro exacto</strong> del tablón usando solo
            compás y regla?
          </p>

          <div className="space-y-3">
            {OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={cn(
                  'w-full p-4 rounded-xl border-2 text-left transition-all',
                  selectedOption === option.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <span className="font-semibold text-blue-600 dark:text-blue-400 mr-2">{option.id.toUpperCase()}.</span>
                <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={!selectedOption}
            className={cn(
              'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg',
              selectedOption
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        </div>
      )}

      {/* Phase: Reveal */}
      {phase === 'reveal' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div
            className={cn(
              'text-center p-6 rounded-xl',
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
            )}
          >
            <p className={cn('text-2xl font-bold', isCorrect ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400')}>
              {isCorrect ? '¡Correcto!' : '¡Casi!'}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isCorrect
                ? 'El compás es la herramienta clave para encontrar el centro exacto.'
                : 'El compás permite hacer construcciones precisas sin necesidad de medir.'}
            </p>
          </div>
        </div>
      )}

      {/* Phase: Result */}
      {phase === 'result' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
              Don Roberto usa una técnica llamada <strong className="text-green-600 dark:text-green-400">mediatriz</strong>.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {ANIMATION_STEPS[animationStep]}
            </p>
          </div>

          {/* Animated compass construction */}
          <div className="flex justify-center">
            <svg viewBox="0 0 300 200" className="w-full max-w-md">
              {/* Background */}
              <rect width="300" height="200" fill="#f9fafb" className="dark:fill-gray-900" />

              {/* Plank */}
              <rect x="30" y="85" width="240" height="30" rx="3" fill="#D2691E" stroke="#8B4513" strokeWidth="2" />
              <line x1="60" y1="90" x2="60" y2="110" stroke="#8B4513" strokeWidth="1" opacity="0.4" />
              <line x1="100" y1="88" x2="100" y2="112" stroke="#8B4513" strokeWidth="1" opacity="0.4" />
              <line x1="140" y1="90" x2="140" y2="110" stroke="#8B4513" strokeWidth="1" opacity="0.4" />
              <line x1="180" y1="88" x2="180" y2="112" stroke="#8B4513" strokeWidth="1" opacity="0.4" />
              <line x1="220" y1="90" x2="220" y2="110" stroke="#8B4513" strokeWidth="1" opacity="0.4" />

              {/* Points A and B - A at x=50, B at x=250, both at y=100 */}
              {/* Distance = 200, radius = 130 for nice intersection */}
              {/* Intersection points: x=150, y = 100 ± sqrt(130² - 100²) = 100 ± 83 → y=17 and y=183 */}
              <circle cx="50" cy="100" r="5" fill="#EF4444" />
              <circle cx="250" cy="100" r="5" fill="#EF4444" />
              <text x="50" y="130" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">A</text>
              <text x="250" y="130" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">B</text>

              {/* Step 1-2: Arc from A (blue) - passes through P(150,17) and Q(150,183) */}
              {animationStep >= 1 && (
                <path
                  d="M 150 17 A 130 130 0 0 0 150 183"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  className="animate-fadeIn"
                />
              )}

              {/* Step 1-2: Compass at A */}
              {animationStep >= 1 && animationStep < 3 && (
                <g className="animate-fadeIn">
                  {/* Compass pivot at A */}
                  <circle cx="50" cy="100" r="4" fill="#3B82F6" stroke="white" strokeWidth="2" />
                  {/* Compass arm to P */}
                  <line x1="50" y1="100" x2="150" y2="17" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                  {/* Compass tip */}
                  <circle cx="150" cy="17" r="3" fill="#3B82F6" />
                </g>
              )}

              {/* Step 3-4: Arc from B (purple) - passes through P(150,17) and Q(150,183) */}
              {animationStep >= 3 && (
                <path
                  d="M 150 17 A 130 130 0 0 1 150 183"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  className="animate-fadeIn"
                />
              )}

              {/* Step 3-4: Compass at B */}
              {animationStep >= 2 && animationStep < 5 && (
                <g className="animate-fadeIn">
                  {/* Compass pivot at B */}
                  <circle cx="250" cy="100" r="4" fill="#8B5CF6" stroke="white" strokeWidth="2" />
                  {/* Compass arm to P */}
                  <line x1="250" y1="100" x2="150" y2="17" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
                  {/* Compass tip */}
                  <circle cx="150" cy="17" r="3" fill="#8B5CF6" />
                </g>
              )}

              {/* Step 5: Intersection points - highlighted */}
              {animationStep >= 4 && (
                <>
                  <circle cx="150" cy="17" r="8" fill="#F59E0B" stroke="white" strokeWidth="2" className="animate-fadeIn" />
                  <circle cx="150" cy="183" r="8" fill="#F59E0B" stroke="white" strokeWidth="2" className="animate-fadeIn" />
                  <text x="165" y="22" className="text-xs font-bold fill-amber-600">P</text>
                  <text x="165" y="188" className="text-xs font-bold fill-amber-600">Q</text>
                </>
              )}

              {/* Step 6: Mediatriz line */}
              {animationStep >= 5 && (
                <>
                  <line
                    x1="150"
                    y1="12"
                    x2="150"
                    y2="188"
                    stroke="#10B981"
                    strokeWidth="3"
                    className="animate-fadeIn"
                  />
                  {/* Center point */}
                  <circle cx="150" cy="100" r="8" fill="#10B981" stroke="white" strokeWidth="2" className="animate-fadeIn" />
                  <text x="165" y="105" className="text-sm font-bold fill-green-600">Centro</text>
                </>
              )}
            </svg>
          </div>

          {/* Animation controls */}
          <div className="flex justify-center gap-3">
            <button
              onClick={resetAnimation}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RotateCcw size={16} />
              <span>Reiniciar</span>
            </button>
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
                isAnimating
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              )}
            >
              <Play size={16} />
              <span>{animationStep >= 5 ? 'Ver de nuevo' : 'Ver animación'}</span>
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1">
            {ANIMATION_STEPS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  i === animationStep ? 'bg-blue-500 scale-125' : i < animationStep ? 'bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            ))}
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200">
              <strong>Las construcciones geométricas</strong> permiten crear figuras perfectas usando solo compás y regla.
              En esta lección aprenderás tres construcciones fundamentales.
            </p>
          </div>

          <button
            onClick={onComplete}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Descubrir las construcciones</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
