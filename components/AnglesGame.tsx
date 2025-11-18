'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Award, Lightbulb, SkipForward, Compass } from 'lucide-react';
import {
  generateAngleProblem,
  clearRecentAngleTypes,
  ANGLES_DIFFICULTY_CONFIGS,
  ANGLE_TYPE_DEFINITIONS,
  describeArc,
  getAngleColor,
} from '@/lib/anglesGenerator';
import type { AngleProblem, AnglesGameDifficulty } from '@/lib/types/angles-game';
import GameAnswerOptions from '@/components/GameAnswerOptions';

interface AnglesGameProps {
  difficulty: AnglesGameDifficulty;
  onBack: () => void;
  onLevelComplete: () => void;
  onNextLevel: () => void;
}

/**
 * Custom SVG renderer for angles game
 * Renders angles with vertex, rays, and protractor-style arcs
 */
function AngleCanvas({
  problem,
  showDegrees,
  showProtractor,
}: {
  problem: AngleProblem;
  showDegrees: boolean;
  showProtractor: boolean;
}) {
  const width = problem.type === 'compare_angles' ? 600 : 400;
  const height = 300;

  const angleColor = getAngleColor(problem.angleType);

  const renderAngle = (
    vertexX: number,
    vertexY: number,
    ray1: typeof problem.ray1,
    ray2: typeof problem.ray2,
    angleDegrees: number,
    label?: string
  ) => {
    const arcRadius = 40;

    return (
      <g>
        {/* Vertex point */}
        <circle cx={vertexX} cy={vertexY} r="6" fill={angleColor} />

        {/* First ray */}
        <line
          x1={ray1.startX}
          y1={ray1.startY}
          x2={ray1.endX}
          y2={ray1.endY}
          stroke={angleColor}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Arrow head for ray1 */}
        <polygon
          points={`${ray1.endX},${ray1.endY} ${ray1.endX - 8},${ray1.endY - 4} ${ray1.endX - 8},${ray1.endY + 4}`}
          fill={angleColor}
        />

        {/* Second ray */}
        <line
          x1={ray2.startX}
          y1={ray2.startY}
          x2={ray2.endX}
          y2={ray2.endY}
          stroke={angleColor}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Arrow head for ray2 */}
        {angleDegrees !== 180 && (
          <polygon
            points={calculateArrowHead(ray2.startX, ray2.startY, ray2.endX, ray2.endY)}
            fill={angleColor}
          />
        )}

        {/* Protractor arc */}
        {showProtractor && (
          <path
            d={describeArc(vertexX, vertexY, arcRadius, 0, angleDegrees)}
            fill="none"
            stroke={angleColor}
            strokeWidth="2"
            strokeDasharray={angleDegrees > 180 ? '4,2' : 'none'}
            opacity="0.6"
          />
        )}

        {/* Right angle indicator (square) */}
        {angleDegrees === 90 && (
          <rect
            x={vertexX}
            y={vertexY - 15}
            width="15"
            height="15"
            fill="none"
            stroke={angleColor}
            strokeWidth="2"
          />
        )}

        {/* Degree label */}
        {showDegrees && (
          <text
            x={vertexX + 50}
            y={vertexY - 40}
            fill={angleColor}
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
          >
            {angleDegrees}°
          </text>
        )}

        {/* Angle label (A or B) */}
        {label && (
          <text
            x={vertexX}
            y={vertexY + 30}
            fill={angleColor}
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  const calculateArrowHead = (
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): string => {
    const angle = Math.atan2(endY - startY, endX - startX);
    const arrowLength = 8;
    const arrowAngle = Math.PI / 6;

    const x1 = endX - arrowLength * Math.cos(angle - arrowAngle);
    const y1 = endY - arrowLength * Math.sin(angle - arrowAngle);
    const x2 = endX - arrowLength * Math.cos(angle + arrowAngle);
    const y2 = endY - arrowLength * Math.sin(angle + arrowAngle);

    return `${endX},${endY} ${x1},${y1} ${x2},${y2}`;
  };

  return (
    <div className="flex justify-center">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-inner"
      >
        {/* Grid pattern */}
        <defs>
          <pattern id="angles-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(156, 163, 175, 0.2)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#angles-grid)" />

        {/* Main angle */}
        {problem.type === 'compare_angles' ? (
          <>
            {renderAngle(problem.vertexX, problem.vertexY, problem.ray1, problem.ray2, problem.angleDegrees, 'A')}
            {problem.comparisonAngle && (
              renderAngle(
                problem.vertexX + 200,
                problem.vertexY,
                problem.comparisonAngle.ray1,
                problem.comparisonAngle.ray2,
                problem.comparisonAngle.angleDegrees,
                'B'
              )
            )}
          </>
        ) : (
          renderAngle(
            problem.vertexX,
            problem.vertexY,
            problem.ray1,
            problem.ray2,
            problem.angleDegrees
          )
        )}
      </svg>
    </div>
  );
}

export default function AnglesGame({
  difficulty,
  onBack,
  onLevelComplete,
  onNextLevel,
}: AnglesGameProps) {
  const [problem, setProblem] = useState<AngleProblem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
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

  const config = ANGLES_DIFFICULTY_CONFIGS[difficulty];

  const loadProblem = useCallback(() => {
    const newProblem = generateAngleProblem(difficulty);
    setProblem(newProblem);
    setSelectedAnswer(null);
    setFeedback({ show: false, isCorrect: false });
    setShowHint(false);
    setIsRetry(false);
    setHasTriedOnce(false);
  }, [difficulty]);

  useEffect(() => {
    clearRecentAngleTypes();
    loadProblem();
  }, [loadProblem]);

  // Keyboard shortcuts
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

  // Enter key for continue
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

    setSelectedAnswer(answer);
    const isCorrect = answer === problem.correctAnswer;

    setFeedback({ show: true, isCorrect });

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

      if (newCorrectCount >= config.problemsToComplete) {
        setTimeout(() => {
          setShowLevelComplete(true);
          onLevelComplete();
        }, 1500);
      } else {
        setTimeout(loadProblem, 1500);
      }
    } else {
      setCurrentStreak(0);
      setHasTriedOnce(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setFeedback({ show: false, isCorrect: false });
    setIsRetry(true);
    setShowHint(true);
  };

  const handleContinue = () => {
    if (showLevelComplete) {
      setShowLevelComplete(false);
      setCorrectCount(0);
      setAttemptCount(0);
      setCurrentStreak(0);
      clearRecentAngleTypes();
      onNextLevel();
    } else {
      loadProblem();
    }
  };

  const handleSkipLevel = () => {
    clearRecentAngleTypes();
    setShowLevelComplete(true);
    onLevelComplete();
  };

  const canSkip = attemptCount >= 3 && correctCount / attemptCount >= 0.8;

  if (!problem) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  const angleInfo = ANGLE_TYPE_DEFINITIONS[problem.angleType];

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
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold text-orange-800 dark:text-orange-300 mb-2">
          <Compass size={16} />
          {config.title}
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          {problem.question}
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
        <div
          className="bg-gradient-to-r from-orange-600 to-amber-600 h-3 rounded-full transition-all duration-500"
          style={{
            width: `${(correctCount / config.problemsToComplete) * 100}%`,
          }}
        />
      </div>

      {/* Skip hints */}
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

      {/* Angle Display */}
      <div className="mb-6">
        <AngleCanvas
          problem={problem}
          showDegrees={config.showDegrees || feedback.show}
          showProtractor={config.showProtractor || feedback.show}
        />
      </div>

      {/* Angle type badge */}
      {feedback.show && (
        <div className="text-center mb-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: `${angleInfo.colorHint}20`,
              color: angleInfo.colorHint,
            }}
          >
            {angleInfo.nameEs} ({problem.angleDegrees}°)
          </span>
        </div>
      )}

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
        themeColor="orange"
        gridCols={problem.options.length === 3 ? 3 : 2}
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
                      {problem.explanation}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Respuesta correcta:</strong> {problem.correctAnswer}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      <em>
                        Ejemplo: {angleInfo.realWorldExample}
                      </em>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                      <em>Etimología: "ángulo" viene del latín "angulus" (esquina)</em>
                    </div>
                  </div>
                  {!hasTriedOnce || isRetry ? (
                    <div className="text-xs sm:text-sm text-red-700 dark:text-red-400">
                      ¡Inténtalo de nuevo! Ahora conoces la explicación.
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm text-red-700 dark:text-red-400">
                      Recuerda: La respuesta es <strong>{problem.correctAnswer}</strong>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Retry or Continue Button */}
      {feedback.show && !feedback.isCorrect && (
        <div className="flex gap-3">
          {!hasTriedOnce || isRetry ? (
            <button
              onClick={handleRetry}
              className="flex-1 bg-orange-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-orange-700 transition-all shadow-lg"
            >
              🔄 Intentar de Nuevo
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="flex-1 bg-orange-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-orange-700 transition-all shadow-lg"
            >
              🔄 Practicar Esta Pregunta
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
            <div className="font-bold text-orange-600 dark:text-orange-400 text-base sm:text-lg">
              {Math.round((correctCount / attemptCount) * 100)}%
            </div>
          </div>
        )}
        <div className="text-center">
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Racha</div>
          <div className="font-bold text-amber-600 dark:text-amber-400 text-base sm:text-lg">
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
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                      {correctCount}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Correctas
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {attemptCount > 0 ? Math.round((correctCount / attemptCount) * 100) : 0}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Precisión
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">
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
                className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105 shadow-lg"
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
