/**
 * Validation Middleware using Zod
 * Provides type-safe request validation with detailed error messages
 */

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { error, ErrorCodes } from '../types/result';

/**
 * Validation target - which part of the request to validate
 */
type ValidationTarget = 'body' | 'query' | 'params';

/**
 * Creates a validation middleware for the specified request part
 * @param schema - Zod schema to validate against
 * @param target - Which part of the request to validate (default: 'body')
 */
export const validate = (
  schema: ZodSchema,
  target: ValidationTarget = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate the specified part of the request
      const result = schema.safeParse(req[target]);

      if (!result.success) {
        // Format Zod errors into a readable structure
        const validationErrors = formatZodErrors(result.error);

        res.status(400).json(
          error(
            'Validation failed. Please check your input.',
            ErrorCodes.VALIDATION_ERROR,
            validationErrors
          )
        );
        return;
      }

      // Replace the request data with the validated and typed data
      req[target] = result.data;
      next();
    } catch (err) {
      // Unexpected error during validation
      console.error('[Validation Middleware] Unexpected error:', err);
      res.status(500).json(
        error(
          'An error occurred while validating your request',
          ErrorCodes.INTERNAL_ERROR
        )
      );
    }
  };
};

/**
 * Formats Zod validation errors into a readable structure
 */
function formatZodErrors(zodError: ZodError) {
  return zodError.issues.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));
}

/**
 * Validate request body
 */
export const validateBody = (schema: ZodSchema) => validate(schema, 'body');

/**
 * Validate query parameters
 */
export const validateQuery = (schema: ZodSchema) => validate(schema, 'query');

/**
 * Validate URL parameters
 */
export const validateParams = (schema: ZodSchema) => validate(schema, 'params');
