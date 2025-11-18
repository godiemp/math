# Guía para Crear Nuevos Juegos de Geometría

Esta guía explica cómo agregar un nuevo juego de aprendizaje al sistema de juegos de geometría siguiendo los patrones establecidos.

## 📋 Estructura General

Cada juego de geometría consta de **5-6 archivos**:

1. `/lib/types/{nombre}-game.ts` - Definiciones de tipos TypeScript
2. `/lib/{nombre}Generator.ts` - Lógica de generación de problemas
3. `/components/{Nombre}Game.tsx` - Componente principal del juego
4. `/components/{Nombre}GameMenu.tsx` - Menú de selección de dificultad
5. `/app/practice/geometry/{nombre}/page.tsx` - Página de ruta (muy simple)
6. Actualizar `/lib/geometryGames.ts` - Registrar el juego

## 🚀 Paso a Paso

### 1. Crear Definiciones de Tipos

**Archivo:** `/lib/types/{nombre}-game.ts`

```typescript
/**
 * Tipos de problemas que el juego puede generar
 */
export type MiProblemType =
  | 'tipo_a'
  | 'tipo_b'
  | 'tipo_c';

/**
 * Niveles de dificultad (siempre usar estos 3)
 */
export type MiGameDifficulty = 'basic' | 'intermediate' | 'advanced';

/**
 * Información educativa sobre cada concepto
 */
export interface ConceptoInfo {
  id: string;
  nameEs: string; // Nombre en español
  nameEn: string; // Nombre en inglés
  description: string;
  explanation: string; // Contenido educativo detallado
  realWorldExample: string; // Ejemplos del mundo real
  colorHint: string; // Color hex para visualización
}

/**
 * Configuración por nivel de dificultad
 */
export interface MiDifficultyConfig {
  level: MiGameDifficulty;
  title: string;
  description: string;
  conceptos: string[]; // IDs de conceptos incluidos
  problemTypes: MiProblemType[];
  problemsToComplete: number;
  // Opciones específicas del juego
  showHelperVisuals?: boolean;
}

/**
 * Estructura de un problema individual
 */
export interface MiProblem {
  id: string;
  type: MiProblemType;
  // Datos específicos del problema
  correctAnswer: string | number;
  options: (string | number)[];
  difficulty: MiGameDifficulty;
  question: string;
  hint?: string;
  explanation?: string;
}
```

### 2. Crear Generador de Problemas

**Archivo:** `/lib/{nombre}Generator.ts`

