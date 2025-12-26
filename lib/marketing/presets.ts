/**
 * Social media presets for marketing content capture
 * Defines dimensions, FPS, and other settings for each platform
 */

export interface CapturePreset {
  name: string;
  width: number;
  height: number;
  fps: number;
  maxDuration: number; // in seconds
  maxFileSizeMB: number;
  description: string;
}

export const CAPTURE_PRESETS: Record<string, CapturePreset> = {
  // Horizontal formats (16:9)
  twitter: {
    name: 'Twitter/X',
    width: 800,
    height: 450,
    fps: 15,
    maxDuration: 15,
    maxFileSizeMB: 15,
    description: 'Optimized for Twitter feed GIFs and videos',
  },
  linkedin: {
    name: 'LinkedIn',
    width: 1200,
    height: 627,
    fps: 12,
    maxDuration: 30,
    maxFileSizeMB: 8,
    description: 'Optimized for LinkedIn posts',
  },
  youtube: {
    name: 'YouTube',
    width: 1920,
    height: 1080,
    fps: 30,
    maxDuration: 60,
    maxFileSizeMB: 100,
    description: 'Full HD for YouTube Shorts or regular videos',
  },

  // Vertical formats (9:16)
  tiktok: {
    name: 'TikTok',
    width: 1080,
    height: 1920,
    fps: 30,
    maxDuration: 60,
    maxFileSizeMB: 72,
    description: 'Vertical format for TikTok',
  },
  reels: {
    name: 'Instagram Reels',
    width: 1080,
    height: 1920,
    fps: 30,
    maxDuration: 90,
    maxFileSizeMB: 100,
    description: 'Vertical format for Instagram Reels',
  },
  stories: {
    name: 'Stories',
    width: 1080,
    height: 1920,
    fps: 24,
    maxDuration: 15,
    maxFileSizeMB: 30,
    description: 'Instagram/Facebook Stories format',
  },

  // Square format (1:1)
  square: {
    name: 'Square',
    width: 1080,
    height: 1080,
    fps: 24,
    maxDuration: 60,
    maxFileSizeMB: 50,
    description: 'Square format for Instagram feed',
  },

  // High quality for website/ads
  hd: {
    name: 'HD Quality',
    width: 1920,
    height: 1080,
    fps: 30,
    maxDuration: 120,
    maxFileSizeMB: 200,
    description: 'High quality for website or ads',
  },
};

export type PresetKey = keyof typeof CAPTURE_PRESETS;

export type CaptureType = 'screenshot' | 'gif' | 'video';

export const DEFAULT_PRESET: PresetKey = 'twitter';
