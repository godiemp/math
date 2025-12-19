'use client';

import { useState, useMemo, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Heading, Text } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  schools,
  School,
  SortField,
  SortDirection,
  ContactStatus,
  DEPENDENCY_LABELS,
  DEPENDENCY_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
  CONTACT_STATUS_LABELS,
  CONTACT_STATUS_COLORS,
} from '@/lib/schools';

function SchoolsSalesContent() {
  // Filters
  const [selectedRegion, setSelectedRegion] = useState<number | 'all'>('all');
  const [selectedCommune, setSelectedCommune] = useState<number | 'all'>('all');
  const [selectedDependency, setSelectedDependency] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<number | 'all'>('all');
  const [selectedContactStatus, setSelectedContactStatus] = useState<ContactStatus | 'all'>('all');
  const [hasHighSchool, setHasHighSchool] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Contact tracking (frontend-only mockup)
  const [contactStatuses, setContactStatuses] = useState<Record<number, ContactStatus>>({});

  // Sorting
  const [sortField, setSortField] = useState<SortField>('highSchoolEnrollment');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Get unique regions and communes for dropdowns
  const regions = useMemo(() => {
    const uniqueRegions = new Map<number, string>();
    schools.forEach((s) => {
      if (!uniqueRegions.has(s.regionCode)) {
        uniqueRegions.set(s.regionCode, s.regionName);
      }
    });
    return Array.from(uniqueRegions.entries())
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.code - b.code);
  }, []);

  const communes = useMemo(() => {
    const filtered =
      selectedRegion === 'all'
        ? schools
        : schools.filter((s) => s.regionCode === selectedRegion);

    const uniqueCommunes = new Map<number, string>();
    filtered.forEach((s) => {
      if (!uniqueCommunes.has(s.communeCode)) {
        uniqueCommunes.set(s.communeCode, s.communeName);
      }
    });
    return Array.from(uniqueCommunes.entries())
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedRegion]);

  // Reset commune when region changes
  useEffect(() => {
    setSelectedCommune('all');
  }, [selectedRegion]);

  // Helper to get contact status for a school
  const getContactStatus = (rbd: number): ContactStatus => contactStatuses[rbd] || 1;

  // Filter schools
  const filteredSchools = useMemo(() => {
    return schools.filter((s) => {
      if (selectedRegion !== 'all' && s.regionCode !== selectedRegion) return false;
      if (selectedCommune !== 'all' && s.communeCode !== selectedCommune) return false;
      if (selectedDependency !== 'all' && s.dependencyCode !== selectedDependency)
        return false;
      if (selectedStatus !== 'all' && s.status !== selectedStatus) return false;
      if (selectedContactStatus !== 'all' && getContactStatus(s.rbd) !== selectedContactStatus)
        return false;
      if (hasHighSchool && s.highSchoolEnrollment === 0) return false;
      if (
        searchQuery &&
        !s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !s.rbd.toString().includes(searchQuery)
      )
        return false;
      return true;
    });
  }, [
    selectedRegion,
    selectedCommune,
    selectedDependency,
    selectedStatus,
    selectedContactStatus,
    contactStatuses,
    hasHighSchool,
    searchQuery,
  ]);

  // Sort schools
  const sortedSchools = useMemo(() => {
    const sorted = [...filteredSchools].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      if (sortField === 'contactStatus') {
        aVal = getContactStatus(a.rbd);
        bVal = getContactStatus(b.rbd);
      } else {
        aVal = a[sortField];
        bVal = b[sortField];
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredSchools, sortField, sortDirection, contactStatuses]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedRegion,
    selectedCommune,
    selectedDependency,
    selectedStatus,
    selectedContactStatus,
    hasHighSchool,
    searchQuery,
  ]);

  // Pagination
  const totalPages = Math.ceil(sortedSchools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSchools = sortedSchools.slice(startIndex, endIndex);

  // Page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Stats
  const stats = {
    total: schools.length,
    filtered: filteredSchools.length,
    withHighSchool: schools.filter((s) => s.highSchoolEnrollment > 0).length,
    functioning: schools.filter((s) => s.status === 1).length,
  };

  // Pipeline stats (count schools by contact status)
  const pipelineStats = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    Object.values(contactStatuses).forEach((status) => {
      counts[status]++;
    });
    // Schools without a status are "Sin contactar" (1)
    counts[1] = schools.length - Object.keys(contactStatuses).length;
    const contacted = Object.keys(contactStatuses).length;
    return { counts, contacted };
  }, [contactStatuses]);

  // Handler to update contact status
  const handleContactStatusChange = (rbd: number, status: ContactStatus) => {
    setContactStatuses((prev) => {
      if (status === 1) {
        // Remove from tracking if set back to "Sin contactar"
        const { [rbd]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [rbd]: status };
    });
  };

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

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
            Base de datos MINEDUC 2025 - {schools.length.toLocaleString()} establecimientos
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
              value={searchQuery}
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
                value={selectedRegion}
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
                value={selectedCommune}
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
                value={selectedDependency}
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
                value={selectedStatus}
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
                value={selectedContactStatus}
                onChange={(e) =>
                  setSelectedContactStatus(
                    e.target.value === 'all' ? 'all' : (parseInt(e.target.value, 10) as ContactStatus)
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
                checked={hasHighSchool}
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
          {(selectedRegion !== 'all' ||
            selectedCommune !== 'all' ||
            selectedDependency !== 'all' ||
            selectedStatus !== 'all' ||
            selectedContactStatus !== 'all' ||
            hasHighSchool ||
            searchQuery) && (
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCommune('all');
                setSelectedDependency('all');
                setSelectedStatus('all');
                setSelectedContactStatus('all');
                setHasHighSchool(false);
                setSearchQuery('');
              }}
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
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
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
                          onChange={(e) =>
                            handleContactStatusChange(
                              school.rbd,
                              parseInt(e.target.value, 10) as ContactStatus
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
