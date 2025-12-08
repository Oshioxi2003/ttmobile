const User = require('../models/user.model');
const { Op } = require('sequelize');

class UserService {
    // Create a new user
    async createUser(userData) {
        return await User.create(userData);
    }

    // Get all users
    async getAllUsers(options = {}) {
        let { page = 1, limit = 10, search = '' } = options;

        // Normalize and sanitize inputs
        const p = Math.max(1, parseInt(page, 10) || 1);
        const l = Math.max(1, parseInt(limit, 10) || 10);
        const offset = (p - 1) * l;
        const q = typeof search === 'string' ? search.trim() : '';

        const whereClause = q ? {
            [Op.or]: [
                { username: { [Op.like]: `%${q}%` } },
                { email: { [Op.like]: `%${q}%` } },
                { fullName: { [Op.like]: `%${q}%` } }
            ]
        } : {};

        const { count, rows } = await User.findAndCountAll({
            where: whereClause,
            limit: l,
            offset,
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });

        return {
            users: rows,
            total: count,
            currentPage: p,
            totalPages: Math.ceil(count / l)
        };
    }

    // Get user by ID
    async getUserById(id) {
        return await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
    }

    // Get user by email
    async getUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    // Get user by username
    async getUserByUsername(username) {
        return await User.findOne({ where: { username } });
    }

    // Update user
    async updateUser(id, updateData) {
        const user = await User.findByPk(id);
        if (!user) return null;
        return await user.update(updateData);
    }

    // Delete user
    async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return true;
    }
}

module.exports = new UserService();

