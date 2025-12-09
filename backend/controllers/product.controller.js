const productService = require('../services/product.service');

class ProductController {
    // Get all products with filters and pagination
    async getAll(req, res) {
        try {
            const result = await productService.getAllProducts(req.query);
            res.json({
                success: true,
                data: result.products,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching products',
                error: error.message
            });
        }
    }

    // Get single product by ID
    async getById(req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching product',
                error: error.message
            });
        }
    }

    // Get product by slug (for frontend)
    async getBySlug(req, res) {
        try {
            const product = await productService.getProductBySlug(req.params.slug);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching product',
                error: error.message
            });
        }
    }

    // Create new product
    async create(req, res) {
        try {
            const body = req.body || {};
            const productData = {
                name: body.name,
                slug: body.slug,
                sku: body.sku,
                description: body.description,
                shortDescription: body.shortDescription,
                price: body.price,
                originalPrice: body.originalPrice,
                costPrice: body.costPrice,
                categoryId: body.categoryId,
                brand: body.brand,
                condition: body.condition,
                stock: body.stock,
                isFeatured: body.isFeatured === 'true' || body.isFeatured === true,
                isActive: body.isActive === 'false' ? false : true,
                images: body.images || [],
                specifications: body.specifications || body.specs || {},
                color: body.color,
                batteryHealth: body.batteryHealth,
                warranty: body.warranty
            };

            if (req.file) {
                productData.thumbnail = `/uploads/products/${req.file.filename}`;
            } else if (body.thumbnail) {
                // Normalize slashes if provided
                productData.thumbnail = String(body.thumbnail).replace(/\\/g, '/');
            }

            const product = await productService.createProduct(productData);
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating product',
                error: error.message
            });
        }
    }

    // Update product
    async update(req, res) {
        try {
            const body = req.body || {};
            const updateData = {
                name: body.name,
                slug: body.slug,
                sku: body.sku,
                description: body.description,
                shortDescription: body.shortDescription,
                price: body.price,
                originalPrice: body.originalPrice,
                costPrice: body.costPrice,
                categoryId: body.categoryId,
                brand: body.brand,
                condition: body.condition,
                stock: body.stock,
                isFeatured: body.isFeatured === 'true' || body.isFeatured === true,
                isActive: body.isActive === 'false' ? false : true,
                images: body.images || [],
                specifications: body.specifications || body.specs || {},
                color: body.color,
                batteryHealth: body.batteryHealth,
                warranty: body.warranty
            };

            if (req.file) {
                updateData.thumbnail = `/uploads/products/${req.file.filename}`;
            } else if (body.thumbnail) {
                updateData.thumbnail = String(body.thumbnail).replace(/\\/g, '/');
            }

            const product = await productService.updateProduct(req.params.id, updateData);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            res.json({
                success: true,
                message: 'Product updated successfully',
                data: product
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating product',
                error: error.message
            });
        }
    }

    // Delete product
    async delete(req, res) {
        try {
            const result = await productService.deleteProduct(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            res.json({
                success: true,
                message: 'Product deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting product',
                error: error.message
            });
        }
    }

    // Get featured products
    async getFeatured(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 8;
            const products = await productService.getFeaturedProducts(limit);
            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching featured products',
                error: error.message
            });
        }
    }

    // Get related products
    async getRelated(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 4;
            const products = await productService.getRelatedProducts(req.params.id, limit);
            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching related products',
                error: error.message
            });
        }
    }

    // Get all brands
    async getBrands(req, res) {
        try {
            const brands = await productService.getBrands();
            res.json({
                success: true,
                data: brands
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching brands',
                error: error.message
            });
        }
    }
}

module.exports = new ProductController();

