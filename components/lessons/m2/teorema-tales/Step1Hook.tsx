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
type WhyPhase = 'overlay' | 'angles' | 'conclusion';

const WHY_PHASES: WhyPhase[] = ['overlay', 'angles', 'conclusion'];
const WHY_PHASE_DURATIONS: Record<WhyPhase, number> = {
  'overlay': 2500,
  'angles': 3000,
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
  isPlaying: boolean;
  onTogglePlay: () => void;
}

function SimilarTrianglesExplanation({ whyPhase, isPlaying, onTogglePlay }: SimilarTrianglesProps) {
  const phaseIndex = WHY_PHASES.indexOf(whyPhase);

  // Visibility flags
  const showOverlay = phaseIndex >= 0;
  const showAngles = phaseIndex >= 1;
  const showConclusion = phaseIndex >= 2;

  const phaseTexts: Record<WhyPhase, string> = {
    'overlay': 'El triangulo pequeño esta DENTRO del grande',
    'angles': '¡Comparten los 3 angulos: α, 90°, y β!',
    'conclusion': 'Triangulos SEMEJANTES → Lados PROPORCIONALES',
  };

  /*
   * MATEMÁTICA CORRECTA:
   * - Edificio: 12m altura, 15m sombra → ratio = 0.8
   * - Persona: 1.6m altura, 2m sombra → ratio = 0.8
   * - Escala: 1m = 13.33px (15m = 200px)
   * - Vértice compartido α en (370, 190)
   *
   * GRANDE: base=200px, altura=160px
   *   points="170,30 170,190 370,190"
   *
   * PEQUEÑO: base=27px, altura=21px
   *   points="343,169 343,190 370,190"
   *
   * Ambas hipotenusas tienen pendiente 0.8 y son COLINEALES
   */

  return (
    <div className="space-y-4">
      {/* SVG con triángulos matemáticamente correctos */}
      <svg viewBox="0 0 420 220" className="w-full max-w-lg mx-auto">
        {/* Fondo */}
        <rect x="0" y="0" width="420" height="220" className="fill-slate-50 dark:fill-slate-900" rx="8" />

        {/* Línea del suelo */}
        <line x1="40" y1="190" x2="390" y2="190" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />

        {/* TRIÁNGULO GRANDE (edificio) - ratio altura/base = 160/200 = 0.8 */}
        {showOverlay && (
          <g className="animate-fadeIn">
            <polygon
              points="170,30 170,190 370,190"
              className="fill-purple-100/60 dark:fill-purple-800/30 stroke-purple-500 dark:stroke-purple-400"
              strokeWidth="2"
            />
            {/* Dimensiones */}
            <line x1="155" y1="30" x2="155" y2="190" className="stroke-purple-400" strokeWidth="1" />
            <line x1="150" y1="30" x2="160" y2="30" className="stroke-purple-400" strokeWidth="1" />
            <line x1="150" y1="190" x2="160" y2="190" className="stroke-purple-400" strokeWidth="1" />
            <text x="135" y="115" className="fill-purple-600 dark:fill-purple-400 text-xs font-bold">12m</text>
            <text x="270" y="205" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-xs">15m</text>
          </g>
        )}

        {/* TRIÁNGULO PEQUEÑO (persona) - ratio altura/base = 21/27 ≈ 0.8 */}
        {showOverlay && (
          <g className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <polygon
              points="343,169 343,190 370,190"
              className="fill-blue-200/80 dark:fill-blue-700/50 stroke-blue-600 dark:stroke-blue-400"
              strokeWidth="2.5"
            />
            {/* Dimensiones */}
            <line x1="330" y1="169" x2="330" y2="190" className="stroke-blue-400" strokeWidth="1" />
            <line x1="325" y1="169" x2="335" y2="169" className="stroke-blue-400" strokeWidth="1" />
            <line x1="325" y1="190" x2="335" y2="190" className="stroke-blue-400" strokeWidth="1" />
            <text x="305" y="182" className="fill-blue-600 dark:fill-blue-400 text-[10px] font-bold">1.6m</text>
            <text x="356" y="205" className="fill-slate-500 dark:fill-slate-400 text-[10px]">2m</text>
          </g>
        )}

        {/* MARCADORES DE ÁNGULOS */}
        {showAngles && (
          <g className="animate-fadeIn">
            {/* Ángulo α COMPARTIDO (esquina inferior derecha - punto 370,190) */}
            <path
              d="M 355,190 A 15,15 0 0,1 367,181"
              className="stroke-orange-500"
              strokeWidth="2.5"
              fill="none"
            />
            <text x="375" y="193" className="fill-orange-600 dark:fill-orange-400 text-sm font-bold">α</text>

            {/* 90° triángulo grande (esquina inferior izquierda - punto 170,190) */}
            <rect x="170" y="178" width="10" height="10" className="fill-none stroke-purple-500" strokeWidth="1.5" />
            <text x="185" y="176" className="fill-purple-600 dark:fill-purple-400 text-[10px] font-bold">90°</text>

            {/* 90° triángulo pequeño (punto 343,190) */}
            <rect x="343" y="183" width="7" height="7" className="fill-none stroke-blue-500" strokeWidth="1.5" />

            {/* β triángulo grande (vértice superior - punto 170,30) */}
            <path
              d="M 170,48 A 18,18 0 0,1 186,34"
              className="stroke-green-500"
              strokeWidth="2"
              fill="none"
            />
            <text x="190" y="32" className="fill-green-600 dark:fill-green-400 text-sm font-bold">β</text>

            {/* β triángulo pequeño (punto 343,169) */}
            <path
              d="M 343,176 A 7,7 0 0,1 349,170"
              className="stroke-green-500"
              strokeWidth="1.5"
              fill="none"
            />
            <text x="352" y="165" className="fill-green-600 dark:fill-green-400 text-[10px] font-bold">β</text>
          </g>
        )}

        {/* CONCLUSIÓN - símbolo de semejanza */}
        {showConclusion && (
          <g className="animate-fadeIn">
            <text x="100" y="100" className="fill-green-600 dark:fill-green-400 text-2xl font-bold">∼</text>
            <text x="80" y="120" className="fill-slate-600 dark:fill-slate-400 text-xs">semejantes</text>
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
      {whyPhase !== 'conclusion' && (
        <div className="flex justify-center">
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
        </div>
      )}
    </div>
  );
}

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [whyPhase, setWhyPhase] = useState<WhyPhase>('overlay');
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
      setWhyPhase('overlay');
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
