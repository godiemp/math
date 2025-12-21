'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Award } from 'lucide-react';

type Phase = 'problem' | 'correct' | 'next';
const PHASE_DURATIONS = { problem: 1500, correct: 1200, next: 800 };

const PROBLEMS = [
  { expression: '12 + 8', answer: '20', color: '#22c55e', op: '+' },
  { expression: '45 − 17', answer: '28', color: '#3b82f6', op: '−' },
  { expression: '7 × 6', answer: '42', color: '#8b5cf6', op: '×' },
  { expression: '56 ÷ 8', answer: '7', color: '#f59e0b', op: '÷' },
];

export function OperationsDemo() {
  const [problemIndex, setProblemIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('problem');
  const [inputValue, setInputValue] = useState('');
  const [correctCount, setCorrectCount] = useState(0);

  const problem = PROBLEMS[problemIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === 'problem') {
      // Simulate typing the answer
      timer = setTimeout(() => {
        setInputValue(problem.answer);
        setTimeout(() => {
          setPhase('correct');
          setCorrectCount((c) => c + 1);
        }, 400);
      }, PHASE_DURATIONS.problem);
    } else if (phase === 'correct') {
      timer = setTimeout(() => {
        setPhase('next');
      }, PHASE_DURATIONS.correct);
    } else if (phase === 'next') {
      timer = setTimeout(() => {
        setProblemIndex((i) => (i + 1) % PROBLEMS.length);
        setPhase('problem');
        setInputValue('');
        if (problemIndex === PROBLEMS.length - 1) {
          setCorrectCount(0);
        }
      }, PHASE_DURATIONS.next);
    }

    return () => clearTimeout(timer);
  }, [phase, problem.answer, problemIndex]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-separator)' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="px-2 py-1 rounded-full text-xs font-medium text-white"
            style={{ background: problem.color }}
          >
            Nivel {problemIndex + 1}
          </div>
        </div>
        <div className="text-xs" style={{ color: 'var(--color-label-secondary)' }}>
          {problemIndex + 1} / {PROBLEMS.length}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {phase !== 'next' ? (
            <motion.div
              key={`problem-${problemIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              {/* Problem */}
              <motion.div
                className="mb-6 px-6 py-4 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)' }}
              >
                <p className="text-xs mb-2" style={{ color: 'var(--color-label-secondary)' }}>
                  Resuelve la operación
                </p>
                <div
                  className="text-3xl font-bold"
                  style={{ color: 'var(--color-label-primary)' }}
                >
                  {problem.expression} = <span style={{ color: problem.color }}>?</span>
                </div>
              </motion.div>

              {/* Input */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <motion.div
                  className="w-20 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
                  style={{
                    background: 'white',
                    border: `2px solid ${phase === 'correct' ? '#22c55e' : 'var(--color-separator)'}`,
                    color: phase === 'correct' ? '#22c55e' : 'var(--color-label-primary)',
                  }}
                  animate={{
                    borderColor: phase === 'correct' ? '#22c55e' : 'var(--color-separator)',
                  }}
                >
                  {inputValue || '|'}
                </motion.div>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {phase === 'correct' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: '#dcfce7', color: '#166534' }}
                  >
                    <Check size={16} />
                    <span className="text-sm font-medium">¡Correcto!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="level-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Award size={40} className="mx-auto mb-2" style={{ color: '#f59e0b' }} />
              </motion.div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-label-primary)' }}>
                ¡Nivel completado!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer stats */}
      <div
        className="px-4 py-3 flex items-center justify-center gap-6"
        style={{ borderTop: '1px solid var(--color-separator)', background: 'white' }}
      >
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: '#22c55e' }}>
            {correctCount}
          </div>
          <div className="text-xs" style={{ color: 'var(--color-label-secondary)' }}>
            correctas
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: 'var(--color-tint)' }}>
            100%
          </div>
          <div className="text-xs" style={{ color: 'var(--color-label-secondary)' }}>
            precisión
          </div>
        </div>
      </div>
    </div>
  );
}
