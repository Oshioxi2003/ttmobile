const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// =====================
// PUBLIC ROUTES
// =====================

// Get footer pages (grouped by column)
router.get('/footer', pageController.getFooterPages);

// Get page by slug (supports nested slugs like "policies/refund-policy")
router.get('/slug/*', (req, res, next) => { req.params.slug = req.params[0]; next(); }, pageController.getBySlug);
router.get('/slug/:slug', pageController.getBySlug);

// =====================
// ADMIN ROUTES
// =====================

// Get all pages
router.get('/', verifyToken, isAdmin, pageController.getAll);

// Get page by ID
router.get('/:id', verifyToken, isAdmin, pageController.getById);

// Create new page
router.post('/', verifyToken, isAdmin, pageController.create);

// Update page
router.put('/:id', verifyToken, isAdmin, pageController.update);

// Update footer settings only
router.patch('/:id/footer', verifyToken, isAdmin, pageController.updateFooterSettings);

// Delete page
router.delete('/:id', verifyToken, isAdmin, pageController.delete);

module.exports = router;

