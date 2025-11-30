'use client';

import { useState } from 'react';
import { ArrowRight, ArrowDown, Check, X, RotateCcw, Trophy, Lightbulb, Equal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface TransformProblem {
  subtraction: string;
  addition: string;
  result: number;
  explanation: string;
  isDoubleNegative: boolean;
}

const PROBLEMS: TransformProblem[] = [
  {
    subtraction: '7 - 4',
    addition: '7 + (-4)',
    result: 3,
    explanation: 'Restar 4 es lo mismo que sumar -4',
    isDoubleNegative: false,
  },
  {
    subtraction: '3 - 8',
    addition: '3 + (-8)',
    result: -5,
    explanation: 'Restar 8 es lo mismo que sumar -8',
    isDoubleNegative: false,
  },
  {
    subtraction: '-2 - 5',
    addition: '-2 + (-5)',
    result: -7,
    explanation: 'Restar 5 es sumar -5, así que sumamos dos negativos',
    isDoubleNegative: false,
  },
  {
    subtraction: '6 - (-4)',
    addition: '6 + (+4)',
    result: 10,
    explanation: '¡Restar un negativo es sumar un positivo!',
    isDoubleNegative: true,
  },
  {
    subtraction: '-3 - (-7)',
    addition: '-3 + (+7)',
    result: 4,
    explanation: 'Doble negativo: restar -7 = sumar +7',
    isDoubleNegative: true,
  },
];

const REQUIRED_CORRECT = 4;

export default function Step4Subtraction({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<'intro' | 'practice' | 'results'>('intro');
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const problem = PROBLEMS[currentProblem];
  const passed = score >= REQUIRED_CORRECT;

  // Generate wrong answer options
  const generateOptions = (problem: TransformProblem): string[] => {
    const correct = problem.addition;
    const options = [correct];

    // Generate plausible wrong answers
    const parts = problem.subtraction.split(' - ');
    const a = parts[0];
    const b = parts[1];

    // Wrong: keep subtraction but change sign
    options.push(`${a} - (${b.startsWith('-') ? b.substring(1) : '-' + b})`);
    // Wrong: change to addition but wrong sign
    if (problem.isDoubleNegative) {
      options.push(`${a} + (${b})`); // Keep the negative instead of flipping
    } else {
      options.push(`${a} + (+${b.replace('-', '').replace('(', '').replace(')', '')})`);
    }
    // Wrong: flip sign of a
    options.push(`${a.startsWith('-') ? a.substring(1) : '-' + a} + (${b.startsWith('-') ? '+' + b.substring(1) : '-' + b})`);

    // Shuffle and take 4
    return options.slice(0, 4).sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState<string[]>([]);

  const startPractice = () => {
    setPhase('practice');
    setOptions(generateOptions(PROBLEMS[0]));
  };

  const handleSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;
    setShowFeedback(true);

    const isCorrect = selectedAnswer === problem.addition;
    setAnswers(prev => [...prev, isCorrect]);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setOptions(generateOptions(PROBLEMS[currentProblem + 1]));
    } else {
      setPhase('results');
    }
  };

  const handleReset = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnswers([]);
    setOptions(generateOptions(PROBLEMS[0]));
    setPhase('practice');
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resta = Sumar el Opuesto
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'intro' && 'Un truco que simplifica todo'}
          {phase === 'practice' && 'Transforma la resta en suma'}
          {phase === 'results' && 'Veamos cómo te fue'}
        </p>
      </div>

      {/* Phase: Introduction */}
      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Key insight */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200 mb-2">
                  El Gran Secreto
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Toda resta puede convertirse en una suma. Esto hace todo más fácil porque ya sabes sumar.
                </p>
              </div>
            </div>
          </div>

          {/* Visual demonstration */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Mira esto:
            </h4>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {/* Subtraction */}
              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-6 text-center">
                <p className="text-sm text-red-600 dark:text-red-400 mb-2">Resta</p>
                <p className="text-3xl font-bold font-mono text-gray-900 dark:text-white">
                  5 - 3
                </p>
              </div>

              {/* Equals */}
              <div className="flex flex-col items-center">
                <Equal className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">es igual a</span>
              </div>

              {/* Addition */}
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 text-center">
                <p className="text-sm text-green-600 dark:text-green-400 mb-2">Suma</p>
                <p className="text-3xl font-bold font-mono text-gray-900 dark:text-white">
                  5 + (-3)
                </p>
              </div>

              {/* Result */}
              <div className="flex flex-col items-center">
                <Equal className="w-8 h-8 text-gray-400" />
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 text-center">
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">Resultado</p>
                <p className="text-3xl font-bold font-mono text-purple-600 dark:text-purple-400">
                  2
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Restar 3</strong> es exactamente lo mismo que <strong>sumar -3</strong>
              </p>
            </div>
          </div>

          {/* The Rule */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border-2 border-blue-300 dark:border-blue-700">
            <div className="text-center">
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">La regla:</p>
              <p className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
                a - b = a + (-b)
              </p>
              <p className="mt-3 text-blue-700 dark:text-blue-300 text-sm">
                Cambia el signo de resta por suma, y cambia el signo del número que restas.
              </p>
            </div>
          </div>

          {/* Double negative warning */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
              Caso especial: Doble negativo
            </h4>
            <div className="flex items-center gap-4 justify-center mb-3">
              <span className="text-xl font-mono font-bold">6 - (-4)</span>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <span className="text-xl font-mono font-bold">6 + (+4)</span>
              <span className="text-gray-400">=</span>
              <span className="text-xl font-mono font-bold text-green-600">10</span>
            </div>
            <p className="text-amber-700 dark:text-amber-300 text-sm text-center">
              ¡Restar un negativo es lo mismo que sumar un positivo!
              <br />
              (Los dos negativos se cancelan)
            </p>
          </div>

          {/* Start practice button */}
          <div className="flex justify-center">
            <button
              onClick={startPractice}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              Practicar transformaciones
            </button>
          </div>
        </div>
      )}

      {/* Phase: Practice */}
      {phase === 'practice' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {PROBLEMS.length}
            </div>
            <div className="flex gap-1">
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
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                  )}
                >
                  {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              Transforma esta resta en suma:
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl px-6 py-4">
                <p className="text-3xl font-bold font-mono text-gray-900 dark:text-white">
                  {problem.subtraction}
                </p>
              </div>
              <ArrowRight className="w-8 h-8 text-gray-400" />
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-6 py-4">
                <p className="text-3xl font-bold font-mono text-gray-400">
                  ?
                </p>
              </div>
            </div>

            {problem.isDoubleNegative && (
              <div className="mt-4 text-center">
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                  ¡Atención: Doble negativo!
                </span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl font-mono font-bold text-lg transition-all border-2',
                  showFeedback
                    ? option === problem.addition
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : selectedAnswer === option
                        ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-gray-100 dark:bg-gray-700 border-transparent text-gray-500'
                    : selectedAnswer === option
                      ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300'
                )}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={cn(
              'p-4 rounded-xl animate-fadeIn',
              selectedAnswer === problem.addition
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
            )}>
              <div className="flex items-start gap-3">
                {selectedAnswer === problem.addition ? (
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                )}
                <div>
                  <h4 className={cn(
                    'font-bold mb-1',
                    selectedAnswer === problem.addition
                      ? 'text-green-800 dark:text-green-300'
                      : 'text-amber-800 dark:text-amber-300'
                  )}>
                    {selectedAnswer === problem.addition ? '¡Correcto!' : 'Incorrecto'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {problem.explanation}
                  </p>
                  <p className="text-sm font-mono mt-2 text-gray-600 dark:text-gray-400">
                    {problem.subtraction} = {problem.addition} = {problem.result}
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
                disabled={!selectedAnswer}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
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
        </div>
      )}

      {/* Phase: Results */}
      {phase === 'results' && (
        <div className="space-y-6 animate-fadeIn">
          <div className={cn(
            'rounded-2xl p-8 text-center',
            passed
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
              : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
          )}>
            {passed ? (
              <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            ) : (
              <RotateCcw className="w-16 h-16 mx-auto text-amber-500 mb-4" />
            )}

            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Excelente!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {score} / {PROBLEMS.length}
            </div>

            <p className={cn(
              'text-sm',
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Ya dominas la transformación de resta a suma'
                : `Necesitas ${REQUIRED_CORRECT} para continuar`}
            </p>
          </div>

          {/* Key takeaway */}
          {passed && (
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3">
                Recuerda:
              </h4>
              <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                <p className="font-mono text-center text-lg">a - b = a + (-b)</p>
                <p className="text-center mt-2">
                  Y cuando tienes doble negativo: <strong>a - (-b) = a + b</strong>
                </p>
              </div>
            </div>
          )}

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
                <span>Continuar</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
