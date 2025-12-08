const settingService = require('../services/setting.service');

class SettingController {
    // Get all settings
    async getAll(req, res) {
        try {
            const { group } = req.query;
            const settings = await settingService.getAllSettings(group);
            res.json({
                success: true,
                data: settings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching settings',
                error: error.message
            });
        }
    }

    // Get single setting by key
    async getByKey(req, res) {
        try {
            const value = await settingService.getSetting(req.params.key);
            res.json({
                success: true,
                data: { [req.params.key]: value }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching setting',
                error: error.message
            });
        }
    }

    // Update single setting
    async update(req, res) {
        try {
            const { value, type, group, description } = req.body;
            const setting = await settingService.setSetting(
                req.params.key,
                value,
                type,
                group,
                description
            );
            res.json({
                success: true,
                message: 'Setting updated successfully',
                data: setting
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating setting',
                error: error.message
            });
        }
    }

    // Update multiple settings
    async updateMultiple(req, res) {
        try {
            const settings = req.body;
            const results = await settingService.setMultipleSettings(settings);
            res.json({
                success: true,
                message: 'Settings updated successfully',
                data: results
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating settings',
                error: error.message
            });
        }
    }

    // Delete setting
    async delete(req, res) {
        try {
            const result = await settingService.deleteSetting(req.params.key);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Setting not found'
                });
            }
            res.json({
                success: true,
                message: 'Setting deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting setting',
                error: error.message
            });
        }
    }

    // Get public site settings (no auth required)
    async getSiteSettings(req, res) {
        try {
            const settings = await settingService.getSiteSettings();
            res.json({
                success: true,
                data: settings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching site settings',
                error: error.message
            });
        }
    }

    // Get settings by group
    async getByGroup(req, res) {
        try {
            const settings = await settingService.getSettingsByGroup(req.params.group);
            res.json({
                success: true,
                data: settings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching settings',
                error: error.message
            });
        }
    }

    // Get purchase contact info (FB, Zalo) - Public endpoint
    async getPurchaseContact(req, res) {
        try {
            const contactInfo = await settingService.getPurchaseContactInfo();
            res.json({
                success: true,
                data: contactInfo
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching contact info',
                error: error.message
            });
        }
    }
}

module.exports = new SettingController();

