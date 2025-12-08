const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const Product = require('./product.model');
const User = require('./user.model');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reviews',
  timestamps: true
});

// Associations
Review.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Review, { foreignKey: 'productId' });

Review.belongsTo(User, { foreignKey: 'userId', allowNull: true });
User.hasMany(Review, { foreignKey: 'userId' });

module.exports = Review;

