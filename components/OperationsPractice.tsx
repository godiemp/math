'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, X, Award, Sparkles, SkipForward, Lightbulb, BookOpen, ListChecks, RefreshCw } from 'lucide-react';
import { InlineMath } from './MathDisplay';
import { OPERATIONS_PATH } from '@/lib/operationsPath';
import { generateProblem, validateAnswer, clearProblemHistory } from '@/lib/operationsProblemGenerator';
import { recordCorrectAnswer, recordIncorrectAnswer, completeLevel } from '@/lib/operationsProgress';
import { generateHelpContent, HelpContent } from '@/lib/operationsHelpGenerator';

interface Problem {
  level: number;
  title: string;
  description: string;
  expression: string;
  expressionLatex: string;
  difficulty: string;
  problemsToComplete: number;
  correctAnswer: number | string;
  answerType?: 'number' | 'string' | 'multipleChoice' | 'array';
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
  const [helpContent, setHelpContent] = useState<HelpContent | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpType, setHelpType] = useState<'hint' | 'example' | 'solution' | null>(null);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProblem();
  }, [level]);

  useEffect(() => {
    if (problem && !feedback.show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [problem, feedback.show]);

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

      // Generate help content for this problem
      const help = generateHelpContent(levelConfig, {
        expression: generatedProblem.expression,
        correctAnswer: generatedProblem.correctAnswer,
      });
      setHelpContent(help);

      setUserAnswer('');
      setFeedback({ show: false, isCorrect: false });
      setStartTime(Date.now());
      setCurrentHintIndex(0);
      setShowHelpModal(false);
      setHelpType(null);
    } catch (error) {
      console.error('Error loading problem:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userAnswer.trim() || isSubmitting || !problem) return;

    setIsSubmitting(true);

    try {
      // Validate answer locally
      const isCorrect = validateAnswer(userAnswer, problem.correctAnswer);

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

  const handleShowHint = () => {
    setHelpType('hint');
    setShowHelpModal(true);
  };

  const handleShowExample = () => {
    setHelpType('example');
    setShowHelpModal(true);
  };

  const handleShowSolution = () => {
    setHelpType('solution');
    setShowHelpModal(true);
  };

  const handleSimilarProblem = () => {
    loadProblem();
  };

  const handleNextHint = () => {
    if (helpContent && currentHintIndex < helpContent.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  const handleCloseHelp = () => {
    setShowHelpModal(false);
    setHelpType(null);
  };

  // Calculate if user can skip (80%+ accuracy after 3+ attempts)
  const canSkip = attemptCount >= 3 && correctCount / attemptCount >= 0.8;

  if (showLevelComplete) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-6">
            <Award size={80} className="mx-auto text-yellow-500 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Nivel Completado! 🎉
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Has completado el nivel {level}: <strong>{problem?.title}</strong>
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {correctCount}
                </div>
                <div className="text-sm text-gray-600">Respuestas Correctas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {attemptCount > 0
                    ? Math.round((correctCount / attemptCount) * 100)
                    : 0}
                  %
                </div>
                <div className="text-sm text-gray-600">Precisión</div>
              </div>
            </div>
          </div>
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Continuar al Siguiente Nivel →
          </button>
        </div>
      </div>
    );
  }

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
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Progreso: {correctCount} / {problem.problemsToComplete}
          </div>
          {canSkip && (
            <button
              onClick={handleSkipLevel}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all shadow-md transform hover:scale-105"
              title="Saltar al siguiente nivel (80%+ precisión)"
            >
              <SkipForward size={16} />
              <span>Saltar Nivel</span>
            </button>
          )}
        </div>
      </div>

      {/* Level Info */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-1 text-sm font-semibold text-blue-800 mb-3">
          Nivel {problem.level}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{problem.title}</h2>
        <p className="text-gray-600">{problem.description}</p>
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
        <div className="text-center text-sm text-gray-600 mb-6">
          Mantén un 80% de precisión para poder saltar al siguiente nivel
        </div>
      )}
      {canSkip && (
        <div className="text-center text-sm text-green-600 font-semibold mb-6">
          ¡Excelente trabajo! Puedes saltar al siguiente nivel
        </div>
      )}
      {!canSkip && attemptCount > 0 && (
        <div className="mb-6"></div>
      )}

      {/* Problem Display */}
      <div className="max-w-xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-12 mb-8 text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {problem.expressionLatex ? (
              <InlineMath latex={problem.expressionLatex} />
            ) : (
              problem.expression
            )}
          </div>
          <div className="text-gray-500 text-sm mt-4">Resuelve la operación</div>
        </div>

        {/* Help Buttons - Always Available */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={handleShowHint}
            className="flex items-center justify-center space-x-2 bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-3 rounded-lg font-semibold transition-all border-2 border-amber-300 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            <Lightbulb size={20} />
            <span>Ver Pista</span>
          </button>
          <button
            onClick={handleShowExample}
            className="flex items-center justify-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-3 rounded-lg font-semibold transition-all border-2 border-blue-300 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            <BookOpen size={20} />
            <span>Ver Ejemplo</span>
          </button>
          <button
            onClick={handleShowSolution}
            className="flex items-center justify-center space-x-2 bg-green-100 hover:bg-green-200 text-green-800 px-4 py-3 rounded-lg font-semibold transition-all border-2 border-green-300 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            <ListChecks size={20} />
            <span>Ver Solución</span>
          </button>
          <button
            onClick={handleSimilarProblem}
            className="flex items-center justify-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-3 rounded-lg font-semibold transition-all border-2 border-purple-300 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            <RefreshCw size={20} />
            <span>Otro Similar</span>
          </button>
        </div>

        {/* Answer Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {problem.answerType === 'multipleChoice' && problem.choices ? (
            // Multiple Choice Buttons
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                Selecciona tu respuesta:
              </label>
              <div className="grid grid-cols-3 gap-4">
                {problem.choices.map((choice, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setUserAnswer(choice);
                      // Auto-submit after selection
                      setTimeout(() => {
                        if (!isSubmitting && !feedback.show) {
                          handleSubmit(new Event('submit') as any);
                        }
                      }, 100);
                    }}
                    disabled={isSubmitting || feedback.show}
                    className={`py-6 px-4 text-2xl font-bold rounded-xl border-2 transition-all transform hover:scale-105 ${
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
                className="w-full px-6 py-4 text-2xl text-center border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:bg-gray-100"
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
              className={`p-6 rounded-xl ${
                feedback.isCorrect
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-red-50 border-2 border-red-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                {feedback.isCorrect ? (
                  <>
                    <Check size={32} className="text-green-600" />
                    <div>
                      <div className="text-lg font-bold text-green-900">
                        ¡Correcto! 🎉
                      </div>
                      <div className="text-sm text-green-700">
                        Excelente trabajo, sigue así
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <X size={32} className="text-red-600" />
                    <div>
                      <div className="text-lg font-bold text-red-900">
                        Incorrecto
                      </div>
                      <div className="text-sm text-red-700">
                        La respuesta correcta es: <strong>{feedback.correctAnswer}</strong>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Submit Button (hidden for multiple choice since it auto-submits) */}
          {problem.answerType !== 'multipleChoice' && (
            <button
              type="submit"
              disabled={isSubmitting || feedback.show || !userAnswer.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              {isSubmitting ? 'Verificando...' : 'Verificar Respuesta'}
            </button>
          )}

          {/* Continue Button (after incorrect answer) */}
          {feedback.show && !feedback.isCorrect && (
            <button
              type="button"
              onClick={handleContinue}
              className="w-full bg-gray-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-700 transition-all shadow-lg"
            >
              Siguiente Problema
            </button>
          )}
        </form>

        {/* Stats */}
        <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-600">
          <div>
            Correctas: <span className="font-bold text-green-600">{correctCount}</span>
          </div>
          <div>
            Intentos: <span className="font-bold text-gray-900">{attemptCount}</span>
          </div>
          {attemptCount > 0 && (
            <div>
              Precisión:{' '}
              <span className="font-bold text-blue-600">
                {Math.round((correctCount / attemptCount) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && helpContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  {helpType === 'hint' && (
                    <>
                      <Lightbulb className="text-amber-600" size={28} />
                      <span>Pista</span>
                    </>
                  )}
                  {helpType === 'example' && (
                    <>
                      <BookOpen className="text-blue-600" size={28} />
                      <span>Ejemplo</span>
                    </>
                  )}
                  {helpType === 'solution' && (
                    <>
                      <ListChecks className="text-green-600" size={28} />
                      <span>Solución Paso a Paso</span>
                    </>
                  )}
                </h3>
                <button
                  onClick={handleCloseHelp}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {helpType === 'hint' && (
                <div className="space-y-4">
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6">
                    <p className="text-lg text-amber-900">
                      {helpContent.hints[currentHintIndex]}
                    </p>
                  </div>
                  {currentHintIndex < helpContent.hints.length - 1 && (
                    <button
                      onClick={handleNextHint}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
                    >
                      Siguiente Pista ({currentHintIndex + 1}/{helpContent.hints.length})
                    </button>
                  )}
                  {currentHintIndex === helpContent.hints.length - 1 && (
                    <p className="text-center text-sm text-gray-600">
                      Has visto todas las pistas
                    </p>
                  )}
                </div>
              )}

              {helpType === 'example' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                    <h4 className="font-bold text-blue-900 text-lg mb-3">
                      Problema de Ejemplo:
                    </h4>
                    <div className="bg-white rounded-lg p-4 mb-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {helpContent.example.problem}
                      </p>
                    </div>
                    <h4 className="font-bold text-blue-900 text-lg mb-3">
                      Solución:
                    </h4>
                    <div className="space-y-2">
                      {helpContent.example.solution.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <p className="text-gray-800">{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-lg font-bold text-blue-900">
                        Respuesta: <span className="text-blue-600">{helpContent.example.answer}</span>
                      </p>
                    </div>
                  </div>

                  {helpContent.tips && helpContent.tips.length > 0 && (
                    <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
                      <h4 className="font-bold text-purple-900 text-lg mb-3">
                        💡 Consejos:
                      </h4>
                      <ul className="space-y-2">
                        {helpContent.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-purple-600">•</span>
                            <span className="text-gray-800">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {helpType === 'solution' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                    <h4 className="font-bold text-green-900 text-lg mb-4">
                      Pasos para resolver:
                    </h4>
                    <div className="space-y-3">
                      {helpContent.stepByStep.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <p className="text-gray-800 pt-1 text-lg">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {helpContent.tips && helpContent.tips.length > 0 && (
                    <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
                      <h4 className="font-bold text-purple-900 text-lg mb-3">
                        💡 Consejos para el futuro:
                      </h4>
                      <ul className="space-y-2">
                        {helpContent.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-purple-600">•</span>
                            <span className="text-gray-800">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
              <button
                onClick={handleCloseHelp}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
