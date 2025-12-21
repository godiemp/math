'use client';

import { useState, useEffect, useCallback } from 'react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text } from '@/components/ui';
import {
  getStudents,
  assignStudentGrade,
  type StudentForTeacher,
  type GetStudentsParams,
} from '@/lib/api/teacher';
import type { StudentGradeLevel } from '@/lib/types';

const GRADE_LEVELS: { value: StudentGradeLevel; label: string }[] = [
  { value: '1-medio', label: '1° Medio' },
  { value: '2-medio', label: '2° Medio' },
  { value: '3-medio', label: '3° Medio' },
  { value: '4-medio', label: '4° Medio' },
];

function GradeBadge({ gradeLevel }: { gradeLevel: StudentGradeLevel | null }) {
  if (!gradeLevel) {
    return (
      <span className="px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        Sin asignar
      </span>
    );
  }

  const label = GRADE_LEVELS.find((g) => g.value === gradeLevel)?.label || gradeLevel;

  return (
    <span className="px-2 py-1 rounded-lg text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
      {label}
    </span>
  );
}

function StudentRow({
  student,
  onGradeChange,
  isUpdating,
}: {
  student: StudentForTeacher;
  onGradeChange: (studentId: string, gradeLevel: StudentGradeLevel | null) => void;
  isUpdating: boolean;
}) {
  const [selectedGrade, setSelectedGrade] = useState<string>(student.gradeLevel || '');

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedGrade(newValue);
    onGradeChange(student.id, newValue === '' ? null : (newValue as StudentGradeLevel));
  };

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium text-sm">
            {student.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {student.displayName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {student.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <GradeBadge gradeLevel={student.gradeLevel} />
      </td>
      <td className="px-4 py-3">
        <select
          value={selectedGrade}
          onChange={handleGradeChange}
          disabled={isUpdating}
          className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
        >
          <option value="">Sin asignar</option>
          {GRADE_LEVELS.map((grade) => (
            <option key={grade.value} value={grade.value}>
              {grade.label}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {student.lastPracticeDate || 'Nunca'}
      </td>
    </tr>
  );
}

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<StudentForTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStudentId, setUpdatingStudentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: GetStudentsParams = {};
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      if (filterGrade !== 'all') {
        params.gradeLevel = filterGrade as StudentGradeLevel | 'unassigned';
      }

      const response = await getStudents(params);
      if (response.error) {
        throw new Error(response.error.error);
      }
      setStudents(response.data?.students || []);
    } catch (err) {
      console.error('Error loading students:', err);
      setError('Error al cargar estudiantes. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filterGrade]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleGradeChange = async (studentId: string, gradeLevel: StudentGradeLevel | null) => {
    try {
      setUpdatingStudentId(studentId);
      setError(null);

      const response = await assignStudentGrade(studentId, gradeLevel);

      if (response.error) {
        throw new Error(response.error.error);
      }

      // Update local state
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId
            ? { ...s, gradeLevel: response.data?.student.gradeLevel || null }
            : s
        )
      );

      setSuccessMessage(response.data?.message || 'Nivel asignado correctamente');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error assigning grade:', err);
      setError('Error al asignar nivel. Por favor intenta de nuevo.');
    } finally {
      setUpdatingStudentId(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadStudents();
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Heading level={1} size="lg">
              Gestionar Estudiantes
            </Heading>
            <Text variant="secondary" className="mt-1">
              Asigna niveles escolares a tus estudiantes para filtrar su contenido.
            </Text>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Filters */}
        <Card padding="md">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Todos los niveles</option>
                <option value="unassigned">Sin asignar</option>
                {GRADE_LEVELS.map((grade) => (
                  <option key={grade.value} value={grade.value}>
                    {grade.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              Buscar
            </button>
          </form>
        </Card>

        {/* Students Table */}
        <Card className="!p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-500 dark:text-gray-400">Cargando...</div>
            </div>
          ) : students.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <Text variant="secondary">No se encontraron estudiantes</Text>
              {(searchQuery || filterGrade !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterGrade('all');
                  }}
                  className="mt-2 text-sm text-emerald-600 hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Estudiante
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Nivel Actual
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Asignar Nivel
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Última Práctica
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <StudentRow
                      key={student.id}
                      student={student}
                      onGradeChange={handleGradeChange}
                      isUpdating={updatingStudentId === student.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Info Box */}
        <Card padding="lg" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <Heading level={4} size="sm" className="mb-1">
                Sobre los niveles escolares
              </Heading>
              <Text size="sm" className="text-blue-700 dark:text-blue-300">
                Cuando asignas un nivel escolar a un estudiante, verá únicamente las
                mini-lecciones correspondientes a ese nivel (basadas en los Objetivos
                de Aprendizaje del MINEDUC). El contenido M1/M2 de preparación PAES
                quedará oculto para ellos.
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}
