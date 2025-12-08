const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Public route (contact form)
router.post('/', contactController.create);

// Admin routes
router.get('/', verifyToken, isAdmin, contactController.getAll);
router.get('/unread-count', verifyToken, isAdmin, contactController.getUnreadCount);
router.get('/:id', verifyToken, isAdmin, contactController.getById);
router.post('/:id/reply', verifyToken, isAdmin, contactController.reply);
router.put('/:id/archive', verifyToken, isAdmin, contactController.archive);
router.delete('/:id', verifyToken, isAdmin, contactController.delete);

module.exports = router;

