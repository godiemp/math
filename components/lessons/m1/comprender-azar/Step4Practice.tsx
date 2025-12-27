'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import FrequencySimulator from './FrequencySimulator';

type Phase = 'simulator' | 'questions' | 'complete';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'Si lanzamos un dado 30 veces y el 6 sale 8 veces, ¿cual es la frecuencia relativa de obtener 6?',
    options: ['6/30 = 20%', '8/30 ≈ 26.7%', '8/6 ≈ 133%', '30/8 = 375%'],
    correctAnswer: 1,
    explanation: 'La frecuencia relativa es: veces que ocurrio / total de intentos = 8/30 ≈ 0.267 = 26.7%',
  },
  {
    id: 'q2',
    question: 'Con 100 lanzamientos de moneda, obtuviste 55 caras. ¿Que esperarias si aumentas a 10,000 lanzamientos?',
    options: [
      'Exactamente 5,500 caras',
      'Cerca del 50% (aproximadamente 5,000 caras)',
      'Imposible predecir',
      'Siempre mas caras que sellos',
    ],
    correctAnswer: 1,
    explanation: 'Por la Ley de los Grandes Numeros, la frecuencia relativa converge al 50% teorico con mas intentos.',
  },
  {
    id: 'q3',
    question: '¿Por que con pocas muestras la frecuencia relativa puede estar muy lejos de la probabilidad teorica?',
    options: [
      'Porque hay trampa',
      'Por la variabilidad natural del azar',
      'Porque la probabilidad esta mal calculada',
      'Porque el dado esta cargado',
    ],
    correctAnswer: 1,
    explanation: 'El azar tiene variabilidad natural. Con pocos intentos, los resultados pueden variar mucho. Solo con muchos intentos se estabiliza.',
  },
];

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('simulator');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [simulatorComplete, setSimulatorComplete] = useState(false);

  if (!isActive) return null;

  const question = QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctAnswer;

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === question.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      setPhase('complete');
    }
  };

  // ============ SIMULATOR PHASE ============
  if (phase === 'simulator') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Laboratorio de Frecuencias
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Experimenta con la Ley de los Grandes Numeros
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Usa el simulador para ver como la frecuencia relativa se acerca a la probabilidad teorica
              cuando aumentas el numero de ensayos. Prueba con <strong>10, 100 y 1000 ensayos</strong>.
            </p>
          </div>
        </div>

        <FrequencySimulator
          probability={0.5}
          trialSteps={[10, 50, 100, 500, 1000]}
          showTargetLine={true}
          eventLabel="Cara"
          eventEmoji="🪙"
          onConvergenceReached={() => setSimulatorComplete(true)}
        />

        <AnimatePresence>
          {simulatorComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700"
            >
              <p className="text-green-800 dark:text-green-200 text-center">
                ¡Observaste la Ley de los Grandes Numeros en accion! La frecuencia se acerco al 50%.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('questions')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Continuar a preguntas</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ QUESTIONS PHASE ============
  if (phase === 'questions') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Laboratorio de Frecuencias
          </h2>
          <div className="flex justify-center gap-2 mt-2">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  i === currentQuestion
                    ? 'bg-purple-500 text-white scale-110'
                    : i < currentQuestion
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {i < currentQuestion ? <Check size={16} /> : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && setSelectedAnswer(index)}
                disabled={showFeedback}
                className={cn(
                  'w-full p-4 rounded-xl font-medium transition-all text-left flex items-center gap-3',
                  showFeedback && index === question.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900/50 border-2 border-green-500 text-green-800 dark:text-green-200'
                    : showFeedback && selectedAnswer === index && index !== question.correctAnswer
                    ? 'bg-red-100 dark:bg-red-900/50 border-2 border-red-500 text-red-800 dark:text-red-200'
                    : selectedAnswer === index
                    ? 'bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-500 text-purple-800 dark:text-purple-200'
                    : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                )}
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 text-sm font-bold flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
                {showFeedback && index === question.correctAnswer && (
                  <Check className="ml-auto text-green-500" size={20} />
                )}
                {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
                  <X className="ml-auto text-red-500" size={20} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Hint toggle */}
        {!showFeedback && (
          <div className="text-center">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-amber-600 dark:text-amber-400 text-sm hover:underline"
            >
              {showHint ? 'Ocultar pista' : '¿Necesitas una pista?'}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 border border-amber-200 dark:border-amber-700"
                >
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    {currentQuestion === 0 && 'Recuerda: frecuencia relativa = eventos favorables / total de intentos'}
                    {currentQuestion === 1 && 'Piensa en lo que dice la Ley de los Grandes Numeros sobre muchos intentos.'}
                    {currentQuestion === 2 && 'El azar tiene variabilidad natural. ¿Que pasa con pocos datos?'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'p-4 rounded-xl border-2',
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
                  <h4 className={cn(
                    'font-bold mb-1',
                    isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                  )}>
                    {isCorrect ? '¡Correcto!' : '¡Casi!'}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action button */}
        <div className="flex justify-center">
          {!showFeedback ? (
            <button
              onClick={handleAnswerSubmit}
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
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>{currentQuestion < QUESTIONS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ COMPLETE PHASE ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Laboratorio de Frecuencias
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resultados de la practica
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">
          {correctCount === QUESTIONS.length ? '🏆' : correctCount >= 2 ? '👍' : '💪'}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {correctCount === QUESTIONS.length
            ? '¡Perfecto!'
            : correctCount >= 2
            ? '¡Muy bien!'
            : '¡Sigue practicando!'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Respondiste correctamente <strong>{correctCount}</strong> de <strong>{QUESTIONS.length}</strong> preguntas
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-center">
          Ahora veremos aplicaciones del azar en el <strong>mundo real</strong>.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
