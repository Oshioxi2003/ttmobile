const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Public routes
router.get('/products/:id/reviews', reviewController.getProductReviews);

// Protected routes
router.post('/products/:id/reviews', verifyToken, reviewController.createReview);
router.put('/products/:id/reviews/:reviewId', verifyToken, reviewController.updateReview);
router.delete('/products/:id/reviews/:reviewId', verifyToken, reviewController.deleteReview);

module.exports = router;

