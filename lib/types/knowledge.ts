/**
 * ============================================================================
 * KNOWLEDGE DECLARATION TYPES
 * ============================================================================
 *
 * Types for user self-declared knowledge at unit, subsection, and skill levels
 */

import type { Level } from './core';

export type DeclarationType = 'unit' | 'subsection' | 'skill';

export interface KnowledgeDeclaration {
  id?: number;
  userId: string;
  level: Level;
  declarationType: DeclarationType;
  itemCode: string;
  knows: boolean;
  declaredAt: number;
  updatedAt: number;
}

export interface KnowledgeDeclarationSummary {
  totalUnits: number;
  knownUnits: number;
  totalSubsections: number;
  knownSubsections: number;
  totalSkills: number;
  knownSkills: number;
}

export interface GetKnowledgeDeclarationsResponse {
  declarations: KnowledgeDeclaration[];
  summary: KnowledgeDeclarationSummary;
}

export interface UpdateKnowledgeDeclarationRequest {
  type: DeclarationType;
  itemCode: string;
  knows: boolean;
  cascade?: boolean;
}

export interface UpdateKnowledgeDeclarationsRequest {
  declarations: UpdateKnowledgeDeclarationRequest[];
}

export interface UpdateKnowledgeDeclarationsResponse {
  success: boolean;
  message: string;
  declarations: KnowledgeDeclaration[];
  summary: KnowledgeDeclarationSummary;
}
