'use client';

import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Heading, Text, SlidePanel } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  SortField,
  DEPENDENCY_LABELS,
  DEPENDENCY_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
  CONTACT_STATUS_LABELS,
  CONTACT_STATUS_COLORS,
} from '@/lib/schools';
import { useSchoolsSales } from '@/hooks/useSchoolsSales';

function SchoolsSalesContent() {
  const {
    // Filters
    filters,
    setSelectedRegion,
    setSelectedCommune,
    setSelectedDependency,
    setSelectedStatus,
    setSelectedContactStatus,
    setHasHighSchool,
    setSearchQuery,
    clearFilters,
    hasActiveFilters,

    // Region/Commune options
    regions,
    communes,

    // Sorting
    sortField,
    sortDirection,
    handleSort,

    // Pagination
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    getPageNumbers,

    // Data
    sortedSchools,
    paginatedSchools,
    stats,
    pipelineStats,

    // Contact status tracking
    getContactStatus,
    handleContactStatusChange,

    // School detail panel
    selectedSchool,
    setSelectedSchool,
    getSchoolContactInfo,

    // Contact form
    contactForm,
    setContactFormField,
    handleAddContact,
    handleRemoveContact,

    // Notes
    newNote,
    setNewNote,
    handleAddNote,
    handleRemoveNote,
  } = useSchoolsSales();

  const SortHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <th
      onClick={() => handleSort(field)}
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 select-none"
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          <span className="text-indigo-600 dark:text-indigo-400">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Heading level={1} size="lg" className="mb-2">
            Ventas Colegios
          </Heading>
          <Text variant="secondary">
            Base de datos MINEDUC 2025 - {stats.total.toLocaleString()} establecimientos
          </Text>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card padding="md">
            <Heading level={2} size="sm" className="mb-1">
              {stats.total.toLocaleString()}
            </Heading>
            <Text size="xs" variant="secondary">
              Total Colegios
            </Text>
          </Card>
          <Card padding="md">
            <Heading level={2} size="sm" className="text-purple-600 mb-1">
              {stats.withHighSchool.toLocaleString()}
            </Heading>
            <Text size="xs" variant="secondary">
              Con Enseñanza Media
            </Text>
          </Card>
          <Card padding="md">
            <Heading level={2} size="sm" className="text-green-600 mb-1">
              {stats.functioning.toLocaleString()}
            </Heading>
            <Text size="xs" variant="secondary">
              Funcionando
            </Text>
          </Card>
          <Card padding="md">
            <Heading level={2} size="sm" className="text-blue-600 mb-1">
              {pipelineStats.contacted.toLocaleString()}
            </Heading>
            <Text size="xs" variant="secondary">
              En pipeline
            </Text>
          </Card>
          <Card padding="md">
            <Heading level={2} size="sm" className="text-indigo-600 mb-1">
              {stats.filtered.toLocaleString()}
            </Heading>
            <Text size="xs" variant="secondary">
              Filtrados
            </Text>
          </Card>
        </div>

        {/* Filters */}
        <Card padding="lg" className="mb-6">
          <Heading level={2} size="xs" className="mb-4">
            Filtros
          </Heading>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre o RBD..."
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Región
              </label>
              <select
                value={filters.selectedRegion}
                onChange={(e) =>
                  setSelectedRegion(
                    e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10)
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todas las regiones</option>
                {regions.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Commune Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comuna
              </label>
              <select
                value={filters.selectedCommune}
                onChange={(e) =>
                  setSelectedCommune(
                    e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10)
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todas las comunas</option>
                {communes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dependency Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dependencia
              </label>
              <select
                value={filters.selectedDependency}
                onChange={(e) =>
                  setSelectedDependency(
                    e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10)
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todas las dependencias</option>
                {Object.entries(DEPENDENCY_LABELS).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estado
              </label>
              <select
                value={filters.selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10)
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todos los estados</option>
                {Object.entries(STATUS_LABELS).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pipeline
              </label>
              <select
                value={filters.selectedContactStatus}
                onChange={(e) =>
                  setSelectedContactStatus(
                    e.target.value === 'all' ? 'all' : (parseInt(e.target.value, 10) as 1 | 2 | 3 | 4 | 5 | 6 | 7)
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todos</option>
                {Object.entries(CONTACT_STATUS_LABELS).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* High School Filter Checkbox */}
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasHighSchool}
                onChange={(e) => setHasHighSchool(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Solo colegios con Enseñanza Media ({stats.withHighSchool.toLocaleString()}{' '}
                colegios)
              </span>
            </label>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              Limpiar filtros
            </button>
          )}
        </Card>

        {/* Table */}
        <Card padding="lg" className="overflow-hidden">
          {/* Pagination Info */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando {sortedSchools.length === 0 ? 0 : startIndex + 1} a{' '}
              {Math.min(endIndex, sortedSchools.length)} de{' '}
              {sortedSchools.length.toLocaleString()} resultados
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Por página:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
              >
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
                  <SortHeader field="rbd">RBD</SortHeader>
                  <SortHeader field="name">Nombre</SortHeader>
                  <SortHeader field="regionName">Región</SortHeader>
                  <SortHeader field="communeName">Comuna</SortHeader>
                  <SortHeader field="dependencyCode">Dependencia</SortHeader>
                  <SortHeader field="highSchoolEnrollment">Mat. Media</SortHeader>
                  <SortHeader field="totalEnrollment">Mat. Total</SortHeader>
                  <SortHeader field="status">Estado</SortHeader>
                  <SortHeader field="contactStatus">Pipeline</SortHeader>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedSchools.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      No se encontraron colegios con los filtros seleccionados
                    </td>
                  </tr>
                ) : (
                  paginatedSchools.map((school) => (
                    <tr
                      key={school.rbd}
                      onClick={() => setSelectedSchool(school)}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                        {school.rbd}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                        {school.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {school.regionName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {school.communeName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            DEPENDENCY_COLORS[school.dependencyCode] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {DEPENDENCY_LABELS[school.dependencyCode] || 'Desconocido'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                        {school.highSchoolEnrollment > 0 ? (
                          <span className="text-purple-600 dark:text-purple-400">
                            {school.highSchoolEnrollment.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                        {school.totalEnrollment.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            STATUS_COLORS[school.status] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {STATUS_LABELS[school.status] || 'Desconocido'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={getContactStatus(school.rbd)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            handleContactStatusChange(
                              school.rbd,
                              parseInt(e.target.value, 10) as 1 | 2 | 3 | 4 | 5 | 6 | 7
                            )
                          }
                          className={`px-2 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer ${
                            CONTACT_STATUS_COLORS[getContactStatus(school.rbd)]
                          }`}
                        >
                          {Object.entries(CONTACT_STATUS_LABELS).map(([code, label]) => (
                            <option key={code} value={code}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {sortedSchools.length > 0 && totalPages > 1 && (
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
                  {getPageNumbers().map((page, idx) =>
                    page === '...' ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-3 py-1 text-gray-500 dark:text-gray-400"
                      >
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
                  )}
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
      </div>

      {/* School Detail Panel */}
      <SlidePanel
        isOpen={selectedSchool !== null}
        onClose={() => setSelectedSchool(null)}
        title={selectedSchool?.name || ''}
        width="xl"
      >
        {selectedSchool && (
          <div className="space-y-6">
            {/* Header with RBD and Pipeline Status */}
            <div className="flex items-center justify-between">
              <div>
                <Text size="sm" variant="secondary">
                  RBD: {selectedSchool.rbd}
                </Text>
              </div>
              <select
                value={getContactStatus(selectedSchool.rbd)}
                onChange={(e) =>
                  handleContactStatusChange(
                    selectedSchool.rbd,
                    parseInt(e.target.value, 10) as 1 | 2 | 3 | 4 | 5 | 6 | 7
                  )
                }
                className={`px-3 py-1.5 text-sm font-semibold rounded-full border-0 cursor-pointer ${
                  CONTACT_STATUS_COLORS[getContactStatus(selectedSchool.rbd)]
                }`}
              >
                {Object.entries(CONTACT_STATUS_LABELS).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* School Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Text size="xs" variant="secondary">
                    Región
                  </Text>
                  <Text size="sm">{selectedSchool.regionName}</Text>
                </div>
                <div>
                  <Text size="xs" variant="secondary">
                    Comuna
                  </Text>
                  <Text size="sm">{selectedSchool.communeName}</Text>
                </div>
                <div>
                  <Text size="xs" variant="secondary">
                    Dependencia
                  </Text>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                      DEPENDENCY_COLORS[selectedSchool.dependencyCode] ||
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {DEPENDENCY_LABELS[selectedSchool.dependencyCode] || 'Desconocido'}
                  </span>
                </div>
                <div>
                  <Text size="xs" variant="secondary">
                    Estado
                  </Text>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                      STATUS_COLORS[selectedSchool.status] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {STATUS_LABELS[selectedSchool.status] || 'Desconocido'}
                  </span>
                </div>
                <div>
                  <Text size="xs" variant="secondary">
                    Matrícula Media
                  </Text>
                  <Text size="sm" className="text-purple-600 dark:text-purple-400 font-medium">
                    {selectedSchool.highSchoolEnrollment.toLocaleString()}
                  </Text>
                </div>
                <div>
                  <Text size="xs" variant="secondary">
                    Matrícula Total
                  </Text>
                  <Text size="sm" className="font-medium">
                    {selectedSchool.totalEnrollment.toLocaleString()}
                  </Text>
                </div>
              </div>
            </div>

            {/* Search Links Section */}
            <div>
              <Heading level={3} size="xs" className="mb-3">
                Buscar información
              </Heading>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    `"${selectedSchool.name}" ${selectedSchool.communeName} colegio sitio web`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Buscar sitio web
                </a>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    `"${selectedSchool.name}" ${selectedSchool.communeName} contacto email teléfono`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Buscar contacto
                </a>
                <a
                  href={`https://www.mime.mineduc.cl/mvc/mime/ficha?rbd=${selectedSchool.rbd}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Ficha MINEDUC
                </a>
              </div>
              <Text size="xs" variant="secondary" className="mt-2">
                Abre una búsqueda en Google para encontrar información de contacto del colegio
              </Text>
            </div>

            {/* Contacts Section */}
            <div>
              <Heading level={3} size="xs" className="mb-3">
                Contactos
              </Heading>

              {/* Existing Contacts */}
              {getSchoolContactInfo(selectedSchool.rbd).contacts.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {getSchoolContactInfo(selectedSchool.rbd).contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-start justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Text size="sm" className="font-medium">
                            {contact.name}
                          </Text>
                          {contact.role && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ({contact.role})
                            </span>
                          )}
                        </div>
                        {contact.email && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                            <span>✉</span>
                            <a
                              href={`mailto:${contact.email}`}
                              className="hover:text-indigo-600 dark:hover:text-indigo-400"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {contact.email}
                            </a>
                          </div>
                        )}
                        {contact.phone && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                            <span>☎</span>
                            <a
                              href={`tel:${contact.phone}`}
                              className="hover:text-indigo-600 dark:hover:text-indigo-400"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {contact.phone}
                            </a>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveContact(selectedSchool.rbd, contact.id)}
                        className="text-gray-400 hover:text-red-500 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <Text size="sm" variant="secondary" className="mb-4">
                  No hay contactos registrados
                </Text>
              )}

              {/* Add Contact Form */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                <Text size="xs" variant="secondary" className="font-medium">
                  Agregar contacto
                </Text>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Nombre *"
                    value={contactForm.name}
                    onChange={(e) => setContactFormField('name', e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Rol (ej: Director)"
                    value={contactForm.role}
                    onChange={(e) => setContactFormField('role', e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={(e) => setContactFormField('email', e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={contactForm.phone}
                    onChange={(e) => setContactFormField('phone', e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => handleAddContact(selectedSchool.rbd)}
                  disabled={!contactForm.name.trim()}
                  className="w-full px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  + Agregar contacto
                </button>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <Heading level={3} size="xs" className="mb-3">
                Notas
              </Heading>

              {/* Add Note Form */}
              <div className="mb-4 space-y-2">
                <textarea
                  placeholder="Agregar una nota..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                />
                <button
                  onClick={() => handleAddNote(selectedSchool.rbd)}
                  disabled={!newNote.trim()}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  + Agregar nota
                </button>
              </div>

              {/* Existing Notes */}
              {getSchoolContactInfo(selectedSchool.rbd).notes.length > 0 ? (
                <div className="space-y-2">
                  {getSchoolContactInfo(selectedSchool.rbd).notes.map((note) => (
                    <div
                      key={note.id}
                      className="flex items-start justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                    >
                      <div className="flex-1">
                        <Text size="sm" className="whitespace-pre-wrap">
                          {note.text}
                        </Text>
                        <Text size="xs" variant="secondary" className="mt-1">
                          {new Date(note.createdAt).toLocaleDateString('es-CL', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Text>
                      </div>
                      <button
                        onClick={() => handleRemoveNote(selectedSchool.rbd, note.id)}
                        className="text-gray-400 hover:text-red-500 text-sm ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <Text size="sm" variant="secondary">
                  No hay notas registradas
                </Text>
              )}
            </div>
          </div>
        )}
      </SlidePanel>
    </AdminLayout>
  );
}

export default function SchoolsSalesPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <SchoolsSalesContent />
    </ProtectedRoute>
  );
}
