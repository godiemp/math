import { clearDatabase, seedTestData, closeDatabase } from './helpers/db-setup';

async function globalSetup() {
  console.log('🔧 Setting up test environment...');

  try {
    // Clear and seed the database
    console.log('🗄️  Clearing test database...');
    await clearDatabase();

    console.log('🌱 Seeding test data...');
    await seedTestData();

    console.log('✅ Test environment ready!');
  } catch (error) {
    console.error('❌ Failed to set up test environment:', error);
    throw error;
  } finally {
    await closeDatabase();
  }
}

export default globalSetup;
