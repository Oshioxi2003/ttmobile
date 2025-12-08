const { Product, Category } = require('../models');
const { Op } = require('sequelize');

class ProductService {
    async getAllProducts(options = {}) {
        const { 
            page = 1, 
            limit = 12, 
            categoryId, 
            brand, 
            condition,
            minPrice, 
            maxPrice, 
            search,
            sortBy = 'newest',
            isActive = true,
            isFeatured
        } = options;

        const where = {};
        
        if (isActive !== null) where.isActive = isActive;
        if (categoryId) where.categoryId = categoryId;
        if (brand) where.brand = brand;
        if (condition) where.condition = condition;
        if (isFeatured !== undefined) where.isFeatured = isFeatured;
        
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = minPrice;
            if (maxPrice) where.price[Op.lte] = maxPrice;
        }
        
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
                { sku: { [Op.like]: `%${search}%` } }
            ];
        }

        // Sorting
        let order = [['createdAt', 'DESC']];
        switch (sortBy) {
            case 'price_asc':
                order = [['price', 'ASC']];
                break;
            case 'price_desc':
                order = [['price', 'DESC']];
                break;
            case 'name_asc':
                order = [['name', 'ASC']];
                break;
            case 'popular':
                order = [['soldCount', 'DESC']];
                break;
            case 'newest':
            default:
                order = [['createdAt', 'DESC']];
        }

        const offset = (page - 1) * limit;
        
        const { count, rows } = await Product.findAndCountAll({
            where,
            include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
            order,
            limit: parseInt(limit),
            offset
        });

        return {
            products: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    async getProductById(id) {
        const product = await Product.findByPk(id, {
            include: [{ model: Category, as: 'category' }]
        });
        
        if (product) {
            await product.increment('viewCount');
        }
        
        return product;
    }

    async getProductBySlug(slug) {
        const product = await Product.findOne({
            where: { slug, isActive: true },
            include: [{ model: Category, as: 'category' }]
        });
        
        if (product) {
            await product.increment('viewCount');
        }
        
        return product;
    }

    async createProduct(data) {
        return Product.create(data);
    }

    async updateProduct(id, data) {
        const product = await Product.findByPk(id);
        if (!product) return null;
        
        return product.update(data);
    }

    async deleteProduct(id) {
        const product = await Product.findByPk(id);
        if (!product) return null;
        
        await product.destroy();
        return true;
    }

    async getFeaturedProducts(limit = 8) {
        return Product.findAll({
            where: { isActive: true, isFeatured: true },
            include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
            order: [['createdAt', 'DESC']],
            limit
        });
    }

    async getRelatedProducts(productId, limit = 4) {
        const product = await Product.findByPk(productId);
        if (!product) return [];

        return Product.findAll({
            where: {
                id: { [Op.ne]: productId },
                isActive: true,
                [Op.or]: [
                    { categoryId: product.categoryId },
                    { brand: product.brand }
                ]
            },
            limit,
            order: [['createdAt', 'DESC']]
        });
    }

    async getBrands() {
        const brands = await Product.findAll({
            attributes: ['brand'],
            where: { isActive: true, brand: { [Op.ne]: null } },
            group: ['brand']
        });
        return brands.map(b => b.brand);
    }
}

module.exports = new ProductService();

