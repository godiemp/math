'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { useContentAccess } from '@/hooks/useContentAccess';
import { GRADE_LEVELS, getCoveredOACount, getLessonCountByGrade, type GradeLevelInfo } from '@/lib/curriculum/mineduc';

interface GradeCardProps {
  grade: GradeLevelInfo;
}

function GradeCard({ grade }: GradeCardProps) {
  const oaCount = getCoveredOACount(grade.code);
  const lessonCount = getLessonCountByGrade(grade.code);
  const isBasica = grade.code.endsWith('B');

  if (!grade.isAvailable) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 sm:p-5 opacity-60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
              isBasica
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            }`}>
              {grade.code.replace('B', '°').replace('M', '°')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-500 dark:text-gray-400">
                  {grade.name}
                </h3>
                <Lock size={14} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Próximamente
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/mini-lessons/colegios/${grade.slug}`} className="block group">
      <div className={`bg-gradient-to-br ${
        isBasica
          ? 'from-amber-500 to-orange-500'
          : 'from-blue-500 to-purple-500'
      } p-0.5 rounded-2xl`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${
                isBasica
                  ? 'from-amber-500 to-orange-500'
                  : 'from-blue-500 to-purple-500'
              } rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                {grade.code.replace('B', '°').replace('M', '°')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {grade.name}
                  </h3>
                  <CheckCircle className="text-green-500" size={16} />
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {oaCount} OA con lecciones
                  </span>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    {lessonCount} {lessonCount === 1 ? 'lección' : 'lecciones'}
                  </span>
                </div>
              </div>
            </div>
            <ArrowRight className="text-purple-500 group-hover:translate-x-1 transition-transform" size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function ColegiosContent() {
  const router = useRouter();
  const { isGradeLevelStudent, assignedGrade } = useContentAccess();

  // Split grades into Básica and Media
  const basicaGrades = GRADE_LEVELS.filter(g => g.code.endsWith('B'));
  const mediaGrades = GRADE_LEVELS.filter(g => g.code.endsWith('M'));

  // Redirect grade-level students directly to their grade
  useEffect(() => {
    if (isGradeLevelStudent && assignedGrade) {
      router.replace(`/mini-lessons/colegios/${assignedGrade}`);
    }
  }, [isGradeLevelStudent, assignedGrade, router]);

  // Show loading while redirecting
  if (isGradeLevelStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-gray-500 dark:text-gray-400">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/mini-lessons"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Volver</span>
            </Link>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Por Nivel Escolar
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Objetivos de Aprendizaje MINEDUC
              </p>
            </div>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            Selecciona un nivel para ver los Objetivos de Aprendizaje
          </p>
        </div>

        {/* Media Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-bold">
              Enseñanza Media
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mediaGrades.map((grade) => (
              <GradeCard key={grade.code} grade={grade} />
            ))}
          </div>
        </div>

        {/* Básica Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-sm font-bold">
              Enseñanza Básica
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {basicaGrades.map((grade) => (
              <GradeCard key={grade.code} grade={grade} />
            ))}
          </div>
        </div>

        {/* Footer message */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Estamos agregando más niveles constantemente. ¡Vuelve pronto!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ColegiosPage() {
  return (
    <ProtectedRoute>
      <ColegiosContent />
    </ProtectedRoute>
  );
}
