import { pool } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Retry helper for database connection with exponential backoff
 */
async function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 5, initialDelayMs = 2000): Promise<T> {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxRetries) {
        throw error;
      }
      const delayMs = initialDelayMs * Math.pow(2, attempt - 1);
      console.log(`⏳ Connection attempt ${attempt} failed, retrying in ${delayMs / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  throw lastError;
}

/**
 * Seed initial subscription plans
 *
 * Plan types:
 * - Weekly: Weekly subscription at 2.900 CLP with 7 days trial (MVP)
 * - Free: Basic access, limited features
 * - Trial: 7 days trial of premium features (inactive)
 * - Student: Monthly subscription at 8.000 CLP
 * - Basic: Monthly subscription at 8.000 CLP (inactive - replaced by student)
 * - Premium: Future premium plan (not active yet)
 */

const plans = [
  {
    id: 'weekly',
    name: 'Plan Semanal',
    description: 'Suscripción semanal con acceso completo + 7 días gratis',
    price: 2900,
    currency: 'CLP',
    duration_days: 7,
    trial_duration_days: 7, // 7 days trial before first payment
    features: JSON.stringify([
      '7 días gratis de prueba',
      'Acceso completo a todas las preguntas',
      'Sesiones de práctica en vivo',
      'Tutor AI con método socrático',
      'Analytics detallado de progreso',
      'Generación de preguntas personalizadas',
      'Sin límite de intentos',
      'Cancela cuando quieras',
      'Ideal para prueba rápida',
    ]),
    is_active: true,
    display_order: 0, // First in the list
  },
  {
    id: 'free',
    name: 'Gratis',
    description: 'Acceso básico a la plataforma de práctica PAES',
    price: 0,
    currency: 'CLP',
    duration_days: 365 * 100, // Essentially permanent (100 years)
    trial_duration_days: 0,
    features: JSON.stringify([
      'Acceso a ensayos en vivo',
    ]),
    is_active: true,
    display_order: 3,
  },
  {
    id: 'trial',
    name: 'Prueba Gratuita',
    description: 'Prueba gratuita de 7 días con acceso completo',
    price: 0,
    currency: 'CLP',
    duration_days: 7,
    trial_duration_days: 7,
    features: JSON.stringify([
      'Acceso completo a todas las preguntas',
      'Sesiones de práctica en vivo',
      'Tutor AI con método socrático',
      'Analytics detallado de progreso',
      'Generación de preguntas personalizadas',
      'Sin límite de intentos',
    ]),
    is_active: false, // Replaced by trial included in plans
    display_order: 4,
  },
  {
    id: 'student',
    name: 'Plan Estudiante',
    description: 'Tarifa especial mensual para estudiantes',
    price: 8000,
    currency: 'CLP',
    duration_days: 30,
    trial_duration_days: 7, // 7 days trial before first payment
    features: JSON.stringify([
      'Acceso completo a todas las preguntas',
      'Sesiones de práctica en vivo',
      'Tutor AI con método socrático',
      'Analytics detallado de progreso',
      'Generación de preguntas personalizadas',
      'Sin límite de intentos',
      'Cancela cuando quieras',
      'Tarifa especial para estudiantes',
    ]),
    is_active: true,
    display_order: 1,
  },
  {
    id: 'basic',
    name: 'Plan Básico',
    description: 'Suscripción mensual con acceso completo',
    price: 8000,
    currency: 'CLP',
    duration_days: 30,
    trial_duration_days: 7, // 7 days trial before first payment
    features: JSON.stringify([
      'Acceso completo a todas las preguntas',
      'Sesiones de práctica en vivo',
      'Tutor AI con método socrático',
      'Analytics detallado de progreso',
      'Generación de preguntas personalizadas',
      'Sin límite de intentos',
      'Cancela cuando quieras',
    ]),
    is_active: false, // Replaced by student plan
    display_order: 5,
  },
  {
    id: 'premium',
    name: 'Plan Premium',
    description: 'Suscripción mensual con funciones premium (próximamente)',
    price: 15000,
    currency: 'CLP',
    duration_days: 30,
    trial_duration_days: 14,
    features: JSON.stringify([
      'Todo lo del Plan Básico',
      'Sesiones 1-on-1 con tutores',
      'Reportes detallados de rendimiento',
      'Recomendaciones personalizadas',
      'Acceso prioritario a nuevas funciones',
      'Soporte prioritario',
    ]),
    is_active: false, // Not active yet
    display_order: 6,
  },
];

async function seedPlans() {
  console.log('🔗 Connecting to database...');
  const client = await retryWithBackoff(() => pool.connect());

  try {
    console.log('🌱 Starting plan seeding (will create new plans and update existing ones)...');

    await client.query('BEGIN');

    for (const plan of plans) {
      const now = Date.now();

      // Check if plan already exists
      const existing = await client.query('SELECT * FROM plans WHERE id = $1', [plan.id]);

      if (existing.rows.length > 0) {
        // Plan exists - update it with current values
        await client.query(
          `UPDATE plans SET
            name = $1,
            description = $2,
            price = $3,
            currency = $4,
            duration_days = $5,
            trial_duration_days = $6,
            features = $7,
            is_active = $8,
            display_order = $9,
            updated_at = $10
          WHERE id = $11`,
          [
            plan.name,
            plan.description,
            plan.price,
            plan.currency,
            plan.duration_days,
            plan.trial_duration_days,
            plan.features,
            plan.is_active,
            plan.display_order,
            now,
            plan.id,
          ]
        );

        console.log(`🔄 Updated plan: ${plan.name} (${plan.id}) - Active: ${plan.is_active}`);
        continue;
      }

      // Insert new plan
      await client.query(
        `INSERT INTO plans (
          id, name, description, price, currency, duration_days,
          trial_duration_days, features, is_active, display_order,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          plan.id,
          plan.name,
          plan.description,
          plan.price,
          plan.currency,
          plan.duration_days,
          plan.trial_duration_days,
          plan.features,
          plan.is_active,
          plan.display_order,
          now,
          now,
        ]
      );

      console.log(`✅ Created plan: ${plan.name} (${plan.id}) - ${plan.price} ${plan.currency}/${plan.duration_days} days`);
    }

    await client.query('COMMIT');

    console.log('\n✅ Plan seeding completed successfully!');
    console.log('\n📊 Plan Summary:');

    const allPlans = await client.query('SELECT id, name, price, currency, is_active FROM plans ORDER BY display_order');

    allPlans.rows.forEach(p => {
      const status = p.is_active ? '🟢' : '🔴';
      console.log(`   ${status} ${p.name} (${p.id}): ${p.price} ${p.currency}`);
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding plans:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the seeder
seedPlans()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
