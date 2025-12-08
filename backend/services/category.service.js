const { Category, Product } = require('../models');
const { Op } = require('sequelize');

class CategoryService {
    async getAllCategories(options = {}) {
        const { includeInactive = false, includeChildren = true } = options;
        
        const where = {};
        if (!includeInactive) {
            where.isActive = true;
        }
        
        const categories = await Category.findAll({
            where: { ...where, parentId: null },
            include: includeChildren ? [{
                model: Category,
                as: 'children',
                where: includeInactive ? {} : { isActive: true },
                required: false
            }] : [],
            order: [['sortOrder', 'ASC'], ['name', 'ASC']]
        });
        
        return categories;
    }

    async getCategoryById(id) {
        return Category.findByPk(id, {
            include: [
                { model: Category, as: 'children' },
                { model: Category, as: 'parent' }
            ]
        });
    }

    async getCategoryBySlug(slug) {
        return Category.findOne({
            where: { slug, isActive: true },
            include: [{ model: Category, as: 'children', where: { isActive: true }, required: false }]
        });
    }

    async createCategory(data) {
        return Category.create(data);
    }

    async updateCategory(id, data) {
        const category = await Category.findByPk(id);
        if (!category) return null;
        
        return category.update(data);
    }

    async deleteCategory(id) {
        const category = await Category.findByPk(id);
        if (!category) return null;
        
        // Check for products in this category
        const productCount = await Product.count({ where: { categoryId: id } });
        if (productCount > 0) {
            throw new Error('Cannot delete category with products');
        }
        
        // Check for subcategories
        const childCount = await Category.count({ where: { parentId: id } });
        if (childCount > 0) {
            throw new Error('Cannot delete category with subcategories');
        }
        
        await category.destroy();
        return true;
    }

    async getCategoriesWithProductCount() {
        const categories = await Category.findAll({
            where: { isActive: true, parentId: null },
            include: [{
                model: Product,
                as: 'products',
                attributes: []
            }],
            attributes: {
                include: [
                    [require('sequelize').fn('COUNT', require('sequelize').col('products.id')), 'productCount']
                ]
            },
            group: ['Category.id'],
            order: [['sortOrder', 'ASC']]
        });
        
        return categories;
    }
}

module.exports = new CategoryService();

