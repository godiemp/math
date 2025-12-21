/**
 * Scene registry for marketing content capture
 * Each scene defines a capturable page/view in the app
 */

export interface MarketingScene {
  id: string;
  name: string;
  description: string;
  category: SceneCategory;
  url: string;
  requiresAuth: boolean;
  defaultDuration: number; // in milliseconds
  waitForSelector?: string; // Wait for this element before capturing
  captureDelay?: number; // Additional delay after page load (ms)
  suggestedPresets: string[]; // Recommended presets for this scene
}

export type SceneCategory =
  | 'landing'
  | 'dashboard'
  | 'practice'
  | 'lessons'
  | 'progress'
  | 'games'
  | 'live';

export const SCENE_CATEGORIES: Record<
  SceneCategory,
  { label: string; description: string }
> = {
  landing: {
    label: 'Landing Page',
    description: 'Homepage demos and feature showcases',
  },
  dashboard: { label: 'Dashboard', description: 'User dashboard and overview' },
  practice: { label: 'Practice', description: 'Practice modes and exercises' },
  lessons: {
    label: 'Lessons',
    description: 'Interactive mini-lessons and tutorials',
  },
  progress: { label: 'Progress', description: 'Analytics and progress tracking' },
  games: { label: 'Games', description: 'Educational games and challenges' },
  live: { label: 'Live', description: 'Live practice and multiplayer' },
};

