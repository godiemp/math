'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, X, Award, Sparkles } from 'lucide-react';
import { InlineMath } from './MathDisplay';

interface Problem {
  level: number;
  title: string;
  description: string;
  expression: string;
  expressionLatex: string;
  difficulty: string;
  problemsToComplete: number;
}

interface OperationsPracticeProps {
  level: number;
  onBack: () => void;
  onLevelComplete: () => void;
}

export default function OperationsPractice({
  level,
  onBack,
  onLevelComplete,
}: OperationsPracticeProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [problemId, setProblemId] = useState<string>('');
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
  const [nextLevel, setNextLevel] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProblem();
  }, [level]);

  useEffect(() => {
    if (problem && !feedback.show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [problem, feedback.show]);

  const loadProblem = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/operations-practice/problem/${level}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Error al cargar el problema');
      }

      const data = await response.json();
      setProblem(data.problem);
      setProblemId(data.problemId);
      setUserAnswer('');
      setFeedback({ show: false, isCorrect: false });
      setStartTime(Date.now());
    } catch (error) {
      console.error('Error loading problem:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/operations-practice/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            problemId,
            answer: userAnswer.trim(),
            timeSpent,
            level,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al enviar la respuesta');
      }

      const data = await response.json();
      setFeedback({
        show: true,
        isCorrect: data.isCorrect,
        correctAnswer: data.correctAnswer,
      });

      setAttemptCount(attemptCount + 1);

      if (data.isCorrect) {
        setCorrectCount(correctCount + 1);

        if (data.levelCompleted) {
          setShowLevelComplete(true);
          setNextLevel(data.nextLevel);
          onLevelComplete();
        } else {
          // Auto-load next problem after 1.5 seconds
          setTimeout(() => {
            loadProblem();
          }, 1500);
        }
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
      if (nextLevel) {
        // Will trigger level change and reload
        onBack();
      }
    } else {
      loadProblem();
    }
  };

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
          {nextLevel ? (
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Continuar al Siguiente Nivel →
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                ¡Has completado todos los niveles disponibles!
              </p>
              <button
                onClick={onBack}
                className="bg-gray-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-700 transition-all shadow-lg"
              >
                Volver al Camino
              </button>
            </div>
          )}
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
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
          style={{
            width: `${(correctCount / problem.problemsToComplete) * 100}%`,
          }}
        />
      </div>

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

        {/* Answer Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Escribe tu respuesta"
              autoComplete="off"
            />
          </div>

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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || feedback.show || !userAnswer.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
          >
            {isSubmitting ? 'Verificando...' : 'Verificar Respuesta'}
          </button>

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
    </div>
  );
}
