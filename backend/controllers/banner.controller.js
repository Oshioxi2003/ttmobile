const bannerService = require('../services/banner.service');

class BannerController {
    // Get all banners
    async getAll(req, res) {
        try {
            const { position, includeInactive } = req.query;
            const banners = await bannerService.getAllBanners({
                position,
                includeInactive: includeInactive === 'true'
            });
            res.json({ success: true, data: banners });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching banners', error: error.message });
        }
    }

    // Get banner by ID
    async getById(req, res) {
        try {
            const banner = await bannerService.getBannerById(req.params.id);
            if (!banner) {
                return res.status(404).json({ success: false, message: 'Banner not found' });
            }
            res.json({ success: true, data: banner });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching banner', error: error.message });
        }
    }

    // Get hero banners (public)
    async getHero(req, res) {
        try {
            const banners = await bannerService.getHeroBanners();
            res.json({ success: true, data: banners });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching banners', error: error.message });
        }
    }

    // Get banners by position (public)
    async getByPosition(req, res) {
        try {
            const banners = await bannerService.getBannersByPosition(req.params.position);
            res.json({ success: true, data: banners });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching banners by position', error: error.message });
        }
    }

    // Create banner
    async create(req, res) {
        try {
            // Debug logging
            console.log('Banner create request:');
            console.log('- req.file:', req.file);
            console.log('- req.body:', req.body);
            console.log('- Content-Type:', req.headers['content-type']);

            // Validate required image field
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Image file is required for banner creation. Please upload an image.' 
                });
            }

            const bannerData = {
                title: req.body.title,
                subtitle: req.body.subtitle || null,
                description: req.body.description || null,
                link: req.body.link || null,
                buttonText: req.body.buttonText || null,
                position: req.body.position || 'hero',
                sortOrder: parseInt(req.body.sortOrder, 10) || 0,
                isActive: [true, 'true', 1, '1'].includes(req.body.isActive),
                openInNewTab: req.body.openInNewTab === 'null' ? null : [true, 'true', 1, '1'].includes(req.body.openInNewTab),
                image: `/uploads/banners/${req.file.filename}`
            };

            console.log('- bannerData to create:', bannerData);

            const banner = await bannerService.createBanner(bannerData);
            res.status(201).json({ success: true, message: 'Banner created successfully', data: banner });
        } catch (error) {
            console.error('Error creating banner:', error);
            res.status(400).json({ success: false, message: 'Error creating banner', error: error.message });
        }
    }

    // Update banner
    async update(req, res) {
        try {
            const bannerData = { ...req.body };

            if (req.body.sortOrder) bannerData.sortOrder = parseInt(req.body.sortOrder, 10) || 0;
            if (req.body.isActive) bannerData.isActive = [true, 'true', 1, '1'].includes(req.body.isActive);
            if (req.body.openInNewTab) {
                bannerData.openInNewTab = req.body.openInNewTab === 'null' ? null : [true, 'true', 1, '1'].includes(req.body.openInNewTab);
            }

            if (req.file) {
                bannerData.image = `/uploads/banners/${req.file.filename}`;
            } else if (req.body.image === '') {
                bannerData.image = null;
            }

            const banner = await bannerService.updateBanner(req.params.id, bannerData);
            if (!banner) {
                return res.status(404).json({ success: false, message: 'Banner not found' });
            }
            res.json({ success: true, message: 'Banner updated successfully', data: banner });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error updating banner', error: error.message });
        }
    }

    // Delete banner
    async delete(req, res) {
        try {
            const result = await bannerService.deleteBanner(req.params.id);
            if (!result) {
                return res.status(404).json({ success: false, message: 'Banner not found' });
            }
            res.json({ success: true, message: 'Banner deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error deleting banner', error: error.message });
        }
    }

    // Update sort order
    async updateSortOrder(req, res) {
        try {
            const { orders } = req.body;
            await bannerService.updateSortOrder(orders);
            res.json({ success: true, message: 'Sort order updated successfully' });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error updating sort order', error: error.message });
        }
    }
}

module.exports = new BannerController();
