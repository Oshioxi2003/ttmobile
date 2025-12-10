const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller')
const { verifyToken } = require('../middleware/auth.middleware')

// Tất cả routes đều cần authentication
router.use(verifyToken)

// GET /api/v1/cart - Lấy giỏ hàng
router.get('/', cartController.getCart)

// POST /api/v1/cart - Thêm sản phẩm vào giỏ
router.post('/', cartController.addToCart)

// PUT /api/v1/cart/:product_id - Cập nhật số lượng
router.put('/:product_id', cartController.updateQuantity)

// DELETE /api/v1/cart/:product_id - Xóa sản phẩm
router.delete('/:product_id', cartController.removeItem)

// DELETE /api/v1/cart - Xóa toàn bộ giỏ hàng
router.delete('/', cartController.clearCart)

module.exports = router
