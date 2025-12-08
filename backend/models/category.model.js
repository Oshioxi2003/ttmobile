const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'categories',
    timestamps: true,
    hooks: {
        beforeCreate: (category) => {
            if (!category.slug) {
                category.slug = category.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }
        }
    }
});

// Self-referencing relationship for subcategories
Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });

module.exports = Category;

