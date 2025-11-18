'use client';

import { useState } from 'react';
import { Box, Circle, Hexagon, Star, ArrowRight } from 'lucide-react';
import { SOLIDS_DIFFICULTY_CONFIGS, SOLID_TYPE_DEFINITIONS } from '@/lib/3dSolidsGenerator';
import type { SolidsGameDifficulty } from '@/lib/types/3d-solids-game';

interface SolidsGameMenuProps {
  onStart: (difficulty: SolidsGameDifficulty) => void;
}

export default function SolidsGameMenu({ onStart }: SolidsGameMenuProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<SolidsGameDifficulty>('basic');

  const difficulties: SolidsGameDifficulty[] = ['basic', 'intermediate', 'advanced'];

  const getDifficultyIcon = (difficulty: SolidsGameDifficulty) => {
    switch (difficulty) {
      case 'basic':
        return <Circle size={24} />;
      case 'intermediate':
        return <Hexagon size={24} />;
      case 'advanced':
        return <Star size={24} />;
    }
  };

  const getDifficultyColor = (difficulty: SolidsGameDifficulty) => {
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
      identify_solid: 'Identificar sólidos',
      count_faces: 'Contar caras',
      count_edges: 'Contar aristas',
      count_vertices: 'Contar vértices',
    };
    return types.map((t) => descriptions[t] || t).join(', ');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl">
            <Box size={32} className="text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">Sólidos 3D</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Explora el mundo de los sólidos tridimensionales. Aprende a identificar cubos, esferas, cilindros y más.
          Selecciona un nivel de dificultad para comenzar.
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {difficulties.map((difficulty) => {
          const config = SOLIDS_DIFFICULTY_CONFIGS[difficulty];
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{config.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{config.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                  {config.solidTypes.length} sólidos
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
          Sólidos en{' '}
          <span className="text-emerald-600 dark:text-emerald-400">
            {SOLIDS_DIFFICULTY_CONFIGS[selectedDifficulty].title}
          </span>
          :
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {SOLIDS_DIFFICULTY_CONFIGS[selectedDifficulty].solidTypes.map((solidType) => {
            const info = SOLID_TYPE_DEFINITIONS[solidType];
            return (
              <div
                key={solidType}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.colorHint }} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{info.nameEs}</span>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${info.colorHint}20`,
                    color: info.colorHint,
                  }}
                >
                  {info.faces}C {info.edges}A {info.vertices}V
                </span>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tipos de problemas:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getProblemTypeDescription(SOLIDS_DIFFICULTY_CONFIGS[selectedDifficulty].problemTypes)}
          </p>

          <div className="mt-3 flex gap-2">
            {SOLIDS_DIFFICULTY_CONFIGS[selectedDifficulty].showLabels && (
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">
                Muestra etiquetas
              </span>
            )}
            {SOLIDS_DIFFICULTY_CONFIGS[selectedDifficulty].showWireframe && (
              <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                Vista wireframe
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button
          onClick={() => onStart(selectedDifficulty)}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <span>Comenzar Juego</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-6">
        <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-3">¿Cómo jugar?</h4>
        <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-300">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>Se mostrará un sólido 3D en vista isométrica</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>
              Responde preguntas como: ¿Qué sólido es? ¿Cuántas caras tiene? ¿Cuántos vértices tiene?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>
              Usa los números <kbd className="px-1 bg-emerald-200 dark:bg-emerald-800 rounded">1-4</kbd> para
              responder rápidamente
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span>
            <span>
              Presiona <kbd className="px-1 bg-emerald-200 dark:bg-emerald-800 rounded">H</kbd> para ver una
              pista
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">5.</span>
            <span>Completa el número de problemas requerido para pasar al siguiente nivel</span>
          </li>
        </ul>

        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Propiedades de los sólidos:</h5>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Caras (C):</strong> Superficies planas que forman el sólido
            </p>
            <p>
              <strong>Aristas (A):</strong> Líneas donde se encuentran dos caras
            </p>
            <p>
              <strong>Vértices (V):</strong> Puntos donde se juntan varias aristas
            </p>
            <p>
              <strong>Fórmula de Euler:</strong> V - E + F = 2 (para poliedros)
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <h5 className="font-semibold text-green-900 dark:text-green-300 mb-2">¿Sabías que...?</h5>
          <p className="text-sm text-green-800 dark:text-green-300">
            La palabra "vértice" viene del latín "vertex" que significa "punto más alto" o "cumbre". Los sólidos
            3D están en todas partes: un dado es un cubo, una lata de refresco es un cilindro, ¡y una pelota de
            fútbol es una esfera!
          </p>
        </div>

        <div className="mt-4 p-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
          <h5 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-2">Ejemplos del mundo real:</h5>
          <div className="grid grid-cols-2 gap-2 text-sm text-emerald-800 dark:text-emerald-300">
            <p>
              <strong>Cubo:</strong> Dado, cubo de Rubik
            </p>
            <p>
              <strong>Esfera:</strong> Pelota, planeta
            </p>
            <p>
              <strong>Cilindro:</strong> Lata, vela
            </p>
            <p>
              <strong>Cono:</strong> Helado, embudo
            </p>
            <p>
              <strong>Pirámide:</strong> Pirámides de Egipto
            </p>
            <p>
              <strong>Prisma:</strong> Barra Toblerone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
