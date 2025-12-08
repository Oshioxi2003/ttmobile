const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// All wishlist routes require authentication
router.use(verifyToken);

// Get user's wishlist
router.get('/', wishlistController.getWishlist);

// Get wishlist count
router.get('/count', wishlistController.getCount);

// Get wishlist product IDs only
router.get('/ids', wishlistController.getProductIds);

// Check if product is in wishlist
router.get('/check/:productId', wishlistController.checkWishlist);

// Add product to wishlist
router.post('/', wishlistController.addToWishlist);

// Toggle wishlist (add/remove)
router.post('/toggle/:productId', wishlistController.toggleWishlist);

// Remove product from wishlist
router.delete('/:productId', wishlistController.removeFromWishlist);

// Clear all wishlist
router.delete('/', wishlistController.clearWishlist);

module.exports = router;

