'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calculator, FunctionSquare, Shapes, BarChart3, type LucideIcon } from 'lucide-react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useContentAccess } from '@/hooks/useContentAccess';
import { SUBJECTS, SUBJECT_LABELS, getUnitCount, subjectToSlug, type Subject } from '@/lib/lessons/thematicUnits';

const SUBJECT_ICONS: Record<Subject, LucideIcon> = {
  'números': Calculator,
  'álgebra': FunctionSquare,
  'geometría': Shapes,
  'probabilidad': BarChart3,
};

const SUBJECT_COLORS: Record<Subject, { from: string; to: string; border: string }> = {
  'números': { from: 'from-blue-500', to: 'to-cyan-500', border: 'border-blue-500/30' },
  'álgebra': { from: 'from-purple-500', to: 'to-pink-500', border: 'border-purple-500/30' },
  'geometría': { from: 'from-green-500', to: 'to-emerald-500', border: 'border-green-500/30' },
  'probabilidad': { from: 'from-orange-500', to: 'to-amber-500', border: 'border-orange-500/30' },
};

interface CategoryCardProps {
  subject: Subject;
  level: 'M1' | 'M2';
}

function CategoryCard({ subject, level }: CategoryCardProps) {
  const Icon = SUBJECT_ICONS[subject];
  const colors = SUBJECT_COLORS[subject];
  const unitCount = getUnitCount(level, subject);
  const slug = subjectToSlug(subject);

  return (
    <Link
      href={`/mini-lessons/${level.toLowerCase()}/${slug}`}
      className="block group"
    >
      <div className={`bg-gradient-to-br ${colors.from} ${colors.to} p-0.5 rounded-2xl`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 h-full hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${colors.from} ${colors.to} rounded-xl flex items-center justify-center`}>
              <Icon className="text-white" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                {SUBJECT_LABELS[subject]}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {unitCount} {unitCount === 1 ? 'unidad' : 'unidades'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface LevelSectionProps {
  level: 'M1' | 'M2';
  title: string;
}

function LevelSection({ level, title }: LevelSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className={`px-2 py-1 rounded-lg text-sm font-bold ${
          level === 'M1'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
        }`}>
          {level}
        </span>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SUBJECTS.map((subject) => (
          <CategoryCard key={`${level}-${subject}`} subject={subject} level={level} />
        ))}
      </div>
    </div>
  );
}

function MiniLessonsContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { isGradeLevelStudent, assignedGrade } = useContentAccess();
  const showM2 = user?.targetLevel !== 'M1_ONLY';

  // Redirect grade-level students to their grade content
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
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Selecciona una categoría para ver las lecciones disponibles
          </p>
        </div>

        {/* M1 Section */}
        <LevelSection level="M1" title="Competencia Matemática 1" />

        {/* M2 Section (conditional) */}
        {showM2 && (
          <LevelSection level="M2" title="Competencia Matemática 2" />
        )}

        {/* Footer message */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Estamos creando más lecciones constantemente. ¡Vuelve pronto!
          </p>
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
