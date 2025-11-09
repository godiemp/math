'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/lib/questions'
import { Question } from '@/lib/types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { M1_SKILLS, getSkillNames } from '@/lib/skillTaxonomy'
import { Card, Button, Heading, Text, Badge } from '@/components/ui'
import { QuestionPreview, QuestionRenderer } from '@/components/QuestionRenderer'
import { MathText } from '@/components/MathDisplay'
import AdminLayout from '@/components/AdminLayout'

function ProblemsExplorerContent() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'M1' | 'M2'>('all')
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'números' | 'álgebra' | 'geometría' | 'probabilidad'>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard' | 'extreme'>('all')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyWithImages, setShowOnlyWithImages] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [showSkillsFilter, setShowSkillsFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  // Get all unique skills from questions
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>()
    questions.forEach(q => {
      if (q.skills) {
        q.skills.forEach(skill => skillSet.add(skill))
      }
    })
    return Array.from(skillSet).sort()
  }, [])

  // Filter questions based on selected filters
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedLevel !== 'all' && q.level !== selectedLevel) return false
      if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false
      if (selectedSkills.length > 0 && !selectedSkills.every(skill => q.skills?.includes(skill))) return false
      if (showOnlyWithImages && !q.visualData) return false
      if (searchQuery && !q.question.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !q.topic.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !q.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [selectedLevel, selectedSubject, selectedDifficulty, selectedSkills, searchQuery, showOnlyWithImages])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedLevel, selectedSubject, selectedDifficulty, selectedSkills, searchQuery, showOnlyWithImages])

  // Pagination calculations
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex)

  // Page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  // Statistics
  const stats = {
    total: questions.length,
    filtered: filteredQuestions.length,
    withImages: questions.filter(q => q.visualData).length,
    byLevel: {
      M1: questions.filter(q => q.level === 'M1').length,
      M2: questions.filter(q => q.level === 'M2').length,
    },
    bySubject: {
      números: questions.filter(q => q.subject === 'números').length,
      álgebra: questions.filter(q => q.subject === 'álgebra').length,
      geometría: questions.filter(q => q.subject === 'geometría').length,
      probabilidad: questions.filter(q => q.subject === 'probabilidad').length,
    },
    byDifficulty: {
      easy: questions.filter(q => q.difficulty === 'easy').length,
      medium: questions.filter(q => q.difficulty === 'medium').length,
      hard: questions.filter(q => q.difficulty === 'hard').length,
      extreme: questions.filter(q => q.difficulty === 'extreme').length,
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'extreme': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'M1': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'M2': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'números': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
      case 'álgebra': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      case 'geometría': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
      case 'probabilidad': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Heading level={1} size="lg" className="mb-2">
            Explorador de Problemas
          </Heading>
          <Text variant="secondary">
            Explora y gestiona todos los problemas de práctica
          </Text>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card padding="md">
              <Heading level={2} size="sm" className="mb-1">{stats.total}</Heading>
              <Text size="xs" variant="secondary">Total Problemas</Text>
            </Card>
            <Card padding="md">
              <Heading level={2} size="sm" className="text-[#0A84FF] mb-1">{stats.byLevel.M1}</Heading>
              <Text size="xs" variant="secondary">Nivel M1</Text>
            </Card>
            <Card padding="md">
              <Heading level={2} size="sm" className="text-[#5E5CE6] dark:text-[#9A99FF] mb-1">{stats.byLevel.M2}</Heading>
              <Text size="xs" variant="secondary">Nivel M2</Text>
            </Card>
            <Card padding="md">
              <Heading level={2} size="sm" className="text-[#0A84FF] mb-1">{filteredQuestions.length}</Heading>
              <Text size="xs" variant="secondary">Filtrados</Text>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card padding="lg" className="mb-6">
          <Heading level={2} size="xs" className="mb-4">Filtros</Heading>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por pregunta, tema o ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nivel
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todos los niveles</option>
                <option value="M1">M1 ({stats.byLevel.M1})</option>
                <option value="M2">M2 ({stats.byLevel.M2})</option>
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Materia
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todas las materias</option>
                <option value="números">Números ({stats.bySubject.números})</option>
                <option value="álgebra">Álgebra ({stats.bySubject.álgebra})</option>
                <option value="geometría">Geometría ({stats.bySubject.geometría})</option>
                <option value="probabilidad">Probabilidad ({stats.bySubject.probabilidad})</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dificultad
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todas las dificultades</option>
                <option value="easy">Fácil ({stats.byDifficulty.easy})</option>
                <option value="medium">Media ({stats.byDifficulty.medium})</option>
                <option value="hard">Difícil ({stats.byDifficulty.hard})</option>
                <option value="extreme">Extremo ({stats.byDifficulty.extreme})</option>
              </select>
            </div>
          </div>

          {/* Image Filter Checkbox */}
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyWithImages}
                onChange={(e) => setShowOnlyWithImages(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Solo problemas con imágenes ({stats.withImages} problemas)
              </span>
            </label>
          </div>

          {/* Skills Filter */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Habilidades ({selectedSkills.length} seleccionadas)
              </label>
              <button
                onClick={() => setShowSkillsFilter(!showSkillsFilter)}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                {showSkillsFilter ? '▼ Ocultar' : '▶ Mostrar'}
              </button>
            </div>
            {showSkillsFilter && (
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 max-h-60 overflow-y-auto bg-gray-50 dark:bg-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {allSkills.map(skillId => {
                    const skill = M1_SKILLS[skillId]
                    const isSelected = selectedSkills.includes(skillId)
                    return (
                      <label
                        key={skillId}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                          isSelected ? 'bg-indigo-100 dark:bg-indigo-900' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSkills([...selectedSkills, skillId])
                            } else {
                              setSelectedSkills(selectedSkills.filter(s => s !== skillId))
                            }
                          }}
                          className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {skill?.name || skillId}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}
            {selectedSkills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedSkills.map(skillId => {
                  const skill = M1_SKILLS[skillId]
                  return (
                    <span
                      key={skillId}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full"
                    >
                      {skill?.name || skillId}
                      <button
                        onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skillId))}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        ×
                      </button>
                    </span>
                  )
                })}
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {(selectedLevel !== 'all' || selectedSubject !== 'all' || selectedDifficulty !== 'all' || selectedSkills.length > 0 || searchQuery || showOnlyWithImages) && (
            <button
              onClick={() => {
                setSelectedLevel('all')
                setSelectedSubject('all')
                setSelectedDifficulty('all')
                setSelectedSkills([])
                setSearchQuery('')
                setShowOnlyWithImages(false)
              }}
              className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              Limpiar filtros
            </button>
          )}
        </Card>

        {/* Questions List */}
        <Card padding="lg" className="overflow-hidden">
          {/* Pagination Info and Items Per Page */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando {filteredQuestions.length === 0 ? 0 : startIndex + 1} a {Math.min(endIndex, filteredQuestions.length)} de {filteredQuestions.length} resultados
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Por página:
              </label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pregunta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tema
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nivel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Materia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dificultad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Habilidades
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredQuestions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No se encontraron problemas con los filtros seleccionados
                    </td>
                  </tr>
                ) : (
                  paginatedQuestions.map((question) => (
                    <tr key={question.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {question.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-md">
                        <div className="truncate">
                          <QuestionPreview question={question} maxLength={80} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {question.topic}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(question.level)}`}>
                          {question.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSubjectColor(question.subject)}`}>
                          {question.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {question.skills && question.skills.length > 0 ? (
                            <span className="font-medium">{question.skills.length} habilidades</span>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">Sin habilidades</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedQuestion(question)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredQuestions.length > 0 && totalPages > 1 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    currentPage === 1
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
                  }`}
                >
                  ← Anterior
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {getPageNumbers().map((page, idx) => (
                    page === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-3 py-1 text-gray-500 dark:text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(Number(page))}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    currentPage === totalPages
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
                  }`}
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* Question Detail Modal */}
        {selectedQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Detalles del Problema
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(selectedQuestion.level)}`}>
                        {selectedQuestion.level}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSubjectColor(selectedQuestion.subject)}`}>
                        {selectedQuestion.subject}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                        {selectedQuestion.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedQuestion(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID</h3>
                    <p className="text-gray-900 dark:text-white font-mono">{selectedQuestion.id}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tema</h3>
                    <p className="text-gray-900 dark:text-white">{selectedQuestion.topic}</p>
                  </div>

                  {/* Question Renderer - Same as zen/rapidfire */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <QuestionRenderer
                      question={selectedQuestion}
                      mode="full"
                      selectedAnswer={selectedQuestion.correctAnswer}
                      showFeedback={true}
                      disabled={true}
                    />
                  </div>

                  {selectedQuestion.skills && selectedQuestion.skills.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Habilidades Requeridas ({selectedQuestion.skills.length})
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex flex-wrap gap-2">
                          {selectedQuestion.skills.map(skillId => {
                            const skill = M1_SKILLS[skillId]
                            return (
                              <div
                                key={skillId}
                                className="px-3 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-lg text-sm"
                                title={skill?.description}
                              >
                                <div className="font-medium">{skill?.name || skillId}</div>
                                {skill?.description && (
                                  <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                                    {skill.description}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="mt-6 flex justify-end">
                  <Button variant="ghost" onClick={() => setSelectedQuestion(null)}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default function ProblemsExplorer() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <ProblemsExplorerContent />
    </ProtectedRoute>
  )
}
