const { Contact, User } = require('../models');
const { Op } = require('sequelize');

class ContactService {
    async getAllContacts(options = {}) {
        const { page = 1, limit = 20, status, search } = options;
        
        const where = {};
        if (status) where.status = status;
        
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { phone: { [Op.like]: `%${search}%` } },
                { subject: { [Op.like]: `%${search}%` } }
            ];
        }

        const offset = (page - 1) * limit;
        
        const { count, rows } = await Contact.findAndCountAll({
            where,
            include: [{ model: User, as: 'repliedByUser', attributes: ['id', 'username'] }],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset
        });

        return {
            contacts: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    async getContactById(id) {
        const contact = await Contact.findByPk(id, {
            include: [{ model: User, as: 'repliedByUser', attributes: ['id', 'username', 'email'] }]
        });
        
        // Mark as read if new
        if (contact && contact.status === 'new') {
            await contact.update({ status: 'read' });
        }
        
        return contact;
    }

    async createContact(data) {
        return Contact.create(data);
    }

    async replyContact(id, replyMessage, repliedBy) {
        const contact = await Contact.findByPk(id);
        if (!contact) return null;
        
        return contact.update({
            status: 'replied',
            replyMessage,
            repliedBy,
            repliedAt: new Date()
        });
    }

    async archiveContact(id) {
        const contact = await Contact.findByPk(id);
        if (!contact) return null;
        
        return contact.update({ status: 'archived' });
    }

    async deleteContact(id) {
        const contact = await Contact.findByPk(id);
        if (!contact) return null;
        
        await contact.destroy();
        return true;
    }

    async getUnreadCount() {
        return Contact.count({ where: { status: 'new' } });
    }
}

module.exports = new ContactService();

