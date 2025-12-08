const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Banner = sequelize.define('Banner', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
        subtitle: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    mobileImage: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    link: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    buttonText: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
        position: {
        type: DataTypes.ENUM('hero', 'sidebar', 'footer', 'popup', 'right-small', 'category', 'promo'),
        defaultValue: 'hero'
    },
    sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
        endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    openInNewTab: {
        type: DataTypes.BOOLEAN,
        allowNull: true // Can be null for 'auto' behavior
    }
}, {
    tableName: 'banners',
    timestamps: true
});

module.exports = Banner;

