const wishlistService = require('../services/wishlist.service');

class WishlistController {
    // Get user's wishlist
    async getWishlist(req, res) {
        try {
            const userId = req.userId;
            const items = await wishlistService.getWishlist(userId);

            res.json({
                success: true,
                data: items,
                count: items.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching wishlist',
                error: error.message
            });
        }
    }

    // Add product to wishlist
    async addToWishlist(req, res) {
        try {
            const userId = req.userId;
            const { productId } = req.body;

            if (!productId) {
                return res.status(400).json({
                    success: false,
                    message: 'Product ID is required'
                });
            }

            const item = await wishlistService.addToWishlist(userId, productId);

            res.status(201).json({
                success: true,
                message: 'Product added to wishlist',
                data: item
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Remove product from wishlist
    async removeFromWishlist(req, res) {
        try {
            const userId = req.userId;
            const { productId } = req.params;

            const result = await wishlistService.removeFromWishlist(userId, productId);

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found in wishlist'
                });
            }

            res.json({
                success: true,
                message: 'Product removed from wishlist'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error removing from wishlist',
                error: error.message
            });
        }
    }

    // Toggle wishlist (add/remove)
    async toggleWishlist(req, res) {
        try {
            const userId = req.userId;
            const { productId } = req.params;

            const result = await wishlistService.toggleWishlist(userId, productId);

            res.json({
                success: true,
                message: result.action === 'added' 
                    ? 'Product added to wishlist' 
                    : 'Product removed from wishlist',
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Check if product is in wishlist
    async checkWishlist(req, res) {
        try {
            const userId = req.userId;
            const { productId } = req.params;

            const inWishlist = await wishlistService.isInWishlist(userId, productId);

            res.json({
                success: true,
                data: { inWishlist }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error checking wishlist',
                error: error.message
            });
        }
    }

    // Clear all wishlist
    async clearWishlist(req, res) {
        try {
            const userId = req.userId;
            await wishlistService.clearWishlist(userId);

            res.json({
                success: true,
                message: 'Wishlist cleared'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error clearing wishlist',
                error: error.message
            });
        }
    }

    // Get wishlist count
    async getCount(req, res) {
        try {
            const userId = req.userId;
            const count = await wishlistService.getWishlistCount(userId);

            res.json({
                success: true,
                data: { count }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error getting wishlist count',
                error: error.message
            });
        }
    }

    // Get wishlist product IDs
    async getProductIds(req, res) {
        try {
            const userId = req.userId;
            const productIds = await wishlistService.getWishlistProductIds(userId);

            res.json({
                success: true,
                data: productIds
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error getting wishlist IDs',
                error: error.message
            });
        }
    }
}

module.exports = new WishlistController();

