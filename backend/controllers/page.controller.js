const pageService = require('../services/page.service');

class PageController {
    // Get all pages (admin)
    async getAll(req, res) {
        try {
            const { page, limit, isActive, showInFooter } = req.query;
            const result = await pageService.getAllPages({
                page,
                limit,
                isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
                showInFooter: showInFooter === 'true' ? true : showInFooter === 'false' ? false : undefined
            });

            res.json({
                success: true,
                data: result.pages,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching pages',
                error: error.message
            });
        }
    }

    // Get page by ID (admin)
    async getById(req, res) {
        try {
            const page = await pageService.getPageById(req.params.id);
            if (!page) {
                return res.status(404).json({
                    success: false,
                    message: 'Page not found'
                });
            }

            res.json({
                success: true,
                data: page
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching page',
                error: error.message
            });
        }
    }

    // Get page by slug (public)
    async getBySlug(req, res) {
        try {
            const page = await pageService.getPageBySlug(req.params.slug);
            if (!page) {
                return res.status(404).json({
                    success: false,
                    message: 'Page not found'
                });
            }

            res.json({
                success: true,
                data: page
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching page',
                error: error.message
            });
        }
    }

    // Create page (admin)
    async create(req, res) {
        try {
            const { title, slug, content, excerpt, metaTitle, metaDescription, showInFooter, footerColumn, footerOrder, isActive } = req.body;

            if (!title) {
                return res.status(400).json({
                    success: false,
                    message: 'Title is required'
                });
            }

            const page = await pageService.createPage({
                title,
                slug,
                content,
                excerpt,
                metaTitle,
                metaDescription,
                showInFooter,
                footerColumn,
                footerOrder,
                isActive
            });

            res.status(201).json({
                success: true,
                message: 'Page created successfully',
                data: page
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating page',
                error: error.message
            });
        }
    }

    // Update page (admin)
    async update(req, res) {
        try {
            const page = await pageService.updatePage(req.params.id, req.body);
            if (!page) {
                return res.status(404).json({
                    success: false,
                    message: 'Page not found'
                });
            }

            res.json({
                success: true,
                message: 'Page updated successfully',
                data: page
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating page',
                error: error.message
            });
        }
    }

    // Delete page (admin)
    async delete(req, res) {
        try {
            const result = await pageService.deletePage(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Page not found'
                });
            }

            res.json({
                success: true,
                message: 'Page deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting page',
                error: error.message
            });
        }
    }

    // Get footer pages (public)
    async getFooterPages(req, res) {
        try {
            const footer = await pageService.getFooterPages();
            res.json({
                success: true,
                data: footer
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching footer pages',
                error: error.message
            });
        }
    }

    // Update footer settings (admin)
    async updateFooterSettings(req, res) {
        try {
            const { showInFooter, footerColumn, footerOrder } = req.body;
            const page = await pageService.updateFooterSettings(req.params.id, {
                showInFooter,
                footerColumn,
                footerOrder
            });

            if (!page) {
                return res.status(404).json({
                    success: false,
                    message: 'Page not found'
                });
            }

            res.json({
                success: true,
                message: 'Footer settings updated',
                data: page
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating footer settings',
                error: error.message
            });
        }
    }
}

module.exports = new PageController();

