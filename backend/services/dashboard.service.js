const { Product, User, Contact, Category, Banner, Page } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../database');

class DashboardService {
    async getStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Basic counts
        const [
            totalProducts,
            totalCategories,
            totalUsers,
            unreadContacts,
            totalBanners,
            totalPages
        ] = await Promise.all([
            Product.count({ where: { isActive: true } }),
            Category.count({ where: { isActive: true } }),
            User.count({ where: { role: 'user' } }),
            Contact.count({ where: { status: 'new' } }),
            Banner.count({ where: { isActive: true } }),
            Page.count({ where: { isActive: true } })
        ]);

        // Products stats
        const lowStockCount = await Product.count({
            where: {
                isActive: true,
                stock: { [Op.lte]: 5 }
            }
        });

        const featuredProducts = await Product.count({
            where: { isActive: true, isFeatured: true }
        });

        // Views today
        const totalViews = await Product.sum('viewCount') || 0;

        return {
            totalProducts,
            totalCategories,
            totalUsers,
            unreadContacts,
            totalBanners,
            totalPages,
            lowStockCount,
            featuredProducts,
            totalViews
        };
    }

    async getTopProducts(limit = 10) {
        return Product.findAll({
            where: { isActive: true },
            order: [['viewCount', 'DESC']],
            limit,
            attributes: ['id', 'name', 'thumbnail', 'price', 'viewCount', 'stock']
        });
    }

    async getLowStockProducts(threshold = 5) {
        return Product.findAll({
            where: {
                isActive: true,
                stock: { [Op.lte]: threshold }
            },
            order: [['stock', 'ASC']],
            attributes: ['id', 'name', 'thumbnail', 'stock', 'sku']
        });
    }

    async getRecentContacts(limit = 10) {
        return Contact.findAll({
            order: [['createdAt', 'DESC']],
            limit,
            attributes: ['id', 'name', 'email', 'subject', 'status', 'createdAt']
        });
    }

    async getProductsByCategory() {
        const categories = await Category.findAll({
            where: { isActive: true },
            include: [{
                model: Product,
                as: 'products',
                where: { isActive: true },
                required: false,
                attributes: ['id']
            }],
            attributes: ['id', 'name', 'slug']
        });

        return categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            productCount: cat.products ? cat.products.length : 0
        }));
    }
}

module.exports = new DashboardService();

