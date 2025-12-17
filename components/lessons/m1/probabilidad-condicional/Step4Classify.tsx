'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Link2, Unlink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type CategoryType = 'independent' | 'dependent';

interface Scenario {
  id: string;
  description: string;
  correctType: CategoryType;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    description: 'Lanzar un dado y luego lanzar una moneda.',
    correctType: 'independent',
    explanation: 'El resultado del dado no afecta el resultado de la moneda. Son eventos completamente separados.',
  },
  {
    id: 's2',
    description: 'Sacar una carta de una baraja, NO devolverla, y sacar otra carta.',
    correctType: 'dependent',
    explanation: 'Al no devolver la primera carta, cambian las probabilidades de la segunda extracción. Por ejemplo, P(As₂ | As₁) = 3/51 ≠ 4/52.',
  },
  {
    id: 's3',
    description: 'El color de ojos de un estudiante y su promedio de notas.',
    correctType: 'independent',
    explanation: 'El color de ojos no tiene relación con el rendimiento académico. Saber uno no cambia la probabilidad del otro.',
  },
  {
    id: 's4',
    description: 'Estudiar para un examen y obtener buena calificación.',
    correctType: 'dependent',
    explanation: 'Estudiar aumenta la probabilidad de buena nota. P(buena nota | estudió) > P(buena nota). Son eventos dependientes.',
  },
  {
    id: 's5',
    description: 'Lanzar la misma moneda dos veces seguidas.',
    correctType: 'independent',
    explanation: 'Cada lanzamiento es independiente. La moneda no tiene "memoria". P(cara₂ | cara₁) = P(cara₂) = 0.5.',
  },
];

const TYPE_OPTIONS: { id: CategoryType; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'independent', label: 'Independientes', icon: <Unlink size={20} />, color: 'green' },
  { id: 'dependent', label: 'Dependientes', icon: <Link2 size={20} />, color: 'red' },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  green: { bg: 'bg-green-100 dark:bg-green-900/50', border: 'border-green-500', text: 'text-green-700 dark:text-green-300' },
  red: { bg: 'bg-red-100 dark:bg-red-900/50', border: 'border-red-500', text: 'text-red-700 dark:text-red-300' },
};

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<CategoryType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(CategoryType | null)[]>(Array(SCENARIOS.length).fill(null));

  const isComplete = currentIndex >= SCENARIOS.length;
  const currentScenario = isComplete ? SCENARIOS[0] : SCENARIOS[currentIndex];
  const isCorrect = selectedType === currentScenario.correctType;

  const handleSelect = (type: CategoryType) => {
    if (showFeedback) return;
    setSelectedType(type);
  };

  const handleCheck = () => {
    if (selectedType === null) return;
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedType;
    setAnswers(newAnswers);
    if (isCorrect) setCorrectCount(prev => prev + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedType(null);
    setCurrentIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedType(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setAnswers(Array(SCENARIOS.length).fill(null));
  };

  if (!isActive) return null;

  // ============ ACTIVE CLASSIFICATION ============
  if (!isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Clasifica los Eventos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Son independientes o dependientes?
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Escenario {currentIndex + 1} de {SCENARIOS.length}
          </div>
          <div className="flex gap-1">
            {SCENARIOS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  answers[i] !== null
                    ? answers[i] === SCENARIOS[i].correctType
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : i === currentIndex
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {answers[i] !== null ? (answers[i] === SCENARIOS[i].correctType ? '✓' : '✗') : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Scenario card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <p className="text-gray-500 dark:text-gray-400 mb-3">Considera este escenario:</p>
            <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
              {currentScenario.description}
            </p>
          </div>

          {/* Type options */}
          <div className="grid grid-cols-2 gap-4">
            {TYPE_OPTIONS.map((option) => {
              const colors = colorClasses[option.color];
              const isSelected = selectedType === option.id;
              const isCorrectAnswer = option.id === currentScenario.correctType;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showFeedback}
                  className={cn(
                    'p-6 rounded-xl border-2 transition-all font-medium',
                    isSelected
                      ? showFeedback
                        ? isCorrectAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                        : `${colors.bg} ${colors.border}`
                      : showFeedback && isCorrectAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center',
                      isSelected && !showFeedback ? colors.bg : 'bg-gray-100 dark:bg-gray-700'
                    )}>
                      {showFeedback && isCorrectAnswer && <Check size={24} className="text-green-600" />}
                      {showFeedback && isSelected && !isCorrectAnswer && <X size={24} className="text-red-600" />}
                      {!showFeedback && option.icon}
                    </div>
                    <span className={cn('font-semibold', isSelected && !showFeedback ? colors.text : 'text-gray-700 dark:text-gray-300')}>
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
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
                <p className="text-sm text-gray-700 dark:text-gray-300">{currentScenario.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center">
          {!showFeedback ? (
            <button
              onClick={handleCheck}
              disabled={selectedType === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedType !== null
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              {currentIndex < SCENARIOS.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ RESULTS SCREEN ============
  const passed = correctCount >= 4;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resultados
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Clasificación de eventos
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
          {correctCount}/{SCENARIOS.length}
        </div>
        <p className={cn(
          'text-lg font-semibold',
          passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
        )}>
          {passed ? '¡Excelente trabajo!' : 'Sigue practicando'}
        </p>
        {!passed && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Necesitas 4 de 5 correctas para avanzar
          </p>
        )}
      </div>

      {/* Results summary */}
      <div className="space-y-2">
        {SCENARIOS.map((scenario, i) => {
          const wasCorrect = answers[i] === scenario.correctType;
          return (
            <div
              key={scenario.id}
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
                <p className="text-sm text-gray-700 dark:text-gray-300">{scenario.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Respuesta correcta: <span className="font-semibold">{scenario.correctType === 'independent' ? 'Independientes' : 'Dependientes'}</span>
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
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
