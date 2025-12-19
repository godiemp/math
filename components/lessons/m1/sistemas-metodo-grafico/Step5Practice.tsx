'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface GraphQuestion {
  id: number;
  context: string;
  system: string[];
  graphData: {
    line1: { x1: number; y1: number; x2: number; y2: number; color: string };
    line2: { x1: number; y1: number; x2: number; y2: number; color: string };
    intersection?: { x: number; y: number };
    scale: number;
    xRange: [number, number];
    yRange: [number, number];
  };
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const QUESTIONS: GraphQuestion[] = [
  {
    id: 1,
    context: 'Observa el gráfico donde se representan dos ecuaciones lineales.',
    system: ['x + y = 6', 'x - y = 2'],
    graphData: {
      line1: { x1: 0, y1: 6, x2: 6, y2: 0, color: '#3B82F6' },
      line2: { x1: 0, y1: -2, x2: 6, y2: 4, color: '#10B981' },
      intersection: { x: 4, y: 2 },
      scale: 25,
      xRange: [0, 7],
      yRange: [-3, 7],
    },
    question: '¿Cuál es la solución del sistema según el gráfico?',
    options: ['(2, 4)', '(4, 2)', '(3, 3)', '(5, 1)'],
    correctAnswer: 1,
    hint: 'Busca el punto donde las dos rectas se cruzan y lee sus coordenadas (x, y).',
    explanation: 'Las rectas se intersectan en el punto (4, 2). Verificación: 4 + 2 = 6 ✓ y 4 - 2 = 2 ✓',
  },
  {
    id: 2,
    context: 'El gráfico muestra el sistema de ecuaciones de una tienda.',
    system: ['y = 2x', 'y = x + 3'],
    graphData: {
      line1: { x1: 0, y1: 0, x2: 5, y2: 10, color: '#3B82F6' },
      line2: { x1: 0, y1: 3, x2: 5, y2: 8, color: '#10B981' },
      intersection: { x: 3, y: 6 },
      scale: 20,
      xRange: [0, 6],
      yRange: [0, 11],
    },
    question: '¿En qué punto se cruzan las rectas?',
    options: ['(2, 4)', '(3, 6)', '(4, 8)', '(1, 2)'],
    correctAnswer: 1,
    hint: 'La recta azul pasa por el origen con pendiente 2. La verde corta en y = 3.',
    explanation: 'El punto de intersección es (3, 6). Verificación: y = 2(3) = 6 ✓ y y = 3 + 3 = 6 ✓',
  },
  {
    id: 3,
    context: 'Dos amigos comparan sus ahorros semanales representados en el gráfico.',
    system: ['y = -x + 8', 'y = x'],
    graphData: {
      line1: { x1: 0, y1: 8, x2: 8, y2: 0, color: '#3B82F6' },
      line2: { x1: 0, y1: 0, x2: 8, y2: 8, color: '#10B981' },
      intersection: { x: 4, y: 4 },
      scale: 22,
      xRange: [0, 9],
      yRange: [0, 9],
    },
    question: '¿Cuándo tienen la misma cantidad de dinero?',
    options: ['(2, 2)', '(3, 5)', '(4, 4)', '(5, 3)'],
    correctAnswer: 2,
    hint: 'La solución es donde ambos tienen igual cantidad, es decir, donde las rectas se cruzan.',
    explanation: 'Se cruzan en (4, 4), donde ambos tienen $4. Verificación: y = -4 + 8 = 4 ✓ y y = 4 ✓',
  },
  {
    id: 4,
    context: 'El gráfico representa los precios de dos planes de telefonía.',
    system: ['2x + y = 10', 'x + y = 7'],
    graphData: {
      line1: { x1: 0, y1: 10, x2: 5, y2: 0, color: '#3B82F6' },
      line2: { x1: 0, y1: 7, x2: 7, y2: 0, color: '#10B981' },
      intersection: { x: 3, y: 4 },
      scale: 25,
      xRange: [0, 8],
      yRange: [0, 11],
    },
    question: '¿Cuál es el punto de intersección?',
    options: ['(2, 6)', '(3, 4)', '(4, 2)', '(1, 8)'],
    correctAnswer: 1,
    hint: 'Lee cuidadosamente dónde se cruzan las dos líneas en el plano.',
    explanation: 'La intersección es (3, 4). Verificación: 2(3) + 4 = 10 ✓ y 3 + 4 = 7 ✓',
  },
  {
    id: 5,
    context: 'Analiza el siguiente sistema de ecuaciones representado gráficamente.',
    system: ['y = 3x - 5', 'y = x + 1'],
    graphData: {
      line1: { x1: 0, y1: -5, x2: 4, y2: 7, color: '#3B82F6' },
      line2: { x1: 0, y1: 1, x2: 4, y2: 5, color: '#10B981' },
      intersection: { x: 3, y: 4 },
      scale: 22,
      xRange: [0, 5],
      yRange: [-6, 8],
    },
    question: '¿Dónde se intersecan las rectas?',
    options: ['(2, 3)', '(3, 4)', '(4, 5)', '(1, 2)'],
    correctAnswer: 1,
    hint: 'La recta azul tiene mayor pendiente (3) que la verde (1).',
    explanation: 'Se intersecan en (3, 4). Verificación: y = 3(3) - 5 = 4 ✓ y y = 3 + 1 = 4 ✓',
  },
];

