'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Lightbulb, Sun, Play } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import {
  ScenarioCard,
  QuestionPrompt,
  OptionGrid,
  OptionButton,
  ActionButton,
  FeedbackPanel,
  InsightCard,
} from '@/components/lessons/primitives';
import MathDisplay from '@/components/math/MathDisplay';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';
type WhyPhase = 'triangles' | 'parallel' | 'angle-alpha' | 'angle-90' | 'angle-beta' | 'conclusion';

const WHY_PHASES: WhyPhase[] = ['triangles', 'parallel', 'angle-alpha', 'angle-90', 'angle-beta', 'conclusion'];
const WHY_PHASE_DURATIONS: Record<WhyPhase, number> = {
  'triangles': 1500,
  'parallel': 2000,
  'angle-alpha': 2500,
  'angle-90': 2000,
  'angle-beta': 2500,
  'conclusion': 0, // Manual advance
};

const OPTIONS = ['10 metros', '12 metros', '15 metros', '18.75 metros'];
const CORRECT_ANSWER = 1; // 12 metros (1.6/2 = x/15, x = 12)

function ShadowScene({ showSolution = false }: { showSolution?: boolean }) {
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-lg mx-auto">
      {/* Sky gradient background */}
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="100%" stopColor="#E0F4FF" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="180" fill="url(#sky)" />

      {/* Ground */}
      <rect x="0" y="180" width="400" height="40" className="fill-amber-100 dark:fill-amber-900/50" />
      <line x1="0" y1="180" x2="400" y2="180" className="stroke-amber-300 dark:stroke-amber-700" strokeWidth="2" />

      {/* Sun - positioned on upper LEFT so shadows extend to the right */}
      <circle cx="50" cy="40" r="25" className="fill-yellow-400" />

      {/* Sun rays (parallel lines going from upper-left to lower-right) */}
      <g className="stroke-yellow-500/60" strokeWidth="1" strokeDasharray="4,4">
        <line x1="50" y1="40" x2="100" y2="180" />
        <line x1="50" y1="40" x2="210" y2="180" />
        <line x1="50" y1="40" x2="330" y2="180" />
      </g>

      {/* Person (Sofia) */}
      <g transform="translate(60, 140)">
        {/* Body */}
        <circle cx="0" cy="0" r="8" className="fill-pink-400" /> {/* Head */}
        <line x1="0" y1="8" x2="0" y2="28" className="stroke-pink-500" strokeWidth="3" /> {/* Body */}
        <line x1="0" y1="15" x2="-8" y2="22" className="stroke-pink-500" strokeWidth="2" /> {/* Left arm */}
        <line x1="0" y1="15" x2="8" y2="22" className="stroke-pink-500" strokeWidth="2" /> {/* Right arm */}
        <line x1="0" y1="28" x2="-6" y2="40" className="stroke-pink-500" strokeWidth="2" /> {/* Left leg */}
        <line x1="0" y1="28" x2="6" y2="40" className="stroke-pink-500" strokeWidth="2" /> {/* Right leg */}
      </g>

      {/* Person height label */}
      <g>
        <line x1="40" y1="140" x2="40" y2="180" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="1" />
        <line x1="35" y1="140" x2="45" y2="140" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="1" />
        <line x1="35" y1="180" x2="45" y2="180" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="1" />
        <text x="25" y="165" className="fill-blue-600 dark:fill-blue-400 text-xs font-bold">1.6m</text>
      </g>

      {/* Person shadow */}
      <line x1="60" y1="180" x2="100" y2="180" className="stroke-gray-500" strokeWidth="4" strokeLinecap="round" />
      <text x="80" y="195" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-bold">2m</text>

      {/* Building */}
      <rect x="150" y="60" width="60" height="120" className="fill-gray-300 dark:fill-gray-600" />
      <rect x="155" y="70" width="20" height="25" className="fill-blue-200 dark:fill-blue-800" />
      <rect x="185" y="70" width="20" height="25" className="fill-blue-200 dark:fill-blue-800" />
      <rect x="155" y="105" width="20" height="25" className="fill-blue-200 dark:fill-blue-800" />
      <rect x="185" y="105" width="20" height="25" className="fill-blue-200 dark:fill-blue-800" />
      <rect x="155" y="140" width="20" height="25" className="fill-blue-200 dark:fill-blue-800" />
      <rect x="185" y="140" width="20" height="25" className="fill-blue-200 dark:fill-blue-800" />
      <rect x="170" y="155" width="20" height="25" className="fill-amber-700 dark:fill-amber-900" /> {/* Door */}

      {/* Building height label */}
      <g>
        <line x1="225" y1="60" x2="225" y2="180" className="stroke-purple-600 dark:stroke-purple-400" strokeWidth="1" />
        <line x1="220" y1="60" x2="230" y2="60" className="stroke-purple-600 dark:stroke-purple-400" strokeWidth="1" />
        <line x1="220" y1="180" x2="230" y2="180" className="stroke-purple-600 dark:stroke-purple-400" strokeWidth="1" />
        <text x="240" y="125" className="fill-purple-600 dark:fill-purple-400 text-xs font-bold">
          {showSolution ? '12m' : '?'}
        </text>
      </g>

      {/* Building shadow */}
      <line x1="180" y1="180" x2="330" y2="180" className="stroke-gray-500" strokeWidth="4" strokeLinecap="round" />
      <text x="255" y="195" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-bold">15m</text>

      {/* Parallel indicator for sun rays */}
      {showSolution && (
        <g className="animate-fadeIn">
          <text x="85" y="100" className="fill-yellow-600 dark:fill-yellow-400 text-xs">Rayos</text>
          <text x="85" y="112" className="fill-yellow-600 dark:fill-yellow-400 text-xs">paralelos</text>
        </g>
      )}
    </svg>
  );
}

