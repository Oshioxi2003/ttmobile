const dashboardService = require('../services/dashboard.service');

class DashboardController {
    // Get dashboard statistics
    async getStats(req, res) {
        try {
            const stats = await dashboardService.getStats();
            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching dashboard stats',
                error: error.message
            });
        }
    }

    // Get top viewed products
    async getTopProducts(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const products = await dashboardService.getTopProducts(limit);
            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching top products',
                error: error.message
            });
        }
    }

    // Get low stock products
    async getLowStockProducts(req, res) {
        try {
            const threshold = parseInt(req.query.threshold) || 5;
            const products = await dashboardService.getLowStockProducts(threshold);
            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching low stock products',
                error: error.message
            });
        }
    }

    // Get recent contacts
    async getRecentContacts(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const contacts = await dashboardService.getRecentContacts(limit);
            res.json({
                success: true,
                data: contacts
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching recent contacts',
                error: error.message
            });
        }
    }

    // Get products by category
    async getProductsByCategory(req, res) {
        try {
            const data = await dashboardService.getProductsByCategory();
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching products by category',
                error: error.message
            });
        }
    }
}

module.exports = new DashboardController();

