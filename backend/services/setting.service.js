const { Setting } = require('../models');

class SettingService {
    async getAllSettings(group = null) {
        const where = {};
        if (group) where.group = group;
        
        const settings = await Setting.findAll({ where });
        
        // Convert to key-value object
        const result = {};
        settings.forEach(setting => {
            result[setting.key] = setting.getParsedValue();
        });
        
        return result;
    }

    async getSetting(key) {
        const setting = await Setting.findOne({ where: { key } });
        return setting ? setting.getParsedValue() : null;
    }

    async setSetting(key, value, type = 'text', group = 'general', description = null) {
        const [setting, created] = await Setting.findOrCreate({
            where: { key },
            defaults: { value: String(value), type, group, description }
        });
        
        if (!created) {
            const updateFields = { value: String(value) };
            if (type !== undefined) updateFields.type = type;
            if (group !== undefined) updateFields.group = group;
            if (description !== undefined) updateFields.description = description;
            await setting.update(updateFields);
        }

        return setting;
    }

    async setMultipleSettings(settings) {
        const results = [];
        
        for (const [key, data] of Object.entries(settings)) {
            const result = await this.setSetting(
                key,
                data.value,
                data.type || 'text',
                data.group || 'general',
                data.description
            );
            results.push(result);
        }
        
        return results;
    }

    async deleteSetting(key) {
        const setting = await Setting.findOne({ where: { key } });
        if (!setting) return null;
        
        await setting.destroy();
        return true;
    }

    async getSettingsByGroup(group) {
        return Setting.findAll({
            where: { group },
            order: [['key', 'ASC']]
        });
    }

    // Get site settings for frontend (public). Also attach public nav_config, contact, social
    async getSiteSettings() {
        // Lấy tất cả settings từ các group cần thiết
        const settings = await Setting.findAll({
            where: {
                group: ['site', 'nav', 'contact', 'social', 'purchase']
            }
        });

        const result = {};
        settings.forEach(setting => {
            result[setting.key] = setting.getParsedValue();
        });

        return result;
    }

    // Get contact info for purchasing (FB, Zalo)
    async getPurchaseContactInfo() {
        const settings = await Setting.findAll({
            where: {
                group: ['social', 'contact', 'purchase']
            }
        });

        const result = {};
        settings.forEach(setting => {
            result[setting.key] = setting.getParsedValue();
        });

        return {
            message: result.purchase_message || 'Liên hệ để mua hàng',
            phone: result.contact_phone,
            workingHours: result.working_hours,
            facebook: {
                url: result.facebook_url,
                name: result.facebook_name
            },
            zalo: {
                phone: result.zalo_phone,
                url: result.zalo_url
            }
        };
    }

    // Initialize default settings
    async initDefaultSettings() {
        const defaults = {
            // Site info
            'site_name': { value: 'T&T Mobile', type: 'text', group: 'site', description: 'Tên website' },
            'site_description': { value: 'Điện thoại chính hãng - Uy tín - Chất lượng', type: 'text', group: 'site', description: 'Mô tả website' },
            'site_logo': { value: '/images/logo.png', type: 'text', group: 'site', description: 'Logo website' },

            // Right two small banners (home hero, right column)
            'small_banner_1': { value: JSON.stringify({ imageUrl: '/images/banners/hero-right-1.webp', linkUrl: '/products?brand=Apple', title: 'Ưu đãi iPhone', isActive: true, openInNewTab: false }), type: 'json', group: 'site', description: 'Small Banner 1 (right side of hero)' },
            'small_banner_2': { value: JSON.stringify({ imageUrl: '/images/banners/hero-right-2.webp', linkUrl: 'https://zalo.me/your-number', title: 'Chat Zalo nhận tư vấn', isActive: true, openInNewTab: true }), type: 'json', group: 'site', description: 'Small Banner 2 (right side of hero)' },

            // Contact info
            'contact_phone': { value: '0123-456-789', type: 'text', group: 'contact', description: 'Số điện thoại liên hệ' },
            'contact_email': { value: 'info@ttmobile.com', type: 'text', group: 'contact', description: 'Email liên hệ' },
            'contact_address': { value: 'Việt Nam', type: 'text', group: 'contact', description: 'Địa chỉ cửa hàng' },

            // Social - Thông tin liên hệ mua hàng
            'facebook_url': { value: 'https://facebook.com/ttmobile', type: 'text', group: 'social', description: 'Link Facebook để khách liên hệ mua hàng' },
            'facebook_name': { value: 'T&T Mobile', type: 'text', group: 'social', description: 'Tên Facebook' },
            'zalo_phone': { value: '0123456789', type: 'text', group: 'social', description: 'Số Zalo để khách liên hệ mua hàng' },
            'zalo_url': { value: 'https://zalo.me/0123456789', type: 'text', group: 'social', description: 'Link Zalo' },

            // Purchase message
            'purchase_message': { value: 'Để đặt mua sản phẩm, vui lòng liên hệ với chúng tôi qua Facebook hoặc Zalo để được tư vấn và báo giá tốt nhất!', type: 'text', group: 'purchase', description: 'Thông báo khi khách muốn mua hàng' },
            'working_hours': { value: '8:00 - 22:00 (Thứ 2 - Chủ nhật)', type: 'text', group: 'contact', description: 'Giờ làm việc' }
        };

        for (const [key, data] of Object.entries(defaults)) {
            const exists = await Setting.findOne({ where: { key } });
            if (!exists) {
                await Setting.create({ key, ...data });
            }
        }
    }
}

module.exports = new SettingService();

