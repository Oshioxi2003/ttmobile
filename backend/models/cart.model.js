const db = require('../database')

const Cart = {
  // Lấy hoặc tạo giỏ hàng cho user
  async getOrCreate(userId) {
    try {
      let [carts] = await db.execute(
        'SELECT * FROM carts WHERE user_id = ?',
        [userId]
      )
      
      if (carts.length === 0) {
        const [result] = await db.execute(
          'INSERT INTO carts (user_id) VALUES (?)',
          [userId]
        )
        return { id: result.insertId, user_id: userId }
      }
      
      return carts[0]
    } catch (error) {
      throw error
    }
  },

  // Lấy tất cả items trong giỏ hàng
  async getItems(userId) {
    try {
      const cart = await this.getOrCreate(userId)
      
      const [items] = await db.execute(`
        SELECT 
          ci.*,
          p.id as product_id,
          p.name,
          p.slug,
          p.price as current_price,
          p.sale_price,
          p.stock,
          p.thumbnail_image,
          p.image,
          p.is_active
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = ?
        ORDER BY ci.created_at DESC
      `, [cart.id])
      
      return items
    } catch (error) {
      throw error
    }
  },

  // Thêm sản phẩm vào giỏ
  async addItem(userId, productId, quantity = 1) {
    try {
      const cart = await this.getOrCreate(userId)
      
      // Kiểm tra sản phẩm tồn tại và còn hàng
      const [products] = await db.execute(
        'SELECT id, price, sale_price, stock, is_active FROM products WHERE id = ?',
        [productId]
      )
      
      if (products.length === 0) {
        throw new Error('Sản phẩm không tồn tại')
      }
      
      const product = products[0]
      
      if (!product.is_active) {
        throw new Error('Sản phẩm không còn kinh doanh')
      }
      
      if (product.stock < quantity) {
        throw new Error('Số lượng sản phẩm không đủ')
      }
      
      const price = product.sale_price || product.price
      
      // Kiểm tra sản phẩm đã có trong giỏ chưa
      const [existingItems] = await db.execute(
        'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
        [cart.id, productId]
      )
      
      if (existingItems.length > 0) {
        // Cập nhật số lượng
        const newQuantity = existingItems[0].quantity + quantity
        
        if (product.stock < newQuantity) {
          throw new Error('Số lượng sản phẩm không đủ')
        }
        
        await db.execute(
          'UPDATE cart_items SET quantity = ?, price = ? WHERE id = ?',
          [newQuantity, price, existingItems[0].id]
        )
      } else {
        // Thêm mới
        await db.execute(
          'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [cart.id, productId, quantity, price]
        )
      }
      
      return await this.getItems(userId)
    } catch (error) {
      throw error
    }
  },

  // Cập nhật số lượng
  async updateQuantity(userId, productId, quantity) {
    try {
      const cart = await this.getOrCreate(userId)
      
      if (quantity <= 0) {
        throw new Error('Số lượng phải lớn hơn 0')
      }
      
      // Kiểm tra tồn kho
      const [products] = await db.execute(
        'SELECT stock FROM products WHERE id = ?',
        [productId]
      )
      
      if (products.length === 0) {
        throw new Error('Sản phẩm không tồn tại')
      }
      
      if (products[0].stock < quantity) {
        throw new Error(`Chỉ còn ${products[0].stock} sản phẩm`)
      }
      
      const [result] = await db.execute(
        'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
        [quantity, cart.id, productId]
      )
      
      if (result.affectedRows === 0) {
        throw new Error('Sản phẩm không có trong giỏ hàng')
      }
      
      return await this.getItems(userId)
    } catch (error) {
      throw error
    }
  },

  // Xóa sản phẩm khỏi giỏ
  async removeItem(userId, productId) {
    try {
      const cart = await this.getOrCreate(userId)
      
      await db.execute(
        'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?',
        [cart.id, productId]
      )
      
      return await this.getItems(userId)
    } catch (error) {
      throw error
    }
  },

  // Xóa toàn bộ giỏ hàng
  async clear(userId) {
    try {
      const cart = await this.getOrCreate(userId)
      
      await db.execute('DELETE FROM cart_items WHERE cart_id = ?', [cart.id])
      
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  // Tính tổng giá trị giỏ hàng
  async getTotal(userId) {
    try {
      const items = await this.getItems(userId)
      
      const subtotal = items.reduce((sum, item) => {
        return sum + (item.price * item.quantity)
      }, 0)
      
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        items,
        subtotal,
        itemCount,
        total: subtotal // Có thể thêm shipping, tax sau
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = Cart
