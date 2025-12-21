'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Zap } from 'lucide-react';

type Phase = 'zen' | 'rapidfire';
const PHASE_DURATION = 4000;

export function PracticeModesDemo() {
  const [phase, setPhase] = useState<Phase>('zen');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === 'zen' ? 'rapidfire' : 'zen'));
    }, PHASE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        {phase === 'zen' ? (
          <ZenPhase key="zen" />
        ) : (
          <RapidFirePhase key="rapidfire" />
        )}
      </AnimatePresence>
    </div>
  );
}

function ZenPhase() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <div className="text-4xl mb-2">🧘</div>
        <h3 className="text-xl font-bold text-white mb-1">Modo Zen</h3>
        <p className="text-sm text-white/90">A tu ritmo, sin presión</p>
      </motion.div>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center h-24">
        <motion.div
          className="absolute rounded-full bg-white/20"
          style={{
            width: '80px',
            height: '80px',
            boxShadow: '0 0 40px rgba(255,255,255,0.4)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full bg-white/30"
          style={{
            width: '50px',
            height: '50px',
            boxShadow: '0 0 20px rgba(255,255,255,0.5)',
          }}
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.7, 0.5, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full bg-white/40"
          style={{
            width: '24px',
            height: '24px',
            boxShadow: '0 0 10px rgba(255,255,255,0.6)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 space-y-2"
      >
        {['Sin límite de tiempo', 'Tutor AI disponible', 'Aprende a tu ritmo'].map((text, i) => (
          <div key={i} className="flex items-center gap-2 text-white/90 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span>{text}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function RapidFirePhase() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 600);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-4"
      >
        <div className="text-4xl mb-2 animate-pulse">
          <Zap className="inline" size={40} color="white" fill="white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">Rapid Fire</h3>
        <p className="text-sm text-white/90">¡Prepárate!</p>
      </motion.div>

      {/* Countdown or GO */}
      <div className="h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {countdown > 0 ? (
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-7xl font-black text-white"
              style={{
                textShadow: '0 0 40px rgba(255,255,255,0.5)',
              }}
            >
              {countdown}
            </motion.div>
          ) : (
            <motion.div
              key="go"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-yellow-300"
              style={{
                textShadow: '0 0 40px rgba(253,224,71,0.8)',
              }}
            >
              ¡GO!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lives and timer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-6 mt-4"
      >
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((i) => (
            <Heart key={i} size={16} className="text-red-400" fill="#f87171" />
          ))}
        </div>
        <div className="flex items-center gap-1 text-white/90 text-sm">
          <Clock size={14} />
          <span>1:00</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
