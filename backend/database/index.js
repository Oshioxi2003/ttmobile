const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        logging: process.env.NODE_ENV === 'development' ? console.log : false
    }
);

// Test connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };

