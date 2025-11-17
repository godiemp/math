'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Check, X, Award, Lightbulb, Box } from 'lucide-react';
import {
  generateSolidsProblem,
  clearRecentSolidTypes,
  SOLIDS_DIFFICULTY_CONFIGS,
  SOLID_TYPE_DEFINITIONS,
  getSolidColor,
  toIsometric,
} from '@/lib/3dSolidsGenerator';
import type { SolidsProblem, SolidsGameDifficulty, SolidType } from '@/lib/types/3d-solids-game';

interface SolidsGameProps {
  difficulty: SolidsGameDifficulty;
  onBack: () => void;
  onLevelComplete: () => void;
  onNextLevel: () => void;
}

/**
 * Custom SVG renderer for 3D solids using isometric projection
 */
function SolidCanvas({
  problem,
  showLabels,
  showWireframe,
}: {
  problem: SolidsProblem;
  showLabels: boolean;
  showWireframe: boolean;
}) {
  const width = 400;
  const height = 350;
  const centerX = width / 2;
  const centerY = height / 2 + 20;

  const solidColor = getSolidColor(problem.solidType);
  const strokeWidth = showWireframe ? 2 : 3;

  const renderSolid = () => {
    switch (problem.solidType) {
      case 'cube':
        return renderCube();
      case 'rectangular_prism':
        return renderRectangularPrism();
      case 'sphere':
        return renderSphere();
      case 'cylinder':
        return renderCylinder();
      case 'cone':
        return renderCone();
      case 'pyramid':
        return renderPyramid();
      case 'triangular_prism':
        return renderTriangularPrism();
      default:
        return renderCube();
    }
  };

  const renderCube = () => {
    const size = 80;
    // Define 8 vertices of a cube in 3D space
    const vertices3D = [
      [-size / 2, -size / 2, -size / 2], // 0: back-bottom-left
      [size / 2, -size / 2, -size / 2], // 1: back-bottom-right
      [size / 2, -size / 2, size / 2], // 2: front-bottom-right
      [-size / 2, -size / 2, size / 2], // 3: front-bottom-left
      [-size / 2, size / 2, -size / 2], // 4: back-top-left
      [size / 2, size / 2, -size / 2], // 5: back-top-right
      [size / 2, size / 2, size / 2], // 6: front-top-right
      [-size / 2, size / 2, size / 2], // 7: front-top-left
    ];

    // Convert to isometric
    const vertices2D = vertices3D.map(([x, y, z]) => {
      const iso = toIsometric(x, y, z);
      return { x: centerX + iso.x, y: centerY + iso.y };
    });

    // Define faces (visible ones from isometric view)
    const topFace = `${vertices2D[4].x},${vertices2D[4].y} ${vertices2D[5].x},${vertices2D[5].y} ${vertices2D[6].x},${vertices2D[6].y} ${vertices2D[7].x},${vertices2D[7].y}`;
    const frontFace = `${vertices2D[3].x},${vertices2D[3].y} ${vertices2D[2].x},${vertices2D[2].y} ${vertices2D[6].x},${vertices2D[6].y} ${vertices2D[7].x},${vertices2D[7].y}`;
    const rightFace = `${vertices2D[2].x},${vertices2D[2].y} ${vertices2D[1].x},${vertices2D[1].y} ${vertices2D[5].x},${vertices2D[5].y} ${vertices2D[6].x},${vertices2D[6].y}`;

    return (
      <g>
        {/* Back edges (hidden) */}
        {showWireframe && (
          <>
            <line
              x1={vertices2D[0].x}
              y1={vertices2D[0].y}
              x2={vertices2D[1].x}
              y2={vertices2D[1].y}
              stroke={solidColor}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.3}
            />
            <line
              x1={vertices2D[0].x}
              y1={vertices2D[0].y}
              x2={vertices2D[3].x}
              y2={vertices2D[3].y}
              stroke={solidColor}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.3}
            />
            <line
              x1={vertices2D[0].x}
              y1={vertices2D[0].y}
              x2={vertices2D[4].x}
              y2={vertices2D[4].y}
              stroke={solidColor}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.3}
            />
          </>
        )}

        {/* Faces */}
        <polygon points={rightFace} fill={`${solidColor}30`} stroke={solidColor} strokeWidth={strokeWidth} />
        <polygon points={frontFace} fill={`${solidColor}50`} stroke={solidColor} strokeWidth={strokeWidth} />
        <polygon points={topFace} fill={`${solidColor}70`} stroke={solidColor} strokeWidth={strokeWidth} />

        {/* Vertices */}
        {showLabels &&
          vertices2D.slice(4).map((v, i) => (
            <circle key={i} cx={v.x} cy={v.y} r={4} fill={solidColor} />
          ))}
      </g>
    );
  };

  const renderRectangularPrism = () => {
    const width3D = 100;
    const height3D = 60;
    const depth3D = 60;

    const vertices3D = [
      [-width3D / 2, -height3D / 2, -depth3D / 2],
      [width3D / 2, -height3D / 2, -depth3D / 2],
      [width3D / 2, -height3D / 2, depth3D / 2],
      [-width3D / 2, -height3D / 2, depth3D / 2],
      [-width3D / 2, height3D / 2, -depth3D / 2],
      [width3D / 2, height3D / 2, -depth3D / 2],
      [width3D / 2, height3D / 2, depth3D / 2],
      [-width3D / 2, height3D / 2, depth3D / 2],
    ];

    const vertices2D = vertices3D.map(([x, y, z]) => {
      const iso = toIsometric(x, y, z);
      return { x: centerX + iso.x, y: centerY + iso.y };
    });

    const topFace = `${vertices2D[4].x},${vertices2D[4].y} ${vertices2D[5].x},${vertices2D[5].y} ${vertices2D[6].x},${vertices2D[6].y} ${vertices2D[7].x},${vertices2D[7].y}`;
    const frontFace = `${vertices2D[3].x},${vertices2D[3].y} ${vertices2D[2].x},${vertices2D[2].y} ${vertices2D[6].x},${vertices2D[6].y} ${vertices2D[7].x},${vertices2D[7].y}`;
    const rightFace = `${vertices2D[2].x},${vertices2D[2].y} ${vertices2D[1].x},${vertices2D[1].y} ${vertices2D[5].x},${vertices2D[5].y} ${vertices2D[6].x},${vertices2D[6].y}`;

    return (
      <g>
        {showWireframe && (
          <>
            <line
              x1={vertices2D[0].x}
              y1={vertices2D[0].y}
              x2={vertices2D[1].x}
              y2={vertices2D[1].y}
              stroke={solidColor}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.3}
            />
            <line
              x1={vertices2D[0].x}
              y1={vertices2D[0].y}
              x2={vertices2D[3].x}
              y2={vertices2D[3].y}
              stroke={solidColor}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.3}
            />
            <line
              x1={vertices2D[0].x}
              y1={vertices2D[0].y}
              x2={vertices2D[4].x}
              y2={vertices2D[4].y}
              stroke={solidColor}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.3}
            />
          </>
        )}

        <polygon points={rightFace} fill={`${solidColor}30`} stroke={solidColor} strokeWidth={strokeWidth} />
        <polygon points={frontFace} fill={`${solidColor}50`} stroke={solidColor} strokeWidth={strokeWidth} />
        <polygon points={topFace} fill={`${solidColor}70`} stroke={solidColor} strokeWidth={strokeWidth} />

        {showLabels &&
          vertices2D.slice(4).map((v, i) => (
            <circle key={i} cx={v.x} cy={v.y} r={4} fill={solidColor} />
          ))}
      </g>
    );
  };

  const renderSphere = () => {
    const radius = 70;

    return (
      <g>
        {/* Main sphere */}
        <circle cx={centerX} cy={centerY} r={radius} fill={`${solidColor}40`} stroke={solidColor} strokeWidth={strokeWidth} />

        {/* Horizontal ellipse for 3D effect */}
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={radius}
          ry={radius * 0.3}
          fill="none"
          stroke={solidColor}
          strokeWidth={1}
          strokeDasharray="4,4"
          opacity={0.5}
        />

        {/* Vertical ellipse */}
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={radius * 0.3}
          ry={radius}
          fill="none"
          stroke={solidColor}
          strokeWidth={1}
          strokeDasharray="4,4"
          opacity={0.5}
        />

        {/* Highlight */}
        <circle cx={centerX - radius * 0.3} cy={centerY - radius * 0.3} r={radius * 0.15} fill="white" opacity={0.6} />
      </g>
    );
  };

  const renderCylinder = () => {
    const radius = 50;
    const height = 120;
    const topY = centerY - height / 2;
    const bottomY = centerY + height / 2;

    return (
      <g>
        {/* Bottom ellipse (partially hidden) */}
        <ellipse
          cx={centerX}
          cy={bottomY}
          rx={radius}
          ry={radius * 0.4}
          fill={`${solidColor}30`}
          stroke={solidColor}
          strokeWidth={strokeWidth}
        />

        {/* Side surface */}
        <path
          d={`M ${centerX - radius} ${topY} L ${centerX - radius} ${bottomY} A ${radius} ${radius * 0.4} 0 0 0 ${centerX + radius} ${bottomY} L ${centerX + radius} ${topY}`}
          fill={`${solidColor}50`}
          stroke={solidColor}
          strokeWidth={strokeWidth}
        />

        {/* Top ellipse */}
        <ellipse
          cx={centerX}
          cy={topY}
          rx={radius}
          ry={radius * 0.4}
          fill={`${solidColor}70`}
          stroke={solidColor}
          strokeWidth={strokeWidth}
        />

        {showLabels && (
          <>
            <circle cx={centerX - radius} cy={topY} r={4} fill={solidColor} />
            <circle cx={centerX + radius} cy={topY} r={4} fill={solidColor} />
          </>
        )}
      </g>
    );
  };

  const renderCone = () => {
    const radius = 60;
    const height = 130;
    const apexY = centerY - height / 2;
    const baseY = centerY + height / 2;

    return (
      <g>
        {/* Base ellipse */}
        <ellipse
          cx={centerX}
          cy={baseY}
          rx={radius}
          ry={radius * 0.4}
          fill={`${solidColor}30`}
          stroke={solidColor}
          strokeWidth={strokeWidth}
        />

        {/* Cone sides */}
        <path
          d={`M ${centerX} ${apexY} L ${centerX - radius} ${baseY} A ${radius} ${radius * 0.4} 0 0 0 ${centerX + radius} ${baseY} Z`}
          fill={`${solidColor}50`}
          stroke={solidColor}
          strokeWidth={strokeWidth}
        />

        {/* Apex vertex */}
        <circle cx={centerX} cy={apexY} r={5} fill={solidColor} />

        {showLabels && <text x={centerX + 10} y={apexY} fontSize={12} fill={solidColor} fontWeight="bold">Ápice</text>}
      </g>
    );
  };

  const renderPyramid = () => {
    const baseSize = 80;
    const height = 100;
    const apexY = centerY - height / 2;

    // Base vertices in 3D
    const baseVertices3D = [
      [-baseSize / 2, 0, -baseSize / 2],
      [baseSize / 2, 0, -baseSize / 2],
      [baseSize / 2, 0, baseSize / 2],
      [-baseSize / 2, 0, baseSize / 2],
    ];

    const baseVertices2D = baseVertices3D.map(([x, y, z]) => {
      const iso = toIsometric(x, y + height / 2, z);
      return { x: centerX + iso.x, y: centerY + iso.y };
    });

    const apexIso = toIsometric(0, -height / 2, 0);
    const apex = { x: centerX + apexIso.x, y: centerY + apexIso.y };

    const baseFace = baseVertices2D.map((v) => `${v.x},${v.y}`).join(' ');

    return (
      <g>
        {/* Base (partially visible) */}
        <polygon points={baseFace} fill={`${solidColor}30`} stroke={solidColor} strokeWidth={strokeWidth} />

        {/* Front triangular face */}
        <polygon
          points={`${baseVertices2D[3].x},${baseVertices2D[3].y} ${baseVertices2D[2].x},${baseVertices2D[2].y} ${apex.x},${apex.y}`}
          fill={`${solidColor}50`}
          stroke={solidColor}
          strokeWidth={strokeWidth}
        />

        {/* Right triangular face */}
        <polygon
          points={`${baseVertices2D[2].x},${baseVertices2D[2].y} ${baseVertices2D[1].x},${baseVertices2D[1].y} ${apex.x},${apex.y}`}
          fill={`${solidColor}40`}
          stroke={solidColor}
          strokeWidth={strokeWidth}
        />

        {/* Hidden edges */}
        {showWireframe && (
          <>
            <line
              x1={baseVertices2D[0].x}
              y1={baseVertices2D[0].y}
              x2={apex.x}
              y2={apex.y}
              stroke={solidColor}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.3}
            />
          </>
        )}

        {/* Vertices */}
        <circle cx={apex.x} cy={apex.y} r={5} fill={solidColor} />
        {showLabels &&
          baseVertices2D.map((v, i) => (
            <circle key={i} cx={v.x} cy={v.y} r={4} fill={solidColor} />
          ))}
      </g>
    );
  };

  const renderTriangularPrism = () => {
    const width3D = 100;
    const height3D = 80;
    const depth3D = 60;

    // Front triangle vertices
    const frontTriangle3D = [
      [0, height3D / 2, depth3D / 2], // top
      [-width3D / 2, -height3D / 2, depth3D / 2], // bottom-left
      [width3D / 2, -height3D / 2, depth3D / 2], // bottom-right
    ];

    // Back triangle vertices
    const backTriangle3D = [
      [0, height3D / 2, -depth3D / 2],
      [-width3D / 2, -height3D / 2, -depth3D / 2],
      [width3D / 2, -height3D / 2, -depth3D / 2],
    ];

    const frontVertices2D = frontTriangle3D.map(([x, y, z]) => {
      const iso = toIsometric(x, y, z);
      return { x: centerX + iso.x, y: centerY + iso.y };
    });

    const backVertices2D = backTriangle3D.map(([x, y, z]) => {
      const iso = toIsometric(x, y, z);
      return { x: centerX + iso.x, y: centerY + iso.y };
    });

    const frontFace = frontVertices2D.map((v) => `${v.x},${v.y}`).join(' ');
    const topFace = `${frontVertices2D[0].x},${frontVertices2D[0].y} ${backVertices2D[0].x},${backVertices2D[0].y} ${backVertices2D[2].x},${backVertices2D[2].y} ${frontVertices2D[2].x},${frontVertices2D[2].y}`;
    const rightFace = `${frontVertices2D[2].x},${frontVertices2D[2].y} ${frontVertices2D[1].x},${frontVertices2D[1].y} ${backVertices2D[1].x},${backVertices2D[1].y} ${backVertices2D[2].x},${backVertices2D[2].y}`;

    return (
      <g>
        {/* Hidden edges */}
        {showWireframe && (
          <>
            <line
              x1={backVertices2D[0].x}
              y1={backVertices2D[0].y}
              x2={backVertices2D[1].x}
              y2={backVertices2D[1].y}
              stroke={solidColor}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.3}
            />
            <line
              x1={frontVertices2D[1].x}
              y1={frontVertices2D[1].y}
              x2={frontVertices2D[0].x}
              y2={frontVertices2D[0].y}
              stroke={solidColor}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.3}
            />
          </>
        )}

        {/* Faces */}
        <polygon points={rightFace} fill={`${solidColor}30`} stroke={solidColor} strokeWidth={strokeWidth} />
        <polygon points={topFace} fill={`${solidColor}60`} stroke={solidColor} strokeWidth={strokeWidth} />
        <polygon points={frontFace} fill={`${solidColor}50`} stroke={solidColor} strokeWidth={strokeWidth} />

        {/* Vertices */}
        {showLabels && (
          <>
            {frontVertices2D.map((v, i) => (
              <circle key={`f${i}`} cx={v.x} cy={v.y} r={4} fill={solidColor} />
            ))}
            {backVertices2D.map((v, i) => (
              <circle key={`b${i}`} cx={v.x} cy={v.y} r={4} fill={solidColor} opacity={0.6} />
            ))}
          </>
        )}
      </g>
    );
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
          <pattern id="solids-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#solids-grid)" />

        {renderSolid()}
      </svg>
    </div>
  );
}

