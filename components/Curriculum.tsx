'use client';

import Link from 'next/link';
import { Question } from '@/lib/types';

interface CurriculumProps {
  questions: Question[];
  level: 'M1' | 'M2';
}

interface TopicStats {
  topic: string;
  count: number;
  difficulties: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export default function Curriculum({ questions, level }: CurriculumProps) {
  // Group questions by topic
  const topicStats: Record<string, TopicStats> = {};

  questions.forEach(q => {
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = {
        topic: q.topic,
        count: 0,
        difficulties: { easy: 0, medium: 0, hard: 0 }
      };
    }
    topicStats[q.topic].count++;
    topicStats[q.topic].difficulties[q.difficulty]++;
  });

  const topics = Object.values(topicStats);

  // PAES curriculum areas
  const curriculumAreas = [
    {
      name: 'Números',
      fullName: 'Números y Proporcionalidad',
      description: 'Operaciones básicas, fracciones, porcentajes, potencias y raíces',
      color: 'bg-blue-100 dark:bg-blue-900',
      borderColor: 'border-blue-300 dark:border-blue-700',
      textColor: 'text-blue-900 dark:text-blue-100'
    },
    {
      name: 'Álgebra y Funciones',
      fullName: 'Álgebra y Funciones',
      description: 'Ecuaciones, funciones, sistemas y desigualdades',
      color: 'bg-purple-100 dark:bg-purple-900',
      borderColor: 'border-purple-300 dark:border-purple-700',
      textColor: 'text-purple-900 dark:text-purple-100'
    },
    {
      name: 'Geometría',
      fullName: 'Geometría',
      description: 'Figuras planas, sólidos, geometría analítica y transformaciones',
      color: 'bg-green-100 dark:bg-green-900',
      borderColor: 'border-green-300 dark:border-green-700',
      textColor: 'text-green-900 dark:text-green-100'
    },
    {
      name: 'Probabilidad y Estadística',
      fullName: 'Probabilidad y Estadística',
      description: 'Medidas de tendencia central, gráficos, probabilidad y conteo',
      color: 'bg-orange-100 dark:bg-orange-900',
      borderColor: 'border-orange-300 dark:border-orange-700',
      textColor: 'text-orange-900 dark:text-orange-100'
    }
  ];

  // Additional areas for M2
  const advancedAreas = [
    {
      name: 'Límites y Derivadas',
      fullName: 'Límites y Derivadas',
      description: 'Conceptos básicos de cálculo diferencial',
      color: 'bg-red-100 dark:bg-red-900',
      borderColor: 'border-red-300 dark:border-red-700',
      textColor: 'text-red-900 dark:text-red-100'
    },
    {
      name: 'Cálculo Integral',
      fullName: 'Cálculo Integral',
      description: 'Integrales indefinidas y definidas básicas',
      color: 'bg-yellow-100 dark:bg-yellow-900',
      borderColor: 'border-yellow-300 dark:border-yellow-700',
      textColor: 'text-yellow-900 dark:text-yellow-100'
    }
  ];

  const allAreas = level === 'M2' ? [...curriculumAreas, ...advancedAreas] : curriculumAreas;

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
      case 'hard':
        return 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-4"
          >
            ← Volver al Inicio
          </Link>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
            Curriculum - Nivel {level}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {level === 'M1'
              ? 'Contenidos básicos del PAES - Matemática'
              : 'Contenidos avanzados del PAES - Matemática'}
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{questions.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Preguntas Totales</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{topics.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Temas Cubiertos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-pink-500">
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{allAreas.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Áreas PAES</div>
          </div>
        </div>

        {/* PAES Curriculum Areas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Áreas del Curriculum PAES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allAreas.map((area) => {
              const topicsInArea = topics.filter(t =>
                t.topic.includes(area.name) || area.fullName.includes(t.topic)
              );
              const questionsInArea = topicsInArea.reduce((sum, t) => sum + t.count, 0);

              return (
                <div
                  key={area.name}
                  className={`${area.color} rounded-lg p-6 border-2 ${area.borderColor}`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${area.textColor}`}>
                    {area.fullName}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                    {area.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {questionsInArea > 0
                        ? `${questionsInArea} preguntas disponibles`
                        : 'Próximamente'}
                    </span>
                    {questionsInArea > 0 && (
                      <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-semibold">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Topics Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Desglose por Tema
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.topic}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {topic.topic}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {topic.count} {topic.count === 1 ? 'pregunta' : 'preguntas'}
                    </p>
                  </div>
                </div>

                {/* Difficulty Distribution */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Distribución por dificultad:
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {topic.difficulties.easy > 0 && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyBadgeColor('easy')}`}>
                        Fácil: {topic.difficulties.easy}
                      </span>
                    )}
                    {topic.difficulties.medium > 0 && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyBadgeColor('medium')}`}>
                        Medio: {topic.difficulties.medium}
                      </span>
                    )}
                    {topic.difficulties.hard > 0 && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyBadgeColor('hard')}`}>
                        Difícil: {topic.difficulties.hard}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href={`/practice/${level.toLowerCase()}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Comenzar Práctica
          </Link>
          <Link
            href="/"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
