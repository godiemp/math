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
  | 'status';

export type SortDirection = 'asc' | 'desc';
