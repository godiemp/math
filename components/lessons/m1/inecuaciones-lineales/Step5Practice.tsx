'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { InlineMath } from '@/components/math/MathDisplay';

interface PracticeQuestion {
  id: string;
  context: string;
  inequality: string;
  inequalityLatex: string;
  options: string[];
  optionsLatex: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
  explanationLatex: string;
  isNegative: boolean;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'p1',
    context:
      'La tarjeta Bip tiene $15.000 de saldo. Cada viaje en Metro cuesta $800. ¿Cuántos viajes puede hacer sin que el saldo sea negativo?',
    inequality: '15.000 - 800x >= 0',
    inequalityLatex: '15000 - 800x \\geq 0',
    options: ['x <= 18', 'x <= 19', 'x >= 18', 'x >= 19'],
    optionsLatex: ['x \\leq 18', 'x \\leq 19', 'x \\geq 18', 'x \\geq 19'],
    correctAnswer: 0,
    hint: 'Reorganiza: -800x ≥ -15.000, recuerda la regla del negativo',
    explanation: '15.000 - 800x >= 0 → -800x >= -15.000 → x <= 18,75 → x <= 18 viajes',
    explanationLatex: '15000 - 800x \\geq 0 \\rightarrow -800x \\geq -15000 \\rightarrow x \\leq 18{,}75 \\rightarrow x \\leq 18 \\text{ viajes}',
    isNegative: true,
  },
  {
    id: 'p2',
    context:
      'Para aprobar el ramo, necesitas promedio de al menos 4,0. Tienes notas de 3,5 y 4,2. ¿Qué nota mínima necesitas en la tercera prueba?',
    inequality: '(3,5 + 4,2 + x) / 3 >= 4,0',
    inequalityLatex: '\\frac{3{,}5 + 4{,}2 + x}{3} \\geq 4{,}0',
    options: ['x >= 4,0', 'x >= 4,3', 'x >= 4,5', 'x >= 5,0'],
    optionsLatex: ['x \\geq 4{,}0', 'x \\geq 4{,}3', 'x \\geq 4{,}5', 'x \\geq 5{,}0'],
    correctAnswer: 1,
    hint: 'Multiplica ambos lados por 3, luego despeja x',
    explanation: '7,7 + x >= 12 → x >= 4,3',
    explanationLatex: '7{,}7 + x \\geq 12 \\rightarrow x \\geq 4{,}3',
    isNegative: false,
  },
  {
    id: 'p3',
    context:
      'Para la fiesta del curso tienes un presupuesto máximo de $50.000. El arriendo del salón cuesta $20.000. ¿Cuánto máximo puedes gastar por persona si van 15 personas?',
    inequality: '20.000 + 15x <= 50.000',
    inequalityLatex: '20000 + 15x \\leq 50000',
    options: ['x <= 1.500', 'x <= 2.000', 'x <= 2.500', 'x <= 3.000'],
    optionsLatex: ['x \\leq 1500', 'x \\leq 2000', 'x \\leq 2500', 'x \\leq 3000'],
    correctAnswer: 1,
    hint: 'Aísla 15x primero',
    explanation: '15x <= 30.000 → x <= 2.000',
    explanationLatex: '15x \\leq 30000 \\rightarrow x \\leq 2000',
    isNegative: false,
  },
  {
    id: 'p4',
    context:
      'Un refrigerador debe mantener la temperatura bajo 5°C. La temperatura actual es 8°C y baja 0,5°C cada minuto. ¿Cuántos minutos deben pasar como mínimo?',
    inequality: '8 - 0,5x < 5',
    inequalityLatex: '8 - 0{,}5x < 5',
    options: ['x > 5', 'x > 6', 'x < 6', 'x < 5'],
    optionsLatex: ['x > 5', 'x > 6', 'x < 6', 'x < 5'],
    correctAnswer: 1,
    hint: '-0,5x < -3, recuerda invertir',
    explanation: '-0,5x < -3 → x > 6 minutos',
    explanationLatex: '-0{,}5x < -3 \\rightarrow x > 6 \\text{ minutos}',
    isNegative: true,
  },
  {
    id: 'p5',
    context:
      'Para entrar a un juego de un parque de diversiones, debes tener al menos 12 años o tu edad más la de un acompañante mayor debe sumar más de 25. Si tienes 9 años, ¿qué edad mínima debe tener tu acompañante?',
    inequality: '9 + x > 25',
    inequalityLatex: '9 + x > 25',
    options: ['x > 14', 'x > 15', 'x > 16', 'x >= 17'],
    optionsLatex: ['x > 14', 'x > 15', 'x > 16', 'x \\geq 17'],
    correctAnswer: 2,
    hint: 'Despeja x directamente',
    explanation: '9 + x > 25 → x > 16',
    explanationLatex: '9 + x > 25 \\rightarrow x > 16',
    isNegative: false,
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctAnswer;
  const passed = correctCount >= 3;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === question.correctAnswer) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setShowHint(false);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setCorrectCount(0);
    setIsComplete(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Práctica Guiada</h2>
        <p className="text-gray-600 dark:text-gray-300">Resuelve problemas del mundo real con inecuaciones</p>
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
                    i < currentQuestion
                      ? 'bg-green-500 text-white'
                      : i === currentQuestion
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < currentQuestion ? <Check size={16} /> : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Context text */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-600">
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{question.context}</p>
            </div>

            {/* Warning for negative coefficient */}
            {question.isNegative && !showFeedback && (
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 mb-4 border border-amber-200 dark:border-amber-700">
                <p className="text-amber-700 dark:text-amber-300 text-sm text-center">
                  ⚠️ Tip: Esta inecuación tiene un coeficiente negativo
                </p>
              </div>
            )}

            {/* Inequality display */}
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Resuelve la inecuación:</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                <InlineMath latex={question.inequalityLatex} />
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
                <p className="text-sm text-amber-800 dark:text-amber-200 text-center">{question.hint}</p>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {question.optionsLatex.map((optionLatex, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl text-center font-medium transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === question.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-purple-300 dark:hover:border-purple-500'
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                        selectedAnswer === index
                          ? showFeedback
                            ? index === question.correctAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-purple-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      )}
                    >
                      {showFeedback && index === question.correctAnswer ? (
                        <Check size={16} />
                      ) : showFeedback && selectedAnswer === index && index !== question.correctAnswer ? (
                        <X size={16} />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className="text-lg text-gray-800 dark:text-gray-200">
                      <InlineMath latex={optionLatex} />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={cn(
                  'mt-6 p-4 rounded-xl animate-fadeIn',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4
                      className={cn(
                        'font-bold mb-1',
                        isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                      )}
                    >
                      {isCorrect ? '¡Correcto!' : '¡Casi!'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <InlineMath latex={question.explanationLatex} />
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
                <span>{currentQuestion < QUESTIONS.length - 1 ? 'Siguiente problema' : 'Ver resultados'}</span>
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
            <div className="text-6xl mb-4">{passed ? '' : ''}</div>
            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Muy bien!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {QUESTIONS.length}
            </div>

            <p className={cn(passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
              {passed ? 'Estás listo para el checkpoint final.' : `Necesitas al menos 3 correctas para continuar.`}
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
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <span>Ir al Checkpoint</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
