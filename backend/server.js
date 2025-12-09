require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const { connectDB, sequelize } = require('./database');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');
const logger = require('./utils/logger');
// Deprecated runtime seeding. Use Sequelize CLI seeders instead.
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "blob:", "*"],
            scriptSrc: ["'self'"],
        },
    },
}));

// CORS Configuration - Whitelist specific origins
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? (process.env.ALLOWED_ORIGINS || '').split(',')
        : [
            
            'https://rs1rgfxz-3000.asse.devtunnels.ms',
            'https://rs1rgfxz-5173.asse.devtunnels.ms'
          ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting - General API
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: {
        success: false,
        message: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiting - Auth routes (stricter)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: {
        success: false,
        message: 'Too many login attempts, please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting
app.use(API_PREFIX, generalLimiter);
app.use(`${API_PREFIX}/auth/login`, authLimiter);
app.use(`${API_PREFIX}/auth/register`, authLimiter);

// Prevent HTTP Parameter Pollution
app.use(hpp());

app.use(morgan('dev')); // HTTP request logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// Method override for PUT/DELETE with FormData
app.use(methodOverride('_method'));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use(API_PREFIX, routes);

// Root endpoint
app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'T&T Mobile API Server',
        version: '1.0.0',
        docs: `${API_PREFIX}/health`,
        endpoints: {
            auth: `${API_PREFIX}/auth`,
            products: `${API_PREFIX}/products`,
            categories: `${API_PREFIX}/categories`,
            orders: `${API_PREFIX}/orders`,
            dashboard: `${API_PREFIX}/dashboard`
        }
    });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        // Connect to database
        await connectDB();

        // Sync models (controlled by env flags)
        const ALTER = process.env.DB_ALTER === 'true';
        await sequelize.sync(ALTER ? { alter: true } : undefined);
        logger.info(`Database models synced${ALTER ? ' (alter)' : ''}`);

        // Runtime seeding has been deprecated. Please use:
        //   npx sequelize db:migrate && npx sequelize db:seed:all
        if (process.env.SEED_DB === 'true') {
            logger.warn('SEED_DB is set but runtime seeding is deprecated. Use Sequelize CLI seeders instead.')
        }

        // Start listening
        app.listen(PORT, () => {
            logger.success(`🚀 Server running on http://localhost:${PORT}`);
            logger.info(`📡 API available at http://localhost:${PORT}${API_PREFIX}`);
            logger.info(`📂 Static files at http://localhost:${PORT}/uploads`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;

