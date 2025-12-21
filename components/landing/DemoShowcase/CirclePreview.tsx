'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'circumference' | 'area';

// Constants
const PHASE_DURATION = 4000; // 4 seconds per phase
const CIRCLE_RADIUS = 40;
const LINE_LENGTH = 250;

export function CirclePreview() {
  const [phase, setPhase] = useState<Phase>('circumference');
  const [animKey, setAnimKey] = useState(0);

  // Cycle between phases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === 'circumference' ? 'area' : 'circumference'));
      setAnimKey((k) => k + 1);
    }, PHASE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'circumference' ? (
          <CircumferenceAnimation key={`circ-${animKey}`} />
        ) : (
          <AreaAnimation key={`area-${animKey}`} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CircumferenceAnimation() {
  const circleStartX = 50;
  const circleY = 60;
  const lineY = circleY + CIRCLE_RADIUS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2"
      >
        Circunferencia = πd
      </motion.p>

      <svg viewBox="0 0 340 140" className="w-full max-w-xs">
        {/* Grid background */}
        <defs>
          <pattern id="gridCircPreview" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d1d5db" strokeWidth="0.5" className="dark:stroke-gray-700" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="340" height="140" fill="url(#gridCircPreview)" />

        {/* Ground line */}
        <line x1="15" y1={lineY} x2="325" y2={lineY} stroke="#94a3b8" strokeWidth="2" />

        {/* Rolling circle */}
        <g transform={`translate(0, ${circleY})`}>
          <motion.g
            initial={{ x: circleStartX, rotate: 0 }}
            animate={{ x: circleStartX + LINE_LENGTH, rotate: 360 }}
            transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Circle fill */}
            <circle r={CIRCLE_RADIUS} fill="#ccfbf1" className="dark:fill-teal-900/50" />
            {/* Circle stroke */}
            <circle r={CIRCLE_RADIUS} fill="none" stroke="#0d9488" strokeWidth="3" />
            {/* Center point */}
            <circle r="3" fill="#0d9488" />
            {/* Diameter */}
            <line x1={-CIRCLE_RADIUS} y1="0" x2={CIRCLE_RADIUS} y2="0" stroke="#7c3aed" strokeWidth="2" />
            <text x="0" y="-6" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">d</text>
            {/* Marker dot */}
            <circle cx="0" cy={CIRCLE_RADIUS} r="5" fill="#dc2626" />
          </motion.g>
        </g>

        {/* Unrolled line */}
        <motion.line
          x1={circleStartX}
          y1={lineY}
          x2={circleStartX}
          y2={lineY}
          stroke="#0d9488"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ x2: circleStartX + LINE_LENGTH }}
          transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Moving marker */}
        <motion.circle
          cx={circleStartX}
          cy={lineY}
          r="5"
          fill="#dc2626"
          animate={{ cx: circleStartX + LINE_LENGTH }}
          transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Pi label */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <text
            x={circleStartX + LINE_LENGTH / 2}
            y={lineY + 25}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#0d9488"
          >
            = π × d
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

function AreaAnimation() {
  const centerX = 170;
  const centerY = 75;
  const radius = 50;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2"
      >
        Área = πr²
      </motion.p>

      <svg viewBox="0 0 340 150" className="w-full max-w-xs">
        {/* Grid background */}
        <defs>
          <pattern id="gridAreaPreview" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d1d5db" strokeWidth="0.5" className="dark:stroke-gray-700" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="340" height="150" fill="url(#gridAreaPreview)" />

        {/* Circle that fills up */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="#c4b5fd"
          className="dark:fill-purple-700/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Circle outline */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="3"
        />

        {/* Center point */}
        <circle cx={centerX} cy={centerY} r="4" fill="#7c3aed" />

        {/* Radius line */}
        <motion.line
          x1={centerX}
          y1={centerY}
          x2={centerX + radius}
          y2={centerY}
          stroke="#dc2626"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />

        {/* Radius label */}
        <motion.text
          x={centerX + radius / 2}
          y={centerY - 8}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#dc2626"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          r
        </motion.text>

        {/* Formula appears */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <text
            x={centerX}
            y={centerY + radius + 25}
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#7c3aed"
          >
            A = π × r × r
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
