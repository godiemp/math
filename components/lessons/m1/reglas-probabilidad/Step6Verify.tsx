'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Trophy, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps, VerifyQuestion } from '@/lib/lessons/types';

const REQUIRED_CORRECT = 5;

const QUESTIONS: VerifyQuestion[] = [
  {
    id: 'v1',
    question: 'Si P(A) = 0.7, ¿cuál es P(no A)?',
    type: 'multiple-choice',
    options: ['0.7', '0.3', '1.7', '0.0'],
    correctAnswer: 1,
    explanation: 'P(A\') = 1 - P(A) = 1 - 0.7 = 0.3',
  },
  {
    id: 'v2',
    question: 'Una bolsa tiene 5 rojas, 4 azules, 3 verdes. ¿Cuál es P(roja O verde)?',
    type: 'multiple-choice',
    options: ['5/12', '8/12', '3/12', '15/12'],
    correctAnswer: 1,
    explanation: 'Son excluyentes: P = 5/12 + 3/12 = 8/12 = 2/3',
  },
  {
    id: 'v3',
    question: 'En una clase: 15 estudian matemáticas, 10 estudian ciencias, 5 estudian ambas. Si hay 20 estudiantes, ¿cuántos estudian al menos una?',
    type: 'multiple-choice',
    options: ['25', '20', '15', '30'],
    correctAnswer: 1,
    explanation: 'Usando la regla: 15 + 10 - 5 = 20 estudiantes',
  },
  {
    id: 'v4',
    question: 'Al lanzar un dado, ¿cuál es P(número > 3 O número par)?',
    type: 'multiple-choice',
    options: ['3/6', '4/6', '5/6', '6/6'],
    correctAnswer: 2,
    explanation: 'P(>3) = 3/6, P(par) = 3/6, P(ambos) = 2/6. Total = 3/6 + 3/6 - 2/6 = 4/6... pero cuidado: también el 4 y 6 son >3 Y pares. Los eventos son: >3 = {4,5,6}, par = {2,4,6}. Unión = {2,4,5,6} = 4 elementos. Pero usando fórmula: P(>3 o par) = 3/6 + 3/6 - 2/6 = 4/6... Hmm, corrijamos: >3 son {4,5,6}, pares son {2,4,6}, intersección {4,6}. P = 3/6 + 3/6 - 2/6 = 4/6. Union directa: {2,4,5,6} = 4/6. Pero las opciones... La respuesta debe ser 5/6 porque {2,4,5,6} + mirando de nuevo: si queremos P(>3 O par), los favorables son {2,4,5,6} = 4 elementos. Pero si dice 5/6, entonces serían {1,2,4,5,6} o hay error. Revisemos: >3 = {4,5,6}, par = {2,4,6}. Union = {2} ∪ {4,5,6} = {2,4,5,6}. Son 4/6 = 2/3. Ajustemos la pregunta a algo que de 5/6.',
  },
  {
    id: 'v5',
    question: 'De una baraja de 52 cartas, ¿cuál es P(Reina O Diamante)?',
    type: 'multiple-choice',
    options: ['17/52', '16/52', '13/52', '4/52'],
    correctAnswer: 1,
    explanation: 'P = 4/52 + 13/52 - 1/52 = 16/52 (la Reina de Diamantes está en ambos)',
  },
  {
    id: 'v6',
    question: '¿Cuál afirmación es VERDADERA?',
    type: 'multiple-choice',
    options: [
      'P(A o B) siempre es P(A) + P(B)',
      'P(A o B) = P(A) + P(B) - P(A y B) siempre funciona',
      'P(A\') = P(A)',
      'Eventos excluyentes siempre tienen P = 0',
    ],
    correctAnswer: 1,
    explanation: 'La fórmula general siempre funciona. Para eventos excluyentes, P(A y B) = 0, así que se reduce a la suma simple.',
  },
];

// Fix question 4 to have cleaner numbers
QUESTIONS[3] = {
  id: 'v4',
  question: 'Al lanzar un dado, ¿cuál es P(número ≤ 4 O número par)?',
  type: 'multiple-choice',
  options: ['4/6', '5/6', '3/6', '6/6'],
  correctAnswer: 1,
  explanation: 'P(≤4) = 4/6, P(par) = 3/6, P(ambos: 2,4) = 2/6. Total = 4/6 + 3/6 - 2/6 = 5/6. Unión: {1,2,3,4,6} = 5 elementos.',
};

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  if (!isActive) return null;

  const question = QUESTIONS[currentQuestion];
  const correctAnswer = question.correctAnswer as number;
  const isCorrect = selectedAnswer === correctAnswer;
  const correctCount = answers.filter((a) => a === true).length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const passed = correctCount >= REQUIRED_CORRECT;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = isCorrect;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion === QUESTIONS.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setIsComplete(false);
  };

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Checkpoint Completado
          </h2>
        </div>

        <div
          className={cn(
            'rounded-xl p-8 text-center',
            passed
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700'
              : 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700'
          )}
        >
          {passed ? (
            <>
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                ¡Excelente!
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Has respondido correctamente <strong>{correctCount}</strong> de {QUESTIONS.length} preguntas.
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm">
                Has demostrado que dominas las reglas de probabilidad.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤔</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                ¡Casi lo logras!
              </h3>
              <p className="text-amber-700 dark:text-amber-300 mb-4">
                Has respondido correctamente <strong>{correctCount}</strong> de {QUESTIONS.length} preguntas.
                <br />
                Necesitas {REQUIRED_CORRECT} para aprobar.
              </p>
              <p className="text-amber-600 dark:text-amber-400 text-sm">
                No te preocupes, puedes intentarlo de nuevo.
              </p>
            </>
          )}
        </div>

        {/* Results breakdown */}
        <div className="flex justify-center gap-2">
          {answers.map((answer, i) => (
            <div
              key={i}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                answer === true
                  ? 'bg-green-500 text-white'
                  : answer === false
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              )}
            >
              {answer === true ? <Check size={20} /> : answer === false ? <X size={20} /> : i + 1}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {!passed && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all"
            >
              <RotateCcw size={20} />
              <span>Intentar de nuevo</span>
            </button>
          )}
          <button
            onClick={onComplete}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              passed
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            )}
          >
            <span>{passed ? '¡Completar lección!' : 'Continuar de todos modos'}</span>
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Checkpoint
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
              i < currentQuestion
                ? answers[i]
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : i === currentQuestion
                ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            )}
          >
            {i < currentQuestion ? (
              answers[i] ? <Check size={16} /> : <X size={16} />
            ) : (
              i + 1
            )}
          </div>
        ))}
      </div>

      {/* Score tracker */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Correctas: {correctCount} / {answeredCount} (necesitas {REQUIRED_CORRECT}/{QUESTIONS.length})
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <p className="text-lg font-semibold text-gray-900 dark:text-white text-center">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isThisCorrect = index === correctAnswer;

          return (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'w-full p-4 rounded-xl font-medium transition-all border-2 text-left',
                showFeedback
                  ? isThisCorrect
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : isSelected
                    ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-50'
                  : isSelected
                  ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400'
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                  showFeedback
                    ? isThisCorrect
                      ? 'bg-green-500 text-white'
                      : isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    : isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                )}>
                  {showFeedback && isThisCorrect ? (
                    <Check size={16} />
                  ) : showFeedback && isSelected ? (
                    <X size={16} />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl border animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
            )}
            <div>
              <p className={cn(
                'font-semibold mb-1',
                isCorrect ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'
              )}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action button */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
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
            <span>{currentQuestion === QUESTIONS.length - 1 ? 'Ver resultados' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
