'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  question: string;
  context: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    context: 'En una bolsa hay 4 bolas rojas y 6 bolas azules. Se saca una bola, se anota el color y NO se devuelve.',
    question: '¿Cuál es P(azul en la 2da | roja en la 1ra)?',
    hint: 'Después de sacar una roja, quedan 9 bolas: 3 rojas y 6 azules.',
    options: ['6/10', '6/9', '5/9', '4/9'],
    correctAnswer: 1,
    explanation: 'Después de sacar una roja, quedan 9 bolas (3 rojas + 6 azules). P(azul | roja₁) = 6/9 = 2/3.',
  },
  {
    id: 'p2',
    context: 'P(A) = 0.4, P(B) = 0.5, y P(A ∩ B) = 0.2',
    question: '¿Cuál es P(A | B)?',
    hint: 'Usa la fórmula: P(A | B) = P(A ∩ B) / P(B)',
    options: ['0.2', '0.4', '0.5', '0.8'],
    correctAnswer: 1,
    explanation: 'P(A | B) = P(A ∩ B) / P(B) = 0.2 / 0.5 = 0.4',
  },
  {
    id: 'p3',
    context: 'Se lanza un dado justo y una moneda justa.',
    question: '¿Cuál es P(cara Y número par)?',
    hint: 'Los eventos son independientes. P(cara) = 1/2, P(par) = 3/6 = 1/2',
    options: ['1/12', '1/6', '1/4', '1/2'],
    correctAnswer: 2,
    explanation: 'Como son independientes: P(cara ∩ par) = P(cara) × P(par) = 1/2 × 1/2 = 1/4',
  },
  {
    id: 'p4',
    context: 'En un curso, 60% de los estudiantes aprobaron matemáticas (M) y 70% aprobaron lenguaje (L). El 50% aprobó ambas materias.',
    question: '¿Son independientes aprobar M y aprobar L?',
    hint: 'Compara P(M | L) con P(M). Si son iguales, son independientes.',
    options: ['Sí, porque 0.6 × 0.7 = 0.42', 'Sí, porque P(M|L) = P(M)', 'No, porque P(M|L) ≠ P(M)', 'No, porque 0.5 ≠ 0'],
    correctAnswer: 2,
    explanation: 'P(M | L) = 0.5/0.7 ≈ 0.71 ≠ 0.6 = P(M). Como P(M|L) ≠ P(M), NO son independientes.',
  },
  {
    id: 'p5',
    context: 'Una urna tiene 3 bolas verdes y 2 amarillas. Se sacan 2 bolas SIN reposición.',
    question: '¿Cuál es P(ambas verdes)?',
    hint: 'Usa P(V₁ ∩ V₂) = P(V₁) × P(V₂ | V₁). Después de sacar una verde, quedan 2 verdes de 4 bolas.',
    options: ['9/25', '6/20', '3/10', '1/5'],
    correctAnswer: 1,
    explanation: 'P(V₁) = 3/5, P(V₂ | V₁) = 2/4. P(ambas verdes) = 3/5 × 2/4 = 6/20 = 3/10. La opción 6/20 es correcta.',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(PROBLEMS.length).fill(null));

  const isComplete = currentIndex >= PROBLEMS.length;
  const currentProblem = isComplete ? PROBLEMS[0] : PROBLEMS[currentIndex];
  const isCorrect = selectedAnswer === currentProblem.correctAnswer;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    if (isCorrect) setCorrectCount(prev => prev + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setShowHint(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setCorrectCount(0);
    setAnswers(Array(PROBLEMS.length).fill(null));
  };

  if (!isActive) return null;

  // ============ ACTIVE PRACTICE ============
  if (!isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica Guiada
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Aplica las fórmulas aprendidas
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Problema {currentIndex + 1} de {PROBLEMS.length}
          </div>
          <div className="flex gap-1">
            {PROBLEMS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  answers[i] !== null
                    ? answers[i] === PROBLEMS[i].correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : i === currentIndex
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {answers[i] !== null ? (answers[i] === PROBLEMS[i].correctAnswer ? '✓' : '✗') : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Problem card */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
          {/* Context */}
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 mb-4">
            <p className="text-gray-700 dark:text-gray-300">
              {currentProblem.context}
            </p>
          </div>

          {/* Question */}
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {currentProblem.question}
            </p>
          </div>

          {/* Hint button */}
          {!showFeedback && (
            <div className="text-center mb-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 mx-auto text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400"
              >
                <Lightbulb size={16} />
                <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
              </button>
            </div>
          )}

          {showHint && !showFeedback && (
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mb-4 animate-fadeIn border border-amber-200 dark:border-amber-700">
              <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                {currentProblem.hint}
              </p>
            </div>
          )}

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {currentProblem.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl font-medium transition-all border-2 text-center',
                  selectedAnswer === index
                    ? showFeedback
                      ? index === currentProblem.correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                      : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500'
                    : showFeedback && index === currentProblem.correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-blue-400'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  {showFeedback && index === currentProblem.correctAnswer && (
                    <Check size={18} className="text-green-600" />
                  )}
                  {showFeedback && selectedAnswer === index && index !== currentProblem.correctAnswer && (
                    <X size={18} className="text-red-600" />
                  )}
                  <span className="font-mono text-lg text-gray-800 dark:text-gray-200">{option}</span>
                </div>
              </button>
            ))}
          </div>
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
              {isCorrect ? <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" /> : <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />}
              <div>
                <h4 className={cn('font-bold mb-1', isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300')}>
                  {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{currentProblem.explanation}</p>
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
              Verificar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>{currentIndex < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ RESULTS SCREEN ============
  const passed = correctCount >= 3;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resultados de Práctica
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Probabilidad condicional e independencia
        </p>
      </div>

      {/* Score card */}
      <div className={cn(
        'rounded-2xl p-8 text-center',
        passed
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700'
          : 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700'
      )}>
        <div className={cn(
          'text-6xl font-bold mb-2',
          passed ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
        )}>
          {correctCount}/{PROBLEMS.length}
        </div>
        <p className={cn(
          'text-lg font-semibold',
          passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
        )}>
          {passed ? '¡Muy bien!' : 'Sigue practicando'}
        </p>
        {!passed && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Necesitas 3 de 5 correctas para avanzar
          </p>
        )}
      </div>

      {/* Results summary */}
      <div className="space-y-2">
        {PROBLEMS.map((problem, i) => {
          const wasCorrect = answers[i] === problem.correctAnswer;
          return (
            <div
              key={problem.id}
              className={cn(
                'p-3 rounded-lg flex items-start gap-3',
                wasCorrect
                  ? 'bg-green-50 dark:bg-green-900/20'
                  : 'bg-red-50 dark:bg-red-900/20'
              )}
            >
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                wasCorrect ? 'bg-green-500' : 'bg-red-500'
              )}>
                {wasCorrect ? <Check size={14} className="text-white" /> : <X size={14} className="text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{problem.question}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Respuesta correcta: <span className="font-mono font-semibold">{problem.options[problem.correctAnswer]}</span>
                </p>
              </div>
            </div>
          );
        })}
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
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          Continuar al Checkpoint
        </button>
      </div>
    </div>
  );
}
