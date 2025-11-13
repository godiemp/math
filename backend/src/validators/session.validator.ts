/**
 * Validation schemas for session endpoints
 */

import { z } from 'zod';

/**
 * Question schema for session questions
 */
const questionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  options: z.array(z.string()).min(2, 'At least 2 options required').max(5, 'Maximum 5 options allowed'),
  correctAnswer: z.number().int().min(0, 'Correct answer index must be non-negative'),
  explanation: z.string().optional(),
  skill: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
});

/**
 * Schema for creating a new session
 */
export const createSessionSchema = z.object({
  name: z.string()
    .min(3, 'Session name must be at least 3 characters')
    .max(100, 'Session name must be at most 100 characters'),

  description: z.string()
    .max(500, 'Description must be at most 500 characters')
    .optional(),

  level: z.enum(['m1', 'm2'], {
    message: 'Level must be either "m1" or "m2"',
  }),

  scheduledStartTime: z.number()
    .int('Scheduled start time must be an integer')
    .positive('Scheduled start time must be in the future')
    .refine(
      (time) => time > Date.now(),
      'Scheduled start time must be in the future'
    ),

  durationMinutes: z.number()
    .int('Duration must be an integer')
    .min(15, 'Session must be at least 15 minutes')
    .max(180, 'Session cannot exceed 180 minutes'),

  questions: z.array(questionSchema)
    .min(1, 'At least one question is required')
    .max(50, 'Maximum 50 questions allowed'),

  maxParticipants: z.number()
    .int('Max participants must be an integer')
    .positive('Max participants must be positive')
    .default(1000000),
});

/**
 * Schema for updating a session
 */
export const updateSessionSchema = z.object({
  name: z.string()
    .min(3, 'Session name must be at least 3 characters')
    .max(100, 'Session name must be at most 100 characters')
    .optional(),

  description: z.string()
    .max(500, 'Description must be at most 500 characters')
    .optional(),

  level: z.enum(['m1', 'm2']).optional(),

  scheduledStartTime: z.number()
    .int('Scheduled start time must be an integer')
    .positive('Scheduled start time must be positive')
    .optional(),

  durationMinutes: z.number()
    .int('Duration must be an integer')
    .min(15, 'Session must be at least 15 minutes')
    .max(180, 'Session cannot exceed 180 minutes')
    .optional(),

  questions: z.array(questionSchema)
    .min(1, 'At least one question is required')
    .max(50, 'Maximum 50 questions allowed')
    .optional(),

  maxParticipants: z.number()
    .int('Max participants must be an integer')
    .positive('Max participants must be positive')
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  'At least one field must be provided for update'
);

/**
 * Schema for submitting an answer
 */
export const submitAnswerSchema = z.object({
  questionIndex: z.number()
    .int('Question index must be an integer')
    .min(0, 'Question index must be non-negative'),

  answer: z.number()
    .int('Answer must be an integer')
    .min(0, 'Answer must be non-negative'),
});

/**
 * Schema for session ID parameter
 */
export const sessionIdParamSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
});

/**
 * Type inference from schemas
 */
export type CreateSessionDto = z.infer<typeof createSessionSchema>;
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;
export type SubmitAnswerDto = z.infer<typeof submitAnswerSchema>;
export type SessionIdParam = z.infer<typeof sessionIdParamSchema>;