```typescript
import type { MiProblem, MiGameDifficulty, ConceptoInfo } from '@/lib/types/{nombre}-game';
import { randomInRange, shuffleArray } from '@/lib/utils/gameUtils';

/**
 * Definiciones de conceptos con contenido educativo
 */
export const CONCEPTO_DEFINITIONS: Record<string, ConceptoInfo> = {
  concepto_a: {
    id: 'concepto_a',
    nameEs: 'Concepto A',
    nameEn: 'Concept A',
    description: 'Descripción breve',
    explanation: 'Explicación educativa completa en español...',
    realWorldExample: 'Ejemplos del mundo real: ...',
    colorHint: '#10B981',
  },
  // ... más conceptos
};

/**
 * Configuraciones de dificultad
 */
export const MI_DIFFICULTY_CONFIGS: Record<MiGameDifficulty, MiDifficultyConfig> = {
  basic: {
    level: 'basic',
    title: 'Nivel Básico',
    description: 'Introducción a los conceptos',
    conceptos: ['concepto_a', 'concepto_b'],
    problemTypes: ['tipo_a'],
    problemsToComplete: 10,
    showHelperVisuals: true,
  },
  intermediate: {
    level: 'intermediate',
    title: 'Nivel Intermedio',
    description: 'Conceptos adicionales',
    conceptos: ['concepto_a', 'concepto_b', 'concepto_c'],
    problemTypes: ['tipo_a', 'tipo_b'],
    problemsToComplete: 12,
    showHelperVisuals: true,
  },
  advanced: {
    level: 'advanced',
    title: 'Nivel Avanzado',
    description: 'Todos los conceptos y desafíos',
    conceptos: ['concepto_a', 'concepto_b', 'concepto_c', 'concepto_d'],
    problemTypes: ['tipo_a', 'tipo_b', 'tipo_c'],
    problemsToComplete: 15,
    showHelperVisuals: false,
  },
};

/**
 * Rastreo de problemas recientes para variedad
 */
const recentConceptos: string[] = [];
const MAX_RECENT = 2;

/**
 * Generar un problema aleatorio
 */
export function generateMiProblem(difficulty: MiGameDifficulty): MiProblem {
  const config = MI_DIFFICULTY_CONFIGS[difficulty];

  // Seleccionar concepto evitando repetición
  const availableConceptos = config.conceptos.filter(c => !recentConceptos.includes(c));
  const conceptosToChoose = availableConceptos.length > 0 ? availableConceptos : config.conceptos;
  const concepto = conceptosToChoose[randomInRange(0, conceptosToChoose.length - 1)];

  // Rastrear concepto usado
  recentConceptos.push(concepto);
  if (recentConceptos.length > MAX_RECENT) {
    recentConceptos.shift();
  }

  // Seleccionar tipo de problema
  const problemType = config.problemTypes[randomInRange(0, config.problemTypes.length - 1)];

  // Generar problema específico
  const conceptoInfo = CONCEPTO_DEFINITIONS[concepto];

  // ... lógica específica del juego ...

  return {
    id: `mi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: problemType,
    correctAnswer: /* ... */,
    options: generateOptions(/* ... */),
    difficulty,
    question: generateQuestion(problemType),
    hint: generateHint(problemType, concepto),
    explanation: conceptoInfo.explanation,
  };
}

/**
 * Limpiar historial de conceptos recientes
 */
