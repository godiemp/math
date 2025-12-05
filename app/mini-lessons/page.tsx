'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Lock, CheckCircle } from 'lucide-react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { M1_LESSONS } from '@/lib/lessons/types';

// Upcoming lessons that will be built
const UPCOMING_LESSONS = [
  {
    id: 'm1-num-001-d',
    title: 'Propiedades y Jerarquía de Operaciones',
    description: 'Aprende el orden correcto para resolver operaciones combinadas.',
    thematicUnit: 'M1-NUM-001-D',
    estimatedMinutes: 10,
  },
  {
    id: 'm1-num-002-a',
    title: 'Fracciones y Decimales',
    description: 'Convierte entre fracciones y decimales con facilidad.',
    thematicUnit: 'M1-NUM-002-A',
    estimatedMinutes: 15,
  },
];

function MiniLessonsContent() {
  const availableLessons = M1_LESSONS.filter(lesson => lesson.slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Volver al Panel</span>
            </Link>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Mini Lecciones
              </h1>
            </div>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Aprende matemáticas paso a paso con lecciones interactivas
          </p>
        </div>

        {/* Available Lessons */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Disponible Ahora
            </h2>
          </div>

          <div className="space-y-4">
            {availableLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/lessons/m1/${lesson.slug}`}
                className="block group"
              >
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-2xl">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                            {lesson.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <Clock size={14} />
                              {lesson.estimatedMinutes} min
                            </span>
                            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                              {lesson.thematicUnit}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="text-purple-500 group-hover:translate-x-1 transition-transform flex-shrink-0" size={24} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="text-gray-400" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Próximamente
            </h2>
          </div>

          <div className="space-y-3">
            {UPCOMING_LESSONS.map((lesson, index) => (
              <div
                key={lesson.id}
                className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 sm:p-5 opacity-75"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold flex-shrink-0">
                      {availableLessons.length + index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                          {lesson.title}
                        </h3>
                        <Lock size={14} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={14} />
                          {lesson.estimatedMinutes} min
                        </span>
                        <span className="text-xs text-gray-400">
                          {lesson.thematicUnit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More coming soon message */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Estamos creando más lecciones constantemente. ¡Vuelve pronto!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MiniLessonsPage() {
  return (
    <ProtectedRoute>
      <MiniLessonsContent />
    </ProtectedRoute>
  );
}
