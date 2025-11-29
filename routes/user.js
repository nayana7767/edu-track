const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All user routes require authentication
router.use(authenticateToken);

// GET /api/users - Get all users
router.get('/', getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', getUserById);

// PUT /api/users/:id - Update user
router.put('/:id', updateUser);

// DELETE /api/users/:id - Delete user
router.delete('/:id', deleteUser);

module.exports = router;
