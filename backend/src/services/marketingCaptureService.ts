import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

// Set Playwright browsers path BEFORE importing playwright
// This ensures browsers installed during Railway build are found at runtime
// Build command installs to: backend/playwright-browsers/
// At runtime, __dirname is: backend/dist/services/
// So ../../playwright-browsers resolves to: backend/playwright-browsers/
if (!process.env.PLAYWRIGHT_BROWSERS_PATH) {
  process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(__dirname, '../../playwright-browsers');
}

// Types for the capture service
export interface CaptureRequest {
  url: string;
  type: 'screenshot' | 'gif' | 'video';
  preset: string;
  duration?: number; // in milliseconds
  waitForSelector?: string;
  captureDelay?: number;
}

export interface CapturePreset {
  width: number;
  height: number;
  fps: number;
  maxDuration: number;
  maxFileSizeMB: number;
}

export interface CaptureResult {
  success: boolean;
  filename?: string;
  url?: string;
  size?: number;
  mimeType?: string;
  duration?: number;
  frameCount?: number;
  logs: string[];
  error?: string;
}

// Social media presets
const PRESETS: Record<string, CapturePreset> = {
  twitter: { width: 800, height: 450, fps: 15, maxDuration: 15, maxFileSizeMB: 15 },
  linkedin: { width: 1200, height: 627, fps: 12, maxDuration: 30, maxFileSizeMB: 8 },
  youtube: { width: 1920, height: 1080, fps: 30, maxDuration: 60, maxFileSizeMB: 100 },
  tiktok: { width: 1080, height: 1920, fps: 30, maxDuration: 60, maxFileSizeMB: 72 },
  reels: { width: 1080, height: 1920, fps: 30, maxDuration: 90, maxFileSizeMB: 100 },
  stories: { width: 1080, height: 1920, fps: 24, maxDuration: 15, maxFileSizeMB: 30 },
  square: { width: 1080, height: 1080, fps: 24, maxDuration: 60, maxFileSizeMB: 50 },
  hd: { width: 1920, height: 1080, fps: 30, maxDuration: 120, maxFileSizeMB: 200 },
};

// Output directories
const MARKETING_DIR = process.env.MARKETING_OUTPUT_DIR ||
  path.join(__dirname, '../../uploads/marketing');
const GIF_DIR = path.join(MARKETING_DIR, 'gifs');
const VIDEO_DIR = path.join(MARKETING_DIR, 'videos');
const SCREENSHOT_DIR = path.join(MARKETING_DIR, 'screenshots');

// Frontend URL for capture
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

/**
 * Initialize marketing capture directories
 */
export function initMarketingCapture(): void {
  [MARKETING_DIR, GIF_DIR, VIDEO_DIR, SCREENSHOT_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created marketing directory: ${dir}`);
    }
  });
}

/**
 * Main capture function
 */
export async function captureContent(
  request: CaptureRequest,
  authCookies?: string
): Promise<CaptureResult> {
  const logs: string[] = [];
  const log = (msg: string) => {
    logs.push(`[${new Date().toISOString()}] ${msg}`);
    console.log(`[MarketingCapture] ${msg}`);
  };

  try {
    const preset = PRESETS[request.preset] || PRESETS.twitter;
    log(`Starting ${request.type} capture for ${request.url}`);
    log(`Using preset: ${request.preset} (${preset.width}x${preset.height})`);

    // Dynamic import of Playwright
    log(`Playwright browsers path: ${process.env.PLAYWRIGHT_BROWSERS_PATH}`);
    const { chromium } = await import('playwright');

    // Launch browser
    log('Launching headless browser...');
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const context = await browser.newContext({
      viewport: { width: preset.width, height: preset.height },
      deviceScaleFactor: 1,
    });

    // Set auth cookies if provided
    if (authCookies) {
      log('Setting authentication cookies...');
      const cookies = JSON.parse(authCookies);
      await context.addCookies(cookies);
    }

    const page = await context.newPage();

    // Navigate to the page
    const fullUrl = request.url.startsWith('http')
      ? request.url
      : `${FRONTEND_URL}${request.url}`;
    log(`Navigating to ${fullUrl}...`);
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for specific selector if provided
    if (request.waitForSelector) {
      log(`Waiting for selector: ${request.waitForSelector}...`);
      await page.waitForSelector(request.waitForSelector, { timeout: 10000 });
    }

    // Additional capture delay
    if (request.captureDelay) {
      log(`Waiting ${request.captureDelay}ms for animations...`);
      await page.waitForTimeout(request.captureDelay);
    }

    let result: CaptureResult;

    switch (request.type) {
      case 'screenshot':
        result = await captureScreenshot(page, preset, log);
        break;
      case 'gif':
        result = await captureGif(page, preset, request.duration || 5000, log);
        break;
      case 'video':
        result = await captureVideo(page, preset, request.duration || 5000, log);
        break;
      default:
        throw new Error(`Unknown capture type: ${request.type}`);
    }

    await browser.close();
    log('Browser closed');

    return { ...result, logs };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMsg}`);

    // Provide helpful error message for missing Playwright browsers
    if (errorMsg.includes("Executable doesn't exist") || errorMsg.includes('browserType.launch')) {
      const browsersPath = process.env.PLAYWRIGHT_BROWSERS_PATH || '(default ~/.cache/ms-playwright)';
      return {
        success: false,
        error: `Playwright browsers not installed at: ${browsersPath}`,
        logs: [
          ...logs,
          `PLAYWRIGHT_BROWSERS_PATH: ${browsersPath}`,
          'Playwright browser binaries are missing.',
          'Ensure railway.json build command includes: PLAYWRIGHT_BROWSERS_PATH=./playwright-browsers npx playwright install --with-deps chromium',
        ],
      };
    }

    return {
      success: false,
      error: errorMsg,
      logs,
    };
  }
}