interface SimilarTrianglesProps {
  whyPhase: WhyPhase;
  onAdvance: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

function SimilarTrianglesExplanation({ whyPhase, onAdvance, isPlaying, onTogglePlay }: SimilarTrianglesProps) {
  const phaseIndex = WHY_PHASES.indexOf(whyPhase);

  // Visibility flags
  const showTriangles = phaseIndex >= 0;
  const showParallel = phaseIndex >= 1;
  const showAlpha = phaseIndex >= 2;
  const show90 = phaseIndex >= 3;
  const showBeta = phaseIndex >= 4;
  const showConclusion = phaseIndex >= 5;

  const phaseTexts: Record<WhyPhase, string> = {
    'triangles': 'Observa los dos triangulos formados',
    'parallel': 'Los rayos del sol son PARALELOS',
    'angle-alpha': 'Crean el MISMO angulo α con el suelo',
    'angle-90': 'Los objetos verticales forman angulo de 90°',
    'angle-beta': 'Por lo tanto β = 180° - 90° - α es IGUAL en ambos',
    'conclusion': '¡Los 3 angulos son iguales → Triangulos SEMEJANTES!',
  };

  return (
    <div className="space-y-4">
      {/* SVG with animated elements */}
      <svg viewBox="0 0 520 240" className="w-full max-w-xl mx-auto">
        {/* Background */}
        <rect x="0" y="0" width="520" height="240" className="fill-gray-50 dark:fill-gray-900" rx="8" />

        {/* Ground line */}
        <line x1="20" y1="200" x2="500" y2="200" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="2" />

        {/* Parallel sun rays - shown from phase 2 */}
        {showParallel && (
          <g className="animate-fadeIn">
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" className="fill-yellow-500" />
              </marker>
            </defs>
            <line x1="10" y1="20" x2="120" y2="200" className="stroke-yellow-500" strokeWidth="2" strokeDasharray="8,4" />
            <line x1="60" y1="20" x2="170" y2="200" className="stroke-yellow-500" strokeWidth="2" strokeDasharray="8,4" />
            <line x1="280" y1="20" x2="500" y2="200" className="stroke-yellow-500" strokeWidth="2" strokeDasharray="8,4" />
            <line x1="330" y1="20" x2="450" y2="140" className="stroke-yellow-500" strokeWidth="2" strokeDasharray="8,4" />
            {/* Parallel symbol */}
            <text x="180" y="30" className="fill-yellow-600 dark:fill-yellow-400 text-xs font-bold">∥ paralelos</text>
          </g>
        )}

        {/* SMALL TRIANGLE (person) */}
        {showTriangles && (
          <g className="animate-fadeIn">
            <polygon
              points="60,160 60,200 120,200"
              className="fill-blue-200/60 dark:fill-blue-800/40 stroke-blue-600 dark:stroke-blue-400"
              strokeWidth="2"
            />
            {/* Height dimension line */}
            <line x1="45" y1="160" x2="45" y2="200" className="stroke-blue-500" strokeWidth="1" />
            <line x1="40" y1="160" x2="50" y2="160" className="stroke-blue-500" strokeWidth="1" />
            <line x1="40" y1="200" x2="50" y2="200" className="stroke-blue-500" strokeWidth="1" />
            <text x="20" y="185" className="fill-blue-600 dark:fill-blue-400 text-xs font-bold">1.6m</text>
            {/* Base label */}
            <text x="90" y="218" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-medium">2m</text>
          </g>
        )}

        {/* LARGE TRIANGLE (building) */}
        {showTriangles && (
          <g className="animate-fadeIn">
            <polygon
              points="320,60 320,200 460,200"
              className="fill-purple-200/60 dark:fill-purple-800/40 stroke-purple-600 dark:stroke-purple-400"
              strokeWidth="2"
            />
            {/* Height dimension line */}
            <line x1="305" y1="60" x2="305" y2="200" className="stroke-purple-500" strokeWidth="1" />
            <line x1="300" y1="60" x2="310" y2="60" className="stroke-purple-500" strokeWidth="1" />
            <line x1="300" y1="200" x2="310" y2="200" className="stroke-purple-500" strokeWidth="1" />
            <text x="280" y="135" className="fill-purple-600 dark:fill-purple-400 text-xs font-bold">12m</text>
            {/* Base label */}
            <text x="390" y="218" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-medium">15m</text>
          </g>
        )}

        {/* ANGLE ALPHA (α) - hypotenuse with base */}
        {showAlpha && (
          <g className="animate-fadeIn">
            {/* Small triangle α arc */}
            <path
              d="M 108,200 A 12,12 0 0,1 117,192"
              className="stroke-orange-500"
              strokeWidth="2"
              fill="none"
            />
            <text x="125" y="195" className="fill-orange-600 dark:fill-orange-400 text-sm font-bold">α</text>

            {/* Large triangle α arc */}
            <path
              d="M 440,200 A 20,20 0 0,1 454,186"
              className="stroke-orange-500"
              strokeWidth="2"
              fill="none"
            />
            <text x="465" y="192" className="fill-orange-600 dark:fill-orange-400 text-sm font-bold">α</text>

            {/* Equality indicator */}
            <text x="220" y="195" className="fill-orange-600 dark:fill-orange-400 text-sm font-bold">=</text>
          </g>
        )}

        {/* ANGLE 90° - right angle markers */}
        {show90 && (
          <g className="animate-fadeIn">
            {/* Small triangle 90° square */}
            <rect x="60" y="188" width="12" height="12" className="fill-none stroke-blue-500" strokeWidth="1.5" />
            <text x="78" y="182" className="fill-blue-600 dark:fill-blue-400 text-xs font-bold">90°</text>

            {/* Large triangle 90° square */}
            <rect x="320" y="188" width="12" height="12" className="fill-none stroke-purple-500" strokeWidth="1.5" />
            <text x="338" y="182" className="fill-purple-600 dark:fill-purple-400 text-xs font-bold">90°</text>

            {/* Equality indicator */}
            <text x="220" y="175" className="fill-blue-600 dark:fill-blue-400 text-sm font-bold">=</text>
          </g>
        )}

        {/* ANGLE BETA (β) - top angle */}
        {showBeta && (
          <g className="animate-fadeIn">
            {/* Small triangle β arc */}
            <path
              d="M 60,172 A 12,12 0 0,1 70,165"
              className="stroke-green-500"
              strokeWidth="2"
              fill="none"
            />
            <text x="72" y="158" className="fill-green-600 dark:fill-green-400 text-sm font-bold">β</text>

            {/* Large triangle β arc */}
            <path
              d="M 320,80 A 20,20 0 0,1 336,68"
              className="stroke-green-500"
              strokeWidth="2"
              fill="none"
            />
            <text x="342" y="62" className="fill-green-600 dark:fill-green-400 text-sm font-bold">β</text>

            {/* Equality indicator */}
            <text x="220" y="155" className="fill-green-600 dark:fill-green-400 text-sm font-bold">=</text>
          </g>
        )}

        {/* CONCLUSION - similarity symbol */}
        {showConclusion && (
          <g className="animate-fadeIn">
            <rect x="190" y="100" width="80" height="40" rx="8" className="fill-green-100 dark:fill-green-900/50 stroke-green-500" strokeWidth="2" />
            <text x="230" y="125" textAnchor="middle" className="fill-green-700 dark:fill-green-300 text-lg font-bold">∼</text>
          </g>
        )}
      </svg>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {WHY_PHASES.map((phase, index) => (
          <div
            key={phase}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index < phaseIndex
                ? 'bg-green-500'
                : index === phaseIndex
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Phase explanation text */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center min-h-[60px] flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300 font-medium animate-fadeIn" key={whyPhase}>
          {phaseTexts[whyPhase]}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {whyPhase !== 'conclusion' && (
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isPlaying
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Play size={16} className={isPlaying ? 'animate-pulse' : ''} />
            {isPlaying ? 'Reproduciendo...' : 'Reproducir'}
          </button>
        )}
        {whyPhase === 'conclusion' && (
          <button
            onClick={onAdvance}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            ¡Entendido! <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [whyPhase, setWhyPhase] = useState<WhyPhase>('triangles');
  const [isPlaying, setIsPlaying] = useState(false);

  const isCorrect = selectedAnswer === CORRECT_ANSWER;

  // Auto-advance through why phases when playing
  useEffect(() => {
    if (!isPlaying || phase !== 'result') return;

    const duration = WHY_PHASE_DURATIONS[whyPhase];
    if (duration === 0) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      const currentIndex = WHY_PHASES.indexOf(whyPhase);
      if (currentIndex < WHY_PHASES.length - 1) {
        setWhyPhase(WHY_PHASES[currentIndex + 1]);
      } else {
        setIsPlaying(false);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [whyPhase, isPlaying, phase]);

  // Start playing automatically when entering result phase
  useEffect(() => {
    if (phase === 'result') {
      setWhyPhase('triangles');
      setIsPlaying(true);
    }
  }, [phase]);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setTimeout(() => setPhase('reveal'), 1500);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Desafio de la Altura
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Medir sin escalar
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              <strong>Sofia</strong> quiere saber la altura de un edificio, pero no tiene manera de
              subir. Observa que tanto ella como el edificio proyectan sombras en el suelo...
            </p>

            <ShadowScene />

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Altura Sofia</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">1.6 m</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Sombra Sofia</p>
                <p className="text-xl font-bold text-gray-600 dark:text-gray-300">2 m</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Altura Edificio</p>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">?</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Sombra Edificio</p>
                <p className="text-xl font-bold text-gray-600 dark:text-gray-300">15 m</p>
              </div>
            </div>

            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 flex items-center gap-3">
              <Sun className="w-6 h-6 text-yellow-500 flex-shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Pista clave:</strong> Los rayos del sol llegan con el mismo angulo a Sofia y
                al edificio (son paralelos).
              </p>
            </div>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Calcular la altura
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Si los rayos del sol son paralelos, ¿cual es la altura del edificio?
            </p>
          </QuestionPrompt>

          <div className="max-w-md mx-auto">
            <ShadowScene />
          </div>

          <OptionGrid columns={2}>
            {OPTIONS.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={index === CORRECT_ANSWER}
                showFeedback={showFeedback}
                onClick={() => handleSelect(index)}
              />
            ))}
          </OptionGrid>

          {!showFeedback && (
            <div className="flex justify-center">
              <ActionButton onClick={handleCheck} disabled={selectedAnswer === null}>
                Verificar
              </ActionButton>
            </div>
          )}

          {showFeedback && (
            <FeedbackPanel
              isCorrect={isCorrect}
              title={isCorrect ? '¡Exacto!' : '¡Casi!'}
              explanation="Veamos como se calcula..."
            />
          )}
        </div>
      )}

      {phase === 'reveal' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="max-w-md mx-auto">
            <ShadowScene showSolution />
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              La solucion usa proporciones
            </h3>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Como los rayos son paralelos, las razones son iguales:
                </p>
                <div className="text-center">
                  <MathDisplay
                    latex="\frac{\text{altura persona}}{\text{sombra persona}} = \frac{\text{altura edificio}}{\text{sombra edificio}}"
                    displayMode
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Sustituyendo valores:</p>
                <div className="text-center space-y-2">
                  <MathDisplay latex="\frac{1.6}{2} = \frac{x}{15}" displayMode />
                  <MathDisplay latex="x = \frac{1.6 \times 15}{2} = \frac{24}{2} = 12 \text{ metros}" displayMode />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('result')} icon={<ArrowRight size={20} />}>
              ¿Por que funciona?
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¿Por que los triangulos son semejantes?
            </h3>

            <SimilarTrianglesExplanation
              whyPhase={whyPhase}
              onAdvance={() => {
                // Move to showing the InsightCard after conclusion
              }}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
            />
          </div>

          {whyPhase === 'conclusion' && (
            <div className="animate-fadeIn space-y-6">
              <InsightCard
                title="Este es el Teorema de Tales"
                icon={<Lightbulb className="w-8 h-8 text-yellow-500" />}
                variant="purple"
              >
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    Cuando lineas <strong>paralelas</strong> cortan dos transversales, los segmentos
                    correspondientes son <strong>proporcionales</strong>.
                  </p>
                  <div className="text-center">
                    <MathDisplay latex="\frac{a}{b} = \frac{a'}{b'}" displayMode />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Esto nos permite medir distancias imposibles usando proporciones.
                  </p>
                </div>
              </InsightCard>

              <div className="flex justify-center">
                <ActionButton onClick={onComplete} icon={<ArrowRight size={20} />}>
                  Descubrir el patron
                </ActionButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
