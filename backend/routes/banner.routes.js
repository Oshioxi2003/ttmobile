const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { handleUploadSingle } = require('../middleware/upload.middleware');

// Public routes
router.get('/hero', bannerController.getHero);
router.get('/position/:position', bannerController.getByPosition);

// Admin routes
router.get('/', verifyToken, isAdmin, bannerController.getAll);
router.put('/sort-order', verifyToken, isAdmin, bannerController.updateSortOrder); // Must be before /:id
router.get('/:id', verifyToken, isAdmin, bannerController.getById);
router.post('/', verifyToken, isAdmin, handleUploadSingle, bannerController.create);
router.put('/:id', verifyToken, isAdmin, handleUploadSingle, bannerController.update);
router.patch('/:id', verifyToken, isAdmin, handleUploadSingle, bannerController.update);
router.delete('/:id', verifyToken, isAdmin, bannerController.delete);

module.exports = router;