/**
 * Capture a single screenshot
 */
async function captureScreenshot(
  page: any,
  preset: CapturePreset,
  log: (msg: string) => void
): Promise<CaptureResult> {
  log('Capturing screenshot...');

  const screenshotBuffer = await page.screenshot({ type: 'png' });

  // Resize to exact preset dimensions
  const resizedBuffer = await sharp(screenshotBuffer)
    .resize(preset.width, preset.height, { fit: 'cover' })
    .png({ quality: 90 })
    .toBuffer();

  const filename = `screenshot_${Date.now()}_${preset.width}x${preset.height}.png`;
  const filepath = path.join(SCREENSHOT_DIR, filename);

  await fs.promises.writeFile(filepath, resizedBuffer);
  log(`Screenshot saved: ${filename} (${resizedBuffer.length} bytes)`);

  return {
    success: true,
    filename,
    url: `/api/admin/marketing/files/${filename}`,
    size: resizedBuffer.length,
    mimeType: 'image/png',
    logs: [],
  };
}

/**
 * Capture a GIF animation
 */
async function captureGif(
  page: any,
  preset: CapturePreset,
  duration: number,
  log: (msg: string) => void
): Promise<CaptureResult> {
  const { GIFEncoder, quantize, applyPalette } = await import('gifenc');

  const frameInterval = 1000 / preset.fps;
  const frameCount = Math.ceil(duration / frameInterval);
  log(`Capturing ${frameCount} frames at ${preset.fps} fps...`);

  const frames: Buffer[] = [];

  // Capture frames
  for (let i = 0; i < frameCount; i++) {
    const screenshotBuffer = await page.screenshot({ type: 'png' });

    // Resize frame
    const resizedBuffer = await sharp(screenshotBuffer)
      .resize(preset.width, preset.height, { fit: 'cover' })
      .raw()
      .toBuffer();

    frames.push(resizedBuffer);

    if ((i + 1) % 10 === 0 || i === frameCount - 1) {
      log(`Captured frame ${i + 1}/${frameCount}`);
    }

    await page.waitForTimeout(frameInterval);
  }

  // Encode GIF
  log('Encoding GIF...');
  const gif = GIFEncoder();

  for (let i = 0; i < frames.length; i++) {
    const frameData = new Uint8Array(frames[i]);

    // Quantize to 256 colors
    const palette = quantize(frameData, 256);
    const indexed = applyPalette(frameData, palette);

    gif.writeFrame(indexed, preset.width, preset.height, {
      palette,
      delay: Math.round(frameInterval),
    });
  }

  gif.finish();
  const gifBuffer = Buffer.from(gif.bytes());

  const filename = `gif_${Date.now()}_${preset.width}x${preset.height}.gif`;
  const filepath = path.join(GIF_DIR, filename);

  await fs.promises.writeFile(filepath, gifBuffer);
  log(`GIF saved: ${filename} (${(gifBuffer.length / 1024 / 1024).toFixed(2)} MB)`);

  return {
    success: true,
    filename,
    url: `/api/admin/marketing/files/${filename}`,
    size: gifBuffer.length,
    mimeType: 'image/gif',
    duration,
    frameCount: frames.length,
    logs: [],
  };
}

/**
 * Capture a video (MP4)
 */
