/**
 * Validation middleware for request data
 */

// Validate required fields
const validateRequired = (fields) => {
    return (req, res, next) => {
        const errors = [];
        
        for (const field of fields) {
            if (!req.body[field] && req.body[field] !== 0) {
                errors.push(`${field} is required`);
            }
        }
        
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }
        
        next();
    };
};

// Validate email format
const validateEmail = (field = 'email') => {
    return (req, res, next) => {
        const email = req.body[field];
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                });
            }
        }
        next();
    };
};

// Validate phone format (Japanese/Vietnamese)
const validatePhone = (field = 'phone') => {
    return (req, res, next) => {
        const phone = req.body[field];
        if (phone) {
            // Allow various phone formats
            const phoneRegex = /^[\d\s\-+()]{8,20}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid phone format'
                });
            }
        }
        next();
    };
};

// Validate password strength
const validatePassword = (field = 'password', options = {}) => {
    const {
        minLength = 8,
        requireUppercase = true,
        requireLowercase = true,
        requireNumber = true,
        requireSpecial = false
    } = options;

    return (req, res, next) => {
        const password = req.body[field];

        if (!password) {
            return next(); // Let validateRequired handle missing password
        }

        const errors = [];

        if (password.length < minLength) {
            errors.push(`Password must be at least ${minLength} characters`);
        }

        if (requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }

        if (requireNumber && !/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }

        if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Password validation failed',
                errors
            });
        }

        next();
    };
};

// Validate numeric value
const validateNumeric = (fields) => {
    return (req, res, next) => {
        const errors = [];
        
        for (const field of fields) {
            const value = req.body[field];
            if (value !== undefined && isNaN(Number(value))) {
                errors.push(`${field} must be a number`);
            }
        }
        
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }
        
        next();
    };
};

// Validate positive number
const validatePositive = (fields) => {
    return (req, res, next) => {
        const errors = [];
        
        for (const field of fields) {
            const value = Number(req.body[field]);
            if (value !== undefined && value < 0) {
                errors.push(`${field} must be a positive number`);
            }
        }
        
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }
        
        next();
    };
};

// Sanitize input - trim strings
const sanitizeInput = (req, res, next) => {
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].trim();
            }
        });
    }
    next();
};

module.exports = {
    validateRequired,
    validateEmail,
    validatePhone,
    validatePassword,
    validateNumeric,
    validatePositive,
    sanitizeInput
};

