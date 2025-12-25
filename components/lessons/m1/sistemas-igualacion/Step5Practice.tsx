'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: number;
  context: string;
  system: string[];
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    context: 'Resuelve usando el método de igualación.',
    system: ['y = x + 3', 'y = 2x - 1'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(2, 5)', '(4, 7)', '(3, 6)', '(5, 8)'],
    correctAnswer: 1,
    hint: 'Iguala las expresiones: x + 3 = 2x - 1.',
    explanation: 'Igualando: x + 3 = 2x - 1 → 4 = x. Luego y = 4 + 3 = 7. Solución: (4, 7).',
  },
  {
    id: 2,
    context: 'Resuelve usando el método de igualación.',
    system: ['y = 3x', 'y = x + 8'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(2, 6)', '(3, 9)', '(4, 12)', '(5, 15)'],
    correctAnswer: 2,
    hint: 'Iguala: 3x = x + 8 y despeja x.',
    explanation: 'Igualando: 3x = x + 8 → 2x = 8 → x = 4. Luego y = 3(4) = 12. Solución: (4, 12).',
  },
  {
    id: 3,
    context: 'Resuelve usando el método de igualación.',
    system: ['x + y = 10', 'x - y = 4'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(6, 4)', '(7, 3)', '(8, 2)', '(5, 5)'],
    correctAnswer: 1,
    hint: 'Despeja x de ambas: x = 10 - y, x = y + 4. Luego iguala.',
    explanation: 'Despejando x: 10 - y = y + 4 → 6 = 2y → y = 3. Luego x = 3 + 4 = 7. Solución: (7, 3).',
  },
  {
    id: 4,
    context: 'Resuelve usando el método de igualación.',
    system: ['2x + y = 9', 'x + y = 6'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(2, 4)', '(3, 3)', '(4, 2)', '(1, 5)'],
    correctAnswer: 1,
    hint: 'Despeja y de ambas: y = 9 - 2x, y = 6 - x. Iguala las expresiones.',
    explanation: 'Despejando y: 9 - 2x = 6 - x → 3 = x. Luego y = 6 - 3 = 3. Solución: (3, 3).',
  },
  {
    id: 5,
    context: 'Resuelve usando el método de igualación.',
    system: ['y = -x + 5', 'y = 2x - 1'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(1, 4)', '(2, 3)', '(3, 2)', '(4, 1)'],
    correctAnswer: 1,
    hint: 'Iguala: -x + 5 = 2x - 1.',
    explanation: 'Igualando: -x + 5 = 2x - 1 → 6 = 3x → x = 2. Luego y = -2 + 5 = 3. Solución: (2, 3).',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = QUESTIONS[currentQuestion];
  const isComplete = answers.length === QUESTIONS.length;
  const passed = score >= 3;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, isCorrect]);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setScore(0);
    setAnswers([]);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica de Igualación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resuelve los sistemas usando el método de igualación
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentQuestion + 1} de {QUESTIONS.length}
            </div>
            <div className="flex gap-1">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    i < answers.length
                      ? answers[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentQuestion
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Context */}
            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl p-4 mb-4 border border-cyan-200 dark:border-cyan-700">
              <p className="text-gray-700 dark:text-gray-300">{question.context}</p>
            </div>

            {/* System display */}
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sistema de ecuaciones:</p>
              <div className="inline-flex flex-col gap-1 bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-lg">
                {question.system.map((eq, i) => (
                  <span key={i} className="font-mono text-lg text-gray-800 dark:text-gray-200">{eq}</span>
                ))}
              </div>
            </div>

            {/* Question */}
            <p className="text-center text-gray-800 dark:text-gray-200 font-semibold mb-4">
              {question.question}
            </p>

            {/* Hint button */}
            {!showHint && !showFeedback && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                >
                  <Lightbulb size={16} />
                  <span>Ver pista</span>
                </button>
              </div>
            )}

            {/* Hint display */}
            {showHint && !showFeedback && (
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 mb-4 border border-cyan-200 dark:border-cyan-700 animate-fadeIn">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{question.hint}</p>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl text-center font-mono font-semibold transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === question.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-cyan-100 dark:bg-cyan-900/50 border-cyan-500 text-cyan-800 dark:text-cyan-200'
                      : showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-cyan-400 dark:hover:border-cyan-500'
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    {showFeedback && index === question.correctAnswer && (
                      <Check size={16} className="text-green-500" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
                      <X size={16} className="text-red-500" />
                    )}
                    <span className="text-gray-800 dark:text-gray-200">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={cn(
                'mt-6 p-4 rounded-xl animate-fadeIn',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                  : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
              )}>
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={cn(
                      'font-bold mb-1',
                      isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                    )}>
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : currentQuestion < QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg"
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => setAnswers([...answers])}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg"
              >
                <span>Ver resultados</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className={cn(
            'rounded-2xl p-8 text-center',
            passed
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
              : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
          )}>
            <div className="text-6xl mb-4">
              {passed ? '🏆' : '💪'}
            </div>

            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Muy bien!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {score} / {QUESTIONS.length}
            </div>

            <p className={cn(
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Dominas el método de igualación.'
                : 'Necesitas 3 respuestas correctas. ¡Inténtalo de nuevo!'}
            </p>
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
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Continuar al Checkpoint</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