async function captureVideo(
  page: any,
  preset: CapturePreset,
  duration: number,
  log: (msg: string) => void
): Promise<CaptureResult> {
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  const ffmpeg = require('fluent-ffmpeg');
  ffmpeg.setFfmpegPath(ffmpegPath);

  const tempDir = path.join(MARKETING_DIR, `temp_${Date.now()}`);
  fs.mkdirSync(tempDir, { recursive: true });

  const frameInterval = 1000 / preset.fps;
  const frameCount = Math.ceil(duration / frameInterval);
  log(`Capturing ${frameCount} frames at ${preset.fps} fps...`);

  // Capture frames
  for (let i = 0; i < frameCount; i++) {
    const screenshotBuffer = await page.screenshot({ type: 'png' });

    // Resize frame
    const resizedBuffer = await sharp(screenshotBuffer)
      .resize(preset.width, preset.height, { fit: 'cover' })
      .png()
      .toBuffer();

    const frameFilename = path.join(tempDir, `frame_${String(i).padStart(5, '0')}.png`);
    await fs.promises.writeFile(frameFilename, resizedBuffer);

    if ((i + 1) % 10 === 0 || i === frameCount - 1) {
      log(`Captured frame ${i + 1}/${frameCount}`);
    }

    await page.waitForTimeout(frameInterval);
  }

  // Encode video
  log('Encoding MP4 video...');
  const filename = `video_${Date.now()}_${preset.width}x${preset.height}.mp4`;
  const filepath = path.join(VIDEO_DIR, filename);

  await new Promise<void>((resolve, reject) => {
    ffmpeg()
      .input(path.join(tempDir, 'frame_%05d.png'))
      .inputFPS(preset.fps)
      .videoCodec('libx264')
      .outputOptions([
        '-pix_fmt yuv420p',
        '-crf 23',
        '-preset medium',
        '-movflags +faststart',
      ])
      .output(filepath)
      .on('end', () => resolve())
      .on('error', (err: Error) => reject(err))
      .run();
  });

  // Cleanup temp frames
  log('Cleaning up temporary files...');
  const tempFiles = await fs.promises.readdir(tempDir);
  for (const file of tempFiles) {
    await fs.promises.unlink(path.join(tempDir, file));
  }
  await fs.promises.rmdir(tempDir);

  const stats = await fs.promises.stat(filepath);
  log(`Video saved: ${filename} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

  return {
    success: true,
    filename,
    url: `/api/admin/marketing/files/${filename}`,
    size: stats.size,
    mimeType: 'video/mp4',
    duration,
    frameCount,
    logs: [],
  };
}

/**
 * List all captured files
 */
export async function listCapturedFiles(): Promise<{
  gifs: string[];
  videos: string[];
  screenshots: string[];
}> {
  const listDir = async (dir: string): Promise<string[]> => {
    try {
      return await fs.promises.readdir(dir);
    } catch {
      return [];
    }
  };

  return {
    gifs: await listDir(GIF_DIR),
    videos: await listDir(VIDEO_DIR),
    screenshots: await listDir(SCREENSHOT_DIR),
  };
}

/**
 * Get a captured file by filename
 */
export async function getCapturedFile(
  filename: string
): Promise<{ buffer: Buffer; mimeType: string } | null> {
  // Determine file type and directory
  let dir: string;
  let mimeType: string;

  if (filename.endsWith('.gif')) {
    dir = GIF_DIR;
    mimeType = 'image/gif';
  } else if (filename.endsWith('.mp4')) {
    dir = VIDEO_DIR;
    mimeType = 'video/mp4';
  } else if (filename.endsWith('.png')) {
    dir = SCREENSHOT_DIR;
    mimeType = 'image/png';
  } else {
    return null;
  }

  const filepath = path.join(dir, filename);

  try {
    const buffer = await fs.promises.readFile(filepath);
    return { buffer, mimeType };
  } catch {
    return null;
  }
}

/**
 * Delete a captured file
 */
export async function deleteCapturedFile(filename: string): Promise<boolean> {
  let dir: string;

  if (filename.endsWith('.gif')) {
    dir = GIF_DIR;
  } else if (filename.endsWith('.mp4')) {
    dir = VIDEO_DIR;
  } else if (filename.endsWith('.png')) {
    dir = SCREENSHOT_DIR;
  } else {
    return false;
  }

  const filepath = path.join(dir, filename);

  try {
    await fs.promises.unlink(filepath);
    return true;
  } catch {
    return false;
  }
}

// Initialize directories on module load
initMarketingCapture();
