'use client';

import { useState } from 'react';
import Quiz from '@/components/Quiz';
import { getQuestionsByLevel } from '@/lib/questions';
import Link from 'next/link';

type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';

export default function M1Practice() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | undefined>(undefined);
  const questions = getQuestionsByLevel('M1');

  const subjects: { value: Subject | undefined; label: string; emoji: string }[] = [
    { value: undefined, label: 'Todas', emoji: '📚' },
    { value: 'números', label: 'Números', emoji: '🔢' },
    { value: 'álgebra', label: 'Álgebra', emoji: '📐' },
    { value: 'geometría', label: 'Geometría', emoji: '📏' },
    { value: 'probabilidad', label: 'Probabilidad', emoji: '🎲' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <Link
              href="/"
              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-block"
            >
              ← Volver al Inicio
            </Link>
            <Link
              href="/curriculum/m1"
              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-block"
            >
              📚 Ver Curriculum M1
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica PAES - Competencia Matemática M1
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Contenidos básicos de matemática para todos los estudiantes
          </p>
        </div>

        {/* Subject Selection */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Selecciona una materia:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {subjects.map((subject) => (
              <button
                key={subject.label}
                onClick={() => setSelectedSubject(subject.value)}
                className={`p-4 rounded-lg border-2 transition-all font-semibold text-center ${
                  selectedSubject === subject.value
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{subject.emoji}</div>
                <div className="text-sm">{subject.label}</div>
              </button>
            ))}
          </div>
        </div>

        <Quiz questions={questions} level="M1" subject={selectedSubject} />
      </div>
    </div>
  );
}
