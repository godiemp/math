'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/lib/types';
import { MathText, BlockMath, InlineMath } from './MathDisplay';

interface QuizProps {
  questions: Question[];
  level: 'M1' | 'M2';
}

export default function Quiz({ questions, level }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`paes-progress-${level}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setScore(progress);
    }
  }, [level]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowExplanation(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    };
    setScore(newScore);

    // Save progress to localStorage
    localStorage.setItem(`paes-progress-${level}`, JSON.stringify(newScore));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score.correct / score.total) * 100);
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          ¡Quiz Completado! 🎉
        </h2>
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            {percentage}%
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {score.correct} de {score.total} respuestas correctas
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={handleRestart}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Reintentar Quiz
          </button>
          <a
            href="/"
            className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold text-center"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            {currentQuestion.topic}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

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
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {currentQuestion.questionLatex ? (
            <BlockMath latex={currentQuestion.questionLatex} />
          ) : (
            <MathText content={currentQuestion.question} />
          )}
        </h3>
      </div>

      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === currentQuestion.correctAnswer;
          const showResult = showExplanation;

          let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all flex items-start gap-2 ';

          if (showResult) {
            if (isCorrect) {
              buttonClass += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100';
            } else {
              buttonClass += 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300';
            }
          } else {
            if (isSelected) {
              buttonClass += 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100';
            } else {
              buttonClass += 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-gray-700 dark:text-gray-300';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={buttonClass}
            >
              <span className="font-semibold shrink-0">{String.fromCharCode(65 + index)}.</span>
              <span className="flex-1 min-w-0 break-words">
                {currentQuestion.optionsLatex && currentQuestion.optionsLatex[index] ? (
                  <InlineMath latex={currentQuestion.optionsLatex[index]} />
                ) : (
                  <MathText content={option} />
                )}
              </span>
              {showResult && isCorrect && <span className="shrink-0 ml-auto">✓</span>}
              {showResult && isSelected && !isCorrect && <span className="shrink-0 ml-auto">✗</span>}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Explicación:</h4>
          <div className="text-blue-800 dark:text-blue-200">
            <MathText content={currentQuestion.explanation} />
            {currentQuestion.explanationLatex && (
              <div className="mt-2">
                <BlockMath latex={currentQuestion.explanationLatex} />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {!showExplanation ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Verificar Respuesta
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
          </button>
        )}
      </div>

      <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
        Puntaje actual: {score.correct} / {score.total} correcto
        {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
      </div>
    </div>
  );
}
