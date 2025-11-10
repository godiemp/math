'use client';

import { useState, useEffect } from 'react';
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

  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [showTimer, setShowTimer] = useState(() => {
    const saved = localStorage.getItem('quiz-show-timer');
    return saved !== null ? saved === 'true' : true;
  });
  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [quizSessionId] = useState(generateQuizSessionId);
  const [aiConversation] = useState<Array<{ role: string; message: string; timestamp: number }>>([]);
  const [showStreakNotification, setShowStreakNotification] = useState(false);
  const [streakNotificationValue, setStreakNotificationValue] = useState(0);

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

  // Pause timer effect
  useEffect(() => {
    if (!rapidFireState.isPaused || rapidFireState.pauseTimeRemaining <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRapidFireState(prev => {
        if (prev.pauseTimeRemaining <= 1) {
          return { ...prev, isPaused: false, pauseTimeRemaining: 0 };
        }
        return { ...prev, pauseTimeRemaining: prev.pauseTimeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [rapidFireState.isPaused, rapidFireState.pauseTimeRemaining]);

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
        newState.currentStreak = prev.currentStreak + 1;
        newState.longestStreak = Math.max(prev.longestStreak, newState.currentStreak);

        // Show streak notification occasionally (at milestones: 3, 5, 10, 15, 20, etc.)
        const shouldShowStreak = newState.currentStreak === 3 ||
                                 newState.currentStreak === 5 ||
                                 newState.currentStreak % 5 === 0;

        if (shouldShowStreak) {
          setStreakNotificationValue(newState.currentStreak);
          setShowStreakNotification(true);
          setTimeout(() => setShowStreakNotification(false), 2000);
        }

        // Extreme mode: add time back
        if (difficulty === 'extreme' && 'timeBackPerCorrect' in config && config.timeBackPerCorrect) {
          setTimeRemaining(time => time + config.timeBackPerCorrect);
        }
      } else {
        newState.currentStreak = 0;
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

  const handlePause = () => {
    if (!config.pauseAllowed || rapidFireState.pausesRemaining <= 0) return;

    setRapidFireState(prev => ({
      ...prev,
      isPaused: true,
      pausesUsed: prev.pausesUsed + 1,
      pausesRemaining: prev.pausesRemaining - 1,
      pauseTimeRemaining: config.pauseMaxSeconds,
    }));
  };

  const handleUnpause = () => {
    setRapidFireState(prev => ({
      ...prev,
      isPaused: false,
      pauseTimeRemaining: 0,
    }));
  };

  const calculateRapidFireScore = (): RapidFireScore => {
    let correctCount = 0;
    quizQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const basePoints = correctCount * config.pointsPerCorrect;

    // Speed bonus
    const timeAllocated = config.timeLimit;
    const timeSaved = Math.max(0, timeAllocated - totalTimeElapsed);
    const speedBonus = Math.floor(timeSaved / 10) * config.speedBonusPerTenSeconds;

    // Streak bonus
    let streakBonus = 0;
    if (config.streakBonusEnabled) {
      if (difficulty === 'extreme' && 'streakBonusThresholds' in config) {
        config.streakBonusThresholds.forEach(({ threshold, points }) => {
          if (rapidFireState.longestStreak >= threshold) {
            streakBonus = Math.max(streakBonus, points);
          }
        });
      } else if ('streakBonusThreshold' in config && 'streakBonusPoints' in config) {
        if (rapidFireState.longestStreak >= config.streakBonusThreshold) {
          streakBonus = config.streakBonusPoints;
        }
      }
    }

    // Perfect bonus
    const isPerfect = correctCount === quizQuestions.length;
    const perfectBonus = isPerfect ? config.perfectBonus : 0;

    // Hint penalty removed
    const hintPenalty = 0;

    // Total
    const totalPoints = Math.max(0, basePoints + speedBonus + streakBonus + perfectBonus - hintPenalty);

    // Check if passed
    const accuracy = (correctCount / quizQuestions.length) * 100;
    const passed = accuracy >= config.passingPercentage;

    return {
      basePoints,
      speedBonus,
      streakBonus,
      perfectBonus,
      hintPenalty,
      totalPoints,
      correctAnswers: correctCount,
      totalQuestions: quizQuestions.length,
      accuracy,
      timeUsed: totalTimeElapsed,
      timeSaved,
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
    const rapidFireScore = calculateRapidFireScore();

    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          ¡Quiz Completado!
        </h2>

        <div className="mb-8">
          <div className="text-center mb-6">
            <div className={`text-7xl font-black mb-4 ${rapidFireScore.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {Math.round(rapidFireScore.totalPoints)}
            </div>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              {rapidFireScore.passed ? '✅ ¡Aprobado!' : '❌ No Aprobado'}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              {rapidFireScore.accuracy.toFixed(1)}% precisión • {formatTime(rapidFireScore.timeUsed)} usado
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-700 space-y-2">
            <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-3">📊 Desglose de Puntuación</h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">Puntos base ({rapidFireScore.correctAnswers}/{rapidFireScore.totalQuestions} correctas)</span>
              <span className="font-bold text-green-600 dark:text-green-400">+{rapidFireScore.basePoints}</span>
            </div>

            {rapidFireScore.speedBonus > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">⚡ Bonus de velocidad ({formatTime(rapidFireScore.timeSaved)} ahorrado)</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">+{rapidFireScore.speedBonus}</span>
              </div>
            )}

            {rapidFireScore.streakBonus > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">🔥 Bonus de racha (mejor: {rapidFireState.longestStreak})</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">+{rapidFireScore.streakBonus}</span>
              </div>
            )}

            {rapidFireScore.perfectBonus > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">⭐ Bonus perfecto</span>
                <span className="font-bold text-yellow-600 dark:text-yellow-400">+{rapidFireScore.perfectBonus}</span>
              </div>
            )}


            <div className="pt-2 mt-2 border-t border-purple-300 dark:border-purple-600 flex justify-between">
              <span className="font-bold text-purple-900 dark:text-purple-100">Total</span>
              <span className="font-bold text-2xl text-purple-600 dark:text-purple-400">{Math.round(rapidFireScore.totalPoints)}</span>
            </div>
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
      {/* Rapid Fire Stats and Timer */}
      {!quizSubmitted && (
        <div className="mb-6 space-y-3">
          {/* Timer */}
          {showTimer ? (
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-2">
                <span className="text-base">⚡</span>
                <span className={`text-base font-bold ${getTimerColor(timeRemaining, config.timeLimit)}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <button
                onClick={toggleTimer}
                className="text-xs text-purple-500 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
                title="Ocultar timer"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={toggleTimer}
              className="text-sm text-purple-500 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline font-semibold"
              title="Mostrar timer"
            >
              ⚡ Mostrar tiempo
            </button>
          )}

          {/* Rapid Fire Stats Bar */}
          <div className="flex items-center justify-between gap-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700">
            {/* Lives */}
            {config.livesSystem && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vidas:</span>
                <div className="flex gap-1">
                  {Array.from({ length: config.maxWrongAnswers }).map((_, i) => (
                    <span key={i} className={`text-lg ${i < rapidFireState.livesRemaining ? 'text-red-500' : 'text-gray-300 dark:text-gray-600'}`}>
                      ❤️
                    </span>
                  ))}
                </div>
              </div>
            )}


            {/* Pause remaining */}
            {config.pauseAllowed && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pausas:</span>
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                  {rapidFireState.pausesRemaining}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {config.pauseAllowed && rapidFireState.pausesRemaining > 0 && !rapidFireState.isPaused && (
            <div className="flex gap-2">
              {/* Pause Button */}
              <button
                onClick={handlePause}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                ⏸️ Pausar ({config.pauseMaxSeconds}s)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {currentQuestion.topic}
          </span>
          <span data-testid="question-counter" className="text-sm text-gray-600 dark:text-gray-400">
            Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}
          </span>
        </div>
        <div className="w-full rounded-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          <div
            className="h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
            style={{
              width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
            }}
          />
        </div>
      </div>

      {/* Difficulty badge */}
      <div className="mb-8">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 shadow-md ${
          currentQuestion.difficulty === 'easy'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : currentQuestion.difficulty === 'medium'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {currentQuestion.difficulty === 'easy' ? '🟢 Fácil' :
           currentQuestion.difficulty === 'medium' ? '🟡 Media' : '🔴 Difícil'}
        </span>
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

      {/* Auto-advance message */}
      {!quizSubmitted && (
        <div className="mt-8 text-center text-sm text-purple-200 dark:text-purple-300 bg-purple-900/30 rounded-lg p-3">
          💡 Responde cada pregunta y avanza automáticamente. El quiz se enviará al terminar.
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 overflow-y-auto">
        <div className="min-h-full py-6 px-4 sm:py-8 sm:px-6">
          {questionContent}
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
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Tiempo de pausa restante:
              </p>
              <div className="text-5xl font-black text-teal-600 dark:text-teal-400 mb-8">
                {formatTime(rapidFireState.pauseTimeRemaining)}
              </div>
              <button
                onClick={handleUnpause}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ▶️ Continuar Ahora
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                La pausa terminará automáticamente cuando se acabe el tiempo
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {config.livesSystem && rapidFireState.livesRemaining === 0 && !quizSubmitted && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
          <div className="text-center px-4">
            <div
              className="text-9xl mb-6 animate-pulse"
              style={{
                animation: 'pulse 1s ease-in-out infinite',
                textShadow: '0 0 40px rgba(239, 68, 68, 0.8)'
              }}
            >
              💀
            </div>
            <h2
              className="text-7xl font-black text-red-500 mb-4"
              style={{
                textShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.4)',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            >
              GAME OVER
            </h2>
            <p className="text-3xl text-white/90 mb-2">
              Te quedaste sin vidas
            </p>
            <p className="text-xl text-white/60">
              Enviando resultados...
            </p>
          </div>
        </div>
      )}

      {/* Streak Notification */}
      {showStreakNotification && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-fadeIn">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-6 rounded-2xl shadow-2xl"
            style={{
              animation: 'scale-in 0.3s ease-out',
              boxShadow: '0 0 60px rgba(249, 115, 22, 0.6), 0 20px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="text-center">
              <div className="text-6xl mb-2">🔥</div>
              <div className="text-4xl font-black mb-1">¡RACHA!</div>
              <div className="text-5xl font-black">{streakNotificationValue}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
