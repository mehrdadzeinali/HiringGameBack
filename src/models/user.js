const db = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [result] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    return result;
  },

  async getUserByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }
};
