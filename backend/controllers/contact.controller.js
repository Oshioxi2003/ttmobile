const contactService = require('../services/contact.service');

class ContactController {
    // Get all contacts (admin)
    async getAll(req, res) {
        try {
            const result = await contactService.getAllContacts(req.query);
            res.json({
                success: true,
                data: result.contacts,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching contacts',
                error: error.message
            });
        }
    }

    // Get contact by ID
    async getById(req, res) {
        try {
            const contact = await contactService.getContactById(req.params.id);
            if (!contact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found'
                });
            }
            res.json({
                success: true,
                data: contact
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching contact',
                error: error.message
            });
        }
    }

    // Create contact (public - contact form)
    async create(req, res) {
        try {
            const contactData = {
                ...req.body,
                ipAddress: req.ip || req.connection.remoteAddress
            };
            const contact = await contactService.createContact(contactData);
            res.status(201).json({
                success: true,
                message: 'Tin nhắn của bạn đã được gửi thành công'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error sending message',
                error: error.message
            });
        }
    }

    // Reply to contact (admin)
    async reply(req, res) {
        try {
            const { replyMessage } = req.body;
            
            if (!replyMessage) {
                return res.status(400).json({
                    success: false,
                    message: 'Reply message is required'
                });
            }

            const contact = await contactService.replyContact(
                req.params.id,
                replyMessage,
                req.user.id
            );
            
            if (!contact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found'
                });
            }

            res.json({
                success: true,
                message: 'Reply sent successfully',
                data: contact
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error sending reply',
                error: error.message
            });
        }
    }

    // Archive contact
    async archive(req, res) {
        try {
            const contact = await contactService.archiveContact(req.params.id);
            if (!contact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found'
                });
            }
            res.json({
                success: true,
                message: 'Contact archived successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error archiving contact',
                error: error.message
            });
        }
    }

    // Delete contact
    async delete(req, res) {
        try {
            const result = await contactService.deleteContact(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found'
                });
            }
            res.json({
                success: true,
                message: 'Contact deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting contact',
                error: error.message
            });
        }
    }

    // Get unread count
    async getUnreadCount(req, res) {
        try {
            const count = await contactService.getUnreadCount();
            res.json({
                success: true,
                data: { count }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching unread count',
                error: error.message
            });
        }
    }
}

module.exports = new ContactController();

