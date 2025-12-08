/**
 * Security middleware for XSS protection and input sanitization
 */

// Simple XSS sanitizer - removes potentially dangerous HTML/JS
const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/`/g, '&#96;')
        .replace(/\\/g, '&#92;');
};

// Deep sanitize object
const sanitizeObject = (obj, skipFields = []) => {
    if (obj === null || obj === undefined) return obj;
    
    if (typeof obj === 'string') {
        return sanitizeString(obj);
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item, skipFields));
    }
    
    if (typeof obj === 'object') {
        const sanitized = {};
        for (const key in obj) {
            // Skip certain fields that need raw HTML (like EditorJS content)
            if (skipFields.includes(key)) {
                sanitized[key] = obj[key];
            } else {
                sanitized[key] = sanitizeObject(obj[key], skipFields);
            }
        }
        return sanitized;
    }
    
    return obj;
};

// Middleware to sanitize request body
const sanitizeBody = (skipFields = ['content', 'blocks']) => {
    return (req, res, next) => {
        if (req.body) {
            req.body = sanitizeObject(req.body, skipFields);
        }
        next();
    };
};

// Middleware to sanitize query params
const sanitizeQuery = (req, res, next) => {
    if (req.query) {
        req.query = sanitizeObject(req.query);
    }
    next();
};

// Prevent NoSQL injection patterns (extra safety)
const preventInjection = (req, res, next) => {
    const checkForInjection = (obj) => {
        if (typeof obj === 'string') {
            // Check for common injection patterns
            const dangerousPatterns = [
                /\$where/i,
                /\$gt/i,
                /\$lt/i,
                /\$ne/i,
                /\$regex/i,
                /\{\s*\$\w+/i,
            ];
            
            for (const pattern of dangerousPatterns) {
                if (pattern.test(obj)) {
                    return true;
                }
            }
        } else if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
                if (key.startsWith('$') || checkForInjection(obj[key])) {
                    return true;
                }
            }
        }
        return false;
    };
    
    if (checkForInjection(req.body) || checkForInjection(req.query)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid input detected'
        });
    }
    
    next();
};

// Validate content type
const validateContentType = (req, res, next) => {
    // Only check for POST, PUT, PATCH requests with body
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
        const contentType = req.headers['content-type'];
        
        if (!contentType) {
            return res.status(400).json({
                success: false,
                message: 'Content-Type header is required'
            });
        }
        
        // Allow JSON and form data
        if (!contentType.includes('application/json') && 
            !contentType.includes('multipart/form-data') &&
            !contentType.includes('application/x-www-form-urlencoded')) {
            return res.status(415).json({
                success: false,
                message: 'Unsupported content type'
            });
        }
    }
    
    next();
};

module.exports = {
    sanitizeString,
    sanitizeObject,
    sanitizeBody,
    sanitizeQuery,
    preventInjection,
    validateContentType
};

