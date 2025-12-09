const { sequelize } = require('../database');

// Import all models
const User = require('./user.model');
const Category = require('./category.model');
const Product = require('./product.model');
const Setting = require('./setting.model');
const Banner = require('./banner.model');
const Contact = require('./contact.model');
const Page = require('./page.model');
const Wishlist = require('./wishlist.model');
const Review = require('./review.model');

// Define relationships

// Category - Product (One to Many)
Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

// Contact - User (replied by)
User.hasMany(Contact, {
    foreignKey: 'repliedBy',
    as: 'repliedContacts',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
Contact.belongsTo(User, {
    foreignKey: 'repliedBy',
    as: 'repliedByUser'
});

// Wishlist - User (One to Many)
User.hasMany(Wishlist, {
    foreignKey: 'userId',
    as: 'wishlists',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Wishlist.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Wishlist - Product (One to Many)
Product.hasMany(Wishlist, {
    foreignKey: 'productId',
    as: 'wishlists',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Wishlist.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
});

// Review - Product (One to Many)
Product.hasMany(Review, {
    foreignKey: 'productId',
    as: 'reviews',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Review.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
});

// Review - User (One to Many)
User.hasMany(Review, {
    foreignKey: 'userId',
    as: 'reviews',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
Review.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = {
    sequelize,
    User,
    Category,
    Product,
    Setting,
    Banner,
    Contact,
    Page,
    Wishlist,
    Review
};

