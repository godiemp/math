'use client';

import { useState } from 'react';
import { Compass, Circle, Hexagon, Star, ArrowRight } from 'lucide-react';
import { ANGLES_DIFFICULTY_CONFIGS, ANGLE_TYPE_DEFINITIONS } from '@/lib/anglesGenerator';
import type { AnglesGameDifficulty } from '@/lib/types/angles-game';

interface AnglesGameMenuProps {
  onStart: (difficulty: AnglesGameDifficulty) => void;
}

export default function AnglesGameMenu({ onStart }: AnglesGameMenuProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<AnglesGameDifficulty>('basic');

  const difficulties: AnglesGameDifficulty[] = ['basic', 'intermediate', 'advanced'];

  const getDifficultyIcon = (difficulty: AnglesGameDifficulty) => {
    switch (difficulty) {
      case 'basic':
        return <Circle size={24} />;
      case 'intermediate':
        return <Hexagon size={24} />;
      case 'advanced':
        return <Star size={24} />;
    }
  };

  const getDifficultyColor = (difficulty: AnglesGameDifficulty) => {
    switch (difficulty) {
      case 'basic':
        return {
          bg: 'bg-green-50 dark:bg-green-900/30',
          border: 'border-green-200 dark:border-green-700',
          selectedBg: 'bg-green-100 dark:bg-green-900/50',
          selectedBorder: 'border-green-500',
          text: 'text-green-700 dark:text-green-400',
          badge: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
        };
      case 'intermediate':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/30',
          border: 'border-yellow-200 dark:border-yellow-700',
          selectedBg: 'bg-yellow-100 dark:bg-yellow-900/50',
          selectedBorder: 'border-yellow-500',
          text: 'text-yellow-700 dark:text-yellow-400',
          badge: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
        };
      case 'advanced':
        return {
          bg: 'bg-red-50 dark:bg-red-900/30',
          border: 'border-red-200 dark:border-red-700',
          selectedBg: 'bg-red-100 dark:bg-red-900/50',
          selectedBorder: 'border-red-500',
          text: 'text-red-700 dark:text-red-400',
          badge: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
        };
    }
  };

  const getProblemTypeDescription = (types: string[]) => {
    const descriptions: Record<string, string> = {
      classify_angle: 'Clasificar ángulos',
      measure_angle: 'Medir ángulos',
      compare_angles: 'Comparar ángulos',
    };
    return types.map((t) => descriptions[t] || t).join(', ');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl">
            <Compass size={32} className="text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Tipos de Ángulos
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Aprende a identificar y clasificar diferentes tipos de ángulos. Selecciona un nivel de
          dificultad para comenzar.
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {difficulties.map((difficulty) => {
          const config = ANGLES_DIFFICULTY_CONFIGS[difficulty];
          const colors = getDifficultyColor(difficulty);
          const isSelected = selectedDifficulty === difficulty;

          return (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                isSelected
                  ? `${colors.selectedBg} ${colors.selectedBorder} shadow-lg`
                  : `${colors.bg} ${colors.border} hover:shadow-md`
              }`}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
              )}

              {/* Icon */}
              <div className={`${colors.text} mb-4`}>{getDifficultyIcon(difficulty)}</div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {config.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{config.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                  {config.angleTypes.length} tipos
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                  {config.problemsToComplete} problemas
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Difficulty Details */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tipos de ángulos en{' '}
          <span className="text-orange-600 dark:text-orange-400">
            {ANGLES_DIFFICULTY_CONFIGS[selectedDifficulty].title}
          </span>
          :
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {ANGLES_DIFFICULTY_CONFIGS[selectedDifficulty].angleTypes.map((angleType) => {
            const info = ANGLE_TYPE_DEFINITIONS[angleType];
            return (
              <div
                key={angleType}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: info.colorHint }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {info.nameEs}
                  </span>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${info.colorHint}20`,
                    color: info.colorHint,
                  }}
                >
                  {info.symbol}
                </span>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Tipos de problemas:
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getProblemTypeDescription(ANGLES_DIFFICULTY_CONFIGS[selectedDifficulty].problemTypes)}
          </p>

          <div className="mt-3 flex gap-2">
            {ANGLES_DIFFICULTY_CONFIGS[selectedDifficulty].showDegrees && (
              <span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
                Muestra grados
              </span>
            )}
            {ANGLES_DIFFICULTY_CONFIGS[selectedDifficulty].showProtractor && (
              <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
                Con transportador
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button
          onClick={() => onStart(selectedDifficulty)}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <span>Comenzar Juego</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-orange-50 dark:bg-orange-900/30 rounded-xl p-6">
        <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-3">¿Cómo jugar?</h4>
        <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-300">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>Se mostrará un ángulo con sus dos rayos partiendo de un vértice</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>
              Responde preguntas como: ¿Qué tipo de ángulo es? ¿Cuántos grados mide? ¿Cuál es
              mayor?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>
              Usa los números{' '}
              <kbd className="px-1 bg-orange-200 dark:bg-orange-800 rounded">1-4</kbd> para
              responder rápidamente
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span>
            <span>
              Presiona <kbd className="px-1 bg-orange-200 dark:bg-orange-800 rounded">H</kbd> para
              ver una pista
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">5.</span>
            <span>Completa el número de problemas requerido para pasar al siguiente nivel</span>
          </li>
        </ul>

        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
            Tipos de ángulos básicos:
          </h5>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Agudo (&lt;90°):</strong> Más cerrado que una esquina de libro
            </p>
            <p>
              <strong>Recto (=90°):</strong> Exactamente como la esquina de una hoja
            </p>
            <p>
              <strong>Obtuso (&gt;90°):</strong> Más abierto que una esquina recta
            </p>
            <p>
              <strong>Llano (=180°):</strong> Forma una línea recta
            </p>
            <p>
              <strong>Reflejo (&gt;180°):</strong> Más de media vuelta
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
          <h5 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
            ¿Sabías que...?
          </h5>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            La palabra "ángulo" viene del latín "angulus" que significa "esquina". Los ángulos están
            en todas partes: en las esquinas de los edificios, en las manecillas del reloj, ¡y hasta
            en las pizzas cuando las cortamos!
          </p>
        </div>
      </div>
    </div>
  );
}
