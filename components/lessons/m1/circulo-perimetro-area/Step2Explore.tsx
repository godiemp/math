'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Lightbulb, Play, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'circumference' | 'area' | 'summary';
type AnimStep = 0 | 1 | 2 | 3 | 4;

const STEP_DELAY = 1400;

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [circumStep, setCircumStep] = useState<AnimStep>(0);
  const [areaStep, setAreaStep] = useState<AnimStep>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Auto-advance animation
  useEffect(() => {
    if (!isPlaying) return;

    const maxStep = phase === 'circumference' ? 4 : 3;
    const timer = setInterval(() => {
      if (phase === 'circumference') {
        setCircumStep(prev => {
          if (prev >= maxStep) {
            setIsPlaying(false);
            return maxStep as AnimStep;
          }
          return (prev + 1) as AnimStep;
        });
      } else if (phase === 'area') {
        setAreaStep(prev => {
          if (prev >= maxStep) {
            setIsPlaying(false);
            return maxStep as AnimStep;
          }
          return (prev + 1) as AnimStep;
        });
      }
    }, STEP_DELAY);

    return () => clearInterval(timer);
  }, [isPlaying, phase]);

  // Auto-start animation when entering phase
  useEffect(() => {
    if (phase === 'circumference' && circumStep === 0) {
      setTimeout(() => setIsPlaying(true), 500);
    }
    if (phase === 'area' && areaStep === 0) {
      setTimeout(() => setIsPlaying(true), 500);
    }
  }, [phase, circumStep, areaStep]);

  if (!isActive) return null;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubriendo Pi (π)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El número mágico de los círculos
          </p>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-500" />
              <p className="text-lg text-gray-800 dark:text-gray-200">
                Los antiguos matemáticos descubrieron algo increíble sobre los círculos...
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Si mides la <strong>circunferencia</strong> y la divides por el <strong>diámetro</strong>,
                <br />
                ¡siempre obtienes el mismo número!
              </p>
            </div>

            <div className="flex justify-center gap-4 py-4">
              <div className="text-center">
                <svg viewBox="0 0 60 60" className="w-12 h-12">
                  <circle cx="30" cy="30" r="25" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Pequeño</p>
              </div>
              <div className="text-center">
                <svg viewBox="0 0 80 80" className="w-16 h-16">
                  <circle cx="40" cy="40" r="35" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Mediano</p>
              </div>
              <div className="text-center">
                <svg viewBox="0 0 100 100" className="w-20 h-20">
                  <circle cx="50" cy="50" r="45" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Grande</p>
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-4">
              <p className="text-purple-800 dark:text-purple-200 text-center text-lg font-semibold">
                Circunferencia ÷ Diámetro = <span className="text-2xl">π ≈ 3.14159...</span>
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mt-4">
              <p className="text-amber-800 dark:text-amber-200 text-center">
                Este número se llama <strong>Pi (π)</strong> y es igual para TODOS los círculos.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('circumference')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver la fórmula de circunferencia</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ CIRCUMFERENCE ============
  if (phase === 'circumference') {
    const stepDescriptions = [
      'Este es un círculo con su diámetro marcado.',
      '¡Vamos a desenrollar el borde del círculo!',
      'La circunferencia se convierte en una línea recta.',
      'Ahora medimos: ¿cuántos diámetros caben?',
      '¡Exactamente π veces! (≈ 3.14)',
    ];

    const circleRadius = 55;
    const circumference = 2 * Math.PI * circleRadius; // ~345.6

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Por qué C = π × d?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Observa cómo el diámetro cabe en la circunferencia
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                animate={{
                  scale: step === circumStep ? 1.3 : 1,
                  backgroundColor: step <= circumStep ? '#0d9488' : '#d1d5db',
                }}
                transition={{ duration: 0.3 }}
                className="w-3 h-3 rounded-full"
              />
            ))}
          </div>

          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 340 200" className="w-full max-w-lg">
              {/* Grid background */}
              <defs>
                <pattern id="gridCirc" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x="0" y="0" width="340" height="200" fill="url(#gridCirc)" />

              {/* CIRCLE - fades out after step 1 */}
              <AnimatePresence>
                {circumStep <= 1 && (
                  <motion.g
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Circle fill */}
                    <circle cx="170" cy="80" r={circleRadius} fill="#ccfbf1" />

                    {/* Circle stroke - animates "unwinding" */}
                    <motion.circle
                      cx="170"
                      cy="80"
                      r={circleRadius}
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: 0 }}
                      animate={{
                        strokeDashoffset: circumStep >= 1 ? circumference : 0,
                        rotate: circumStep >= 1 ? 90 : 0
                      }}
                      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                      style={{ transformOrigin: '170px 80px' }}
                    />

                    {/* Center point */}
                    <circle cx="170" cy="80" r="4" fill="#0d9488" />

                    {/* Diameter line */}
                    <line x1="115" y1="80" x2="225" y2="80" stroke="#7c3aed" strokeWidth="4" />
                    <text x="170" y="70" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c3aed">d</text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* UNROLLED LINE - appears after step 1 */}
              <AnimatePresence>
                {circumStep >= 2 && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Unrolled circumference line */}
                    <motion.line
                      x1="20"
                      y1="50"
                      x2="320"
                      y2="50"
                      stroke="#0d9488"
                      strokeWidth="5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <motion.text
                      x="170"
                      y="30"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="bold"
                      fill="#0d9488"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      Circunferencia desenrollada
                    </motion.text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* DIAMETER SEGMENTS - appear at step 3+ */}
              <AnimatePresence>
                {circumStep >= 3 && (
                  <>
                    {/* Segment 1 - Purple */}
                    <motion.g
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0 }}
                    >
                      <line x1="20" y1="80" x2="115" y2="80" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
                      <text x="67" y="100" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c3aed">d</text>
                    </motion.g>

                    {/* Segment 2 - Pink */}
                    <motion.g
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <line x1="120" y1="80" x2="215" y2="80" stroke="#ec4899" strokeWidth="6" strokeLinecap="round" />
                      <text x="167" y="100" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ec4899">d</text>
                    </motion.g>

                    {/* Segment 3 - Orange */}
                    <motion.g
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <line x1="220" y1="80" x2="315" y2="80" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                      <text x="267" y="100" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f59e0b">d</text>
                    </motion.g>

                    {/* Remaining .14 - Green */}
                    <motion.g
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.45 }}
                    >
                      <line x1="315" y1="80" x2="320" y2="80" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
                    </motion.g>
                  </>
                )}
              </AnimatePresence>

              {/* COUNT BUBBLES - appear at step 4 */}
              <AnimatePresence>
                {circumStep >= 4 && (
                  <>
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0, type: 'spring', bounce: 0.5 }}
                    >
                      <circle cx="67" cy="140" r="20" fill="#7c3aed" />
                      <text x="67" y="147" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">1</text>
                    </motion.g>

                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.12, type: 'spring', bounce: 0.5 }}
                    >
                      <circle cx="167" cy="140" r="20" fill="#ec4899" />
                      <text x="167" y="147" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">2</text>
                    </motion.g>

                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.24, type: 'spring', bounce: 0.5 }}
                    >
                      <circle cx="267" cy="140" r="20" fill="#f59e0b" />
                      <text x="267" y="147" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">3</text>
                    </motion.g>

                    <motion.text
                      x="317"
                      y="147"
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="bold"
                      fill="#10b981"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.36, type: 'spring', bounce: 0.5 }}
                    >
                      .14
                    </motion.text>

                    <motion.text
                      x="170"
                      y="185"
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="bold"
                      fill="#0d9488"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      ¡El diámetro cabe 3.14 veces! = π
                    </motion.text>
                  </>
                )}
              </AnimatePresence>
            </svg>
          </div>

          {/* Step description */}
          <motion.div
            key={circumStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-3 mb-4"
          >
            <p className="text-teal-800 dark:text-teal-200 text-center font-medium">
              {stepDescriptions[circumStep]}
            </p>
          </motion.div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                if (circumStep === 4) {
                  setCircumStep(0);
                  setTimeout(() => setIsPlaying(true), 100);
                } else {
                  setIsPlaying(true);
                }
              }}
              disabled={isPlaying && circumStep < 4}
              className="flex items-center gap-2 px-6 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={18} />
              <span>{circumStep === 4 ? 'Repetir' : 'Animar'}</span>
            </button>
            {circumStep > 0 && (
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCircumStep(0);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Formula explanation - appears after animation */}
        {circumStep >= 4 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-5 border border-teal-200 dark:border-teal-700"
            >
              <p className="text-teal-800 dark:text-teal-200 text-center">
                <strong>¡Eso es π!</strong> El diámetro cabe exactamente <strong>π veces</strong> (≈ 3.14) en la circunferencia.
              </p>
              <p className="text-teal-700 dark:text-teal-300 text-center mt-2 text-sm">
                Por eso: Circunferencia = π × diámetro = <strong>C = πd</strong>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700"
            >
              <p className="text-purple-800 dark:text-purple-200 text-center mb-3 font-semibold">
                Las dos formas de escribir la fórmula:
              </p>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
                    C = π × d
                  </span>
                  <span className="text-gray-500">(usando diámetro)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
                    C = 2πr
                  </span>
                  <span className="text-gray-500">(usando radio, porque d = 2r)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700"
            >
              <div className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-800 dark:text-green-200 font-semibold text-lg">
                  C = 2πr = πd
                </span>
              </div>
            </motion.div>
          </>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => {
              setCircumStep(0);
              setIsPlaying(false);
              setPhase('area');
            }}
            disabled={circumStep < 4}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              circumStep >= 4
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <span>Ahora el área</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ AREA ============
  if (phase === 'area') {
    const handleAreaSubmit = () => {
      setShowFeedback(true);
    };

    const handleAreaNext = () => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setPhase('summary');
    };

    const stepDescriptions = [
      'Este círculo está cortado como pizza.',
      'Movemos las rebanadas para reorganizarlas...',
      '¡Forman casi un rectángulo!',
    ];

    // Pizza slice geometry
    const numSlices = 8;
    const sliceAngle = (2 * Math.PI) / numSlices;
    const radius = 60;

    // Generate slice paths for circle
    const generateSlicePath = (index: number): string => {
      const startAngle = index * sliceAngle - Math.PI / 2;
      const endAngle = (index + 1) * sliceAngle - Math.PI / 2;
      const x1 = radius * Math.cos(startAngle);
      const y1 = radius * Math.sin(startAngle);
      const x2 = radius * Math.cos(endAngle);
      const y2 = radius * Math.sin(endAngle);
      return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
    };

    // Slice positions for each step
    const slicePositions = [
      // Step 0: Circle arrangement (centered at origin, will transform to 150, 90)
      Array.from({ length: numSlices }, () => ({ x: 150, y: 90, rotate: 0 })),
      // Step 1: Moving apart
      Array.from({ length: numSlices }, (_, i) => ({
        x: 150 + (i % 2 === 0 ? -20 : 20),
        y: 90 + (i < 4 ? -15 : 15),
        rotate: 0,
      })),
      // Step 2+: Rectangle arrangement (alternating up/down triangles)
      [
        { x: 50, y: 135, rotate: 90 },    // Slice 0 - point up
        { x: 95, y: 55, rotate: -90 },    // Slice 1 - point down
        { x: 140, y: 135, rotate: 90 },   // Slice 2 - point up
        { x: 185, y: 55, rotate: -90 },   // Slice 3 - point down
        { x: 230, y: 135, rotate: 90 },   // Slice 4 - point up
        { x: 275, y: 55, rotate: -90 },   // Slice 5 - point down
        { x: 320, y: 135, rotate: 90 },   // Slice 6 - point up (will be clipped)
        { x: 50, y: 55, rotate: -90 },    // Slice 7 - point down (moved to start)
      ],
    ];

    const sliceColors = ['#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488'];

    const currentPositions = areaStep >= 2 ? slicePositions[2] : areaStep === 1 ? slicePositions[1] : slicePositions[0];

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Por qué A = πr²?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Observa cómo las rebanadas forman un rectángulo
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((step) => (
              <motion.div
                key={step}
                animate={{
                  scale: step === Math.min(areaStep, 2) ? 1.3 : 1,
                  backgroundColor: step <= areaStep ? '#7c3aed' : '#d1d5db',
                }}
                transition={{ duration: 0.3 }}
                className="w-3 h-3 rounded-full"
              />
            ))}
          </div>

          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 380 190" className="w-full max-w-lg">
              {/* Grid background */}
              <defs>
                <pattern id="gridArea" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x="0" y="0" width="380" height="190" fill="url(#gridArea)" />

              {/* Animated slices */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.g
                  key={i}
                  initial={{
                    x: 150,
                    y: 90,
                    rotate: 0,
                  }}
                  animate={{
                    x: currentPositions[i].x,
                    y: currentPositions[i].y,
                    rotate: currentPositions[i].rotate,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.4, 0, 0.2, 1],
                    delay: areaStep >= 2 ? i * 0.05 : 0,
                  }}
                >
                  <path
                    d={generateSlicePath(i)}
                    fill={sliceColors[i]}
                    stroke="#0d9488"
                    strokeWidth="1.5"
                  />
                </motion.g>
              ))}

              {/* Radius indicator - only show in step 0 */}
              {areaStep === 0 && (
                <motion.g
                  initial={{ opacity: 1 }}
                  animate={{ opacity: areaStep === 0 ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <line x1="150" y1="90" x2="210" y2="90" stroke="#dc2626" strokeWidth="3" />
                  <text x="180" y="82" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">r</text>
                  <circle cx="150" cy="90" r="4" fill="#0d9488" />
                </motion.g>
              )}

              {/* Rectangle labels - appear in step 2+ */}
              {areaStep >= 2 && (
                <>
                  {/* Base label */}
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <line x1="30" y1="165" x2="340" y2="165" stroke="#7c3aed" strokeWidth="3" />
                    <text x="185" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">
                      base = πr (mitad de la circunferencia)
                    </text>
                  </motion.g>

                  {/* Height label */}
                  <motion.g
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <line x1="355" y1="55" x2="355" y2="135" stroke="#dc2626" strokeWidth="3" />
                    <text x="368" y="100" textAnchor="start" fontSize="14" fontWeight="bold" fill="#dc2626">
                      r
                    </text>
                  </motion.g>
                </>
              )}
            </svg>
          </div>

          {/* Step description */}
          <motion.div
            key={Math.min(areaStep, 2)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 mb-4"
          >
            <p className="text-purple-800 dark:text-purple-200 text-center font-medium">
              {stepDescriptions[Math.min(areaStep, 2)]}
            </p>
          </motion.div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                if (areaStep >= 2) {
                  setAreaStep(0);
                  setTimeout(() => setIsPlaying(true), 100);
                } else {
                  setIsPlaying(true);
                }
              }}
              disabled={isPlaying && areaStep < 2}
              className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={18} />
              <span>{areaStep >= 2 ? 'Repetir' : 'Animar'}</span>
            </button>
            {areaStep > 0 && (
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setAreaStep(0);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Explanation that appears after animation */}
        {areaStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700"
          >
            <p className="text-purple-800 dark:text-purple-200 text-center">
              ¡Las rebanadas forman casi un <strong>rectángulo</strong>!
            </p>
            <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                <strong>Área del rectángulo</strong> = base × altura
              </p>
              <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-1">
                = <span className="text-purple-600 font-semibold">πr</span> × <span className="text-red-600 font-semibold">r</span>
              </p>
              <p className="text-center text-lg font-bold text-teal-600 dark:text-teal-400 mt-2">
                = πr²
              </p>
            </div>
          </motion.div>
        )}

        {/* Question - appears after animation */}
        {areaStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700"
          >
            <p className="text-blue-800 dark:text-blue-200 text-center font-semibold mb-4">
              Entonces, ¿cuál es la fórmula del área de un círculo?
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'A = πr', value: 0 },
                { label: 'A = πr²', value: 1 },
                { label: 'A = 2πr', value: 2 },
                { label: 'A = πd²', value: 3 },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedAnswer(option.value)}
                  disabled={showFeedback}
                  className={cn(
                    'p-3 rounded-xl font-semibold transition-all border-2 text-sm',
                    selectedAnswer === option.value
                      ? showFeedback
                        ? option.value === 1
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500'
                      : showFeedback && option.value === 1
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-white dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'p-4 rounded-xl',
              selectedAnswer === 1
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
            )}
          >
            <div className="flex items-start gap-3">
              <Check className={cn(
                'w-6 h-6 flex-shrink-0',
                selectedAnswer === 1 ? 'text-green-600' : 'text-amber-600'
              )} />
              <div>
                <p className={cn(
                  'font-bold',
                  selectedAnswer === 1 ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {selectedAnswer === 1 ? '¡Correcto!' : 'La respuesta es A = πr²'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                  El área es π veces el radio al cuadrado, porque el círculo se puede reorganizar en un rectángulo de base πr y altura r.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-center">
          {areaStep < 2 ? (
            <div className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">
              Observando la animación...
            </div>
          ) : !showFeedback ? (
            <button
              onClick={handleAreaSubmit}
              disabled={selectedAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={handleAreaNext}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Ver resumen</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Excelente trabajo!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Has descubierto las fórmulas del círculo
        </p>
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <span className="text-lg font-semibold text-teal-800 dark:text-teal-200">
            Lo que descubriste:
          </span>
        </div>

        <div className="space-y-3">
          {/* Pi */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">π</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Pi (π)</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">El diámetro cabe π veces en la circunferencia</p>
            </div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ≈ 3.14
            </div>
          </motion.div>

          {/* Circumference */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4"
          >
            <svg viewBox="0 0 50 50" className="w-12 h-12 flex-shrink-0">
              <circle cx="25" cy="25" r="20" fill="none" stroke="#0d9488" strokeWidth="3" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Circunferencia</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">π veces el diámetro</p>
            </div>
            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
              C = πd
            </div>
          </motion.div>

          {/* Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4"
          >
            <svg viewBox="0 0 50 50" className="w-12 h-12 flex-shrink-0">
              <circle cx="25" cy="25" r="20" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Área</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Rebanadas forman rectángulo πr × r</p>
            </div>
            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
              A = πr²
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700"
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Patrón clave:</strong> Ambas fórmulas usan π (pi).
            La circunferencia usa el diámetro (o 2r), el área usa r² (radio al cuadrado).
          </p>
        </div>
      </motion.div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Ver las fórmulas completas</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
