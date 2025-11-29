const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const auth = require('../middleware/auth');

router.get('/', auth, enrollmentController.getAllEnrollments);
router.get('/:id', auth, enrollmentController.getEnrollmentById);
router.post('/', auth, enrollmentController.createEnrollment);
router.put('/:id', auth, enrollmentController.updateEnrollment);
router.delete('/:id', auth, enrollmentController.deleteEnrollment);

module.exports = router;
