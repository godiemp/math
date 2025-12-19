import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  schools,
  School,
  SortField,
  SortDirection,
  ContactStatus,
  SchoolContact,
  SchoolNote,
  SchoolContactInfo,
} from '@/lib/schools';

export interface SchoolsFilters {
  selectedRegion: number | 'all';
  selectedCommune: number | 'all';
  selectedDependency: number | 'all';
  selectedStatus: number | 'all';
  selectedContactStatus: ContactStatus | 'all';
  hasHighSchool: boolean;
  searchQuery: string;
}

export interface SchoolsStats {
  total: number;
  filtered: number;
  withHighSchool: number;
  functioning: number;
}

export interface PipelineStats {
  counts: Record<number, number>;
  contacted: number;
}

export interface UseSchoolsSalesReturn {
  // Filters
  filters: SchoolsFilters;
  setSelectedRegion: (value: number | 'all') => void;
  setSelectedCommune: (value: number | 'all') => void;
  setSelectedDependency: (value: number | 'all') => void;
  setSelectedStatus: (value: number | 'all') => void;
  setSelectedContactStatus: (value: ContactStatus | 'all') => void;
  setHasHighSchool: (value: boolean) => void;
  setSearchQuery: (value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;

  // Region/Commune options
  regions: { code: number; name: string }[];
  communes: { code: number; name: string }[];

  // Sorting
  sortField: SortField;
  sortDirection: SortDirection;
  handleSort: (field: SortField) => void;

  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  getPageNumbers: () => (number | string)[];

  // Data
  filteredSchools: School[];
  sortedSchools: School[];
  paginatedSchools: School[];
  stats: SchoolsStats;
  pipelineStats: PipelineStats;

  // Contact status tracking
  getContactStatus: (rbd: number) => ContactStatus;
  handleContactStatusChange: (rbd: number, status: ContactStatus) => void;

  // School detail panel
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
  getSchoolContactInfo: (rbd: number) => SchoolContactInfo;

  // Contact form
  contactForm: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  setContactFormField: (field: 'name' | 'email' | 'phone' | 'role', value: string) => void;
  handleAddContact: (rbd: number) => void;
  handleRemoveContact: (rbd: number, contactId: string) => void;

  // Notes
  newNote: string;
  setNewNote: (value: string) => void;
  handleAddNote: (rbd: number) => void;
  handleRemoveNote: (rbd: number, noteId: string) => void;
}

export function useSchoolsSales(): UseSchoolsSalesReturn {
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

  // Detail panel state
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schoolContactInfo, setSchoolContactInfo] = useState<Record<number, SchoolContactInfo>>({});

