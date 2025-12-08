import api from './api'

export const orderService = {
  // Tạo đơn hàng mới
  createOrder: (orderData) => {
    return api.post('/orders', orderData)
  },

  // Lấy danh sách đơn hàng của người dùng
  getOrders: (params = {}) => {
    return api.get('/orders', { params })
  },

  // Lấy chi tiết đơn hàng
  getOrderById: (id) => {
    return api.get(`/orders/${id}`)
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: (id, status) => {
    return api.patch(`/orders/${id}`, { status })
  },

  // Hủy đơn hàng
  cancelOrder: (id) => {
    return api.patch(`/orders/${id}`, { status: 'cancelled' })
  },

  // Lấy lịch sử đơn hàng
  getOrderHistory: (params = {}) => {
    return api.get('/orders/history', { params })
  },

  // Tính phí vận chuyển
  calculateShipping: (data) => {
    return api.post('/orders/calculate-shipping', data)
  },

  // Xác nhận thanh toán
  confirmPayment: (orderId, paymentData) => {
    return api.post(`/orders/${orderId}/confirm-payment`, paymentData)
  }
}

export default orderService

