const db = require('../../config/db');

class Attendance {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM attendance');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM attendance WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByEnrollmentId(enrollmentId) {
    const [rows] = await db.query('SELECT * FROM attendance WHERE enrollment_id = ?', [enrollmentId]);
    return rows;
  }

  static async findByEnrollmentAndDate(enrollmentId, date) {
    const [rows] = await db.query('SELECT * FROM attendance WHERE enrollment_id = ? AND date = ?', [enrollmentId, date]);
    return rows[0];
  }

  static async create(attendanceData) {
    const { enrollment_id, date, status } = attendanceData;
    const [result] = await db.query('INSERT INTO attendance (enrollment_id, date, status) VALUES (?, ?, ?)', [enrollment_id, date, status]);
    return result.insertId;
  }

  static async update(id, attendanceData) {
    const { enrollment_id, date, status } = attendanceData;
    await db.query('UPDATE attendance SET enrollment_id = ?, date = ?, status = ? WHERE id = ?', [enrollment_id, date, status, id]);
  }

  static async delete(id) {
    await db.query('DELETE FROM attendance WHERE id = ?', [id]);
  }
}

module.exports = Attendance;
