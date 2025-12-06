'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, Lock, CheckCircle } from 'lucide-react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { M1_LESSONS } from '@/lib/lessons/types';
import {
  getUnitsByLevelAndSubject,
  subjectFromSlug,
  SUBJECT_LABELS,
  type Level,
  type Subject,
  type ThematicUnitSummary,
} from '@/lib/lessons/thematicUnits';

interface UnitCardProps {
  unit: ThematicUnitSummary;
  index: number;
  availableLesson?: {
    slug: string;
    title: string;
    description: string;
    estimatedMinutes: number;
  };
}

function UnitCard({ unit, index, availableLesson }: UnitCardProps) {
  const isAvailable = !!availableLesson;

  if (isAvailable) {
    return (
      <Link
        href={`/lessons/${unit.level.toLowerCase()}/${availableLesson.slug}`}
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
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {availableLesson.title}
                    </h3>
                    <CheckCircle className="text-green-500" size={18} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {availableLesson.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock size={14} />
                      {availableLesson.estimatedMinutes} min
                    </span>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      {unit.code}
                    </span>
                  </div>
                </div>
              </div>
              <ArrowRight className="text-purple-500 group-hover:translate-x-1 transition-transform flex-shrink-0" size={24} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 sm:p-5 opacity-75">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold flex-shrink-0">
            {index + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                {unit.name}
              </h3>
              <Lock size={14} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={14} />
                ~15 min
              </span>
              <span className="text-xs text-gray-400">
                {unit.code}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UnitListContent() {
  const params = useParams();
  const levelParam = (params.level as string)?.toUpperCase() as Level;
  const subjectSlug = params.subject as string;
  const subject = subjectFromSlug(subjectSlug);

  if (!subject || !levelParam || !['M1', 'M2'].includes(levelParam)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Categoría no encontrada
          </h1>
          <Link
            href="/mini-lessons"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
          >
            Volver a Mini Lecciones
          </Link>
        </div>
      </div>
    );
  }

  const units = getUnitsByLevelAndSubject(levelParam, subject);
  const subjectLabel = SUBJECT_LABELS[subject];

  // Find available lessons for each unit
  const getAvailableLessonForUnit = (unitCode: string) => {
    // M1_LESSONS have thematicUnit like 'M1-NUM-001'
    const lesson = M1_LESSONS.find(l => l.thematicUnit === unitCode);
    if (lesson) {
      return {
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        estimatedMinutes: lesson.estimatedMinutes,
      };
    }
    return undefined;
  };

  const availableCount = units.filter(u => getAvailableLessonForUnit(u.code)).length;

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
                {subjectLabel}
              </h1>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                levelParam === 'M1'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
              }`}>
                {levelParam}
              </span>
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
            {units.length} {units.length === 1 ? 'unidad temática' : 'unidades temáticas'}
            {availableCount > 0 && (
              <span className="text-green-600 dark:text-green-400 ml-2">
                ({availableCount} disponible{availableCount !== 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>

        {/* Units List */}
        <div className="space-y-4">
          {units.map((unit, index) => (
            <UnitCard
              key={unit.code}
              unit={unit}
              index={index}
              availableLesson={getAvailableLessonForUnit(unit.code)}
            />
          ))}
        </div>

        {/* Footer message */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Las lecciones bloqueadas estarán disponibles próximamente.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UnitListPage() {
  return (
    <ProtectedRoute>
      <UnitListContent />
    </ProtectedRoute>
  );
}
