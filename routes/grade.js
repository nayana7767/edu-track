const express = require('express');
const router = express.Router();
const { getAllGrades, getGradeById, getGradesByEnrollment, createGrade, updateGrade, deleteGrade } = require('../controllers/gradeController');

router.get('/', getAllGrades);
router.get('/:id', getGradeById);
router.get('/enrollment/:enrollmentId', getGradesByEnrollment);
router.post('/', createGrade);
router.put('/:id', updateGrade);
router.delete('/:id', deleteGrade);

module.exports = router;
