'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, Trophy } from 'lucide-react';

type Phase = 'lobby' | 'active' | 'results';
const PHASE_DURATION = 3000;

const PARTICIPANTS = [
  { name: 'María', color: '#f43f5e' },
  { name: 'Juan', color: '#3b82f6' },
  { name: 'Sofía', color: '#22c55e' },
  { name: 'Pedro', color: '#f59e0b' },
  { name: 'Ana', color: '#8b5cf6' },
];

const RANKINGS = [
  { name: 'María', score: 9, time: '8:42' },
  { name: 'Tú', score: 8, time: '9:15', isYou: true },
  { name: 'Juan', score: 7, time: '9:30' },
];

export function LivePracticeDemo() {
  const [phase, setPhase] = useState<Phase>('lobby');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p === 'lobby') return 'active';
        if (p === 'active') return 'results';
        return 'lobby';
      });
    }, PHASE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30">
      <AnimatePresence mode="wait">
        {phase === 'lobby' && <LobbyPhase key="lobby" />}
        {phase === 'active' && <ActivePhase key="active" />}
        {phase === 'results' && <ResultsPhase key="results" />}
      </AnimatePresence>
    </div>
  );
}

function LobbyPhase() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < PARTICIPANTS.length) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <div className="text-3xl mb-2">📚</div>
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-label-primary)' }}>
          Ensayo en Vivo
        </h3>
        <p className="text-xs" style={{ color: 'var(--color-label-secondary)' }}>
          Esperando participantes...
        </p>
      </motion.div>

      {/* Avatars */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {PARTICIPANTS.slice(0, visibleCount).map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ background: p.color }}
          >
            {p.name[0]}
          </motion.div>
        ))}
      </div>

      {/* Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
        style={{ background: 'var(--color-fill)', color: 'var(--color-label-secondary)' }}
      >
        <Users size={14} />
        <span>{visibleCount} de 10 conectados</span>
      </motion.div>
    </motion.div>
  );
}

function ActivePhase() {
  const [progress, setProgress] = useState([30, 45, 60]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => p.map((v) => Math.min(100, v + Math.random() * 15)));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      {/* Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
        style={{ background: 'var(--color-tint)', color: 'white' }}
      >
        <Clock size={16} />
        <span className="font-bold">8:42</span>
      </motion.div>

      {/* Question preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-xs p-3 rounded-lg mb-4"
        style={{ background: 'var(--color-surface)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-label-primary)' }}>
          Pregunta 5 de 10
        </p>
        <p className="text-sm" style={{ color: 'var(--color-label-secondary)' }}>
          Si x² + 2x - 3 = 0, ¿cuál es el valor de x?
        </p>
      </motion.div>

      {/* Race progress */}
      <div className="w-full max-w-xs space-y-2">
        {['Tú', 'María', 'Juan'].map((name, i) => (
          <div key={name} className="flex items-center gap-2">
            <span
              className="text-xs w-12 truncate"
              style={{
                color: i === 0 ? 'var(--color-tint)' : 'var(--color-label-secondary)',
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {name}
            </span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-fill)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: i === 0 ? 'var(--color-tint)' : PARTICIPANTS[i]?.color || '#9ca3af' }}
                animate={{ width: `${progress[i]}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ResultsPhase() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-4xl mb-2"
      >
        🎉
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-semibold mb-4"
        style={{ color: 'var(--color-label-primary)' }}
      >
        ¡Ensayo Completado!
      </motion.h3>

      {/* Rankings */}
      <div className="w-full max-w-xs space-y-2">
        {RANKINGS.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg"
            style={{
              background: r.isYou ? 'var(--color-tint)' : 'var(--color-surface)',
              color: r.isYou ? 'white' : 'var(--color-label-primary)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {i === 0 ? (
                <Trophy size={16} className="text-yellow-500" style={{ color: r.isYou ? 'white' : '#eab308' }} />
              ) : (
                <span className="text-sm font-bold" style={{ opacity: 0.6 }}>
                  {i + 1}
                </span>
              )}
            </div>
            <span className="flex-1 text-sm font-medium">{r.name}</span>
            <span className="text-sm font-bold">{r.score}/10</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
