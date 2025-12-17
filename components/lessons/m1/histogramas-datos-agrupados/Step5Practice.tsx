'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  context: string;
  question: string;
  histogram?: {
    intervals: string[];
    frequencies: number[];
    colors: string[];
  };
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'p1',
    context: 'Se midio el peso (en kg) de 40 estudiantes y se organizaron en un histograma.',
    question: 'Segun el histograma, ¿cuantos estudiantes pesan entre 60 y 70 kg?',
    histogram: {
      intervals: ['40-50', '50-60', '60-70', '70-80', '80-90'],
      frequencies: [5, 12, 15, 6, 2],
      colors: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'],
    },
    options: ['12', '15', '6', '40'],
    correctAnswer: 1,
    hint: 'Busca la barra correspondiente al intervalo [60, 70) y lee su altura.',
    explanation:
      'La barra del intervalo 60-70 tiene altura 15, lo que significa que 15 estudiantes pesan entre 60 y 70 kg.',
  },
  {
    id: 'p2',
    context: 'Los siguientes datos representan las edades de 30 personas en un evento:',
    question:
      'Si los intervalos son [15, 20), [20, 25), [25, 30), [30, 35), ¿cual es la amplitud de cada intervalo?',
    options: ['3', '4', '5', '10'],
    correctAnswer: 2,
    hint: 'Recuerda: Amplitud = limite superior - limite inferior.',
    explanation: 'Amplitud = 20 - 15 = 5. Todos los intervalos tienen la misma amplitud de 5 años.',
  },
  {
    id: 'p3',
    context:
      'Un histograma muestra las notas de un examen con los siguientes intervalos: [1, 2), [2, 3), [3, 4), [4, 5), [5, 6), [6, 7).',
    question: '¿Cual es la marca de clase del intervalo [4, 5)?',
    options: ['4', '4.5', '5', '9'],
    correctAnswer: 1,
    hint: 'Marca de clase = (limite inferior + limite superior) / 2',
    explanation: 'Marca de clase = (4 + 5) / 2 = 9 / 2 = 4.5',
  },
  {
    id: 'p4',
    context: 'Observa el siguiente histograma de tiempos de espera en una fila (en minutos):',
    question: '¿Cuantas personas esperaron menos de 10 minutos?',
    histogram: {
      intervals: ['0-5', '5-10', '10-15', '15-20'],
      frequencies: [8, 14, 10, 3],
      colors: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'],
    },
    options: ['8', '14', '22', '35'],
    correctAnswer: 2,
    hint: 'Suma las frecuencias de los intervalos [0, 5) y [5, 10).',
    explanation:
      'Los intervalos [0, 5) y [5, 10) representan tiempos menores a 10 min. Total = 8 + 14 = 22 personas.',
  },
  {
    id: 'p5',
    context:
      'En un histograma de estaturas, el intervalo [170, 175) tiene frecuencia 18 y es el mas alto.',
    question: '¿Que puedes concluir sobre la distribucion de estaturas?',
    options: [
      'La mayoria mide menos de 170 cm',
      'La mayoria mide entre 170 y 175 cm',
      'La mayoria mide mas de 175 cm',
      'No hay un patron claro',
    ],
    correctAnswer: 1,
    hint: 'La barra mas alta indica el intervalo con mayor frecuencia.',
    explanation:
      'El intervalo [170, 175) tiene la mayor frecuencia (18), lo que significa que la mayoria de las personas mide entre 170 y 175 cm.',
  },
];

const REQUIRED_CORRECT = 3;

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (!isActive) return null;

  const question = QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === question.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === QUESTIONS.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setCorrectCount(0);
    setIsComplete(false);
  };

  const passed = correctCount >= REQUIRED_CORRECT;

  // ============ RESULTS SCREEN ============
  if (isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
              passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
            )}
          >
            {passed ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <RotateCcw className="w-5 h-5 text-amber-600" />
            )}
            <span
              className={cn(
                'font-medium',
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed ? '¡Practica completada!' : 'Sigue practicando'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Resultados de Practica
          </h2>
        </div>

        {/* Score display */}
        <div
          className={cn(
            'rounded-xl p-6 text-center',
            passed
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
          )}
        >
          <div className="text-5xl font-bold mb-2">
            <span className={passed ? 'text-green-600' : 'text-amber-600'}>{correctCount}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-gray-600 dark:text-gray-400">{QUESTIONS.length}</span>
          </div>
          <p
            className={cn(
              'text-sm',
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}
          >
            {passed
              ? '¡Excelente trabajo! Estas listo para el checkpoint.'
              : `Necesitas al menos ${REQUIRED_CORRECT} correctas para continuar.`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          {!passed && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              <RotateCcw size={18} />
              <span>Reintentar</span>
            </button>
          )}
          <button
            onClick={passed ? onComplete : handleRetry}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>{passed ? 'Continuar al Checkpoint' : 'Reintentar'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ QUESTION SCREEN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Practica Guiada</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica lo que aprendiste sobre histogramas
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length}
        </div>
        <div className="flex gap-1">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                i === currentQuestion
                  ? 'bg-blue-500 scale-125'
                  : i < currentQuestion
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        {/* Context */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{question.context}</p>

        {/* Histogram visual if exists */}
        {question.histogram && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="h-32 flex items-end justify-around gap-1 border-b-2 border-l-2 border-gray-300 dark:border-gray-600 p-2">
              {question.histogram.intervals.map((_, idx) => {
                const maxFreq = Math.max(...question.histogram!.frequencies);
                const heightPercent = (question.histogram!.frequencies[idx] / maxFreq) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 h-full">
                    <div className="flex-1 w-full flex flex-col justify-end">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1 text-center">
                        {question.histogram!.frequencies[idx]}
                      </span>
                      <div
                        className="w-full rounded-t transition-all"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: question.histogram!.colors[idx],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-around gap-1 mt-2">
              {question.histogram.intervals.map((interval) => (
                <span
                  key={interval}
                  className="text-xs text-gray-500 dark:text-gray-400 text-center flex-1"
                >
                  {interval}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Question */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {question.question}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-center font-medium transition-all border-2',
                  !showFeedback && 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300',
                  !showFeedback && !isSelected && 'border-gray-200 dark:border-gray-700',
                  isSelected && !showFeedback && 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
                  showFeedback &&
                    isSelected &&
                    isCorrectOption &&
                    'border-green-500 bg-green-50 dark:bg-green-900/30',
                  showFeedback &&
                    isSelected &&
                    !isCorrectOption &&
                    'border-red-500 bg-red-50 dark:bg-red-900/30',
                  showFeedback &&
                    !isSelected &&
                    isCorrectOption &&
                    'border-green-500 bg-green-50/50 dark:bg-green-900/20',
                  showFeedback && !isSelected && !isCorrectOption && 'opacity-50'
                )}
              >
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Hint button */}
        {!showFeedback && !showHint && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
            >
              <Lightbulb size={16} />
              <span>Ver pista</span>
            </button>
          </div>
        )}

        {/* Hint display */}
        {showHint && !showFeedback && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-700 animate-fadeIn">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-300">{question.hint}</p>
            </div>
          </div>
        )}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p
                className={cn(
                  'font-semibold mb-1',
                  isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                )}
              >
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p
                className={cn(
                  'text-sm',
                  isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                )}
              >
                {question.explanation}
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
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>
              {currentQuestion === QUESTIONS.length - 1 ? 'Ver Resultados' : 'Siguiente'}
            </span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
