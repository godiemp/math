// Client-safe blog types and utilities
// This file can be imported in both client and server components

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published: boolean;
  content: string;
  readingTime: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published: boolean;
  readingTime: number;
}

export type AudienceType = 'todos' | 'estudiantes' | 'padres' | 'profesores' | 'directivos';

export function getAudienceFromTags(tags: string[]): Exclude<AudienceType, 'todos'> {
  if (tags.includes('directivos')) return 'directivos';
  if (tags.includes('padres')) return 'padres';
  if (tags.includes('profesores')) return 'profesores';
  return 'estudiantes';
}
