const Grade = require('../models/Grade');

const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grades', error: error.message });
  }
};

const getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ message: 'Grade not found' });
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grade', error: error.message });
  }
};

const getGradesByEnrollment = async (req, res) => {
  try {
    const grades = await Grade.findByEnrollmentId(req.params.enrollmentId);
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grades for enrollment', error: error.message });
  }
};

const createGrade = async (req, res) => {
  try {
    const gradeId = await Grade.create(req.body);
    res.status(201).json({ message: 'Grade created successfully', gradeId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating grade', error: error.message });
  }
};

const updateGrade = async (req, res) => {
  try {
    await Grade.update(req.params.id, req.body);
    res.json({ message: 'Grade updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grade', error: error.message });
  }
};

const deleteGrade = async (req, res) => {
  try {
    await Grade.delete(req.params.id);
    res.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grade', error: error.message });
  }
};

module.exports = { getAllGrades, getGradeById, getGradesByEnrollment, createGrade, updateGrade, deleteGrade };
