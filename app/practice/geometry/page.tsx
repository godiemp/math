'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Compass, Clock, Trophy, Lock, ArrowRight, Sparkles } from 'lucide-react';
import {
  GEOMETRY_GAMES,
  GEOMETRY_CATEGORIES,
  getAvailableGames,
  getComingSoonGames,
} from '@/lib/geometryGames';
import type { GeometryGame } from '@/lib/geometryGames';

function GameCard({ game }: { game: GeometryGame }) {
  const isAvailable = game.status === 'available';
  const Icon = game.icon;

  const content = (
    <div
      className={`relative group p-6 rounded-xl border-2 transition-all ${
        isAvailable
          ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg cursor-pointer transform hover:scale-105'
          : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 opacity-75'
      }`}
    >
      {/* Status Badge */}
      {game.status === 'coming_soon' && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-2 py-1 rounded-full text-xs font-semibold">
          <Sparkles size={12} />
          Próximamente
        </div>
      )}
      {game.status === 'locked' && (
        <div className="absolute top-3 right-3">
          <Lock size={16} className="text-gray-400" />
        </div>
      )}

      {/* Icon */}
      <div className={`inline-flex p-3 rounded-lg ${game.colorScheme.iconBg} mb-4`}>
        <Icon size={28} className={game.colorScheme.iconColor} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{game.title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{game.description}</p>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`text-xs px-2 py-1 rounded-full ${game.colorScheme.badgeBg} ${game.colorScheme.badgeText}`}
        >
          {game.difficulty === 'beginner'
            ? 'Principiante'
            : game.difficulty === 'intermediate'
            ? 'Intermedio'
            : 'Avanzado'}
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-1">
          <Clock size={10} />
          {game.estimatedTime}
        </span>
      </div>

      {/* Skills */}
      <div className="space-y-1">
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Habilidades:
        </div>
        <div className="flex flex-wrap gap-1">
          {game.skills.slice(0, 3).map((skill, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Play Button */}
      {isAvailable && (
        <div className="mt-4 flex items-center justify-end">
          <span
            className={`inline-flex items-center gap-2 bg-gradient-to-r ${game.colorScheme.gradient} text-white px-4 py-2 rounded-lg text-sm font-semibold group-hover:shadow-md transition-all`}
          >
            Jugar
            <ArrowRight size={16} />
          </span>
        </div>
      )}
    </div>
  );

  if (isAvailable) {
    return <Link href={game.route}>{content}</Link>;
  }

  return content;
}

function GeometryHubContent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const availableGames = getAvailableGames();
  const comingSoonGames = getComingSoonGames();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl">
              <Compass size={40} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Geometría
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explora el mundo de las formas, ángulos y el espacio. Selecciona un juego para
            comenzar tu aprendizaje.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {GEOMETRY_GAMES.length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Juegos Totales</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {availableGames.length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Disponibles</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {comingSoonGames.length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Próximamente</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              <Trophy size={24} className="mx-auto" />
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Logros</div>
          </div>
        </div>

        {/* Available Games */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-green-500 rounded-full"></span>
            Juegos Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Coming Soon Games */}
        {comingSoonGames.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
              Próximamente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {/* Learning Path Info */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ruta de Aprendizaje Recomendada
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(GEOMETRY_CATEGORIES).map(([key, category], index) => (
              <div key={key} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {category.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {category.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeometryHubPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
          </div>
        </div>
      }
    >
      <GeometryHubContent />
    </Suspense>
  );
}
