# Implementation Gaps & Standardization Opportunities

This document identifies missing patterns, inconsistencies, and opportunities for improvement in the codebase.

## Critical Gaps

### 1. No Centralized Error Handling Middleware

**Current State:** Every controller handles errors individually with try-catch blocks.

**Problem:**
- Repeated error handling code
- Inconsistent error responses
- Difficult to add global error handling features (e.g., error tracking)

**Opportunity:**
```typescript
// backend/src/middleware/errorHandler.ts (CREATE THIS)
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message
    });
  }

  // Log unexpected errors
  console.error('[ErrorHandler] Unexpected error:', {
    error: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });

  return res.status(500).json({
    success: false,
    error: 'An unexpected error occurred'
  });
};

// Usage in controllers:
export const myController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Instead of try-catch, use:
  const userId = req.user?.userId;
  if (!userId) {
    throw new AppError(401, 'Authentication required');
  }

  const { field } = req.body;
  if (!field) {
    throw new AppError(400, 'Missing required field: field');
  }

  const result = await service(field, userId);
  res.json({ success: true, data: result });
  // Errors bubble up to error handler middleware
};
```

**Benefits:**
- Consistent error handling across all endpoints
- Easy to add error tracking (Sentry, LogRocket, etc.)
- Cleaner controller code
- Single place to modify error format

---

### 2. No Request Validation Middleware/Library

**Current State:** Manual validation in every controller with different styles.

**Problem:**
- Repeated validation code
- Easy to forget validations
- Inconsistent error messages
- No type safety between request and handler

**Opportunity - Option A: Zod + Express Middleware**

```typescript
// backend/src/middleware/validate.ts (CREATE THIS)
import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }
      next(error);
    }
  };
};

// backend/src/schemas/quiz.schema.ts (CREATE THIS)
import { z } from 'zod';

export const saveQuizAttemptSchema = z.object({
  body: z.object({
    questionId: z.string(),
    level: z.enum(['M1', 'M2']),
    topic: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    userAnswer: z.number().min(0).max(3),
    correctAnswer: z.number().min(0).max(3),
    isCorrect: z.boolean(),
    skills: z.array(z.string())
  })
});

// Usage in routes:
import { validate } from '../middleware/validate';
import { saveQuizAttemptSchema } from '../schemas/quiz.schema';

router.post(
  '/attempts',
  authenticate,
  validate(saveQuizAttemptSchema),
  saveQuizAttempt
);
```

**Opportunity - Option B: Express Validator**

```typescript
// Lighter alternative if you don't want Zod
import { body, validationResult } from 'express-validator';

export const saveQuizAttemptValidation = [
  body('questionId').isString().notEmpty(),
  body('level').isIn(['M1', 'M2']),
  body('difficulty').isIn(['easy', 'medium', 'hard']),
  body('userAnswer').isInt({ min: 0, max: 3 }),
  // ... more validations
];

// Middleware to check results
export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Usage:
router.post(
  '/attempts',
  authenticate,
  saveQuizAttemptValidation,
  checkValidation,
  saveQuizAttempt
);
```

**Benefits:**
- Type-safe validation
- Reusable schemas
- Consistent error messages
- Self-documenting API
- Reduced controller code

---

### 3. No Centralized Type Definitions

**Current State:** Types scattered across files, `any` used frequently, interfaces duplicated.

**Problem:**
- Type definitions duplicated in multiple files
- Inconsistent naming
- Hard to maintain
- No single source of truth

**Opportunity:**

```typescript
// backend/src/types/database.types.ts (CREATE THIS)
export interface UserRow {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: 'student' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface SessionRow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  created_at: Date;
  updated_at: Date;
}

// ... all database row types

// backend/src/types/api.types.ts (CREATE THIS)
export interface ApiResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// backend/src/types/auth.types.ts (ENHANCE EXISTING)
import { Request } from 'express';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

// Type guards
export function isApiError(response: ApiResult<any>): response is ApiError {
  return response.success === false;
}
```

**Usage:**
```typescript
import { SessionRow } from '../types/database.types';
import { ApiResponse } from '../types/api.types';

const result = await pool.query<SessionRow>(query, params);
const session: SessionRow = result.rows[0];

const response: ApiResponse<SessionRow> = {
  success: true,
  data: session
};
```

---

### 4. No Query Builder for Dynamic Queries

**Current State:** Manual query building with paramCount tracking.

**Problem:**
- Verbose and error-prone
- Easy to make SQL injection mistakes
- Hard to read complex queries

**Opportunity:**

