const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// All dashboard routes require admin access
router.use(verifyToken, isAdmin);

router.get('/stats', dashboardController.getStats);
router.get('/top-products', dashboardController.getTopProducts);
router.get('/low-stock', dashboardController.getLowStockProducts);
router.get('/recent-contacts', dashboardController.getRecentContacts);
router.get('/products-by-category', dashboardController.getProductsByCategory);

module.exports = router;

