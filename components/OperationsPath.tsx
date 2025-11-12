'use client';

import { Lock, Check, PlayCircle, Trophy, Star } from 'lucide-react';

interface OperationLevel {
  level: number;
  title: string;
  description: string;
  operationType: string;
  difficulty: string;
  problemsToComplete: number;
}

interface UserProgress {
  currentLevel: number;
  highestLevelReached: number;
  totalOperationsSolved: number;
}

interface OperationsPathProps {
  levels: OperationLevel[];
  userProgress: UserProgress | null;
  onLevelSelect: (level: number) => void;
}

const operationTypeColors: { [key: string]: string } = {
  addition: 'bg-green-500',
  subtraction: 'bg-blue-500',
  multiplication: 'bg-purple-500',
  division: 'bg-orange-500',
  mixed: 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500',
};

const operationTypeIcons: { [key: string]: string } = {
  addition: '+',
  subtraction: '−',
  multiplication: '×',
  division: '÷',
  mixed: '⊕',
};

const difficultyEmojis: { [key: string]: string } = {
  basic: '⭐',
  intermediate: '⭐⭐',
  advanced: '⭐⭐⭐',
  expert: '⭐⭐⭐⭐',
};

export default function OperationsPath({
  levels,
  userProgress,
  onLevelSelect,
}: OperationsPathProps) {
  const highestLevel = userProgress?.highestLevelReached || 1;
  const currentLevel = userProgress?.currentLevel || 1;

  const getLevelStatus = (level: number): 'locked' | 'available' | 'current' | 'completed' => {
    if (level > highestLevel) return 'locked';
    if (level < currentLevel) return 'completed';
    if (level === currentLevel) return 'current';
    return 'available';
  };

  const renderLevelNode = (level: OperationLevel, index: number) => {
    const status = getLevelStatus(level.level);
    const isEven = index % 2 === 0;
    const colorClass = operationTypeColors[level.operationType] || 'bg-gray-500';

    return (
      <div
        key={level.level}
        className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-8 relative`}
      >
        {/* Connecting Line */}
        {index < levels.length - 1 && (
          <div
            className={`absolute ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}
            top-16 w-1 h-16 ${status === 'locked' ? 'bg-gray-300' : 'bg-gradient-to-b from-blue-500 to-purple-500'}`}
          />
        )}

        {/* Level Content */}
        <div className={`w-full ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
          <div
            className={`inline-block max-w-md ${
              status === 'locked'
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer hover:scale-105 transition-transform'
            }`}
            onClick={() => status !== 'locked' && onLevelSelect(level.level)}
          >
            <div
              className={`relative rounded-xl p-6 shadow-lg ${
                status === 'current'
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white ring-4 ring-blue-300 animate-pulse'
                  : status === 'completed'
                  ? 'bg-white border-2 border-green-500'
                  : status === 'available'
                  ? 'bg-white border-2 border-blue-300 hover:border-blue-500'
                  : 'bg-gray-100 border-2 border-gray-300'
              }`}
            >
              {/* Level Number Badge */}
              <div
                className={`absolute -top-3 ${isEven ? '-right-3' : '-left-3'}
                ${colorClass} text-white rounded-full w-12 h-12 flex items-center justify-center
                font-bold text-lg shadow-lg`}
              >
                {level.level}
              </div>

              {/* Status Icon */}
              <div className={`absolute -top-3 ${isEven ? '-left-3' : '-right-3'}`}>
                {status === 'completed' && (
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    <Check size={16} />
                  </div>
                )}
                {status === 'current' && (
                  <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    <PlayCircle size={16} />
                  </div>
                )}
                {status === 'locked' && (
                  <div className="bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    <Lock size={16} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="mt-2">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={`text-xl font-bold ${
                      status === 'current' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {level.title}
                  </h3>
                  <span className="text-2xl ml-2">
                    {operationTypeIcons[level.operationType]}
                  </span>
                </div>
                <p
                  className={`text-sm mb-3 ${
                    status === 'current' ? 'text-blue-100' : 'text-gray-600'
                  }`}
                >
                  {level.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`${
                      status === 'current' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {difficultyEmojis[level.difficulty]}
                  </span>
                  <span
                    className={`${
                      status === 'current' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {level.problemsToComplete} problemas para completar
                  </span>
                </div>
              </div>

              {/* Hover Effect for Available Levels */}
              {status !== 'locked' && status !== 'current' && (
                <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-10 rounded-xl transition-opacity" />
              )}
            </div>
          </div>
        </div>

        {/* Center Circle (Path Node) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 ${
            status === 'locked'
              ? 'bg-gray-300 border-gray-400'
              : status === 'completed'
              ? 'bg-green-500 border-green-600'
              : status === 'current'
              ? 'bg-blue-500 border-blue-600 ring-4 ring-blue-300'
              : 'bg-white border-blue-400'
          } shadow-lg z-10`}
        />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Legend */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Tipos de Operaciones:</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(operationTypeIcons).map(([type, icon]) => (
            <div key={type} className="flex items-center space-x-2">
              <div
                className={`${operationTypeColors[type]} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}
              >
                {icon}
              </div>
              <span className="text-xs text-gray-600 capitalize">
                {type === 'addition'
                  ? 'Suma'
                  : type === 'subtraction'
                  ? 'Resta'
                  : type === 'multiplication'
                  ? 'Multiplicación'
                  : type === 'division'
                  ? 'División'
                  : 'Mixto'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Path */}
      <div className="relative">
        {levels.map((level, index) => renderLevelNode(level, index))}
      </div>

      {/* Completion Message */}
      {currentLevel > levels.length && (
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
          <Trophy size={64} className="mx-auto text-yellow-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Felicitaciones, Gran Maestro! 🎉
          </h2>
          <p className="text-gray-600">
            Has completado todos los niveles del camino de operaciones.
            ¡Eres un verdadero maestro de las matemáticas!
          </p>
        </div>
      )}
    </div>
  );
}
