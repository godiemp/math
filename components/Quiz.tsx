'use client';

import { useState, useEffect } from 'react';
import { Question, QuestionAttempt } from '@/lib/types';
import { getRandomQuestions } from '@/lib/questions';
import { QuestionRenderer } from './QuestionRenderer';
import { api } from '@/lib/api-client';
import { isAuthenticated } from '@/lib/auth';

interface QuizProps {
  questions: Question[];
  level: 'M1' | 'M2';
  subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  quizMode?: 'zen' | 'rapidfire';
  difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
}

export default function Quiz({ questions: allQuestions, level, subject, quizMode = 'zen', difficulty = 'medium' }: QuizProps) {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showCountdown, setShowCountdown] = useState(quizMode === 'rapidfire');
  const [countdown, setCountdown] = useState(3);
  const [showZenIntro, setShowZenIntro] = useState(quizMode === 'zen');
  const [zenIntroPhase, setZenIntroPhase] = useState(0); // 0: fade in, 1: breathe, 2: fade out
  const [aiHelpMap, setAiHelpMap] = useState<Map<number, string>>(new Map());
  const [isLoadingAIHelp, setIsLoadingAIHelp] = useState(false);
  const [showQuickNav, setShowQuickNav] = useState(() => {
    // Load quick nav visibility from localStorage
    const saved = localStorage.getItem('quiz-show-quick-nav');
    return saved !== null ? saved === 'true' : true; // Default to showing
  });

  // Get time limit based on difficulty
  const getTimeLimit = () => {
    if (quizMode !== 'rapidfire') return 0;
    switch (difficulty) {
      case 'easy': return 25 * 60; // 25 minutes = 1500 seconds
      case 'medium': return 20 * 60; // 20 minutes = 1200 seconds
      case 'hard': return 15 * 60; // 15 minutes = 900 seconds
      case 'extreme': return 10 * 60; // 10 minutes = 600 seconds
      default: return 20 * 60;
    }
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeLimit());
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [showTimer, setShowTimer] = useState(() => {
    // Load timer visibility preference from localStorage
    const saved = localStorage.getItem('quiz-show-timer');
    return saved !== null ? saved === 'true' : true; // Default to showing timer
  });

  // Toggle timer visibility and save preference
  const toggleTimer = () => {
    const newValue = !showTimer;
    setShowTimer(newValue);
    localStorage.setItem('quiz-show-timer', String(newValue));
  };

  // Toggle quick nav visibility and save preference
  const toggleQuickNav = () => {
    const newValue = !showQuickNav;
    setShowQuickNav(newValue);
    localStorage.setItem('quiz-show-quick-nav', String(newValue));
  };

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`paes-progress-${level}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setScore(progress);
    }

    // Initialize quiz with 10 random questions
    const randomQuestions = getRandomQuestions(level, 10, subject);
    setQuizQuestions(randomQuestions);
    setUserAnswers(new Array(randomQuestions.length).fill(null));
    setTimeRemaining(getTimeLimit()); // Reset timer based on difficulty
    setTotalTimeElapsed(0);
  }, [level, subject, difficulty]);

  // Countdown effect for rapidfire mode intro
  useEffect(() => {
    if (!showCountdown) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown finished, hide countdown screen after showing "GO!"
      const timer = setTimeout(() => {
        setShowCountdown(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showCountdown, countdown]);

  // Zen intro effect
  useEffect(() => {
    if (!showZenIntro) return;

    if (zenIntroPhase === 0) {
      // Fade in phase - show for 1 second
      const timer = setTimeout(() => {
        setZenIntroPhase(1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (zenIntroPhase === 1) {
      // Breathing phase - show for 2.5 seconds
      const timer = setTimeout(() => {
        setZenIntroPhase(2);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (zenIntroPhase === 2) {
      // Fade out phase - hide after 0.8 seconds
      const timer = setTimeout(() => {
        setShowZenIntro(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showZenIntro, zenIntroPhase]);

  // Timer effect for rapidfire mode
  useEffect(() => {
    if (quizMode !== 'rapidfire' || quizSubmitted || quizQuestions.length === 0 || showCountdown) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up, auto-submit the quiz
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
      setTotalTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizMode, quizSubmitted, quizQuestions.length, showCountdown]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (!quizSubmitted) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = answerIndex;
      setUserAnswers(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    const attempts: QuestionAttempt[] = [];

    quizQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) {
        correctCount++;
      }

      if (userAnswer !== null) {
        const attempt: QuestionAttempt = {
          questionId: question.id,
          question: question.question,
          topic: question.topic,
          level: level,
          userAnswer: userAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect: isCorrect,
          timestamp: Date.now(),
          options: question.options,
          explanation: question.explanation,
          difficulty: question.difficulty,
        };
        attempts.push(attempt);
      }
    });

    const newScore = {
      correct: score.correct + correctCount,
      total: score.total + quizQuestions.length
    };
    setScore(newScore);

    // Save progress to localStorage
    localStorage.setItem(`paes-progress-${level}`, JSON.stringify(newScore));

    // Save detailed question attempt history
    const historyKey = `paes-history-${level}`;
    const existingHistory = localStorage.getItem(historyKey);
    const history: QuestionAttempt[] = existingHistory ? JSON.parse(existingHistory) : [];

    // Add new attempts to the beginning of the array
    attempts.reverse().forEach(attempt => {
      history.unshift(attempt);
    });

    // Save updated history
    localStorage.setItem(historyKey, JSON.stringify(history));

    // Update streak if user is authenticated
    const updateStreak = async () => {
      if (isAuthenticated()) {
        try {
          await api.post('/api/streak/update');
        } catch (error) {
          console.error('Failed to update streak:', error);
          // Don't block the quiz submission if streak update fails
        }
      }
    };
    updateStreak();

    setQuizSubmitted(true);
    setCurrentQuestionIndex(0); // Go back to first question to review
  };

  const handleRestart = () => {
    const randomQuestions = getRandomQuestions(level, 10, subject);
    setQuizQuestions(randomQuestions);
    setUserAnswers(new Array(randomQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setTimeRemaining(getTimeLimit()); // Reset timer based on difficulty
    setTotalTimeElapsed(0); // Reset elapsed time
    setAiHelpMap(new Map()); // Reset AI help
    setIsLoadingAIHelp(false);
    // Reset countdown for rapidfire mode
    if (quizMode === 'rapidfire') {
      setShowCountdown(true);
      setCountdown(3);
    }
    // Reset zen intro for zen mode
    if (quizMode === 'zen') {
      setShowZenIntro(true);
      setZenIntroPhase(0);
    }
  };

  const handleRequestAIHelp = async () => {
    const question = currentQuestion;
    const userAnswer = userAnswers[currentQuestionIndex];

    if (userAnswer === null || userAnswer === question.correctAnswer) {
      return; // No need for help if correct or not answered
    }

    // Check if we already have help for this question
    if (aiHelpMap.has(currentQuestionIndex)) {
      return;
    }

    setIsLoadingAIHelp(true);

    try {
      const response = await fetch('/api/ai-help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.question,
          userAnswer: userAnswer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          options: question.options,
          topic: question.topic,
        }),
      });

      const data = await response.json();

      if (data.success && data.help) {
        setAiHelpMap(new Map(aiHelpMap.set(currentQuestionIndex, data.help)));
      }
    } catch (error) {
      console.error('Error fetching AI help:', error);
    } finally {
      setIsLoadingAIHelp(false);
    }
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <p className="text-center text-gray-600 dark:text-gray-400">Cargando preguntas...</p>
      </div>
    );
  }

  // Zen intro screen for zen mode
  if (showZenIntro) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 dark:from-teal-800 dark:via-cyan-900 dark:to-blue-900">
        <div className="text-center">
          <div className="mb-8">
            <div
              className="text-6xl mb-6"
              style={{
                animation: zenIntroPhase === 2 ? 'fade-out 0.8s ease-out' : 'fade-in 1s ease-in'
              }}
            >
              🧘
            </div>
            <h2
              className="text-4xl font-bold text-white mb-3"
              style={{
                animation: zenIntroPhase === 2 ? 'fade-out 0.8s ease-out' : 'fade-in 1s ease-in 0.2s both'
              }}
            >
              Modo Zen
            </h2>
            <p
              className="text-xl text-white/90"
              style={{
                animation: zenIntroPhase === 2 ? 'fade-out 0.8s ease-out' : 'fade-in 1s ease-in 0.4s both'
              }}
            >
              A tu ritmo, sin presión
            </p>
          </div>

          {/* Breathing circle animation */}
          <div className="relative flex items-center justify-center h-48">
            <div
              className="absolute rounded-full bg-white/20"
              style={{
                width: '120px',
                height: '120px',
                animation: zenIntroPhase === 1
                  ? 'breathe 4s ease-in-out infinite'
                  : zenIntroPhase === 2
                  ? 'fade-out 0.8s ease-out'
                  : 'fade-in 1s ease-in 0.6s both',
                boxShadow: '0 0 60px rgba(255,255,255,0.4), 0 0 100px rgba(255,255,255,0.2)'
              }}
            />
            <div
              className="absolute rounded-full bg-white/30"
              style={{
                width: '80px',
                height: '80px',
                animation: zenIntroPhase === 1
                  ? 'breathe-reverse 4s ease-in-out infinite'
                  : zenIntroPhase === 2
                  ? 'fade-out 0.8s ease-out'
                  : 'fade-in 1s ease-in 0.8s both',
                boxShadow: '0 0 40px rgba(255,255,255,0.5)'
              }}
            />
            <div
              className="absolute rounded-full bg-white/40"
              style={{
                width: '40px',
                height: '40px',
                animation: zenIntroPhase === 1
                  ? 'breathe 4s ease-in-out infinite'
                  : zenIntroPhase === 2
                  ? 'fade-out 0.8s ease-out'
                  : 'fade-in 1s ease-in 1s both',
                boxShadow: '0 0 20px rgba(255,255,255,0.6)'
              }}
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-out {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0.95);
            }
          }
          @keyframes breathe {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.8;
            }
          }
          @keyframes breathe-reverse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.7;
            }
            50% {
              transform: scale(0.8);
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    );
  }

  // Countdown intro screen for rapidfire mode
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
                className="text-[12rem] font-black text-white animate-[scale-in_0.5s_ease-out]"
                style={{
                  animation: 'scale-in 0.5s ease-out, fade-out 0.3s ease-in 0.7s',
                  textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)'
                }}
              >
                {countdown}
              </div>
            ) : (
              <div
                className="text-[8rem] font-black text-yellow-300 animate-[scale-in_0.3s_ease-out]"
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

  // Completion screen after submission
  if (quizSubmitted && currentQuestionIndex === quizQuestions.length) {
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const correctCount = quizQuestions.filter((q, i) => userAnswers[i] === q.correctAnswer).length;
    const percentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          ¡Quiz Completado!
        </h2>
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            {percentage}%
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {correctCount} de {answeredCount} respuestas correctas
          </p>
          {answeredCount < quizQuestions.length && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              ({quizQuestions.length - answeredCount} preguntas sin responder)
            </p>
          )}
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
                      : quizMode === 'zen'
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
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
                        ) : quizMode === 'zen' ? (
                          <span className="text-amber-700 dark:text-amber-300">◆ Revisar</span>
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

  // Question view (before or after submission)
  const userAnswer = userAnswers[currentQuestionIndex];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;
  const showFeedback = quizSubmitted;

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine timer color based on time remaining
  const getTimerColor = () => {
    const totalTime = getTimeLimit();
    const percentRemaining = (timeRemaining / totalTime) * 100;
    if (percentRemaining > 50) return 'text-green-600 dark:text-green-400';
    if (percentRemaining > 25) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Calculate average time per question
  const getAverageTimePerQuestion = () => {
    const questionsAnswered = userAnswers.filter(a => a !== null).length || 1;
    return Math.floor(totalTimeElapsed / questionsAnswered);
  };

  // Wrap content with special styling for rapidfire and zen modes
  const questionContent = (
    <div className={`max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg ${
      quizMode === 'rapidfire' || quizMode === 'zen' ? 'p-6 sm:p-8 animate-fadeIn' : 'p-8'
    }`}
    style={quizMode === 'rapidfire' ? {
      boxShadow: '0 0 60px rgba(139, 92, 246, 0.3), 0 20px 40px rgba(0, 0, 0, 0.2)',
    } : quizMode === 'zen' ? {
      boxShadow: '0 0 60px rgba(20, 184, 166, 0.3), 0 20px 40px rgba(0, 0, 0, 0.2)',
    } : undefined}>
      {/* Simplified Timer Display - Only show in rapidfire mode and when quiz is not submitted */}
      {quizMode === 'rapidfire' && !quizSubmitted && (
        <div className="mb-6">
          {showTimer ? (
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-2">
                <span className="text-base">⚡</span>
                <span className={`text-base font-bold ${getTimerColor()}`}>
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
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className={`text-sm font-semibold ${
            quizMode === 'rapidfire'
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'
              : quizMode === 'zen'
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400'
              : 'text-indigo-600 dark:text-indigo-400'
          }`}>
            {currentQuestion.topic}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}
          </span>
        </div>
        <div className={`w-full rounded-full h-2 ${
          quizMode === 'rapidfire' || quizMode === 'zen'
            ? 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600'
            : 'bg-gray-200 dark:bg-gray-700'
        }`}>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              quizMode === 'rapidfire'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                : quizMode === 'zen'
                ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500'
                : 'bg-indigo-600'
            }`}
            style={{
              width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
              ...(quizMode === 'rapidfire' ? { boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' } :
                  quizMode === 'zen' ? { boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)' } : {})
            }}
          />
        </div>
      </div>

      {/* Quick Navigation Panel */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Navegación rápida:
          </span>
          <button
            onClick={toggleQuickNav}
            className={`text-xs px-3 py-1 rounded-md transition-colors ${
              quizMode === 'zen'
                ? 'text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30'
                : quizMode === 'rapidfire'
                ? 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
            }`}
          >
            {showQuickNav ? '▲ Ocultar' : '▼ Mostrar'}
          </button>
        </div>
        {showQuickNav && (
          <div className="grid grid-cols-10 gap-2">
          {quizQuestions.map((q, idx) => {
            const answer = userAnswers[idx];
            const isAnswered = answer !== null;
            const isCurrentQuestion = idx === currentQuestionIndex;
            let isQuestionCorrect = false;

            if (quizSubmitted && isAnswered) {
              isQuestionCorrect = answer === q.correctAnswer;
            }

            let buttonClass = 'w-full aspect-square rounded-lg text-xs font-bold transition-all flex items-center justify-center ';

            if (isCurrentQuestion) {
              buttonClass += quizMode === 'zen'
                ? 'ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-gray-800 '
                : quizMode === 'rapidfire'
                ? 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-800 '
                : 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800 ';
            }

            if (quizSubmitted) {
              if (!isAnswered) {
                buttonClass += 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400';
              } else if (isQuestionCorrect) {
                buttonClass += 'bg-green-500 text-white';
              } else {
                // Zen mode uses softer amber color
                buttonClass += quizMode === 'zen'
                  ? 'bg-amber-400 text-white'
                  : 'bg-red-500 text-white';
              }
            } else {
              if (isAnswered) {
                buttonClass += quizMode === 'zen'
                  ? 'bg-teal-500 text-white'
                  : quizMode === 'rapidfire'
                  ? 'bg-purple-500 text-white'
                  : 'bg-indigo-500 text-white';
              } else {
                buttonClass += 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
              }
            }

            buttonClass += ' hover:opacity-80 cursor-pointer';

            return (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={buttonClass}
                title={`Pregunta ${idx + 1}${isAnswered ? ' (respondida)' : ''}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        )}
        {showQuickNav && (
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded ${
                quizMode === 'zen'
                  ? 'bg-teal-500'
                  : quizMode === 'rapidfire'
                  ? 'bg-purple-500'
                  : 'bg-indigo-500'
              }`}></div>
              <span>Respondida</span>
            </div>
            {quizSubmitted && (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span>Correcta</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded ${quizMode === 'zen' ? 'bg-amber-400' : 'bg-red-500'}`}></div>
                  <span>Incorrecta</span>
                </div>
              </>
            )}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700"></div>
              <span>Sin responder</span>
            </div>
          </div>
        )}
      </div>

      {/* Question answered indicator */}
      {!quizSubmitted && userAnswer !== null && (
        <div className={`mb-6 p-3 rounded-lg border ${
          quizMode === 'rapidfire'
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-300 dark:border-green-700 shadow-md'
            : quizMode === 'zen'
            ? 'bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 border-teal-300 dark:border-teal-700 shadow-md'
            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
        }`}>
          <p className={`text-sm text-center font-semibold ${
            quizMode === 'rapidfire'
              ? 'text-green-700 dark:text-green-300'
              : quizMode === 'zen'
              ? 'text-teal-700 dark:text-teal-300'
              : 'text-blue-700 dark:text-blue-300'
          }`}>
            {quizMode === 'rapidfire' ? '✓ ' : quizMode === 'zen' ? '🧘 ' : ''}Respuesta seleccionada. Puedes cambiarla antes de enviar el quiz.
          </p>
        </div>
      )}

      <div className="mb-8">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
          quizMode === 'rapidfire' || quizMode === 'zen' ? 'shadow-md' : ''
        } ${
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

      {/* Use centralized QuestionRenderer */}
      <QuestionRenderer
        question={currentQuestion}
        mode="full"
        selectedAnswer={userAnswer}
        showFeedback={showFeedback}
        onAnswerSelect={handleAnswerSelect}
        disabled={quizSubmitted}
        quizMode={quizMode}
        onRequestAIHelp={handleRequestAIHelp}
        aiHelp={aiHelpMap.get(currentQuestionIndex) || null}
        isLoadingAIHelp={isLoadingAIHelp}
      />

      {/* Navigation and Submit buttons */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              quizMode === 'rapidfire'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-400 text-white disabled:cursor-not-allowed shadow-lg hover:shadow-xl'
                : quizMode === 'zen'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white disabled:cursor-not-allowed shadow-lg hover:shadow-xl'
                : 'bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
            }`}
          >
            ← Anterior
          </button>
          {currentQuestionIndex < quizQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                quizMode === 'rapidfire'
                  ? 'bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                  : quizMode === 'zen'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-500 text-white hover:bg-gray-600 transition-colors'
              }`}
            >
              Siguiente →
            </button>
          ) : quizSubmitted ? (
            <button
              onClick={() => setCurrentQuestionIndex(quizQuestions.length)}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                quizMode === 'rapidfire'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl'
                  : quizMode === 'zen'
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 transition-colors'
              }`}
            >
              Ver Resumen
            </button>
          ) : null}
        </div>

        {!quizSubmitted && (
          <button
            onClick={handleSubmitQuiz}
            disabled={userAnswers.filter(a => a !== null).length === 0}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-lg transition-all ${
              quizMode === 'rapidfire'
                ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-[1.02]'
                : quizMode === 'zen'
                ? 'bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 hover:from-teal-500 hover:via-cyan-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-[1.02]'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
            }`}
            style={quizMode === 'rapidfire' && userAnswers.filter(a => a !== null).length > 0 ? {
              boxShadow: '0 0 30px rgba(236, 72, 153, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3)'
            } : quizMode === 'zen' && userAnswers.filter(a => a !== null).length > 0 ? {
              boxShadow: '0 0 30px rgba(20, 184, 166, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3)'
            } : undefined}
          >
            {quizMode === 'rapidfire' ? '⚡ ' : quizMode === 'zen' ? '🧘 ' : ''}Enviar Quiz ({userAnswers.filter(a => a !== null).length} de {quizQuestions.length} respondidas)
          </button>
        )}
      </div>

      {!quizSubmitted && (
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Preguntas respondidas: {userAnswers.filter(a => a !== null).length} / {quizQuestions.length}
        </div>
      )}
    </div>
  );

  // Return with gradient background for both modes - use fixed positioning to break out of parent containers
  if (quizMode === 'rapidfire') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 overflow-y-auto">
        <div className="min-h-full py-6 px-4 sm:py-8 sm:px-6">
          {questionContent}
        </div>
      </div>
    );
  }

  if (quizMode === 'zen') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 dark:from-teal-800 dark:via-cyan-900 dark:to-blue-900 overflow-y-auto">
        <div className="min-h-full py-6 px-4 sm:py-8 sm:px-6">
          {questionContent}
        </div>
      </div>
    );
  }

  return questionContent;
}
