'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CurriculumSidebar } from './ui/CurriculumSidebar';
import { getGroupedUnits, type ThematicUnit } from '@/lib/services/thematicUnitsService';
import type { Level } from '@/lib/types';
import { api } from '@/lib/api-client';

interface CurriculumProps {
  level: Level;
}

// Map subject names to practice page keys
function mapSubjectToKey(subjectName: string): string {
  const mapping: { [key: string]: string } = {
    'números': 'números',
    'álgebra': 'álgebra',
    'geometría': 'geometría',
    'probabilidad': 'probabilidad'
  };
  return mapping[subjectName] || '';
}

// Subject display configuration
const subjectConfig = {
  números: {
    displayName: 'Números',
    icon: '🔢',
    color: 'bg-blue-100 dark:bg-blue-900',
    borderColor: 'border-blue-300 dark:border-blue-700',
    textColor: 'text-blue-900 dark:text-blue-100',
  },
  álgebra: {
    displayName: 'Álgebra y Funciones',
    icon: '📐',
    color: 'bg-purple-100 dark:bg-purple-900',
    borderColor: 'border-purple-300 dark:border-purple-700',
    textColor: 'text-purple-900 dark:text-purple-100',
  },
  geometría: {
    displayName: 'Geometría',
    icon: '📏',
    color: 'bg-green-100 dark:bg-green-900',
    borderColor: 'border-green-300 dark:border-green-700',
    textColor: 'text-green-900 dark:text-green-100',
  },
  probabilidad: {
    displayName: 'Probabilidad y Estadística',
    icon: '📊',
    color: 'bg-orange-100 dark:bg-orange-900',
    borderColor: 'border-orange-300 dark:border-orange-700',
    textColor: 'text-orange-900 dark:text-orange-100',
  },
};

// Skill-Topic Matrix
const skillTopicMatrix = {
  'Números': {
    skills: ['Resolver', 'Modelar', 'Argumentar'],
    description: 'Problemas con porcentajes, potencias, modelos financieros'
  },
  'Álgebra y Funciones': {
    skills: ['Resolver', 'Modelar', 'Representar', 'Argumentar'],
    description: 'Ecuaciones, funciones, tablas y gráficos'
  },
  'Geometría': {
    skills: ['Resolver', 'Modelar', 'Representar'],
    description: 'Figuras, plano cartesiano, vectores'
  },
  'Probabilidad y Estadística': {
    skills: ['Resolver', 'Modelar', 'Representar', 'Argumentar'],
    description: 'Datos, gráficos, inferencias'
  }
};

