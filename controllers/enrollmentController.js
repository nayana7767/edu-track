const db = require('../config/db');

// Get all enrollments
const getAllEnrollments = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM enrollments');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get enrollment by ID
const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM enrollments WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create enrollment
const createEnrollment = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;
    const [result] = await db.query('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id]);
    res.status(201).json({ id: result.insertId, student_id, course_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update enrollment
const updateEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, course_id } = req.body;
    await db.query('UPDATE enrollments SET student_id = ?, course_id = ? WHERE id = ?', [student_id, course_id, id]);
    res.json({ message: 'Enrollment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete enrollment
const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM enrollments WHERE id = ?', [id]);
    res.json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment
};
