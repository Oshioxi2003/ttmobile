const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Public routes
router.get('/site', settingController.getSiteSettings);
router.get('/purchase-contact', settingController.getPurchaseContact); // Thông tin liên hệ mua hàng (FB, Zalo)

// Admin routes
router.get('/', verifyToken, isAdmin, settingController.getAll);
router.get('/group/:group', verifyToken, isAdmin, settingController.getByGroup);
router.get('/:key', verifyToken, isAdmin, settingController.getByKey);
router.put('/:key', verifyToken, isAdmin, settingController.update);
router.put('/', verifyToken, isAdmin, settingController.updateMultiple);
router.delete('/:key', verifyToken, isAdmin, settingController.delete);

module.exports = router;

