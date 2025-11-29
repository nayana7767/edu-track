const db = require('../config/db');

class Enrollment {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM enrollments');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM enrollments WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(enrollmentData) {
    const { student_id, course_id, enrollment_date } = enrollmentData;
    const [result] = await db.query('INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES (?, ?, ?)', [student_id, course_id, enrollment_date]);
    return result.insertId;
  }

  static async update(id, enrollmentData) {
    const { student_id, course_id, enrollment_date } = enrollmentData;
    await db.query('UPDATE enrollments SET student_id = ?, course_id = ?, enrollment_date = ? WHERE id = ?', [student_id, course_id, enrollment_date, id]);
  }

  static async delete(id) {
    await db.query('DELETE FROM enrollments WHERE id = ?', [id]);
  }
}

module.exports = Enrollment;
