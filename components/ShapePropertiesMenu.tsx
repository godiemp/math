'use client';

import { useState } from 'react';
import { Ruler, Hash, GitBranch, Scale, ArrowRight } from 'lucide-react';
import { PROPERTIES_DIFFICULTY_CONFIGS, SHAPE_PROPERTIES } from '@/lib/shapePropertiesGenerator';
import type { PropertiesGameDifficulty } from '@/lib/types/shape-properties-game';

interface ShapePropertiesMenuProps {
  onStart: (difficulty: PropertiesGameDifficulty) => void;
}

export default function ShapePropertiesMenu({ onStart }: ShapePropertiesMenuProps) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<PropertiesGameDifficulty>('counting');

  const difficulties: PropertiesGameDifficulty[] = ['counting', 'identifying', 'comparing'];

  const getDifficultyIcon = (difficulty: PropertiesGameDifficulty) => {
    switch (difficulty) {
      case 'counting':
        return <Hash size={24} />;
      case 'identifying':
        return <GitBranch size={24} />;
      case 'comparing':
        return <Scale size={24} />;
    }
  };

  const getDifficultyColor = (difficulty: PropertiesGameDifficulty) => {
    switch (difficulty) {
      case 'counting':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/30',
          border: 'border-blue-200 dark:border-blue-700',
          selectedBg: 'bg-blue-100 dark:bg-blue-900/50',
          selectedBorder: 'border-blue-500',
          text: 'text-blue-700 dark:text-blue-400',
          badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
        };
      case 'identifying':
        return {
          bg: 'bg-indigo-50 dark:bg-indigo-900/30',
          border: 'border-indigo-200 dark:border-indigo-700',
          selectedBg: 'bg-indigo-100 dark:bg-indigo-900/50',
          selectedBorder: 'border-indigo-500',
          text: 'text-indigo-700 dark:text-indigo-400',
          badge: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300',
        };
      case 'comparing':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/30',
          border: 'border-purple-200 dark:border-purple-700',
          selectedBg: 'bg-purple-100 dark:bg-purple-900/50',
          selectedBorder: 'border-purple-500',
          text: 'text-purple-700 dark:text-purple-400',
          badge: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300',
        };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl">
            <Ruler size={32} className="text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Lados, Vértices y Aristas
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Aprende a contar las propiedades de las formas geométricas. Selecciona un nivel para
          comenzar.
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {difficulties.map((difficulty) => {
          const config = PROPERTIES_DIFFICULTY_CONFIGS[difficulty];
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
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
              )}

              <div className={`${colors.text} mb-4`}>{getDifficultyIcon(difficulty)}</div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {config.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {config.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                  {config.shapes.length} formas
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                  {config.problemsToComplete} problemas
                </span>
                {config.include3D && (
                  <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>3D</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Difficulty Details */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Formas incluidas en{' '}
          <span className="text-indigo-600 dark:text-indigo-400">
            {PROPERTIES_DIFFICULTY_CONFIGS[selectedDifficulty].title}
          </span>
          :
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {PROPERTIES_DIFFICULTY_CONFIGS[selectedDifficulty].shapes.map((shape) => {
            const info = SHAPE_PROPERTIES[shape];
            return (
              <div
                key={shape}
                className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {info.nameEs}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 pl-4">
                  {info.is3D ? (
                    <>
                      {info.vertices} vért, {info.edges} aristas
                    </>
                  ) : (
                    <>
                      {info.sides} lados, {info.vertices} vértices
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button
          onClick={() => onStart(selectedDifficulty)}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <span>Comenzar Juego</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-6">
        <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-3">
          ¿Qué aprenderás?
        </h4>
        <ul className="space-y-2 text-sm text-indigo-800 dark:text-indigo-300">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>
              <strong>Lados:</strong> Las líneas rectas que forman el borde de una figura
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>
              <strong>Vértices:</strong> Los puntos donde se encuentran dos lados (esquinas)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>
              <strong>Aristas:</strong> Las líneas donde se encuentran dos caras (en 3D)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>
              <strong>Caras:</strong> Las superficies planas de un sólido 3D
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
