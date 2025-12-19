export interface School {
  rbd: number;
  name: string;
  regionCode: number;
  regionName: string;
  communeCode: number;
  communeName: string;
  dependencyCode: number;
  status: number;
  isRural: boolean;
  totalEnrollment: number;
  highSchoolEnrollment: number;
}

export interface SchoolFilters {
  region: number | 'all';
  commune: number | 'all';
  dependency: number | 'all';
  status: number | 'all';
  hasHighSchool: boolean;
  search: string;
}

export type SortField =
  | 'rbd'
  | 'name'
  | 'regionName'
  | 'communeName'
  | 'dependencyCode'
  | 'highSchoolEnrollment'
  | 'totalEnrollment'
  | 'status'
  | 'contactStatus';

export type SortDirection = 'asc' | 'desc';

export type ContactStatus = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface SchoolContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
}

export interface SchoolNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface SchoolContactInfo {
  contacts: SchoolContact[];
  notes: SchoolNote[];
}
