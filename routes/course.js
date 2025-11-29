const express = require('express');
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All course routes require authentication
router.use(authenticateToken);

// GET /api/courses - Get all courses
router.get('/', getAllCourses);

// GET /api/courses/:id - Get course by ID
router.get('/:id', getCourseById);

// POST /api/courses - Create new course
router.post('/', createCourse);

// PUT /api/courses/:id - Update course
router.put('/:id', updateCourse);

// DELETE /api/courses/:id - Delete course
router.delete('/:id', deleteCourse);

module.exports = router;
