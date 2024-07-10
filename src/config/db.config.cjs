const dotenv = require('dotenv');

dotenv.config();

const sslrequired = process.env.SSL_REQUIRED === 'true';
const sslrejectUnauthorized = process.env.SSL_REJECT_UNAUTHORIZED === 'false';
const dialectOptions = {
  ssl: {
    require: sslrequired,
    rejectUnauthorized: sslrejectUnauthorized,
  },
};

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres', // Ensure this is set
    dialectOptions,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres', // Ensure this is set
    dialectOptions,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres', // Ensure this is set
    dialectOptions,
  },
};
