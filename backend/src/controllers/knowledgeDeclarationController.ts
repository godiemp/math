/**
 * ============================================================================
 * KNOWLEDGE DECLARATION CONTROLLER
 * ============================================================================
 *
 * HTTP handlers for user knowledge declaration endpoints
 * Allows users to mark what they know/don't know at unit, subsection, and skill levels
 */

import { Request, Response } from 'express';
import { pool } from '../config/database';
import { THEMATIC_UNITS } from '../config/thematic-units';
import {
  DeclarationType,
  KnowledgeDeclaration,
  KnowledgeDeclarationSummary,
  UpdateKnowledgeDeclarationRequest,
} from '../types';

/**
 * Get all knowledge declarations for the current user
 */
export async function getKnowledgeDeclarations(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const userId = req.user.userId;
    const level = req.query.level as 'M1' | 'M2' | undefined;

    // Build query with optional level filter
    let query = `
      SELECT id, user_id, level, declaration_type, item_code, knows, declared_at, updated_at
      FROM user_knowledge_declarations
      WHERE user_id = $1
    `;
    const params: any[] = [userId];

    if (level && (level === 'M1' || level === 'M2')) {
      query += ` AND level = $2`;
      params.push(level);
    }

    query += ` ORDER BY declaration_type, item_code`;

    const result = await pool.query(query, params);

    // Transform to camelCase
    const declarations: KnowledgeDeclaration[] = result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      level: row.level,
      declarationType: row.declaration_type,
      itemCode: row.item_code,
      knows: row.knows,
      declaredAt: parseInt(row.declared_at),
      updatedAt: parseInt(row.updated_at),
    }));

    // Calculate summary
    const summary = calculateSummary(declarations, level);

    res.json({
      declarations,
      summary,
    });
  } catch (error) {
    console.error('Get knowledge declarations error:', error);
    res.status(500).json({ error: 'Failed to get knowledge declarations' });
  }
}

/**
 * Update knowledge declarations for the current user
 * Supports cascading: when marking a unit as known, auto-marks subsections and skills
 */
export async function updateKnowledgeDeclarations(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const userId = req.user.userId;
    const { declarations } = req.body as { declarations: UpdateKnowledgeDeclarationRequest[] };

    if (!declarations || !Array.isArray(declarations) || declarations.length === 0) {
      res.status(400).json({ error: 'Declarations array is required' });
      return;
    }

    const now = Date.now();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Process each declaration
      for (const decl of declarations) {
        const { type, itemCode, knows, cascade } = decl;

        // Validate declaration type
        if (!['unit', 'subsection', 'skill'].includes(type)) {
          await client.query('ROLLBACK');
          res.status(400).json({ error: `Invalid declaration type: ${type}` });
          return;
        }

        // Determine level from item code
        const level = itemCode.startsWith('M2') ? 'M2' : 'M1';

        // Upsert the main declaration
        await upsertDeclaration(client, userId, level, type, itemCode, knows, now);

        // Handle cascading for units
        if (cascade && type === 'unit') {
          const unit = THEMATIC_UNITS.find((u) => u.code === itemCode);
          if (unit && unit.subsections) {
            for (const subsection of unit.subsections) {
              const subsectionCode = `${unit.code}:${subsection.code}`;
              await upsertDeclaration(client, userId, level, 'subsection', subsectionCode, knows, now);

              // Also cascade to skills
              for (const skill of subsection.primary_skills) {
                await upsertDeclaration(client, userId, level, 'skill', skill, knows, now);
              }
            }
          }
        }

        // Handle cascading for subsections
        if (cascade && type === 'subsection') {
          // Parse subsection code (format: "M1-NUM-001:A")
          const [unitCode, subsectionCode] = itemCode.split(':');
          const unit = THEMATIC_UNITS.find((u) => u.code === unitCode);
          if (unit && unit.subsections) {
            const subsection = unit.subsections.find((s) => s.code === subsectionCode);
            if (subsection) {
              for (const skill of subsection.primary_skills) {
                await upsertDeclaration(client, userId, level, 'skill', skill, knows, now);
              }
            }
          }
        }
      }

      await client.query('COMMIT');

      // Fetch updated declarations
      const updatedResult = await pool.query(
        `SELECT id, user_id, level, declaration_type, item_code, knows, declared_at, updated_at
         FROM user_knowledge_declarations
         WHERE user_id = $1
         ORDER BY declaration_type, item_code`,
        [userId]
      );

      const updatedDeclarations: KnowledgeDeclaration[] = updatedResult.rows.map((row) => ({
        id: row.id,
        userId: row.user_id,
        level: row.level,
        declarationType: row.declaration_type,
        itemCode: row.item_code,
        knows: row.knows,
        declaredAt: parseInt(row.declared_at),
        updatedAt: parseInt(row.updated_at),
      }));

      const summary = calculateSummary(updatedDeclarations);

      res.json({
        success: true,
        message: 'Knowledge declarations updated',
        declarations: updatedDeclarations,
        summary,
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Update knowledge declarations error:', error);
    res.status(500).json({ error: 'Failed to update knowledge declarations' });
  }
}

/**
 * Helper function to upsert a single declaration
 */
async function upsertDeclaration(
  client: any,
  userId: string,
  level: 'M1' | 'M2',
  type: DeclarationType,
  itemCode: string,
  knows: boolean,
  timestamp: number
): Promise<void> {
  await client.query(
    `INSERT INTO user_knowledge_declarations (user_id, level, declaration_type, item_code, knows, declared_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $6)
     ON CONFLICT (user_id, declaration_type, item_code)
     DO UPDATE SET knows = $5, updated_at = $6`,
    [userId, level, type, itemCode, knows, timestamp]
  );
}

/**
 * Calculate summary statistics from declarations
 */
function calculateSummary(
  declarations: KnowledgeDeclaration[],
  level?: 'M1' | 'M2'
): KnowledgeDeclarationSummary {
  // Filter by level if specified
  const filtered = level ? declarations.filter((d) => d.level === level) : declarations;

  // Get totals from thematic units
  const relevantUnits = level ? THEMATIC_UNITS.filter((u) => u.level === level) : THEMATIC_UNITS;

  const totalUnits = relevantUnits.length;
  const totalSubsections = relevantUnits.reduce(
    (sum, u) => sum + (u.subsections?.length || 0),
    0
  );

  // Collect all unique skills
  const allSkills = new Set<string>();
  for (const unit of relevantUnits) {
    for (const subsection of unit.subsections || []) {
      for (const skill of subsection.primary_skills) {
        allSkills.add(skill);
      }
    }
  }
  const totalSkills = allSkills.size;

  // Count known items
  const knownUnits = filtered.filter((d) => d.declarationType === 'unit' && d.knows).length;
  const knownSubsections = filtered.filter((d) => d.declarationType === 'subsection' && d.knows).length;
  const knownSkills = filtered.filter((d) => d.declarationType === 'skill' && d.knows).length;

  return {
    totalUnits,
    knownUnits,
    totalSubsections,
    knownSubsections,
    totalSkills,
    knownSkills,
  };
}