export function clearRecentConceptos(): void {
  recentConceptos.length = 0;
}
```

### 3. Crear Componente del Juego

**Archivo:** `/components/{Nombre}Game.tsx`

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Award, Lightbulb, SkipForward, /* IconoDelJuego */ } from 'lucide-react';
import {
  generateMiProblem,
  clearRecentConceptos,
  MI_DIFFICULTY_CONFIGS,
  CONCEPTO_DEFINITIONS,
} from '@/lib/{nombre}Generator';
import type { MiProblem, MiGameDifficulty } from '@/lib/types/{nombre}-game';
import GameAnswerOptions from '@/components/GameAnswerOptions';

interface MiGameProps {
  difficulty: MiGameDifficulty;
  onBack: () => void;
  onLevelComplete: () => void;
  onNextLevel: () => void;
}

/**
 * Componente de renderizado visual (si aplica)
 */
function MiCanvas({ problem }: { problem: MiProblem }) {
  // Renderizado SVG o visual específico del juego
  return (
    <div className="flex justify-center">
      <svg width={400} height={300} /* ... */>
        {/* Visualización del problema */}
      </svg>
    </div>
  );
}

export default function MiGame({ difficulty, onBack, onLevelComplete, onNextLevel }: MiGameProps) {
  // Estado del juego (mismo patrón para todos)
  const [problem, setProblem] = useState<MiProblem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [feedback, setFeedback] = useState<{ show: boolean; isCorrect: boolean }>({
    show: false,
    isCorrect: false
  });
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isRetry, setIsRetry] = useState(false);
  const [hasTriedOnce, setHasTriedOnce] = useState(false);

  const config = MI_DIFFICULTY_CONFIGS[difficulty];

  // Cargar problema
  const loadProblem = useCallback(() => {
    const newProblem = generateMiProblem(difficulty);
    setProblem(newProblem);
    setSelectedAnswer(null);
    setFeedback({ show: false, isCorrect: false });
    setShowHint(false);
    setIsRetry(false);
    setHasTriedOnce(false);
  }, [difficulty]);

  useEffect(() => {
    clearRecentConceptos();
    loadProblem();
  }, [loadProblem]);

  // Atajos de teclado (estándar)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (feedback.show || !problem) return;

      const key = e.key;
      if (['1', '2', '3', '4'].includes(key)) {
        const index = parseInt(key) - 1;
        if (index < problem.options.length) {
          handleAnswer(problem.options[index]);
        }
      } else if (key.toLowerCase() === 'h') {
        setShowHint(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [problem, feedback.show]);

  // Manejar respuesta (lógica estándar)
  const handleAnswer = (answer: string | number) => {
    if (feedback.show || !problem) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === problem.correctAnswer;
    setFeedback({ show: true, isCorrect });

    if (!isRetry) {
      setAttemptCount(prev => prev + 1);
    }

    if (isCorrect) {
      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }

      if (newCorrectCount >= config.problemsToComplete) {
        setTimeout(() => {
          setShowLevelComplete(true);
          onLevelComplete();
        }, 1500);
      } else {
        setTimeout(loadProblem, 1500);
      }
    } else {
      setCurrentStreak(0);
      setHasTriedOnce(true);
      setTimeout(() => {
        setFeedback({ show: false, isCorrect: false });
        setSelectedAnswer(null);
        setIsRetry(true);
      }, 1500);
    }
  };

  // Saltar nivel (si el usuario tiene 80%+ precisión)
  const handleSkipLevel = () => {
    clearRecentConceptos();
    setShowLevelComplete(true);
    onLevelComplete();
  };

  const canSkip = attemptCount >= 3 && correctCount / attemptCount >= 0.8;

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando problema...</p>
        </div>
      </div>
    );
  }

  // UI principal del juego
  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
      {/* Header con botón volver y progreso */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600">
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Progreso: {correctCount} / {config.problemsToComplete}
          </div>
          {canSkip && (
            <button onClick={handleSkipLevel} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
              <SkipForward size={16} />
              Saltar Nivel
            </button>
          )}
        </div>
      </div>

      {/* Título y pregunta */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{problem.question}</h2>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
        <div
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all"
          style={{ width: `${(correctCount / config.problemsToComplete) * 100}%` }}
        />
      </div>

      {/* Visualización del problema */}
      <div className="mb-6">
        <MiCanvas problem={problem} />
      </div>

      {/* Botón de pista */}
      <div className="text-center mb-4">
        {!showHint ? (
          <button onClick={() => setShowHint(true)} className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600">
            <Lightbulb size={16} />
            <span>Mostrar pista (H)</span>
          </button>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-lg inline-flex items-center gap-2">
            <Lightbulb size={16} />
            <span>{problem.hint}</span>
          </div>
        )}
      </div>

      {/* Opciones de respuesta (componente compartido) */}
      <GameAnswerOptions
        options={problem.options}
        selectedAnswer={selectedAnswer}
        correctAnswer={problem.correctAnswer}
        showFeedback={feedback.show}
        isCorrect={feedback.isCorrect}
        onAnswer={handleAnswer}
        themeColor="purple" // Cambiar según el color del juego
      />

      {/* Explicación después de respuesta correcta */}
      {feedback.show && feedback.isCorrect && problem.explanation && (
        <div className="mt-6 bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
            ¡Muy bien!
          </h4>
          <p className="text-sm text-green-800 dark:text-green-300">{problem.explanation}</p>
        </div>
      )}

      {/* Estadísticas */}
      <div className="mt-6 flex justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="text-center">
          <div className="text-xs text-gray-500">Correctas</div>
          <div className="font-bold text-green-600 text-lg">{correctCount}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Racha</div>
          <div className="font-bold text-purple-600 text-lg">{currentStreak}</div>
        </div>
        {attemptCount > 0 && (
          <div className="text-center">
            <div className="text-xs text-gray-500">Precisión</div>
            <div className="font-bold text-orange-600 text-lg">
              {Math.round((correctCount / attemptCount) * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Modal de nivel completado */}
      {showLevelComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-md">
            <div className="text-center">
              <Award size={60} className="mx-auto text-yellow-500 mb-4" />
              <h2 className="text-3xl font-bold mb-4">¡Nivel Completado!</h2>
              <p className="text-gray-600 mb-6">
                Precisión: {Math.round((correctCount / attemptCount) * 100)}%
              </p>
              <button
                onClick={onNextLevel}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold"
              >
                Continuar al Siguiente Nivel →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 4. Crear Menú del Juego

**Archivo:** `/components/{Nombre}GameMenu.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Circle, Hexagon, Star, ArrowRight, /* IconoDelJuego */ } from 'lucide-react';
import { MI_DIFFICULTY_CONFIGS, CONCEPTO_DEFINITIONS } from '@/lib/{nombre}Generator';
import type { MiGameDifficulty } from '@/lib/types/{nombre}-game';

