import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Re-export client-safe types and utilities
export type { BlogPost, BlogPostMeta, AudienceType } from './blog-types';
export { getAudienceFromTags } from './blog-types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getAllPosts(includeUnpublished = false): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || 'Sin título',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'SimplePAES',
      tags: data.tags || [],
      image: data.image || undefined,
      published: data.published !== false, // Default to true if not specified
      readingTime: calculateReadingTime(content),
    };
  });

  // Filter unpublished posts unless explicitly requested
  const filteredPosts = includeUnpublished
    ? posts
    : posts.filter(post => post.published);

  // Sort by date, newest first
  return filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || 'Sin título',
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    author: data.author || 'SimplePAES',
    tags: data.tags || [],
    image: data.image || undefined,
    published: data.published !== false,
    content,
    readingTime: calculateReadingTime(content),
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  // Only return slugs for published posts
  return getAllPosts().map(post => post.slug);
}

export function getRelatedPosts(currentSlug: string, currentTags: string[], limit = 3): BlogPostMeta[] {
  const allPosts = getAllPosts();

  // Filter out current post and score by tag overlap
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const commonTags = post.tags.filter(tag => currentTags.includes(tag));
      return { post, score: commonTags.length };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map(item => item.post);
}

export function extractHeadings(content: string): { level: number; text: string; id: string }[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ level, text, id });
  }

  return headings;
}
