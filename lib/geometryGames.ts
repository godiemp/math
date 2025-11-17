/**
 * ============================================================================
 * GEOMETRY GAMES REGISTRY
 * ============================================================================
 *
 * Central registry for all geometry learning games.
 * Makes it easy to add new games without modifying the hub page.
 */

import { Shapes, Ruler, FlipHorizontal2, Compass, Grid3X3, Box, Move, Map } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Game status for progress tracking
 */
export type GameStatus = 'available' | 'coming_soon' | 'locked';

/**
 * Category of geometry games
 */
export type GeometryCategory =
  | 'shapes'
  | 'spatial'
  | 'measurement'
  | 'angles';

/**
 * Definition of a geometry game
 */
export interface GeometryGame {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  category: GeometryCategory;
  status: GameStatus;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  estimatedTime: string; // e.g., "10-15 min"
  colorScheme: {
    gradient: string;
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
  };
}

/**
 * Registry of all available geometry games
 * Add new games here - they will automatically appear in the hub
 */
export const GEOMETRY_GAMES: GeometryGame[] = [
  {
    id: 'shape-identification',
    title: 'Identificación de Formas 2D',
    description: 'Aprende a reconocer círculos, cuadrados, triángulos y más formas geométricas.',
    icon: Shapes,
    route: '/practice/geometry/shapes',
    category: 'shapes',
    status: 'available',
    difficulty: 'beginner',
    skills: ['Reconocimiento visual', 'Vocabulario geométrico', 'Clasificación'],
    estimatedTime: '10-15 min',
    colorScheme: {
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      badgeBg: 'bg-purple-100 dark:bg-purple-900/50',
      badgeText: 'text-purple-800 dark:text-purple-300',
    },
  },
  {
    id: 'shape-properties',
    title: 'Lados, Vértices y Aristas',
    description: 'Cuenta y aprende las propiedades de las formas: lados, vértices y aristas.',
    icon: Ruler,
    route: '/practice/geometry/properties',
    category: 'shapes',
    status: 'available',
    difficulty: 'beginner',
    skills: ['Conteo', 'Propiedades geométricas', 'Análisis de formas'],
    estimatedTime: '12-18 min',
    colorScheme: {
      gradient: 'from-indigo-500 to-blue-500',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      badgeBg: 'bg-indigo-100 dark:bg-indigo-900/50',
      badgeText: 'text-indigo-800 dark:text-indigo-300',
    },
  },
  {
    id: 'symmetry',
    title: 'Simetría y Reflexiones',
    description: 'Descubre líneas de simetría y crea reflexiones de figuras.',
    icon: FlipHorizontal2,
    route: '/practice/geometry/symmetry',
    category: 'shapes',
    status: 'available',
    difficulty: 'intermediate',
    skills: ['Simetría axial', 'Transformaciones', 'Percepción espacial'],
    estimatedTime: '15-20 min',
    colorScheme: {
      gradient: 'from-cyan-500 to-teal-500',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      badgeBg: 'bg-cyan-100 dark:bg-cyan-900/50',
      badgeText: 'text-cyan-800 dark:text-cyan-300',
    },
  },
  {
    id: 'angles',
    title: 'Tipos de Ángulos',
    description: 'Identifica ángulos rectos, agudos y obtusos en diferentes figuras.',
    icon: Compass,
    route: '/practice/geometry/angles',
    category: 'angles',
    status: 'available',
    difficulty: 'intermediate',
    skills: ['Medición angular', 'Clasificación', 'Geometría analítica'],
    estimatedTime: '12-15 min',
    colorScheme: {
      gradient: 'from-orange-500 to-amber-500',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      badgeBg: 'bg-orange-100 dark:bg-orange-900/50',
      badgeText: 'text-orange-800 dark:text-orange-300',
    },
  },
  {
    id: '3d-solids',
    title: 'Sólidos 3D',
    description: 'Explora cubos, esferas, pirámides y otros sólidos tridimensionales.',
    icon: Box,
    route: '/practice/geometry/3d-solids',
    category: 'shapes',
    status: 'available',
    difficulty: 'intermediate',
    skills: ['Visualización 3D', 'Caras y aristas', 'Volumen'],
    estimatedTime: '15-20 min',
    colorScheme: {
      gradient: 'from-emerald-500 to-green-500',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-900/50',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
    },
  },
  {
    id: 'spatial-position',
    title: 'Posición y Dirección',
    description: 'Practica conceptos de posición: arriba, abajo, izquierda, derecha.',
    icon: Move,
    route: '/practice/geometry/spatial',
    category: 'spatial',
    status: 'coming_soon',
    difficulty: 'beginner',
    skills: ['Orientación espacial', 'Vocabulario posicional', 'Seguir instrucciones'],
    estimatedTime: '10-12 min',
    colorScheme: {
      gradient: 'from-rose-500 to-red-500',
      iconBg: 'bg-rose-100 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
      badgeBg: 'bg-rose-100 dark:bg-rose-900/50',
      badgeText: 'text-rose-800 dark:text-rose-300',
    },
  },
  {
    id: 'coordinate-grids',
    title: 'Coordenadas y Mapas',
    description: 'Aprende a ubicar puntos en una cuadrícula usando coordenadas.',
    icon: Map,
    route: '/practice/geometry/coordinates',
    category: 'spatial',
    status: 'coming_soon',
    difficulty: 'advanced',
    skills: ['Sistema de coordenadas', 'Lectura de mapas', 'Ubicación espacial'],
    estimatedTime: '15-20 min',
    colorScheme: {
      gradient: 'from-violet-500 to-purple-500',
      iconBg: 'bg-violet-100 dark:bg-violet-900/30',
      iconColor: 'text-violet-600 dark:text-violet-400',
      badgeBg: 'bg-violet-100 dark:bg-violet-900/50',
      badgeText: 'text-violet-800 dark:text-violet-300',
    },
  },
];

/**
 * Get games by category
 */
export function getGamesByCategory(category: GeometryCategory): GeometryGame[] {
  return GEOMETRY_GAMES.filter((game) => game.category === category);
}

/**
 * Get available games only
 */
export function getAvailableGames(): GeometryGame[] {
  return GEOMETRY_GAMES.filter((game) => game.status === 'available');
}

/**
 * Get coming soon games
 */
export function getComingSoonGames(): GeometryGame[] {
  return GEOMETRY_GAMES.filter((game) => game.status === 'coming_soon');
}

/**
 * Category display information
 */
export const GEOMETRY_CATEGORIES: Record<
  GeometryCategory,
  { title: string; description: string }
> = {
  shapes: {
    title: 'Formas y Propiedades',
    description: 'Identificación y características de figuras geométricas',
  },
  spatial: {
    title: 'Razonamiento Espacial',
    description: 'Posición, dirección y orientación en el espacio',
  },
  measurement: {
    title: 'Medición',
    description: 'Longitud, área, perímetro y volumen',
  },
  angles: {
    title: 'Ángulos y Líneas',
    description: 'Tipos de ángulos y relaciones entre líneas',
  },
};
