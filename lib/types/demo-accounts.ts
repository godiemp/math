/**
 * Types for Demo Account Management (School Free Trials)
 */

export type GradeLevel = '1-medio' | '2-medio' | '3-medio' | '4-medio';

export interface CreateDemoAccountRequest {
  schoolRbd: number;
  schoolName: string;
  gradeLevel: GradeLevel;
  trialDurationDays?: number;
  displayName?: string;
}

export interface CreateDemoAccountResponse {
  success: boolean;
  user: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    gradeLevel: GradeLevel;
  };
  credentials: {
    username: string;
    password: string;
  };
  subscription: {
    planId: string;
    trialEndsAt: number;
    durationDays: number;
  };
  school: {
    rbd: number;
    name: string;
  };
}

export interface DemoAccount {
  id: string;
  username: string;
  email: string;
  displayName: string;
  gradeLevel: GradeLevel;
  schoolRbd: number;
  schoolName: string;
  createdAt: number;
  createdBy: string;
  createdByName: string;
  subscription?: {
    status: 'trial' | 'active' | 'expired' | 'cancelled';
    expiresAt: number;
    trialEndsAt: number;
  };
}

export interface GetDemoAccountsResponse {
  success: boolean;
  demoAccounts: DemoAccount[];
  total: number;
}

export const GRADE_LEVEL_LABELS: Record<GradeLevel, string> = {
  '1-medio': '1° Medio',
  '2-medio': '2° Medio',
  '3-medio': '3° Medio',
  '4-medio': '4° Medio',
};

export const GRADE_LEVELS: GradeLevel[] = ['1-medio', '2-medio', '3-medio', '4-medio'];
