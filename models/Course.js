const db = require('../config/db');

class Course {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(courseData) {
    const { name, description, credits, department_id } = courseData;
    const [result] = await db.query('INSERT INTO courses (name, description, credits, department_id) VALUES (?, ?, ?, ?)', [name, description, credits, department_id]);
    return result.insertId;
  }

  static async update(id, courseData) {
    const { name, description, credits, department_id } = courseData;
    await db.query('UPDATE courses SET name = ?, description = ?, credits = ?, department_id = ? WHERE id = ?', [name, description, credits, department_id, id]);
  }

  static async delete(id) {
    await db.query('DELETE FROM courses WHERE id = ?', [id]);
  }
}

module.exports = Course;
