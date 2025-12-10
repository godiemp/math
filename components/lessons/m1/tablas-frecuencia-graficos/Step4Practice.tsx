'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, BarChart2, PieChart as PieChartIcon, Table } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { BarChart, PieChart, FrequencyTable } from '@/components/lessons/shared';

interface Question {
  id: string;
  type: 'bar-reading' | 'comparison' | 'relative-calc' | 'pie-interpret' | 'table-match';
  question: string;
  visual: 'bar' | 'pie' | 'table';
  visualData: {
    categories: string[];
    values: number[];
    colors: string[];
    total?: number;
  };
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'bar-reading',
    question: 'Segun el grafico, ¿cuantos estudiantes prefieren Futbol?',
    visual: 'bar',
    visualData: {
      categories: ['Futbol', 'Basket', 'Tenis', 'Natacion'],
      values: [15, 10, 8, 7],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    },
    options: ['10', '15', '8', '7'],
    correctIndex: 1,
    explanation: 'La barra de Futbol tiene altura 15, lo que significa que 15 estudiantes lo prefieren.',
  },
  {
    id: 'q2',
    type: 'comparison',
    question: '¿Cual categoria tiene la MENOR frecuencia?',
    visual: 'bar',
    visualData: {
      categories: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
      values: [12, 8, 15, 5],
      colors: ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'],
    },
    options: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
    correctIndex: 3,
    explanation: 'Amarillo tiene la barra mas baja con frecuencia 5.',
  },
  {
    id: 'q3',
    type: 'relative-calc',
    question: 'Si hay 40 estudiantes en total y 10 prefieren pizza, ¿cual es la frecuencia relativa?',
    visual: 'table',
    visualData: {
      categories: ['Pizza', 'Tacos', 'Sushi', 'Otros'],
      values: [10, 12, 8, 10],
      colors: ['#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'],
      total: 40,
    },
    options: ['10', '0.25', '40%', '4'],
    correctIndex: 1,
    explanation: 'Frecuencia relativa = fi/n = 10/40 = 0.25 (o 25%)',
  },
  {
    id: 'q4',
    type: 'pie-interpret',
    question: 'Si hay 100 personas y el sector "Cine" ocupa 35% del circulo, ¿cuantas personas eligieron Cine?',
    visual: 'pie',
    visualData: {
      categories: ['Cine', 'Teatro', 'Concierto', 'Museo'],
      values: [35, 25, 25, 15],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
      total: 100,
    },
    options: ['35', '0.35', '65', '3.5'],
    correctIndex: 0,
    explanation: '35% de 100 personas = 35 personas eligieron Cine.',
  },
  {
    id: 'q5',
    type: 'table-match',
    question: '¿Cual grafico de barras corresponde a esta tabla?',
    visual: 'table',
    visualData: {
      categories: ['A', 'B', 'C'],
      values: [4, 8, 6],
      colors: ['#3B82F6', '#10B981', '#F59E0B'],
    },
    options: ['A > B > C', 'B > C > A', 'C > B > A', 'B > A > C'],
    correctIndex: 1,
    explanation: 'La tabla muestra A=4, B=8, C=6. Ordenando de mayor a menor: B(8) > C(6) > A(4).',
  },
];

const typeIcons: Record<string, typeof BarChart2> = {
  'bar-reading': BarChart2,
  'comparison': BarChart2,
  'relative-calc': Table,
  'pie-interpret': PieChartIcon,
  'table-match': Table,
};

const typeLabels: Record<string, string> = {
  'bar-reading': 'Lectura',
  'comparison': 'Comparacion',
  'relative-calc': 'Calculo',
  'pie-interpret': 'Interpretacion',
  'table-match': 'Correspondencia',
};

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (!isActive) return null;

  const question = QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
  const isCorrect = selectedAnswer === question.correctIndex;
  const TypeIcon = typeIcons[question.type];

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === question.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  // Prepare visual data
  const chartData = question.visualData.categories.map((cat, i) => ({
    category: cat,
    value: question.visualData.values[i],
    color: question.visualData.colors[i],
  }));

  const tableData = question.visualData.categories.map((cat, i) => ({
    category: cat,
    frequency: question.visualData.values[i],
    color: question.visualData.colors[i],
  }));

  const pieData = question.visualData.categories.map((cat, i) => ({
    category: cat,
    value: question.visualData.values[i],
    color: question.visualData.colors[i],
  }));

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Guiada
        </h2>
        <div className="flex items-center justify-center gap-2">
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

      {/* Question type badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <TypeIcon className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {typeLabels[question.type]}
          </span>
        </div>
      </div>

      {/* Visual */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        {question.visual === 'bar' && (
          <BarChart data={chartData} height="md" animated />
        )}
        {question.visual === 'pie' && (
          <PieChart data={pieData} showPercentages size="md" />
        )}
        {question.visual === 'table' && (
          <FrequencyTable
            data={tableData}
            total={question.visualData.total}
            showRelative={question.type === 'relative-calc'}
          />
        )}
      </div>

      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctIndex;
          const showResult = showFeedback && isSelected;

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl border-2 font-medium transition-all',
                !showFeedback && 'hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-300',
                !showFeedback && !isSelected && 'border-gray-200 dark:border-gray-700',
                isSelected && !showFeedback && 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
                showResult && isCorrectOption && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                showResult && !isCorrectOption && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                showFeedback && !isSelected && isCorrectOption && 'border-green-500 bg-green-50/50 dark:bg-green-900/20',
                showFeedback && !isSelected && !isCorrectOption && 'opacity-50'
              )}
            >
              <span className="text-gray-700 dark:text-gray-300">{option}</span>
              {showFeedback && isSelected && (
                <span className="ml-2">
                  {isCorrectOption ? (
                    <Check className="w-5 h-5 text-green-600 inline" />
                  ) : (
                    <X className="w-5 h-5 text-red-600 inline" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
          )}
        >
          <p
            className={cn(
              'font-semibold mb-1',
              isCorrect ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'
            )}
          >
            {isCorrect ? '¡Correcto!' : 'No exactamente'}
          </p>
          <p
            className={cn(
              'text-sm',
              isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}
          >
            {question.explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      {showFeedback && (
        <div className="flex justify-center gap-3">
          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <RotateCcw size={18} />
              <span>Reintentar</span>
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>{isLastQuestion ? 'Continuar' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Score indicator */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Correctas: {correctCount} / {currentQuestion + (showFeedback ? 1 : 0)}
      </div>
    </div>
  );
}