export default function Curriculum({ level }: CurriculumProps) {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [units, setUnits] = useState<{
    números: ThematicUnit[];
    álgebra: ThematicUnit[];
    geometría: ThematicUnit[];
    probabilidad: ThematicUnit[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function loadUnits() {
      setLoading(true);
      const response = await getGroupedUnits(level);
      if (response) {
        setUnits(response.grouped);
      }
      setLoading(false);
    }
    loadUnits();
  }, [level]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const copyCurriculum = async () => {
    try {
      setCopyStatus('copying');

      const response = await api.get<{ units: ThematicUnit[] }>(`/api/thematic-units?level=${level}`);

      if (response.data?.units) {
        const jsonString = JSON.stringify(response.data.units, null, 2);
        await navigator.clipboard.writeText(jsonString);
        setCopyStatus('success');

        setTimeout(() => setCopyStatus('idle'), 2000);
      }
    } catch (error) {
      console.error('Error copying curriculum:', error);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] flex items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-400">Cargando currículo...</div>
      </div>
    );
  }

  if (!units) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] flex items-center justify-center">
        <div className="text-lg text-red-600 dark:text-red-400">Error al cargar el currículo</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 min-h-14 backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-b border-black/[0.12] dark:border-white/[0.16] saturate-[1.2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-[#0A84FF]">
            SimplePAES - Matemática
          </h1>
          <Link
            href="/dashboard"
            className="text-xs sm:text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </nav>

      {/* Main layout with sidebar */}
      <div className="flex">
        {/* Hide sidebar on mobile, show on md and up */}
        <div className="hidden md:block">
          <CurriculumSidebar currentLevel={level} />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Mobile level selector - shown only on mobile */}
            <div className="md:hidden mb-4 flex gap-2 overflow-x-auto pb-2">
              <Link
                href="/curriculum/m1"
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  level === 'M1'
                    ? 'bg-[#0A84FF] text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                📐 M1
              </Link>
              <Link
                href="/curriculum/m2"
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  level === 'M2'
                    ? 'bg-[#0A84FF] text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                🎓 M2
              </Link>
            </div>

            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
                  Curriculum PAES - Nivel {level}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={copyCurriculum}
                    disabled={copyStatus === 'copying'}
                    className={`font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap self-start ${
                      copyStatus === 'success'
                        ? 'bg-green-600 text-white'
                        : copyStatus === 'error'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                    title={`Copy ${level} curriculum to clipboard`}
                  >
                    {copyStatus === 'copying' ? (
                      <>⏳ <span className="hidden sm:inline">Copying...</span></>
                    ) : copyStatus === 'success' ? (
                      <>✓ <span className="hidden sm:inline">Copied!</span></>
                    ) : copyStatus === 'error' ? (
                      <>✗ <span className="hidden sm:inline">Error</span></>
                    ) : (
                      <>📋 <span className="hidden sm:inline">Copy Curriculum</span></>
                    )}
                  </button>
                  {level === 'M1' && (
                    <Link
                      href="/curriculum/m1/docs"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap self-start"
                    >
                      📖 <span className="hidden sm:inline">Ver Documentación Detallada</span><span className="sm:hidden">Docs</span>
                    </Link>
                  )}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg mb-2">
                {level === 'M1'
                  ? 'Competencia Matemática 1 - Contenidos básicos'
                  : 'Competencia Matemática 2 - Contenidos avanzados'}
              </p>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-1">
                <span><span className="font-semibold">Duración:</span> 2h 20min</span>
                <span className="hidden sm:inline">|</span>
                <span><span className="font-semibold">Preguntas:</span> {level === 'M1' ? '65 (60 para puntaje)' : '55 (50 para puntaje)'}</span>
                {level === 'M2' && <><span className="hidden sm:inline">|</span><span>Incluye Suficiencia de Datos</span></>}
              </div>
            </div>

            {/* Thematic Units */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">
                📚 Ejes Temáticos y Unidades
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-6">
                {Object.entries(units).map(([subject, subjectUnits], index) => {
                  const config = subjectConfig[subject as keyof typeof subjectConfig];
                  if (!subjectUnits || subjectUnits.length === 0) return null;

                  return (
                    <div
                      key={subject}
                      className={`${config.color} rounded-lg p-4 sm:p-5 md:p-6 border-2 ${config.borderColor}`}
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3 sm:mb-4">
                        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <span className="text-2xl sm:text-3xl flex-shrink-0">{config.icon}</span>
                          <div className="min-w-0">
                            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${config.textColor} break-words`}>
                              {index + 1}. {config.displayName}
                            </h3>
                            <div className="flex items-center gap-2 sm:gap-3 mt-1">
                              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {subjectUnits.length} unidades temáticas
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link
                          href={`/practice/${level.toLowerCase()}?subject=${mapSubjectToKey(subject)}`}
                          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-3 sm:px-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 transition-colors text-xs sm:text-sm whitespace-nowrap self-start"
                        >
                          Practicar →
                        </Link>
                      </div>

                      {/* Units list */}
                      <div className="mb-3 sm:mb-4">
                        <ul className="space-y-1.5 sm:space-y-2">
                          {subjectUnits.map((unit, idx) => {
                            const topicId = `${subject}-${unit.code}`;
                            const isExpanded = expandedTopics[topicId];

                            return (
                              <li key={unit.code} className="border-l-2 border-gray-300 dark:border-gray-600 pl-2 sm:pl-3">
                                <button
                                  onClick={() => toggleTopic(topicId)}
                                  className="flex items-start justify-between w-full text-left hover:opacity-80 transition-opacity"
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                                      <span className="text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium">
                                        {unit.code}
                                      </span>
                                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                        {unit.name}
                                      </span>
                                    </div>
                                    {isExpanded && unit.subsections && unit.subsections.length > 0 && (
                                      <div className="mt-2 pl-2 sm:pl-4 space-y-1.5 sm:space-y-2">
                                        <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2">
                                          <p className="font-semibold text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2">
                                            📋 Subsecciones:
                                          </p>
                                          <ul className="space-y-1">
                                            {unit.subsections.map((subsection) => (
                                              <li key={subsection.code} className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                <span className="font-medium">{subsection.code}.</span> {subsection.name}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                                    {isExpanded ? '▼' : '▶'}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Habilidades */}
              <div className="mb-4 sm:mb-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 sm:p-5 md:p-6 border-2 border-indigo-200 dark:border-indigo-700">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-indigo-900 dark:text-indigo-100">
                  🎯 Habilidades Evaluadas
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {['Resolver problemas', 'Modelar', 'Representar', 'Argumentar'].map((skill) => (
                    <div key={skill} className="bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 text-center">
                      <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill-Topic Matrix */}
              <div className="mb-4 sm:mb-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 sm:p-5 md:p-6 border-2 border-purple-200 dark:border-purple-700">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-purple-900 dark:text-purple-100">
                  🧩 Matriz Habilidad-Eje Temático
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                  Cada eje temático evalúa diferentes habilidades. Esta matriz muestra qué habilidades se requieren en cada área.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  {Object.entries(skillTopicMatrix).map(([axis, data]) => (
                    <div key={axis} className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-purple-200 dark:border-purple-700">
                      <h4 className="font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 text-gray-800 dark:text-gray-200">{axis}</h4>
                      <div className="flex flex-wrap gap-1 mb-1.5 sm:mb-2">
                        {data.skills.map((skill) => (
                          <span key={skill} className="text-[10px] sm:text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-1.5 sm:px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{data.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                href={`/practice/${level.toLowerCase()}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base text-center"
              >
                Comenzar Práctica
              </Link>
              <Link
                href="/dashboard"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base text-center"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
