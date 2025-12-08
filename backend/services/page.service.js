const { Page } = require('../models');
const { Op } = require('sequelize');

class PageService {
    // Get all pages (admin)
    async getAllPages(options = {}) {
        const { page = 1, limit = 20, isActive, showInFooter } = options;

        const where = {};
        if (isActive !== undefined) where.isActive = isActive;
        if (showInFooter !== undefined) where.showInFooter = showInFooter;

        const offset = (page - 1) * limit;

        const { count, rows } = await Page.findAndCountAll({
            where,
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset
        });

        return {
            pages: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    // Get page by ID
    async getPageById(id) {
        return Page.findByPk(id);
    }

    // Get page by slug (public)
    async getPageBySlug(slug) {
        return Page.findOne({
            where: { slug, isActive: true }
        });
    }

    // Create page
    async createPage(data) {
        return Page.create(data);
    }

    // Update page
    async updatePage(id, data) {
        const page = await Page.findByPk(id);
        if (!page) return null;
        return page.update(data);
    }

    // Delete page
    async deletePage(id) {
        const page = await Page.findByPk(id);
        if (!page) return null;
        await page.destroy();
        return true;
    }

    // Get footer pages grouped by column
    async getFooterPages() {
        const pages = await Page.findAll({
            where: { showInFooter: true, isActive: true },
            attributes: ['id', 'title', 'slug', 'footerColumn', 'footerOrder'],
            order: [['footerColumn', 'ASC'], ['footerOrder', 'ASC']]
        });

        // Group by column
        const footer = {
            support: [],  // Hỗ trợ khách hàng
            policy: [],   // Chính sách
            about: []     // Về chúng tôi
        };

        pages.forEach(page => {
            if (footer[page.footerColumn]) {
                footer[page.footerColumn].push({
                    id: page.id,
                    title: page.title,
                    slug: page.slug,
                    order: page.footerOrder
                });
            }
        });

        return footer;
    }

    // Update footer settings for a page
    async updateFooterSettings(id, { showInFooter, footerColumn, footerOrder }) {
        const page = await Page.findByPk(id);
        if (!page) return null;

        return page.update({
            showInFooter,
            footerColumn,
            footerOrder
        });
    }

    // Initialize default pages
    async initDefaultPages() {
        const defaultPages = [
            {
                title: 'About',
                slug: 'about',
                content: {
                    time: Date.now(),
                    blocks: [
                        { type: 'header', data: { text: 'About T&T Mobile', level: 2 } },
                        { type: 'paragraph', data: { text: 'Welcome to T&T Mobile — Genuine smartphones at the best prices.' } }
                    ],
                    version: '2.28.2'
                },
                showInFooter: true,
                footerColumn: 'about',
                footerOrder: 1
            },
            {
                title: 'Refund Policy',
                slug: 'policies/refund-policy',
                content: {
                    time: Date.now(),
                    blocks: [
                        { type: 'header', data: { text: 'Refund & Return Policy', level: 2 } },
                        { type: 'paragraph', data: { text: 'You can request a refund/return within 7 days if the product has a manufacturer defect.' } }
                    ],
                    version: '2.28.2'
                },
                showInFooter: true,
                footerColumn: 'policy',
                footerOrder: 1
            }
        ];

        for (const pageData of defaultPages) {
            const exists = await Page.findOne({ where: { slug: pageData.slug } });
            if (!exists) {
                await Page.create(pageData);
            }
        }
    }
}

module.exports = new PageService();

