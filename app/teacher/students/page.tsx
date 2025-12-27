'use client';

import { useState, useEffect, useCallback } from 'react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text } from '@/components/ui';
import {
  getStudents,
  assignStudentGrade,
  createStudent,
  type StudentForTeacher,
  type GetStudentsParams,
  type CreateStudentResponse,
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

  // Add Student Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingStudent, setAddingStudent] = useState(false);
  const [newStudentFirstName, setNewStudentFirstName] = useState('');
  const [newStudentLastName, setNewStudentLastName] = useState('');
  const [newStudentGradeLevel, setNewStudentGradeLevel] = useState<StudentGradeLevel>('1-medio');

  // Credentials Modal State (shown after student is created)
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [createdStudentCredentials, setCreatedStudentCredentials] = useState<{
    displayName: string;
    username: string;
    password: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

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

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newStudentFirstName.trim() || !newStudentLastName.trim()) {
      setError('Por favor completa nombre y apellido');
      return;
    }

    try {
      setAddingStudent(true);
      setError(null);

      const response = await createStudent({
        firstName: newStudentFirstName.trim(),
        lastName: newStudentLastName.trim(),
        gradeLevel: newStudentGradeLevel,
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      // Store credentials and show modal
      setCreatedStudentCredentials({
        displayName: response.data?.student.displayName || '',
        username: response.data?.credentials.username || '',
        password: response.data?.credentials.password || '',
      });

      // Reset form and close add modal
      setNewStudentFirstName('');
      setNewStudentLastName('');
      setNewStudentGradeLevel('1-medio');
      setShowAddModal(false);

      // Show credentials modal
      setShowCredentialsModal(true);

      // Reload students list
      loadStudents();
    } catch (err) {
      console.error('Error creating student:', err);
      setError('Error al crear estudiante. Por favor intenta de nuevo.');
    } finally {
      setAddingStudent(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
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
              Crea y administra las cuentas de tus estudiantes.
            </Text>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
          >
            <span className="text-lg">+</span>
            Agregar Estudiante
          </button>
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

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <Heading level={2} size="md">
                Agregar Estudiante
              </Heading>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={newStudentFirstName}
                  onChange={(e) => setNewStudentFirstName(e.target.value)}
                  placeholder="Ej: María"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  value={newStudentLastName}
                  onChange={(e) => setNewStudentLastName(e.target.value)}
                  placeholder="Ej: González"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nivel
                </label>
                <select
                  value={newStudentGradeLevel}
                  onChange={(e) => setNewStudentGradeLevel(e.target.value as StudentGradeLevel)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {GRADE_LEVELS.map((grade) => (
                    <option key={grade.value} value={grade.value}>
                      {grade.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={addingStudent}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg transition-colors"
                >
                  {addingStudent ? 'Creando...' : 'Crear Estudiante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {showCredentialsModal && createdStudentCredentials && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <Heading level={2} size="md">
                Estudiante Creado
              </Heading>
              <Text variant="secondary" className="mt-2">
                Comparte estas credenciales con <strong>{createdStudentCredentials.displayName}</strong>
              </Text>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <Text size="sm" variant="secondary">Usuario</Text>
                    <Text className="font-mono font-medium">
                      {createdStudentCredentials.username}
                    </Text>
                  </div>
                  <button
                    onClick={() => copyToClipboard(createdStudentCredentials.username, 'username')}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {copiedField === 'username' ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <Text size="sm" variant="secondary">Contraseña</Text>
                    <Text className="font-mono font-medium">
                      {createdStudentCredentials.password}
                    </Text>
                  </div>
                  <button
                    onClick={() => copyToClipboard(createdStudentCredentials.password, 'password')}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {copiedField === 'password' ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl mb-6">
              <Text size="sm" className="text-amber-700 dark:text-amber-300">
                ⚠️ Guarda estas credenciales ahora. La contraseña no se puede recuperar después.
              </Text>
            </div>

            <button
              onClick={() => {
                setShowCredentialsModal(false);
                setCreatedStudentCredentials(null);
              }}
              className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </TeacherLayout>
  );
}
