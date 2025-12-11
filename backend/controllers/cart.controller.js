const Cart = require('../models/cart.model')

// Lấy giỏ hàng
exports.getCart = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }
    
    const result = await Cart.getTotal(req.user.id)
    
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Get cart error:', error)
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy giỏ hàng'
    })
  }
}

// Thêm sản phẩm vào giỏ
exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body
    
    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin sản phẩm'
      })
    }
    
    const items = await Cart.addItem(req.user.id, product_id, quantity)
    
    res.json({
      success: true,
      message: 'Đã thêm sản phẩm vào giỏ hàng',
      data: { items }
    })
  } catch (error) {
    console.error('Add to cart error:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Lỗi khi thêm sản phẩm'
    })
  }
}

// Cập nhật số lượng
exports.updateQuantity = async (req, res) => {
  try {
    const { product_id } = req.params
    const { quantity } = req.body
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Số lượng không hợp lệ'
      })
    }
    
    const items = await Cart.updateQuantity(req.user.id, product_id, quantity)
    
    res.json({
      success: true,
      message: 'Đã cập nhật số lượng',
      data: { items }
    })
  } catch (error) {
    console.error('Update quantity error:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Lỗi khi cập nhật số lượng'
    })
  }
}

// Xóa sản phẩm
exports.removeItem = async (req, res) => {
  try {
    const { product_id } = req.params
    
    const items = await Cart.removeItem(req.user.id, product_id)
    
    res.json({
      success: true,
      message: 'Đã xóa sản phẩm khỏi giỏ hàng',
      data: { items }
    })
  } catch (error) {
    console.error('Remove item error:', error)
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa sản phẩm'
    })
  }
}

// Xóa toàn bộ giỏ hàng
exports.clearCart = async (req, res) => {
  try {
    await Cart.clear(req.user.id)
    
    res.json({
      success: true,
      message: 'Đã xóa toàn bộ giỏ hàng'
    })
  } catch (error) {
    console.error('Clear cart error:', error)
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa giỏ hàng'
    })
  }
}
