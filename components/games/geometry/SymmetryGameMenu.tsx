'use client';

import { useState } from 'react';
import { FlipHorizontal2, Circle, Hexagon, Star, ArrowRight } from 'lucide-react';
import {
  SYMMETRY_DIFFICULTY_CONFIGS,
  SYMMETRY_SHAPE_DEFINITIONS,
} from '@/lib/symmetryGenerator';
import type { SymmetryGameDifficulty } from '@/lib/types/symmetry-game';

interface SymmetryGameMenuProps {
  onStart: (difficulty: SymmetryGameDifficulty) => void;
}

export default function SymmetryGameMenu({ onStart }: SymmetryGameMenuProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<SymmetryGameDifficulty>('basic');

  const difficulties: SymmetryGameDifficulty[] = ['basic', 'intermediate', 'advanced'];

  const getDifficultyIcon = (difficulty: SymmetryGameDifficulty) => {
    switch (difficulty) {
      case 'basic':
        return <Circle size={24} />;
      case 'intermediate':
        return <Hexagon size={24} />;
      case 'advanced':
        return <Star size={24} />;
    }
  };

  const getDifficultyColor = (difficulty: SymmetryGameDifficulty) => {
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
      count_lines: 'Contar líneas',
      has_symmetry: 'Tiene simetría',
      identify_line: 'Identificar línea',
    };
    return types.map((t) => descriptions[t] || t).join(', ');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl">
            <FlipHorizontal2 size={32} className="text-cyan-600 dark:text-cyan-400" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Simetría y Reflexiones
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Aprende sobre líneas de simetría y cómo las figuras se reflejan. Selecciona un nivel de
          dificultad para comenzar.
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {difficulties.map((difficulty) => {
          const config = SYMMETRY_DIFFICULTY_CONFIGS[difficulty];
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
          <span className="text-cyan-600 dark:text-cyan-400">
            {SYMMETRY_DIFFICULTY_CONFIGS[selectedDifficulty].title}
          </span>
          :
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {SYMMETRY_DIFFICULTY_CONFIGS[selectedDifficulty].shapes.map((shape) => {
            const info = SYMMETRY_SHAPE_DEFINITIONS[shape];
            const lines = info.linesOfSymmetry;
            const linesText =
              lines === 'infinite' ? '∞' : lines === 0 ? '0' : lines.toString();
            return (
              <div
                key={shape}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {info.nameEs}
                  </span>
                </div>
                <span className="text-xs bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-full">
                  {linesText}
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
            {getProblemTypeDescription(SYMMETRY_DIFFICULTY_CONFIGS[selectedDifficulty].problemTypes)}
          </p>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button
          onClick={() => onStart(selectedDifficulty)}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <span>Comenzar Juego</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl p-6">
        <h4 className="font-semibold text-cyan-900 dark:text-cyan-300 mb-3">
          ¿Cómo jugar?
        </h4>
        <ul className="space-y-2 text-sm text-cyan-800 dark:text-cyan-300">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>
              Se mostrará una forma geométrica con preguntas sobre su simetría
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>
              Responde preguntas como: ¿Cuántas líneas de simetría tiene? ¿Es esta una línea de
              simetría?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>
              Usa los números{' '}
              <kbd className="px-1 bg-cyan-200 dark:bg-cyan-800 rounded">1-4</kbd> para responder
              rápidamente
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span>
            <span>
              Presiona <kbd className="px-1 bg-cyan-200 dark:bg-cyan-800 rounded">H</kbd> para ver
              una pista
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">5.</span>
            <span>
              Completa el número de problemas requerido para pasar al siguiente nivel
            </span>
          </li>
        </ul>

        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
            ¿Qué es una línea de simetría?
          </h5>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Una línea de simetría es una línea que divide una figura en dos partes que son reflejos
            exactos una de la otra. ¡Es como doblar un papel y que ambos lados coincidan
            perfectamente!
          </p>
        </div>
      </div>
    </div>
  );
}
