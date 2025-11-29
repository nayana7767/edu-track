const db = require('../config/db');

const getStudentReport = async (req, res) => {
  try {
    const { studentId } = req.params;
    const [rows] = await db.query(`
      SELECT
        u.name as student_name,
        c.name as course_name,
        c.code as course_code,
        e.enrollment_date,
        g.grade,
        g.grade_date,
        COUNT(CASE WHEN a.status = 'present' THEN 1 END) as present_days,
        COUNT(CASE WHEN a.status = 'absent' THEN 1 END) as absent_days,
        COUNT(CASE WHEN a.status = 'late' THEN 1 END) as late_days
      FROM users u
      JOIN enrollments e ON u.id = e.student_id
      JOIN courses c ON e.course_id = c.id
      LEFT JOIN grades g ON e.id = g.enrollment_id
      LEFT JOIN attendance a ON e.id = a.enrollment_id
      WHERE u.id = ? AND u.role = 'student'
      GROUP BY u.id, c.id, e.id, g.id
    `, [studentId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error generating student report', error: error.message });
  }
};

const getCourseReport = async (req, res) => {
  try {
    const { courseId } = req.params;
    const [rows] = await db.query(`
      SELECT
        c.name as course_name,
        c.code as course_code,
        u.name as student_name,
        e.enrollment_date,
        g.grade,
        g.grade_date,
        COUNT(CASE WHEN a.status = 'present' THEN 1 END) as present_days,
        COUNT(CASE WHEN a.status = 'absent' THEN 1 END) as absent_days,
        COUNT(CASE WHEN a.status = 'late' THEN 1 END) as late_days
      FROM courses c
      JOIN enrollments e ON c.id = e.course_id
      JOIN users u ON e.student_id = u.id
      LEFT JOIN grades g ON e.id = g.enrollment_id
      LEFT JOIN attendance a ON e.id = a.enrollment_id
      WHERE c.id = ?
      GROUP BY c.id, u.id, e.id, g.id
    `, [courseId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error generating course report', error: error.message });
  }
};

const getDepartmentReport = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const [rows] = await db.query(`
      SELECT
        d.name as department_name,
        c.name as course_name,
        c.code as course_code,
        COUNT(DISTINCT e.student_id) as enrolled_students,
        AVG(CASE WHEN g.grade IS NOT NULL THEN CAST(g.grade AS DECIMAL) END) as average_grade
      FROM departments d
      JOIN courses c ON d.id = c.department_id
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN grades g ON e.id = g.enrollment_id
      WHERE d.id = ?
      GROUP BY d.id, c.id
    `, [departmentId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error generating department report', error: error.message });
  }
};

module.exports = { getStudentReport, getCourseReport, getDepartmentReport };