  // Form state for adding contacts
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRole, setNewContactRole] = useState('');
  const [newNote, setNewNote] = useState('');

  // Sorting
  const [sortField, setSortField] = useState<SortField>('highSchoolEnrollment');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Get unique regions for dropdowns
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

  // Get communes filtered by selected region
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
  const getContactStatus = useCallback(
    (rbd: number): ContactStatus => contactStatuses[rbd] || 1,
    [contactStatuses]
  );

  // Filter schools
  const filteredSchools = useMemo(() => {
    return schools.filter((s) => {
      if (selectedRegion !== 'all' && s.regionCode !== selectedRegion) return false;
      if (selectedCommune !== 'all' && s.communeCode !== selectedCommune) return false;
      if (selectedDependency !== 'all' && s.dependencyCode !== selectedDependency) return false;
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
    getContactStatus,
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
  }, [filteredSchools, sortField, sortDirection, getContactStatus]);

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

  // Pagination calculations
  const totalPages = Math.ceil(sortedSchools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSchools = sortedSchools.slice(startIndex, endIndex);

  // Page numbers for pagination UI
  const getPageNumbers = useCallback(() => {
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
  }, [totalPages, currentPage]);

  // Stats
  const stats: SchoolsStats = useMemo(
    () => ({
      total: schools.length,
      filtered: filteredSchools.length,
      withHighSchool: schools.filter((s) => s.highSchoolEnrollment > 0).length,
      functioning: schools.filter((s) => s.status === 1).length,
    }),
    [filteredSchools.length]
  );

  // Pipeline stats
  const pipelineStats: PipelineStats = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    Object.values(contactStatuses).forEach((status) => {
      counts[status]++;
    });
    counts[1] = schools.length - Object.keys(contactStatuses).length;
    const contacted = Object.keys(contactStatuses).length;
    return { counts, contacted };
  }, [contactStatuses]);

  // Handler to update contact status
  const handleContactStatusChange = useCallback((rbd: number, status: ContactStatus) => {
    setContactStatuses((prev) => {
      if (status === 1) {
        const { [rbd]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [rbd]: status };
    });
  }, []);

  // Get contact info for a school
  const getSchoolContactInfo = useCallback(
    (rbd: number): SchoolContactInfo => {
      return schoolContactInfo[rbd] || { contacts: [], notes: [] };
    },
    [schoolContactInfo]
  );

  // Contact form field setter
  const setContactFormField = useCallback(
    (field: 'name' | 'email' | 'phone' | 'role', value: string) => {
      switch (field) {
        case 'name':
          setNewContactName(value);
          break;
        case 'email':
          setNewContactEmail(value);
          break;
        case 'phone':
          setNewContactPhone(value);
          break;
        case 'role':
          setNewContactRole(value);
          break;
      }
    },
    []
  );

  // Add a new contact
  const handleAddContact = useCallback(
    (rbd: number) => {
      if (!newContactName.trim()) return;

      const newContact: SchoolContact = {
        id: crypto.randomUUID(),
        name: newContactName.trim(),
        email: newContactEmail.trim() || undefined,
        phone: newContactPhone.trim() || undefined,
        role: newContactRole.trim() || undefined,
      };

      setSchoolContactInfo((prev) => {
        const current = prev[rbd] || { contacts: [], notes: [] };
        return {
          ...prev,
          [rbd]: {
            ...current,
            contacts: [...current.contacts, newContact],
          },
        };
      });

      setNewContactName('');
      setNewContactEmail('');
      setNewContactPhone('');
      setNewContactRole('');
    },
    [newContactName, newContactEmail, newContactPhone, newContactRole]
  );

  // Remove a contact
  const handleRemoveContact = useCallback((rbd: number, contactId: string) => {
    setSchoolContactInfo((prev) => {
      const current = prev[rbd];
      if (!current) return prev;
      return {
        ...prev,
        [rbd]: {
          ...current,
          contacts: current.contacts.filter((c) => c.id !== contactId),
        },
      };
    });
  }, []);

  // Add a new note
  const handleAddNote = useCallback(
    (rbd: number) => {
      if (!newNote.trim()) return;

      const note: SchoolNote = {
        id: crypto.randomUUID(),
        text: newNote.trim(),
        createdAt: new Date().toISOString(),
      };

      setSchoolContactInfo((prev) => {
        const current = prev[rbd] || { contacts: [], notes: [] };
        return {
          ...prev,
          [rbd]: {
            ...current,
            notes: [note, ...current.notes],
          },
        };
      });

      setNewNote('');
    },
    [newNote]
  );

  // Remove a note
  const handleRemoveNote = useCallback((rbd: number, noteId: string) => {
    setSchoolContactInfo((prev) => {
      const current = prev[rbd];
      if (!current) return prev;
      return {
        ...prev,
        [rbd]: {
          ...current,
          notes: current.notes.filter((n) => n.id !== noteId),
        },
      };
    });
  }, []);

  // Handle sort
  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('desc');
      }
    },
    [sortField, sortDirection]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedRegion('all');
    setSelectedCommune('all');
    setSelectedDependency('all');
    setSelectedStatus('all');
    setSelectedContactStatus('all');
    setHasHighSchool(false);
    setSearchQuery('');
  }, []);

  // Check if any filters are active
  const hasActiveFilters =
    selectedRegion !== 'all' ||
    selectedCommune !== 'all' ||
    selectedDependency !== 'all' ||
    selectedStatus !== 'all' ||
    selectedContactStatus !== 'all' ||
    hasHighSchool ||
    searchQuery !== '';

  return {
    // Filters
    filters: {
      selectedRegion,
      selectedCommune,
      selectedDependency,
      selectedStatus,
      selectedContactStatus,
      hasHighSchool,
      searchQuery,
    },
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
    filteredSchools,
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
    contactForm: {
      name: newContactName,
      email: newContactEmail,
      phone: newContactPhone,
      role: newContactRole,
    },
    setContactFormField,
    handleAddContact,
    handleRemoveContact,

    // Notes
    newNote,
    setNewNote,
    handleAddNote,
    handleRemoveNote,
  };
}
