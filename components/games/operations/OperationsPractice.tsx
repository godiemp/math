'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, X, Award, Sparkles, SkipForward } from 'lucide-react';
import { InlineMath } from '@/components/math/MathDisplay';
import { OPERATIONS_PATH } from '@/lib/operationsPath';
import { generateProblem, validateAnswer, clearProblemHistory } from '@/lib/operationsProblemGenerator';
import { recordCorrectAnswer, recordIncorrectAnswer, completeLevel } from '@/lib/operationsProgress';

interface Problem {
  level: number;
  title: string;
  description?: string;
  expression: string;
  expressionLatex: string;
  difficulty: string;
  problemsToComplete: number;
  correctAnswer: number | string;
  answerType?: 'number' | 'string' | 'multipleChoice' | 'array' | 'boolean';
  choices?: string[];
}

interface OperationsPracticeProps {
  level: number;
  onBack: () => void;
  onLevelComplete: () => void;
  onNextLevel: () => void;
}

export default function OperationsPractice({
  level,
  onBack,
  onLevelComplete,
  onNextLevel,
}: OperationsPracticeProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    correctAnswer?: string;
  }>({ show: false, isCorrect: false });
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProblem();
  }, [level]);

  useEffect(() => {
    if (problem && !feedback.show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [problem, feedback.show]);

  // Keyboard shortcuts for boolean questions
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts for boolean questions
      if (problem?.answerType !== 'boolean' || isSubmitting || feedback.show) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === 'v') {
        setUserAnswer('Verdadero');
        submitAnswer('Verdadero');
      } else if (key === 'f') {
        setUserAnswer('Falso');
        submitAnswer('Falso');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [problem, isSubmitting, feedback.show]);

  // Keyboard shortcut for Continue button (Enter key when level is complete)
  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (showLevelComplete && e.key === 'Enter') {
        handleContinue();
      }
    };

    window.addEventListener('keydown', handleEnterPress);
    return () => window.removeEventListener('keydown', handleEnterPress);
  }, [showLevelComplete]);

  const loadProblem = () => {
    try {
      // Find level config
      const levelConfig = OPERATIONS_PATH.find(l => l.level === level);
      if (!levelConfig) {
        console.error('Level not found:', level);
        return;
      }

      // Generate problem locally
      const generatedProblem = generateProblem(levelConfig);
      setProblem({
        ...generatedProblem,
      });

      setUserAnswer('');
      setFeedback({ show: false, isCorrect: false });
      setStartTime(Date.now());
    } catch (error) {
      console.error('Error loading problem:', error);
    }
  };

  const submitAnswer = (answer?: string) => {
    const answerToSubmit = answer || userAnswer;
    if (!answerToSubmit.trim() || isSubmitting || !problem) return;

    setIsSubmitting(true);

    try {
      // Validate answer locally
      const isCorrect = validateAnswer(answerToSubmit, problem.correctAnswer);

      setFeedback({
        show: true,
        isCorrect,
        correctAnswer: problem.correctAnswer.toString(),
      });

      setAttemptCount(attemptCount + 1);

      if (isCorrect) {
        const newCorrectCount = correctCount + 1;
        setCorrectCount(newCorrectCount);

        // Record correct answer
        recordCorrectAnswer(level);

        // Check if level is completed
        if (newCorrectCount >= problem.problemsToComplete) {
          completeLevel(level);
          setShowLevelComplete(true);
          onLevelComplete();
        } else {
          // Auto-load next problem after 1.5 seconds
          setTimeout(() => {
            loadProblem();
          }, 1500);
        }
      } else {
        // Record incorrect answer
        recordIncorrectAnswer(level);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAnswer();
  };

  const handleContinue = () => {
    if (showLevelComplete) {
      setShowLevelComplete(false);
      setCorrectCount(0);
      setAttemptCount(0);
      // Clear problem history for this level
      clearProblemHistory(level);
      // Go to next level for smooth experience
      onNextLevel();
    } else {
      loadProblem();
    }
  };

  const handleSkipLevel = () => {
    // Mark level as completed and clear history
    completeLevel(level);
    clearProblemHistory(level);
    setShowLevelComplete(true);
    onLevelComplete();
  };

  // Calculate if user can skip (80%+ accuracy after 3+ attempts)
  const canSkip = attemptCount >= 3 && correctCount / attemptCount >= 0.8;

  if (!problem) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando problema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base">Volver</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs sm:text-sm text-gray-600">
            Progreso: {correctCount} / {problem.problemsToComplete}
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
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold text-blue-800 mb-2 sm:mb-3">
          Nivel {problem.level}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 px-2">{problem.title}</h2>
        <p className="text-sm sm:text-base text-gray-600 px-2">{problem.description}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
          style={{
            width: `${(correctCount / problem.problemsToComplete) * 100}%`,
          }}
        />
      </div>

      {/* Skip hint */}
      {attemptCount >= 2 && !canSkip && correctCount / attemptCount >= 0.7 && (
        <div className="text-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-2">
          Mantén un 80% de precisión para poder saltar al siguiente nivel
        </div>
      )}
      {canSkip && (
        <div className="text-center text-xs sm:text-sm text-green-600 font-semibold mb-4 sm:mb-6 px-2">
          ¡Excelente trabajo! Puedes saltar al siguiente nivel
        </div>
      )}
      {!canSkip && attemptCount > 0 && (
        <div className="mb-4 sm:mb-6"></div>
      )}

      {/* Problem Display */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 break-words">
            {problem.expressionLatex ? (
              <InlineMath latex={problem.expressionLatex} />
            ) : (
              problem.expression
            )}
          </div>
          <div className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">Resuelve la operación</div>
        </div>

        {/* Answer Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {problem.answerType === 'boolean' ? (
            // Boolean (True/False) Buttons
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
                Selecciona tu respuesta:
              </label>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setUserAnswer('Verdadero');
                    submitAnswer('Verdadero');
                  }}
                  disabled={isSubmitting || feedback.show}
                  className={`py-6 sm:py-8 px-4 sm:px-6 text-2xl sm:text-3xl font-bold rounded-xl border-2 transition-all transform hover:scale-105 ${
                    userAnswer === 'Verdadero'
                      ? 'bg-green-600 text-white border-green-600 shadow-lg'
                      : 'bg-white text-gray-900 border-gray-300 hover:border-green-400'
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {problem.level === 1 ? (
                    <div className="flex flex-col items-center gap-1">
                      <span>✓ Verdadero</span>
                      <span className="text-xs sm:text-sm font-normal opacity-70">(Presiona V)</span>
                    </div>
                  ) : (
                    <span>✓ Verdadero</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUserAnswer('Falso');
                    submitAnswer('Falso');
                  }}
                  disabled={isSubmitting || feedback.show}
                  className={`py-6 sm:py-8 px-4 sm:px-6 text-2xl sm:text-3xl font-bold rounded-xl border-2 transition-all transform hover:scale-105 ${
                    userAnswer === 'Falso'
                      ? 'bg-red-600 text-white border-red-600 shadow-lg'
                      : 'bg-white text-gray-900 border-gray-300 hover:border-red-400'
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {problem.level === 1 ? (
                    <div className="flex flex-col items-center gap-1">
                      <span>✗ Falso</span>
                      <span className="text-xs sm:text-sm font-normal opacity-70">(Presiona F)</span>
                    </div>
                  ) : (
                    <span>✗ Falso</span>
                  )}
                </button>
              </div>
            </div>
          ) : problem.answerType === 'multipleChoice' && problem.choices ? (
            // Multiple Choice Buttons
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                Selecciona tu respuesta:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {problem.choices.map((choice, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setUserAnswer(choice);
                      submitAnswer(choice);
                    }}
                    disabled={isSubmitting || feedback.show}
                    className={`py-5 sm:py-6 px-4 text-xl sm:text-2xl font-bold rounded-xl border-2 transition-all transform hover:scale-105 ${
                      userAnswer === choice
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-blue-400'
                    } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Text Input (for numbers, strings, and arrays)
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tu respuesta:
              </label>
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isSubmitting || feedback.show}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-xl sm:text-2xl text-center border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:bg-gray-100 bg-white text-gray-900"
                placeholder={
                  problem.answerType === 'array'
                    ? 'Ej: 1,2,3,4,5'
                    : problem.answerType === 'string'
                    ? 'Escribe tu respuesta'
                    : 'Escribe tu respuesta'
                }
                autoComplete="off"
              />
              {problem.answerType === 'array' && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Separa los números con comas (,)
                </p>
              )}
            </div>
          )}

          {/* Feedback */}
          {feedback.show && (
            <div
              className={`p-4 sm:p-6 rounded-xl ${
                feedback.isCorrect
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-red-50 border-2 border-red-500'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                {feedback.isCorrect ? (
                  <>
                    <Check size={28} className="sm:w-8 sm:h-8 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <div className="text-base sm:text-lg font-bold text-green-900">
                        ¡Correcto! 🎉
                      </div>
                      <div className="text-xs sm:text-sm text-green-700">
                        Excelente trabajo, sigue así
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <X size={28} className="sm:w-8 sm:h-8 text-red-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <div className="text-base sm:text-lg font-bold text-red-900">
                        Incorrecto
                      </div>
                      <div className="text-xs sm:text-sm text-red-700 break-words">
                        La respuesta correcta es: <strong>{feedback.correctAnswer}</strong>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Submit Button (hidden for multiple choice and boolean since they auto-submit) */}
          {problem.answerType !== 'multipleChoice' && problem.answerType !== 'boolean' && (
            <button
              type="submit"
              disabled={isSubmitting || feedback.show || !userAnswer.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              {isSubmitting ? 'Verificando...' : 'Verificar Respuesta'}
            </button>
          )}

          {/* Continue Button (after incorrect answer) */}
          {feedback.show && !feedback.isCorrect && (
            <button
              type="button"
              onClick={handleContinue}
              className="w-full bg-gray-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-700 transition-all shadow-lg"
            >
              Siguiente Problema
            </button>
          )}
        </form>

        {/* Stats */}
        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-600">
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500">Correctas</div>
            <div className="font-bold text-green-600 text-base sm:text-lg">{correctCount}</div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500">Intentos</div>
            <div className="font-bold text-gray-900 text-base sm:text-lg">{attemptCount}</div>
          </div>
          {attemptCount > 0 && (
            <div className="text-center">
              <div className="text-xs sm:text-sm text-gray-500">Precisión</div>
              <div className="font-bold text-blue-600 text-base sm:text-lg">
                {Math.round((correctCount / attemptCount) * 100)}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Level Complete Modal */}
      {showLevelComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 sm:p-8">
            <div className="text-center">
              <div className="mb-4 sm:mb-6">
                <Award size={60} className="sm:w-20 sm:h-20 mx-auto text-yellow-500 animate-bounce" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                ¡Nivel Completado! 🎉
              </h2>
              <p className="text-base sm:text-xl text-gray-600 mb-4 sm:mb-6 px-2">
                Has completado el nivel {level}: <strong>{problem?.title}</strong>
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                      {correctCount}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Respuestas Correctas</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                      {attemptCount > 0
                        ? Math.round((correctCount / attemptCount) * 100)
                        : 0}
                      %
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Precisión</div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleContinue}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {level === 1 ? (
                  <div className="flex flex-col items-center">
                    <span>Continuar al Siguiente Nivel →</span>
                    <span className="text-xs sm:text-sm font-normal opacity-70 mt-1">(Presiona Enter)</span>
                  </div>
                ) : (
                  <span>Continuar al Siguiente Nivel →</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