interface MiGameMenuProps {
  onStart: (difficulty: MiGameDifficulty) => void;
}

export default function MiGameMenu({ onStart }: MiGameMenuProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<MiGameDifficulty>('basic');

  const difficulties: MiGameDifficulty[] = ['basic', 'intermediate', 'advanced'];

  const getDifficultyIcon = (difficulty: MiGameDifficulty) => {
    switch (difficulty) {
      case 'basic':
        return <Circle size={24} />;
      case 'intermediate':
        return <Hexagon size={24} />;
      case 'advanced':
        return <Star size={24} />;
    }
  };

  const getDifficultyColor = (difficulty: MiGameDifficulty) => {
    switch (difficulty) {
      case 'basic':
        return {
          bg: 'bg-green-50 dark:bg-green-900/30',
          border: 'border-green-200 dark:border-green-700',
          selectedBg: 'bg-green-100 dark:bg-green-900/50',
          selectedBorder: 'border-green-500',
          text: 'text-green-700 dark:text-green-400',
          badge: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
        };
      case 'intermediate':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/30',
          border: 'border-yellow-200 dark:border-yellow-700',
          selectedBg: 'bg-yellow-100 dark:bg-yellow-900/50',
          selectedBorder: 'border-yellow-500',
          text: 'text-yellow-700 dark:text-yellow-400',
          badge: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
        };
      case 'advanced':
        return {
          bg: 'bg-red-50 dark:bg-red-900/30',
          border: 'border-red-200 dark:border-red-700',
          selectedBg: 'bg-red-100 dark:bg-red-900/50',
          selectedBorder: 'border-red-500',
          text: 'text-red-700 dark:text-red-400',
          badge: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
        };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
            {/* Icono del juego */}
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Título del Juego
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Descripción del juego. Selecciona un nivel de dificultad para comenzar.
        </p>
      </div>

      {/* Tarjetas de dificultad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {difficulties.map((difficulty) => {
          const config = MI_DIFFICULTY_CONFIGS[difficulty];
          const colors = getDifficultyColor(difficulty);
          const isSelected = selectedDifficulty === difficulty;

          return (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                isSelected
                  ? `${colors.selectedBg} ${colors.selectedBorder} shadow-lg`
                  : `${colors.bg} ${colors.border} hover:shadow-md`
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
              )}

              <div className={`${colors.text} mb-4`}>{getDifficultyIcon(difficulty)}</div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {config.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {config.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                  {config.conceptos.length} conceptos
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                  {config.problemsToComplete} problemas
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Botón comenzar */}
      <div className="text-center">
        <button
          onClick={() => onStart(selectedDifficulty)}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <span>Comenzar Juego</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Instrucciones */}
      <div className="mt-8 bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6">
        <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-3">
          ¿Cómo jugar?
        </h4>
        <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-300">
          <li>• Instrucción 1</li>
          <li>• Instrucción 2</li>
          <li>• Usa <kbd className="px-1 bg-purple-200 dark:bg-purple-800 rounded">1-4</kbd> para responder</li>
          <li>• Presiona <kbd className="px-1 bg-purple-200 dark:bg-purple-800 rounded">H</kbd> para ver pistas</li>
        </ul>
      </div>
    </div>
  );
}
```

### 5. Crear Página de Ruta

**Archivo:** `/app/practice/geometry/{nombre}/page.tsx`

```typescript
'use client';