export default function SolidsGame({ difficulty, onBack, onLevelComplete, onNextLevel }: SolidsGameProps) {
  const [problem, setProblem] = useState<SolidsProblem | null>(null);
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

  const config = SOLIDS_DIFFICULTY_CONFIGS[difficulty];

  const loadProblem = useCallback(() => {
    const newProblem = generateSolidsProblem(difficulty);
    setProblem(newProblem);
    setSelectedAnswer(null);
    setFeedback({ show: false, isCorrect: false });
    setShowHint(false);
    setIsRetry(false);
    setHasTriedOnce(false);
  }, [difficulty]);

  useEffect(() => {
    clearRecentSolidTypes();
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

      // Check if level is complete
      if (newCorrectCount >= config.problemsToComplete) {
        setTimeout(() => {
          setShowLevelComplete(true);
          onLevelComplete();
        }, 1500);
      } else {
        setTimeout(() => {
          loadProblem();
        }, 1500);
      }
    } else {
      setCurrentStreak(0);
      setHasTriedOnce(true);

      // Allow retry after 1.5 seconds
      setTimeout(() => {
        setFeedback({ show: false, isCorrect: false });
        setSelectedAnswer(null);
        setIsRetry(true);
      }, 1500);
    }
  };

  const handleContinue = () => {
    onNextLevel();
  };

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando problema...</p>
        </div>
      </div>
    );
  }

  if (showLevelComplete) {
    const accuracy = Math.round((correctCount / attemptCount) * 100);

    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full mb-6">
            <Award size={40} className="text-emerald-600 dark:text-emerald-400" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Nivel Completado!
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Precisión</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{accuracy}%</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
              <p className="text-sm text-green-600 dark:text-green-400 mb-1">Mejor Racha</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{bestStreak}</p>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Has completado {correctCount} problemas correctamente.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Volver al Menú
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105"
            >
              Siguiente Nivel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{correctCount}</span>
            <span>/{config.problemsToComplete}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">Racha: </span>
            <span className="font-semibold text-green-600 dark:text-green-400">{currentStreak}</span>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
        {/* Question */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{problem.question}</h2>
          {isRetry && (
            <p className="text-amber-600 dark:text-amber-400 text-sm">Intenta de nuevo</p>
          )}
        </div>

        {/* Solid Canvas */}
        <div className="mb-6">
          <SolidCanvas problem={problem} showLabels={config.showLabels} showWireframe={config.showWireframe} />
        </div>

        {/* Hint Button */}
        <div className="flex justify-center mb-4">
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              <Lightbulb size={16} />
              <span>
                Ver pista <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">H</kbd>
              </span>
            </button>
          ) : (
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-3 text-sm text-emerald-800 dark:text-emerald-300 max-w-md">
              <div className="flex items-start gap-2">
                <Lightbulb size={16} className="mt-0.5 flex-shrink-0" />
                <span>{problem.hint}</span>
              </div>
            </div>
          )}
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
          {problem.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === problem.correctAnswer;
            const showCorrect = feedback.show && isCorrectOption;
            const showIncorrect = feedback.show && isSelected && !isCorrectOption;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={feedback.show}
                className={`relative p-4 rounded-xl border-2 transition-all transform hover:scale-105 disabled:hover:scale-100 ${
                  showCorrect
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300'
                    : showIncorrect
                      ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300'
                      : isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{index + 1}</span>
                  {showCorrect && <Check size={20} className="text-green-600 dark:text-green-400" />}
                  {showIncorrect && <X size={20} className="text-red-600 dark:text-red-400" />}
                </div>
                <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {typeof option === 'number' ? option : option}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {feedback.show && feedback.isCorrect && problem.explanation && (
          <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
            <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-2">Información adicional:</h4>
            <p className="text-sm text-emerald-800 dark:text-emerald-300">{problem.explanation}</p>
            {SOLID_TYPE_DEFINITIONS[problem.solidType].eulerFormula && (
              <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-2">
                <strong>Fórmula de Euler:</strong> V - E + F = {SOLID_TYPE_DEFINITIONS[problem.solidType].eulerFormula}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progreso</span>
          <span>{Math.round((correctCount / config.problemsToComplete) * 100)}%</span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500"
            style={{ width: `${(correctCount / config.problemsToComplete) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
