const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Public routes
router.get('/', categoryController.getAll);
router.get('/with-count', categoryController.getWithProductCount);
router.get('/slug/:slug', categoryController.getBySlug);
router.get('/:id', categoryController.getById);

// Admin routes
router.post('/', verifyToken, isAdmin, categoryController.create);
router.put('/:id', verifyToken, isAdmin, categoryController.update);
router.delete('/:id', verifyToken, isAdmin, categoryController.delete);

module.exports = router;

