/**
 * ============================================================================
 * MARKETING CONTROLLER
 * ============================================================================
 *
 * Handles HTTP requests for marketing content generation:
 * - Capture screenshots, GIFs, and videos from app pages
 * - List captured files
 * - Serve captured files for download
 * - Delete captured files
 */

import { Request, Response } from 'express';
import {
  captureContent,
  listCapturedFiles,
  getCapturedFile,
  deleteCapturedFile,
  CaptureRequest,
} from '../services/marketingCaptureService';

/**
 * Capture marketing content from a URL
 * POST /api/admin/marketing/capture
 */
export const captureHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, type, preset, duration, waitForSelector, captureDelay } = req.body;

    // Validate required fields
    if (!url) {
      res.status(400).json({ error: 'url is required' });
      return;
    }

    if (!type || !['screenshot', 'gif', 'video'].includes(type)) {
      res.status(400).json({
        error: 'type must be one of: screenshot, gif, video',
      });
      return;
    }

    const request: CaptureRequest = {
      url,
      type,
      preset: preset || 'twitter',
      duration: duration || 5000,
      waitForSelector,
      captureDelay,
    };

    // Get auth cookies from the request to use for authenticated pages
    const authCookies = req.headers['x-auth-cookies'] as string | undefined;

    console.log(`📸 Starting ${type} capture for ${url}`);
    const result = await captureContent(request, authCookies);

    if (result.success) {
      res.json({
        success: true,
        filename: result.filename,
        url: result.url,
        size: result.size,
        mimeType: result.mimeType,
        duration: result.duration,
        frameCount: result.frameCount,
        logs: result.logs,
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        logs: result.logs,
      });
    }
  } catch (error: any) {
    console.error('Error capturing marketing content:', error);
    res.status(500).json({
      error: 'Failed to capture content',
      message: error.message,
    });
  }
};

/**
 * List all captured marketing files
 * GET /api/admin/marketing/files
 */
export const listFilesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = await listCapturedFiles();

    res.json({
      success: true,
      files,
      counts: {
        gifs: files.gifs.length,
        videos: files.videos.length,
        screenshots: files.screenshots.length,
        total: files.gifs.length + files.videos.length + files.screenshots.length,
      },
    });
  } catch (error: any) {
    console.error('Error listing marketing files:', error);
    res.status(500).json({
      error: 'Failed to list files',
      message: error.message,
    });
  }
};

/**
 * Serve a captured file for download
 * GET /api/admin/marketing/files/:filename
 */
export const serveFileHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename } = req.params;

    if (!filename) {
      res.status(400).json({ error: 'filename is required' });
      return;
    }

    const file = await getCapturedFile(filename);

    if (!file) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    // Determine if download or inline based on query param
    const download = req.query.download === 'true';

    res.setHeader('Content-Type', file.mimeType);
    res.setHeader(
      'Content-Disposition',
      download ? `attachment; filename="${filename}"` : 'inline'
    );
    res.setHeader('Content-Length', file.buffer.length);

    res.send(file.buffer);
  } catch (error: any) {
    console.error('Error serving marketing file:', error);
    res.status(500).json({
      error: 'Failed to serve file',
      message: error.message,
    });
  }
};

/**
 * Delete a captured file
 * DELETE /api/admin/marketing/files/:filename
 */
export const deleteFileHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename } = req.params;

    if (!filename) {
      res.status(400).json({ error: 'filename is required' });
      return;
    }

    const deleted = await deleteCapturedFile(filename);

    if (!deleted) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting marketing file:', error);
    res.status(500).json({
      error: 'Failed to delete file',
      message: error.message,
    });
  }
};

/**
 * Get available presets and scenes
 * GET /api/admin/marketing/config
 */
export const getConfigHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Return the available presets (defined in the service)
    const presets = {
      twitter: { name: 'Twitter/X', width: 800, height: 450, fps: 15 },
      linkedin: { name: 'LinkedIn', width: 1200, height: 627, fps: 12 },
      youtube: { name: 'YouTube', width: 1920, height: 1080, fps: 30 },
      tiktok: { name: 'TikTok', width: 1080, height: 1920, fps: 30 },
      reels: { name: 'Instagram Reels', width: 1080, height: 1920, fps: 30 },
      stories: { name: 'Stories', width: 1080, height: 1920, fps: 24 },
      square: { name: 'Square', width: 1080, height: 1080, fps: 24 },
      hd: { name: 'HD Quality', width: 1920, height: 1080, fps: 30 },
    };

    res.json({
      success: true,
      presets,
      captureTypes: ['screenshot', 'gif', 'video'],
    });
  } catch (error: any) {
    console.error('Error getting marketing config:', error);
    res.status(500).json({
      error: 'Failed to get config',
      message: error.message,
    });
  }
};
