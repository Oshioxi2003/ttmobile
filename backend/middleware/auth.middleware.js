const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const User = require('../models/user.model');

// Verify JWT token
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access token is required'
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, authConfig.jwtSecret);
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token has expired'
                });
            }
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] } // Never include password
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated'
            });
        }

        // Attach user info to request
        req.user = user;
        req.userId = user.id; // Shorthand for convenience
        req.userRole = user.role;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Admin access required'
        });
    }
};

// Optional auth - doesn't fail if no token, but sets user if valid
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(); // Continue without user
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, authConfig.jwtSecret);

        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });

        if (user && user.isActive) {
            req.user = user;
            req.userId = user.id;
            req.userRole = user.role;
        }

        next();
    } catch (error) {
        // Token invalid, continue without user
        next();
    }
};

module.exports = { verifyToken, isAdmin, optionalAuth };

