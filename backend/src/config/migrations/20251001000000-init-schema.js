'use strict';

/**
 * Initial database schema migration
 * This creates all the base tables needed by the application
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Enable UUID extension
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create users table
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin')),
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL,
        current_streak INTEGER DEFAULT 0 NOT NULL,
        longest_streak INTEGER DEFAULT 0 NOT NULL,
        last_practice_date VARCHAR(10),
        cookie_consent VARCHAR(20) CHECK (cookie_consent IN ('accepted', 'declined')),
        target_level VARCHAR(20) DEFAULT 'M1_AND_M2' NOT NULL CHECK (target_level IN ('M1_ONLY', 'M1_AND_M2')),
        email_verified BOOLEAN DEFAULT FALSE NOT NULL,
        email_verified_at BIGINT,
        verification_token VARCHAR(255),
        verification_token_expires_at BIGINT,
        password_reset_token VARCHAR(255),
        password_reset_token_expires_at BIGINT
      )
    `);

    // Create refresh_tokens table
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(500) NOT NULL UNIQUE,
        expires_at BIGINT NOT NULL,
        created_at BIGINT NOT NULL,
        revoked BOOLEAN DEFAULT FALSE
      )
    `);

    // Create plans table
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS plans (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        currency VARCHAR(3) NOT NULL DEFAULT 'CLP',
        duration_days INTEGER NOT NULL,
        trial_duration_days INTEGER DEFAULT 0,
        features JSONB NOT NULL DEFAULT '[]',
        is_active BOOLEAN DEFAULT TRUE,
        display_order INTEGER DEFAULT 0,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL
      )
    `);

    // Create subscriptions table
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        plan_id VARCHAR(50) NOT NULL REFERENCES plans(id),
        status VARCHAR(20) NOT NULL CHECK (status IN ('trial', 'active', 'expired', 'cancelled')),
        started_at BIGINT NOT NULL,
        expires_at BIGINT,
        trial_ends_at BIGINT,
        cancelled_at BIGINT,
        auto_renew BOOLEAN DEFAULT TRUE,
        payment_method VARCHAR(50),
        last_payment_at BIGINT,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL,
        UNIQUE(user_id, plan_id)
      )
    `);

    // Create payments table
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE SET NULL,
        plan_id VARCHAR(50) NOT NULL REFERENCES plans(id),
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(3) NOT NULL DEFAULT 'CLP',
        payment_method VARCHAR(50) NOT NULL,
        payment_gateway VARCHAR(50) NOT NULL,
        gateway_payment_id VARCHAR(255) UNIQUE,
        gateway_preference_id VARCHAR(255),
        status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled', 'refunded', 'in_process')),
        status_detail TEXT,
        transaction_amount DECIMAL(10, 2),
        net_amount DECIMAL(10, 2),
        fee_amount DECIMAL(10, 2),
        payer_email VARCHAR(255),
        payer_id VARCHAR(255),
        metadata JSONB,
        payment_date BIGINT,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL
      )
    `);

    // Create indexes
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_users_password_reset_token ON users(password_reset_token)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_plans_is_active ON plans(is_active)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_expires_at ON subscriptions(expires_at)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON payments(subscription_id)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_payments_plan_id ON payments(plan_id)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_payments_gateway_payment_id ON payments(gateway_payment_id)');
    await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at)');
  },

  async down(queryInterface, Sequelize) {
    // Drop all tables in reverse order to handle foreign keys
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS payments CASCADE');
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS subscriptions CASCADE');
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS plans CASCADE');
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS refresh_tokens CASCADE');
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS users CASCADE');
  }
};
