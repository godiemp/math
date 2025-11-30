'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Check, X, RotateCcw, Trophy, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  expression: string;
  result: number;
  type: 'addition' | 'subtraction' | 'double-negative' | 'combined';
  strategy: string;
}

// Mixed problems with increasing complexity
const PROBLEMS: Problem[] = [
  // Simple additions
  { expression: '-3 + 5', result: 2, type: 'addition', strategy: 'Signos diferentes: resta valores absolutos (5-3=2), signo del mayor (+)' },
  { expression: '4 + (-7)', result: -3, type: 'addition', strategy: 'Signos diferentes: resta valores absolutos (7-4=3), signo del mayor (-)' },
  { expression: '-6 + (-2)', result: -8, type: 'addition', strategy: 'Signos iguales: suma valores absolutos (6+2=8), mantén el signo (-)' },
  // Simple subtractions
  { expression: '5 - 9', result: -4, type: 'subtraction', strategy: '5 - 9 = 5 + (-9), luego: signos diferentes, el negativo gana' },
  { expression: '-4 - 3', result: -7, type: 'subtraction', strategy: '-4 - 3 = -4 + (-3), ambos negativos: suma y mantén signo' },
  // Double negatives
  { expression: '2 - (-5)', result: 7, type: 'double-negative', strategy: 'Doble negativo: 2 - (-5) = 2 + 5 = 7' },
  { expression: '-3 - (-8)', result: 5, type: 'double-negative', strategy: 'Doble negativo: -3 - (-8) = -3 + 8, signos diferentes' },
  // Combined/harder
  { expression: '-5 + 5', result: 0, type: 'addition', strategy: 'Opuestos se cancelan: -5 + 5 = 0' },
  { expression: '0 - 6', result: -6, type: 'subtraction', strategy: '0 - 6 = 0 + (-6) = -6' },
  { expression: '-1 - (-1)', result: 0, type: 'double-negative', strategy: '-1 - (-1) = -1 + 1 = 0 (opuestos)' },
];

const REQUIRED_CORRECT = 8;

export default function Step5Challenge({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedAnswer === problem?.result;
  const passed = score >= REQUIRED_CORRECT;

  // Generate answer options
  const generateOptions = useCallback((result: number): number[] => {
    const optionsSet = new Set<number>([result]);

    // Add plausible wrong answers based on common mistakes
    optionsSet.add(-result); // Sign error
    optionsSet.add(result + Math.abs(result) > 0 ? -2 : 2); // Off by 2
    optionsSet.add(result + (result > 0 ? 2 : -2)); // Off by 2 other direction

    // Ensure we have exactly 4 unique options
    while (optionsSet.size < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      if (offset !== 0) {
        optionsSet.add(result + offset);
      }
    }

    return Array.from(optionsSet).sort((a, b) => a - b);
  }, []);

  useEffect(() => {
    if (problem) {
      setOptions(generateOptions(problem.result));
    }
  }, [currentProblem, generateOptions, problem]);

  const handleSelect = (value: number) => {
    if (showFeedback) return;
    setSelectedAnswer(value);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);

    const correct = selectedAnswer === problem.result;
    setAnswers(prev => [...prev, correct]);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnswers([]);
    setIsComplete(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!isActive || showFeedback || isComplete) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const keyMap: Record<string, number> = {
        'a': 0, 'b': 1, 'c': 2, 'd': 3,
        '1': 0, '2': 1, '3': 2, '4': 3,
      };

      if (keyMap[e.key.toLowerCase()] !== undefined && options[keyMap[e.key.toLowerCase()]] !== undefined) {
        setSelectedAnswer(options[keyMap[e.key.toLowerCase()]]);
      }

      if (e.key === 'Enter' && selectedAnswer !== null && !showFeedback) {
        handleCheck();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, showFeedback, isComplete, options, selectedAnswer]);

  if (!isActive) return null;

  // Get type badge color
  const getTypeBadge = (type: Problem['type']) => {
    switch (type) {
      case 'addition':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', label: 'Suma' };
      case 'subtraction':
        return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Resta' };
      case 'double-negative':
        return { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Doble negativo' };
      case 'combined':
        return { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', label: 'Combinado' };
    }
  };

  const typeBadge = problem ? getTypeBadge(problem.type) : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            El Desafío de Operaciones
          </h2>
          <Zap className="w-6 h-6 text-yellow-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Pon a prueba todo lo que aprendiste
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                Problema {currentProblem + 1} de {PROBLEMS.length}
              </span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {score} correctas
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentProblem + 1) / PROBLEMS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Answer indicators */}
          <div className="flex justify-center gap-1 flex-wrap">
            {PROBLEMS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all',
                  i < answers.length
                    ? answers[i]
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : i === currentProblem
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
              </div>
            ))}
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            {/* Type badge */}
            {typeBadge && (
              <div className="flex justify-center mb-4">
                <span className={cn('px-3 py-1 rounded-full text-xs font-medium', typeBadge.bg, typeBadge.text)}>
                  {typeBadge.label}
                </span>
              </div>
            )}

            {/* Expression */}
            <div className="text-center mb-6">
              <p className="text-4xl md:text-5xl font-bold font-mono text-gray-900 dark:text-white">
                {problem.expression} = ?
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {options.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-bold text-2xl transition-all border-2 relative',
                    showFeedback
                      ? option === problem.result
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : selectedAnswer === option
                          ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                          : 'bg-gray-100 dark:bg-gray-700 border-transparent text-gray-400'
                      : selectedAnswer === option
                        ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200 scale-105'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  )}
                >
                  {option}
                  {/* Keyboard hint */}
                  <span className="absolute top-1 right-2 text-xs text-gray-400 font-normal">
                    {String.fromCharCode(65 + index)}
                  </span>
                </button>
              ))}
            </div>

            {/* Keyboard hint */}
            <p className="text-center text-xs text-gray-400 mt-3">
              Usa las teclas A, B, C, D o 1, 2, 3, 4 para responder rápido
            </p>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={cn(
              'p-4 rounded-xl animate-fadeIn',
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
            )}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                )}
                <div>
                  <h4 className={cn(
                    'font-bold mb-1',
                    isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                  )}>
                    {isCorrect ? '¡Correcto!' : `La respuesta es ${problem.result}`}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Estrategia:</strong> {problem.strategy}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar (Enter)
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>{currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div className={cn(
            'rounded-2xl p-8 text-center',
            passed
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
              : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
          )}>
            {passed ? (
              <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Desafío superado!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {score} / {PROBLEMS.length}
            </div>

            <p className={cn(
              'text-sm',
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Has demostrado dominio en sumas y restas de enteros'
                : `Necesitas ${REQUIRED_CORRECT} respuestas correctas para continuar`}
            </p>
          </div>

          {/* Performance breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Desglose por tipo:
            </h4>
            <div className="space-y-2">
              {['addition', 'subtraction', 'double-negative'].map(type => {
                const typeProblems = PROBLEMS.map((p, i) => ({ ...p, index: i })).filter(p => p.type === type);
                const typeCorrect = typeProblems.filter(p => answers[p.index]).length;
                const badge = getTypeBadge(type as Problem['type']);

                return (
                  <div key={type} className="flex items-center justify-between">
                    <span className={cn('px-2 py-1 rounded text-xs font-medium', badge?.bg, badge?.text)}>
                      {badge?.label}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {typeCorrect} / {typeProblems.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {!passed && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}

            {passed && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>Continuar al checkpoint</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
