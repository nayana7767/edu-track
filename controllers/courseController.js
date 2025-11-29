const Course = require('../models/Course');

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const courseId = await Course.create(req.body);
    res.status(201).json({ message: 'Course created successfully', courseId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    await Course.update(req.params.id, req.body);
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.delete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
