import api from './api'

export const wishlistService = {
  // Lấy danh sách sản phẩm yêu thích của tôi
  getMyWishlist: (params = {}) => {
    return api.get('/wishlist', { params })
  },

  // Thêm sản phẩm vào wishlist
  addToWishlist: (productId) => {
    return api.post('/wishlist', { productId })
  },

  // Xóa sản phẩm khỏi wishlist
  removeFromWishlist: (productId) => {
    return api.delete(`/wishlist/${productId}`)
  },

  // Kiểm tra sản phẩm có trong wishlist không
  isInWishlist: (productId) => {
    return api.get(`/wishlist/${productId}/exists`)
  }
}

export default wishlistService

