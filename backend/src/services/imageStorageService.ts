import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface StoredImage {
  id: string;
  filename: string;
  path: string;
  url: string;
  mimeType: string;
  size: number;
}

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads/images');

/**
 * Initialize the image storage directory
 */
export function initImageStorage(): void {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    console.log(`📁 Created image storage directory: ${UPLOAD_DIR}`);
  }
}

/**
 * Save an image buffer to storage
 */
export async function saveImage(
  buffer: Buffer,
  mimeType: string = 'image/png',
  originalName?: string
): Promise<StoredImage> {
  // Generate unique ID
  const id = crypto.randomBytes(16).toString('hex');

  // Determine file extension
  const ext = mimeType.split('/')[1] || 'png';
  const filename = originalName
    ? `${id}_${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    : `${id}.${ext}`;

  const filepath = path.join(UPLOAD_DIR, filename);

  // Save file
  await fs.promises.writeFile(filepath, buffer);

  return {
    id,
    filename,
    path: filepath,
    url: `/api/images/${filename}`,
    mimeType,
    size: buffer.length,
  };
}

/**
 * Get image by filename
 */
export async function getImage(filename: string): Promise<Buffer | null> {
  const filepath = path.join(UPLOAD_DIR, filename);

  try {
    const buffer = await fs.promises.readFile(filepath);
    return buffer;
  } catch (error) {
    return null;
  }
}

/**
 * Delete image by filename
 */
export async function deleteImage(filename: string): Promise<boolean> {
  const filepath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.promises.unlink(filepath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get image MIME type from filename
 */
export function getImageMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };

  return mimeTypes[ext] || 'application/octet-stream';
}
