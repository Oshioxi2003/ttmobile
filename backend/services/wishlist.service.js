const { Wishlist, Product, Category } = require('../models');

class WishlistService {
    // Get user's wishlist
    async getWishlist(userId) {
        const items = await Wishlist.findAll({
            where: { userId },
            include: [{
                model: Product,
                as: 'product',
                where: { isActive: true },
                required: false,
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name', 'slug']
                }]
            }],
            order: [['createdAt', 'DESC']]
        });

        // Lọc bỏ những item mà product đã bị xóa hoặc inactive
        return items.filter(item => item.product !== null);
    }

    // Add product to wishlist
    async addToWishlist(userId, productId) {
        // Kiểm tra product có tồn tại không
        const product = await Product.findOne({
            where: { id: productId, isActive: true }
        });

        if (!product) {
            throw new Error('Product not found or inactive');
        }

        // Kiểm tra đã có trong wishlist chưa
        const exists = await Wishlist.findOne({
            where: { userId, productId }
        });

        if (exists) {
            throw new Error('Product already in wishlist');
        }

        return Wishlist.create({ userId, productId });
    }

    // Remove product from wishlist
    async removeFromWishlist(userId, productId) {
        const item = await Wishlist.findOne({
            where: { userId, productId }
        });

        if (!item) {
            return null;
        }

        await item.destroy();
        return true;
    }

    // Check if product is in wishlist
    async isInWishlist(userId, productId) {
        const item = await Wishlist.findOne({
            where: { userId, productId }
        });
        return !!item;
    }

    // Clear all wishlist
    async clearWishlist(userId) {
        await Wishlist.destroy({
            where: { userId }
        });
        return true;
    }

    // Get wishlist count
    async getWishlistCount(userId) {
        return Wishlist.count({
            where: { userId }
        });
    }

    // Toggle wishlist (add if not exists, remove if exists)
    async toggleWishlist(userId, productId) {
        const exists = await Wishlist.findOne({
            where: { userId, productId }
        });

        if (exists) {
            await exists.destroy();
            return { action: 'removed', inWishlist: false };
        } else {
            // Kiểm tra product có tồn tại không
            const product = await Product.findOne({
                where: { id: productId, isActive: true }
            });

            if (!product) {
                throw new Error('Product not found or inactive');
            }

            await Wishlist.create({ userId, productId });
            return { action: 'added', inWishlist: true };
        }
    }

    // Get wishlist product IDs only (for quick check on frontend)
    async getWishlistProductIds(userId) {
        const items = await Wishlist.findAll({
            where: { userId },
            attributes: ['productId']
        });
        return items.map(item => item.productId);
    }
}

module.exports = new WishlistService();

