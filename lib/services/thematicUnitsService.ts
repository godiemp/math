/**
 * Service for Thematic Units API
 */

import { api } from '../api-client';
import type { Level, Subject } from '../types';

export interface UnitSubsection {
  code: string;
  name: string;
  description?: string;
  primary_skills: string[];
}

export interface ThematicUnit {
  code: string;
  name: string;
  level: Level;
  subject: Subject;
  description?: string;
  subsections?: UnitSubsection[];
}

export interface ThematicUnitsResponse {
  success: boolean;
  count: number;
  units: ThematicUnit[];
}

export interface GroupedUnitsResponse {
  success: boolean;
  level: Level;
  grouped: {
    números: ThematicUnit[];
    álgebra: ThematicUnit[];
    geometría: ThematicUnit[];
    probabilidad: ThematicUnit[];
  };
  totalUnits: number;
}

export interface UnitByCodeResponse {
  success: boolean;
  unit: ThematicUnit;
}

export interface UnitsStatsResponse {
  success: boolean;
  stats: {
    total: number;
    m1: number;
    m2: number;
    bySubject: {
      números: number;
      álgebra: number;
      geometría: number;
      probabilidad: number;
    };
  };
}

/**
 * Get all thematic units with optional filters
 */
export async function getThematicUnits(params?: {
  level?: Level;
  subject?: Subject;
}): Promise<ThematicUnitsResponse | null> {
  const queryParams = new URLSearchParams();
  if (params?.level) queryParams.append('level', params.level);
  if (params?.subject) queryParams.append('subject', params.subject);

  const endpoint = `/api/thematic-units${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await api.get<ThematicUnitsResponse>(endpoint);

  if (response.error) {
    console.error('Error fetching thematic units:', response.error);
    return null;
  }

  return response.data || null;
}

/**
 * Get thematic units grouped by subject for a specific level
 */
export async function getGroupedUnits(level: Level): Promise<GroupedUnitsResponse | null> {
  const response = await api.get<GroupedUnitsResponse>(`/api/thematic-units/grouped?level=${level}`);

  if (response.error) {
    console.error('Error fetching grouped units:', response.error);
    return null;
  }

  return response.data || null;
}

/**
 * Get a single thematic unit by code
 */
export async function getUnitByCode(code: string): Promise<ThematicUnit | null> {
  const response = await api.get<UnitByCodeResponse>(`/api/thematic-units/${code}`);

  if (response.error) {
    console.error('Error fetching unit:', response.error);
    return null;
  }

  return response.data?.unit || null;
}

/**
 * Get statistics about thematic units
 */
export async function getUnitsStats(): Promise<UnitsStatsResponse['stats'] | null> {
  const response = await api.get<UnitsStatsResponse>('/api/thematic-units/stats');

  if (response.error) {
    console.error('Error fetching units stats:', response.error);
    return null;
  }

  return response.data?.stats || null;
}
