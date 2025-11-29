const db = require('../config/db');

class Grade {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM grades');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM grades WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByEnrollmentId(enrollmentId) {
    const [rows] = await db.query('SELECT * FROM grades WHERE enrollment_id = ?', [enrollmentId]);
    return rows;
  }

  static async create(gradeData) {
    const { enrollment_id, grade, grade_date } = gradeData;
    const [result] = await db.query('INSERT INTO grades (enrollment_id, grade, grade_date) VALUES (?, ?, ?)', [enrollment_id, grade, grade_date]);
    return result.insertId;
  }

  static async update(id, gradeData) {
    const { enrollment_id, grade, grade_date } = gradeData;
    await db.query('UPDATE grades SET enrollment_id = ?, grade = ?, grade_date = ? WHERE id = ?', [enrollment_id, grade, grade_date, id]);
  }

  static async delete(id) {
    await db.query('DELETE FROM grades WHERE id = ?', [id]);
  }
}

module.exports = Grade;
