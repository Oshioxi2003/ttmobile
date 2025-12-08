const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    sku: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    shortDescription: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: false,
        defaultValue: 0
    },
    originalPrice: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true
    },
    costPrice: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    brand: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    condition: {
        type: DataTypes.ENUM('new', 'like_new', 'good', 'fair'),
        defaultValue: 'new'
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    specifications: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {}
    },
    storage: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    batteryHealth: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    warranty: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    soldCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'products',
    timestamps: true,
    hooks: {
        beforeCreate: (product) => {
            if (!product.slug) {
                product.slug = product.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '') + '-' + Date.now();
            }
        }
    }
});

module.exports = Product;