import { createGamePage } from '@/lib/factories/createGamePage';
import MiGameMenu from '@/components/{Nombre}GameMenu';
import MiGame from '@/components/{Nombre}Game';
import type { MiGameDifficulty } from '@/lib/types/{nombre}-game';

export default createGamePage<MiGameDifficulty>({
  storageKey: '{nombre}GameProgress',
  levels: ['basic', 'intermediate', 'advanced'],
  MenuComponent: MiGameMenu,
  GameComponent: MiGame,
  theme: {
    gradientFrom: 'purple-50',
    gradientVia: 'white',
    gradientTo: 'pink-50',
    spinnerColor: 'purple-600',
  },
});
```

### 6. Registrar el Juego

**Actualizar:** `/lib/geometryGames.ts`

```typescript
import { MiIcono } from 'lucide-react'; // Importar icono

export const GEOMETRY_GAMES: GeometryGame[] = [
  // ... juegos existentes ...
  {
    id: 'mi-juego',
    title: 'Título del Juego',
    description: 'Descripción breve del juego.',
    icon: MiIcono,
    route: '/practice/geometry/{nombre}',
    category: 'shapes', // o 'spatial', 'measurement', 'angles'
    status: 'available', // o 'coming_soon', 'locked'
    difficulty: 'intermediate', // beginner, intermediate, advanced
    skills: ['Habilidad 1', 'Habilidad 2', 'Habilidad 3'],
    estimatedTime: '15-20 min',
    colorScheme: {
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      badgeBg: 'bg-purple-100 dark:bg-purple-900/50',
      badgeText: 'text-purple-800 dark:text-purple-300',
    },
  },
];
```

## 🎨 Colores de Tema Disponibles

Usa estos en `GameAnswerOptions`:

- `orange` - Ángulos
- `cyan` - Simetría
- `emerald` - Sólidos 3D
- `purple` - Identificación de formas
- `indigo` - Propiedades de formas

## ✅ Checklist de Verificación

Antes de commitear tu nuevo juego:

- [ ] Tipos definidos en `/lib/types/{nombre}-game.ts`
- [ ] Generador implementado en `/lib/{nombre}Generator.ts`
- [ ] Utiliza `randomInRange` y `shuffleArray` de `/lib/utils/gameUtils.ts`
- [ ] Componente del juego en `/components/{Nombre}Game.tsx`
- [ ] Usa `GameAnswerOptions` para las opciones de respuesta
- [ ] Menú implementado en `/components/{Nombre}GameMenu.tsx`
- [ ] Página creada con `createGamePage` factory
- [ ] Juego registrado en `/lib/geometryGames.ts`
- [ ] Contenido educativo en español
- [ ] Ejemplos del mundo real incluidos
- [ ] Atajos de teclado (1-4, H) funcionando
- [ ] Sistema de pistas implementado
- [ ] Sistema de racha implementado
- [ ] Opción de saltar nivel (80%+ precisión)
- [ ] Feedback visual apropiado
- [ ] Modal de nivel completado
- [ ] Probado en todos los niveles de dificultad

## 📚 Recursos Adicionales

- Ver juegos existentes para ejemplos de implementación
- Componentes compartidos en `/components/GameAnswerOptions.tsx`
- Utilidades compartidas en `/lib/utils/gameUtils.ts`
- Hooks compartidos en `/lib/hooks/useGameProgress.ts`
- Factory de páginas en `/lib/factories/createGamePage.tsx`

## 💡 Tips

1. **Reutiliza patrones**: Los juegos existentes son plantillas excelentes
2. **Contenido educativo**: Siempre incluye explicaciones y ejemplos reales
3. **Variedad**: Usa el sistema de "recent" para evitar repetición
4. **Dificultad progresiva**: Basic (10 problemas) → Intermediate (12) → Advanced (15)
5. **Feedback inmediato**: Mostrar explicaciones después de respuestas
6. **Accesibilidad**: Atajos de teclado y navegación clara
