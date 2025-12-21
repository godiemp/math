'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyItem {
  id: number;
  name: string;
  description: string;
  givenValue: string;
  radiusAnswer: string;
  heightAnswer: string;
  category: 'direct' | 'diameter' | 'circumference';
  icon: string;
}

const ITEMS: ClassifyItem[] = [
  {
    id: 1,
    name: 'Cono de trafico',
    description: 'Radio de la base: 15 cm, Altura: 45 cm',
    givenValue: 'r = 15 cm, h = 45 cm',
    radiusAnswer: '15',
    heightAnswer: '45',
    category: 'direct',
    icon: '🚧',
  },
  {
    id: 2,
    name: 'Cono de helado',
    description: 'Diametro de la abertura: 8 cm, Profundidad: 12 cm',
    givenValue: 'd = 8 cm, h = 12 cm',
    radiusAnswer: '4',
    heightAnswer: '12',
    category: 'diameter',
    icon: '🍦',
  },
  {
    id: 3,
    name: 'Embudo de cocina',
    description: 'Radio superior: 10 cm, Altura del cono: 15 cm',
    givenValue: 'r = 10 cm, h = 15 cm',
    radiusAnswer: '10',
    heightAnswer: '15',
    category: 'direct',
    icon: '🔽',
  },
  {
    id: 4,
    name: 'Gorro de cumpleanos',
    description: 'Circunferencia de la base: 31.4 cm, Altura: 20 cm',
    givenValue: 'C = 31.4 cm, h = 20 cm',
    radiusAnswer: '5',
    heightAnswer: '20',
    category: 'circumference',
    icon: '🎉',
  },
  {
    id: 5,
    name: 'Volcan en miniatura',
    description: 'Diametro del crater: 200 m, Altura: 150 m',
    givenValue: 'd = 200 m, h = 150 m',
    radiusAnswer: '100',
    heightAnswer: '150',
    category: 'diameter',
    icon: '🌋',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [radiusInput, setRadiusInput] = useState('');
  const [heightInput, setHeightInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentItem = ITEMS[currentIndex];
  const isLastItem = currentIndex === ITEMS.length - 1;

  if (!isActive) return null;

  const handleSubmit = () => {
    setShowFeedback(true);
    const isCorrect =
      radiusInput.trim() === currentItem.radiusAnswer &&
      heightInput.trim() === currentItem.heightAnswer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastItem) {
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setRadiusInput('');
      setHeightInput('');
      setShowFeedback(false);
    }
  };

  const isRadiusCorrect = radiusInput.trim() === currentItem.radiusAnswer;
  const isHeightCorrect = heightInput.trim() === currentItem.heightAnswer;
  const isCorrect = isRadiusCorrect && isHeightCorrect;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica las Dimensiones
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Objeto {currentIndex + 1} de {ITEMS.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1">
        {ITEMS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-2 flex-1 rounded-full transition-all',
              i < currentIndex
                ? 'bg-green-500'
                : i === currentIndex
                ? 'bg-purple-500'
                : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>

      {/* Object card */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <div className="text-center mb-4">
          <span className="text-6xl">{currentItem.icon}</span>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-2">
            {currentItem.name}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-center">
            {currentItem.description}
          </p>
          <p className="text-purple-600 dark:text-purple-400 font-mono text-center mt-2 font-semibold">
            {currentItem.givenValue}
          </p>
        </div>

        {/* Category hint */}
        <div
          className={cn(
            'text-sm text-center rounded-lg p-2 mb-4',
            currentItem.category === 'direct'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : currentItem.category === 'diameter'
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
          )}
        >
          {currentItem.category === 'direct' && 'Pista: Los valores estan dados directamente'}
          {currentItem.category === 'diameter' && 'Pista: Recuerda que radio = diametro ÷ 2'}
          {currentItem.category === 'circumference' && 'Pista: C = 2πr, entonces r = C ÷ (2π)'}
        </div>

        {/* Input fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Radio (r)
            </label>
            <div className="relative">
              <input
                type="text"
                value={radiusInput}
                onChange={(e) => setRadiusInput(e.target.value)}
                disabled={showFeedback}
                placeholder="?"
                className={cn(
                  'w-full p-3 rounded-lg border-2 font-mono text-center text-lg',
                  showFeedback
                    ? isRadiusCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                )}
              />
              {showFeedback && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isRadiusCorrect ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Altura (h)
            </label>
            <div className="relative">
              <input
                type="text"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                disabled={showFeedback}
                placeholder="?"
                className={cn(
                  'w-full p-3 rounded-lg border-2 font-mono text-center text-lg',
                  showFeedback
                    ? isHeightCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                )}
              />
              {showFeedback && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isHeightCorrect ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
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
              <p
                className={cn(
                  'font-bold',
                  isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}
              >
                {isCorrect ? '¡Correcto!' : '¡Casi!'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                r = <strong>{currentItem.radiusAnswer}</strong>, h = <strong>{currentItem.heightAnswer}</strong>
              </p>
              {currentItem.category === 'diameter' && !isCorrect && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Recuerda: radio = diametro ÷ 2 = {parseInt(currentItem.radiusAnswer) * 2} ÷ 2 = {currentItem.radiusAnswer}
                </p>
              )}
              {currentItem.category === 'circumference' && !isCorrect && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Recuerda: r = C ÷ (2π) = 31.4 ÷ 6.28 = 5
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Score */}
      <div className="text-center text-gray-600 dark:text-gray-400">
        Correctas: {correctCount} de {currentIndex + (showFeedback ? 1 : 0)}
      </div>

      {/* Action button */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={!radiusInput.trim() || !heightInput.trim()}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              radiusInput.trim() && heightInput.trim()
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
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
            <span>{isLastItem ? 'Continuar' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
