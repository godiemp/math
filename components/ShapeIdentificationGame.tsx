'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Award, Lightbulb, SkipForward, Shapes, Check, X } from 'lucide-react';
import {
  generateVariedShapeProblem,
  clearRecentShapes,
  DIFFICULTY_CONFIGS,
  SHAPE_DEFINITIONS,
} from '@/lib/shapeGenerator';
import type { ShapeProblem, ShapeGameDifficulty } from '@/lib/types/shape-game';
import GameAnswerOptions from '@/components/GameAnswerOptions';

interface ShapeIdentificationGameProps {
  difficulty: ShapeGameDifficulty;
  onBack: () => void;
  onLevelComplete: () => void;
  onNextLevel: () => void;
}

/**
 * Custom SVG renderer for shape identification game
 * Renders shapes without labels to test identification skills
 */
function ShapeCanvas({ problem }: { problem: ShapeProblem }) {
  const figure = problem.figure;
  const width = 400;
  const height = 300;

  const renderShape = () => {
    switch (figure.type) {
      case 'circle': {
        const isOval = (figure as { isOval?: boolean }).isOval;
        const scaleX = (figure as { scaleX?: number }).scaleX || 1;
        const scaleY = (figure as { scaleY?: number }).scaleY || 1;

        if (isOval && figure.center) {
          // Render oval using ellipse
          return (
            <ellipse
              cx={figure.center.x}
              cy={figure.center.y}
              rx={(figure.radius || 60) * scaleX}
              ry={(figure.radius || 60) * scaleY}
              fill="rgba(168, 85, 247, 0.15)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
          );
        }

        // Regular circle
        if (figure.center && figure.radius) {
          return (
            <circle
              cx={figure.center.x}
              cy={figure.center.y}
              r={figure.radius}
              fill="rgba(168, 85, 247, 0.15)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
          );
        }
        return null;
      }

      case 'rectangle': {
        if (figure.points && figure.points.length >= 2) {
          const [p1, p2] = figure.points;
          const rectWidth = Math.abs(p2.x - p1.x);
          const rectHeight = Math.abs(p2.y - p1.y);

          return (
            <rect
              x={Math.min(p1.x, p2.x)}
              y={Math.min(p1.y, p2.y)}
              width={rectWidth}
              height={rectHeight}
              fill="rgba(34, 197, 94, 0.15)"
              stroke="rgb(34, 197, 94)"
              strokeWidth="3"
            />
          );
        }
        return null;
      }

      case 'triangle': {
        if (figure.points && figure.points.length >= 3) {
          const pathData = `M ${figure.points.map((p) => `${p.x} ${p.y}`).join(' L ')} Z`;
          return (
            <path
              d={pathData}
              fill="rgba(59, 130, 246, 0.15)"
              stroke="rgb(59, 130, 246)"
              strokeWidth="3"
            />
          );
        }
        return null;
      }

      case 'polygon': {
        if (figure.points && figure.points.length >= 3) {
          const pathData = `M ${figure.points.map((p) => `${p.x} ${p.y}`).join(' L ')} Z`;

          // Use different colors based on number of sides
          const sideCount = figure.points.length;
          let fillColor = 'rgba(245, 158, 11, 0.15)';
          let strokeColor = 'rgb(245, 158, 11)';

          if (sideCount === 5) {
            // Pentagon
            fillColor = 'rgba(239, 68, 68, 0.15)';
            strokeColor = 'rgb(239, 68, 68)';
          } else if (sideCount === 6) {
            // Hexagon
            fillColor = 'rgba(6, 182, 212, 0.15)';
            strokeColor = 'rgb(6, 182, 212)';
          } else if (sideCount === 8) {
            // Octagon
            fillColor = 'rgba(168, 85, 247, 0.15)';
            strokeColor = 'rgb(168, 85, 247)';
          } else if (sideCount === 10) {
            // Star
            fillColor = 'rgba(251, 191, 36, 0.15)';
            strokeColor = 'rgb(251, 191, 36)';
          } else if (sideCount === 4) {
            // Rhombus, Trapezoid, Parallelogram
            fillColor = 'rgba(236, 72, 153, 0.15)';
            strokeColor = 'rgb(236, 72, 153)';
          }

          return (
            <path d={pathData} fill={fillColor} stroke={strokeColor} strokeWidth="3" />
          );
        }
        return null;
      }

      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-inner"
      >
        {/* Grid pattern for visual reference */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(156, 163, 175, 0.2)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Render the shape */}
        {renderShape()}
      </svg>
    </div>
  );
}

export default function ShapeIdentificationGame({
  difficulty,
  onBack,
  onLevelComplete,
  onNextLevel,
}: ShapeIdentificationGameProps) {
  const [problem, setProblem] = useState<ShapeProblem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
  }>({ show: false, isCorrect: false });
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isRetry, setIsRetry] = useState(false);
  const [hasTriedOnce, setHasTriedOnce] = useState(false);

  const config = DIFFICULTY_CONFIGS[difficulty];

  const loadProblem = useCallback(() => {
    const newProblem = generateVariedShapeProblem(difficulty);
    setProblem(newProblem);
    setSelectedAnswer(null);
    setFeedback({ show: false, isCorrect: false });
    setShowHint(false);
    setIsRetry(false);
    setHasTriedOnce(false);
  }, [difficulty]);

  useEffect(() => {
    clearRecentShapes();
    loadProblem();
  }, [loadProblem]);

  // Keyboard shortcuts (1-4 for options)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (feedback.show || !problem) return;

      const key = e.key;
      if (['1', '2', '3', '4'].includes(key)) {
        const index = parseInt(key) - 1;
        if (index < problem.options.length) {
          handleAnswer(problem.options[index]);
        }
      } else if (key.toLowerCase() === 'h') {
        setShowHint(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [problem, feedback.show]);

  // Keyboard shortcut for Continue (Enter key)
  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (showLevelComplete && e.key === 'Enter') {
        handleContinue();
      }
    };

    window.addEventListener('keydown', handleEnterPress);
    return () => window.removeEventListener('keydown', handleEnterPress);
  }, [showLevelComplete]);

  const handleAnswer = (answer: string | number) => {
    if (feedback.show || !problem) return;

    const answerStr = String(answer);
    setSelectedAnswer(answerStr);
    const isCorrect = answerStr === problem.correctAnswer;

    setFeedback({ show: true, isCorrect });

    // Only count as attempt on first try (not retry)
    if (!isRetry) {
      setAttemptCount((prev) => prev + 1);
    }

    if (isCorrect) {
      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }

      // Check if level is completed
      if (newCorrectCount >= config.problemsToComplete) {
        setTimeout(() => {
          setShowLevelComplete(true);
          onLevelComplete();
        }, 1500);
      } else {
        // Auto-load next problem after delay
        setTimeout(loadProblem, 1500);
      }
    } else {
      setCurrentStreak(0);
      setHasTriedOnce(true);
    }
  };

  const handleRetry = () => {
    // Allow student to try the same shape again
    setSelectedAnswer(null);
    setFeedback({ show: false, isCorrect: false });
    setIsRetry(true);
    setShowHint(true); // Show hint automatically on retry
  };

  const handleContinue = () => {
    if (showLevelComplete) {
      setShowLevelComplete(false);
      setCorrectCount(0);
      setAttemptCount(0);
      setCurrentStreak(0);
      clearRecentShapes();
      onNextLevel();
    } else {
      loadProblem();
    }
  };

  const handleSkipLevel = () => {
    clearRecentShapes();
    setShowLevelComplete(true);
    onLevelComplete();
  };

  // Calculate if user can skip (80%+ accuracy after 3+ attempts)
  const canSkip = attemptCount >= 3 && correctCount / attemptCount >= 0.8;

  if (!problem) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base">Volver</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Progreso: {correctCount} / {config.problemsToComplete}
          </div>
          {canSkip && (
            <button
              onClick={handleSkipLevel}
              className="flex items-center gap-1 sm:gap-2 bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-green-700 transition-all shadow-md transform hover:scale-105"
              title="Saltar al siguiente nivel (80%+ precisión)"
            >
              <SkipForward size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Saltar Nivel</span>
              <span className="xs:hidden">Saltar</span>
            </button>
          )}
        </div>
      </div>

      {/* Level Info */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2">
          <Shapes size={16} />
          {config.title}
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          ¿Qué forma es esta?
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
        <div
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
          style={{
            width: `${(correctCount / config.problemsToComplete) * 100}%`,
          }}
        />
      </div>

      {/* Skip hint */}
      {attemptCount >= 2 && !canSkip && correctCount / attemptCount >= 0.7 && (
        <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
          Mantén un 80% de precisión para poder saltar al siguiente nivel
        </div>
      )}
      {canSkip && (
        <div className="text-center text-xs sm:text-sm text-green-600 dark:text-green-400 font-semibold mb-4">
          ¡Excelente trabajo! Puedes saltar al siguiente nivel
        </div>
      )}

      {/* Shape Display */}
      <div className="mb-6">
        <ShapeCanvas problem={problem} />
      </div>

      {/* Hint Button */}
      <div className="text-center mb-4">
        {!showHint ? (
          <button
            onClick={() => setShowHint(true)}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
          >
            <Lightbulb size={16} />
            <span>Mostrar pista (H)</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-lg text-sm">
            <Lightbulb size={16} />
            <span>{problem.hint}</span>
          </div>
        )}
      </div>

      {/* Answer Options */}
      <GameAnswerOptions
        options={problem.options}
        selectedAnswer={selectedAnswer}
        correctAnswer={problem.correctAnswer}
        showFeedback={feedback.show}
        isCorrect={feedback.isCorrect}
        onAnswer={handleAnswer}
        themeColor="purple"
      />

      {/* Feedback */}
      {feedback.show && (
        <div
          className={`p-4 sm:p-6 rounded-xl mb-6 ${
            feedback.isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500'
              : 'bg-red-50 dark:bg-red-900/30 border-2 border-red-500'
          }`}
        >
          <div className="flex items-start gap-3">
            {feedback.isCorrect ? (
              <>
                <Check
                  size={28}
                  className="sm:w-8 sm:h-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div>
                  <div className="text-base sm:text-lg font-bold text-green-900 dark:text-green-300">
                    ¡Correcto! 🎉
                  </div>
                  <div className="text-xs sm:text-sm text-green-700 dark:text-green-400">
                    Racha actual: {currentStreak} | Mejor racha: {bestStreak}
                  </div>
                  {isRetry && (
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ¡Excelente! Aprendiste de tu error anterior.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <X
                  size={28}
                  className="sm:w-8 sm:h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1"
                />
                <div className="flex-1">
                  <div className="text-base sm:text-lg font-bold text-red-900 dark:text-red-300 mb-2">
                    Incorrecto
                  </div>
                  {/* Detailed explanation */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-2">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {SHAPE_DEFINITIONS[problem.correctShape].explanation}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Característica clave:</strong>{' '}
                      {SHAPE_DEFINITIONS[problem.correctShape].keyFeature}
                    </div>
                  </div>
                  {!hasTriedOnce || isRetry ? (
                    <div className="text-xs sm:text-sm text-red-700 dark:text-red-400">
                      ¡Inténtalo de nuevo! Ahora conoces las características.
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm text-red-700 dark:text-red-400">
                      Recuerda: <strong>{problem.correctAnswer}</strong> -{' '}
                      {SHAPE_DEFINITIONS[problem.correctShape].keyFeature}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Retry or Continue Button (after incorrect answer) */}
      {feedback.show && !feedback.isCorrect && (
        <div className="flex gap-3">
          {!hasTriedOnce || isRetry ? (
            <button
              onClick={handleRetry}
              className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
            >
              🔄 Intentar de Nuevo
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
            >
              🔄 Practicar Esta Forma
            </button>
          )}
          <button
            onClick={handleContinue}
            className="flex-1 bg-gray-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-700 transition-all shadow-lg"
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <div className="text-center">
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Correctas</div>
          <div className="font-bold text-green-600 dark:text-green-400 text-base sm:text-lg">
            {correctCount}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Intentos</div>
          <div className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
            {attemptCount}
          </div>
        </div>
        {attemptCount > 0 && (
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Precisión</div>
            <div className="font-bold text-blue-600 dark:text-blue-400 text-base sm:text-lg">
              {Math.round((correctCount / attemptCount) * 100)}%
            </div>
          </div>
        )}
        <div className="text-center">
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Racha</div>
          <div className="font-bold text-purple-600 dark:text-purple-400 text-base sm:text-lg">
            {currentStreak}
          </div>
        </div>
      </div>

      {/* Level Complete Modal */}
      {showLevelComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full p-6 sm:p-8">
            <div className="text-center">
              <div className="mb-4 sm:mb-6">
                <Award
                  size={60}
                  className="sm:w-20 sm:h-20 mx-auto text-yellow-500 animate-bounce"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                ¡Nivel Completado! 🎉
              </h2>
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 px-2">
                Has completado: <strong>{config.title}</strong>
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {correctCount}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Correctas
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {attemptCount > 0
                        ? Math.round((correctCount / attemptCount) * 100)
                        : 0}
                      %
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Precisión
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                      {bestStreak}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Mejor Racha
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleContinue}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="flex flex-col items-center">
                  <span>Continuar al Siguiente Nivel →</span>
                  <span className="text-xs sm:text-sm font-normal opacity-70 mt-1">
                    (Presiona Enter)
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
