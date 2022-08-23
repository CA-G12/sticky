/* eslint-disable no-unused-vars */
const { Pool } = require('pg');

require('dotenv').config();

const {
  TEST_DB_URL,
  DEV_DB_URL,
  NODE_ENV,
  DATABASE_URL,
} = process.env;

let dbUrl = '';

if (NODE_ENV === 'test') {
  dbUrl = TEST_DB_URL;
} else if (NODE_ENV === 'development') {
  dbUrl = DEV_DB_URL;
} else if (NODE_ENV === 'production') {
  dbUrl = DATABASE_URL;
}

const connection = new Pool({
  connectionString: dbUrl,
  ssl: new URL(dbUrl).hostname !== 'localhost',
});

module.exports = connection;
