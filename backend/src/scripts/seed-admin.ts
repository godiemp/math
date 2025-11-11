import bcrypt from 'bcryptjs';
import { pool } from '../config/database';

/**
 * Seed script to create a default admin user
 * Run with: npm run seed:admin
 */
async function seedAdmin() {
  try {
    const username = 'admin';
    const email = 'admin@simplepaes.cl';
    const password = 'admin123'; // Default password - CHANGE IN PRODUCTION
    const displayName = 'Administrador';

    // Check if admin already exists
    const existingAdmin = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingAdmin.rows.length > 0) {
      console.log('❌ Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate user ID
    const userId = 'admin-default';
    const now = Date.now();

    // Insert admin user
    await pool.query(
      `INSERT INTO users (id, username, email, password_hash, display_name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, username, email, passwordHash, displayName, 'admin', now, now]
    );

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change this password in production!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
}

seedAdmin();
