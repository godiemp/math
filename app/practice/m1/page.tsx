import Quiz from '@/components/Quiz';
import { getQuestionsByLevel } from '@/lib/questions';
import Link from 'next/link';

export default function M1Practice() {
  const questions = getQuestionsByLevel('M1');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-indigo-600 dark:text-indigo-400 hover:underline mb-4 inline-block"
          >
            ← Volver al Inicio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica PAES - Competencia Matemática M1
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Contenidos básicos de matemática para todos los estudiantes
          </p>
        </div>

        <Quiz questions={questions} level="M1" />
      </div>
    </div>
  );
}
