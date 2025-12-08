const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { handleUploadSingle } = require('../middleware/upload.middleware');

// Public routes
router.get('/', productController.getAll);
router.get('/featured', productController.getFeatured);
router.get('/brands', productController.getBrands);
router.get('/slug/:slug', productController.getBySlug);
router.get('/:id', productController.getById);
router.get('/:id/related', productController.getRelated);

// Admin routes
router.post('/', verifyToken, isAdmin, handleUploadSingle, productController.create);
router.put('/:id', verifyToken, isAdmin, handleUploadSingle, productController.update);
router.patch('/:id', verifyToken, isAdmin, handleUploadSingle, productController.update);
router.delete('/:id', verifyToken, isAdmin, productController.delete);

module.exports = router;

