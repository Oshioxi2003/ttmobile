const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Public routes
// None for users

// Protected routes (require authentication)
router.get('/', verifyToken, isAdmin, userController.getAll);
router.get('/:id', verifyToken, userController.getById);
router.post('/', verifyToken, isAdmin, userController.create);
router.put('/:id', verifyToken, userController.update);
router.delete('/:id', verifyToken, isAdmin, userController.delete);

module.exports = router;

