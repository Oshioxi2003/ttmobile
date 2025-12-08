import api from './api'

export const reviewService = {
  // Lấy danh sách đánh giá của 1 sản phẩm
  getProductReviews: (productId, params = {}) => {
    return api.get(`/products/${productId}/reviews`, { params })
  },

  // Tạo đánh giá mới
  createReview: (productId, payload) => {
    return api.post(`/products/${productId}/reviews`, payload)
  }
}

export default reviewService

