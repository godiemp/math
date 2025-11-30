'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { Celebration } from '@/components/lessons/shared';

interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'ordering';
  options?: string[];
  correctAnswer: number | number[];
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'Ordena de menor a mayor: 2, -5, 0, -1, 4',
    type: 'ordering',
    options: ['-5, -1, 0, 2, 4', '-1, -5, 0, 2, 4', '0, -1, -5, 2, 4', '-5, 0, -1, 2, 4'],
    correctAnswer: 0,
    explanation: 'En orden: -5 (más pequeño), -1, 0, 2, 4 (más grande). Recuerda que los negativos más grandes en valor absoluto son los más pequeños.',
  },
  {
    id: 'q2',
    question: '¿Cuál es mayor: -7 o -3?',
    type: 'multiple-choice',
    options: ['-7', '-3', 'Son iguales'],
    correctAnswer: 1,
    explanation: '-3 es mayor que -7. Aunque 7 > 3 en valor absoluto, -3 está más a la derecha en la recta numérica.',
  },
  {
    id: 'q3',
    question: 'Calcula: |-8|',
    type: 'multiple-choice',
    options: ['-8', '8', '0'],
    correctAnswer: 1,
    explanation: '|-8| = 8. El valor absoluto es la distancia al cero, siempre positiva o cero.',
  },
  {
    id: 'q4',
    question: 'Si |x| = 5, ¿cuáles son los valores posibles de x?',
    type: 'multiple-choice',
    options: ['Solo 5', 'Solo -5', '5 y -5', '0'],
    correctAnswer: 2,
    explanation: 'x puede ser 5 o -5, porque ambos están a 5 pasos del cero.',
  },
];

const REQUIRED_CORRECT = 3;

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const correctCount = answers.filter((a, i) => a === QUESTIONS[i].correctAnswer).length;
  const passed = correctCount >= REQUIRED_CORRECT;

  const handleSelect = (optionIndex: number) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
      if (passed) {
        setShowCelebration(true);
      }
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowFeedback(false);
    setIsComplete(false);
    setShowCelebration(false);
  };

  const handleCelebrationContinue = () => {
    setShowCelebration(false);
    onComplete();
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Checkpoint Final
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Demuestra lo que aprendiste. Necesitas {REQUIRED_CORRECT} de {QUESTIONS.length} correctas.
        </p>
      </div>

      {!isComplete ? (
        <>
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
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    answers[i] !== null
                      ? answers[i] === QUESTIONS[i].correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentQuestion
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (
                    answers[i] === QUESTIONS[i].correctAnswer ? '✓' : '✗'
                  ) : (
                    i + 1
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'w-full p-4 rounded-xl text-left font-medium transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === question.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                      : showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      selectedAnswer === index
                        ? showFeedback
                          ? index === question.correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    )}>
                      {showFeedback && index === question.correctAnswer ? (
                        <Check size={16} />
                      ) : showFeedback && selectedAnswer === index && index !== question.correctAnswer ? (
                        <X size={16} />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
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
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                {currentQuestion < QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
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
              {passed ? '¡Felicitaciones!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {QUESTIONS.length}
            </div>

            <p className={cn(
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Has completado la lección exitosamente'
                : `Necesitas ${REQUIRED_CORRECT} respuestas correctas. ¡Puedes intentarlo de nuevo!`}
            </p>
          </div>

          {/* Answer summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="space-y-2">
              {QUESTIONS.map((q, i) => (
                <div
                  key={q.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg',
                    answers[i] === q.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30'
                      : 'bg-red-50 dark:bg-red-900/30'
                  )}
                >
                  {answers[i] === q.correctAnswer ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {q.question}
                  </span>
                </div>
              ))}
            </div>
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
                onClick={() => setShowCelebration(true)}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                Completar Lección
              </button>
            )}
          </div>
        </div>
      )}

      {/* Celebration modal */}
      {showCelebration && (
        <Celebration
          title="¡Lección Completada!"
          message="Has demostrado que entiendes los números enteros, el orden y el valor absoluto. ¡Excelente trabajo!"
          onContinue={handleCelebrationContinue}
          continueLabel="Finalizar"
        />
      )}
    </div>
  );
}
