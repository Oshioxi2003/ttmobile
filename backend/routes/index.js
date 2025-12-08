const express = require('express');
const router = express.Router();

// Import all routes
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');
const settingRoutes = require('./setting.routes');
const bannerRoutes = require('./banner.routes');
const contactRoutes = require('./contact.routes');
const dashboardRoutes = require('./dashboard.routes');
const uploadRoutes = require('./upload.routes');
const pageRoutes = require('./page.routes');
const wishlistRoutes = require('./wishlist.routes');
const reviewRoutes = require('./review.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/settings', settingRoutes);
router.use('/banners', bannerRoutes);
router.use('/contacts', contactRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/upload', uploadRoutes);
router.use('/pages', pageRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/', reviewRoutes);

// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'T&T Mobile API is running',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: '/api/v1/auth',
            users: '/api/v1/users',
            products: '/api/v1/products',
            categories: '/api/v1/categories',
            settings: '/api/v1/settings',
            banners: '/api/v1/banners',
            contacts: '/api/v1/contacts',
            dashboard: '/api/v1/dashboard',
            upload: '/api/v1/upload',
            pages: '/api/v1/pages',
            wishlist: '/api/v1/wishlist'
        }
    });
});

module.exports = router;

