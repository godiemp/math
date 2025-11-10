'use client';

import { useState, useEffect } from 'react';
import type { Question } from '@/lib/types';
import { getRandomQuestions } from '@/lib/questions';
import { QuestionRenderer } from '../QuestionRenderer';
import { AIChatModal } from '../AIChatModal';
import { useQuizState } from '@/hooks/useQuizState';
import { useQuizProgress } from '@/hooks/useQuizProgress';
import { useQuizNavigation } from '@/hooks/useQuizNavigation';
import { generateQuizSessionId } from '@/lib/quiz-utils';

interface ZenQuizProps {
  questions: Question[];
  level: 'M1' | 'M2';
  subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  replayQuestions?: Question[];
}

export default function ZenQuiz({ questions: allQuestions, level, subject, replayQuestions }: ZenQuizProps) {
  const [showZenIntro, setShowZenIntro] = useState(true);
  const [zenIntroPhase, setZenIntroPhase] = useState(0); // 0: fade in, 1: breathe, 2: fade out
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [showQuickNav, setShowQuickNav] = useState(() => {
    const saved = localStorage.getItem('quiz-show-quick-nav');
    return saved !== null ? saved === 'true' : true;
  });
  const [quizSessionId] = useState(generateQuizSessionId);
  const [aiConversation] = useState<Array<{ role: string; message: string; timestamp: number }>>([]);

  // Use shared hooks
  const {
    quizQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    quizSubmitted,
    setQuizSubmitted,
    currentQuestion,
    handleAnswerSelect,
    resetQuiz,
  } = useQuizState({
    level,
    subject,
    questionCount: 10,
    replayQuestions,
  });

  const { score, submitQuiz } = useQuizProgress({ level });

  const { handlePrevious, handleNext, navigateToQuestion } = useQuizNavigation(
    currentQuestionIndex,
    setCurrentQuestionIndex,
    quizQuestions.length
  );

  // Zen intro effect
  useEffect(() => {
    if (!showZenIntro) return;

    if (zenIntroPhase === 0) {
      const timer = setTimeout(() => setZenIntroPhase(1), 1000);
      return () => clearTimeout(timer);
    } else if (zenIntroPhase === 1) {
      const timer = setTimeout(() => setZenIntroPhase(2), 2500);
      return () => clearTimeout(timer);
    } else if (zenIntroPhase === 2) {
      const timer = setTimeout(() => setShowZenIntro(false), 800);
      return () => clearTimeout(timer);
    }
  }, [showZenIntro, zenIntroPhase]);

  const toggleQuickNav = () => {
    const newValue = !showQuickNav;
    setShowQuickNav(newValue);
    localStorage.setItem('quiz-show-quick-nav', String(newValue));
  };

  const handleSubmitQuiz = async () => {
    await submitQuiz(quizQuestions, userAnswers, quizSessionId, aiConversation);
    setQuizSubmitted(true);
    setCurrentQuestionIndex(0);
  };

  const handleRestart = () => {
    const randomQuestions = getRandomQuestions(level, 10, subject);
    resetQuiz(randomQuestions);
    setIsChatModalOpen(false);
    setShowZenIntro(true);
    setZenIntroPhase(0);
  };

  const handleRequestAIHelp = () => {
    setIsChatModalOpen(true);
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <p className="text-center text-gray-600 dark:text-gray-400">Cargando preguntas...</p>
      </div>
    );
  }

  // Zen intro screen
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

  // Completion screen
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
                      : 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
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
                          <span className="text-amber-700 dark:text-amber-300">◆ Revisar</span>
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
  const showFeedback = quizSubmitted;

  const questionContent = (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 animate-fadeIn"
      style={{
        boxShadow: '0 0 60px rgba(20, 184, 166, 0.3), 0 20px 40px rgba(0, 0, 0, 0.2)',
        minHeight: '600px',
        maxHeight: '85vh',
      }}>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">
            {currentQuestion.topic}
          </span>
          <span data-testid="question-counter" className="text-sm text-gray-600 dark:text-gray-400">
            Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}
          </span>
        </div>
        <div className="w-full rounded-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          <div
            className="h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"
            style={{
              width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
              boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)'
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
            className="text-xs px-3 py-1 rounded-md transition-colors text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30"
          >
            {showQuickNav ? '▲ Ocultar' : '▼ Mostrar'}
          </button>
        </div>
        {showQuickNav && (
          <>
            <div className="grid grid-cols-10 gap-2">
              {quizQuestions.map((q, idx) => {
                const answer = userAnswers[idx];
                const isAnswered = answer !== null;
                const isCurrentQuestion = idx === currentQuestionIndex;
                const isQuestionCorrect = isAnswered && answer === q.correctAnswer;

                let buttonClass = 'w-full aspect-square rounded-lg text-xs font-bold transition-all flex items-center justify-center ';

                if (isCurrentQuestion) {
                  buttonClass += 'ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-gray-800 ';
                }

                if (quizSubmitted) {
                  if (!isAnswered) {
                    buttonClass += 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400';
                  } else if (isQuestionCorrect) {
                    buttonClass += 'bg-green-500 text-white';
                  } else {
                    buttonClass += 'bg-amber-400 text-white';
                  }
                } else {
                  if (isAnswered) {
                    buttonClass += 'bg-teal-500 text-white';
                  } else {
                    buttonClass += 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
                  }
                }

                buttonClass += ' hover:opacity-80 cursor-pointer';

                return (
                  <button
                    key={idx}
                    onClick={() => navigateToQuestion(idx)}
                    className={buttonClass}
                    title={`Pregunta ${idx + 1}${isAnswered ? ' (respondida)' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
              {!quizSubmitted && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-teal-500"></div>
                  <span>Respondida</span>
                </div>
              )}
              {quizSubmitted && (
                <>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-green-500"></div>
                    <span>Correcta</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-amber-400"></div>
                    <span>Incorrecta</span>
                  </div>
                </>
              )}
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700"></div>
                <span>Sin responder</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Question answered indicator */}
      {!quizSubmitted && userAnswer !== null && (
        <div className="mb-6 p-3 rounded-lg border bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 border-teal-300 dark:border-teal-700 shadow-md">
          <p className="text-sm text-center font-semibold text-teal-700 dark:text-teal-300">
            🧘 Respuesta seleccionada. Puedes cambiarla antes de enviar el quiz.
          </p>
        </div>
      )}

      {/* Question Renderer */}
      <QuestionRenderer
        question={currentQuestion}
        mode="full"
        selectedAnswer={userAnswer}
        showFeedback={showFeedback}
        onAnswerSelect={handleAnswerSelect}
        disabled={quizSubmitted}
        quizMode="zen"
        onRequestAIHelp={quizSubmitted ? handleRequestAIHelp : undefined}
      />

      {/* Navigation and Submit buttons */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            ← Anterior
          </button>
          {currentQuestionIndex < quizQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
            >
              Siguiente →
            </button>
          ) : quizSubmitted ? (
            <button
              onClick={() => setCurrentQuestionIndex(quizQuestions.length)}
              className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
            >
              Ver Resumen
            </button>
          ) : null}
        </div>

        {/* Submit button */}
        {!quizSubmitted && (
          <button
            onClick={handleSubmitQuiz}
            disabled={userAnswers.filter(a => a !== null).length === 0}
            className="w-full px-6 py-3 rounded-lg font-semibold text-lg transition-all bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 hover:from-teal-500 hover:via-cyan-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-[1.02]"
            style={userAnswers.filter(a => a !== null).length > 0 ? {
              boxShadow: '0 0 30px rgba(20, 184, 166, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3)'
            } : undefined}
          >
            🧘 Enviar Quiz ({userAnswers.filter(a => a !== null).length} de {quizQuestions.length} respondidas)
          </button>
        )}
      </div>

    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 dark:from-teal-800 dark:via-cyan-900 dark:to-blue-900 overflow-y-auto">
        <div className="min-h-full py-6 px-4 sm:py-8 sm:px-6 flex items-center justify-center">
          {questionContent}
        </div>
      </div>
      <AIChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        question={currentQuestion}
        userAnswer={userAnswers[currentQuestionIndex]}
        quizMode="zen"
        quizSessionId={quizSessionId}
      />
    </>
  );
}
