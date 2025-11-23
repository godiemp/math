/**
 * Curriculum Progress API Client Functions
 *
 * Functions for interacting with curriculum topic progress (skill tree) endpoints
 */

import { api } from '../api-client';

/**
 * Topic progress interface
 */
export interface TopicProgress {
  topicSlug: string;
  subject: string;
  level: string;
  isCompleted: boolean;
  completedAt: number | null;
  notes: string | null;
  createdAt: number;
  updatedAt: number;
}

/**
 * Subsection interface
 */
export interface Subsection {
  slug: string;
  name: string;
}

/**
 * Topic info interface
 */
export interface TopicInfo {
  slug: string;
  name: string;
  questionCount: number;
  difficulty: 1 | 2 | 3;
  subsections?: Subsection[];
}

/**
 * Subject interface
 */
export interface Subject {
  id: string;
  name: string;
  topics: TopicInfo[];
}

/**
 * Curriculum structure interface
 */
export interface CurriculumStructure {
  level: string;
  name: string;
  subjects: Subject[];
}

/**
 * Response types
 */
interface GetStructureResponse {
  success: boolean;
  structure: CurriculumStructure;
}

interface GetProgressResponse {
  success: boolean;
  progress: TopicProgress[];
}

interface UpdateTopicProgressResponse {
  success: boolean;
  progress: TopicProgress;
}

/**
 * Get curriculum structure (M1)
 */
export async function getCurriculumStructure() {
  return api.get<GetStructureResponse>('/api/curriculum-progress/structure');
}

/**
 * Get current user's curriculum progress
 */
export async function getMyProgress() {
  return api.get<GetProgressResponse>('/api/curriculum-progress');
}

/**
 * Update current user's topic completion status
 */
export async function updateTopicCompletion(
  topicSlug: string,
  subject: string,
  isCompleted: boolean,
  notes?: string
) {
  return api.post<UpdateTopicProgressResponse>('/api/curriculum-progress/topics', {
    topicSlug,
    subject,
    isCompleted,
    notes
  });
}
