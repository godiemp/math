-- ============================================================================
-- Migration: Add Weekly Plan for Payment MVP
-- ============================================================================
--
-- This migration adds the weekly plan ($2.900 CLP) with 7-day trial
-- for the payment MVP implementation.
--
-- The plan allows users to subscribe for a week at a lower price point,
-- with an automatic 7-day free trial included.

-- Insert weekly plan (idempotent - won't fail if already exists)
INSERT INTO plans (
  id,
  name,
  description,
  price,
  currency,
  duration_days,
  trial_duration_days,
  features,
  is_active,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'weekly',
  'Plan Semanal',
  'Suscripción semanal con acceso completo + 7 días gratis',
  2900.00,
  'CLP',
  7,
  7,
  '["7 días gratis de prueba","Acceso completo a todas las preguntas","Sesiones de práctica en vivo","Tutor AI con método socrático","Analytics detallado de progreso","Generación de preguntas personalizadas","Sin límite de intentos","Cancela cuando quieras","Ideal para prueba rápida"]'::jsonb,
  true,
  0,
  EXTRACT(EPOCH FROM NOW()) * 1000,
  EXTRACT(EPOCH FROM NOW()) * 1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  currency = EXCLUDED.currency,
  duration_days = EXCLUDED.duration_days,
  trial_duration_days = EXCLUDED.trial_duration_days,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active,
  display_order = EXCLUDED.display_order,
  updated_at = EXTRACT(EPOCH FROM NOW()) * 1000;

-- Update display order of other plans to make room for weekly plan
UPDATE plans SET display_order = 1, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
WHERE id = 'student' AND display_order != 1;

UPDATE plans SET display_order = 3, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
WHERE id = 'free' AND display_order != 3;

UPDATE plans SET display_order = 4, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
WHERE id = 'trial' AND display_order != 4;

UPDATE plans SET display_order = 5, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
WHERE id = 'basic' AND display_order != 5;

UPDATE plans SET display_order = 6, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
WHERE id = 'premium' AND display_order != 6;
