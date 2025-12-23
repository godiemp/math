import { pool } from '../config/database';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

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

export class DemoAccountService {
  /**
   * Generate a URL-safe username from school name
   * Examples: "Liceo San Ignacio" -> "demo-san-ignacio"
   *           "Colegio Santa María" -> "demo-santa-maria"
   */
  static generateUsername(schoolName: string): string {
    // Normalize: remove accents, lowercase
    const normalized = schoolName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    // Extract significant words (skip common prefixes)
    const skipWords = [
      'liceo',
      'colegio',
      'escuela',
      'instituto',
      'de',
      'la',
      'el',
      'los',
      'las',
      'del',
      'y',
      'san',
      'santa',
    ];
    const words = normalized
      .split(/\s+/)
      .filter((word) => !skipWords.includes(word) && word.length > 1)
      .slice(0, 3); // Max 3 words

    // If no words left after filtering, use first significant word from original
    if (words.length === 0) {
      const fallbackWords = normalized.split(/\s+/).filter((w) => w.length > 2);
      if (fallbackWords.length > 0) {
        words.push(fallbackWords[0]);
      } else {
        words.push('demo');
      }
    }

    // Create base username
    const base = 'demo-' + words.join('-').replace(/[^a-z0-9-]/g, '');

    return base.substring(0, 30); // Limit length
  }

  /**
   * Ensure username is unique by appending number if needed
   */
  static async ensureUniqueUsername(baseUsername: string): Promise<string> {
    let username = baseUsername;
    let counter = 1;

    while (true) {
      const existing = await pool.query('SELECT id FROM users WHERE username = $1', [username]);

      if (existing.rows.length === 0) {
        return username;
      }

      username = `${baseUsername}-${counter}`;
      counter++;

      if (counter > 100) {
        throw new Error('Unable to generate unique username');
      }
    }
  }

  /**
   * Generate a memorable but secure password
   * Format: Word-Word-Number (e.g., "Luna-Sol-42")
   */
  static generatePassword(): string {
    const words = [
      'Sol',
      'Luna',
      'Mar',
      'Rio',
      'Roca',
      'Nube',
      'Flor',
      'Arbol',
      'Cielo',
      'Tierra',
      'Viento',
      'Agua',
      'Fuego',
      'Luz',
      'Estrella',
      'Monte',
      'Valle',
      'Lago',
      'Isla',
      'Bosque',
      'Playa',
      'Campo',
    ];

    const word1 = words[Math.floor(Math.random() * words.length)];
    const word2 = words[Math.floor(Math.random() * words.length)];
    const number = Math.floor(Math.random() * 90) + 10; // 10-99

    return `${word1}-${word2}-${number}`;
  }

  /**
   * Create a demo account for a school
   */
  static async createDemoAccount(
    data: CreateDemoAccountRequest,
    createdByUserId: string
  ): Promise<CreateDemoAccountResponse> {
    const now = Date.now();
    const trialDays = data.trialDurationDays || 14;

    // Generate credentials
    const baseUsername = this.generateUsername(data.schoolName);
    const username = await this.ensureUniqueUsername(baseUsername);
    const password = this.generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate email (internal, non-functional)
    const email = `${username}@demo.simplepaes.cl`;

    // Generate display name
    const gradeLabel = data.gradeLevel.replace('-', '° ');
    const displayName =
      data.displayName || `Demo ${data.schoolName.substring(0, 50)} - ${gradeLabel}`;

    // Create user
    const userId = randomUUID();

    await pool.query(
      `INSERT INTO users (
        id, username, email, password_hash, display_name, role,
        grade_level, is_demo_account, demo_school_rbd, demo_school_name,
        demo_created_at, demo_created_by,
        email_verified, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        userId,
        username,
        email,
        passwordHash,
        displayName,
        'student',
        data.gradeLevel,
        true,
        data.schoolRbd,
        data.schoolName,
        now,
        createdByUserId,
        true, // Auto-verify demo accounts
        now,
        now,
      ]
    );

    // Create subscription with custom trial duration
    const subscription = await this.createCustomTrialSubscription(userId, trialDays);

    return {
      success: true,
      user: {
        id: userId,
        username,
        email,
        displayName,
        gradeLevel: data.gradeLevel,
      },
      credentials: {
        username,
        password, // Plain text for admin
      },
      subscription: {
        planId: subscription.planId,
        trialEndsAt: subscription.trialEndsAt,
        durationDays: trialDays,
      },
      school: {
        rbd: data.schoolRbd,
        name: data.schoolName,
      },
    };
  }

  /**
   * Create a custom trial subscription with specified duration
   */
  private static async createCustomTrialSubscription(
    userId: string,
    trialDays: number
  ): Promise<{ planId: string; trialEndsAt: number }> {
    const now = Date.now();
    const trialEndsAt = now + trialDays * 24 * 60 * 60 * 1000;

    // Use weekly plan as base
    const planId = 'weekly';

    await pool.query(
      `INSERT INTO subscriptions (
        user_id, plan_id, status, started_at, expires_at, trial_ends_at,
        auto_renew, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (user_id, plan_id)
      DO UPDATE SET
        status = EXCLUDED.status,
        started_at = EXCLUDED.started_at,
        expires_at = EXCLUDED.expires_at,
        trial_ends_at = EXCLUDED.trial_ends_at,
        updated_at = EXCLUDED.updated_at
      RETURNING *`,
      [
        userId,
        planId,
        'trial',
        now,
        trialEndsAt,
        trialEndsAt,
        false, // Demo accounts don't auto-renew
        now,
        now,
      ]
    );

    return {
      planId,
      trialEndsAt,
    };
  }

  /**
   * Get all demo accounts
   */
  static async getDemoAccounts(): Promise<DemoAccount[]> {
    const result = await pool.query(`
      SELECT
        u.id, u.username, u.email, u.display_name, u.grade_level,
        u.demo_school_rbd, u.demo_school_name, u.demo_created_at,
        u.demo_created_by, creator.display_name as created_by_name,
        s.status as sub_status, s.expires_at, s.trial_ends_at
      FROM users u
      LEFT JOIN users creator ON u.demo_created_by = creator.id
      LEFT JOIN subscriptions s ON u.id = s.user_id
      WHERE u.is_demo_account = TRUE
      ORDER BY u.demo_created_at DESC
    `);

    return result.rows.map((row) => ({
      id: row.id,
      username: row.username,
      email: row.email,
      displayName: row.display_name,
      gradeLevel: row.grade_level,
      schoolRbd: row.demo_school_rbd,
      schoolName: row.demo_school_name,
      createdAt: row.demo_created_at,
      createdBy: row.demo_created_by,
      createdByName: row.created_by_name || 'Unknown',
      subscription: row.sub_status
        ? {
            status: row.sub_status,
            expiresAt: row.expires_at,
            trialEndsAt: row.trial_ends_at,
          }
        : undefined,
    }));
  }

  /**
   * Delete a demo account
   */
  static async deleteDemoAccount(userId: string): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 AND is_demo_account = TRUE',
      [userId]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}
