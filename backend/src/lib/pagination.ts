/**
 * Pagination Utilities
 *
 * Standardized pagination helpers for consistent API responses.
 * Implements offset-based pagination with metadata.
 *
 * @see .claude/skills/code-patterns/SKILL.md - Performance Patterns
 */

/**
 * Pagination parameters from request
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Normalized pagination parameters with defaults
 */
export interface NormalizedPaginationParams {
  page: number;
  limit: number;
  offset: number;
}

/**
 * Pagination metadata in response
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Default pagination settings
 */
export const PAGINATION_DEFAULTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1
} as const;

/**
 * Normalizes pagination parameters with validation and defaults
 *
 * @param params - Raw pagination parameters from request
 * @returns Normalized parameters with offset calculated
 *
 * @example
 * ```typescript
 * const { page, limit, offset } = normalizePagination(req.query);
 * const query = `SELECT * FROM users LIMIT $1 OFFSET $2`;
 * const result = await pool.query(query, [limit, offset]);
 * ```
 */
export function normalizePagination(params: PaginationParams): NormalizedPaginationParams {
  // Parse and validate page
  let page = parseInt(String(params.page || PAGINATION_DEFAULTS.DEFAULT_PAGE), 10);
  if (isNaN(page) || page < 1) {
    page = PAGINATION_DEFAULTS.DEFAULT_PAGE;
  }

  // Parse and validate limit
  let limit = parseInt(String(params.limit || PAGINATION_DEFAULTS.DEFAULT_LIMIT), 10);
  if (isNaN(limit) || limit < PAGINATION_DEFAULTS.MIN_LIMIT) {
    limit = PAGINATION_DEFAULTS.DEFAULT_LIMIT;
  }
  if (limit > PAGINATION_DEFAULTS.MAX_LIMIT) {
    limit = PAGINATION_DEFAULTS.MAX_LIMIT;
  }

  // Calculate offset
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

/**
 * Creates pagination metadata from query results
 *
 * @param total - Total number of items (from COUNT query)
 * @param page - Current page number
 * @param limit - Items per page
 * @returns Pagination metadata
 */
export function createPaginationMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
}

/**
 * Creates a complete paginated response
 *
 * @param items - Array of items for current page
 * @param total - Total number of items across all pages
 * @param params - Normalized pagination parameters
 * @returns Paginated response with metadata
 *
 * @example
 * ```typescript
 * const { page, limit, offset } = normalizePagination(req.query);
 *
 * // Get total count
 * const countResult = await pool.query('SELECT COUNT(*) FROM users WHERE active = true');
 * const total = parseInt(countResult.rows[0].count);
 *
 * // Get paginated data
 * const dataResult = await pool.query(
 *   'SELECT * FROM users WHERE active = true ORDER BY created_at DESC LIMIT $1 OFFSET $2',
 *   [limit, offset]
 * );
 *
 * const response = paginate(dataResult.rows, total, { page, limit, offset });
 * return res.json(success(response));
 * ```
 */
export function paginate<T>(
  items: T[],
  total: number,
  params: NormalizedPaginationParams
): PaginatedResponse<T> {
  return {
    data: items,
    pagination: createPaginationMeta(total, params.page, params.limit)
  };
}

/**
 * Extracts pagination parameters from Express request query
 *
 * @param query - Express request query object
 * @returns Pagination parameters
 *
 * @example
 * ```typescript
 * const paginationParams = getPaginationFromQuery(req.query);
 * const { page, limit, offset } = normalizePagination(paginationParams);
 * ```
 */
export function getPaginationFromQuery(query: any): PaginationParams {
  return {
    page: query.page ? parseInt(String(query.page), 10) : undefined,
    limit: query.limit ? parseInt(String(query.limit), 10) : undefined
  };
}

/**
 * SQL helper to build LIMIT and OFFSET clause
 *
 * @param params - Normalized pagination parameters
 * @returns SQL clause string
 *
 * @example
 * ```typescript
 * const { page, limit, offset } = normalizePagination(req.query);
 * const query = `SELECT * FROM users WHERE active = true ${getLimitOffsetClause({ page, limit, offset })}`;
 * ```
 */
export function getLimitOffsetClause(params: NormalizedPaginationParams): string {
  return `LIMIT ${params.limit} OFFSET ${params.offset}`;
}

/**
 * Helper to build parameterized LIMIT/OFFSET for PostgreSQL queries
 *
 * @param paramStartIndex - The starting parameter index (e.g., if you already have $1, $2, pass 3)
 * @returns Object with clause string and parameters array
 *
 * @example
 * ```typescript
 * const { page, limit, offset } = normalizePagination(req.query);
 * const baseParams = [userId, status]; // $1, $2
 * const { clause, params: paginationParams } = getParameterizedLimitOffset({ page, limit, offset }, 3);
 *
 * const query = `SELECT * FROM sessions WHERE user_id = $1 AND status = $2 ${clause}`;
 * const allParams = [...baseParams, ...paginationParams];
 * const result = await pool.query(query, allParams);
 * ```
 */
export function getParameterizedLimitOffset(
  params: NormalizedPaginationParams,
  paramStartIndex: number = 1
): { clause: string; params: number[] } {
  return {
    clause: `LIMIT $${paramStartIndex} OFFSET $${paramStartIndex + 1}`,
    params: [params.limit, params.offset]
  };
}

/**
 * Validates if pagination parameters are within acceptable ranges
 *
 * @param params - Pagination parameters to validate
 * @returns Validation result with error message if invalid
 */
export function validatePagination(params: PaginationParams): {
  valid: boolean;
  error?: string;
} {
  if (params.page !== undefined) {
    const page = parseInt(String(params.page), 10);
    if (isNaN(page) || page < 1) {
      return { valid: false, error: 'Page must be a positive integer' };
    }
  }

  if (params.limit !== undefined) {
    const limit = parseInt(String(params.limit), 10);
    if (isNaN(limit)) {
      return { valid: false, error: 'Limit must be a number' };
    }
    if (limit < PAGINATION_DEFAULTS.MIN_LIMIT) {
      return { valid: false, error: `Limit must be at least ${PAGINATION_DEFAULTS.MIN_LIMIT}` };
    }
    if (limit > PAGINATION_DEFAULTS.MAX_LIMIT) {
      return { valid: false, error: `Limit cannot exceed ${PAGINATION_DEFAULTS.MAX_LIMIT}` };
    }
  }

  return { valid: true };
}
