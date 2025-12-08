const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const userService = require('../services/user.service');
const { verifyToken } = require('../middleware/auth.middleware');
const {
    validateRequired,
    validateEmail,
    validatePassword,
    sanitizeInput
} = require('../middleware/validate.middleware');

// Register
router.post('/register',
    sanitizeInput,
    validateRequired(['username', 'email', 'password']),
    validateEmail('email'),
    validatePassword('password', { minLength: 8, requireUppercase: true, requireLowercase: true, requireNumber: true }),
    async (req, res) => {
        try {
            const { username, email, password, fullName, phone } = req.body;

            // Validate username format
            if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
                return res.status(400).json({
                    success: false,
                    message: 'Username must be 3-30 characters and contain only letters, numbers, and underscores'
                });
            }

            // Check if user exists
            const existingUser = await userService.getUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already registered'
                });
            }

            // Check if username exists
            const existingUsername = await userService.getUserByUsername(username);
            if (existingUsername) {
                return res.status(409).json({
                    success: false,
                    message: 'Username already taken'
                });
            }

            const user = await userService.createUser({
                username,
                email,
                password,
                fullName,
                phone
            });

            res.status(201).json({
                success: true,
                message: 'User registered successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Registration failed',
                error: error.message
            });
        }
    }
);

// Login
router.post('/login',
    sanitizeInput,
    validateRequired(['email', 'password']),
    async (req, res) => {
        try {
            const { email, password } = req.body;

            // Generic error message to prevent user enumeration
            const invalidCredentialsMsg = 'Invalid email or password';

            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: invalidCredentialsMsg
                });
            }

            if (!user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Account is deactivated. Please contact support.'
                });
            }

            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: invalidCredentialsMsg
                });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role }, // Minimal payload
                authConfig.jwtSecret,
                { expiresIn: authConfig.jwtExpiresIn }
            );

            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    token,
                    expiresIn: authConfig.jwtExpiresIn,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        fullName: user.fullName,
                        role: user.role
                    }
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Login failed'
            });
        }
    }
);

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            fullName: req.user.fullName,
            phone: req.user.phone,
            role: req.user.role
        }
    });
});

module.exports = router;

