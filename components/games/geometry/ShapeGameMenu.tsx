'use client';

import { useState } from 'react';
import { Shapes, Circle, Square, Triangle, Hexagon, Star, ArrowRight } from 'lucide-react';
import { DIFFICULTY_CONFIGS, SHAPE_DEFINITIONS } from '@/lib/shapeGenerator';
import type { ShapeGameDifficulty } from '@/lib/types/shape-game';

interface ShapeGameMenuProps {
  onStart: (difficulty: ShapeGameDifficulty) => void;
}

export default function ShapeGameMenu({ onStart }: ShapeGameMenuProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<ShapeGameDifficulty>('basic');

  const difficulties: ShapeGameDifficulty[] = ['basic', 'intermediate', 'advanced'];

  const getDifficultyIcon = (difficulty: ShapeGameDifficulty) => {
    switch (difficulty) {
      case 'basic':
        return <Circle size={24} />;
      case 'intermediate':
        return <Hexagon size={24} />;
      case 'advanced':
        return <Star size={24} />;
    }
  };

  const getDifficultyColor = (difficulty: ShapeGameDifficulty) => {
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
            <Shapes size={32} className="text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Identificación de Formas 2D
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Aprende a reconocer diferentes formas geométricas. Selecciona un nivel de dificultad para
          comenzar.
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {difficulties.map((difficulty) => {
          const config = DIFFICULTY_CONFIGS[difficulty];
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
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {config.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                  {config.shapes.length} formas
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
          Formas incluidas en{' '}
          <span className="text-purple-600 dark:text-purple-400">
            {DIFFICULTY_CONFIGS[selectedDifficulty].title}
          </span>
          :
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {DIFFICULTY_CONFIGS[selectedDifficulty].shapes.map((shape) => {
            const info = SHAPE_DEFINITIONS[shape];
            return (
              <div
                key={shape}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {info.nameEs}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button
          onClick={() => onStart(selectedDifficulty)}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <span>Comenzar Juego</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
          ¿Cómo jugar?
        </h4>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>Se mostrará una forma geométrica en la pantalla</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>Selecciona el nombre correcto de la forma entre las opciones</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>
              Usa los números <kbd className="px-1 bg-blue-200 dark:bg-blue-800 rounded">1-4</kbd> para
              responder rápidamente
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span>
            <span>
              Presiona <kbd className="px-1 bg-blue-200 dark:bg-blue-800 rounded">H</kbd> para ver una
              pista
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">5.</span>
            <span>Completa el número de problemas requerido para pasar al siguiente nivel</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
