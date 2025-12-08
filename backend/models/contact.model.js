const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    subject: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('new', 'read', 'replied', 'archived'),
        defaultValue: 'new'
    },
    repliedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    repliedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    replyMessage: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'contacts',
    timestamps: true
});

module.exports = Contact;

