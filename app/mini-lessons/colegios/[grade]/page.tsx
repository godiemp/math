'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Clock, Lock, Star, CheckCircle } from 'lucide-react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import {
  getGradeBySlug,
  getOAByGradeGroupedByEje,
  EJE_LABELS,
  EJE_ORDER,
  type MinEducOA,
  type Eje,
} from '@/lib/curriculum/mineduc';
import { M1_LESSONS, type Lesson } from '@/lib/lessons/types';

interface LessonItemProps {
  lesson: Lesson;
}

function LessonItem({ lesson }: LessonItemProps) {
  return (
    <Link
      href={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">
            {lesson.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5">
            <Clock size={12} />
            {lesson.estimatedMinutes} min
          </p>
        </div>
      </div>
      <ArrowRight className="text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all flex-shrink-0" size={16} />
    </Link>
  );
}

interface OACardProps {
  oa: MinEducOA;
  lessons: Lesson[];
}

function OACard({ oa, lessons }: OACardProps) {
  const [isExpanded, setIsExpanded] = useState(lessons.length > 0);
  const hasLessons = lessons.length > 0;

  return (
    <div className={`rounded-xl overflow-hidden ${
      hasLessons
        ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
        : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50'
    }`}>
      {/* Header */}
      <button
        onClick={() => hasLessons && setIsExpanded(!isExpanded)}
        className={`w-full p-4 text-left ${hasLessons ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50' : 'cursor-default'} transition-colors`}
        disabled={!hasLessons}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
              hasLessons
                ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            }`}>
              {oa.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`font-semibold ${
                  hasLessons
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {oa.name}
                </h3>
                {oa.isBasal && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium rounded-full">
                    <Star size={10} />
                    Basal
                  </span>
                )}
                {!hasLessons && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                    <Lock size={10} />
                    Próximamente
                  </span>
                )}
              </div>
              <p className={`text-sm mt-1 ${
                hasLessons
                  ? 'text-gray-600 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {oa.description}
              </p>
              {hasLessons && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                  {lessons.length} {lessons.length === 1 ? 'lección disponible' : 'lecciones disponibles'}
                </p>
              )}
            </div>
          </div>
          {hasLessons && (
            <div className="flex-shrink-0 text-gray-400">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          )}
        </div>
      </button>

      {/* Lessons */}
      {hasLessons && isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-2 ml-13">
            {lessons.map((lesson) => (
              <LessonItem key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface EjeSectionProps {
  eje: Eje;
  oaList: MinEducOA[];
  allLessons: Lesson[];
}

function EjeSection({ eje, oaList, allLessons }: EjeSectionProps) {
  if (oaList.length === 0) return null;

  const ejeColors: Record<Eje, { bg: string; text: string }> = {
    'números': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
    'álgebra': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
    'geometría': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
    'probabilidad': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300' },
  };

  const colors = ejeColors[eje];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-lg text-sm font-bold`}>
          {EJE_LABELS[eje]}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {oaList.length} {oaList.length === 1 ? 'objetivo' : 'objetivos'}
        </span>
      </div>
      <div className="space-y-4">
        {oaList.map((oa) => {
          // Get lessons that cover this OA
          const lessonsForOA = allLessons.filter(
            l => l.minEducOA?.includes(oa.code)
          );
          return <OACard key={oa.code} oa={oa} lessons={lessonsForOA} />;
        })}
      </div>
    </div>
  );
}

function GradeContent() {
  const params = useParams();
  const gradeSlug = params.grade as string;
  const gradeInfo = getGradeBySlug(gradeSlug);

  if (!gradeInfo || !gradeInfo.isAvailable) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Nivel no encontrado
          </h1>
          <Link
            href="/mini-lessons/colegios"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
          >
            Volver a niveles
          </Link>
        </div>
      </div>
    );
  }

  const oaByEje = getOAByGradeGroupedByEje(gradeInfo.code);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/mini-lessons/colegios"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Volver</span>
            </Link>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {gradeInfo.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Objetivos de Aprendizaje
              </p>
            </div>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-medium">15 Objetivos de Aprendizaje</span> organizados por eje temático
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center gap-2">
            <Star className="text-amber-500" size={14} />
            Los objetivos marcados como <span className="font-medium">Basal</span> son esenciales
          </p>
        </div>

        {/* OA by Eje */}
        {EJE_ORDER.map((eje) => (
          <EjeSection
            key={eje}
            eje={eje}
            oaList={oaByEje[eje]}
            allLessons={M1_LESSONS}
          />
        ))}

        {/* Footer message */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Estamos creando más lecciones para cubrir todos los objetivos. ¡Vuelve pronto!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GradePage() {
  return (
    <ProtectedRoute>
      <GradeContent />
    </ProtectedRoute>
  );
}
