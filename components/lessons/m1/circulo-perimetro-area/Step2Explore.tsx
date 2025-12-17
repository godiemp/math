'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Lightbulb, Play, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'circumference' | 'area' | 'summary';
type AnimStep = 0 | 1 | 2 | 3;

const STEP_DELAY = 1800;

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [circumStep, setCircumStep] = useState<AnimStep>(0);
  const [areaStep, setAreaStep] = useState<AnimStep>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [numSlices, setNumSlices] = useState(8); // Interactive slice count for area

  // Circle parameters
  const circleRadius = 45;
  const lineLength = 280; // Length of unrolled line

  // Auto-advance animation steps
  useEffect(() => {
    if (!isPlaying) return;

    const maxStep = phase === 'circumference' ? 3 : 2;
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

  // Auto-start animation when entering circumference phase (area phase is manual)
  useEffect(() => {
    if (phase === 'circumference' && circumStep === 0) {
      setTimeout(() => setIsPlaying(true), 500);
    }
  }, [phase, circumStep]);

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
      'Este círculo tiene diámetro d. Observa su borde (la circunferencia).',
      '¡El círculo rueda y su borde se desenrolla en una línea recta!',
      '¿Cuántas veces cabe el diámetro en la circunferencia? ¡Exactamente π veces!',
      'Por eso: Circunferencia = π × diámetro = πd',
    ];

    const circleStartX = 50; // Circle starting X position
    const circleY = 70; // Circle center Y position
    const lineY = circleY + circleRadius; // Line is at bottom of circle
    const lineStartX = circleStartX; // Line starts where circle starts

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Por qué C = π × d?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Observa cómo la circunferencia se desenrolla
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2, 3].map((step) => (
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
            <svg viewBox="0 0 390 180" className="w-full max-w-xl">
              {/* Grid background */}
              <defs>
                <pattern id="gridCirc" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x="0" y="0" width="390" height="180" fill="url(#gridCirc)" />

              {/* Ground line - the surface the circle "rolls" on */}
              <line x1="15" y1={lineY} x2="385" y2={lineY} stroke="#cbd5e1" strokeWidth="2" />

              {/* CIRCLE - rolls to the right */}
              {/* Outer group positions the circle center at y=circleY */}
              <g transform={`translate(0, ${circleY})`}>
                {/* Inner motion.g handles x translation and rotation around center */}
                <motion.g
                  initial={{ x: circleStartX, rotate: 0 }}
                  animate={{
                    x: circumStep >= 1 ? circleStartX + lineLength : circleStartX,
                    rotate: circumStep >= 1 ? 360 : 0,
                  }}
                  transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* All elements centered at (0,0) = circle center */}
                  {/* Circle fill */}
                  <circle r={circleRadius} fill="#ccfbf1" />

                  {/* Circle stroke */}
                  <circle
                    r={circleRadius}
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="4"
                  />

                  {/* Center point */}
                  <circle r="4" fill="#0d9488" />

                  {/* Diameter line inside circle */}
                  <line x1={-circleRadius} y1="0" x2={circleRadius} y2="0" stroke="#7c3aed" strokeWidth="3" />
                  <text x="0" y="-8" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c3aed">d</text>

                  {/* Marker dot at contact point (bottom of circle) */}
                  <circle cx="0" cy={circleRadius} r="6" fill="#dc2626" />
                </motion.g>
              </g>

              {/* UNROLLED LINE - grows as circle unwinds */}
              {circumStep >= 1 && (
                <motion.line
                  x1={lineStartX}
                  y1={lineY}
                  x2={lineStartX}
                  y2={lineY}
                  stroke="#0d9488"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{
                    x2: lineStartX + lineLength,
                  }}
                  transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
                />
              )}

              {/* Moving marker on the line */}
              {circumStep >= 1 && (
                <motion.circle
                  cx={lineStartX}
                  cy={lineY}
                  r="6"
                  fill="#dc2626"
                  animate={{
                    cx: lineStartX + lineLength,
                  }}
                  transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
                />
              )}

              {/* Labels that appear after unroll */}
              {circumStep >= 2 && (
                <>
                  {/* Circumference label */}
                  <motion.text
                    x={lineStartX + lineLength / 2}
                    y={lineY + 40}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#0d9488"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Circunferencia = πd
                  </motion.text>

                  {/* Diameter segments on the line */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {/* Segment markers */}
                    {[0, 1, 2, 3].map((i) => {
                      const segmentWidth = lineLength / Math.PI;
                      const x = lineStartX + i * segmentWidth;
                      const isLast = i === 3;
                      return (
                        <g key={i}>
                          <line
                            x1={x}
                            y1={lineY - 8}
                            x2={x}
                            y2={lineY + 8}
                            stroke={isLast ? '#10b981' : ['#7c3aed', '#ec4899', '#f59e0b'][i]}
                            strokeWidth="2"
                          />
                          {!isLast && (
                            <text
                              x={x + segmentWidth / 2}
                              y={lineY + 22}
                              textAnchor="middle"
                              fontSize="12"
                              fontWeight="bold"
                              fill={['#7c3aed', '#ec4899', '#f59e0b'][i]}
                            >
                              d
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Count labels */}
                    <motion.g
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      {[1, 2, 3].map((num, i) => {
                        const segmentWidth = lineLength / Math.PI;
                        const x = lineStartX + (i + 0.5) * segmentWidth;
                        return (
                          <g key={num}>
                            <circle
                              cx={x}
                              cy={lineY - 35}
                              r="14"
                              fill={['#7c3aed', '#ec4899', '#f59e0b'][i]}
                            />
                            <text
                              x={x}
                              y={lineY - 30}
                              textAnchor="middle"
                              fontSize="14"
                              fontWeight="bold"
                              fill="white"
                            >
                              {num}
                            </text>
                          </g>
                        );
                      })}
                      {/* The .14 remainder */}
                      <text
                        x={lineStartX + lineLength - 10}
                        y={lineY - 30}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="bold"
                        fill="#10b981"
                      >
                        .14
                      </text>
                    </motion.g>
                  </motion.g>

                  {/* Result text */}
                  <motion.text
                    x={lineStartX + lineLength / 2}
                    y={lineY - 55}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#1f2937"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    ¡El diámetro cabe 3.14 veces! = π
                  </motion.text>
                </>
              )}
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
                if (circumStep >= 3) {
                  setCircumStep(0);
                  setTimeout(() => setIsPlaying(true), 100);
                } else {
                  setIsPlaying(true);
                }
              }}
              disabled={isPlaying && circumStep < 3}
              className="flex items-center gap-2 px-6 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={18} />
              <span>{circumStep >= 3 ? 'Repetir' : 'Animar'}</span>
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
        {circumStep >= 3 && (
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
            disabled={circumStep < 3}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              circumStep >= 3
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
      'El círculo está cortado en rebanadas como pizza. ¡Ajusta el número de rebanadas!',
      'Ahora reorganizamos las rebanadas alternando arriba y abajo...',
      '¡Las rebanadas forman casi un rectángulo! Mientras más rebanadas, más perfecto.',
    ];

    // Pizza slice geometry - now uses dynamic numSlices from state
    const sliceAngle = (2 * Math.PI) / numSlices;
    const radius = 55;

    // Rectangle layout constants
    const circleCenterX = 170;
    const circleCenterY = 100;
    const rectCenterY = 100; // Center Y of the rectangle

    // Single normalized slice path - tip at (0,0), pointing UP (arc toward -Y)
    const halfAngle = sliceAngle / 2;
    const slicePath = `M 0 0 L ${-radius * Math.sin(halfAngle)} ${-radius * Math.cos(halfAngle)} A ${radius} ${radius} 0 0 1 ${radius * Math.sin(halfAngle)} ${-radius * Math.cos(halfAngle)} Z`;

    // Colors for slices (alternating)
    const sliceColors = Array.from({ length: numSlices }, (_, i) =>
      i % 2 === 0 ? '#5eead4' : '#14b8a6'
    );

    // Calculate slice chord width (width at the arc)
    const sliceChordWidth = 2 * radius * Math.sin(halfAngle);
    // Total rectangle width: each pair of slices (one up, one down) occupies one sliceChordWidth
    const actualRectWidth = (numSlices / 2) * sliceChordWidth;
    const rectStartX = circleCenterX - actualRectWidth / 2;

    // Circle view: rotate each slice to its position in the circle
    const getCirclePosition = (index: number) => ({
      x: circleCenterX,
      y: circleCenterY,
      rotate: index * (360 / numSlices),
    });

    // Rectangle view: simple 0° or 180° rotation
    // Pairs of slices (one up, one down) share the same X position
    const getRectanglePosition = (index: number) => {
      const isDown = index % 2 === 0;
      const pairIndex = Math.floor(index / 2);
      return {
        x: rectStartX + (pairIndex + 0.5) * sliceChordWidth,
        y: isDown ? rectCenterY - radius / 2 : rectCenterY + radius / 2,
        rotate: isDown ? 180 : 0,
      };
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Por qué A = πr²?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubre cómo un círculo se convierte en rectángulo
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((step) => (
              <motion.div
                key={step}
                animate={{
                  scale: step === areaStep ? 1.3 : 1,
                  backgroundColor: step <= areaStep ? '#7c3aed' : '#d1d5db',
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
                <pattern id="gridArea" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x="0" y="0" width="340" height="200" fill="url(#gridArea)" />

              {/* CIRCLE VIEW - steps 0 and 1 */}
              {areaStep < 2 && (
                <g>
                  {/* Circle slices - each slice rotated to its position */}
                  {Array.from({ length: numSlices }, (_, i) => {
                    const pos = getCirclePosition(i);
                    return (
                      <g
                        key={i}
                        transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rotate})`}
                      >
                        <path
                          d={slicePath}
                          fill={sliceColors[i]}
                          stroke="#0d9488"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}
                  {/* Radius indicator */}
                  <line x1={circleCenterX} y1={circleCenterY} x2={circleCenterX + radius} y2={circleCenterY} stroke="#dc2626" strokeWidth="3" />
                  <text x={circleCenterX + radius / 2} y={circleCenterY - 8} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">r</text>
                  <circle cx={circleCenterX} cy={circleCenterY} r="4" fill="#0d9488" />
                </g>
              )}

              {/* RECTANGLE VIEW - step 2 */}
              {areaStep >= 2 && (
                <g>
                  {/* Rectangle slices - alternating up/down */}
                  {Array.from({ length: numSlices }, (_, i) => {
                    const pos = getRectanglePosition(i);
                    return (
                      <g
                        key={i}
                        transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rotate})`}
                      >
                        <path
                          d={slicePath}
                          fill={sliceColors[i]}
                          stroke="#0d9488"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}
                  {/* Base label */}
                  <line x1={rectStartX} y1={rectCenterY + radius / 2 + 5} x2={rectStartX + actualRectWidth} y2={rectCenterY + radius / 2 + 5} stroke="#7c3aed" strokeWidth="3" />
                  <text x={circleCenterX} y={rectCenterY + radius / 2 + 22} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">
                    base = πr (mitad de la circunferencia)
                  </text>
                  {/* Height label */}
                  <line x1={rectStartX + actualRectWidth + 10} y1={rectCenterY - radius / 2} x2={rectStartX + actualRectWidth + 10} y2={rectCenterY + radius / 2} stroke="#dc2626" strokeWidth="3" />
                  <text x={rectStartX + actualRectWidth + 20} y={rectCenterY + 5} textAnchor="start" fontSize="14" fontWeight="bold" fill="#dc2626">
                    r
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Step description */}
          <motion.div
            key={areaStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 mb-4"
          >
            <p className="text-purple-800 dark:text-purple-200 text-center font-medium">
              {stepDescriptions[areaStep]}
            </p>
          </motion.div>

          {/* Interactive slice control */}
          <div className="mb-4 px-4">
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">
                Rebanadas: {numSlices}
              </span>
              <input
                type="range"
                min="6"
                max="36"
                step="2"
                value={numSlices}
                onChange={(e) => setNumSlices(parseInt(e.target.value))}
                className="w-40 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {numSlices >= 30 ? '¡Perfecto!' : numSlices >= 20 ? '¡Casi perfecto!' : numSlices >= 14 ? 'Mejor' : 'Básico'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            {areaStep < 2 ? (
              <button
                onClick={() => setAreaStep((areaStep + 1) as AnimStep)}
                className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all"
              >
                <ArrowRight size={18} />
                <span>Siguiente</span>
              </button>
            ) : (
              <button
                onClick={() => setAreaStep(0)}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Reiniciar</span>
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
            <p className="text-purple-800 dark:text-purple-200 text-center mb-3">
              ¡Con {numSlices} rebanadas forman casi un <strong>rectángulo</strong>!
              {numSlices < 16 && <span className="block text-sm mt-1">Prueba con más rebanadas para que sea más perfecto.</span>}
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2">
              <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                <strong>¿Por qué la base es πr?</strong>
              </p>
              <p className="text-center text-xs text-gray-600 dark:text-gray-400">
                La mitad de las rebanadas apuntan arriba, la otra mitad abajo.
                <br />
                Cada mitad tiene la mitad del borde del círculo = <span className="text-purple-600 font-semibold">½ × 2πr = πr</span>
              </p>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
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
