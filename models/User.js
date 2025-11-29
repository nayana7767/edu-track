const pool = require('../config/db');

class User {
  static async create(userData) {
    const { name, email, password, role, department_id } = userData;
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role, department_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, role, department_id]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM users');
    return rows;
  }

  static async update(id, userData) {
    const { name, email, role, department_id } = userData;
    await pool.execute(
      'UPDATE users SET name = ?, email = ?, role = ?, department_id = ? WHERE id = ?',
      [name, email, role, department_id, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = User;
