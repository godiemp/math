'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, ArrowRight, Flame, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  problem: string;
  type: 'direct' | 'inverse';
  given: string;
  find: string;
  options: string[];
  correctIndex: number;
  hint: string;
  solution: string;
}

const PROBLEMS: Problem[] = [
  {
    problem: '3 kilos de manzanas cuestan $6.000. ¿Cuánto cuestan 5 kilos?',
    type: 'direct',
    given: '3 kg → $6.000',
    find: '5 kg → ?',
    options: ['$8.000', '$10.000', '$12.000', '$15.000'],
    correctIndex: 1,
    hint: 'Es proporción directa: más kilos = más precio. Calcula primero el precio por kilo.',
    solution: 'k = 6000 ÷ 3 = 2000 $/kg. Precio = 2000 × 5 = $10.000',
  },
  {
    problem: '4 trabajadores terminan una obra en 12 días. ¿Cuántos días tardan 6 trabajadores?',
    type: 'inverse',
    given: '4 trabajadores → 12 días',
    find: '6 trabajadores → ?',
    options: ['6 días', '8 días', '10 días', '18 días'],
    correctIndex: 1,
    hint: 'Es proporción inversa: más trabajadores = menos días. El producto se mantiene constante.',
    solution: 'k = 4 × 12 = 48. Días = 48 ÷ 6 = 8 días',
  },
  {
    problem: 'Un auto viaja a 60 km/h durante 2 horas. ¿Qué distancia recorre a 80 km/h en 3 horas?',
    type: 'direct',
    given: 'Distancia = velocidad × tiempo',
    find: '80 km/h × 3 h = ?',
    options: ['180 km', '200 km', '240 km', '300 km'],
    correctIndex: 2,
    hint: 'La distancia es directamente proporcional al tiempo cuando la velocidad es constante.',
    solution: 'Distancia = 80 × 3 = 240 km',
  },
  {
    problem: 'Un grifo llena un tanque en 6 horas. ¿Cuánto tardan 3 grifos iguales?',
    type: 'inverse',
    given: '1 grifo → 6 horas',
    find: '3 grifos → ?',
    options: ['1 hora', '2 horas', '3 horas', '18 horas'],
    correctIndex: 1,
    hint: 'Es proporción inversa: más grifos = menos tiempo.',
    solution: 'k = 1 × 6 = 6. Tiempo = 6 ÷ 3 = 2 horas',
  },
  {
    problem: 'Si 5 metros de tela cuestan $15.000, ¿cuánto cuestan 8 metros?',
    type: 'direct',
    given: '5 m → $15.000',
    find: '8 m → ?',
    options: ['$18.000', '$20.000', '$24.000', '$30.000'],
    correctIndex: 2,
    hint: 'Es proporción directa: más tela = más precio.',
    solution: 'k = 15000 ÷ 5 = 3000 $/m. Precio = 3000 × 8 = $24.000',
  },
  {
    problem: 'Un auto recorre 240 km en 4 horas. ¿Cuánto tarda a 80 km/h?',
    type: 'inverse',
    given: 'Velocidad inicial = 240/4 = 60 km/h',
    find: '80 km/h → ?',
    options: ['2 horas', '3 horas', '4 horas', '5 horas'],
    correctIndex: 1,
    hint: 'Para la misma distancia: más velocidad = menos tiempo.',
    solution: 'k = 240 km (distancia constante). Tiempo = 240 ÷ 80 = 3 horas',
  },
];

const REQUIRED_CORRECT = 4;

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  const problem = PROBLEMS[currentProblem];
  const correctCount = answers.filter(a => a).length;
  const passed = correctCount >= REQUIRED_CORRECT;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === problem.correctIndex;
    setShowFeedback(true);
    setAnswers(prev => [...prev, isCorrect]);

    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setAnswers([]);
    setIsComplete(false);
    setStreak(0);
  };

  const isCorrect = selectedAnswer === problem?.correctIndex;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Necesitas {REQUIRED_CORRECT} de {PROBLEMS.length} correctas para avanzar
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress and streak */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {PROBLEMS.length}
            </div>
            {streak >= 3 && (
              <div className="flex items-center gap-1 text-orange-500 animate-pulse">
                <Flame size={20} />
                <span className="font-bold">{streak} racha</span>
              </div>
            )}
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    i < answers.length
                      ? answers[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Problem text */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-4">
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
                {problem.problem}
              </p>
            </div>

            {/* Type indicator and given/find */}
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <div className={cn(
                'px-3 py-1 rounded-full text-sm font-semibold',
                problem.type === 'direct'
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                  : 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
              )}>
                {problem.type === 'direct' ? '↗ Directa' : '↘ Inversa'}
              </div>
            </div>

            <div className="text-center mb-4 text-sm">
              <p className="text-gray-500 dark:text-gray-400">
                <strong>Datos:</strong> {problem.given}
              </p>
              <p className="text-purple-600 dark:text-purple-400 font-semibold">
                <strong>Buscar:</strong> {problem.find}
              </p>
            </div>

            {/* Hint button */}
            {!showFeedback && !showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-2 mx-auto mb-4 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800/30 transition-colors"
              >
                <Lightbulb size={16} />
                <span>Ver pista</span>
              </button>
            )}

            {/* Hint */}
            {showHint && !showFeedback && (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-4 animate-fadeIn">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <Lightbulb className="inline mr-2" size={16} />
                  {problem.hint}
                </p>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-bold text-lg transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === problem.correctIndex
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : showFeedback && index === problem.correctIndex
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl animate-fadeIn',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className={cn('font-bold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-mono">
                      {problem.solution}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Check/Next button */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              passed
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            {passed ? (
              <Check className="w-20 h-20 mx-auto text-green-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Felicitaciones!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>

            <p
              className={cn(
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed
                ? 'Has demostrado que puedes resolver problemas de proporciones'
                : `Necesitas ${REQUIRED_CORRECT} respuestas correctas. ¡Puedes intentarlo de nuevo!`}
            </p>
          </div>

          {/* Action buttons */}
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
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
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
