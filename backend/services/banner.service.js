const { Banner } = require('../models');
const { Op } = require('sequelize');

class BannerService {
    getActiveDateClause() {
        const now = new Date();
        return {
            [Op.or]: [
                { startDate: null, endDate: null },
                { startDate: { [Op.lte]: now }, endDate: { [Op.gte]: now } },
                { startDate: { [Op.lte]: now }, endDate: null },
                { startDate: null, endDate: { [Op.gte]: now } }
            ]
        };
    }

    async getAllBanners(options = {}) {
        const { position, includeInactive = false } = options;
        const where = {};
        if (position) where.position = position;
        if (!includeInactive) {
            where.isActive = true;
            Object.assign(where, this.getActiveDateClause());
        }
        return Banner.findAll({
            where,
            order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
        });
    }

    async getBannerById(id) {
        return Banner.findByPk(id);
    }

    async getHeroBanners() {
        return this.getAllBanners({ position: 'hero' });
    }

    async getBannersByPosition(position) {
        return Banner.findAll({
            where: {
                position,
                isActive: true,
                ...this.getActiveDateClause()
            },
            order: [['sortOrder', 'ASC']]
        });
    }

    async createBanner(data) {
        return Banner.create(data);
    }

    async updateBanner(id, data) {
        const banner = await Banner.findByPk(id);
        if (!banner) return null;
        return banner.update(data);
    }

    async deleteBanner(id) {
        const banner = await Banner.findByPk(id);
        if (!banner) return null;
        await banner.destroy();
        return true;
    }

    async updateSortOrder(bannerOrders) {
        const promises = bannerOrders.map(item =>
            Banner.update(
                { sortOrder: item.sortOrder },
                { where: { id: item.id } }
            )
        );
        await Promise.all(promises);
        return true;
    }
}

module.exports = new BannerService();
