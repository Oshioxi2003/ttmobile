const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Setting = sequelize.define('Setting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('text', 'number', 'boolean', 'json', 'html'),
        defaultValue: 'text'
    },
    group: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'general'
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'settings',
    timestamps: true
});

// Helper method to get parsed value
Setting.prototype.getParsedValue = function() {
    switch (this.type) {
        case 'number':
            return parseFloat(this.value) || 0;
        case 'boolean':
            return this.value === 'true' || this.value === '1';
        case 'json':
            try {
                return JSON.parse(this.value);
            } catch {
                return {};
            }
        default:
            return this.value;
    }
};

module.exports = Setting;

