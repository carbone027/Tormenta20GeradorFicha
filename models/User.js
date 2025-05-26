const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async findByUsername(username) {
    try {
      const result = await pool.query('SELECT * FROM usuarios_lol WHERE username = $1', [username]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM usuarios_lol WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar email:', error);
      throw error;
    }
  }

  static async create(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO usuarios_lol (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  static async verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password);
  }
}

module.exports = User;