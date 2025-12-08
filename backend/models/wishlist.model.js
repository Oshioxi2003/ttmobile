const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Wishlist = sequelize.define('Wishlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'wishlists',
    timestamps: true,
    updatedAt: false, // Wishlist không cần updatedAt
    indexes: [
        {
            unique: true,
            fields: ['userId', 'productId'] // Mỗi user chỉ thêm 1 product 1 lần
        }
    ]
});

module.exports = Wishlist;

