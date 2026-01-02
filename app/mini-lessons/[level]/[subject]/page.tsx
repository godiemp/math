'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, Lock, CheckCircle, Radio } from 'lucide-react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { M1_LESSONS, type Lesson } from '@/lib/lessons/types';
import {
  getUnitsByLevelAndSubject,
  subjectFromSlug,
  SUBJECT_LABELS,
  type Level,
  type Subject,
  type ThematicUnitSummary,
} from '@/lib/lessons/thematicUnits';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isTeacher?: boolean;
  onStartLive?: (lesson: Lesson) => void;
}

function LessonCard({ lesson, index, isTeacher, onStartLive }: LessonCardProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-2xl">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <Link
            href={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
            className="flex items-start gap-4 flex-1 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {index + 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {lesson.title}
                </h3>
                <CheckCircle className="text-green-500" size={18} />
              </div>
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
          </Link>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isTeacher && onStartLive && (
              <button
                onClick={() => onStartLive(lesson)}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                title="Iniciar clase en vivo"
              >
                <Radio size={16} className="animate-pulse" />
                <span className="hidden sm:inline">En Vivo</span>
              </button>
            )}
            <Link
              href={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
              className="text-purple-500 hover:text-purple-600 transition-colors"
            >
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface UpcomingUnitCardProps {
  unit: ThematicUnitSummary;
  index: number;
}

function UpcomingUnitCard({ unit, index }: UpcomingUnitCardProps) {
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
  const router = useRouter();
  const { user } = useAuth();
  const levelParam = (params.level as string)?.toUpperCase() as Level;
  const subjectSlug = params.subject as string;
  const subject = subjectFromSlug(subjectSlug);

  const isTeacher = user?.role === 'teacher';

  const handleStartLive = (lesson: Lesson) => {
    router.push(`/teacher/live/${lesson.slug}`);
  };

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

  // Get all available lessons for this level and subject
  const availableLessons = M1_LESSONS.filter(
    l => l.level === levelParam && l.subject === subject
  );

  // Get units that have at least one lesson
  const unitsWithLessons = new Set(availableLessons.map(l => l.thematicUnit));

  // Get units without any lessons (upcoming)
  const upcomingUnits = units.filter(u => !unitsWithLessons.has(u.code));

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
            {availableLessons.length > 0 && (
              <span className="text-green-600 dark:text-green-400">
                {availableLessons.length} {availableLessons.length === 1 ? 'lección disponible' : 'lecciones disponibles'}
              </span>
            )}
            {availableLessons.length > 0 && upcomingUnits.length > 0 && ' · '}
            {upcomingUnits.length > 0 && (
              <span className="text-gray-500 dark:text-gray-400">
                {upcomingUnits.length} próximamente
              </span>
            )}
          </p>
        </div>

        {/* Available Lessons */}
        {availableLessons.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="text-green-500" size={20} />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Disponibles
              </h2>
            </div>
            <div className="space-y-4">
              {availableLessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  isTeacher={isTeacher}
                  onStartLive={handleStartLive}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Units */}
        {upcomingUnits.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="text-gray-400" size={20} />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Próximamente
              </h2>
            </div>
            <div className="space-y-3">
              {upcomingUnits.map((unit, index) => (
                <UpcomingUnitCard key={unit.code} unit={unit} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Footer message */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Estamos creando más lecciones constantemente. ¡Vuelve pronto!
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
