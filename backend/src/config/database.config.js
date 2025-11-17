require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 10000
    },
    retry: {
      max: 5
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      connectTimeout: 60000, // 60 seconds for Railway's IPv6 network
      statement_timeout: 60000
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000, // 60 seconds to acquire connection
      idle: 30000
    },
    retry: {
      max: 5 // Retry up to 5 times
    }
  }
};
