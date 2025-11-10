'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Question, RapidFireState, RapidFireScore } from '@/lib/types';
import { getRandomQuestions } from '@/lib/questions';
import { QuestionRenderer } from '../QuestionRenderer';
import { useQuizState } from '@/hooks/useQuizState';
import { useQuizProgress } from '@/hooks/useQuizProgress';
import { useQuizNavigation } from '@/hooks/useQuizNavigation';
import { formatTime, getTimerColor, generateQuizSessionId } from '@/lib/quiz-utils';
import { RAPIDFIRE_CONFIG } from '@/lib/constants';

interface RapidFireQuizProps {
  questions: Question[];
  level: 'M1' | 'M2';
  subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  replayQuestions?: Question[];
}

export default function RapidFireQuiz({
  questions: allQuestions,
  level,
  subject,
  difficulty = 'medium',
  replayQuestions
}: RapidFireQuizProps) {
  const config = RAPIDFIRE_CONFIG[difficulty];
  const searchParams = useSearchParams();
  const isDebugMode = searchParams?.get('debug') === 'true';

  const [showCountdown, setShowCountdown] = useState(!isDebugMode);
  const [countdown, setCountdown] = useState(3);
  const [showTimer, setShowTimer] = useState(() => {
    const saved = localStorage.getItem('quiz-show-timer');
    return saved !== null ? saved === 'true' : true;
  });
  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [quizSessionId] = useState(generateQuizSessionId);
  const [aiConversation] = useState<Array<{ role: string; message: string; timestamp: number }>>([]);

  // Rapid Fire state
  const [rapidFireState, setRapidFireState] = useState<RapidFireState>({
    hintsUsed: [],
    pausesUsed: 0,
    pausesRemaining: config.pauseAllowed ? 1 : 0,
    livesRemaining: config.livesSystem ? config.maxWrongAnswers : Infinity,
    wrongAnswerCount: 0,
    currentStreak: 0,
    longestStreak: 0,
    timePerQuestion: [],
    isPaused: false,
    pauseTimeRemaining: 0,
  });

  // Use shared hooks
  const {
    quizQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    quizSubmitted,
    setQuizSubmitted,
    currentQuestion,
    handleAnswerSelect: baseHandleAnswerSelect,
    resetQuiz,
  } = useQuizState({
    level,
    subject,
    questionCount: config.questionCount,
    replayQuestions,
  });

  const { score, submitQuiz } = useQuizProgress({ level });

  const { handlePrevious, handleNext } = useQuizNavigation(
    currentQuestionIndex,
    setCurrentQuestionIndex,
    quizQuestions.length
  );

  // Initialize rapid fire state when quiz questions load
  useEffect(() => {
    if (quizQuestions.length > 0) {
      setRapidFireState({
        hintsUsed: [],
        pausesUsed: 0,
        pausesRemaining: config.pauseAllowed ? 1 : 0,
        livesRemaining: config.livesSystem ? config.maxWrongAnswers : Infinity,
        wrongAnswerCount: 0,
        currentStreak: 0,
        longestStreak: 0,
        timePerQuestion: new Array(quizQuestions.length).fill(0),
        isPaused: false,
        pauseTimeRemaining: 0,
      });
      setTimeRemaining(config.timeLimit);
      setTotalTimeElapsed(0);
    }
  }, [quizQuestions.length, config.timeLimit, config.pauseAllowed, config.livesSystem, config.maxWrongAnswers]);

  // Countdown effect
  useEffect(() => {
    if (!showCountdown) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowCountdown(false), 800);
      return () => clearTimeout(timer);
    }
  }, [showCountdown, countdown]);

  // Timer effect
  useEffect(() => {
    if (quizSubmitted || quizQuestions.length === 0 || showCountdown || rapidFireState.isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
      setTotalTimeElapsed((prev) => prev + 1);

      // Track time per question
      setRapidFireState(prev => {
        const newTimePerQuestion = [...prev.timePerQuestion];
        newTimePerQuestion[currentQuestionIndex] = (newTimePerQuestion[currentQuestionIndex] || 0) + 1;
        return { ...prev, timePerQuestion: newTimePerQuestion };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizSubmitted, quizQuestions.length, showCountdown, rapidFireState.isPaused, currentQuestionIndex]);


  const toggleTimer = () => {
    const newValue = !showTimer;
    setShowTimer(newValue);
    localStorage.setItem('quiz-show-timer', String(newValue));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizSubmitted) return;

    baseHandleAnswerSelect(answerIndex);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    // Update rapid fire state
    setRapidFireState(prev => {
      const newState = { ...prev };

      if (isCorrect) {
        // Extreme mode: add time back
        if (difficulty === 'extreme' && 'timeBackPerCorrect' in config && config.timeBackPerCorrect) {
          setTimeRemaining(time => time + config.timeBackPerCorrect);
        }
      } else {
        newState.wrongAnswerCount = prev.wrongAnswerCount + 1;

        // Check lives system - GAME OVER
        if (config.livesSystem && newState.wrongAnswerCount >= config.maxWrongAnswers) {
          setTimeout(() => handleSubmitQuiz(), 2000);
          return newState;
        }
      }

      return newState;
    });

    // Auto-advance to next question after showing feedback
    const willBeGameOver = !isCorrect && config.livesSystem &&
      rapidFireState.wrongAnswerCount + 1 >= config.maxWrongAnswers;

    if (!willBeGameOver) {
      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          handleNext();
        } else {
          handleSubmitQuiz();
        }
      }, 1500);
    }
  };

  // Hint feature removed for rapidfire mode
  // General pause - unlimited use for real-life interruptions (helping at home, etc.)

  const handlePause = () => {
    setRapidFireState(prev => ({
      ...prev,
      isPaused: true,
    }));
  };

  const handleUnpause = () => {
    setRapidFireState(prev => ({
      ...prev,
      isPaused: false,
    }));
  };

  const calculateRapidFireSummary = () => {
    let correctCount = 0;
    quizQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const accuracy = (correctCount / quizQuestions.length) * 100;
    const passed = accuracy >= config.passingPercentage;

    return {
      correctAnswers: correctCount,
      totalQuestions: quizQuestions.length,
      accuracy,
      timeUsed: totalTimeElapsed,
      passed,
    };
  };

  const handleSubmitQuiz = async () => {
    await submitQuiz(quizQuestions, userAnswers, quizSessionId, aiConversation);
    setQuizSubmitted(true);
    setCurrentQuestionIndex(0);
  };

  const handleRestart = () => {
    const randomQuestions = getRandomQuestions(level, config.questionCount, subject);
    resetQuiz(randomQuestions);
    setTimeRemaining(config.timeLimit);
    setTotalTimeElapsed(0);
    setRapidFireState({
      hintsUsed: [],
      pausesUsed: 0,
      pausesRemaining: config.pauseAllowed ? 1 : 0,
      livesRemaining: config.livesSystem ? config.maxWrongAnswers : Infinity,
      wrongAnswerCount: 0,
      currentStreak: 0,
      longestStreak: 0,
      timePerQuestion: new Array(config.questionCount).fill(0),
      isPaused: false,
      pauseTimeRemaining: 0,
    });
    setShowCountdown(true);
    setCountdown(3);
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <p className="text-center text-gray-600 dark:text-gray-400">Cargando preguntas...</p>
      </div>
    );
  }

  // Countdown intro screen
  if (showCountdown) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
        <div className="text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-pulse">⚡</div>
            <h2 className="text-3xl font-bold text-white mb-2">Rapid Fire Mode</h2>
            <p className="text-xl text-white/90">¡Prepárate!</p>
          </div>

          <div className="relative">
            {countdown > 0 ? (
              <div
                key={countdown}
                className="text-[12rem] font-black text-white"
                style={{
                  animation: 'scale-in 0.5s ease-out, fade-out 0.3s ease-in 0.7s',
                  textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)'
                }}
              >
                {countdown}
              </div>
            ) : (
              <div
                className="text-[8rem] font-black text-yellow-300"
                style={{
                  animation: 'scale-in 0.3s ease-out',
                  textShadow: '0 0 60px rgba(253,224,71,0.8), 0 0 120px rgba(253,224,71,0.5)'
                }}
              >
                ¡GO!
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes scale-in {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes fade-out {
            to {
              opacity: 0;
              transform: scale(0.8);
            }
          }
        `}</style>
      </div>
    );
  }

  // Completion screen
  if (quizSubmitted && currentQuestionIndex === quizQuestions.length) {
    const summary = calculateRapidFireSummary();

    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          ¡Quiz Completado!
        </h2>

        <div className="mb-8">
          <div className="text-center mb-6">
            <div className={`text-7xl font-black mb-4 ${summary.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {summary.correctAnswers}/{summary.totalQuestions}
            </div>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              {summary.passed ? '✅ ¡Aprobado!' : '❌ No Aprobado'}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              {summary.accuracy.toFixed(1)}% precisión • {formatTime(summary.timeUsed)} usado
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Resumen de respuestas:</h3>
          <div className="space-y-2">
            {quizQuestions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const isAnswered = userAnswer !== null;

              return (
                <div
                  key={question.id}
                  className={`p-3 rounded-lg border-2 ${
                    !isAnswered
                      ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
                      : isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  <button
                    onClick={() => setCurrentQuestionIndex(index)}
                    className="w-full text-left hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Pregunta {index + 1}: {question.topic}
                      </span>
                      <span className="text-sm font-semibold">
                        {!isAnswered ? (
                          <span className="text-gray-500 dark:text-gray-400">Sin responder</span>
                        ) : isCorrect ? (
                          <span className="text-green-700 dark:text-green-300">✓ Correcta</span>
                        ) : (
                          <span className="text-red-700 dark:text-red-300">✗ Incorrecta</span>
                        )}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setCurrentQuestionIndex(0)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Revisar Respuestas
          </button>
          <button
            onClick={handleRestart}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Nuevo Quiz
          </button>
          <a
            href="/dashboard"
            className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold text-center"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  // Question view
  const userAnswer = userAnswers[currentQuestionIndex];
  const showFeedback = quizSubmitted || userAnswer !== null;

  const questionContent = (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 animate-fadeIn"
      style={{
        boxShadow: '0 0 60px rgba(139, 92, 246, 0.3), 0 20px 40px rgba(0, 0, 0, 0.2)',
      }}>
      {/* Question topic and progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {currentQuestion.topic}
          </span>
          <span data-testid="question-counter" className="text-sm text-gray-600 dark:text-gray-400">
            {currentQuestionIndex + 1}/{quizQuestions.length}
          </span>
        </div>
      </div>

      {/* Question Renderer */}
      <QuestionRenderer
        question={currentQuestion}
        mode={quizSubmitted ? "full" : "with-options"}
        selectedAnswer={userAnswer}
        showFeedback={showFeedback}
        onAnswerSelect={handleAnswerSelect}
        disabled={quizSubmitted}
        quizMode="rapidfire"
      />

      {/* Navigation buttons - only show in review mode after submission */}
      {quizSubmitted && (
        <div className="mt-8 flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-400 text-white disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            ← Anterior
          </button>
          {currentQuestionIndex < quizQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(quizQuestions.length)}
              className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
            >
              Ver Resumen
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
        {/* Centered Layout Container */}
        <div className="min-h-screen flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-5xl">
            {/* Lives - Above card when applicable */}
            {!quizSubmitted && config.livesSystem && (
              <div className="flex justify-center mb-4">
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl border border-white/20">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: config.maxWrongAnswers }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl transition-all ${i < rapidFireState.livesRemaining ? 'text-red-500 scale-100' : 'text-gray-300 dark:text-gray-600 scale-75 opacity-50'}`}
                      >
                        ❤️
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main game area with timer, question card, and pause */}
            <div className="flex items-start gap-4 mb-4">
              {/* Timer - Left of card */}
              {!quizSubmitted && (
                <div className="flex-shrink-0 pt-2">
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl border border-white/20">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">⚡</span>
                      <span className={`text-xl font-bold ${getTimerColor(timeRemaining, config.timeLimit)}`}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Question Card */}
              <div className="flex-1">
                {questionContent}
              </div>

              {/* Pause Button - Right of card (only in easy mode) */}
              {!quizSubmitted && config.pauseAllowed && !rapidFireState.isPaused && (
                <div className="flex-shrink-0 pt-2">
                  <button
                    onClick={handlePause}
                    className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl border border-white/20 hover:scale-105 transition-transform"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-2xl">⏸️</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Pausa</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Progress Bar - Below card */}
            {!quizSubmitted && (
              <div className="w-full">
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full h-2 shadow-xl overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
                    style={{
                      width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pause Overlay */}
      {rapidFireState.isPaused && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">⏸️</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Quiz Pausado
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Tómate el tiempo que necesites. El cronómetro está detenido.
              </p>
              <button
                onClick={handleUnpause}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ▶️ Continuar Quiz
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Puedes pausar las veces que necesites
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Overlay - Simple version */}
      {config.livesSystem && rapidFireState.livesRemaining === 0 && !quizSubmitted && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">💀</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Sin Vidas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Se acabaron las oportunidades
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Finalizando quiz...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
