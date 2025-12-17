'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Lightbulb, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: number;
  question: string;
  data: number[];
  type: 'range' | 'variance' | 'stddev';
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    question: 'Calcula el RANGO de estos datos',
    data: [12, 18, 15, 22, 8],
    type: 'range',
    options: ['10', '14', '22', '30'],
    correctIndex: 1,
    hint: 'Rango = Maximo - Minimo. ¿Cual es el valor mas alto y el mas bajo?',
    explanation: 'Rango = 22 - 8 = 14. El maximo es 22 y el minimo es 8.',
  },
  {
    id: 2,
    question: 'Si la media es 10 y un dato es 14, ¿cual es la desviacion de ese dato?',
    data: [14],
    type: 'range',
    options: ['-4', '4', '24', '196'],
    correctIndex: 1,
    hint: 'Desviacion = Dato - Media',
    explanation: 'Desviacion = 14 - 10 = 4. El dato esta 4 unidades por encima de la media.',
  },
  {
    id: 3,
    question: 'Calcula el RANGO de las edades (en años)',
    data: [25, 30, 28, 35, 22],
    type: 'range',
    options: ['10', '13', '15', '28'],
    correctIndex: 1,
    hint: 'Identifica el mayor (35) y el menor (22), luego resta.',
    explanation: 'Rango = 35 - 22 = 13 años.',
  },
  {
    id: 4,
    question: 'Si la varianza es 16, ¿cual es la desviacion estandar?',
    data: [],
    type: 'stddev',
    options: ['2', '4', '8', '256'],
    correctIndex: 1,
    hint: 'La desviacion estandar es la raiz cuadrada de la varianza.',
    explanation: 'σ = √16 = 4. La desviacion estandar es la raiz de la varianza.',
  },
  {
    id: 5,
    question: 'Datos: 2, 4, 6, 8, 10 (Media = 6). ¿Cual es la suma de las desviaciones al cuadrado?',
    data: [2, 4, 6, 8, 10],
    type: 'variance',
    options: ['20', '30', '40', '50'],
    correctIndex: 2,
    hint: 'Calcula (2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)²',
    explanation: '(-4)² + (-2)² + 0² + 2² + 4² = 16 + 4 + 0 + 4 + 16 = 40',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  if (!isActive) return null;

  const currentQuestion = QUESTIONS[currentIndex];
  const isCorrect = selectedOption === currentQuestion.correctIndex;
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleAnswer = () => {
    setHasAnswered(true);
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setShowHint(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setShowHint(false);
    setCorrectCount(0);
    setShowResults(false);
  };

  // Results screen
  if (showResults) {
    const passed = correctCount >= 3;

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
            passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
          )}>
            {passed ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  ¡Muy bien!
                </span>
              </>
            ) : (
              <>
                <RotateCcw className="w-5 h-5 text-amber-600" />
                <span className="text-amber-700 dark:text-amber-300 font-medium">
                  Sigue practicando
                </span>
              </>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Resultado: {correctCount}/{QUESTIONS.length}
          </h2>
        </div>

        {/* Score visualization */}
        <div className="flex justify-center gap-2">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                i < correctCount
                  ? 'bg-green-500 text-white'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-500'
              )}
            >
              {i < correctCount ? <Check size={20} /> : <X size={20} />}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            <strong>Recuerda:</strong><br />
            Rango = Max - Min<br />
            Varianza = Promedio de (x - x̄)²<br />
            Desviacion Estandar = √Varianza
          </p>
        </div>

        <div className="flex justify-center">
          {passed ? (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Continuar al checkpoint</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <RotateCcw size={20} />
              <span>Intentar de nuevo</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            Practica {currentIndex + 1} de {QUESTIONS.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 text-center mb-4">
          {currentQuestion.question}
        </h3>

        {/* Data display */}
        {currentQuestion.data.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {currentQuestion.data.map((d, i) => (
              <span
                key={i}
                className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg font-mono text-lg font-bold text-blue-600"
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hint button */}
      {!hasAnswered && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 px-4 py-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-all"
          >
            <Lightbulb size={18} />
            <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
          </button>
        </div>
      )}

      {/* Hint */}
      {showHint && !hasAnswered && (
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 dark:text-amber-200">{currentQuestion.hint}</p>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectOption = index === currentQuestion.correctIndex;

          return (
            <button
              key={index}
              onClick={() => !hasAnswered && setSelectedOption(index)}
              disabled={hasAnswered}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-center font-mono text-lg font-bold',
                hasAnswered
                  ? isCorrectOption
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : isSelected
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      : 'border-gray-200 dark:border-gray-700 opacity-50'
                  : isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              )}
            >
              {option}
              {hasAnswered && isCorrectOption && (
                <Check className="inline-block ml-2 text-green-600" size={20} />
              )}
              {hasAnswered && isSelected && !isCorrectOption && (
                <X className="inline-block ml-2 text-red-600" size={20} />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {hasAnswered && (
        <div className={cn(
          'rounded-xl p-4 animate-fadeIn',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
            : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
        )}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div>
              <p className={cn(
                'font-semibold',
                isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
              )}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className={cn(
                'text-sm mt-1',
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              )}>
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center">
        {!hasAnswered ? (
          <button
            onClick={handleAnswer}
            disabled={selectedOption === null}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg',
              selectedOption !== null
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <span>Verificar</span>
            <Check size={20} />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>{currentIndex < QUESTIONS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
