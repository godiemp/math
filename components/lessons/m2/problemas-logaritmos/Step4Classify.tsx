'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';

interface Problem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'Un terremoto de magnitud 8.0 vs 6.0. ¿Qué escala usas?',
    options: ['Decibeles', 'pH', 'Richter', 'Ninguna'],
    correctAnswer: 2,
    explanation: 'La escala Richter mide la magnitud de terremotos. 2 puntos = 100× más amplitud.',
  },
  {
    id: 'p2',
    question: 'El vinagre tiene pH 3 y el agua pH 7. ¿Cuántas veces más ácido es el vinagre?',
    options: ['4 veces', '40 veces', '400 veces', '10.000 veces'],
    correctAnswer: 3,
    explanation: 'Diferencia de 4 puntos en pH = 10⁴ = 10.000 veces más concentración de H⁺.',
  },
  {
    id: 'p3',
    question: 'Un sonido de 80 dB vs 50 dB. ¿Cuántas veces más intenso?',
    options: ['3 veces', '30 veces', '300 veces', '1000 veces'],
    correctAnswer: 3,
    explanation: '30 dB de diferencia. Cada 10 dB = 10×, entonces 10³ = 1000 veces más intenso.',
  },
  {
    id: 'p4',
    question: '¿Qué fórmula tiene el signo negativo?',
    options: ['Richter', 'Decibeles', 'pH', 'Ninguna'],
    correctAnswer: 2,
    explanation: 'pH = -log₁₀[H⁺]. El signo negativo hace que valores más bajos = más ácido.',
  },
  {
    id: 'p5',
    question: 'Si log₁₀(x) = 5, entonces x es:',
    options: ['50', '500', '5000', '100.000'],
    correctAnswer: 3,
    explanation: 'log₁₀(x) = 5 significa que 10⁵ = x, entonces x = 100.000.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);

  if (!isActive) return null;

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedAnswer === problem.correctAnswer;
  const isComplete = completedProblems.length === PROBLEMS.length;

  const handleCheck = () => {
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    setCompletedProblems([...completedProblems, problem.id]);
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Clasificación completada!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Obtuviste {correctCount} de {PROBLEMS.length} correctas
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
          <p className="text-center text-green-700 dark:text-green-300 font-semibold mb-4">
            Recuerda las escalas:
          </p>
          <div className="space-y-2 text-sm">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center gap-2">
              <span className="text-xl">🌋</span>
              <span className="font-semibold">Richter:</span>
              <span className="text-gray-600 dark:text-gray-400">Terremotos (1 punto = 10×)</span>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center gap-2">
              <span className="text-xl">🔊</span>
              <span className="font-semibold">Decibeles:</span>
              <span className="text-gray-600 dark:text-gray-400">Sonido (10 dB = 10×)</span>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center gap-2">
              <span className="text-xl">🧪</span>
              <span className="font-semibold">pH:</span>
              <span className="text-gray-600 dark:text-gray-400">Acidez (1 punto = 10×)</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Continuar a practicar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PROBLEM SCREEN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Contexto
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Qué escala o fórmula corresponde?
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {PROBLEMS.map((p, i) => (
          <div
            key={p.id}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all',
              completedProblems.includes(p.id)
                ? 'bg-green-500 text-white'
                : i === currentProblem
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            )}
          >
            {completedProblems.includes(p.id) ? '✓' : i + 1}
          </div>
        ))}
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
        <p className="text-lg text-center text-gray-800 dark:text-gray-200">
          {problem.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {problem.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && setSelectedAnswer(index)}
            disabled={showFeedback}
            className={cn(
              'p-4 rounded-xl border-2 font-medium transition-all',
              showFeedback
                ? index === problem.correctAnswer
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : index === selectedAnswer
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-400'
                : selectedAnswer === index
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 text-gray-700 dark:text-gray-300'
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
          isCorrect
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-amber-100 dark:bg-amber-900/30'
        )}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            )}
            <div>
              <p className={cn(
                'font-semibold',
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}>
                {isCorrect ? '¡Correcto!' : '¡Casi!'}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {problem.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <button
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Siguiente</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