```typescript
// backend/src/utils/queryBuilder.ts (CREATE THIS)
interface QueryCondition {
  field: string;
  operator: '=' | '!=' | 'LIKE' | 'ILIKE' | 'IN' | '>' | '<' | '>=' | '<=';
  value: any;
}

export class QueryBuilder {
  private conditions: QueryCondition[] = [];
  private params: any[] = [];
  private paramCount = 1;
  private baseQuery: string;

  constructor(baseQuery: string) {
    this.baseQuery = baseQuery;
  }

  where(field: string, operator: QueryCondition['operator'], value: any): this {
    if (value !== undefined && value !== null) {
      this.conditions.push({ field, operator, value });
    }
    return this;
  }

  whereLike(field: string, value: string): this {
    if (value) {
      this.conditions.push({
        field,
        operator: 'ILIKE',
        value: `%${value}%`
      });
    }
    return this;
  }

  whereIn(field: string, values: any[]): this {
    if (values && values.length > 0) {
      this.conditions.push({ field, operator: 'IN', value: values });
    }
    return this;
  }

  build(): { query: string; params: any[] } {
    let query = this.baseQuery;

    if (this.conditions.length > 0) {
      const whereClauses = this.conditions.map(condition => {
        if (condition.operator === 'IN') {
          const placeholders = condition.value
            .map(() => `$${this.paramCount++}`)
            .join(', ');
          this.params.push(...condition.value);
          return `${condition.field} IN (${placeholders})`;
        } else {
          const placeholder = `$${this.paramCount++}`;
          this.params.push(condition.value);
          return `${condition.field} ${condition.operator} ${placeholder}`;
        }
      });

      query += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    return { query, params: this.params };
  }
}

// Usage:
const builder = new QueryBuilder('SELECT * FROM sessions')
  .where('user_id', '=', userId)
  .where('status', '=', status)
  .whereLike('name', searchTerm)
  .whereIn('level', ['M1', 'M2']);

const { query, params } = builder.build();
const result = await pool.query(query, params);
```

**Benefits:**
- Safer query construction
- More readable code
- Reusable logic
- Harder to make mistakes

---

### 5. No Structured Logging Library

**Current State:** console.log/console.error with inconsistent formats.

**Problem:**
- No log levels (debug, info, warn, error)
- No structured data
- Can't filter logs easily
- No integration with monitoring tools

**Opportunity:**

```typescript
// backend/src/utils/logger.ts (CREATE THIS)
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      )
    }),
    // Add file transports for production
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

export default logger;

// Usage:
import logger from '../utils/logger';

logger.info('User logged in', { userId, email });
logger.error('Database query failed', { error: error.message, query, userId });
logger.debug('Processing request', { body: req.body });
```

**Alternative - Simple Wrapper (if you don't want Winston):**

```typescript
// backend/src/utils/logger.ts
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

const currentLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

class Logger {
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL[level] >= LOG_LEVEL[currentLevel];
  }

  private formatMessage(level: LogLevel, message: string, meta?: object): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
  }

  debug(message: string, meta?: object): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }

  info(message: string, meta?: object): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', message, meta));
    }
  }

  warn(message: string, meta?: object): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, meta));
    }
  }

  error(message: string, meta?: object): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, meta));
    }
  }
}

export default new Logger();
```

---

### 6. No Rate Limiting

**Current State:** No rate limiting on any endpoints.

**Problem:**
- Vulnerable to brute force attacks
- No protection against DoS
- Resource abuse possible

**Opportunity:**

```typescript
// backend/src/middleware/rateLimiter.ts (CREATE THIS)
import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true,
  message: {
    success: false,
    error: 'Too many login attempts, please try again later'
  }
});

// Usage in index.ts:
import { apiLimiter, authLimiter } from './middleware/rateLimiter';

app.use('/api/', apiLimiter);
app.use('/api/auth', authLimiter);
```

---

### 7. No API Documentation

**Current State:** No OpenAPI/Swagger documentation.

**Problem:**
- Frontend developers need to read code to understand API
- No single source of truth for API contracts
- Hard to onboard new developers

**Opportunity:**

```typescript
// Option A: Swagger/OpenAPI
// Install: npm install swagger-jsdoc swagger-ui-express

// backend/src/config/swagger.ts (CREATE THIS)
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Math API',
      version: '1.0.0',
      description: 'API documentation for Math application'
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3001',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'] // Path to API routes
};

export const swaggerSpec = swaggerJsdoc(options);

// In index.ts:
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// In route files, add JSDoc comments:
/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Get session by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Session'
 */
router.get('/:id', authenticate, getSessionById);
```

---

### 8. Missing Frontend Error Boundary

**Current State:** Errors can crash the entire React app.

**Problem:**
- Unhandled errors crash the app
- Poor user experience
- No error reporting

**Opportunity:**

```typescript
// app/components/ErrorBoundary.tsx (CREATE THIS)
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    toast.error('Something went wrong. Please refresh the page.');

    // Send to error tracking service
    // Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in layout:
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## Summary of Opportunities

### High Impact, Low Effort:
1. Centralized type definitions
2. Rate limiting
3. Simple logger wrapper

### High Impact, Medium Effort:
4. Error handling middleware
5. Request validation with Zod
6. Query builder utility

### High Impact, High Effort:
7. API documentation (Swagger)
8. Structured logging with Winston
9. Frontend error boundary + monitoring

### Priority Implementation Order:
1. Centralized types (foundation for everything)
2. Error handling middleware (improves consistency)
3. Request validation (improves security & consistency)
4. Rate limiting (improves security)
5. Logging improvements (improves debugging)
6. Query builder (improves maintainability)
7. API documentation (improves developer experience)

Would you like implementation examples or migration guides for any of these?
