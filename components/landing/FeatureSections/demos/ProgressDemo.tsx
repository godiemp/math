'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

type Phase = 'bars' | 'skills' | 'prediction';
const PHASE_DURATION = 3000;

const TOPICS = [
  { label: 'Números', value: 85, color: '#22c55e' },
  { label: 'Álgebra', value: 72, color: '#f59e0b' },
  { label: 'Geometría', value: 90, color: '#22c55e' },
  { label: 'Probabilidad', value: 68, color: '#f59e0b' },
];

const SKILLS = [
  { name: 'Fracciones', status: 'mastered' },
  { name: 'Ecuaciones', status: 'learning' },
  { name: 'Porcentajes', status: 'mastered' },
  { name: 'Funciones', status: 'learning' },
  { name: 'Áreas', status: 'mastered' },
  { name: 'Probabilidad', status: 'notStarted' },
];

export function ProgressDemo() {
  const [phase, setPhase] = useState<Phase>('bars');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p === 'bars') return 'skills';
        if (p === 'skills') return 'prediction';
        return 'bars';
      });
    }, PHASE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <AnimatePresence mode="wait">
        {phase === 'bars' && <BarsPhase key="bars" />}
        {phase === 'skills' && <SkillsPhase key="skills" />}
        {phase === 'prediction' && <PredictionPhase key="prediction" />}
      </AnimatePresence>
    </div>
  );
}

function BarsPhase() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm font-semibold mb-4"
        style={{ color: 'var(--color-label-primary)' }}
      >
        Rendimiento por Tema
      </motion.p>

      <div className="w-full max-w-xs space-y-3">
        {TOPICS.map((topic, i) => (
          <div key={topic.label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span style={{ color: 'var(--color-label-primary)' }}>{topic.label}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                style={{ color: topic.color, fontWeight: 600 }}
              >
                {topic.value}%
              </motion.span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'var(--color-fill)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: topic.color }}
                initial={{ width: 0 }}
                animate={{ width: `${topic.value}%` }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsPhase() {
  const statusColors = {
    mastered: { bg: '#dcfce7', text: '#166534', label: '✓' },
    learning: { bg: '#fef3c7', text: '#92400e', label: '...' },
    notStarted: { bg: '#f3f4f6', text: '#6b7280', label: '○' },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm font-semibold mb-4"
        style={{ color: 'var(--color-label-primary)' }}
      >
        Habilidades Dominadas
      </motion.p>

      <div className="flex flex-wrap justify-center gap-2 max-w-xs">
        {SKILLS.map((skill, i) => {
          const colors = statusColors[skill.status as keyof typeof statusColors];
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1"
              style={{ background: colors.bg, color: colors.text }}
            >
              <span>{colors.label}</span>
              <span>{skill.name}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 flex items-center gap-4 text-xs"
        style={{ color: 'var(--color-label-secondary)' }}
      >
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" /> Dominado
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500" /> En progreso
        </span>
      </motion.div>
    </motion.div>
  );
}

function PredictionPhase() {
  const [score, setScore] = useState(0);
  const targetScore = 780;

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = targetScore / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetScore) {
        setScore(targetScore);
        clearInterval(timer);
      } else {
        setScore(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const progress = (score / 1000) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm font-semibold mb-4"
        style={{ color: 'var(--color-label-primary)' }}
      >
        Predicción PAES
      </motion.p>

      {/* Circular gauge */}
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--color-tint)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.51} 251`}
            initial={{ strokeDasharray: '0 251' }}
            animate={{ strokeDasharray: `${progress * 2.51} 251` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        {/* Score in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-bold"
            style={{ color: 'var(--color-tint)' }}
          >
            {score}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-label-secondary)' }}>
            puntos
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-3 flex items-center gap-1 text-sm"
        style={{ color: '#22c55e' }}
      >
        <TrendingUp size={16} />
        <span className="font-medium">+45 pts esta semana</span>
      </motion.div>
    </motion.div>
  );
}
