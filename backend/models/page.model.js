const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Page = sequelize.define('Page', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Tiêu đề trang'
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        comment: 'URL slug (vd: about, chinh-sach-bao-hanh)'
    },
    content: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Nội dung EditorJS format (JSON)'
    },
    excerpt: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Mô tả ngắn cho SEO'
    },
    metaTitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'SEO meta title'
    },
    metaDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'SEO meta description'
    },
    // Footer settings
    showInFooter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Hiển thị trong footer'
    },
    footerColumn: {
        type: DataTypes.ENUM('support', 'policy', 'about'),
        defaultValue: 'policy',
        comment: 'Cột hiển thị trong footer: support, policy, about'
    },
    footerOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'Thứ tự hiển thị trong footer'
    },
    // Status
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    // Timestamps
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'pages',
    timestamps: true,
    hooks: {
        beforeCreate: (page) => {
            if (!page.slug) {
                page.slug = page.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }
        },
        beforeUpdate: (page) => {
            if (page.changed('title') && !page.changed('slug')) {
                page.slug = page.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }
        }
    }
});

module.exports = Page;

