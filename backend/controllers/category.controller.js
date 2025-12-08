const categoryService = require('../services/category.service');

class CategoryController {
    // Get all categories
    async getAll(req, res) {
        try {
            const includeInactive = req.query.includeInactive === 'true';
            const categories = await categoryService.getAllCategories({ includeInactive });
            res.json({
                success: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching categories',
                error: error.message
            });
        }
    }

    // Get category by ID
    async getById(req, res) {
        try {
            const category = await categoryService.getCategoryById(req.params.id);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
            res.json({
                success: true,
                data: category
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching category',
                error: error.message
            });
        }
    }

    // Get category by slug
    async getBySlug(req, res) {
        try {
            const category = await categoryService.getCategoryBySlug(req.params.slug);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
            res.json({
                success: true,
                data: category
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching category',
                error: error.message
            });
        }
    }

    // Create category
    async create(req, res) {
        try {
            const category = await categoryService.createCategory(req.body);
            res.status(201).json({
                success: true,
                message: 'Category created successfully',
                data: category
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating category',
                error: error.message
            });
        }
    }

    // Update category
    async update(req, res) {
        try {
            const category = await categoryService.updateCategory(req.params.id, req.body);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
            res.json({
                success: true,
                message: 'Category updated successfully',
                data: category
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating category',
                error: error.message
            });
        }
    }

    // Delete category
    async delete(req, res) {
        try {
            await categoryService.deleteCategory(req.params.id);
            res.json({
                success: true,
                message: 'Category deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get categories with product count
    async getWithProductCount(req, res) {
        try {
            const categories = await categoryService.getCategoriesWithProductCount();
            res.json({
                success: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching categories',
                error: error.message
            });
        }
    }
}

module.exports = new CategoryController();