export const MARKETING_SCENES: MarketingScene[] = [
  // ============= LANDING PAGE DEMOS =============
  {
    id: 'landing-hero',
    name: 'Hero Section',
    description: 'Main landing page with demo carousel',
    category: 'landing',
    url: '/',
    requiresAuth: false,
    defaultDuration: 10000,
    waitForSelector: '[data-demo-showcase]',
    suggestedPresets: ['twitter', 'linkedin'],
  },
  {
    id: 'landing-features',
    name: 'Features Section',
    description: 'Feature demos (Zen, Rapid Fire, AI Tutor, etc.)',
    category: 'landing',
    url: '/#features',
    requiresAuth: false,
    defaultDuration: 8000,
    suggestedPresets: ['twitter', 'linkedin'],
  },

  // ============= DASHBOARD =============
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Main user dashboard with learning cards',
    category: 'dashboard',
    url: '/dashboard',
    requiresAuth: true,
    defaultDuration: 3000,
    waitForSelector: '[data-testid="dashboard"]',
    suggestedPresets: ['twitter', 'linkedin', 'hd'],
  },

  // ============= PRACTICE MODES =============
  {
    id: 'zen-mode',
    name: 'Zen Mode',
    description: 'Relaxed math practice without time pressure',
    category: 'practice',
    url: '/practice/m1',
    requiresAuth: true,
    defaultDuration: 8000,
    captureDelay: 1000,
    suggestedPresets: ['twitter', 'tiktok', 'reels'],
  },
  {
    id: 'rapid-fire',
    name: 'Rapid Fire',
    description: 'High-intensity timed practice mode',
    category: 'practice',
    url: '/practice/m1?mode=rapidfire',
    requiresAuth: true,
    defaultDuration: 10000,
    captureDelay: 1000,
    suggestedPresets: ['tiktok', 'reels', 'twitter'],
  },
  {
    id: 'operations',
    name: 'Operations Practice',
    description: '130+ levels of progressive operations',
    category: 'practice',
    url: '/practice/operations',
    requiresAuth: true,
    defaultDuration: 6000,
    suggestedPresets: ['twitter', 'linkedin'],
  },
  {
    id: 'adaptive',
    name: 'Adaptive Practice',
    description: 'AI-powered personalized learning',
    category: 'practice',
    url: '/practice/adaptive',
    requiresAuth: true,
    defaultDuration: 8000,
    suggestedPresets: ['twitter', 'linkedin'],
  },

  // ============= GAMES =============
  {
    id: 'angles-game',
    name: 'Angles Game',
    description: 'Interactive angle measurement practice',
    category: 'games',
    url: '/practice/geometry/angles',
    requiresAuth: true,
    defaultDuration: 8000,
    suggestedPresets: ['twitter', 'square'],
  },
  {
    id: 'shapes-game',
    name: 'Shape Identification',
    description: 'Learn to identify geometric shapes',
    category: 'games',
    url: '/practice/geometry/shapes',
    requiresAuth: true,
    defaultDuration: 8000,
    suggestedPresets: ['twitter', 'square'],
  },
  {
    id: 'symmetry-game',
    name: 'Symmetry Game',
    description: 'Explore symmetry in shapes',
    category: 'games',
    url: '/practice/geometry/symmetry',
    requiresAuth: true,
    defaultDuration: 8000,
    suggestedPresets: ['twitter', 'square'],
  },

  // ============= PROGRESS =============
  {
    id: 'progress-overview',
    name: 'Progress Overview',
    description: 'Learning analytics and skill breakdown',
    category: 'progress',
    url: '/progress',
    requiresAuth: true,
    defaultDuration: 5000,
    captureDelay: 2000, // Let animations play
    suggestedPresets: ['twitter', 'linkedin', 'hd'],
  },
  {
    id: 'progress-prediction',
    name: 'PAES Prediction',
    description: 'Animated PAES score prediction gauge',
    category: 'progress',
    url: '/progress?tab=prediction',
    requiresAuth: true,
    defaultDuration: 6000,
    captureDelay: 1000,
    suggestedPresets: ['twitter', 'tiktok'],
  },

  // ============= LESSONS (Interactive 3D) =============
  {
    id: 'lesson-cube',
    name: '3D Cube (a+b)³',
    description: 'Interactive 3D algebraic cube decomposition',
    category: 'lessons',
    url: '/mini-lessons/m1/algebra/productos-notables-cubos',
    requiresAuth: true,
    defaultDuration: 10000,
    captureDelay: 2000,
    suggestedPresets: ['twitter', 'tiktok', 'hd'],
  },
  {
    id: 'lesson-cone',
    name: 'Cone Volume',
    description: '3D cones assembling into cylinder',
    category: 'lessons',
    url: '/mini-lessons/m1/geometria/volumen-cono',
    requiresAuth: true,
    defaultDuration: 12000,
    captureDelay: 2000,
    suggestedPresets: ['twitter', 'tiktok', 'hd'],
  },
  {
    id: 'lesson-fractions',
    name: 'Fraction Bars',
    description: 'Interactive fraction visualization',
    category: 'lessons',
    url: '/mini-lessons/m1/numeros/fracciones-concepto-comparacion',
    requiresAuth: true,
    defaultDuration: 8000,
    suggestedPresets: ['twitter', 'linkedin'],
  },
  {
    id: 'lesson-circle',
    name: 'Circle Area & Circumference',
    description: 'Rolling circle showing π relationship',
    category: 'lessons',
    url: '/mini-lessons/m1/geometria/area-perimetro-circulo',
    requiresAuth: true,
    defaultDuration: 8000,
    suggestedPresets: ['twitter', 'linkedin'],
  },

  // ============= LIVE =============
  {
    id: 'live-lobby',
    name: 'Live Practice Lobby',
    description: 'Real-time multiplayer session lobby',
    category: 'live',
    url: '/live-practice',
    requiresAuth: true,
    defaultDuration: 5000,
    suggestedPresets: ['twitter', 'linkedin'],
  },
  {
    id: 'ai-tutor',
    name: 'AI Tutor',
    description: 'Socratic AI tutoring chat interface',
    category: 'live',
    url: '/learn',
    requiresAuth: true,
    defaultDuration: 8000,
    captureDelay: 1000,
    suggestedPresets: ['twitter', 'linkedin', 'tiktok'],
  },
];

export function getSceneById(id: string): MarketingScene | undefined {
  return MARKETING_SCENES.find((scene) => scene.id === id);
}

export function getScenesByCategory(category: SceneCategory): MarketingScene[] {
  return MARKETING_SCENES.filter((scene) => scene.category === category);
}

export function getPublicScenes(): MarketingScene[] {
  return MARKETING_SCENES.filter((scene) => !scene.requiresAuth);
}

export function getAuthenticatedScenes(): MarketingScene[] {
  return MARKETING_SCENES.filter((scene) => scene.requiresAuth);
}
