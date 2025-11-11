import { pool } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Seed initial subscription plans
 *
 * Plan types:
 * - Free: Basic access, limited features
 * - Trial: 7 days trial of premium features
 * - Basic: Monthly subscription at 8.000 CLP
 * - Premium: Future premium plan (not active yet)
 */

const plans = [
  {
    id: 'free',
    name: 'Gratis',
    description: 'Acceso básico a la plataforma de práctica PAES',
    price: 0,
    currency: 'CLP',
    duration_days: 365 * 100, // Essentially permanent (100 years)
    trial_duration_days: 0,
    features: JSON.stringify([
      'Acceso a preguntas de práctica básicas',
      'Quiz en modo Zen y Rapid Fire',
      'Seguimiento de progreso básico',
      'Acceso a currículum M1 y M2',
    ]),
    is_active: true,
    display_order: 1,
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
    is_active: true,
    display_order: 2,
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
    display_order: 3,
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
    is_active: true,
    display_order: 4,
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
    display_order: 5,
  },
];

async function seedPlans() {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting plan seeding...');

    await client.query('BEGIN');

    for (const plan of plans) {
      const now = Date.now();

      // Check if plan already exists
      const existing = await client.query('SELECT id FROM plans WHERE id = $1', [plan.id]);

      if (existing.rows.length > 0) {
        console.log(`⚠️  Plan "${plan.name}" (${plan.id}) already exists, skipping...`);
        continue;
      }

      // Insert plan
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
