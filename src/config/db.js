require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'Mehrdad',
  password: process.env.DB_PASSWORD || 'Gorgan59',
  database: process.env.DB_NAME || 'HiringGame'
});

module.exports = pool;
