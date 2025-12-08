const userService = require('../services/user.service');

class UserController {
    // Get all users
    async getAll(req, res) {
        try {
            const { page, limit, search } = req.query;
            const result = await userService.getAllUsers({ page, limit, search });
            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching users',
                error: error.message
            });
        }
    }

    // Get user by ID
    async getById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching user',
                error: error.message
            });
        }
    }

    // Create new user
    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating user',
                error: error.message
            });
        }
    }

    // Update user
    async update(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.json({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating user',
                error: error.message
            });
        }
    }

    // Delete user
    async delete(req, res) {
        try {
            const result = await userService.deleteUser(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting user',
                error: error.message
            });
        }
    }
}

module.exports = new UserController();