function GraphDisplay({ data }: { data: GraphQuestion['graphData'] }) {
  const width = 220;
  const height = 180;
  const padding = 30;

  const xScale = (x: number) => padding + ((x - data.xRange[0]) / (data.xRange[1] - data.xRange[0])) * (width - 2 * padding);
  const yScale = (y: number) => height - padding - ((y - data.yRange[0]) / (data.yRange[1] - data.yRange[0])) * (height - 2 * padding);

  // Generate integer grid lines
  const xGridLines: number[] = [];
  for (let x = Math.ceil(data.xRange[0]); x <= Math.floor(data.xRange[1]); x++) {
    xGridLines.push(x);
  }
  const yGridLines: number[] = [];
  for (let y = Math.ceil(data.yRange[0]); y <= Math.floor(data.yRange[1]); y++) {
    yGridLines.push(y);
  }

  return (
    <svg width={width} height={height} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Grid - vertical lines at integer x values */}
      {xGridLines.map((x) => (
        <line key={`v${x}`} x1={xScale(x)} y1={padding} x2={xScale(x)} y2={height - padding}
          stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
      ))}
      {/* Grid - horizontal lines at integer y values */}
      {yGridLines.map((y) => (
        <line key={`h${y}`} x1={padding} y1={yScale(y)} x2={width - padding} y2={yScale(y)}
          stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
      ))}

      {/* Axes */}
      <line x1={padding} y1={yScale(0)} x2={width - padding} y2={yScale(0)}
        stroke="currentColor" className="text-gray-400 dark:text-gray-500" strokeWidth="2" />
      <line x1={xScale(0)} y1={padding} x2={xScale(0)} y2={height - padding}
        stroke="currentColor" className="text-gray-400 dark:text-gray-500" strokeWidth="2" />

      {/* Line 1 */}
      <line
        x1={xScale(data.line1.x1)} y1={yScale(data.line1.y1)}
        x2={xScale(data.line1.x2)} y2={yScale(data.line1.y2)}
        stroke={data.line1.color} strokeWidth="3"
      />

      {/* Line 2 */}
      <line
        x1={xScale(data.line2.x1)} y1={yScale(data.line2.y1)}
        x2={xScale(data.line2.x2)} y2={yScale(data.line2.y2)}
        stroke={data.line2.color} strokeWidth="3"
      />

      {/* Intersection point */}
      {data.intersection && (
        <>
          <circle
            cx={xScale(data.intersection.x)}
            cy={yScale(data.intersection.y)}
            r="7"
            fill="#EF4444"
            className="animate-pulse"
          />
          <text
            x={xScale(data.intersection.x) + 10}
            y={yScale(data.intersection.y) - 8}
            className="text-xs fill-gray-600 dark:fill-gray-300 font-semibold"
          >
            ?
          </text>
        </>
      )}

      {/* Axis labels */}
      <text x={width - padding + 5} y={yScale(0) + 4} className="text-xs fill-gray-500">x</text>
      <text x={xScale(0) - 3} y={padding - 5} className="text-xs fill-gray-500">y</text>
    </svg>
  );
}

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
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Lectura de Gráficos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica la solución observando la intersección de las rectas
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Ejercicio {currentQuestion + 1} de {QUESTIONS.length}
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
                      ? 'bg-blue-500 text-white'
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 mb-4 border border-blue-200 dark:border-blue-700">
              <p className="text-gray-700 dark:text-gray-300">{question.context}</p>
            </div>

            {/* Graph and system display */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
              <GraphDisplay data={question.graphData} />
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sistema:</p>
                <div className="inline-flex flex-col gap-1 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  {question.system.map((eq, i) => (
                    <span key={i} className="font-mono text-sm text-gray-800 dark:text-gray-200">
                      <span className={i === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}>●</span> {eq}
                    </span>
                  ))}
                </div>
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
                  className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                >
                  <Lightbulb size={16} />
                  <span>Ver pista</span>
                </button>
              </div>
            )}

            {/* Hint display */}
            {showHint && !showFeedback && (
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
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
                        : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                      : showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-blue-400 dark:hover:border-blue-500'
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
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : currentQuestion < QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => setAnswers([...answers])}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>Ver resultados</span>
                <ArrowRight size={18} />
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
                ? 'Sabes leer soluciones de gráficos.'
                : 'Necesitas 3 respuestas correctas. ¡Inténtalo de nuevo!'}
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
