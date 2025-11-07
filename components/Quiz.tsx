'use client';

import { useState, useEffect } from 'react';
import { Question, QuestionAttempt } from '@/lib/types';
import { getRandomQuestions } from '@/lib/questions';
import { QuestionRenderer } from './QuestionRenderer';

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

  // Timer effect for rapidfire mode
  useEffect(() => {
    if (quizMode !== 'rapidfire' || quizSubmitted || quizQuestions.length === 0) {
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
  }, [quizMode, quizSubmitted, quizQuestions.length]);

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
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <p className="text-center text-gray-600 dark:text-gray-400">Cargando preguntas...</p>
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

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      {/* Simplified Timer Display - Only show in rapidfire mode and when quiz is not submitted */}
      {quizMode === 'rapidfire' && !quizSubmitted && (
        <div className="mb-4">
          {showTimer ? (
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/30 rounded border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-sm">⏱️</span>
                <span className={`text-sm font-medium ${getTimerColor()}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <button
                onClick={toggleTimer}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                title="Ocultar timer"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={toggleTimer}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
              title="Mostrar timer"
            >
              Mostrar tiempo
            </button>
          )}
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            {currentQuestion.topic}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question answered indicator */}
      {!quizSubmitted && userAnswer !== null && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            Respuesta seleccionada. Puedes cambiarla antes de enviar el quiz.
          </p>
        </div>
      )}

      <div className="mb-6">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
          currentQuestion.difficulty === 'easy'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : currentQuestion.difficulty === 'medium'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {currentQuestion.difficulty === 'easy' ? 'Fácil' :
           currentQuestion.difficulty === 'medium' ? 'Media' : 'Difícil'}
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
      />

      {/* Navigation and Submit buttons */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            ← Anterior
          </button>
          {currentQuestionIndex < quizQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              Siguiente →
            </button>
          ) : quizSubmitted ? (
            <button
              onClick={() => setCurrentQuestionIndex(quizQuestions.length)}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Ver Resumen
            </button>
          ) : null}
        </div>

        {!quizSubmitted && (
          <button
            onClick={handleSubmitQuiz}
            disabled={userAnswers.filter(a => a !== null).length === 0}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
          >
            Enviar Quiz ({userAnswers.filter(a => a !== null).length} de {quizQuestions.length} respondidas)
          </button>
        )}
      </div>

      {!quizSubmitted && (
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Preguntas respondidas: {userAnswers.filter(a => a !== null).length} / {quizQuestions.length}
        </div>
      )}

      {quizSubmitted && (
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Puntaje de este quiz: {quizQuestions.filter((q, i) => userAnswers[i] === q.correctAnswer).length} / {userAnswers.filter(a => a !== null).length}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Puntaje total: {score.correct} / {score.total}
            {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
          </p>
        </div>
      )}
    </div>
  );
}
